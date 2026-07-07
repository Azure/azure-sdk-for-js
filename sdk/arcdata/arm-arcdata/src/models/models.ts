// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list Azure Data Services on Azure Arc operations. */
export interface _OperationListResult {
  /** Array of results. */
  readonly value?: Operation[];
  /** Link to retrieve next page of results. */
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

/** Azure Data Services on Azure Arc operation definition. */
export interface Operation {
  /** The name of the operation being performed on this particular object. */
  name: string;
  /** The localized display information for this particular operation / action. */
  display: OperationDisplay;
  /** The intended executor of the operation. */
  readonly origin?: OperationOrigin;
  /** Indicates whether the operation is a data action */
  isDataAction: boolean;
  /** Additional descriptions for the operation. */
  readonly properties?: Record<string, any>;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    isDataAction: item["isDataAction"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name. */
  provider: string;
  /** The localized friendly form of the resource type related to this action/operation. */
  resource: string;
  /** The localized friendly name for the operation. */
  operation: string;
  /** The localized friendly description for the operation. */
  description: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation. */
export enum KnownOperationOrigin {
  /** user */
  User = "user",
  /** system */
  System = "system",
}

/**
 * The intended executor of the operation. \
 * {@link KnownOperationOrigin} can be used interchangeably with OperationOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: user \
 * **system**: system
 */
export type OperationOrigin = string;

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

/** A SqlManagedInstance. */
export interface SqlManagedInstance extends TrackedResource {
  /** null */
  properties: SqlManagedInstanceProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
  /** Resource sku. */
  sku?: SqlManagedInstanceSku;
}

export function sqlManagedInstanceSerializer(item: SqlManagedInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: sqlManagedInstancePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : sqlManagedInstanceSkuSerializer(item["sku"]),
  };
}

export function sqlManagedInstanceDeserializer(item: any): SqlManagedInstance {
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
    properties: sqlManagedInstancePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : sqlManagedInstanceSkuDeserializer(item["sku"]),
  };
}

/** Properties of sqlManagedInstance. */
export interface SqlManagedInstanceProperties {
  /** null */
  dataControllerId?: string;
  /** The instance admin user */
  admin?: string;
  /** The instance start time */
  startTime?: string;
  /** The instance end time */
  endTime?: string;
  /** The raw kubernetes information */
  k8SRaw?: SqlManagedInstanceK8SRaw;
  /** Username and password for basic authentication. */
  basicLoginInformation?: BasicLoginInformation;
  /** Last uploaded date from Kubernetes cluster. Defaults to current date time */
  lastUploadedDate?: Date;
  /** The provisioning state of the Arc-enabled SQL Managed Instance resource. */
  readonly provisioningState?: string;
  /** Active Directory information related to this SQL Managed Instance. */
  activeDirectoryInformation?: ActiveDirectoryInformation;
  /** The license type to apply for this managed instance. */
  licenseType?: ArcSqlManagedInstanceLicenseType;
  /** If a CustomLocation is provided, this contains the ARM id of the connected cluster the custom location belongs to. */
  clusterId?: string;
  /** If a CustomLocation is provided, this contains the ARM id of the extension the custom location belongs to. */
  extensionId?: string;
}

export function sqlManagedInstancePropertiesSerializer(item: SqlManagedInstanceProperties): any {
  return {
    dataControllerId: item["dataControllerId"],
    admin: item["admin"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    k8sRaw: !item["k8SRaw"] ? item["k8SRaw"] : sqlManagedInstanceK8SRawSerializer(item["k8SRaw"]),
    basicLoginInformation: !item["basicLoginInformation"]
      ? item["basicLoginInformation"]
      : basicLoginInformationSerializer(item["basicLoginInformation"]),
    lastUploadedDate: !item["lastUploadedDate"]
      ? item["lastUploadedDate"]
      : item["lastUploadedDate"].toISOString(),
    activeDirectoryInformation: !item["activeDirectoryInformation"]
      ? item["activeDirectoryInformation"]
      : activeDirectoryInformationSerializer(item["activeDirectoryInformation"]),
    licenseType: item["licenseType"],
    clusterId: item["clusterId"],
    extensionId: item["extensionId"],
  };
}

export function sqlManagedInstancePropertiesDeserializer(item: any): SqlManagedInstanceProperties {
  return {
    dataControllerId: item["dataControllerId"],
    admin: item["admin"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    k8SRaw: !item["k8sRaw"] ? item["k8sRaw"] : sqlManagedInstanceK8SRawDeserializer(item["k8sRaw"]),
    basicLoginInformation: !item["basicLoginInformation"]
      ? item["basicLoginInformation"]
      : basicLoginInformationDeserializer(item["basicLoginInformation"]),
    lastUploadedDate: !item["lastUploadedDate"]
      ? item["lastUploadedDate"]
      : new Date(item["lastUploadedDate"]),
    provisioningState: item["provisioningState"],
    activeDirectoryInformation: !item["activeDirectoryInformation"]
      ? item["activeDirectoryInformation"]
      : activeDirectoryInformationDeserializer(item["activeDirectoryInformation"]),
    licenseType: item["licenseType"],
    clusterId: item["clusterId"],
    extensionId: item["extensionId"],
  };
}

/** The raw kubernetes information. */
export interface SqlManagedInstanceK8SRaw {
  /** The kubernetes spec information. */
  spec?: SqlManagedInstanceK8SSpec;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function sqlManagedInstanceK8SRawSerializer(item: SqlManagedInstanceK8SRaw): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    spec: !item["spec"] ? item["spec"] : sqlManagedInstanceK8SSpecSerializer(item["spec"]),
  };
}

export function sqlManagedInstanceK8SRawDeserializer(item: any): SqlManagedInstanceK8SRaw {
  return {
    additionalProperties: serializeRecord(item, ["spec"]),
    spec: !item["spec"] ? item["spec"] : sqlManagedInstanceK8SSpecDeserializer(item["spec"]),
  };
}

/** The kubernetes spec information. */
export interface SqlManagedInstanceK8SSpec {
  /** The kubernetes scheduling information. */
  scheduling?: K8SScheduling;
  /** This option specifies the number of SQL Managed Instance replicas that will be deployed in your Kubernetes cluster for high availability purposes. If sku.tier is BusinessCritical, allowed values are '2' or '3' with default of '3'. If sku.tier is GeneralPurpose, replicas must be '1'. */
  replicas?: number;
  /** The kubernetes security information. */
  security?: K8SSecurity;
  /** The kubernetes settings information. */
  settings?: K8SSettings;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function sqlManagedInstanceK8SSpecSerializer(item: SqlManagedInstanceK8SSpec): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    scheduling: !item["scheduling"]
      ? item["scheduling"]
      : k8SSchedulingSerializer(item["scheduling"]),
    replicas: item["replicas"],
    security: !item["security"] ? item["security"] : k8SSecuritySerializer(item["security"]),
    settings: !item["settings"] ? item["settings"] : k8SSettingsSerializer(item["settings"]),
  };
}

export function sqlManagedInstanceK8SSpecDeserializer(item: any): SqlManagedInstanceK8SSpec {
  return {
    additionalProperties: serializeRecord(item, ["scheduling", "replicas", "security", "settings"]),
    scheduling: !item["scheduling"]
      ? item["scheduling"]
      : k8SSchedulingDeserializer(item["scheduling"]),
    replicas: item["replicas"],
    security: !item["security"] ? item["security"] : k8SSecurityDeserializer(item["security"]),
    settings: !item["settings"] ? item["settings"] : k8SSettingsDeserializer(item["settings"]),
  };
}

/** The kubernetes scheduling information. */
export interface K8SScheduling {
  /** The kubernetes scheduling options. It describes restrictions used to help Kubernetes select appropriate nodes to host the database service */
  default?: K8SSchedulingOptions;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function k8SSchedulingSerializer(item: K8SScheduling): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    default: !item["default"] ? item["default"] : k8SSchedulingOptionsSerializer(item["default"]),
  };
}

export function k8SSchedulingDeserializer(item: any): K8SScheduling {
  return {
    additionalProperties: serializeRecord(item, ["default"]),
    default: !item["default"] ? item["default"] : k8SSchedulingOptionsDeserializer(item["default"]),
  };
}

/** The kubernetes scheduling options. It describes restrictions used to help Kubernetes select appropriate nodes to host the database service */
export interface K8SSchedulingOptions {
  /** The kubernetes resource limits and requests used to restrict or reserve resource usage. */
  resources?: K8SResourceRequirements;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function k8SSchedulingOptionsSerializer(item: K8SSchedulingOptions): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    resources: !item["resources"]
      ? item["resources"]
      : k8SResourceRequirementsSerializer(item["resources"]),
  };
}

export function k8SSchedulingOptionsDeserializer(item: any): K8SSchedulingOptions {
  return {
    additionalProperties: serializeRecord(item, ["resources"]),
    resources: !item["resources"]
      ? item["resources"]
      : k8SResourceRequirementsDeserializer(item["resources"]),
  };
}

/** The kubernetes resource limits and requests used to restrict or reserve resource usage. */
export interface K8SResourceRequirements {
  /** Requests for a kubernetes resource type (e.g 'cpu', 'memory'). The 'cpu' request must be less than or equal to 'cpu' limit. Default 'cpu' is 2, minimum is 1. Default 'memory' is '4Gi', minimum is '2Gi. If sku.tier is GeneralPurpose, maximum 'cpu' is 24 and maximum 'memory' is '128Gi'. */
  requests?: Record<string, string>;
  /** Limits for a kubernetes resource type (e.g 'cpu', 'memory'). The 'cpu' request must be less than or equal to 'cpu' limit. Default 'cpu' is 2, minimum is 1. Default 'memory' is '4Gi', minimum is '2Gi. If sku.tier is GeneralPurpose, maximum 'cpu' is 24 and maximum 'memory' is '128Gi'. */
  limits?: Record<string, string>;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function k8SResourceRequirementsSerializer(item: K8SResourceRequirements): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    requests: item["requests"],
    limits: item["limits"],
  };
}

export function k8SResourceRequirementsDeserializer(item: any): K8SResourceRequirements {
  return {
    additionalProperties: serializeRecord(item, ["requests", "limits"]),
    requests: !item["requests"]
      ? item["requests"]
      : Object.fromEntries(Object.entries(item["requests"]).map(([k, p]: [string, any]) => [k, p])),
    limits: !item["limits"]
      ? item["limits"]
      : Object.fromEntries(Object.entries(item["limits"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The kubernetes security information. */
export interface K8SSecurity {
  /** Admin login secret key */
  adminLoginSecret?: string;
  /** Service certificate secret used */
  serviceCertificateSecret?: string;
  /** The kubernetes active directory information. */
  activeDirectory?: K8SActiveDirectory;
  /** Transparent data encryption information. */
  transparentDataEncryption?: K8StransparentDataEncryption;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function k8SSecuritySerializer(item: K8SSecurity): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    adminLoginSecret: item["adminLoginSecret"],
    serviceCertificateSecret: item["serviceCertificateSecret"],
    activeDirectory: !item["activeDirectory"]
      ? item["activeDirectory"]
      : k8SActiveDirectorySerializer(item["activeDirectory"]),
    transparentDataEncryption: !item["transparentDataEncryption"]
      ? item["transparentDataEncryption"]
      : k8StransparentDataEncryptionSerializer(item["transparentDataEncryption"]),
  };
}

export function k8SSecurityDeserializer(item: any): K8SSecurity {
  return {
    additionalProperties: serializeRecord(item, [
      "adminLoginSecret",
      "serviceCertificateSecret",
      "activeDirectory",
      "transparentDataEncryption",
    ]),
    adminLoginSecret: item["adminLoginSecret"],
    serviceCertificateSecret: item["serviceCertificateSecret"],
    activeDirectory: !item["activeDirectory"]
      ? item["activeDirectory"]
      : k8SActiveDirectoryDeserializer(item["activeDirectory"]),
    transparentDataEncryption: !item["transparentDataEncryption"]
      ? item["transparentDataEncryption"]
      : k8StransparentDataEncryptionDeserializer(item["transparentDataEncryption"]),
  };
}

/** The kubernetes active directory information. */
export interface K8SActiveDirectory {
  connector?: K8SActiveDirectoryConnector;
  /** Account name for AAD */
  accountName?: string;
  /** Keytab secret used to authenticate with Active Directory. */
  keytabSecret?: string;
  /** An array of encryption types */
  encryptionTypes?: string[];
}

export function k8SActiveDirectorySerializer(item: K8SActiveDirectory): any {
  return {
    connector: !item["connector"]
      ? item["connector"]
      : k8SActiveDirectoryConnectorSerializer(item["connector"]),
    accountName: item["accountName"],
    keytabSecret: item["keytabSecret"],
    encryptionTypes: !item["encryptionTypes"]
      ? item["encryptionTypes"]
      : item["encryptionTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function k8SActiveDirectoryDeserializer(item: any): K8SActiveDirectory {
  return {
    connector: !item["connector"]
      ? item["connector"]
      : k8SActiveDirectoryConnectorDeserializer(item["connector"]),
    accountName: item["accountName"],
    keytabSecret: item["keytabSecret"],
    encryptionTypes: !item["encryptionTypes"]
      ? item["encryptionTypes"]
      : item["encryptionTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface K8SActiveDirectoryConnector */
export interface K8SActiveDirectoryConnector {
  /** Name of the connector */
  name?: string;
  /** Name space of the connector */
  namespace?: string;
}

export function k8SActiveDirectoryConnectorSerializer(item: K8SActiveDirectoryConnector): any {
  return { name: item["name"], namespace: item["namespace"] };
}

export function k8SActiveDirectoryConnectorDeserializer(item: any): K8SActiveDirectoryConnector {
  return {
    name: item["name"],
    namespace: item["namespace"],
  };
}

/** Transparent data encryption information. */
export interface K8StransparentDataEncryption {
  /** Transparent data encryption mode. Can be Service Managed, Customer managed or disabled */
  mode?: string;
  /** Protector secret for customer managed Transparent data encryption mode */
  protectorSecret?: string;
}

export function k8StransparentDataEncryptionSerializer(item: K8StransparentDataEncryption): any {
  return { mode: item["mode"], protectorSecret: item["protectorSecret"] };
}

export function k8StransparentDataEncryptionDeserializer(item: any): K8StransparentDataEncryption {
  return {
    mode: item["mode"],
    protectorSecret: item["protectorSecret"],
  };
}

/** The kubernetes settings information. */
export interface K8SSettings {
  /** The kubernetes network settings information. */
  network?: K8SNetworkSettings;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function k8SSettingsSerializer(item: K8SSettings): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    network: !item["network"] ? item["network"] : k8SNetworkSettingsSerializer(item["network"]),
  };
}

export function k8SSettingsDeserializer(item: any): K8SSettings {
  return {
    additionalProperties: serializeRecord(item, ["network"]),
    network: !item["network"] ? item["network"] : k8SNetworkSettingsDeserializer(item["network"]),
  };
}

/** The kubernetes network settings information. */
export interface K8SNetworkSettings {
  /** If 1, then SQL Server forces all connections to be encrypted. By default, this option is 0 */
  forceencryption?: number;
  /** Specifies which ciphers are allowed by SQL Server for TLS */
  tlsciphers?: string;
  /** A comma-separated list of which TLS protocols are allowed by SQL Server */
  tlsprotocols?: string;
}

export function k8SNetworkSettingsSerializer(item: K8SNetworkSettings): any {
  return {
    forceencryption: item["forceencryption"],
    tlsciphers: item["tlsciphers"],
    tlsprotocols: item["tlsprotocols"],
  };
}

export function k8SNetworkSettingsDeserializer(item: any): K8SNetworkSettings {
  return {
    forceencryption: item["forceencryption"],
    tlsciphers: item["tlsciphers"],
    tlsprotocols: item["tlsprotocols"],
  };
}

/** Username and password for basic login authentication. */
export interface BasicLoginInformation {
  /** Login username. */
  username?: string;
  /** Login password. */
  password?: string;
}

export function basicLoginInformationSerializer(item: BasicLoginInformation): any {
  return { username: item["username"], password: item["password"] };
}

export function basicLoginInformationDeserializer(item: any): BasicLoginInformation {
  return {
    username: item["username"],
    password: item["password"],
  };
}

/** Active Directory information that related to the resource. */
export interface ActiveDirectoryInformation {
  /** Keytab information that is used for the Sql Managed Instance when Active Directory authentication is used. */
  keytabInformation?: KeytabInformation;
}

export function activeDirectoryInformationSerializer(item: ActiveDirectoryInformation): any {
  return {
    keytabInformation: !item["keytabInformation"]
      ? item["keytabInformation"]
      : keytabInformationSerializer(item["keytabInformation"]),
  };
}

export function activeDirectoryInformationDeserializer(item: any): ActiveDirectoryInformation {
  return {
    keytabInformation: !item["keytabInformation"]
      ? item["keytabInformation"]
      : keytabInformationDeserializer(item["keytabInformation"]),
  };
}

/** Keytab used for authenticate with Active Directory. */
export interface KeytabInformation {
  /** A base64-encoded keytab. */
  keytab?: string;
}

export function keytabInformationSerializer(item: KeytabInformation): any {
  return { keytab: item["keytab"] };
}

export function keytabInformationDeserializer(item: any): KeytabInformation {
  return {
    keytab: item["keytab"],
  };
}

/** The license type to apply for this managed instance. */
export enum KnownArcSqlManagedInstanceLicenseType {
  /** BasePrice */
  BasePrice = "BasePrice",
  /** LicenseIncluded */
  LicenseIncluded = "LicenseIncluded",
  /** DisasterRecovery */
  DisasterRecovery = "DisasterRecovery",
}

/**
 * The license type to apply for this managed instance. \
 * {@link KnownArcSqlManagedInstanceLicenseType} can be used interchangeably with ArcSqlManagedInstanceLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BasePrice**: BasePrice \
 * **LicenseIncluded**: LicenseIncluded \
 * **DisasterRecovery**: DisasterRecovery
 */
export type ArcSqlManagedInstanceLicenseType = string;

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of extendedLocation. */
export enum KnownExtendedLocationTypes {
  /** CustomLocation */
  CustomLocation = "CustomLocation",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomLocation**: CustomLocation
 */
export type ExtendedLocationTypes = string;

/** The resource model definition representing SKU for Azure Managed Instance - Azure Arc */
export interface SqlManagedInstanceSku {
  /** The name of the SKU. */
  name: "vCore";
  /** The pricing tier for the instance. */
  tier?: SqlManagedInstanceSkuTier;
  /** Whether dev/test is enabled. When the dev field is set to true, the resource is used for dev/test purpose. */
  dev?: boolean;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** The SKU family */
  family?: string;
  /** The SKU capacity */
  capacity?: number;
}

export function sqlManagedInstanceSkuSerializer(item: SqlManagedInstanceSku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    dev: item["dev"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function sqlManagedInstanceSkuDeserializer(item: any): SqlManagedInstanceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    dev: item["dev"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** The pricing tier for the instance. */
export type SqlManagedInstanceSkuTier = "GeneralPurpose" | "BusinessCritical";

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

/** An update to a SQL Managed Instance. */
export interface SqlManagedInstanceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function sqlManagedInstanceUpdateSerializer(item: SqlManagedInstanceUpdate): any {
  return { tags: item["tags"] };
}

/** A list of SqlManagedInstance. */
export interface _SqlManagedInstanceListResult {
  /** Array of results. */
  readonly value?: SqlManagedInstance[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _sqlManagedInstanceListResultDeserializer(
  item: any,
): _SqlManagedInstanceListResult {
  return {
    value: !item["value"] ? item["value"] : sqlManagedInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlManagedInstanceArraySerializer(result: Array<SqlManagedInstance>): any[] {
  return result.map((item) => {
    return sqlManagedInstanceSerializer(item);
  });
}

export function sqlManagedInstanceArrayDeserializer(result: Array<SqlManagedInstance>): any[] {
  return result.map((item) => {
    return sqlManagedInstanceDeserializer(item);
  });
}

/** A SqlServerInstance. */
export interface SqlServerInstance extends TrackedResource {
  /** null */
  properties?: SqlServerInstanceProperties;
}

export function sqlServerInstanceSerializer(item: SqlServerInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlServerInstancePropertiesSerializer(item["properties"]),
  };
}

export function sqlServerInstanceDeserializer(item: any): SqlServerInstance {
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
      : sqlServerInstancePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of SqlServerInstance. */
export interface SqlServerInstanceProperties {
  /** SQL Server version. */
  version?: SqlVersion;
  /** SQL Server edition. */
  edition?: EditionType;
  /** ARM Resource id of the container resource (Azure Arc for Servers). */
  readonly containerResourceId?: string;
  /** The unique ID of the hybrid machine that this resource belongs to. */
  readonly vmId?: string;
  /** The time when the resource was created. */
  readonly createTime?: string;
  /** The number of logical processors used by the SQL Server instance. */
  readonly vCore?: string;
  /** The number of total cores of the Operating System Environment (OSE) hosting the SQL Server instance. */
  cores?: string;
  /** The cloud connectivity status. */
  readonly status?: ConnectionStatus;
  /** Indicates the discovery agent or client for this instance. */
  discoverySource?: DiscoverySource;
  /** SQL Server update level. */
  readonly patchLevel?: string;
  /** SQL Server collation. */
  readonly collation?: string;
  /** Indicates whether database master key exists in SQL Server. */
  readonly dbMasterKeyExists?: boolean;
  /** Indicates whether always On availability groups is enabled in SQL Server. */
  readonly isHadrEnabled?: boolean;
  /** An array of integers, where each value represents the enabled trace flags in SQL Server. */
  readonly traceFlags?: number[];
  /** SQL Server current version. */
  readonly currentVersion?: string;
  /** SQL Server instance name. */
  instanceName?: string;
  /** Dynamic TCP ports used by SQL Server. */
  readonly tcpDynamicPorts?: string;
  /** Static TCP ports used by SQL Server. */
  readonly tcpStaticPorts?: string;
  /** SQL Server product ID. */
  readonly productId?: string;
  /** SQL Server license type. */
  readonly licenseType?: ArcSqlServerLicenseType;
  /** Timestamp of last Azure Defender status update. */
  readonly azureDefenderStatusLastUpdated?: Date;
  /** Status of Azure Defender. */
  readonly azureDefenderStatus?: DefenderStatus;
  /** The provisioning state of the Arc-enabled SQL Server resource. */
  readonly provisioningState?: string;
  /** The time when last successful inventory upload was performed. */
  readonly lastInventoryUploadTime?: Date;
  /** The time when last successful usage upload was performed. */
  readonly lastUsageUploadTime?: Date;
  /** Type of host for Azure Arc SQL Server */
  hostType?: HostType;
  /** The role of the SQL Server, based on availability. */
  readonly alwaysOnRole?: AlwaysOnRole;
  /** Database mirroring endpoint related properties. */
  databaseMirroringEndpoint?: DBMEndpoint;
  /** Failover Cluster Instance properties. */
  failoverCluster?: FailoverCluster;
  /** The backup profile for the SQL server. */
  backupPolicy?: BackupPolicy;
  /** Upgrade Action for this resource is locked until it expires. The Expiration time indicated by this value. It is not locked when it is empty. */
  upgradeLockedUntil?: Date;
  /** The monitoring configuration. */
  monitoring?: Monitoring;
  /** Migration related configuration and status. */
  migration?: Migration;
  /** The configuration related to SQL best practices assessment. */
  bestPracticesAssessment?: BestPracticesAssessment;
  /** Client connection related configuration. */
  clientConnection?: ClientConnection;
  /** Indicates if the resource represents a SQL Server engine or a SQL Server component service installed on the host. */
  serviceType?: ServiceType;
  /** maximum server memory (MB) value configured for this instance. */
  readonly maxServerMemoryMB?: number;
  /** Indicates whether Microsoft PKI root-authority certificate (trusted by Azure) exists in SQL Server and trusted for Azure database.windows.net domains. */
  readonly isMicrosoftPkiCertTrustConfigured?: boolean;
  /** Indicates whether DigiCert PKI root-authority certificate (trusted by Azure) exists in SQL Server and trusted for Azure database.windows.net domains. */
  readonly isDigiCertPkiCertTrustConfigured?: boolean;
  /** Authentication related configuration for the SQL Server Instance. */
  authentication?: Authentication;
}

export function sqlServerInstancePropertiesSerializer(item: SqlServerInstanceProperties): any {
  return {
    version: item["version"],
    edition: item["edition"],
    cores: item["cores"],
    discoverySource: item["discoverySource"],
    instanceName: item["instanceName"],
    hostType: item["hostType"],
    databaseMirroringEndpoint: !item["databaseMirroringEndpoint"]
      ? item["databaseMirroringEndpoint"]
      : dbmEndpointSerializer(item["databaseMirroringEndpoint"]),
    failoverCluster: !item["failoverCluster"]
      ? item["failoverCluster"]
      : failoverClusterSerializer(item["failoverCluster"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicySerializer(item["backupPolicy"]),
    upgradeLockedUntil: !item["upgradeLockedUntil"]
      ? item["upgradeLockedUntil"]
      : item["upgradeLockedUntil"].toISOString(),
    monitoring: !item["monitoring"] ? item["monitoring"] : monitoringSerializer(item["monitoring"]),
    migration: !item["migration"] ? item["migration"] : migrationSerializer(item["migration"]),
    bestPracticesAssessment: !item["bestPracticesAssessment"]
      ? item["bestPracticesAssessment"]
      : bestPracticesAssessmentSerializer(item["bestPracticesAssessment"]),
    clientConnection: !item["clientConnection"]
      ? item["clientConnection"]
      : clientConnectionSerializer(item["clientConnection"]),
    serviceType: item["serviceType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
  };
}

export function sqlServerInstancePropertiesDeserializer(item: any): SqlServerInstanceProperties {
  return {
    version: item["version"],
    edition: item["edition"],
    containerResourceId: item["containerResourceId"],
    vmId: item["vmId"],
    createTime: item["createTime"],
    vCore: item["vCore"],
    cores: item["cores"],
    status: item["status"],
    discoverySource: item["discoverySource"],
    patchLevel: item["patchLevel"],
    collation: item["collation"],
    dbMasterKeyExists: item["dbMasterKeyExists"],
    isHadrEnabled: item["isHadrEnabled"],
    traceFlags: !item["traceFlags"]
      ? item["traceFlags"]
      : item["traceFlags"].map((p: any) => {
          return p;
        }),
    currentVersion: item["currentVersion"],
    instanceName: item["instanceName"],
    tcpDynamicPorts: item["tcpDynamicPorts"],
    tcpStaticPorts: item["tcpStaticPorts"],
    productId: item["productId"],
    licenseType: item["licenseType"],
    azureDefenderStatusLastUpdated: !item["azureDefenderStatusLastUpdated"]
      ? item["azureDefenderStatusLastUpdated"]
      : new Date(item["azureDefenderStatusLastUpdated"]),
    azureDefenderStatus: item["azureDefenderStatus"],
    provisioningState: item["provisioningState"],
    lastInventoryUploadTime: !item["lastInventoryUploadTime"]
      ? item["lastInventoryUploadTime"]
      : new Date(item["lastInventoryUploadTime"]),
    lastUsageUploadTime: !item["lastUsageUploadTime"]
      ? item["lastUsageUploadTime"]
      : new Date(item["lastUsageUploadTime"]),
    hostType: item["hostType"],
    alwaysOnRole: item["alwaysOnRole"],
    databaseMirroringEndpoint: !item["databaseMirroringEndpoint"]
      ? item["databaseMirroringEndpoint"]
      : dbmEndpointDeserializer(item["databaseMirroringEndpoint"]),
    failoverCluster: !item["failoverCluster"]
      ? item["failoverCluster"]
      : failoverClusterDeserializer(item["failoverCluster"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyDeserializer(item["backupPolicy"]),
    upgradeLockedUntil: !item["upgradeLockedUntil"]
      ? item["upgradeLockedUntil"]
      : new Date(item["upgradeLockedUntil"]),
    monitoring: !item["monitoring"]
      ? item["monitoring"]
      : monitoringDeserializer(item["monitoring"]),
    migration: !item["migration"] ? item["migration"] : migrationDeserializer(item["migration"]),
    bestPracticesAssessment: !item["bestPracticesAssessment"]
      ? item["bestPracticesAssessment"]
      : bestPracticesAssessmentDeserializer(item["bestPracticesAssessment"]),
    clientConnection: !item["clientConnection"]
      ? item["clientConnection"]
      : clientConnectionDeserializer(item["clientConnection"]),
    serviceType: item["serviceType"],
    maxServerMemoryMB: item["maxServerMemoryMB"],
    isMicrosoftPkiCertTrustConfigured: item["isMicrosoftPkiCertTrustConfigured"],
    isDigiCertPkiCertTrustConfigured: item["isDigiCertPkiCertTrustConfigured"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationDeserializer(item["authentication"]),
  };
}

/** SQL Server version. */
export enum KnownSqlVersion {
  /** Unknown */
  Unknown = "Unknown",
  /** SQL Server 2012 */
  SQLServer2012 = "SQL Server 2012",
  /** SQL Server 2014 */
  SQLServer2014 = "SQL Server 2014",
  /** SQL Server 2016 */
  SQLServer2016 = "SQL Server 2016",
  /** SQL Server 2017 */
  SQLServer2017 = "SQL Server 2017",
  /** SQL Server 2019 */
  SQLServer2019 = "SQL Server 2019",
  /** SQL Server 2022 */
  SQLServer2022 = "SQL Server 2022",
  /** SQL Server 2025 */
  SQLServer2025 = "SQL Server 2025",
}

/**
 * SQL Server version. \
 * {@link KnownSqlVersion} can be used interchangeably with SqlVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **SQL Server 2012**: SQL Server 2012 \
 * **SQL Server 2014**: SQL Server 2014 \
 * **SQL Server 2016**: SQL Server 2016 \
 * **SQL Server 2017**: SQL Server 2017 \
 * **SQL Server 2019**: SQL Server 2019 \
 * **SQL Server 2022**: SQL Server 2022 \
 * **SQL Server 2025**: SQL Server 2025
 */
export type SqlVersion = string;

/** SQL Server edition. */
export enum KnownEditionType {
  /** Evaluation */
  Evaluation = "Evaluation",
  /** Enterprise */
  Enterprise = "Enterprise",
  /** Standard */
  Standard = "Standard",
  /** Web */
  Web = "Web",
  /** Developer */
  Developer = "Developer",
  /** Express */
  Express = "Express",
  /** Business Intelligence */
  BusinessIntelligence = "Business Intelligence",
  /** Standard Developer */
  StandardDeveloper = "Standard Developer",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * SQL Server edition. \
 * {@link KnownEditionType} can be used interchangeably with EditionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Evaluation**: Evaluation \
 * **Enterprise**: Enterprise \
 * **Standard**: Standard \
 * **Web**: Web \
 * **Developer**: Developer \
 * **Express**: Express \
 * **Business Intelligence**: Business Intelligence \
 * **Standard Developer**: Standard Developer \
 * **Unknown**: Unknown
 */
export type EditionType = string;

/** The cloud connectivity status. */
export enum KnownConnectionStatus {
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Registered */
  Registered = "Registered",
  /** Discovered */
  Discovered = "Discovered",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The cloud connectivity status. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Connected \
 * **Disconnected**: Disconnected \
 * **Registered**: Registered \
 * **Discovered**: Discovered \
 * **Unknown**: Unknown
 */
export type ConnectionStatus = string;

/** Indicates the discovery agent or client for this instance. */
export enum KnownDiscoverySource {
  /** Instance is discovered by Azure Arc enabled agent/extensions. */
  AzureArc = "Azure Arc",
  /** Instance is discovered by Azure Migrate agent. */
  AzureMigrate = "Azure Migrate",
  /** Instance is discovered/registered from Azure Data Studio (ADS). */
  ADS = "ADS",
  /** Instance is discovered/registered from SQL Server Management Studio (SSMS). */
  Ssms = "SSMS",
  /** Instance is discovered/registered from SQL Server Migration Assistant (SSMA). */
  Ssma = "SSMA",
  /** Instance is registered via Import. */
  Import = "Import",
  /** Instance is discovered/registered from Azure Database Migration Service(DMS) Azure Portal. */
  DMSPortal = "DMS-Portal",
  /** Instance is discovered/registered from DMS using PowerShell - Azure DataMigration Service Module. */
  Dmsps = "DMS-PS",
  /** Instance is discovered/registered from DMS using datamigration extension for the Azure CLI */
  Dmscli = "DMS-CLI",
  /** Instance is discovered/registered from Azure Database Migration Service SDK like Python or .NET SDKs. */
  Dmssdk = "DMS-SDK",
  /** Instance is discovered/registered from any other source not listed above. */
  Other = "Other",
}

/**
 * Indicates the discovery agent or client for this instance. \
 * {@link KnownDiscoverySource} can be used interchangeably with DiscoverySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure Arc**: Instance is discovered by Azure Arc enabled agent\/extensions. \
 * **Azure Migrate**: Instance is discovered by Azure Migrate agent. \
 * **ADS**: Instance is discovered\/registered from Azure Data Studio (ADS). \
 * **SSMS**: Instance is discovered\/registered from SQL Server Management Studio (SSMS). \
 * **SSMA**: Instance is discovered\/registered from SQL Server Migration Assistant (SSMA). \
 * **Import**: Instance is registered via Import. \
 * **DMS-Portal**: Instance is discovered\/registered from Azure Database Migration Service(DMS) Azure Portal. \
 * **DMS-PS**: Instance is discovered\/registered from DMS using PowerShell - Azure DataMigration Service Module. \
 * **DMS-CLI**: Instance is discovered\/registered from DMS using datamigration extension for the Azure CLI \
 * **DMS-SDK**: Instance is discovered\/registered from Azure Database Migration Service SDK like Python or .NET SDKs. \
 * **Other**: Instance is discovered\/registered from any other source not listed above.
 */
export type DiscoverySource = string;

/** SQL Server license type. */
export enum KnownArcSqlServerLicenseType {
  /** Undefined */
  Undefined = "Undefined",
  /** Free */
  Free = "Free",
  /** HADR */
  Hadr = "HADR",
  /** ServerCAL */
  ServerCAL = "ServerCAL",
  /** LicenseOnly */
  LicenseOnly = "LicenseOnly",
  /** PAYG */
  Payg = "PAYG",
  /** Paid */
  Paid = "Paid",
  /** FabricCapacity */
  FabricCapacity = "FabricCapacity",
}

/**
 * SQL Server license type. \
 * {@link KnownArcSqlServerLicenseType} can be used interchangeably with ArcSqlServerLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Undefined**: Undefined \
 * **Free**: Free \
 * **HADR**: HADR \
 * **ServerCAL**: ServerCAL \
 * **LicenseOnly**: LicenseOnly \
 * **PAYG**: PAYG \
 * **Paid**: Paid \
 * **FabricCapacity**: FabricCapacity
 */
export type ArcSqlServerLicenseType = string;

/** Status of Azure Defender. */
export enum KnownDefenderStatus {
  /** Protected */
  Protected = "Protected",
  /** Unprotected */
  Unprotected = "Unprotected",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Status of Azure Defender. \
 * {@link KnownDefenderStatus} can be used interchangeably with DefenderStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Protected**: Protected \
 * **Unprotected**: Unprotected \
 * **Unknown**: Unknown
 */
export type DefenderStatus = string;

/** Type of host for Azure Arc SQL Server */
export enum KnownHostType {
  /** Azure Virtual Machine */
  AzureVirtualMachine = "Azure Virtual Machine",
  /** Azure VMWare Virtual Machine */
  AzureVMWareVirtualMachine = "Azure VMWare Virtual Machine",
  /** Azure Kubernetes Service */
  AzureKubernetesService = "Azure Kubernetes Service",
  /** AWS VMWare Virtual Machine */
  AwsvmWareVirtualMachine = "AWS VMWare Virtual Machine",
  /** AWS Kubernetes Service */
  AWSKubernetesService = "AWS Kubernetes Service",
  /** GCP VMWare Virtual Machine */
  GcpvmWareVirtualMachine = "GCP VMWare Virtual Machine",
  /** GCP Kubernetes Service */
  GCPKubernetesService = "GCP Kubernetes Service",
  /** Container */
  Container = "Container",
  /** Virtual Machine */
  VirtualMachine = "Virtual Machine",
  /** Physical Server */
  PhysicalServer = "Physical Server",
  /** AWS Virtual Machine */
  AWSVirtualMachine = "AWS Virtual Machine",
  /** GCP Virtual Machine */
  GCPVirtualMachine = "GCP Virtual Machine",
  /** Hyper-V Virtual Machine */
  HyperVVirtualMachine = "Hyper-V Virtual Machine",
  /** Other */
  Other = "Other",
}

/**
 * Type of host for Azure Arc SQL Server \
 * {@link KnownHostType} can be used interchangeably with HostType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure Virtual Machine**: Azure Virtual Machine \
 * **Azure VMWare Virtual Machine**: Azure VMWare Virtual Machine \
 * **Azure Kubernetes Service**: Azure Kubernetes Service \
 * **AWS VMWare Virtual Machine**: AWS VMWare Virtual Machine \
 * **AWS Kubernetes Service**: AWS Kubernetes Service \
 * **GCP VMWare Virtual Machine**: GCP VMWare Virtual Machine \
 * **GCP Kubernetes Service**: GCP Kubernetes Service \
 * **Container**: Container \
 * **Virtual Machine**: Virtual Machine \
 * **Physical Server**: Physical Server \
 * **AWS Virtual Machine**: AWS Virtual Machine \
 * **GCP Virtual Machine**: GCP Virtual Machine \
 * **Hyper-V Virtual Machine**: Hyper-V Virtual Machine \
 * **Other**: Other
 */
export type HostType = string;

/** The role of the SQL Server, based on availability. */
export enum KnownAlwaysOnRole {
  /** None */
  None = "None",
  /** FailoverClusterInstance */
  FailoverClusterInstance = "FailoverClusterInstance",
  /** FailoverClusterNode */
  FailoverClusterNode = "FailoverClusterNode",
  /** AvailabilityGroupReplica */
  AvailabilityGroupReplica = "AvailabilityGroupReplica",
}

/**
 * The role of the SQL Server, based on availability. \
 * {@link KnownAlwaysOnRole} can be used interchangeably with AlwaysOnRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **FailoverClusterInstance**: FailoverClusterInstance \
 * **FailoverClusterNode**: FailoverClusterNode \
 * **AvailabilityGroupReplica**: AvailabilityGroupReplica
 */
export type AlwaysOnRole = string;

/** Database mirroring endpoint related properties. */
export interface DBMEndpoint {
  /** Name of the database mirroring endpoint. */
  readonly endpointName?: string;
  /** Mirroring Role */
  readonly role?: Role;
  /** Is Encryption enabled */
  readonly isEncryptionEnabled?: boolean;
  /** Encryption Algorithm */
  readonly encryptionAlgorithm?: EncryptionAlgorithm;
  /** The type of connection authentication required for connections to this endpoint */
  readonly connectionAuth?: ConnectionAuth;
  /** The port number that the endpoint is listening on. */
  readonly port?: number;
  /** Is the port number dynamically assigned. */
  readonly isDynamicPort?: boolean;
  /** Listener IP address. */
  readonly ipAddress?: string;
  /** Name of the certificate. */
  readonly certificateName?: string;
  /** The certificate expiry date */
  readonly certificateExpiryDate?: Date;
}

export function dbmEndpointSerializer(_item: DBMEndpoint): any {
  return {};
}

export function dbmEndpointDeserializer(item: any): DBMEndpoint {
  return {
    endpointName: item["endpointName"],
    role: item["role"],
    isEncryptionEnabled: item["isEncryptionEnabled"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
    connectionAuth: item["connectionAuth"],
    port: item["port"],
    isDynamicPort: item["isDynamicPort"],
    ipAddress: item["ipAddress"],
    certificateName: item["certificateName"],
    certificateExpiryDate: !item["certificateExpiryDate"]
      ? item["certificateExpiryDate"]
      : new Date(item["certificateExpiryDate"]),
  };
}

/** Mirroring Role */
export enum KnownRole {
  /** NONE */
  None = "NONE",
  /** PARTNER */
  Partner = "PARTNER",
  /** WITNESS */
  Witness = "WITNESS",
  /** ALL */
  ALL = "ALL",
}

/**
 * Mirroring Role \
 * {@link KnownRole} can be used interchangeably with Role,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NONE**: NONE \
 * **PARTNER**: PARTNER \
 * **WITNESS**: WITNESS \
 * **ALL**: ALL
 */
export type Role = string;

/** The encryption algorithm(s) used by the endpoint. */
export enum KnownEncryptionAlgorithm {
  /** NONE */
  None = "NONE",
  /** RC4 */
  RC4 = "RC4",
  /** AES */
  AES = "AES",
  /** NONE, RC4 */
  NoneRC4 = "NONE, RC4",
  /** NONE, AES */
  NoneAES = "NONE, AES",
  /** RC4, AES */
  RC4AES = "RC4, AES",
  /** AES, RC4 */
  Aesrc4 = "AES, RC4",
  /** NONE, RC4, AES */
  NoneRC4AES = "NONE, RC4, AES",
  /** NONE, AES, RC4 */
  NoneAesrc4 = "NONE, AES, RC4",
}

/**
 * The encryption algorithm(s) used by the endpoint. \
 * {@link KnownEncryptionAlgorithm} can be used interchangeably with EncryptionAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NONE**: NONE \
 * **RC4**: RC4 \
 * **AES**: AES \
 * **NONE, RC4**: NONE, RC4 \
 * **NONE, AES**: NONE, AES \
 * **RC4, AES**: RC4, AES \
 * **AES, RC4**: AES, RC4 \
 * **NONE, RC4, AES**: NONE, RC4, AES \
 * **NONE, AES, RC4**: NONE, AES, RC4
 */
export type EncryptionAlgorithm = string;

/** The endpoint connection authentication type(s). */
export enum KnownConnectionAuth {
  /** Windows_NTLM */
  WindowsNtlm = "Windows_NTLM",
  /** Windows_Kerberos */
  WindowsKerberos = "Windows_Kerberos",
  /** Windows_Negotiate */
  WindowsNegotiate = "Windows_Negotiate",
  /** Certificate */
  Certificate = "Certificate",
  /** Windows_NTLM_Certificate */
  WindowsNtlmCertificate = "Windows_NTLM_Certificate",
  /** Windows_Kerberos_Certificate */
  WindowsKerberosCertificate = "Windows_Kerberos_Certificate",
  /** Windows_Negotiate_Certificate */
  WindowsNegotiateCertificate = "Windows_Negotiate_Certificate",
  /** Certificate_Windows_NTLM */
  CertificateWindowsNtlm = "Certificate_Windows_NTLM",
  /** Certificate_Windows_Kerberos */
  CertificateWindowsKerberos = "Certificate_Windows_Kerberos",
  /** Certificate_Windows_Negotiate */
  CertificateWindowsNegotiate = "Certificate_Windows_Negotiate",
}

/**
 * The endpoint connection authentication type(s). \
 * {@link KnownConnectionAuth} can be used interchangeably with ConnectionAuth,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows_NTLM**: Windows_NTLM \
 * **Windows_Kerberos**: Windows_Kerberos \
 * **Windows_Negotiate**: Windows_Negotiate \
 * **Certificate**: Certificate \
 * **Windows_NTLM_Certificate**: Windows_NTLM_Certificate \
 * **Windows_Kerberos_Certificate**: Windows_Kerberos_Certificate \
 * **Windows_Negotiate_Certificate**: Windows_Negotiate_Certificate \
 * **Certificate_Windows_NTLM**: Certificate_Windows_NTLM \
 * **Certificate_Windows_Kerberos**: Certificate_Windows_Kerberos \
 * **Certificate_Windows_Negotiate**: Certificate_Windows_Negotiate
 */
export type ConnectionAuth = string;

/** Failover Cluster Instance properties. */
export interface FailoverCluster {
  /** The GUID of the SQL Server's underlying Failover Cluster. */
  readonly id?: string;
  /** The network name to connect to the SQL FCI. */
  readonly networkName?: string;
  /** The ARM IDs of the Arc SQL Server resources, belonging to the current server's Failover cluster. */
  readonly sqlInstanceIds?: string[];
  /** The host names which are part of the SQL FCI resource group. */
  readonly hostNames?: string[];
  /** The IP addresses and subnet masks associated with the SQL Failover Cluster Instance on this host. */
  readonly hostIPAddresses?: HostIPAddressInformation[];
}

export function failoverClusterSerializer(_item: FailoverCluster): any {
  return {};
}

export function failoverClusterDeserializer(item: any): FailoverCluster {
  return {
    id: item["id"],
    networkName: item["networkName"],
    sqlInstanceIds: !item["sqlInstanceIds"]
      ? item["sqlInstanceIds"]
      : item["sqlInstanceIds"].map((p: any) => {
          return p;
        }),
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    hostIPAddresses: !item["hostIPAddresses"]
      ? item["hostIPAddresses"]
      : hostIPAddressInformationArrayDeserializer(item["hostIPAddresses"]),
  };
}

export function hostIPAddressInformationArrayDeserializer(
  result: Array<HostIPAddressInformation>,
): any[] {
  return result.map((item) => {
    return hostIPAddressInformationDeserializer(item);
  });
}

/** IP address and subnet mask. */
export interface HostIPAddressInformation {
  /** IP address */
  readonly ipAddress?: string;
  /** Subnet mask */
  readonly subnetMask?: string;
}

export function hostIPAddressInformationDeserializer(item: any): HostIPAddressInformation {
  return {
    ipAddress: item["ipAddress"],
    subnetMask: item["subnetMask"],
  };
}

/** The backup profile for the SQL server. */
export interface BackupPolicy {
  /** The retention period for all the databases in this managed instance. */
  retentionPeriodDays?: number;
  /** The value indicating days between full backups. */
  fullBackupDays?: number;
  /** The differential backup interval in hours. */
  differentialBackupHours?: DifferentialBackupHours;
  /** The value indicating minutes between transaction log backups. */
  transactionLogBackupMinutes?: number;
}

export function backupPolicySerializer(item: BackupPolicy): any {
  return {
    retentionPeriodDays: item["retentionPeriodDays"],
    fullBackupDays: item["fullBackupDays"],
    differentialBackupHours: item["differentialBackupHours"],
    transactionLogBackupMinutes: item["transactionLogBackupMinutes"],
  };
}

export function backupPolicyDeserializer(item: any): BackupPolicy {
  return {
    retentionPeriodDays: item["retentionPeriodDays"],
    fullBackupDays: item["fullBackupDays"],
    differentialBackupHours: item["differentialBackupHours"],
    transactionLogBackupMinutes: item["transactionLogBackupMinutes"],
  };
}

/** The differential backup interval in hours. */
export type DifferentialBackupHours = 12 | 24;

/** The monitoring configuration. */
export interface Monitoring {
  /** Indicates if monitoring is enabled for this SQL Server instance. */
  enabled?: boolean;
}

export function monitoringSerializer(item: Monitoring): any {
  return { enabled: item["enabled"] };
}

export function monitoringDeserializer(item: any): Monitoring {
  return {
    enabled: item["enabled"],
  };
}

/** Migration related configuration. */
export interface Migration {
  /** Migration assessments related configuration. */
  assessment?: MigrationAssessment;
  /** The last time when the target resource was selected for migration. */
  targetSelectedTime?: Date;
  /** Resource Id of the created or selected target SQL resource for migration. */
  targetResourceId?: string;
}

export function migrationSerializer(item: Migration): any {
  return {
    assessment: !item["assessment"]
      ? item["assessment"]
      : migrationAssessmentSerializer(item["assessment"]),
    targetSelectedTime: !item["targetSelectedTime"]
      ? item["targetSelectedTime"]
      : item["targetSelectedTime"].toISOString(),
    targetResourceId: item["targetResourceId"],
  };
}

export function migrationDeserializer(item: any): Migration {
  return {
    assessment: !item["assessment"]
      ? item["assessment"]
      : migrationAssessmentDeserializer(item["assessment"]),
    targetSelectedTime: !item["targetSelectedTime"]
      ? item["targetSelectedTime"]
      : new Date(item["targetSelectedTime"]),
    targetResourceId: item["targetResourceId"],
  };
}

/** The migration assessment related configuration. */
export interface MigrationAssessment {
  /** Indicates if migration assessment is enabled for this SQL Server instance. */
  enabled?: boolean;
  /** The time when Migration Assessment Report upload was last performed. */
  readonly assessmentUploadTime?: Date;
  /** The time when this migration assessment was last viewed. */
  assessmentViewedTime?: Date;
  /** The UTC timestamp in ISO 8601 format indicating when the latest target recommendations were generated for this SQL Server instance. This value is set as part of a successful RunTargetRecommendation job and is independent of when the migration readiness results were uploaded (assessmentUploadTime). */
  readonly targetRecommendationGenerationTime?: Date;
  /** version of this migration assessment report - to be passed by the migration assessment engine. */
  readonly version?: string;
  /** Settings impacting the migration assessment computation - configurable with some default values if not set. */
  settings?: MigrationAssessmentSettings;
  /** Issues and warnings impacting the migration of SQL Server instance to particular Azure Migration Target. */
  readonly serverAssessments?: ServerAssessmentsItem[];
  /** SKU Recommendation results for Azure migration targets for SQL Server. */
  readonly skuRecommendationResults?: SkuRecommendationResults;
  /** Represents a summary of migration readiness issues/warnings per feature type for Azure SQL DB and SQL MI targets */
  impactedObjectsSummary?: ImpactedObjectsSuitabilitySummary;
}

export function migrationAssessmentSerializer(item: MigrationAssessment): any {
  return {
    enabled: item["enabled"],
    assessmentViewedTime: !item["assessmentViewedTime"]
      ? item["assessmentViewedTime"]
      : item["assessmentViewedTime"].toISOString(),
    settings: !item["settings"]
      ? item["settings"]
      : migrationAssessmentSettingsSerializer(item["settings"]),
    impactedObjectsSummary: !item["impactedObjectsSummary"]
      ? item["impactedObjectsSummary"]
      : impactedObjectsSuitabilitySummarySerializer(item["impactedObjectsSummary"]),
  };
}

export function migrationAssessmentDeserializer(item: any): MigrationAssessment {
  return {
    enabled: item["enabled"],
    assessmentUploadTime: !item["assessmentUploadTime"]
      ? item["assessmentUploadTime"]
      : new Date(item["assessmentUploadTime"]),
    assessmentViewedTime: !item["assessmentViewedTime"]
      ? item["assessmentViewedTime"]
      : new Date(item["assessmentViewedTime"]),
    targetRecommendationGenerationTime: !item["targetRecommendationGenerationTime"]
      ? item["targetRecommendationGenerationTime"]
      : new Date(item["targetRecommendationGenerationTime"]),
    version: item["version"],
    settings: !item["settings"]
      ? item["settings"]
      : migrationAssessmentSettingsDeserializer(item["settings"]),
    serverAssessments: !item["serverAssessments"]
      ? item["serverAssessments"]
      : serverAssessmentsItemArrayDeserializer(item["serverAssessments"]),
    skuRecommendationResults: !item["skuRecommendationResults"]
      ? item["skuRecommendationResults"]
      : skuRecommendationResultsDeserializer(item["skuRecommendationResults"]),
    impactedObjectsSummary: !item["impactedObjectsSummary"]
      ? item["impactedObjectsSummary"]
      : impactedObjectsSuitabilitySummaryDeserializer(item["impactedObjectsSummary"]),
  };
}

/** Settings impacting the migration assessment computation - configurable with some default values if not set. */
export interface MigrationAssessmentSettings {
  /** The target location for Azure SQL SKU for migration. Default is West US. */
  targetLocation?: string;
  /** Indicate the percentile value for the performance sample. Default is 95th percentile. */
  percentile?: number;
  /** How far back to check the performance data - Default is 30 (days). */
  lookbackPeriodInDays?: number;
  /** Buffer (percentage) to consider while SKU sizing to account for issues such as seasonal usage, short performance history, and likely increases in future usage - This buffer is applied on top of the performance metrics. Default is 100 (percent). */
  comfortFactor?: number;
  /** Minimize cost or Migrate to PaaS. - to evaluate based on the recommended strategy. Default is Migrate to PaaS */
  strategy?: string;
  /** currency to calculate prices - Default is USD. */
  currency?: string;
  /** flat discount percentage to apply for the price - Default is 0 */
  discountPercentage?: number;
  /** Selected cost option value. */
  costOptions?: CostOptionSelectedValues;
}

export function migrationAssessmentSettingsSerializer(item: MigrationAssessmentSettings): any {
  return {
    targetLocation: item["targetLocation"],
    percentile: item["percentile"],
    lookbackPeriodInDays: item["lookbackPeriodInDays"],
    comfortFactor: item["comfortFactor"],
    strategy: item["strategy"],
    currency: item["currency"],
    discountPercentage: item["discountPercentage"],
    costOptions: !item["costOptions"]
      ? item["costOptions"]
      : costOptionSelectedValuesSerializer(item["costOptions"]),
  };
}

export function migrationAssessmentSettingsDeserializer(item: any): MigrationAssessmentSettings {
  return {
    targetLocation: item["targetLocation"],
    percentile: item["percentile"],
    lookbackPeriodInDays: item["lookbackPeriodInDays"],
    comfortFactor: item["comfortFactor"],
    strategy: item["strategy"],
    currency: item["currency"],
    discountPercentage: item["discountPercentage"],
    costOptions: !item["costOptions"]
      ? item["costOptions"]
      : costOptionSelectedValuesDeserializer(item["costOptions"]),
  };
}

/** Cost option value for the different cost factors selected. */
export interface CostOptionSelectedValues {
  /** selected cost saving option e.g. With1YearASPAndDevTest. */
  computeAndStorageCostOption?: string;
  /** With Azure Hybrid Benefit(AHB) or not for SQL. */
  sqlLicenseCostOption?: string;
  /** With Azure Hybrid Benefit(AHB) or not for Windows. */
  windowsLicenseCostOption?: string;
}

export function costOptionSelectedValuesSerializer(item: CostOptionSelectedValues): any {
  return {
    computeAndStorageCostOption: item["computeAndStorageCostOption"],
    sqlLicenseCostOption: item["sqlLicenseCostOption"],
    windowsLicenseCostOption: item["windowsLicenseCostOption"],
  };
}

export function costOptionSelectedValuesDeserializer(item: any): CostOptionSelectedValues {
  return {
    computeAndStorageCostOption: item["computeAndStorageCostOption"],
    sqlLicenseCostOption: item["sqlLicenseCostOption"],
    windowsLicenseCostOption: item["windowsLicenseCostOption"],
  };
}

export function serverAssessmentsItemArrayDeserializer(
  result: Array<ServerAssessmentsItem>,
): any[] {
  return result.map((item) => {
    return serverAssessmentsItemDeserializer(item);
  });
}

/** model interface ServerAssessmentsItem */
export interface ServerAssessmentsItem {
  appliesToMigrationTargetPlatform?: string;
  featureId?: string;
  impactedObjects?: ServerAssessmentsPropertiesItemsItem[];
  issueCategory?: string;
  moreInformation?: string;
}

export function serverAssessmentsItemDeserializer(item: any): ServerAssessmentsItem {
  return {
    appliesToMigrationTargetPlatform: item["appliesToMigrationTargetPlatform"],
    featureId: item["featureId"],
    impactedObjects: !item["impactedObjects"]
      ? item["impactedObjects"]
      : serverAssessmentsPropertiesItemsItemArrayDeserializer(item["impactedObjects"]),
    issueCategory: item["issueCategory"],
    moreInformation: item["moreInformation"],
  };
}

export function serverAssessmentsPropertiesItemsItemArrayDeserializer(
  result: Array<ServerAssessmentsPropertiesItemsItem>,
): any[] {
  return result.map((item) => {
    return serverAssessmentsPropertiesItemsItemDeserializer(item);
  });
}

/** model interface ServerAssessmentsPropertiesItemsItem */
export interface ServerAssessmentsPropertiesItemsItem {
  impactDetail?: string;
  name?: string;
  objectType?: string;
}

export function serverAssessmentsPropertiesItemsItemDeserializer(
  item: any,
): ServerAssessmentsPropertiesItemsItem {
  return {
    impactDetail: item["impactDetail"],
    name: item["name"],
    objectType: item["objectType"],
  };
}

/** SKU Recommendation results for Azure migration targets for SQL Server. */
export interface SkuRecommendationResults {
  /** SKU Recommendation results for Azure SQL Database. */
  azureSqlDatabase?: SkuRecommendationResultsAzureSqlDatabase;
  /** SKU Recommendation results for Azure SQL Managed Instance. */
  azureSqlManagedInstance?: SkuRecommendationResultsAzureSqlManagedInstance;
  /** SKU Recommendation results for Azure SQL Virtual Machine. */
  azureSqlVirtualMachine?: SkuRecommendationResultsAzureSqlVirtualMachine;
}

export function skuRecommendationResultsDeserializer(item: any): SkuRecommendationResults {
  return {
    azureSqlDatabase: !item["azureSqlDatabase"]
      ? item["azureSqlDatabase"]
      : skuRecommendationResultsAzureSqlDatabaseDeserializer(item["azureSqlDatabase"]),
    azureSqlManagedInstance: !item["azureSqlManagedInstance"]
      ? item["azureSqlManagedInstance"]
      : skuRecommendationResultsAzureSqlManagedInstanceDeserializer(
          item["azureSqlManagedInstance"],
        ),
    azureSqlVirtualMachine: !item["azureSqlVirtualMachine"]
      ? item["azureSqlVirtualMachine"]
      : skuRecommendationResultsAzureSqlVirtualMachineDeserializer(item["azureSqlVirtualMachine"]),
  };
}

/** SKU Recommendation results for Azure SQL Database. */
export interface SkuRecommendationResultsAzureSqlDatabase {
  /** The target recommendation Status for this database. */
  recommendationStatus?: RecommendationStatus;
  /** Number of blocker issues to fix before migrating to the target platform. */
  numberOfServerBlockerIssues?: number;
  /** The monthly cost of the particular SKU. */
  monthlyCost?: SkuRecommendationResultsMonthlyCost;
  /** The monthly cost for all different savings options applicable for the particular SKU. */
  readonly monthlyCostOptions?: SkuRecommendationResultsMonthlyCostOptionItem[];
  targetSku?: SkuRecommendationResultsAzureSqlDatabaseTargetSku;
}

export function skuRecommendationResultsAzureSqlDatabaseDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlDatabase {
  return {
    recommendationStatus: item["recommendationStatus"],
    numberOfServerBlockerIssues: item["numberOfServerBlockerIssues"],
    monthlyCost: !item["monthlyCost"]
      ? item["monthlyCost"]
      : skuRecommendationResultsMonthlyCostDeserializer(item["monthlyCost"]),
    monthlyCostOptions: !item["monthlyCostOptions"]
      ? item["monthlyCostOptions"]
      : skuRecommendationResultsMonthlyCostOptionItemArrayDeserializer(item["monthlyCostOptions"]),
    targetSku: !item["targetSku"]
      ? item["targetSku"]
      : skuRecommendationResultsAzureSqlDatabaseTargetSkuDeserializer(item["targetSku"]),
  };
}

/** The target recommendation Status for this database. */
export enum KnownRecommendationStatus {
  /** NotReady */
  NotReady = "NotReady",
  /** Ready */
  Ready = "Ready",
  /** ReadyWithConditions */
  ReadyWithConditions = "ReadyWithConditions",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The target recommendation Status for this database. \
 * {@link KnownRecommendationStatus} can be used interchangeably with RecommendationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotReady**: NotReady \
 * **Ready**: Ready \
 * **ReadyWithConditions**: ReadyWithConditions \
 * **Unknown**: Unknown
 */
export type RecommendationStatus = string;

/** The monthly cost of the particular SKU. */
export interface SkuRecommendationResultsMonthlyCost {
  /** Represents the Cost of Compute. */
  computeCost?: number;
  /** Represents the Cost of Storage. */
  storageCost?: number;
  /** Represents the Cost of IOPS. */
  iopsCost?: number;
  /** Represents the Cost of SQL license. */
  sqlLicenseCost?: number;
  /** Represents the Cost of Windows license. */
  windowsLicenseCost?: number;
  /** Represents the Total Cost. */
  totalCost?: number;
}

export function skuRecommendationResultsMonthlyCostDeserializer(
  item: any,
): SkuRecommendationResultsMonthlyCost {
  return {
    computeCost: item["computeCost"],
    storageCost: item["storageCost"],
    iopsCost: item["iopsCost"],
    sqlLicenseCost: item["sqlLicenseCost"],
    windowsLicenseCost: item["windowsLicenseCost"],
    totalCost: item["totalCost"],
  };
}

export function skuRecommendationResultsMonthlyCostOptionItemArrayDeserializer(
  result: Array<SkuRecommendationResultsMonthlyCostOptionItem>,
): any[] {
  return result.map((item) => {
    return skuRecommendationResultsMonthlyCostOptionItemDeserializer(item);
  });
}

/** The monthly cost values for this saving option combination for the particular SKU. */
export interface SkuRecommendationResultsMonthlyCostOptionItem {
  /** The unique combination of saving options for a price e.g. With1YearASPAndProd. */
  keyName?: string;
  /** The Monthly cost of the particular SKU. */
  keyValue?: CostTypeValues;
}

export function skuRecommendationResultsMonthlyCostOptionItemDeserializer(
  item: any,
): SkuRecommendationResultsMonthlyCostOptionItem {
  return {
    keyName: item["keyName"],
    keyValue: !item["keyValue"] ? item["keyValue"] : costTypeValuesDeserializer(item["keyValue"]),
  };
}

/** The Monthly cost of the particular SKU. */
export interface CostTypeValues {
  /** Represents the Cost of Compute. */
  computeCost?: number;
  /** Represents the Cost of Storage. */
  storageCost?: number;
  /** Represents the Cost of IOPS. */
  iopsCost?: number;
}

export function costTypeValuesDeserializer(item: any): CostTypeValues {
  return {
    computeCost: item["computeCost"],
    storageCost: item["storageCost"],
    iopsCost: item["iopsCost"],
  };
}

/** model interface SkuRecommendationResultsAzureSqlDatabaseTargetSku */
export interface SkuRecommendationResultsAzureSqlDatabaseTargetSku {
  category?: SkuRecommendationResultsAzureSqlDatabaseTargetSkuCategory;
  /** Compute Size in vCores. */
  computeSize?: number;
  /** maximum storage for this particular SKU, in MB. */
  storageMaxSizeInMb?: number;
  /** The predicted data size in MB in Azure SQL, will impact the billing cost. */
  predictedDataSizeInMb?: number;
  /** The predicted log size in MB in Azure SQL, will impact the billing cost. */
  predictedLogSizeInMb?: number;
  /** The maximum storage IOPS in Azure SQL, will impact the billing cost. */
  maxStorageIops?: number;
  /** The maximum throughput in Azure SQL, will impact the billing cost. */
  maxThroughputMBps?: number;
}

export function skuRecommendationResultsAzureSqlDatabaseTargetSkuDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlDatabaseTargetSku {
  return {
    category: !item["category"]
      ? item["category"]
      : skuRecommendationResultsAzureSqlDatabaseTargetSkuCategoryDeserializer(item["category"]),
    computeSize: item["computeSize"],
    storageMaxSizeInMb: item["storageMaxSizeInMb"],
    predictedDataSizeInMb: item["predictedDataSizeInMb"],
    predictedLogSizeInMb: item["predictedLogSizeInMb"],
    maxStorageIops: item["maxStorageIops"],
    maxThroughputMBps: item["maxThroughputMBps"],
  };
}

/** model interface SkuRecommendationResultsAzureSqlDatabaseTargetSkuCategory */
export interface SkuRecommendationResultsAzureSqlDatabaseTargetSkuCategory {
  /** The compute tier of the target SKU. */
  computeTier?: string;
  /** The hardware type of the target SKU. */
  hardwareType?: string;
  /** The SQL purchasing model of the target SKU. */
  sqlPurchasingModel?: string;
  /** The SQL service tier of the target SKU. */
  sqlServiceTier?: string;
  /** Indicates if zone redundancy is available for the target SKU. */
  zoneRedundancyAvailable?: boolean;
}

export function skuRecommendationResultsAzureSqlDatabaseTargetSkuCategoryDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlDatabaseTargetSkuCategory {
  return {
    computeTier: item["computeTier"],
    hardwareType: item["hardwareType"],
    sqlPurchasingModel: item["sqlPurchasingModel"],
    sqlServiceTier: item["sqlServiceTier"],
    zoneRedundancyAvailable: item["zoneRedundancyAvailable"],
  };
}

/** SKU Recommendation results for Azure SQL Managed Instance. */
export interface SkuRecommendationResultsAzureSqlManagedInstance {
  /** The target recommendation Status for this database. */
  recommendationStatus?: RecommendationStatus;
  /** Number of blocker issues to fix before migrating to the target platform. */
  numberOfServerBlockerIssues?: number;
  /** The monthly cost of the particular SKU. */
  monthlyCost?: SkuRecommendationResultsMonthlyCost;
  /** The monthly cost for all different savings options applicable for the particular SKU. */
  readonly monthlyCostOptions?: SkuRecommendationResultsMonthlyCostOptionItem[];
  targetSku?: SkuRecommendationResultsAzureSqlManagedInstanceTargetSku;
}

export function skuRecommendationResultsAzureSqlManagedInstanceDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlManagedInstance {
  return {
    recommendationStatus: item["recommendationStatus"],
    numberOfServerBlockerIssues: item["numberOfServerBlockerIssues"],
    monthlyCost: !item["monthlyCost"]
      ? item["monthlyCost"]
      : skuRecommendationResultsMonthlyCostDeserializer(item["monthlyCost"]),
    monthlyCostOptions: !item["monthlyCostOptions"]
      ? item["monthlyCostOptions"]
      : skuRecommendationResultsMonthlyCostOptionItemArrayDeserializer(item["monthlyCostOptions"]),
    targetSku: !item["targetSku"]
      ? item["targetSku"]
      : skuRecommendationResultsAzureSqlManagedInstanceTargetSkuDeserializer(item["targetSku"]),
  };
}

/** model interface SkuRecommendationResultsAzureSqlManagedInstanceTargetSku */
export interface SkuRecommendationResultsAzureSqlManagedInstanceTargetSku {
  category?: SkuRecommendationResultsAzureSqlManagedInstanceTargetSkuCategory;
  /** Compute Size in vCores. */
  computeSize?: number;
  /** maximum storage for this particular SKU, in MB. */
  storageMaxSizeInMb?: number;
  /** The predicted data size in MB in Azure SQL, will impact the billing cost. */
  predictedDataSizeInMb?: number;
  /** The predicted log size in MB in Azure SQL, will impact the billing cost. */
  predictedLogSizeInMb?: number;
  /** The maximum storage IOPS in Azure SQL, will impact the billing cost. */
  maxStorageIops?: number;
  /** The maximum throughput in Azure SQL, will impact the billing cost. */
  maxThroughputMBps?: number;
}

export function skuRecommendationResultsAzureSqlManagedInstanceTargetSkuDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlManagedInstanceTargetSku {
  return {
    category: !item["category"]
      ? item["category"]
      : skuRecommendationResultsAzureSqlManagedInstanceTargetSkuCategoryDeserializer(
          item["category"],
        ),
    computeSize: item["computeSize"],
    storageMaxSizeInMb: item["storageMaxSizeInMb"],
    predictedDataSizeInMb: item["predictedDataSizeInMb"],
    predictedLogSizeInMb: item["predictedLogSizeInMb"],
    maxStorageIops: item["maxStorageIops"],
    maxThroughputMBps: item["maxThroughputMBps"],
  };
}

/** model interface SkuRecommendationResultsAzureSqlManagedInstanceTargetSkuCategory */
export interface SkuRecommendationResultsAzureSqlManagedInstanceTargetSkuCategory {
  /** The compute tier of the target SKU. */
  computeTier?: string;
  /** The hardware type of the target SKU. */
  hardwareType?: string;
  /** The SQL purchasing model of the target SKU. */
  sqlPurchasingModel?: string;
  /** The SQL service tier of the target SKU. */
  sqlServiceTier?: string;
  /** Indicates if zone redundancy is available for the target SKU. */
  zoneRedundancyAvailable?: boolean;
}

export function skuRecommendationResultsAzureSqlManagedInstanceTargetSkuCategoryDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlManagedInstanceTargetSkuCategory {
  return {
    computeTier: item["computeTier"],
    hardwareType: item["hardwareType"],
    sqlPurchasingModel: item["sqlPurchasingModel"],
    sqlServiceTier: item["sqlServiceTier"],
    zoneRedundancyAvailable: item["zoneRedundancyAvailable"],
  };
}

/** SKU Recommendation results for Azure SQL Virtual Machine. */
export interface SkuRecommendationResultsAzureSqlVirtualMachine {
  /** The target recommendation Status for this database. */
  recommendationStatus?: RecommendationStatus;
  /** Number of blocker issues to fix before migrating to the target platform. */
  numberOfServerBlockerIssues?: number;
  /** The monthly cost of the particular SKU. */
  monthlyCost?: SkuRecommendationResultsMonthlyCost;
  /** The monthly cost for all different savings options applicable for the particular SKU. */
  readonly monthlyCostOptions?: SkuRecommendationResultsMonthlyCostOptionItem[];
  targetSku?: SkuRecommendationResultsAzureSqlVirtualMachineTargetSku;
}

export function skuRecommendationResultsAzureSqlVirtualMachineDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlVirtualMachine {
  return {
    recommendationStatus: item["recommendationStatus"],
    numberOfServerBlockerIssues: item["numberOfServerBlockerIssues"],
    monthlyCost: !item["monthlyCost"]
      ? item["monthlyCost"]
      : skuRecommendationResultsMonthlyCostDeserializer(item["monthlyCost"]),
    monthlyCostOptions: !item["monthlyCostOptions"]
      ? item["monthlyCostOptions"]
      : skuRecommendationResultsMonthlyCostOptionItemArrayDeserializer(item["monthlyCostOptions"]),
    targetSku: !item["targetSku"]
      ? item["targetSku"]
      : skuRecommendationResultsAzureSqlVirtualMachineTargetSkuDeserializer(item["targetSku"]),
  };
}

/** model interface SkuRecommendationResultsAzureSqlVirtualMachineTargetSku */
export interface SkuRecommendationResultsAzureSqlVirtualMachineTargetSku {
  category?: SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuCategory;
  /** Compute Size in vCores. */
  computeSize?: number;
  /** The predicted data size in MB in Azure SQL, will impact the billing cost. */
  predictedDataSizeInMb?: number;
  /** The predicted log size in MB in Azure SQL, will impact the billing cost. */
  predictedLogSizeInMb?: number;
  /** size parameters for VM size. */
  virtualMachineSize?: SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuVirtualMachineSize;
  /** Data disk sizes. */
  dataDiskSizes?: DiskSizes[];
  /** Log disk sizes. */
  logDiskSizes?: DiskSizes[];
  /** temp db disk sizes. */
  tempDbDiskSizes?: DiskSizes[];
}

export function skuRecommendationResultsAzureSqlVirtualMachineTargetSkuDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlVirtualMachineTargetSku {
  return {
    category: !item["category"]
      ? item["category"]
      : skuRecommendationResultsAzureSqlVirtualMachineTargetSkuCategoryDeserializer(
          item["category"],
        ),
    computeSize: item["computeSize"],
    predictedDataSizeInMb: item["predictedDataSizeInMb"],
    predictedLogSizeInMb: item["predictedLogSizeInMb"],
    virtualMachineSize: !item["virtualMachineSize"]
      ? item["virtualMachineSize"]
      : skuRecommendationResultsAzureSqlVirtualMachineTargetSkuVirtualMachineSizeDeserializer(
          item["virtualMachineSize"],
        ),
    dataDiskSizes: !item["dataDiskSizes"]
      ? item["dataDiskSizes"]
      : diskSizesArrayDeserializer(item["dataDiskSizes"]),
    logDiskSizes: !item["logDiskSizes"]
      ? item["logDiskSizes"]
      : diskSizesArrayDeserializer(item["logDiskSizes"]),
    tempDbDiskSizes: !item["tempDbDiskSizes"]
      ? item["tempDbDiskSizes"]
      : diskSizesArrayDeserializer(item["tempDbDiskSizes"]),
  };
}

/** model interface SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuCategory */
export interface SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuCategory {
  /** Available VM SKUs for the Azure SQL Virtual Machine. */
  availableVmSkus?: string[];
  /** The virtual machine family of the target SKU. */
  virtualMachineFamily?: string;
}

export function skuRecommendationResultsAzureSqlVirtualMachineTargetSkuCategoryDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuCategory {
  return {
    availableVmSkus: !item["availableVmSkus"]
      ? item["availableVmSkus"]
      : item["availableVmSkus"].map((p: any) => {
          return p;
        }),
    virtualMachineFamily: item["virtualMachineFamily"],
  };
}

/** size parameters for VM size. */
export interface SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuVirtualMachineSize {
  /** Virtual Machine Family, for example : standardMSFamily */
  virtualMachineFamily?: string;
  /** VM Size, for example : M64ls */
  sizeName?: string;
  /** Compute Size in vCores. */
  computeSize?: number;
  /** Virtual Machine SKU name,: Eg : Standard_F16s. */
  azureSkuName?: string;
  /** Available vCores. This can be less than the vCores in the Constrained vCPU VM Sizes. */
  vCPUsAvailable?: number;
  /** maximum network interfaces. */
  maxNetworkInterfaces?: number;
}

export function skuRecommendationResultsAzureSqlVirtualMachineTargetSkuVirtualMachineSizeDeserializer(
  item: any,
): SkuRecommendationResultsAzureSqlVirtualMachineTargetSkuVirtualMachineSize {
  return {
    virtualMachineFamily: item["virtualMachineFamily"],
    sizeName: item["sizeName"],
    computeSize: item["computeSize"],
    azureSkuName: item["azureSkuName"],
    vCPUsAvailable: item["vCPUsAvailable"],
    maxNetworkInterfaces: item["maxNetworkInterfaces"],
  };
}

export function diskSizesArrayDeserializer(result: Array<DiskSizes>): any[] {
  return result.map((item) => {
    return diskSizesDeserializer(item);
  });
}

/** disk size values */
export interface DiskSizes {
  /** Type of managed disk. */
  diskType?: string;
  /** Redundancy option. */
  redundancy?: string;
  /** Size of the managed disk - e.g. P30, P40. */
  size?: string;
  /** Caching configuration - e.g. read only caching */
  caching?: string;
  /** maximum disk size in GiB. */
  maxSizeInGib?: number;
  /** maximum throughput in MB/s. */
  maxThroughputInMbps?: number;
  /** maximum IO requirements/s (IOPS). */
  maxIops?: number;
}

export function diskSizesDeserializer(item: any): DiskSizes {
  return {
    diskType: item["diskType"],
    redundancy: item["redundancy"],
    size: item["size"],
    caching: item["caching"],
    maxSizeInGib: item["maxSizeInGib"],
    maxThroughputInMbps: item["maxThroughputInMbps"],
    maxIops: item["maxIops"],
  };
}

/** Represents a summary of migration readiness issues/warnings per feature type for Azure SQL DB and SQL MI targets */
export interface ImpactedObjectsSuitabilitySummary {
  readonly azureSqlDatabase?: ImpactedObjectsInfo[];
  readonly azureSqlManagedInstance?: ImpactedObjectsInfo[];
}

export function impactedObjectsSuitabilitySummarySerializer(
  _item: ImpactedObjectsSuitabilitySummary,
): any {
  return {};
}

export function impactedObjectsSuitabilitySummaryDeserializer(
  item: any,
): ImpactedObjectsSuitabilitySummary {
  return {
    azureSqlDatabase: !item["azureSqlDatabase"]
      ? item["azureSqlDatabase"]
      : impactedObjectsInfoArrayDeserializer(item["azureSqlDatabase"]),
    azureSqlManagedInstance: !item["azureSqlManagedInstance"]
      ? item["azureSqlManagedInstance"]
      : impactedObjectsInfoArrayDeserializer(item["azureSqlManagedInstance"]),
  };
}

export function impactedObjectsInfoArrayDeserializer(result: Array<ImpactedObjectsInfo>): any[] {
  return result.map((item) => {
    return impactedObjectsInfoDeserializer(item);
  });
}

/** summary information about the incompatible feature id, number of objects impacted  and category of issue (warning/error) */
export interface ImpactedObjectsInfo {
  /** Represents the feature id from https://learn.microsoft.com/en-us/data-migration/sql-server/database/assessment-rules?view=azuresql. OR https://learn.microsoft.com/en-us/data-migration/sql-server/managed-instance/assessment-rules?view=azuresql */
  featureId?: string;
  /** Represents the number of issues/warnings. */
  numberImpacted?: number;
  /** Issue or Warning */
  issueCategory?: string;
}

export function impactedObjectsInfoDeserializer(item: any): ImpactedObjectsInfo {
  return {
    featureId: item["featureId"],
    numberImpacted: item["numberImpacted"],
    issueCategory: item["issueCategory"],
  };
}

/** The configuration related to SQL best practices assessment. */
export interface BestPracticesAssessment {
  /** Indicates if SQL best practices assessment is enabled for the SQL Server instance. */
  enabled?: boolean;
  /** The scheduling configuration. */
  schedule?: Schedule;
}

export function bestPracticesAssessmentSerializer(item: BestPracticesAssessment): any {
  return {
    enabled: item["enabled"],
    schedule: !item["schedule"] ? item["schedule"] : scheduleSerializer(item["schedule"]),
  };
}

export function bestPracticesAssessmentDeserializer(item: any): BestPracticesAssessment {
  return {
    enabled: item["enabled"],
    schedule: !item["schedule"] ? item["schedule"] : scheduleDeserializer(item["schedule"]),
  };
}

/** The scheduling configuration. */
export interface Schedule {
  /** Indicates whether scheduling is enabled. */
  enabled?: boolean;
  /** The cron trigger configuration. */
  cronTrigger?: CronTrigger;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    enabled: item["enabled"],
    cronTrigger: !item["cronTrigger"]
      ? item["cronTrigger"]
      : cronTriggerSerializer(item["cronTrigger"]),
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    enabled: item["enabled"],
    cronTrigger: !item["cronTrigger"]
      ? item["cronTrigger"]
      : cronTriggerDeserializer(item["cronTrigger"]),
  };
}

/** The cron trigger configuration. */
export interface CronTrigger {
  /** Indicates the start time for the trigger. The default value is the time at which the trigger was created. */
  startTime?: string;
  /** The time zone in which the trigger is scheduled. */
  timeZone?: string;
  /** A cron string representing a CronTab expression. A crontab expression is a very compact way to express a recurring schedule with the following format: '{minutes} {hours} {days} {months} {days-of-week}'. */
  expression?: string;
}

export function cronTriggerSerializer(item: CronTrigger): any {
  return {
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    expression: item["expression"],
  };
}

export function cronTriggerDeserializer(item: any): CronTrigger {
  return {
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    expression: item["expression"],
  };
}

/** Client connection related configuration. */
export interface ClientConnection {
  /** Indicates if client connection is enabled for this SQL Server instance. */
  enabled?: boolean;
}

export function clientConnectionSerializer(item: ClientConnection): any {
  return { enabled: item["enabled"] };
}

export function clientConnectionDeserializer(item: any): ClientConnection {
  return {
    enabled: item["enabled"],
  };
}

/** Indicates if the resource represents a SQL Server engine or a SQL Server component service installed on the host. */
export enum KnownServiceType {
  /** SQL Server Database Services. */
  Engine = "Engine",
  /** SQL Server Reporting Services. */
  Ssrs = "SSRS",
  /** SQL Server Analysis Services. */
  Ssas = "SSAS",
  /** SQL Server Integration Services. */
  Ssis = "SSIS",
  /** Power BI Report Server. */
  Pbirs = "PBIRS",
}

/**
 * Indicates if the resource represents a SQL Server engine or a SQL Server component service installed on the host. \
 * {@link KnownServiceType} can be used interchangeably with ServiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Engine**: SQL Server Database Services. \
 * **SSRS**: SQL Server Reporting Services. \
 * **SSAS**: SQL Server Analysis Services. \
 * **SSIS**: SQL Server Integration Services. \
 * **PBIRS**: Power BI Report Server.
 */
export type ServiceType = string;

/** Authentication related configuration for the SQL Server Instance. */
export interface Authentication {
  /** Mode of authentication in SqlServer. */
  mode?: Mode;
  /** Entra Authentication configuration for the SQL Server Instance. */
  sqlServerEntraIdentity?: EntraAuthentication[];
}

export function authenticationSerializer(item: Authentication): any {
  return {
    mode: item["mode"],
    sqlServerEntraIdentity: !item["sqlServerEntraIdentity"]
      ? item["sqlServerEntraIdentity"]
      : entraAuthenticationArraySerializer(item["sqlServerEntraIdentity"]),
  };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    mode: item["mode"],
    sqlServerEntraIdentity: !item["sqlServerEntraIdentity"]
      ? item["sqlServerEntraIdentity"]
      : entraAuthenticationArrayDeserializer(item["sqlServerEntraIdentity"]),
  };
}

/** Mode of authentication in SqlServer. */
export enum KnownMode {
  /** Mixed mode authentication for SQL Server which includes windows and SQL Authentication. */
  Mixed = "Mixed",
  /** Windows Authentication for SQL Server. */
  Windows = "Windows",
  /** Used for scenarios were the mode cannot be determined. */
  Undefined = "Undefined",
}

/**
 * Mode of authentication in SqlServer. \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mixed**: Mixed mode authentication for SQL Server which includes windows and SQL Authentication. \
 * **Windows**: Windows Authentication for SQL Server. \
 * **Undefined**: Used for scenarios were the mode cannot be determined.
 */
export type Mode = string;

export function entraAuthenticationArraySerializer(result: Array<EntraAuthentication>): any[] {
  return result.map((item) => {
    return entraAuthenticationSerializer(item);
  });
}

export function entraAuthenticationArrayDeserializer(result: Array<EntraAuthentication>): any[] {
  return result.map((item) => {
    return entraAuthenticationDeserializer(item);
  });
}

/** Entra Authentication configuration. */
export interface EntraAuthentication {
  /** The method used for Entra authentication */
  identityType?: IdentityType;
  /** The client Id of the Managed Identity to query Microsoft Graph API. An empty string must be used for the system assigned Managed Identity. */
  clientId?: string;
}

export function entraAuthenticationSerializer(item: EntraAuthentication): any {
  return { identityType: item["identityType"], clientId: item["clientId"] };
}

export function entraAuthenticationDeserializer(item: any): EntraAuthentication {
  return {
    identityType: item["identityType"],
    clientId: item["clientId"],
  };
}

/** The method used for Entra authentication */
export enum KnownIdentityType {
  /** System Assigned Managed Identity */
  SystemAssignedManagedIdentity = "SystemAssignedManagedIdentity",
  /** User Assigned Managed Identity */
  UserAssignedManagedIdentity = "UserAssignedManagedIdentity",
}

/**
 * The method used for Entra authentication \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssignedManagedIdentity**: System Assigned Managed Identity \
 * **UserAssignedManagedIdentity**: User Assigned Managed Identity
 */
export type IdentityType = string;

/** An update to a SQL Server Instance. */
export interface SqlServerInstanceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** null */
  properties?: SqlServerInstanceUpdateProperties;
}

export function sqlServerInstanceUpdateSerializer(item: SqlServerInstanceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlServerInstanceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties of update SqlServerInstance. */
export interface SqlServerInstanceUpdateProperties {
  /** SQL Server version. */
  version?: SqlVersion;
  /** SQL Server edition. */
  edition?: EditionType;
  /** ARM Resource id of the container resource (Azure Arc for Servers). */
  readonly containerResourceId?: string;
  /** The unique ID of the hybrid machine that this resource belongs to. */
  readonly vmId?: string;
  /** The time when the resource was created. */
  readonly createTime?: string;
  /** The number of logical processors used by the SQL Server instance. */
  readonly vCore?: string;
  /** The number of total cores of the Operating System Environment (OSE) hosting the SQL Server instance. */
  cores?: string;
  /** The cloud connectivity status. */
  readonly status?: ConnectionStatus;
  /** Indicates the discovery agent or client for this instance. Default is Azure Arc. */
  discoverySource?: DiscoverySource;
  /** SQL Server update level. */
  readonly patchLevel?: string;
  /** SQL Server collation. */
  readonly collation?: string;
  /** Indicates whether database master key exists in SQL Server. */
  readonly dbMasterKeyExists?: boolean;
  /** Indicates whether always On availability groups is enabled in SQL Server. */
  readonly isHadrEnabled?: boolean;
  /** An array of integers, where each value represents the enabled trace flags in SQL Server. */
  readonly traceFlags?: number[];
  /** SQL Server current version. */
  readonly currentVersion?: string;
  /** SQL Server instance name. */
  instanceName?: string;
  /** Dynamic TCP ports used by SQL Server. */
  readonly tcpDynamicPorts?: string;
  /** Static TCP ports used by SQL Server. */
  readonly tcpStaticPorts?: string;
  /** SQL Server product ID. */
  readonly productId?: string;
  /** SQL Server license type. */
  readonly licenseType?: ArcSqlServerLicenseType;
  /** Timestamp of last Azure Defender status update. */
  readonly azureDefenderStatusLastUpdated?: Date;
  /** Status of Azure Defender. */
  readonly azureDefenderStatus?: DefenderStatus;
  /** The provisioning state of the Arc-enabled SQL Server resource. */
  readonly provisioningState?: string;
  /** The time when last successful inventory upload was performed. */
  readonly lastInventoryUploadTime?: Date;
  /** The time when last successful usage upload was performed. */
  readonly lastUsageUploadTime?: Date;
  /** Type of host for Azure Arc SQL Server */
  hostType?: HostType;
  /** The role of the SQL Server, based on availability. */
  readonly alwaysOnRole?: AlwaysOnRole;
  /** Failover Cluster Instance properties. */
  failoverCluster?: FailoverCluster;
  /** The backup profile for the SQL server. */
  backupPolicy?: BackupPolicy;
  /** Upgrade Action for this resource is locked until it expires. The Expiration time indicated by this value. It is not locked when it is empty. */
  upgradeLockedUntil?: Date;
  /** The monitoring configuration. */
  monitoring?: Monitoring;
  /** Migration related configuration. */
  migration?: Migration;
  /** The configuration related to SQL best practices assessment. */
  bestPracticesAssessment?: BestPracticesAssessment;
  /** Client connection related configuration. */
  clientConnection?: ClientConnection;
  /** Indicates if the resource represents a SQL Server engine or a SQL Server component service installed on the host. */
  serviceType?: ServiceType;
  /** Authentication related configuration for the SQL Server Instance. */
  authentication?: Authentication;
  /** Database mirroring endpoint related properties. */
  databaseMirroringEndpoint?: DBMEndpoint;
  /** Indicates whether Microsoft PKI root-authority certificate (trusted by Azure) exists in SQL Server and trusted for Azure database.windows.net domains. */
  isMicrosoftPkiCertTrustConfigured?: boolean;
  /** Indicates whether DigiCert PKI root-authority certificate (trusted by Azure) exists in SQL Server and trusted for Azure database.windows.net domains. */
  isDigiCertPkiCertTrustConfigured?: boolean;
  /** maximum server memory (MB) value configured for this instance. */
  maxServerMemoryMB?: number;
}

export function sqlServerInstanceUpdatePropertiesSerializer(
  item: SqlServerInstanceUpdateProperties,
): any {
  return {
    version: item["version"],
    edition: item["edition"],
    cores: item["cores"],
    discoverySource: item["discoverySource"],
    instanceName: item["instanceName"],
    hostType: item["hostType"],
    failoverCluster: !item["failoverCluster"]
      ? item["failoverCluster"]
      : failoverClusterSerializer(item["failoverCluster"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicySerializer(item["backupPolicy"]),
    upgradeLockedUntil: !item["upgradeLockedUntil"]
      ? item["upgradeLockedUntil"]
      : item["upgradeLockedUntil"].toISOString(),
    monitoring: !item["monitoring"] ? item["monitoring"] : monitoringSerializer(item["monitoring"]),
    migration: !item["migration"] ? item["migration"] : migrationSerializer(item["migration"]),
    bestPracticesAssessment: !item["bestPracticesAssessment"]
      ? item["bestPracticesAssessment"]
      : bestPracticesAssessmentSerializer(item["bestPracticesAssessment"]),
    clientConnection: !item["clientConnection"]
      ? item["clientConnection"]
      : clientConnectionSerializer(item["clientConnection"]),
    serviceType: item["serviceType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
    databaseMirroringEndpoint: !item["databaseMirroringEndpoint"]
      ? item["databaseMirroringEndpoint"]
      : dbmEndpointSerializer(item["databaseMirroringEndpoint"]),
    isMicrosoftPkiCertTrustConfigured: item["isMicrosoftPkiCertTrustConfigured"],
    isDigiCertPkiCertTrustConfigured: item["isDigiCertPkiCertTrustConfigured"],
    maxServerMemoryMB: item["maxServerMemoryMB"],
  };
}

/** A list of SqlServerInstance. */
export interface _SqlServerInstanceListResult {
  /** Array of results. */
  readonly value?: SqlServerInstance[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _sqlServerInstanceListResultDeserializer(item: any): _SqlServerInstanceListResult {
  return {
    value: !item["value"] ? item["value"] : sqlServerInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlServerInstanceArraySerializer(result: Array<SqlServerInstance>): any[] {
  return result.map((item) => {
    return sqlServerInstanceSerializer(item);
  });
}

export function sqlServerInstanceArrayDeserializer(result: Array<SqlServerInstance>): any[] {
  return result.map((item) => {
    return sqlServerInstanceDeserializer(item);
  });
}

/** The Arc SQL Server instance telemetry retrieval request. */
export interface SqlServerInstanceTelemetryRequest {
  /** The name of the telemetry dataset to retrieve. */
  datasetName: string;
  /** The start time for the time range to fetch telemetry for. If not specified, the current time minus 1 hour is used. */
  startTime?: Date;
  /** The end time for the time range to fetch telemetry for. If not specified, the current time is used. */
  endTime?: Date;
  /** The time granularity to fetch telemetry for. This is an ISO8601 duration. Examples: PT15M, PT1H, P1D */
  interval?: string;
  /** The aggregation type to use for the numerical columns in the dataset. */
  aggregationType?: AggregationType;
  /** The list of database names to return telemetry for. If not specified, telemetry for all databases will be aggregated and returned. */
  databaseNames?: string[];
}

export function sqlServerInstanceTelemetryRequestSerializer(
  item: SqlServerInstanceTelemetryRequest,
): any {
  return {
    datasetName: item["datasetName"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    endTime: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    interval: item["interval"],
    aggregationType: item["aggregationType"],
    databaseNames: !item["databaseNames"]
      ? item["databaseNames"]
      : item["databaseNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The aggregation type to use for the numerical columns in the dataset. */
export enum KnownAggregationType {
  /** Average */
  Average = "Average",
  /** Minimum */
  Minimum = "Minimum",
  /** Maximum */
  Maximum = "Maximum",
  /** Sum */
  Sum = "Sum",
  /** Count */
  Count = "Count",
}

/**
 * The aggregation type to use for the numerical columns in the dataset. \
 * {@link KnownAggregationType} can be used interchangeably with AggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Average**: Average \
 * **Minimum**: Minimum \
 * **Maximum**: Maximum \
 * **Sum**: Sum \
 * **Count**: Count
 */
export type AggregationType = string;

/** A section of the telemetry response for the SQL Server instance. */
export interface _SqlServerInstanceTelemetryResponse {
  /** The columns of the result telemetry table for the SQL Server instance. */
  columns: SqlServerInstanceTelemetryColumn[];
  /** A list of rows from the result telemetry table for the SQL Server instance. */
  rows: string[][];
  /** The link to the next section of rows of the telemetry response for the SQL Server instance. Null if no more sections are available. */
  readonly nextLink?: string;
}

export function _sqlServerInstanceTelemetryResponseDeserializer(
  item: any,
): _SqlServerInstanceTelemetryResponse {
  return {
    columns: sqlServerInstanceTelemetryColumnArrayDeserializer(item["columns"]),
    rows: item["rows"].map((p: any) => {
      return p.map((p1: any) => {
        return p1;
      });
    }),
    nextLink: item["nextLink"],
  };
}

export function sqlServerInstanceTelemetryColumnArrayDeserializer(
  result: Array<SqlServerInstanceTelemetryColumn>,
): any[] {
  return result.map((item) => {
    return sqlServerInstanceTelemetryColumnDeserializer(item);
  });
}

/** The telemetry column for the SQL Server instance. */
export interface SqlServerInstanceTelemetryColumn {
  /** The name of the telemetry column. */
  name?: string;
  /** The type of the telemetry column. */
  type?: SqlServerInstanceTelemetryColumnType;
}

export function sqlServerInstanceTelemetryColumnDeserializer(
  item: any,
): SqlServerInstanceTelemetryColumn {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of the telemetry column. */
export enum KnownSqlServerInstanceTelemetryColumnType {
  /** bool */
  Bool = "bool",
  /** datetime */
  Datetime = "datetime",
  /** int */
  Int = "int",
  /** long */
  Long = "long",
  /** double */
  Double = "double",
  /** string */
  String = "string",
  /** guid */
  Guid = "guid",
  /** timespan */
  Timespan = "timespan",
}

/**
 * The type of the telemetry column. \
 * {@link KnownSqlServerInstanceTelemetryColumnType} can be used interchangeably with SqlServerInstanceTelemetryColumnType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **bool**: bool \
 * **datetime**: datetime \
 * **int**: int \
 * **long**: long \
 * **double**: double \
 * **string**: string \
 * **guid**: guid \
 * **timespan**: timespan
 */
export type SqlServerInstanceTelemetryColumnType = string;

/** The request for retrieving SQL best practices assessment results. */
export interface SqlServerInstanceBpaRequest {
  /** The report type that needs to be fetched. If not specified, the default is AssessmentSummary. */
  reportType?: SqlServerInstanceBpaReportType;
  /** The GUID of the report to return best practices assessment results for. If not specified, summaries for all reports will be returned. */
  reportId?: string;
  /** The opaque token to use to skip to a specific page of the report. If not specified, the first page will be returned. */
  skipToken?: string;
  /** The type of query to run for summarizing the best practices assessment results. If not specified, the default is 'Basic'. */
  queryType?: SqlServerInstanceBpaQueryType;
}

export function sqlServerInstanceBpaRequestSerializer(item: SqlServerInstanceBpaRequest): any {
  return {
    reportType: item["reportType"],
    reportId: item["reportId"],
    skipToken: item["skipToken"],
    queryType: item["queryType"],
  };
}

/** The report type that needs to be fetched. If not specified, the default is AssessmentSummary. */
export enum KnownSqlServerInstanceBpaReportType {
  /** AssessmentDataPoint */
  AssessmentDataPoint = "AssessmentDataPoint",
  /** AssessmentSummary */
  AssessmentSummary = "AssessmentSummary",
}

/**
 * The report type that needs to be fetched. If not specified, the default is AssessmentSummary. \
 * {@link KnownSqlServerInstanceBpaReportType} can be used interchangeably with SqlServerInstanceBpaReportType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AssessmentDataPoint**: AssessmentDataPoint \
 * **AssessmentSummary**: AssessmentSummary
 */
export type SqlServerInstanceBpaReportType = string;

/** The type of query to run for summarizing the best practices assessment results. If not specified, the default is 'Basic'. */
export enum KnownSqlServerInstanceBpaQueryType {
  /** Basic */
  Basic = "Basic",
  /** HistoricalTrends */
  HistoricalTrends = "HistoricalTrends",
}

/**
 * The type of query to run for summarizing the best practices assessment results. If not specified, the default is 'Basic'. \
 * {@link KnownSqlServerInstanceBpaQueryType} can be used interchangeably with SqlServerInstanceBpaQueryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic \
 * **HistoricalTrends**: HistoricalTrends
 */
export type SqlServerInstanceBpaQueryType = string;

/** A section of the SQL best practices assessment response. */
export interface _SqlServerInstanceBpaResponse {
  /** The SQL best practices assessment response columns. */
  columns: SqlServerInstanceBpaColumn[];
  /** An array of results of the SQL best practices assessment response. */
  rows: string[][];
  /** The link to the next page of the best practices assessment response for the SQL Server instance. Null, if no more pages are available. */
  nextLink?: string;
}

export function _sqlServerInstanceBpaResponseDeserializer(
  item: any,
): _SqlServerInstanceBpaResponse {
  return {
    columns: sqlServerInstanceBpaColumnArrayDeserializer(item["columns"]),
    rows: item["rows"].map((p: any) => {
      return p.map((p1: any) => {
        return p1;
      });
    }),
    nextLink: item["nextLink"],
  };
}

export function sqlServerInstanceBpaColumnArrayDeserializer(
  result: Array<SqlServerInstanceBpaColumn>,
): any[] {
  return result.map((item) => {
    return sqlServerInstanceBpaColumnDeserializer(item);
  });
}

/** The SQL best practices assessment result column. */
export interface SqlServerInstanceBpaColumn {
  /** The name of the result column. */
  name?: string;
  /** The type of the result column. */
  type?: SqlServerInstanceBpaColumnType;
}

export function sqlServerInstanceBpaColumnDeserializer(item: any): SqlServerInstanceBpaColumn {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of the result column. */
export enum KnownSqlServerInstanceBpaColumnType {
  /** bool */
  Bool = "bool",
  /** datetime */
  Datetime = "datetime",
  /** int */
  Int = "int",
  /** long */
  Long = "long",
  /** double */
  Double = "double",
  /** string */
  String = "string",
  /** guid */
  Guid = "guid",
  /** timespan */
  Timespan = "timespan",
}

/**
 * The type of the result column. \
 * {@link KnownSqlServerInstanceBpaColumnType} can be used interchangeably with SqlServerInstanceBpaColumnType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **bool**: bool \
 * **datetime**: datetime \
 * **int**: int \
 * **long**: long \
 * **double**: double \
 * **string**: string \
 * **guid**: guid \
 * **timespan**: timespan
 */
export type SqlServerInstanceBpaColumnType = string;

/** The response for running migration assessment on the SQL Server instance. */
export interface SqlServerInstanceRunMigrationAssessmentResponse {
  /** The unique identifier of the job. */
  id?: string;
  /** The name of the SQL Server instance. */
  instanceName?: string;
  /** The status of the job. */
  jobStatus?: JobStatus;
  /** The exception message if the job failed. */
  jobException?: string;
  /** The background job details. */
  backgroundJob?: BackgroundJob;
  /** The list of sequencer actions. */
  sequencerActions?: SequencerAction[];
}

export function sqlServerInstanceRunMigrationAssessmentResponseDeserializer(
  item: any,
): SqlServerInstanceRunMigrationAssessmentResponse {
  return {
    id: item["id"],
    instanceName: item["instanceName"],
    jobStatus: item["jobStatus"],
    jobException: item["jobException"],
    backgroundJob: !item["backgroundJob"]
      ? item["backgroundJob"]
      : backgroundJobDeserializer(item["backgroundJob"]),
    sequencerActions: !item["sequencerActions"]
      ? item["sequencerActions"]
      : sequencerActionArrayDeserializer(item["sequencerActions"]),
  };
}

/** Represents the current status of the target recommendation job. */
export enum KnownJobStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * Represents the current status of the target recommendation job. \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type JobStatus = string;

/** The background job details. */
export interface BackgroundJob {
  /** The state of the background job. */
  state?: State;
  /** The execution state of the background job. */
  executionState?: ExecutionState;
  /** The start time of the background job. */
  startTime?: Date;
  /** The end time of the background job. */
  endTime?: Date;
  /** The last execution status of the background job. */
  lastExecutionStatus?: LastExecutionStatus;
  /** The last execution time of the background job in ISO 8601 date-time format. */
  lastExecutionTime?: Date;
  /** The next execution time of the background job in ISO 8601 date-time format. */
  nextExecutionTime?: Date;
}

export function backgroundJobDeserializer(item: any): BackgroundJob {
  return {
    state: item["state"],
    executionState: item["executionState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    lastExecutionStatus: item["lastExecutionStatus"],
    lastExecutionTime: !item["lastExecutionTime"]
      ? item["lastExecutionTime"]
      : new Date(item["lastExecutionTime"]),
    nextExecutionTime: !item["nextExecutionTime"]
      ? item["nextExecutionTime"]
      : new Date(item["nextExecutionTime"]),
  };
}

/** The activation state of the license. */
export enum KnownState {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
  /** Terminated */
  Terminated = "Terminated",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** Completed */
  Completed = "Completed",
  /** Faulted */
  Faulted = "Faulted",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * The activation state of the license. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive**: Inactive \
 * **Active**: Active \
 * **Terminated**: Terminated \
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **Deleted**: Deleted \
 * **Completed**: Completed \
 * **Faulted**: Faulted \
 * **Suspended**: Suspended
 */
export type State = string;

/** The execution state of the background job. */
export enum KnownExecutionState {
  /** Waiting */
  Waiting = "Waiting",
  /** Running */
  Running = "Running",
}

/**
 * The execution state of the background job. \
 * {@link KnownExecutionState} can be used interchangeably with ExecutionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Waiting**: Waiting \
 * **Running**: Running
 */
export type ExecutionState = string;

/** The last execution status of the background job. */
export enum KnownLastExecutionStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Faulted */
  Faulted = "Faulted",
  /** Postponed */
  Postponed = "Postponed",
  /** Rescheduled */
  Rescheduled = "Rescheduled",
}

/**
 * The last execution status of the background job. \
 * {@link KnownLastExecutionStatus} can be used interchangeably with LastExecutionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Completed**: Completed \
 * **Failed**: Failed \
 * **Faulted**: Faulted \
 * **Postponed**: Postponed \
 * **Rescheduled**: Rescheduled
 */
export type LastExecutionStatus = string;

export function sequencerActionArrayDeserializer(result: Array<SequencerAction>): any[] {
  return result.map((item) => {
    return sequencerActionDeserializer(item);
  });
}

/** The sequencer action details. */
export interface SequencerAction {
  /** The unique identifier of the sequencer action. */
  actionId?: string;
  /** The state of the sequencer action. */
  state?: SequencerState;
  /** The result of the sequencer action. */
  result?: Result;
}

export function sequencerActionDeserializer(item: any): SequencerAction {
  return {
    actionId: item["actionId"],
    state: item["state"],
    result: item["result"],
  };
}

/** The state of the sequencer action. */
export enum KnownSequencerState {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** WaitingPredecessors */
  WaitingPredecessors = "WaitingPredecessors",
  /** ExecutingAction */
  ExecutingAction = "ExecutingAction",
  /** CreatingSuccessors */
  CreatingSuccessors = "CreatingSuccessors",
  /** Completed */
  Completed = "Completed",
}

/**
 * The state of the sequencer action. \
 * {@link KnownSequencerState} can be used interchangeably with SequencerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **WaitingPredecessors**: WaitingPredecessors \
 * **ExecutingAction**: ExecutingAction \
 * **CreatingSuccessors**: CreatingSuccessors \
 * **Completed**: Completed
 */
export type SequencerState = string;

/** The result of the sequencer action. */
export enum KnownResult {
  /** NotCompleted */
  NotCompleted = "NotCompleted",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** TimedOut */
  TimedOut = "TimedOut",
  /** Skipped */
  Skipped = "Skipped",
}

/**
 * The result of the sequencer action. \
 * {@link KnownResult} can be used interchangeably with Result,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotCompleted**: NotCompleted \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **TimedOut**: TimedOut \
 * **Skipped**: Skipped
 */
export type Result = string;

/** The request for running a SQL Server Instance target recommendation job. */
export interface SqlServerInstanceRunTargetRecommendationJobRequest {
  /** Controls whether the SQL Server instance resource is updated with the target recommendation details after the job completes. */
  resourceUpdateMode?: ResourceUpdateMode;
  /** Specifies whether to include file-level requirements in the target recommendation report. */
  includeFileLevelRequirements?: boolean;
  /** The Azure region used for target SKU pricing and availability (e.g., 'westus', 'eastus2', 'westeurope'). */
  targetLocation?: string;
  /** The percentile of performance data points used for aggregation (Range: 1-100). */
  percentile?: number;
  /** The lookback period in days for performance data used in the target recommendation. */
  lookbackPeriodInDays?: number;
}

export function sqlServerInstanceRunTargetRecommendationJobRequestSerializer(
  item: SqlServerInstanceRunTargetRecommendationJobRequest,
): any {
  return {
    resourceUpdateMode: item["resourceUpdateMode"],
    includeFileLevelRequirements: item["includeFileLevelRequirements"],
    targetLocation: item["targetLocation"],
    percentile: item["percentile"],
    lookbackPeriodInDays: item["lookbackPeriodInDays"],
  };
}

/** Controls whether the SQL Server instance resource is updated with the target recommendation details after the job completes. */
export enum KnownResourceUpdateMode {
  /** Update the SQL Server instance resource with all target recommendation details, including SKU recommendations and cost estimates, upon job completion. */
  UpdateAllTargetRecommendationDetails = "UpdateAllTargetRecommendationDetails",
  /** Do not update the SQL Server instance resource. The target recommendation results will only be available via the GetTargetRecommendationReports API. */
  SkipResourceUpdate = "SkipResourceUpdate",
}

/**
 * Controls whether the SQL Server instance resource is updated with the target recommendation details after the job completes. \
 * {@link KnownResourceUpdateMode} can be used interchangeably with ResourceUpdateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UpdateAllTargetRecommendationDetails**: Update the SQL Server instance resource with all target recommendation details, including SKU recommendations and cost estimates, upon job completion. \
 * **SkipResourceUpdate**: Do not update the SQL Server instance resource. The target recommendation results will only be available via the GetTargetRecommendationReports API.
 */
export type ResourceUpdateMode = string;

/** Represents the response of a SQL Server Instance target recommendation job execution. */
export interface SqlServerInstanceRunTargetRecommendationJobResponse {
  /** Represents the current status of the target recommendation job. */
  readonly jobStatus?: JobStatus;
}

export function sqlServerInstanceRunTargetRecommendationJobResponseDeserializer(
  item: any,
): SqlServerInstanceRunTargetRecommendationJobResponse {
  return {
    jobStatus: item["jobStatus"],
  };
}

/** The request for retrieving SQL Server Instance target recommendation reports. */
export interface SqlServerInstanceTargetRecommendationReportsRequest {
  /** Zero-based offset indicating where to continue reading reports in the overall list of reports. Defaults to 0 if not provided. This value must be used together with the corresponding sectionOffset to resume pagination. The reportOffset advances only after all sections of the current report have been retrieved. To retrieve subsequent pages, use the nextReportOffset and nextSectionOffset values from the previous response. */
  reportOffset?: number;
  /** Zero-based offset indicating where to continue reading sections within the current report. Defaults to 0 if not provided. This value must be used together with the corresponding reportOffset to resume pagination. To retrieve subsequent pages, use the nextReportOffset and nextSectionOffset values from the previous response. */
  sectionOffset?: number;
  /** Filters the report to a specific section type. If not specified, all section types are returned. Section types are grouped into two categories: requirements sections contain performance and resource metrics collected from the source SQL Server, while recommendation sections contain suggested Azure target SKUs derived from those requirements. */
  sectionType?: SqlServerInstanceTargetRecommendationReportSectionType;
  /** The list of database names to filter the report sections by. If not specified, sections for all databases are returned. */
  databaseNames?: string[];
}

export function sqlServerInstanceTargetRecommendationReportsRequestSerializer(
  item: SqlServerInstanceTargetRecommendationReportsRequest,
): any {
  return {
    reportOffset: item["reportOffset"],
    sectionOffset: item["sectionOffset"],
    sectionType: item["sectionType"],
    databaseNames: !item["databaseNames"]
      ? item["databaseNames"]
      : item["databaseNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Filters the report to a specific section type. If not specified, all section types are returned. Section types are grouped into two categories: requirements sections contain performance and resource metrics collected from the source SQL Server, while recommendation sections contain suggested Azure target SKUs derived from those requirements. */
export enum KnownSqlServerInstanceTargetRecommendationReportSectionType {
  /** Aggregated performance and resource requirements for the entire SQL Server instance, including CPU, memory, IOPS, throughput, and storage metrics collected from the source server. */
  RequirementsPerInstance = "RequirementsPerInstance",
  /** Performance and resource requirements broken down per database, including CPU, memory, IOPS, throughput, and storage metrics collected from the source server for each individual database. */
  RequirementsPerDatabase = "RequirementsPerDatabase",
  /** File-level performance requirements per database, including IOPS and throughput metrics for individual data and log files. Only available when includeFileLevelRequirements is set to true in the RunTargetRecommendationJob request. */
  FileRequirementsPerDatabase = "FileRequirementsPerDatabase",
  /** Recommended Azure SQL Virtual Machine SKU for the entire SQL Server instance, including VM size, compute, storage, and estimated monthly cost derived from the collected requirements. */
  SqlVmTargetRecommendationPerInstance = "SqlVmTargetRecommendationPerInstance",
  /** Recommended Azure SQL Managed Instance SKU for the entire SQL Server instance, including service tier, compute, storage, and estimated monthly cost derived from the collected requirements. */
  SqlMiTargetRecommendationPerInstance = "SqlMiTargetRecommendationPerInstance",
  /** Recommended Azure SQL Database SKU per database, including service tier, compute, storage, and estimated monthly cost derived from the collected requirements for each individual database. */
  SqlDbTargetRecommendationPerDatabase = "SqlDbTargetRecommendationPerDatabase",
}

/**
 * Filters the report to a specific section type. If not specified, all section types are returned. Section types are grouped into two categories: requirements sections contain performance and resource metrics collected from the source SQL Server, while recommendation sections contain suggested Azure target SKUs derived from those requirements. \
 * {@link KnownSqlServerInstanceTargetRecommendationReportSectionType} can be used interchangeably with SqlServerInstanceTargetRecommendationReportSectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RequirementsPerInstance**: Aggregated performance and resource requirements for the entire SQL Server instance, including CPU, memory, IOPS, throughput, and storage metrics collected from the source server. \
 * **RequirementsPerDatabase**: Performance and resource requirements broken down per database, including CPU, memory, IOPS, throughput, and storage metrics collected from the source server for each individual database. \
 * **FileRequirementsPerDatabase**: File-level performance requirements per database, including IOPS and throughput metrics for individual data and log files. Only available when includeFileLevelRequirements is set to true in the RunTargetRecommendationJob request. \
 * **SqlVmTargetRecommendationPerInstance**: Recommended Azure SQL Virtual Machine SKU for the entire SQL Server instance, including VM size, compute, storage, and estimated monthly cost derived from the collected requirements. \
 * **SqlMiTargetRecommendationPerInstance**: Recommended Azure SQL Managed Instance SKU for the entire SQL Server instance, including service tier, compute, storage, and estimated monthly cost derived from the collected requirements. \
 * **SqlDbTargetRecommendationPerDatabase**: Recommended Azure SQL Database SKU per database, including service tier, compute, storage, and estimated monthly cost derived from the collected requirements for each individual database.
 */
export type SqlServerInstanceTargetRecommendationReportSectionType = string;

/** Represents the response containing SQL Server Instance target recommendation reports. */
export interface SqlServerInstanceTargetRecommendationReportsResponse {
  /** Represents the status of the latest target recommendation job. Report records are returned only when the job status is Succeeded. */
  readonly jobStatus?: JobStatus;
  /** A collection of target recommendation reports. Returned only when the job status is Succeeded. */
  readonly reports?: SqlServerInstanceTargetRecommendationReport[];
  /** The total number of target recommendation reports available for retrieval. Currently, only the latest report is returned, so this value is always 1. */
  readonly totalReportCount?: number;
  /** The report offset to use in the next request along with nextSectionOffset to continue retrieving data. This value remains the same until all sections of the current report have been retrieved. Present only when there is more data to retrieve. When both nextReportOffset and nextSectionOffset are absent, all data has been returned. */
  readonly nextReportOffset?: number;
  /** The section offset to use in the next request along with nextReportOffset to continue retrieving sections of the current report. Present only when there is more data to retrieve. When both nextReportOffset and nextSectionOffset are absent, all data has been returned. */
  readonly nextSectionOffset?: number;
}

export function sqlServerInstanceTargetRecommendationReportsResponseDeserializer(
  item: any,
): SqlServerInstanceTargetRecommendationReportsResponse {
  return {
    jobStatus: item["jobStatus"],
    reports: !item["reports"]
      ? item["reports"]
      : sqlServerInstanceTargetRecommendationReportArrayDeserializer(item["reports"]),
    totalReportCount: item["totalReportCount"],
    nextReportOffset: item["nextReportOffset"],
    nextSectionOffset: item["nextSectionOffset"],
  };
}

export function sqlServerInstanceTargetRecommendationReportArrayDeserializer(
  result: Array<SqlServerInstanceTargetRecommendationReport>,
): any[] {
  return result.map((item) => {
    return sqlServerInstanceTargetRecommendationReportDeserializer(item);
  });
}

/** Represents a target recommendation report for a SQL Server instance. */
export interface SqlServerInstanceTargetRecommendationReport {
  /** The identifier of the target recommendation report. */
  readonly reportId?: string;
  /** The UTC timestamp in ISO 8601 format indicating when the target recommendation report was generated. */
  readonly createdTime?: Date;
  /** Collection of sections included in the report. */
  readonly sections?: SqlServerInstanceTargetRecommendationReportSection[];
}

export function sqlServerInstanceTargetRecommendationReportDeserializer(
  item: any,
): SqlServerInstanceTargetRecommendationReport {
  return {
    reportId: item["reportId"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    sections: !item["sections"]
      ? item["sections"]
      : sqlServerInstanceTargetRecommendationReportSectionArrayDeserializer(item["sections"]),
  };
}

export function sqlServerInstanceTargetRecommendationReportSectionArrayDeserializer(
  result: Array<SqlServerInstanceTargetRecommendationReportSection>,
): any[] {
  return result.map((item) => {
    return sqlServerInstanceTargetRecommendationReportSectionDeserializer(item);
  });
}

/** Represents a section within a target recommendation report. */
export interface SqlServerInstanceTargetRecommendationReportSection {
  /** Serialized JSON representation of the section data. If isCompressed is true, the value contains base64-encoded GZip-compressed JSON. */
  readonly data?: string;
  /** The type of this section. Requirements sections contain source server performance metrics, while recommendation sections contain suggested Azure target SKUs. */
  readonly type?: SqlServerInstanceTargetRecommendationReportSectionType;
  /** The name of the database to which this section applies. An empty string indicates that the section contains instance-level data rather than database-level data. */
  readonly databaseName?: string;
  /** Indicates whether the data field contains base64-encoded GZip-compressed JSON. */
  readonly isCompressed?: boolean;
}

export function sqlServerInstanceTargetRecommendationReportSectionDeserializer(
  item: any,
): SqlServerInstanceTargetRecommendationReportSection {
  return {
    data: item["data"],
    type: item["type"],
    databaseName: item["databaseName"],
    isCompressed: item["isCompressed"],
  };
}

/** Represents the response containing the SQL Server Instance Migration Readiness report. */
export interface SqlServerInstanceMigrationReadinessReportResponse {
  /** The migration readiness report as a serialized JSON string. When isCompressed is true, the value is base64-encoded GZip-compressed and must be decoded and decompressed before parsing. */
  readonly report?: string;
  /** Indicates whether the report field contains base64-encoded GZip-compressed JSON. */
  readonly isCompressed?: boolean;
  /** The UTC timestamp in ISO 8601 format indicating when the migration readiness report was created. */
  readonly createdTime?: Date;
}

export function sqlServerInstanceMigrationReadinessReportResponseDeserializer(
  item: any,
): SqlServerInstanceMigrationReadinessReportResponse {
  return {
    report: item["report"],
    isCompressed: item["isCompressed"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
  };
}

/** The response object for the request to run SQL best practices assessment. */
export interface SqlServerInstanceRunBestPracticesAssessmentResponse {
  /** The unique identifier of the job. */
  id?: string;
  /** The name of the SQL Server instance. */
  instanceName?: string;
  /** The status of the job. */
  jobStatus?: JobStatus;
  /** The exception message if the job failed. */
  jobException?: string;
  /** The background job details. */
  backgroundJob?: BackgroundJob;
  /** The list of sequencer actions. */
  sequencerActions?: SequencerAction[];
}

export function sqlServerInstanceRunBestPracticesAssessmentResponseDeserializer(
  item: any,
): SqlServerInstanceRunBestPracticesAssessmentResponse {
  return {
    id: item["id"],
    instanceName: item["instanceName"],
    jobStatus: item["jobStatus"],
    jobException: item["jobException"],
    backgroundJob: !item["backgroundJob"]
      ? item["backgroundJob"]
      : backgroundJobDeserializer(item["backgroundJob"]),
    sequencerActions: !item["sequencerActions"]
      ? item["sequencerActions"]
      : sequencerActionArrayDeserializer(item["sequencerActions"]),
  };
}

/** The response object for the request to run migration readiness assessment. */
export interface SqlServerInstanceRunMigrationReadinessAssessmentResponse {
  /** The unique identifier of the job. */
  id?: string;
  /** The name of the SQL Server instance. */
  instanceName?: string;
  /** The status of the job. */
  jobStatus?: JobStatus;
  /** The exception message if the job failed. */
  jobException?: string;
  /** The background job details. */
  backgroundJob?: BackgroundJob;
  /** The list of sequencer actions. */
  sequencerActions?: SequencerAction[];
}

export function sqlServerInstanceRunMigrationReadinessAssessmentResponseDeserializer(
  item: any,
): SqlServerInstanceRunMigrationReadinessAssessmentResponse {
  return {
    id: item["id"],
    instanceName: item["instanceName"],
    jobStatus: item["jobStatus"],
    jobException: item["jobException"],
    backgroundJob: !item["backgroundJob"]
      ? item["backgroundJob"]
      : backgroundJobDeserializer(item["backgroundJob"]),
    sequencerActions: !item["sequencerActions"]
      ? item["sequencerActions"]
      : sequencerActionArrayDeserializer(item["sequencerActions"]),
  };
}

/** The request for the status of the jobs running on the SQL Server instance. */
export interface SqlServerInstanceJobsStatusRequest {
  /** The name of the feature to retrieve the job status for. */
  featureName?: string;
  /** The type of the job to retrieve the status for. */
  jobType?: string;
}

export function sqlServerInstanceJobsStatusRequestSerializer(
  item: SqlServerInstanceJobsStatusRequest,
): any {
  return { featureName: item["featureName"], jobType: item["jobType"] };
}

/** The response for the status of the jobs running on the SQL Server instance. */
export interface SqlServerInstanceJobsStatusResponse {
  /** The list of jobs status running on the SQL Server instance. */
  jobsStatus?: SqlServerInstanceJobStatus[];
}

export function sqlServerInstanceJobsStatusResponseDeserializer(
  item: any,
): SqlServerInstanceJobsStatusResponse {
  return {
    jobsStatus: !item["jobsStatus"]
      ? item["jobsStatus"]
      : sqlServerInstanceJobStatusArrayDeserializer(item["jobsStatus"]),
  };
}

export function sqlServerInstanceJobStatusArrayDeserializer(
  result: Array<SqlServerInstanceJobStatus>,
): any[] {
  return result.map((item) => {
    return sqlServerInstanceJobStatusDeserializer(item);
  });
}

/** The status of the job running on the SQL Server instance. */
export interface SqlServerInstanceJobStatus {
  /** The unique identifier of the job. */
  id?: string;
  /** The name of the SQL Server instance. */
  instanceName?: string;
  /** The status of the job. */
  jobStatus?: JobStatus;
  /** The exception message if the job failed. */
  jobException?: string;
  /** The background job details. */
  backgroundJob?: BackgroundJob;
  /** The list of sequencer actions. */
  sequencerActions?: SequencerAction[];
}

export function sqlServerInstanceJobStatusDeserializer(item: any): SqlServerInstanceJobStatus {
  return {
    id: item["id"],
    instanceName: item["instanceName"],
    jobStatus: item["jobStatus"],
    jobException: item["jobException"],
    backgroundJob: !item["backgroundJob"]
      ? item["backgroundJob"]
      : backgroundJobDeserializer(item["backgroundJob"]),
    sequencerActions: !item["sequencerActions"]
      ? item["sequencerActions"]
      : sequencerActionArrayDeserializer(item["sequencerActions"]),
  };
}

/** The request for the jobs running on the SQL Server instance. */
export interface SqlServerInstanceJobsRequest {
  /** The name of the feature to retrieve the jobs for. */
  featureName?: string;
  /** The type of the job to retrieve the jobs for. */
  jobType?: string;
}

export function sqlServerInstanceJobsRequestSerializer(item: SqlServerInstanceJobsRequest): any {
  return { featureName: item["featureName"], jobType: item["jobType"] };
}

/** The response for the jobs running on the SQL Server instance. */
export interface SqlServerInstanceJobsResponse {
  /** The list of jobs running on the SQL Server instance. */
  jobs?: SqlServerInstanceJob[];
}

export function sqlServerInstanceJobsResponseDeserializer(
  item: any,
): SqlServerInstanceJobsResponse {
  return {
    jobs: !item["jobs"] ? item["jobs"] : sqlServerInstanceJobArrayDeserializer(item["jobs"]),
  };
}

export function sqlServerInstanceJobArrayDeserializer(result: Array<SqlServerInstanceJob>): any[] {
  return result.map((item) => {
    return sqlServerInstanceJobDeserializer(item);
  });
}

/** The job running on the SQL Server instance. */
export interface SqlServerInstanceJob {
  /** The unique identifier of the job. */
  id?: string;
  /** The name of the SQL Server instance. */
  instanceName?: string;
  /** The status of the job. */
  jobStatus?: JobStatus;
  /** The exception message if the job failed. */
  jobException?: string;
  /** The background job details. */
  backgroundJob?: BackgroundJob;
  /** The list of sequencer actions. */
  sequencerActions?: SequencerAction[];
}

export function sqlServerInstanceJobDeserializer(item: any): SqlServerInstanceJob {
  return {
    id: item["id"],
    instanceName: item["instanceName"],
    jobStatus: item["jobStatus"],
    jobException: item["jobException"],
    backgroundJob: !item["backgroundJob"]
      ? item["backgroundJob"]
      : backgroundJobDeserializer(item["backgroundJob"]),
    sequencerActions: !item["sequencerActions"]
      ? item["sequencerActions"]
      : sequencerActionArrayDeserializer(item["sequencerActions"]),
  };
}

/** The MI Link assessment request for the SQL Server instance. */
export interface SqlServerInstanceManagedInstanceLinkAssessmentRequest {
  /** The Azure SQL Managed Instance resource ID to link with the SQL Server instance. */
  azureManagedInstanceResourceId: string;
  /** The role of managed instance in a distributed availability group, can be Primary or Secondary. */
  azureManagedInstanceRole?: AzureManagedInstanceRole;
  /** An array of strings, where each value represents the name of a database to be replicated to the Azure SQL Managed Instance. */
  databaseNames: string[];
  /** The name of the availability group to be used for the database replication. */
  availabilityGroupName: string;
  /** The name of the DAG to be used for the database replication. Also referred to as Link Name. */
  distributedAvailabilityGroupName: string;
  /** An array of strings, where each value represents the category of the assessment to be run. If this field is not provided, all assessment categories will be run. */
  assessmentCategories?: MiLinkAssessmentCategory[];
  /** The IP address of the SQL Server instance. */
  sqlServerIpAddress?: string;
}

export function sqlServerInstanceManagedInstanceLinkAssessmentRequestSerializer(
  item: SqlServerInstanceManagedInstanceLinkAssessmentRequest,
): any {
  return {
    azureManagedInstanceResourceId: item["azureManagedInstanceResourceId"],
    azureManagedInstanceRole: item["azureManagedInstanceRole"],
    databaseNames: item["databaseNames"].map((p: any) => {
      return p;
    }),
    availabilityGroupName: item["availabilityGroupName"],
    distributedAvailabilityGroupName: item["distributedAvailabilityGroupName"],
    assessmentCategories: !item["assessmentCategories"]
      ? item["assessmentCategories"]
      : item["assessmentCategories"].map((p: any) => {
          return p;
        }),
    sqlServerIpAddress: item["sqlServerIpAddress"],
  };
}

/** The role of managed instance in a distributed availability group, can be Primary or Secondary. */
export enum KnownAzureManagedInstanceRole {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * The role of managed instance in a distributed availability group, can be Primary or Secondary. \
 * {@link KnownAzureManagedInstanceRole} can be used interchangeably with AzureManagedInstanceRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type AzureManagedInstanceRole = string;

/** Validation category for the MI Link prerequisites assessment. */
export enum KnownMiLinkAssessmentCategory {
  /** Assessments of the given instance on the on-premise SQL Server (box). */
  SqlInstance = "SqlInstance",
  /** Assessments of the database(s) on the given instance on the on-premise SQL Server (box). */
  SqlInstanceDatabase = "SqlInstanceDatabase",
  /** Assessments of the Managed Instance. */
  ManagedInstance = "ManagedInstance",
  /** Assessments of the database(s) on the Managed Instance. */
  ManagedInstanceDatabase = "ManagedInstanceDatabase",
  /** Assessments that use data from both the Managed Instance and the given instance of the on-premise SQL Server (box) for the validations. */
  ManagedInstanceCrossValidation = "ManagedInstanceCrossValidation",
  /** Assessments of the necessary certificates configuration. */
  Certificates = "Certificates",
  /** Assessment of network connectivity from the on-premise SQL Server (box) to the Managed Instance. */
  BoxToMiNetworkConnectivity = "BoxToMiNetworkConnectivity",
  /** Assessments of network connectivity from the Managed Instance to the on-premise SQL Server (box). */
  MiToBoxNetworkConnectivity = "MiToBoxNetworkConnectivity",
  /** Assessments of the chosen Availability Group. */
  SqlInstanceAg = "SqlInstanceAg",
  /** Assessments of the chosen Distributed Availability Group. */
  DagCrossValidation = "DagCrossValidation",
}

/**
 * Validation category for the MI Link prerequisites assessment. \
 * {@link KnownMiLinkAssessmentCategory} can be used interchangeably with MiLinkAssessmentCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlInstance**: Assessments of the given instance on the on-premise SQL Server (box). \
 * **SqlInstanceDatabase**: Assessments of the database(s) on the given instance on the on-premise SQL Server (box). \
 * **ManagedInstance**: Assessments of the Managed Instance. \
 * **ManagedInstanceDatabase**: Assessments of the database(s) on the Managed Instance. \
 * **ManagedInstanceCrossValidation**: Assessments that use data from both the Managed Instance and the given instance of the on-premise SQL Server (box) for the validations. \
 * **Certificates**: Assessments of the necessary certificates configuration. \
 * **BoxToMiNetworkConnectivity**: Assessment of network connectivity from the on-premise SQL Server (box) to the Managed Instance. \
 * **MiToBoxNetworkConnectivity**: Assessments of network connectivity from the Managed Instance to the on-premise SQL Server (box). \
 * **SqlInstanceAg**: Assessments of the chosen Availability Group. \
 * **DagCrossValidation**: Assessments of the chosen Distributed Availability Group.
 */
export type MiLinkAssessmentCategory = string;

/** The response containing the results of the MI Link assessment. */
export interface SqlServerInstanceManagedInstanceLinkAssessmentResponse {
  /** The list of the results for MI Link assessment. */
  assessments?: SqlServerInstanceManagedInstanceLinkAssessment[];
}

export function sqlServerInstanceManagedInstanceLinkAssessmentResponseDeserializer(
  item: any,
): SqlServerInstanceManagedInstanceLinkAssessmentResponse {
  return {
    assessments: !item["assessments"]
      ? item["assessments"]
      : sqlServerInstanceManagedInstanceLinkAssessmentArrayDeserializer(item["assessments"]),
  };
}

export function sqlServerInstanceManagedInstanceLinkAssessmentArrayDeserializer(
  result: Array<SqlServerInstanceManagedInstanceLinkAssessment>,
): any[] {
  return result.map((item) => {
    return sqlServerInstanceManagedInstanceLinkAssessmentDeserializer(item);
  });
}

/** The status of an individual requirement for MI Link. */
export interface SqlServerInstanceManagedInstanceLinkAssessment {
  /** The name of the requirement. */
  name?: string;
  /** Validation category for the MI Link prerequisites assessment. */
  category?: MiLinkAssessmentCategory;
  /** The status of the requirement. */
  status?: AssessmentStatus;
  /** The information text about requirement. */
  information?: string;
  /** Additional details about the check, including any recommended actions. */
  additionalInformation?: string;
  /** List of names of databases that are failing the given assessment. */
  failingDbs?: string[];
}

export function sqlServerInstanceManagedInstanceLinkAssessmentDeserializer(
  item: any,
): SqlServerInstanceManagedInstanceLinkAssessment {
  return {
    name: item["name"],
    category: item["category"],
    status: item["status"],
    information: item["information"],
    additionalInformation: item["additionalInformation"],
    failingDbs: !item["failingDbs"]
      ? item["failingDbs"]
      : item["failingDbs"].map((p: any) => {
          return p;
        }),
  };
}

/** The status of the requirement. */
export enum KnownAssessmentStatus {
  /** Success */
  Success = "Success",
  /** Warning */
  Warning = "Warning",
  /** Failure */
  Failure = "Failure",
}

/**
 * The status of the requirement. \
 * {@link KnownAssessmentStatus} can be used interchangeably with AssessmentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Success \
 * **Warning**: Warning \
 * **Failure**: Failure
 */
export type AssessmentStatus = string;

/** model interface AvailabilityGroupRetrievalFilters */
export interface AvailabilityGroupRetrievalFilters {
  /** Filter retrieval based on availability group type. */
  availabilityGroupTypeFilter?: ArcSqlServerAvailabilityGroupTypeFilter;
  replicationPartnerTypeFilter?: ReplicationPartnerType;
}

export function availabilityGroupRetrievalFiltersSerializer(
  item: AvailabilityGroupRetrievalFilters,
): any {
  return {
    availabilityGroupTypeFilter: item["availabilityGroupTypeFilter"],
    replicationPartnerTypeFilter: item["replicationPartnerTypeFilter"],
  };
}

/** Filter retrieval based on availability group type. */
export enum KnownArcSqlServerAvailabilityGroupTypeFilter {
  /** Contained Availability Group (CAG). */
  Contained = "CONTAINED",
  /** Distributed Availability Group (DAG) */
  Distributed = "DISTRIBUTED",
  /** Default standard availability group that is not contained or distributed. */
  Default = "DEFAULT",
}

/**
 * Filter retrieval based on availability group type. \
 * {@link KnownArcSqlServerAvailabilityGroupTypeFilter} can be used interchangeably with ArcSqlServerAvailabilityGroupTypeFilter,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CONTAINED**: Contained Availability Group (CAG). \
 * **DISTRIBUTED**: Distributed Availability Group (DAG) \
 * **DEFAULT**: Default standard availability group that is not contained or distributed.
 */
export type ArcSqlServerAvailabilityGroupTypeFilter = string;
/** Type of ReplicationPartnerType */
export type ReplicationPartnerType =
  "SQLServer" | "AzureSQLVM" | "AzureSQLManagedInstance" | "Unknown";

/** A list of Arc Sql Server Availability Groups. */
export interface _ArcSqlServerAvailabilityGroupListResult {
  /** Array of Arc Sql Server Availability Groups. */
  readonly value?: SqlServerAvailabilityGroupResource[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _arcSqlServerAvailabilityGroupListResultDeserializer(
  item: any,
): _ArcSqlServerAvailabilityGroupListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlServerAvailabilityGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlServerAvailabilityGroupResourceArraySerializer(
  result: Array<SqlServerAvailabilityGroupResource>,
): any[] {
  return result.map((item) => {
    return sqlServerAvailabilityGroupResourceSerializer(item);
  });
}

export function sqlServerAvailabilityGroupResourceArrayDeserializer(
  result: Array<SqlServerAvailabilityGroupResource>,
): any[] {
  return result.map((item) => {
    return sqlServerAvailabilityGroupResourceDeserializer(item);
  });
}

/** Arc Sql Server Availability Group */
export interface SqlServerAvailabilityGroupResource extends TrackedResource {
  /** Properties of Arc Sql Server availability group */
  properties: SqlServerAvailabilityGroupResourceProperties;
}

export function sqlServerAvailabilityGroupResourceSerializer(
  item: SqlServerAvailabilityGroupResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: sqlServerAvailabilityGroupResourcePropertiesSerializer(item["properties"]),
  };
}

export function sqlServerAvailabilityGroupResourceDeserializer(
  item: any,
): SqlServerAvailabilityGroupResource {
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
    properties: sqlServerAvailabilityGroupResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Arc Sql Server availability group resource */
export interface SqlServerAvailabilityGroupResourceProperties {
  /** ID GUID of the availability group. */
  readonly availabilityGroupId?: string;
  /** the SQL server name. */
  readonly serverName?: string;
  /** the SQL Server Instance name. */
  readonly instanceName?: string;
  /** The unique ID of the hybrid machine that this resource belongs to. */
  readonly vmId?: string;
  /** Timestamp for when the data was collected from the client machine. */
  readonly collectionTimestamp?: Date;
  /** Availability Group Info */
  info?: AvailabilityGroupInfo;
  /** A list of Availability Group Replicas. */
  replicas?: SqlServerAvailabilityGroupResourcePropertiesReplicas;
  /** A list of Availability Group Database Replicas. */
  databases?: SqlServerAvailabilityGroupResourcePropertiesDatabases;
  /** The provisioning state of the Arc-enabled SQL Server availability group resource. */
  readonly provisioningState?: string;
}

export function sqlServerAvailabilityGroupResourcePropertiesSerializer(
  item: SqlServerAvailabilityGroupResourceProperties,
): any {
  return {
    info: !item["info"] ? item["info"] : availabilityGroupInfoSerializer(item["info"]),
    replicas: !item["replicas"]
      ? item["replicas"]
      : sqlServerAvailabilityGroupResourcePropertiesReplicasSerializer(item["replicas"]),
    databases: !item["databases"]
      ? item["databases"]
      : sqlServerAvailabilityGroupResourcePropertiesDatabasesSerializer(item["databases"]),
  };
}

export function sqlServerAvailabilityGroupResourcePropertiesDeserializer(
  item: any,
): SqlServerAvailabilityGroupResourceProperties {
  return {
    availabilityGroupId: item["availabilityGroupId"],
    serverName: item["serverName"],
    instanceName: item["instanceName"],
    vmId: item["vmId"],
    collectionTimestamp: !item["collectionTimestamp"]
      ? item["collectionTimestamp"]
      : new Date(item["collectionTimestamp"]),
    info: !item["info"] ? item["info"] : availabilityGroupInfoDeserializer(item["info"]),
    replicas: !item["replicas"]
      ? item["replicas"]
      : sqlServerAvailabilityGroupResourcePropertiesReplicasDeserializer(item["replicas"]),
    databases: !item["databases"]
      ? item["databases"]
      : sqlServerAvailabilityGroupResourcePropertiesDatabasesDeserializer(item["databases"]),
    provisioningState: item["provisioningState"],
  };
}

/** The specifications of the availability group state */
export interface AvailabilityGroupInfo {
  /** User-defined failure condition level under which an automatic failover must be triggered. */
  failureConditionLevel?: number;
  /** Wait time (in milliseconds) for the sp_server_diagnostics system stored procedure to return server-health information, before the server instance is assumed to be slow or not responding. */
  healthCheckTimeout?: number;
  /** Preferred location for performing backups on the availability databases in this availability group. */
  readonly automatedBackupPreferenceDescription?: string;
  /** SQL Server availability group current version. */
  readonly version?: number;
  /** Specifies whether this is a basic availability group. */
  basicFeatures?: boolean;
  /** Specifies whether DTC support has been enabled for this availability group. */
  dtcSupport?: boolean;
  /** Specifies whether the availability group supports failover for database health conditions. */
  dbFailover?: boolean;
  /** Specifies whether this is a distributed availability group. */
  isDistributed?: boolean;
  /** SQL Server availability group cluster type description */
  readonly clusterTypeDescription?: string;
  /** The number of secondary replicas that must be in a synchronized state for a commit to complete. */
  requiredSynchronizedSecondariesToCommit?: number;
  /** SQL Server availability group contained system databases. */
  isContained?: boolean;
  /** Name of the server instance that is hosting the current primary replica. */
  readonly primaryReplica?: string;
  /** Indicates the recovery health of the primary replica. */
  readonly primaryRecoveryHealthDescription?: string;
  /** Indicates the recovery health of a secondary replica. */
  readonly secondaryRecoveryHealthDescription?: string;
  /** Reflects a roll-up of the synchronization health of all availability replicas in the availability group. */
  readonly synchronizationHealthDescription?: string;
  readonly replicationPartnerType?: ReplicationPartnerType;
  /** The listener for the sql server availability group */
  listener?: SqlAvailabilityGroupStaticIPListenerProperties;
}

export function availabilityGroupInfoSerializer(item: AvailabilityGroupInfo): any {
  return {
    failureConditionLevel: item["failureConditionLevel"],
    healthCheckTimeout: item["healthCheckTimeout"],
    basicFeatures: item["basicFeatures"],
    dtcSupport: item["dtcSupport"],
    dbFailover: item["dbFailover"],
    isDistributed: item["isDistributed"],
    requiredSynchronizedSecondariesToCommit: item["requiredSynchronizedSecondariesToCommit"],
    isContained: item["isContained"],
    listener: !item["listener"]
      ? item["listener"]
      : sqlAvailabilityGroupStaticIPListenerPropertiesSerializer(item["listener"]),
  };
}

export function availabilityGroupInfoDeserializer(item: any): AvailabilityGroupInfo {
  return {
    failureConditionLevel: item["failureConditionLevel"],
    healthCheckTimeout: item["healthCheckTimeout"],
    automatedBackupPreferenceDescription: item["automatedBackupPreferenceDescription"],
    version: item["version"],
    basicFeatures: item["basicFeatures"],
    dtcSupport: item["dtcSupport"],
    dbFailover: item["dbFailover"],
    isDistributed: item["isDistributed"],
    clusterTypeDescription: item["clusterTypeDescription"],
    requiredSynchronizedSecondariesToCommit: item["requiredSynchronizedSecondariesToCommit"],
    isContained: item["isContained"],
    primaryReplica: item["primaryReplica"],
    primaryRecoveryHealthDescription: item["primaryRecoveryHealthDescription"],
    secondaryRecoveryHealthDescription: item["secondaryRecoveryHealthDescription"],
    synchronizationHealthDescription: item["synchronizationHealthDescription"],
    replicationPartnerType: item["replicationPartnerType"],
    listener: !item["listener"]
      ? item["listener"]
      : sqlAvailabilityGroupStaticIPListenerPropertiesDeserializer(item["listener"]),
  };
}

/** The properties of a static IP Arc Sql availability group listener */
export interface SqlAvailabilityGroupStaticIPListenerProperties {
  /** the DNS name for the listener. */
  dnsName?: string;
  /** IP V4 Addresses and masks for the listener. */
  ipV4AddressesAndMasks?: SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem[];
  /** IP V6 Addresses for the listener */
  ipV6Addresses?: string[];
  /** Network port for the listener. Default is 1433. */
  port?: number;
}

export function sqlAvailabilityGroupStaticIPListenerPropertiesSerializer(
  item: SqlAvailabilityGroupStaticIPListenerProperties,
): any {
  return {
    dnsName: item["dnsName"],
    ipV4AddressesAndMasks: !item["ipV4AddressesAndMasks"]
      ? item["ipV4AddressesAndMasks"]
      : sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemArraySerializer(
          item["ipV4AddressesAndMasks"],
        ),
    ipV6Addresses: !item["ipV6Addresses"]
      ? item["ipV6Addresses"]
      : item["ipV6Addresses"].map((p: any) => {
          return p;
        }),
    port: item["port"],
  };
}

export function sqlAvailabilityGroupStaticIPListenerPropertiesDeserializer(
  item: any,
): SqlAvailabilityGroupStaticIPListenerProperties {
  return {
    dnsName: item["dnsName"],
    ipV4AddressesAndMasks: !item["ipV4AddressesAndMasks"]
      ? item["ipV4AddressesAndMasks"]
      : sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemArrayDeserializer(
          item["ipV4AddressesAndMasks"],
        ),
    ipV6Addresses: !item["ipV6Addresses"]
      ? item["ipV6Addresses"]
      : item["ipV6Addresses"].map((p: any) => {
          return p;
        }),
    port: item["port"],
  };
}

export function sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemArraySerializer(
  result: Array<SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem>,
): any[] {
  return result.map((item) => {
    return sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemSerializer(item);
  });
}

export function sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemArrayDeserializer(
  result: Array<SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem>,
): any[] {
  return result.map((item) => {
    return sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemDeserializer(item);
  });
}

/** model interface SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem */
export interface SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem {
  /** IPV4 address */
  ipAddress?: string;
  /** IPV4 netmask */
  mask?: string;
}

export function sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemSerializer(
  item: SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem,
): any {
  return { ipAddress: item["ipAddress"], mask: item["mask"] };
}

export function sqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItemDeserializer(
  item: any,
): SqlAvailabilityGroupIpV4AddressesAndMasksPropertiesItem {
  return {
    ipAddress: item["ipAddress"],
    mask: item["mask"],
  };
}

/** A list of Availability Group Replicas. */
export interface SqlServerAvailabilityGroupResourcePropertiesReplicas {
  /** Array of Availability Group Replicas. */
  value?: SqlAvailabilityGroupReplicaResourceProperties[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function sqlServerAvailabilityGroupResourcePropertiesReplicasSerializer(
  item: SqlServerAvailabilityGroupResourcePropertiesReplicas,
): any {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlAvailabilityGroupReplicaResourcePropertiesArraySerializer(item["value"]),
  };
}

export function sqlServerAvailabilityGroupResourcePropertiesReplicasDeserializer(
  item: any,
): SqlServerAvailabilityGroupResourcePropertiesReplicas {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlAvailabilityGroupReplicaResourcePropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlAvailabilityGroupReplicaResourcePropertiesArraySerializer(
  result: Array<SqlAvailabilityGroupReplicaResourceProperties>,
): any[] {
  return result.map((item) => {
    return sqlAvailabilityGroupReplicaResourcePropertiesSerializer(item);
  });
}

export function sqlAvailabilityGroupReplicaResourcePropertiesArrayDeserializer(
  result: Array<SqlAvailabilityGroupReplicaResourceProperties>,
): any[] {
  return result.map((item) => {
    return sqlAvailabilityGroupReplicaResourcePropertiesDeserializer(item);
  });
}

/** The properties of Arc Sql availability group replica resource */
export interface SqlAvailabilityGroupReplicaResourceProperties {
  /** ID GUID of the availability group. */
  readonly replicaId?: string;
  /** The replica name. */
  replicaName?: string;
  /** Resource id of this replica. This is required for a distributed availability group, in which case it describes the location of the availability group that hosts one replica in the DAG. In a non-distributed availability group this field is optional but can be used to store the Azure resource id for AG. */
  replicaResourceId?: string;
  /** null */
  configure?: AvailabilityGroupConfigure;
  /** null */
  state?: AvailabilityGroupState;
}

export function sqlAvailabilityGroupReplicaResourcePropertiesSerializer(
  item: SqlAvailabilityGroupReplicaResourceProperties,
): any {
  return {
    replicaName: item["replicaName"],
    replicaResourceId: item["replicaResourceId"],
    configure: !item["configure"]
      ? item["configure"]
      : availabilityGroupConfigureSerializer(item["configure"]),
    state: !item["state"] ? item["state"] : availabilityGroupStateSerializer(item["state"]),
  };
}

export function sqlAvailabilityGroupReplicaResourcePropertiesDeserializer(
  item: any,
): SqlAvailabilityGroupReplicaResourceProperties {
  return {
    replicaId: item["replicaId"],
    replicaName: item["replicaName"],
    replicaResourceId: item["replicaResourceId"],
    configure: !item["configure"]
      ? item["configure"]
      : availabilityGroupConfigureDeserializer(item["configure"]),
    state: !item["state"] ? item["state"] : availabilityGroupStateDeserializer(item["state"]),
  };
}

/** The specifications of the availability group replica configuration */
export interface AvailabilityGroupConfigure {
  /** Name of the mirroring endpoint URL */
  endpointName?: string;
  /** Mirroring endpoint URL of availability group replica */
  endpointUrl?: string;
  /** Permitted authentication modes for the mirroring endpoint. */
  endpointAuthenticationMode?: ConnectionAuth;
  /** Name of certificate to use for authentication. Required if any CERTIFICATE authentication modes are specified. */
  certificateName?: string;
  /** The login which will connect to the mirroring endpoint. */
  endpointConnectLogin?: string;
  /** Property that determines whether a given availability replica can run in synchronous-commit mode */
  availabilityMode?: ArcSqlServerAvailabilityMode;
  /** The Availability Synchronization mode of the availability group replica. */
  readonly availabilityModeDescription?: string;
  /** Property to set the failover mode of the availability group replica */
  failoverMode?: ArcSqlServerFailoverMode;
  /** The failover mode of the availability group replica. */
  readonly failoverModeDescription?: string;
  /** The time-out period of availability group session replica, in seconds. */
  sessionTimeout?: number;
  /** Whether the primary replica should allow all connections or only READ_WRITE connections (disallowing ReadOnly connections) */
  primaryAllowConnections?: PrimaryAllowConnections;
  /** Whether the availability allows all connections or only read-write connections. */
  readonly primaryRoleAllowConnectionsDescription?: string;
  /** Whether the secondary replica should allow all connections, no connections, or only ReadOnly connections. */
  secondaryAllowConnections?: SecondaryAllowConnections;
  /** Whether an availability replica that is performing the secondary role (that is, a secondary replica) can accept connections from clients. */
  readonly secondaryRoleAllowConnectionsDescription?: string;
  /** Date that the replica was created. */
  readonly replicaCreateDate?: Date;
  /** Date that the replica was modified. */
  readonly replicaModifyDate?: Date;
  /** Represents the user-specified priority for performing backups on this replica relative to the other replicas in the same availability group. */
  backupPriority?: number;
  /** Connectivity endpoint (URL) of the read only availability replica. */
  readOnlyRoutingUrl?: string;
  /** Connectivity endpoint (URL) of the read write availability replica. */
  readWriteRoutingUrl?: string;
  /** Specifies how the secondary replica will be initially seeded. AUTOMATIC enables direct seeding. This method will seed the secondary replica over the network. This method does not require you to backup and restore a copy of the primary database on the replica. MANUAL specifies manual seeding (default). This method requires you to create a backup of the database on the primary replica and manually restore that backup on the secondary replica. */
  seedingMode?: SeedingMode;
  /** Describes seeding mode. */
  readonly seedingModeDescription?: string;
}

export function availabilityGroupConfigureSerializer(item: AvailabilityGroupConfigure): any {
  return {
    endpointName: item["endpointName"],
    endpointUrl: item["endpointUrl"],
    endpointAuthenticationMode: item["endpointAuthenticationMode"],
    certificateName: item["certificateName"],
    endpointConnectLogin: item["endpointConnectLogin"],
    availabilityMode: item["availabilityMode"],
    failoverMode: item["failoverMode"],
    sessionTimeout: item["sessionTimeout"],
    primaryAllowConnections: item["primaryAllowConnections"],
    secondaryAllowConnections: item["secondaryAllowConnections"],
    backupPriority: item["backupPriority"],
    readOnlyRoutingUrl: item["readOnlyRoutingUrl"],
    readWriteRoutingUrl: item["readWriteRoutingUrl"],
    seedingMode: item["seedingMode"],
  };
}

export function availabilityGroupConfigureDeserializer(item: any): AvailabilityGroupConfigure {
  return {
    endpointName: item["endpointName"],
    endpointUrl: item["endpointUrl"],
    endpointAuthenticationMode: item["endpointAuthenticationMode"],
    certificateName: item["certificateName"],
    endpointConnectLogin: item["endpointConnectLogin"],
    availabilityMode: item["availabilityMode"],
    availabilityModeDescription: item["availabilityModeDescription"],
    failoverMode: item["failoverMode"],
    failoverModeDescription: item["failoverModeDescription"],
    sessionTimeout: item["sessionTimeout"],
    primaryAllowConnections: item["primaryAllowConnections"],
    primaryRoleAllowConnectionsDescription: item["primaryRoleAllowConnectionsDescription"],
    secondaryAllowConnections: item["secondaryAllowConnections"],
    secondaryRoleAllowConnectionsDescription: item["secondaryRoleAllowConnectionsDescription"],
    replicaCreateDate: !item["replicaCreateDate"]
      ? item["replicaCreateDate"]
      : new Date(item["replicaCreateDate"]),
    replicaModifyDate: !item["replicaModifyDate"]
      ? item["replicaModifyDate"]
      : new Date(item["replicaModifyDate"]),
    backupPriority: item["backupPriority"],
    readOnlyRoutingUrl: item["readOnlyRoutingUrl"],
    readWriteRoutingUrl: item["readWriteRoutingUrl"],
    seedingMode: item["seedingMode"],
    seedingModeDescription: item["seedingModeDescription"],
  };
}

/** Property that determines whether a given availability replica can run in synchronous-commit mode */
export enum KnownArcSqlServerAvailabilityMode {
  /** SYNCHRONOUS_COMMIT */
  SynchronousCommit = "SYNCHRONOUS_COMMIT",
  /** ASYNCHRONOUS_COMMIT */
  AsynchronousCommit = "ASYNCHRONOUS_COMMIT",
}

/**
 * Property that determines whether a given availability replica can run in synchronous-commit mode \
 * {@link KnownArcSqlServerAvailabilityMode} can be used interchangeably with ArcSqlServerAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SYNCHRONOUS_COMMIT**: SYNCHRONOUS_COMMIT \
 * **ASYNCHRONOUS_COMMIT**: ASYNCHRONOUS_COMMIT
 */
export type ArcSqlServerAvailabilityMode = string;

/** Property to set the failover mode of the availability group replica */
export enum KnownArcSqlServerFailoverMode {
  /** AUTOMATIC */
  Automatic = "AUTOMATIC",
  /** MANUAL */
  Manual = "MANUAL",
  /** EXTERNAL */
  External = "EXTERNAL",
  /** NONE */
  None = "NONE",
}

/**
 * Property to set the failover mode of the availability group replica \
 * {@link KnownArcSqlServerFailoverMode} can be used interchangeably with ArcSqlServerFailoverMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AUTOMATIC**: AUTOMATIC \
 * **MANUAL**: MANUAL \
 * **EXTERNAL**: EXTERNAL \
 * **NONE**: NONE
 */
export type ArcSqlServerFailoverMode = string;
/** Whether the primary replica should allow all connections or only READ_WRITE connections (disallowing ReadOnly connections) */
export type PrimaryAllowConnections = "ALL" | "READ_WRITE";
/** Whether the secondary replica should allow all connections, no connections, or only ReadOnly connections. */
export type SecondaryAllowConnections = "NO" | "ALL" | "READ_ONLY";
/** Specifies how the secondary replica will be initially seeded. AUTOMATIC enables direct seeding. This method will seed the secondary replica over the network. This method does not require you to backup and restore a copy of the primary database on the replica. MANUAL specifies manual seeding (default). This method requires you to create a backup of the database on the primary replica and manually restore that backup on the secondary replica. */
export type SeedingMode = "AUTOMATIC" | "MANUAL";

/** The specifications of the availability group state */
export interface AvailabilityGroupState {
  /** Current Always On availability groups role of the availability group replica. */
  readonly availabilityGroupReplicaRole?: string;
  /** Current operational state of the availability group replica */
  readonly operationalStateDescription?: string;
  /** Recovery health of the availability group replica. */
  readonly recoveryHealthDescription?: string;
  /** Reflects a rollup of the database synchronization state (synchronization_state) of all joined availability databases (also known as replicas) and the availability mode of the replica (synchronous-commit or asynchronous-commit mode). The rollup will reflect the least healthy accumulated state the databases on the replica. */
  readonly synchronizationHealthDescription?: string;
  /** Whether a secondary replica is currently connected to the primary replica. */
  readonly connectedStateDescription?: string;
  /** Text description of the last connection error of the availability group replica. */
  readonly lastConnectErrorDescription?: string;
  /** Date and time timestamp indicating when the last connect error occurred. */
  readonly lastConnectErrorTimestamp?: Date;
}

export function availabilityGroupStateSerializer(_item: AvailabilityGroupState): any {
  return {};
}

export function availabilityGroupStateDeserializer(item: any): AvailabilityGroupState {
  return {
    availabilityGroupReplicaRole: item["availabilityGroupReplicaRole"],
    operationalStateDescription: item["operationalStateDescription"],
    recoveryHealthDescription: item["recoveryHealthDescription"],
    synchronizationHealthDescription: item["synchronizationHealthDescription"],
    connectedStateDescription: item["connectedStateDescription"],
    lastConnectErrorDescription: item["lastConnectErrorDescription"],
    lastConnectErrorTimestamp: !item["lastConnectErrorTimestamp"]
      ? item["lastConnectErrorTimestamp"]
      : new Date(item["lastConnectErrorTimestamp"]),
  };
}

/** A list of Availability Group Database Replicas. */
export interface SqlServerAvailabilityGroupResourcePropertiesDatabases {
  /** Array of Availability Group Database Replicas. */
  value?: SqlAvailabilityGroupDatabaseReplicaResourceProperties[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function sqlServerAvailabilityGroupResourcePropertiesDatabasesSerializer(
  item: SqlServerAvailabilityGroupResourcePropertiesDatabases,
): any {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlAvailabilityGroupDatabaseReplicaResourcePropertiesArraySerializer(item["value"]),
  };
}

export function sqlServerAvailabilityGroupResourcePropertiesDatabasesDeserializer(
  item: any,
): SqlServerAvailabilityGroupResourcePropertiesDatabases {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlAvailabilityGroupDatabaseReplicaResourcePropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlAvailabilityGroupDatabaseReplicaResourcePropertiesArraySerializer(
  result: Array<SqlAvailabilityGroupDatabaseReplicaResourceProperties>,
): any[] {
  return result.map((item) => {
    return sqlAvailabilityGroupDatabaseReplicaResourcePropertiesSerializer(item);
  });
}

export function sqlAvailabilityGroupDatabaseReplicaResourcePropertiesArrayDeserializer(
  result: Array<SqlAvailabilityGroupDatabaseReplicaResourceProperties>,
): any[] {
  return result.map((item) => {
    return sqlAvailabilityGroupDatabaseReplicaResourcePropertiesDeserializer(item);
  });
}

/** The properties of Arc Sql availability group database replica resource */
export interface SqlAvailabilityGroupDatabaseReplicaResourceProperties {
  /** the database name. */
  databaseName?: string;
  /** the database replica name. */
  readonly replicaName?: string;
  /** Whether the availability database is local. */
  readonly isLocal?: boolean;
  /** Returns 1 if the replica is primary, or 0 if it is a secondary replica. */
  readonly isPrimaryReplica?: boolean;
  /** Description of the data-movement state. */
  readonly synchronizationStateDescription?: string;
  /** Whether this replica is transaction committer. */
  readonly isCommitParticipant?: boolean;
  /** Description of the health of database. */
  readonly synchronizationHealthDescription?: string;
  /** Description of the database state of the availability replica. */
  readonly databaseStateDescription?: string;
  /** Whether this data movement is suspended. */
  readonly isSuspended?: boolean;
  /** Description of the database suspended state reason. */
  readonly suspendReasonDescription?: string;
}

export function sqlAvailabilityGroupDatabaseReplicaResourcePropertiesSerializer(
  item: SqlAvailabilityGroupDatabaseReplicaResourceProperties,
): any {
  return { databaseName: item["databaseName"] };
}

export function sqlAvailabilityGroupDatabaseReplicaResourcePropertiesDeserializer(
  item: any,
): SqlAvailabilityGroupDatabaseReplicaResourceProperties {
  return {
    databaseName: item["databaseName"],
    replicaName: item["replicaName"],
    isLocal: item["isLocal"],
    isPrimaryReplica: item["isPrimaryReplica"],
    synchronizationStateDescription: item["synchronizationStateDescription"],
    isCommitParticipant: item["isCommitParticipant"],
    synchronizationHealthDescription: item["synchronizationHealthDescription"],
    databaseStateDescription: item["databaseStateDescription"],
    isSuspended: item["isSuspended"],
    suspendReasonDescription: item["suspendReasonDescription"],
  };
}

/** Describe SQL Server license resource. */
export interface SqlServerLicense extends TrackedResource {
  /** SQL Server license properties */
  properties: SqlServerLicenseProperties;
}

export function sqlServerLicenseSerializer(item: SqlServerLicense): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: sqlServerLicensePropertiesSerializer(item["properties"]),
  };
}

export function sqlServerLicenseDeserializer(item: any): SqlServerLicense {
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
    properties: sqlServerLicensePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of SQL Server License. */
export interface SqlServerLicenseProperties {
  /** SQL Server license type. */
  billingPlan: BillingPlan;
  /** The number of total cores of the license covers. */
  physicalCores: number;
  /** This property represents the choice between SQL Server Core and ESU licenses. */
  licenseCategory: LicenseCategory;
  /** The activation state of the license. */
  activationState: ActivationState;
  /** The Azure scope to which the license will apply. */
  scopeType: ScopeType;
  /** The timestamp of the most recent activation of the SqlServerLicense. */
  readonly lastActivatedAt?: Date;
  /** The timestamp of the most recent deactivation of the SqlServerLicense. */
  readonly lastDeactivatedAt?: Date;
  /** The tenantId the SQL Server license resource subscription resides in. */
  readonly tenantId?: string;
}

export function sqlServerLicensePropertiesSerializer(item: SqlServerLicenseProperties): any {
  return {
    billingPlan: item["billingPlan"],
    physicalCores: item["physicalCores"],
    licenseCategory: item["licenseCategory"],
    activationState: item["activationState"],
    scopeType: item["scopeType"],
  };
}

export function sqlServerLicensePropertiesDeserializer(item: any): SqlServerLicenseProperties {
  return {
    billingPlan: item["billingPlan"],
    physicalCores: item["physicalCores"],
    licenseCategory: item["licenseCategory"],
    activationState: item["activationState"],
    scopeType: item["scopeType"],
    lastActivatedAt: !item["lastActivatedAt"]
      ? item["lastActivatedAt"]
      : new Date(item["lastActivatedAt"]),
    lastDeactivatedAt: !item["lastDeactivatedAt"]
      ? item["lastDeactivatedAt"]
      : new Date(item["lastDeactivatedAt"]),
    tenantId: item["tenantId"],
  };
}

/** SQL Server ESU license type. */
export enum KnownBillingPlan {
  /** PAYG */
  Payg = "PAYG",
  /** Paid */
  Paid = "Paid",
}

/**
 * SQL Server ESU license type. \
 * {@link KnownBillingPlan} can be used interchangeably with BillingPlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAYG**: PAYG \
 * **Paid**: Paid
 */
export type BillingPlan = string;

/** This property represents the choice between SQL Server Core and ESU licenses. */
export enum KnownLicenseCategory {
  /** Core */
  Core = "Core",
}

/**
 * This property represents the choice between SQL Server Core and ESU licenses. \
 * {@link KnownLicenseCategory} can be used interchangeably with LicenseCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Core**: Core
 */
export type LicenseCategory = string;

/** The activation state of the license. */
export enum KnownActivationState {
  /** Activated */
  Activated = "Activated",
  /** Deactivated */
  Deactivated = "Deactivated",
}

/**
 * The activation state of the license. \
 * {@link KnownActivationState} can be used interchangeably with ActivationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Activated**: Activated \
 * **Deactivated**: Deactivated
 */
export type ActivationState = string;

/** The Azure scope to which the license will apply. */
export enum KnownScopeType {
  /** Tenant */
  Tenant = "Tenant",
  /** Subscription */
  Subscription = "Subscription",
  /** ResourceGroup */
  ResourceGroup = "ResourceGroup",
}

/**
 * The Azure scope to which the license will apply. \
 * {@link KnownScopeType} can be used interchangeably with ScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tenant**: Tenant \
 * **Subscription**: Subscription \
 * **ResourceGroup**: ResourceGroup
 */
export type ScopeType = string;

/** An update to a SQL Server license resource. */
export interface SqlServerLicenseUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** null */
  properties?: SqlServerLicenseUpdateProperties;
}

export function sqlServerLicenseUpdateSerializer(item: SqlServerLicenseUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlServerLicenseUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties of update SqlServerLicense. */
export interface SqlServerLicenseUpdateProperties {
  /** SQL Server license type. */
  billingPlan?: BillingPlan;
  /** The number of total cores of the license covers. */
  physicalCores?: number;
  /** This property represents the choice between SQL Server Core and ESU licenses. */
  licenseCategory?: LicenseCategory;
  /** The activation state of the license. */
  activationState?: ActivationState;
  /** The Azure scope to which the license will apply. */
  scopeType?: ScopeType;
  /** The timestamp of the most recent activation of the SqlServerLicense. */
  readonly lastActivatedAt?: Date;
  /** The timestamp of the most recent deactivation of the SqlServerLicense. */
  readonly lastDeactivatedAt?: Date;
  /** The tenantId the SQL Server license resource subscription resides in. */
  readonly tenantId?: string;
}

export function sqlServerLicenseUpdatePropertiesSerializer(
  item: SqlServerLicenseUpdateProperties,
): any {
  return {
    billingPlan: item["billingPlan"],
    physicalCores: item["physicalCores"],
    licenseCategory: item["licenseCategory"],
    activationState: item["activationState"],
    scopeType: item["scopeType"],
  };
}

/** A list of SQL Server licenses. */
export interface _SqlServerLicenseListResult {
  /** Array of results. */
  readonly value?: SqlServerLicense[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _sqlServerLicenseListResultDeserializer(item: any): _SqlServerLicenseListResult {
  return {
    value: !item["value"] ? item["value"] : sqlServerLicenseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlServerLicenseArraySerializer(result: Array<SqlServerLicense>): any[] {
  return result.map((item) => {
    return sqlServerLicenseSerializer(item);
  });
}

export function sqlServerLicenseArrayDeserializer(result: Array<SqlServerLicense>): any[] {
  return result.map((item) => {
    return sqlServerLicenseDeserializer(item);
  });
}

/** A Postgres Instance. */
export interface PostgresInstance extends TrackedResource {
  /** null */
  properties: PostgresInstanceProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
  /** Resource sku. */
  sku?: PostgresInstanceSku;
}

export function postgresInstanceSerializer(item: PostgresInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: postgresInstancePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : postgresInstanceSkuSerializer(item["sku"]),
  };
}

export function postgresInstanceDeserializer(item: any): PostgresInstance {
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
    properties: postgresInstancePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    sku: !item["sku"] ? item["sku"] : postgresInstanceSkuDeserializer(item["sku"]),
  };
}

/** Postgres Instance properties. */
export interface PostgresInstanceProperties {
  /** The data controller id */
  dataControllerId?: string;
  /** The instance admin */
  admin?: string;
  /** Username and password for basic authentication. */
  basicLoginInformation?: BasicLoginInformation;
  /** The raw kubernetes information */
  k8SRaw?: any;
  /** Last uploaded date from Kubernetes cluster. Defaults to current date time */
  lastUploadedDate?: Date;
  /** The provisioning state of the Azure Arc-enabled PostgreSQL instance. */
  readonly provisioningState?: string;
}

export function postgresInstancePropertiesSerializer(item: PostgresInstanceProperties): any {
  return {
    dataControllerId: item["dataControllerId"],
    admin: item["admin"],
    basicLoginInformation: !item["basicLoginInformation"]
      ? item["basicLoginInformation"]
      : basicLoginInformationSerializer(item["basicLoginInformation"]),
    k8sRaw: item["k8SRaw"],
    lastUploadedDate: !item["lastUploadedDate"]
      ? item["lastUploadedDate"]
      : item["lastUploadedDate"].toISOString(),
  };
}

export function postgresInstancePropertiesDeserializer(item: any): PostgresInstanceProperties {
  return {
    dataControllerId: item["dataControllerId"],
    admin: item["admin"],
    basicLoginInformation: !item["basicLoginInformation"]
      ? item["basicLoginInformation"]
      : basicLoginInformationDeserializer(item["basicLoginInformation"]),
    k8SRaw: item["k8sRaw"],
    lastUploadedDate: !item["lastUploadedDate"]
      ? item["lastUploadedDate"]
      : new Date(item["lastUploadedDate"]),
    provisioningState: item["provisioningState"],
  };
}

/** The resource model definition representing SKU for Azure Database for PostgresSQL - Azure Arc */
export interface PostgresInstanceSku extends CommonSku {
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier. */
  tier?: "Hyperscale";
}

export function postgresInstanceSkuSerializer(item: PostgresInstanceSku): any {
  return {
    name: item["name"],
    dev: item["dev"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
    tier: item["tier"],
  };
}

export function postgresInstanceSkuDeserializer(item: any): PostgresInstanceSku {
  return {
    name: item["name"],
    dev: item["dev"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
    tier: item["tier"],
  };
}

/** The resource model definition representing SKU for ARM resources */
export interface CommonSku {
  /** The name of the SKU.  It is typically a letter+number code */
  name: string;
  /** Whether dev/test is enabled. When the dev field is set to true, the resource is used for dev/test purpose. */
  dev?: boolean;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function commonSkuSerializer(item: CommonSku): any {
  return {
    name: item["name"],
    dev: item["dev"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function commonSkuDeserializer(item: any): CommonSku {
  return {
    name: item["name"],
    dev: item["dev"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** An update to a Postgres Instance. */
export interface PostgresInstanceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Postgres Instance properties. */
  properties?: PostgresInstanceProperties;
}

export function postgresInstanceUpdateSerializer(item: PostgresInstanceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : postgresInstancePropertiesSerializer(item["properties"]),
  };
}

/** A list of PostgresInstance. */
export interface _PostgresInstanceListResult {
  /** Array of results. */
  readonly value?: PostgresInstance[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _postgresInstanceListResultDeserializer(item: any): _PostgresInstanceListResult {
  return {
    value: !item["value"] ? item["value"] : postgresInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function postgresInstanceArraySerializer(result: Array<PostgresInstance>): any[] {
  return result.map((item) => {
    return postgresInstanceSerializer(item);
  });
}

export function postgresInstanceArrayDeserializer(result: Array<PostgresInstance>): any[] {
  return result.map((item) => {
    return postgresInstanceDeserializer(item);
  });
}

/** Describe SQL Server ESU license resource. */
export interface SqlServerEsuLicense extends TrackedResource {
  /** SQL Server ESU license properties */
  properties: SqlServerEsuLicenseProperties;
}

export function sqlServerEsuLicenseSerializer(item: SqlServerEsuLicense): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: sqlServerEsuLicensePropertiesSerializer(item["properties"]),
  };
}

export function sqlServerEsuLicenseDeserializer(item: any): SqlServerEsuLicense {
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
    properties: sqlServerEsuLicensePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of SQL Server ESU license. */
export interface SqlServerEsuLicenseProperties {
  /** SQL Server ESU license type. */
  billingPlan: BillingPlan;
  /** The SQL Server version the license covers. */
  version: Version;
  /** The unique ID of this license. This is a GUID-formatted string (e.g. 00000000-0000-0000-0000-000000000000). */
  readonly uniqueId?: string;
  /** The number of total cores of the license covers. */
  physicalCores: number;
  /** The activation state of the license. */
  activationState: State;
  /** The Azure scope to which the license will apply. */
  scopeType: ScopeType;
  /** The timestamp of the activation of the SqlServerEsuLicense in ISO 8601 date-time format. */
  readonly activatedAt?: Date;
  /** The timestamp of the termination of the SqlServerEsuLicense in ISO 8601 date-time format. */
  readonly terminatedAt?: Date;
  /** The tenantId the SQL Server ESU license resource subscription resides in. */
  readonly tenantId?: string;
}

export function sqlServerEsuLicensePropertiesSerializer(item: SqlServerEsuLicenseProperties): any {
  return {
    billingPlan: item["billingPlan"],
    version: item["version"],
    physicalCores: item["physicalCores"],
    activationState: item["activationState"],
    scopeType: item["scopeType"],
  };
}

export function sqlServerEsuLicensePropertiesDeserializer(
  item: any,
): SqlServerEsuLicenseProperties {
  return {
    billingPlan: item["billingPlan"],
    version: item["version"],
    uniqueId: item["uniqueId"],
    physicalCores: item["physicalCores"],
    activationState: item["activationState"],
    scopeType: item["scopeType"],
    activatedAt: !item["activatedAt"] ? item["activatedAt"] : new Date(item["activatedAt"]),
    terminatedAt: !item["terminatedAt"] ? item["terminatedAt"] : new Date(item["terminatedAt"]),
    tenantId: item["tenantId"],
  };
}

/** The SQL Server version the license covers. */
export enum KnownVersion {
  /** SQL Server 2012 */
  SQLServer2012 = "SQL Server 2012",
  /** SQL Server 2014 */
  SQLServer2014 = "SQL Server 2014",
  /** SQL Server 2016 */
  SQLServer2016 = "SQL Server 2016",
}

/**
 * The SQL Server version the license covers. \
 * {@link KnownVersion} can be used interchangeably with Version,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SQL Server 2012**: SQL Server 2012 \
 * **SQL Server 2014**: SQL Server 2014 \
 * **SQL Server 2016**: SQL Server 2016
 */
export type Version = string;

/** An update to a SQL Server ESU license resource. */
export interface SqlServerEsuLicenseUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** null */
  properties?: SqlServerEsuLicenseUpdateProperties;
}

export function sqlServerEsuLicenseUpdateSerializer(item: SqlServerEsuLicenseUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlServerEsuLicenseUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties of update SqlServerEsuLicense. */
export interface SqlServerEsuLicenseUpdateProperties {
  /** SQL Server ESU license type. */
  billingPlan?: BillingPlan;
  /** The SQL Server version the license covers. */
  version?: Version;
  /** The unique ID of this license. This is a GUID-formatted string (e.g. 00000000-0000-0000-0000-000000000000). */
  readonly uniqueId?: string;
  /** The number of total cores of the license covers. */
  physicalCores?: number;
  /** The activation state of the license. */
  activationState?: State;
  /** The Azure scope to which the license will apply. */
  scopeType?: ScopeType;
  /** The timestamp of the activation of the SqlServerEsuLicense in ISO 8601 date-time format. */
  readonly activatedAt?: Date;
  /** The timestamp of the termination of the SqlServerEsuLicense in ISO 8601 date-time format. */
  readonly terminatedAt?: Date;
  /** The tenantId the SQL Server ESU license resource subscription resides in. */
  readonly tenantId?: string;
}

export function sqlServerEsuLicenseUpdatePropertiesSerializer(
  item: SqlServerEsuLicenseUpdateProperties,
): any {
  return {
    billingPlan: item["billingPlan"],
    version: item["version"],
    physicalCores: item["physicalCores"],
    activationState: item["activationState"],
    scopeType: item["scopeType"],
  };
}

/** A list of SQL Server ESU licenses. */
export interface _SqlServerEsuLicenseListResult {
  /** Array of results. */
  readonly value?: SqlServerEsuLicense[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _sqlServerEsuLicenseListResultDeserializer(
  item: any,
): _SqlServerEsuLicenseListResult {
  return {
    value: !item["value"] ? item["value"] : sqlServerEsuLicenseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlServerEsuLicenseArraySerializer(result: Array<SqlServerEsuLicense>): any[] {
  return result.map((item) => {
    return sqlServerEsuLicenseSerializer(item);
  });
}

export function sqlServerEsuLicenseArrayDeserializer(result: Array<SqlServerEsuLicense>): any[] {
  return result.map((item) => {
    return sqlServerEsuLicenseDeserializer(item);
  });
}

/** A failover group resource. */
export interface FailoverGroupResource extends ProxyResource {
  /** null */
  properties: FailoverGroupProperties;
}

export function failoverGroupResourceSerializer(item: FailoverGroupResource): any {
  return { properties: failoverGroupPropertiesSerializer(item["properties"]) };
}

export function failoverGroupResourceDeserializer(item: any): FailoverGroupResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: failoverGroupPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a failover group resource. */
export interface FailoverGroupProperties {
  /** The provisioning state of the failover group resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of the partner SQL managed instance. */
  partnerManagedInstanceId: string;
  /** The specifications of the failover group resource. */
  spec: FailoverGroupSpec;
  /** The status of the failover group custom resource. */
  status?: any;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function failoverGroupPropertiesSerializer(item: FailoverGroupProperties): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    partnerManagedInstanceId: item["partnerManagedInstanceId"],
    spec: failoverGroupSpecSerializer(item["spec"]),
    status: item["status"],
  };
}

export function failoverGroupPropertiesDeserializer(item: any): FailoverGroupProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "provisioningState",
      "partnerManagedInstanceId",
      "spec",
      "status",
    ]),
    provisioningState: item["provisioningState"],
    partnerManagedInstanceId: item["partnerManagedInstanceId"],
    spec: failoverGroupSpecDeserializer(item["spec"]),
    status: item["status"],
  };
}

/** The provisioning state of the failover group resource. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Accepted */
  Accepted = "Accepted",
}

/**
 * The provisioning state of the failover group resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Accepted**: Accepted
 */
export type ProvisioningState = string;

/** The specifications of the failover group resource. */
export interface FailoverGroupSpec {
  /** The shared name of the failover group for this SQL managed instance. Both SQL managed instance and its partner have to use the same shared name. */
  sharedName?: string;
  /** The name of the SQL managed instance with this failover group role. */
  sourceMI?: string;
  /** The name of the partner SQL managed instance. */
  partnerMI?: string;
  /** The mirroring endpoint URL of the partner SQL managed instance. */
  partnerMirroringURL?: string;
  /** The mirroring endpoint public certificate for the partner SQL managed instance. Only PEM format is supported. */
  partnerMirroringCert?: string;
  /** The partner sync mode of the SQL managed instance. */
  partnerSyncMode?: FailoverGroupPartnerSyncMode;
  /** The role of the SQL managed instance in this failover group. */
  role: InstanceFailoverGroupRole;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function failoverGroupSpecSerializer(item: FailoverGroupSpec): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    sharedName: item["sharedName"],
    sourceMI: item["sourceMI"],
    partnerMI: item["partnerMI"],
    partnerMirroringURL: item["partnerMirroringURL"],
    partnerMirroringCert: item["partnerMirroringCert"],
    partnerSyncMode: item["partnerSyncMode"],
    role: item["role"],
  };
}

export function failoverGroupSpecDeserializer(item: any): FailoverGroupSpec {
  return {
    additionalProperties: serializeRecord(item, [
      "sharedName",
      "sourceMI",
      "partnerMI",
      "partnerMirroringURL",
      "partnerMirroringCert",
      "partnerSyncMode",
      "role",
    ]),
    sharedName: item["sharedName"],
    sourceMI: item["sourceMI"],
    partnerMI: item["partnerMI"],
    partnerMirroringURL: item["partnerMirroringURL"],
    partnerMirroringCert: item["partnerMirroringCert"],
    partnerSyncMode: item["partnerSyncMode"],
    role: item["role"],
  };
}

/** The partner sync mode of the SQL managed instance. */
export enum KnownFailoverGroupPartnerSyncMode {
  /** async */
  Async = "async",
  /** sync */
  Sync = "sync",
}

/**
 * The partner sync mode of the SQL managed instance. \
 * {@link KnownFailoverGroupPartnerSyncMode} can be used interchangeably with FailoverGroupPartnerSyncMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **async**: async \
 * **sync**: sync
 */
export type FailoverGroupPartnerSyncMode = string;

/** The role of the SQL managed instance in this failover group. */
export enum KnownInstanceFailoverGroupRole {
  /** primary */
  Primary = "primary",
  /** secondary */
  Secondary = "secondary",
  /** force-primary-allow-data-loss */
  ForcePrimaryAllowDataLoss = "force-primary-allow-data-loss",
  /** force-secondary */
  ForceSecondary = "force-secondary",
}

/**
 * The role of the SQL managed instance in this failover group. \
 * {@link KnownInstanceFailoverGroupRole} can be used interchangeably with InstanceFailoverGroupRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **primary**: primary \
 * **secondary**: secondary \
 * **force-primary-allow-data-loss**: force-primary-allow-data-loss \
 * **force-secondary**: force-secondary
 */
export type InstanceFailoverGroupRole = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

/** A list of failover groups */
export interface _FailoverGroupListResult {
  /** Array of failover group results. */
  readonly value?: FailoverGroupResource[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _failoverGroupListResultDeserializer(item: any): _FailoverGroupListResult {
  return {
    value: !item["value"] ? item["value"] : failoverGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function failoverGroupResourceArraySerializer(result: Array<FailoverGroupResource>): any[] {
  return result.map((item) => {
    return failoverGroupResourceSerializer(item);
  });
}

export function failoverGroupResourceArrayDeserializer(
  result: Array<FailoverGroupResource>,
): any[] {
  return result.map((item) => {
    return failoverGroupResourceDeserializer(item);
  });
}

/** Options used in creating an availability group */
export interface AvailabilityGroupCreateUpdateConfiguration {
  /** Name of the availability group. */
  availabilityGroupName?: string;
  /** List of availability group replicas. */
  replicas?: AvailabilityGroupCreateUpdateReplicaConfiguration[];
  /** List of databases to include in the availability group. */
  databases?: string[];
  /** Preferred replica for running automated backups. */
  automatedBackupPreference?: AutomatedBackupPreference;
  /** User-defined failure condition level under which an automatic failover must be triggered. */
  failureConditionLevel?: FailureConditionLevel;
  /** Wait time (in milliseconds) for the sp_server_diagnostics system stored procedure to return server-health information, before the server instance is assumed to be slow or not responding. */
  healthCheckTimeout?: number;
  /** Specifies whether the availability group supports failover for database health conditions. */
  dbFailover?: DbFailover;
  /** Specifies whether DTC support has been enabled for this availability group. */
  dtcSupport?: DtcSupport;
  /** The number of secondary replicas that must be in a synchronized state for a commit to complete. */
  requiredSynchronizedSecondariesToCommit?: number;
  /** Set to WSFC when availability group is on a failover cluster instance on a Windows Server failover cluster. Set to NONE when availability group not using WSFC for cluster coordination. */
  clusterType?: ClusterType;
  /** The listener for the sql server availability group */
  listener?: SqlAvailabilityGroupStaticIPListenerProperties;
}

export function availabilityGroupCreateUpdateConfigurationSerializer(
  item: AvailabilityGroupCreateUpdateConfiguration,
): any {
  return {
    availabilityGroupName: item["availabilityGroupName"],
    replicas: !item["replicas"]
      ? item["replicas"]
      : availabilityGroupCreateUpdateReplicaConfigurationArraySerializer(item["replicas"]),
    databases: !item["databases"]
      ? item["databases"]
      : item["databases"].map((p: any) => {
          return p;
        }),
    automatedBackupPreference: item["automatedBackupPreference"],
    failureConditionLevel: item["failureConditionLevel"],
    healthCheckTimeout: item["healthCheckTimeout"],
    dbFailover: item["dbFailover"],
    dtcSupport: item["dtcSupport"],
    requiredSynchronizedSecondariesToCommit: item["requiredSynchronizedSecondariesToCommit"],
    clusterType: item["clusterType"],
    listener: !item["listener"]
      ? item["listener"]
      : sqlAvailabilityGroupStaticIPListenerPropertiesSerializer(item["listener"]),
  };
}

export function availabilityGroupCreateUpdateReplicaConfigurationArraySerializer(
  result: Array<AvailabilityGroupCreateUpdateReplicaConfiguration>,
): any[] {
  return result.map((item) => {
    return availabilityGroupCreateUpdateReplicaConfigurationSerializer(item);
  });
}

/** The specifications of the availability group replica configuration */
export interface AvailabilityGroupCreateUpdateReplicaConfiguration {
  /** the server instance hosting the replica. */
  serverInstance?: string;
  /** Name of the database mirroring endpoint URL for the availability group replica */
  endpointName?: string;
  /** Database mirroring endpoint URL of availability group replica */
  endpointUrl?: string;
  /** Permitted authentication modes for the mirroring endpoint. */
  endpointAuthenticationMode?: ConnectionAuth;
  /** Name of certificate to use for authentication. Required if any CERTIFICATE authentication modes are specified. */
  certificateName?: string;
  /** The login which will connect to the mirroring endpoint */
  endpointConnectLogin?: string;
  /** Property that determines whether a given availability replica can run in synchronous-commit mode */
  availabilityMode?: ArcSqlServerAvailabilityMode;
  /** Property to set the failover mode of the availability group replica */
  failoverMode?: ArcSqlServerFailoverMode;
  /** Specifies how the secondary replica will be initially seeded. AUTOMATIC enables direct seeding. This method will seed the secondary replica over the network. This method does not require you to backup and restore a copy of the primary database on the replica. MANUAL specifies manual seeding (default). This method requires you to create a backup of the database on the primary replica and manually restore that backup on the secondary replica. */
  seedingMode?: SeedingMode;
  /** Represents the user-specified priority for performing backups on this replica relative to the other replicas in the same availability group. */
  backupPriority?: number;
  /** Whether the secondary replica should allow all connections, no connections, or only ReadOnly connections. */
  secondaryRoleAllowConnections?: SecondaryAllowConnections;
  /** Connectivity endpoint (URL) of the read only availability replica. */
  secondaryRoleReadOnlyRoutingUrl?: string;
  /** Whether the primary replica should allow all connections or only READ_WRITE connections (disallowing ReadOnly connections) */
  primaryRoleAllowConnections?: PrimaryAllowConnections;
  /** List of read only routing URLs. */
  primaryRoleReadOnlyRoutingList?: string[];
  /** The time-out period of availability group session replica, in seconds. */
  sessionTimeout?: number;
}

export function availabilityGroupCreateUpdateReplicaConfigurationSerializer(
  item: AvailabilityGroupCreateUpdateReplicaConfiguration,
): any {
  return {
    serverInstance: item["serverInstance"],
    endpointName: item["endpointName"],
    endpointUrl: item["endpointUrl"],
    endpointAuthenticationMode: item["endpointAuthenticationMode"],
    certificateName: item["certificateName"],
    endpointConnectLogin: item["endpointConnectLogin"],
    availabilityMode: item["availabilityMode"],
    failoverMode: item["failoverMode"],
    seedingMode: item["seedingMode"],
    backupPriority: item["backupPriority"],
    secondaryRoleAllowConnections: item["secondaryRoleAllowConnections"],
    secondaryRoleReadOnlyRoutingUrl: item["secondaryRoleReadOnlyRoutingUrl"],
    primaryRoleAllowConnections: item["primaryRoleAllowConnections"],
    primaryRoleReadOnlyRoutingList: !item["primaryRoleReadOnlyRoutingList"]
      ? item["primaryRoleReadOnlyRoutingList"]
      : item["primaryRoleReadOnlyRoutingList"].map((p: any) => {
          return p;
        }),
    sessionTimeout: item["sessionTimeout"],
  };
}

/** Preferred replica for running automated backups. */
export type AutomatedBackupPreference = "PRIMARY" | "SECONDARY_ONLY" | "SECONDARY" | "NONE";
/** User-defined failure condition level under which an automatic failover must be triggered. */
export type FailureConditionLevel = 1 | 2 | 3 | 4 | 5;
/** Specifies whether the availability group supports failover for database health conditions. */
export type DbFailover = "ON" | "OFF";
/** Specifies whether DTC support has been enabled for this availability group. */
export type DtcSupport = "PER_DB" | "NONE";
/** Set to WSFC when availability group is on a failover cluster instance on a Windows Server failover cluster. Set to NONE when availability group not using WSFC for cluster coordination. */
export type ClusterType = "WSFC" | "NONE";

/** Options used in creating a distributed availability group. */
export interface DistributedAvailabilityGroupCreateUpdateConfiguration {
  /** Name of the availability group. */
  availabilityGroupName?: string;
  /** The initial primary availability group for the distributed availability group. */
  primaryAvailabilityGroup?: DistributedAvailabilityGroupCreateUpdateAvailabilityGroupConfiguration;
  /** The initial secondary availability group for the distributed availability group. */
  secondaryAvailabilityGroup?: DistributedAvailabilityGroupCreateUpdateAvailabilityGroupConfiguration;
}

export function distributedAvailabilityGroupCreateUpdateConfigurationSerializer(
  item: DistributedAvailabilityGroupCreateUpdateConfiguration,
): any {
  return {
    availabilityGroupName: item["availabilityGroupName"],
    primaryAvailabilityGroup: !item["primaryAvailabilityGroup"]
      ? item["primaryAvailabilityGroup"]
      : distributedAvailabilityGroupCreateUpdateAvailabilityGroupConfigurationSerializer(
          item["primaryAvailabilityGroup"],
        ),
    secondaryAvailabilityGroup: !item["secondaryAvailabilityGroup"]
      ? item["secondaryAvailabilityGroup"]
      : distributedAvailabilityGroupCreateUpdateAvailabilityGroupConfigurationSerializer(
          item["secondaryAvailabilityGroup"],
        ),
  };
}

/** The availability group configuration specification for a distributed availability group. */
export interface DistributedAvailabilityGroupCreateUpdateAvailabilityGroupConfiguration {
  /** The azure resource identifier for the availability group. */
  availabilityGroup?: string;
  /** The listener URL of the availability group. */
  listenerUrl?: string;
  /** The availability mode of the availability group. */
  availabilityMode?: ArcSqlServerAvailabilityMode;
  /** The failover mode of the availability group. */
  failoverMode?: ArcSqlServerFailoverMode;
  /** The seeding mode of the availability group. */
  seedingMode?: SeedingMode;
  /** The certificate configuration for the availability group. */
  certificateConfiguration?: DistributedAvailabilityGroupCreateUpdateAvailabilityGroupCertificateConfiguration;
}

export function distributedAvailabilityGroupCreateUpdateAvailabilityGroupConfigurationSerializer(
  item: DistributedAvailabilityGroupCreateUpdateAvailabilityGroupConfiguration,
): any {
  return {
    availabilityGroup: item["availabilityGroup"],
    listenerUrl: item["listenerUrl"],
    availabilityMode: item["availabilityMode"],
    failoverMode: item["failoverMode"],
    seedingMode: item["seedingMode"],
    certificateConfiguration: !item["certificateConfiguration"]
      ? item["certificateConfiguration"]
      : distributedAvailabilityGroupCreateUpdateAvailabilityGroupCertificateConfigurationSerializer(
          item["certificateConfiguration"],
        ),
  };
}

/** The availability group certificate configuration. */
export interface DistributedAvailabilityGroupCreateUpdateAvailabilityGroupCertificateConfiguration {
  /** Name of the certificate. */
  certificateName?: string;
}

export function distributedAvailabilityGroupCreateUpdateAvailabilityGroupCertificateConfigurationSerializer(
  item: DistributedAvailabilityGroupCreateUpdateAvailabilityGroupCertificateConfiguration,
): any {
  return { certificateName: item["certificateName"] };
}

/** The configuration for the new Managed Instance Link resource. */
export interface ManagedInstanceLinkCreateUpdateConfiguration {
  /** The configuration for the SQL Server availability group resource. */
  availabilityGroup?: AvailabilityGroupCreateUpdateConfiguration;
  /** The distributed availability group configuration for the MI link. */
  distributedAvailabilityGroup?: DistributedAvailabilityGroupCreateUpdateConfiguration;
  /** The MI Link specific distributed availability group configuration. */
  miLinkConfiguration?: MiLinkCreateUpdateConfiguration;
}

export function managedInstanceLinkCreateUpdateConfigurationSerializer(
  item: ManagedInstanceLinkCreateUpdateConfiguration,
): any {
  return {
    availabilityGroup: !item["availabilityGroup"]
      ? item["availabilityGroup"]
      : availabilityGroupCreateUpdateConfigurationSerializer(item["availabilityGroup"]),
    distributedAvailabilityGroup: !item["distributedAvailabilityGroup"]
      ? item["distributedAvailabilityGroup"]
      : distributedAvailabilityGroupCreateUpdateConfigurationSerializer(
          item["distributedAvailabilityGroup"],
        ),
    miLinkConfiguration: !item["miLinkConfiguration"]
      ? item["miLinkConfiguration"]
      : miLinkCreateUpdateConfigurationSerializer(item["miLinkConfiguration"]),
  };
}

/** The MI Link specific configuration. */
export interface MiLinkCreateUpdateConfiguration {
  /** The name of the availability group to be created on the Managed Instance. */
  instanceAvailabilityGroupName?: string;
}

export function miLinkCreateUpdateConfigurationSerializer(
  item: MiLinkCreateUpdateConfiguration,
): any {
  return { instanceAvailabilityGroupName: item["instanceAvailabilityGroupName"] };
}

/** An update to availability group resource. */
export interface SqlServerAvailabilityGroupUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Server Availability Group's properties */
  properties?: SqlServerAvailabilityGroupResourceProperties;
}

export function sqlServerAvailabilityGroupUpdateSerializer(
  item: SqlServerAvailabilityGroupUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlServerAvailabilityGroupResourcePropertiesSerializer(item["properties"]),
  };
}

/** List of database names. */
export interface Databases {
  /** List of database names. */
  values?: string[];
}

export function databasesSerializer(item: Databases): any {
  return {
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** The azure resource identifier for the Sql Managed Instance. */
export interface FailoverMiLinkResourceId {
  /** Azure resource id for the sql managed instance. */
  managedInstanceId?: string;
  /** Whether to perform a Force Failover as opposed to just a regular Failover. */
  force?: boolean;
}

export function failoverMiLinkResourceIdSerializer(item: FailoverMiLinkResourceId): any {
  return { managedInstanceId: item["managedInstanceId"], force: item["force"] };
}

/** Data controller resource */
export interface DataControllerResource extends TrackedResource {
  /** The data controller's properties */
  properties: DataControllerProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function dataControllerResourceSerializer(item: DataControllerResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: dataControllerPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function dataControllerResourceDeserializer(item: any): DataControllerResource {
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
    properties: dataControllerPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** The data controller properties. */
export interface DataControllerProperties {
  /** The infrastructure the data controller is running on. */
  infrastructure?: Infrastructure;
  /** Properties from the Kubernetes data controller */
  onPremiseProperty?: OnPremiseProperty;
  /** The raw kubernetes information */
  k8SRaw?: any;
  /** Properties on upload watermark.  Mostly timestamp for each upload data type */
  uploadWatermark?: UploadWatermark;
  /** Last uploaded date from Kubernetes cluster. Defaults to current date time */
  lastUploadedDate?: Date;
  /** Deprecated. Azure Arc Data Services data controller no longer expose any endpoint. All traffic are exposed through Kubernetes native API. */
  basicLoginInformation?: BasicLoginInformation;
  /** Login credential for metrics dashboard on the Kubernetes cluster. */
  metricsDashboardCredential?: BasicLoginInformation;
  /** Login credential for logs dashboard on the Kubernetes cluster. */
  logsDashboardCredential?: BasicLoginInformation;
  /** Log analytics workspace id and primary key */
  logAnalyticsWorkspaceConfig?: LogAnalyticsWorkspaceConfig;
  /** Deprecated. Service principal is deprecated in favor of Arc Kubernetes service extension managed identity. */
  uploadServicePrincipal?: UploadServicePrincipal;
  /** The provisioning state of the Arc Data Controller resource. */
  readonly provisioningState?: string;
  /** If a CustomLocation is provided, this contains the ARM id of the connected cluster the custom location belongs to. */
  clusterId?: string;
  /** If a CustomLocation is provided, this contains the ARM id of the extension the custom location belongs to. */
  extensionId?: string;
}

export function dataControllerPropertiesSerializer(item: DataControllerProperties): any {
  return {
    infrastructure: item["infrastructure"],
    onPremiseProperty: !item["onPremiseProperty"]
      ? item["onPremiseProperty"]
      : onPremisePropertySerializer(item["onPremiseProperty"]),
    k8sRaw: item["k8SRaw"],
    uploadWatermark: !item["uploadWatermark"]
      ? item["uploadWatermark"]
      : uploadWatermarkSerializer(item["uploadWatermark"]),
    lastUploadedDate: !item["lastUploadedDate"]
      ? item["lastUploadedDate"]
      : item["lastUploadedDate"].toISOString(),
    basicLoginInformation: !item["basicLoginInformation"]
      ? item["basicLoginInformation"]
      : basicLoginInformationSerializer(item["basicLoginInformation"]),
    metricsDashboardCredential: !item["metricsDashboardCredential"]
      ? item["metricsDashboardCredential"]
      : basicLoginInformationSerializer(item["metricsDashboardCredential"]),
    logsDashboardCredential: !item["logsDashboardCredential"]
      ? item["logsDashboardCredential"]
      : basicLoginInformationSerializer(item["logsDashboardCredential"]),
    logAnalyticsWorkspaceConfig: !item["logAnalyticsWorkspaceConfig"]
      ? item["logAnalyticsWorkspaceConfig"]
      : logAnalyticsWorkspaceConfigSerializer(item["logAnalyticsWorkspaceConfig"]),
    uploadServicePrincipal: !item["uploadServicePrincipal"]
      ? item["uploadServicePrincipal"]
      : uploadServicePrincipalSerializer(item["uploadServicePrincipal"]),
    clusterId: item["clusterId"],
    extensionId: item["extensionId"],
  };
}

export function dataControllerPropertiesDeserializer(item: any): DataControllerProperties {
  return {
    infrastructure: item["infrastructure"],
    onPremiseProperty: !item["onPremiseProperty"]
      ? item["onPremiseProperty"]
      : onPremisePropertyDeserializer(item["onPremiseProperty"]),
    k8SRaw: item["k8sRaw"],
    uploadWatermark: !item["uploadWatermark"]
      ? item["uploadWatermark"]
      : uploadWatermarkDeserializer(item["uploadWatermark"]),
    lastUploadedDate: !item["lastUploadedDate"]
      ? item["lastUploadedDate"]
      : new Date(item["lastUploadedDate"]),
    basicLoginInformation: !item["basicLoginInformation"]
      ? item["basicLoginInformation"]
      : basicLoginInformationDeserializer(item["basicLoginInformation"]),
    metricsDashboardCredential: !item["metricsDashboardCredential"]
      ? item["metricsDashboardCredential"]
      : basicLoginInformationDeserializer(item["metricsDashboardCredential"]),
    logsDashboardCredential: !item["logsDashboardCredential"]
      ? item["logsDashboardCredential"]
      : basicLoginInformationDeserializer(item["logsDashboardCredential"]),
    logAnalyticsWorkspaceConfig: !item["logAnalyticsWorkspaceConfig"]
      ? item["logAnalyticsWorkspaceConfig"]
      : logAnalyticsWorkspaceConfigDeserializer(item["logAnalyticsWorkspaceConfig"]),
    uploadServicePrincipal: !item["uploadServicePrincipal"]
      ? item["uploadServicePrincipal"]
      : uploadServicePrincipalDeserializer(item["uploadServicePrincipal"]),
    provisioningState: item["provisioningState"],
    clusterId: item["clusterId"],
    extensionId: item["extensionId"],
  };
}

/** The infrastructure the data controller is running on. */
export type Infrastructure = "azure" | "gcp" | "aws" | "alibaba" | "onpremises" | "other";

/** Properties from the Kubernetes data controller */
export interface OnPremiseProperty {
  /** A globally unique ID identifying the associated Kubernetes cluster */
  id: string;
  /** Certificate that contains the Kubernetes cluster public key used to verify signing */
  publicSigningKey: string;
  /** Unique thumbprint returned to customer to verify the certificate being uploaded */
  signingCertificateThumbprint?: string;
}

export function onPremisePropertySerializer(item: OnPremiseProperty): any {
  return {
    id: item["id"],
    publicSigningKey: item["publicSigningKey"],
    signingCertificateThumbprint: item["signingCertificateThumbprint"],
  };
}

export function onPremisePropertyDeserializer(item: any): OnPremiseProperty {
  return {
    id: item["id"],
    publicSigningKey: item["publicSigningKey"],
    signingCertificateThumbprint: item["signingCertificateThumbprint"],
  };
}

/** Properties on upload watermark.  Mostly timestamp for each upload data type */
export interface UploadWatermark {
  /** Last uploaded date for metrics from kubernetes cluster. Defaults to current date time */
  metrics?: Date;
  /** Last uploaded date for logs from kubernetes cluster. Defaults to current date time */
  logs?: Date;
  /** Last uploaded date for usages from kubernetes cluster. Defaults to current date time */
  usages?: Date;
}

export function uploadWatermarkSerializer(item: UploadWatermark): any {
  return {
    metrics: !item["metrics"] ? item["metrics"] : item["metrics"].toISOString(),
    logs: !item["logs"] ? item["logs"] : item["logs"].toISOString(),
    usages: !item["usages"] ? item["usages"] : item["usages"].toISOString(),
  };
}

export function uploadWatermarkDeserializer(item: any): UploadWatermark {
  return {
    metrics: !item["metrics"] ? item["metrics"] : new Date(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : new Date(item["logs"]),
    usages: !item["usages"] ? item["usages"] : new Date(item["usages"]),
  };
}

/** Log analytics workspace id and primary key */
export interface LogAnalyticsWorkspaceConfig {
  /** Azure Log Analytics workspace ID */
  workspaceId?: string;
  /** Primary key of the workspace */
  primaryKey?: string;
}

export function logAnalyticsWorkspaceConfigSerializer(item: LogAnalyticsWorkspaceConfig): any {
  return { workspaceId: item["workspaceId"], primaryKey: item["primaryKey"] };
}

export function logAnalyticsWorkspaceConfigDeserializer(item: any): LogAnalyticsWorkspaceConfig {
  return {
    workspaceId: item["workspaceId"],
    primaryKey: item["primaryKey"],
  };
}

/** Service principal for uploading billing, metrics and logs. */
export interface UploadServicePrincipal {
  /** Client ID of the service principal for uploading data. */
  clientId?: string;
  /** Tenant ID of the service principal. */
  tenantId?: string;
  /** Authority for the service principal. Example: https://login.microsoftonline.com/ */
  authority?: string;
  /** Secret of the service principal */
  clientSecret?: string;
}

export function uploadServicePrincipalSerializer(item: UploadServicePrincipal): any {
  return {
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    authority: item["authority"],
    clientSecret: item["clientSecret"],
  };
}

export function uploadServicePrincipalDeserializer(item: any): UploadServicePrincipal {
  return {
    clientId: item["clientId"],
    tenantId: item["tenantId"],
    authority: item["authority"],
    clientSecret: item["clientSecret"],
  };
}

/** Used for updating a data controller resource. */
export interface DataControllerUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The data controller's properties */
  properties?: DataControllerProperties;
}

export function dataControllerUpdateSerializer(item: DataControllerUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : dataControllerPropertiesSerializer(item["properties"]),
  };
}

/** A list of data controllers. */
export interface _PageOfDataControllerResource {
  /** Array of results. */
  value?: DataControllerResource[];
  /** Link to retrieve next page of results. */
  nextLink?: string;
}

export function _pageOfDataControllerResourceDeserializer(
  item: any,
): _PageOfDataControllerResource {
  return {
    value: !item["value"] ? item["value"] : dataControllerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataControllerResourceArraySerializer(
  result: Array<DataControllerResource>,
): any[] {
  return result.map((item) => {
    return dataControllerResourceSerializer(item);
  });
}

export function dataControllerResourceArrayDeserializer(
  result: Array<DataControllerResource>,
): any[] {
  return result.map((item) => {
    return dataControllerResourceDeserializer(item);
  });
}

/** Active directory connector resource */
export interface ActiveDirectoryConnectorResource extends ProxyResource {
  /** null */
  properties: ActiveDirectoryConnectorProperties;
}

export function activeDirectoryConnectorResourceSerializer(
  item: ActiveDirectoryConnectorResource,
): any {
  return { properties: activeDirectoryConnectorPropertiesSerializer(item["properties"]) };
}

export function activeDirectoryConnectorResourceDeserializer(
  item: any,
): ActiveDirectoryConnectorResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: activeDirectoryConnectorPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an Active Directory connector resource */
export interface ActiveDirectoryConnectorProperties {
  /** Username and password for domain service account authentication. */
  domainServiceAccountLoginInformation?: BasicLoginInformation;
  /** The provisioning state of the Active Directory connector resource. */
  readonly provisioningState?: string;
  /** null */
  spec: ActiveDirectoryConnectorSpec;
  /** null */
  status?: ActiveDirectoryConnectorStatus;
}

export function activeDirectoryConnectorPropertiesSerializer(
  item: ActiveDirectoryConnectorProperties,
): any {
  return {
    domainServiceAccountLoginInformation: !item["domainServiceAccountLoginInformation"]
      ? item["domainServiceAccountLoginInformation"]
      : basicLoginInformationSerializer(item["domainServiceAccountLoginInformation"]),
    spec: activeDirectoryConnectorSpecSerializer(item["spec"]),
    status: !item["status"]
      ? item["status"]
      : activeDirectoryConnectorStatusSerializer(item["status"]),
  };
}

export function activeDirectoryConnectorPropertiesDeserializer(
  item: any,
): ActiveDirectoryConnectorProperties {
  return {
    domainServiceAccountLoginInformation: !item["domainServiceAccountLoginInformation"]
      ? item["domainServiceAccountLoginInformation"]
      : basicLoginInformationDeserializer(item["domainServiceAccountLoginInformation"]),
    provisioningState: item["provisioningState"],
    spec: activeDirectoryConnectorSpecDeserializer(item["spec"]),
    status: !item["status"]
      ? item["status"]
      : activeDirectoryConnectorStatusDeserializer(item["status"]),
  };
}

/** The specifications of the AD Kubernetes resource. */
export interface ActiveDirectoryConnectorSpec {
  /** null */
  activeDirectory: ActiveDirectoryConnectorDomainDetails;
  /** null */
  dns: ActiveDirectoryConnectorDNSDetails;
}

export function activeDirectoryConnectorSpecSerializer(item: ActiveDirectoryConnectorSpec): any {
  return {
    activeDirectory: activeDirectoryConnectorDomainDetailsSerializer(item["activeDirectory"]),
    dns: activeDirectoryConnectorDNSDetailsSerializer(item["dns"]),
  };
}

export function activeDirectoryConnectorSpecDeserializer(item: any): ActiveDirectoryConnectorSpec {
  return {
    activeDirectory: activeDirectoryConnectorDomainDetailsDeserializer(item["activeDirectory"]),
    dns: activeDirectoryConnectorDNSDetailsDeserializer(item["dns"]),
  };
}

/** Active Directory domain details */
export interface ActiveDirectoryConnectorDomainDetails {
  /** Name (uppercase) of the Active Directory domain that this AD connector will be associated with. */
  realm: string;
  /** NETBIOS name of the Active Directory domain. */
  netbiosDomainName?: string;
  /** The service account provisioning mode for this Active Directory connector. */
  serviceAccountProvisioning?: AccountProvisioningMode;
  /** The distinguished name of the Active Directory Organizational Unit. */
  ouDistinguishedName?: string;
  /** null */
  domainControllers?: ActiveDirectoryDomainControllers;
}

export function activeDirectoryConnectorDomainDetailsSerializer(
  item: ActiveDirectoryConnectorDomainDetails,
): any {
  return {
    realm: item["realm"],
    netbiosDomainName: item["netbiosDomainName"],
    serviceAccountProvisioning: item["serviceAccountProvisioning"],
    ouDistinguishedName: item["ouDistinguishedName"],
    domainControllers: !item["domainControllers"]
      ? item["domainControllers"]
      : activeDirectoryDomainControllersSerializer(item["domainControllers"]),
  };
}

export function activeDirectoryConnectorDomainDetailsDeserializer(
  item: any,
): ActiveDirectoryConnectorDomainDetails {
  return {
    realm: item["realm"],
    netbiosDomainName: item["netbiosDomainName"],
    serviceAccountProvisioning: item["serviceAccountProvisioning"],
    ouDistinguishedName: item["ouDistinguishedName"],
    domainControllers: !item["domainControllers"]
      ? item["domainControllers"]
      : activeDirectoryDomainControllersDeserializer(item["domainControllers"]),
  };
}

/** The service account provisioning mode for this Active Directory connector. */
export enum KnownAccountProvisioningMode {
  /** automatic */
  Automatic = "automatic",
  /** manual */
  Manual = "manual",
}

/**
 * The service account provisioning mode for this Active Directory connector. \
 * {@link KnownAccountProvisioningMode} can be used interchangeably with AccountProvisioningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **automatic**: automatic \
 * **manual**: manual
 */
export type AccountProvisioningMode = string;

/** Details about the Active Directory domain controllers associated with this AD connector instance */
export interface ActiveDirectoryDomainControllers {
  /** Information about the Primary Domain Controller (PDC) in the AD domain. */
  primaryDomainController?: ActiveDirectoryDomainController;
  /** null */
  secondaryDomainControllers?: ActiveDirectoryDomainController[];
}

export function activeDirectoryDomainControllersSerializer(
  item: ActiveDirectoryDomainControllers,
): any {
  return {
    primaryDomainController: !item["primaryDomainController"]
      ? item["primaryDomainController"]
      : activeDirectoryDomainControllerSerializer(item["primaryDomainController"]),
    secondaryDomainControllers: !item["secondaryDomainControllers"]
      ? item["secondaryDomainControllers"]
      : activeDirectoryDomainControllerArraySerializer(item["secondaryDomainControllers"]),
  };
}

export function activeDirectoryDomainControllersDeserializer(
  item: any,
): ActiveDirectoryDomainControllers {
  return {
    primaryDomainController: !item["primaryDomainController"]
      ? item["primaryDomainController"]
      : activeDirectoryDomainControllerDeserializer(item["primaryDomainController"]),
    secondaryDomainControllers: !item["secondaryDomainControllers"]
      ? item["secondaryDomainControllers"]
      : activeDirectoryDomainControllerArrayDeserializer(item["secondaryDomainControllers"]),
  };
}

/** Information about a domain controller in the AD domain. */
export interface ActiveDirectoryDomainController {
  /** Fully-qualified domain name of a domain controller in the AD domain. */
  hostname: string;
}

export function activeDirectoryDomainControllerSerializer(
  item: ActiveDirectoryDomainController,
): any {
  return { hostname: item["hostname"] };
}

export function activeDirectoryDomainControllerDeserializer(
  item: any,
): ActiveDirectoryDomainController {
  return {
    hostname: item["hostname"],
  };
}

export function activeDirectoryDomainControllerArraySerializer(
  result: Array<ActiveDirectoryDomainController>,
): any[] {
  return result.map((item) => {
    return activeDirectoryDomainControllerSerializer(item);
  });
}

export function activeDirectoryDomainControllerArrayDeserializer(
  result: Array<ActiveDirectoryDomainController>,
): any[] {
  return result.map((item) => {
    return activeDirectoryDomainControllerDeserializer(item);
  });
}

/** DNS server details */
export interface ActiveDirectoryConnectorDNSDetails {
  /** DNS domain name for which DNS lookups should be forwarded to the Active Directory DNS servers. */
  domainName?: string;
  /** List of Active Directory DNS server IP addresses. */
  nameserverIPAddresses: string[];
  /** Replica count for DNS proxy service. Default value is 1. */
  replicas?: number;
  /** Flag indicating whether to prefer Kubernetes DNS server response over AD DNS server response for IP address lookups. */
  preferK8SDnsForPtrLookups?: boolean;
}

export function activeDirectoryConnectorDNSDetailsSerializer(
  item: ActiveDirectoryConnectorDNSDetails,
): any {
  return {
    domainName: item["domainName"],
    nameserverIPAddresses: item["nameserverIPAddresses"].map((p: any) => {
      return p;
    }),
    replicas: item["replicas"],
    preferK8sDnsForPtrLookups: item["preferK8SDnsForPtrLookups"],
  };
}

export function activeDirectoryConnectorDNSDetailsDeserializer(
  item: any,
): ActiveDirectoryConnectorDNSDetails {
  return {
    domainName: item["domainName"],
    nameserverIPAddresses: item["nameserverIPAddresses"].map((p: any) => {
      return p;
    }),
    replicas: item["replicas"],
    preferK8SDnsForPtrLookups: item["preferK8sDnsForPtrLookups"],
  };
}

/** The status of the Kubernetes custom resource. */
export interface ActiveDirectoryConnectorStatus {
  /** The time that the custom resource was last updated. */
  lastUpdateTime?: string;
  /** The version of the replicaSet associated with the AD connector custom resource. */
  observedGeneration?: number;
  /** The state of the AD connector custom resource. */
  state?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function activeDirectoryConnectorStatusSerializer(
  item: ActiveDirectoryConnectorStatus,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    lastUpdateTime: item["lastUpdateTime"],
    observedGeneration: item["observedGeneration"],
    state: item["state"],
  };
}

export function activeDirectoryConnectorStatusDeserializer(
  item: any,
): ActiveDirectoryConnectorStatus {
  return {
    additionalProperties: serializeRecord(item, ["lastUpdateTime", "observedGeneration", "state"]),
    lastUpdateTime: item["lastUpdateTime"],
    observedGeneration: item["observedGeneration"],
    state: item["state"],
  };
}

/** A list of active directory connectors */
export interface _ActiveDirectoryConnectorListResult {
  /** Array of results. */
  readonly value?: ActiveDirectoryConnectorResource[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _activeDirectoryConnectorListResultDeserializer(
  item: any,
): _ActiveDirectoryConnectorListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : activeDirectoryConnectorResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function activeDirectoryConnectorResourceArraySerializer(
  result: Array<ActiveDirectoryConnectorResource>,
): any[] {
  return result.map((item) => {
    return activeDirectoryConnectorResourceSerializer(item);
  });
}

export function activeDirectoryConnectorResourceArrayDeserializer(
  result: Array<ActiveDirectoryConnectorResource>,
): any[] {
  return result.map((item) => {
    return activeDirectoryConnectorResourceDeserializer(item);
  });
}

/** Arc Sql Server database */
export interface SqlServerDatabaseResource extends TrackedResource {
  /** Properties of Arc Sql Server database */
  properties: SqlServerDatabaseResourceProperties;
}

export function sqlServerDatabaseResourceSerializer(item: SqlServerDatabaseResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: sqlServerDatabaseResourcePropertiesSerializer(item["properties"]),
  };
}

export function sqlServerDatabaseResourceDeserializer(item: any): SqlServerDatabaseResource {
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
    properties: sqlServerDatabaseResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Arc Sql Server database resource */
export interface SqlServerDatabaseResourceProperties {
  /** Collation of the database. */
  collationName?: string;
  /** Creation date of the database. */
  databaseCreationDate?: Date;
  /** Compatibility level of the database */
  compatibilityLevel?: number;
  /** Size of the database. */
  sizeMB?: number;
  /** Total size in MB for the log (ldf) files for this database. */
  logFileSizeMB?: number;
  /** Total size in MB for the data (mdf and ndf) files for this database. */
  dataFileSizeMB?: number;
  /** Space left of the database. */
  spaceAvailableMB?: number;
  /** State of the database. */
  state?: DatabaseState;
  /** Whether the database is read only or not. */
  isReadOnly?: boolean;
  /** Status of the database. */
  recoveryMode?: RecoveryMode;
  /** List of features that are enabled for the database */
  databaseOptions?: SqlServerDatabaseResourcePropertiesDatabaseOptions;
  backupInformation?: SqlServerDatabaseResourcePropertiesBackupInformation;
  /** The backup profile for the SQL server. */
  backupPolicy?: BackupPolicy;
  /** This records the earliest start date and time that restore is available for this database (ISO8601 format). */
  readonly earliestRestoreDate?: Date;
  /** Database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. sourceDatabaseId and restorePointInTime must be specified. */
  createMode?: DatabaseCreateMode;
  /** The name of the source database associated with create operation of this database. */
  sourceDatabaseId?: string;
  /** The unique ID of the hybrid machine that this resource belongs to. */
  readonly vmId?: string;
  /** Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database. */
  restorePointInTime?: Date;
  /** The provisioning state of the Arc-enabled SQL Server database resource. */
  readonly provisioningState?: string;
  /** The time when last successful database upload was performed. */
  readonly lastDatabaseUploadTime?: Date;
  /** Migration related configuration. */
  migration?: DataBaseMigration;
}

export function sqlServerDatabaseResourcePropertiesSerializer(
  item: SqlServerDatabaseResourceProperties,
): any {
  return {
    collationName: item["collationName"],
    databaseCreationDate: !item["databaseCreationDate"]
      ? item["databaseCreationDate"]
      : item["databaseCreationDate"].toISOString(),
    compatibilityLevel: item["compatibilityLevel"],
    sizeMB: item["sizeMB"],
    logFileSizeMB: item["logFileSizeMB"],
    dataFileSizeMB: item["dataFileSizeMB"],
    spaceAvailableMB: item["spaceAvailableMB"],
    state: item["state"],
    isReadOnly: item["isReadOnly"],
    recoveryMode: item["recoveryMode"],
    databaseOptions: !item["databaseOptions"]
      ? item["databaseOptions"]
      : sqlServerDatabaseResourcePropertiesDatabaseOptionsSerializer(item["databaseOptions"]),
    backupInformation: !item["backupInformation"]
      ? item["backupInformation"]
      : sqlServerDatabaseResourcePropertiesBackupInformationSerializer(item["backupInformation"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicySerializer(item["backupPolicy"]),
    createMode: item["createMode"],
    sourceDatabaseId: item["sourceDatabaseId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    migration: !item["migration"]
      ? item["migration"]
      : dataBaseMigrationSerializer(item["migration"]),
  };
}

export function sqlServerDatabaseResourcePropertiesDeserializer(
  item: any,
): SqlServerDatabaseResourceProperties {
  return {
    collationName: item["collationName"],
    databaseCreationDate: !item["databaseCreationDate"]
      ? item["databaseCreationDate"]
      : new Date(item["databaseCreationDate"]),
    compatibilityLevel: item["compatibilityLevel"],
    sizeMB: item["sizeMB"],
    logFileSizeMB: item["logFileSizeMB"],
    dataFileSizeMB: item["dataFileSizeMB"],
    spaceAvailableMB: item["spaceAvailableMB"],
    state: item["state"],
    isReadOnly: item["isReadOnly"],
    recoveryMode: item["recoveryMode"],
    databaseOptions: !item["databaseOptions"]
      ? item["databaseOptions"]
      : sqlServerDatabaseResourcePropertiesDatabaseOptionsDeserializer(item["databaseOptions"]),
    backupInformation: !item["backupInformation"]
      ? item["backupInformation"]
      : sqlServerDatabaseResourcePropertiesBackupInformationDeserializer(item["backupInformation"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyDeserializer(item["backupPolicy"]),
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
    createMode: item["createMode"],
    sourceDatabaseId: item["sourceDatabaseId"],
    vmId: item["vmId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    provisioningState: item["provisioningState"],
    lastDatabaseUploadTime: !item["lastDatabaseUploadTime"]
      ? item["lastDatabaseUploadTime"]
      : new Date(item["lastDatabaseUploadTime"]),
    migration: !item["migration"]
      ? item["migration"]
      : dataBaseMigrationDeserializer(item["migration"]),
  };
}

/** State of the database. */
export enum KnownDatabaseState {
  /** Online */
  Online = "Online",
  /** Restoring */
  Restoring = "Restoring",
  /** Recovering */
  Recovering = "Recovering",
  /** RecoveryPending */
  RecoveryPending = "RecoveryPending",
  /** Suspect */
  Suspect = "Suspect",
  /** Emergency */
  Emergency = "Emergency",
  /** Offline */
  Offline = "Offline",
  /** Copying */
  Copying = "Copying",
  /** OfflineSecondary */
  OfflineSecondary = "OfflineSecondary",
}

/**
 * State of the database. \
 * {@link KnownDatabaseState} can be used interchangeably with DatabaseState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Online**: Online \
 * **Restoring**: Restoring \
 * **Recovering**: Recovering \
 * **RecoveryPending**: RecoveryPending \
 * **Suspect**: Suspect \
 * **Emergency**: Emergency \
 * **Offline**: Offline \
 * **Copying**: Copying \
 * **OfflineSecondary**: OfflineSecondary
 */
export type DatabaseState = string;

/** Status of the database. */
export enum KnownRecoveryMode {
  /** Full */
  Full = "Full",
  /** Bulk-logged */
  BulkLogged = "Bulk-logged",
  /** Simple */
  Simple = "Simple",
}

/**
 * Status of the database. \
 * {@link KnownRecoveryMode} can be used interchangeably with RecoveryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full**: Full \
 * **Bulk-logged**: Bulk-logged \
 * **Simple**: Simple
 */
export type RecoveryMode = string;

/** List of features that are enabled for the database */
export interface SqlServerDatabaseResourcePropertiesDatabaseOptions {
  isAutoCloseOn?: boolean;
  isAutoShrinkOn?: boolean;
  isAutoCreateStatsOn?: boolean;
  isAutoUpdateStatsOn?: boolean;
  isRemoteDataArchiveEnabled?: boolean;
  isMemoryOptimizationEnabled?: boolean;
  isEncrypted?: boolean;
  isTrustworthyOn?: boolean;
  /** Whether the database uses the In-Memory OLTP feature for storing in-memory objects. */
  isHekatonFilesOn?: boolean;
  /** How many Hekaton files the DB has on disk, if it uses in-memory OLTP objects. */
  numberOfHekatonFiles?: number;
}

export function sqlServerDatabaseResourcePropertiesDatabaseOptionsSerializer(
  item: SqlServerDatabaseResourcePropertiesDatabaseOptions,
): any {
  return {
    isAutoCloseOn: item["isAutoCloseOn"],
    isAutoShrinkOn: item["isAutoShrinkOn"],
    isAutoCreateStatsOn: item["isAutoCreateStatsOn"],
    isAutoUpdateStatsOn: item["isAutoUpdateStatsOn"],
    isRemoteDataArchiveEnabled: item["isRemoteDataArchiveEnabled"],
    isMemoryOptimizationEnabled: item["isMemoryOptimizationEnabled"],
    isEncrypted: item["isEncrypted"],
    isTrustworthyOn: item["isTrustworthyOn"],
    isHekatonFilesOn: item["isHekatonFilesOn"],
    numberOfHekatonFiles: item["numberOfHekatonFiles"],
  };
}

export function sqlServerDatabaseResourcePropertiesDatabaseOptionsDeserializer(
  item: any,
): SqlServerDatabaseResourcePropertiesDatabaseOptions {
  return {
    isAutoCloseOn: item["isAutoCloseOn"],
    isAutoShrinkOn: item["isAutoShrinkOn"],
    isAutoCreateStatsOn: item["isAutoCreateStatsOn"],
    isAutoUpdateStatsOn: item["isAutoUpdateStatsOn"],
    isRemoteDataArchiveEnabled: item["isRemoteDataArchiveEnabled"],
    isMemoryOptimizationEnabled: item["isMemoryOptimizationEnabled"],
    isEncrypted: item["isEncrypted"],
    isTrustworthyOn: item["isTrustworthyOn"],
    isHekatonFilesOn: item["isHekatonFilesOn"],
    numberOfHekatonFiles: item["numberOfHekatonFiles"],
  };
}

/** model interface SqlServerDatabaseResourcePropertiesBackupInformation */
export interface SqlServerDatabaseResourcePropertiesBackupInformation {
  /** Date time of last full backup. */
  lastFullBackup?: Date;
  /** Date time of last log backup. */
  lastLogBackup?: Date;
}

export function sqlServerDatabaseResourcePropertiesBackupInformationSerializer(
  item: SqlServerDatabaseResourcePropertiesBackupInformation,
): any {
  return {
    lastFullBackup: !item["lastFullBackup"]
      ? item["lastFullBackup"]
      : item["lastFullBackup"].toISOString(),
    lastLogBackup: !item["lastLogBackup"]
      ? item["lastLogBackup"]
      : item["lastLogBackup"].toISOString(),
  };
}

export function sqlServerDatabaseResourcePropertiesBackupInformationDeserializer(
  item: any,
): SqlServerDatabaseResourcePropertiesBackupInformation {
  return {
    lastFullBackup: !item["lastFullBackup"]
      ? item["lastFullBackup"]
      : new Date(item["lastFullBackup"]),
    lastLogBackup: !item["lastLogBackup"] ? item["lastLogBackup"] : new Date(item["lastLogBackup"]),
  };
}

/** Database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. sourceDatabaseId and restorePointInTime must be specified. */
export enum KnownDatabaseCreateMode {
  /** Default */
  Default = "Default",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
}

/**
 * Database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. sourceDatabaseId and restorePointInTime must be specified. \
 * {@link KnownDatabaseCreateMode} can be used interchangeably with DatabaseCreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default \
 * **PointInTimeRestore**: PointInTimeRestore
 */
export type DatabaseCreateMode = string;

/** Migration related configuration. */
export interface DataBaseMigration {
  /** Migration assessments related configuration. */
  assessment?: DataBaseMigrationAssessment;
  /** Migration jobs/actual data movement/data migrations associated with this database related information. */
  jobs?: DatabaseMigrationJobsItem[];
}

export function dataBaseMigrationSerializer(item: DataBaseMigration): any {
  return {
    assessment: !item["assessment"]
      ? item["assessment"]
      : dataBaseMigrationAssessmentSerializer(item["assessment"]),
    jobs: !item["jobs"] ? item["jobs"] : databaseMigrationJobsItemArraySerializer(item["jobs"]),
  };
}

export function dataBaseMigrationDeserializer(item: any): DataBaseMigration {
  return {
    assessment: !item["assessment"]
      ? item["assessment"]
      : dataBaseMigrationAssessmentDeserializer(item["assessment"]),
    jobs: !item["jobs"] ? item["jobs"] : databaseMigrationJobsItemArrayDeserializer(item["jobs"]),
  };
}

/** The migration assessment related configuration. */
export interface DataBaseMigrationAssessment {
  /** The time when Migration Assessment Report upload was last performed. */
  readonly assessmentUploadTime?: Date;
  /** The UTC timestamp in ISO 8601 format indicating when the latest target recommendations were generated for this database. This value is set as part of a successful RunTargetRecommendation job and is independent of when the migration readiness results were uploaded (assessmentUploadTime). */
  readonly targetRecommendationGenerationTime?: Date;
  /** Issues and warnings impacting the migration of Database to particular Azure Migration Target. */
  readonly databaseAssessments?: DatabaseAssessmentsItem[];
  /** The target readiness for migration for this database. */
  readonly targetReadiness?: TargetReadiness;
}

export function dataBaseMigrationAssessmentSerializer(_item: DataBaseMigrationAssessment): any {
  return {};
}

export function dataBaseMigrationAssessmentDeserializer(item: any): DataBaseMigrationAssessment {
  return {
    assessmentUploadTime: !item["assessmentUploadTime"]
      ? item["assessmentUploadTime"]
      : new Date(item["assessmentUploadTime"]),
    targetRecommendationGenerationTime: !item["targetRecommendationGenerationTime"]
      ? item["targetRecommendationGenerationTime"]
      : new Date(item["targetRecommendationGenerationTime"]),
    databaseAssessments: !item["databaseAssessments"]
      ? item["databaseAssessments"]
      : databaseAssessmentsItemArrayDeserializer(item["databaseAssessments"]),
    targetReadiness: !item["targetReadiness"]
      ? item["targetReadiness"]
      : targetReadinessDeserializer(item["targetReadiness"]),
  };
}

export function databaseAssessmentsItemArrayDeserializer(
  result: Array<DatabaseAssessmentsItem>,
): any[] {
  return result.map((item) => {
    return databaseAssessmentsItemDeserializer(item);
  });
}

/** model interface DatabaseAssessmentsItem */
export interface DatabaseAssessmentsItem {
  appliesToMigrationTargetPlatform?: string;
  featureId?: string;
  issueCategory?: string;
  moreInformation?: string;
}

export function databaseAssessmentsItemDeserializer(item: any): DatabaseAssessmentsItem {
  return {
    appliesToMigrationTargetPlatform: item["appliesToMigrationTargetPlatform"],
    featureId: item["featureId"],
    issueCategory: item["issueCategory"],
    moreInformation: item["moreInformation"],
  };
}

/** The target readiness for migration for this database. */
export interface TargetReadiness {
  /** The SKU recommendation summary. */
  azureSqlDatabase?: SkuRecommendationSummary;
  /** The SKU recommendation summary. */
  azureSqlManagedInstance?: SkuRecommendationSummary;
  /** The SKU recommendation summary. */
  azureSqlVirtualMachine?: SkuRecommendationSummary;
}

export function targetReadinessDeserializer(item: any): TargetReadiness {
  return {
    azureSqlDatabase: !item["azureSqlDatabase"]
      ? item["azureSqlDatabase"]
      : skuRecommendationSummaryDeserializer(item["azureSqlDatabase"]),
    azureSqlManagedInstance: !item["azureSqlManagedInstance"]
      ? item["azureSqlManagedInstance"]
      : skuRecommendationSummaryDeserializer(item["azureSqlManagedInstance"]),
    azureSqlVirtualMachine: !item["azureSqlVirtualMachine"]
      ? item["azureSqlVirtualMachine"]
      : skuRecommendationSummaryDeserializer(item["azureSqlVirtualMachine"]),
  };
}

/** The SKU recommendation summary. */
export interface SkuRecommendationSummary {
  /** Number of blocker issues to fix before migrating this database to the target platform. */
  numOfBlockerIssues?: number;
  /** The target recommendation Status for this database. */
  recommendationStatus?: RecommendationStatus;
  readonly impactedObjectsSummary?: ImpactedObjectsInfo[];
  /** The monthly cost of the particular SKU. */
  monthlyCost?: SkuRecommendationResultsMonthlyCost;
  /** The monthly cost for all different savings options applicable for the particular SKU. */
  readonly monthlyCostOptions?: SkuRecommendationResultsMonthlyCostOptionItem[];
  targetSku?: SkuRecommendationSummaryTargetSku;
}

export function skuRecommendationSummaryDeserializer(item: any): SkuRecommendationSummary {
  return {
    numOfBlockerIssues: item["numOfBlockerIssues"],
    recommendationStatus: item["recommendationStatus"],
    impactedObjectsSummary: !item["impactedObjectsSummary"]
      ? item["impactedObjectsSummary"]
      : impactedObjectsInfoArrayDeserializer(item["impactedObjectsSummary"]),
    monthlyCost: !item["monthlyCost"]
      ? item["monthlyCost"]
      : skuRecommendationResultsMonthlyCostDeserializer(item["monthlyCost"]),
    monthlyCostOptions: !item["monthlyCostOptions"]
      ? item["monthlyCostOptions"]
      : skuRecommendationResultsMonthlyCostOptionItemArrayDeserializer(item["monthlyCostOptions"]),
    targetSku: !item["targetSku"]
      ? item["targetSku"]
      : skuRecommendationSummaryTargetSkuDeserializer(item["targetSku"]),
  };
}

/** model interface SkuRecommendationSummaryTargetSku */
export interface SkuRecommendationSummaryTargetSku {
  category?: SkuRecommendationSummaryTargetSkuCategory;
  /** Compute Size in vCores. */
  computeSize?: number;
  /** max storage for this particular SKU, in MB. */
  storageMaxSizeInMb?: number;
  /** The predicted data size in MB in Azure SQL, will impact the billing cost. */
  predictedDataSizeInMb?: number;
  /** The predicted log size in MB in Azure SQL, will impact the billing cost. */
  predictedLogSizeInMb?: number;
  /** The max storage IOPS in Azure SQL, will impact the billing cost. */
  maxStorageIops?: number;
  /** The max throughput in Azure SQL, will impact the billing cost. */
  maxThroughputMBps?: number;
}

export function skuRecommendationSummaryTargetSkuDeserializer(
  item: any,
): SkuRecommendationSummaryTargetSku {
  return {
    category: !item["category"]
      ? item["category"]
      : skuRecommendationSummaryTargetSkuCategoryDeserializer(item["category"]),
    computeSize: item["computeSize"],
    storageMaxSizeInMb: item["storageMaxSizeInMb"],
    predictedDataSizeInMb: item["predictedDataSizeInMb"],
    predictedLogSizeInMb: item["predictedLogSizeInMb"],
    maxStorageIops: item["maxStorageIops"],
    maxThroughputMBps: item["maxThroughputMBps"],
  };
}

/** model interface SkuRecommendationSummaryTargetSkuCategory */
export interface SkuRecommendationSummaryTargetSkuCategory {
  /** The compute tier of the target SKU. */
  computeTier?: string;
  /** The hardware type of the target SKU. */
  hardwareType?: string;
  /** The SQL purchasing model of the target SKU. */
  sqlPurchasingModel?: string;
  /** The SQL service tier of the target SKU. */
  sqlServiceTier?: string;
  /** Indicates if zone redundancy is available for the target SKU. */
  zoneRedundancyAvailable?: boolean;
}

export function skuRecommendationSummaryTargetSkuCategoryDeserializer(
  item: any,
): SkuRecommendationSummaryTargetSkuCategory {
  return {
    computeTier: item["computeTier"],
    hardwareType: item["hardwareType"],
    sqlPurchasingModel: item["sqlPurchasingModel"],
    sqlServiceTier: item["sqlServiceTier"],
    zoneRedundancyAvailable: item["zoneRedundancyAvailable"],
  };
}

export function databaseMigrationJobsItemArraySerializer(
  result: Array<DatabaseMigrationJobsItem>,
): any[] {
  return result.map((item) => {
    return databaseMigrationJobsItemSerializer(item);
  });
}

export function databaseMigrationJobsItemArrayDeserializer(
  result: Array<DatabaseMigrationJobsItem>,
): any[] {
  return result.map((item) => {
    return databaseMigrationJobsItemDeserializer(item);
  });
}

/** model interface DatabaseMigrationJobsItem */
export interface DatabaseMigrationJobsItem {
  /** Reference identifier for tracking purposes/optional link to system initiating this migration. e.g. Arc MI link job id, DMS resource id. */
  migrationTrackingId?: string;
  /** Mode/type of migration. */
  migrationMode?: MigrationMode;
  /** To indicate the client from which the migration is initiated from e.g. Azure Arc, DMS-Azure Portal/PS/CLI for additional tracking. */
  initiatedFrom?: InitiatedFrom;
  /** Status of the migration job. */
  status?: MigrationStatus;
  /** Last error if any associated with this migration job. */
  lastError?: string;
  /** Type of target in Azure this database is being migrated to. */
  targetType?: TargetType;
  /** Resource Id of the target SQL resource for this migration job. */
  targetResourceId?: string;
  /** Time when migration job was started. */
  startTime?: Date;
  /** Time when migration job reached terminal state. */
  endTime?: Date;
  additionalAttributes?: AdditionalMigrationJobAttributes[];
}

export function databaseMigrationJobsItemSerializer(item: DatabaseMigrationJobsItem): any {
  return {
    migrationTrackingId: item["migrationTrackingId"],
    migrationMode: item["migrationMode"],
    initiatedFrom: item["initiatedFrom"],
    status: item["status"],
    lastError: item["lastError"],
    targetType: item["targetType"],
    targetResourceId: item["targetResourceId"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    endTime: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    additionalAttributes: !item["additionalAttributes"]
      ? item["additionalAttributes"]
      : additionalMigrationJobAttributesArraySerializer(item["additionalAttributes"]),
  };
}

export function databaseMigrationJobsItemDeserializer(item: any): DatabaseMigrationJobsItem {
  return {
    migrationTrackingId: item["migrationTrackingId"],
    migrationMode: item["migrationMode"],
    initiatedFrom: item["initiatedFrom"],
    status: item["status"],
    lastError: item["lastError"],
    targetType: item["targetType"],
    targetResourceId: item["targetResourceId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    additionalAttributes: !item["additionalAttributes"]
      ? item["additionalAttributes"]
      : additionalMigrationJobAttributesArrayDeserializer(item["additionalAttributes"]),
  };
}

/** Mode/type of migration. */
export enum KnownMigrationMode {
  /** Migration based on log-shipping technology like LRS (Log Replay Service). */
  LogShipping = "LogShipping",
  /** Migration using managed instance link (MILink) that utilizes Always On availability group technology. */
  MILink = "MILink",
  /** Logical migration refers to moving data at the logical level (schema and rows) rather than transferring physical database files or backups. Examples include migrating to Azure SQL Database, which does not support physical restore. */
  Logical = "Logical",
  /** Other mode of migration not listed currently. */
  Other = "Other",
  /** Mode of migration is not known. */
  Unknown = "Unknown",
}

/**
 * Mode/type of migration. \
 * {@link KnownMigrationMode} can be used interchangeably with MigrationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogShipping**: Migration based on log-shipping technology like LRS (Log Replay Service). \
 * **MILink**: Migration using managed instance link (MILink) that utilizes Always On availability group technology. \
 * **Logical**: Logical migration refers to moving data at the logical level (schema and rows) rather than transferring physical database files or backups. Examples include migrating to Azure SQL Database, which does not support physical restore. \
 * **Other**: Other mode of migration not listed currently. \
 * **Unknown**: Mode of migration is not known.
 */
export type MigrationMode = string;

/** To indicate the client from which the migration is initiated from e.g. Azure Arc, DMS-Azure Portal/PS/CLI for additional tracking. */
export enum KnownInitiatedFrom {
  /** Migration is initiated from Azure Arc enabled clients. */
  AzureArc = "Azure Arc",
  /** Migration is initiated from Azure Data Studio (ADS). */
  ADS = "ADS",
  /** Migration is initiated from SQL Server Management Studio (SSMS). */
  Ssms = "SSMS",
  /** Migration is initiated from SQL Server Migration Assistant (SSMA). */
  Ssma = "SSMA",
  /** Migration is initiated from Azure Database Migration Service(DMS) Azure Portal. */
  DMSPortal = "DMS-Portal",
  /** Migration is initiated from DMS using PowerShell - Azure DataMigration Service Module. */
  Dmsps = "DMS-PS",
  /** Migration is initiated from DMS using datamigration extension for the Azure CLI */
  Dmscli = "DMS-CLI",
  /** Migration is initiated from Azure Database Migration Service SDK like Python or .NET SDKs. */
  Dmssdk = "DMS-SDK",
  /** Migration is initiated from any other client not listed above. */
  Other = "Other",
}

/**
 * To indicate the client from which the migration is initiated from e.g. Azure Arc, DMS-Azure Portal/PS/CLI for additional tracking. \
 * {@link KnownInitiatedFrom} can be used interchangeably with InitiatedFrom,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure Arc**: Migration is initiated from Azure Arc enabled clients. \
 * **ADS**: Migration is initiated from Azure Data Studio (ADS). \
 * **SSMS**: Migration is initiated from SQL Server Management Studio (SSMS). \
 * **SSMA**: Migration is initiated from SQL Server Migration Assistant (SSMA). \
 * **DMS-Portal**: Migration is initiated from Azure Database Migration Service(DMS) Azure Portal. \
 * **DMS-PS**: Migration is initiated from DMS using PowerShell - Azure DataMigration Service Module. \
 * **DMS-CLI**: Migration is initiated from DMS using datamigration extension for the Azure CLI \
 * **DMS-SDK**: Migration is initiated from Azure Database Migration Service SDK like Python or .NET SDKs. \
 * **Other**: Migration is initiated from any other client not listed above.
 */
export type InitiatedFrom = string;

/** Status of the migration job. */
export enum KnownMigrationStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** InProgressWithWarnings */
  InProgressWithWarnings = "InProgressWithWarnings",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Failed */
  Failed = "Failed",
  /** Successful */
  Successful = "Successful",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Status of the migration job. \
 * {@link KnownMigrationStatus} can be used interchangeably with MigrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **InProgress**: InProgress \
 * **InProgressWithWarnings**: InProgressWithWarnings \
 * **Cancelled**: Cancelled \
 * **Failed**: Failed \
 * **Successful**: Successful \
 * **Unknown**: Unknown
 */
export type MigrationStatus = string;

/** Type of target in Azure this database is being migrated to. */
export enum KnownTargetType {
  /** AzureSqlDatabase */
  AzureSqlDatabase = "AzureSqlDatabase",
  /** AzureSqlManagedInstance */
  AzureSqlManagedInstance = "AzureSqlManagedInstance",
  /** AzureSqlVirtualMachine */
  AzureSqlVirtualMachine = "AzureSqlVirtualMachine",
}

/**
 * Type of target in Azure this database is being migrated to. \
 * {@link KnownTargetType} can be used interchangeably with TargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureSqlDatabase**: AzureSqlDatabase \
 * **AzureSqlManagedInstance**: AzureSqlManagedInstance \
 * **AzureSqlVirtualMachine**: AzureSqlVirtualMachine
 */
export type TargetType = string;

export function additionalMigrationJobAttributesArraySerializer(
  result: Array<AdditionalMigrationJobAttributes>,
): any[] {
  return result.map((item) => {
    return additionalMigrationJobAttributesSerializer(item);
  });
}

export function additionalMigrationJobAttributesArrayDeserializer(
  result: Array<AdditionalMigrationJobAttributes>,
): any[] {
  return result.map((item) => {
    return additionalMigrationJobAttributesDeserializer(item);
  });
}

/** Any other migration type specific attributes to associate with this job. */
export interface AdditionalMigrationJobAttributes {
  /** Unique attribute name. */
  keyName?: string;
  /** Attribute value. */
  keyValue?: string;
}

export function additionalMigrationJobAttributesSerializer(
  item: AdditionalMigrationJobAttributes,
): any {
  return { keyName: item["keyName"], keyValue: item["keyValue"] };
}

export function additionalMigrationJobAttributesDeserializer(
  item: any,
): AdditionalMigrationJobAttributes {
  return {
    keyName: item["keyName"],
    keyValue: item["keyValue"],
  };
}

/** An update to database resource. */
export interface SqlServerDatabaseUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The data controller's properties */
  properties?: SqlServerDatabaseResourceProperties;
}

export function sqlServerDatabaseUpdateSerializer(item: SqlServerDatabaseUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlServerDatabaseResourcePropertiesSerializer(item["properties"]),
  };
}

/** A list of Arc Sql Server database. */
export interface _ArcSqlServerDatabaseListResult {
  /** Array of  Arc Sql Server database. */
  readonly value?: SqlServerDatabaseResource[];
  /** Link to retrieve next page of results. */
  readonly nextLink?: string;
}

export function _arcSqlServerDatabaseListResultDeserializer(
  item: any,
): _ArcSqlServerDatabaseListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlServerDatabaseResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlServerDatabaseResourceArraySerializer(
  result: Array<SqlServerDatabaseResource>,
): any[] {
  return result.map((item) => {
    return sqlServerDatabaseResourceSerializer(item);
  });
}

export function sqlServerDatabaseResourceArrayDeserializer(
  result: Array<SqlServerDatabaseResource>,
): any[] {
  return result.map((item) => {
    return sqlServerDatabaseResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-03-01-preview API version. */
  V20260301Preview = "2026-03-01-preview",
}
