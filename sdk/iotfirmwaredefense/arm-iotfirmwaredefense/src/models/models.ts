// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
}

/** Firmware definition */
export interface Firmware extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirmwareProperties;
}

export function firmwareSerializer(item: Firmware): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : firmwarePropertiesSerializer(item["properties"]),
  };
}

export function firmwareDeserializer(item: any): Firmware {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : firmwarePropertiesDeserializer(item["properties"]),
  };
}

/** Firmware properties. */
export interface FirmwareProperties {
  /** File name for a firmware that user uploaded. */
  fileName?: string;
  /** Firmware vendor. */
  vendor?: string;
  /** Firmware model. */
  model?: string;
  /** Firmware version. */
  version?: string;
  /** User-specified description of the firmware. */
  description?: string;
  /** File size of the uploaded firmware image. */
  fileSize?: number;
  /** The status of firmware scan. */
  status?: Status;
  /** A list of errors or other messages generated during firmware analysis */
  statusMessages?: StatusMessage[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function firmwarePropertiesSerializer(item: FirmwareProperties): any {
  return {
    fileName: item["fileName"],
    vendor: item["vendor"],
    model: item["model"],
    version: item["version"],
    description: item["description"],
    fileSize: item["fileSize"],
    status: item["status"],
    statusMessages: !item["statusMessages"]
      ? item["statusMessages"]
      : statusMessageArraySerializer(item["statusMessages"]),
  };
}

export function firmwarePropertiesDeserializer(item: any): FirmwareProperties {
  return {
    fileName: item["fileName"],
    vendor: item["vendor"],
    model: item["model"],
    version: item["version"],
    description: item["description"],
    fileSize: item["fileSize"],
    status: item["status"],
    statusMessages: !item["statusMessages"]
      ? item["statusMessages"]
      : statusMessageArrayDeserializer(item["statusMessages"]),
    provisioningState: item["provisioningState"],
  };
}

/** The status of a firmware analysis job. */
export enum KnownStatus {
  /** The analysis job is queued */
  Pending = "Pending",
  /** The firmware is currently being extracted */
  Extracting = "Extracting",
  /** Analysis is being run on the firmware */
  Analyzing = "Analyzing",
  /** Analysis job results are ready */
  Ready = "Ready",
  /** An error occurred while running firmware analysis */
  Error = "Error",
}

/**
 * The status of a firmware analysis job. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The analysis job is queued \
 * **Extracting**: The firmware is currently being extracted \
 * **Analyzing**: Analysis is being run on the firmware \
 * **Ready**: Analysis job results are ready \
 * **Error**: An error occurred while running firmware analysis
 */
export type Status = string;

export function statusMessageArraySerializer(result: Array<StatusMessage>): any[] {
  return result.map((item) => {
    return statusMessageSerializer(item);
  });
}

export function statusMessageArrayDeserializer(result: Array<StatusMessage>): any[] {
  return result.map((item) => {
    return statusMessageDeserializer(item);
  });
}

/** Error and status message */
export interface StatusMessage {
  /** The error code */
  errorCode?: number;
  /** The error or status message */
  message?: string;
}

export function statusMessageSerializer(item: StatusMessage): any {
  return { errorCode: item["errorCode"], message: item["message"] };
}

export function statusMessageDeserializer(item: any): StatusMessage {
  return {
    errorCode: item["errorCode"],
    message: item["message"],
  };
}

/** The status of a firmware analysis job. */
export enum KnownProvisioningState {
  /** The request has successfully completed. */
  Succeeded = "Succeeded",
  /** There was an error during the request. */
  Failed = "Failed",
  /** The request was canceled. */
  Canceled = "Canceled",
  /** The request is queued and awaiting execution */
  Pending = "Pending",
  /** The Firmware is currently being extracted. */
  Extracting = "Extracting",
  /** Analysis is being run on the firmware */
  Analyzing = "Analyzing",
}

/**
 * The status of a firmware analysis job. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The request has successfully completed. \
 * **Failed**: There was an error during the request. \
 * **Canceled**: The request was canceled. \
 * **Pending**: The request is queued and awaiting execution \
 * **Extracting**: The Firmware is currently being extracted. \
 * **Analyzing**: Analysis is being run on the firmware
 */
export type ProvisioningState = string;

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

/** Firmware definition */
export interface FirmwareUpdateDefinition {
  /** The editable properties of a firmware */
  properties?: FirmwareProperties;
}

export function firmwareUpdateDefinitionSerializer(item: FirmwareUpdateDefinition): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : firmwarePropertiesSerializer(item["properties"]),
  };
}

/** The response of a Firmware list operation. */
export interface _FirmwareListResult {
  /** The Firmware items on this page */
  value: Firmware[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firmwareListResultDeserializer(item: any): _FirmwareListResult {
  return {
    value: firmwareArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function firmwareArraySerializer(result: Array<Firmware>): any[] {
  return result.map((item) => {
    return firmwareSerializer(item);
  });
}

export function firmwareArrayDeserializer(result: Array<Firmware>): any[] {
  return result.map((item) => {
    return firmwareDeserializer(item);
  });
}

/** Firmware analysis workspace. */
export interface Workspace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceProperties;
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function workspaceDeserializer(item: any): Workspace {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Workspace properties. */
export interface WorkspaceProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return item;
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
export type SkuTier = "Free" | "Basic" | "Standard" | "Premium";

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

/** The type used for update operations of the Workspace. */
export interface WorkspaceUpdate {
  /** The SKU (Stock Keeping Unit) assigned to this resource. */
  sku?: Sku;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function workspaceUpdateSerializer(item: WorkspaceUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** The response of a Workspace list operation. */
export interface _WorkspaceListResult {
  /** The Workspace items on this page */
  value: Workspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceListResultDeserializer(item: any): _WorkspaceListResult {
  return {
    value: workspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceArraySerializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceSerializer(item);
  });
}

export function workspaceArrayDeserializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceDeserializer(item);
  });
}

/** Properties for generating an upload URL */
export interface GenerateUploadUrlRequest {
  /** A unique ID for the firmware to be uploaded. */
  firmwareId?: string;
}

export function generateUploadUrlRequestSerializer(item: GenerateUploadUrlRequest): any {
  return { firmwareId: item["firmwareId"] };
}

/** Url data for creating or accessing a blob file. */
export interface UrlToken {
  /** SAS URL for creating or accessing a blob file. */
  readonly url?: string;
}

export function urlTokenDeserializer(item: any): UrlToken {
  return {
    url: item["url"],
  };
}

/** The response of a BinaryHardeningResource list operation. */
export interface _BinaryHardeningResourceListResult {
  /** The BinaryHardeningResource items on this page */
  value: BinaryHardeningResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _binaryHardeningResourceListResultDeserializer(
  item: any,
): _BinaryHardeningResourceListResult {
  return {
    value: binaryHardeningResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function binaryHardeningResourceArrayDeserializer(
  result: Array<BinaryHardeningResource>,
): any[] {
  return result.map((item) => {
    return binaryHardeningResourceDeserializer(item);
  });
}

/** The object representing a firmware analysis binary hardening result resource */
export interface BinaryHardeningResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BinaryHardeningResult;
}

export function binaryHardeningResourceDeserializer(item: any): BinaryHardeningResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : binaryHardeningResultDeserializer(item["properties"]),
  };
}

/** Binary hardening of a firmware. */
export interface BinaryHardeningResult {
  /** ID for the binary hardening result. */
  binaryHardeningId?: string;
  /** The security hardening features of the binary. */
  securityHardeningFeatures?: BinaryHardeningFeatures;
  /** The architecture of the binary being reported on. */
  executableArchitecture?: string;
  /** The path to the binary in the firmware. */
  filePath?: string;
  /** The executable class to indicate 32 or 64 bit. */
  executableClass?: ExecutableClass;
  /** The runpath property of the uploaded binary, which is a method of specifying additional paths to load objects at runtime. */
  runpath?: string;
  /** The rpath property of the uploaded binary, which is a deprecated method of specifying additional paths to load objects at runtime. */
  rpath?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function binaryHardeningResultDeserializer(item: any): BinaryHardeningResult {
  return {
    binaryHardeningId: item["binaryHardeningId"],
    securityHardeningFeatures: !item["securityHardeningFeatures"]
      ? item["securityHardeningFeatures"]
      : binaryHardeningFeaturesDeserializer(item["securityHardeningFeatures"]),
    executableArchitecture: item["executableArchitecture"],
    filePath: item["filePath"],
    executableClass: item["executableClass"],
    runpath: item["runpath"],
    rpath: item["rpath"],
    provisioningState: item["provisioningState"],
  };
}

/** Binary hardening features. */
export interface BinaryHardeningFeatures {
  /** Flag indicating the binary's stack is set to NX (no-execute). */
  noExecute?: boolean;
  /** Flag indicating the binary was compiled to be a position independent executable. */
  positionIndependentExecutable?: boolean;
  /** Flag indicating the binary has enabled relocation read-only protections. */
  relocationReadOnly?: boolean;
  /** Flag indicating if the binary was compiled with stack canaries enabled. */
  canary?: boolean;
  /** Flag indicating if debug symbols have been stripped from the binary. */
  stripped?: boolean;
}

export function binaryHardeningFeaturesDeserializer(item: any): BinaryHardeningFeatures {
  return {
    noExecute: item["noExecute"],
    positionIndependentExecutable: item["positionIndependentExecutable"],
    relocationReadOnly: item["relocationReadOnly"],
    canary: item["canary"],
    stripped: item["stripped"],
  };
}

/** String to indicate if the executable is 32 or 64 bit. */
export enum KnownExecutableClass {
  /** The binary is 32-bit. */
  X86 = "x86",
  /** The binary is 64-bit. */
  X64 = "x64",
}

/**
 * String to indicate if the executable is 32 or 64 bit. \
 * {@link KnownExecutableClass} can be used interchangeably with ExecutableClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **x86**: The binary is 32-bit. \
 * **x64**: The binary is 64-bit.
 */
export type ExecutableClass = string;

/** The response of a CryptoCertificateResource list operation. */
export interface _CryptoCertificateResourceListResult {
  /** The CryptoCertificateResource items on this page */
  value: CryptoCertificateResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cryptoCertificateResourceListResultDeserializer(
  item: any,
): _CryptoCertificateResourceListResult {
  return {
    value: cryptoCertificateResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cryptoCertificateResourceArrayDeserializer(
  result: Array<CryptoCertificateResource>,
): any[] {
  return result.map((item) => {
    return cryptoCertificateResourceDeserializer(item);
  });
}

/** The object representing a firmware analysis crypto certificate resource */
export interface CryptoCertificateResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CryptoCertificate;
}

export function cryptoCertificateResourceDeserializer(item: any): CryptoCertificateResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cryptoCertificateDeserializer(item["properties"]),
  };
}

/** Crypto certificate properties */
export interface CryptoCertificate {
  /** ID for the certificate result. */
  cryptoCertId?: string;
  /** Name of the certificate. */
  certificateName?: string;
  /** Subject information of the certificate. */
  subject?: CryptoCertificateEntity;
  /** Issuer information of the certificate. */
  issuer?: CryptoCertificateEntity;
  /** Issue date for the certificate. */
  issuedDate?: Date;
  /** Expiration date for the certificate. */
  expirationDate?: Date;
  /** Role of the certificate (Root CA, etc) */
  certificateRole?: string;
  /** The signature algorithm used in the certificate. */
  signatureAlgorithm?: string;
  /** Size of the certificate's key in bits */
  certificateKeySize?: number;
  /** Key algorithm used in the certificate. */
  certificateKeyAlgorithm?: string;
  /** Encoding used for the certificate. */
  encoding?: string;
  /** Serial number of the certificate. */
  serialNumber?: string;
  /** Fingerprint of the certificate. */
  fingerprint?: string;
  /** List of functions the certificate can fulfill. */
  certificateUsage?: CertificateUsage[];
  /** List of files where this certificate was found. */
  readonly filePaths?: string[];
  /** A matching paired private key. */
  pairedKey?: PairedKey;
  /** Indicates if the certificate is expired. */
  isExpired?: boolean;
  /** Indicates if the certificate is self-signed. */
  isSelfSigned?: boolean;
  /** Indicates the signature algorithm used is insecure according to NIST guidance. */
  isWeakSignature?: boolean;
  /** Indicates the certificate's key size is considered too small to be secure for the key algorithm according to NIST guidance. */
  isShortKeySize?: boolean;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function cryptoCertificateDeserializer(item: any): CryptoCertificate {
  return {
    cryptoCertId: item["cryptoCertId"],
    certificateName: item["certificateName"],
    subject: !item["subject"]
      ? item["subject"]
      : cryptoCertificateEntityDeserializer(item["subject"]),
    issuer: !item["issuer"] ? item["issuer"] : cryptoCertificateEntityDeserializer(item["issuer"]),
    issuedDate: !item["issuedDate"] ? item["issuedDate"] : new Date(item["issuedDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    certificateRole: item["certificateRole"],
    signatureAlgorithm: item["signatureAlgorithm"],
    certificateKeySize: item["certificateKeySize"],
    certificateKeyAlgorithm: item["certificateKeyAlgorithm"],
    encoding: item["encoding"],
    serialNumber: item["serialNumber"],
    fingerprint: item["fingerprint"],
    certificateUsage: !item["certificateUsage"]
      ? item["certificateUsage"]
      : item["certificateUsage"].map((p: any) => {
          return p;
        }),
    filePaths: !item["filePaths"]
      ? item["filePaths"]
      : item["filePaths"].map((p: any) => {
          return p;
        }),
    pairedKey: !item["pairedKey"] ? item["pairedKey"] : pairedKeyDeserializer(item["pairedKey"]),
    isExpired: item["isExpired"],
    isSelfSigned: item["isSelfSigned"],
    isWeakSignature: item["isWeakSignature"],
    isShortKeySize: item["isShortKeySize"],
    provisioningState: item["provisioningState"],
  };
}

/** Information on an entity (distinguished name) in a cryptographic certificate. */
export interface CryptoCertificateEntity {
  /** Common name of the certificate entity. */
  commonName?: string;
  /** Organization of the certificate entity. */
  organization?: string;
  /** The organizational unit of the certificate entity. */
  organizationalUnit?: string;
  /** Geographical state or province of the certificate entity. */
  state?: string;
  /** Country code of the certificate entity. */
  country?: string;
}

export function cryptoCertificateEntityDeserializer(item: any): CryptoCertificateEntity {
  return {
    commonName: item["commonName"],
    organization: item["organization"],
    organizationalUnit: item["organizationalUnit"],
    state: item["state"],
    country: item["country"],
  };
}

/** Activities for which the cryptographic certificate can be used. */
export enum KnownCertificateUsage {
  /** This certificate can be used to add a signature to a message */
  DigitalSignature = "digitalSignature",
  /** This certificates provides a non-repudiation service that protects against false denial of a message */
  NonRepudiation = "nonRepudiation",
  /** A synonym for NonRepudiation used in newer x509 certificates */
  ContentCommitment = "contentCommitment",
  /** This certificate can be used to encrypt a private or secret key */
  KeyEncipherment = "keyEncipherment",
  /** This certificate can be used to decrypt a private or secret key */
  DataEncipherment = "dataEncipherment",
  /** This certificate can be used to perform a key agreement, such as with a Diffie-Hellman key exchange */
  KeyAgreement = "keyAgreement",
  /** This certificate can be used to verify a other public keys */
  KeyCertSign = "keyCertSign",
  /** This certificate can be used to verify a certificate revocation list */
  CRLSign = "crlSign",
  /** This certificate can be only be used to encrypt data */
  EncipherOnly = "encipherOnly",
  /** This certificate can only be used to decrypt data */
  DecipherOnly = "decipherOnly",
  /** This certificate can be used to authenticate a server in a TLS/SSL connection */
  ServerAuthentication = "serverAuth",
  /** This certificate can be used to authenticate a client in a TLS/SSL connection */
  ClientAuthentication = "clientAuth",
  /** This certificate can be used to authenticate a code object */
  CodeSigning = "codeSigning",
  /** This certificate can be used to authenticate an email address */
  EmailProtection = "emailProtection",
  /** This certificate binds the hash of an object to a time */
  TimeStamping = "timeStamping",
  /** This certificate can be used to sign OCSP responses */
  OcspSigning = "ocspSigning",
}

/**
 * Activities for which the cryptographic certificate can be used. \
 * {@link KnownCertificateUsage} can be used interchangeably with CertificateUsage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **digitalSignature**: This certificate can be used to add a signature to a message \
 * **nonRepudiation**: This certificates provides a non-repudiation service that protects against false denial of a message \
 * **contentCommitment**: A synonym for NonRepudiation used in newer x509 certificates \
 * **keyEncipherment**: This certificate can be used to encrypt a private or secret key \
 * **dataEncipherment**: This certificate can be used to decrypt a private or secret key \
 * **keyAgreement**: This certificate can be used to perform a key agreement, such as with a Diffie-Hellman key exchange \
 * **keyCertSign**: This certificate can be used to verify a other public keys \
 * **crlSign**: This certificate can be used to verify a certificate revocation list \
 * **encipherOnly**: This certificate can be only be used to encrypt data \
 * **decipherOnly**: This certificate can only be used to decrypt data \
 * **serverAuth**: This certificate can be used to authenticate a server in a TLS\/SSL connection \
 * **clientAuth**: This certificate can be used to authenticate a client in a TLS\/SSL connection \
 * **codeSigning**: This certificate can be used to authenticate a code object \
 * **emailProtection**: This certificate can be used to authenticate an email address \
 * **timeStamping**: This certificate binds the hash of an object to a time \
 * **ocspSigning**: This certificate can be used to sign OCSP responses
 */
export type CertificateUsage = string;

/** Details of a matching paired key or certificate. */
export interface PairedKey {
  /** ID of the paired key or certificate. */
  pairedKeyId?: string;
  /** The type indicating whether the paired object is a key or certificate. */
  type?: string;
}

export function pairedKeyDeserializer(item: any): PairedKey {
  return {
    pairedKeyId: item["pairedKeyId"],
    type: item["type"],
  };
}

/** The response of a CryptoKeyResource list operation. */
export interface _CryptoKeyResourceListResult {
  /** The CryptoKeyResource items on this page */
  value: CryptoKeyResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cryptoKeyResourceListResultDeserializer(item: any): _CryptoKeyResourceListResult {
  return {
    value: cryptoKeyResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cryptoKeyResourceArrayDeserializer(result: Array<CryptoKeyResource>): any[] {
  return result.map((item) => {
    return cryptoKeyResourceDeserializer(item);
  });
}

/** The object representing a firmware analysis crypto key resource */
export interface CryptoKeyResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CryptoKey;
}

export function cryptoKeyResourceDeserializer(item: any): CryptoKeyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cryptoKeyDeserializer(item["properties"]),
  };
}

/** Crypto key properties */
export interface CryptoKey {
  /** ID for the key result. */
  cryptoKeyId?: string;
  /** Type of the key (public or private). */
  keyType?: CryptoKeyType;
  /** Size of the key in bits. */
  cryptoKeySize?: number;
  /** Key algorithm name. */
  keyAlgorithm?: string;
  /** Functions the key can fulfill. */
  usage?: string[];
  /** List of files where this key was found. */
  readonly filePaths?: string[];
  /** A matching paired key or certificate. */
  pairedKey?: PairedKey;
  /** Indicates the key size is considered too small to be secure for the algorithm according to NIST guidance. */
  isShortKeySize?: boolean;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function cryptoKeyDeserializer(item: any): CryptoKey {
  return {
    cryptoKeyId: item["cryptoKeyId"],
    keyType: item["keyType"],
    cryptoKeySize: item["cryptoKeySize"],
    keyAlgorithm: item["keyAlgorithm"],
    usage: !item["usage"]
      ? item["usage"]
      : item["usage"].map((p: any) => {
          return p;
        }),
    filePaths: !item["filePaths"]
      ? item["filePaths"]
      : item["filePaths"].map((p: any) => {
          return p;
        }),
    pairedKey: !item["pairedKey"] ? item["pairedKey"] : pairedKeyDeserializer(item["pairedKey"]),
    isShortKeySize: item["isShortKeySize"],
    provisioningState: item["provisioningState"],
  };
}

/** Different types of cryptographic keys. */
export enum KnownCryptoKeyType {
  /** The key is an asymmetric public key. */
  Public = "Public",
  /** The key is an asymmetric private key. */
  Private = "Private",
}

/**
 * Different types of cryptographic keys. \
 * {@link KnownCryptoKeyType} can be used interchangeably with CryptoKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: The key is an asymmetric public key. \
 * **Private**: The key is an asymmetric private key.
 */
export type CryptoKeyType = string;

/** The response of a CveResource list operation. */
export interface _CveResourceListResult {
  /** The CveResource items on this page */
  value: CveResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cveResourceListResultDeserializer(item: any): _CveResourceListResult {
  return {
    value: cveResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cveResourceArrayDeserializer(result: Array<CveResource>): any[] {
  return result.map((item) => {
    return cveResourceDeserializer(item);
  });
}

/** The object representing a firmware analysis CVE result resource */
export interface CveResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CveResult;
}

export function cveResourceDeserializer(item: any): CveResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cveResultDeserializer(item["properties"]),
  };
}

/** Details of a CVE detected in firmware. */
export interface CveResult {
  /** ID of the CVE result. */
  cveId?: string;
  /** ID of the affected SBOM component. */
  componentId?: string;
  /** Name of the affected SBOM component. */
  componentName?: string;
  /** Version of the affected SBOM component. */
  componentVersion?: string;
  /** Severity of the CVE. */
  severity?: string;
  /** Name of the CVE. */
  cveName?: string;
  /** The most recent CVSS score of the CVE. */
  effectiveCvssScore?: number;
  /** The version of the effectiveCvssScore property. */
  effectiveCvssVersion?: number;
  /** All known CVSS scores for the CVE. */
  cvssScores?: CvssScore[];
  /** The list of reference links for the CVE. */
  readonly links?: CveLink[];
  /** The CVE description. */
  description?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function cveResultDeserializer(item: any): CveResult {
  return {
    cveId: item["cveId"],
    componentId: item["componentId"],
    componentName: item["componentName"],
    componentVersion: item["componentVersion"],
    severity: item["severity"],
    cveName: item["cveName"],
    effectiveCvssScore: item["effectiveCvssScore"],
    effectiveCvssVersion: item["effectiveCvssVersion"],
    cvssScores: !item["cvssScores"]
      ? item["cvssScores"]
      : cvssScoreArrayDeserializer(item["cvssScores"]),
    links: !item["links"] ? item["links"] : cveLinkArrayDeserializer(item["links"]),
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

export function cvssScoreArrayDeserializer(result: Array<CvssScore>): any[] {
  return result.map((item) => {
    return cvssScoreDeserializer(item);
  });
}

/** Common Vulnerability Scoring System values. */
export interface CvssScore {
  /** The version of the Common Vulnerability Scoring System (CVSS). */
  version: number;
  /** The score of the CVE according to the CVSS specified. */
  score?: number;
}

export function cvssScoreDeserializer(item: any): CvssScore {
  return {
    version: item["version"],
    score: item["score"],
  };
}

export function cveLinkArrayDeserializer(result: Array<CveLink>): any[] {
  return result.map((item) => {
    return cveLinkDeserializer(item);
  });
}

/** Properties of a reference link for a CVE. */
export interface CveLink {
  /** The destination of the reference link. */
  href?: string;
  /** The label of the reference link. */
  label?: string;
}

export function cveLinkDeserializer(item: any): CveLink {
  return {
    href: item["href"],
    label: item["label"],
  };
}

/** The response of a PasswordHashResource list operation. */
export interface _PasswordHashResourceListResult {
  /** The PasswordHashResource items on this page */
  value: PasswordHashResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _passwordHashResourceListResultDeserializer(
  item: any,
): _PasswordHashResourceListResult {
  return {
    value: passwordHashResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function passwordHashResourceArrayDeserializer(result: Array<PasswordHashResource>): any[] {
  return result.map((item) => {
    return passwordHashResourceDeserializer(item);
  });
}

/** The object representing a firmware analysis password hash result resource */
export interface PasswordHashResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PasswordHash;
}

export function passwordHashResourceDeserializer(item: any): PasswordHashResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : passwordHashDeserializer(item["properties"]),
  };
}

/** Password hash properties */
export interface PasswordHash {
  /** ID for password hash */
  passwordHashId?: string;
  /** File path of the password hash */
  filePath?: string;
  /** Salt of the password hash */
  salt?: string;
  /** Hash of the password */
  hash?: string;
  /** Context of password hash */
  context?: string;
  /** User name of password hash */
  username?: string;
  /** Algorithm of the password hash */
  algorithm?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function passwordHashDeserializer(item: any): PasswordHash {
  return {
    passwordHashId: item["passwordHashId"],
    filePath: item["filePath"],
    salt: item["salt"],
    hash: item["hash"],
    context: item["context"],
    username: item["username"],
    algorithm: item["algorithm"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a SbomComponentResource list operation. */
export interface _SbomComponentResourceListResult {
  /** The SbomComponentResource items on this page */
  value: SbomComponentResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sbomComponentResourceListResultDeserializer(
  item: any,
): _SbomComponentResourceListResult {
  return {
    value: sbomComponentResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sbomComponentResourceArrayDeserializer(
  result: Array<SbomComponentResource>,
): any[] {
  return result.map((item) => {
    return sbomComponentResourceDeserializer(item);
  });
}

/** The object representing a firmware analysis SBOM component result resource */
export interface SbomComponentResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SbomComponent;
}

export function sbomComponentResourceDeserializer(item: any): SbomComponentResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sbomComponentDeserializer(item["properties"]),
  };
}

/** SBOM component of a firmware. */
export interface SbomComponent {
  /** ID for the component. */
  componentId?: string;
  /** Name for the component. */
  componentName?: string;
  /** Version for the component. */
  version?: string;
  /** License for the component. */
  license?: string;
  /** File paths related to the component. Note, relatedFiles should be used instead of this property. */
  filePaths?: string[];
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function sbomComponentDeserializer(item: any): SbomComponent {
  return {
    componentId: item["componentId"],
    componentName: item["componentName"],
    version: item["version"],
    license: item["license"],
    filePaths: !item["filePaths"]
      ? item["filePaths"]
      : item["filePaths"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** The object representing a firmware analysis summary resource. */
export interface SummaryResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SummaryResourcePropertiesUnion;
}

export function summaryResourceDeserializer(item: any): SummaryResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : summaryResourcePropertiesUnionDeserializer(item["properties"]),
  };
}

/** Properties of an analysis summary. */
export interface SummaryResourceProperties {
  /** The type of summary. */
  /** The discriminator possible values: Firmware, CommonVulnerabilitiesAndExposures, BinaryHardening, CryptoCertificate, CryptoKey */
  summaryType: SummaryType;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function summaryResourcePropertiesDeserializer(item: any): SummaryResourceProperties {
  return {
    summaryType: item["summaryType"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for SummaryResourcePropertiesUnion */
export type SummaryResourcePropertiesUnion =
  | FirmwareSummary
  | CveSummary
  | BinaryHardeningSummaryResource
  | CryptoCertificateSummaryResource
  | CryptoKeySummaryResource
  | SummaryResourceProperties;

export function summaryResourcePropertiesUnionDeserializer(
  item: any,
): SummaryResourcePropertiesUnion {
  switch (item.summaryType) {
    case "Firmware":
      return firmwareSummaryDeserializer(item as FirmwareSummary);

    case "CommonVulnerabilitiesAndExposures":
      return cveSummaryDeserializer(item as CveSummary);

    case "BinaryHardening":
      return binaryHardeningSummaryResourceDeserializer(item as BinaryHardeningSummaryResource);

    case "CryptoCertificate":
      return cryptoCertificateSummaryResourceDeserializer(item as CryptoCertificateSummaryResource);

    case "CryptoKey":
      return cryptoKeySummaryResourceDeserializer(item as CryptoKeySummaryResource);

    default:
      return summaryResourcePropertiesDeserializer(item);
  }
}

/** Describes the type of summary. */
export enum KnownSummaryType {
  /** The summary contains information about the submitted firmware */
  Firmware = "Firmware",
  /** The summary contains information about the Common Vulnerabilities and Exposures analysis results */
  CommonVulnerabilitiesAndExposures = "CommonVulnerabilitiesAndExposures",
  /** The summary contains information about the binary hardening analysis results */
  BinaryHardening = "BinaryHardening",
  /** The summary contains information about the cryptographic certificate analysis results */
  CryptoCertificate = "CryptoCertificate",
  /** The summary contains information about the cryptographic key analysis results */
  CryptoKey = "CryptoKey",
}

/**
 * Describes the type of summary. \
 * {@link KnownSummaryType} can be used interchangeably with SummaryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Firmware**: The summary contains information about the submitted firmware \
 * **CommonVulnerabilitiesAndExposures**: The summary contains information about the Common Vulnerabilities and Exposures analysis results \
 * **BinaryHardening**: The summary contains information about the binary hardening analysis results \
 * **CryptoCertificate**: The summary contains information about the cryptographic certificate analysis results \
 * **CryptoKey**: The summary contains information about the cryptographic key analysis results
 */
export type SummaryType = string;

/** Properties for high level summary of firmware analysis results. */
export interface FirmwareSummary extends SummaryResourceProperties {
  /** Total extracted size of the firmware in bytes. */
  extractedSize?: number;
  /** Firmware file size in bytes. */
  fileSize?: number;
  /** Extracted file count. */
  extractedFileCount?: number;
  /** Components count. */
  componentCount?: number;
  /** Binary count */
  binaryCount?: number;
  /** Time used for analysis */
  analysisTimeSeconds?: number;
  /** The number of root file systems found. */
  rootFileSystems?: number;
  /** Describes the type of summary. */
  summaryType: "Firmware";
}

export function firmwareSummaryDeserializer(item: any): FirmwareSummary {
  return {
    summaryType: item["summaryType"],
    provisioningState: item["provisioningState"],
    extractedSize: item["extractedSize"],
    fileSize: item["fileSize"],
    extractedFileCount: item["extractedFileCount"],
    componentCount: item["componentCount"],
    binaryCount: item["binaryCount"],
    analysisTimeSeconds: item["analysisTimeSeconds"],
    rootFileSystems: item["rootFileSystems"],
  };
}

/** Properties for a CVE analysis summary. */
export interface CveSummary extends SummaryResourceProperties {
  /** The total number of critical severity CVEs detected */
  criticalCveCount?: number;
  /** The total number of high severity CVEs detected */
  highCveCount?: number;
  /** The total number of medium severity CVEs detected */
  mediumCveCount?: number;
  /** The total number of low severity CVEs detected */
  lowCveCount?: number;
  /** The total number of unknown severity CVEs detected */
  unknownCveCount?: number;
  /** Describes the type of summary object. */
  summaryType: "CommonVulnerabilitiesAndExposures";
}

export function cveSummaryDeserializer(item: any): CveSummary {
  return {
    summaryType: item["summaryType"],
    provisioningState: item["provisioningState"],
    criticalCveCount: item["criticalCveCount"],
    highCveCount: item["highCveCount"],
    mediumCveCount: item["mediumCveCount"],
    lowCveCount: item["lowCveCount"],
    unknownCveCount: item["unknownCveCount"],
  };
}

/** Properties for a binary hardening analysis summary. */
export interface BinaryHardeningSummaryResource extends SummaryResourceProperties {
  /** Total number of binaries that were analyzed */
  totalFiles?: number;
  /** Total number of analyzed files that were found to have a nonexecutable stack */
  notExecutableStackCount?: number;
  /** Total number of analyzed files that were compiled to be a position independent executable */
  positionIndependentExecutableCount?: number;
  /** Total number of analyzed files that have enabled relocation read-only protections */
  relocationReadOnlyCount?: number;
  /** Total number of analyzed files that have stack canaries enabled */
  stackCanaryCount?: number;
  /** Total number of analyzed files that have debug symbols stripped */
  strippedBinaryCount?: number;
  /** Describes the type of summary object. */
  summaryType: "BinaryHardening";
}

export function binaryHardeningSummaryResourceDeserializer(
  item: any,
): BinaryHardeningSummaryResource {
  return {
    summaryType: item["summaryType"],
    provisioningState: item["provisioningState"],
    totalFiles: item["totalFiles"],
    notExecutableStackCount: item["notExecutableStackCount"],
    positionIndependentExecutableCount: item["positionIndependentExecutableCount"],
    relocationReadOnlyCount: item["relocationReadOnlyCount"],
    stackCanaryCount: item["stackCanaryCount"],
    strippedBinaryCount: item["strippedBinaryCount"],
  };
}

/** Properties for cryptographic certificate summary. */
export interface CryptoCertificateSummaryResource extends SummaryResourceProperties {
  /** Total number of certificates found. */
  totalCertificateCount?: number;
  /** Total number of paired private keys found for the certificates. */
  pairedKeyCount?: number;
  /** Total number of expired certificates found. */
  expiredCertificateCount?: number;
  /** Total number of nearly expired certificates found. */
  expiringSoonCertificateCount?: number;
  /** Total number of certificates found using a weak signature algorithm. */
  weakSignatureCount?: number;
  /** Total number of certificates found that are self-signed. */
  selfSignedCertificateCount?: number;
  /** Total number of certificates found that have an insecure key size for the key algorithm. */
  shortKeySizeCount?: number;
  /** Describes the type of summary. */
  summaryType: "CryptoCertificate";
}

export function cryptoCertificateSummaryResourceDeserializer(
  item: any,
): CryptoCertificateSummaryResource {
  return {
    summaryType: item["summaryType"],
    provisioningState: item["provisioningState"],
    totalCertificateCount: item["totalCertificateCount"],
    pairedKeyCount: item["pairedKeyCount"],
    expiredCertificateCount: item["expiredCertificateCount"],
    expiringSoonCertificateCount: item["expiringSoonCertificateCount"],
    weakSignatureCount: item["weakSignatureCount"],
    selfSignedCertificateCount: item["selfSignedCertificateCount"],
    shortKeySizeCount: item["shortKeySizeCount"],
  };
}

/** Properties for cryptographic key summary. */
export interface CryptoKeySummaryResource extends SummaryResourceProperties {
  /** Total number of cryptographic keys found. */
  totalKeyCount?: number;
  /** Total number of (non-certificate) public keys found. */
  publicKeyCount?: number;
  /** Total number of private keys found. */
  privateKeyCount?: number;
  /** Total number of keys found that have a matching paired key or certificate. */
  pairedKeyCount?: number;
  /** Total number of keys found that have an insecure key size for the algorithm. */
  shortKeySizeCount?: number;
  /** Describes the type of summary. */
  summaryType: "CryptoKey";
}

export function cryptoKeySummaryResourceDeserializer(item: any): CryptoKeySummaryResource {
  return {
    summaryType: item["summaryType"],
    provisioningState: item["provisioningState"],
    totalKeyCount: item["totalKeyCount"],
    publicKeyCount: item["publicKeyCount"],
    privateKeyCount: item["privateKeyCount"],
    pairedKeyCount: item["pairedKeyCount"],
    shortKeySizeCount: item["shortKeySizeCount"],
  };
}

/** The response of a SummaryResource list operation. */
export interface _SummaryResourceListResult {
  /** The SummaryResource items on this page */
  value: SummaryResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _summaryResourceListResultDeserializer(item: any): _SummaryResourceListResult {
  return {
    value: summaryResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function summaryResourceArrayDeserializer(result: Array<SummaryResource>): any[] {
  return result.map((item) => {
    return summaryResourceDeserializer(item);
  });
}

/** The object representing how many firmwares the user has uploaded to the workspace. */
export interface UsageMetric extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UsageMetricProperties;
}

export function usageMetricDeserializer(item: any): UsageMetric {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : usageMetricPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a workspaces usage metrics. */
export interface UsageMetricProperties {
  /** The number of firmware analysis jobs that have been submitted in the current month. */
  readonly monthlyFirmwareUploadCount: number;
  /** The total number of firmwares that are in the workspace. */
  readonly totalFirmwareCount: number;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function usageMetricPropertiesDeserializer(item: any): UsageMetricProperties {
  return {
    monthlyFirmwareUploadCount: item["monthlyFirmwareUploadCount"],
    totalFirmwareCount: item["totalFirmwareCount"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a UsageMetric list operation. */
export interface _UsageMetricListResult {
  /** The UsageMetric items on this page */
  value: UsageMetric[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usageMetricListResultDeserializer(item: any): _UsageMetricListResult {
  return {
    value: usageMetricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageMetricArrayDeserializer(result: Array<UsageMetric>): any[] {
  return result.map((item) => {
    return usageMetricDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-01 API version. */
  V20250401Preview = "2025-04-01-preview",
}
