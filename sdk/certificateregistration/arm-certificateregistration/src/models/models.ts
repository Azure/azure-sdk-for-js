// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** SSL certificate purchase order. */
export interface AppServiceCertificateOrder extends TrackedResource {
  /** Kind of resource */
  kind?: string;
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificate>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Domain verification token. */
  readonly domainVerificationToken?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType?: CertificateProductType;
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Status of certificate order. */
  readonly provisioningState?: ProvisioningState;
  /** Current order status. */
  readonly status?: CertificateOrderStatus;
  /** Signed certificate. */
  readonly signedCertificate?: CertificateDetails;
  /** Last CSR that was created for this order. */
  csr?: string;
  /** Intermediate certificate. */
  readonly intermediate?: CertificateDetails;
  /** Root certificate. */
  readonly root?: CertificateDetails;
  /** Current serial number of the certificate. */
  readonly serialNumber?: string;
  /** Certificate last issuance time. */
  readonly lastCertificateIssuanceTime?: Date;
  /** Certificate expiration time. */
  readonly expirationTime?: Date;
  /** <code>true</code> if private key is external; otherwise, <code>false</code>. */
  readonly isPrivateKeyExternal?: boolean;
  /** Reasons why App Service Certificate is not renewable at the current moment. */
  readonly appServiceCertificateNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Time stamp when the certificate would be auto renewed next */
  readonly nextAutoRenewalTimeStamp?: Date;
  /** Contact info */
  readonly contact?: CertificateOrderContact;
}

export function appServiceCertificateOrderSerializer(item: AppServiceCertificateOrder): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "certificates",
      "distinguishedName",
      "validityInYears",
      "keySize",
      "productType",
      "autoRenew",
      "csr",
    ])
      ? undefined
      : _appServiceCertificateOrderPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function appServiceCertificateOrderDeserializer(item: any): AppServiceCertificateOrder {
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
      : _appServiceCertificateOrderPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** AppServiceCertificateOrder resource specific properties */
export interface AppServiceCertificateOrderProperties {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificate>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Domain verification token. */
  readonly domainVerificationToken?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType: CertificateProductType;
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Status of certificate order. */
  readonly provisioningState?: ProvisioningState;
  /** Current order status. */
  readonly status?: CertificateOrderStatus;
  /** Signed certificate. */
  readonly signedCertificate?: CertificateDetails;
  /** Last CSR that was created for this order. */
  csr?: string;
  /** Intermediate certificate. */
  readonly intermediate?: CertificateDetails;
  /** Root certificate. */
  readonly root?: CertificateDetails;
  /** Current serial number of the certificate. */
  readonly serialNumber?: string;
  /** Certificate last issuance time. */
  readonly lastCertificateIssuanceTime?: Date;
  /** Certificate expiration time. */
  readonly expirationTime?: Date;
  /** <code>true</code> if private key is external; otherwise, <code>false</code>. */
  readonly isPrivateKeyExternal?: boolean;
  /** Reasons why App Service Certificate is not renewable at the current moment. */
  readonly appServiceCertificateNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Time stamp when the certificate would be auto renewed next */
  readonly nextAutoRenewalTimeStamp?: Date;
  /** Contact info */
  readonly contact?: CertificateOrderContact;
}

export function appServiceCertificateOrderPropertiesSerializer(
  item: AppServiceCertificateOrderProperties,
): any {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : appServiceCertificateRecordSerializer(item["certificates"]),
    distinguishedName: item["distinguishedName"],
    validityInYears: item["validityInYears"],
    keySize: item["keySize"],
    productType: item["productType"],
    autoRenew: item["autoRenew"],
    csr: item["csr"],
  };
}

export function appServiceCertificateOrderPropertiesDeserializer(
  item: any,
): AppServiceCertificateOrderProperties {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : appServiceCertificateRecordDeserializer(item["certificates"]),
    distinguishedName: item["distinguishedName"],
    domainVerificationToken: item["domainVerificationToken"],
    validityInYears: item["validityInYears"],
    keySize: item["keySize"],
    productType: item["productType"],
    autoRenew: item["autoRenew"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    signedCertificate: !item["signedCertificate"]
      ? item["signedCertificate"]
      : certificateDetailsDeserializer(item["signedCertificate"]),
    csr: item["csr"],
    intermediate: !item["intermediate"]
      ? item["intermediate"]
      : certificateDetailsDeserializer(item["intermediate"]),
    root: !item["root"] ? item["root"] : certificateDetailsDeserializer(item["root"]),
    serialNumber: item["serialNumber"],
    lastCertificateIssuanceTime: !item["lastCertificateIssuanceTime"]
      ? item["lastCertificateIssuanceTime"]
      : new Date(item["lastCertificateIssuanceTime"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    isPrivateKeyExternal: item["isPrivateKeyExternal"],
    appServiceCertificateNotRenewableReasons: !item["appServiceCertificateNotRenewableReasons"]
      ? item["appServiceCertificateNotRenewableReasons"]
      : item["appServiceCertificateNotRenewableReasons"].map((p: any) => {
          return p;
        }),
    nextAutoRenewalTimeStamp: !item["nextAutoRenewalTimeStamp"]
      ? item["nextAutoRenewalTimeStamp"]
      : new Date(item["nextAutoRenewalTimeStamp"]),
    contact: !item["contact"]
      ? item["contact"]
      : certificateOrderContactDeserializer(item["contact"]),
  };
}

export function appServiceCertificateRecordSerializer(
  item: Record<string, AppServiceCertificate>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : appServiceCertificateSerializer(item[key]);
  });
  return result;
}

export function appServiceCertificateRecordDeserializer(
  item: Record<string, any>,
): Record<string, AppServiceCertificate> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : appServiceCertificateDeserializer(item[key]);
  });
  return result;
}

/** Key Vault container for a certificate that is purchased through Azure. */
export interface AppServiceCertificate {
  /** Key Vault resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly provisioningState?: KeyVaultSecretStatus;
}

export function appServiceCertificateSerializer(item: AppServiceCertificate): any {
  return { keyVaultId: item["keyVaultId"], keyVaultSecretName: item["keyVaultSecretName"] };
}

export function appServiceCertificateDeserializer(item: any): AppServiceCertificate {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    provisioningState: item["provisioningState"],
  };
}

/** Status of the Key Vault secret. */
export type KeyVaultSecretStatus =
  | "Initialized"
  | "WaitingOnCertificateOrder"
  | "Succeeded"
  | "CertificateOrderFailed"
  | "OperationNotPermittedOnKeyVault"
  | "AzureServiceUnauthorizedToAccessKeyVault"
  | "KeyVaultDoesNotExist"
  | "KeyVaultSecretDoesNotExist"
  | "UnknownError"
  | "ExternalPrivateKey"
  | "Unknown";
/** Certificate product type. */
export type CertificateProductType =
  | "StandardDomainValidatedSsl"
  | "StandardDomainValidatedWildCardSsl";
/** Status of certificate order. */
export type ProvisioningState = "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
/** Current order status. */
export type CertificateOrderStatus =
  | "Pendingissuance"
  | "Issued"
  | "Revoked"
  | "Canceled"
  | "Denied"
  | "Pendingrevocation"
  | "PendingRekey"
  | "Unused"
  | "Expired"
  | "NotSubmitted";

/** SSL certificate details. */
export interface CertificateDetails {
  /** Certificate Version. */
  readonly version?: number;
  /** Certificate Serial Number. */
  readonly serialNumber?: string;
  /** Certificate Thumbprint. */
  readonly thumbprint?: string;
  /** Certificate Subject. */
  readonly subject?: string;
  /** Date Certificate is valid from. */
  readonly notBefore?: Date;
  /** Date Certificate is valid to. */
  readonly notAfter?: Date;
  /** Certificate Signature algorithm. */
  readonly signatureAlgorithm?: string;
  /** Certificate Issuer. */
  readonly issuer?: string;
  /** Raw certificate data. */
  readonly rawData?: string;
}

export function certificateDetailsDeserializer(item: any): CertificateDetails {
  return {
    version: item["version"],
    serialNumber: item["serialNumber"],
    thumbprint: item["thumbprint"],
    subject: item["subject"],
    notBefore: !item["notBefore"] ? item["notBefore"] : new Date(item["notBefore"]),
    notAfter: !item["notAfter"] ? item["notAfter"] : new Date(item["notAfter"]),
    signatureAlgorithm: item["signatureAlgorithm"],
    issuer: item["issuer"],
    rawData: item["rawData"],
  };
}

/** Known values of {@link ResourceNotRenewableReason} that the service accepts. */
export enum KnownResourceNotRenewableReason {
  /** RegistrationStatusNotSupportedForRenewal */
  RegistrationStatusNotSupportedForRenewal = "RegistrationStatusNotSupportedForRenewal",
  /** ExpirationNotInRenewalTimeRange */
  ExpirationNotInRenewalTimeRange = "ExpirationNotInRenewalTimeRange",
  /** SubscriptionNotActive */
  SubscriptionNotActive = "SubscriptionNotActive",
}

/** Type of ResourceNotRenewableReason */
export type ResourceNotRenewableReason = string;

/** model interface CertificateOrderContact */
export interface CertificateOrderContact {
  email?: string;
  nameFirst?: string;
  nameLast?: string;
  phone?: string;
}

export function certificateOrderContactDeserializer(item: any): CertificateOrderContact {
  return {
    email: item["email"],
    nameFirst: item["nameFirst"],
    nameLast: item["nameLast"],
    phone: item["phone"],
  };
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

/** ARM resource for a certificate order that is purchased through Azure. */
export interface AppServiceCertificateOrderPatchResource extends ProxyOnlyResource {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificate>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Domain verification token. */
  readonly domainVerificationToken?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType?: CertificateProductType;
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Status of certificate order. */
  readonly provisioningState?: ProvisioningState;
  /** Current order status. */
  readonly status?: CertificateOrderStatus;
  /** Signed certificate. */
  readonly signedCertificate?: CertificateDetails;
  /** Last CSR that was created for this order. */
  csr?: string;
  /** Intermediate certificate. */
  readonly intermediate?: CertificateDetails;
  /** Root certificate. */
  readonly root?: CertificateDetails;
  /** Current serial number of the certificate. */
  readonly serialNumber?: string;
  /** Certificate last issuance time. */
  readonly lastCertificateIssuanceTime?: Date;
  /** Certificate expiration time. */
  readonly expirationTime?: Date;
  /** <code>true</code> if private key is external; otherwise, <code>false</code>. */
  readonly isPrivateKeyExternal?: boolean;
  /** Reasons why App Service Certificate is not renewable at the current moment. */
  readonly appServiceCertificateNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Time stamp when the certificate would be auto renewed next */
  readonly nextAutoRenewalTimeStamp?: Date;
  /** Contact info */
  readonly contact?: CertificateOrderContact;
}

export function appServiceCertificateOrderPatchResourceSerializer(
  item: AppServiceCertificateOrderPatchResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "certificates",
      "distinguishedName",
      "validityInYears",
      "keySize",
      "productType",
      "autoRenew",
      "csr",
    ])
      ? undefined
      : _appServiceCertificateOrderPatchResourcePropertiesSerializer(item),
  };
}

/** AppServiceCertificateOrderPatchResource resource specific properties */
export interface AppServiceCertificateOrderPatchResourceProperties {
  /** State of the Key Vault secret. */
  certificates?: Record<string, AppServiceCertificate>;
  /** Certificate distinguished name. */
  distinguishedName?: string;
  /** Domain verification token. */
  readonly domainVerificationToken?: string;
  /** Duration in years (must be 1). */
  validityInYears?: number;
  /** Certificate key size. */
  keySize?: number;
  /** Certificate product type. */
  productType: CertificateProductType;
  /** <code>true</code> if the certificate should be automatically renewed when it expires; otherwise, <code>false</code>. */
  autoRenew?: boolean;
  /** Status of certificate order. */
  readonly provisioningState?: ProvisioningState;
  /** Current order status. */
  readonly status?: CertificateOrderStatus;
  /** Signed certificate. */
  readonly signedCertificate?: CertificateDetails;
  /** Last CSR that was created for this order. */
  csr?: string;
  /** Intermediate certificate. */
  readonly intermediate?: CertificateDetails;
  /** Root certificate. */
  readonly root?: CertificateDetails;
  /** Current serial number of the certificate. */
  readonly serialNumber?: string;
  /** Certificate last issuance time. */
  readonly lastCertificateIssuanceTime?: Date;
  /** Certificate expiration time. */
  readonly expirationTime?: Date;
  /** <code>true</code> if private key is external; otherwise, <code>false</code>. */
  readonly isPrivateKeyExternal?: boolean;
  /** Reasons why App Service Certificate is not renewable at the current moment. */
  readonly appServiceCertificateNotRenewableReasons?: ResourceNotRenewableReason[];
  /** Time stamp when the certificate would be auto renewed next */
  readonly nextAutoRenewalTimeStamp?: Date;
  /** Contact info */
  readonly contact?: CertificateOrderContact;
}

export function appServiceCertificateOrderPatchResourcePropertiesSerializer(
  item: AppServiceCertificateOrderPatchResourceProperties,
): any {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : appServiceCertificateRecordSerializer(item["certificates"]),
    distinguishedName: item["distinguishedName"],
    validityInYears: item["validityInYears"],
    keySize: item["keySize"],
    productType: item["productType"],
    autoRenew: item["autoRenew"],
    csr: item["csr"],
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

/** Collection of certificate orders. */
export interface _AppServiceCertificateOrderCollection {
  /** Collection of resources. */
  value: AppServiceCertificateOrder[];
  /** Link to next page of resources. */
  nextLink?: string;
}

export function _appServiceCertificateOrderCollectionDeserializer(
  item: any,
): _AppServiceCertificateOrderCollection {
  return {
    value: appServiceCertificateOrderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appServiceCertificateOrderArraySerializer(
  result: Array<AppServiceCertificateOrder>,
): any[] {
  return result.map((item) => {
    return appServiceCertificateOrderSerializer(item);
  });
}

export function appServiceCertificateOrderArrayDeserializer(
  result: Array<AppServiceCertificateOrder>,
): any[] {
  return result.map((item) => {
    return appServiceCertificateOrderDeserializer(item);
  });
}

/** Class representing certificate reissue request. */
export interface ReissueCertificateOrderRequest extends ProxyOnlyResource {
  /** Certificate Key Size. */
  keySize?: number;
  /** Delay in hours to revoke existing certificate after the new certificate is issued. */
  delayExistingRevokeInHours?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

export function reissueCertificateOrderRequestSerializer(
  item: ReissueCertificateOrderRequest,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "keySize",
      "delayExistingRevokeInHours",
      "csr",
      "isPrivateKeyExternal",
    ])
      ? undefined
      : _reissueCertificateOrderRequestPropertiesSerializer(item),
  };
}

/** ReissueCertificateOrderRequest resource specific properties */
export interface ReissueCertificateOrderRequestProperties {
  /** Certificate Key Size. */
  keySize?: number;
  /** Delay in hours to revoke existing certificate after the new certificate is issued. */
  delayExistingRevokeInHours?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

export function reissueCertificateOrderRequestPropertiesSerializer(
  item: ReissueCertificateOrderRequestProperties,
): any {
  return {
    keySize: item["keySize"],
    delayExistingRevokeInHours: item["delayExistingRevokeInHours"],
    csr: item["csr"],
    isPrivateKeyExternal: item["isPrivateKeyExternal"],
  };
}

/** Class representing certificate renew request. */
export interface RenewCertificateOrderRequest extends ProxyOnlyResource {
  /** Certificate Key Size. */
  keySize?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

export function renewCertificateOrderRequestSerializer(item: RenewCertificateOrderRequest): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["keySize", "csr", "isPrivateKeyExternal"])
      ? undefined
      : _renewCertificateOrderRequestPropertiesSerializer(item),
  };
}

/** RenewCertificateOrderRequest resource specific properties */
export interface RenewCertificateOrderRequestProperties {
  /** Certificate Key Size. */
  keySize?: number;
  /** Csr to be used for re-key operation. */
  csr?: string;
  /** Should we change the ASC type (from managed private key to external private key and vice versa). */
  isPrivateKeyExternal?: boolean;
}

export function renewCertificateOrderRequestPropertiesSerializer(
  item: RenewCertificateOrderRequestProperties,
): any {
  return {
    keySize: item["keySize"],
    csr: item["csr"],
    isPrivateKeyExternal: item["isPrivateKeyExternal"],
  };
}

/** Identifies an object. */
export interface NameIdentifier {
  /** Name of the object. */
  name?: string;
}

export function nameIdentifierSerializer(item: NameIdentifier): any {
  return { name: item["name"] };
}

/** Site seal request. */
export interface SiteSealRequest {
  /** If <code>true</code> use the light color theme for site seal; otherwise, use the default color theme. */
  lightTheme?: boolean;
  /** Locale of site seal. */
  locale?: string;
}

export function siteSealRequestSerializer(item: SiteSealRequest): any {
  return { lightTheme: item["lightTheme"], locale: item["locale"] };
}

/** Site seal */
export interface SiteSeal {
  /** HTML snippet */
  html: string;
}

export function siteSealDeserializer(item: any): SiteSeal {
  return {
    html: item["html"],
  };
}

/** Certificate order action. */
export interface CertificateOrderAction {
  /** Action type. */
  readonly actionType?: CertificateOrderActionType;
  /** Time at which the certificate action was performed. */
  readonly createdAt?: Date;
}

export function certificateOrderActionDeserializer(item: any): CertificateOrderAction {
  return {
    actionType: item["actionType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
  };
}

/** Action type. */
export type CertificateOrderActionType =
  | "CertificateIssued"
  | "CertificateOrderCanceled"
  | "CertificateOrderCreated"
  | "CertificateRevoked"
  | "DomainValidationComplete"
  | "FraudDetected"
  | "OrgNameChange"
  | "OrgValidationComplete"
  | "SanDrop"
  | "FraudCleared"
  | "CertificateExpired"
  | "CertificateExpirationWarning"
  | "FraudDocumentationRequired"
  | "Unknown";

/** SSL certificate email. */
export interface CertificateEmail {
  /** Email id. */
  emailId?: string;
  /** Time stamp. */
  timeStamp?: Date;
}

export function certificateEmailDeserializer(item: any): CertificateEmail {
  return {
    emailId: item["emailId"],
    timeStamp: !item["timeStamp"] ? item["timeStamp"] : new Date(item["timeStamp"]),
  };
}

/** Key Vault container ARM resource for a certificate that is purchased through Azure. */
export interface AppServiceCertificateResource extends TrackedResource {
  /** Kind of resource */
  kind?: string;
  /** Key Vault resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly provisioningState?: KeyVaultSecretStatus;
}

export function appServiceCertificateResourceSerializer(item: AppServiceCertificateResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["keyVaultId", "keyVaultSecretName"])
      ? undefined
      : _appServiceCertificateResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function appServiceCertificateResourceDeserializer(
  item: any,
): AppServiceCertificateResource {
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
      : _appServiceCertificateResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Key Vault container ARM resource for a certificate that is purchased through Azure. */
export interface AppServiceCertificatePatchResource extends ProxyOnlyResource {
  /** Key Vault resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly provisioningState?: KeyVaultSecretStatus;
}

export function appServiceCertificatePatchResourceSerializer(
  item: AppServiceCertificatePatchResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["keyVaultId", "keyVaultSecretName"])
      ? undefined
      : _appServiceCertificatePatchResourcePropertiesSerializer(item),
  };
}

/** Collection of certificate order certificates. */
export interface _AppServiceCertificateCollection {
  /** The AppServiceCertificateResource items on this page */
  value: AppServiceCertificateResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appServiceCertificateCollectionDeserializer(
  item: any,
): _AppServiceCertificateCollection {
  return {
    value: appServiceCertificateResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appServiceCertificateResourceArraySerializer(
  result: Array<AppServiceCertificateResource>,
): any[] {
  return result.map((item) => {
    return appServiceCertificateResourceSerializer(item);
  });
}

export function appServiceCertificateResourceArrayDeserializer(
  result: Array<AppServiceCertificateResource>,
): any[] {
  return result.map((item) => {
    return appServiceCertificateResourceDeserializer(item);
  });
}

/** Class representing Response from Detector */
export interface DetectorResponse extends ProxyResource {
  /** Kind of resource */
  kind?: string;
  /** metadata for the detector */
  metadata?: DetectorInfo;
  /** Data Set */
  dataset?: DiagnosticData[];
  /** Indicates status of the most severe insight. */
  status?: Status;
  /** Additional configuration for different data providers to be used by the UI */
  dataProvidersMetadata?: DataProviderMetadata[];
  /** Suggested utterances where the detector can be applicable. */
  suggestedUtterances?: QueryUtterancesResults;
}

export function detectorResponseDeserializer(item: any): DetectorResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _detectorResponsePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** DetectorResponse resource specific properties */
export interface DetectorResponseProperties {
  /** metadata for the detector */
  metadata?: DetectorInfo;
  /** Data Set */
  dataset?: DiagnosticData[];
  /** Indicates status of the most severe insight. */
  status?: Status;
  /** Additional configuration for different data providers to be used by the UI */
  dataProvidersMetadata?: DataProviderMetadata[];
  /** Suggested utterances where the detector can be applicable. */
  suggestedUtterances?: QueryUtterancesResults;
}

export function detectorResponsePropertiesDeserializer(item: any): DetectorResponseProperties {
  return {
    metadata: !item["metadata"] ? item["metadata"] : detectorInfoDeserializer(item["metadata"]),
    dataset: !item["dataset"] ? item["dataset"] : diagnosticDataArrayDeserializer(item["dataset"]),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    dataProvidersMetadata: !item["dataProvidersMetadata"]
      ? item["dataProvidersMetadata"]
      : dataProviderMetadataArrayDeserializer(item["dataProvidersMetadata"]),
    suggestedUtterances: !item["suggestedUtterances"]
      ? item["suggestedUtterances"]
      : queryUtterancesResultsDeserializer(item["suggestedUtterances"]),
  };
}

/** Definition of Detector */
export interface DetectorInfo {
  /** Id of detector */
  readonly id?: string;
  /** Name of detector */
  readonly name?: string;
  /** Short description of the detector and its purpose. */
  readonly description?: string;
  /** Author of the detector. */
  readonly author?: string;
  /** Problem category. This serves for organizing group for detectors. */
  readonly category?: string;
  /** List of Support Topics for which this detector is enabled. */
  readonly supportTopicList?: SupportTopic[];
  /** Analysis Types for which this detector should apply to. */
  readonly analysisType?: string[];
  /** Whether this detector is an Analysis Detector or not. */
  readonly type?: DetectorType;
  /** Defines score of a detector to power ML based matching. */
  readonly score?: number;
}

export function detectorInfoDeserializer(item: any): DetectorInfo {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    author: item["author"],
    category: item["category"],
    supportTopicList: !item["supportTopicList"]
      ? item["supportTopicList"]
      : supportTopicArrayDeserializer(item["supportTopicList"]),
    analysisType: !item["analysisType"]
      ? item["analysisType"]
      : item["analysisType"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    score: item["score"],
  };
}

export function supportTopicArrayDeserializer(result: Array<SupportTopic>): any[] {
  return result.map((item) => {
    return supportTopicDeserializer(item);
  });
}

/** Defines a unique Support Topic */
export interface SupportTopic {
  /** Support Topic Id */
  readonly id?: string;
  /** Unique resource Id */
  readonly pesId?: string;
}

export function supportTopicDeserializer(item: any): SupportTopic {
  return {
    id: item["id"],
    pesId: item["pesId"],
  };
}

/** Whether this detector is an Analysis Detector or not. */
export type DetectorType = "Detector" | "Analysis" | "CategoryOverview";

export function diagnosticDataArrayDeserializer(result: Array<DiagnosticData>): any[] {
  return result.map((item) => {
    return diagnosticDataDeserializer(item);
  });
}

/** Set of data with rendering instructions */
export interface DiagnosticData {
  /** Data in table form */
  table?: DataTableResponseObject;
  /** Properties that describe how the table should be rendered */
  renderingProperties?: Rendering;
}

export function diagnosticDataDeserializer(item: any): DiagnosticData {
  return {
    table: !item["table"] ? item["table"] : dataTableResponseObjectDeserializer(item["table"]),
    renderingProperties: !item["renderingProperties"]
      ? item["renderingProperties"]
      : renderingDeserializer(item["renderingProperties"]),
  };
}

/** Data Table which defines columns and raw row values */
export interface DataTableResponseObject {
  /** Name of the table */
  tableName?: string;
  /** List of columns with data types */
  columns?: DataTableResponseColumn[];
  /** Raw row values */
  rows?: string[][];
}

export function dataTableResponseObjectDeserializer(item: any): DataTableResponseObject {
  return {
    tableName: item["tableName"],
    columns: !item["columns"]
      ? item["columns"]
      : dataTableResponseColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function dataTableResponseColumnArrayDeserializer(
  result: Array<DataTableResponseColumn>,
): any[] {
  return result.map((item) => {
    return dataTableResponseColumnDeserializer(item);
  });
}

/** Column definition */
export interface DataTableResponseColumn {
  /** Name of the column */
  columnName?: string;
  /** Data type which looks like 'String' or 'Int32'. */
  dataType?: string;
  /** Column Type */
  columnType?: string;
}

export function dataTableResponseColumnDeserializer(item: any): DataTableResponseColumn {
  return {
    columnName: item["columnName"],
    dataType: item["dataType"],
    columnType: item["columnType"],
  };
}

/** Instructions for rendering the data */
export interface Rendering {
  /** Rendering Type */
  type?: RenderingType;
  /** Title of data */
  title?: string;
  /** Description of the data that will help it be interpreted */
  description?: string;
}

export function renderingDeserializer(item: any): Rendering {
  return {
    type: item["type"],
    title: item["title"],
    description: item["description"],
  };
}

/** Rendering Type */
export type RenderingType =
  | "NoGraph"
  | "Table"
  | "TimeSeries"
  | "TimeSeriesPerInstance"
  | "PieChart"
  | "DataSummary"
  | "Email"
  | "Insights"
  | "DynamicInsight"
  | "Markdown"
  | "Detector"
  | "DropDown"
  | "Card"
  | "Solution"
  | "Guage"
  | "Form"
  | "ChangeSets"
  | "ChangeAnalysisOnboarding"
  | "ChangesView"
  | "AppInsight"
  | "DependencyGraph"
  | "DownTime"
  | "SummaryCard"
  | "SearchComponent"
  | "AppInsightEnablement";

/** Identify the status of the most severe insight generated by the detector. */
export interface Status {
  /** Descriptive message. */
  message?: string;
  /** Level of the most severe insight generated by the detector. */
  statusId?: InsightStatus;
}

export function statusDeserializer(item: any): Status {
  return {
    message: item["message"],
    statusId: item["statusId"],
  };
}

/** Level of the most severe insight generated by the detector. */
export type InsightStatus = "Critical" | "Warning" | "Info" | "Success" | "None";

export function dataProviderMetadataArrayDeserializer(result: Array<DataProviderMetadata>): any[] {
  return result.map((item) => {
    return dataProviderMetadataDeserializer(item);
  });
}

/** Additional configuration for a data providers */
export interface DataProviderMetadata {
  providerName?: string;
  /** Settings for the data provider */
  readonly propertyBag?: KeyValuePairStringObject[];
}

export function dataProviderMetadataDeserializer(item: any): DataProviderMetadata {
  return {
    providerName: item["providerName"],
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : keyValuePairStringObjectArrayDeserializer(item["propertyBag"]),
  };
}

export function keyValuePairStringObjectArrayDeserializer(
  result: Array<KeyValuePairStringObject>,
): any[] {
  return result.map((item) => {
    return keyValuePairStringObjectDeserializer(item);
  });
}

/** model interface KeyValuePairStringObject */
export interface KeyValuePairStringObject {
  readonly key?: string;
  /** Any object */
  readonly value?: Record<string, string>;
}

export function keyValuePairStringObjectDeserializer(item: any): KeyValuePairStringObject {
  return {
    key: item["key"],
    value: !item["value"]
      ? item["value"]
      : Object.fromEntries(Object.entries(item["value"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Suggested utterances where the detector can be applicable */
export interface QueryUtterancesResults {
  /** Search Query. */
  query?: string;
  /** Array of utterance results for search query. */
  results?: QueryUtterancesResult[];
}

export function queryUtterancesResultsDeserializer(item: any): QueryUtterancesResults {
  return {
    query: item["query"],
    results: !item["results"]
      ? item["results"]
      : queryUtterancesResultArrayDeserializer(item["results"]),
  };
}

export function queryUtterancesResultArrayDeserializer(
  result: Array<QueryUtterancesResult>,
): any[] {
  return result.map((item) => {
    return queryUtterancesResultDeserializer(item);
  });
}

/** Result for utterances query. */
export interface QueryUtterancesResult {
  /** A sample utterance. */
  sampleUtterance?: SampleUtterance;
  /** Score of a sample utterance. */
  score?: number;
}

export function queryUtterancesResultDeserializer(item: any): QueryUtterancesResult {
  return {
    sampleUtterance: !item["sampleUtterance"]
      ? item["sampleUtterance"]
      : sampleUtteranceDeserializer(item["sampleUtterance"]),
    score: item["score"],
  };
}

/** Sample utterance. */
export interface SampleUtterance {
  /** Text attribute of sample utterance. */
  text?: string;
  /** Links attribute of sample utterance. */
  links?: string[];
  /** Question id of sample utterance (for stackoverflow questions titles). */
  qid?: string;
}

export function sampleUtteranceDeserializer(item: any): SampleUtterance {
  return {
    text: item["text"],
    links: !item["links"]
      ? item["links"]
      : item["links"].map((p: any) => {
          return p;
        }),
    qid: item["qid"],
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

/** Collection of detector responses */
export interface _DetectorResponseCollection {
  /** The DetectorResponse items on this page */
  value: DetectorResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _detectorResponseCollectionDeserializer(item: any): _DetectorResponseCollection {
  return {
    value: detectorResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function detectorResponseArrayDeserializer(result: Array<DetectorResponse>): any[] {
  return result.map((item) => {
    return detectorResponseDeserializer(item);
  });
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
  name?: string;
  isDataAction?: boolean;
  /** Meta data about operation used for display in portal. */
  display?: CsmOperationDisplay;
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
  provider?: string;
  resource?: string;
  operation?: string;
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
  metricSpecifications?: MetricSpecification[];
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
  name?: string;
  displayName?: string;
  displayDescription?: string;
  unit?: string;
  aggregationType?: string;
  supportsInstanceLevelAggregation?: boolean;
  enableRegionalMdmAccount?: boolean;
  sourceMdmAccount?: string;
  sourceMdmNamespace?: string;
  metricFilterPattern?: string;
  fillGapWithZero?: boolean;
  isInternal?: boolean;
  dimensions?: Dimension[];
  category?: string;
  availabilities?: MetricAvailability[];
  supportedTimeGrainTypes?: string[];
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
  name?: string;
  displayName?: string;
  internalName?: string;
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
  timeGrain?: string;
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
  name?: string;
  displayName?: string;
  blobDuration?: string;
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

export function certificateOrderActionArrayDeserializer(
  result: Array<CertificateOrderAction>,
): any[] {
  return result.map((item) => {
    return certificateOrderActionDeserializer(item);
  });
}

export function certificateEmailArrayDeserializer(result: Array<CertificateEmail>): any[] {
  return result.map((item) => {
    return certificateEmailDeserializer(item);
  });
}

export function _appServiceCertificateOrderPropertiesSerializer(
  item: AppServiceCertificateOrder,
): any {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : appServiceCertificateRecordSerializer(item["certificates"]),
    distinguishedName: item["distinguishedName"],
    validityInYears: item["validityInYears"],
    keySize: item["keySize"],
    productType: item["productType"],
    autoRenew: item["autoRenew"],
    csr: item["csr"],
  };
}

export function _appServiceCertificateOrderPropertiesDeserializer(item: any) {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : appServiceCertificateRecordDeserializer(item["certificates"]),
    distinguishedName: item["distinguishedName"],
    domainVerificationToken: item["domainVerificationToken"],
    validityInYears: item["validityInYears"],
    keySize: item["keySize"],
    productType: item["productType"],
    autoRenew: item["autoRenew"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    signedCertificate: !item["signedCertificate"]
      ? item["signedCertificate"]
      : certificateDetailsDeserializer(item["signedCertificate"]),
    csr: item["csr"],
    intermediate: !item["intermediate"]
      ? item["intermediate"]
      : certificateDetailsDeserializer(item["intermediate"]),
    root: !item["root"] ? item["root"] : certificateDetailsDeserializer(item["root"]),
    serialNumber: item["serialNumber"],
    lastCertificateIssuanceTime: !item["lastCertificateIssuanceTime"]
      ? item["lastCertificateIssuanceTime"]
      : new Date(item["lastCertificateIssuanceTime"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    isPrivateKeyExternal: item["isPrivateKeyExternal"],
    appServiceCertificateNotRenewableReasons: !item["appServiceCertificateNotRenewableReasons"]
      ? item["appServiceCertificateNotRenewableReasons"]
      : item["appServiceCertificateNotRenewableReasons"].map((p: any) => {
          return p;
        }),
    nextAutoRenewalTimeStamp: !item["nextAutoRenewalTimeStamp"]
      ? item["nextAutoRenewalTimeStamp"]
      : new Date(item["nextAutoRenewalTimeStamp"]),
    contact: !item["contact"]
      ? item["contact"]
      : certificateOrderContactDeserializer(item["contact"]),
  };
}

export function _appServiceCertificateOrderPatchResourcePropertiesSerializer(
  item: AppServiceCertificateOrderPatchResource,
): any {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : appServiceCertificateRecordSerializer(item["certificates"]),
    distinguishedName: item["distinguishedName"],
    validityInYears: item["validityInYears"],
    keySize: item["keySize"],
    productType: item["productType"],
    autoRenew: item["autoRenew"],
    csr: item["csr"],
  };
}

export function _reissueCertificateOrderRequestPropertiesSerializer(
  item: ReissueCertificateOrderRequest,
): any {
  return {
    keySize: item["keySize"],
    delayExistingRevokeInHours: item["delayExistingRevokeInHours"],
    csr: item["csr"],
    isPrivateKeyExternal: item["isPrivateKeyExternal"],
  };
}

export function _renewCertificateOrderRequestPropertiesSerializer(
  item: RenewCertificateOrderRequest,
): any {
  return {
    keySize: item["keySize"],
    csr: item["csr"],
    isPrivateKeyExternal: item["isPrivateKeyExternal"],
  };
}

export function _appServiceCertificateResourcePropertiesSerializer(
  item: AppServiceCertificateResource,
): any {
  return { keyVaultId: item["keyVaultId"], keyVaultSecretName: item["keyVaultSecretName"] };
}

export function _appServiceCertificateResourcePropertiesDeserializer(item: any) {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    provisioningState: item["provisioningState"],
  };
}

export function _appServiceCertificatePatchResourcePropertiesSerializer(
  item: AppServiceCertificatePatchResource,
): any {
  return { keyVaultId: item["keyVaultId"], keyVaultSecretName: item["keyVaultSecretName"] };
}

export function _appServiceCertificatePatchResourcePropertiesDeserializer(item: any) {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    provisioningState: item["provisioningState"],
  };
}

export function _detectorResponsePropertiesDeserializer(item: any) {
  return {
    metadata: !item["metadata"] ? item["metadata"] : detectorInfoDeserializer(item["metadata"]),
    dataset: !item["dataset"] ? item["dataset"] : diagnosticDataArrayDeserializer(item["dataset"]),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    dataProvidersMetadata: !item["dataProvidersMetadata"]
      ? item["dataProvidersMetadata"]
      : dataProviderMetadataArrayDeserializer(item["dataProvidersMetadata"]),
    suggestedUtterances: !item["suggestedUtterances"]
      ? item["suggestedUtterances"]
      : queryUtterancesResultsDeserializer(item["suggestedUtterances"]),
  };
}
