// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

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

export function resourceSerializer(item: Resource) {
  return item as any;
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

/** Known values of {@link CreatedByType} that the service accepts. */
export enum KnownCreatedByType {
  /** User */
  User = "User",
  /** Application */
  Application = "Application",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
  /** Key */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **Application** \
 * **ManagedIdentity** \
 * **Key**
 */
export type CreatedByType = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource) {
  return item as any;
}

/** Certificate profile resource. */
export interface CertificateProfile extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CertificateProfileProperties;
}

export function certificateProfileSerializer(item: CertificateProfile): Record<string, unknown> {
  return {
    properties: !item.properties
      ? item.properties
      : certificateProfilePropertiesSerializer(item.properties),
  };
}

/** Properties of the certificate profile. */
export interface CertificateProfileProperties {
  /** Profile type of the certificate. */
  profileType: ProfileType;
  /** Used as CN in the certificate subject name. */
  readonly commonName?: string;
  /** Used as O in the certificate subject name. */
  readonly organization?: string;
  /** Used as OU in the private trust certificate subject name. */
  readonly organizationUnit?: string;
  /** Used as STREET in the certificate subject name. */
  readonly streetAddress?: string;
  /** Whether to include STREET in the certificate subject name. */
  includeStreetAddress?: boolean;
  /** Used as L in the certificate subject name. */
  readonly city?: string;
  /** Whether to include L in the certificate subject name. Applicable only for private trust, private trust ci profile types */
  includeCity?: boolean;
  /** Used as S in the certificate subject name. */
  readonly state?: string;
  /** Whether to include S in the certificate subject name. Applicable only for private trust, private trust ci profile types */
  includeState?: boolean;
  /** Used as C in the certificate subject name. */
  readonly country?: string;
  /** Whether to include C in the certificate subject name. Applicable only for private trust, private trust ci profile types */
  includeCountry?: boolean;
  /** Used as PC in the certificate subject name. */
  readonly postalCode?: string;
  /** Whether to include PC in the certificate subject name. */
  includePostalCode?: boolean;
  /** Enhanced key usage of the certificate. */
  readonly enhancedKeyUsage?: string;
  /** Identity validation id used for the certificate subject name. */
  identityValidationId?: string;
  /** Status of the current operation on certificate profile. */
  readonly provisioningState?: ProvisioningState;
  /** Status of the certificate profile. */
  readonly status?: CertificateProfileStatus;
  /** List of renewed certificates. */
  readonly certificates?: Certificate[];
}

export function certificateProfilePropertiesSerializer(
  item: CertificateProfileProperties,
): Record<string, unknown> {
  return {
    profileType: item["profileType"],
    includeStreetAddress: item["includeStreetAddress"],
    includeCity: item["includeCity"],
    includeState: item["includeState"],
    includeCountry: item["includeCountry"],
    includePostalCode: item["includePostalCode"],
    identityValidationId: item["identityValidationId"],
  };
}

/** Known values of {@link ProfileType} that the service accepts. */
export enum KnownProfileType {
  /** PublicTrust */
  PublicTrust = "PublicTrust",
  /** PrivateTrust */
  PrivateTrust = "PrivateTrust",
  /** PrivateTrustCIPolicy */
  PrivateTrustCIPolicy = "PrivateTrustCIPolicy",
  /** VBSEnclave */
  VBSEnclave = "VBSEnclave",
  /** PublicTrustTest */
  PublicTrustTest = "PublicTrustTest",
}

/**
 * Type of the certificate \
 * {@link KnownProfileType} can be used interchangeably with ProfileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PublicTrust** \
 * **PrivateTrust** \
 * **PrivateTrustCIPolicy** \
 * **VBSEnclave** \
 * **PublicTrustTest**
 */
export type ProfileType = string;

/** Known values of {@link ProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Accepted */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Updating** \
 * **Deleting** \
 * **Accepted**
 */
export type ProvisioningState = string;

/** Known values of {@link CertificateProfileStatus} that the service accepts. */
export enum KnownCertificateProfileStatus {
  /** Active */
  Active = "Active",
  /** Disabled */
  Disabled = "Disabled",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * Status of the certificate profiles. \
 * {@link KnownCertificateProfileStatus} can be used interchangeably with CertificateProfileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Disabled** \
 * **Suspended**
 */
export type CertificateProfileStatus = string;

/** Properties of the certificate. */
export interface Certificate {
  /** Serial number of the certificate. */
  serialNumber?: string;
  /** Subject name of the certificate. */
  subjectName?: string;
  /** Thumbprint of the certificate. */
  thumbprint?: string;
  /** Certificate created date. */
  createdDate?: string;
  /** Certificate expiry date. */
  expiryDate?: string;
  /** Status of the certificate. */
  status?: CertificateStatus;
  /** Revocations history of a certificate. */
  revocation?: Revocation;
}

/** Known values of {@link CertificateStatus} that the service accepts. */
export enum KnownCertificateStatus {
  /** Active */
  Active = "Active",
  /** Expired */
  Expired = "Expired",
  /** Revoked */
  Revoked = "Revoked",
}

/**
 * Status of the certificate \
 * {@link KnownCertificateStatus} can be used interchangeably with CertificateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Expired** \
 * **Revoked**
 */
export type CertificateStatus = string;

/** Revocation details of the certificate. */
export interface Revocation {
  /** The timestamp when the revocation is requested. */
  requestedAt?: Date;
  /** The timestamp when the revocation is effective. */
  effectiveAt?: Date;
  /** Reason for revocation. */
  reason?: string;
  /** Remarks for the revocation. */
  remarks?: string;
  /** Status of the revocation. */
  status?: RevocationStatus;
  /** Reason for the revocation failure. */
  failureReason?: string;
}

/** Known values of {@link RevocationStatus} that the service accepts. */
export enum KnownRevocationStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
}

/**
 * Revocation status of the certificate. \
 * {@link KnownRevocationStatus} can be used interchangeably with RevocationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **InProgress** \
 * **Failed**
 */
export type RevocationStatus = string;

/** The response of a CertificateProfile list operation. */
export interface _CertificateProfileListResult {
  /** The CertificateProfile items on this page */
  value: CertificateProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Defines the certificate revocation properties. */
export interface RevokeCertificate {
  /** Serial number of the certificate. */
  serialNumber: string;
  /** Thumbprint of the certificate. */
  thumbprint: string;
  /** The timestamp when the revocation is effective. */
  effectiveAt: Date;
  /** Reason for the revocation. */
  reason: string;
  /** Remarks for the revocation. */
  remarks?: string;
}

export function revokeCertificateSerializer(item: RevokeCertificate): Record<string, unknown> {
  return {
    serialNumber: item["serialNumber"],
    thumbprint: item["thumbprint"],
    effectiveAt: item["effectiveAt"].toISOString(),
    reason: item["reason"],
    remarks: item["remarks"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** Trusted signing account resource. */
export interface CodeSigningAccount extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CodeSigningAccountProperties;
}

export function codeSigningAccountSerializer(item: CodeSigningAccount): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : codeSigningAccountPropertiesSerializer(item.properties),
  };
}

/** Properties of the trusted signing account. */
export interface CodeSigningAccountProperties {
  /** The URI of the trusted signing account which is used during signing files. */
  readonly accountUri?: string;
  /** SKU of the trusted signing account. */
  sku?: AccountSku;
  /** Status of the current operation on trusted signing account. */
  readonly provisioningState?: ProvisioningState;
}

export function codeSigningAccountPropertiesSerializer(
  item: CodeSigningAccountProperties,
): Record<string, unknown> {
  return {
    sku: !item.sku ? item.sku : accountSkuSerializer(item.sku),
  };
}

/** SKU of the trusted signing account. */
export interface AccountSku {
  /** Name of the SKU. */
  name: SkuName;
}

export function accountSkuSerializer(item: AccountSku): Record<string, unknown> {
  return {
    name: item["name"],
  };
}

/** Known values of {@link SkuName} that the service accepts. */
export enum KnownSkuName {
  /** Basic */
  Basic = "Basic",
  /** Premium */
  Premium = "Premium",
}

/**
 * Name of the sku. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic** \
 * **Premium**
 */
export type SkuName = string;

/** Parameters for creating or updating a trusted signing account. */
export interface CodeSigningAccountPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Properties of the trusted signing account. */
  properties?: CodeSigningAccountPatchProperties;
}

export function codeSigningAccountPatchSerializer(
  item: CodeSigningAccountPatch,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : codeSigningAccountPatchPropertiesSerializer(item.properties),
  };
}

/** Properties of the trusted signing account. */
export interface CodeSigningAccountPatchProperties {
  /** SKU of the trusted signing account. */
  sku?: AccountSku;
}

export function codeSigningAccountPatchPropertiesSerializer(
  item: CodeSigningAccountPatchProperties,
): Record<string, unknown> {
  return {
    sku: !item.sku ? item.sku : accountSkuSerializer(item.sku),
  };
}

/** The response of a CodeSigningAccount list operation. */
export interface _CodeSigningAccountListResult {
  /** The CodeSigningAccount items on this page */
  value: CodeSigningAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The parameters used to check the availability of the trusted signing account name. */
export interface CheckNameAvailability {
  /** Trusted signing account name. */
  name: string;
}

export function checkNameAvailabilitySerializer(
  item: CheckNameAvailability,
): Record<string, unknown> {
  return {
    name: item["name"],
  };
}

/** The CheckNameAvailability operation response. */
export interface CheckNameAvailabilityResult {
  /** A boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or is invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** The reason that a trusted signing account name could not be used. The Reason element is only returned if nameAvailable is false. */
  readonly reason?: NameUnavailabilityReason;
  /** An error message explaining the Reason value in more detail. */
  readonly message?: string;
}

/** Known values of {@link NameUnavailabilityReason} that the service accepts. */
export enum KnownNameUnavailabilityReason {
  /** AccountNameInvalid */
  AccountNameInvalid = "AccountNameInvalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * The reason that a trusted signing account name could not be used. The Reason element is only returned if nameAvailable is false. \
 * {@link KnownNameUnavailabilityReason} can be used interchangeably with NameUnavailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountNameInvalid** \
 * **AlreadyExists**
 */
export type NameUnavailabilityReason = string;

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
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

/** Known values of {@link Origin} that the service accepts. */
export enum KnownOrigin {
  /** user */
  User = "user",
  /** system */
  System = "system",
  /** user,system */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user** \
 * **system** \
 * **user,system**
 */
export type Origin = string;

/** Known values of {@link ActionType} that the service accepts. */
export enum KnownActionType {
  /** Internal */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**
 */
export type ActionType = string;
