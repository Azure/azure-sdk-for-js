// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorResponse } from "@azure-rest/core-client";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of AssetResource items */
export interface _PagedAssetResource {
  /** The AssetResource items on this page */
  value: AssetResourceUnion[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
  /** The cursor mark to be used on the next request.  Not set if using paging. */
  mark?: string;
}

export function _pagedAssetResourceDeserializer(item: any): _PagedAssetResource {
  return {
    value: assetResourceUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
    mark: item["mark"],
  };
}

export function assetResourceUnionArrayDeserializer(result: Array<AssetResourceUnion>): any[] {
  return result.map((item) => {
    return assetResourceUnionDeserializer(item);
  });
}

/** The items in the current page of results. */
export interface AssetResource {
  /** Discriminator property for AssetResource. */
  /** The discriminator possible values: as, contact, domain, host, ipAddress, ipBlock, page, sslCert */
  kind: string;
  /** The system generated unique id for the resource. */
  readonly id: string;
  /** The caller provided unique name for the resource. */
  name?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** Global UUID for the asset. */
  uuid?: string;
  /** The date this asset was first added to this workspace. */
  createdDate?: Date;
  /** The date this asset was last updated for this workspace. */
  updatedDate?: Date;
  state?: AssetState;
  /** An optional customer provided identifier for this asset. */
  externalId?: string;
  /** Customer labels assigned to this asset. */
  labels?: string[];
  /** An indicator of whether this asset represents a wildcard rollup of assets on this domain. */
  wildcard?: boolean;
  /** The name of the DiscoGroup that brought added this asset to the workspace. */
  discoGroupName?: string;
  /** The history of how this asset was pulled into the workspace through the discovery process. */
  auditTrail?: AuditTrailItem[];
  reason?: string;
}

export function assetResourceDeserializer(item: any): AssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
  };
}

/** Alias for AssetResourceUnion */
export type AssetResourceUnion =
  | AsAssetResource
  | ContactAssetResource
  | DomainAssetResource
  | HostAssetResource
  | IpAddressAssetResource
  | IpBlockAssetResource
  | PageAssetResource
  | SslCertAssetResource
  | AssetResource;

export function assetResourceUnionDeserializer(item: any): AssetResourceUnion {
  switch (item["kind"]) {
    case "as":
      return asAssetResourceDeserializer(item as AsAssetResource);

    case "contact":
      return contactAssetResourceDeserializer(item as ContactAssetResource);

    case "domain":
      return domainAssetResourceDeserializer(item as DomainAssetResource);

    case "host":
      return hostAssetResourceDeserializer(item as HostAssetResource);

    case "ipAddress":
      return ipAddressAssetResourceDeserializer(item as IpAddressAssetResource);

    case "ipBlock":
      return ipBlockAssetResourceDeserializer(item as IpBlockAssetResource);

    case "page":
      return pageAssetResourceDeserializer(item as PageAssetResource);

    case "sslCert":
      return sslCertAssetResourceDeserializer(item as SslCertAssetResource);

    default:
      return assetResourceDeserializer(item);
  }
}

/** The state of assets */
export type AssetState = string | AssetUpdateState | "archived";

export function assetStateDeserializer(item: any): AssetState {
  return item;
}

/** The state to update the asset to. */
export type AssetUpdateState =
  | "candidate"
  | "confirmed"
  | "dismissed"
  | "candidateInvestigate"
  | "associatedPartner"
  | "associatedThirdparty";

export function auditTrailItemArrayDeserializer(result: Array<AuditTrailItem>): any[] {
  return result.map((item) => {
    return auditTrailItemDeserializer(item);
  });
}

/** The history of how this asset was pulled into the workspace through the discovery process. */
export interface AuditTrailItem {
  /** This is typically the same as the name but might be different for different models. */
  id?: string;
  /** The caller provided unique name for the resource. */
  name?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** The kind of asset. */
  kind?: AuditTrailItemKind;
  /** An explanation of why this audit trail node was discovered from the previous node. */
  reason?: string;
}

export function auditTrailItemDeserializer(item: any): AuditTrailItem {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    kind: item["kind"],
    reason: item["reason"],
  };
}

/** The kind of asset. */
export type AuditTrailItemKind =
  | "as"
  | "contact"
  | "domain"
  | "host"
  | "ipAddress"
  | "ipBlock"
  | "page"
  | "sslCert";

/** model interface AsAssetResource */
export interface AsAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "as";
  /** asset */
  asset: AsAsset;
}

export function asAssetResourceDeserializer(item: any): AsAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: asAssetDeserializer(item["asset"]),
  };
}

/** model interface AsAsset */
export interface AsAsset extends InventoryAsset {
  asn?: number;
  asNames?: ObservedString[];
  orgNames?: ObservedString[];
  orgIds?: ObservedString[];
  countries?: ObservedString[];
  registries?: ObservedString[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  registrarCreatedAt?: ObservedLong[];
  registrarUpdatedAt?: ObservedLong[];
  registrantContacts?: ObservedString[];
  adminContacts?: ObservedString[];
  technicalContacts?: ObservedString[];
  registrarNames?: ObservedString[];
  registrantNames?: ObservedString[];
  adminNames?: ObservedString[];
  technicalNames?: ObservedString[];
  adminOrgs?: ObservedString[];
  technicalOrgs?: ObservedString[];
  registrantPhones?: ObservedString[];
  adminPhones?: ObservedString[];
  technicalPhones?: ObservedString[];
  detailedFromWhoisAt?: Date;
}

export function asAssetDeserializer(item: any): AsAsset {
  return {
    asn: item["asn"],
    asNames: !item["asNames"] ? item["asNames"] : observedStringArrayDeserializer(item["asNames"]),
    orgNames: !item["orgNames"]
      ? item["orgNames"]
      : observedStringArrayDeserializer(item["orgNames"]),
    orgIds: !item["orgIds"] ? item["orgIds"] : observedStringArrayDeserializer(item["orgIds"]),
    countries: !item["countries"]
      ? item["countries"]
      : observedStringArrayDeserializer(item["countries"]),
    registries: !item["registries"]
      ? item["registries"]
      : observedStringArrayDeserializer(item["registries"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    registrarCreatedAt: !item["registrarCreatedAt"]
      ? item["registrarCreatedAt"]
      : observedLongArrayDeserializer(item["registrarCreatedAt"]),
    registrarUpdatedAt: !item["registrarUpdatedAt"]
      ? item["registrarUpdatedAt"]
      : observedLongArrayDeserializer(item["registrarUpdatedAt"]),
    registrantContacts: !item["registrantContacts"]
      ? item["registrantContacts"]
      : observedStringArrayDeserializer(item["registrantContacts"]),
    adminContacts: !item["adminContacts"]
      ? item["adminContacts"]
      : observedStringArrayDeserializer(item["adminContacts"]),
    technicalContacts: !item["technicalContacts"]
      ? item["technicalContacts"]
      : observedStringArrayDeserializer(item["technicalContacts"]),
    registrarNames: !item["registrarNames"]
      ? item["registrarNames"]
      : observedStringArrayDeserializer(item["registrarNames"]),
    registrantNames: !item["registrantNames"]
      ? item["registrantNames"]
      : observedStringArrayDeserializer(item["registrantNames"]),
    adminNames: !item["adminNames"]
      ? item["adminNames"]
      : observedStringArrayDeserializer(item["adminNames"]),
    technicalNames: !item["technicalNames"]
      ? item["technicalNames"]
      : observedStringArrayDeserializer(item["technicalNames"]),
    adminOrgs: !item["adminOrgs"]
      ? item["adminOrgs"]
      : observedStringArrayDeserializer(item["adminOrgs"]),
    technicalOrgs: !item["technicalOrgs"]
      ? item["technicalOrgs"]
      : observedStringArrayDeserializer(item["technicalOrgs"]),
    registrantPhones: !item["registrantPhones"]
      ? item["registrantPhones"]
      : observedStringArrayDeserializer(item["registrantPhones"]),
    adminPhones: !item["adminPhones"]
      ? item["adminPhones"]
      : observedStringArrayDeserializer(item["adminPhones"]),
    technicalPhones: !item["technicalPhones"]
      ? item["technicalPhones"]
      : observedStringArrayDeserializer(item["technicalPhones"]),
    detailedFromWhoisAt: !item["detailedFromWhoisAt"]
      ? item["detailedFromWhoisAt"]
      : new Date(item["detailedFromWhoisAt"]),
  };
}

export function observedStringArrayDeserializer(result: Array<ObservedString>): any[] {
  return result.map((item) => {
    return observedStringDeserializer(item);
  });
}

/** model interface ObservedString */
export interface ObservedString extends ObservedValue {
  value?: string;
  sources?: Source[];
}

export function observedStringDeserializer(item: any): ObservedString {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    value: item["value"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

export function sourceArrayDeserializer(result: Array<Source>): any[] {
  return result.map((item) => {
    return sourceDeserializer(item);
  });
}

/** model interface Source */
export interface Source {
  source?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  reason?: string;
}

export function sourceDeserializer(item: any): Source {
  return {
    source: item["source"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    reason: item["reason"],
  };
}

export function observedLongArrayDeserializer(result: Array<ObservedLong>): any[] {
  return result.map((item) => {
    return observedLongDeserializer(item);
  });
}

/** model interface ObservedLong */
export interface ObservedLong extends ObservedValue {
  value?: number;
  sources?: Source[];
}

export function observedLongDeserializer(item: any): ObservedLong {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    value: item["value"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

/** model interface ContactAssetResource */
export interface ContactAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "contact";
  /** asset */
  asset: ContactAsset;
}

export function contactAssetResourceDeserializer(item: any): ContactAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: contactAssetDeserializer(item["asset"]),
  };
}

/** model interface ContactAsset */
export interface ContactAsset extends InventoryAsset {
  email?: string;
  names?: ObservedString[];
  organizations?: ObservedString[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
}

export function contactAssetDeserializer(item: any): ContactAsset {
  return {
    email: item["email"],
    names: !item["names"] ? item["names"] : observedStringArrayDeserializer(item["names"]),
    organizations: !item["organizations"]
      ? item["organizations"]
      : observedStringArrayDeserializer(item["organizations"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
  };
}

/** model interface DomainAssetResource */
export interface DomainAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "domain";
  /** asset */
  asset: DomainAsset;
}

export function domainAssetResourceDeserializer(item: any): DomainAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: domainAssetDeserializer(item["asset"]),
  };
}

/** model interface DomainAsset */
export interface DomainAsset {
  domain?: string;
  whoisId?: number;
  registrarIanaIds?: ObservedInteger[];
  registrantContacts?: ObservedString[];
  registrantOrgs?: ObservedString[];
  adminContacts?: ObservedString[];
  technicalContacts?: ObservedString[];
  alexaInfos?: AlexaInfo[];
  nameServers?: ObservedString[];
  mailServers?: ObservedString[];
  whoisServers?: ObservedString[];
  domainStatuses?: ObservedString[];
  registrarCreatedAt?: ObservedLong[];
  registrarUpdatedAt?: ObservedLong[];
  registrarExpiresAt?: ObservedLong[];
  soaRecords?: SoaRecord[];
  detailedFromWhoisAt?: Date;
  registrarNames?: ObservedString[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  parkedDomain?: ObservedBoolean[];
  registrantNames?: ObservedString[];
  adminNames?: ObservedString[];
  technicalNames?: ObservedString[];
  adminOrgs?: ObservedString[];
  technicalOrgs?: ObservedString[];
  registrantPhones?: ObservedString[];
  adminPhones?: ObservedString[];
  technicalPhones?: ObservedString[];
}

export function domainAssetDeserializer(item: any): DomainAsset {
  return {
    domain: item["domain"],
    whoisId: item["whoisId"],
    registrarIanaIds: !item["registrarIanaIds"]
      ? item["registrarIanaIds"]
      : observedIntegerArrayDeserializer(item["registrarIanaIds"]),
    registrantContacts: !item["registrantContacts"]
      ? item["registrantContacts"]
      : observedStringArrayDeserializer(item["registrantContacts"]),
    registrantOrgs: !item["registrantOrgs"]
      ? item["registrantOrgs"]
      : observedStringArrayDeserializer(item["registrantOrgs"]),
    adminContacts: !item["adminContacts"]
      ? item["adminContacts"]
      : observedStringArrayDeserializer(item["adminContacts"]),
    technicalContacts: !item["technicalContacts"]
      ? item["technicalContacts"]
      : observedStringArrayDeserializer(item["technicalContacts"]),
    alexaInfos: !item["alexaInfos"]
      ? item["alexaInfos"]
      : alexaInfoArrayDeserializer(item["alexaInfos"]),
    nameServers: !item["nameServers"]
      ? item["nameServers"]
      : observedStringArrayDeserializer(item["nameServers"]),
    mailServers: !item["mailServers"]
      ? item["mailServers"]
      : observedStringArrayDeserializer(item["mailServers"]),
    whoisServers: !item["whoisServers"]
      ? item["whoisServers"]
      : observedStringArrayDeserializer(item["whoisServers"]),
    domainStatuses: !item["domainStatuses"]
      ? item["domainStatuses"]
      : observedStringArrayDeserializer(item["domainStatuses"]),
    registrarCreatedAt: !item["registrarCreatedAt"]
      ? item["registrarCreatedAt"]
      : observedLongArrayDeserializer(item["registrarCreatedAt"]),
    registrarUpdatedAt: !item["registrarUpdatedAt"]
      ? item["registrarUpdatedAt"]
      : observedLongArrayDeserializer(item["registrarUpdatedAt"]),
    registrarExpiresAt: !item["registrarExpiresAt"]
      ? item["registrarExpiresAt"]
      : observedLongArrayDeserializer(item["registrarExpiresAt"]),
    soaRecords: !item["soaRecords"]
      ? item["soaRecords"]
      : soaRecordArrayDeserializer(item["soaRecords"]),
    detailedFromWhoisAt: !item["detailedFromWhoisAt"]
      ? item["detailedFromWhoisAt"]
      : new Date(item["detailedFromWhoisAt"]),
    registrarNames: !item["registrarNames"]
      ? item["registrarNames"]
      : observedStringArrayDeserializer(item["registrarNames"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    parkedDomain: !item["parkedDomain"]
      ? item["parkedDomain"]
      : observedBooleanArrayDeserializer(item["parkedDomain"]),
    registrantNames: !item["registrantNames"]
      ? item["registrantNames"]
      : observedStringArrayDeserializer(item["registrantNames"]),
    adminNames: !item["adminNames"]
      ? item["adminNames"]
      : observedStringArrayDeserializer(item["adminNames"]),
    technicalNames: !item["technicalNames"]
      ? item["technicalNames"]
      : observedStringArrayDeserializer(item["technicalNames"]),
    adminOrgs: !item["adminOrgs"]
      ? item["adminOrgs"]
      : observedStringArrayDeserializer(item["adminOrgs"]),
    technicalOrgs: !item["technicalOrgs"]
      ? item["technicalOrgs"]
      : observedStringArrayDeserializer(item["technicalOrgs"]),
    registrantPhones: !item["registrantPhones"]
      ? item["registrantPhones"]
      : observedStringArrayDeserializer(item["registrantPhones"]),
    adminPhones: !item["adminPhones"]
      ? item["adminPhones"]
      : observedStringArrayDeserializer(item["adminPhones"]),
    technicalPhones: !item["technicalPhones"]
      ? item["technicalPhones"]
      : observedStringArrayDeserializer(item["technicalPhones"]),
  };
}

export function observedIntegerArrayDeserializer(result: Array<ObservedInteger>): any[] {
  return result.map((item) => {
    return observedIntegerDeserializer(item);
  });
}

/** model interface ObservedInteger */
export interface ObservedInteger extends ObservedValue {
  value?: number;
  sources?: Source[];
}

export function observedIntegerDeserializer(item: any): ObservedInteger {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    value: item["value"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

export function alexaInfoArrayDeserializer(result: Array<AlexaInfo>): any[] {
  return result.map((item) => {
    return alexaInfoDeserializer(item);
  });
}

/** model interface AlexaInfo */
export interface AlexaInfo {
  alexaRank?: number;
  category?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
}

export function alexaInfoDeserializer(item: any): AlexaInfo {
  return {
    alexaRank: item["alexaRank"],
    category: item["category"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
  };
}

export function soaRecordArrayDeserializer(result: Array<SoaRecord>): any[] {
  return result.map((item) => {
    return soaRecordDeserializer(item);
  });
}

/** model interface SoaRecord */
export interface SoaRecord {
  nameServer?: string;
  email?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  serialNumber?: number;
  recent?: boolean;
}

export function soaRecordDeserializer(item: any): SoaRecord {
  return {
    nameServer: item["nameServer"],
    email: item["email"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    serialNumber: item["serialNumber"],
    recent: item["recent"],
  };
}

export function observedBooleanArrayDeserializer(result: Array<ObservedBoolean>): any[] {
  return result.map((item) => {
    return observedBooleanDeserializer(item);
  });
}

/** model interface ObservedBoolean */
export interface ObservedBoolean extends ObservedValue {
  value?: boolean;
  sources?: Source[];
}

export function observedBooleanDeserializer(item: any): ObservedBoolean {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    value: item["value"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

/** model interface HostAssetResource */
export interface HostAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "host";
  /** asset */
  asset: HostAsset;
}

export function hostAssetResourceDeserializer(item: any): HostAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: hostAssetDeserializer(item["asset"]),
  };
}

/** model interface HostAsset */
export interface HostAsset extends InventoryAsset {
  host?: string;
  domain?: string;
  ipAddresses?: ObservedString[];
  webComponents?: WebComponent[];
  headers?: ObservedHeader[];
  attributes?: Attribute[];
  cookies?: Cookie[];
  sslCerts?: SslCertAsset[];
  parentHosts?: ObservedString[];
  childHosts?: ObservedString[];
  hostCore?: HostCore;
  services?: Service[];
  cnames?: ObservedString[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  resourceUrls?: ResourceUrl[];
  scanMetadata?: ScanMetadata[];
  asns?: ObservedLong[];
  ipBlocks?: IpBlock[];
  responseBodies?: ObservedString[];
  domainAsset?: DomainAsset;
  nsRecord?: ObservedBoolean[];
  mxRecord?: ObservedBoolean[];
  webserver?: ObservedBoolean[];
  location?: ObservedLocation[];
  nxdomain?: ObservedBoolean[];
  sslServerConfig?: SslServerConfig[];
  isWildcard?: ObservedBoolean[];
  banners?: Banner[];
  ipv4?: ObservedBoolean[];
  ipv6?: ObservedBoolean[];
}

export function hostAssetDeserializer(item: any): HostAsset {
  return {
    host: item["host"],
    domain: item["domain"],
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : observedStringArrayDeserializer(item["ipAddresses"]),
    webComponents: !item["webComponents"]
      ? item["webComponents"]
      : webComponentArrayDeserializer(item["webComponents"]),
    headers: !item["headers"] ? item["headers"] : observedHeaderArrayDeserializer(item["headers"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributeArrayDeserializer(item["attributes"]),
    cookies: !item["cookies"] ? item["cookies"] : cookieArrayDeserializer(item["cookies"]),
    sslCerts: !item["sslCerts"]
      ? item["sslCerts"]
      : sslCertAssetArrayDeserializer(item["sslCerts"]),
    parentHosts: !item["parentHosts"]
      ? item["parentHosts"]
      : observedStringArrayDeserializer(item["parentHosts"]),
    childHosts: !item["childHosts"]
      ? item["childHosts"]
      : observedStringArrayDeserializer(item["childHosts"]),
    hostCore: !item["hostCore"] ? item["hostCore"] : hostCoreDeserializer(item["hostCore"]),
    services: !item["services"] ? item["services"] : serviceArrayDeserializer(item["services"]),
    cnames: !item["cnames"] ? item["cnames"] : observedStringArrayDeserializer(item["cnames"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    resourceUrls: !item["resourceUrls"]
      ? item["resourceUrls"]
      : resourceUrlArrayDeserializer(item["resourceUrls"]),
    scanMetadata: !item["scanMetadata"]
      ? item["scanMetadata"]
      : scanMetadataArrayDeserializer(item["scanMetadata"]),
    asns: !item["asns"] ? item["asns"] : observedLongArrayDeserializer(item["asns"]),
    ipBlocks: !item["ipBlocks"] ? item["ipBlocks"] : ipBlockArrayDeserializer(item["ipBlocks"]),
    responseBodies: !item["responseBodies"]
      ? item["responseBodies"]
      : observedStringArrayDeserializer(item["responseBodies"]),
    domainAsset: !item["domainAsset"]
      ? item["domainAsset"]
      : domainAssetDeserializer(item["domainAsset"]),
    nsRecord: !item["nsRecord"]
      ? item["nsRecord"]
      : observedBooleanArrayDeserializer(item["nsRecord"]),
    mxRecord: !item["mxRecord"]
      ? item["mxRecord"]
      : observedBooleanArrayDeserializer(item["mxRecord"]),
    webserver: !item["webserver"]
      ? item["webserver"]
      : observedBooleanArrayDeserializer(item["webserver"]),
    location: !item["location"]
      ? item["location"]
      : observedLocationArrayDeserializer(item["location"]),
    nxdomain: !item["nxdomain"]
      ? item["nxdomain"]
      : observedBooleanArrayDeserializer(item["nxdomain"]),
    sslServerConfig: !item["sslServerConfig"]
      ? item["sslServerConfig"]
      : sslServerConfigArrayDeserializer(item["sslServerConfig"]),
    isWildcard: !item["isWildcard"]
      ? item["isWildcard"]
      : observedBooleanArrayDeserializer(item["isWildcard"]),
    banners: !item["banners"] ? item["banners"] : bannerArrayDeserializer(item["banners"]),
    ipv4: !item["ipv4"] ? item["ipv4"] : observedBooleanArrayDeserializer(item["ipv4"]),
    ipv6: !item["ipv6"] ? item["ipv6"] : observedBooleanArrayDeserializer(item["ipv6"]),
  };
}

export function webComponentArrayDeserializer(result: Array<WebComponent>): any[] {
  return result.map((item) => {
    return webComponentDeserializer(item);
  });
}

/** model interface WebComponent */
export interface WebComponent {
  name?: string;
  type?: string;
  version?: string;
  ruleId?: string[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  cve?: Cve[];
  endOfLife?: number;
  recent?: boolean;
  ports?: Port[];
  sources?: Source[];
  service?: string;
}

export function webComponentDeserializer(item: any): WebComponent {
  return {
    name: item["name"],
    type: item["type"],
    version: item["version"],
    ruleId: !item["ruleId"]
      ? item["ruleId"]
      : item["ruleId"].map((p: any) => {
          return p;
        }),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    cve: !item["cve"] ? item["cve"] : cveArrayDeserializer(item["cve"]),
    endOfLife: item["endOfLife"],
    recent: item["recent"],
    ports: !item["ports"] ? item["ports"] : portArrayDeserializer(item["ports"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    service: item["service"],
  };
}

export function cveArrayDeserializer(result: Array<Cve>): any[] {
  return result.map((item) => {
    return cveDeserializer(item);
  });
}

/** model interface Cve */
export interface Cve {
  name?: string;
  cweId?: string;
  cvssScore?: number;
  cvss3Summary?: Cvss3Summary;
}

export function cveDeserializer(item: any): Cve {
  return {
    name: item["name"],
    cweId: item["cweId"],
    cvssScore: item["cvssScore"],
    cvss3Summary: !item["cvss3Summary"]
      ? item["cvss3Summary"]
      : cvss3SummaryDeserializer(item["cvss3Summary"]),
  };
}

/** model interface Cvss3Summary */
export interface Cvss3Summary {
  version?: string;
  vectorString?: string;
  attackVector?: string;
  attackComplexity?: string;
  privilegesRequired?: string;
  userInteraction?: string;
  scope?: string;
  confidentialityImpact?: string;
  integrityImpact?: string;
  availabilityImpact?: string;
  baseScore?: number;
  baseSeverity?: string;
  exploitCodeMaturity?: string;
  remediationLevel?: string;
  reportConfidence?: string;
  exploitabilityScore?: number;
  impactScore?: number;
}

export function cvss3SummaryDeserializer(item: any): Cvss3Summary {
  return {
    version: item["version"],
    vectorString: item["vectorString"],
    attackVector: item["attackVector"],
    attackComplexity: item["attackComplexity"],
    privilegesRequired: item["privilegesRequired"],
    userInteraction: item["userInteraction"],
    scope: item["scope"],
    confidentialityImpact: item["confidentialityImpact"],
    integrityImpact: item["integrityImpact"],
    availabilityImpact: item["availabilityImpact"],
    baseScore: item["baseScore"],
    baseSeverity: item["baseSeverity"],
    exploitCodeMaturity: item["exploitCodeMaturity"],
    remediationLevel: item["remediationLevel"],
    reportConfidence: item["reportConfidence"],
    exploitabilityScore: item["exploitabilityScore"],
    impactScore: item["impactScore"],
  };
}

export function portArrayDeserializer(result: Array<Port>): any[] {
  return result.map((item) => {
    return portDeserializer(item);
  });
}

/** model interface Port */
export interface Port {
  port?: number;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
}

export function portDeserializer(item: any): Port {
  return {
    port: item["port"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
  };
}

export function observedHeaderArrayDeserializer(result: Array<ObservedHeader>): any[] {
  return result.map((item) => {
    return observedHeaderDeserializer(item);
  });
}

/** model interface ObservedHeader */
export interface ObservedHeader extends ObservedValue {
  headerName?: string;
  headerValue?: string;
}

export function observedHeaderDeserializer(item: any): ObservedHeader {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    headerName: item["headerName"],
    headerValue: item["headerValue"],
  };
}

export function attributeArrayDeserializer(result: Array<Attribute>): any[] {
  return result.map((item) => {
    return attributeDeserializer(item);
  });
}

/** model interface Attribute */
export interface Attribute {
  attributeType?: string;
  attributeValue?: string;
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
}

export function attributeDeserializer(item: any): Attribute {
  return {
    attributeType: item["attributeType"],
    attributeValue: item["attributeValue"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
  };
}

export function cookieArrayDeserializer(result: Array<Cookie>): any[] {
  return result.map((item) => {
    return cookieDeserializer(item);
  });
}

/** model interface Cookie */
export interface Cookie {
  cookieName?: string;
  cookieDomain?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
  cookieExpiryDate?: Date;
}

export function cookieDeserializer(item: any): Cookie {
  return {
    cookieName: item["cookieName"],
    cookieDomain: item["cookieDomain"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    cookieExpiryDate: !item["cookieExpiryDate"]
      ? item["cookieExpiryDate"]
      : new Date(item["cookieExpiryDate"]),
  };
}

export function sslCertAssetArrayDeserializer(result: Array<SslCertAsset>): any[] {
  return result.map((item) => {
    return sslCertAssetDeserializer(item);
  });
}

/** model interface SslCertAsset */
export interface SslCertAsset extends InventoryAsset {
  sha1?: string;
  subjectCommonNames?: string[];
  organizations?: string[];
  organizationalUnits?: string[];
  issuerCommonNames?: string[];
  sigAlgName?: string;
  invalidAfter?: Date;
  serialNumber?: string;
  subjectAlternativeNames?: string[];
  issuerAlternativeNames?: string[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  invalidBefore?: Date;
  keySize?: number;
  keyAlgorithm?: string;
  subjectLocality?: string[];
  subjectState?: string[];
  subjectCountry?: string[];
  issuerLocality?: string[];
  issuerState?: string[];
  issuerCountry?: string[];
  subjectOrganizations?: string[];
  subjectOrganizationalUnits?: string[];
  issuerOrganizations?: string[];
  issuerOrganizationalUnits?: string[];
  version?: number;
  certificateAuthority?: boolean;
  selfSigned?: boolean;
  sigAlgOid?: string;
  recent?: boolean;
  validationType?: SslCertAssetValidationType;
}

export function sslCertAssetDeserializer(item: any): SslCertAsset {
  return {
    sha1: item["sha1"],
    subjectCommonNames: !item["subjectCommonNames"]
      ? item["subjectCommonNames"]
      : item["subjectCommonNames"].map((p: any) => {
          return p;
        }),
    organizations: !item["organizations"]
      ? item["organizations"]
      : item["organizations"].map((p: any) => {
          return p;
        }),
    organizationalUnits: !item["organizationalUnits"]
      ? item["organizationalUnits"]
      : item["organizationalUnits"].map((p: any) => {
          return p;
        }),
    issuerCommonNames: !item["issuerCommonNames"]
      ? item["issuerCommonNames"]
      : item["issuerCommonNames"].map((p: any) => {
          return p;
        }),
    sigAlgName: item["sigAlgName"],
    invalidAfter: !item["invalidAfter"] ? item["invalidAfter"] : new Date(item["invalidAfter"]),
    serialNumber: item["serialNumber"],
    subjectAlternativeNames: !item["subjectAlternativeNames"]
      ? item["subjectAlternativeNames"]
      : item["subjectAlternativeNames"].map((p: any) => {
          return p;
        }),
    issuerAlternativeNames: !item["issuerAlternativeNames"]
      ? item["issuerAlternativeNames"]
      : item["issuerAlternativeNames"].map((p: any) => {
          return p;
        }),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    invalidBefore: !item["invalidBefore"] ? item["invalidBefore"] : new Date(item["invalidBefore"]),
    keySize: item["keySize"],
    keyAlgorithm: item["keyAlgorithm"],
    subjectLocality: !item["subjectLocality"]
      ? item["subjectLocality"]
      : item["subjectLocality"].map((p: any) => {
          return p;
        }),
    subjectState: !item["subjectState"]
      ? item["subjectState"]
      : item["subjectState"].map((p: any) => {
          return p;
        }),
    subjectCountry: !item["subjectCountry"]
      ? item["subjectCountry"]
      : item["subjectCountry"].map((p: any) => {
          return p;
        }),
    issuerLocality: !item["issuerLocality"]
      ? item["issuerLocality"]
      : item["issuerLocality"].map((p: any) => {
          return p;
        }),
    issuerState: !item["issuerState"]
      ? item["issuerState"]
      : item["issuerState"].map((p: any) => {
          return p;
        }),
    issuerCountry: !item["issuerCountry"]
      ? item["issuerCountry"]
      : item["issuerCountry"].map((p: any) => {
          return p;
        }),
    subjectOrganizations: !item["subjectOrganizations"]
      ? item["subjectOrganizations"]
      : item["subjectOrganizations"].map((p: any) => {
          return p;
        }),
    subjectOrganizationalUnits: !item["subjectOrganizationalUnits"]
      ? item["subjectOrganizationalUnits"]
      : item["subjectOrganizationalUnits"].map((p: any) => {
          return p;
        }),
    issuerOrganizations: !item["issuerOrganizations"]
      ? item["issuerOrganizations"]
      : item["issuerOrganizations"].map((p: any) => {
          return p;
        }),
    issuerOrganizationalUnits: !item["issuerOrganizationalUnits"]
      ? item["issuerOrganizationalUnits"]
      : item["issuerOrganizationalUnits"].map((p: any) => {
          return p;
        }),
    version: item["version"],
    certificateAuthority: item["certificateAuthority"],
    selfSigned: item["selfSigned"],
    sigAlgOid: item["sigAlgOid"],
    recent: item["recent"],
    validationType: item["validationType"],
  };
}

/** The validation type of a Ssl certificate */
export type SslCertAssetValidationType =
  | "domainValidation"
  | "organizationValidation"
  | "extendedValidation";

/** model interface HostCore */
export interface HostCore {
  host?: string;
  domain?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  blacklistCauseFirstSeen?: Date;
  blacklistCauseLastSeen?: Date;
  blacklistCauseCount?: number;
  blacklistResourceFirstSeen?: Date;
  blacklistResourceLastSeen?: Date;
  blacklistResourceCount?: number;
  blacklistSequenceFirstSeen?: Date;
  blacklistSequenceLastSeen?: Date;
  blacklistSequenceCount?: number;
  phishCauseCount?: number;
  malwareCauseCount?: number;
  spamCauseCount?: number;
  scamCauseCount?: number;
  phishResourceCount?: number;
  malwareResourceCount?: number;
  spamResourceCount?: number;
  scamResourceCount?: number;
  phishSequenceCount?: number;
  malwareSequenceCount?: number;
  spamSequenceCount?: number;
  scamSequenceCount?: number;
  alexaRank?: number;
  hostReputationScore?: number;
  hostPhishReputationScore?: number;
  hostMalwareReputationScore?: number;
  hostSpamReputationScore?: number;
  hostScamReputationScore?: number;
  domainReputationScore?: number;
  domainPhishReputationScore?: number;
  domainMalwareReputationScore?: number;
  domainSpamReputationScore?: number;
  domainScamReputationScore?: number;
  uuid?: string;
}

export function hostCoreDeserializer(item: any): HostCore {
  return {
    host: item["host"],
    domain: item["domain"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    blacklistCauseFirstSeen: !item["blacklistCauseFirstSeen"]
      ? item["blacklistCauseFirstSeen"]
      : new Date(item["blacklistCauseFirstSeen"]),
    blacklistCauseLastSeen: !item["blacklistCauseLastSeen"]
      ? item["blacklistCauseLastSeen"]
      : new Date(item["blacklistCauseLastSeen"]),
    blacklistCauseCount: item["blacklistCauseCount"],
    blacklistResourceFirstSeen: !item["blacklistResourceFirstSeen"]
      ? item["blacklistResourceFirstSeen"]
      : new Date(item["blacklistResourceFirstSeen"]),
    blacklistResourceLastSeen: !item["blacklistResourceLastSeen"]
      ? item["blacklistResourceLastSeen"]
      : new Date(item["blacklistResourceLastSeen"]),
    blacklistResourceCount: item["blacklistResourceCount"],
    blacklistSequenceFirstSeen: !item["blacklistSequenceFirstSeen"]
      ? item["blacklistSequenceFirstSeen"]
      : new Date(item["blacklistSequenceFirstSeen"]),
    blacklistSequenceLastSeen: !item["blacklistSequenceLastSeen"]
      ? item["blacklistSequenceLastSeen"]
      : new Date(item["blacklistSequenceLastSeen"]),
    blacklistSequenceCount: item["blacklistSequenceCount"],
    phishCauseCount: item["phishCauseCount"],
    malwareCauseCount: item["malwareCauseCount"],
    spamCauseCount: item["spamCauseCount"],
    scamCauseCount: item["scamCauseCount"],
    phishResourceCount: item["phishResourceCount"],
    malwareResourceCount: item["malwareResourceCount"],
    spamResourceCount: item["spamResourceCount"],
    scamResourceCount: item["scamResourceCount"],
    phishSequenceCount: item["phishSequenceCount"],
    malwareSequenceCount: item["malwareSequenceCount"],
    spamSequenceCount: item["spamSequenceCount"],
    scamSequenceCount: item["scamSequenceCount"],
    alexaRank: item["alexaRank"],
    hostReputationScore: item["hostReputationScore"],
    hostPhishReputationScore: item["hostPhishReputationScore"],
    hostMalwareReputationScore: item["hostMalwareReputationScore"],
    hostSpamReputationScore: item["hostSpamReputationScore"],
    hostScamReputationScore: item["hostScamReputationScore"],
    domainReputationScore: item["domainReputationScore"],
    domainPhishReputationScore: item["domainPhishReputationScore"],
    domainMalwareReputationScore: item["domainMalwareReputationScore"],
    domainSpamReputationScore: item["domainSpamReputationScore"],
    domainScamReputationScore: item["domainScamReputationScore"],
    uuid: item["uuid"],
  };
}

export function serviceArrayDeserializer(result: Array<Service>): any[] {
  return result.map((item) => {
    return serviceDeserializer(item);
  });
}

/** model interface Service */
export interface Service {
  scheme?: string;
  port?: number;
  webComponents?: WebComponent[];
  sslCerts?: SslCertAsset[];
  exceptions?: ObservedString[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
  portStates?: ObservedPortState[];
}

export function serviceDeserializer(item: any): Service {
  return {
    scheme: item["scheme"],
    port: item["port"],
    webComponents: !item["webComponents"]
      ? item["webComponents"]
      : webComponentArrayDeserializer(item["webComponents"]),
    sslCerts: !item["sslCerts"]
      ? item["sslCerts"]
      : sslCertAssetArrayDeserializer(item["sslCerts"]),
    exceptions: !item["exceptions"]
      ? item["exceptions"]
      : observedStringArrayDeserializer(item["exceptions"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    portStates: !item["portStates"]
      ? item["portStates"]
      : observedPortStateArrayDeserializer(item["portStates"]),
  };
}

export function observedPortStateArrayDeserializer(result: Array<ObservedPortState>): any[] {
  return result.map((item) => {
    return observedPortStateDeserializer(item);
  });
}

/** model interface ObservedPortState */
export interface ObservedPortState extends ObservedValue {
  value?: ObservedPortStateValue;
  port?: number;
}

export function observedPortStateDeserializer(item: any): ObservedPortState {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    value: item["value"],
    port: item["port"],
  };
}

/** state of observed port */
export type ObservedPortStateValue = "open" | "closed" | "filtered";

export function resourceUrlArrayDeserializer(result: Array<ResourceUrl>): any[] {
  return result.map((item) => {
    return resourceUrlDeserializer(item);
  });
}

/** model interface ResourceUrl */
export interface ResourceUrl {
  url?: string;
  resources?: DependentResource[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
}

export function resourceUrlDeserializer(item: any): ResourceUrl {
  return {
    url: item["url"],
    resources: !item["resources"]
      ? item["resources"]
      : dependentResourceArrayDeserializer(item["resources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
  };
}

export function dependentResourceArrayDeserializer(result: Array<DependentResource>): any[] {
  return result.map((item) => {
    return dependentResourceDeserializer(item);
  });
}

/** model interface DependentResource */
export interface DependentResource {
  md5?: string;
  responseBodySize?: number;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  firstSeenCrawlGuid?: string;
  firstSeenPageGuid?: string;
  firstSeenResourceGuid?: string;
  lastSeenCrawlGuid?: string;
  lastSeenPageGuid?: string;
  lastSeenResourceGuid?: string;
  responseBodyMinhash?: number[];
  contentType?: string;
  sha256?: string;
  sha384?: string;
  sha512?: string;
  url?: string;
  cached?: boolean;
  sriChecks?: SubResourceIntegrityCheck[];
  host?: string;
  lastObservedViolation?: Date;
  lastObservedValidation?: Date;
  lastObservedActualSriHash?: string;
  lastObservedExpectedSriHash?: string;
}

export function dependentResourceDeserializer(item: any): DependentResource {
  return {
    md5: item["md5"],
    responseBodySize: item["responseBodySize"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    firstSeenCrawlGuid: item["firstSeenCrawlGuid"],
    firstSeenPageGuid: item["firstSeenPageGuid"],
    firstSeenResourceGuid: item["firstSeenResourceGuid"],
    lastSeenCrawlGuid: item["lastSeenCrawlGuid"],
    lastSeenPageGuid: item["lastSeenPageGuid"],
    lastSeenResourceGuid: item["lastSeenResourceGuid"],
    responseBodyMinhash: !item["responseBodyMinhash"]
      ? item["responseBodyMinhash"]
      : item["responseBodyMinhash"].map((p: any) => {
          return p;
        }),
    contentType: item["contentType"],
    sha256: item["sha256"],
    sha384: item["sha384"],
    sha512: item["sha512"],
    url: item["url"],
    cached: item["cached"],
    sriChecks: !item["sriChecks"]
      ? item["sriChecks"]
      : subResourceIntegrityCheckArrayDeserializer(item["sriChecks"]),
    host: item["host"],
    lastObservedViolation: !item["lastObservedViolation"]
      ? item["lastObservedViolation"]
      : new Date(item["lastObservedViolation"]),
    lastObservedValidation: !item["lastObservedValidation"]
      ? item["lastObservedValidation"]
      : new Date(item["lastObservedValidation"]),
    lastObservedActualSriHash: item["lastObservedActualSriHash"],
    lastObservedExpectedSriHash: item["lastObservedExpectedSriHash"],
  };
}

export function subResourceIntegrityCheckArrayDeserializer(
  result: Array<SubResourceIntegrityCheck>,
): any[] {
  return result.map((item) => {
    return subResourceIntegrityCheckDeserializer(item);
  });
}

/** model interface SubResourceIntegrityCheck */
export interface SubResourceIntegrityCheck {
  violation?: boolean;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  causePageUrl?: string;
  crawlGuid?: string;
  pageGuid?: string;
  resourceGuid?: string;
  expectedHash?: string;
}

export function subResourceIntegrityCheckDeserializer(item: any): SubResourceIntegrityCheck {
  return {
    violation: item["violation"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    causePageUrl: item["causePageUrl"],
    crawlGuid: item["crawlGuid"],
    pageGuid: item["pageGuid"],
    resourceGuid: item["resourceGuid"],
    expectedHash: item["expectedHash"],
  };
}

export function scanMetadataArrayDeserializer(result: Array<ScanMetadata>): any[] {
  return result.map((item) => {
    return scanMetadataDeserializer(item);
  });
}

/** model interface ScanMetadata */
export interface ScanMetadata {
  port?: number;
  bannerMetadata?: string;
  startScan?: Date;
  endScan?: Date;
}

export function scanMetadataDeserializer(item: any): ScanMetadata {
  return {
    port: item["port"],
    bannerMetadata: item["bannerMetadata"],
    startScan: !item["startScan"] ? item["startScan"] : new Date(item["startScan"]),
    endScan: !item["endScan"] ? item["endScan"] : new Date(item["endScan"]),
  };
}

export function ipBlockArrayDeserializer(result: Array<IpBlock>): any[] {
  return result.map((item) => {
    return ipBlockDeserializer(item);
  });
}

/** model interface IpBlock */
export interface IpBlock {
  ipBlock?: string;
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
}

export function ipBlockDeserializer(item: any): IpBlock {
  return {
    ipBlock: item["ipBlock"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
  };
}

export function observedLocationArrayDeserializer(result: Array<ObservedLocation>): any[] {
  return result.map((item) => {
    return observedLocationDeserializer(item);
  });
}

/** model interface ObservedLocation */
export interface ObservedLocation extends ObservedValue {
  value?: Location;
  sources?: Source[];
}

export function observedLocationDeserializer(item: any): ObservedLocation {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    value: !item["value"] ? item["value"] : locationDeserializer(item["value"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

/** model interface Location */
export interface Location {
  countryCode?: string;
  countryName?: string;
  region?: string;
  regionName?: string;
  city?: string;
  areaCode?: number;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  dmaCode?: number;
  metroCodeId?: number;
}

export function locationDeserializer(item: any): Location {
  return {
    countryCode: item["countryCode"],
    countryName: item["countryName"],
    region: item["region"],
    regionName: item["regionName"],
    city: item["city"],
    areaCode: item["areaCode"],
    postalCode: item["postalCode"],
    latitude: item["latitude"],
    longitude: item["longitude"],
    dmaCode: item["dmaCode"],
    metroCodeId: item["metroCodeId"],
  };
}

export function sslServerConfigArrayDeserializer(result: Array<SslServerConfig>): any[] {
  return result.map((item) => {
    return sslServerConfigDeserializer(item);
  });
}

/** model interface SslServerConfig */
export interface SslServerConfig {
  tlsVersions?: string[];
  cipherSuites?: string[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  sources?: Source[];
}

export function sslServerConfigDeserializer(item: any): SslServerConfig {
  return {
    tlsVersions: !item["tlsVersions"]
      ? item["tlsVersions"]
      : item["tlsVersions"].map((p: any) => {
          return p;
        }),
    cipherSuites: !item["cipherSuites"]
      ? item["cipherSuites"]
      : item["cipherSuites"].map((p: any) => {
          return p;
        }),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

export function bannerArrayDeserializer(result: Array<Banner>): any[] {
  return result.map((item) => {
    return bannerDeserializer(item);
  });
}

/** model interface Banner */
export interface Banner {
  port?: number;
  banner?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  scanType?: string;
  bannerMetadata?: string;
  recent?: boolean;
  sha256?: string;
  sources?: Source[];
}

export function bannerDeserializer(item: any): Banner {
  return {
    port: item["port"],
    banner: item["banner"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    scanType: item["scanType"],
    bannerMetadata: item["bannerMetadata"],
    recent: item["recent"],
    sha256: item["sha256"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

/** model interface IpAddressAssetResource */
export interface IpAddressAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "ipAddress";
  /** asset */
  asset: IpAddressAsset;
}

export function ipAddressAssetResourceDeserializer(item: any): IpAddressAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: ipAddressAssetDeserializer(item["asset"]),
  };
}

/** model interface IpAddressAsset */
export interface IpAddressAsset extends InventoryAsset {
  ipAddress?: string;
  asns?: ObservedLong[];
  reputations?: Reputation[];
  webComponents?: WebComponent[];
  netRanges?: ObservedString[];
  headers?: ObservedHeader[];
  attributes?: Attribute[];
  cookies?: Cookie[];
  sslCerts?: SslCertAsset[];
  services?: Service[];
  ipBlocks?: IpBlock[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  banners?: Banner[];
  scanMetadata?: ScanMetadata[];
  nsRecord?: ObservedBoolean[];
  mxRecord?: ObservedBoolean[];
  location?: ObservedLocation[];
  hosts?: ObservedString[];
  nxdomain?: ObservedBoolean[];
  sslServerConfig?: SslServerConfig[];
  ipv4?: boolean;
  ipv6?: boolean;
}

export function ipAddressAssetDeserializer(item: any): IpAddressAsset {
  return {
    ipAddress: item["ipAddress"],
    asns: !item["asns"] ? item["asns"] : observedLongArrayDeserializer(item["asns"]),
    reputations: !item["reputations"]
      ? item["reputations"]
      : reputationArrayDeserializer(item["reputations"]),
    webComponents: !item["webComponents"]
      ? item["webComponents"]
      : webComponentArrayDeserializer(item["webComponents"]),
    netRanges: !item["netRanges"]
      ? item["netRanges"]
      : observedStringArrayDeserializer(item["netRanges"]),
    headers: !item["headers"] ? item["headers"] : observedHeaderArrayDeserializer(item["headers"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributeArrayDeserializer(item["attributes"]),
    cookies: !item["cookies"] ? item["cookies"] : cookieArrayDeserializer(item["cookies"]),
    sslCerts: !item["sslCerts"]
      ? item["sslCerts"]
      : sslCertAssetArrayDeserializer(item["sslCerts"]),
    services: !item["services"] ? item["services"] : serviceArrayDeserializer(item["services"]),
    ipBlocks: !item["ipBlocks"] ? item["ipBlocks"] : ipBlockArrayDeserializer(item["ipBlocks"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    banners: !item["banners"] ? item["banners"] : bannerArrayDeserializer(item["banners"]),
    scanMetadata: !item["scanMetadata"]
      ? item["scanMetadata"]
      : scanMetadataArrayDeserializer(item["scanMetadata"]),
    nsRecord: !item["nsRecord"]
      ? item["nsRecord"]
      : observedBooleanArrayDeserializer(item["nsRecord"]),
    mxRecord: !item["mxRecord"]
      ? item["mxRecord"]
      : observedBooleanArrayDeserializer(item["mxRecord"]),
    location: !item["location"]
      ? item["location"]
      : observedLocationArrayDeserializer(item["location"]),
    hosts: !item["hosts"] ? item["hosts"] : observedStringArrayDeserializer(item["hosts"]),
    nxdomain: !item["nxdomain"]
      ? item["nxdomain"]
      : observedBooleanArrayDeserializer(item["nxdomain"]),
    sslServerConfig: !item["sslServerConfig"]
      ? item["sslServerConfig"]
      : sslServerConfigArrayDeserializer(item["sslServerConfig"]),
    ipv4: item["ipv4"],
    ipv6: item["ipv6"],
  };
}

export function reputationArrayDeserializer(result: Array<Reputation>): any[] {
  return result.map((item) => {
    return reputationDeserializer(item);
  });
}

/** model interface Reputation */
export interface Reputation {
  listName?: string;
  threatType?: string;
  trusted?: boolean;
  cidr?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  listUpdatedAt?: Date;
  recent?: boolean;
}

export function reputationDeserializer(item: any): Reputation {
  return {
    listName: item["listName"],
    threatType: item["threatType"],
    trusted: item["trusted"],
    cidr: item["cidr"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    listUpdatedAt: !item["listUpdatedAt"] ? item["listUpdatedAt"] : new Date(item["listUpdatedAt"]),
    recent: item["recent"],
  };
}

/** model interface IpBlockAssetResource */
export interface IpBlockAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "ipBlock";
  /** asset */
  asset: IpBlockAsset;
}

export function ipBlockAssetResourceDeserializer(item: any): IpBlockAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: ipBlockAssetDeserializer(item["asset"]),
  };
}

/** model interface IpBlockAsset */
export interface IpBlockAsset extends InventoryAsset {
  ipBlock?: string;
  asns?: ObservedLong[];
  bgpPrefixes?: ObservedString[];
  netNames?: ObservedString[];
  registrantContacts?: ObservedString[];
  registrantOrgs?: ObservedString[];
  adminContacts?: ObservedString[];
  technicalContacts?: ObservedString[];
  registrarCreatedAt?: ObservedLong[];
  registrarUpdatedAt?: ObservedLong[];
  netRanges?: ObservedString[];
  startIp?: string;
  endIp?: string;
  reputations?: Reputation[];
  detailedFromWhoisAt?: Date;
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  location?: ObservedLocation[];
  registrarExpiresAt?: ObservedLong[];
  registrantNames?: ObservedString[];
  adminNames?: ObservedString[];
  technicalNames?: ObservedString[];
  adminOrgs?: ObservedString[];
  technicalOrgs?: ObservedString[];
  registrantPhones?: ObservedString[];
  adminPhones?: ObservedString[];
  technicalPhones?: ObservedString[];
  ipv4?: boolean;
  ipv6?: boolean;
}

export function ipBlockAssetDeserializer(item: any): IpBlockAsset {
  return {
    ipBlock: item["ipBlock"],
    asns: !item["asns"] ? item["asns"] : observedLongArrayDeserializer(item["asns"]),
    bgpPrefixes: !item["bgpPrefixes"]
      ? item["bgpPrefixes"]
      : observedStringArrayDeserializer(item["bgpPrefixes"]),
    netNames: !item["netNames"]
      ? item["netNames"]
      : observedStringArrayDeserializer(item["netNames"]),
    registrantContacts: !item["registrantContacts"]
      ? item["registrantContacts"]
      : observedStringArrayDeserializer(item["registrantContacts"]),
    registrantOrgs: !item["registrantOrgs"]
      ? item["registrantOrgs"]
      : observedStringArrayDeserializer(item["registrantOrgs"]),
    adminContacts: !item["adminContacts"]
      ? item["adminContacts"]
      : observedStringArrayDeserializer(item["adminContacts"]),
    technicalContacts: !item["technicalContacts"]
      ? item["technicalContacts"]
      : observedStringArrayDeserializer(item["technicalContacts"]),
    registrarCreatedAt: !item["registrarCreatedAt"]
      ? item["registrarCreatedAt"]
      : observedLongArrayDeserializer(item["registrarCreatedAt"]),
    registrarUpdatedAt: !item["registrarUpdatedAt"]
      ? item["registrarUpdatedAt"]
      : observedLongArrayDeserializer(item["registrarUpdatedAt"]),
    netRanges: !item["netRanges"]
      ? item["netRanges"]
      : observedStringArrayDeserializer(item["netRanges"]),
    startIp: item["startIp"],
    endIp: item["endIp"],
    reputations: !item["reputations"]
      ? item["reputations"]
      : reputationArrayDeserializer(item["reputations"]),
    detailedFromWhoisAt: !item["detailedFromWhoisAt"]
      ? item["detailedFromWhoisAt"]
      : new Date(item["detailedFromWhoisAt"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    location: !item["location"]
      ? item["location"]
      : observedLocationArrayDeserializer(item["location"]),
    registrarExpiresAt: !item["registrarExpiresAt"]
      ? item["registrarExpiresAt"]
      : observedLongArrayDeserializer(item["registrarExpiresAt"]),
    registrantNames: !item["registrantNames"]
      ? item["registrantNames"]
      : observedStringArrayDeserializer(item["registrantNames"]),
    adminNames: !item["adminNames"]
      ? item["adminNames"]
      : observedStringArrayDeserializer(item["adminNames"]),
    technicalNames: !item["technicalNames"]
      ? item["technicalNames"]
      : observedStringArrayDeserializer(item["technicalNames"]),
    adminOrgs: !item["adminOrgs"]
      ? item["adminOrgs"]
      : observedStringArrayDeserializer(item["adminOrgs"]),
    technicalOrgs: !item["technicalOrgs"]
      ? item["technicalOrgs"]
      : observedStringArrayDeserializer(item["technicalOrgs"]),
    registrantPhones: !item["registrantPhones"]
      ? item["registrantPhones"]
      : observedStringArrayDeserializer(item["registrantPhones"]),
    adminPhones: !item["adminPhones"]
      ? item["adminPhones"]
      : observedStringArrayDeserializer(item["adminPhones"]),
    technicalPhones: !item["technicalPhones"]
      ? item["technicalPhones"]
      : observedStringArrayDeserializer(item["technicalPhones"]),
    ipv4: item["ipv4"],
    ipv6: item["ipv6"],
  };
}

/** model interface PageAssetResource */
export interface PageAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "page";
  /** asset */
  asset: PageAsset;
}

export function pageAssetResourceDeserializer(item: any): PageAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: pageAssetDeserializer(item["asset"]),
  };
}

/** model interface PageAsset */
export interface PageAsset extends InventoryAsset {
  url?: string;
  httpMethod?: string;
  service?: string;
  ipAddresses?: ObservedString[];
  successful?: ObservedBoolean[];
  httpResponseCodes?: ObservedInteger[];
  httpResponseMessages?: ObservedString[];
  responseTimes?: ObservedLong[];
  frames?: ObservedBoolean[];
  windows?: ObservedBoolean[];
  nonHtmlFrames?: ObservedBoolean[];
  undirectedContent?: ObservedBoolean[];
  contentTypes?: ObservedString[];
  contentLengths?: ObservedLong[];
  windowNames?: ObservedString[];
  charsets?: ObservedString[];
  titles?: ObservedString[];
  languages?: ObservedString[];
  responseHeaders?: ObservedHeader[];
  cookies?: Cookie[];
  webComponents?: WebComponent[];
  attributes?: Attribute[];
  assetSecurityPolicies?: AssetSecurityPolicy[];
  responseBodyMinhashSignatures?: ObservedIntegers[];
  fullDomMinhashSignatures?: ObservedIntegers[];
  responseBodyHashSignatures?: ObservedString[];
  errors?: ObservedString[];
  sslCerts?: SslCertAsset[];
  sources?: Source[];
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  cause?: PageCause;
  referrer?: string;
  redirectUrls?: ObservedString[];
  redirectType?: PageAssetRedirectType;
  finalUrls?: ObservedString[];
  finalResponseCodes?: ObservedInteger[];
  parkedPage?: ObservedBoolean[];
  resourceUrls?: ResourceUrl[];
  guids?: GuidPair[];
  finalIpAddresses?: ObservedString[];
  asns?: ObservedLong[];
  ipBlocks?: IpBlock[];
  finalAsns?: ObservedLong[];
  finalIpBlocks?: IpBlock[];
  responseBodies?: ObservedString[];
  domainAsset?: DomainAsset;
  rootUrl?: ObservedBoolean;
  isRootUrl?: boolean;
  location?: ObservedLocation[];
  services?: Service[];
  siteStatus?: string;
  cnames?: ObservedString[];
  cdns?: ObservedString[];
  host?: string;
  domain?: string;
  sslServerConfig?: SslServerConfig[];
  gdprAssetSecurityPolicies?: AssetSecurityPolicy[];
  ipv4?: ObservedBoolean[];
  ipv6?: ObservedBoolean[];
}

export function pageAssetDeserializer(item: any): PageAsset {
  return {
    url: item["url"],
    httpMethod: item["httpMethod"],
    service: item["service"],
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : observedStringArrayDeserializer(item["ipAddresses"]),
    successful: !item["successful"]
      ? item["successful"]
      : observedBooleanArrayDeserializer(item["successful"]),
    httpResponseCodes: !item["httpResponseCodes"]
      ? item["httpResponseCodes"]
      : observedIntegerArrayDeserializer(item["httpResponseCodes"]),
    httpResponseMessages: !item["httpResponseMessages"]
      ? item["httpResponseMessages"]
      : observedStringArrayDeserializer(item["httpResponseMessages"]),
    responseTimes: !item["responseTimes"]
      ? item["responseTimes"]
      : observedLongArrayDeserializer(item["responseTimes"]),
    frames: !item["frames"] ? item["frames"] : observedBooleanArrayDeserializer(item["frames"]),
    windows: !item["windows"] ? item["windows"] : observedBooleanArrayDeserializer(item["windows"]),
    nonHtmlFrames: !item["nonHtmlFrames"]
      ? item["nonHtmlFrames"]
      : observedBooleanArrayDeserializer(item["nonHtmlFrames"]),
    undirectedContent: !item["undirectedContent"]
      ? item["undirectedContent"]
      : observedBooleanArrayDeserializer(item["undirectedContent"]),
    contentTypes: !item["contentTypes"]
      ? item["contentTypes"]
      : observedStringArrayDeserializer(item["contentTypes"]),
    contentLengths: !item["contentLengths"]
      ? item["contentLengths"]
      : observedLongArrayDeserializer(item["contentLengths"]),
    windowNames: !item["windowNames"]
      ? item["windowNames"]
      : observedStringArrayDeserializer(item["windowNames"]),
    charsets: !item["charsets"]
      ? item["charsets"]
      : observedStringArrayDeserializer(item["charsets"]),
    titles: !item["titles"] ? item["titles"] : observedStringArrayDeserializer(item["titles"]),
    languages: !item["languages"]
      ? item["languages"]
      : observedStringArrayDeserializer(item["languages"]),
    responseHeaders: !item["responseHeaders"]
      ? item["responseHeaders"]
      : observedHeaderArrayDeserializer(item["responseHeaders"]),
    cookies: !item["cookies"] ? item["cookies"] : cookieArrayDeserializer(item["cookies"]),
    webComponents: !item["webComponents"]
      ? item["webComponents"]
      : webComponentArrayDeserializer(item["webComponents"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributeArrayDeserializer(item["attributes"]),
    assetSecurityPolicies: !item["assetSecurityPolicies"]
      ? item["assetSecurityPolicies"]
      : assetSecurityPolicyArrayDeserializer(item["assetSecurityPolicies"]),
    responseBodyMinhashSignatures: !item["responseBodyMinhashSignatures"]
      ? item["responseBodyMinhashSignatures"]
      : observedIntegersArrayDeserializer(item["responseBodyMinhashSignatures"]),
    fullDomMinhashSignatures: !item["fullDomMinhashSignatures"]
      ? item["fullDomMinhashSignatures"]
      : observedIntegersArrayDeserializer(item["fullDomMinhashSignatures"]),
    responseBodyHashSignatures: !item["responseBodyHashSignatures"]
      ? item["responseBodyHashSignatures"]
      : observedStringArrayDeserializer(item["responseBodyHashSignatures"]),
    errors: !item["errors"] ? item["errors"] : observedStringArrayDeserializer(item["errors"]),
    sslCerts: !item["sslCerts"]
      ? item["sslCerts"]
      : sslCertAssetArrayDeserializer(item["sslCerts"]),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    cause: !item["cause"] ? item["cause"] : pageCauseDeserializer(item["cause"]),
    referrer: item["referrer"],
    redirectUrls: !item["redirectUrls"]
      ? item["redirectUrls"]
      : observedStringArrayDeserializer(item["redirectUrls"]),
    redirectType: item["redirectType"],
    finalUrls: !item["finalUrls"]
      ? item["finalUrls"]
      : observedStringArrayDeserializer(item["finalUrls"]),
    finalResponseCodes: !item["finalResponseCodes"]
      ? item["finalResponseCodes"]
      : observedIntegerArrayDeserializer(item["finalResponseCodes"]),
    parkedPage: !item["parkedPage"]
      ? item["parkedPage"]
      : observedBooleanArrayDeserializer(item["parkedPage"]),
    resourceUrls: !item["resourceUrls"]
      ? item["resourceUrls"]
      : resourceUrlArrayDeserializer(item["resourceUrls"]),
    guids: !item["guids"] ? item["guids"] : guidPairArrayDeserializer(item["guids"]),
    finalIpAddresses: !item["finalIpAddresses"]
      ? item["finalIpAddresses"]
      : observedStringArrayDeserializer(item["finalIpAddresses"]),
    asns: !item["asns"] ? item["asns"] : observedLongArrayDeserializer(item["asns"]),
    ipBlocks: !item["ipBlocks"] ? item["ipBlocks"] : ipBlockArrayDeserializer(item["ipBlocks"]),
    finalAsns: !item["finalAsns"]
      ? item["finalAsns"]
      : observedLongArrayDeserializer(item["finalAsns"]),
    finalIpBlocks: !item["finalIpBlocks"]
      ? item["finalIpBlocks"]
      : ipBlockArrayDeserializer(item["finalIpBlocks"]),
    responseBodies: !item["responseBodies"]
      ? item["responseBodies"]
      : observedStringArrayDeserializer(item["responseBodies"]),
    domainAsset: !item["domainAsset"]
      ? item["domainAsset"]
      : domainAssetDeserializer(item["domainAsset"]),
    rootUrl: !item["rootUrl"] ? item["rootUrl"] : observedBooleanDeserializer(item["rootUrl"]),
    isRootUrl: item["isRootUrl"],
    location: !item["location"]
      ? item["location"]
      : observedLocationArrayDeserializer(item["location"]),
    services: !item["services"] ? item["services"] : serviceArrayDeserializer(item["services"]),
    siteStatus: item["siteStatus"],
    cnames: !item["cnames"] ? item["cnames"] : observedStringArrayDeserializer(item["cnames"]),
    cdns: !item["cdns"] ? item["cdns"] : observedStringArrayDeserializer(item["cdns"]),
    host: item["host"],
    domain: item["domain"],
    sslServerConfig: !item["sslServerConfig"]
      ? item["sslServerConfig"]
      : sslServerConfigArrayDeserializer(item["sslServerConfig"]),
    gdprAssetSecurityPolicies: !item["gdprAssetSecurityPolicies"]
      ? item["gdprAssetSecurityPolicies"]
      : assetSecurityPolicyArrayDeserializer(item["gdprAssetSecurityPolicies"]),
    ipv4: !item["ipv4"] ? item["ipv4"] : observedBooleanArrayDeserializer(item["ipv4"]),
    ipv6: !item["ipv6"] ? item["ipv6"] : observedBooleanArrayDeserializer(item["ipv6"]),
  };
}

export function assetSecurityPolicyArrayDeserializer(result: Array<AssetSecurityPolicy>): any[] {
  return result.map((item) => {
    return assetSecurityPolicyDeserializer(item);
  });
}

/** model interface AssetSecurityPolicy */
export interface AssetSecurityPolicy {
  policyName?: string;
  isAffected?: boolean;
  description?: string;
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
  sources?: Source[];
}

export function assetSecurityPolicyDeserializer(item: any): AssetSecurityPolicy {
  return {
    policyName: item["policyName"],
    isAffected: item["isAffected"],
    description: item["description"],
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

export function observedIntegersArrayDeserializer(result: Array<ObservedIntegers>): any[] {
  return result.map((item) => {
    return observedIntegersDeserializer(item);
  });
}

/** model interface ObservedIntegers */
export interface ObservedIntegers extends ObservedValue {
  values?: number[];
  sources?: Source[];
}

export function observedIntegersDeserializer(item: any): ObservedIntegers {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    sources: !item["sources"] ? item["sources"] : sourceArrayDeserializer(item["sources"]),
  };
}

/** model interface PageCause */
export interface PageCause {
  cause?: string;
  causeElementXPath?: string;
  location?: string;
  possibleMatches?: number;
  loopDetected?: boolean;
  version?: number;
  domChangeIndex?: number;
}

export function pageCauseDeserializer(item: any): PageCause {
  return {
    cause: item["cause"],
    causeElementXPath: item["causeElementXPath"],
    location: item["location"],
    possibleMatches: item["possibleMatches"],
    loopDetected: item["loopDetected"],
    version: item["version"],
    domChangeIndex: item["domChangeIndex"],
  };
}

/** The redirect type of a page */
export type PageAssetRedirectType = "httpHeader" | "metaRefresh" | "javascript" | "final";

export function guidPairArrayDeserializer(result: Array<GuidPair>): any[] {
  return result.map((item) => {
    return guidPairDeserializer(item);
  });
}

/** model interface GuidPair */
export interface GuidPair {
  pageGuid?: string;
  crawlStateGuid?: string;
  loadDate?: Date;
  recent?: boolean;
}

export function guidPairDeserializer(item: any): GuidPair {
  return {
    pageGuid: item["pageGuid"],
    crawlStateGuid: item["crawlStateGuid"],
    loadDate: !item["loadDate"] ? item["loadDate"] : new Date(item["loadDate"]),
    recent: item["recent"],
  };
}

/** model interface SslCertAssetResource */
export interface SslCertAssetResource extends AssetResource {
  /** The kind of AssetResource */
  kind: "sslCert";
  /** asset */
  asset: SslCertAsset;
}

export function sslCertAssetResourceDeserializer(item: any): SslCertAssetResource {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    uuid: item["uuid"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    state: !item["state"] ? item["state"] : assetStateDeserializer(item["state"]),
    externalId: item["externalId"],
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    wildcard: item["wildcard"],
    discoGroupName: item["discoGroupName"],
    auditTrail: !item["auditTrail"]
      ? item["auditTrail"]
      : auditTrailItemArrayDeserializer(item["auditTrail"]),
    reason: item["reason"],
    asset: sslCertAssetDeserializer(item["asset"]),
  };
}

/** Template model for observed values */
export interface ObservedValue {
  firstSeen?: Date;
  lastSeen?: Date;
  count?: number;
  recent?: boolean;
}

export function observedValueDeserializer(item: any): ObservedValue {
  return {
    firstSeen: !item["firstSeen"] ? item["firstSeen"] : new Date(item["firstSeen"]),
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    count: item["count"],
    recent: item["recent"],
  };
}

/** A inventory base model created for swagger documentation purpose */
export interface InventoryAsset {}

export function inventoryAssetDeserializer(item: any): InventoryAsset {
  return item;
}

/** A request body used to update an asset. */
export interface AssetUpdateData {
  /** The state to update the asset to. */
  state?: AssetUpdateState;
  /** A string which can be used to identify the asset in external systems. */
  externalId?: string;
  /** Any Labels to update the asset with. */
  labels?: Record<string, boolean>;
  /** A list of asset types to cascade the updates to. */
  transfers?: AssetUpdateTransfers;
  /** A list of observation remediations to apply to the asset. */
  remediations?: ObservationRemediationItem[];
}

export function assetUpdateDataSerializer(item: AssetUpdateData): any {
  return {
    state: item["state"],
    externalId: item["externalId"],
    labels: item["labels"],
    transfers: item["transfers"],
    remediations: !item["remediations"]
      ? item["remediations"]
      : observationRemediationItemArraySerializer(item["remediations"]),
  };
}

/** A list of asset types to cascade the updates to. */
export type AssetUpdateTransfers =
  | "as"
  | "contact"
  | "domain"
  | "host"
  | "ipAddress"
  | "ipBlock"
  | "page"
  | "sslCert";

export function observationRemediationItemArraySerializer(
  result: Array<ObservationRemediationItem>,
): any[] {
  return result.map((item) => {
    return observationRemediationItemSerializer(item);
  });
}

/** This is an object that contains the observation remediation information that is used as part of the asset update. */
export interface ObservationRemediationItem {
  /** The kind of the observation to remediate. */
  kind: ObservationType;
  /** The name of the observation to remediate. */
  name: string;
  /** The state to which to update the observation. */
  state: ObservationRemediationState;
}

export function observationRemediationItemSerializer(item: ObservationRemediationItem): any {
  return { kind: item["kind"], name: item["name"], state: item["state"] };
}

/** A list of observation types */
export type ObservationType = "cve" | "insight";
/** A list of observation states */
export type ObservationRemediationState = "active" | "nonApplicable";

/** model interface Task */
export interface Task {
  /** The unique identifier of the task. */
  readonly id: string;
  /** The time the task started. */
  startedAt?: Date;
  /** The time the task completed. */
  completedAt?: Date;
  /** The last time the status of the task was updated. */
  lastPolledAt?: Date;
  /** The state the task is in. */
  state?: TaskState;
  /** The phase the task is in. */
  phase?: TaskPhase;
  /** The reason the task was moved into its current state, if the task wasn't completed. */
  reason?: string;
  /** Attributes unique to the task.  This differs by task type. */
  metadata?: Record<string, any>;
}

export function taskDeserializer(item: any): Task {
  return {
    id: item["id"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    completedAt: !item["completedAt"] ? item["completedAt"] : new Date(item["completedAt"]),
    lastPolledAt: !item["lastPolledAt"] ? item["lastPolledAt"] : new Date(item["lastPolledAt"]),
    state: item["state"],
    phase: item["phase"],
    reason: item["reason"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The state the task is in. */
export type TaskState =
  | "pending"
  | "running"
  | "paused"
  | "complete"
  | "incomplete"
  | "failed"
  | "warning";
/** The phase the task is in. */
export type TaskPhase = "running" | "polling" | "complete";

/** A request body used to export an asset. */
export interface AssetsExportRequest {
  /** The name of the file to export. */
  fileName: string;
  /** The columns to export. */
  columns: string[];
}

export function assetsExportRequestSerializer(item: AssetsExportRequest): any {
  return {
    fileName: item["fileName"],
    columns: item["columns"].map((p: any) => {
      return p;
    }),
  };
}

/** The page result response for the observation */
export interface ObservationPageResult {
  /** The total number of elements. */
  totalElements: number;
  /** The summary of observation counts by priority. */
  prioritySummary: Record<string, number>;
  /** The list of observation results. */
  value: ObservationResult[];
}

export function observationPageResultDeserializer(item: any): ObservationPageResult {
  return {
    totalElements: item["totalElements"],
    prioritySummary: Object.fromEntries(
      Object.entries(item["prioritySummary"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    value: observationResultArrayDeserializer(item["value"]),
  };
}

export function observationResultArrayDeserializer(result: Array<ObservationResult>): any[] {
  return result.map((item) => {
    return observationResultDeserializer(item);
  });
}

/** The result response for the observation */
export interface ObservationResult {
  /** The name of the observation. */
  name: string;
  /** The list of applicable types. */
  types: ObservationType[];
  /** The priority of the observation. */
  priority: ObservationPriority;
  /** The CVSS v2 score. */
  cvssScoreV2: number;
  /** The CVSS v3 score. */
  cvssScoreV3: number;
  /** The remediation state of the observation. */
  remediationState: ObservationRemediationState;
  /** The source of the remediation state of the observation. */
  remediationSource: ObservationRemediationSource;
}

export function observationResultDeserializer(item: any): ObservationResult {
  return {
    name: item["name"],
    types: item["types"].map((p: any) => {
      return p;
    }),
    priority: item["priority"],
    cvssScoreV2: item["cvssScoreV2"],
    cvssScoreV3: item["cvssScoreV3"],
    remediationState: item["remediationState"],
    remediationSource: item["remediationSource"],
  };
}

/** A list of observation priorities */
export type ObservationPriority = "high" | "medium" | "low" | "none";
/** A list of observation remediation sources */
export type ObservationRemediationSource = "user" | "system";

/** A request body used to retrieve a list of deltas. */
export interface DeltaDetailsRequest {
  /** The type of delta detail to retrieve. */
  deltaDetailType: DeltaDetailType;
  /** The number of days prior to retrieve deltas for. */
  priorDays?: number;
  /** The type of asset */
  kind: GlobalAssetType;
  /** expected format to be: yyyy-MM-dd */
  date?: string;
}

export function deltaDetailsRequestSerializer(item: DeltaDetailsRequest): any {
  return {
    deltaDetailType: item["deltaDetailType"],
    priorDays: item["priorDays"],
    kind: item["kind"],
    date: item["date"],
  };
}

/** A list of delta detail type */
export type DeltaDetailType = "added" | "removed";
/** A list of global asset type */
export type GlobalAssetType =
  | "page"
  | "resource"
  | "mailServer"
  | "nameServer"
  | "host"
  | "domain"
  | "ipAddress"
  | "ipBlock"
  | "as"
  | "contact"
  | "sslCert";

/** model interface _DeltaPageResult */
export interface _DeltaPageResult {
  /** The total number of items available in the full result set. */
  totalElements?: number;
  /** The link to access the next page of results.  Not set if at the end of the result set. */
  nextLink?: string;
  /** The items in the current page of results. */
  value?: DeltaResult[];
}

export function _deltaPageResultDeserializer(item: any): _DeltaPageResult {
  return {
    totalElements: item["totalElements"],
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : deltaResultArrayDeserializer(item["value"]),
  };
}

export function deltaResultArrayDeserializer(result: Array<DeltaResult>): any[] {
  return result.map((item) => {
    return deltaResultDeserializer(item);
  });
}

/** Result for each of the delta detail response */
export interface DeltaResult {
  /** Shows the asset kind */
  kind: GlobalAssetType;
  /** Shows the asset name */
  name: string;
  /** Shows the date when the asset was originally created */
  createdAt: Date;
  /** Shows the date when the asset was last updated, usually the date the we trying to pull up the results for */
  updatedAt: Date;
  /** Shows the inventory state */
  state: GlobalInventoryState;
}

export function deltaResultDeserializer(item: any): DeltaResult {
  return {
    kind: item["kind"],
    name: item["name"],
    createdAt: new Date(item["createdAt"]),
    updatedAt: new Date(item["updatedAt"]),
    state: item["state"],
  };
}

/** A list of global inventory states. */
export type GlobalInventoryState =
  | "candidate"
  | "candidateInvestigate"
  | "confirmed"
  | "associated"
  | "associatedPartner"
  | "associatedThirdParty"
  | "archived"
  | "dismissed"
  | "autoconfirmed";

/** A request body used to retrieve a delta summary. */
export interface DeltaSummaryRequest {
  /** The number of days prior to retrieve deltas for. */
  priorDays?: number;
  /** expected format to be: yyyy-MM-dd */
  date?: string;
}

export function deltaSummaryRequestSerializer(item: DeltaSummaryRequest): any {
  return { priorDays: item["priorDays"], date: item["date"] };
}

/** Define response body for getting delta summary */
export interface DeltaSummaryResult {
  /** Contains added, removed, and difference values for the whole range either 7 or 30 days */
  summary: DeltaRangeResult;
  /** Contains added, removed, count, and difference values for each day */
  daily: DeltaDateResult[];
}

export function deltaSummaryResultDeserializer(item: any): DeltaSummaryResult {
  return {
    summary: deltaRangeResultDeserializer(item["summary"]),
    daily: deltaDateResultArrayDeserializer(item["daily"]),
  };
}

/** Contains added, removed, and difference values for the whole range either 7 or 30 days */
export interface DeltaRangeResult {
  /** The range of dates requested */
  range: number;
  /** The total amount of assets removed over a date range */
  removed: number;
  /** The total amount of assets added over a date range */
  added: number;
  /** The total amount of assets changed removed over a date range */
  difference: number;
  /** A list of summary changes per asset kind */
  kindSummaries: DeltaTypeResponse[];
}

export function deltaRangeResultDeserializer(item: any): DeltaRangeResult {
  return {
    range: item["range"],
    removed: item["removed"],
    added: item["added"],
    difference: item["difference"],
    kindSummaries: deltaTypeResponseArrayDeserializer(item["kindSummaries"]),
  };
}

export function deltaTypeResponseArrayDeserializer(result: Array<DeltaTypeResponse>): any[] {
  return result.map((item) => {
    return deltaTypeResponseDeserializer(item);
  });
}

/** The type of Delta response for each asset kind */
export interface DeltaTypeResponse {
  /** The kind of asset */
  kind: GlobalAssetType;
  /** The amount of assets removed for one asset kind */
  removed: number;
  /** The amount of assets added for one asset kind */
  added: number;
  /** The amount of assets changed for one asset kind */
  difference: number;
}

export function deltaTypeResponseDeserializer(item: any): DeltaTypeResponse {
  return {
    kind: item["kind"],
    removed: item["removed"],
    added: item["added"],
    difference: item["difference"],
  };
}

export function deltaDateResultArrayDeserializer(result: Array<DeltaDateResult>): any[] {
  return result.map((item) => {
    return deltaDateResultDeserializer(item);
  });
}

/** Date information for the delta response */
export interface DeltaDateResult {
  /** The date that is being requested */
  date: Date;
  /** A list of summary counts per day */
  deltas: DailyDeltaTypeResponse[];
}

export function deltaDateResultDeserializer(item: any): DeltaDateResult {
  return {
    date: new Date(item["date"]),
    deltas: dailyDeltaTypeResponseArrayDeserializer(item["deltas"]),
  };
}

export function dailyDeltaTypeResponseArrayDeserializer(
  result: Array<DailyDeltaTypeResponse>,
): any[] {
  return result.map((item) => {
    return dailyDeltaTypeResponseDeserializer(item);
  });
}

/** Delta response for each day */
export interface DailyDeltaTypeResponse extends DeltaTypeResponse {
  /** The current number of assets for one asset kind */
  count: number;
}

export function dailyDeltaTypeResponseDeserializer(item: any): DailyDeltaTypeResponse {
  return {
    kind: item["kind"],
    removed: item["removed"],
    added: item["added"],
    difference: item["difference"],
    count: item["count"],
  };
}

/** Paged collection of DataConnection items */
export interface _PagedDataConnection {
  /** The DataConnection items on this page */
  value: DataConnectionUnion[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedDataConnectionDeserializer(item: any): _PagedDataConnection {
  return {
    value: dataConnectionUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function dataConnectionUnionArrayDeserializer(result: Array<DataConnectionUnion>): any[] {
  return result.map((item) => {
    return dataConnectionUnionDeserializer(item);
  });
}

/** model interface DataConnection */
export interface DataConnection {
  /** Discriminator property for DataConnection. */
  /** The discriminator possible values: logAnalytics, azureDataExplorer */
  kind: string;
  /** This is typically the same as the name but might be different for different models. */
  id?: string;
  /** The caller provided unique name for the resource. */
  readonly name: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** The type of data the data connection will transfer */
  content?: DataConnectionContent;
  /** The date the data connection was created. */
  readonly createdDate?: Date;
  /** The rate at which the data connection will receive updates. */
  frequency?: DataConnectionFrequency;
  /** The day to update the data connection on. (1-7 for weekly, 1-31 for monthly) */
  frequencyOffset?: number;
  /** The date the data connection was last updated. */
  readonly updatedDate?: Date;
  /** The date the data connection was last updated by user. */
  readonly userUpdatedAt?: Date;
  /** An indicator of whether the data connection is active. */
  active?: boolean;
  /** A message that specifies details about data connection if inactive. */
  readonly inactiveMessage?: string;
}

export function dataConnectionDeserializer(item: any): DataConnection {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    content: item["content"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    frequency: item["frequency"],
    frequencyOffset: item["frequencyOffset"],
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    userUpdatedAt: !item["userUpdatedAt"] ? item["userUpdatedAt"] : new Date(item["userUpdatedAt"]),
    active: item["active"],
    inactiveMessage: item["inactiveMessage"],
  };
}

/** Alias for DataConnectionUnion */
export type DataConnectionUnion =
  | LogAnalyticsDataConnection
  | AzureDataExplorerDataConnection
  | DataConnection;

export function dataConnectionUnionDeserializer(item: any): DataConnectionUnion {
  switch (item["kind"]) {
    case "logAnalytics":
      return logAnalyticsDataConnectionDeserializer(item as LogAnalyticsDataConnection);

    case "azureDataExplorer":
      return azureDataExplorerDataConnectionDeserializer(item as AzureDataExplorerDataConnection);

    default:
      return dataConnectionDeserializer(item);
  }
}

/** The type of data the data connection will transfer */
export type DataConnectionContent = "assets" | "attackSurfaceInsights";
/** The rate at which the data connection will receive updates. */
export type DataConnectionFrequency = "daily" | "weekly" | "monthly";

/** model interface LogAnalyticsDataConnection */
export interface LogAnalyticsDataConnection extends DataConnection {
  /** The kind of DataConnection */
  kind: "logAnalytics";
  /** properties */
  properties: LogAnalyticsDataConnectionProperties;
}

export function logAnalyticsDataConnectionDeserializer(item: any): LogAnalyticsDataConnection {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    content: item["content"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    frequency: item["frequency"],
    frequencyOffset: item["frequencyOffset"],
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    userUpdatedAt: !item["userUpdatedAt"] ? item["userUpdatedAt"] : new Date(item["userUpdatedAt"]),
    active: item["active"],
    inactiveMessage: item["inactiveMessage"],
    properties: logAnalyticsDataConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** model interface LogAnalyticsDataConnectionProperties */
export interface LogAnalyticsDataConnectionProperties extends DataConnectionProperties {
  /** log analytics api key */
  apiKey?: string;
  /** log analytics workspace id */
  workspaceId?: string;
}

export function logAnalyticsDataConnectionPropertiesSerializer(
  item: LogAnalyticsDataConnectionProperties,
): any {
  return { apiKey: item["apiKey"], workspaceId: item["workspaceId"] };
}

export function logAnalyticsDataConnectionPropertiesDeserializer(
  item: any,
): LogAnalyticsDataConnectionProperties {
  return {
    apiKey: item["apiKey"],
    workspaceId: item["workspaceId"],
  };
}

/** model interface AzureDataExplorerDataConnection */
export interface AzureDataExplorerDataConnection extends DataConnection {
  /** The kind of DataConnection */
  kind: "azureDataExplorer";
  /** properties */
  properties: AzureDataExplorerDataConnectionProperties;
}

export function azureDataExplorerDataConnectionDeserializer(
  item: any,
): AzureDataExplorerDataConnection {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    content: item["content"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    frequency: item["frequency"],
    frequencyOffset: item["frequencyOffset"],
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    userUpdatedAt: !item["userUpdatedAt"] ? item["userUpdatedAt"] : new Date(item["userUpdatedAt"]),
    active: item["active"],
    inactiveMessage: item["inactiveMessage"],
    properties: azureDataExplorerDataConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** model interface AzureDataExplorerDataConnectionProperties */
export interface AzureDataExplorerDataConnectionProperties extends DataConnectionProperties {
  /** The azure data explorer cluster name */
  clusterName?: string;
  /** The azure data explorer region */
  region?: string;
  /** The azure data explorer database name */
  databaseName?: string;
}

export function azureDataExplorerDataConnectionPropertiesSerializer(
  item: AzureDataExplorerDataConnectionProperties,
): any {
  return {
    clusterName: item["clusterName"],
    region: item["region"],
    databaseName: item["databaseName"],
  };
}

export function azureDataExplorerDataConnectionPropertiesDeserializer(
  item: any,
): AzureDataExplorerDataConnectionProperties {
  return {
    clusterName: item["clusterName"],
    region: item["region"],
    databaseName: item["databaseName"],
  };
}

/** The properties required to establish connection to a particular service */
export interface DataConnectionProperties {}

export function dataConnectionPropertiesSerializer(_item: DataConnectionProperties): any {
  return {};
}

export function dataConnectionPropertiesDeserializer(item: any): DataConnectionProperties {
  return item;
}

/** model interface DataConnectionData */
export interface DataConnectionData {
  /** Discriminator property for DataConnectionData. */
  /** The discriminator possible values: logAnalytics, azureDataExplorer */
  kind: string;
  /** The name of data connection */
  name?: string;
  /** The type of data the data connection will transfer. */
  content?: DataConnectionContent;
  /** The rate at which the data connection will receive updates. */
  frequency?: DataConnectionFrequency;
  /** The day to update the data connection on. (1-7 for weekly, 1-31 for monthly) */
  frequencyOffset?: number;
}

export function dataConnectionDataSerializer(item: DataConnectionData): any {
  return {
    kind: item["kind"],
    name: item["name"],
    content: item["content"],
    frequency: item["frequency"],
    frequencyOffset: item["frequencyOffset"],
  };
}

/** Alias for DataConnectionDataUnion */
export type DataConnectionDataUnion =
  | LogAnalyticsDataConnectionData
  | AzureDataExplorerDataConnectionData
  | DataConnectionData;

export function dataConnectionDataUnionSerializer(item: DataConnectionDataUnion): any {
  switch (item.kind) {
    case "logAnalytics":
      return logAnalyticsDataConnectionDataSerializer(item as LogAnalyticsDataConnectionData);

    case "azureDataExplorer":
      return azureDataExplorerDataConnectionDataSerializer(
        item as AzureDataExplorerDataConnectionData,
      );

    default:
      return dataConnectionDataSerializer(item);
  }
}

/** model interface LogAnalyticsDataConnectionData */
export interface LogAnalyticsDataConnectionData extends DataConnectionData {
  /** The kind of DataConnectionData */
  kind: "logAnalytics";
  /** properties */
  properties: LogAnalyticsDataConnectionProperties;
}

export function logAnalyticsDataConnectionDataSerializer(
  item: LogAnalyticsDataConnectionData,
): any {
  return {
    kind: item["kind"],
    name: item["name"],
    content: item["content"],
    frequency: item["frequency"],
    frequencyOffset: item["frequencyOffset"],
    properties: logAnalyticsDataConnectionPropertiesSerializer(item["properties"]),
  };
}

/** model interface AzureDataExplorerDataConnectionData */
export interface AzureDataExplorerDataConnectionData extends DataConnectionData {
  /** The kind of DataConnectionData */
  kind: "azureDataExplorer";
  /** properties */
  properties: AzureDataExplorerDataConnectionProperties;
}

export function azureDataExplorerDataConnectionDataSerializer(
  item: AzureDataExplorerDataConnectionData,
): any {
  return {
    kind: item["kind"],
    name: item["name"],
    content: item["content"],
    frequency: item["frequency"],
    frequencyOffset: item["frequencyOffset"],
    properties: azureDataExplorerDataConnectionPropertiesSerializer(item["properties"]),
  };
}

/** Validate result for validate action endpoints */
export interface ValidateResult {
  /** This is the top-level error object whose code matches the x-ms-error-code response header. */
  error?: ErrorDetail;
}

export function validateResultDeserializer(item: any): ValidateResult {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** This is the top-level error object whose code matches the x-ms-error-code response header. */
export interface ErrorDetail {
  /** This is one of a server-defined set of error codes. */
  code: string;
  /** This is a human-readable representation of the error. */
  message: string;
  /** This is the error target. */
  target?: string;
  /** This is an array of details about specific errors that led to this reported error. */
  details?: ErrorDetail[];
  /** This is an object containing more specific information than the current object about the error. */
  innererror?: InnerError;
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

/** This is an object containing more specific information than the current object about the error. */
export interface InnerError {
  /** This is a more specific error code than was provided by the containing error. */
  code?: string;
  /** This is an additional field representing the value that caused the error to help with debugging. */
  value?: any;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    code: item["code"],
    value: item["value"],
  };
}

/** Paged collection of DiscoGroup items */
export interface _PagedDiscoGroup {
  /** The DiscoGroup items on this page */
  value: DiscoGroup[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedDiscoGroupDeserializer(item: any): _PagedDiscoGroup {
  return {
    value: discoGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function discoGroupArrayDeserializer(result: Array<DiscoGroup>): any[] {
  return result.map((item) => {
    return discoGroupDeserializer(item);
  });
}

/** model interface DiscoGroup */
export interface DiscoGroup {
  /** This is typically the same as the name but might be different for different models. */
  id?: string;
  /** The caller provided unique name for the resource. */
  readonly name: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** The description for a disco group. */
  description?: string;
  /** The tier for the disco group which will affect the algorithm used for the disco runs in this group. */
  tier?: string;
  /** The frequency at which the disco group is supposed to be rerun in milliseconds. */
  frequencyMilliseconds?: number;
  /** The list of seeds used for the disco group runs. */
  seeds?: DiscoSource[];
  /** The list of names used for the disco group runs. */
  names?: string[];
  /** The list of excludes used for the disco group runs, aka assets to exclude from the discovery algorithm. */
  excludes?: DiscoSource[];
  /** The latest run of this disco group with some limited information, null if the group has never been run. */
  latestRun?: DiscoRunResult;
  /** The date for the disco group was created. */
  createdDate?: Date;
  /** The unique identifier for the disco template used for the disco group creation. */
  templateId?: string;
}

export function discoGroupDeserializer(item: any): DiscoGroup {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    description: item["description"],
    tier: item["tier"],
    frequencyMilliseconds: item["frequencyMilliseconds"],
    seeds: !item["seeds"] ? item["seeds"] : discoSourceArrayDeserializer(item["seeds"]),
    names: !item["names"]
      ? item["names"]
      : item["names"].map((p: any) => {
          return p;
        }),
    excludes: !item["excludes"] ? item["excludes"] : discoSourceArrayDeserializer(item["excludes"]),
    latestRun: !item["latestRun"]
      ? item["latestRun"]
      : discoRunResultDeserializer(item["latestRun"]),
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    templateId: item["templateId"],
  };
}

export function discoSourceArraySerializer(result: Array<DiscoSource>): any[] {
  return result.map((item) => {
    return discoSourceSerializer(item);
  });
}

export function discoSourceArrayDeserializer(result: Array<DiscoSource>): any[] {
  return result.map((item) => {
    return discoSourceDeserializer(item);
  });
}

/** Source entity used to drive discovery. */
export interface DiscoSource {
  /** The kind of disco source. */
  kind?: DiscoSourceKind;
  /** The name for the disco source. */
  name?: string;
}

export function discoSourceSerializer(item: DiscoSource): any {
  return { kind: item["kind"], name: item["name"] };
}

export function discoSourceDeserializer(item: any): DiscoSource {
  return {
    kind: item["kind"],
    name: item["name"],
  };
}

/** The kind of disco source. */
export type DiscoSourceKind = "as" | "attribute" | "contact" | "domain" | "host" | "ipBlock";

/** The latest run of this disco group with some limited information, null if the group has never been run. */
export interface DiscoRunResult {
  /** The date for when the disco run was created in the system. */
  submittedDate?: Date;
  /** The date for when the disco run was actually started by the system. */
  startedDate?: Date;
  /** The date for when the disco run was completed by the system. */
  completedDate?: Date;
  /** The tier which will affect the algorithm used for the disco run. */
  tier?: string;
  /** The State of the disco run. */
  state?: DiscoRunState;
  /** The total count of assets that were found this disco run. */
  totalAssetsFoundCount?: number;
  /** The list of seeds used for the disco run. */
  seeds?: DiscoSource[];
  /** The list of excludes used for the disco run, aka assets to exclude from the discovery algorithm. */
  excludes?: DiscoSource[];
  /** The list of names used for the disco run. */
  names?: string[];
}

export function discoRunResultDeserializer(item: any): DiscoRunResult {
  return {
    submittedDate: !item["submittedDate"] ? item["submittedDate"] : new Date(item["submittedDate"]),
    startedDate: !item["startedDate"] ? item["startedDate"] : new Date(item["startedDate"]),
    completedDate: !item["completedDate"] ? item["completedDate"] : new Date(item["completedDate"]),
    tier: item["tier"],
    state: item["state"],
    totalAssetsFoundCount: item["totalAssetsFoundCount"],
    seeds: !item["seeds"] ? item["seeds"] : discoSourceArrayDeserializer(item["seeds"]),
    excludes: !item["excludes"] ? item["excludes"] : discoSourceArrayDeserializer(item["excludes"]),
    names: !item["names"]
      ? item["names"]
      : item["names"].map((p: any) => {
          return p;
        }),
  };
}

/** The State of the disco run. */
export type DiscoRunState = "pending" | "running" | "completed" | "failed";

/** A request body used to create a discovery group. */
export interface DiscoGroupData {
  /** The name for a disco group. */
  name?: string;
  /** The description for a disco group. */
  description?: string;
  /** The tier for the disco group which will affect the algorithm used for the disco runs in this group. */
  tier?: string;
  /** The frequency at which the disco group is supposed to be rerun in milliseconds. */
  frequencyMilliseconds?: number;
  /** The list of seeds used for the disco group runs. */
  seeds?: DiscoSource[];
  /** The list of names used for the disco group runs. */
  names?: string[];
  /** The list of excludes used for the disco group runs, aka assets to exclude from the discovery algorithm. */
  excludes?: DiscoSource[];
  /** The unique identifier for the disco template used for the disco group creation. */
  templateId?: string;
}

export function discoGroupDataSerializer(item: DiscoGroupData): any {
  return {
    name: item["name"],
    description: item["description"],
    tier: item["tier"],
    frequencyMilliseconds: item["frequencyMilliseconds"],
    seeds: !item["seeds"] ? item["seeds"] : discoSourceArraySerializer(item["seeds"]),
    names: !item["names"]
      ? item["names"]
      : item["names"].map((p: any) => {
          return p;
        }),
    excludes: !item["excludes"] ? item["excludes"] : discoSourceArraySerializer(item["excludes"]),
    templateId: item["templateId"],
  };
}

/** model interface _DiscoRunPageResult */
export interface _DiscoRunPageResult {
  /** The total number of items available in the full result set. */
  totalElements?: number;
  /** The link to access the next page of results.  Not set if at the end of the result set. */
  nextLink?: string;
  /** The items in the current page of results. */
  value?: DiscoRunResult[];
}

export function _discoRunPageResultDeserializer(item: any): _DiscoRunPageResult {
  return {
    totalElements: item["totalElements"],
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : discoRunResultArrayDeserializer(item["value"]),
  };
}

export function discoRunResultArrayDeserializer(result: Array<DiscoRunResult>): any[] {
  return result.map((item) => {
    return discoRunResultDeserializer(item);
  });
}

/** AssetChainRequest containing information needed for the retrieval of the asset chain summary. */
export interface AssetChainRequest {
  /** Asset chain source. */
  assetChainSource: AssetChainSource;
  /** A collection of asset chain source ids. */
  sourceIds: string[];
}

export function assetChainRequestSerializer(item: AssetChainRequest): any {
  return {
    assetChainSource: item["assetChainSource"],
    sourceIds: item["sourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** A list of asset chain sources */
export type AssetChainSource = "DISCO_GROUP" | "ASSET";

/** Response for the asset chain summary. */
export interface AssetChainSummaryResult {
  /** A list of asset chain summaries per asset kind */
  affectedAssetsSummary: AssetChainKindSummaryResult[];
  /** A list of disco group summaries */
  affectedGroupsSummary: DiscoGroupSummaryResult[];
  /** The list of exceptions */
  errors?: ErrorResponse[];
}

export function assetChainSummaryResultDeserializer(item: any): AssetChainSummaryResult {
  return {
    affectedAssetsSummary: assetChainKindSummaryResultArrayDeserializer(
      item["affectedAssetsSummary"],
    ),
    affectedGroupsSummary: discoGroupSummaryResultArrayDeserializer(item["affectedGroupsSummary"]),
    errors: !item["errors"]
      ? item["errors"]
      : item["errors"].map((p: any) => {
          return p;
        }),
  };
}

export function assetChainKindSummaryResultArrayDeserializer(
  result: Array<AssetChainKindSummaryResult>,
): any[] {
  return result.map((item) => {
    return assetChainKindSummaryResultDeserializer(item);
  });
}

/** A list of asset chain summaries per asset kind */
export interface AssetChainKindSummaryResult {
  /** The kind of asset */
  kind: AssetKind;
  /** The amount of assets affected for a given asset kind */
  affectedCount: number;
}

export function assetChainKindSummaryResultDeserializer(item: any): AssetChainKindSummaryResult {
  return {
    kind: item["kind"],
    affectedCount: item["affectedCount"],
  };
}

/** The kind of asset. */
export type AssetKind =
  | "as"
  | "contact"
  | "domain"
  | "host"
  | "ipAddress"
  | "ipBlock"
  | "page"
  | "sslCert";

export function discoGroupSummaryResultArrayDeserializer(
  result: Array<DiscoGroupSummaryResult>,
): any[] {
  return result.map((item) => {
    return discoGroupSummaryResultDeserializer(item);
  });
}

/** A list of disco group summaries */
export interface DiscoGroupSummaryResult {
  /** The system generated unique id for the resource. */
  id: string;
  /** The caller provided unique name for the resource. */
  name: string;
  /** The name that can be used for display purposes. */
  displayName: string;
}

export function discoGroupSummaryResultDeserializer(item: any): DiscoGroupSummaryResult {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
  };
}

/** Paged collection of DiscoTemplate items */
export interface _PagedDiscoTemplate {
  /** The DiscoTemplate items on this page */
  value: DiscoTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedDiscoTemplateDeserializer(item: any): _PagedDiscoTemplate {
  return {
    value: discoTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function discoTemplateArrayDeserializer(result: Array<DiscoTemplate>): any[] {
  return result.map((item) => {
    return discoTemplateDeserializer(item);
  });
}

/** The items in the current page of results. */
export interface DiscoTemplate {
  /** The system generated unique id for the resource. */
  readonly id: string;
  /** The caller provided unique name for the resource. */
  name?: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  /** The name of the industry. */
  industry?: string;
  /** The name of the region. */
  region?: string;
  /** The country code. */
  countryCode?: string;
  /** The state code. */
  stateCode?: string;
  /** The name of the city. */
  city?: string;
  /** The list of disco template seeds. */
  seeds?: DiscoSource[];
  /** The list of disco template names. */
  names?: string[];
}

export function discoTemplateDeserializer(item: any): DiscoTemplate {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    industry: item["industry"],
    region: item["region"],
    countryCode: item["countryCode"],
    stateCode: item["stateCode"],
    city: item["city"],
    seeds: !item["seeds"] ? item["seeds"] : discoSourceArrayDeserializer(item["seeds"]),
    names: !item["names"]
      ? item["names"]
      : item["names"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface ReportBillableAssetSummaryResult */
export interface ReportBillableAssetSummaryResult {
  assetSummaries?: ReportBillableAssetSnapshotResult[];
}

export function reportBillableAssetSummaryResultDeserializer(
  item: any,
): ReportBillableAssetSummaryResult {
  return {
    assetSummaries: !item["assetSummaries"]
      ? item["assetSummaries"]
      : reportBillableAssetSnapshotResultArrayDeserializer(item["assetSummaries"]),
  };
}

export function reportBillableAssetSnapshotResultArrayDeserializer(
  result: Array<ReportBillableAssetSnapshotResult>,
): any[] {
  return result.map((item) => {
    return reportBillableAssetSnapshotResultDeserializer(item);
  });
}

/** model interface ReportBillableAssetSnapshotResult */
export interface ReportBillableAssetSnapshotResult {
  /** The date these assets were billed on. */
  date?: Date;
  /** The total number of billable assets for this date. */
  total?: number;
  /** The breakdown of billable asset counts for each asset type. */
  assetBreakdown?: ReportBillableAssetBreakdown[];
}

export function reportBillableAssetSnapshotResultDeserializer(
  item: any,
): ReportBillableAssetSnapshotResult {
  return {
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    total: item["total"],
    assetBreakdown: !item["assetBreakdown"]
      ? item["assetBreakdown"]
      : reportBillableAssetBreakdownArrayDeserializer(item["assetBreakdown"]),
  };
}

export function reportBillableAssetBreakdownArrayDeserializer(
  result: Array<ReportBillableAssetBreakdown>,
): any[] {
  return result.map((item) => {
    return reportBillableAssetBreakdownDeserializer(item);
  });
}

/** The breakdown of billable asset counts for each asset type. */
export interface ReportBillableAssetBreakdown {
  /** The kind of billable asset. */
  kind?: ReportBillableAssetBreakdownKind;
  /** The number of assets of this type. */
  count?: number;
}

export function reportBillableAssetBreakdownDeserializer(item: any): ReportBillableAssetBreakdown {
  return {
    kind: item["kind"],
    count: item["count"],
  };
}

/** The kind of billable asset. */
export type ReportBillableAssetBreakdownKind = "domain" | "host" | "ipAddress";

/** A request body used to retrieve an asset report snapshot. */
export interface ReportAssetSnapshotRequest {
  /** The metric to retrieve a snapshot for. */
  metric?: string;
  /** The name of the label to retrieve a snapshot for. */
  labelName?: string;
  /** The number of assets per page. */
  size?: number;
  /** The page to retrieve. */
  page?: number;
}

export function reportAssetSnapshotRequestSerializer(item: ReportAssetSnapshotRequest): any {
  return {
    metric: item["metric"],
    labelName: item["labelName"],
    size: item["size"],
    page: item["page"],
  };
}

/** A snapshot of assets captured daily for the provided metric.  Asset details only contain primary properties.  Detailed asset data can be retrieved from the asset endpoints. */
export interface ReportAssetSnapshotResult {
  /** The name of the metric. */
  displayName?: string;
  /** The unique metric name. */
  metric?: string;
  /** The customer label that was filtered on, if one was provided. */
  labelName?: string;
  /** The last time this asset data was updated on this metric. */
  updatedAt?: Date;
  /** A description of what the metric represents. */
  description?: string;
  /** The page of assets that match the provided metric. */
  assets?: AssetPageResult;
}

export function reportAssetSnapshotResultDeserializer(item: any): ReportAssetSnapshotResult {
  return {
    displayName: item["displayName"],
    metric: item["metric"],
    labelName: item["labelName"],
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    description: item["description"],
    assets: !item["assets"] ? item["assets"] : assetPageResultDeserializer(item["assets"]),
  };
}

/** The page of assets that match the provided metric. */
export interface AssetPageResult {
  /** The total number of items available in the full result set. */
  totalElements?: number;
  /** The cursor mark to be used on the next request.  Not set if using paging. */
  mark?: string;
  /** The link to access the next page of results.  Not set if at the end of the result set. */
  nextLink?: string;
  /** The items in the current page of results. */
  value?: AssetResourceUnion[];
}

export function assetPageResultDeserializer(item: any): AssetPageResult {
  return {
    totalElements: item["totalElements"],
    mark: item["mark"],
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : assetResourceUnionArrayDeserializer(item["value"]),
  };
}

/** A request body used to retrieve summary asset information. One and only one collection of summary identifiers must be provided: filters, metrics, or metricCategories. */
export interface ReportAssetSummaryRequest {
  /** Categories to retrieve risk reporting data for. */
  metricCategories?: string[];
  /** Metrics to retrieve risk reporting data for. */
  metrics?: string[];
  /** Query filters to apply to the asset summary. */
  filters?: string[];
  /** A parameter to group the assets by (first level facet field), only used when the chosen summary identifier is filters. */
  groupBy?: string;
  /** A parameter to segment the assets by (second level facet field), only used when the chosen summary identifier is filters. */
  segmentBy?: string;
  /** Currently unused. */
  labelName?: string;
}

export function reportAssetSummaryRequestSerializer(item: ReportAssetSummaryRequest): any {
  return {
    metricCategories: !item["metricCategories"]
      ? item["metricCategories"]
      : item["metricCategories"].map((p: any) => {
          return p;
        }),
    metrics: !item["metrics"]
      ? item["metrics"]
      : item["metrics"].map((p: any) => {
          return p;
        }),
    filters: !item["filters"]
      ? item["filters"]
      : item["filters"].map((p: any) => {
          return p;
        }),
    groupBy: item["groupBy"],
    segmentBy: item["segmentBy"],
    labelName: item["labelName"],
  };
}

/** model interface ReportAssetSummaryResult */
export interface ReportAssetSummaryResult {
  /** The collection of asset summaries. */
  assetSummaries?: AssetSummaryResult[];
}

export function reportAssetSummaryResultDeserializer(item: any): ReportAssetSummaryResult {
  return {
    assetSummaries: !item["assetSummaries"]
      ? item["assetSummaries"]
      : assetSummaryResultArrayDeserializer(item["assetSummaries"]),
  };
}

export function assetSummaryResultArrayDeserializer(result: Array<AssetSummaryResult>): any[] {
  return result.map((item) => {
    return assetSummaryResultDeserializer(item);
  });
}

/** The collection of asset summaries. */
export interface AssetSummaryResult {
  /** The name of the summary response.  Depending on the request time this will either be the asset filter, risk category, or risk metric. */
  displayName?: string;
  /** The description of the summary response.  Filters don't have a description. */
  description?: string;
  /** The last time risk categories or risk metrics were captured. Set to the current time for asset filter requests, which always pull the live asset data. */
  updatedAt?: Date;
  /** If the request is for a metric category, this will contain the requested unique category name. */
  metricCategory?: string;
  /** If the request is for a metric, this will contain the requested unique metric name. */
  metric?: string;
  /** If the request is for an asset filter, this will contain the corresponding filter. */
  filter?: string;
  /** An optional label used to filter requests results. */
  labelName?: string;
  /** The count of assets matching the request parameters. */
  count?: number;
  /** The link to the corresponding asset details. */
  link?: string;
  /** The corresponding child entities.  For metric categories this will contain metrics.  For filters with groupBy and segmentBy this will contain facets. */
  children?: AssetSummaryResult[];
}

export function assetSummaryResultDeserializer(item: any): AssetSummaryResult {
  return {
    displayName: item["displayName"],
    description: item["description"],
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    metricCategory: item["metricCategory"],
    metric: item["metric"],
    filter: item["filter"],
    labelName: item["labelName"],
    count: item["count"],
    link: item["link"],
    children: !item["children"]
      ? item["children"]
      : assetSummaryResultArrayDeserializer(item["children"]),
  };
}

/** A request body used for an asset report snapshot export. */
export interface ReportAssetSnapshotExportRequest {
  /** The metric to retrieve a snapshot for. */
  metric?: string;
  /** The filename of the exported file. */
  fileName?: string;
  /** The columns to include in the export */
  columns?: string[];
}

export function reportAssetSnapshotExportRequestSerializer(
  item: ReportAssetSnapshotExportRequest,
): any {
  return {
    metric: item["metric"],
    fileName: item["fileName"],
    columns: !item["columns"]
      ? item["columns"]
      : item["columns"].map((p: any) => {
          return p;
        }),
  };
}

/** Paged collection of SavedFilter items */
export interface _PagedSavedFilter {
  /** The SavedFilter items on this page */
  value: SavedFilter[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedSavedFilterDeserializer(item: any): _PagedSavedFilter {
  return {
    value: savedFilterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function savedFilterArrayDeserializer(result: Array<SavedFilter>): any[] {
  return result.map((item) => {
    return savedFilterDeserializer(item);
  });
}

/** model interface SavedFilter */
export interface SavedFilter {
  /** This is typically the same as the name but might be different for different models. */
  id?: string;
  /** The caller provided unique name for the resource. */
  readonly name: string;
  /** The name that can be used for display purposes. */
  displayName?: string;
  filter?: string;
  description?: string;
}

export function savedFilterDeserializer(item: any): SavedFilter {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    filter: item["filter"],
    description: item["description"],
  };
}

/** A request body used to create a saved filter. */
export interface SavedFilterData {
  /** An expression on the resource type that selects the resources to be returned. */
  filter: string;
  /** A human readable description of the saved filter. */
  description: string;
}

export function savedFilterDataSerializer(item: SavedFilterData): any {
  return { filter: item["filter"], description: item["description"] };
}

/** Paged collection of Task items */
export interface _PagedTask {
  /** The Task items on this page */
  value: Task[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedTaskDeserializer(item: any): _PagedTask {
  return {
    value: taskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function taskArrayDeserializer(result: Array<Task>): any[] {
  return result.map((item) => {
    return taskDeserializer(item);
  });
}

/** Paged collection of CisaCveResult items */
export interface _PagedCisaCveResult {
  /** The CisaCveResult items on this page */
  value: CisaCveResult[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedCisaCveResultDeserializer(item: any): _PagedCisaCveResult {
  return {
    value: cisaCveResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function cisaCveResultArrayDeserializer(result: Array<CisaCveResult>): any[] {
  return result.map((item) => {
    return cisaCveResultDeserializer(item);
  });
}

/** cisa cve in a given workspace. */
export interface CisaCveResult {
  /** The CVE ID of the vulnerability in the format CVE-YYYY-NNNN, note that the number portion can have more than 4 digits. */
  readonly cveId: string;
  /** The vendor or project name for the vulnerability. */
  vendorProject: string;
  /** The vulnerability product */
  product: string;
  /** The name of the vulnerability */
  vulnerabilityName: string;
  /** A short description of the vulnerability */
  shortDescription: string;
  /** The required action to address the vulnerability */
  requiredAction: string;
  /** Any additional notes about the vulnerability */
  notes: string;
  /** The date the vulnerability was added to the catalog in the format YYYY-MM-DD */
  dateAdded: Date;
  /** The date the required action is due in the format YYYY-MM-DD */
  dueDate: Date;
  /** The date the vulnerability was updated */
  updatedAt: Date;
  /** The number of assets affected by the vulnerability */
  count: number;
}

export function cisaCveResultDeserializer(item: any): CisaCveResult {
  return {
    cveId: item["cveId"],
    vendorProject: item["vendorProject"],
    product: item["product"],
    vulnerabilityName: item["vulnerabilityName"],
    shortDescription: item["shortDescription"],
    requiredAction: item["requiredAction"],
    notes: item["notes"],
    dateAdded: new Date(item["dateAdded"]),
    dueDate: new Date(item["dueDate"]),
    updatedAt: new Date(item["updatedAt"]),
    count: item["count"],
  };
}

/** Paged collection of Policy items */
export interface _PagedPolicy {
  /** The Policy items on this page */
  value: Policy[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total number of items available in the full result set. */
  totalElements?: number;
}

export function _pagedPolicyDeserializer(item: any): _PagedPolicy {
  return {
    value: policyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalElements: item["totalElements"],
  };
}

export function policyArraySerializer(result: Array<Policy>): any[] {
  return result.map((item) => {
    return policySerializer(item);
  });
}

export function policyArrayDeserializer(result: Array<Policy>): any[] {
  return result.map((item) => {
    return policyDeserializer(item);
  });
}

/** This is an object that exists to provide a common schema definition for the policy response. */
export interface Policy {
  /** This is typically the same as the name but might be different for different models. */
  readonly id?: string;
  /** The caller provided unique name for the resource. */
  readonly name: string;
  /** The name that can be used for display purposes. */
  readonly displayName?: string;
  /** A human readable description of what the policy should do. */
  description?: string;
  /** Name of the saved filter query to be used to select assets that are to be updated by a given policy. */
  filterName: string;
  /** Action specifying what the policy should do. */
  action: PolicyAction;
  /** Number of assets in inventory that have been updated by this policy. */
  readonly updatedAssetsCount?: number;
  /** The unique name of the user that created the policy user@gmail.com */
  readonly user?: string;
  /** The date this policy was created, in RFC3339 format. */
  readonly createdDate?: Date;
  /** The date this policy was last updated, in RFC3339 format. */
  readonly updatedDate?: Date;
  /** Additional parameters needed to perform the policy action. */
  actionParameters: ActionParameters;
}

export function policySerializer(item: Policy): any {
  return {
    description: item["description"],
    filterName: item["filterName"],
    action: item["action"],
    actionParameters: actionParametersSerializer(item["actionParameters"]),
  };
}

export function policyDeserializer(item: any): Policy {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    description: item["description"],
    filterName: item["filterName"],
    action: item["action"],
    updatedAssetsCount: item["updatedAssetsCount"],
    user: item["user"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    updatedDate: !item["updatedDate"] ? item["updatedDate"] : new Date(item["updatedDate"]),
    actionParameters: actionParametersDeserializer(item["actionParameters"]),
  };
}

/** A list of policy actions */
export type PolicyAction =
  | "addResource"
  | "removeResource"
  | "setState"
  | "setExternalID"
  | "removeFromInventory";

/** This is an object that exists to provide a common schema definition for the action parameters. */
export interface ActionParameters {
  /**
   * The value parameter that is used by the policy action. This is action specific,
   * for further information please refer to documentation here:
   * https://learn.microsoft.com/en-us/azure/external-attack-surface-management/policy-engine
   */
  value?: string;
}

export function actionParametersSerializer(item: ActionParameters): any {
  return { value: item["value"] };
}

export function actionParametersDeserializer(item: any): ActionParameters {
  return {
    value: item["value"],
  };
}

/** A list of asset response type */
export type AssetResponseType = "id" | "standard" | "full" | "reduced";

/** The EASM Defender service version. */
export enum KnownVersions {
  /** Version 2023-03-01-preview */
  V20230301Preview = "2023-03-01-preview",
  /** Version 2024-03-01-preview */
  V20240301Preview = "2024-03-01-preview",
  /** Version 2024-10-01-preview */
  V20241001Preview = "2024-10-01-preview",
}
