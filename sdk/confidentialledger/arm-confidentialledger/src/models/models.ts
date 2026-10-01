// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

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

/** List containing this Resource Provider's available operations. */
export interface _ResourceProviderOperationList {
  /** The list of operations. */
  readonly value?: ResourceProviderOperationDefinition[];
  /** The URL to get the next set of results, if any. */
  nextLink?: string;
}

export function _resourceProviderOperationListDeserializer(
  item: any,
): _ResourceProviderOperationList {
  return {
    value: !item["value"]
      ? item["value"]
      : resourceProviderOperationDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceProviderOperationDefinitionArrayDeserializer(
  result: Array<ResourceProviderOperationDefinition>,
): any[] {
  return result.map((item) => {
    return resourceProviderOperationDefinitionDeserializer(item);
  });
}

/** Describes the Resource Provider Operation. */
export interface ResourceProviderOperationDefinition {
  /** Resource provider operation name. */
  name?: string;
  /** Indicates whether the operation is data action or not. */
  isDataAction?: boolean;
  /** Details about the operations */
  display?: ResourceProviderOperationDisplay;
}

export function resourceProviderOperationDefinitionDeserializer(
  item: any,
): ResourceProviderOperationDefinition {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : resourceProviderOperationDisplayDeserializer(item["display"]),
  };
}

/** Describes the properties of the Operation. */
export interface ResourceProviderOperationDisplay {
  /** Name of the resource provider. */
  provider?: string;
  /** Name of the resource type. */
  resource?: string;
  /** Name of the resource provider operation. */
  operation?: string;
  /** Description of the resource provider operation. */
  description?: string;
}

export function resourceProviderOperationDisplayDeserializer(
  item: any,
): ResourceProviderOperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Confidential Ledger. Contains the properties of Confidential Ledger Resource. */
export interface ConfidentialLedger extends TrackedResource {
  /** Properties of Confidential Ledger Resource. */
  properties?: LedgerProperties;
}

export function confidentialLedgerSerializer(item: ConfidentialLedger): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : ledgerPropertiesSerializer(item["properties"]),
  };
}

export function confidentialLedgerDeserializer(item: any): ConfidentialLedger {
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
      : ledgerPropertiesDeserializer(item["properties"]),
  };
}

/** Additional Confidential Ledger properties. */
export interface LedgerProperties {
  /** Unique name for the Confidential Ledger. */
  readonly ledgerName?: string;
  /** Endpoint for calling Ledger Service. */
  readonly ledgerUri?: string;
  /** Endpoint for accessing network identity. */
  readonly identityServiceUri?: string;
  /** Internal namespace for the Ledger */
  readonly ledgerInternalNamespace?: string;
  /** Object representing RunningState for Ledger. */
  runningState?: RunningState;
  /** Type of Confidential Ledger */
  ledgerType?: LedgerType;
  /** Provisioning state of Ledger Resource */
  readonly provisioningState?: ProvisioningState;
  /** SKU associated with the ledger */
  ledgerSku?: LedgerSku;
  /** Array of all AAD based Security Principals. */
  aadBasedSecurityPrincipals?: AADBasedSecurityPrincipal[];
  /** Array of all cert based Security Principals. */
  certBasedSecurityPrincipals?: CertBasedSecurityPrincipal[];
  /** CCF Property for the logging level for the untrusted host: Trace, Debug, Info, Fail, Fatal. */
  hostLevel?: string;
  /** CCF Property for the maximum size of the http request body: 1MB, 5MB, 10MB. */
  maxBodySizeInMb?: number;
  /** CCF Property for the subject name to include in the node certificate. Default: CN=CCF Node. */
  subjectName?: string;
  /** Number of CCF nodes in the ACC Ledger. */
  nodeCount?: number;
  /** Prefix for the write load balancer. Example: write */
  writeLBAddressPrefix?: string;
  /** Number of additional threads processing incoming client requests in the enclave (modify with care!) */
  workerThreads?: number;
  /** Enclave platform of the Confidential Ledger. */
  readonly enclavePlatform?: EnclavePlatform;
  /** Application type of the Confidential Ledger. */
  applicationType?: ApplicationType;
  /** The SCITT Configuration that needs to be set for the Confidential Ledger. */
  scittConfiguration?: string;
}

export function ledgerPropertiesSerializer(item: LedgerProperties): any {
  return {
    runningState: item["runningState"],
    ledgerType: item["ledgerType"],
    ledgerSku: item["ledgerSku"],
    aadBasedSecurityPrincipals: !item["aadBasedSecurityPrincipals"]
      ? item["aadBasedSecurityPrincipals"]
      : aadBasedSecurityPrincipalArraySerializer(item["aadBasedSecurityPrincipals"]),
    certBasedSecurityPrincipals: !item["certBasedSecurityPrincipals"]
      ? item["certBasedSecurityPrincipals"]
      : certBasedSecurityPrincipalArraySerializer(item["certBasedSecurityPrincipals"]),
    hostLevel: item["hostLevel"],
    maxBodySizeInMb: item["maxBodySizeInMb"],
    subjectName: item["subjectName"],
    nodeCount: item["nodeCount"],
    writeLBAddressPrefix: item["writeLBAddressPrefix"],
    workerThreads: item["workerThreads"],
    applicationType: item["applicationType"],
    scittConfiguration: item["scittConfiguration"],
  };
}

export function ledgerPropertiesDeserializer(item: any): LedgerProperties {
  return {
    ledgerName: item["ledgerName"],
    ledgerUri: item["ledgerUri"],
    identityServiceUri: item["identityServiceUri"],
    ledgerInternalNamespace: item["ledgerInternalNamespace"],
    runningState: item["runningState"],
    ledgerType: item["ledgerType"],
    provisioningState: item["provisioningState"],
    ledgerSku: item["ledgerSku"],
    aadBasedSecurityPrincipals: !item["aadBasedSecurityPrincipals"]
      ? item["aadBasedSecurityPrincipals"]
      : aadBasedSecurityPrincipalArrayDeserializer(item["aadBasedSecurityPrincipals"]),
    certBasedSecurityPrincipals: !item["certBasedSecurityPrincipals"]
      ? item["certBasedSecurityPrincipals"]
      : certBasedSecurityPrincipalArrayDeserializer(item["certBasedSecurityPrincipals"]),
    hostLevel: item["hostLevel"],
    maxBodySizeInMb: item["maxBodySizeInMb"],
    subjectName: item["subjectName"],
    nodeCount: item["nodeCount"],
    writeLBAddressPrefix: item["writeLBAddressPrefix"],
    workerThreads: item["workerThreads"],
    enclavePlatform: item["enclavePlatform"],
    applicationType: item["applicationType"],
    scittConfiguration: item["scittConfiguration"],
  };
}

/** Object representing RunningState for Confidential Ledger. */
export enum KnownRunningState {
  /** Active */
  Active = "Active",
  /** Paused */
  Paused = "Paused",
  /** Unknown */
  Unknown = "Unknown",
  /** Pausing */
  Pausing = "Pausing",
  /** Resuming */
  Resuming = "Resuming",
}

/**
 * Object representing RunningState for Confidential Ledger. \
 * {@link KnownRunningState} can be used interchangeably with RunningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Paused** \
 * **Unknown** \
 * **Pausing** \
 * **Resuming**
 */
export type RunningState = string;

/** Type of the ledger. Private means transaction data is encrypted. */
export enum KnownLedgerType {
  /** Unknown */
  Unknown = "Unknown",
  /** Public */
  Public = "Public",
  /** Private */
  Private = "Private",
}

/**
 * Type of the ledger. Private means transaction data is encrypted. \
 * {@link KnownLedgerType} can be used interchangeably with LedgerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Public** \
 * **Private**
 */
export type LedgerType = string;

/** Object representing ProvisioningState for Confidential Ledger. */
export enum KnownProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
}

/**
 * Object representing ProvisioningState for Confidential Ledger. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Creating** \
 * **Deleting** \
 * **Updating**
 */
export type ProvisioningState = string;

/** SKU associated with the ledger resource */
export enum KnownLedgerSku {
  /** Standard */
  Standard = "Standard",
  /** Basic */
  Basic = "Basic",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * SKU associated with the ledger resource \
 * {@link KnownLedgerSku} can be used interchangeably with LedgerSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **Basic** \
 * **Unknown**
 */
export type LedgerSku = string;

export function aadBasedSecurityPrincipalArraySerializer(
  result: Array<AADBasedSecurityPrincipal>,
): any[] {
  return result.map((item) => {
    return aadBasedSecurityPrincipalSerializer(item);
  });
}

export function aadBasedSecurityPrincipalArrayDeserializer(
  result: Array<AADBasedSecurityPrincipal>,
): any[] {
  return result.map((item) => {
    return aadBasedSecurityPrincipalDeserializer(item);
  });
}

/** AAD based security principal with associated Ledger RoleName */
export interface AADBasedSecurityPrincipal {
  /** UUID/GUID based Principal Id of the Security Principal */
  principalId?: string;
  /** UUID/GUID based Tenant Id of the Security Principal */
  tenantId?: string;
  /** LedgerRole associated with the Security Principal of Ledger */
  ledgerRoleName?: LedgerRoleName;
}

export function aadBasedSecurityPrincipalSerializer(item: AADBasedSecurityPrincipal): any {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    ledgerRoleName: item["ledgerRoleName"],
  };
}

export function aadBasedSecurityPrincipalDeserializer(item: any): AADBasedSecurityPrincipal {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    ledgerRoleName: item["ledgerRoleName"],
  };
}

/** LedgerRole associated with the Security Principal of Ledger */
export enum KnownLedgerRoleName {
  /** Reader */
  Reader = "Reader",
  /** Contributor */
  Contributor = "Contributor",
  /** Administrator */
  Administrator = "Administrator",
}

/**
 * LedgerRole associated with the Security Principal of Ledger \
 * {@link KnownLedgerRoleName} can be used interchangeably with LedgerRoleName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Reader** \
 * **Contributor** \
 * **Administrator**
 */
export type LedgerRoleName = string;

export function certBasedSecurityPrincipalArraySerializer(
  result: Array<CertBasedSecurityPrincipal>,
): any[] {
  return result.map((item) => {
    return certBasedSecurityPrincipalSerializer(item);
  });
}

export function certBasedSecurityPrincipalArrayDeserializer(
  result: Array<CertBasedSecurityPrincipal>,
): any[] {
  return result.map((item) => {
    return certBasedSecurityPrincipalDeserializer(item);
  });
}

/** Cert based security principal with Ledger RoleName */
export interface CertBasedSecurityPrincipal {
  /** Public key of the user cert (.pem or .cer) */
  cert?: string;
  /** LedgerRole associated with the Security Principal of Ledger */
  ledgerRoleName?: LedgerRoleName;
}

export function certBasedSecurityPrincipalSerializer(item: CertBasedSecurityPrincipal): any {
  return { cert: item["cert"], ledgerRoleName: item["ledgerRoleName"] };
}

export function certBasedSecurityPrincipalDeserializer(item: any): CertBasedSecurityPrincipal {
  return {
    cert: item["cert"],
    ledgerRoleName: item["ledgerRoleName"],
  };
}

/** Object representing the enclave platform for the Confidential Ledger application. Defaults to IntelSgx. */
export enum KnownEnclavePlatform {
  /** IntelSgx */
  IntelSgx = "IntelSgx",
  /** AmdSevSnp */
  AmdSevSnp = "AmdSevSnp",
}

/**
 * Object representing the enclave platform for the Confidential Ledger application. Defaults to IntelSgx. \
 * {@link KnownEnclavePlatform} can be used interchangeably with EnclavePlatform,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IntelSgx** \
 * **AmdSevSnp**
 */
export type EnclavePlatform = string;

/** Object representing the application type of the Confidential Ledger. Defaults to ConfidentialLedger. */
export enum KnownApplicationType {
  /** ConfidentialLedger */
  ConfidentialLedger = "ConfidentialLedger",
  /** CodeTransparency */
  CodeTransparency = "CodeTransparency",
}

/**
 * Object representing the application type of the Confidential Ledger. Defaults to ConfidentialLedger. \
 * {@link KnownApplicationType} can be used interchangeably with ApplicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ConfidentialLedger** \
 * **CodeTransparency**
 */
export type ApplicationType = string;

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

/** Object that includes an array of Confidential Ledgers and a possible link for next set. */
export interface _ConfidentialLedgerList {
  /** The ConfidentialLedger items on this page */
  value: ConfidentialLedger[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _confidentialLedgerListDeserializer(item: any): _ConfidentialLedgerList {
  return {
    value: confidentialLedgerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function confidentialLedgerArraySerializer(result: Array<ConfidentialLedger>): any[] {
  return result.map((item) => {
    return confidentialLedgerSerializer(item);
  });
}

export function confidentialLedgerArrayDeserializer(result: Array<ConfidentialLedger>): any[] {
  return result.map((item) => {
    return confidentialLedgerDeserializer(item);
  });
}

/** Object representing Files Export properties of a Confidential Ledger Resource. */
export interface ConfidentialLedgerFilesExport {
  /** The region where the exported ledger files will eventually be restored to. */
  restoreRegion?: string;
  /** SAS URI used to access the Fileshare for exporting ledger files. */
  uri: string;
}

export function confidentialLedgerFilesExportSerializer(item: ConfidentialLedgerFilesExport): any {
  return { restoreRegion: item["restoreRegion"], uri: item["uri"] };
}

/** Object representing the files export response of a Confidential Ledger Resource. */
export interface ConfidentialLedgerFilesExportResponse {
  /** Response body stating if the ledger files are being exported. */
  readonly message?: string;
}

export function confidentialLedgerFilesExportResponseDeserializer(
  item: any,
): ConfidentialLedgerFilesExportResponse {
  return {
    message: item["message"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-02-23 API version. */
  V20260223 = "2026-02-23",
}
