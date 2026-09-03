// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Information about a domain. */
export interface Domain extends TrackedResource {
  /** Kind of resource */
  kind?: string;
  /** Administrative contact. */
  contactAdmin?: Contact;
  /** Billing contact. */
  contactBilling?: Contact;
  /** Registrant contact. */
  contactRegistrant?: Contact;
  /** Technical contact. */
  contactTech?: Contact;
  /** Domain registration status. */
  readonly registrationStatus?: DomainStatus;
  /** Domain provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Name servers. */
  readonly nameServers?: string[];
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** Domain creation timestamp. */
  readonly createdTime?: Date;
  /** Domain expiration timestamp. */
  readonly expirationTime?: Date;
  /** Timestamp when the domain was renewed last time. */
  readonly lastRenewedTime?: Date;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** <code>true</code> if Azure can assign this domain to App Service apps; otherwise, <code>false</code>. This value will be <code>true</code> if domain registration status is active and \n it is hosted on name servers Azure has programmatic access to. */
  readonly readyForDnsRecordManagement?: boolean;
  /** All hostnames derived from the domain and assigned to Azure resources. */
  readonly managedHostNames?: HostName[];
  /** Legal agreement consent. */
  consent?: DomainPurchaseConsent;
  /** Reasons why domain is not renewable. */
  readonly domainNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Current DNS type */
  dnsType?: DnsType;
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: DnsType;
  /** Authorization code for the domain. */
  authCode?: string;
}

export function domainSerializer(item: Domain): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "contactAdmin",
      "contactBilling",
      "contactRegistrant",
      "contactTech",
      "privacy",
      "autoRenew",
      "consent",
      "dnsType",
      "dnsZoneId",
      "targetDnsType",
      "authCode",
    ])
      ? undefined
      : _domainPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function domainDeserializer(item: any): Domain {
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
      : _domainPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Domain resource specific properties */
export interface DomainProperties {
  /** Administrative contact. */
  contactAdmin: Contact;
  /** Billing contact. */
  contactBilling: Contact;
  /** Registrant contact. */
  contactRegistrant: Contact;
  /** Technical contact. */
  contactTech: Contact;
  /** Domain registration status. */
  readonly registrationStatus?: DomainStatus;
  /** Domain provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Name servers. */
  readonly nameServers?: string[];
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** Domain creation timestamp. */
  readonly createdTime?: Date;
  /** Domain expiration timestamp. */
  readonly expirationTime?: Date;
  /** Timestamp when the domain was renewed last time. */
  readonly lastRenewedTime?: Date;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** <code>true</code> if Azure can assign this domain to App Service apps; otherwise, <code>false</code>. This value will be <code>true</code> if domain registration status is active and \n it is hosted on name servers Azure has programmatic access to. */
  readonly readyForDnsRecordManagement?: boolean;
  /** All hostnames derived from the domain and assigned to Azure resources. */
  readonly managedHostNames?: HostName[];
  /** Legal agreement consent. */
  consent: DomainPurchaseConsent;
  /** Reasons why domain is not renewable. */
  readonly domainNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Current DNS type */
  dnsType?: DnsType;
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: DnsType;
  /** Authorization code for the domain. */
  authCode?: string;
}

export function domainPropertiesSerializer(item: DomainProperties): any {
  return {
    contactAdmin: contactSerializer(item["contactAdmin"]),
    contactBilling: contactSerializer(item["contactBilling"]),
    contactRegistrant: contactSerializer(item["contactRegistrant"]),
    contactTech: contactSerializer(item["contactTech"]),
    privacy: item["privacy"],
    autoRenew: item["autoRenew"],
    consent: domainPurchaseConsentSerializer(item["consent"]),
    dnsType: item["dnsType"],
    dnsZoneId: item["dnsZoneId"],
    targetDnsType: item["targetDnsType"],
    authCode: item["authCode"],
  };
}

export function domainPropertiesDeserializer(item: any): DomainProperties {
  return {
    contactAdmin: contactDeserializer(item["contactAdmin"]),
    contactBilling: contactDeserializer(item["contactBilling"]),
    contactRegistrant: contactDeserializer(item["contactRegistrant"]),
    contactTech: contactDeserializer(item["contactTech"]),
    registrationStatus: item["registrationStatus"],
    provisioningState: item["provisioningState"],
    nameServers: !item["nameServers"]
      ? item["nameServers"]
      : item["nameServers"].map((p: any) => {
          return p;
        }),
    privacy: item["privacy"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    lastRenewedTime: !item["lastRenewedTime"]
      ? item["lastRenewedTime"]
      : new Date(item["lastRenewedTime"]),
    autoRenew: item["autoRenew"],
    readyForDnsRecordManagement: item["readyForDnsRecordManagement"],
    managedHostNames: !item["managedHostNames"]
      ? item["managedHostNames"]
      : hostNameArrayDeserializer(item["managedHostNames"]),
    consent: domainPurchaseConsentDeserializer(item["consent"]),
    domainNotRenewableReasons: !item["domainNotRenewableReasons"]
      ? item["domainNotRenewableReasons"]
      : item["domainNotRenewableReasons"].map((p: any) => {
          return p;
        }),
    dnsType: item["dnsType"],
    dnsZoneId: item["dnsZoneId"],
    targetDnsType: item["targetDnsType"],
    authCode: item["authCode"],
  };
}

/**
 * Contact information for domain registration. If 'Domain Privacy' option is not selected then the contact information is made publicly available through the Whois
 * directories as per ICANN requirements.
 */
export interface Contact {
  /** Mailing address. */
  addressMailing?: Address;
  /** Email address. */
  email: string;
  /** Fax number. */
  fax?: string;
  /** Job title. */
  jobTitle?: string;
  /** First name. */
  nameFirst: string;
  /** Last name. */
  nameLast: string;
  /** Middle name. */
  nameMiddle?: string;
  /** Organization contact belongs to. */
  organization?: string;
  /** Phone number. */
  phone: string;
}

export function contactSerializer(item: Contact): any {
  return {
    addressMailing: !item["addressMailing"]
      ? item["addressMailing"]
      : addressSerializer(item["addressMailing"]),
    email: item["email"],
    fax: item["fax"],
    jobTitle: item["jobTitle"],
    nameFirst: item["nameFirst"],
    nameLast: item["nameLast"],
    nameMiddle: item["nameMiddle"],
    organization: item["organization"],
    phone: item["phone"],
  };
}

export function contactDeserializer(item: any): Contact {
  return {
    addressMailing: !item["addressMailing"]
      ? item["addressMailing"]
      : addressDeserializer(item["addressMailing"]),
    email: item["email"],
    fax: item["fax"],
    jobTitle: item["jobTitle"],
    nameFirst: item["nameFirst"],
    nameLast: item["nameLast"],
    nameMiddle: item["nameMiddle"],
    organization: item["organization"],
    phone: item["phone"],
  };
}

/** Address information for domain registration. */
export interface Address {
  /** First line of an Address. */
  address1: string;
  /** The second line of the Address. Optional. */
  address2?: string;
  /** The city for the address. */
  city: string;
  /** The country for the address. */
  country: string;
  /** The postal code for the address. */
  postalCode: string;
  /** The state or province for the address. */
  state: string;
}

export function addressSerializer(item: Address): any {
  return {
    address1: item["address1"],
    address2: item["address2"],
    city: item["city"],
    country: item["country"],
    postalCode: item["postalCode"],
    state: item["state"],
  };
}

export function addressDeserializer(item: any): Address {
  return {
    address1: item["address1"],
    address2: item["address2"],
    city: item["city"],
    country: item["country"],
    postalCode: item["postalCode"],
    state: item["state"],
  };
}

/** Domain registration status. */
export type DomainStatus =
  | "Active"
  | "Awaiting"
  | "Cancelled"
  | "Confiscated"
  | "Disabled"
  | "Excluded"
  | "Expired"
  | "Failed"
  | "Held"
  | "Locked"
  | "Parked"
  | "Pending"
  | "Reserved"
  | "Reverted"
  | "Suspended"
  | "Transferred"
  | "Unknown"
  | "Unlocked"
  | "Unparked"
  | "Updated"
  | "JsonConverterFailed";
/** Domain provisioning state. */
export type ProvisioningState = "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";

export function hostNameArrayDeserializer(result: Array<HostName>): any[] {
  return result.map((item) => {
    return hostNameDeserializer(item);
  });
}

/** Details of a hostname derived from a domain. */
export interface HostName {
  /** Name of the hostname. */
  name?: string;
  /** List of apps the hostname is assigned to. This list will have more than one app only if the hostname is pointing to a Traffic Manager. */
  siteNames?: string[];
  /** Name of the Azure resource the hostname is assigned to. If it is assigned to a Traffic Manager then it will be the Traffic Manager name otherwise it will be the app name. */
  azureResourceName?: string;
  /** Type of the Azure resource the hostname is assigned to. */
  azureResourceType?: AzureResourceType;
  /** Type of the DNS record. */
  customHostNameDnsRecordType?: CustomHostNameDnsRecordType;
  /** Type of the hostname. */
  hostNameType?: HostNameType;
}

export function hostNameDeserializer(item: any): HostName {
  return {
    name: item["name"],
    siteNames: !item["siteNames"]
      ? item["siteNames"]
      : item["siteNames"].map((p: any) => {
          return p;
        }),
    azureResourceName: item["azureResourceName"],
    azureResourceType: item["azureResourceType"],
    customHostNameDnsRecordType: item["customHostNameDnsRecordType"],
    hostNameType: item["hostNameType"],
  };
}

/** Type of the Azure resource the hostname is assigned to. */
export type AzureResourceType = "Website" | "TrafficManager";
/** Type of the DNS record. */
export type CustomHostNameDnsRecordType = "CName" | "A";
/** Type of the hostname. */
export type HostNameType = "Verified" | "Managed";

/** Domain purchase consent object, representing acceptance of applicable legal agreements. */
export interface DomainPurchaseConsent {
  /** List of applicable legal agreement keys. This list can be retrieved using ListLegalAgreements API under <code>TopLevelDomain</code> resource. */
  agreementKeys?: string[];
  /** Client IP address. */
  agreedBy?: string;
  /** Timestamp when the agreements were accepted. */
  agreedAt?: Date;
}

export function domainPurchaseConsentSerializer(item: DomainPurchaseConsent): any {
  return {
    agreementKeys: !item["agreementKeys"]
      ? item["agreementKeys"]
      : item["agreementKeys"].map((p: any) => {
          return p;
        }),
    agreedBy: item["agreedBy"],
    agreedAt: !item["agreedAt"] ? item["agreedAt"] : item["agreedAt"].toISOString(),
  };
}

export function domainPurchaseConsentDeserializer(item: any): DomainPurchaseConsent {
  return {
    agreementKeys: !item["agreementKeys"]
      ? item["agreementKeys"]
      : item["agreementKeys"].map((p: any) => {
          return p;
        }),
    agreedBy: item["agreedBy"],
    agreedAt: !item["agreedAt"] ? item["agreedAt"] : new Date(item["agreedAt"]),
  };
}

/** Reasons why domain is not renewable. */
export enum KnownResourceNotRenewableReason {
  /** Registration status is not supported for renewal. */
  RegistrationStatusNotSupportedForRenewal = "RegistrationStatusNotSupportedForRenewal",
  /** Domain expiration is not in the renewal time range. */
  ExpirationNotInRenewalTimeRange = "ExpirationNotInRenewalTimeRange",
  /** Subscription is not active. */
  SubscriptionNotActive = "SubscriptionNotActive",
}

/**
 * Reasons why domain is not renewable. \
 * {@link KnownResourceNotRenewableReason} can be used interchangeably with ResourceNotRenewableReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RegistrationStatusNotSupportedForRenewal**: Registration status is not supported for renewal. \
 * **ExpirationNotInRenewalTimeRange**: Domain expiration is not in the renewal time range. \
 * **SubscriptionNotActive**: Subscription is not active.
 */
export type ResourceNotRenewableReason = string;
/** Current DNS type */
export type DnsType = "AzureDns" | "DefaultDomainRegistrarDns";

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

/** App Service error response. */
export interface DefaultErrorResponse {
  /** Error model. */
  readonly error?: DefaultErrorResponseError;
}

export function defaultErrorResponseDeserializer(item: any): DefaultErrorResponse {
  return {
    error: !item["error"] ? item["error"] : defaultErrorResponseErrorDeserializer(item["error"]),
  };
}

/** Error model. */
export interface DefaultErrorResponseError {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
  /** Error details. */
  details?: DefaultErrorResponseErrorDetailsItem[];
  /** More information to debug error. */
  readonly innererror?: string;
}

export function defaultErrorResponseErrorDeserializer(item: any): DefaultErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : defaultErrorResponseErrorDetailsItemArrayDeserializer(item["details"]),
    innererror: item["innererror"],
  };
}

export function defaultErrorResponseErrorDetailsItemArrayDeserializer(
  result: Array<DefaultErrorResponseErrorDetailsItem>,
): any[] {
  return result.map((item) => {
    return defaultErrorResponseErrorDetailsItemDeserializer(item);
  });
}

/** Detailed errors. */
export interface DefaultErrorResponseErrorDetailsItem {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
}

export function defaultErrorResponseErrorDetailsItemDeserializer(
  item: any,
): DefaultErrorResponseErrorDetailsItem {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** ARM resource for a domain. */
export interface DomainPatchResource extends ProxyOnlyResource {
  /** Administrative contact. */
  contactAdmin?: Contact;
  /** Billing contact. */
  contactBilling?: Contact;
  /** Registrant contact. */
  contactRegistrant?: Contact;
  /** Technical contact. */
  contactTech?: Contact;
  /** Domain registration status. */
  readonly registrationStatus?: DomainStatus;
  /** Domain provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Name servers. */
  readonly nameServers?: string[];
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** Domain creation timestamp. */
  readonly createdTime?: Date;
  /** Domain expiration timestamp. */
  readonly expirationTime?: Date;
  /** Timestamp when the domain was renewed last time. */
  readonly lastRenewedTime?: Date;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** <code>true</code> if Azure can assign this domain to App Service apps; otherwise, <code>false</code>. This value will be <code>true</code> if domain registration status is active and \n it is hosted on name servers Azure has programmatic access to. */
  readonly readyForDnsRecordManagement?: boolean;
  /** All hostnames derived from the domain and assigned to Azure resources. */
  readonly managedHostNames?: HostName[];
  /** Legal agreement consent. */
  consent?: DomainPurchaseConsent;
  /** Reasons why domain is not renewable. */
  readonly domainNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Current DNS type */
  dnsType?: DnsType;
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: DnsType;
  /** Authorization code for the domain. */
  authCode?: string;
}

export function domainPatchResourceSerializer(item: DomainPatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "contactAdmin",
      "contactBilling",
      "contactRegistrant",
      "contactTech",
      "privacy",
      "autoRenew",
      "consent",
      "dnsType",
      "dnsZoneId",
      "targetDnsType",
      "authCode",
    ])
      ? undefined
      : _domainPatchResourcePropertiesSerializer(item),
  };
}

/** DomainPatchResource resource specific properties */
export interface DomainPatchResourceProperties {
  /** Administrative contact. */
  contactAdmin: Contact;
  /** Billing contact. */
  contactBilling: Contact;
  /** Registrant contact. */
  contactRegistrant: Contact;
  /** Technical contact. */
  contactTech: Contact;
  /** Domain registration status. */
  readonly registrationStatus?: DomainStatus;
  /** Domain provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Name servers. */
  readonly nameServers?: string[];
  /** <code>true</code> if domain privacy is enabled for this domain; otherwise, <code>false</code>. */
  privacy?: boolean;
  /** Domain creation timestamp. */
  readonly createdTime?: Date;
  /** Domain expiration timestamp. */
  readonly expirationTime?: Date;
  /** Timestamp when the domain was renewed last time. */
  readonly lastRenewedTime?: Date;
  /** <code>true</code> if the domain should be automatically renewed; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** <code>true</code> if Azure can assign this domain to App Service apps; otherwise, <code>false</code>. This value will be <code>true</code> if domain registration status is active and \n it is hosted on name servers Azure has programmatic access to. */
  readonly readyForDnsRecordManagement?: boolean;
  /** All hostnames derived from the domain and assigned to Azure resources. */
  readonly managedHostNames?: HostName[];
  /** Legal agreement consent. */
  consent: DomainPurchaseConsent;
  /** Reasons why domain is not renewable. */
  readonly domainNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Current DNS type */
  dnsType?: DnsType;
  /** Azure DNS Zone to use */
  dnsZoneId?: string;
  /** Target DNS type (would be used for migration) */
  targetDnsType?: DnsType;
  /** Authorization code for the domain. */
  authCode?: string;
}

export function domainPatchResourcePropertiesSerializer(item: DomainPatchResourceProperties): any {
  return {
    contactAdmin: contactSerializer(item["contactAdmin"]),
    contactBilling: contactSerializer(item["contactBilling"]),
    contactRegistrant: contactSerializer(item["contactRegistrant"]),
    contactTech: contactSerializer(item["contactTech"]),
    privacy: item["privacy"],
    autoRenew: item["autoRenew"],
    consent: domainPurchaseConsentSerializer(item["consent"]),
    dnsType: item["dnsType"],
    dnsZoneId: item["dnsZoneId"],
    targetDnsType: item["targetDnsType"],
    authCode: item["authCode"],
  };
}

/** Azure proxy only resource. This resource is not tracked by Azure Resource Manager. */
export interface ProxyOnlyResource {
  /** Resource Id. */
  readonly id?: string;
  /** Resource Name. */
  readonly name?: string;
  /** Kind of resource. */
  kind?: string;
  /** Resource type. */
  readonly type?: string;
}

export function proxyOnlyResourceSerializer(item: ProxyOnlyResource): any {
  return { kind: item["kind"] };
}

/** Collection of domains. */
export interface _DomainCollection {
  /** The Domain items on this page */
  value: Domain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _domainCollectionDeserializer(item: any): _DomainCollection {
  return {
    value: domainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function domainArraySerializer(result: Array<Domain>): any[] {
  return result.map((item) => {
    return domainSerializer(item);
  });
}

export function domainArrayDeserializer(result: Array<Domain>): any[] {
  return result.map((item) => {
    return domainDeserializer(item);
  });
}

/** Domain ownership Identifier. */
export interface DomainOwnershipIdentifier extends ProxyResource {
  /** Kind of resource */
  kind?: string;
  /** Ownership Id. */
  ownershipId?: string;
}

export function domainOwnershipIdentifierSerializer(item: DomainOwnershipIdentifier): any {
  return {
    properties: areAllPropsUndefined(item, ["ownershipId"])
      ? undefined
      : _domainOwnershipIdentifierPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function domainOwnershipIdentifierDeserializer(item: any): DomainOwnershipIdentifier {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _domainOwnershipIdentifierPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** DomainOwnershipIdentifier resource specific properties */
export interface DomainOwnershipIdentifierProperties {
  /** Ownership Id. */
  ownershipId?: string;
}

export function domainOwnershipIdentifierPropertiesSerializer(
  item: DomainOwnershipIdentifierProperties,
): any {
  return { ownershipId: item["ownershipId"] };
}

export function domainOwnershipIdentifierPropertiesDeserializer(
  item: any,
): DomainOwnershipIdentifierProperties {
  return {
    ownershipId: item["ownershipId"],
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

/** Collection of domain ownership identifiers. */
export interface _DomainOwnershipIdentifierCollection {
  /** The DomainOwnershipIdentifier items on this page */
  value: DomainOwnershipIdentifier[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _domainOwnershipIdentifierCollectionDeserializer(
  item: any,
): _DomainOwnershipIdentifierCollection {
  return {
    value: domainOwnershipIdentifierArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function domainOwnershipIdentifierArraySerializer(
  result: Array<DomainOwnershipIdentifier>,
): any[] {
  return result.map((item) => {
    return domainOwnershipIdentifierSerializer(item);
  });
}

export function domainOwnershipIdentifierArrayDeserializer(
  result: Array<DomainOwnershipIdentifier>,
): any[] {
  return result.map((item) => {
    return domainOwnershipIdentifierDeserializer(item);
  });
}

/** Identifies an object. */
export interface NameIdentifier {
  /** Name of the object. */
  name?: string;
}

export function nameIdentifierSerializer(item: NameIdentifier): any {
  return { name: item["name"] };
}

export function nameIdentifierDeserializer(item: any): NameIdentifier {
  return {
    name: item["name"],
  };
}

/** Domain availability check result. */
export interface DomainAvailabilityCheckResult {
  /** Name of the domain. */
  name?: string;
  /** <code>true</code> if domain can be purchased using CreateDomain API; otherwise, <code>false</code>. */
  available?: boolean;
  /** Valid values are Regular domain: Azure will charge the full price of domain registration, SoftDeleted: Purchasing this domain will simply restore it and this operation will not cost anything. */
  domainType?: DomainType;
}

export function domainAvailabilityCheckResultDeserializer(
  item: any,
): DomainAvailabilityCheckResult {
  return {
    name: item["name"],
    available: item["available"],
    domainType: item["domainType"],
  };
}

/** Valid values are Regular domain: Azure will charge the full price of domain registration, SoftDeleted: Purchasing this domain will simply restore it and this operation will not cost anything. */
export type DomainType = "Regular" | "SoftDeleted";

/** Single sign-on request information for domain management. */
export interface DomainControlCenterSsoRequest {
  /** URL where the single sign-on request is to be made. */
  readonly url?: string;
  /** Post parameter key. */
  readonly postParameterKey?: string;
  /** Post parameter value. Client should use 'application/x-www-form-urlencoded' encoding for this value. */
  readonly postParameterValue?: string;
}

export function domainControlCenterSsoRequestDeserializer(
  item: any,
): DomainControlCenterSsoRequest {
  return {
    url: item["url"],
    postParameterKey: item["postParameterKey"],
    postParameterValue: item["postParameterValue"],
  };
}

/** Domain recommendation search parameters. */
export interface DomainRecommendationSearchParameters {
  /** Keywords to be used for generating domain recommendations. */
  keywords?: string;
  /** Maximum number of recommendations. */
  maxDomainRecommendations?: number;
}

export function domainRecommendationSearchParametersSerializer(
  item: DomainRecommendationSearchParameters,
): any {
  return { keywords: item["keywords"], maxDomainRecommendations: item["maxDomainRecommendations"] };
}

/** Paged collection of NameIdentifier items */
export interface _NameIdentifierCollection {
  /** The NameIdentifier items on this page */
  value: NameIdentifier[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nameIdentifierCollectionDeserializer(item: any): _NameIdentifierCollection {
  return {
    value: nameIdentifierArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nameIdentifierArraySerializer(result: Array<NameIdentifier>): any[] {
  return result.map((item) => {
    return nameIdentifierSerializer(item);
  });
}

export function nameIdentifierArrayDeserializer(result: Array<NameIdentifier>): any[] {
  return result.map((item) => {
    return nameIdentifierDeserializer(item);
  });
}

/** A top level domain object. */
export interface TopLevelDomain extends ProxyResource {
  /** Kind of resource */
  kind?: string;
  /** If <code>true</code>, then the top level domain supports domain privacy; otherwise, <code>false</code>. */
  privacy?: boolean;
}

export function topLevelDomainDeserializer(item: any): TopLevelDomain {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _topLevelDomainPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** TopLevelDomain resource specific properties */
export interface TopLevelDomainProperties {
  /** If <code>true</code>, then the top level domain supports domain privacy; otherwise, <code>false</code>. */
  privacy?: boolean;
}

export function topLevelDomainPropertiesDeserializer(item: any): TopLevelDomainProperties {
  return {
    privacy: item["privacy"],
  };
}

/** Collection of Top-level domains. */
export interface _TopLevelDomainCollection {
  /** The TopLevelDomain items on this page */
  value: TopLevelDomain[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _topLevelDomainCollectionDeserializer(item: any): _TopLevelDomainCollection {
  return {
    value: topLevelDomainArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topLevelDomainArrayDeserializer(result: Array<TopLevelDomain>): any[] {
  return result.map((item) => {
    return topLevelDomainDeserializer(item);
  });
}

/** Options for retrieving the list of top level domain legal agreements. */
export interface TopLevelDomainAgreementOption {
  /** If <code>true</code>, then the list of agreements will include agreements for domain privacy as well; otherwise, <code>false</code>. */
  includePrivacy?: boolean;
  /** If <code>true</code>, then the list of agreements will include agreements for domain transfer as well; otherwise, <code>false</code>. */
  forTransfer?: boolean;
}

export function topLevelDomainAgreementOptionSerializer(item: TopLevelDomainAgreementOption): any {
  return { includePrivacy: item["includePrivacy"], forTransfer: item["forTransfer"] };
}

/** Paged collection of TldLegalAgreement items */
export interface _TldLegalAgreementCollection {
  /** The TldLegalAgreement items on this page */
  value: TldLegalAgreement[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tldLegalAgreementCollectionDeserializer(item: any): _TldLegalAgreementCollection {
  return {
    value: tldLegalAgreementArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tldLegalAgreementArrayDeserializer(result: Array<TldLegalAgreement>): any[] {
  return result.map((item) => {
    return tldLegalAgreementDeserializer(item);
  });
}

/** Legal agreement for a top level domain. */
export interface TldLegalAgreement {
  /** Unique identifier for the agreement. */
  agreementKey: string;
  /** Agreement title. */
  title: string;
  /** Agreement details. */
  content: string;
  /** URL where a copy of the agreement details is hosted. */
  url?: string;
}

export function tldLegalAgreementDeserializer(item: any): TldLegalAgreement {
  return {
    agreementKey: item["agreementKey"],
    title: item["title"],
    content: item["content"],
    url: item["url"],
  };
}

/** Collection of Azure resource manager operation metadata. */
export interface _CsmOperationCollection {
  /** Collection of resources. */
  value: CsmOperationDescription[];
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

export function _csmOperationCollectionDeserializer(item: any): _CsmOperationCollection {
  return {
    value: csmOperationDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function csmOperationDescriptionArrayDeserializer(
  result: Array<CsmOperationDescription>,
): any[] {
  return result.map((item) => {
    return csmOperationDescriptionDeserializer(item);
  });
}

/** Description of an operation available for Microsoft.Web resource provider. */
export interface CsmOperationDescription {
  /** Operation name, e.g. Microsoft.Web/sites/write. */
  name?: string;
  /** Operation display name. */
  isDataAction?: boolean;
  /** Meta data about operation used for display in portal. */
  display?: CsmOperationDisplay;
  /** Origin of the operation, e.g. "system" or "user". */
  origin?: string;
  /** Properties available for a Microsoft.Web resource provider operation. */
  properties?: CsmOperationDescriptionProperties;
}

export function csmOperationDescriptionDeserializer(item: any): CsmOperationDescription {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : csmOperationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : csmOperationDescriptionPropertiesDeserializer(item["properties"]),
  };
}

/** Meta data about operation used for display in portal. */
export interface CsmOperationDisplay {
  /** Provider name. */
  provider?: string;
  /** Resource type. */
  resource?: string;
  /** Operation name. */
  operation?: string;
  /** Operation description. */
  description?: string;
}

export function csmOperationDisplayDeserializer(item: any): CsmOperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Properties available for a Microsoft.Web resource provider operation. */
export interface CsmOperationDescriptionProperties {
  /** Resource metrics service provided by Microsoft.Insights resource provider. */
  serviceSpecification?: ServiceSpecification;
}

export function csmOperationDescriptionPropertiesDeserializer(
  item: any,
): CsmOperationDescriptionProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Resource metrics service provided by Microsoft.Insights resource provider. */
export interface ServiceSpecification {
  /** Resource metrics service name. */
  metricSpecifications?: MetricSpecification[];
  /** Resource logs service provided by Microsoft.Insights resource provider. */
  logSpecifications?: LogSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Definition of a single resource metric. */
export interface MetricSpecification {
  /** Name of the resource metric. */
  name?: string;
  /** Display name of the resource metric. */
  displayName?: string;
  /** Description of the resource metric. */
  displayDescription?: string;
  /** Resource metric unit. */
  unit?: string;
  /** Resource metric aggregation type. */
  aggregationType?: string;
  /** Resource metric supported aggregation types. */
  supportsInstanceLevelAggregation?: boolean;
  /** Resource metric supported time grain types. */
  enableRegionalMdmAccount?: boolean;
  /** Resource metric source MDM account. */
  sourceMdmAccount?: string;
  /** Resource metric source MDM namespace. */
  sourceMdmNamespace?: string;
  /** Resource metric filter pattern. */
  metricFilterPattern?: string;
  /** Resource metric fill gap with zero. */
  fillGapWithZero?: boolean;
  /** Resource metric is internal. */
  isInternal?: boolean;
  /** Resource metric dimensions. */
  dimensions?: Dimension[];
  /** Resource metric category. */
  category?: string;
  /** Resource metric availability. */
  availabilities?: MetricAvailability[];
  /** Resource metric supported time grain types. */
  supportedTimeGrainTypes?: string[];
  /** Resource metric supported aggregation types. */
  supportedAggregationTypes?: string[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportsInstanceLevelAggregation: item["supportsInstanceLevelAggregation"],
    enableRegionalMdmAccount: item["enableRegionalMdmAccount"],
    sourceMdmAccount: item["sourceMdmAccount"],
    sourceMdmNamespace: item["sourceMdmNamespace"],
    metricFilterPattern: item["metricFilterPattern"],
    fillGapWithZero: item["fillGapWithZero"],
    isInternal: item["isInternal"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
    category: item["category"],
    availabilities: !item["availabilities"]
      ? item["availabilities"]
      : metricAvailabilityArrayDeserializer(item["availabilities"]),
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/**
 * Dimension of a resource metric. For e.g. instance specific HTTP requests for a web app,
 * where instance name is dimension of the metric HTTP request
 */
export interface Dimension {
  /** Name of the dimension. */
  name?: string;
  /** Display name of the dimension. */
  displayName?: string;
  /** Dimension of the internal name. */
  internalName?: string;
  /** Dimension to be exported for shoebox. */
  toBeExportedForShoebox?: boolean;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    internalName: item["internalName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

export function metricAvailabilityArrayDeserializer(result: Array<MetricAvailability>): any[] {
  return result.map((item) => {
    return metricAvailabilityDeserializer(item);
  });
}

/** Retention policy of a resource metric. */
export interface MetricAvailability {
  /** Metric availability time grain. */
  timeGrain?: string;
  /** Metric availability blob duration. */
  blobDuration?: string;
}

export function metricAvailabilityDeserializer(item: any): MetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    blobDuration: item["blobDuration"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Log Definition of a single resource metric. */
export interface LogSpecification {
  /** Name of the log. */
  name?: string;
  /** Display name of the log. */
  displayName?: string;
  /** Blob duration of the log. */
  blobDuration?: string;
  /** Log filtered pattern of the log. */
  logFilterPattern?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
    logFilterPattern: item["logFilterPattern"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01 API version. */
  V20241101 = "2024-11-01",
}

export function _domainPropertiesSerializer(item: Domain): any {
  return {
    contactAdmin: !item["contactAdmin"]
      ? item["contactAdmin"]
      : contactSerializer(item["contactAdmin"]),
    contactBilling: !item["contactBilling"]
      ? item["contactBilling"]
      : contactSerializer(item["contactBilling"]),
    contactRegistrant: !item["contactRegistrant"]
      ? item["contactRegistrant"]
      : contactSerializer(item["contactRegistrant"]),
    contactTech: !item["contactTech"]
      ? item["contactTech"]
      : contactSerializer(item["contactTech"]),
    privacy: item["privacy"],
    autoRenew: item["autoRenew"],
    consent: !item["consent"] ? item["consent"] : domainPurchaseConsentSerializer(item["consent"]),
    dnsType: item["dnsType"],
    dnsZoneId: item["dnsZoneId"],
    targetDnsType: item["targetDnsType"],
    authCode: item["authCode"],
  };
}

export function _domainPropertiesDeserializer(item: any) {
  return {
    contactAdmin: !item["contactAdmin"]
      ? item["contactAdmin"]
      : contactDeserializer(item["contactAdmin"]),
    contactBilling: !item["contactBilling"]
      ? item["contactBilling"]
      : contactDeserializer(item["contactBilling"]),
    contactRegistrant: !item["contactRegistrant"]
      ? item["contactRegistrant"]
      : contactDeserializer(item["contactRegistrant"]),
    contactTech: !item["contactTech"]
      ? item["contactTech"]
      : contactDeserializer(item["contactTech"]),
    registrationStatus: item["registrationStatus"],
    provisioningState: item["provisioningState"],
    nameServers: !item["nameServers"]
      ? item["nameServers"]
      : item["nameServers"].map((p: any) => {
          return p;
        }),
    privacy: item["privacy"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    lastRenewedTime: !item["lastRenewedTime"]
      ? item["lastRenewedTime"]
      : new Date(item["lastRenewedTime"]),
    autoRenew: item["autoRenew"],
    readyForDnsRecordManagement: item["readyForDnsRecordManagement"],
    managedHostNames: !item["managedHostNames"]
      ? item["managedHostNames"]
      : hostNameArrayDeserializer(item["managedHostNames"]),
    consent: !item["consent"]
      ? item["consent"]
      : domainPurchaseConsentDeserializer(item["consent"]),
    domainNotRenewableReasons: !item["domainNotRenewableReasons"]
      ? item["domainNotRenewableReasons"]
      : item["domainNotRenewableReasons"].map((p: any) => {
          return p;
        }),
    dnsType: item["dnsType"],
    dnsZoneId: item["dnsZoneId"],
    targetDnsType: item["targetDnsType"],
    authCode: item["authCode"],
  };
}

export function _domainPatchResourcePropertiesSerializer(item: DomainPatchResource): any {
  return {
    contactAdmin: !item["contactAdmin"]
      ? item["contactAdmin"]
      : contactSerializer(item["contactAdmin"]),
    contactBilling: !item["contactBilling"]
      ? item["contactBilling"]
      : contactSerializer(item["contactBilling"]),
    contactRegistrant: !item["contactRegistrant"]
      ? item["contactRegistrant"]
      : contactSerializer(item["contactRegistrant"]),
    contactTech: !item["contactTech"]
      ? item["contactTech"]
      : contactSerializer(item["contactTech"]),
    privacy: item["privacy"],
    autoRenew: item["autoRenew"],
    consent: !item["consent"] ? item["consent"] : domainPurchaseConsentSerializer(item["consent"]),
    dnsType: item["dnsType"],
    dnsZoneId: item["dnsZoneId"],
    targetDnsType: item["targetDnsType"],
    authCode: item["authCode"],
  };
}

export function _domainOwnershipIdentifierPropertiesSerializer(
  item: DomainOwnershipIdentifier,
): any {
  return { ownershipId: item["ownershipId"] };
}

export function _domainOwnershipIdentifierPropertiesDeserializer(item: any) {
  return {
    ownershipId: item["ownershipId"],
  };
}

export function _topLevelDomainPropertiesDeserializer(item: any) {
  return {
    privacy: item["privacy"],
  };
}
