// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Operation items */
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

/** A REST API operation */
export interface Operation {
  /** This is of the format {provider}/{resource}/{operation} */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The object that describes the operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation. */
  origin?: string;
  /** Properties of the operation. */
  properties?: any;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** The object that describes the operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider. */
  provider?: string;
  /** For example: read, write, delete, or listKeys/action */
  operation?: string;
  /** The resource type on which the operation is performed. */
  resource?: string;
  /** The friendly name of the operation */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
  };
}

/** An error response from the Batch service. */
export interface CloudError {
  /** The body of the error response. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the Batch service. */
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

/** Contains information about an Azure Batch account. */
export interface BatchAccount extends TrackedResource {
  /** The identity of the Batch account. */
  identity?: BatchAccountIdentity;
  /** The account endpoint used to interact with the Batch service. */
  readonly accountEndpoint?: string;
  /** The endpoint used by compute node to connect to the Batch node management service. */
  readonly nodeManagementEndpoint?: string;
  /** The provisioned state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** The allocation mode for creating pools in the Batch account. */
  readonly poolAllocationMode?: PoolAllocationMode;
  /** Identifies the Azure key vault associated with a Batch account. */
  readonly keyVaultReference?: KeyVaultReference;
  /** The network access type for operating on the resources in the Batch account. */
  publicNetworkAccess?: PublicNetworkAccessType | null;
  /** The network profile only takes effect when publicNetworkAccess is enabled. */
  networkProfile?: NetworkProfile | null;
  /** List of private endpoint connections associated with the Batch account */
  readonly privateEndpointConnections?: PrivateEndpointConnection[] | null;
  /** Contains information about the auto-storage account associated with a Batch account. */
  readonly autoStorage?: AutoStorageProperties;
  /** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
  readonly encryption?: EncryptionProperties;
  /** For accounts with PoolAllocationMode set to UserSubscription, quota is managed on the subscription so this value is not returned. */
  readonly dedicatedCoreQuota?: number | null;
  /** For accounts with PoolAllocationMode set to UserSubscription, quota is managed on the subscription so this value is not returned. */
  readonly lowPriorityCoreQuota?: number | null;
  /** A list of the dedicated core quota per Virtual Machine family for the Batch account. For accounts with PoolAllocationMode set to UserSubscription, quota is managed on the subscription so this value is not returned. */
  readonly dedicatedCoreQuotaPerVMFamily?: VirtualMachineFamilyCoreQuota[] | null;
  /** If this flag is true, dedicated core quota is enforced via both the dedicatedCoreQuotaPerVMFamily and dedicatedCoreQuota properties on the account. If this flag is false, dedicated core quota is enforced only via the dedicatedCoreQuota property on the account and does not consider Virtual Machine family. */
  readonly dedicatedCoreQuotaPerVMFamilyEnforced?: boolean;
  /** The pool quota for the Batch account. */
  readonly poolQuota?: number;
  /** The active job and job schedule quota for the Batch account. */
  readonly activeJobAndJobScheduleQuota?: number;
  /** List of allowed authentication modes for the Batch account that can be used to authenticate with the data plane. This does not affect authentication with the control plane. */
  readonly allowedAuthenticationModes?: AuthenticationMode[] | null;
}

export function batchAccountDeserializer(item: any): BatchAccount {
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
      : _batchAccountPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : batchAccountIdentityDeserializer(item["identity"]),
  };
}

/** Account specific properties. */
export interface BatchAccountProperties {
  /** The account endpoint used to interact with the Batch service. */
  readonly accountEndpoint?: string;
  /** The endpoint used by compute node to connect to the Batch node management service. */
  readonly nodeManagementEndpoint?: string;
  /** The provisioned state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** The allocation mode for creating pools in the Batch account. */
  readonly poolAllocationMode?: PoolAllocationMode;
  /** Identifies the Azure key vault associated with a Batch account. */
  readonly keyVaultReference?: KeyVaultReference;
  /** The network access type for operating on the resources in the Batch account. */
  publicNetworkAccess?: PublicNetworkAccessType | null;
  /** The network profile only takes effect when publicNetworkAccess is enabled. */
  networkProfile?: NetworkProfile | null;
  /** List of private endpoint connections associated with the Batch account */
  readonly privateEndpointConnections?: PrivateEndpointConnection[] | null;
  /** Contains information about the auto-storage account associated with a Batch account. */
  readonly autoStorage?: AutoStorageProperties;
  /** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
  readonly encryption?: EncryptionProperties;
  /** For accounts with PoolAllocationMode set to UserSubscription, quota is managed on the subscription so this value is not returned. */
  readonly dedicatedCoreQuota?: number | null;
  /** For accounts with PoolAllocationMode set to UserSubscription, quota is managed on the subscription so this value is not returned. */
  readonly lowPriorityCoreQuota?: number | null;
  /** A list of the dedicated core quota per Virtual Machine family for the Batch account. For accounts with PoolAllocationMode set to UserSubscription, quota is managed on the subscription so this value is not returned. */
  readonly dedicatedCoreQuotaPerVMFamily?: VirtualMachineFamilyCoreQuota[] | null;
  /** If this flag is true, dedicated core quota is enforced via both the dedicatedCoreQuotaPerVMFamily and dedicatedCoreQuota properties on the account. If this flag is false, dedicated core quota is enforced only via the dedicatedCoreQuota property on the account and does not consider Virtual Machine family. */
  readonly dedicatedCoreQuotaPerVMFamilyEnforced?: boolean;
  /** The pool quota for the Batch account. */
  readonly poolQuota?: number;
  /** The active job and job schedule quota for the Batch account. */
  readonly activeJobAndJobScheduleQuota?: number;
  /** List of allowed authentication modes for the Batch account that can be used to authenticate with the data plane. This does not affect authentication with the control plane. */
  readonly allowedAuthenticationModes?: AuthenticationMode[] | null;
}

export function batchAccountPropertiesDeserializer(item: any): BatchAccountProperties {
  return {
    accountEndpoint: item["accountEndpoint"],
    nodeManagementEndpoint: item["nodeManagementEndpoint"],
    provisioningState: item["provisioningState"],
    poolAllocationMode: item["poolAllocationMode"],
    keyVaultReference: !item["keyVaultReference"]
      ? item["keyVaultReference"]
      : keyVaultReferenceDeserializer(item["keyVaultReference"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    autoStorage: !item["autoStorage"]
      ? item["autoStorage"]
      : autoStoragePropertiesDeserializer(item["autoStorage"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
    dedicatedCoreQuota: item["dedicatedCoreQuota"],
    lowPriorityCoreQuota: item["lowPriorityCoreQuota"],
    dedicatedCoreQuotaPerVMFamily: !item["dedicatedCoreQuotaPerVMFamily"]
      ? item["dedicatedCoreQuotaPerVMFamily"]
      : virtualMachineFamilyCoreQuotaArrayDeserializer(item["dedicatedCoreQuotaPerVMFamily"]),
    dedicatedCoreQuotaPerVMFamilyEnforced: item["dedicatedCoreQuotaPerVMFamilyEnforced"],
    poolQuota: item["poolQuota"],
    activeJobAndJobScheduleQuota: item["activeJobAndJobScheduleQuota"],
    allowedAuthenticationModes: !item["allowedAuthenticationModes"]
      ? item["allowedAuthenticationModes"]
      : item["allowedAuthenticationModes"].map((p1: any) => {
          return p1;
        }),
  };
}

/** The provisioned state of the resource */
export type ProvisioningState =
  | "Invalid"
  | "Creating"
  | "Deleting"
  | "Succeeded"
  | "Failed"
  | "Cancelled";
/** The allocation mode for creating pools in the Batch account. */
export type PoolAllocationMode = "BatchService" | "UserSubscription";

/** Identifies the Azure key vault associated with a Batch account. */
export interface KeyVaultReference {
  /** The resource ID of the Azure key vault associated with the Batch account. */
  id: string;
  /** The URL of the Azure key vault associated with the Batch account. */
  url: string;
}

export function keyVaultReferenceSerializer(item: KeyVaultReference): any {
  return { id: item["id"], url: item["url"] };
}

export function keyVaultReferenceDeserializer(item: any): KeyVaultReference {
  return {
    id: item["id"],
    url: item["url"],
  };
}

/** The network access type for operating on the resources in the Batch account. */
export type PublicNetworkAccessType = "Enabled" | "Disabled" | "SecuredByPerimeter";

/** Network profile for Batch account, which contains network rule settings for each endpoint. */
export interface NetworkProfile {
  /** Network access profile for batchAccount endpoint (Batch account data plane API). */
  accountAccess?: EndpointAccessProfile;
  /** Network access profile for nodeManagement endpoint (Batch service managing compute nodes for Batch pools). */
  nodeManagementAccess?: EndpointAccessProfile;
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    accountAccess: !item["accountAccess"]
      ? item["accountAccess"]
      : endpointAccessProfileSerializer(item["accountAccess"]),
    nodeManagementAccess: !item["nodeManagementAccess"]
      ? item["nodeManagementAccess"]
      : endpointAccessProfileSerializer(item["nodeManagementAccess"]),
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    accountAccess: !item["accountAccess"]
      ? item["accountAccess"]
      : endpointAccessProfileDeserializer(item["accountAccess"]),
    nodeManagementAccess: !item["nodeManagementAccess"]
      ? item["nodeManagementAccess"]
      : endpointAccessProfileDeserializer(item["nodeManagementAccess"]),
  };
}

/** Network access profile for Batch endpoint. */
export interface EndpointAccessProfile {
  /** Default action for endpoint access. It is only applicable when publicNetworkAccess is enabled. */
  defaultAction: EndpointAccessDefaultAction;
  /** Array of IP ranges to filter client IP address. */
  ipRules?: IPRule[];
}

export function endpointAccessProfileSerializer(item: EndpointAccessProfile): any {
  return {
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
  };
}

export function endpointAccessProfileDeserializer(item: any): EndpointAccessProfile {
  return {
    defaultAction: item["defaultAction"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
  };
}

/** Default action for endpoint access. It is only applicable when publicNetworkAccess is enabled. */
export type EndpointAccessDefaultAction = "Allow" | "Deny";

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

/** Rule to filter client IP address. */
export interface IPRule {
  /** Action when client IP address is matched. */
  action: IPRuleAction;
  /** IPv4 address, or IPv4 address range in CIDR format. */
  value: string;
}

export function ipRuleSerializer(item: IPRule): any {
  return { action: item["action"], value: item["value"] };
}

export function ipRuleDeserializer(item: any): IPRule {
  return {
    action: item["action"],
    value: item["value"],
  };
}

/** The action when client IP address is matched. */
export type IPRuleAction = "Allow";

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

/** Contains information about a private link resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The ETag of the resource, used for concurrency statements. */
  readonly etag?: string;
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** The provisioning state of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** The private endpoint of the private endpoint connection. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** The value has one and only one group id. */
  readonly groupIds?: string[];
  /** The private link service connection state of the private endpoint connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
    tags: item["tags"],
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
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Private endpoint connection properties. */
export interface PrivateEndpointConnectionProperties {
  /** The provisioning state of the private endpoint connection. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** The private endpoint of the private endpoint connection. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** The value has one and only one group id. */
  readonly groupIds?: string[];
  /** The private link service connection state of the private endpoint connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

/** The provisioning state of the private endpoint connection. */
export type PrivateEndpointConnectionProvisioningState =
  | "Creating"
  | "Updating"
  | "Deleting"
  | "Succeeded"
  | "Failed"
  | "Cancelled";

/** The private endpoint of the private endpoint connection. */
export interface PrivateEndpoint {
  /** The ARM resource identifier of the private endpoint. This is of the form /subscriptions/{subscription}/resourceGroups/{group}/providers/Microsoft.Network/privateEndpoints/{privateEndpoint}. */
  readonly id?: string;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The private link service connection state of the private endpoint connection */
export interface PrivateLinkServiceConnectionState {
  /** The status of the Batch private endpoint connection */
  status: PrivateLinkServiceConnectionStatus;
  /** Description of the private Connection state */
  description?: string;
  /** Action required on the private connection state */
  readonly actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return { status: item["status"], description: item["description"] };
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

/** The status of the Batch private endpoint connection */
export type PrivateLinkServiceConnectionStatus =
  | "Approved"
  | "Pending"
  | "Rejected"
  | "Disconnected";

/** Contains information about the auto-storage account associated with a Batch account. */
export interface AutoStorageProperties extends AutoStorageBaseProperties {
  /** The UTC time at which storage keys were last synchronized with the Batch account. */
  lastKeySync: Date;
}

export function autoStoragePropertiesDeserializer(item: any): AutoStorageProperties {
  return {
    storageAccountId: item["storageAccountId"],
    authenticationMode: item["authenticationMode"],
    nodeIdentityReference: !item["nodeIdentityReference"]
      ? item["nodeIdentityReference"]
      : computeNodeIdentityReferenceDeserializer(item["nodeIdentityReference"]),
    lastKeySync: new Date(item["lastKeySync"]),
  };
}

/** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
export interface EncryptionProperties {
  /** Type of the key source. */
  keySource?: KeySource;
  /** Additional details when using Microsoft.KeyVault */
  keyVaultProperties?: KeyVaultProperties;
}

export function encryptionPropertiesSerializer(item: EncryptionProperties): any {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function encryptionPropertiesDeserializer(item: any): EncryptionProperties {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
  };
}

/** Type of the key source. */
export type KeySource = "Microsoft.Batch" | "Microsoft.KeyVault";

/** KeyVault configuration when using an encryption KeySource of Microsoft.KeyVault. */
export interface KeyVaultProperties {
  /**
   * Full path to the secret with or without version. Example https://mykeyvault.vault.azure.net/keys/testkey/6e34a81fef704045975661e297a4c053. or https://mykeyvault.vault.azure.net/keys/testkey. To be usable the following prerequisites must be met:
   *
   * The Batch Account has a System Assigned identity
   * The account identity has been granted Key/Get, Key/Unwrap and Key/Wrap permissions
   * The KeyVault has soft-delete and purge protection enabled
   */
  keyIdentifier?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return { keyIdentifier: item["keyIdentifier"] };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyIdentifier: item["keyIdentifier"],
  };
}

export function virtualMachineFamilyCoreQuotaArrayDeserializer(
  result: Array<VirtualMachineFamilyCoreQuota>,
): any[] {
  return result.map((item) => {
    return virtualMachineFamilyCoreQuotaDeserializer(item);
  });
}

/** A VM Family and its associated core quota for the Batch account. */
export interface VirtualMachineFamilyCoreQuota {
  /** The Virtual Machine family name. */
  readonly name?: string;
  /** The core quota for the VM family for the Batch account. */
  readonly coreQuota?: number;
}

export function virtualMachineFamilyCoreQuotaDeserializer(
  item: any,
): VirtualMachineFamilyCoreQuota {
  return {
    name: item["name"],
    coreQuota: item["coreQuota"],
  };
}

/** The authentication mode for the Batch account. */
export type AuthenticationMode = "SharedKey" | "AAD" | "TaskAuthenticationToken";

/** The identity of the Batch account, if configured. This is used when the user specifies 'Microsoft.KeyVault' as their Batch account encryption configuration or when `ManagedIdentity` is selected as the auto-storage authentication mode. */
export interface BatchAccountIdentity {
  /** The principal id of the Batch account. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the Batch account. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the Batch account. */
  type: ResourceIdentityType;
  /** The list of user identities associated with the Batch account. */
  userAssignedIdentities?: Record<string, UserAssignedIdentities>;
}

export function batchAccountIdentitySerializer(item: BatchAccountIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function batchAccountIdentityDeserializer(item: any): BatchAccountIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the Batch account. */
export type ResourceIdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function userAssignedIdentitiesRecordSerializer(
  item: Record<string, UserAssignedIdentities>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesSerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentitiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentities> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesDeserializer(item[key]);
  });
  return result;
}

/** The list of associated user identities. */
export interface UserAssignedIdentities {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesSerializer(item: UserAssignedIdentities): any {
  return item;
}

export function userAssignedIdentitiesDeserializer(item: any): UserAssignedIdentities {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The properties related to the auto-storage account. */
export interface AutoStorageBaseProperties {
  /** The resource ID of the storage account to be used for auto-storage account. */
  storageAccountId: string;
  /** The authentication mode which the Batch service will use to manage the auto-storage account. */
  authenticationMode?: AutoStorageAuthenticationMode;
  /** The identity referenced here must be assigned to pools which have compute nodes that need access to auto-storage. */
  nodeIdentityReference?: ComputeNodeIdentityReference;
}

export function autoStorageBasePropertiesSerializer(item: AutoStorageBaseProperties): any {
  return {
    storageAccountId: item["storageAccountId"],
    authenticationMode: item["authenticationMode"],
    nodeIdentityReference: !item["nodeIdentityReference"]
      ? item["nodeIdentityReference"]
      : computeNodeIdentityReferenceSerializer(item["nodeIdentityReference"]),
  };
}

export function autoStorageBasePropertiesDeserializer(item: any): AutoStorageBaseProperties {
  return {
    storageAccountId: item["storageAccountId"],
    authenticationMode: item["authenticationMode"],
    nodeIdentityReference: !item["nodeIdentityReference"]
      ? item["nodeIdentityReference"]
      : computeNodeIdentityReferenceDeserializer(item["nodeIdentityReference"]),
  };
}

/** The authentication mode which the Batch service will use to manage the auto-storage account. */
export type AutoStorageAuthenticationMode = "StorageKeys" | "BatchAccountManagedIdentity";

/** The reference to a user assigned identity associated with the Batch pool which a compute node will use. */
export interface ComputeNodeIdentityReference {
  /** The ARM resource id of the user assigned identity. */
  resourceId?: string;
}

export function computeNodeIdentityReferenceSerializer(item: ComputeNodeIdentityReference): any {
  return { resourceId: item["resourceId"] };
}

export function computeNodeIdentityReferenceDeserializer(item: any): ComputeNodeIdentityReference {
  return {
    resourceId: item["resourceId"],
  };
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Parameters supplied to the Create operation. */
export interface BatchAccountCreateParameters {
  /** The region in which to create the account. */
  location: string;
  /** The user-specified tags associated with the account. */
  tags?: Record<string, string>;
  /** The identity of the Batch account. */
  identity?: BatchAccountIdentity;
  /** The properties related to the auto-storage account. */
  autoStorage?: AutoStorageBaseProperties;
  /** The pool allocation mode also affects how clients may authenticate to the Batch Service API. If the mode is BatchService, clients may authenticate using access keys or Microsoft Entra ID. If the mode is UserSubscription, clients must use Microsoft Entra ID. The default is BatchService. */
  poolAllocationMode?: PoolAllocationMode;
  /** A reference to the Azure key vault associated with the Batch account. */
  keyVaultReference?: KeyVaultReference;
  /** The network access type for operating on the resources in the Batch account. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** The network profile only takes effect when publicNetworkAccess is enabled. */
  networkProfile?: NetworkProfile;
  /** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
  encryption?: EncryptionProperties;
  /** List of allowed authentication modes for the Batch account that can be used to authenticate with the data plane. This does not affect authentication with the control plane. */
  allowedAuthenticationModes?: AuthenticationMode[] | null;
}

export function batchAccountCreateParametersSerializer(item: BatchAccountCreateParameters): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "autoStorage",
      "poolAllocationMode",
      "keyVaultReference",
      "publicNetworkAccess",
      "networkProfile",
      "encryption",
      "allowedAuthenticationModes",
    ])
      ? undefined
      : _batchAccountCreateParametersPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : batchAccountIdentitySerializer(item["identity"]),
  };
}

/** The properties of a Batch account. */
export interface BatchAccountCreateProperties {
  /** The properties related to the auto-storage account. */
  autoStorage?: AutoStorageBaseProperties;
  /** The pool allocation mode also affects how clients may authenticate to the Batch Service API. If the mode is BatchService, clients may authenticate using access keys or Microsoft Entra ID. If the mode is UserSubscription, clients must use Microsoft Entra ID. The default is BatchService. */
  poolAllocationMode?: PoolAllocationMode;
  /** A reference to the Azure key vault associated with the Batch account. */
  keyVaultReference?: KeyVaultReference;
  /** The network access type for operating on the resources in the Batch account. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** The network profile only takes effect when publicNetworkAccess is enabled. */
  networkProfile?: NetworkProfile;
  /** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
  encryption?: EncryptionProperties;
  /** List of allowed authentication modes for the Batch account that can be used to authenticate with the data plane. This does not affect authentication with the control plane. */
  allowedAuthenticationModes?: AuthenticationMode[] | null;
}

export function batchAccountCreatePropertiesSerializer(item: BatchAccountCreateProperties): any {
  return {
    autoStorage: !item["autoStorage"]
      ? item["autoStorage"]
      : autoStorageBasePropertiesSerializer(item["autoStorage"]),
    poolAllocationMode: item["poolAllocationMode"],
    keyVaultReference: !item["keyVaultReference"]
      ? item["keyVaultReference"]
      : keyVaultReferenceSerializer(item["keyVaultReference"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    allowedAuthenticationModes: !item["allowedAuthenticationModes"]
      ? item["allowedAuthenticationModes"]
      : item["allowedAuthenticationModes"].map((p: any) => {
          return p;
        }),
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

/** Parameters for updating an Azure Batch account. */
export interface BatchAccountUpdateParameters {
  /** The user-specified tags associated with the account. */
  tags?: Record<string, string>;
  /** The identity of the Batch account. */
  identity?: BatchAccountIdentity;
  /** The properties related to the auto-storage account. */
  autoStorage?: AutoStorageBaseProperties;
  /** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
  encryption?: EncryptionProperties;
  /** List of allowed authentication modes for the Batch account that can be used to authenticate with the data plane. This does not affect authentication with the control plane. */
  allowedAuthenticationModes?: AuthenticationMode[] | null;
  /** The network access type for operating on the resources in the Batch account. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** The network profile only takes effect when publicNetworkAccess is enabled. */
  networkProfile?: NetworkProfile;
}

export function batchAccountUpdateParametersSerializer(item: BatchAccountUpdateParameters): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "autoStorage",
      "encryption",
      "allowedAuthenticationModes",
      "publicNetworkAccess",
      "networkProfile",
    ])
      ? undefined
      : _batchAccountUpdateParametersPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : batchAccountIdentitySerializer(item["identity"]),
  };
}

/** The properties of a Batch account. */
export interface BatchAccountUpdateProperties {
  /** The properties related to the auto-storage account. */
  autoStorage?: AutoStorageBaseProperties;
  /** Configures how customer data is encrypted inside the Batch account. By default, accounts are encrypted using a Microsoft managed key. For additional control, a customer-managed key can be used instead. */
  encryption?: EncryptionProperties;
  /** List of allowed authentication modes for the Batch account that can be used to authenticate with the data plane. This does not affect authentication with the control plane. */
  allowedAuthenticationModes?: AuthenticationMode[] | null;
  /** The network access type for operating on the resources in the Batch account. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** The network profile only takes effect when publicNetworkAccess is enabled. */
  networkProfile?: NetworkProfile;
}

export function batchAccountUpdatePropertiesSerializer(item: BatchAccountUpdateProperties): any {
  return {
    autoStorage: !item["autoStorage"]
      ? item["autoStorage"]
      : autoStorageBasePropertiesSerializer(item["autoStorage"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    allowedAuthenticationModes: !item["allowedAuthenticationModes"]
      ? item["allowedAuthenticationModes"]
      : item["allowedAuthenticationModes"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
  };
}

/** Paged collection of BatchAccount items */
export interface _BatchAccountListResult {
  /** The BatchAccount items on this page */
  value: BatchAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _batchAccountListResultDeserializer(item: any): _BatchAccountListResult {
  return {
    value: batchAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function batchAccountArrayDeserializer(result: Array<BatchAccount>): any[] {
  return result.map((item) => {
    return batchAccountDeserializer(item);
  });
}

/** Parameters supplied to the RegenerateKey operation. */
export interface BatchAccountRegenerateKeyParameters {
  /** The type of account key to regenerate. */
  keyName: AccountKeyType;
}

export function batchAccountRegenerateKeyParametersSerializer(
  item: BatchAccountRegenerateKeyParameters,
): any {
  return { keyName: item["keyName"] };
}

/** The type of account key to regenerate. */
export type AccountKeyType = "Primary" | "Secondary";

/** A set of Azure Batch account keys. */
export interface BatchAccountKeys {
  /** The Batch account name. */
  readonly accountName?: string;
  /** The primary key associated with the account. */
  readonly primary?: string;
  /** The secondary key associated with the account. */
  readonly secondary?: string;
}

export function batchAccountKeysDeserializer(item: any): BatchAccountKeys {
  return {
    accountName: item["accountName"],
    primary: item["primary"],
    secondary: item["secondary"],
  };
}

/** Values returned by the List operation. */
export interface _OutboundEnvironmentEndpointCollection {
  /** The OutboundEnvironmentEndpoint items on this page */
  readonly value: OutboundEnvironmentEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundEnvironmentEndpointCollectionDeserializer(
  item: any,
): _OutboundEnvironmentEndpointCollection {
  return {
    value: outboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

/** A collection of related endpoints from the same service for which the Batch service requires outbound access. */
export interface OutboundEnvironmentEndpoint {
  /** The type of service that the Batch service connects to. */
  readonly category?: string;
  /** The endpoints for this service to which the Batch service makes outbound calls. */
  readonly endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(item: any): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name and connection details used to access a dependency. */
export interface EndpointDependency {
  /** The domain name of the dependency. Domain names may be fully qualified or may contain a * wildcard. */
  readonly domainName?: string;
  /** Human-readable supplemental information about the dependency and when it is applicable. */
  readonly description?: string;
  /** The list of connection details for this endpoint. */
  readonly endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    description: item["description"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** Details about the connection between the Batch service and the endpoint. */
export interface EndpointDetail {
  /** The port an endpoint is connected to. */
  readonly port?: number;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    port: item["port"],
  };
}

/** Contains the information for a detector. */
export interface DetectorResponse extends ProxyResource {
  /** The ETag of the resource, used for concurrency statements. */
  readonly etag?: string;
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** A base64 encoded string that represents the content of a detector. */
  value?: string;
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
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Detector response properties. */
export interface DetectorResponseProperties {
  /** A base64 encoded string that represents the content of a detector. */
  value?: string;
}

export function detectorResponsePropertiesDeserializer(item: any): DetectorResponseProperties {
  return {
    value: item["value"],
  };
}

/** Paged collection of DetectorResponse items */
export interface _DetectorListResult {
  /** The DetectorResponse items on this page */
  value: DetectorResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _detectorListResultDeserializer(item: any): _DetectorListResult {
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

/** An application package which represents a particular version of an application. */
export interface ApplicationPackage extends ProxyResource {
  /** The ETag of the resource, used for concurrency statements. */
  readonly etag?: string;
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** The current state of the application package. */
  readonly state?: PackageState;
  /** The format of the application package, if the package is active. */
  readonly format?: string;
  /** The URL for the application package in Azure Storage. */
  readonly storageUrl?: string;
  /** The UTC time at which the Azure Storage URL will expire. */
  readonly storageUrlExpiry?: Date;
  /** The time at which the package was last activated, if the package is active. */
  readonly lastActivationTime?: Date;
}

export function applicationPackageSerializer(item: ApplicationPackage): any {
  return {
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _applicationPackagePropertiesSerializer(item),
    tags: item["tags"],
  };
}

export function applicationPackageDeserializer(item: any): ApplicationPackage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationPackagePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of an application package */
export interface ApplicationPackageProperties {
  /** The current state of the application package. */
  readonly state?: PackageState;
  /** The format of the application package, if the package is active. */
  readonly format?: string;
  /** The URL for the application package in Azure Storage. */
  readonly storageUrl?: string;
  /** The UTC time at which the Azure Storage URL will expire. */
  readonly storageUrlExpiry?: Date;
  /** The time at which the package was last activated, if the package is active. */
  readonly lastActivationTime?: Date;
}

export function applicationPackagePropertiesSerializer(item: ApplicationPackageProperties): any {
  return item;
}

export function applicationPackagePropertiesDeserializer(item: any): ApplicationPackageProperties {
  return {
    state: item["state"],
    format: item["format"],
    storageUrl: item["storageUrl"],
    storageUrlExpiry: !item["storageUrlExpiry"]
      ? item["storageUrlExpiry"]
      : new Date(item["storageUrlExpiry"]),
    lastActivationTime: !item["lastActivationTime"]
      ? item["lastActivationTime"]
      : new Date(item["lastActivationTime"]),
  };
}

/** The current state of the application package. */
export type PackageState = "Pending" | "Active";

/** The result of performing list application packages. */
export interface _ListApplicationPackagesResult {
  /** The ApplicationPackage items on this page */
  value: ApplicationPackage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listApplicationPackagesResultDeserializer(
  item: any,
): _ListApplicationPackagesResult {
  return {
    value: applicationPackageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationPackageArraySerializer(result: Array<ApplicationPackage>): any[] {
  return result.map((item) => {
    return applicationPackageSerializer(item);
  });
}

export function applicationPackageArrayDeserializer(result: Array<ApplicationPackage>): any[] {
  return result.map((item) => {
    return applicationPackageDeserializer(item);
  });
}

/** Parameters for an activating an application package. */
export interface ActivateApplicationPackageParameters {
  /** The format of the application package binary file. */
  format: string;
}

export function activateApplicationPackageParametersSerializer(
  item: ActivateApplicationPackageParameters,
): any {
  return { format: item["format"] };
}

/** Contains information about an application in a Batch account. */
export interface Application extends ProxyResource {
  /** The ETag of the resource, used for concurrency statements. */
  readonly etag?: string;
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** The display name for the application. */
  displayName?: string;
  /** A value indicating whether packages within the application may be overwritten using the same version string. */
  allowUpdates?: boolean;
  /** The package to use if a client requests the application but does not specify a version. This property can only be set to the name of an existing package. */
  defaultVersion?: string;
}

export function applicationSerializer(item: Application): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName", "allowUpdates", "defaultVersion"])
      ? undefined
      : _applicationPropertiesSerializer(item),
    tags: item["tags"],
  };
}

export function applicationDeserializer(item: any): Application {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties associated with the Application. */
export interface ApplicationProperties {
  /** The display name for the application. */
  displayName?: string;
  /** A value indicating whether packages within the application may be overwritten using the same version string. */
  allowUpdates?: boolean;
  /** The package to use if a client requests the application but does not specify a version. This property can only be set to the name of an existing package. */
  defaultVersion?: string;
}

export function applicationPropertiesSerializer(item: ApplicationProperties): any {
  return {
    displayName: item["displayName"],
    allowUpdates: item["allowUpdates"],
    defaultVersion: item["defaultVersion"],
  };
}

export function applicationPropertiesDeserializer(item: any): ApplicationProperties {
  return {
    displayName: item["displayName"],
    allowUpdates: item["allowUpdates"],
    defaultVersion: item["defaultVersion"],
  };
}

/** The result of performing list applications. */
export interface _ListApplicationsResult {
  /** The Application items on this page */
  value: Application[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listApplicationsResultDeserializer(item: any): _ListApplicationsResult {
  return {
    value: applicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationArraySerializer(result: Array<Application>): any[] {
  return result.map((item) => {
    return applicationSerializer(item);
  });
}

export function applicationArrayDeserializer(result: Array<Application>): any[] {
  return result.map((item) => {
    return applicationDeserializer(item);
  });
}

/** Contains information about a private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The ETag of the resource, used for concurrency statements. */
  readonly etag?: string;
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** The group id is used to establish the private link connection. */
  readonly groupId?: string;
  /** The list of required members that are used to establish the private link connection. */
  readonly requiredMembers?: string[];
  /** The list of required zone names for the private DNS resource name */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Private link resource properties. */
export interface PrivateLinkResourceProperties {
  /** The group id is used to establish the private link connection. */
  readonly groupId?: string;
  /** The list of required members that are used to establish the private link connection. */
  readonly requiredMembers?: string[];
  /** The list of required zone names for the private DNS resource name */
  readonly requiredZoneNames?: string[];
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

/** Values returned by the List operation. */
export interface _ListPrivateLinkResourcesResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listPrivateLinkResourcesResultDeserializer(
  item: any,
): _ListPrivateLinkResourcesResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Values returned by the List operation. */
export interface _ListPrivateEndpointConnectionsResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listPrivateEndpointConnectionsResultDeserializer(
  item: any,
): _ListPrivateEndpointConnectionsResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Contains information about a pool. */
export interface Pool extends ProxyResource {
  /** The type of identity used for the Batch Pool. */
  identity?: BatchPoolIdentity;
  /** The ETag of the resource, used for concurrency statements. */
  readonly etag?: string;
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** The display name need not be unique and can contain any Unicode characters up to a maximum length of 1024. */
  displayName?: string;
  /** This is the last time at which the pool level data, such as the targetDedicatedNodes or autoScaleSettings, changed. It does not factor in node-level changes such as a compute node changing state. */
  readonly lastModified?: Date;
  /** The creation time of the pool. */
  readonly creationTime?: Date;
  /** The current state of the pool. */
  readonly provisioningState?: PoolProvisioningState;
  /** The time at which the pool entered its current state. */
  readonly provisioningStateTransitionTime?: Date;
  /** Whether the pool is resizing. */
  readonly allocationState?: AllocationState;
  /** The time at which the pool entered its current allocation state. */
  readonly allocationStateTransitionTime?: Date;
  /** For information about available VM sizes, see Sizes for Virtual Machines in Azure (https://learn.microsoft.com/azure/virtual-machines/sizes/overview). Batch supports all Azure VM sizes except STANDARD_A0 and those with premium storage (STANDARD_GS, STANDARD_DS, and STANDARD_DSV2 series). */
  vmSize?: string;
  /** Deployment configuration properties. */
  deploymentConfiguration?: DeploymentConfiguration;
  /** The number of dedicated compute nodes currently in the pool. */
  readonly currentDedicatedNodes?: number;
  /** The number of Spot/low-priority compute nodes currently in the pool. */
  readonly currentLowPriorityNodes?: number;
  /** Defines the desired size of the pool. This can either be 'fixedScale' where the requested targetDedicatedNodes is specified, or 'autoScale' which defines a formula which is periodically reevaluated. If this property is not specified, the pool will have a fixed scale with 0 targetDedicatedNodes. */
  scaleSettings?: ScaleSettings;
  /** This property is set only if the pool automatically scales, i.e. autoScaleSettings are used. */
  readonly autoScaleRun?: AutoScaleRun;
  /** This imposes restrictions on which nodes can be assigned to the pool. Enabling this value can reduce the chance of the requested number of nodes to be allocated in the pool. If not specified, this value defaults to 'Disabled'. */
  interNodeCommunication?: InterNodeCommunicationState;
  /** The network configuration for a pool. */
  networkConfiguration?: NetworkConfiguration;
  /** The default value is 1. The maximum value is the smaller of 4 times the number of cores of the vmSize of the pool or 256. */
  taskSlotsPerNode?: number;
  /** If not specified, the default is spread. */
  taskSchedulingPolicy?: TaskSchedulingPolicy;
  /** The list of user accounts to be created on each node in the pool. */
  userAccounts?: UserAccount[];
  /** The Batch service does not assign any meaning to metadata; it is solely for the use of user code. */
  metadata?: MetadataItem[];
  /** In an PATCH (update) operation, this property can be set to an empty object to remove the start task from the pool. */
  startTask?: StartTask;
  /** Changes to application package references affect all new compute nodes joining the pool, but do not affect compute nodes that are already in the pool until they are rebooted or reimaged. There is a maximum of 10 application package references on any given pool. */
  applicationPackages?: ApplicationPackageReference[];
  /** Describes either the current operation (if the pool AllocationState is Resizing) or the previously completed operation (if the AllocationState is Steady). */
  readonly resizeOperationStatus?: ResizeOperationStatus;
  /** This supports Azure Files, NFS, CIFS/SMB, and Blobfuse. */
  mountConfiguration?: MountConfiguration[];
  /** Describes an upgrade policy - automatic, manual, or rolling. */
  upgradePolicy?: UpgradePolicy;
}

export function poolSerializer(item: Pool): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "vmSize",
      "deploymentConfiguration",
      "scaleSettings",
      "interNodeCommunication",
      "networkConfiguration",
      "taskSlotsPerNode",
      "taskSchedulingPolicy",
      "userAccounts",
      "metadata",
      "startTask",
      "applicationPackages",
      "mountConfiguration",
      "upgradePolicy",
    ])
      ? undefined
      : _poolPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : batchPoolIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

export function poolDeserializer(item: any): Pool {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _poolPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : batchPoolIdentityDeserializer(item["identity"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Pool properties. */
export interface PoolProperties {
  /** The display name need not be unique and can contain any Unicode characters up to a maximum length of 1024. */
  displayName?: string;
  /** This is the last time at which the pool level data, such as the targetDedicatedNodes or autoScaleSettings, changed. It does not factor in node-level changes such as a compute node changing state. */
  readonly lastModified?: Date;
  /** The creation time of the pool. */
  readonly creationTime?: Date;
  /** The current state of the pool. */
  readonly provisioningState?: PoolProvisioningState;
  /** The time at which the pool entered its current state. */
  readonly provisioningStateTransitionTime?: Date;
  /** Whether the pool is resizing. */
  readonly allocationState?: AllocationState;
  /** The time at which the pool entered its current allocation state. */
  readonly allocationStateTransitionTime?: Date;
  /** For information about available VM sizes, see Sizes for Virtual Machines in Azure (https://learn.microsoft.com/azure/virtual-machines/sizes/overview). Batch supports all Azure VM sizes except STANDARD_A0 and those with premium storage (STANDARD_GS, STANDARD_DS, and STANDARD_DSV2 series). */
  vmSize?: string;
  /** Deployment configuration properties. */
  deploymentConfiguration?: DeploymentConfiguration;
  /** The number of dedicated compute nodes currently in the pool. */
  readonly currentDedicatedNodes?: number;
  /** The number of Spot/low-priority compute nodes currently in the pool. */
  readonly currentLowPriorityNodes?: number;
  /** Defines the desired size of the pool. This can either be 'fixedScale' where the requested targetDedicatedNodes is specified, or 'autoScale' which defines a formula which is periodically reevaluated. If this property is not specified, the pool will have a fixed scale with 0 targetDedicatedNodes. */
  scaleSettings?: ScaleSettings;
  /** This property is set only if the pool automatically scales, i.e. autoScaleSettings are used. */
  readonly autoScaleRun?: AutoScaleRun;
  /** This imposes restrictions on which nodes can be assigned to the pool. Enabling this value can reduce the chance of the requested number of nodes to be allocated in the pool. If not specified, this value defaults to 'Disabled'. */
  interNodeCommunication?: InterNodeCommunicationState;
  /** The network configuration for a pool. */
  networkConfiguration?: NetworkConfiguration;
  /** The default value is 1. The maximum value is the smaller of 4 times the number of cores of the vmSize of the pool or 256. */
  taskSlotsPerNode?: number;
  /** If not specified, the default is spread. */
  taskSchedulingPolicy?: TaskSchedulingPolicy;
  /** The list of user accounts to be created on each node in the pool. */
  userAccounts?: UserAccount[];
  /** The Batch service does not assign any meaning to metadata; it is solely for the use of user code. */
  metadata?: MetadataItem[];
  /** In an PATCH (update) operation, this property can be set to an empty object to remove the start task from the pool. */
  startTask?: StartTask;
  /** Changes to application package references affect all new compute nodes joining the pool, but do not affect compute nodes that are already in the pool until they are rebooted or reimaged. There is a maximum of 10 application package references on any given pool. */
  applicationPackages?: ApplicationPackageReference[];
  /** Describes either the current operation (if the pool AllocationState is Resizing) or the previously completed operation (if the AllocationState is Steady). */
  readonly resizeOperationStatus?: ResizeOperationStatus;
  /** This supports Azure Files, NFS, CIFS/SMB, and Blobfuse. */
  mountConfiguration?: MountConfiguration[];
  /** Describes an upgrade policy - automatic, manual, or rolling. */
  upgradePolicy?: UpgradePolicy;
}

export function poolPropertiesSerializer(item: PoolProperties): any {
  return {
    displayName: item["displayName"],
    vmSize: item["vmSize"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : deploymentConfigurationSerializer(item["deploymentConfiguration"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsSerializer(item["scaleSettings"]),
    interNodeCommunication: item["interNodeCommunication"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationSerializer(item["networkConfiguration"]),
    taskSlotsPerNode: item["taskSlotsPerNode"],
    taskSchedulingPolicy: !item["taskSchedulingPolicy"]
      ? item["taskSchedulingPolicy"]
      : taskSchedulingPolicySerializer(item["taskSchedulingPolicy"]),
    userAccounts: !item["userAccounts"]
      ? item["userAccounts"]
      : userAccountArraySerializer(item["userAccounts"]),
    metadata: !item["metadata"] ? item["metadata"] : metadataItemArraySerializer(item["metadata"]),
    startTask: !item["startTask"] ? item["startTask"] : startTaskSerializer(item["startTask"]),
    applicationPackages: !item["applicationPackages"]
      ? item["applicationPackages"]
      : applicationPackageReferenceArraySerializer(item["applicationPackages"]),
    mountConfiguration: !item["mountConfiguration"]
      ? item["mountConfiguration"]
      : mountConfigurationArraySerializer(item["mountConfiguration"]),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicySerializer(item["upgradePolicy"]),
  };
}

export function poolPropertiesDeserializer(item: any): PoolProperties {
  return {
    displayName: item["displayName"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    provisioningStateTransitionTime: !item["provisioningStateTransitionTime"]
      ? item["provisioningStateTransitionTime"]
      : new Date(item["provisioningStateTransitionTime"]),
    allocationState: item["allocationState"],
    allocationStateTransitionTime: !item["allocationStateTransitionTime"]
      ? item["allocationStateTransitionTime"]
      : new Date(item["allocationStateTransitionTime"]),
    vmSize: item["vmSize"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : deploymentConfigurationDeserializer(item["deploymentConfiguration"]),
    currentDedicatedNodes: item["currentDedicatedNodes"],
    currentLowPriorityNodes: item["currentLowPriorityNodes"],
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsDeserializer(item["scaleSettings"]),
    autoScaleRun: !item["autoScaleRun"]
      ? item["autoScaleRun"]
      : autoScaleRunDeserializer(item["autoScaleRun"]),
    interNodeCommunication: item["interNodeCommunication"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationDeserializer(item["networkConfiguration"]),
    taskSlotsPerNode: item["taskSlotsPerNode"],
    taskSchedulingPolicy: !item["taskSchedulingPolicy"]
      ? item["taskSchedulingPolicy"]
      : taskSchedulingPolicyDeserializer(item["taskSchedulingPolicy"]),
    userAccounts: !item["userAccounts"]
      ? item["userAccounts"]
      : userAccountArrayDeserializer(item["userAccounts"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : metadataItemArrayDeserializer(item["metadata"]),
    startTask: !item["startTask"] ? item["startTask"] : startTaskDeserializer(item["startTask"]),
    applicationPackages: !item["applicationPackages"]
      ? item["applicationPackages"]
      : applicationPackageReferenceArrayDeserializer(item["applicationPackages"]),
    resizeOperationStatus: !item["resizeOperationStatus"]
      ? item["resizeOperationStatus"]
      : resizeOperationStatusDeserializer(item["resizeOperationStatus"]),
    mountConfiguration: !item["mountConfiguration"]
      ? item["mountConfiguration"]
      : mountConfigurationArrayDeserializer(item["mountConfiguration"]),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicyDeserializer(item["upgradePolicy"]),
  };
}

/** The current state of the pool. */
export type PoolProvisioningState = "Succeeded" | "Deleting";
/** Whether the pool is resizing. */
export type AllocationState = "Steady" | "Resizing" | "Stopping";

/** Deployment configuration properties. */
export interface DeploymentConfiguration {
  /** The configuration for compute nodes in a pool based on the Azure Virtual Machines infrastructure. */
  virtualMachineConfiguration?: VirtualMachineConfiguration;
}

export function deploymentConfigurationSerializer(item: DeploymentConfiguration): any {
  return {
    virtualMachineConfiguration: !item["virtualMachineConfiguration"]
      ? item["virtualMachineConfiguration"]
      : virtualMachineConfigurationSerializer(item["virtualMachineConfiguration"]),
  };
}

export function deploymentConfigurationDeserializer(item: any): DeploymentConfiguration {
  return {
    virtualMachineConfiguration: !item["virtualMachineConfiguration"]
      ? item["virtualMachineConfiguration"]
      : virtualMachineConfigurationDeserializer(item["virtualMachineConfiguration"]),
  };
}

/** The configuration for compute nodes in a pool based on the Azure Virtual Machines infrastructure. */
export interface VirtualMachineConfiguration {
  /** A reference to an Azure Virtual Machines Marketplace image or the Azure Image resource of a custom Virtual Machine. To get the list of all imageReferences verified by Azure Batch, see the 'List supported node agent SKUs' operation. */
  imageReference: ImageReference;
  /** The Batch node agent is a program that runs on each node in the pool, and provides the command-and-control interface between the node and the Batch service. There are different implementations of the node agent, known as SKUs, for different operating systems. You must specify a node agent SKU which matches the selected image reference. To get the list of supported node agent SKUs along with their list of verified image references, see the 'List supported node agent SKUs' operation. */
  nodeAgentSkuId: string;
  /** This property must not be specified if the imageReference specifies a Linux OS image. */
  windowsConfiguration?: WindowsConfiguration;
  /** This property must be specified if the compute nodes in the pool need to have empty data disks attached to them. */
  dataDisks?: DataDisk[];
  /**
   * This only applies to images that contain the Windows operating system, and should only be used when you hold valid on-premises licenses for the nodes which will be deployed. If omitted, no on-premises licensing discount is applied. Values are:
   *
   * Windows_Server - The on-premises license is for Windows Server.
   * Windows_Client - The on-premises license is for Windows Client.
   */
  licenseType?: string;
  /** If specified, setup is performed on each node in the pool to allow tasks to run in containers. All regular tasks and job manager tasks run on this pool must specify the containerSettings property, and all other tasks may specify it. */
  containerConfiguration?: ContainerConfiguration;
  /** If specified, encryption is performed on each node in the pool during node provisioning. */
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  /** This configuration will specify rules on how nodes in the pool will be physically allocated. */
  nodePlacementConfiguration?: NodePlacementConfiguration;
  /** If specified, the extensions mentioned in this configuration will be installed on each node. */
  extensions?: VMExtension[];
  /** Contains configuration for ephemeral OSDisk settings. */
  osDisk?: OSDisk;
  /** Specifies the security profile settings for the virtual machine or virtual machine scale set. */
  securityProfile?: SecurityProfile;
  /** The service artifact reference id in the form of /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactName}/vmArtifactsProfiles/{vmArtifactsProfilesName} */
  serviceArtifactReference?: ServiceArtifactReference;
}

export function virtualMachineConfigurationSerializer(item: VirtualMachineConfiguration): any {
  return {
    imageReference: imageReferenceSerializer(item["imageReference"]),
    nodeAgentSkuId: item["nodeAgentSkuId"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationSerializer(item["windowsConfiguration"]),
    dataDisks: !item["dataDisks"] ? item["dataDisks"] : dataDiskArraySerializer(item["dataDisks"]),
    licenseType: item["licenseType"],
    containerConfiguration: !item["containerConfiguration"]
      ? item["containerConfiguration"]
      : containerConfigurationSerializer(item["containerConfiguration"]),
    diskEncryptionConfiguration: !item["diskEncryptionConfiguration"]
      ? item["diskEncryptionConfiguration"]
      : diskEncryptionConfigurationSerializer(item["diskEncryptionConfiguration"]),
    nodePlacementConfiguration: !item["nodePlacementConfiguration"]
      ? item["nodePlacementConfiguration"]
      : nodePlacementConfigurationSerializer(item["nodePlacementConfiguration"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : vmExtensionArraySerializer(item["extensions"]),
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskSerializer(item["osDisk"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    serviceArtifactReference: !item["serviceArtifactReference"]
      ? item["serviceArtifactReference"]
      : serviceArtifactReferenceSerializer(item["serviceArtifactReference"]),
  };
}

export function virtualMachineConfigurationDeserializer(item: any): VirtualMachineConfiguration {
  return {
    imageReference: imageReferenceDeserializer(item["imageReference"]),
    nodeAgentSkuId: item["nodeAgentSkuId"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationDeserializer(item["windowsConfiguration"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : dataDiskArrayDeserializer(item["dataDisks"]),
    licenseType: item["licenseType"],
    containerConfiguration: !item["containerConfiguration"]
      ? item["containerConfiguration"]
      : containerConfigurationDeserializer(item["containerConfiguration"]),
    diskEncryptionConfiguration: !item["diskEncryptionConfiguration"]
      ? item["diskEncryptionConfiguration"]
      : diskEncryptionConfigurationDeserializer(item["diskEncryptionConfiguration"]),
    nodePlacementConfiguration: !item["nodePlacementConfiguration"]
      ? item["nodePlacementConfiguration"]
      : nodePlacementConfigurationDeserializer(item["nodePlacementConfiguration"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : vmExtensionArrayDeserializer(item["extensions"]),
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskDeserializer(item["osDisk"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    serviceArtifactReference: !item["serviceArtifactReference"]
      ? item["serviceArtifactReference"]
      : serviceArtifactReferenceDeserializer(item["serviceArtifactReference"]),
  };
}

/** A reference to an Azure Virtual Machines Marketplace image or the Azure Image resource of a custom Virtual Machine. To get the list of all imageReferences verified by Azure Batch, see the 'List supported node agent SKUs' operation. */
export interface ImageReference {
  /** For example, Canonical or MicrosoftWindowsServer. */
  publisher?: string;
  /** For example, UbuntuServer or WindowsServer. */
  offer?: string;
  /** For example, 18.04-LTS or 2022-datacenter. */
  sku?: string;
  /** A value of 'latest' can be specified to select the latest version of an image. If omitted, the default is 'latest'. */
  version?: string;
  /** This property is mutually exclusive with other properties. The Azure Compute Gallery Image must have replicas in the same region as the Azure Batch account. For information about the firewall settings for the Batch node agent to communicate with the Batch service see https://learn.microsoft.com/azure/batch/batch-api-basics#virtual-network-vnet-and-firewall-configuration. */
  id?: string;
  /** This property is mutually exclusive with other properties and can be fetched from shared gallery image GET call. */
  sharedGalleryImageId?: string;
  /** This property is mutually exclusive with other properties and can be fetched from community gallery image GET call. */
  communityGalleryImageId?: string;
}

export function imageReferenceSerializer(item: ImageReference): any {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    id: item["id"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
  };
}

export function imageReferenceDeserializer(item: any): ImageReference {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    id: item["id"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
  };
}

/** Windows operating system settings to apply to the virtual machine. */
export interface WindowsConfiguration {
  /** If omitted, the default value is true. */
  enableAutomaticUpdates?: boolean;
}

export function windowsConfigurationSerializer(item: WindowsConfiguration): any {
  return { enableAutomaticUpdates: item["enableAutomaticUpdates"] };
}

export function windowsConfigurationDeserializer(item: any): WindowsConfiguration {
  return {
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
  };
}

export function dataDiskArraySerializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskSerializer(item);
  });
}

export function dataDiskArrayDeserializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskDeserializer(item);
  });
}

/** Settings which will be used by the data disks associated to Compute Nodes in the Pool. When using attached data disks, you need to mount and format the disks from within a VM to use them. */
export interface DataDisk {
  /** The lun is used to uniquely identify each data disk. If attaching multiple disks, each should have a distinct lun. The value must be between 0 and 63, inclusive. */
  lun: number;
  /**
   * Values are:
   *
   * none - The caching mode for the disk is not enabled.
   * readOnly - The caching mode for the disk is read only.
   * readWrite - The caching mode for the disk is read and write.
   *
   * The default value for caching is none. For information about the caching options see: https://blogs.msdn.microsoft.com/windowsazurestorage/2012/06/27/exploring-windows-azure-drives-disks-and-images/.
   */
  caching?: CachingType;
  /** The initial disk size in GB when creating new data disk. */
  diskSizeGB: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDisk;
}

export function dataDiskSerializer(item: DataDisk): any {
  return {
    lun: item["lun"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskSerializer(item["managedDisk"]),
  };
}

export function dataDiskDeserializer(item: any): DataDisk {
  return {
    lun: item["lun"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskDeserializer(item["managedDisk"]),
  };
}

/** The type of caching to enable for the disk. */
export type CachingType = "None" | "ReadOnly" | "ReadWrite";

/** The managed disk parameters. */
export interface ManagedDisk {
  /** The storage account type for use in creating data disks or OS disk. */
  storageAccountType?: StorageAccountType;
  /** Specifies the security profile settings for the managed disk. **Note**: It can only be set for Confidential VMs and is required when using Confidential VMs. */
  securityProfile?: VMDiskSecurityProfile;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. It can be set only in UserSubscription mode. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

export function managedDiskSerializer(item: ManagedDisk): any {
  return {
    storageAccountType: item["storageAccountType"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileSerializer(item["securityProfile"]),
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
  };
}

export function managedDiskDeserializer(item: any): ManagedDisk {
  return {
    storageAccountType: item["storageAccountType"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileDeserializer(item["securityProfile"]),
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
  };
}

/** The storage account type for use in creating data disks or OS disk. */
export type StorageAccountType = "Standard_LRS" | "Premium_LRS" | "StandardSSD_LRS";

/** Specifies the security profile settings for the managed disk. **Note**: It can only be set for Confidential VMs and is required when using Confidential VMs. */
export interface VMDiskSecurityProfile {
  /** Specifies the EncryptionType of the managed disk. It is set to VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob. **Note**: It can be set for only Confidential VMs and required when using Confidential VMs. */
  securityEncryptionType?: SecurityEncryptionTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob. It can be set only in UserSubscription mode. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

export function vmDiskSecurityProfileSerializer(item: VMDiskSecurityProfile): any {
  return {
    securityEncryptionType: item["securityEncryptionType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
  };
}

export function vmDiskSecurityProfileDeserializer(item: any): VMDiskSecurityProfile {
  return {
    securityEncryptionType: item["securityEncryptionType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
  };
}

/** Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob. **Note**: It can be set for only Confidential VMs and required when using Confidential VMs. */
export enum KnownSecurityEncryptionTypes {
  /** EncryptionType of the managed disk is set to NonPersistedTPM for not persisting firmware state in the VMGuestState blob. */
  NonPersistedTPM = "NonPersistedTPM",
  /** EncryptionType of the managed disk is set to VMGuestStateOnly for encryption of just the VMGuestState blob. */
  VMGuestStateOnly = "VMGuestStateOnly",
  /** EncryptionType of the managed disk is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob. It is not supported in data disks. */
  DiskWithVMGuestState = "DiskWithVMGuestState",
}

/**
 * Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob. **Note**: It can be set for only Confidential VMs and required when using Confidential VMs. \
 * {@link KnownSecurityEncryptionTypes} can be used interchangeably with SecurityEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonPersistedTPM**: EncryptionType of the managed disk is set to NonPersistedTPM for not persisting firmware state in the VMGuestState blob. \
 * **VMGuestStateOnly**: EncryptionType of the managed disk is set to VMGuestStateOnly for encryption of just the VMGuestState blob. \
 * **DiskWithVMGuestState**: EncryptionType of the managed disk is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob. It is not supported in data disks.
 */
export type SecurityEncryptionTypes = string;

/** The ARM resource id of the disk encryption set. */
export interface DiskEncryptionSetParameters {
  /** The ARM resource id of the disk encryption set. The resource should be in the same subscription as the Batch account. */
  id: string;
}

export function diskEncryptionSetParametersSerializer(item: DiskEncryptionSetParameters): any {
  return { id: item["id"] };
}

export function diskEncryptionSetParametersDeserializer(item: any): DiskEncryptionSetParameters {
  return {
    id: item["id"],
  };
}

/** The configuration for container-enabled pools. */
export interface ContainerConfiguration {
  /** The container technology to be used. */
  type: ContainerType;
  /** This is the full image reference, as would be specified to "docker pull". An image will be sourced from the default Docker registry unless the image is fully qualified with an alternative registry. */
  containerImageNames?: string[];
  /** If any images must be downloaded from a private registry which requires credentials, then those credentials must be provided here. */
  containerRegistries?: ContainerRegistry[];
}

export function containerConfigurationSerializer(item: ContainerConfiguration): any {
  return {
    type: item["type"],
    containerImageNames: !item["containerImageNames"]
      ? item["containerImageNames"]
      : item["containerImageNames"].map((p: any) => {
          return p;
        }),
    containerRegistries: !item["containerRegistries"]
      ? item["containerRegistries"]
      : containerRegistryArraySerializer(item["containerRegistries"]),
  };
}

export function containerConfigurationDeserializer(item: any): ContainerConfiguration {
  return {
    type: item["type"],
    containerImageNames: !item["containerImageNames"]
      ? item["containerImageNames"]
      : item["containerImageNames"].map((p: any) => {
          return p;
        }),
    containerRegistries: !item["containerRegistries"]
      ? item["containerRegistries"]
      : containerRegistryArrayDeserializer(item["containerRegistries"]),
  };
}

/** The container technology to be used. */
export enum KnownContainerType {
  /** A Docker compatible container technology will be used to launch the containers. */
  DockerCompatible = "DockerCompatible",
  /** A CRI based technology will be used to launch the containers. */
  CriCompatible = "CriCompatible",
}

/**
 * The container technology to be used. \
 * {@link KnownContainerType} can be used interchangeably with ContainerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DockerCompatible**: A Docker compatible container technology will be used to launch the containers. \
 * **CriCompatible**: A CRI based technology will be used to launch the containers.
 */
export type ContainerType = string;

export function containerRegistryArraySerializer(result: Array<ContainerRegistry>): any[] {
  return result.map((item) => {
    return containerRegistrySerializer(item);
  });
}

export function containerRegistryArrayDeserializer(result: Array<ContainerRegistry>): any[] {
  return result.map((item) => {
    return containerRegistryDeserializer(item);
  });
}

/** A private container registry. */
export interface ContainerRegistry {
  /** The user name to log into the registry server. */
  userName?: string;
  /** The password to log into the registry server. */
  password?: string;
  /** If omitted, the default is "docker.io". */
  registryServer?: string;
  /** The reference to a user assigned identity associated with the Batch pool which a compute node will use. */
  identityReference?: ComputeNodeIdentityReference;
}

export function containerRegistrySerializer(item: ContainerRegistry): any {
  return {
    username: item["userName"],
    password: item["password"],
    registryServer: item["registryServer"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceSerializer(item["identityReference"]),
  };
}

export function containerRegistryDeserializer(item: any): ContainerRegistry {
  return {
    userName: item["username"],
    password: item["password"],
    registryServer: item["registryServer"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceDeserializer(item["identityReference"]),
  };
}

/** The disk encryption configuration applied on compute nodes in the pool. Disk encryption configuration is not supported on Linux pool created with Virtual Machine Image or Azure Compute Gallery Image. */
export interface DiskEncryptionConfiguration {
  /** On Linux pool, only "TemporaryDisk" is supported; on Windows pool, "OsDisk" and "TemporaryDisk" must be specified. */
  targets?: DiskEncryptionTarget[];
  /** Customer Managed Key will encrypt OS Disk by EncryptionAtRest, and by default we will encrypt the data disk as well. It can be used only when the pool is configured with an identity and OsDisk is set as one of the targets of DiskEncryption. */
  customerManagedKey?: DiskCustomerManagedKey;
}

export function diskEncryptionConfigurationSerializer(item: DiskEncryptionConfiguration): any {
  return {
    targets: !item["targets"]
      ? item["targets"]
      : item["targets"].map((p: any) => {
          return p;
        }),
    customerManagedKey: !item["customerManagedKey"]
      ? item["customerManagedKey"]
      : diskCustomerManagedKeySerializer(item["customerManagedKey"]),
  };
}

export function diskEncryptionConfigurationDeserializer(item: any): DiskEncryptionConfiguration {
  return {
    targets: !item["targets"]
      ? item["targets"]
      : item["targets"].map((p: any) => {
          return p;
        }),
    customerManagedKey: !item["customerManagedKey"]
      ? item["customerManagedKey"]
      : diskCustomerManagedKeyDeserializer(item["customerManagedKey"]),
  };
}

/** If omitted, no disks on the compute nodes in the pool will be encrypted. */
export type DiskEncryptionTarget = "OsDisk" | "TemporaryDisk";

/** The Customer Managed Key reference to encrypt the Disk. */
export interface DiskCustomerManagedKey {
  /** Fully versioned Key Url pointing to a key in KeyVault. Version segment of the Url is required regardless of rotationToLatestKeyVersionEnabled value. */
  keyUrl?: string;
  /** Set this flag to true to enable auto-updating of the Disk Encryption to the latest key version. Default is false. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** The reference of one of the pool identities to encrypt Disk. This identity will be used to access the KeyVault. */
  identityReference?: ComputeNodeIdentityReference;
}

export function diskCustomerManagedKeySerializer(item: DiskCustomerManagedKey): any {
  return {
    keyUrl: item["keyUrl"],
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceSerializer(item["identityReference"]),
  };
}

export function diskCustomerManagedKeyDeserializer(item: any): DiskCustomerManagedKey {
  return {
    keyUrl: item["keyUrl"],
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceDeserializer(item["identityReference"]),
  };
}

/** Allocation configuration used by Batch Service to provision the nodes. */
export interface NodePlacementConfiguration {
  /** Allocation policy used by Batch Service to provision the nodes. If not specified, Batch will use the regional policy. */
  policy?: NodePlacementPolicyType;
}

export function nodePlacementConfigurationSerializer(item: NodePlacementConfiguration): any {
  return { policy: item["policy"] };
}

export function nodePlacementConfigurationDeserializer(item: any): NodePlacementConfiguration {
  return {
    policy: item["policy"],
  };
}

/** The default value is regional. */
export type NodePlacementPolicyType = "Regional" | "Zonal";

export function vmExtensionArraySerializer(result: Array<VMExtension>): any[] {
  return result.map((item) => {
    return vmExtensionSerializer(item);
  });
}

export function vmExtensionArrayDeserializer(result: Array<VMExtension>): any[] {
  return result.map((item) => {
    return vmExtensionDeserializer(item);
  });
}

/** The configuration for virtual machine extensions. */
export interface VMExtension {
  /** The name of the virtual machine extension. */
  name: string;
  /** The name of the extension handler publisher. */
  publisher: string;
  /** The type of the extensions. */
  type: string;
  /** The version of script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** JSON formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
}

export function vmExtensionSerializer(item: VMExtension): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
  };
}

export function vmExtensionDeserializer(item: any): VMExtension {
  return {
    name: item["name"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
  };
}

/** Settings for the operating system disk of the virtual machine. */
export interface OSDisk {
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  ephemeralOSDiskSettings?: DiffDiskSettings;
  /** The type of caching to enable for the disk. */
  caching?: CachingType;
  /** The managed disk parameters. */
  managedDisk?: ManagedDisk;
  /** The initial disk size in GB when creating new OS disk. */
  diskSizeGB?: number;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
}

export function osDiskSerializer(item: OSDisk): any {
  return {
    ephemeralOSDiskSettings: !item["ephemeralOSDiskSettings"]
      ? item["ephemeralOSDiskSettings"]
      : diffDiskSettingsSerializer(item["ephemeralOSDiskSettings"]),
    caching: item["caching"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskSerializer(item["managedDisk"]),
    diskSizeGB: item["diskSizeGB"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
  };
}

export function osDiskDeserializer(item: any): OSDisk {
  return {
    ephemeralOSDiskSettings: !item["ephemeralOSDiskSettings"]
      ? item["ephemeralOSDiskSettings"]
      : diffDiskSettingsDeserializer(item["ephemeralOSDiskSettings"]),
    caching: item["caching"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskDeserializer(item["managedDisk"]),
    diskSizeGB: item["diskSizeGB"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
  };
}

/** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
export interface DiffDiskSettings {
  /** This property can be used by user in the request to choose which location the operating system should be in. e.g., cache disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer to Ephemeral OS disk size requirements for Windows VMs at https://learn.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VMs at https://learn.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. */
  placement?: DiffDiskPlacement;
}

export function diffDiskSettingsSerializer(item: DiffDiskSettings): any {
  return { placement: item["placement"] };
}

export function diffDiskSettingsDeserializer(item: any): DiffDiskSettings {
  return {
    placement: item["placement"],
  };
}

/** The location where the OS disk should be placed. */
export type DiffDiskPlacement = "CacheDisk";

/** Specifies the security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfile {
  /** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. */
  securityType?: SecurityTypes;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. */
  encryptionAtHost?: boolean;
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. */
  uefiSettings?: UefiSettings;
  /** Specifies ProxyAgent settings while creating the virtual machine. */
  proxyAgentSettings?: ProxyAgentSettings;
}

export function securityProfileSerializer(item: SecurityProfile): any {
  return {
    securityType: item["securityType"],
    encryptionAtHost: item["encryptionAtHost"],
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : uefiSettingsSerializer(item["uefiSettings"]),
    proxyAgentSettings: !item["proxyAgentSettings"]
      ? item["proxyAgentSettings"]
      : proxyAgentSettingsSerializer(item["proxyAgentSettings"]),
  };
}

export function securityProfileDeserializer(item: any): SecurityProfile {
  return {
    securityType: item["securityType"],
    encryptionAtHost: item["encryptionAtHost"],
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : uefiSettingsDeserializer(item["uefiSettings"]),
    proxyAgentSettings: !item["proxyAgentSettings"]
      ? item["proxyAgentSettings"]
      : proxyAgentSettingsDeserializer(item["proxyAgentSettings"]),
  };
}

/** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. */
export type SecurityTypes = "trustedLaunch" | "confidentialVM";

/** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. */
export interface UefiSettings {
  /** Specifies whether secure boot should be enabled on the virtual machine. */
  secureBootEnabled?: boolean;
  /** Specifies whether vTPM should be enabled on the virtual machine. */
  vTpmEnabled?: boolean;
}

export function uefiSettingsSerializer(item: UefiSettings): any {
  return { secureBootEnabled: item["secureBootEnabled"], vTpmEnabled: item["vTpmEnabled"] };
}

export function uefiSettingsDeserializer(item: any): UefiSettings {
  return {
    secureBootEnabled: item["secureBootEnabled"],
    vTpmEnabled: item["vTpmEnabled"],
  };
}

/** Specifies ProxyAgent settings while creating the virtual machine. */
export interface ProxyAgentSettings {
  /** Specifies whether Metadata Security Protocol feature should be enabled on the virtual machine or virtual machine scale set. Default is False. */
  enabled?: boolean;
  /** Settings for the IMDS endpoint. */
  imds?: HostEndpointSettings;
  /** Settings for the WireServer endpoint. */
  wireServer?: HostEndpointSettings;
}

export function proxyAgentSettingsSerializer(item: ProxyAgentSettings): any {
  return {
    enabled: item["enabled"],
    imds: !item["imds"] ? item["imds"] : hostEndpointSettingsSerializer(item["imds"]),
    wireServer: !item["wireServer"]
      ? item["wireServer"]
      : hostEndpointSettingsSerializer(item["wireServer"]),
  };
}

export function proxyAgentSettingsDeserializer(item: any): ProxyAgentSettings {
  return {
    enabled: item["enabled"],
    imds: !item["imds"] ? item["imds"] : hostEndpointSettingsDeserializer(item["imds"]),
    wireServer: !item["wireServer"]
      ? item["wireServer"]
      : hostEndpointSettingsDeserializer(item["wireServer"]),
  };
}

/** Specifies particular host endpoint settings. */
export interface HostEndpointSettings {
  /** Specifies the access control policy execution mode. */
  mode?: HostEndpointSettingsModeTypes;
  /** Specifies the reference to the InVMAccessControlProfileVersion resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{profile}/versions/{version}. */
  inVMAccessControlProfileReferenceId?: string;
}

export function hostEndpointSettingsSerializer(item: HostEndpointSettings): any {
  return {
    mode: item["mode"],
    inVMAccessControlProfileReferenceId: item["inVMAccessControlProfileReferenceId"],
  };
}

export function hostEndpointSettingsDeserializer(item: any): HostEndpointSettings {
  return {
    mode: item["mode"],
    inVMAccessControlProfileReferenceId: item["inVMAccessControlProfileReferenceId"],
  };
}

/** Specifies the access control policy execution mode. */
export enum KnownHostEndpointSettingsModeTypes {
  /** In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. */
  Audit = "Audit",
  /** Enforce mode is the recommended mode of operation and system will enforce the access control policy. This property cannot be used together with 'inVMAccessControlProfileReferenceId'. */
  Enforce = "Enforce",
}

/**
 * Specifies the access control policy execution mode. \
 * {@link KnownHostEndpointSettingsModeTypes} can be used interchangeably with HostEndpointSettingsModeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. \
 * **Enforce**: Enforce mode is the recommended mode of operation and system will enforce the access control policy. This property cannot be used together with 'inVMAccessControlProfileReferenceId'.
 */
export type HostEndpointSettingsModeTypes = string;

/** Specifies the service artifact reference id used to set same image version for all virtual machines in the scale set when using 'latest' image version. */
export interface ServiceArtifactReference {
  /** The service artifact reference id in the form of /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactName}/vmArtifactsProfiles/{vmArtifactsProfilesName} */
  id: string;
}

export function serviceArtifactReferenceSerializer(item: ServiceArtifactReference): any {
  return { id: item["id"] };
}

export function serviceArtifactReferenceDeserializer(item: any): ServiceArtifactReference {
  return {
    id: item["id"],
  };
}

/** Defines the desired size of the pool. This can either be 'fixedScale' where the requested targetDedicatedNodes is specified, or 'autoScale' which defines a formula which is periodically reevaluated. If this property is not specified, the pool will have a fixed scale with 0 targetDedicatedNodes. */
export interface ScaleSettings {
  /** This property and autoScale are mutually exclusive and one of the properties must be specified. */
  fixedScale?: FixedScaleSettings;
  /** This property and fixedScale are mutually exclusive and one of the properties must be specified. */
  autoScale?: AutoScaleSettings;
}

export function scaleSettingsSerializer(item: ScaleSettings): any {
  return {
    fixedScale: !item["fixedScale"]
      ? item["fixedScale"]
      : fixedScaleSettingsSerializer(item["fixedScale"]),
    autoScale: !item["autoScale"]
      ? item["autoScale"]
      : autoScaleSettingsSerializer(item["autoScale"]),
  };
}

export function scaleSettingsDeserializer(item: any): ScaleSettings {
  return {
    fixedScale: !item["fixedScale"]
      ? item["fixedScale"]
      : fixedScaleSettingsDeserializer(item["fixedScale"]),
    autoScale: !item["autoScale"]
      ? item["autoScale"]
      : autoScaleSettingsDeserializer(item["autoScale"]),
  };
}

/** Fixed scale settings for the pool. */
export interface FixedScaleSettings {
  /** The default value is 15 minutes. Timeout values use ISO 8601 format. For example, use PT10M for 10 minutes. The minimum value is 5 minutes. If you specify a value less than 5 minutes, the Batch service rejects the request with an error; if you are calling the REST API directly, the HTTP status code is 400 (Bad Request). */
  resizeTimeout?: string;
  /** At least one of targetDedicatedNodes, targetLowPriorityNodes must be set. */
  targetDedicatedNodes?: number;
  /** At least one of targetDedicatedNodes, targetLowPriorityNodes must be set. */
  targetLowPriorityNodes?: number;
  /** If omitted, the default value is Requeue. */
  nodeDeallocationOption?: ComputeNodeDeallocationOption;
}

export function fixedScaleSettingsSerializer(item: FixedScaleSettings): any {
  return {
    resizeTimeout: item["resizeTimeout"],
    targetDedicatedNodes: item["targetDedicatedNodes"],
    targetLowPriorityNodes: item["targetLowPriorityNodes"],
    nodeDeallocationOption: item["nodeDeallocationOption"],
  };
}

export function fixedScaleSettingsDeserializer(item: any): FixedScaleSettings {
  return {
    resizeTimeout: item["resizeTimeout"],
    targetDedicatedNodes: item["targetDedicatedNodes"],
    targetLowPriorityNodes: item["targetLowPriorityNodes"],
    nodeDeallocationOption: item["nodeDeallocationOption"],
  };
}

/** Determines what to do with a node and its running task(s) after it has been selected for deallocation. */
export type ComputeNodeDeallocationOption =
  | "Requeue"
  | "Terminate"
  | "TaskCompletion"
  | "RetainedData";

/** AutoScale settings for the pool. */
export interface AutoScaleSettings {
  /** A formula for the desired number of compute nodes in the pool. */
  formula: string;
  /** If omitted, the default value is 15 minutes (PT15M). */
  evaluationInterval?: string;
}

export function autoScaleSettingsSerializer(item: AutoScaleSettings): any {
  return { formula: item["formula"], evaluationInterval: item["evaluationInterval"] };
}

export function autoScaleSettingsDeserializer(item: any): AutoScaleSettings {
  return {
    formula: item["formula"],
    evaluationInterval: item["evaluationInterval"],
  };
}

/** The results and errors from an execution of a pool autoscale formula. */
export interface AutoScaleRun {
  /** The time at which the autoscale formula was last evaluated. */
  evaluationTime: Date;
  /** Each variable value is returned in the form $variable=value, and variables are separated by semicolons. */
  results?: string;
  /** An error that occurred when autoscaling a pool. */
  error?: AutoScaleRunError;
}

export function autoScaleRunDeserializer(item: any): AutoScaleRun {
  return {
    evaluationTime: new Date(item["evaluationTime"]),
    results: item["results"],
    error: !item["error"] ? item["error"] : autoScaleRunErrorDeserializer(item["error"]),
  };
}

/** An error that occurred when autoscaling a pool. */
export interface AutoScaleRunError {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message: string;
  /** Additional details about the error. */
  details?: AutoScaleRunError[];
}

export function autoScaleRunErrorDeserializer(item: any): AutoScaleRunError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : autoScaleRunErrorArrayDeserializer(item["details"]),
  };
}

export function autoScaleRunErrorArrayDeserializer(result: Array<AutoScaleRunError>): any[] {
  return result.map((item) => {
    return autoScaleRunErrorDeserializer(item);
  });
}

/** This imposes restrictions on which nodes can be assigned to the pool. Enabling this value can reduce the chance of the requested number of nodes to be allocated in the pool. If not specified, this value defaults to 'Disabled'. */
export type InterNodeCommunicationState = "Enabled" | "Disabled";

/** The network configuration for a pool. */
export interface NetworkConfiguration {
  /** The virtual network must be in the same region and subscription as the Azure Batch account. The specified subnet should have enough free IP addresses to accommodate the number of nodes in the pool. If the subnet doesn't have enough free IP addresses, the pool will partially allocate compute nodes and a resize error will occur. The 'MicrosoftAzureBatch' service principal must have the 'Classic Virtual Machine Contributor' Role-Based Access Control (RBAC) role for the specified VNet. The specified subnet must allow communication from the Azure Batch service to be able to schedule tasks on the compute nodes. This can be verified by checking if the specified VNet has any associated Network Security Groups (NSG). If communication to the compute nodes in the specified subnet is denied by an NSG, then the Batch service will set the state of the compute nodes to unusable. If the specified VNet has any associated Network Security Groups (NSG), then a few reserved system ports must be enabled for inbound communication，including ports 29876 and 29877. Also enable outbound connections to Azure Storage on port 443. For more details see: https://learn.microsoft.com/azure/batch/batch-api-basics#virtual-network-vnet-and-firewall-configuration */
  subnetId?: string;
  /** The scope of dynamic vnet assignment. */
  dynamicVnetAssignmentScope?: DynamicVNetAssignmentScope;
  /** The endpoint configuration for a pool. */
  endpointConfiguration?: PoolEndpointConfiguration;
  /** The public IP Address configuration of the networking configuration of a Pool. */
  publicIPAddressConfiguration?: PublicIPAddressConfiguration;
  /** Accelerated networking enables single root I/O virtualization (SR-IOV) to a VM, which may lead to improved networking performance. For more details, see: https://learn.microsoft.com/azure/virtual-network/accelerated-networking-overview. */
  enableAcceleratedNetworking?: boolean;
}

export function networkConfigurationSerializer(item: NetworkConfiguration): any {
  return {
    subnetId: item["subnetId"],
    dynamicVnetAssignmentScope: item["dynamicVnetAssignmentScope"],
    endpointConfiguration: !item["endpointConfiguration"]
      ? item["endpointConfiguration"]
      : poolEndpointConfigurationSerializer(item["endpointConfiguration"]),
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : publicIPAddressConfigurationSerializer(item["publicIPAddressConfiguration"]),
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
  };
}

export function networkConfigurationDeserializer(item: any): NetworkConfiguration {
  return {
    subnetId: item["subnetId"],
    dynamicVnetAssignmentScope: item["dynamicVnetAssignmentScope"],
    endpointConfiguration: !item["endpointConfiguration"]
      ? item["endpointConfiguration"]
      : poolEndpointConfigurationDeserializer(item["endpointConfiguration"]),
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : publicIPAddressConfigurationDeserializer(item["publicIPAddressConfiguration"]),
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
  };
}

/** The scope of dynamic vnet assignment. */
export type DynamicVNetAssignmentScope = "none" | "job";

/** The endpoint configuration for a pool. */
export interface PoolEndpointConfiguration {
  /** The maximum number of inbound NAT pools per Batch pool is 5. If the maximum number of inbound NAT pools is exceeded the request fails with HTTP status code 400. This cannot be specified if the IPAddressProvisioningType is NoPublicIPAddresses. */
  inboundNatPools: InboundNatPool[];
}

export function poolEndpointConfigurationSerializer(item: PoolEndpointConfiguration): any {
  return { inboundNatPools: inboundNatPoolArraySerializer(item["inboundNatPools"]) };
}

export function poolEndpointConfigurationDeserializer(item: any): PoolEndpointConfiguration {
  return {
    inboundNatPools: inboundNatPoolArrayDeserializer(item["inboundNatPools"]),
  };
}

export function inboundNatPoolArraySerializer(result: Array<InboundNatPool>): any[] {
  return result.map((item) => {
    return inboundNatPoolSerializer(item);
  });
}

export function inboundNatPoolArrayDeserializer(result: Array<InboundNatPool>): any[] {
  return result.map((item) => {
    return inboundNatPoolDeserializer(item);
  });
}

/** A inbound NAT pool that can be used to address specific ports on compute nodes in a Batch pool externally. */
export interface InboundNatPool {
  /** The name must be unique within a Batch pool, can contain letters, numbers, underscores, periods, and hyphens. Names must start with a letter or number, must end with a letter, number, or underscore, and cannot exceed 77 characters.  If any invalid values are provided the request fails with HTTP status code 400. */
  name: string;
  /** The protocol of the endpoint. */
  protocol: InboundEndpointProtocol;
  /** This must be unique within a Batch pool. Acceptable values are between 1 and 65535 except for 29876 and 29877 as these are reserved. If any reserved values are provided the request fails with HTTP status code 400. */
  backendPort: number;
  /** Acceptable values range between 1 and 65534 except ports from 50000 to 55000 which are reserved. All ranges within a pool must be distinct and cannot overlap. If any reserved or overlapping values are provided the request fails with HTTP status code 400. */
  frontendPortRangeStart: number;
  /** Acceptable values range between 1 and 65534 except ports from 50000 to 55000 which are reserved by the Batch service. All ranges within a pool must be distinct and cannot overlap. If any reserved or overlapping values are provided the request fails with HTTP status code 400. */
  frontendPortRangeEnd: number;
  /** The maximum number of rules that can be specified across all the endpoints on a Batch pool is 25. If no network security group rules are specified, a default rule will be created to allow inbound access to the specified backendPort. If the maximum number of network security group rules is exceeded the request fails with HTTP status code 400. */
  networkSecurityGroupRules?: NetworkSecurityGroupRule[];
}

export function inboundNatPoolSerializer(item: InboundNatPool): any {
  return {
    name: item["name"],
    protocol: item["protocol"],
    backendPort: item["backendPort"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    networkSecurityGroupRules: !item["networkSecurityGroupRules"]
      ? item["networkSecurityGroupRules"]
      : networkSecurityGroupRuleArraySerializer(item["networkSecurityGroupRules"]),
  };
}

export function inboundNatPoolDeserializer(item: any): InboundNatPool {
  return {
    name: item["name"],
    protocol: item["protocol"],
    backendPort: item["backendPort"],
    frontendPortRangeStart: item["frontendPortRangeStart"],
    frontendPortRangeEnd: item["frontendPortRangeEnd"],
    networkSecurityGroupRules: !item["networkSecurityGroupRules"]
      ? item["networkSecurityGroupRules"]
      : networkSecurityGroupRuleArrayDeserializer(item["networkSecurityGroupRules"]),
  };
}

/** The protocol of the endpoint. */
export type InboundEndpointProtocol = "TCP" | "UDP";

export function networkSecurityGroupRuleArraySerializer(
  result: Array<NetworkSecurityGroupRule>,
): any[] {
  return result.map((item) => {
    return networkSecurityGroupRuleSerializer(item);
  });
}

export function networkSecurityGroupRuleArrayDeserializer(
  result: Array<NetworkSecurityGroupRule>,
): any[] {
  return result.map((item) => {
    return networkSecurityGroupRuleDeserializer(item);
  });
}

/** A network security group rule to apply to an inbound endpoint. */
export interface NetworkSecurityGroupRule {
  /** Priorities within a pool must be unique and are evaluated in order of priority. The lower the number the higher the priority. For example, rules could be specified with order numbers of 150, 250, and 350. The rule with the order number of 150 takes precedence over the rule that has an order of 250. Allowed priorities are 150 to 4096. If any reserved or duplicate values are provided the request fails with HTTP status code 400. */
  priority: number;
  /** The action that should be taken for a specified IP address, subnet range or tag. */
  access: NetworkSecurityGroupRuleAccess;
  /** Valid values are a single IP address (i.e. 10.10.10.10), IP subnet (i.e. 192.168.1.0/24), default tag, or * (for all addresses).  If any other values are provided the request fails with HTTP status code 400. */
  sourceAddressPrefix: string;
  /** Valid values are '*' (for all ports 0 - 65535) or arrays of ports or port ranges (i.e. 100-200). The ports should in the range of 0 to 65535 and the port ranges or ports can't overlap. If any other values are provided the request fails with HTTP status code 400. Default value will be *. */
  sourcePortRanges?: string[];
}

export function networkSecurityGroupRuleSerializer(item: NetworkSecurityGroupRule): any {
  return {
    priority: item["priority"],
    access: item["access"],
    sourceAddressPrefix: item["sourceAddressPrefix"],
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
  };
}

export function networkSecurityGroupRuleDeserializer(item: any): NetworkSecurityGroupRule {
  return {
    priority: item["priority"],
    access: item["access"],
    sourceAddressPrefix: item["sourceAddressPrefix"],
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
  };
}

/** The action that should be taken for a specified IP address, subnet range or tag. */
export type NetworkSecurityGroupRuleAccess = "Allow" | "Deny";

/** The public IP Address configuration of the networking configuration of a Pool. */
export interface PublicIPAddressConfiguration {
  /** The default value is BatchManaged */
  provision?: IPAddressProvisioningType;
  /** The number of IPs specified here limits the maximum size of the Pool - 100 dedicated nodes or 100 Spot/low-priority nodes can be allocated for each public IP. For example, a pool needing 250 dedicated VMs would need at least 3 public IPs specified. Each element of this collection is of the form: /subscriptions/{subscription}/resourceGroups/{group}/providers/Microsoft.Network/publicIPAddresses/{ip}. */
  ipAddressIds?: string[];
  /** IP families are used to determine single-stack or dual-stack pools. For single-stack, the expected value is IPv4. For dual-stack, the expected values are IPv4 and IPv6. */
  ipFamilies?: IPFamily[];
  /** IP Tags that will applied to new Public IPs that Batch creates. */
  ipTags?: IPTag[];
}

export function publicIPAddressConfigurationSerializer(item: PublicIPAddressConfiguration): any {
  return {
    provision: item["provision"],
    ipAddressIds: !item["ipAddressIds"]
      ? item["ipAddressIds"]
      : item["ipAddressIds"].map((p: any) => {
          return p;
        }),
    ipFamilies: !item["ipFamilies"]
      ? item["ipFamilies"]
      : item["ipFamilies"].map((p: any) => {
          return p;
        }),
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArraySerializer(item["ipTags"]),
  };
}

export function publicIPAddressConfigurationDeserializer(item: any): PublicIPAddressConfiguration {
  return {
    provision: item["provision"],
    ipAddressIds: !item["ipAddressIds"]
      ? item["ipAddressIds"]
      : item["ipAddressIds"].map((p: any) => {
          return p;
        }),
    ipFamilies: !item["ipFamilies"]
      ? item["ipFamilies"]
      : item["ipFamilies"].map((p: any) => {
          return p;
        }),
    ipTags: !item["ipTags"] ? item["ipTags"] : ipTagArrayDeserializer(item["ipTags"]),
  };
}

/** The provisioning type for Public IP Addresses for the Batch Pool. */
export type IPAddressProvisioningType = "BatchManaged" | "UserManaged" | "NoPublicIPAddresses";

/** The IP families used to specify IP versions available to the pool. */
export enum KnownIPFamily {
  /** IPv4 is available to the pool. */
  IPv4 = "IPv4",
  /** IPv6 is available to the pool. */
  IPv6 = "IPv6",
}

/**
 * The IP families used to specify IP versions available to the pool. \
 * {@link KnownIPFamily} can be used interchangeably with IPFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 is available to the pool. \
 * **IPv6**: IPv6 is available to the pool.
 */
export type IPFamily = string;

export function ipTagArraySerializer(result: Array<IPTag>): any[] {
  return result.map((item) => {
    return ipTagSerializer(item);
  });
}

export function ipTagArrayDeserializer(result: Array<IPTag>): any[] {
  return result.map((item) => {
    return ipTagDeserializer(item);
  });
}

/** Specifies how tasks should be distributed across compute nodes. */
export interface IPTag {
  /** Example: FirstPartyUsage. */
  ipTagType?: string;
  /** Example: SQL. */
  tag?: string;
}

export function ipTagSerializer(item: IPTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function ipTagDeserializer(item: any): IPTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

/** Specifies how tasks should be distributed across compute nodes. */
export interface TaskSchedulingPolicy {
  /** The order for scheduling tasks from different jobs with the same priority. */
  jobDefaultOrder?: JobDefaultOrder;
  /** How tasks should be distributed across compute nodes. */
  nodeFillType: ComputeNodeFillType;
}

export function taskSchedulingPolicySerializer(item: TaskSchedulingPolicy): any {
  return { jobDefaultOrder: item["jobDefaultOrder"], nodeFillType: item["nodeFillType"] };
}

export function taskSchedulingPolicyDeserializer(item: any): TaskSchedulingPolicy {
  return {
    jobDefaultOrder: item["jobDefaultOrder"],
    nodeFillType: item["nodeFillType"],
  };
}

/** The order for scheduling tasks from different jobs with the same priority. */
export enum KnownJobDefaultOrder {
  /** Tasks should be scheduled uniformly from all equal-priority jobs for the pool. */
  None = "None",
  /** If jobs have equal priority, tasks from jobs that were created earlier should be scheduled first. */
  CreationTime = "CreationTime",
}

/**
 * The order for scheduling tasks from different jobs with the same priority. \
 * {@link KnownJobDefaultOrder} can be used interchangeably with JobDefaultOrder,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Tasks should be scheduled uniformly from all equal-priority jobs for the pool. \
 * **CreationTime**: If jobs have equal priority, tasks from jobs that were created earlier should be scheduled first.
 */
export type JobDefaultOrder = string;
/** How tasks should be distributed across compute nodes. */
export type ComputeNodeFillType = "Spread" | "Pack";

export function userAccountArraySerializer(result: Array<UserAccount>): any[] {
  return result.map((item) => {
    return userAccountSerializer(item);
  });
}

export function userAccountArrayDeserializer(result: Array<UserAccount>): any[] {
  return result.map((item) => {
    return userAccountDeserializer(item);
  });
}

/** Properties used to create a user on an Azure Batch node. */
export interface UserAccount {
  /** The name of the user account. Names can contain any Unicode characters up to a maximum length of 20. */
  name: string;
  /** The password for the user account. */
  password: string;
  /** nonAdmin - The auto user is a standard user without elevated access. admin - The auto user is a user with elevated access and operates with full Administrator permissions. The default value is nonAdmin. */
  elevationLevel?: ElevationLevel;
  /** This property is ignored if specified on a Windows pool. If not specified, the user is created with the default options. */
  linuxUserConfiguration?: LinuxUserConfiguration;
  /** This property can only be specified if the user is on a Windows pool. If not specified and on a Windows pool, the user is created with the default options. */
  windowsUserConfiguration?: WindowsUserConfiguration;
}

export function userAccountSerializer(item: UserAccount): any {
  return {
    name: item["name"],
    password: item["password"],
    elevationLevel: item["elevationLevel"],
    linuxUserConfiguration: !item["linuxUserConfiguration"]
      ? item["linuxUserConfiguration"]
      : linuxUserConfigurationSerializer(item["linuxUserConfiguration"]),
    windowsUserConfiguration: !item["windowsUserConfiguration"]
      ? item["windowsUserConfiguration"]
      : windowsUserConfigurationSerializer(item["windowsUserConfiguration"]),
  };
}

export function userAccountDeserializer(item: any): UserAccount {
  return {
    name: item["name"],
    password: item["password"],
    elevationLevel: item["elevationLevel"],
    linuxUserConfiguration: !item["linuxUserConfiguration"]
      ? item["linuxUserConfiguration"]
      : linuxUserConfigurationDeserializer(item["linuxUserConfiguration"]),
    windowsUserConfiguration: !item["windowsUserConfiguration"]
      ? item["windowsUserConfiguration"]
      : windowsUserConfigurationDeserializer(item["windowsUserConfiguration"]),
  };
}

/** The elevation level of the user. */
export type ElevationLevel = "NonAdmin" | "Admin";

/** Properties used to create a user account on a Linux node. */
export interface LinuxUserConfiguration {
  /** The uid and gid properties must be specified together or not at all. If not specified the underlying operating system picks the uid. */
  uid?: number;
  /** The uid and gid properties must be specified together or not at all. If not specified the underlying operating system picks the gid. */
  gid?: number;
  /** The private key must not be password protected. The private key is used to automatically configure asymmetric-key based authentication for SSH between nodes in a Linux pool when the pool's enableInterNodeCommunication property is true (it is ignored if enableInterNodeCommunication is false). It does this by placing the key pair into the user's .ssh directory. If not specified, password-less SSH is not configured between nodes (no modification of the user's .ssh directory is done). */
  sshPrivateKey?: string;
}

export function linuxUserConfigurationSerializer(item: LinuxUserConfiguration): any {
  return { uid: item["uid"], gid: item["gid"], sshPrivateKey: item["sshPrivateKey"] };
}

export function linuxUserConfigurationDeserializer(item: any): LinuxUserConfiguration {
  return {
    uid: item["uid"],
    gid: item["gid"],
    sshPrivateKey: item["sshPrivateKey"],
  };
}

/** Properties used to create a user account on a Windows node. */
export interface WindowsUserConfiguration {
  /** Specifies login mode for the user. The default value is Interactive. */
  loginMode?: LoginMode;
}

export function windowsUserConfigurationSerializer(item: WindowsUserConfiguration): any {
  return { loginMode: item["loginMode"] };
}

export function windowsUserConfigurationDeserializer(item: any): WindowsUserConfiguration {
  return {
    loginMode: item["loginMode"],
  };
}

/** Specifies login mode for the user. The default value is Interactive. */
export type LoginMode = "Batch" | "Interactive";

export function metadataItemArraySerializer(result: Array<MetadataItem>): any[] {
  return result.map((item) => {
    return metadataItemSerializer(item);
  });
}

export function metadataItemArrayDeserializer(result: Array<MetadataItem>): any[] {
  return result.map((item) => {
    return metadataItemDeserializer(item);
  });
}

/** The Batch service does not assign any meaning to this metadata; it is solely for the use of user code. */
export interface MetadataItem {
  /** The name of the metadata item. */
  name: string;
  /** The value of the metadata item. */
  value: string;
}

export function metadataItemSerializer(item: MetadataItem): any {
  return { name: item["name"], value: item["value"] };
}

export function metadataItemDeserializer(item: any): MetadataItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** In some cases the start task may be re-run even though the node was not rebooted. Due to this, start tasks should be idempotent and exit gracefully if the setup they're performing has already been done. Special care should be taken to avoid start tasks which create breakaway process or install/launch services from the start task working directory, as this will block Batch from being able to re-run the start task. */
export interface StartTask {
  /** The command line does not run under a shell, and therefore cannot take advantage of shell features such as environment variable expansion. If you want to take advantage of such features, you should invoke the shell in the command line, for example using "cmd /c MyCommand" in Windows or "/bin/sh -c MyCommand" in Linux. Required if any other properties of the startTask are specified. */
  commandLine?: string;
  /** A list of files that the Batch service will download to the compute node before running the command line. */
  resourceFiles?: ResourceFile[];
  /** A list of environment variable settings for the start task. */
  environmentSettings?: EnvironmentSetting[];
  /** If omitted, the task runs as a non-administrative user unique to the task. */
  userIdentity?: UserIdentity;
  /** The Batch service retries a task if its exit code is nonzero. Note that this value specifically controls the number of retries. The Batch service will try the task once, and may then retry up to this limit. For example, if the maximum retry count is 3, Batch tries the task up to 4 times (one initial try and 3 retries). If the maximum retry count is 0, the Batch service does not retry the task. If the maximum retry count is -1, the Batch service retries the task without limit. Default is 0 */
  maxTaskRetryCount?: number;
  /** If true and the start task fails on a compute node, the Batch service retries the start task up to its maximum retry count (maxTaskRetryCount). If the task has still not completed successfully after all retries, then the Batch service marks the compute node unusable, and will not schedule tasks to it. This condition can be detected via the node state and scheduling error detail. If false, the Batch service will not wait for the start task to complete. In this case, other tasks can start executing on the compute node while the start task is still running; and even if the start task fails, new tasks will continue to be scheduled on the node. The default is true. */
  waitForSuccess?: boolean;
  /** When this is specified, all directories recursively below the AZ_BATCH_NODE_ROOT_DIR (the root of Azure Batch directories on the node) are mapped into the container, all task environment variables are mapped into the container, and the task command line is executed in the container. */
  containerSettings?: TaskContainerSettings;
}

export function startTaskSerializer(item: StartTask): any {
  return {
    commandLine: item["commandLine"],
    resourceFiles: !item["resourceFiles"]
      ? item["resourceFiles"]
      : resourceFileArraySerializer(item["resourceFiles"]),
    environmentSettings: !item["environmentSettings"]
      ? item["environmentSettings"]
      : environmentSettingArraySerializer(item["environmentSettings"]),
    userIdentity: !item["userIdentity"]
      ? item["userIdentity"]
      : userIdentitySerializer(item["userIdentity"]),
    maxTaskRetryCount: item["maxTaskRetryCount"],
    waitForSuccess: item["waitForSuccess"],
    containerSettings: !item["containerSettings"]
      ? item["containerSettings"]
      : taskContainerSettingsSerializer(item["containerSettings"]),
  };
}

export function startTaskDeserializer(item: any): StartTask {
  return {
    commandLine: item["commandLine"],
    resourceFiles: !item["resourceFiles"]
      ? item["resourceFiles"]
      : resourceFileArrayDeserializer(item["resourceFiles"]),
    environmentSettings: !item["environmentSettings"]
      ? item["environmentSettings"]
      : environmentSettingArrayDeserializer(item["environmentSettings"]),
    userIdentity: !item["userIdentity"]
      ? item["userIdentity"]
      : userIdentityDeserializer(item["userIdentity"]),
    maxTaskRetryCount: item["maxTaskRetryCount"],
    waitForSuccess: item["waitForSuccess"],
    containerSettings: !item["containerSettings"]
      ? item["containerSettings"]
      : taskContainerSettingsDeserializer(item["containerSettings"]),
  };
}

export function resourceFileArraySerializer(result: Array<ResourceFile>): any[] {
  return result.map((item) => {
    return resourceFileSerializer(item);
  });
}

export function resourceFileArrayDeserializer(result: Array<ResourceFile>): any[] {
  return result.map((item) => {
    return resourceFileDeserializer(item);
  });
}

/** A single file or multiple files to be downloaded to a compute node. */
export interface ResourceFile {
  /** The autoStorageContainerName, storageContainerUrl and httpUrl properties are mutually exclusive and one of them must be specified. */
  autoStorageContainerName?: string;
  /** The autoStorageContainerName, storageContainerUrl and httpUrl properties are mutually exclusive and one of them must be specified. This URL must be readable and listable from compute nodes. There are three ways to get such a URL for a container in Azure storage: include a Shared Access Signature (SAS) granting read and list permissions on the container, use a managed identity with read and list permissions, or set the ACL for the container to allow public access. */
  storageContainerUrl?: string;
  /** The autoStorageContainerName, storageContainerUrl and httpUrl properties are mutually exclusive and one of them must be specified. If the URL points to Azure Blob Storage, it must be readable from compute nodes. There are three ways to get such a URL for a blob in Azure storage: include a Shared Access Signature (SAS) granting read permissions on the blob, use a managed identity with read permission, or set the ACL for the blob or its container to allow public access. */
  httpUrl?: string;
  /** The property is valid only when autoStorageContainerName or storageContainerUrl is used. This prefix can be a partial filename or a subdirectory. If a prefix is not specified, all the files in the container will be downloaded. */
  blobPrefix?: string;
  /** If the httpUrl property is specified, the filePath is required and describes the path which the file will be downloaded to, including the filename. Otherwise, if the autoStorageContainerName or storageContainerUrl property is specified, filePath is optional and is the directory to download the files to. In the case where filePath is used as a directory, any directory structure already associated with the input data will be retained in full and appended to the specified filePath directory. The specified relative path cannot break out of the task's working directory (for example by using '..'). */
  filePath?: string;
  /** This property applies only to files being downloaded to Linux compute nodes. It will be ignored if it is specified for a resourceFile which will be downloaded to a Windows node. If this property is not specified for a Linux node, then a default value of 0770 is applied to the file. */
  fileMode?: string;
  /** The reference to a user assigned identity associated with the Batch pool which a compute node will use. */
  identityReference?: ComputeNodeIdentityReference;
}

export function resourceFileSerializer(item: ResourceFile): any {
  return {
    autoStorageContainerName: item["autoStorageContainerName"],
    storageContainerUrl: item["storageContainerUrl"],
    httpUrl: item["httpUrl"],
    blobPrefix: item["blobPrefix"],
    filePath: item["filePath"],
    fileMode: item["fileMode"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceSerializer(item["identityReference"]),
  };
}

export function resourceFileDeserializer(item: any): ResourceFile {
  return {
    autoStorageContainerName: item["autoStorageContainerName"],
    storageContainerUrl: item["storageContainerUrl"],
    httpUrl: item["httpUrl"],
    blobPrefix: item["blobPrefix"],
    filePath: item["filePath"],
    fileMode: item["fileMode"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceDeserializer(item["identityReference"]),
  };
}

export function environmentSettingArraySerializer(result: Array<EnvironmentSetting>): any[] {
  return result.map((item) => {
    return environmentSettingSerializer(item);
  });
}

export function environmentSettingArrayDeserializer(result: Array<EnvironmentSetting>): any[] {
  return result.map((item) => {
    return environmentSettingDeserializer(item);
  });
}

/** An environment variable to be set on a task process. */
export interface EnvironmentSetting {
  /** The name of the environment variable. */
  name: string;
  /** The value of the environment variable. */
  value?: string;
}

export function environmentSettingSerializer(item: EnvironmentSetting): any {
  return { name: item["name"], value: item["value"] };
}

export function environmentSettingDeserializer(item: any): EnvironmentSetting {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Specify either the userName or autoUser property, but not both. */
export interface UserIdentity {
  /** The userName and autoUser properties are mutually exclusive; you must specify one but not both. */
  userName?: string;
  /** The userName and autoUser properties are mutually exclusive; you must specify one but not both. */
  autoUser?: AutoUserSpecification;
}

export function userIdentitySerializer(item: UserIdentity): any {
  return {
    userName: item["userName"],
    autoUser: !item["autoUser"]
      ? item["autoUser"]
      : autoUserSpecificationSerializer(item["autoUser"]),
  };
}

export function userIdentityDeserializer(item: any): UserIdentity {
  return {
    userName: item["userName"],
    autoUser: !item["autoUser"]
      ? item["autoUser"]
      : autoUserSpecificationDeserializer(item["autoUser"]),
  };
}

/** Specifies the parameters for the auto user that runs a task on the Batch service. */
export interface AutoUserSpecification {
  /** The default value is Pool. If the pool is running Windows a value of Task should be specified if stricter isolation between tasks is required. For example, if the task mutates the registry in a way which could impact other tasks, or if certificates have been specified on the pool which should not be accessible by normal tasks but should be accessible by start tasks. */
  scope?: AutoUserScope;
  /** The default value is nonAdmin. */
  elevationLevel?: ElevationLevel;
}

export function autoUserSpecificationSerializer(item: AutoUserSpecification): any {
  return { scope: item["scope"], elevationLevel: item["elevationLevel"] };
}

export function autoUserSpecificationDeserializer(item: any): AutoUserSpecification {
  return {
    scope: item["scope"],
    elevationLevel: item["elevationLevel"],
  };
}

/** The default value is Pool. If the pool is running Windows a value of Task should be specified if stricter isolation between tasks is required. For example, if the task mutates the registry in a way which could impact other tasks. */
export type AutoUserScope = "Task" | "Pool";

/** The container settings for a task. */
export interface TaskContainerSettings {
  /** These additional options are supplied as arguments to the "docker create" command, in addition to those controlled by the Batch Service. */
  containerRunOptions?: string;
  /** This is the full image reference, as would be specified to "docker pull". If no tag is provided as part of the image name, the tag ":latest" is used as a default. */
  imageName: string;
  /** This setting can be omitted if was already provided at pool creation. */
  registry?: ContainerRegistry;
  /** A flag to indicate where the container task working directory is. The default is 'taskWorkingDirectory'. */
  workingDirectory?: ContainerWorkingDirectory;
  /** If this array is null or be not present, container task will mount entire temporary disk drive in windows (or AZ_BATCH_NODE_ROOT_DIR in Linux). It won't' mount any data paths into container if this array is set as empty. */
  containerHostBatchBindMounts?: ContainerHostBatchBindMountEntry[];
}

export function taskContainerSettingsSerializer(item: TaskContainerSettings): any {
  return {
    containerRunOptions: item["containerRunOptions"],
    imageName: item["imageName"],
    registry: !item["registry"] ? item["registry"] : containerRegistrySerializer(item["registry"]),
    workingDirectory: item["workingDirectory"],
    containerHostBatchBindMounts: !item["containerHostBatchBindMounts"]
      ? item["containerHostBatchBindMounts"]
      : containerHostBatchBindMountEntryArraySerializer(item["containerHostBatchBindMounts"]),
  };
}

export function taskContainerSettingsDeserializer(item: any): TaskContainerSettings {
  return {
    containerRunOptions: item["containerRunOptions"],
    imageName: item["imageName"],
    registry: !item["registry"]
      ? item["registry"]
      : containerRegistryDeserializer(item["registry"]),
    workingDirectory: item["workingDirectory"],
    containerHostBatchBindMounts: !item["containerHostBatchBindMounts"]
      ? item["containerHostBatchBindMounts"]
      : containerHostBatchBindMountEntryArrayDeserializer(item["containerHostBatchBindMounts"]),
  };
}

/** A flag to indicate where the container task working directory is. The default is 'taskWorkingDirectory'. */
export type ContainerWorkingDirectory = "TaskWorkingDirectory" | "ContainerImageDefault";

export function containerHostBatchBindMountEntryArraySerializer(
  result: Array<ContainerHostBatchBindMountEntry>,
): any[] {
  return result.map((item) => {
    return containerHostBatchBindMountEntrySerializer(item);
  });
}

export function containerHostBatchBindMountEntryArrayDeserializer(
  result: Array<ContainerHostBatchBindMountEntry>,
): any[] {
  return result.map((item) => {
    return containerHostBatchBindMountEntryDeserializer(item);
  });
}

/** The entry of path and mount mode you want to mount into task container. */
export interface ContainerHostBatchBindMountEntry {
  /** The paths which will be mounted to container task's container. */
  source?: ContainerHostDataPath;
  /** For Linux, if you mount this path as a read/write mode, this does not mean that all users in container have the read/write access for the path, it depends on the access in host VM. If this path is mounted read-only, all users within the container will not be able to modify the path. */
  isReadOnly?: boolean;
}

export function containerHostBatchBindMountEntrySerializer(
  item: ContainerHostBatchBindMountEntry,
): any {
  return { source: item["source"], isReadOnly: item["isReadOnly"] };
}

export function containerHostBatchBindMountEntryDeserializer(
  item: any,
): ContainerHostBatchBindMountEntry {
  return {
    source: item["source"],
    isReadOnly: item["isReadOnly"],
  };
}

/** The paths which will be mounted to container task's container. */
export enum KnownContainerHostDataPath {
  /** The path for multi-instances task to shared their files. */
  Shared = "Shared",
  /** The path for start task. */
  Startup = "Startup",
  /** The path contains all virtual file systems are mounted on this node. */
  VfsMounts = "VfsMounts",
  /** The task path. */
  Task = "Task",
  /** The job-prep task path. */
  JobPrep = "JobPrep",
  /** The applications path. */
  Applications = "Applications",
}

/**
 * The paths which will be mounted to container task's container. \
 * {@link KnownContainerHostDataPath} can be used interchangeably with ContainerHostDataPath,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Shared**: The path for multi-instances task to shared their files. \
 * **Startup**: The path for start task. \
 * **VfsMounts**: The path contains all virtual file systems are mounted on this node. \
 * **Task**: The task path. \
 * **JobPrep**: The job-prep task path. \
 * **Applications**: The applications path.
 */
export type ContainerHostDataPath = string;

export function applicationPackageReferenceArraySerializer(
  result: Array<ApplicationPackageReference>,
): any[] {
  return result.map((item) => {
    return applicationPackageReferenceSerializer(item);
  });
}

export function applicationPackageReferenceArrayDeserializer(
  result: Array<ApplicationPackageReference>,
): any[] {
  return result.map((item) => {
    return applicationPackageReferenceDeserializer(item);
  });
}

/** Link to an application package inside the batch account */
export interface ApplicationPackageReference {
  /** The ID of the application package to install. This must be inside the same batch account as the pool. This can either be a reference to a specific version or the default version if one exists. */
  id: string;
  /** If this is omitted, and no default version is specified for this application, the request fails with the error code InvalidApplicationPackageReferences. If you are calling the REST API directly, the HTTP status code is 409. */
  version?: string;
}

export function applicationPackageReferenceSerializer(item: ApplicationPackageReference): any {
  return { id: item["id"], version: item["version"] };
}

export function applicationPackageReferenceDeserializer(item: any): ApplicationPackageReference {
  return {
    id: item["id"],
    version: item["version"],
  };
}

/** Describes either the current operation (if the pool AllocationState is Resizing) or the previously completed operation (if the AllocationState is Steady). */
export interface ResizeOperationStatus {
  /** The desired number of dedicated compute nodes in the pool. */
  targetDedicatedNodes?: number;
  /** The desired number of Spot/low-priority compute nodes in the pool. */
  targetLowPriorityNodes?: number;
  /** The default value is 15 minutes. The minimum value is 5 minutes. If you specify a value less than 5 minutes, the Batch service returns an error; if you are calling the REST API directly, the HTTP status code is 400 (Bad Request). */
  resizeTimeout?: string;
  /** The default value is requeue. */
  nodeDeallocationOption?: ComputeNodeDeallocationOption;
  /** The time when this resize operation was started. */
  startTime?: Date;
  /** This property is set only if an error occurred during the last pool resize, and only when the pool allocationState is Steady. */
  errors?: ResizeError[];
}

export function resizeOperationStatusDeserializer(item: any): ResizeOperationStatus {
  return {
    targetDedicatedNodes: item["targetDedicatedNodes"],
    targetLowPriorityNodes: item["targetLowPriorityNodes"],
    resizeTimeout: item["resizeTimeout"],
    nodeDeallocationOption: item["nodeDeallocationOption"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    errors: !item["errors"] ? item["errors"] : resizeErrorArrayDeserializer(item["errors"]),
  };
}

export function resizeErrorArrayDeserializer(result: Array<ResizeError>): any[] {
  return result.map((item) => {
    return resizeErrorDeserializer(item);
  });
}

/** An error that occurred when resizing a pool. */
export interface ResizeError {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message: string;
  /** Additional details about the error. */
  details?: ResizeError[];
}

export function resizeErrorDeserializer(item: any): ResizeError {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : resizeErrorArrayDeserializer(item["details"]),
  };
}

export function mountConfigurationArraySerializer(result: Array<MountConfiguration>): any[] {
  return result.map((item) => {
    return mountConfigurationSerializer(item);
  });
}

export function mountConfigurationArrayDeserializer(result: Array<MountConfiguration>): any[] {
  return result.map((item) => {
    return mountConfigurationDeserializer(item);
  });
}

/** The file system to mount on each node. */
export interface MountConfiguration {
  /** This property is mutually exclusive with all other properties. */
  azureBlobFileSystemConfiguration?: AzureBlobFileSystemConfiguration;
  /** This property is mutually exclusive with all other properties. */
  nfsMountConfiguration?: NFSMountConfiguration;
  /** This property is mutually exclusive with all other properties. */
  cifsMountConfiguration?: CifsMountConfiguration;
  /** This property is mutually exclusive with all other properties. */
  azureFileShareConfiguration?: AzureFileShareConfiguration;
}

export function mountConfigurationSerializer(item: MountConfiguration): any {
  return {
    azureBlobFileSystemConfiguration: !item["azureBlobFileSystemConfiguration"]
      ? item["azureBlobFileSystemConfiguration"]
      : azureBlobFileSystemConfigurationSerializer(item["azureBlobFileSystemConfiguration"]),
    nfsMountConfiguration: !item["nfsMountConfiguration"]
      ? item["nfsMountConfiguration"]
      : nfsMountConfigurationSerializer(item["nfsMountConfiguration"]),
    cifsMountConfiguration: !item["cifsMountConfiguration"]
      ? item["cifsMountConfiguration"]
      : cifsMountConfigurationSerializer(item["cifsMountConfiguration"]),
    azureFileShareConfiguration: !item["azureFileShareConfiguration"]
      ? item["azureFileShareConfiguration"]
      : azureFileShareConfigurationSerializer(item["azureFileShareConfiguration"]),
  };
}

export function mountConfigurationDeserializer(item: any): MountConfiguration {
  return {
    azureBlobFileSystemConfiguration: !item["azureBlobFileSystemConfiguration"]
      ? item["azureBlobFileSystemConfiguration"]
      : azureBlobFileSystemConfigurationDeserializer(item["azureBlobFileSystemConfiguration"]),
    nfsMountConfiguration: !item["nfsMountConfiguration"]
      ? item["nfsMountConfiguration"]
      : nfsMountConfigurationDeserializer(item["nfsMountConfiguration"]),
    cifsMountConfiguration: !item["cifsMountConfiguration"]
      ? item["cifsMountConfiguration"]
      : cifsMountConfigurationDeserializer(item["cifsMountConfiguration"]),
    azureFileShareConfiguration: !item["azureFileShareConfiguration"]
      ? item["azureFileShareConfiguration"]
      : azureFileShareConfigurationDeserializer(item["azureFileShareConfiguration"]),
  };
}

/** Information used to connect to an Azure Storage Container using Blobfuse. */
export interface AzureBlobFileSystemConfiguration {
  /** The Azure Storage Account name. */
  accountName: string;
  /** The Azure Blob Storage Container name. */
  containerName: string;
  /** This property is mutually exclusive with both sasKey and identity; exactly one must be specified. */
  accountKey?: string;
  /** This property is mutually exclusive with both accountKey and identity; exactly one must be specified. */
  sasKey?: string;
  /** These are 'net use' options in Windows and 'mount' options in Linux. */
  blobfuseOptions?: string;
  /** All file systems are mounted relative to the Batch mounts directory, accessible via the AZ_BATCH_NODE_MOUNTS_DIR environment variable. */
  relativeMountPath: string;
  /** This property is mutually exclusive with both accountKey and sasKey; exactly one must be specified. */
  identityReference?: ComputeNodeIdentityReference;
}

export function azureBlobFileSystemConfigurationSerializer(
  item: AzureBlobFileSystemConfiguration,
): any {
  return {
    accountName: item["accountName"],
    containerName: item["containerName"],
    accountKey: item["accountKey"],
    sasKey: item["sasKey"],
    blobfuseOptions: item["blobfuseOptions"],
    relativeMountPath: item["relativeMountPath"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceSerializer(item["identityReference"]),
  };
}

export function azureBlobFileSystemConfigurationDeserializer(
  item: any,
): AzureBlobFileSystemConfiguration {
  return {
    accountName: item["accountName"],
    containerName: item["containerName"],
    accountKey: item["accountKey"],
    sasKey: item["sasKey"],
    blobfuseOptions: item["blobfuseOptions"],
    relativeMountPath: item["relativeMountPath"],
    identityReference: !item["identityReference"]
      ? item["identityReference"]
      : computeNodeIdentityReferenceDeserializer(item["identityReference"]),
  };
}

/** Information used to connect to an NFS file system. */
export interface NFSMountConfiguration {
  /** The URI of the file system to mount. */
  source: string;
  /** All file systems are mounted relative to the Batch mounts directory, accessible via the AZ_BATCH_NODE_MOUNTS_DIR environment variable. */
  relativeMountPath: string;
  /** These are 'net use' options in Windows and 'mount' options in Linux. */
  mountOptions?: string;
}

export function nfsMountConfigurationSerializer(item: NFSMountConfiguration): any {
  return {
    source: item["source"],
    relativeMountPath: item["relativeMountPath"],
    mountOptions: item["mountOptions"],
  };
}

export function nfsMountConfigurationDeserializer(item: any): NFSMountConfiguration {
  return {
    source: item["source"],
    relativeMountPath: item["relativeMountPath"],
    mountOptions: item["mountOptions"],
  };
}

/** Information used to connect to a CIFS file system. */
export interface CifsMountConfiguration {
  /** The user to use for authentication against the CIFS file system. */
  userName: string;
  /** The URI of the file system to mount. */
  source: string;
  /** All file systems are mounted relative to the Batch mounts directory, accessible via the AZ_BATCH_NODE_MOUNTS_DIR environment variable. */
  relativeMountPath: string;
  /** These are 'net use' options in Windows and 'mount' options in Linux. */
  mountOptions?: string;
  /** The password to use for authentication against the CIFS file system. */
  password: string;
}

export function cifsMountConfigurationSerializer(item: CifsMountConfiguration): any {
  return {
    userName: item["userName"],
    source: item["source"],
    relativeMountPath: item["relativeMountPath"],
    mountOptions: item["mountOptions"],
    password: item["password"],
  };
}

export function cifsMountConfigurationDeserializer(item: any): CifsMountConfiguration {
  return {
    userName: item["userName"],
    source: item["source"],
    relativeMountPath: item["relativeMountPath"],
    mountOptions: item["mountOptions"],
    password: item["password"],
  };
}

/** Information used to connect to an Azure Fileshare. */
export interface AzureFileShareConfiguration {
  /** The Azure Storage account name. */
  accountName: string;
  /** This is of the form 'https://{account}.file.core.windows.net/'. */
  azureFileUrl: string;
  /** The Azure Storage account key. */
  accountKey: string;
  /** All file systems are mounted relative to the Batch mounts directory, accessible via the AZ_BATCH_NODE_MOUNTS_DIR environment variable. */
  relativeMountPath: string;
  /** These are 'net use' options in Windows and 'mount' options in Linux. */
  mountOptions?: string;
}

export function azureFileShareConfigurationSerializer(item: AzureFileShareConfiguration): any {
  return {
    accountName: item["accountName"],
    azureFileUrl: item["azureFileUrl"],
    accountKey: item["accountKey"],
    relativeMountPath: item["relativeMountPath"],
    mountOptions: item["mountOptions"],
  };
}

export function azureFileShareConfigurationDeserializer(item: any): AzureFileShareConfiguration {
  return {
    accountName: item["accountName"],
    azureFileUrl: item["azureFileUrl"],
    accountKey: item["accountKey"],
    relativeMountPath: item["relativeMountPath"],
    mountOptions: item["mountOptions"],
  };
}

/** Describes an upgrade policy - automatic, manual, or rolling. */
export interface UpgradePolicy {
  /** Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are automatically updated at the same time.<br /><br /> **Rolling** - Scale set performs updates in batches with an optional pause time in between. */
  mode: UpgradeMode;
  /** The configuration parameters used for performing automatic OS upgrade. */
  automaticOSUpgradePolicy?: AutomaticOSUpgradePolicy;
  /** The configuration parameters used while performing a rolling upgrade. */
  rollingUpgradePolicy?: RollingUpgradePolicy;
}

export function upgradePolicySerializer(item: UpgradePolicy): any {
  return {
    mode: item["mode"],
    automaticOSUpgradePolicy: !item["automaticOSUpgradePolicy"]
      ? item["automaticOSUpgradePolicy"]
      : automaticOSUpgradePolicySerializer(item["automaticOSUpgradePolicy"]),
    rollingUpgradePolicy: !item["rollingUpgradePolicy"]
      ? item["rollingUpgradePolicy"]
      : rollingUpgradePolicySerializer(item["rollingUpgradePolicy"]),
  };
}

export function upgradePolicyDeserializer(item: any): UpgradePolicy {
  return {
    mode: item["mode"],
    automaticOSUpgradePolicy: !item["automaticOSUpgradePolicy"]
      ? item["automaticOSUpgradePolicy"]
      : automaticOSUpgradePolicyDeserializer(item["automaticOSUpgradePolicy"]),
    rollingUpgradePolicy: !item["rollingUpgradePolicy"]
      ? item["rollingUpgradePolicy"]
      : rollingUpgradePolicyDeserializer(item["rollingUpgradePolicy"]),
  };
}

/** Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are automatically updated at the same time.<br /><br /> **Rolling** - Scale set performs updates in batches with an optional pause time in between. */
export type UpgradeMode = "automatic" | "manual" | "rolling";

/** The configuration parameters used for performing automatic OS upgrade. */
export interface AutomaticOSUpgradePolicy {
  /** Whether OS image rollback feature should be disabled. */
  disableAutomaticRollback?: boolean;
  /** Indicates whether OS upgrades should automatically be applied to scale set instances in a rolling fashion when a newer version of the OS image becomes available. <br /><br /> If this is set to true for Windows based pools, [WindowsConfiguration.enableAutomaticUpdates](https://learn.microsoft.com/rest/api/batchmanagement/pool/create?tabs=HTTP#windowsconfiguration) cannot be set to true. */
  enableAutomaticOSUpgrade?: boolean;
  /** Indicates whether rolling upgrade policy should be used during Auto OS Upgrade. Auto OS Upgrade will fallback to the default policy if no policy is defined on the VMSS. */
  useRollingUpgradePolicy?: boolean;
  /** Defer OS upgrades on the TVMs if they are running tasks. */
  osRollingUpgradeDeferral?: boolean;
}

export function automaticOSUpgradePolicySerializer(item: AutomaticOSUpgradePolicy): any {
  return {
    disableAutomaticRollback: item["disableAutomaticRollback"],
    enableAutomaticOSUpgrade: item["enableAutomaticOSUpgrade"],
    useRollingUpgradePolicy: item["useRollingUpgradePolicy"],
    osRollingUpgradeDeferral: item["osRollingUpgradeDeferral"],
  };
}

export function automaticOSUpgradePolicyDeserializer(item: any): AutomaticOSUpgradePolicy {
  return {
    disableAutomaticRollback: item["disableAutomaticRollback"],
    enableAutomaticOSUpgrade: item["enableAutomaticOSUpgrade"],
    useRollingUpgradePolicy: item["useRollingUpgradePolicy"],
    osRollingUpgradeDeferral: item["osRollingUpgradeDeferral"],
  };
}

/** The configuration parameters used while performing a rolling upgrade. */
export interface RollingUpgradePolicy {
  /** Allow VMSS to ignore AZ boundaries when constructing upgrade batches. Take into consideration the Update Domain and maxBatchInstancePercent to determine the batch size. If this field is not set, Azure Azure Batch will not set its default value. The value of enableCrossZoneUpgrade on the created VirtualMachineScaleSet will be decided by the default configurations on VirtualMachineScaleSet. This field is able to be set to true or false only when using NodePlacementConfiguration as Zonal. */
  enableCrossZoneUpgrade?: boolean;
  /** The maximum percent of total virtual machine instances that will be upgraded simultaneously by the rolling upgrade in one batch. As this is a maximum, unhealthy instances in previous or future batches can cause the percentage of instances in a batch to decrease to ensure higher reliability. The value of this field should be between 5 and 100, inclusive. If both maxBatchInstancePercent and maxUnhealthyInstancePercent are assigned with value, the value of maxBatchInstancePercent should not be more than maxUnhealthyInstancePercent. */
  maxBatchInstancePercent?: number;
  /** The maximum percentage of the total virtual machine instances in the scale set that can be simultaneously unhealthy, either as a result of being upgraded, or by being found in an unhealthy state by the virtual machine health checks before the rolling upgrade aborts. This constraint will be checked prior to starting any batch. The value of this field should be between 5 and 100, inclusive. If both maxBatchInstancePercent and maxUnhealthyInstancePercent are assigned with value, the value of maxBatchInstancePercent should not be more than maxUnhealthyInstancePercent. */
  maxUnhealthyInstancePercent?: number;
  /** The maximum percentage of upgraded virtual machine instances that can be found to be in an unhealthy state. This check will happen after each batch is upgraded. If this percentage is ever exceeded, the rolling update aborts. The value of this field should be between 0 and 100, inclusive. */
  maxUnhealthyUpgradedInstancePercent?: number;
  /** The wait time between completing the update for all virtual machines in one batch and starting the next batch. The time duration should be specified in ISO 8601 format. */
  pauseTimeBetweenBatches?: string;
  /** Upgrade all unhealthy instances in a scale set before any healthy instances. */
  prioritizeUnhealthyInstances?: boolean;
  /** Rollback failed instances to previous model if the Rolling Upgrade policy is violated. */
  rollbackFailedInstancesOnPolicyBreach?: boolean;
}

export function rollingUpgradePolicySerializer(item: RollingUpgradePolicy): any {
  return {
    enableCrossZoneUpgrade: item["enableCrossZoneUpgrade"],
    maxBatchInstancePercent: item["maxBatchInstancePercent"],
    maxUnhealthyInstancePercent: item["maxUnhealthyInstancePercent"],
    maxUnhealthyUpgradedInstancePercent: item["maxUnhealthyUpgradedInstancePercent"],
    pauseTimeBetweenBatches: item["pauseTimeBetweenBatches"],
    prioritizeUnhealthyInstances: item["prioritizeUnhealthyInstances"],
    rollbackFailedInstancesOnPolicyBreach: item["rollbackFailedInstancesOnPolicyBreach"],
  };
}

export function rollingUpgradePolicyDeserializer(item: any): RollingUpgradePolicy {
  return {
    enableCrossZoneUpgrade: item["enableCrossZoneUpgrade"],
    maxBatchInstancePercent: item["maxBatchInstancePercent"],
    maxUnhealthyInstancePercent: item["maxUnhealthyInstancePercent"],
    maxUnhealthyUpgradedInstancePercent: item["maxUnhealthyUpgradedInstancePercent"],
    pauseTimeBetweenBatches: item["pauseTimeBetweenBatches"],
    prioritizeUnhealthyInstances: item["prioritizeUnhealthyInstances"],
    rollbackFailedInstancesOnPolicyBreach: item["rollbackFailedInstancesOnPolicyBreach"],
  };
}

/** The identity of the Batch pool, if configured. If the pool identity is updated during update an existing pool, only the new vms which are created after the pool shrinks to 0 will have the updated identities */
export interface BatchPoolIdentity {
  /** The type of identity used for the Batch Pool. */
  type: PoolIdentityType;
  /** The list of user identities associated with the Batch pool. */
  userAssignedIdentities?: Record<string, UserAssignedIdentities>;
}

export function batchPoolIdentitySerializer(item: BatchPoolIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function batchPoolIdentityDeserializer(item: any): BatchPoolIdentity {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the Batch Pool. */
export type PoolIdentityType = "UserAssigned" | "None";

/** Values returned by the List operation. */
export interface _ListPoolsResult {
  /** The Pool items on this page */
  value: Pool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listPoolsResultDeserializer(item: any): _ListPoolsResult {
  return {
    value: poolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function poolArraySerializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolSerializer(item);
  });
}

export function poolArrayDeserializer(result: Array<Pool>): any[] {
  return result.map((item) => {
    return poolDeserializer(item);
  });
}

/** Network security perimeter (NSP) configuration resource */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  properties?: NetworkSecurityPerimeterConfigurationProperties;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Network security configuration properties. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  readonly provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of provisioning issues, if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  resourceAssociation?: ResourceAssociation;
  profile?: NetworkSecurityProfile;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityProfileDeserializer(item["profile"]),
  };
}

/** Provisioning state of a network security perimeter configuration that is being created or updated. */
export enum KnownNetworkSecurityPerimeterConfigurationProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Accepted */
  Accepted = "Accepted",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of a network security perimeter configuration that is being created or updated. \
 * {@link KnownNetworkSecurityPerimeterConfigurationProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Accepted** \
 * **Failed** \
 * **Canceled**
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes a provisioning issue for a network security perimeter configuration */
export interface ProvisioningIssue {
  /** Name of the issue */
  readonly name?: string;
  readonly properties?: ProvisioningIssueProperties;
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : provisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** Details of a provisioning issue for a network security perimeter (NSP) configuration. Resource providers should generate separate provisioning issue elements for each separate issue detected, and include a meaningful and distinctive description, as well as any appropriate suggestedResourceIds and suggestedAccessRules */
export interface ProvisioningIssueProperties {
  /** Type of issue */
  readonly issueType?: IssueType;
  /** Severity of the issue. */
  readonly severity?: Severity;
  /** Description of the issue */
  readonly description?: string;
  /** Fully qualified resource IDs of suggested resources that can be associated to the network security perimeter (NSP) to remediate the issue. */
  readonly suggestedResourceIds?: string[];
  /** Access rules that can be added to the network security profile (NSP) to remediate the issue. */
  readonly suggestedAccessRules?: AccessRule[];
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : accessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

/** Type of issue */
export enum KnownIssueType {
  /** Unknown issue type */
  Unknown = "Unknown",
  /** An error occurred while applying the network security perimeter (NSP) configuration. */
  ConfigurationPropagationFailure = "ConfigurationPropagationFailure",
  /** A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules. */
  MissingPerimeterConfiguration = "MissingPerimeterConfiguration",
  /** An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP. */
  MissingIdentityConfiguration = "MissingIdentityConfiguration",
}

/**
 * Type of issue \
 * {@link KnownIssueType} can be used interchangeably with IssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown issue type \
 * **ConfigurationPropagationFailure**: An error occurred while applying the network security perimeter (NSP) configuration. \
 * **MissingPerimeterConfiguration**: A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules. \
 * **MissingIdentityConfiguration**: An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP.
 */
export type IssueType = string;

/** Severity of the issue. */
export enum KnownSeverity {
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * Severity of the issue. \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning** \
 * **Error**
 */
export type Severity = string;

export function accessRuleArrayDeserializer(result: Array<AccessRule>): any[] {
  return result.map((item) => {
    return accessRuleDeserializer(item);
  });
}

/** Access rule in a network security perimeter configuration profile */
export interface AccessRule {
  /** Name of the access rule */
  name?: string;
  properties?: AccessRuleProperties;
}

export function accessRuleDeserializer(item: any): AccessRule {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : accessRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Access Rule */
export interface AccessRuleProperties {
  direction?: AccessRuleDirection;
  /** Address prefixes in the CIDR format for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: {
    id?: string;
  }[];
  /** Network security perimeters for inbound rules */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** Fully qualified domain names (FQDN) for outbound rules */
  fullyQualifiedDomainNames?: string[];
  /** Email addresses for outbound rules */
  emailAddresses?: string[];
  /** Phone numbers for outbound rules */
  phoneNumbers?: string[];
}

export function accessRulePropertiesDeserializer(item: any): AccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : _accessRulePropertiesSubscriptionArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : item["phoneNumbers"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownAccessRuleDirection {
  /** Applies to inbound network traffic to the secured resources. */
  Inbound = "Inbound",
  /** Applies to outbound network traffic from the secured resources */
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownAccessRuleDirection} can be used interchangeably with AccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Applies to inbound network traffic to the secured resources. \
 * **Outbound**: Applies to outbound network traffic from the secured resources
 */
export type AccessRuleDirection = string;

export function _accessRulePropertiesSubscriptionArrayDeserializer(
  result: Array<_AccessRulePropertiesSubscription>,
): any[] {
  return result.map((item) => {
    return _accessRulePropertiesSubscriptionDeserializer(item);
  });
}

/** model interface _AccessRulePropertiesSubscription */
export interface _AccessRulePropertiesSubscription {
  /** The fully qualified Azure resource ID of the subscription e.g. ('/subscriptions/00000000-0000-0000-0000-000000000000') */
  id?: string;
}

export function _accessRulePropertiesSubscriptionDeserializer(
  item: any,
): _AccessRulePropertiesSubscription {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterArrayDeserializer(
  result: Array<NetworkSecurityPerimeter>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterDeserializer(item);
  });
}

/** Information about a network security perimeter (NSP) */
export interface NetworkSecurityPerimeter {
  /** Fully qualified Azure resource ID of the NSP resource */
  id?: string;
  /** Universal unique ID (UUID) of the network security perimeter */
  perimeterGuid?: string;
  /** Location of the network security perimeter */
  location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Information about resource association */
export interface ResourceAssociation {
  /** Name of the resource association */
  name?: string;
  accessMode?: ResourceAssociationAccessMode;
}

export function resourceAssociationDeserializer(item: any): ResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Access mode of the resource association */
export enum KnownResourceAssociationAccessMode {
  /** Enforced access mode - traffic to the resource that failed access checks is blocked */
  Enforced = "Enforced",
  /** Learning access mode - traffic to the resource is enabled for analysis but not blocked */
  Learning = "Learning",
  /** Audit access mode - traffic to the resource that fails access checks is logged but not blocked */
  Audit = "Audit",
}

/**
 * Access mode of the resource association \
 * {@link KnownResourceAssociationAccessMode} can be used interchangeably with ResourceAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enforced**: Enforced access mode - traffic to the resource that failed access checks is blocked \
 * **Learning**: Learning access mode - traffic to the resource is enabled for analysis but not blocked \
 * **Audit**: Audit access mode - traffic to the resource that fails access checks is logged but not blocked
 */
export type ResourceAssociationAccessMode = string;

/** Network security perimeter configuration profile */
export interface NetworkSecurityProfile {
  /** Name of the profile */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: number;
  /** List of Access Rules */
  accessRules?: AccessRule[];
  /** Current diagnostic settings version */
  diagnosticSettingsVersion?: number;
  /** List of log categories that are enabled */
  enabledLogCategories?: string[];
}

export function networkSecurityProfileDeserializer(item: any): NetworkSecurityProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : accessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** Result of a list NSP (network security perimeter) configurations request. */
export interface _NetworkSecurityPerimeterConfigurationListResult {
  /** Array of network security perimeter results. */
  value?: NetworkSecurityPerimeterConfiguration[];
  /** The link used to get the next page of results. */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListResultDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

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

/** Quotas associated with a Batch region for a particular subscription. */
export interface BatchLocationQuota {
  /** The number of Batch accounts that may be created under the subscription in the specified region. */
  readonly accountQuota?: number;
}

export function batchLocationQuotaDeserializer(item: any): BatchLocationQuota {
  return {
    accountQuota: item["accountQuota"],
  };
}

/** The Batch List supported SKUs operation response. */
export interface _SupportedSkusResult {
  /** The SupportedSku items on this page */
  value: SupportedSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _supportedSkusResultDeserializer(item: any): _SupportedSkusResult {
  return {
    value: supportedSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function supportedSkuArrayDeserializer(result: Array<SupportedSku>): any[] {
  return result.map((item) => {
    return supportedSkuDeserializer(item);
  });
}

/** Describes a Batch supported SKU. */
export interface SupportedSku {
  /** The name of the SKU. */
  readonly name?: string;
  /** The family name of the SKU. */
  readonly familyName?: string;
  /** A collection of capabilities which this SKU supports. */
  readonly capabilities?: SkuCapability[];
  /** The time when Azure Batch service will retire this SKU. */
  readonly batchSupportEndOfLife?: Date;
}

export function supportedSkuDeserializer(item: any): SupportedSku {
  return {
    name: item["name"],
    familyName: item["familyName"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
    batchSupportEndOfLife: !item["batchSupportEndOfLife"]
      ? item["batchSupportEndOfLife"]
      : new Date(item["batchSupportEndOfLife"]),
  };
}

export function skuCapabilityArrayDeserializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** A SKU capability, such as the number of cores. */
export interface SkuCapability {
  /** The name of the feature. */
  readonly name?: string;
  /** The value of the feature. */
  readonly value?: string;
}

export function skuCapabilityDeserializer(item: any): SkuCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Parameters for a check name availability request. */
export interface CheckNameAvailabilityParameters {
  /** The name to check for availability */
  name: string;
  /** The resource type. */
  type: ResourceType;
}

export function checkNameAvailabilityParametersSerializer(
  item: CheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The result of the request to list operations. */
export type ResourceType = "Microsoft.Batch/batchAccounts";

/** The CheckNameAvailability operation response. */
export interface CheckNameAvailabilityResult {
  /** Gets a boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** Gets the reason that a Batch account name could not be used. The Reason element is only returned if NameAvailable is false. */
  readonly reason?: NameAvailabilityReason;
  /** Gets an error message explaining the Reason value in more detail. */
  readonly message?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Gets the reason that a Batch account name could not be used. The Reason element is only returned if NameAvailable is false. */
export type NameAvailabilityReason = "Invalid" | "AlreadyExists";

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-07-01 API version. */
  V20240701 = "2024-07-01",
  /** The 2025-06-01 API version. */
  V20250601 = "2025-06-01",
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _batchAccountPropertiesDeserializer(item: any) {
  return {
    accountEndpoint: item["accountEndpoint"],
    nodeManagementEndpoint: item["nodeManagementEndpoint"],
    provisioningState: item["provisioningState"],
    poolAllocationMode: item["poolAllocationMode"],
    keyVaultReference: !item["keyVaultReference"]
      ? item["keyVaultReference"]
      : keyVaultReferenceDeserializer(item["keyVaultReference"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    autoStorage: !item["autoStorage"]
      ? item["autoStorage"]
      : autoStoragePropertiesDeserializer(item["autoStorage"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
    dedicatedCoreQuota: item["dedicatedCoreQuota"],
    lowPriorityCoreQuota: item["lowPriorityCoreQuota"],
    dedicatedCoreQuotaPerVMFamily: !item["dedicatedCoreQuotaPerVMFamily"]
      ? item["dedicatedCoreQuotaPerVMFamily"]
      : virtualMachineFamilyCoreQuotaArrayDeserializer(item["dedicatedCoreQuotaPerVMFamily"]),
    dedicatedCoreQuotaPerVMFamilyEnforced: item["dedicatedCoreQuotaPerVMFamilyEnforced"],
    poolQuota: item["poolQuota"],
    activeJobAndJobScheduleQuota: item["activeJobAndJobScheduleQuota"],
    allowedAuthenticationModes: !item["allowedAuthenticationModes"]
      ? item["allowedAuthenticationModes"]
      : item["allowedAuthenticationModes"].map((p1: any) => {
          return p1;
        }),
  };
}

export function _batchAccountCreateParametersPropertiesSerializer(
  item: BatchAccountCreateParameters,
): any {
  return {
    autoStorage: !item["autoStorage"]
      ? item["autoStorage"]
      : autoStorageBasePropertiesSerializer(item["autoStorage"]),
    poolAllocationMode: item["poolAllocationMode"],
    keyVaultReference: !item["keyVaultReference"]
      ? item["keyVaultReference"]
      : keyVaultReferenceSerializer(item["keyVaultReference"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    allowedAuthenticationModes: !item["allowedAuthenticationModes"]
      ? item["allowedAuthenticationModes"]
      : item["allowedAuthenticationModes"].map((p: any) => {
          return p;
        }),
  };
}

export function _batchAccountUpdateParametersPropertiesSerializer(
  item: BatchAccountUpdateParameters,
): any {
  return {
    autoStorage: !item["autoStorage"]
      ? item["autoStorage"]
      : autoStorageBasePropertiesSerializer(item["autoStorage"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    allowedAuthenticationModes: !item["allowedAuthenticationModes"]
      ? item["allowedAuthenticationModes"]
      : item["allowedAuthenticationModes"].map((p: any) => {
          return p;
        }),
    publicNetworkAccess: item["publicNetworkAccess"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
  };
}

export function _detectorResponsePropertiesDeserializer(item: any) {
  return {
    value: item["value"],
  };
}

export function _applicationPackagePropertiesSerializer(item: ApplicationPackage): any {
  return item;
}

export function _applicationPackagePropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    format: item["format"],
    storageUrl: item["storageUrl"],
    storageUrlExpiry: !item["storageUrlExpiry"]
      ? item["storageUrlExpiry"]
      : new Date(item["storageUrlExpiry"]),
    lastActivationTime: !item["lastActivationTime"]
      ? item["lastActivationTime"]
      : new Date(item["lastActivationTime"]),
  };
}

export function _applicationPropertiesSerializer(item: Application): any {
  return {
    displayName: item["displayName"],
    allowUpdates: item["allowUpdates"],
    defaultVersion: item["defaultVersion"],
  };
}

export function _applicationPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    allowUpdates: item["allowUpdates"],
    defaultVersion: item["defaultVersion"],
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
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

export function _poolPropertiesSerializer(item: Pool): any {
  return {
    displayName: item["displayName"],
    vmSize: item["vmSize"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : deploymentConfigurationSerializer(item["deploymentConfiguration"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsSerializer(item["scaleSettings"]),
    interNodeCommunication: item["interNodeCommunication"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationSerializer(item["networkConfiguration"]),
    taskSlotsPerNode: item["taskSlotsPerNode"],
    taskSchedulingPolicy: !item["taskSchedulingPolicy"]
      ? item["taskSchedulingPolicy"]
      : taskSchedulingPolicySerializer(item["taskSchedulingPolicy"]),
    userAccounts: !item["userAccounts"]
      ? item["userAccounts"]
      : userAccountArraySerializer(item["userAccounts"]),
    metadata: !item["metadata"] ? item["metadata"] : metadataItemArraySerializer(item["metadata"]),
    startTask: !item["startTask"] ? item["startTask"] : startTaskSerializer(item["startTask"]),
    applicationPackages: !item["applicationPackages"]
      ? item["applicationPackages"]
      : applicationPackageReferenceArraySerializer(item["applicationPackages"]),
    mountConfiguration: !item["mountConfiguration"]
      ? item["mountConfiguration"]
      : mountConfigurationArraySerializer(item["mountConfiguration"]),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicySerializer(item["upgradePolicy"]),
  };
}

export function _poolPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    provisioningStateTransitionTime: !item["provisioningStateTransitionTime"]
      ? item["provisioningStateTransitionTime"]
      : new Date(item["provisioningStateTransitionTime"]),
    allocationState: item["allocationState"],
    allocationStateTransitionTime: !item["allocationStateTransitionTime"]
      ? item["allocationStateTransitionTime"]
      : new Date(item["allocationStateTransitionTime"]),
    vmSize: item["vmSize"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : deploymentConfigurationDeserializer(item["deploymentConfiguration"]),
    currentDedicatedNodes: item["currentDedicatedNodes"],
    currentLowPriorityNodes: item["currentLowPriorityNodes"],
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsDeserializer(item["scaleSettings"]),
    autoScaleRun: !item["autoScaleRun"]
      ? item["autoScaleRun"]
      : autoScaleRunDeserializer(item["autoScaleRun"]),
    interNodeCommunication: item["interNodeCommunication"],
    networkConfiguration: !item["networkConfiguration"]
      ? item["networkConfiguration"]
      : networkConfigurationDeserializer(item["networkConfiguration"]),
    taskSlotsPerNode: item["taskSlotsPerNode"],
    taskSchedulingPolicy: !item["taskSchedulingPolicy"]
      ? item["taskSchedulingPolicy"]
      : taskSchedulingPolicyDeserializer(item["taskSchedulingPolicy"]),
    userAccounts: !item["userAccounts"]
      ? item["userAccounts"]
      : userAccountArrayDeserializer(item["userAccounts"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : metadataItemArrayDeserializer(item["metadata"]),
    startTask: !item["startTask"] ? item["startTask"] : startTaskDeserializer(item["startTask"]),
    applicationPackages: !item["applicationPackages"]
      ? item["applicationPackages"]
      : applicationPackageReferenceArrayDeserializer(item["applicationPackages"]),
    resizeOperationStatus: !item["resizeOperationStatus"]
      ? item["resizeOperationStatus"]
      : resizeOperationStatusDeserializer(item["resizeOperationStatus"]),
    mountConfiguration: !item["mountConfiguration"]
      ? item["mountConfiguration"]
      : mountConfigurationArrayDeserializer(item["mountConfiguration"]),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicyDeserializer(item["upgradePolicy"]),
  };
}
