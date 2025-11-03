// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** Result of the request to list Storage operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of Storage operations supported by the Storage resource provider. */
  value: Operation[];
  /** The URL to get the next set of operations. */
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

/** Key Vault REST API operation definition. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
  /** The origin of operations. */
  origin?: string;
  /** Properties of operation, include metric specifications. */
  operationProperties?: OperationProperties;
  /** Property to specify whether the action is a data action. */
  isDataAction?: boolean;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    operationProperties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
    isDataAction: item["isDataAction"],
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft Key Vault. */
  provider?: string;
  /** Resource on which the operation is performed etc. */
  resource?: string;
  /** Type of operation: get, read, delete, etc. */
  operation?: string;
  /** Description of operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Properties of operation, include metric specifications. */
export interface OperationProperties {
  /** One property of operation, include metric specifications. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** One property of operation, include log specifications. */
export interface ServiceSpecification {
  /** Log specifications of operation. */
  logSpecifications?: LogSpecification[];
  /** Metric specifications of operation. */
  metricSpecifications?: MetricSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Log specification of operation. */
export interface LogSpecification {
  /** Name of log specification. */
  name?: string;
  /** Display name of log specification. */
  displayName?: string;
  /** Blob duration of specification. */
  blobDuration?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Metric specification of operation. */
export interface MetricSpecification {
  /** Name of metric specification. */
  name?: string;
  /** Display name of metric specification. */
  displayName?: string;
  /** Display description of metric specification. */
  displayDescription?: string;
  /** The metric unit. Possible values include: 'Bytes', 'Count', 'Milliseconds'. */
  unit?: string;
  /** The metric aggregation type. Possible values include: 'Average', 'Count', 'Total'. */
  aggregationType?: string;
  /** The supported aggregation types for the metrics. */
  supportedAggregationTypes?: string[];
  /** The supported time grain types for the metrics. */
  supportedTimeGrainTypes?: string[];
  /** The metric lock aggregation type. */
  lockAggregationType?: string;
  /** The dimensions of metric */
  dimensions?: DimensionProperties[];
  /** Property to specify whether to fill gap with zero. */
  fillGapWithZero?: boolean;
  /** The internal metric name. */
  internalMetricName?: string;
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    lockAggregationType: item["lockAggregationType"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionPropertiesArrayDeserializer(item["dimensions"]),
    fillGapWithZero: item["fillGapWithZero"],
    internalMetricName: item["internalMetricName"],
  };
}

export function dimensionPropertiesArrayDeserializer(result: Array<DimensionProperties>): any[] {
  return result.map((item) => {
    return dimensionPropertiesDeserializer(item);
  });
}

/** Type of operation: get, read, delete, etc. */
export interface DimensionProperties {
  /** Name of dimension. */
  name?: string;
  /** Display name of dimension. */
  displayName?: string;
  /** Property to specify whether the dimension should be exported for Shoebox. */
  toBeExportedForShoebox?: boolean;
}

export function dimensionPropertiesDeserializer(item: any): DimensionProperties {
  return {
    name: item["name"],
    displayName: item["displayName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

/** An error response from Key Vault resource provider */
export interface CloudError {
  /** An error response from Key Vault resource provider */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from Key Vault resource provider */
export interface CloudErrorBody {
  /** Error code. This is a mnemonic that can be consumed programmatically. */
  code?: string;
  /** User friendly error message. The message is typically localized and may vary with service version. */
  message?: string;
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Resource information with extended details. */
export interface Vault extends ProxyResource {
  /** Properties of the vault */
  properties: VaultProperties;
  /** Azure location of the key vault resource. */
  location?: string;
  /** Tags assigned to the key vault resource. */
  tags?: Record<string, string>;
}

export function vaultDeserializer(item: any): Vault {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: vaultPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** Properties of the vault */
export interface VaultProperties {
  /** The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. */
  tenantId: string;
  /** SKU details */
  sku: Sku;
  /** An array of 0 to 1024 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. When `createMode` is set to `recover`, access policies are not required. Otherwise, access policies are required. */
  accessPolicies?: AccessPolicyEntry[];
  /** The URI of the vault for performing operations on keys and secrets. */
  vaultUri?: string;
  /** The resource id of HSM Pool. */
  readonly hsmPoolResourceId?: string;
  /** Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault. */
  enabledForDeployment?: boolean;
  /** Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys. */
  enabledForDiskEncryption?: boolean;
  /** Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault. */
  enabledForTemplateDeployment?: boolean;
  /** Property to specify whether the 'soft delete' functionality is enabled for this key vault. If it's not set to any value(true or false) when creating new key vault, it will be set to true by default. Once set to true, it cannot be reverted to false. */
  enableSoftDelete?: boolean;
  /** softDelete data retention days. It accepts >=7 and <=90. */
  softDeleteRetentionInDays?: number;
  /** Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be  ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value of false. Note that management actions are always authorized with RBAC. */
  enableRbacAuthorization?: boolean;
  /** The vault's create mode to indicate whether the vault need to be recovered or not. */
  createMode?: CreateMode;
  /** Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value. */
  enablePurgeProtection?: boolean;
  /** Rules governing the accessibility of the key vault from specific network locations. */
  networkAcls?: NetworkRuleSet;
  /** Provisioning state of the vault. */
  provisioningState?: VaultProvisioningState;
  /** List of private endpoint connections associated with the key vault. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionItem[];
  /** Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules. */
  publicNetworkAccess?: string;
}

export function vaultPropertiesSerializer(item: VaultProperties): any {
  return {
    tenantId: item["tenantId"],
    sku: skuSerializer(item["sku"]),
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : accessPolicyEntryArraySerializer(item["accessPolicies"]),
    vaultUri: item["vaultUri"],
    enabledForDeployment: item["enabledForDeployment"],
    enabledForDiskEncryption: item["enabledForDiskEncryption"],
    enabledForTemplateDeployment: item["enabledForTemplateDeployment"],
    enableSoftDelete: item["enableSoftDelete"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    enableRbacAuthorization: item["enableRbacAuthorization"],
    createMode: item["createMode"],
    enablePurgeProtection: item["enablePurgeProtection"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetSerializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function vaultPropertiesDeserializer(item: any): VaultProperties {
  return {
    tenantId: item["tenantId"],
    sku: skuDeserializer(item["sku"]),
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : accessPolicyEntryArrayDeserializer(item["accessPolicies"]),
    vaultUri: item["vaultUri"],
    hsmPoolResourceId: item["hsmPoolResourceId"],
    enabledForDeployment: item["enabledForDeployment"],
    enabledForDiskEncryption: item["enabledForDiskEncryption"],
    enabledForTemplateDeployment: item["enabledForTemplateDeployment"],
    enableSoftDelete: item["enableSoftDelete"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    enableRbacAuthorization: item["enableRbacAuthorization"],
    createMode: item["createMode"],
    enablePurgeProtection: item["enablePurgeProtection"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionItemArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** SKU details */
export interface Sku {
  /** SKU family name */
  family: SkuFamily;
  /** SKU name to specify whether the key vault is a standard vault or a premium vault. */
  name: SkuName;
}

export function skuSerializer(item: Sku): any {
  return { family: item["family"], name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    family: item["family"],
    name: item["name"],
  };
}

/** SKU family name */
export enum KnownSkuFamily {
  /** A */
  A = "A",
}

/**
 * SKU family name \
 * {@link KnownSkuFamily} can be used interchangeably with SkuFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **A**
 */
export type SkuFamily = string;
/** SKU name to specify whether the key vault is a standard vault or a premium vault. */
export type SkuName = "standard" | "premium";

export function accessPolicyEntryArraySerializer(result: Array<AccessPolicyEntry>): any[] {
  return result.map((item) => {
    return accessPolicyEntrySerializer(item);
  });
}

export function accessPolicyEntryArrayDeserializer(result: Array<AccessPolicyEntry>): any[] {
  return result.map((item) => {
    return accessPolicyEntryDeserializer(item);
  });
}

/** An identity that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. */
export interface AccessPolicyEntry {
  /** The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. */
  tenantId: string;
  /** The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies. */
  objectId: string;
  /** Application ID of the client making request on behalf of a principal */
  applicationId?: string;
  /** Permissions the identity has for keys, secrets and certificates. */
  permissions: Permissions;
}

export function accessPolicyEntrySerializer(item: AccessPolicyEntry): any {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
    applicationId: item["applicationId"],
    permissions: permissionsSerializer(item["permissions"]),
  };
}

export function accessPolicyEntryDeserializer(item: any): AccessPolicyEntry {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
    applicationId: item["applicationId"],
    permissions: permissionsDeserializer(item["permissions"]),
  };
}

/** Permissions the identity has for keys, secrets, certificates and storage. */
export interface Permissions {
  /** Permissions to keys */
  keys?: KeyPermissions[];
  /** Permissions to secrets */
  secrets?: SecretPermissions[];
  /** Permissions to certificates */
  certificates?: CertificatePermissions[];
  /** Permissions to storage accounts */
  storage?: StoragePermissions[];
}

export function permissionsSerializer(item: Permissions): any {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
    secrets: !item["secrets"]
      ? item["secrets"]
      : item["secrets"].map((p: any) => {
          return p;
        }),
    certificates: !item["certificates"]
      ? item["certificates"]
      : item["certificates"].map((p: any) => {
          return p;
        }),
    storage: !item["storage"]
      ? item["storage"]
      : item["storage"].map((p: any) => {
          return p;
        }),
  };
}

export function permissionsDeserializer(item: any): Permissions {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
    secrets: !item["secrets"]
      ? item["secrets"]
      : item["secrets"].map((p: any) => {
          return p;
        }),
    certificates: !item["certificates"]
      ? item["certificates"]
      : item["certificates"].map((p: any) => {
          return p;
        }),
    storage: !item["storage"]
      ? item["storage"]
      : item["storage"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link KeyPermissions} that the service accepts. */
export enum KnownKeyPermissions {
  /** all */
  All = "all",
  /** encrypt */
  Encrypt = "encrypt",
  /** decrypt */
  Decrypt = "decrypt",
  /** wrapKey */
  WrapKey = "wrapKey",
  /** unwrapKey */
  UnwrapKey = "unwrapKey",
  /** sign */
  Sign = "sign",
  /** verify */
  Verify = "verify",
  /** get */
  Get = "get",
  /** list */
  List = "list",
  /** create */
  Create = "create",
  /** update */
  Update = "update",
  /** import */
  Import = "import",
  /** delete */
  Delete = "delete",
  /** backup */
  Backup = "backup",
  /** restore */
  Restore = "restore",
  /** recover */
  Recover = "recover",
  /** purge */
  Purge = "purge",
  /** release */
  Release = "release",
  /** rotate */
  Rotate = "rotate",
  /** getrotationpolicy */
  Getrotationpolicy = "getrotationpolicy",
  /** setrotationpolicy */
  Setrotationpolicy = "setrotationpolicy",
}

/** Type of KeyPermissions */
export type KeyPermissions = string;

/** Known values of {@link SecretPermissions} that the service accepts. */
export enum KnownSecretPermissions {
  /** all */
  All = "all",
  /** get */
  Get = "get",
  /** list */
  List = "list",
  /** set */
  Set = "set",
  /** delete */
  Delete = "delete",
  /** backup */
  Backup = "backup",
  /** restore */
  Restore = "restore",
  /** recover */
  Recover = "recover",
  /** purge */
  Purge = "purge",
}

/** Type of SecretPermissions */
export type SecretPermissions = string;

/** Known values of {@link CertificatePermissions} that the service accepts. */
export enum KnownCertificatePermissions {
  /** all */
  All = "all",
  /** get */
  Get = "get",
  /** list */
  List = "list",
  /** delete */
  Delete = "delete",
  /** create */
  Create = "create",
  /** import */
  Import = "import",
  /** update */
  Update = "update",
  /** managecontacts */
  Managecontacts = "managecontacts",
  /** getissuers */
  Getissuers = "getissuers",
  /** listissuers */
  Listissuers = "listissuers",
  /** setissuers */
  Setissuers = "setissuers",
  /** deleteissuers */
  Deleteissuers = "deleteissuers",
  /** manageissuers */
  Manageissuers = "manageissuers",
  /** recover */
  Recover = "recover",
  /** purge */
  Purge = "purge",
  /** backup */
  Backup = "backup",
  /** restore */
  Restore = "restore",
}

/** Type of CertificatePermissions */
export type CertificatePermissions = string;

/** Known values of {@link StoragePermissions} that the service accepts. */
export enum KnownStoragePermissions {
  /** all */
  All = "all",
  /** get */
  Get = "get",
  /** list */
  List = "list",
  /** delete */
  Delete = "delete",
  /** set */
  Set = "set",
  /** update */
  Update = "update",
  /** regeneratekey */
  Regeneratekey = "regeneratekey",
  /** recover */
  Recover = "recover",
  /** purge */
  Purge = "purge",
  /** backup */
  Backup = "backup",
  /** restore */
  Restore = "restore",
  /** setsas */
  Setsas = "setsas",
  /** listsas */
  Listsas = "listsas",
  /** getsas */
  Getsas = "getsas",
  /** deletesas */
  Deletesas = "deletesas",
}

/** Type of StoragePermissions */
export type StoragePermissions = string;
/** The vault's create mode to indicate whether the vault need to be recovered or not. */
export type CreateMode = "recover" | "default";

/** A set of rules governing the network accessibility of a vault. */
export interface NetworkRuleSet {
  /** Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'.  If not specified the default is 'AzureServices'. */
  bypass?: NetworkRuleBypassOptions;
  /** The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. */
  defaultAction?: NetworkRuleAction;
  /** The list of IP address rules. */
  ipRules?: IPRule[];
  /** The list of virtual network rules. */
  virtualNetworkRules?: VirtualNetworkRule[];
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    bypass: item["bypass"],
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    bypass: item["bypass"],
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
  };
}

/** Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'.  If not specified the default is 'AzureServices'. */
export enum KnownNetworkRuleBypassOptions {
  /** AzureServices */
  AzureServices = "AzureServices",
  /** None */
  None = "None",
}

/**
 * Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'.  If not specified the default is 'AzureServices'. \
 * {@link KnownNetworkRuleBypassOptions} can be used interchangeably with NetworkRuleBypassOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureServices** \
 * **None**
 */
export type NetworkRuleBypassOptions = string;

/** The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. */
export enum KnownNetworkRuleAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. \
 * {@link KnownNetworkRuleAction} can be used interchangeably with NetworkRuleAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type NetworkRuleAction = string;

export function ipRuleArraySerializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** A rule governing the accessibility of a vault from a specific ip address or ip range. */
export interface IPRule {
  /** An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78). */
  value: string;
}

export function ipRuleSerializer(item: IPRule): any {
  return { value: item["value"] };
}

export function ipRuleDeserializer(item: any): IPRule {
  return {
    value: item["value"],
  };
}

export function virtualNetworkRuleArraySerializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleSerializer(item);
  });
}

export function virtualNetworkRuleArrayDeserializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleDeserializer(item);
  });
}

/** A rule governing the accessibility of a vault from a specific virtual network. */
export interface VirtualNetworkRule {
  /** Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'. */
  id: string;
  /** Property to specify whether NRP will ignore the check if parent subnet has serviceEndpoints configured. */
  ignoreMissingVnetServiceEndpoint?: boolean;
}

export function virtualNetworkRuleSerializer(item: VirtualNetworkRule): any {
  return {
    id: item["id"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

export function virtualNetworkRuleDeserializer(item: any): VirtualNetworkRule {
  return {
    id: item["id"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

/** Provisioning state of the vault. */
export enum KnownVaultProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** RegisteringDns */
  RegisteringDns = "RegisteringDns",
}

/**
 * Provisioning state of the vault. \
 * {@link KnownVaultProvisioningState} can be used interchangeably with VaultProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **RegisteringDns**
 */
export type VaultProvisioningState = string;

export function privateEndpointConnectionItemArrayDeserializer(
  result: Array<PrivateEndpointConnectionItem>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionItemDeserializer(item);
  });
}

/** Private endpoint connection item. */
export interface PrivateEndpointConnectionItem {
  /** Id of private endpoint connection. */
  id?: string;
  /** Modified whenever there is a change in the state of private endpoint connection. */
  etag?: string;
  /** Private endpoint connection properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionItemDeserializer(
  item: any,
): PrivateEndpointConnectionItem {
  return {
    id: item["id"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the private endpoint connection resource. */
export interface PrivateEndpointConnectionProperties {
  /** Properties of the private endpoint object. */
  privateEndpoint?: PrivateEndpoint;
  /** Approval state of the private link connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** Provisioning state of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** Private endpoint object properties. */
export interface PrivateEndpoint {
  /** Full identifier of the private endpoint resource. */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** An object that represents the approval state of the private link connection. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been approved, rejected or removed by the key vault owner. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval or rejection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: ActionsRequired;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** A message indicating if changes on the service provider require any updates on the consumer. */
export enum KnownActionsRequired {
  /** None */
  None = "None",
}

/**
 * A message indicating if changes on the service provider require any updates on the consumer. \
 * {@link KnownActionsRequired} can be used interchangeably with ActionsRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**
 */
export type ActionsRequired = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Failed** \
 * **Disconnected**
 */
export type PrivateEndpointConnectionProvisioningState = string;

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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Parameters for creating or updating a vault */
export interface VaultCreateOrUpdateParameters {
  /** The supported Azure location where the key vault should be created. */
  location: string;
  /** The tags that will be assigned to the key vault. */
  tags?: Record<string, string>;
  /** Properties of the vault */
  properties: VaultProperties;
}

export function vaultCreateOrUpdateParametersSerializer(item: VaultCreateOrUpdateParameters): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: vaultPropertiesSerializer(item["properties"]),
  };
}

/** Parameters for creating or updating a vault */
export interface VaultPatchParameters {
  /** The tags that will be assigned to the key vault. */
  tags?: Record<string, string>;
  /** Properties of the vault */
  properties?: VaultPatchProperties;
}

export function vaultPatchParametersSerializer(item: VaultPatchParameters): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : vaultPatchPropertiesSerializer(item["properties"]),
  };
}

/** Properties of the vault */
export interface VaultPatchProperties {
  /** The Azure Active Directory tenant ID that should be used for authenticating requests to the key vault. */
  tenantId?: string;
  /** SKU details */
  sku?: Sku;
  /** An array of 0 to 16 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. */
  accessPolicies?: AccessPolicyEntry[];
  /** Property to specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault. */
  enabledForDeployment?: boolean;
  /** Property to specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys. */
  enabledForDiskEncryption?: boolean;
  /** Property to specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault. */
  enabledForTemplateDeployment?: boolean;
  /** Property to specify whether the 'soft delete' functionality is enabled for this key vault. Once set to true, it cannot be reverted to false. */
  enableSoftDelete?: boolean;
  /** Property that controls how data actions are authorized. When true, the key vault will use Role Based Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties will be  ignored. When false, the key vault will use the access policies specified in vault properties, and any policy stored on Azure Resource Manager will be ignored. If null or not specified, the value of this property will not change. */
  enableRbacAuthorization?: boolean;
  /** softDelete data retention days. It accepts >=7 and <=90. */
  softDeleteRetentionInDays?: number;
  /** The vault's create mode to indicate whether the vault need to be recovered or not. */
  createMode?: CreateMode;
  /** Property specifying whether protection against purge is enabled for this vault. Setting this property to true activates protection against purge for this vault and its content - only the Key Vault service may initiate a hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this functionality is irreversible - that is, the property does not accept false as its value. */
  enablePurgeProtection?: boolean;
  /** A collection of rules governing the accessibility of the vault from specific network locations. */
  networkAcls?: NetworkRuleSet;
  /** Property to specify whether the vault will accept traffic from public internet. If set to 'disabled' all traffic except private endpoint traffic and that that originates from trusted services will be blocked. This will override the set firewall rules, meaning that even if the firewall rules are present we will not honor the rules. */
  publicNetworkAccess?: string;
}

export function vaultPatchPropertiesSerializer(item: VaultPatchProperties): any {
  return {
    tenantId: item["tenantId"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : accessPolicyEntryArraySerializer(item["accessPolicies"]),
    enabledForDeployment: item["enabledForDeployment"],
    enabledForDiskEncryption: item["enabledForDiskEncryption"],
    enabledForTemplateDeployment: item["enabledForTemplateDeployment"],
    enableSoftDelete: item["enableSoftDelete"],
    enableRbacAuthorization: item["enableRbacAuthorization"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    createMode: item["createMode"],
    enablePurgeProtection: item["enablePurgeProtection"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetSerializer(item["networkAcls"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The response of a Vault list operation. */
export interface _VaultListResult {
  /** The Vault items on this page */
  value: Vault[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vaultListResultDeserializer(item: any): _VaultListResult {
  return {
    value: vaultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vaultArrayDeserializer(result: Array<Vault>): any[] {
  return result.map((item) => {
    return vaultDeserializer(item);
  });
}

/** Parameters for updating the access policy in a vault */
export interface VaultAccessPolicyParameters {
  /** The resource id of the access policy. */
  readonly id?: string;
  /** The resource name of the access policy. */
  readonly name?: string;
  /** The resource name of the access policy. */
  readonly type?: string;
  /** The resource type of the access policy. */
  readonly location?: string;
  /** Properties of the access policy */
  properties: VaultAccessPolicyProperties;
}

export function vaultAccessPolicyParametersSerializer(item: VaultAccessPolicyParameters): any {
  return {
    properties: vaultAccessPolicyPropertiesSerializer(item["properties"]),
  };
}

export function vaultAccessPolicyParametersDeserializer(item: any): VaultAccessPolicyParameters {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    properties: vaultAccessPolicyPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the vault access policy */
export interface VaultAccessPolicyProperties {
  /** An array of 0 to 16 identities that have access to the key vault. All identities in the array must use the same tenant ID as the key vault's tenant ID. */
  accessPolicies: AccessPolicyEntry[];
}

export function vaultAccessPolicyPropertiesSerializer(item: VaultAccessPolicyProperties): any {
  return {
    accessPolicies: accessPolicyEntryArraySerializer(item["accessPolicies"]),
  };
}

export function vaultAccessPolicyPropertiesDeserializer(item: any): VaultAccessPolicyProperties {
  return {
    accessPolicies: accessPolicyEntryArrayDeserializer(item["accessPolicies"]),
  };
}

/** Deleted vault information with extended details. */
export interface DeletedVault extends ProxyResource {
  /** Properties of the vault */
  properties?: DeletedVaultProperties;
}

export function deletedVaultDeserializer(item: any): DeletedVault {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deletedVaultPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the deleted vault. */
export interface DeletedVaultProperties {
  /** The resource id of the original vault. */
  readonly vaultId?: string;
  /** The location of the original vault. */
  readonly location?: string;
  /** The deleted date. */
  readonly deletionDate?: Date;
  /** The scheduled purged date. */
  readonly scheduledPurgeDate?: Date;
  /** Tags of the original vault. */
  readonly tags?: Record<string, string>;
  /** Purge protection status of the original vault. */
  readonly purgeProtectionEnabled?: boolean;
}

export function deletedVaultPropertiesDeserializer(item: any): DeletedVaultProperties {
  return {
    vaultId: item["vaultId"],
    location: item["location"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    tags: item["tags"],
    purgeProtectionEnabled: item["purgeProtectionEnabled"],
  };
}

/** The response of a DeletedVault list operation. */
export interface _DeletedVaultListResult {
  /** The DeletedVault items on this page */
  value: DeletedVault[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedVaultListResultDeserializer(item: any): _DeletedVaultListResult {
  return {
    value: deletedVaultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedVaultArrayDeserializer(result: Array<DeletedVault>): any[] {
  return result.map((item) => {
    return deletedVaultDeserializer(item);
  });
}

/** The list of vault resources. */
export interface _ResourceListResult {
  /** The list of vault resources. */
  value: TrackedResource[];
  /** The URL to get the next set of vault resources. */
  nextLink?: string;
}

export function _resourceListResultDeserializer(item: any): _ResourceListResult {
  return {
    value: trackedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function trackedResourceArrayDeserializer(result: Array<TrackedResource>): any[] {
  return result.map((item) => {
    return trackedResourceDeserializer(item);
  });
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
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

/** The parameters used to check the availability of the vault name. */
export interface VaultCheckNameAvailabilityParameters {
  /** The vault name. */
  name: string;
  /** The type of resource, Microsoft.KeyVault/vaults */
  type: "Microsoft.KeyVault/vaults";
}

export function vaultCheckNameAvailabilityParametersSerializer(
  item: VaultCheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The CheckNameAvailability operation response. */
export interface CheckNameAvailabilityResult {
  /** A boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or is invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** The reason that a vault name could not be used. The Reason element is only returned if NameAvailable is false. */
  readonly reason?: Reason;
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

/** The reason that a vault name could not be used. The Reason element is only returned if NameAvailable is false. */
export enum KnownReason {
  /** AccountNameInvalid */
  AccountNameInvalid = "AccountNameInvalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * The reason that a vault name could not be used. The Reason element is only returned if NameAvailable is false. \
 * {@link KnownReason} can be used interchangeably with Reason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountNameInvalid** \
 * **AlreadyExists**
 */
export type Reason = string;

/** Private endpoint connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
  /** Azure location of the key vault resource. */
  readonly location?: string;
  /** Tags assigned to the key vault resource. */
  readonly tags?: Record<string, string>;
  /** Modified whenever there is a change in the state of private endpoint connection. */
  etag?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
    etag: item["etag"],
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
    etag: item["etag"],
  };
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** Resource information with extended details. */
export interface ManagedHsm extends Resource {
  /** Properties of the managed HSM */
  properties?: ManagedHsmProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** SKU details */
  sku?: ManagedHsmSku;
  /** Managed service identity */
  identity?: ManagedServiceIdentity;
}

export function managedHsmSerializer(item: ManagedHsm): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedHsmPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : managedHsmSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function managedHsmDeserializer(item: any): ManagedHsm {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : managedHsmPropertiesDeserializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : managedHsmSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the managed HSM Pool */
export interface ManagedHsmProperties {
  /** The Azure Active Directory tenant ID that should be used for authenticating requests to the managed HSM pool. */
  tenantId?: string;
  /** Array of initial administrators object ids for this managed hsm pool. */
  initialAdminObjectIds?: string[];
  /** The URI of the managed hsm pool for performing operations on keys. */
  readonly hsmUri?: string;
  /** Property to specify whether the 'soft delete' functionality is enabled for this managed HSM pool. Soft delete is enabled by default for all managed HSMs and is immutable. */
  enableSoftDelete?: boolean;
  /** Soft deleted data retention days. When you delete an HSM or a key, it will remain recoverable for the configured retention period or for a default period of 90 days. It accepts values between 7 and 90. */
  softDeleteRetentionInDays?: number;
  /** Property specifying whether protection against purge is enabled for this managed HSM pool. Setting this property to true activates protection against purge for this managed HSM pool and its content - only the Managed HSM service may initiate a hard, irrecoverable deletion. Enabling this functionality is irreversible. */
  enablePurgeProtection?: boolean;
  /** The create mode to indicate whether the resource is being created or is being recovered from a deleted resource. */
  createMode?: CreateMode;
  /** Resource Status Message. */
  readonly statusMessage?: string;
  /** Provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Rules governing the accessibility of the key vault from specific network locations. */
  networkAcls?: MhsmNetworkRuleSet;
  /** List of all regions associated with the managed hsm pool. */
  regions?: MhsmGeoReplicatedRegion[];
  /** List of private endpoint connections associated with the managed hsm pool. */
  readonly privateEndpointConnections?: MhsmPrivateEndpointConnectionItem[];
  /** Control permission to the managed HSM from public networks. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The scheduled purge date in UTC. */
  readonly scheduledPurgeDate?: Date;
  /** Managed HSM security domain properties. */
  readonly securityDomainProperties?: ManagedHSMSecurityDomainProperties;
}

export function managedHsmPropertiesSerializer(item: ManagedHsmProperties): any {
  return {
    tenantId: item["tenantId"],
    initialAdminObjectIds: !item["initialAdminObjectIds"]
      ? item["initialAdminObjectIds"]
      : item["initialAdminObjectIds"].map((p: any) => {
          return p;
        }),
    enableSoftDelete: item["enableSoftDelete"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    enablePurgeProtection: item["enablePurgeProtection"],
    createMode: item["createMode"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : mhsmNetworkRuleSetSerializer(item["networkAcls"]),
    regions: !item["regions"]
      ? item["regions"]
      : mhsmGeoReplicatedRegionArraySerializer(item["regions"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function managedHsmPropertiesDeserializer(item: any): ManagedHsmProperties {
  return {
    tenantId: item["tenantId"],
    initialAdminObjectIds: !item["initialAdminObjectIds"]
      ? item["initialAdminObjectIds"]
      : item["initialAdminObjectIds"].map((p: any) => {
          return p;
        }),
    hsmUri: item["hsmUri"],
    enableSoftDelete: item["enableSoftDelete"],
    softDeleteRetentionInDays: item["softDeleteRetentionInDays"],
    enablePurgeProtection: item["enablePurgeProtection"],
    createMode: item["createMode"],
    statusMessage: item["statusMessage"],
    provisioningState: item["provisioningState"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : mhsmNetworkRuleSetDeserializer(item["networkAcls"]),
    regions: !item["regions"]
      ? item["regions"]
      : mhsmGeoReplicatedRegionArrayDeserializer(item["regions"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : mhsmPrivateEndpointConnectionItemArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    securityDomainProperties: !item["securityDomainProperties"]
      ? item["securityDomainProperties"]
      : managedHSMSecurityDomainPropertiesDeserializer(item["securityDomainProperties"]),
  };
}

/** Provisioning state. */
export enum KnownProvisioningState {
  /** The managed HSM Pool has been full provisioned. */
  Succeeded = "Succeeded",
  /** The managed HSM Pool is currently being provisioned. */
  Provisioning = "Provisioning",
  /** Provisioning of the managed HSM Pool has failed. */
  Failed = "Failed",
  /** The managed HSM Pool is currently being updated. */
  Updating = "Updating",
  /** The managed HSM Pool is currently being deleted. */
  Deleting = "Deleting",
  /** The managed HSM pool is ready for normal use. */
  Activated = "Activated",
  /** The managed HSM pool is waiting for a security domain restore action. */
  SecurityDomainRestore = "SecurityDomainRestore",
  /** The managed HSM pool is being restored from full HSM backup. */
  Restoring = "Restoring",
}

/**
 * Provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The managed HSM Pool has been full provisioned. \
 * **Provisioning**: The managed HSM Pool is currently being provisioned. \
 * **Failed**: Provisioning of the managed HSM Pool has failed. \
 * **Updating**: The managed HSM Pool is currently being updated. \
 * **Deleting**: The managed HSM Pool is currently being deleted. \
 * **Activated**: The managed HSM pool is ready for normal use. \
 * **SecurityDomainRestore**: The managed HSM pool is waiting for a security domain restore action. \
 * **Restoring**: The managed HSM pool is being restored from full HSM backup.
 */
export type ProvisioningState = string;

/** A set of rules governing the network accessibility of a managed hsm pool. */
export interface MhsmNetworkRuleSet {
  /** Tells what traffic can bypass network rules. This can be 'AzureServices' or 'None'.  If not specified the default is 'AzureServices'. */
  bypass?: NetworkRuleBypassOptions;
  /** The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. */
  defaultAction?: NetworkRuleAction;
  /** The list of IP address rules. */
  ipRules?: MhsmipRule[];
  /** The list of service tags. */
  serviceTags?: MhsmServiceTagRule[];
  /** The list of virtual network rules. */
  virtualNetworkRules?: MhsmVirtualNetworkRule[];
}

export function mhsmNetworkRuleSetSerializer(item: MhsmNetworkRuleSet): any {
  return {
    bypass: item["bypass"],
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : mhsmipRuleArraySerializer(item["ipRules"]),
    serviceTags: !item["serviceTags"]
      ? item["serviceTags"]
      : mhsmServiceTagRuleArraySerializer(item["serviceTags"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : mhsmVirtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
  };
}

export function mhsmNetworkRuleSetDeserializer(item: any): MhsmNetworkRuleSet {
  return {
    bypass: item["bypass"],
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : mhsmipRuleArrayDeserializer(item["ipRules"]),
    serviceTags: !item["serviceTags"]
      ? item["serviceTags"]
      : mhsmServiceTagRuleArrayDeserializer(item["serviceTags"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : mhsmVirtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
  };
}

export function mhsmipRuleArraySerializer(result: Array<MhsmipRule>): any[] {
  return result.map((item) => {
    return mhsmipRuleSerializer(item);
  });
}

export function mhsmipRuleArrayDeserializer(result: Array<MhsmipRule>): any[] {
  return result.map((item) => {
    return mhsmipRuleDeserializer(item);
  });
}

/** A rule governing the accessibility of a managed HSM pool from a specific IP address or IP range. */
export interface MhsmipRule {
  /** An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78). */
  value: string;
}

export function mhsmipRuleSerializer(item: MhsmipRule): any {
  return { value: item["value"] };
}

export function mhsmipRuleDeserializer(item: any): MhsmipRule {
  return {
    value: item["value"],
  };
}

export function mhsmServiceTagRuleArraySerializer(result: Array<MhsmServiceTagRule>): any[] {
  return result.map((item) => {
    return mhsmServiceTagRuleSerializer(item);
  });
}

export function mhsmServiceTagRuleArrayDeserializer(result: Array<MhsmServiceTagRule>): any[] {
  return result.map((item) => {
    return mhsmServiceTagRuleDeserializer(item);
  });
}

/** A rule governing the accessibility of a managed hsm pool from a specific service tags. */
export interface MhsmServiceTagRule {
  /** Name of the service tag. */
  tag: string;
}

export function mhsmServiceTagRuleSerializer(item: MhsmServiceTagRule): any {
  return { tag: item["tag"] };
}

export function mhsmServiceTagRuleDeserializer(item: any): MhsmServiceTagRule {
  return {
    tag: item["tag"],
  };
}

export function mhsmVirtualNetworkRuleArraySerializer(
  result: Array<MhsmVirtualNetworkRule>,
): any[] {
  return result.map((item) => {
    return mhsmVirtualNetworkRuleSerializer(item);
  });
}

export function mhsmVirtualNetworkRuleArrayDeserializer(
  result: Array<MhsmVirtualNetworkRule>,
): any[] {
  return result.map((item) => {
    return mhsmVirtualNetworkRuleDeserializer(item);
  });
}

/** A rule governing the accessibility of a managed hsm pool from a specific virtual network. */
export interface MhsmVirtualNetworkRule {
  /** Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'. */
  id: string;
}

export function mhsmVirtualNetworkRuleSerializer(item: MhsmVirtualNetworkRule): any {
  return { id: item["id"] };
}

export function mhsmVirtualNetworkRuleDeserializer(item: any): MhsmVirtualNetworkRule {
  return {
    id: item["id"],
  };
}

export function mhsmGeoReplicatedRegionArraySerializer(
  result: Array<MhsmGeoReplicatedRegion>,
): any[] {
  return result.map((item) => {
    return mhsmGeoReplicatedRegionSerializer(item);
  });
}

export function mhsmGeoReplicatedRegionArrayDeserializer(
  result: Array<MhsmGeoReplicatedRegion>,
): any[] {
  return result.map((item) => {
    return mhsmGeoReplicatedRegionDeserializer(item);
  });
}

/** A region that this managed HSM Pool has been extended to. */
export interface MhsmGeoReplicatedRegion {
  /** Name of the geo replicated region. */
  name?: string;
  /** Provisioning state of the geo replicated region. */
  readonly provisioningState?: GeoReplicationRegionProvisioningState;
  /** A boolean value that indicates whether the region is the primary region or a secondary region. */
  isPrimary?: boolean;
}

export function mhsmGeoReplicatedRegionSerializer(item: MhsmGeoReplicatedRegion): any {
  return { name: item["name"], isPrimary: item["isPrimary"] };
}

export function mhsmGeoReplicatedRegionDeserializer(item: any): MhsmGeoReplicatedRegion {
  return {
    name: item["name"],
    provisioningState: item["provisioningState"],
    isPrimary: item["isPrimary"],
  };
}

/** The current provisioning state. */
export enum KnownGeoReplicationRegionProvisioningState {
  /** Preprovisioning */
  Preprovisioning = "Preprovisioning",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Cleanup */
  Cleanup = "Cleanup",
}

/**
 * The current provisioning state. \
 * {@link KnownGeoReplicationRegionProvisioningState} can be used interchangeably with GeoReplicationRegionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preprovisioning** \
 * **Provisioning** \
 * **Succeeded** \
 * **Failed** \
 * **Deleting** \
 * **Cleanup**
 */
export type GeoReplicationRegionProvisioningState = string;

export function mhsmPrivateEndpointConnectionItemArrayDeserializer(
  result: Array<MhsmPrivateEndpointConnectionItem>,
): any[] {
  return result.map((item) => {
    return mhsmPrivateEndpointConnectionItemDeserializer(item);
  });
}

/** Private endpoint connection item. */
export interface MhsmPrivateEndpointConnectionItem {
  /** Id of private endpoint connection. */
  id?: string;
  /** Modified whenever there is a change in the state of private endpoint connection. */
  etag?: string;
  /** Private endpoint connection properties. */
  properties?: MhsmPrivateEndpointConnectionProperties;
}

export function mhsmPrivateEndpointConnectionItemDeserializer(
  item: any,
): MhsmPrivateEndpointConnectionItem {
  return {
    id: item["id"],
    etag: item["etag"],
    properties: !item["properties"]
      ? item["properties"]
      : mhsmPrivateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the private endpoint connection resource. */
export interface MhsmPrivateEndpointConnectionProperties {
  /** Properties of the private endpoint object. */
  privateEndpoint?: MhsmPrivateEndpoint;
  /** Approval state of the private link connection. */
  privateLinkServiceConnectionState?: MhsmPrivateLinkServiceConnectionState;
  /** Provisioning state of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function mhsmPrivateEndpointConnectionPropertiesSerializer(
  item: MhsmPrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : mhsmPrivateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : mhsmPrivateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function mhsmPrivateEndpointConnectionPropertiesDeserializer(
  item: any,
): MhsmPrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : mhsmPrivateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : mhsmPrivateLinkServiceConnectionStateDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

/** Private endpoint object properties. */
export interface MhsmPrivateEndpoint {
  /** Full identifier of the private endpoint resource. */
  readonly id?: string;
}

export function mhsmPrivateEndpointSerializer(item: MhsmPrivateEndpoint): any {
  return item;
}

export function mhsmPrivateEndpointDeserializer(item: any): MhsmPrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** An object that represents the approval state of the private link connection. */
export interface MhsmPrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been approved, rejected or removed by the key vault owner. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval or rejection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: ActionsRequired;
}

export function mhsmPrivateLinkServiceConnectionStateSerializer(
  item: MhsmPrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function mhsmPrivateLinkServiceConnectionStateDeserializer(
  item: any,
): MhsmPrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Control permission to the managed HSM from public networks. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Control permission to the managed HSM from public networks. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** The security domain properties of the managed hsm. */
export interface ManagedHSMSecurityDomainProperties {
  /** Activation Status */
  readonly activationStatus?: ActivationStatus;
  /** Activation Status Message. */
  readonly activationStatusMessage?: string;
}

export function managedHSMSecurityDomainPropertiesDeserializer(
  item: any,
): ManagedHSMSecurityDomainProperties {
  return {
    activationStatus: item["activationStatus"],
    activationStatusMessage: item["activationStatusMessage"],
  };
}

/** Activation Status */
export enum KnownActivationStatus {
  /** The managed HSM Pool is active. */
  Active = "Active",
  /** The managed HSM Pool is not yet activated. */
  NotActivated = "NotActivated",
  /** An unknown error occurred while activating managed hsm. */
  Unknown = "Unknown",
  /** Failed to activate managed hsm. */
  Failed = "Failed",
}

/**
 * Activation Status \
 * {@link KnownActivationStatus} can be used interchangeably with ActivationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The managed HSM Pool is active. \
 * **NotActivated**: The managed HSM Pool is not yet activated. \
 * **Unknown**: An unknown error occurred while activating managed hsm. \
 * **Failed**: Failed to activate managed hsm.
 */
export type ActivationStatus = string;

/** SKU details */
export interface ManagedHsmSku {
  /** SKU Family of the managed HSM Pool */
  family: ManagedHsmSkuFamily;
  /** SKU of the managed HSM Pool */
  name: ManagedHsmSkuName;
}

export function managedHsmSkuSerializer(item: ManagedHsmSku): any {
  return { family: item["family"], name: item["name"] };
}

export function managedHsmSkuDeserializer(item: any): ManagedHsmSku {
  return {
    family: item["family"],
    name: item["name"],
  };
}

/** SKU Family of the managed HSM Pool */
export enum KnownManagedHsmSkuFamily {
  /** B */
  B = "B",
  /** C */
  C = "C",
}

/**
 * SKU Family of the managed HSM Pool \
 * {@link KnownManagedHsmSkuFamily} can be used interchangeably with ManagedHsmSkuFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **B** \
 * **C**
 */
export type ManagedHsmSkuFamily = string;
/** SKU of the managed HSM Pool */
export type ManagedHsmSkuName =
  | "Standard_B1"
  | "Custom_B32"
  | "Custom_B6"
  | "Custom_C42"
  | "Custom_C10";

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The error exception. */
export interface ManagedHsmError {
  /** The server error. */
  readonly error?: ErrorModel;
}

export function managedHsmErrorDeserializer(item: any): ManagedHsmError {
  return {
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
  };
}

/** The server error. */
export interface ErrorModel {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The inner error, contains a more specific error code. */
  readonly innerError?: ErrorModel;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    message: item["message"],
    innerError: !item["innererror"] ? item["innererror"] : errorDeserializer(item["innererror"]),
  };
}

/** The response of a ManagedHsm list operation. */
export interface _ManagedHsmListResult {
  /** The ManagedHsm items on this page */
  value: ManagedHsm[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedHsmListResultDeserializer(item: any): _ManagedHsmListResult {
  return {
    value: managedHsmArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedHsmArraySerializer(result: Array<ManagedHsm>): any[] {
  return result.map((item) => {
    return managedHsmSerializer(item);
  });
}

export function managedHsmArrayDeserializer(result: Array<ManagedHsm>): any[] {
  return result.map((item) => {
    return managedHsmDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface DeletedManagedHsm extends ProxyResource {
  /** Properties of the deleted managed HSM */
  properties?: DeletedManagedHsmProperties;
}

export function deletedManagedHsmDeserializer(item: any): DeletedManagedHsm {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deletedManagedHsmPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the deleted managed HSM. */
export interface DeletedManagedHsmProperties {
  /** The resource id of the original managed HSM. */
  readonly mhsmId?: string;
  /** The location of the original managed HSM. */
  readonly location?: string;
  /** The deleted date. */
  readonly deletionDate?: Date;
  /** The scheduled purged date. */
  readonly scheduledPurgeDate?: Date;
  /** Purge protection status of the original managed HSM. */
  readonly purgeProtectionEnabled?: boolean;
  /** Tags of the original managed HSM. */
  readonly tags?: Record<string, string>;
}

export function deletedManagedHsmPropertiesDeserializer(item: any): DeletedManagedHsmProperties {
  return {
    mhsmId: item["mhsmId"],
    location: item["location"],
    deletionDate: !item["deletionDate"] ? item["deletionDate"] : new Date(item["deletionDate"]),
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"]),
    purgeProtectionEnabled: item["purgeProtectionEnabled"],
    tags: item["tags"],
  };
}

/** The response of a DeletedManagedHsm list operation. */
export interface _DeletedManagedHsmListResult {
  /** The DeletedManagedHsm items on this page */
  value: DeletedManagedHsm[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedManagedHsmListResultDeserializer(item: any): _DeletedManagedHsmListResult {
  return {
    value: deletedManagedHsmArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedManagedHsmArrayDeserializer(result: Array<DeletedManagedHsm>): any[] {
  return result.map((item) => {
    return deletedManagedHsmDeserializer(item);
  });
}

/** The parameters used to check the availability of the managed hsm name. */
export interface CheckMhsmNameAvailabilityParameters {
  /** The managed hsm name. */
  name: string;
}

export function checkMhsmNameAvailabilityParametersSerializer(
  item: CheckMhsmNameAvailabilityParameters,
): any {
  return { name: item["name"] };
}

/** The CheckMhsmNameAvailability operation response. */
export interface CheckMhsmNameAvailabilityResult {
  /** A boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or is invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** The reason that a managed hsm name could not be used. The reason element is only returned if NameAvailable is false. */
  readonly reason?: Reason;
  /** An error message explaining the Reason value in more detail. */
  readonly message?: string;
}

export function checkMhsmNameAvailabilityResultDeserializer(
  item: any,
): CheckMhsmNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Resource information with extended details. */
export interface Secret extends ProxyResource {
  /** Properties of the secret */
  properties: SecretProperties;
  /** Azure location of the key vault resource. */
  readonly location?: string;
  /** Tags assigned to the key vault resource. */
  readonly tags?: Record<string, string>;
}

export function secretDeserializer(item: any): Secret {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: secretPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** Properties of the secret */
export interface SecretProperties {
  /** The value of the secret. NOTE: 'value' will never be returned from the service, as APIs using this model are is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. */
  value?: string;
  /** The content type of the secret. */
  contentType?: string;
  /** The attributes of the secret. */
  attributes?: SecretAttributes;
  /** The URI to retrieve the current version of the secret. */
  readonly secretUri?: string;
  /** The URI to retrieve the specific version of the secret. */
  readonly secretUriWithVersion?: string;
}

export function secretPropertiesSerializer(item: SecretProperties): any {
  return {
    value: item["value"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesSerializer(item["attributes"]),
  };
}

export function secretPropertiesDeserializer(item: any): SecretProperties {
  return {
    value: item["value"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesDeserializer(item["attributes"]),
    secretUri: item["secretUri"],
    secretUriWithVersion: item["secretUriWithVersion"],
  };
}

/** The secret management attributes. */
export interface SecretAttributes extends Attributes {}

export function secretAttributesSerializer(item: SecretAttributes): any {
  return {
    enabled: item["enabled"],
    nbf: !item["notBefore"] ? item["notBefore"] : (item["notBefore"].getTime() / 1000) | 0,
    exp: !item["expires"] ? item["expires"] : (item["expires"].getTime() / 1000) | 0,
  };
}

export function secretAttributesDeserializer(item: any): SecretAttributes {
  return {
    enabled: item["enabled"],
    notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),
    expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),
    created: !item["created"] ? item["created"] : new Date(item["created"] * 1000),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"] * 1000),
  };
}

/** The object attributes managed by the KeyVault service. */
export interface Attributes {
  /** Determines whether the object is enabled. */
  enabled?: boolean;
  /** Not before date in seconds since 1970-01-01T00:00:00Z. */
  notBefore?: Date;
  /** Expiry date in seconds since 1970-01-01T00:00:00Z. */
  expires?: Date;
  /** Creation time in seconds since 1970-01-01T00:00:00Z. */
  readonly created?: Date;
  /** Last updated time in seconds since 1970-01-01T00:00:00Z. */
  readonly updated?: Date;
}

export function attributesSerializer(item: Attributes): any {
  return {
    enabled: item["enabled"],
    nbf: !item["notBefore"] ? item["notBefore"] : (item["notBefore"].getTime() / 1000) | 0,
    exp: !item["expires"] ? item["expires"] : (item["expires"].getTime() / 1000) | 0,
  };
}

export function attributesDeserializer(item: any): Attributes {
  return {
    enabled: item["enabled"],
    notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),
    expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),
    created: !item["created"] ? item["created"] : new Date(item["created"] * 1000),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"] * 1000),
  };
}

/** Parameters for creating or updating a secret */
export interface SecretCreateOrUpdateParameters {
  /** The tags that will be assigned to the secret. */
  tags?: Record<string, string>;
  /** Properties of the secret */
  properties: SecretProperties;
}

export function secretCreateOrUpdateParametersSerializer(
  item: SecretCreateOrUpdateParameters,
): any {
  return {
    tags: item["tags"],
    properties: secretPropertiesSerializer(item["properties"]),
  };
}

/** Parameters for patching a secret */
export interface SecretPatchParameters {
  /** The tags that will be assigned to the secret. */
  tags?: Record<string, string>;
  /** Properties of the secret */
  properties?: SecretPatchProperties;
}

export function secretPatchParametersSerializer(item: SecretPatchParameters): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : secretPatchPropertiesSerializer(item["properties"]),
  };
}

/** Properties of the secret */
export interface SecretPatchProperties {
  /** The value of the secret. */
  value?: string;
  /** The content type of the secret. */
  contentType?: string;
  /** The attributes of the secret. */
  attributes?: SecretAttributes;
}

export function secretPatchPropertiesSerializer(item: SecretPatchProperties): any {
  return {
    value: item["value"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesSerializer(item["attributes"]),
  };
}

/** The response of a Secret list operation. */
export interface _SecretListResult {
  /** The Secret items on this page */
  value: Secret[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _secretListResultDeserializer(item: any): _SecretListResult {
  return {
    value: secretArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secretArrayDeserializer(result: Array<Secret>): any[] {
  return result.map((item) => {
    return secretDeserializer(item);
  });
}

/** The key resource. */
export interface Key extends ProxyResource {
  /** The properties of the key. */
  properties: KeyProperties;
  /** The supported Azure location where the managed HSM Pool should be created. */
  readonly location?: string;
  /** Resource tags */
  readonly tags?: Record<string, string>;
}

export function keyDeserializer(item: any): Key {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: keyPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** The properties of the key. */
export interface KeyProperties {
  /** The attributes of the key. */
  attributes?: KeyAttributes;
  /** The type of the key. For valid values, see JsonWebKeyType. */
  kty?: JsonWebKeyType;
  keyOps?: JsonWebKeyOperation[];
  /** The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096. */
  keySize?: number;
  /** The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256 */
  curveName?: JsonWebKeyCurveName;
  /** The URI to retrieve the current version of the key. */
  readonly keyUri?: string;
  /** The URI to retrieve the specific version of the key. */
  readonly keyUriWithVersion?: string;
  /** Key rotation policy in response. It will be used for both output and input. Omitted if empty */
  rotationPolicy?: RotationPolicy;
  /** Key release policy in response. It will be used for both output and input. Omitted if empty */
  releasePolicy?: KeyReleasePolicy;
}

export function keyPropertiesSerializer(item: KeyProperties): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyAttributesSerializer(item["attributes"]),
    kty: item["kty"],
    keyOps: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    keySize: item["keySize"],
    curveName: item["curveName"],
    rotationPolicy: !item["rotationPolicy"]
      ? item["rotationPolicy"]
      : rotationPolicySerializer(item["rotationPolicy"]),
    release_policy: !item["releasePolicy"]
      ? item["releasePolicy"]
      : keyReleasePolicySerializer(item["releasePolicy"]),
  };
}

export function keyPropertiesDeserializer(item: any): KeyProperties {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyAttributesDeserializer(item["attributes"]),
    kty: item["kty"],
    keyOps: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    keySize: item["keySize"],
    curveName: item["curveName"],
    keyUri: item["keyUri"],
    keyUriWithVersion: item["keyUriWithVersion"],
    rotationPolicy: !item["rotationPolicy"]
      ? item["rotationPolicy"]
      : rotationPolicyDeserializer(item["rotationPolicy"]),
    releasePolicy: !item["release_policy"]
      ? item["release_policy"]
      : keyReleasePolicyDeserializer(item["release_policy"]),
  };
}

/** The object attributes managed by the Azure Key Vault service. */
export interface KeyAttributes {
  /** Determines whether or not the object is enabled. */
  enabled?: boolean;
  /** Not before date in seconds since 1970-01-01T00:00:00Z. */
  notBefore?: number;
  /** Expiry date in seconds since 1970-01-01T00:00:00Z. */
  expires?: number;
  /** Creation time in seconds since 1970-01-01T00:00:00Z. */
  readonly created?: number;
  /** Last updated time in seconds since 1970-01-01T00:00:00Z. */
  readonly updated?: number;
  /** The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval. */
  readonly recoveryLevel?: DeletionRecoveryLevel;
  /** Indicates if the private key can be exported. */
  exportable?: boolean;
}

export function keyAttributesSerializer(item: KeyAttributes): any {
  return {
    enabled: item["enabled"],
    nbf: item["notBefore"],
    exp: item["expires"],
    exportable: item["exportable"],
  };
}

export function keyAttributesDeserializer(item: any): KeyAttributes {
  return {
    enabled: item["enabled"],
    notBefore: item["nbf"],
    expires: item["exp"],
    created: item["created"],
    updated: item["updated"],
    recoveryLevel: item["recoveryLevel"],
    exportable: item["exportable"],
  };
}

/** The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval. */
export enum KnownDeletionRecoveryLevel {
  /** Purgeable */
  Purgeable = "Purgeable",
  /** Recoverable+Purgeable */
  RecoverablePurgeable = "Recoverable+Purgeable",
  /** Recoverable */
  Recoverable = "Recoverable",
  /** Recoverable+ProtectedSubscription */
  RecoverableProtectedSubscription = "Recoverable+ProtectedSubscription",
}

/**
 * The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval. \
 * {@link KnownDeletionRecoveryLevel} can be used interchangeably with DeletionRecoveryLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Purgeable** \
 * **Recoverable+Purgeable** \
 * **Recoverable** \
 * **Recoverable+ProtectedSubscription**
 */
export type DeletionRecoveryLevel = string;

/** The type of the key. For valid values, see JsonWebKeyType. */
export enum KnownJsonWebKeyType {
  /** EC */
  EC = "EC",
  /** EC-HSM */
  ECHSM = "EC-HSM",
  /** RSA */
  RSA = "RSA",
  /** RSA-HSM */
  RSAHSM = "RSA-HSM",
}

/**
 * The type of the key. For valid values, see JsonWebKeyType. \
 * {@link KnownJsonWebKeyType} can be used interchangeably with JsonWebKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EC** \
 * **EC-HSM** \
 * **RSA** \
 * **RSA-HSM**
 */
export type JsonWebKeyType = string;

/** The permitted JSON web key operations of the key. For more information, see JsonWebKeyOperation. */
export enum KnownJsonWebKeyOperation {
  /** encrypt */
  Encrypt = "encrypt",
  /** decrypt */
  Decrypt = "decrypt",
  /** sign */
  Sign = "sign",
  /** verify */
  Verify = "verify",
  /** wrapKey */
  WrapKey = "wrapKey",
  /** unwrapKey */
  UnwrapKey = "unwrapKey",
  /** import */
  Import = "import",
  /** release */
  Release = "release",
}

/**
 * The permitted JSON web key operations of the key. For more information, see JsonWebKeyOperation. \
 * {@link KnownJsonWebKeyOperation} can be used interchangeably with JsonWebKeyOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **encrypt** \
 * **decrypt** \
 * **sign** \
 * **verify** \
 * **wrapKey** \
 * **unwrapKey** \
 * **import** \
 * **release**
 */
export type JsonWebKeyOperation = string;

/** The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256 */
export enum KnownJsonWebKeyCurveName {
  /** P-256 */
  P256 = "P-256",
  /** P-384 */
  P384 = "P-384",
  /** P-521 */
  P521 = "P-521",
  /** P-256K */
  P256K = "P-256K",
}

/**
 * The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256 \
 * {@link KnownJsonWebKeyCurveName} can be used interchangeably with JsonWebKeyCurveName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P-256** \
 * **P-384** \
 * **P-521** \
 * **P-256K**
 */
export type JsonWebKeyCurveName = string;

/** model interface RotationPolicy */
export interface RotationPolicy {
  /** The attributes of key rotation policy. */
  attributes?: KeyRotationPolicyAttributes;
  /** The lifetimeActions for key rotation action. */
  lifetimeActions?: LifetimeAction[];
}

export function rotationPolicySerializer(item: RotationPolicy): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyRotationPolicyAttributesSerializer(item["attributes"]),
    lifetimeActions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : lifetimeActionArraySerializer(item["lifetimeActions"]),
  };
}

export function rotationPolicyDeserializer(item: any): RotationPolicy {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : keyRotationPolicyAttributesDeserializer(item["attributes"]),
    lifetimeActions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : lifetimeActionArrayDeserializer(item["lifetimeActions"]),
  };
}

/** model interface KeyRotationPolicyAttributes */
export interface KeyRotationPolicyAttributes {
  /** Creation time in seconds since 1970-01-01T00:00:00Z. */
  readonly created?: number;
  /** Last updated time in seconds since 1970-01-01T00:00:00Z. */
  readonly updated?: number;
  /** The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'. */
  expiryTime?: string;
}

export function keyRotationPolicyAttributesSerializer(item: KeyRotationPolicyAttributes): any {
  return { expiryTime: item["expiryTime"] };
}

export function keyRotationPolicyAttributesDeserializer(item: any): KeyRotationPolicyAttributes {
  return {
    created: item["created"],
    updated: item["updated"],
    expiryTime: item["expiryTime"],
  };
}

export function lifetimeActionArraySerializer(result: Array<LifetimeAction>): any[] {
  return result.map((item) => {
    return lifetimeActionSerializer(item);
  });
}

export function lifetimeActionArrayDeserializer(result: Array<LifetimeAction>): any[] {
  return result.map((item) => {
    return lifetimeActionDeserializer(item);
  });
}

/** model interface LifetimeAction */
export interface LifetimeAction {
  /** The trigger of key rotation policy lifetimeAction. */
  trigger?: Trigger;
  /** The action of key rotation policy lifetimeAction. */
  action?: Action;
}

export function lifetimeActionSerializer(item: LifetimeAction): any {
  return {
    trigger: !item["trigger"] ? item["trigger"] : triggerSerializer(item["trigger"]),
    action: !item["action"] ? item["action"] : actionSerializer(item["action"]),
  };
}

export function lifetimeActionDeserializer(item: any): LifetimeAction {
  return {
    trigger: !item["trigger"] ? item["trigger"] : triggerDeserializer(item["trigger"]),
    action: !item["action"] ? item["action"] : actionDeserializer(item["action"]),
  };
}

/** model interface Trigger */
export interface Trigger {
  /** The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'. */
  timeAfterCreate?: string;
  /** The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'. */
  timeBeforeExpiry?: string;
}

export function triggerSerializer(item: Trigger): any {
  return {
    timeAfterCreate: item["timeAfterCreate"],
    timeBeforeExpiry: item["timeBeforeExpiry"],
  };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    timeAfterCreate: item["timeAfterCreate"],
    timeBeforeExpiry: item["timeBeforeExpiry"],
  };
}

/** model interface Action */
export interface Action {
  /** The type of action. */
  type?: KeyRotationPolicyActionType;
}

export function actionSerializer(item: Action): any {
  return { type: item["type"] };
}

export function actionDeserializer(item: any): Action {
  return {
    type: item["type"],
  };
}

/** The type of action. */
export type KeyRotationPolicyActionType = "rotate" | "notify";

/** model interface KeyReleasePolicy */
export interface KeyReleasePolicy {
  /** Content type and version of key release policy */
  contentType?: string;
  /** Blob encoding the policy rules under which the key can be released. */
  data?: Uint8Array;
}

export function keyReleasePolicySerializer(item: KeyReleasePolicy): any {
  return {
    contentType: item["contentType"],
    data: !item["data"] ? item["data"] : uint8ArrayToString(item["data"], "base64url"),
  };
}

export function keyReleasePolicyDeserializer(item: any): KeyReleasePolicy {
  return {
    contentType: item["contentType"],
    data: !item["data"]
      ? item["data"]
      : typeof item["data"] === "string"
        ? stringToUint8Array(item["data"], "base64url")
        : item["data"],
  };
}

/** The parameters used to create a key. */
export interface KeyCreateParameters {
  /** The tags that will be assigned to the key. */
  tags?: Record<string, string>;
  /** The properties of the key to be created. */
  properties: KeyProperties;
}

export function keyCreateParametersSerializer(item: KeyCreateParameters): any {
  return {
    tags: item["tags"],
    properties: keyPropertiesSerializer(item["properties"]),
  };
}

/** The response of a Key list operation. */
export interface _KeyListResult {
  /** The Key items on this page */
  value: Key[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _keyListResultDeserializer(item: any): _KeyListResult {
  return {
    value: keyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function keyArrayDeserializer(result: Array<Key>): any[] {
  return result.map((item) => {
    return keyDeserializer(item);
  });
}

/** The key resource. */
export interface ManagedHsmKey extends ProxyResource {
  /** The properties of the key. */
  properties: ManagedHsmKeyProperties;
  /** Resource tags */
  tags?: Record<string, string>;
}

export function managedHsmKeyDeserializer(item: any): ManagedHsmKey {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: managedHsmKeyPropertiesDeserializer(item["properties"]),
    tags: item["tags"],
  };
}

/** The properties of the key. */
export interface ManagedHsmKeyProperties {
  /** The attributes of the key. */
  attributes?: ManagedHsmKeyAttributes;
  /** The type of the key. For valid values, see JsonWebKeyType. */
  kty?: JsonWebKeyType;
  keyOps?: JsonWebKeyOperation[];
  /** The key size in bits. For example: 2048, 3072, or 4096 for RSA. Default for RSA and RSA-HSM keys is 2048. Exception made for bring your own key (BYOK), key exchange keys default to 4096. */
  keySize?: number;
  /** The elliptic curve name. For valid values, see JsonWebKeyCurveName. Default for EC and EC-HSM keys is P-256 */
  curveName?: JsonWebKeyCurveName;
  /** The URI to retrieve the current version of the key. */
  readonly keyUri?: string;
  /** The URI to retrieve the specific version of the key. */
  readonly keyUriWithVersion?: string;
  /** Key rotation policy in response. It will be used for both output and input. Omitted if empty */
  rotationPolicy?: ManagedHsmRotationPolicy;
  /** Key release policy in response. It will be used for both output and input. Omitted if empty */
  releasePolicy?: ManagedHsmKeyReleasePolicy;
}

export function managedHsmKeyPropertiesSerializer(item: ManagedHsmKeyProperties): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : managedHsmKeyAttributesSerializer(item["attributes"]),
    kty: item["kty"],
    keyOps: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    keySize: item["keySize"],
    curveName: item["curveName"],
    rotationPolicy: !item["rotationPolicy"]
      ? item["rotationPolicy"]
      : managedHsmRotationPolicySerializer(item["rotationPolicy"]),
    release_policy: !item["releasePolicy"]
      ? item["releasePolicy"]
      : managedHsmKeyReleasePolicySerializer(item["releasePolicy"]),
  };
}

export function managedHsmKeyPropertiesDeserializer(item: any): ManagedHsmKeyProperties {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : managedHsmKeyAttributesDeserializer(item["attributes"]),
    kty: item["kty"],
    keyOps: !item["keyOps"]
      ? item["keyOps"]
      : item["keyOps"].map((p: any) => {
          return p;
        }),
    keySize: item["keySize"],
    curveName: item["curveName"],
    keyUri: item["keyUri"],
    keyUriWithVersion: item["keyUriWithVersion"],
    rotationPolicy: !item["rotationPolicy"]
      ? item["rotationPolicy"]
      : managedHsmRotationPolicyDeserializer(item["rotationPolicy"]),
    releasePolicy: !item["release_policy"]
      ? item["release_policy"]
      : managedHsmKeyReleasePolicyDeserializer(item["release_policy"]),
  };
}

/** The object attributes managed by the Azure Key Vault service. */
export interface ManagedHsmKeyAttributes {
  /** Determines whether or not the object is enabled. */
  enabled?: boolean;
  /** Not before date in seconds since 1970-01-01T00:00:00Z. */
  notBefore?: number;
  /** Expiry date in seconds since 1970-01-01T00:00:00Z. */
  expires?: number;
  /** Creation time in seconds since 1970-01-01T00:00:00Z. */
  readonly created?: number;
  /** Last updated time in seconds since 1970-01-01T00:00:00Z. */
  readonly updated?: number;
  /** The deletion recovery level currently in effect for the object. If it contains 'Purgeable', then the object can be permanently deleted by a privileged user; otherwise, only the system can purge the object at the end of the retention interval. */
  readonly recoveryLevel?: DeletionRecoveryLevel;
  /** Indicates if the private key can be exported. */
  exportable?: boolean;
}

export function managedHsmKeyAttributesSerializer(item: ManagedHsmKeyAttributes): any {
  return {
    enabled: item["enabled"],
    nbf: item["notBefore"],
    exp: item["expires"],
    exportable: item["exportable"],
  };
}

export function managedHsmKeyAttributesDeserializer(item: any): ManagedHsmKeyAttributes {
  return {
    enabled: item["enabled"],
    notBefore: item["nbf"],
    expires: item["exp"],
    created: item["created"],
    updated: item["updated"],
    recoveryLevel: item["recoveryLevel"],
    exportable: item["exportable"],
  };
}

/** model interface ManagedHsmRotationPolicy */
export interface ManagedHsmRotationPolicy {
  /** The attributes of key rotation policy. */
  attributes?: ManagedHsmKeyRotationPolicyAttributes;
  /** The lifetimeActions for key rotation action. */
  lifetimeActions?: ManagedHsmLifetimeAction[];
}

export function managedHsmRotationPolicySerializer(item: ManagedHsmRotationPolicy): any {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : managedHsmKeyRotationPolicyAttributesSerializer(item["attributes"]),
    lifetimeActions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : managedHsmLifetimeActionArraySerializer(item["lifetimeActions"]),
  };
}

export function managedHsmRotationPolicyDeserializer(item: any): ManagedHsmRotationPolicy {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : managedHsmKeyRotationPolicyAttributesDeserializer(item["attributes"]),
    lifetimeActions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : managedHsmLifetimeActionArrayDeserializer(item["lifetimeActions"]),
  };
}

/** model interface ManagedHsmKeyRotationPolicyAttributes */
export interface ManagedHsmKeyRotationPolicyAttributes {
  /** Creation time in seconds since 1970-01-01T00:00:00Z. */
  readonly created?: number;
  /** Last updated time in seconds since 1970-01-01T00:00:00Z. */
  readonly updated?: number;
  /** The expiration time for the new key version. It should be in ISO8601 format. Eg: 'P90D', 'P1Y'. */
  expiryTime?: string;
}

export function managedHsmKeyRotationPolicyAttributesSerializer(
  item: ManagedHsmKeyRotationPolicyAttributes,
): any {
  return { expiryTime: item["expiryTime"] };
}

export function managedHsmKeyRotationPolicyAttributesDeserializer(
  item: any,
): ManagedHsmKeyRotationPolicyAttributes {
  return {
    created: item["created"],
    updated: item["updated"],
    expiryTime: item["expiryTime"],
  };
}

export function managedHsmLifetimeActionArraySerializer(
  result: Array<ManagedHsmLifetimeAction>,
): any[] {
  return result.map((item) => {
    return managedHsmLifetimeActionSerializer(item);
  });
}

export function managedHsmLifetimeActionArrayDeserializer(
  result: Array<ManagedHsmLifetimeAction>,
): any[] {
  return result.map((item) => {
    return managedHsmLifetimeActionDeserializer(item);
  });
}

/** model interface ManagedHsmLifetimeAction */
export interface ManagedHsmLifetimeAction {
  /** The trigger of key rotation policy lifetimeAction. */
  trigger?: ManagedHsmTrigger;
  /** The action of key rotation policy lifetimeAction. */
  action?: ManagedHsmAction;
}

export function managedHsmLifetimeActionSerializer(item: ManagedHsmLifetimeAction): any {
  return {
    trigger: !item["trigger"] ? item["trigger"] : managedHsmTriggerSerializer(item["trigger"]),
    action: !item["action"] ? item["action"] : managedHsmActionSerializer(item["action"]),
  };
}

export function managedHsmLifetimeActionDeserializer(item: any): ManagedHsmLifetimeAction {
  return {
    trigger: !item["trigger"] ? item["trigger"] : managedHsmTriggerDeserializer(item["trigger"]),
    action: !item["action"] ? item["action"] : managedHsmActionDeserializer(item["action"]),
  };
}

/** model interface ManagedHsmTrigger */
export interface ManagedHsmTrigger {
  /** The time duration after key creation to rotate the key. It only applies to rotate. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'. */
  timeAfterCreate?: string;
  /** The time duration before key expiring to rotate or notify. It will be in ISO 8601 duration format. Eg: 'P90D', 'P1Y'. */
  timeBeforeExpiry?: string;
}

export function managedHsmTriggerSerializer(item: ManagedHsmTrigger): any {
  return {
    timeAfterCreate: item["timeAfterCreate"],
    timeBeforeExpiry: item["timeBeforeExpiry"],
  };
}

export function managedHsmTriggerDeserializer(item: any): ManagedHsmTrigger {
  return {
    timeAfterCreate: item["timeAfterCreate"],
    timeBeforeExpiry: item["timeBeforeExpiry"],
  };
}

/** model interface ManagedHsmAction */
export interface ManagedHsmAction {
  /** The type of action. */
  type?: KeyRotationPolicyActionType;
}

export function managedHsmActionSerializer(item: ManagedHsmAction): any {
  return { type: item["type"] };
}

export function managedHsmActionDeserializer(item: any): ManagedHsmAction {
  return {
    type: item["type"],
  };
}

/** model interface ManagedHsmKeyReleasePolicy */
export interface ManagedHsmKeyReleasePolicy {
  /** Content type and version of key release policy */
  contentType?: string;
  /** Blob encoding the policy rules under which the key can be released. */
  data?: Uint8Array;
}

export function managedHsmKeyReleasePolicySerializer(item: ManagedHsmKeyReleasePolicy): any {
  return {
    contentType: item["contentType"],
    data: !item["data"] ? item["data"] : uint8ArrayToString(item["data"], "base64url"),
  };
}

export function managedHsmKeyReleasePolicyDeserializer(item: any): ManagedHsmKeyReleasePolicy {
  return {
    contentType: item["contentType"],
    data: !item["data"]
      ? item["data"]
      : typeof item["data"] === "string"
        ? stringToUint8Array(item["data"], "base64url")
        : item["data"],
  };
}

/** The parameters used to create a key. */
export interface ManagedHsmKeyCreateParameters {
  /** The tags that will be assigned to the key. */
  tags?: Record<string, string>;
  /** The properties of the key to be created. */
  properties: ManagedHsmKeyProperties;
}

export function managedHsmKeyCreateParametersSerializer(item: ManagedHsmKeyCreateParameters): any {
  return {
    tags: item["tags"],
    properties: managedHsmKeyPropertiesSerializer(item["properties"]),
  };
}

/** The response of a ManagedHsmKey list operation. */
export interface _ManagedHsmKeyListResult {
  /** The ManagedHsmKey items on this page */
  value: ManagedHsmKey[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedHsmKeyListResultDeserializer(item: any): _ManagedHsmKeyListResult {
  return {
    value: managedHsmKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedHsmKeyArrayDeserializer(result: Array<ManagedHsmKey>): any[] {
  return result.map((item) => {
    return managedHsmKeyDeserializer(item);
  });
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
  /** Azure location of the key vault resource. */
  readonly location?: string;
  /** Tags assigned to the key vault resource. */
  readonly tags?: Record<string, string>;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** Group identifier of private link resource. */
  readonly groupId?: string;
  /** Required member names of private link resource. */
  readonly requiredMembers?: string[];
  /** Required DNS zone names of the the private link resource. */
  requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** A list of private link resources */
export interface MhsmPrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: MhsmPrivateLinkResource[];
}

export function mhsmPrivateLinkResourceListResultDeserializer(
  item: any,
): MhsmPrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : mhsmPrivateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function mhsmPrivateLinkResourceArrayDeserializer(
  result: Array<MhsmPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return mhsmPrivateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface MhsmPrivateLinkResource extends ManagedHsmResource {
  /** Resource properties. */
  properties?: MhsmPrivateLinkResourceProperties;
}

export function mhsmPrivateLinkResourceDeserializer(item: any): MhsmPrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : managedHsmSkuDeserializer(item["sku"]),
    tags: item["tags"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : mhsmPrivateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface MhsmPrivateLinkResourceProperties {
  /** Group identifier of private link resource. */
  readonly groupId?: string;
  /** Required member names of private link resource. */
  readonly requiredMembers?: string[];
  /** Required DNS zone names of the the private link resource. */
  requiredZoneNames?: string[];
}

export function mhsmPrivateLinkResourcePropertiesDeserializer(
  item: any,
): MhsmPrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Managed HSM resource */
export interface ManagedHsmResource {
  /** The Azure Resource Manager resource ID for the managed HSM Pool. */
  readonly id?: string;
  /** The name of the managed HSM Pool. */
  readonly name?: string;
  /** The resource type of the managed HSM Pool. */
  readonly type?: string;
  /** The supported Azure location where the managed HSM Pool should be created. */
  location?: string;
  /** SKU details */
  sku?: ManagedHsmSku;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Metadata pertaining to creation and last modification of the key vault resource. */
  readonly systemData?: SystemData;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
}

export function managedHsmResourceDeserializer(item: any): ManagedHsmResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : managedHsmSkuDeserializer(item["sku"]),
    tags: item["tags"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** List of regions associated with a managed HSM Pools */
export interface _MhsmRegionsListResult {
  /** The MhsmGeoReplicatedRegion items on this page */
  value: MhsmGeoReplicatedRegion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mhsmRegionsListResultDeserializer(item: any): _MhsmRegionsListResult {
  return {
    value: mhsmGeoReplicatedRegionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Private endpoint connection resource. */
export interface MhsmPrivateEndpointConnection extends Resource {
  /** Resource properties. */
  properties?: MhsmPrivateEndpointConnectionProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** SKU details */
  sku?: ManagedHsmSku;
  /** Managed service identity */
  identity?: ManagedServiceIdentity;
  /** Modified whenever there is a change in the state of private endpoint connection. */
  etag?: string;
}

export function mhsmPrivateEndpointConnectionSerializer(item: MhsmPrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : mhsmPrivateEndpointConnectionPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : managedHsmSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    etag: item["etag"],
  };
}

export function mhsmPrivateEndpointConnectionDeserializer(
  item: any,
): MhsmPrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : mhsmPrivateEndpointConnectionPropertiesDeserializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : managedHsmSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** List of private endpoint connections associated with a managed HSM Pools */
export interface _MhsmPrivateEndpointConnectionsListResult {
  /** The MhsmPrivateEndpointConnection items on this page */
  value: MhsmPrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mhsmPrivateEndpointConnectionsListResultDeserializer(
  item: any,
): _MhsmPrivateEndpointConnectionsListResult {
  return {
    value: mhsmPrivateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mhsmPrivateEndpointConnectionArraySerializer(
  result: Array<MhsmPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return mhsmPrivateEndpointConnectionSerializer(item);
  });
}

export function mhsmPrivateEndpointConnectionArrayDeserializer(
  result: Array<MhsmPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return mhsmPrivateEndpointConnectionDeserializer(item);
  });
}

/** Type of AccessPolicyUpdateKind */
export type AccessPolicyUpdateKind = "add" | "replace" | "remove";

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01 API version. */
  V20250501 = "2025-05-01",
}
