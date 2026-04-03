// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Artifact signing account resource. */
export interface CodeSigningAccount extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CodeSigningAccountProperties;
}

export function codeSigningAccountSerializer(item: CodeSigningAccount): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : codeSigningAccountPropertiesSerializer(item["properties"]),
  };
}

export function codeSigningAccountDeserializer(item: any): CodeSigningAccount {
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
    properties: !item["properties"]
      ? item["properties"]
      : codeSigningAccountPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the artifact signing account. */
export interface CodeSigningAccountProperties {
  /** The URI of the artifact signing account which is used during signing files. */
  readonly accountUri?: string;
  /** SKU of the artifact signing account. */
  sku?: AccountSku;
  /** Status of the current operation on artifact signing account. */
  readonly provisioningState?: ProvisioningState;
}

export function codeSigningAccountPropertiesSerializer(item: CodeSigningAccountProperties): any {
  return { sku: !item["sku"] ? item["sku"] : accountSkuSerializer(item["sku"]) };
}

export function codeSigningAccountPropertiesDeserializer(item: any): CodeSigningAccountProperties {
  return {
    accountUri: item["accountUri"],
    sku: !item["sku"] ? item["sku"] : accountSkuDeserializer(item["sku"]),
    provisioningState: item["provisioningState"],
  };
}

/** SKU of the artifact signing account. */
export interface AccountSku {
  /** Name of the SKU. */
  name: SkuName;
}

export function accountSkuSerializer(item: AccountSku): any {
  return { name: item["name"] };
}

export function accountSkuDeserializer(item: any): AccountSku {
  return {
    name: item["name"],
  };
}

/** Name of the sku. */
export enum KnownSkuName {
  /** Basic sku. */
  Basic = "Basic",
  /** Premium sku. */
  Premium = "Premium",
}

/**
 * Name of the sku. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic sku. \
 * **Premium**: Premium sku.
 */
export type SkuName = string;

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Updating in progress. */
  Updating = "Updating",
  /** Deletion in progress. */
  Deleting = "Deleting",
  /** Resource creation started. */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Updating**: Updating in progress. \
 * **Deleting**: Deletion in progress. \
 * **Accepted**: Resource creation started.
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

/** Parameters for creating or updating an artifact signing account. */
export interface CodeSigningAccountPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Properties of the artifact signing account. */
  properties?: CodeSigningAccountPatchProperties;
}

export function codeSigningAccountPatchSerializer(item: CodeSigningAccountPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : codeSigningAccountPatchPropertiesSerializer(item["properties"]),
  };
}

/** Properties of the artifact signing account. */
export interface CodeSigningAccountPatchProperties {
  /** SKU of the artifact signing account. */
  sku?: AccountSkuPatch;
}

export function codeSigningAccountPatchPropertiesSerializer(
  item: CodeSigningAccountPatchProperties,
): any {
  return { sku: !item["sku"] ? item["sku"] : accountSkuPatchSerializer(item["sku"]) };
}

/** SKU of the artifact signing account. */
export interface AccountSkuPatch {
  /** Name of the SKU. */
  name?: SkuName;
}

export function accountSkuPatchSerializer(item: AccountSkuPatch): any {
  return { name: item["name"] };
}

/** The response of a CodeSigningAccount list operation. */
export interface _CodeSigningAccountListResult {
  /** The CodeSigningAccount items on this page */
  value: CodeSigningAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _codeSigningAccountListResultDeserializer(
  item: any,
): _CodeSigningAccountListResult {
  return {
    value: codeSigningAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function codeSigningAccountArraySerializer(result: Array<CodeSigningAccount>): any[] {
  return result.map((item) => {
    return codeSigningAccountSerializer(item);
  });
}

export function codeSigningAccountArrayDeserializer(result: Array<CodeSigningAccount>): any[] {
  return result.map((item) => {
    return codeSigningAccountDeserializer(item);
  });
}

/** The parameters used to check the availability of the artifact signing account name. */
export interface CheckNameAvailability {
  /** The type of the resource, "Microsoft.CodeSigning/codeSigningAccounts". */
  type: string;
  /** Artifact signing account name. */
  name: string;
}

export function checkNameAvailabilitySerializer(item: CheckNameAvailability): any {
  return { type: item["type"], name: item["name"] };
}

/** The CheckNameAvailability operation response. */
export interface CheckNameAvailabilityResult {
  /** A boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or is invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** The reason that an artifact signing account name could not be used. The Reason element is only returned if nameAvailable is false. */
  readonly reason?: NameUnavailabilityReason;
  /** An error message explaining the Reason value in more detail. */
  readonly message?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason that an artifact signing account name could not be used. The Reason element is only returned if nameAvailable is false. */
export enum KnownNameUnavailabilityReason {
  /** Account name is invalid */
  AccountNameInvalid = "AccountNameInvalid",
  /** Account name already exists */
  AlreadyExists = "AlreadyExists",
}

/**
 * The reason that an artifact signing account name could not be used. The Reason element is only returned if nameAvailable is false. \
 * {@link KnownNameUnavailabilityReason} can be used interchangeably with NameUnavailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountNameInvalid**: Account name is invalid \
 * **AlreadyExists**: Account name already exists
 */
export type NameUnavailabilityReason = string;

/** Certificate profile resource. */
export interface CertificateProfile extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CertificateProfileProperties;
}

export function certificateProfileSerializer(item: CertificateProfile): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : certificateProfilePropertiesSerializer(item["properties"]),
  };
}

export function certificateProfileDeserializer(item: any): CertificateProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : certificateProfilePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the certificate profile. */
export interface CertificateProfileProperties {
  /** Profile type of the certificate. */
  profileType: ProfileType;
  /** Whether to include STREET in the certificate subject name. */
  includeStreetAddress?: boolean;
  /** Whether to include L in the certificate subject name. Applicable only for private trust, private trust ci profile types */
  includeCity?: boolean;
  /** Whether to include S in the certificate subject name. Applicable only for private trust, private trust ci profile types */
  includeState?: boolean;
  /** Whether to include C in the certificate subject name. Applicable only for private trust, private trust ci profile types */
  includeCountry?: boolean;
  /** Whether to include PC in the certificate subject name. */
  includePostalCode?: boolean;
  /** Identity validation id used for the certificate subject name. */
  identityValidationId: string;
  /** Status of the current operation on certificate profile. */
  readonly provisioningState?: ProvisioningState;
  /** Status of the certificate profile. */
  readonly status?: CertificateProfileStatus;
  /** List of renewed certificates. */
  readonly certificates?: Certificate[];
}

export function certificateProfilePropertiesSerializer(item: CertificateProfileProperties): any {
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

export function certificateProfilePropertiesDeserializer(item: any): CertificateProfileProperties {
  return {
    profileType: item["profileType"],
    includeStreetAddress: item["includeStreetAddress"],
    includeCity: item["includeCity"],
    includeState: item["includeState"],
    includeCountry: item["includeCountry"],
    includePostalCode: item["includePostalCode"],
    identityValidationId: item["identityValidationId"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    certificates: !item["certificates"]
      ? item["certificates"]
      : certificateArrayDeserializer(item["certificates"]),
  };
}

/** Type of the certificate */
export enum KnownProfileType {
  /** Used for signing files which are distributed publicly. */
  PublicTrust = "PublicTrust",
  /** Used for signing files which are distributed internally within organization or group boundary. */
  PrivateTrust = "PrivateTrust",
  /** Used for signing CI policy files. */
  PrivateTrustCIPolicy = "PrivateTrustCIPolicy",
  /** Used for signing files which are run in secure vbs enclave. */
  VBSEnclave = "VBSEnclave",
  /** Used for signing files for testing purpose. */
  PublicTrustTest = "PublicTrustTest",
}

/**
 * Type of the certificate \
 * {@link KnownProfileType} can be used interchangeably with ProfileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PublicTrust**: Used for signing files which are distributed publicly. \
 * **PrivateTrust**: Used for signing files which are distributed internally within organization or group boundary. \
 * **PrivateTrustCIPolicy**: Used for signing CI policy files. \
 * **VBSEnclave**: Used for signing files which are run in secure vbs enclave. \
 * **PublicTrustTest**: Used for signing files for testing purpose.
 */
export type ProfileType = string;

/** Status of the certificate profiles. */
export enum KnownCertificateProfileStatus {
  /** The certificate profile is active. */
  Active = "Active",
  /** The certificate profile is disabled. */
  Disabled = "Disabled",
  /** The certificate profile is suspended. */
  Suspended = "Suspended",
}

/**
 * Status of the certificate profiles. \
 * {@link KnownCertificateProfileStatus} can be used interchangeably with CertificateProfileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The certificate profile is active. \
 * **Disabled**: The certificate profile is disabled. \
 * **Suspended**: The certificate profile is suspended.
 */
export type CertificateProfileStatus = string;

export function certificateArrayDeserializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateDeserializer(item);
  });
}

/** Properties of the certificate. */
export interface Certificate {
  /** Serial number of the certificate. */
  serialNumber?: string;
  /** Enhanced key usage of the certificate. */
  enhancedKeyUsage?: string;
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

export function certificateDeserializer(item: any): Certificate {
  return {
    serialNumber: item["serialNumber"],
    enhancedKeyUsage: item["enhancedKeyUsage"],
    subjectName: item["subjectName"],
    thumbprint: item["thumbprint"],
    createdDate: item["createdDate"],
    expiryDate: item["expiryDate"],
    status: item["status"],
    revocation: !item["revocation"]
      ? item["revocation"]
      : revocationDeserializer(item["revocation"]),
  };
}

/** Status of the certificate */
export enum KnownCertificateStatus {
  /** The certificate is active. */
  Active = "Active",
  /** The certificate is expired. */
  Expired = "Expired",
  /** The certificate is revoked. */
  Revoked = "Revoked",
}

/**
 * Status of the certificate \
 * {@link KnownCertificateStatus} can be used interchangeably with CertificateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The certificate is active. \
 * **Expired**: The certificate is expired. \
 * **Revoked**: The certificate is revoked.
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

export function revocationDeserializer(item: any): Revocation {
  return {
    requestedAt: !item["requestedAt"] ? item["requestedAt"] : new Date(item["requestedAt"]),
    effectiveAt: !item["effectiveAt"] ? item["effectiveAt"] : new Date(item["effectiveAt"]),
    reason: item["reason"],
    remarks: item["remarks"],
    status: item["status"],
    failureReason: item["failureReason"],
  };
}

/** Revocation status of the certificate. */
export enum KnownRevocationStatus {
  /** Certificate revocation succeeded. */
  Succeeded = "Succeeded",
  /** Certificate revocation is in progress. */
  InProgress = "InProgress",
  /** Certificate revocation failed. */
  Failed = "Failed",
}

/**
 * Revocation status of the certificate. \
 * {@link KnownRevocationStatus} can be used interchangeably with RevocationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Certificate revocation succeeded. \
 * **InProgress**: Certificate revocation is in progress. \
 * **Failed**: Certificate revocation failed.
 */
export type RevocationStatus = string;

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

/** The response of a CertificateProfile list operation. */
export interface _CertificateProfileListResult {
  /** The CertificateProfile items on this page */
  value: CertificateProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateProfileListResultDeserializer(
  item: any,
): _CertificateProfileListResult {
  return {
    value: certificateProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateProfileArraySerializer(result: Array<CertificateProfile>): any[] {
  return result.map((item) => {
    return certificateProfileSerializer(item);
  });
}

export function certificateProfileArrayDeserializer(result: Array<CertificateProfile>): any[] {
  return result.map((item) => {
    return certificateProfileDeserializer(item);
  });
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

export function revokeCertificateSerializer(item: RevokeCertificate): any {
  return {
    serialNumber: item["serialNumber"],
    thumbprint: item["thumbprint"],
    effectiveAt: item["effectiveAt"].toISOString(),
    reason: item["reason"],
    remarks: item["remarks"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** 2025-10-13 */
  V20251013 = "2025-10-13",
}
