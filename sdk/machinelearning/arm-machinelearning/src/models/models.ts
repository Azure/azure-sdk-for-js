// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

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

/** An object that represents a machine learning workspace. */
export interface Workspace extends ProxyResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  kind?: string;
  location?: string;
  /** Optional. This field is required to be implemented by the RP because AML is supporting more than one tier */
  sku?: Sku;
  tags?: Record<string, string>;
  /** The flag to indicate whether to allow public access when behind VNet. */
  allowPublicAccessWhenBehindVnet?: boolean;
  /** ARM id of the application insights associated with this workspace. */
  applicationInsights?: string;
  associatedWorkspaces?: string[];
  /** ARM id of the container registry associated with this workspace. */
  containerRegistry?: string;
  /** The description of this workspace. */
  description?: string;
  /** Url for the discovery service to identify regional endpoints for machine learning experimentation services */
  discoveryUrl?: string;
  enableDataIsolation?: boolean;
  enableServiceSideCMKEncryption?: boolean;
  encryption?: EncryptionProperty;
  /** Settings for feature store type workspace. */
  featureStoreSettings?: FeatureStoreSettings;
  /** The friendly name for this workspace. This name in mutable */
  friendlyName?: string;
  /** The flag to signal HBI data in the workspace and reduce diagnostic data collected by the service */
  hbiWorkspace?: boolean;
  hubResourceId?: string;
  /** The compute name for image build */
  imageBuildCompute?: string;
  /** ARM id of the key vault associated with this workspace. This cannot be changed once the workspace has been created */
  keyVault?: string;
  managedNetwork?: ManagedNetworkSettings;
  /** The URI associated with this workspace that machine learning flow must point at to set up tracking. */
  readonly mlFlowTrackingUri?: string;
  /** The notebook info of Azure ML workspace. */
  readonly notebookInfo?: NotebookResourceInfo;
  /** The user assigned identity resource id that represents the workspace identity. */
  primaryUserAssignedIdentity?: string;
  /** The list of private endpoint connections in the workspace. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Count of private connections in the workspace */
  readonly privateLinkCount?: number;
  /** Set to trigger the provisioning of the managed VNet with the default Options when creating a Workspace with the managed VNet enabled, or else it does nothing. */
  provisionNetworkNow?: boolean;
  /** The current deployment state of workspace resource. The provisioningState is to indicate states for resource provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** Whether requests from Public Network are allowed. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Settings for serverless compute in a workspace */
  serverlessComputeSettings?: ServerlessComputeSettings;
  /** The service managed resource settings. */
  serviceManagedResourcesSettings?: ServiceManagedResourcesSettings;
  /** The name of the managed resource group created by workspace RP in customer subscription if the workspace is CMK workspace */
  readonly serviceProvisionedResourceGroup?: string;
  /** The list of shared private link resources in this workspace. */
  sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** ARM id of the storage account associated with this workspace. This cannot be changed once the workspace has been created */
  storageAccount?: string;
  /** If the storage associated with the workspace has hierarchical namespace(HNS) enabled. */
  readonly storageHnsEnabled?: boolean;
  /** The auth mode used for accessing the system datastores of the workspace. */
  systemDatastoresAuthMode?: SystemDatastoresAuthMode;
  /** The tenant id associated with this workspace. */
  readonly tenantId?: string;
  /** Enabling v1_legacy_mode may prevent you from using features provided by the v2 API. */
  v1LegacyMode?: boolean;
  /** WorkspaceHub's configuration object. */
  workspaceHubConfig?: WorkspaceHubConfig;
  /** The immutable id associated with this workspace. */
  readonly workspaceId?: string;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    properties: _workspacePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

export function workspaceDeserializer(item: any): Workspace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._workspacePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of a machine learning workspace. */
export interface WorkspaceProperties {
  /** The flag to indicate whether to allow public access when behind VNet. */
  allowPublicAccessWhenBehindVnet?: boolean;
  /** ARM id of the application insights associated with this workspace. */
  applicationInsights?: string;
  associatedWorkspaces?: string[];
  /** ARM id of the container registry associated with this workspace. */
  containerRegistry?: string;
  /** The description of this workspace. */
  description?: string;
  /** Url for the discovery service to identify regional endpoints for machine learning experimentation services */
  discoveryUrl?: string;
  enableDataIsolation?: boolean;
  enableServiceSideCMKEncryption?: boolean;
  encryption?: EncryptionProperty;
  /** Settings for feature store type workspace. */
  featureStoreSettings?: FeatureStoreSettings;
  /** The friendly name for this workspace. This name in mutable */
  friendlyName?: string;
  /** The flag to signal HBI data in the workspace and reduce diagnostic data collected by the service */
  hbiWorkspace?: boolean;
  hubResourceId?: string;
  /** The compute name for image build */
  imageBuildCompute?: string;
  /** ARM id of the key vault associated with this workspace. This cannot be changed once the workspace has been created */
  keyVault?: string;
  managedNetwork?: ManagedNetworkSettings;
  /** The URI associated with this workspace that machine learning flow must point at to set up tracking. */
  readonly mlFlowTrackingUri?: string;
  /** The notebook info of Azure ML workspace. */
  readonly notebookInfo?: NotebookResourceInfo;
  /** The user assigned identity resource id that represents the workspace identity. */
  primaryUserAssignedIdentity?: string;
  /** The list of private endpoint connections in the workspace. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Count of private connections in the workspace */
  readonly privateLinkCount?: number;
  /** Set to trigger the provisioning of the managed VNet with the default Options when creating a Workspace with the managed VNet enabled, or else it does nothing. */
  provisionNetworkNow?: boolean;
  /** The current deployment state of workspace resource. The provisioningState is to indicate states for resource provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** Whether requests from Public Network are allowed. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Settings for serverless compute in a workspace */
  serverlessComputeSettings?: ServerlessComputeSettings;
  /** The service managed resource settings. */
  serviceManagedResourcesSettings?: ServiceManagedResourcesSettings;
  /** The name of the managed resource group created by workspace RP in customer subscription if the workspace is CMK workspace */
  readonly serviceProvisionedResourceGroup?: string;
  /** The list of shared private link resources in this workspace. */
  sharedPrivateLinkResources?: SharedPrivateLinkResource[];
  /** ARM id of the storage account associated with this workspace. This cannot be changed once the workspace has been created */
  storageAccount?: string;
  /** If the storage associated with the workspace has hierarchical namespace(HNS) enabled. */
  readonly storageHnsEnabled?: boolean;
  /** The auth mode used for accessing the system datastores of the workspace. */
  systemDatastoresAuthMode?: SystemDatastoresAuthMode;
  /** The tenant id associated with this workspace. */
  readonly tenantId?: string;
  /** Enabling v1_legacy_mode may prevent you from using features provided by the v2 API. */
  v1LegacyMode?: boolean;
  /** WorkspaceHub's configuration object. */
  workspaceHubConfig?: WorkspaceHubConfig;
  /** The immutable id associated with this workspace. */
  readonly workspaceId?: string;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    allowPublicAccessWhenBehindVnet: item["allowPublicAccessWhenBehindVnet"],
    applicationInsights: item["applicationInsights"],
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : item["associatedWorkspaces"].map((p: any) => {
          return p;
        }),
    containerRegistry: item["containerRegistry"],
    description: item["description"],
    discoveryUrl: item["discoveryUrl"],
    enableDataIsolation: item["enableDataIsolation"],
    enableServiceSideCMKEncryption: item["enableServiceSideCMKEncryption"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertySerializer(item["encryption"]),
    featureStoreSettings: !item["featureStoreSettings"]
      ? item["featureStoreSettings"]
      : featureStoreSettingsSerializer(item["featureStoreSettings"]),
    friendlyName: item["friendlyName"],
    hbiWorkspace: item["hbiWorkspace"],
    hubResourceId: item["hubResourceId"],
    imageBuildCompute: item["imageBuildCompute"],
    keyVault: item["keyVault"],
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsSerializer(item["managedNetwork"]),
    primaryUserAssignedIdentity: item["primaryUserAssignedIdentity"],
    provisionNetworkNow: item["provisionNetworkNow"],
    publicNetworkAccess: item["publicNetworkAccess"],
    serverlessComputeSettings: !item["serverlessComputeSettings"]
      ? item["serverlessComputeSettings"]
      : serverlessComputeSettingsSerializer(item["serverlessComputeSettings"]),
    serviceManagedResourcesSettings: !item["serviceManagedResourcesSettings"]
      ? item["serviceManagedResourcesSettings"]
      : serviceManagedResourcesSettingsSerializer(item["serviceManagedResourcesSettings"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArraySerializer(item["sharedPrivateLinkResources"]),
    storageAccount: item["storageAccount"],
    systemDatastoresAuthMode: item["systemDatastoresAuthMode"],
    v1LegacyMode: item["v1LegacyMode"],
    workspaceHubConfig: !item["workspaceHubConfig"]
      ? item["workspaceHubConfig"]
      : workspaceHubConfigSerializer(item["workspaceHubConfig"]),
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    allowPublicAccessWhenBehindVnet: item["allowPublicAccessWhenBehindVnet"],
    applicationInsights: item["applicationInsights"],
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : item["associatedWorkspaces"].map((p: any) => {
          return p;
        }),
    containerRegistry: item["containerRegistry"],
    description: item["description"],
    discoveryUrl: item["discoveryUrl"],
    enableDataIsolation: item["enableDataIsolation"],
    enableServiceSideCMKEncryption: item["enableServiceSideCMKEncryption"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertyDeserializer(item["encryption"]),
    featureStoreSettings: !item["featureStoreSettings"]
      ? item["featureStoreSettings"]
      : featureStoreSettingsDeserializer(item["featureStoreSettings"]),
    friendlyName: item["friendlyName"],
    hbiWorkspace: item["hbiWorkspace"],
    hubResourceId: item["hubResourceId"],
    imageBuildCompute: item["imageBuildCompute"],
    keyVault: item["keyVault"],
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsDeserializer(item["managedNetwork"]),
    mlFlowTrackingUri: item["mlFlowTrackingUri"],
    notebookInfo: !item["notebookInfo"]
      ? item["notebookInfo"]
      : notebookResourceInfoDeserializer(item["notebookInfo"]),
    primaryUserAssignedIdentity: item["primaryUserAssignedIdentity"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    privateLinkCount: item["privateLinkCount"],
    provisionNetworkNow: item["provisionNetworkNow"],
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
    serverlessComputeSettings: !item["serverlessComputeSettings"]
      ? item["serverlessComputeSettings"]
      : serverlessComputeSettingsDeserializer(item["serverlessComputeSettings"]),
    serviceManagedResourcesSettings: !item["serviceManagedResourcesSettings"]
      ? item["serviceManagedResourcesSettings"]
      : serviceManagedResourcesSettingsDeserializer(item["serviceManagedResourcesSettings"]),
    serviceProvisionedResourceGroup: item["serviceProvisionedResourceGroup"],
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    storageAccount: item["storageAccount"],
    storageHnsEnabled: item["storageHnsEnabled"],
    systemDatastoresAuthMode: item["systemDatastoresAuthMode"],
    tenantId: item["tenantId"],
    v1LegacyMode: item["v1LegacyMode"],
    workspaceHubConfig: !item["workspaceHubConfig"]
      ? item["workspaceHubConfig"]
      : workspaceHubConfigDeserializer(item["workspaceHubConfig"]),
    workspaceId: item["workspaceId"],
  };
}

/** model interface EncryptionProperty */
export interface EncryptionProperty {
  /**
   * The byok cosmosdb account that customer brings to store customer's data
   * with encryption
   */
  cosmosDbResourceId?: string;
  /** Identity to be used with the keyVault */
  identity?: IdentityForCmk;
  /** KeyVault details to do the encryption */
  keyVaultProperties: KeyVaultProperties;
  /**
   * The byok search account that customer brings to store customer's data
   * with encryption
   */
  searchAccountResourceId?: string;
  /** Indicates whether or not the encryption is enabled for the workspace. */
  status: EncryptionStatus;
  /**
   * The byok storage account that customer brings to store customer's data
   * with encryption
   */
  storageAccountResourceId?: string;
}

export function encryptionPropertySerializer(item: EncryptionProperty): any {
  return {
    cosmosDbResourceId: item["cosmosDbResourceId"],
    identity: !item["identity"] ? item["identity"] : identityForCmkSerializer(item["identity"]),
    keyVaultProperties: keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    searchAccountResourceId: item["searchAccountResourceId"],
    status: item["status"],
    storageAccountResourceId: item["storageAccountResourceId"],
  };
}

export function encryptionPropertyDeserializer(item: any): EncryptionProperty {
  return {
    cosmosDbResourceId: item["cosmosDbResourceId"],
    identity: !item["identity"] ? item["identity"] : identityForCmkDeserializer(item["identity"]),
    keyVaultProperties: keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    searchAccountResourceId: item["searchAccountResourceId"],
    status: item["status"],
    storageAccountResourceId: item["storageAccountResourceId"],
  };
}

/** Identity object used for encryption. */
export interface IdentityForCmk {
  /** UserAssignedIdentity to be used to fetch the encryption key from keyVault */
  userAssignedIdentity?: string;
}

export function identityForCmkSerializer(item: IdentityForCmk): any {
  return { userAssignedIdentity: item["userAssignedIdentity"] };
}

export function identityForCmkDeserializer(item: any): IdentityForCmk {
  return {
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Customer Key vault properties. */
export interface KeyVaultProperties {
  /**
   * Currently, we support only SystemAssigned MSI.
   * We need this when we support UserAssignedIdentities
   */
  identityClientId?: string;
  /** KeyVault key identifier to encrypt the data */
  keyIdentifier: string;
  /** KeyVault Arm Id that contains the data encryption key */
  keyVaultArmId: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    identityClientId: item["identityClientId"],
    keyIdentifier: item["keyIdentifier"],
    keyVaultArmId: item["keyVaultArmId"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    identityClientId: item["identityClientId"],
    keyIdentifier: item["keyIdentifier"],
    keyVaultArmId: item["keyVaultArmId"],
  };
}

/** Indicates whether or not the encryption is enabled for the workspace. */
export enum KnownEncryptionStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether or not the encryption is enabled for the workspace. \
 * {@link KnownEncryptionStatus} can be used interchangeably with EncryptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type EncryptionStatus = string;

/** model interface FeatureStoreSettings */
export interface FeatureStoreSettings {
  computeRuntime?: ComputeRuntimeDto;
  offlineStoreConnectionName?: string;
  onlineStoreConnectionName?: string;
}

export function featureStoreSettingsSerializer(item: FeatureStoreSettings): any {
  return {
    computeRuntime: !item["computeRuntime"]
      ? item["computeRuntime"]
      : computeRuntimeDtoSerializer(item["computeRuntime"]),
    offlineStoreConnectionName: item["offlineStoreConnectionName"],
    onlineStoreConnectionName: item["onlineStoreConnectionName"],
  };
}

export function featureStoreSettingsDeserializer(item: any): FeatureStoreSettings {
  return {
    computeRuntime: !item["computeRuntime"]
      ? item["computeRuntime"]
      : computeRuntimeDtoDeserializer(item["computeRuntime"]),
    offlineStoreConnectionName: item["offlineStoreConnectionName"],
    onlineStoreConnectionName: item["onlineStoreConnectionName"],
  };
}

/** model interface ComputeRuntimeDto */
export interface ComputeRuntimeDto {
  sparkRuntimeVersion?: string;
}

export function computeRuntimeDtoSerializer(item: ComputeRuntimeDto): any {
  return { sparkRuntimeVersion: item["sparkRuntimeVersion"] };
}

export function computeRuntimeDtoDeserializer(item: any): ComputeRuntimeDto {
  return {
    sparkRuntimeVersion: item["sparkRuntimeVersion"],
  };
}

/** Managed Network settings for a machine learning workspace. */
export interface ManagedNetworkSettings {
  /** A flag to indicate if monitoring needs to be enabled for the managed network. */
  enableNetworkMonitor?: boolean;
  /** Isolation mode for the managed network of a machine learning workspace. */
  isolationMode?: IsolationMode;
  readonly networkId?: string;
  /** Dictionary of <OutboundRule> */
  outboundRules?: Record<string, OutboundRuleUnion>;
  /** Status of the Provisioning for the managed network of a machine learning workspace. */
  status?: ManagedNetworkProvisionStatus;
  /** Firewall Sku used for FQDN Rules */
  firewallSku?: FirewallSku;
  /** The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled. */
  managedNetworkKind?: ManagedNetworkKind;
  /** Public IP address assigned to the Azure Firewall. */
  readonly firewallPublicIpAddress?: string;
}

export function managedNetworkSettingsSerializer(item: ManagedNetworkSettings): any {
  return {
    enableNetworkMonitor: item["enableNetworkMonitor"],
    isolationMode: item["isolationMode"],
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleUnionRecordSerializer(item["outboundRules"]),
    status: !item["status"]
      ? item["status"]
      : managedNetworkProvisionStatusSerializer(item["status"]),
    firewallSku: item["firewallSku"],
    managedNetworkKind: item["managedNetworkKind"],
  };
}

export function managedNetworkSettingsDeserializer(item: any): ManagedNetworkSettings {
  return {
    enableNetworkMonitor: item["enableNetworkMonitor"],
    isolationMode: item["isolationMode"],
    networkId: item["networkId"],
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleUnionRecordDeserializer(item["outboundRules"]),
    status: !item["status"]
      ? item["status"]
      : managedNetworkProvisionStatusDeserializer(item["status"]),
    firewallSku: item["firewallSku"],
    managedNetworkKind: item["managedNetworkKind"],
    firewallPublicIpAddress: item["firewallPublicIpAddress"],
  };
}

/** Isolation mode for the managed network of a machine learning workspace. */
export enum KnownIsolationMode {
  /** Disabled */
  Disabled = "Disabled",
  /** AllowInternetOutbound */
  AllowInternetOutbound = "AllowInternetOutbound",
  /** AllowOnlyApprovedOutbound */
  AllowOnlyApprovedOutbound = "AllowOnlyApprovedOutbound",
}

/**
 * Isolation mode for the managed network of a machine learning workspace. \
 * {@link KnownIsolationMode} can be used interchangeably with IsolationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **AllowInternetOutbound** \
 * **AllowOnlyApprovedOutbound**
 */
export type IsolationMode = string;

export function outboundRuleUnionRecordSerializer(
  item: Record<string, OutboundRule>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : outboundRuleUnionSerializer(item[key]);
  });
  return result;
}

export function outboundRuleUnionRecordDeserializer(
  item: Record<string, any>,
): Record<string, OutboundRule> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : outboundRuleUnionDeserializer(item[key]);
  });
  return result;
}

/** Outbound Rule for the managed network of a machine learning workspace. */
export interface OutboundRule {
  /** Category of a managed network Outbound Rule of a machine learning workspace. */
  category?: RuleCategory;
  /** Type of a managed network Outbound Rule of a machine learning workspace. */
  status?: RuleStatus;
  /** Type of a managed network Outbound Rule of a machine learning workspace. */
  /** The discriminator possible values: FQDN, PrivateEndpoint, ServiceTag */
  type: RuleType;
  /** Error information about an outbound rule of a machine learning workspace if RuleStatus is failed. */
  readonly errorInformation?: string;
  readonly parentRuleNames?: string[];
}

export function outboundRuleSerializer(item: OutboundRule): any {
  return { category: item["category"], status: item["status"], type: item["type"] };
}

export function outboundRuleDeserializer(item: any): OutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for OutboundRuleUnion */
export type OutboundRuleUnion =
  | FqdnOutboundRule
  | PrivateEndpointOutboundRule
  | ServiceTagOutboundRule
  | OutboundRule;

export function outboundRuleUnionSerializer(item: OutboundRuleUnion): any {
  switch (item.type) {
    case "FQDN":
      return fqdnOutboundRuleSerializer(item as FqdnOutboundRule);

    case "PrivateEndpoint":
      return privateEndpointOutboundRuleSerializer(item as PrivateEndpointOutboundRule);

    case "ServiceTag":
      return serviceTagOutboundRuleSerializer(item as ServiceTagOutboundRule);

    default:
      return outboundRuleSerializer(item);
  }
}

export function outboundRuleUnionDeserializer(item: any): OutboundRuleUnion {
  switch (item["type"]) {
    case "FQDN":
      return fqdnOutboundRuleDeserializer(item as FqdnOutboundRule);

    case "PrivateEndpoint":
      return privateEndpointOutboundRuleDeserializer(item as PrivateEndpointOutboundRule);

    case "ServiceTag":
      return serviceTagOutboundRuleDeserializer(item as ServiceTagOutboundRule);

    default:
      return outboundRuleDeserializer(item);
  }
}

/** Category of a managed network Outbound Rule of a machine learning workspace. */
export enum KnownRuleCategory {
  /** Required */
  Required = "Required",
  /** Recommended */
  Recommended = "Recommended",
  /** UserDefined */
  UserDefined = "UserDefined",
  /** Dependency */
  Dependency = "Dependency",
}

/**
 * Category of a managed network Outbound Rule of a machine learning workspace. \
 * {@link KnownRuleCategory} can be used interchangeably with RuleCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Required** \
 * **Recommended** \
 * **UserDefined** \
 * **Dependency**
 */
export type RuleCategory = string;

/** Type of a managed network Outbound Rule of a machine learning workspace. */
export enum KnownRuleStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * Type of a managed network Outbound Rule of a machine learning workspace. \
 * {@link KnownRuleStatus} can be used interchangeably with RuleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive** \
 * **Active** \
 * **Provisioning** \
 * **Deleting** \
 * **Failed**
 */
export type RuleStatus = string;

/** Type of a managed network Outbound Rule of a machine learning workspace. */
export enum KnownRuleType {
  /** FQDN */
  Fqdn = "FQDN",
  /** PrivateEndpoint */
  PrivateEndpoint = "PrivateEndpoint",
  /** ServiceTag */
  ServiceTag = "ServiceTag",
}

/**
 * Type of a managed network Outbound Rule of a machine learning workspace. \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FQDN** \
 * **PrivateEndpoint** \
 * **ServiceTag**
 */
export type RuleType = string;

/** FQDN Outbound Rule for the managed network of a machine learning workspace. */
export interface FqdnOutboundRule extends OutboundRule {
  destination?: string;
  /** Type of a managed network Outbound Rule of a machine learning workspace. */
  type: "FQDN";
}

export function fqdnOutboundRuleSerializer(item: FqdnOutboundRule): any {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    destination: item["destination"],
  };
}

export function fqdnOutboundRuleDeserializer(item: any): FqdnOutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
    destination: item["destination"],
  };
}

/** Private Endpoint Outbound Rule for the managed network of a machine learning workspace. */
export interface PrivateEndpointOutboundRule extends OutboundRule {
  /** Private Endpoint destination for a Private Endpoint Outbound Rule for the managed network of a machine learning workspace. */
  destination?: PrivateEndpointDestination;
  fqdns?: string[];
  /** Type of a managed network Outbound Rule of a machine learning workspace. */
  type: "PrivateEndpoint";
}

export function privateEndpointOutboundRuleSerializer(item: PrivateEndpointOutboundRule): any {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    destination: !item["destination"]
      ? item["destination"]
      : privateEndpointDestinationSerializer(item["destination"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

export function privateEndpointOutboundRuleDeserializer(item: any): PrivateEndpointOutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
    destination: !item["destination"]
      ? item["destination"]
      : privateEndpointDestinationDeserializer(item["destination"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

/** Private Endpoint destination for a Private Endpoint Outbound Rule for the managed network of a machine learning workspace. */
export interface PrivateEndpointDestination {
  serviceResourceId?: string;
  sparkEnabled?: boolean;
  /** Type of a managed network Outbound Rule of a machine learning workspace. */
  sparkStatus?: RuleStatus;
  subresourceTarget?: string;
}

export function privateEndpointDestinationSerializer(item: PrivateEndpointDestination): any {
  return {
    serviceResourceId: item["serviceResourceId"],
    sparkEnabled: item["sparkEnabled"],
    sparkStatus: item["sparkStatus"],
    subresourceTarget: item["subresourceTarget"],
  };
}

export function privateEndpointDestinationDeserializer(item: any): PrivateEndpointDestination {
  return {
    serviceResourceId: item["serviceResourceId"],
    sparkEnabled: item["sparkEnabled"],
    sparkStatus: item["sparkStatus"],
    subresourceTarget: item["subresourceTarget"],
  };
}

/** Service Tag Outbound Rule for the managed network of a machine learning workspace. */
export interface ServiceTagOutboundRule extends OutboundRule {
  /** Service Tag destination for a Service Tag Outbound Rule for the managed network of a machine learning workspace. */
  destination?: ServiceTagDestination;
  /** Type of a managed network Outbound Rule of a machine learning workspace. */
  type: "ServiceTag";
}

export function serviceTagOutboundRuleSerializer(item: ServiceTagOutboundRule): any {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    destination: !item["destination"]
      ? item["destination"]
      : serviceTagDestinationSerializer(item["destination"]),
  };
}

export function serviceTagOutboundRuleDeserializer(item: any): ServiceTagOutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
    destination: !item["destination"]
      ? item["destination"]
      : serviceTagDestinationDeserializer(item["destination"]),
  };
}

/** Service Tag destination for a Service Tag Outbound Rule for the managed network of a machine learning workspace. */
export interface ServiceTagDestination {
  /** The action enum for networking rule. */
  action?: RuleAction;
  /** Optional, if provided, the ServiceTag property will be ignored. */
  addressPrefixes?: string[];
  portRanges?: string;
  protocol?: string;
  serviceTag?: string;
}

export function serviceTagDestinationSerializer(item: ServiceTagDestination): any {
  return {
    action: item["action"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    portRanges: item["portRanges"],
    protocol: item["protocol"],
    serviceTag: item["serviceTag"],
  };
}

export function serviceTagDestinationDeserializer(item: any): ServiceTagDestination {
  return {
    action: item["action"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    portRanges: item["portRanges"],
    protocol: item["protocol"],
    serviceTag: item["serviceTag"],
  };
}

/** The action enum for networking rule. */
export enum KnownRuleAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * The action enum for networking rule. \
 * {@link KnownRuleAction} can be used interchangeably with RuleAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type RuleAction = string;

/** Status of the Provisioning for the managed network of a machine learning workspace. */
export interface ManagedNetworkProvisionStatus {
  sparkReady?: boolean;
  /** Status for the managed network of a machine learning workspace. */
  status?: ManagedNetworkStatus;
}

export function managedNetworkProvisionStatusSerializer(item: ManagedNetworkProvisionStatus): any {
  return { sparkReady: item["sparkReady"], status: item["status"] };
}

export function managedNetworkProvisionStatusDeserializer(
  item: any,
): ManagedNetworkProvisionStatus {
  return {
    sparkReady: item["sparkReady"],
    status: item["status"],
  };
}

/** Status for the managed network of a machine learning workspace. */
export enum KnownManagedNetworkStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
}

/**
 * Status for the managed network of a machine learning workspace. \
 * {@link KnownManagedNetworkStatus} can be used interchangeably with ManagedNetworkStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive** \
 * **Active**
 */
export type ManagedNetworkStatus = string;

/** Firewall Sku used for FQDN Rules */
export enum KnownFirewallSku {
  /** Standard */
  Standard = "Standard",
  /** Basic */
  Basic = "Basic",
}

/**
 * Firewall Sku used for FQDN Rules \
 * {@link KnownFirewallSku} can be used interchangeably with FirewallSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **Basic**
 */
export type FirewallSku = string;

/** The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled. */
export enum KnownManagedNetworkKind {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled. \
 * {@link KnownManagedNetworkKind} can be used interchangeably with ManagedNetworkKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type ManagedNetworkKind = string;

/** model interface NotebookResourceInfo */
export interface NotebookResourceInfo {
  fqdn?: string;
  isPrivateLinkEnabled?: boolean;
  /** The error that occurs when preparing notebook. */
  notebookPreparationError?: NotebookPreparationError;
  /** the data plane resourceId that used to initialize notebook component */
  resourceId?: string;
}

export function notebookResourceInfoDeserializer(item: any): NotebookResourceInfo {
  return {
    fqdn: item["fqdn"],
    isPrivateLinkEnabled: item["isPrivateLinkEnabled"],
    notebookPreparationError: !item["notebookPreparationError"]
      ? item["notebookPreparationError"]
      : notebookPreparationErrorDeserializer(item["notebookPreparationError"]),
    resourceId: item["resourceId"],
  };
}

/** model interface NotebookPreparationError */
export interface NotebookPreparationError {
  errorMessage?: string;
  statusCode?: number;
}

export function notebookPreparationErrorDeserializer(item: any): NotebookPreparationError {
  return {
    errorMessage: item["errorMessage"],
    statusCode: item["statusCode"],
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

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Optional. This field is required to be implemented by the RP because AML is supporting more than one tier */
  sku?: Sku;
  /** *Same as workspace location. */
  location?: string;
  tags?: Record<string, string>;
  privateEndpoint?: WorkspacePrivateEndpointResource;
  /** The connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The current provisioning state. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    location: item["location"],
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
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Private endpoint connection properties. */
export interface PrivateEndpointConnectionProperties {
  privateEndpoint?: WorkspacePrivateEndpointResource;
  /** The connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The current provisioning state. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : workspacePrivateEndpointResourceSerializer(item["privateEndpoint"]),
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
      : workspacePrivateEndpointResourceDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** The Private Endpoint resource. */
export interface WorkspacePrivateEndpointResource {
  /** e.g. /subscriptions/{networkSubscriptionId}/resourceGroups/{rgName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName} */
  readonly id?: string;
  /** The subnetId that the private endpoint is connected to. */
  readonly subnetArmId?: string;
}

export function workspacePrivateEndpointResourceSerializer(
  item: WorkspacePrivateEndpointResource,
): any {
  return item;
}

export function workspacePrivateEndpointResourceDeserializer(
  item: any,
): WorkspacePrivateEndpointResource {
  return {
    id: item["id"],
    subnetArmId: item["subnetArmId"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Some RP chose "None". Other RPs use this for region expansion. */
  actionsRequired?: string;
  /** User-defined message that, per NRP doc, may be used for approval-related message. */
  description?: string;
  /** Connection status of the service consumer with the service provider\r\nPossible state transitions\r\nPending -> Approved (Service provider approves the connection request)\r\nPending -> Rejected (Service provider rejects the connection request)\r\nPending -> Disconnected (Service provider deletes the connection)\r\nApproved -> Rejected (Service provider rejects the approved connection)\r\nApproved -> Disconnected (Service provider deletes the connection)\r\nRejected -> Pending (Service consumer re-initiates the connection request that was rejected)\r\nRejected -> Disconnected (Service provider deletes the connection) */
  status?: EndpointServiceConnectionStatus;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    actionsRequired: item["actionsRequired"],
    description: item["description"],
    status: item["status"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    actionsRequired: item["actionsRequired"],
    description: item["description"],
    status: item["status"],
  };
}

/** Connection status of the service consumer with the service provider */
export enum KnownEndpointServiceConnectionStatus {
  /** Approved */
  Approved = "Approved",
  /** Pending */
  Pending = "Pending",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Timeout */
  Timeout = "Timeout",
}

/**
 * Connection status of the service consumer with the service provider \
 * {@link KnownEndpointServiceConnectionStatus} can be used interchangeably with EndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved** \
 * **Pending** \
 * **Rejected** \
 * **Disconnected** \
 * **Timeout**
 */
export type EndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

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

/** The provision state of the cluster. Valid values are Unknown, Updating, Provisioning, Succeeded, and Failed. */
export enum KnownProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Updating */
  Updating = "Updating",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provision state of the cluster. Valid values are Unknown, Updating, Provisioning, Succeeded, and Failed. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Updating** \
 * **Creating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** Enum to determine whether PublicNetworkAccess is Enabled or Disabled. */
export enum KnownPublicNetworkAccessType {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enum to determine whether PublicNetworkAccess is Enabled or Disabled. \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccessType = string;

/** model interface ServerlessComputeSettings */
export interface ServerlessComputeSettings {
  /** The resource ID of an existing virtual network subnet in which serverless compute nodes should be deployed */
  serverlessComputeCustomSubnet?: string;
  /** The flag to signal if serverless compute nodes deployed in custom vNet would have no public IP addresses for a workspace with private endpoint */
  serverlessComputeNoPublicIP?: boolean;
}

export function serverlessComputeSettingsSerializer(item: ServerlessComputeSettings): any {
  return {
    serverlessComputeCustomSubnet: item["serverlessComputeCustomSubnet"],
    serverlessComputeNoPublicIP: item["serverlessComputeNoPublicIP"],
  };
}

export function serverlessComputeSettingsDeserializer(item: any): ServerlessComputeSettings {
  return {
    serverlessComputeCustomSubnet: item["serverlessComputeCustomSubnet"],
    serverlessComputeNoPublicIP: item["serverlessComputeNoPublicIP"],
  };
}

/** model interface ServiceManagedResourcesSettings */
export interface ServiceManagedResourcesSettings {
  cosmosDb?: CosmosDbSettings;
}

export function serviceManagedResourcesSettingsSerializer(
  item: ServiceManagedResourcesSettings,
): any {
  return {
    cosmosDb: !item["cosmosDb"] ? item["cosmosDb"] : cosmosDbSettingsSerializer(item["cosmosDb"]),
  };
}

export function serviceManagedResourcesSettingsDeserializer(
  item: any,
): ServiceManagedResourcesSettings {
  return {
    cosmosDb: !item["cosmosDb"] ? item["cosmosDb"] : cosmosDbSettingsDeserializer(item["cosmosDb"]),
  };
}

/** model interface CosmosDbSettings */
export interface CosmosDbSettings {
  collectionsThroughput?: number;
}

export function cosmosDbSettingsSerializer(item: CosmosDbSettings): any {
  return { collectionsThroughput: item["collectionsThroughput"] };
}

export function cosmosDbSettingsDeserializer(item: any): CosmosDbSettings {
  return {
    collectionsThroughput: item["collectionsThroughput"],
  };
}

export function sharedPrivateLinkResourceArraySerializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceSerializer(item);
  });
}

export function sharedPrivateLinkResourceArrayDeserializer(
  result: Array<SharedPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return sharedPrivateLinkResourceDeserializer(item);
  });
}

/** model interface SharedPrivateLinkResource */
export interface SharedPrivateLinkResource {
  /** Unique name of the private link */
  name?: string;
  /** group id of the private link */
  groupId?: string;
  /** the resource id that private link links to */
  privateLinkResourceId?: string;
  /** Request message */
  requestMessage?: string;
  /** Connection status of the service consumer with the service provider\r\nPossible state transitions\r\nPending -> Approved (Service provider approves the connection request)\r\nPending -> Rejected (Service provider rejects the connection request)\r\nPending -> Disconnected (Service provider deletes the connection)\r\nApproved -> Rejected (Service provider rejects the approved connection)\r\nApproved -> Disconnected (Service provider deletes the connection)\r\nRejected -> Pending (Service consumer re-initiates the connection request that was rejected)\r\nRejected -> Disconnected (Service provider deletes the connection) */
  status?: EndpointServiceConnectionStatus;
}

export function sharedPrivateLinkResourceSerializer(item: SharedPrivateLinkResource): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, [
      "groupId",
      "privateLinkResourceId",
      "requestMessage",
      "status",
    ])
      ? undefined
      : _sharedPrivateLinkResourcePropertiesSerializer(item),
  };
}

export function sharedPrivateLinkResourceDeserializer(item: any): SharedPrivateLinkResource {
  return {
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _sharedPrivateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a shared private link resource. */
export interface SharedPrivateLinkResourceProperty {
  /** group id of the private link */
  groupId?: string;
  /** the resource id that private link links to */
  privateLinkResourceId?: string;
  /** Request message */
  requestMessage?: string;
  /** Connection status of the service consumer with the service provider\r\nPossible state transitions\r\nPending -> Approved (Service provider approves the connection request)\r\nPending -> Rejected (Service provider rejects the connection request)\r\nPending -> Disconnected (Service provider deletes the connection)\r\nApproved -> Rejected (Service provider rejects the approved connection)\r\nApproved -> Disconnected (Service provider deletes the connection)\r\nRejected -> Pending (Service consumer re-initiates the connection request that was rejected)\r\nRejected -> Disconnected (Service provider deletes the connection) */
  status?: EndpointServiceConnectionStatus;
}

export function sharedPrivateLinkResourcePropertySerializer(
  item: SharedPrivateLinkResourceProperty,
): any {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    requestMessage: item["requestMessage"],
    status: item["status"],
  };
}

export function sharedPrivateLinkResourcePropertyDeserializer(
  item: any,
): SharedPrivateLinkResourceProperty {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    requestMessage: item["requestMessage"],
    status: item["status"],
  };
}

/** The auth mode used for accessing the system datastores of the workspace. */
export enum KnownSystemDatastoresAuthMode {
  /** AccessKey */
  AccessKey = "AccessKey",
  /** Identity */
  Identity = "Identity",
  /** UserDelegationSAS */
  UserDelegationSAS = "UserDelegationSAS",
}

/**
 * The auth mode used for accessing the system datastores of the workspace. \
 * {@link KnownSystemDatastoresAuthMode} can be used interchangeably with SystemDatastoresAuthMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccessKey** \
 * **Identity** \
 * **UserDelegationSAS**
 */
export type SystemDatastoresAuthMode = string;

/** WorkspaceHub's configuration object. */
export interface WorkspaceHubConfig {
  additionalWorkspaceStorageAccounts?: string[];
  defaultWorkspaceResourceGroup?: string;
}

export function workspaceHubConfigSerializer(item: WorkspaceHubConfig): any {
  return {
    additionalWorkspaceStorageAccounts: !item["additionalWorkspaceStorageAccounts"]
      ? item["additionalWorkspaceStorageAccounts"]
      : item["additionalWorkspaceStorageAccounts"].map((p: any) => {
          return p;
        }),
    defaultWorkspaceResourceGroup: item["defaultWorkspaceResourceGroup"],
  };
}

export function workspaceHubConfigDeserializer(item: any): WorkspaceHubConfig {
  return {
    additionalWorkspaceStorageAccounts: !item["additionalWorkspaceStorageAccounts"]
      ? item["additionalWorkspaceStorageAccounts"]
      : item["additionalWorkspaceStorageAccounts"].map((p: any) => {
          return p;
        }),
    defaultWorkspaceResourceGroup: item["defaultWorkspaceResourceGroup"],
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

/** The parameters for updating a machine learning workspace. */
export interface WorkspaceUpdateParameters {
  identity?: ManagedServiceIdentity;
  /** Optional. This field is required to be implemented by the RP because AML is supporting more than one tier */
  sku?: Sku;
  /** The resource tags for the machine learning workspace. */
  tags?: Record<string, string>;
  /** ARM id of the application insights associated with this workspace. */
  applicationInsights?: string;
  /** ARM id of the container registry associated with this workspace. */
  containerRegistry?: string;
  /** The description of this workspace. */
  description?: string;
  enableDataIsolation?: boolean;
  encryption?: EncryptionUpdateProperties;
  /** Settings for feature store type workspace. */
  featureStoreSettings?: FeatureStoreSettings;
  /** The friendly name for this workspace. This name in mutable */
  friendlyName?: string;
  /** The compute name for image build */
  imageBuildCompute?: string;
  managedNetwork?: ManagedNetworkSettings;
  /** The user assigned identity resource id that represents the workspace identity. */
  primaryUserAssignedIdentity?: string;
  /** Whether requests from Public Network are allowed. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Settings for serverless compute in a workspace */
  serverlessComputeSettings?: ServerlessComputeSettings;
  /** The service managed resource settings. */
  serviceManagedResourcesSettings?: ServiceManagedResourcesSettings;
  /** The auth mode used for accessing the system datastores of the workspace. */
  systemDatastoresAuthMode?: SystemDatastoresAuthMode;
  /** Enabling v1_legacy_mode may prevent you from using features provided by the v2 API. */
  v1LegacyMode?: boolean;
}

export function workspaceUpdateParametersSerializer(item: WorkspaceUpdateParameters): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "applicationInsights",
      "containerRegistry",
      "description",
      "enableDataIsolation",
      "encryption",
      "featureStoreSettings",
      "friendlyName",
      "imageBuildCompute",
      "managedNetwork",
      "primaryUserAssignedIdentity",
      "publicNetworkAccess",
      "serverlessComputeSettings",
      "serviceManagedResourcesSettings",
      "systemDatastoresAuthMode",
      "v1LegacyMode",
    ])
      ? undefined
      : _workspaceUpdateParametersPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** The parameters for updating a machine learning workspace. */
export interface WorkspacePropertiesUpdateParameters {
  /** ARM id of the application insights associated with this workspace. */
  applicationInsights?: string;
  /** ARM id of the container registry associated with this workspace. */
  containerRegistry?: string;
  /** The description of this workspace. */
  description?: string;
  enableDataIsolation?: boolean;
  encryption?: EncryptionUpdateProperties;
  /** Settings for feature store type workspace. */
  featureStoreSettings?: FeatureStoreSettings;
  /** The friendly name for this workspace. This name in mutable */
  friendlyName?: string;
  /** The compute name for image build */
  imageBuildCompute?: string;
  managedNetwork?: ManagedNetworkSettings;
  /** The user assigned identity resource id that represents the workspace identity. */
  primaryUserAssignedIdentity?: string;
  /** Whether requests from Public Network are allowed. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Settings for serverless compute in a workspace */
  serverlessComputeSettings?: ServerlessComputeSettings;
  /** The service managed resource settings. */
  serviceManagedResourcesSettings?: ServiceManagedResourcesSettings;
  /** The auth mode used for accessing the system datastores of the workspace. */
  systemDatastoresAuthMode?: SystemDatastoresAuthMode;
  /** Enabling v1_legacy_mode may prevent you from using features provided by the v2 API. */
  v1LegacyMode?: boolean;
}

export function workspacePropertiesUpdateParametersSerializer(
  item: WorkspacePropertiesUpdateParameters,
): any {
  return {
    applicationInsights: item["applicationInsights"],
    containerRegistry: item["containerRegistry"],
    description: item["description"],
    enableDataIsolation: item["enableDataIsolation"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionUpdatePropertiesSerializer(item["encryption"]),
    featureStoreSettings: !item["featureStoreSettings"]
      ? item["featureStoreSettings"]
      : featureStoreSettingsSerializer(item["featureStoreSettings"]),
    friendlyName: item["friendlyName"],
    imageBuildCompute: item["imageBuildCompute"],
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsSerializer(item["managedNetwork"]),
    primaryUserAssignedIdentity: item["primaryUserAssignedIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    serverlessComputeSettings: !item["serverlessComputeSettings"]
      ? item["serverlessComputeSettings"]
      : serverlessComputeSettingsSerializer(item["serverlessComputeSettings"]),
    serviceManagedResourcesSettings: !item["serviceManagedResourcesSettings"]
      ? item["serviceManagedResourcesSettings"]
      : serviceManagedResourcesSettingsSerializer(item["serviceManagedResourcesSettings"]),
    systemDatastoresAuthMode: item["systemDatastoresAuthMode"],
    v1LegacyMode: item["v1LegacyMode"],
  };
}

/** model interface EncryptionUpdateProperties */
export interface EncryptionUpdateProperties {
  keyVaultProperties: EncryptionKeyVaultUpdateProperties;
}

export function encryptionUpdatePropertiesSerializer(item: EncryptionUpdateProperties): any {
  return {
    keyVaultProperties: encryptionKeyVaultUpdatePropertiesSerializer(item["keyVaultProperties"]),
  };
}

/** model interface EncryptionKeyVaultUpdateProperties */
export interface EncryptionKeyVaultUpdateProperties {
  keyIdentifier: string;
}

export function encryptionKeyVaultUpdatePropertiesSerializer(
  item: EncryptionKeyVaultUpdateProperties,
): any {
  return { keyIdentifier: item["keyIdentifier"] };
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

/** Parameters to diagnose a workspace */
export interface DiagnoseWorkspaceParameters {
  value?: DiagnoseRequestProperties;
}

export function diagnoseWorkspaceParametersSerializer(item: DiagnoseWorkspaceParameters): any {
  return {
    value: !item["value"] ? item["value"] : diagnoseRequestPropertiesSerializer(item["value"]),
  };
}

/** model interface DiagnoseRequestProperties */
export interface DiagnoseRequestProperties {
  /** Setting for diagnosing dependent application insights */
  applicationInsights?: Record<string, any>;
  /** Setting for diagnosing dependent container registry */
  containerRegistry?: Record<string, any>;
  /** Setting for diagnosing dns resolution */
  dnsResolution?: Record<string, any>;
  /** Setting for diagnosing dependent key vault */
  keyVault?: Record<string, any>;
  /** Setting for diagnosing network security group */
  nsg?: Record<string, any>;
  /** Setting for diagnosing unclassified category of problems */
  others?: Record<string, any>;
  /** Setting for diagnosing the presence of required resource providers in the workspace. */
  requiredResourceProviders?: Record<string, any>;
  /** Setting for diagnosing resource lock */
  resourceLock?: Record<string, any>;
  /** Setting for diagnosing dependent storage account */
  storageAccount?: Record<string, any>;
  /** Setting for diagnosing user defined routing */
  udr?: Record<string, any>;
}

export function diagnoseRequestPropertiesSerializer(item: DiagnoseRequestProperties): any {
  return {
    applicationInsights: item["applicationInsights"],
    containerRegistry: item["containerRegistry"],
    dnsResolution: item["dnsResolution"],
    keyVault: item["keyVault"],
    nsg: item["nsg"],
    others: item["others"],
    requiredResourceProviders: item["requiredResourceProviders"],
    resourceLock: item["resourceLock"],
    storageAccount: item["storageAccount"],
    udr: item["udr"],
  };
}

/** model interface DiagnoseResponseResult */
export interface DiagnoseResponseResult {
  value?: DiagnoseResponseResultValue;
}

export function diagnoseResponseResultDeserializer(item: any): DiagnoseResponseResult {
  return {
    value: !item["value"] ? item["value"] : diagnoseResponseResultValueDeserializer(item["value"]),
  };
}

/** model interface DiagnoseResponseResultValue */
export interface DiagnoseResponseResultValue {
  userDefinedRouteResults?: DiagnoseResult[];
  networkSecurityRuleResults?: DiagnoseResult[];
  resourceLockResults?: DiagnoseResult[];
  dnsResolutionResults?: DiagnoseResult[];
  storageAccountResults?: DiagnoseResult[];
  keyVaultResults?: DiagnoseResult[];
  containerRegistryResults?: DiagnoseResult[];
  applicationInsightsResults?: DiagnoseResult[];
  otherResults?: DiagnoseResult[];
}

export function diagnoseResponseResultValueDeserializer(item: any): DiagnoseResponseResultValue {
  return {
    userDefinedRouteResults: !item["userDefinedRouteResults"]
      ? item["userDefinedRouteResults"]
      : diagnoseResultArrayDeserializer(item["userDefinedRouteResults"]),
    networkSecurityRuleResults: !item["networkSecurityRuleResults"]
      ? item["networkSecurityRuleResults"]
      : diagnoseResultArrayDeserializer(item["networkSecurityRuleResults"]),
    resourceLockResults: !item["resourceLockResults"]
      ? item["resourceLockResults"]
      : diagnoseResultArrayDeserializer(item["resourceLockResults"]),
    dnsResolutionResults: !item["dnsResolutionResults"]
      ? item["dnsResolutionResults"]
      : diagnoseResultArrayDeserializer(item["dnsResolutionResults"]),
    storageAccountResults: !item["storageAccountResults"]
      ? item["storageAccountResults"]
      : diagnoseResultArrayDeserializer(item["storageAccountResults"]),
    keyVaultResults: !item["keyVaultResults"]
      ? item["keyVaultResults"]
      : diagnoseResultArrayDeserializer(item["keyVaultResults"]),
    containerRegistryResults: !item["containerRegistryResults"]
      ? item["containerRegistryResults"]
      : diagnoseResultArrayDeserializer(item["containerRegistryResults"]),
    applicationInsightsResults: !item["applicationInsightsResults"]
      ? item["applicationInsightsResults"]
      : diagnoseResultArrayDeserializer(item["applicationInsightsResults"]),
    otherResults: !item["otherResults"]
      ? item["otherResults"]
      : diagnoseResultArrayDeserializer(item["otherResults"]),
  };
}

export function diagnoseResultArrayDeserializer(result: Array<DiagnoseResult>): any[] {
  return result.map((item) => {
    return diagnoseResultDeserializer(item);
  });
}

/** Result of Diagnose */
export interface DiagnoseResult {
  /** Code for workspace setup error */
  readonly code?: string;
  /** Level of workspace setup error */
  readonly level?: DiagnoseResultLevel;
  /** Message of workspace setup error */
  readonly message?: string;
}

export function diagnoseResultDeserializer(item: any): DiagnoseResult {
  return {
    code: item["code"],
    level: item["level"],
    message: item["message"],
  };
}

/** Level of workspace setup error */
export enum KnownDiagnoseResultLevel {
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
  /** Information */
  Information = "Information",
}

/**
 * Level of workspace setup error \
 * {@link KnownDiagnoseResultLevel} can be used interchangeably with DiagnoseResultLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning** \
 * **Error** \
 * **Information**
 */
export type DiagnoseResultLevel = string;

/** model interface ListWorkspaceKeysResult */
export interface ListWorkspaceKeysResult {
  /** The access key of the workspace app insights */
  readonly appInsightsInstrumentationKey?: string;
  containerRegistryCredentials?: RegistryListCredentialsResult;
  notebookAccessKeys?: ListNotebookKeysResult;
  /** The arm Id key of the workspace storage */
  readonly userStorageArmId?: string;
  /** The access key of the workspace storage */
  readonly userStorageKey?: string;
}

export function listWorkspaceKeysResultDeserializer(item: any): ListWorkspaceKeysResult {
  return {
    appInsightsInstrumentationKey: item["appInsightsInstrumentationKey"],
    containerRegistryCredentials: !item["containerRegistryCredentials"]
      ? item["containerRegistryCredentials"]
      : registryListCredentialsResultDeserializer(item["containerRegistryCredentials"]),
    notebookAccessKeys: !item["notebookAccessKeys"]
      ? item["notebookAccessKeys"]
      : listNotebookKeysResultDeserializer(item["notebookAccessKeys"]),
    userStorageArmId: item["userStorageArmId"],
    userStorageKey: item["userStorageKey"],
  };
}

/** model interface RegistryListCredentialsResult */
export interface RegistryListCredentialsResult {
  /** The location of the workspace ACR */
  readonly location?: string;
  passwords?: Password[];
  /** The username of the workspace ACR */
  readonly username?: string;
}

export function registryListCredentialsResultDeserializer(
  item: any,
): RegistryListCredentialsResult {
  return {
    location: item["location"],
    passwords: !item["passwords"]
      ? item["passwords"]
      : passwordArrayDeserializer(item["passwords"]),
    username: item["username"],
  };
}

export function passwordArrayDeserializer(result: Array<Password>): any[] {
  return result.map((item) => {
    return passwordDeserializer(item);
  });
}

/** model interface Password */
export interface Password {
  readonly name?: string;
  readonly value?: string;
}

export function passwordDeserializer(item: any): Password {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** model interface ListNotebookKeysResult */
export interface ListNotebookKeysResult {
  /** The primary access key of the Notebook */
  readonly primaryAccessKey?: string;
  /** The secondary access key of the Notebook */
  readonly secondaryAccessKey?: string;
}

export function listNotebookKeysResultDeserializer(item: any): ListNotebookKeysResult {
  return {
    primaryAccessKey: item["primaryAccessKey"],
    secondaryAccessKey: item["secondaryAccessKey"],
  };
}

/** model interface NotebookAccessTokenResult */
export interface NotebookAccessTokenResult {
  readonly accessToken?: string;
  readonly expiresIn?: number;
  readonly hostName?: string;
  readonly notebookResourceId?: string;
  readonly publicDns?: string;
  readonly refreshToken?: string;
  readonly scope?: string;
  readonly tokenType?: string;
}

export function notebookAccessTokenResultDeserializer(item: any): NotebookAccessTokenResult {
  return {
    accessToken: item["accessToken"],
    expiresIn: item["expiresIn"],
    hostName: item["hostName"],
    notebookResourceId: item["notebookResourceId"],
    publicDns: item["publicDns"],
    refreshToken: item["refreshToken"],
    scope: item["scope"],
    tokenType: item["tokenType"],
  };
}

/** model interface ListStorageAccountKeysResult */
export interface ListStorageAccountKeysResult {
  /** The access key of the storage */
  readonly userStorageKey?: string;
}

export function listStorageAccountKeysResultDeserializer(item: any): ListStorageAccountKeysResult {
  return {
    userStorageKey: item["userStorageKey"],
  };
}

/** model interface ExternalFqdnResponse */
export interface ExternalFqdnResponse {
  value?: FqdnEndpointsPropertyBag[];
}

export function externalFqdnResponseDeserializer(item: any): ExternalFqdnResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : fqdnEndpointsPropertyBagArrayDeserializer(item["value"]),
  };
}

export function fqdnEndpointsPropertyBagArrayDeserializer(
  result: Array<FqdnEndpointsPropertyBag>,
): any[] {
  return result.map((item) => {
    return fqdnEndpointsPropertyBagDeserializer(item);
  });
}

/** Property bag for FQDN endpoints result */
export interface FqdnEndpointsPropertyBag {
  properties?: FqdnEndpoints;
}

export function fqdnEndpointsPropertyBagDeserializer(item: any): FqdnEndpointsPropertyBag {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fqdnEndpointsDeserializer(item["properties"]),
  };
}

/** model interface FqdnEndpoints */
export interface FqdnEndpoints {
  category?: string;
  endpoints?: FqdnEndpoint[];
}

export function fqdnEndpointsDeserializer(item: any): FqdnEndpoints {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : fqdnEndpointArrayDeserializer(item["endpoints"]),
  };
}

export function fqdnEndpointArrayDeserializer(result: Array<FqdnEndpoint>): any[] {
  return result.map((item) => {
    return fqdnEndpointDeserializer(item);
  });
}

/** model interface FqdnEndpoint */
export interface FqdnEndpoint {
  domainName?: string;
  endpointDetails?: FqdnEndpointDetail[];
}

export function fqdnEndpointDeserializer(item: any): FqdnEndpoint {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : fqdnEndpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function fqdnEndpointDetailArrayDeserializer(result: Array<FqdnEndpointDetail>): any[] {
  return result.map((item) => {
    return fqdnEndpointDetailDeserializer(item);
  });
}

/** model interface FqdnEndpointDetail */
export interface FqdnEndpointDetail {
  port?: number;
}

export function fqdnEndpointDetailDeserializer(item: any): FqdnEndpointDetail {
  return {
    port: item["port"],
  };
}

/** Azure Resource Manager resource envelope. */
export interface CodeContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: CodeContainerProperties;
}

export function codeContainerSerializer(item: CodeContainer): any {
  return { properties: codeContainerPropertiesSerializer(item["properties"]) };
}

export function codeContainerDeserializer(item: any): CodeContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: codeContainerPropertiesDeserializer(item["properties"]),
  };
}

/** Container for code asset versions. */
export interface CodeContainerProperties extends AssetContainer {
  /** Provisioning state for the code container. */
  readonly provisioningState?: AssetProvisioningState;
}

export function codeContainerPropertiesSerializer(item: CodeContainerProperties): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function codeContainerPropertiesDeserializer(item: any): CodeContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of registry asset. */
export enum KnownAssetProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of registry asset. \
 * {@link KnownAssetProvisioningState} can be used interchangeably with AssetProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Creating** \
 * **Updating** \
 * **Deleting**
 */
export type AssetProvisioningState = string;

/** model interface AssetContainer */
export interface AssetContainer extends ResourceBase {
  /** Is the asset archived? */
  isArchived?: boolean;
  /** The latest version inside this container. */
  readonly latestVersion?: string;
  /** The next auto incremental version */
  readonly nextVersion?: string;
}

export function assetContainerSerializer(item: AssetContainer): any {
  return {
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    isArchived: item["isArchived"],
  };
}

export function assetContainerDeserializer(item: any): AssetContainer {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
  };
}

/** model interface ResourceBase */
export interface ResourceBase {
  /** The asset description text. */
  description?: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function resourceBaseSerializer(item: ResourceBase): any {
  return { description: item["description"], properties: item["properties"], tags: item["tags"] };
}

export function resourceBaseDeserializer(item: any): ResourceBase {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** A paginated list of CodeContainer entities. */
export interface _CodeContainerResourceArmPaginatedResult {
  /** The CodeContainer items on this page */
  value: CodeContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _codeContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _CodeContainerResourceArmPaginatedResult {
  return {
    value: codeContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function codeContainerArraySerializer(result: Array<CodeContainer>): any[] {
  return result.map((item) => {
    return codeContainerSerializer(item);
  });
}

export function codeContainerArrayDeserializer(result: Array<CodeContainer>): any[] {
  return result.map((item) => {
    return codeContainerDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface Registry extends TrackedResource {
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: Sku;
  /** Discovery URL for the Registry */
  discoveryUrl?: string;
  /** IntellectualPropertyPublisher for the registry */
  intellectualPropertyPublisher?: string;
  /** ResourceId of the managed RG if the registry has system created resources */
  managedResourceGroup?: ArmResourceId;
  /** Managed resource group specific settings */
  managedResourceGroupSettings?: ManagedResourceGroupSettings;
  /** MLFlow Registry URI for the Registry */
  mlFlowRegistryUri?: string;
  /** Private endpoint connections info used for pending connections in private link portal */
  registryPrivateEndpointConnections?: RegistryPrivateEndpointConnection[];
  /**
   * Is the Registry accessible from the internet?
   * Possible values: "Enabled" or "Disabled"
   */
  publicNetworkAccess?: string;
  /** Details of each region the registry is in */
  regionDetails?: RegistryRegionArmDetails[];
}

export function registrySerializer(item: Registry): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _registryPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function registryDeserializer(item: any): Registry {
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
    ..._registryPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Details of the Registry */
export interface RegistryProperties {
  /** Discovery URL for the Registry */
  discoveryUrl?: string;
  /** IntellectualPropertyPublisher for the registry */
  intellectualPropertyPublisher?: string;
  /** ResourceId of the managed RG if the registry has system created resources */
  managedResourceGroup?: ArmResourceId;
  /** Managed resource group specific settings */
  managedResourceGroupSettings?: ManagedResourceGroupSettings;
  /** MLFlow Registry URI for the Registry */
  mlFlowRegistryUri?: string;
  /** Private endpoint connections info used for pending connections in private link portal */
  registryPrivateEndpointConnections?: RegistryPrivateEndpointConnection[];
  /**
   * Is the Registry accessible from the internet?
   * Possible values: "Enabled" or "Disabled"
   */
  publicNetworkAccess?: string;
  /** Details of each region the registry is in */
  regionDetails?: RegistryRegionArmDetails[];
}

export function registryPropertiesSerializer(item: RegistryProperties): any {
  return {
    discoveryUrl: item["discoveryUrl"],
    intellectualPropertyPublisher: item["intellectualPropertyPublisher"],
    managedResourceGroup: !item["managedResourceGroup"]
      ? item["managedResourceGroup"]
      : armResourceIdSerializer(item["managedResourceGroup"]),
    managedResourceGroupSettings: !item["managedResourceGroupSettings"]
      ? item["managedResourceGroupSettings"]
      : managedResourceGroupSettingsSerializer(item["managedResourceGroupSettings"]),
    mlFlowRegistryUri: item["mlFlowRegistryUri"],
    registryPrivateEndpointConnections: !item["registryPrivateEndpointConnections"]
      ? item["registryPrivateEndpointConnections"]
      : registryPrivateEndpointConnectionArraySerializer(
          item["registryPrivateEndpointConnections"],
        ),
    publicNetworkAccess: item["publicNetworkAccess"],
    regionDetails: !item["regionDetails"]
      ? item["regionDetails"]
      : registryRegionArmDetailsArraySerializer(item["regionDetails"]),
  };
}

export function registryPropertiesDeserializer(item: any): RegistryProperties {
  return {
    discoveryUrl: item["discoveryUrl"],
    intellectualPropertyPublisher: item["intellectualPropertyPublisher"],
    managedResourceGroup: !item["managedResourceGroup"]
      ? item["managedResourceGroup"]
      : armResourceIdDeserializer(item["managedResourceGroup"]),
    managedResourceGroupSettings: !item["managedResourceGroupSettings"]
      ? item["managedResourceGroupSettings"]
      : managedResourceGroupSettingsDeserializer(item["managedResourceGroupSettings"]),
    mlFlowRegistryUri: item["mlFlowRegistryUri"],
    registryPrivateEndpointConnections: !item["registryPrivateEndpointConnections"]
      ? item["registryPrivateEndpointConnections"]
      : registryPrivateEndpointConnectionArrayDeserializer(
          item["registryPrivateEndpointConnections"],
        ),
    publicNetworkAccess: item["publicNetworkAccess"],
    regionDetails: !item["regionDetails"]
      ? item["regionDetails"]
      : registryRegionArmDetailsArrayDeserializer(item["regionDetails"]),
  };
}

/** ARM ResourceId of a resource */
export interface ArmResourceId {
  /**
   * Arm ResourceId is in the format "/subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Storage/storageAccounts/{StorageAccountName}"
   * or "/subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{AcrName}"
   */
  resourceId?: string;
}

export function armResourceIdSerializer(item: ArmResourceId): any {
  return { resourceId: item["resourceId"] };
}

export function armResourceIdDeserializer(item: any): ArmResourceId {
  return {
    resourceId: item["resourceId"],
  };
}

/** Managed resource group settings */
export interface ManagedResourceGroupSettings {
  /** List of assigned identities for the managed resource group */
  assignedIdentities?: ManagedResourceGroupAssignedIdentities[];
}

export function managedResourceGroupSettingsSerializer(item: ManagedResourceGroupSettings): any {
  return {
    assignedIdentities: !item["assignedIdentities"]
      ? item["assignedIdentities"]
      : managedResourceGroupAssignedIdentitiesArraySerializer(item["assignedIdentities"]),
  };
}

export function managedResourceGroupSettingsDeserializer(item: any): ManagedResourceGroupSettings {
  return {
    assignedIdentities: !item["assignedIdentities"]
      ? item["assignedIdentities"]
      : managedResourceGroupAssignedIdentitiesArrayDeserializer(item["assignedIdentities"]),
  };
}

export function managedResourceGroupAssignedIdentitiesArraySerializer(
  result: Array<ManagedResourceGroupAssignedIdentities>,
): any[] {
  return result.map((item) => {
    return managedResourceGroupAssignedIdentitiesSerializer(item);
  });
}

export function managedResourceGroupAssignedIdentitiesArrayDeserializer(
  result: Array<ManagedResourceGroupAssignedIdentities>,
): any[] {
  return result.map((item) => {
    return managedResourceGroupAssignedIdentitiesDeserializer(item);
  });
}

/** Details for managed resource group assigned identities. */
export interface ManagedResourceGroupAssignedIdentities {
  /** Identity principal Id */
  principalId?: string;
}

export function managedResourceGroupAssignedIdentitiesSerializer(
  item: ManagedResourceGroupAssignedIdentities,
): any {
  return { principalId: item["principalId"] };
}

export function managedResourceGroupAssignedIdentitiesDeserializer(
  item: any,
): ManagedResourceGroupAssignedIdentities {
  return {
    principalId: item["principalId"],
  };
}

export function registryPrivateEndpointConnectionArraySerializer(
  result: Array<RegistryPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return registryPrivateEndpointConnectionSerializer(item);
  });
}

export function registryPrivateEndpointConnectionArrayDeserializer(
  result: Array<RegistryPrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return registryPrivateEndpointConnectionDeserializer(item);
  });
}

/** Private endpoint connection definition. */
export interface RegistryPrivateEndpointConnection {
  /**
   * This is the private endpoint connection name created on SRP
   * Full resource id: /subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.MachineLearningServices/{resourceType}/{resourceName}/registryPrivateEndpointConnections/{peConnectionName}
   */
  id?: string;
  /** Same as workspace location. */
  location?: string;
  /** Properties of the Private Endpoint Connection */
  properties?: RegistryPrivateEndpointConnectionProperties;
}

export function registryPrivateEndpointConnectionSerializer(
  item: RegistryPrivateEndpointConnection,
): any {
  return {
    id: item["id"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : registryPrivateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function registryPrivateEndpointConnectionDeserializer(
  item: any,
): RegistryPrivateEndpointConnection {
  return {
    id: item["id"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : registryPrivateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the Private Endpoint Connection */
export interface RegistryPrivateEndpointConnectionProperties {
  /** The group ids */
  groupIds?: string[];
  /** The PE network resource that is linked to this PE connection. */
  privateEndpoint?: PrivateEndpointResource;
  /** The connection state. */
  registryPrivateLinkServiceConnectionState?: RegistryPrivateLinkServiceConnectionState;
  /** One of null, "Succeeded", "Provisioning", "Failed". While not approved, it's null. */
  provisioningState?: string;
}

export function registryPrivateEndpointConnectionPropertiesSerializer(
  item: RegistryPrivateEndpointConnectionProperties,
): any {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointResourceSerializer(item["privateEndpoint"]),
    registryPrivateLinkServiceConnectionState: !item["registryPrivateLinkServiceConnectionState"]
      ? item["registryPrivateLinkServiceConnectionState"]
      : registryPrivateLinkServiceConnectionStateSerializer(
          item["registryPrivateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

export function registryPrivateEndpointConnectionPropertiesDeserializer(
  item: any,
): RegistryPrivateEndpointConnectionProperties {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p1: any) => {
          return p1;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointResourceDeserializer(item["privateEndpoint"]),
    registryPrivateLinkServiceConnectionState: !item["registryPrivateLinkServiceConnectionState"]
      ? item["registryPrivateLinkServiceConnectionState"]
      : registryPrivateLinkServiceConnectionStateDeserializer(
          item["registryPrivateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
  };
}

/** The PE network resource that is linked to this PE connection. */
export interface PrivateEndpointResource extends PrivateEndpoint {
  /** The subnetId that the private endpoint is connected to. */
  subnetArmId?: string;
}

export function privateEndpointResourceSerializer(item: PrivateEndpointResource): any {
  return { subnetArmId: item["subnetArmId"] };
}

export function privateEndpointResourceDeserializer(item: any): PrivateEndpointResource {
  return {
    id: item["id"],
    subnetArmId: item["subnetArmId"],
  };
}

/** The connection state. */
export interface RegistryPrivateLinkServiceConnectionState {
  /** Some RP chose "None". Other RPs use this for region expansion. */
  actionsRequired?: string;
  /** User-defined message that, per NRP doc, may be used for approval-related message. */
  description?: string;
  /** Connection status of the service consumer with the service provider */
  status?: EndpointServiceConnectionStatus;
}

export function registryPrivateLinkServiceConnectionStateSerializer(
  item: RegistryPrivateLinkServiceConnectionState,
): any {
  return {
    actionsRequired: item["actionsRequired"],
    description: item["description"],
    status: item["status"],
  };
}

export function registryPrivateLinkServiceConnectionStateDeserializer(
  item: any,
): RegistryPrivateLinkServiceConnectionState {
  return {
    actionsRequired: item["actionsRequired"],
    description: item["description"],
    status: item["status"],
  };
}

export function registryRegionArmDetailsArraySerializer(
  result: Array<RegistryRegionArmDetails>,
): any[] {
  return result.map((item) => {
    return registryRegionArmDetailsSerializer(item);
  });
}

export function registryRegionArmDetailsArrayDeserializer(
  result: Array<RegistryRegionArmDetails>,
): any[] {
  return result.map((item) => {
    return registryRegionArmDetailsDeserializer(item);
  });
}

/** Details for each region the registry is in */
export interface RegistryRegionArmDetails {
  /** List of ACR accounts */
  acrDetails?: AcrDetails[];
  /** The location where the registry exists */
  location?: string;
  /** List of storage accounts */
  storageAccountDetails?: StorageAccountDetails[];
}

export function registryRegionArmDetailsSerializer(item: RegistryRegionArmDetails): any {
  return {
    acrDetails: !item["acrDetails"]
      ? item["acrDetails"]
      : acrDetailsArraySerializer(item["acrDetails"]),
    location: item["location"],
    storageAccountDetails: !item["storageAccountDetails"]
      ? item["storageAccountDetails"]
      : storageAccountDetailsArraySerializer(item["storageAccountDetails"]),
  };
}

export function registryRegionArmDetailsDeserializer(item: any): RegistryRegionArmDetails {
  return {
    acrDetails: !item["acrDetails"]
      ? item["acrDetails"]
      : acrDetailsArrayDeserializer(item["acrDetails"]),
    location: item["location"],
    storageAccountDetails: !item["storageAccountDetails"]
      ? item["storageAccountDetails"]
      : storageAccountDetailsArrayDeserializer(item["storageAccountDetails"]),
  };
}

export function acrDetailsArraySerializer(result: Array<AcrDetails>): any[] {
  return result.map((item) => {
    return acrDetailsSerializer(item);
  });
}

export function acrDetailsArrayDeserializer(result: Array<AcrDetails>): any[] {
  return result.map((item) => {
    return acrDetailsDeserializer(item);
  });
}

/** Details of ACR account to be used for the Registry */
export interface AcrDetails {
  /** Details of system created ACR account to be used for the Registry */
  systemCreatedAcrAccount?: SystemCreatedAcrAccount;
}

export function acrDetailsSerializer(item: AcrDetails): any {
  return {
    systemCreatedAcrAccount: !item["systemCreatedAcrAccount"]
      ? item["systemCreatedAcrAccount"]
      : systemCreatedAcrAccountSerializer(item["systemCreatedAcrAccount"]),
  };
}

export function acrDetailsDeserializer(item: any): AcrDetails {
  return {
    systemCreatedAcrAccount: !item["systemCreatedAcrAccount"]
      ? item["systemCreatedAcrAccount"]
      : systemCreatedAcrAccountDeserializer(item["systemCreatedAcrAccount"]),
  };
}

/** model interface SystemCreatedAcrAccount */
export interface SystemCreatedAcrAccount {
  /** Name of the ACR account */
  acrAccountName?: string;
  /** SKU of the ACR account */
  acrAccountSku?: string;
  /** This is populated once the ACR account is created. */
  armResourceId?: ArmResourceId;
}

export function systemCreatedAcrAccountSerializer(item: SystemCreatedAcrAccount): any {
  return {
    acrAccountName: item["acrAccountName"],
    acrAccountSku: item["acrAccountSku"],
    armResourceId: !item["armResourceId"]
      ? item["armResourceId"]
      : armResourceIdSerializer(item["armResourceId"]),
  };
}

export function systemCreatedAcrAccountDeserializer(item: any): SystemCreatedAcrAccount {
  return {
    acrAccountName: item["acrAccountName"],
    acrAccountSku: item["acrAccountSku"],
    armResourceId: !item["armResourceId"]
      ? item["armResourceId"]
      : armResourceIdDeserializer(item["armResourceId"]),
  };
}

export function storageAccountDetailsArraySerializer(result: Array<StorageAccountDetails>): any[] {
  return result.map((item) => {
    return storageAccountDetailsSerializer(item);
  });
}

export function storageAccountDetailsArrayDeserializer(
  result: Array<StorageAccountDetails>,
): any[] {
  return result.map((item) => {
    return storageAccountDetailsDeserializer(item);
  });
}

/** Details of storage account to be used for the Registry */
export interface StorageAccountDetails {
  /** Details of system created storage account to be used for the registry */
  systemCreatedStorageAccount?: SystemCreatedStorageAccount;
}

export function storageAccountDetailsSerializer(item: StorageAccountDetails): any {
  return {
    systemCreatedStorageAccount: !item["systemCreatedStorageAccount"]
      ? item["systemCreatedStorageAccount"]
      : systemCreatedStorageAccountSerializer(item["systemCreatedStorageAccount"]),
  };
}

export function storageAccountDetailsDeserializer(item: any): StorageAccountDetails {
  return {
    systemCreatedStorageAccount: !item["systemCreatedStorageAccount"]
      ? item["systemCreatedStorageAccount"]
      : systemCreatedStorageAccountDeserializer(item["systemCreatedStorageAccount"]),
  };
}

/** model interface SystemCreatedStorageAccount */
export interface SystemCreatedStorageAccount {
  /** Public blob access allowed */
  allowBlobPublicAccess?: boolean;
  /** This is populated once the storage account is created. */
  armResourceId?: ArmResourceId;
  /** HNS enabled for storage account */
  storageAccountHnsEnabled?: boolean;
  /** Name of the storage account */
  storageAccountName?: string;
  /**
   * Allowed values:
   * "Standard_LRS",
   * "Standard_GRS",
   * "Standard_RAGRS",
   * "Standard_ZRS",
   * "Standard_GZRS",
   * "Standard_RAGZRS",
   * "Premium_LRS",
   * "Premium_ZRS"
   */
  storageAccountType?: string;
}

export function systemCreatedStorageAccountSerializer(item: SystemCreatedStorageAccount): any {
  return {
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    armResourceId: !item["armResourceId"]
      ? item["armResourceId"]
      : armResourceIdSerializer(item["armResourceId"]),
    storageAccountHnsEnabled: item["storageAccountHnsEnabled"],
    storageAccountName: item["storageAccountName"],
    storageAccountType: item["storageAccountType"],
  };
}

export function systemCreatedStorageAccountDeserializer(item: any): SystemCreatedStorageAccount {
  return {
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    armResourceId: !item["armResourceId"]
      ? item["armResourceId"]
      : armResourceIdDeserializer(item["armResourceId"]),
    storageAccountHnsEnabled: item["storageAccountHnsEnabled"],
    storageAccountName: item["storageAccountName"],
    storageAccountType: item["storageAccountType"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
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

/** Strictly used in update requests. */
export interface PartialRegistryPartialTrackedResource {
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: RegistryPartialManagedServiceIdentity;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: PartialSku;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function partialRegistryPartialTrackedResourceSerializer(
  item: PartialRegistryPartialTrackedResource,
): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : registryPartialManagedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : partialSkuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface RegistryPartialManagedServiceIdentity extends ManagedServiceIdentity {}

export function registryPartialManagedServiceIdentitySerializer(
  item: RegistryPartialManagedServiceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

/** Common SKU definition. */
export interface PartialSku {
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** The name of the SKU. Ex - P3. It is typically a letter+number code. */
  name?: string;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
}

export function partialSkuSerializer(item: PartialSku): any {
  return {
    capacity: item["capacity"],
    family: item["family"],
    name: item["name"],
    size: item["size"],
    tier: item["tier"],
  };
}

/** A paginated list of Registry entities. */
export interface _RegistryTrackedResourceArmPaginatedResult {
  /** The Registry items on this page */
  value: Registry[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _registryTrackedResourceArmPaginatedResultDeserializer(
  item: any,
): _RegistryTrackedResourceArmPaginatedResult {
  return {
    value: registryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function registryArraySerializer(result: Array<Registry>): any[] {
  return result.map((item) => {
    return registrySerializer(item);
  });
}

export function registryArrayDeserializer(result: Array<Registry>): any[] {
  return result.map((item) => {
    return registryDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface CodeVersion extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: CodeVersionProperties;
}

export function codeVersionSerializer(item: CodeVersion): any {
  return { properties: codeVersionPropertiesSerializer(item["properties"]) };
}

export function codeVersionDeserializer(item: any): CodeVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: codeVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Code asset version details. */
export interface CodeVersionProperties extends AssetBase {
  /** Uri where code is located */
  codeUri?: string;
  /** Provisioning state for the code version. */
  readonly provisioningState?: AssetProvisioningState;
}

export function codeVersionPropertiesSerializer(item: CodeVersionProperties): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    codeUri: item["codeUri"],
  };
}

export function codeVersionPropertiesDeserializer(item: any): CodeVersionProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    codeUri: item["codeUri"],
    provisioningState: item["provisioningState"],
  };
}

/** model interface AssetBase */
export interface AssetBase extends ResourceBase {
  /** If the name version are system generated (anonymous registration). */
  isAnonymous?: boolean;
  /** Is the asset archived? */
  isArchived?: boolean;
}

export function assetBaseSerializer(item: AssetBase): any {
  return {
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
  };
}

export function assetBaseDeserializer(item: any): AssetBase {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
  };
}

/** A paginated list of CodeVersion entities. */
export interface _CodeVersionResourceArmPaginatedResult {
  /** The CodeVersion items on this page */
  value: CodeVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _codeVersionResourceArmPaginatedResultDeserializer(
  item: any,
): _CodeVersionResourceArmPaginatedResult {
  return {
    value: codeVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function codeVersionArraySerializer(result: Array<CodeVersion>): any[] {
  return result.map((item) => {
    return codeVersionSerializer(item);
  });
}

export function codeVersionArrayDeserializer(result: Array<CodeVersion>): any[] {
  return result.map((item) => {
    return codeVersionDeserializer(item);
  });
}

/** Publishing destination registry asset information */
export interface DestinationAsset {
  /** Destination asset name */
  destinationName?: string;
  /** Destination asset version */
  destinationVersion?: string;
  /** Destination registry name */
  registryName?: string;
}

export function destinationAssetSerializer(item: DestinationAsset): any {
  return {
    destinationName: item["destinationName"],
    destinationVersion: item["destinationVersion"],
    registryName: item["registryName"],
  };
}

/** model interface PendingUploadRequestDto */
export interface PendingUploadRequestDto {
  /** If PendingUploadId = null then random guid will be used. */
  pendingUploadId?: string;
  /** Type of storage to use for the pending upload location */
  pendingUploadType?: PendingUploadType;
}

export function pendingUploadRequestDtoSerializer(item: PendingUploadRequestDto): any {
  return { pendingUploadId: item["pendingUploadId"], pendingUploadType: item["pendingUploadType"] };
}

/** Type of storage to use for the pending upload location */
export enum KnownPendingUploadType {
  /** None */
  None = "None",
  /** TemporaryBlobReference */
  TemporaryBlobReference = "TemporaryBlobReference",
}

/**
 * Type of storage to use for the pending upload location \
 * {@link KnownPendingUploadType} can be used interchangeably with PendingUploadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **TemporaryBlobReference**
 */
export type PendingUploadType = string;

/** model interface PendingUploadResponseDto */
export interface PendingUploadResponseDto {
  /** Container level read, write, list SAS */
  blobReferenceForConsumption?: BlobReferenceForConsumptionDto;
  /** ID for this upload request */
  pendingUploadId?: string;
  /** Type of storage to use for the pending upload location */
  pendingUploadType?: PendingUploadType;
}

export function pendingUploadResponseDtoDeserializer(item: any): PendingUploadResponseDto {
  return {
    blobReferenceForConsumption: !item["blobReferenceForConsumption"]
      ? item["blobReferenceForConsumption"]
      : blobReferenceForConsumptionDtoDeserializer(item["blobReferenceForConsumption"]),
    pendingUploadId: item["pendingUploadId"],
    pendingUploadType: item["pendingUploadType"],
  };
}

/** model interface BlobReferenceForConsumptionDto */
export interface BlobReferenceForConsumptionDto {
  /**
   * Blob URI path for client to upload data.
   * Example: https://blob.windows.core.net/Container/Path
   */
  blobUri?: string;
  /** Credential info to access storage account */
  credential?: PendingUploadCredentialDtoUnion;
  /** Arm ID of the storage account to use */
  storageAccountArmId?: string;
}

export function blobReferenceForConsumptionDtoDeserializer(
  item: any,
): BlobReferenceForConsumptionDto {
  return {
    blobUri: item["blobUri"],
    credential: !item["credential"]
      ? item["credential"]
      : pendingUploadCredentialDtoUnionDeserializer(item["credential"]),
    storageAccountArmId: item["storageAccountArmId"],
  };
}

/** model interface PendingUploadCredentialDto */
export interface PendingUploadCredentialDto {
  /** [Required] Credential type used to authentication with storage. */
  /** The discriminator possible values: SAS */
  credentialType: PendingUploadCredentialType;
}

export function pendingUploadCredentialDtoDeserializer(item: any): PendingUploadCredentialDto {
  return {
    credentialType: item["credentialType"],
  };
}

/** Alias for PendingUploadCredentialDtoUnion */
export type PendingUploadCredentialDtoUnion = SASCredentialDto | PendingUploadCredentialDto;

export function pendingUploadCredentialDtoUnionDeserializer(
  item: any,
): PendingUploadCredentialDtoUnion {
  switch (item["credentialType"]) {
    case "SAS":
      return sasCredentialDtoDeserializer(item as SASCredentialDto);

    default:
      return pendingUploadCredentialDtoDeserializer(item);
  }
}

/** Enum to determine the PendingUpload credentials type. */
export enum KnownPendingUploadCredentialType {
  /** SAS */
  SAS = "SAS",
}

/**
 * Enum to determine the PendingUpload credentials type. \
 * {@link KnownPendingUploadCredentialType} can be used interchangeably with PendingUploadCredentialType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SAS**
 */
export type PendingUploadCredentialType = string;

/** model interface SASCredentialDto */
export interface SASCredentialDto extends PendingUploadCredentialDto {
  /** Full SAS Uri, including the storage, container/blob path and SAS token */
  sasUri?: string;
  /** [Required] Credential type used to authentication with storage. */
  credentialType: "SAS";
}

export function sasCredentialDtoDeserializer(item: any): SASCredentialDto {
  return {
    credentialType: item["credentialType"],
    sasUri: item["sasUri"],
  };
}

/** Azure Resource Manager resource envelope. */
export interface ComponentContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: ComponentContainerProperties;
}

export function componentContainerSerializer(item: ComponentContainer): any {
  return { properties: componentContainerPropertiesSerializer(item["properties"]) };
}

export function componentContainerDeserializer(item: any): ComponentContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: componentContainerPropertiesDeserializer(item["properties"]),
  };
}

/**
 * Component container definition.
 * <see href="https://docs.microsoft.com/en-us/azure/machine-learning/reference-yaml-component-command" />
 */
export interface ComponentContainerProperties extends AssetContainer {
  /** Provisioning state for the component container. */
  readonly provisioningState?: AssetProvisioningState;
}

export function componentContainerPropertiesSerializer(item: ComponentContainerProperties): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function componentContainerPropertiesDeserializer(item: any): ComponentContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** A paginated list of ComponentContainer entities. */
export interface _ComponentContainerResourceArmPaginatedResult {
  /** The ComponentContainer items on this page */
  value: ComponentContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _componentContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _ComponentContainerResourceArmPaginatedResult {
  return {
    value: componentContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function componentContainerArraySerializer(result: Array<ComponentContainer>): any[] {
  return result.map((item) => {
    return componentContainerSerializer(item);
  });
}

export function componentContainerArrayDeserializer(result: Array<ComponentContainer>): any[] {
  return result.map((item) => {
    return componentContainerDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface ComponentVersion extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: ComponentVersionProperties;
}

export function componentVersionSerializer(item: ComponentVersion): any {
  return { properties: componentVersionPropertiesSerializer(item["properties"]) };
}

export function componentVersionDeserializer(item: any): ComponentVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: componentVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of a component version: defines resources that span component types. */
export interface ComponentVersionProperties extends AssetBase {
  /**
   * Defines Component definition details.
   * <see href="https://docs.microsoft.com/en-us/azure/machine-learning/reference-yaml-component-command" />
   */
  componentSpec?: any;
  /** Provisioning state for the component version. */
  readonly provisioningState?: AssetProvisioningState;
}

export function componentVersionPropertiesSerializer(item: ComponentVersionProperties): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    componentSpec: item["componentSpec"],
  };
}

export function componentVersionPropertiesDeserializer(item: any): ComponentVersionProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    componentSpec: item["componentSpec"],
    provisioningState: item["provisioningState"],
  };
}

/** A paginated list of ComponentVersion entities. */
export interface _ComponentVersionResourceArmPaginatedResult {
  /** The ComponentVersion items on this page */
  value: ComponentVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _componentVersionResourceArmPaginatedResultDeserializer(
  item: any,
): _ComponentVersionResourceArmPaginatedResult {
  return {
    value: componentVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function componentVersionArraySerializer(result: Array<ComponentVersion>): any[] {
  return result.map((item) => {
    return componentVersionSerializer(item);
  });
}

export function componentVersionArrayDeserializer(result: Array<ComponentVersion>): any[] {
  return result.map((item) => {
    return componentVersionDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface DataContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: DataContainerProperties;
}

export function dataContainerSerializer(item: DataContainer): any {
  return { properties: dataContainerPropertiesSerializer(item["properties"]) };
}

export function dataContainerDeserializer(item: any): DataContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: dataContainerPropertiesDeserializer(item["properties"]),
  };
}

/** Container for data asset versions. */
export interface DataContainerProperties extends AssetContainer {
  /** [Required] Specifies the type of data. */
  dataType: DataType;
}

export function dataContainerPropertiesSerializer(item: DataContainerProperties): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    dataType: item["dataType"],
  };
}

export function dataContainerPropertiesDeserializer(item: any): DataContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataType: item["dataType"],
  };
}

/** Enum to determine the type of data. */
export enum KnownDataType {
  /** uri_file */
  UriFile = "uri_file",
  /** uri_folder */
  UriFolder = "uri_folder",
  /** mltable */
  Mltable = "mltable",
}

/**
 * Enum to determine the type of data. \
 * {@link KnownDataType} can be used interchangeably with DataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **uri_file** \
 * **uri_folder** \
 * **mltable**
 */
export type DataType = string;

/** A paginated list of DataContainer entities. */
export interface _DataContainerResourceArmPaginatedResult {
  /** The DataContainer items on this page */
  value: DataContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _DataContainerResourceArmPaginatedResult {
  return {
    value: dataContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataContainerArraySerializer(result: Array<DataContainer>): any[] {
  return result.map((item) => {
    return dataContainerSerializer(item);
  });
}

export function dataContainerArrayDeserializer(result: Array<DataContainer>): any[] {
  return result.map((item) => {
    return dataContainerDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface DataVersionBase extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: DataVersionBasePropertiesUnion;
}

export function dataVersionBaseSerializer(item: DataVersionBase): any {
  return { properties: dataVersionBasePropertiesUnionSerializer(item["properties"]) };
}

export function dataVersionBaseDeserializer(item: any): DataVersionBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: dataVersionBasePropertiesUnionDeserializer(item["properties"]),
  };
}

/** Data version base definition */
export interface DataVersionBaseProperties extends AssetBase {
  /** [Required] Specifies the type of data. */
  /** The discriminator possible values: mltable, uri_file, uri_folder */
  dataType: DataType;
  /** [Required] Uri of the data. Example: https://go.microsoft.com/fwlink/?linkid=2202330 */
  dataUri: string;
}

export function dataVersionBasePropertiesSerializer(item: DataVersionBaseProperties): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    dataType: item["dataType"],
    dataUri: item["dataUri"],
  };
}

export function dataVersionBasePropertiesDeserializer(item: any): DataVersionBaseProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataType: item["dataType"],
    dataUri: item["dataUri"],
  };
}

/** Alias for DataVersionBasePropertiesUnion */
export type DataVersionBasePropertiesUnion =
  | MLTableData
  | UriFileDataVersion
  | UriFolderDataVersion
  | DataVersionBaseProperties;

export function dataVersionBasePropertiesUnionSerializer(
  item: DataVersionBasePropertiesUnion,
): any {
  switch (item.dataType) {
    case "mltable":
      return mlTableDataSerializer(item as MLTableData);

    case "uri_file":
      return uriFileDataVersionSerializer(item as UriFileDataVersion);

    case "uri_folder":
      return uriFolderDataVersionSerializer(item as UriFolderDataVersion);

    default:
      return dataVersionBasePropertiesSerializer(item);
  }
}

export function dataVersionBasePropertiesUnionDeserializer(
  item: any,
): DataVersionBasePropertiesUnion {
  switch (item["dataType"]) {
    case "mltable":
      return mlTableDataDeserializer(item as MLTableData);

    case "uri_file":
      return uriFileDataVersionDeserializer(item as UriFileDataVersion);

    case "uri_folder":
      return uriFolderDataVersionDeserializer(item as UriFolderDataVersion);

    default:
      return dataVersionBasePropertiesDeserializer(item);
  }
}

/** MLTable data definition */
export interface MLTableData extends DataVersionBaseProperties {
  /** Uris referenced in the MLTable definition (required for lineage) */
  referencedUris?: string[];
  /** [Required] Specifies the type of data. */
  dataType: "mltable";
}

export function mlTableDataSerializer(item: MLTableData): any {
  return {
    dataType: item["dataType"],
    dataUri: item["dataUri"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    referencedUris: !item["referencedUris"]
      ? item["referencedUris"]
      : item["referencedUris"].map((p: any) => {
          return p;
        }),
  };
}

export function mlTableDataDeserializer(item: any): MLTableData {
  return {
    dataType: item["dataType"],
    dataUri: item["dataUri"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    referencedUris: !item["referencedUris"]
      ? item["referencedUris"]
      : item["referencedUris"].map((p1: any) => {
          return p1;
        }),
  };
}

/** uri-file data version entity */
export interface UriFileDataVersion extends DataVersionBaseProperties {
  /** [Required] Specifies the type of data. */
  dataType: "uri_file";
}

export function uriFileDataVersionSerializer(item: UriFileDataVersion): any {
  return {
    dataType: item["dataType"],
    dataUri: item["dataUri"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function uriFileDataVersionDeserializer(item: any): UriFileDataVersion {
  return {
    dataType: item["dataType"],
    dataUri: item["dataUri"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** uri-folder data version entity */
export interface UriFolderDataVersion extends DataVersionBaseProperties {
  /** [Required] Specifies the type of data. */
  dataType: "uri_folder";
}

export function uriFolderDataVersionSerializer(item: UriFolderDataVersion): any {
  return {
    dataType: item["dataType"],
    dataUri: item["dataUri"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function uriFolderDataVersionDeserializer(item: any): UriFolderDataVersion {
  return {
    dataType: item["dataType"],
    dataUri: item["dataUri"],
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** A paginated list of DataVersionBase entities. */
export interface _DataVersionBaseResourceArmPaginatedResult {
  /** The DataVersionBase items on this page */
  value: DataVersionBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataVersionBaseResourceArmPaginatedResultDeserializer(
  item: any,
): _DataVersionBaseResourceArmPaginatedResult {
  return {
    value: dataVersionBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataVersionBaseArraySerializer(result: Array<DataVersionBase>): any[] {
  return result.map((item) => {
    return dataVersionBaseSerializer(item);
  });
}

export function dataVersionBaseArrayDeserializer(result: Array<DataVersionBase>): any[] {
  return result.map((item) => {
    return dataVersionBaseDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface EnvironmentContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: EnvironmentContainerProperties;
}

export function environmentContainerSerializer(item: EnvironmentContainer): any {
  return { properties: environmentContainerPropertiesSerializer(item["properties"]) };
}

export function environmentContainerDeserializer(item: any): EnvironmentContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: environmentContainerPropertiesDeserializer(item["properties"]),
  };
}

/** Container for environment specification versions. */
export interface EnvironmentContainerProperties extends AssetContainer {
  /** Provisioning state for the environment container. */
  readonly provisioningState?: AssetProvisioningState;
}

export function environmentContainerPropertiesSerializer(
  item: EnvironmentContainerProperties,
): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function environmentContainerPropertiesDeserializer(
  item: any,
): EnvironmentContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** A paginated list of EnvironmentContainer entities. */
export interface _EnvironmentContainerResourceArmPaginatedResult {
  /** The EnvironmentContainer items on this page */
  value: EnvironmentContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _environmentContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _EnvironmentContainerResourceArmPaginatedResult {
  return {
    value: environmentContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentContainerArraySerializer(result: Array<EnvironmentContainer>): any[] {
  return result.map((item) => {
    return environmentContainerSerializer(item);
  });
}

export function environmentContainerArrayDeserializer(result: Array<EnvironmentContainer>): any[] {
  return result.map((item) => {
    return environmentContainerDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface EnvironmentVersion extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: EnvironmentVersionProperties;
}

export function environmentVersionSerializer(item: EnvironmentVersion): any {
  return { properties: environmentVersionPropertiesSerializer(item["properties"]) };
}

export function environmentVersionDeserializer(item: any): EnvironmentVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: environmentVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Environment version details. */
export interface EnvironmentVersionProperties extends AssetBase {
  /** AutoRebuild setting for the derived image */
  autoRebuild?: AutoRebuildSetting;
  /** Configuration settings for Docker build context. */
  build?: BuildContext;
  /**
   * Standard configuration file used by Conda that lets you install any kind of package, including Python, R, and C/C++ packages.
   * <see href="https://repo2docker.readthedocs.io/en/latest/config_files.html#environment-yml-install-a-conda-environment" />
   */
  condaFile?: string;
  /**
   * Environment type is either user managed or curated by the Azure ML service
   * <see href="https://docs.microsoft.com/en-us/azure/machine-learning/resource-curated-environments" />
   */
  readonly environmentType?: EnvironmentType;
  /**
   * Name of the image that will be used for the environment.
   * <seealso href="https://docs.microsoft.com/en-us/azure/machine-learning/how-to-deploy-custom-docker-image#use-a-custom-base-image" />
   */
  image?: string;
  /** Defines configuration specific to inference. */
  inferenceConfig?: InferenceContainerProperties;
  /** The type of operating system. */
  osType?: OperatingSystemType;
  /** Provisioning state for the environment version. */
  readonly provisioningState?: AssetProvisioningState;
  /** Stage in the environment lifecycle assigned to this environment */
  stage?: string;
}

export function environmentVersionPropertiesSerializer(item: EnvironmentVersionProperties): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    autoRebuild: item["autoRebuild"],
    build: !item["build"] ? item["build"] : buildContextSerializer(item["build"]),
    condaFile: item["condaFile"],
    image: item["image"],
    inferenceConfig: !item["inferenceConfig"]
      ? item["inferenceConfig"]
      : inferenceContainerPropertiesSerializer(item["inferenceConfig"]),
    osType: item["osType"],
    stage: item["stage"],
  };
}

export function environmentVersionPropertiesDeserializer(item: any): EnvironmentVersionProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    autoRebuild: item["autoRebuild"],
    build: !item["build"] ? item["build"] : buildContextDeserializer(item["build"]),
    condaFile: item["condaFile"],
    environmentType: item["environmentType"],
    image: item["image"],
    inferenceConfig: !item["inferenceConfig"]
      ? item["inferenceConfig"]
      : inferenceContainerPropertiesDeserializer(item["inferenceConfig"]),
    osType: item["osType"],
    provisioningState: item["provisioningState"],
    stage: item["stage"],
  };
}

/** AutoRebuild setting for the derived image */
export enum KnownAutoRebuildSetting {
  /** Disabled */
  Disabled = "Disabled",
  /** OnBaseImageUpdate */
  OnBaseImageUpdate = "OnBaseImageUpdate",
}

/**
 * AutoRebuild setting for the derived image \
 * {@link KnownAutoRebuildSetting} can be used interchangeably with AutoRebuildSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **OnBaseImageUpdate**
 */
export type AutoRebuildSetting = string;

/** Configuration settings for Docker build context */
export interface BuildContext {
  /**
   * [Required] URI of the Docker build context used to build the image. Supports blob URIs on environment creation and may return blob or Git URIs.
   * <seealso href="https://docs.docker.com/engine/reference/commandline/build/#extended-description" />
   */
  contextUri: string;
  /**
   * Path to the Dockerfile in the build context.
   * <seealso href="https://docs.docker.com/engine/reference/builder/" />
   */
  dockerfilePath?: string;
}

export function buildContextSerializer(item: BuildContext): any {
  return { contextUri: item["contextUri"], dockerfilePath: item["dockerfilePath"] };
}

export function buildContextDeserializer(item: any): BuildContext {
  return {
    contextUri: item["contextUri"],
    dockerfilePath: item["dockerfilePath"],
  };
}

/** Environment type is either user created or curated by Azure ML service */
export enum KnownEnvironmentType {
  /** Curated */
  Curated = "Curated",
  /** UserCreated */
  UserCreated = "UserCreated",
}

/**
 * Environment type is either user created or curated by Azure ML service \
 * {@link KnownEnvironmentType} can be used interchangeably with EnvironmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Curated** \
 * **UserCreated**
 */
export type EnvironmentType = string;

/** model interface InferenceContainerProperties */
export interface InferenceContainerProperties {
  /** The route to check the liveness of the inference server container. */
  livenessRoute?: Route;
  /** The route to check the readiness of the inference server container. */
  readinessRoute?: Route;
  /** The port to send the scoring requests to, within the inference server container. */
  scoringRoute?: Route;
  /** The route to check the startup of the application in the container. */
  startupRoute?: Route;
}

export function inferenceContainerPropertiesSerializer(item: InferenceContainerProperties): any {
  return {
    livenessRoute: !item["livenessRoute"]
      ? item["livenessRoute"]
      : routeSerializer(item["livenessRoute"]),
    readinessRoute: !item["readinessRoute"]
      ? item["readinessRoute"]
      : routeSerializer(item["readinessRoute"]),
    scoringRoute: !item["scoringRoute"]
      ? item["scoringRoute"]
      : routeSerializer(item["scoringRoute"]),
    startupRoute: !item["startupRoute"]
      ? item["startupRoute"]
      : routeSerializer(item["startupRoute"]),
  };
}

export function inferenceContainerPropertiesDeserializer(item: any): InferenceContainerProperties {
  return {
    livenessRoute: !item["livenessRoute"]
      ? item["livenessRoute"]
      : routeDeserializer(item["livenessRoute"]),
    readinessRoute: !item["readinessRoute"]
      ? item["readinessRoute"]
      : routeDeserializer(item["readinessRoute"]),
    scoringRoute: !item["scoringRoute"]
      ? item["scoringRoute"]
      : routeDeserializer(item["scoringRoute"]),
    startupRoute: !item["startupRoute"]
      ? item["startupRoute"]
      : routeDeserializer(item["startupRoute"]),
  };
}

/** model interface Route */
export interface Route {
  /** [Required] The path for the route. */
  path: string;
  /** [Required] The port for the route. */
  port: number;
}

export function routeSerializer(item: Route): any {
  return { path: item["path"], port: item["port"] };
}

export function routeDeserializer(item: any): Route {
  return {
    path: item["path"],
    port: item["port"],
  };
}

/** The type of operating system. */
export enum KnownOperatingSystemType {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The type of operating system. \
 * {@link KnownOperatingSystemType} can be used interchangeably with OperatingSystemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux** \
 * **Windows**
 */
export type OperatingSystemType = string;

/** A paginated list of EnvironmentVersion entities. */
export interface _EnvironmentVersionResourceArmPaginatedResult {
  /** The EnvironmentVersion items on this page */
  value: EnvironmentVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _environmentVersionResourceArmPaginatedResultDeserializer(
  item: any,
): _EnvironmentVersionResourceArmPaginatedResult {
  return {
    value: environmentVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentVersionArraySerializer(result: Array<EnvironmentVersion>): any[] {
  return result.map((item) => {
    return environmentVersionSerializer(item);
  });
}

export function environmentVersionArrayDeserializer(result: Array<EnvironmentVersion>): any[] {
  return result.map((item) => {
    return environmentVersionDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface ModelContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: ModelContainerProperties;
}

export function modelContainerSerializer(item: ModelContainer): any {
  return { properties: modelContainerPropertiesSerializer(item["properties"]) };
}

export function modelContainerDeserializer(item: any): ModelContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: modelContainerPropertiesDeserializer(item["properties"]),
  };
}

/** model interface ModelContainerProperties */
export interface ModelContainerProperties extends AssetContainer {
  /** Provisioning state for the model container. */
  readonly provisioningState?: AssetProvisioningState;
}

export function modelContainerPropertiesSerializer(item: ModelContainerProperties): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function modelContainerPropertiesDeserializer(item: any): ModelContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** A paginated list of ModelContainer entities. */
export interface _ModelContainerResourceArmPaginatedResult {
  /** The ModelContainer items on this page */
  value: ModelContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _modelContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _ModelContainerResourceArmPaginatedResult {
  return {
    value: modelContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function modelContainerArraySerializer(result: Array<ModelContainer>): any[] {
  return result.map((item) => {
    return modelContainerSerializer(item);
  });
}

export function modelContainerArrayDeserializer(result: Array<ModelContainer>): any[] {
  return result.map((item) => {
    return modelContainerDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface ModelVersion extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: ModelVersionProperties;
}

export function modelVersionSerializer(item: ModelVersion): any {
  return { properties: modelVersionPropertiesSerializer(item["properties"]) };
}

export function modelVersionDeserializer(item: any): ModelVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: modelVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Model asset version details. */
export interface ModelVersionProperties extends AssetBase {
  /** Mapping of model flavors to their properties. */
  flavors?: Record<string, FlavorData>;
  /** Name of the training job which produced this model */
  jobName?: string;
  /** The storage format for this entity. Used for NCD. */
  modelType?: string;
  /** The URI path to the model contents. */
  modelUri?: string;
  /** Provisioning state for the model version. */
  readonly provisioningState?: AssetProvisioningState;
  /** Stage in the model lifecycle assigned to this model */
  stage?: string;
  /** Array of dataset references */
  datasets?: DatasetReference[];
}

export function modelVersionPropertiesSerializer(item: ModelVersionProperties): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    flavors: item["flavors"],
    jobName: item["jobName"],
    modelType: item["modelType"],
    modelUri: item["modelUri"],
    stage: item["stage"],
    datasets: !item["datasets"]
      ? item["datasets"]
      : datasetReferenceArraySerializer(item["datasets"]),
  };
}

export function modelVersionPropertiesDeserializer(item: any): ModelVersionProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    flavors: !item["flavors"]
      ? item["flavors"]
      : Object.fromEntries(
          Object.entries(item["flavors"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : flavorDataDeserializer(p1),
          ]),
        ),
    jobName: item["jobName"],
    modelType: item["modelType"],
    modelUri: item["modelUri"],
    provisioningState: item["provisioningState"],
    stage: item["stage"],
    datasets: !item["datasets"]
      ? item["datasets"]
      : datasetReferenceArrayDeserializer(item["datasets"]),
  };
}

/** model interface FlavorData */
export interface FlavorData {
  /** Model flavor-specific data. */
  data?: Record<string, string>;
}

export function flavorDataSerializer(item: FlavorData): any {
  return { data: item["data"] };
}

export function flavorDataDeserializer(item: any): FlavorData {
  return {
    data: !item["data"]
      ? item["data"]
      : Object.fromEntries(
          Object.entries(item["data"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

export function datasetReferenceArraySerializer(result: Array<DatasetReference>): any[] {
  return result.map((item) => {
    return datasetReferenceSerializer(item);
  });
}

export function datasetReferenceArrayDeserializer(result: Array<DatasetReference>): any[] {
  return result.map((item) => {
    return datasetReferenceDeserializer(item);
  });
}

/** Dataset reference object. */
export interface DatasetReference {
  /** The name of the dataset reference. */
  name?: string;
  /** The fully qualified ARM id of the dataset reference. */
  id?: string;
}

export function datasetReferenceSerializer(item: DatasetReference): any {
  return { name: item["name"], id: item["id"] };
}

export function datasetReferenceDeserializer(item: any): DatasetReference {
  return {
    name: item["name"],
    id: item["id"],
  };
}

/** A paginated list of ModelVersion entities. */
export interface _ModelVersionResourceArmPaginatedResult {
  /** The ModelVersion items on this page */
  value: ModelVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _modelVersionResourceArmPaginatedResultDeserializer(
  item: any,
): _ModelVersionResourceArmPaginatedResult {
  return {
    value: modelVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function modelVersionArraySerializer(result: Array<ModelVersion>): any[] {
  return result.map((item) => {
    return modelVersionSerializer(item);
  });
}

export function modelVersionArrayDeserializer(result: Array<ModelVersion>): any[] {
  return result.map((item) => {
    return modelVersionDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface BatchEndpoint extends TrackedResource {
  /** [Required] Additional attributes of the entity. */
  properties: BatchEndpointProperties;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: Sku;
}

export function batchEndpointSerializer(item: BatchEndpoint): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: batchEndpointPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function batchEndpointDeserializer(item: any): BatchEndpoint {
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
    properties: batchEndpointPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Batch endpoint configuration. */
export interface BatchEndpointProperties extends EndpointPropertiesBase {
  /** Default values for Batch Endpoint */
  defaults?: BatchEndpointDefaults;
  /** Provisioning state for the endpoint. */
  readonly provisioningState?: EndpointProvisioningState;
}

export function batchEndpointPropertiesSerializer(item: BatchEndpointProperties): any {
  return {
    authMode: item["authMode"],
    description: item["description"],
    keys: !item["keys"] ? item["keys"] : endpointAuthKeysSerializer(item["keys"]),
    properties: item["properties"],
    defaults: !item["defaults"]
      ? item["defaults"]
      : batchEndpointDefaultsSerializer(item["defaults"]),
  };
}

export function batchEndpointPropertiesDeserializer(item: any): BatchEndpointProperties {
  return {
    authMode: item["authMode"],
    description: item["description"],
    keys: !item["keys"] ? item["keys"] : endpointAuthKeysDeserializer(item["keys"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    scoringUri: item["scoringUri"],
    swaggerUri: item["swaggerUri"],
    defaults: !item["defaults"]
      ? item["defaults"]
      : batchEndpointDefaultsDeserializer(item["defaults"]),
    provisioningState: item["provisioningState"],
  };
}

/** Batch endpoint default values */
export interface BatchEndpointDefaults {
  /**
   * Name of the deployment that will be default for the endpoint.
   * This deployment will end up getting 100% traffic when the endpoint scoring URL is invoked.
   */
  deploymentName?: string;
}

export function batchEndpointDefaultsSerializer(item: BatchEndpointDefaults): any {
  return { deploymentName: item["deploymentName"] };
}

export function batchEndpointDefaultsDeserializer(item: any): BatchEndpointDefaults {
  return {
    deploymentName: item["deploymentName"],
  };
}

/** State of endpoint provisioning. */
export enum KnownEndpointProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * State of endpoint provisioning. \
 * {@link KnownEndpointProvisioningState} can be used interchangeably with EndpointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Updating** \
 * **Canceled**
 */
export type EndpointProvisioningState = string;

/** Inference Endpoint base definition */
export interface EndpointPropertiesBase {
  /** [Required] The authentication method for invoking the endpoint (data plane operation). Use 'Key' for key-based authentication. Use 'AMLToken' for Azure Machine Learning token-based authentication. Use 'AADToken' for Microsoft Entra token-based authentication. */
  authMode: EndpointAuthMode;
  /** Description of the inference endpoint. */
  description?: string;
  /**
   * EndpointAuthKeys to set initially on an Endpoint.
   * This property will always be returned as null. AuthKey values must be retrieved using the ListKeys API.
   */
  keys?: EndpointAuthKeys;
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
  /** Endpoint URI. */
  readonly scoringUri?: string;
  /** Endpoint Swagger URI. */
  readonly swaggerUri?: string;
}

export function endpointPropertiesBaseSerializer(item: EndpointPropertiesBase): any {
  return {
    authMode: item["authMode"],
    description: item["description"],
    keys: !item["keys"] ? item["keys"] : endpointAuthKeysSerializer(item["keys"]),
    properties: item["properties"],
  };
}

export function endpointPropertiesBaseDeserializer(item: any): EndpointPropertiesBase {
  return {
    authMode: item["authMode"],
    description: item["description"],
    keys: !item["keys"] ? item["keys"] : endpointAuthKeysDeserializer(item["keys"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    scoringUri: item["scoringUri"],
    swaggerUri: item["swaggerUri"],
  };
}

/** Enum to determine endpoint authentication mode. */
export enum KnownEndpointAuthMode {
  /** AMLToken */
  AMLToken = "AMLToken",
  /** Key */
  Key = "Key",
  /** AADToken */
  AADToken = "AADToken",
}

/**
 * Enum to determine endpoint authentication mode. \
 * {@link KnownEndpointAuthMode} can be used interchangeably with EndpointAuthMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AMLToken** \
 * **Key** \
 * **AADToken**
 */
export type EndpointAuthMode = string;

/** Keys for endpoint authentication. */
export interface EndpointAuthKeys {
  /** The primary key. */
  primaryKey?: string;
  /** The secondary key. */
  secondaryKey?: string;
}

export function endpointAuthKeysSerializer(item: EndpointAuthKeys): any {
  return { primaryKey: item["primaryKey"], secondaryKey: item["secondaryKey"] };
}

export function endpointAuthKeysDeserializer(item: any): EndpointAuthKeys {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** Strictly used in update requests. */
export interface PartialMinimalTrackedResourceWithIdentity extends PartialMinimalTrackedResource {
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: PartialManagedServiceIdentity;
}

export function partialMinimalTrackedResourceWithIdentitySerializer(
  item: PartialMinimalTrackedResourceWithIdentity,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : partialManagedServiceIdentitySerializer(item["identity"]),
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface PartialManagedServiceIdentity {
  /** Managed service identity (system assigned and/or user assigned identities) */
  type?: ManagedServiceIdentityType;
  /** The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests. */
  userAssignedIdentities?: Record<string, any>;
}

export function partialManagedServiceIdentitySerializer(item: PartialManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

/** Strictly used in update requests. */
export interface PartialMinimalTrackedResource {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function partialMinimalTrackedResourceSerializer(item: PartialMinimalTrackedResource): any {
  return { tags: item["tags"] };
}

/** A paginated list of BatchEndpoint entities. */
export interface _BatchEndpointTrackedResourceArmPaginatedResult {
  /** The BatchEndpoint items on this page */
  value: BatchEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _batchEndpointTrackedResourceArmPaginatedResultDeserializer(
  item: any,
): _BatchEndpointTrackedResourceArmPaginatedResult {
  return {
    value: batchEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function batchEndpointArraySerializer(result: Array<BatchEndpoint>): any[] {
  return result.map((item) => {
    return batchEndpointSerializer(item);
  });
}

export function batchEndpointArrayDeserializer(result: Array<BatchEndpoint>): any[] {
  return result.map((item) => {
    return batchEndpointDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface BatchDeployment extends TrackedResource {
  /** [Required] Additional attributes of the entity. */
  properties: BatchDeploymentProperties;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: Sku;
}

export function batchDeploymentSerializer(item: BatchDeployment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: batchDeploymentPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function batchDeploymentDeserializer(item: any): BatchDeployment {
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
    properties: batchDeploymentPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Batch inference settings per deployment. */
export interface BatchDeploymentProperties extends EndpointDeploymentPropertiesBase {
  /** Compute target for batch inference operation. */
  compute?: string;
  /** Properties relevant to different deployment types. */
  deploymentConfiguration?: BatchDeploymentConfigurationUnion;
  /**
   * Error threshold, if the error count for the entire input goes above this value,
   * the batch inference will be aborted. Range is [-1, int.MaxValue].
   * For FileDataset, this value is the count of file failures.
   * For TabularDataset, this value is the count of record failures.
   * If set to -1 (the lower bound), all failures during batch inference will be ignored.
   */
  errorThreshold?: number;
  /**
   * Log verbosity for batch inferencing.
   * Increasing verbosity order for logging is : Warning, Info and Debug.
   * The default value is Info.
   */
  loggingLevel?: BatchLoggingLevel;
  /** Indicates maximum number of parallelism per instance. */
  maxConcurrencyPerInstance?: number;
  /**
   * Size of the mini-batch passed to each batch invocation.
   * For FileDataset, this is the number of files per mini-batch.
   * For TabularDataset, this is the size of the records in bytes, per mini-batch.
   */
  miniBatchSize?: number;
  /** Reference to the model asset for the endpoint deployment. */
  model?: AssetReferenceBaseUnion;
  /** Enum to determine how batch inferencing will handle output */
  outputAction?: BatchOutputAction;
  /** Customized output file name for append_row output action. */
  outputFileName?: string;
  /** Provisioning state for the endpoint deployment. */
  readonly provisioningState?: DeploymentProvisioningState;
  /**
   * Indicates compute configuration for the job.
   * If not provided, will default to the defaults defined in ResourceConfiguration.
   */
  resources?: DeploymentResourceConfiguration;
  /**
   * Retry Settings for the batch inference operation.
   * If not provided, will default to the defaults defined in BatchRetrySettings.
   */
  retrySettings?: BatchRetrySettings;
}

export function batchDeploymentPropertiesSerializer(item: BatchDeploymentProperties): any {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationSerializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    properties: item["properties"],
    compute: item["compute"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : batchDeploymentConfigurationUnionSerializer(item["deploymentConfiguration"]),
    errorThreshold: item["errorThreshold"],
    loggingLevel: item["loggingLevel"],
    maxConcurrencyPerInstance: item["maxConcurrencyPerInstance"],
    miniBatchSize: item["miniBatchSize"],
    model: !item["model"] ? item["model"] : assetReferenceBaseUnionSerializer(item["model"]),
    outputAction: item["outputAction"],
    outputFileName: item["outputFileName"],
    resources: !item["resources"]
      ? item["resources"]
      : deploymentResourceConfigurationSerializer(item["resources"]),
    retrySettings: !item["retrySettings"]
      ? item["retrySettings"]
      : batchRetrySettingsSerializer(item["retrySettings"]),
  };
}

export function batchDeploymentPropertiesDeserializer(item: any): BatchDeploymentProperties {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationDeserializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    compute: item["compute"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : batchDeploymentConfigurationUnionDeserializer(item["deploymentConfiguration"]),
    errorThreshold: item["errorThreshold"],
    loggingLevel: item["loggingLevel"],
    maxConcurrencyPerInstance: item["maxConcurrencyPerInstance"],
    miniBatchSize: item["miniBatchSize"],
    model: !item["model"] ? item["model"] : assetReferenceBaseUnionDeserializer(item["model"]),
    outputAction: item["outputAction"],
    outputFileName: item["outputFileName"],
    provisioningState: item["provisioningState"],
    resources: !item["resources"]
      ? item["resources"]
      : deploymentResourceConfigurationDeserializer(item["resources"]),
    retrySettings: !item["retrySettings"]
      ? item["retrySettings"]
      : batchRetrySettingsDeserializer(item["retrySettings"]),
  };
}

/** Properties relevant to different deployment types. */
export interface BatchDeploymentConfiguration {
  /** [Required] The type of the deployment */
  /** The discriminator possible values: PipelineComponent */
  deploymentConfigurationType: BatchDeploymentConfigurationType;
}

export function batchDeploymentConfigurationSerializer(item: BatchDeploymentConfiguration): any {
  return { deploymentConfigurationType: item["deploymentConfigurationType"] };
}

export function batchDeploymentConfigurationDeserializer(item: any): BatchDeploymentConfiguration {
  return {
    deploymentConfigurationType: item["deploymentConfigurationType"],
  };
}

/** Alias for BatchDeploymentConfigurationUnion */
export type BatchDeploymentConfigurationUnion =
  | BatchPipelineComponentDeploymentConfiguration
  | BatchDeploymentConfiguration;

export function batchDeploymentConfigurationUnionSerializer(
  item: BatchDeploymentConfigurationUnion,
): any {
  switch (item.deploymentConfigurationType) {
    case "PipelineComponent":
      return batchPipelineComponentDeploymentConfigurationSerializer(
        item as BatchPipelineComponentDeploymentConfiguration,
      );

    default:
      return batchDeploymentConfigurationSerializer(item);
  }
}

export function batchDeploymentConfigurationUnionDeserializer(
  item: any,
): BatchDeploymentConfigurationUnion {
  switch (item["deploymentConfigurationType"]) {
    case "PipelineComponent":
      return batchPipelineComponentDeploymentConfigurationDeserializer(
        item as BatchPipelineComponentDeploymentConfiguration,
      );

    default:
      return batchDeploymentConfigurationDeserializer(item);
  }
}

/** The enumerated property types for batch deployments. */
export enum KnownBatchDeploymentConfigurationType {
  /** Model */
  Model = "Model",
  /** PipelineComponent */
  PipelineComponent = "PipelineComponent",
}

/**
 * The enumerated property types for batch deployments. \
 * {@link KnownBatchDeploymentConfigurationType} can be used interchangeably with BatchDeploymentConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Model** \
 * **PipelineComponent**
 */
export type BatchDeploymentConfigurationType = string;

/** Properties for a Batch Pipeline Component Deployment. */
export interface BatchPipelineComponentDeploymentConfiguration extends BatchDeploymentConfiguration {
  /** The ARM id of the component to be run. */
  componentId?: IdAssetReference;
  /** The description which will be applied to the job. */
  description?: string;
  /** Run-time settings for the pipeline job. */
  settings?: Record<string, string>;
  /** The tags which will be applied to the job. */
  tags?: Record<string, string>;
  /** [Required] The type of the deployment */
  deploymentConfigurationType: "PipelineComponent";
}

export function batchPipelineComponentDeploymentConfigurationSerializer(
  item: BatchPipelineComponentDeploymentConfiguration,
): any {
  return {
    deploymentConfigurationType: item["deploymentConfigurationType"],
    componentId: !item["componentId"]
      ? item["componentId"]
      : idAssetReferenceSerializer(item["componentId"]),
    description: item["description"],
    settings: item["settings"],
    tags: item["tags"],
  };
}

export function batchPipelineComponentDeploymentConfigurationDeserializer(
  item: any,
): BatchPipelineComponentDeploymentConfiguration {
  return {
    deploymentConfigurationType: item["deploymentConfigurationType"],
    componentId: !item["componentId"]
      ? item["componentId"]
      : idAssetReferenceDeserializer(item["componentId"]),
    description: item["description"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(
          Object.entries(item["settings"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** Reference to an asset via its ARM resource ID. */
export interface IdAssetReference extends AssetReferenceBase {
  /** [Required] ARM resource ID of the asset. */
  assetId: string;
  /** [Required] Specifies the type of asset reference. */
  referenceType: "Id";
}

export function idAssetReferenceSerializer(item: IdAssetReference): any {
  return { referenceType: item["referenceType"], assetId: item["assetId"] };
}

export function idAssetReferenceDeserializer(item: any): IdAssetReference {
  return {
    referenceType: item["referenceType"],
    assetId: item["assetId"],
  };
}

/**
 * Log verbosity for batch inferencing.
 * Increasing verbosity order for logging is : Warning, Info and Debug.
 * The default value is Info.
 */
export enum KnownBatchLoggingLevel {
  /** Info */
  Info = "Info",
  /** Warning */
  Warning = "Warning",
  /** Debug */
  Debug = "Debug",
}

/**
 * Log verbosity for batch inferencing.
 * Increasing verbosity order for logging is : Warning, Info and Debug.
 * The default value is Info. \
 * {@link KnownBatchLoggingLevel} can be used interchangeably with BatchLoggingLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Info** \
 * **Warning** \
 * **Debug**
 */
export type BatchLoggingLevel = string;

/** Base definition for asset references. */
export interface AssetReferenceBase {
  /** [Required] Specifies the type of asset reference. */
  /** The discriminator possible values: Id, DataPath, OutputPath */
  referenceType: ReferenceType;
}

export function assetReferenceBaseSerializer(item: AssetReferenceBase): any {
  return { referenceType: item["referenceType"] };
}

export function assetReferenceBaseDeserializer(item: any): AssetReferenceBase {
  return {
    referenceType: item["referenceType"],
  };
}

/** Alias for AssetReferenceBaseUnion */
export type AssetReferenceBaseUnion =
  | IdAssetReference
  | DataPathAssetReference
  | OutputPathAssetReference
  | AssetReferenceBase;

export function assetReferenceBaseUnionSerializer(item: AssetReferenceBaseUnion): any {
  switch (item.referenceType) {
    case "Id":
      return idAssetReferenceSerializer(item as IdAssetReference);

    case "DataPath":
      return dataPathAssetReferenceSerializer(item as DataPathAssetReference);

    case "OutputPath":
      return outputPathAssetReferenceSerializer(item as OutputPathAssetReference);

    default:
      return assetReferenceBaseSerializer(item);
  }
}

export function assetReferenceBaseUnionDeserializer(item: any): AssetReferenceBaseUnion {
  switch (item["referenceType"]) {
    case "Id":
      return idAssetReferenceDeserializer(item as IdAssetReference);

    case "DataPath":
      return dataPathAssetReferenceDeserializer(item as DataPathAssetReference);

    case "OutputPath":
      return outputPathAssetReferenceDeserializer(item as OutputPathAssetReference);

    default:
      return assetReferenceBaseDeserializer(item);
  }
}

/** Enum to determine which reference method to use for an asset. */
export enum KnownReferenceType {
  /** Id */
  Id = "Id",
  /** DataPath */
  DataPath = "DataPath",
  /** OutputPath */
  OutputPath = "OutputPath",
}

/**
 * Enum to determine which reference method to use for an asset. \
 * {@link KnownReferenceType} can be used interchangeably with ReferenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Id** \
 * **DataPath** \
 * **OutputPath**
 */
export type ReferenceType = string;

/** Reference to an asset via its path in a datastore. */
export interface DataPathAssetReference extends AssetReferenceBase {
  /** ARM resource ID of the datastore where the asset is located. */
  datastoreId?: string;
  /** The path of the file/directory in the datastore. */
  path?: string;
  /** [Required] Specifies the type of asset reference. */
  referenceType: "DataPath";
}

export function dataPathAssetReferenceSerializer(item: DataPathAssetReference): any {
  return {
    referenceType: item["referenceType"],
    datastoreId: item["datastoreId"],
    path: item["path"],
  };
}

export function dataPathAssetReferenceDeserializer(item: any): DataPathAssetReference {
  return {
    referenceType: item["referenceType"],
    datastoreId: item["datastoreId"],
    path: item["path"],
  };
}

/** Reference to an asset via its path in a job output. */
export interface OutputPathAssetReference extends AssetReferenceBase {
  /** ARM resource ID of the job. */
  jobId?: string;
  /** The path of the file/directory in the job output. */
  path?: string;
  /** [Required] Specifies the type of asset reference. */
  referenceType: "OutputPath";
}

export function outputPathAssetReferenceSerializer(item: OutputPathAssetReference): any {
  return { referenceType: item["referenceType"], jobId: item["jobId"], path: item["path"] };
}

export function outputPathAssetReferenceDeserializer(item: any): OutputPathAssetReference {
  return {
    referenceType: item["referenceType"],
    jobId: item["jobId"],
    path: item["path"],
  };
}

/** Enum to determine how batch inferencing will handle output */
export enum KnownBatchOutputAction {
  /** SummaryOnly */
  SummaryOnly = "SummaryOnly",
  /** AppendRow */
  AppendRow = "AppendRow",
}

/**
 * Enum to determine how batch inferencing will handle output \
 * {@link KnownBatchOutputAction} can be used interchangeably with BatchOutputAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SummaryOnly** \
 * **AppendRow**
 */
export type BatchOutputAction = string;

/** Possible values for DeploymentProvisioningState. */
export enum KnownDeploymentProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Scaling */
  Scaling = "Scaling",
  /** Updating */
  Updating = "Updating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Possible values for DeploymentProvisioningState. \
 * {@link KnownDeploymentProvisioningState} can be used interchangeably with DeploymentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Deleting** \
 * **Scaling** \
 * **Updating** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type DeploymentProvisioningState = string;

/** model interface DeploymentResourceConfiguration */
export interface DeploymentResourceConfiguration extends ResourceConfiguration {}

export function deploymentResourceConfigurationSerializer(
  item: DeploymentResourceConfiguration,
): any {
  return {
    instanceCount: item["instanceCount"],
    instanceType: item["instanceType"],
    properties: item["properties"],
  };
}

export function deploymentResourceConfigurationDeserializer(
  item: any,
): DeploymentResourceConfiguration {
  return {
    instanceCount: item["instanceCount"],
    instanceType: item["instanceType"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** Retry settings for a batch inference operation. */
export interface BatchRetrySettings {
  /** Maximum retry count for a mini-batch */
  maxRetries?: number;
  /** Invocation timeout for a mini-batch, in ISO 8601 format. */
  timeout?: string;
}

export function batchRetrySettingsSerializer(item: BatchRetrySettings): any {
  return { maxRetries: item["maxRetries"], timeout: item["timeout"] };
}

export function batchRetrySettingsDeserializer(item: any): BatchRetrySettings {
  return {
    maxRetries: item["maxRetries"],
    timeout: item["timeout"],
  };
}

/** model interface ResourceConfiguration */
export interface ResourceConfiguration {
  /** Optional number of instances or nodes used by the compute target. */
  instanceCount?: number;
  /** Optional type of VM used as supported by the compute target. */
  instanceType?: string;
  /** Additional properties bag. */
  properties?: Record<string, any>;
}

export function resourceConfigurationSerializer(item: ResourceConfiguration): any {
  return {
    instanceCount: item["instanceCount"],
    instanceType: item["instanceType"],
    properties: item["properties"],
  };
}

export function resourceConfigurationDeserializer(item: any): ResourceConfiguration {
  return {
    instanceCount: item["instanceCount"],
    instanceType: item["instanceType"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** Base definition for endpoint deployment. */
export interface EndpointDeploymentPropertiesBase {
  /** Code configuration for the endpoint deployment. */
  codeConfiguration?: CodeConfiguration;
  /** Description of the endpoint deployment. */
  description?: string;
  /** ARM resource ID or AssetId of the environment specification for the endpoint deployment. */
  environmentId?: string;
  /** Environment variables configuration for the deployment. */
  environmentVariables?: Record<string, string>;
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
}

export function endpointDeploymentPropertiesBaseSerializer(
  item: EndpointDeploymentPropertiesBase,
): any {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationSerializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    properties: item["properties"],
  };
}

export function endpointDeploymentPropertiesBaseDeserializer(
  item: any,
): EndpointDeploymentPropertiesBase {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationDeserializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** Configuration for a scoring code asset. */
export interface CodeConfiguration {
  /** ARM resource ID of the code asset. */
  codeId?: string;
  /** [Required] The script to execute on startup. eg. "score.py" */
  scoringScript: string;
}

export function codeConfigurationSerializer(item: CodeConfiguration): any {
  return { codeId: item["codeId"], scoringScript: item["scoringScript"] };
}

export function codeConfigurationDeserializer(item: any): CodeConfiguration {
  return {
    codeId: item["codeId"],
    scoringScript: item["scoringScript"],
  };
}

/** Strictly used in update requests. */
export interface PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties {
  /** Additional attributes of the entity. */
  properties?: PartialBatchDeployment;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function partialBatchDeploymentPartialMinimalTrackedResourceWithPropertiesSerializer(
  item: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : partialBatchDeploymentSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Mutable batch inference settings per deployment. */
export interface PartialBatchDeployment {
  /** Description of the endpoint deployment. */
  description?: string;
}

export function partialBatchDeploymentSerializer(item: PartialBatchDeployment): any {
  return { description: item["description"] };
}

/** A paginated list of BatchDeployment entities. */
export interface _BatchDeploymentTrackedResourceArmPaginatedResult {
  /** The BatchDeployment items on this page */
  value: BatchDeployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _batchDeploymentTrackedResourceArmPaginatedResultDeserializer(
  item: any,
): _BatchDeploymentTrackedResourceArmPaginatedResult {
  return {
    value: batchDeploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function batchDeploymentArraySerializer(result: Array<BatchDeployment>): any[] {
  return result.map((item) => {
    return batchDeploymentSerializer(item);
  });
}

export function batchDeploymentArrayDeserializer(result: Array<BatchDeployment>): any[] {
  return result.map((item) => {
    return batchDeploymentDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface CapabilityHost extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: CapabilityHostProperties;
}

export function capabilityHostSerializer(item: CapabilityHost): any {
  return { properties: capabilityHostPropertiesSerializer(item["properties"]) };
}

export function capabilityHostDeserializer(item: any): CapabilityHost {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: capabilityHostPropertiesDeserializer(item["properties"]),
  };
}

/** model interface CapabilityHostProperties */
export interface CapabilityHostProperties extends ResourceBase {
  /** List of Aca Environment connections. */
  acaEnvironmentConnections?: string[];
  /** List of AI services connections. */
  aiServicesConnections?: string[];
  /** Kind of this capability host. */
  capabilityHostKind?: CapabilityHostKind;
  /** Customer subnet info to help set up this capability host. */
  customerSubnet?: string;
  /** Provisioning state for the CapabilityHost. */
  readonly provisioningState?: CapabilityHostProvisioningState;
  /** List of Storage connections. */
  storageConnections?: string[];
  /** List of Thread storage connections. */
  threadStorageConnections?: string[];
  /** List of VectorStore connections. */
  vectorStoreConnections?: string[];
  /** List of messages containing errors. */
  readonly messages?: string[];
}

export function capabilityHostPropertiesSerializer(item: CapabilityHostProperties): any {
  return {
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    acaEnvironmentConnections: !item["acaEnvironmentConnections"]
      ? item["acaEnvironmentConnections"]
      : item["acaEnvironmentConnections"].map((p: any) => {
          return p;
        }),
    aiServicesConnections: !item["aiServicesConnections"]
      ? item["aiServicesConnections"]
      : item["aiServicesConnections"].map((p: any) => {
          return p;
        }),
    capabilityHostKind: item["capabilityHostKind"],
    customerSubnet: item["customerSubnet"],
    storageConnections: !item["storageConnections"]
      ? item["storageConnections"]
      : item["storageConnections"].map((p: any) => {
          return p;
        }),
    threadStorageConnections: !item["threadStorageConnections"]
      ? item["threadStorageConnections"]
      : item["threadStorageConnections"].map((p: any) => {
          return p;
        }),
    vectorStoreConnections: !item["vectorStoreConnections"]
      ? item["vectorStoreConnections"]
      : item["vectorStoreConnections"].map((p: any) => {
          return p;
        }),
  };
}

export function capabilityHostPropertiesDeserializer(item: any): CapabilityHostProperties {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    acaEnvironmentConnections: !item["acaEnvironmentConnections"]
      ? item["acaEnvironmentConnections"]
      : item["acaEnvironmentConnections"].map((p1: any) => {
          return p1;
        }),
    aiServicesConnections: !item["aiServicesConnections"]
      ? item["aiServicesConnections"]
      : item["aiServicesConnections"].map((p1: any) => {
          return p1;
        }),
    capabilityHostKind: item["capabilityHostKind"],
    customerSubnet: item["customerSubnet"],
    provisioningState: item["provisioningState"],
    storageConnections: !item["storageConnections"]
      ? item["storageConnections"]
      : item["storageConnections"].map((p1: any) => {
          return p1;
        }),
    threadStorageConnections: !item["threadStorageConnections"]
      ? item["threadStorageConnections"]
      : item["threadStorageConnections"].map((p1: any) => {
          return p1;
        }),
    vectorStoreConnections: !item["vectorStoreConnections"]
      ? item["vectorStoreConnections"]
      : item["vectorStoreConnections"].map((p1: any) => {
          return p1;
        }),
    messages: !item["messages"]
      ? item["messages"]
      : item["messages"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Known values of {@link CapabilityHostKind} that the service accepts. */
export enum KnownCapabilityHostKind {
  /** Agents */
  Agents = "Agents",
}

/** Type of CapabilityHostKind */
export type CapabilityHostKind = string;

/** Provisioning state of capability host. */
export enum KnownCapabilityHostProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of capability host. \
 * {@link KnownCapabilityHostProvisioningState} can be used interchangeably with CapabilityHostProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Creating** \
 * **Updating** \
 * **Deleting**
 */
export type CapabilityHostProvisioningState = string;

/** Azure Resource Manager resource envelope. */
export interface Datastore extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: DatastorePropertiesUnion;
}

export function datastoreSerializer(item: Datastore): any {
  return { properties: datastorePropertiesUnionSerializer(item["properties"]) };
}

export function datastoreDeserializer(item: any): Datastore {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: datastorePropertiesUnionDeserializer(item["properties"]),
  };
}

/** Base definition for datastore contents configuration. */
export interface DatastoreProperties extends ResourceBase {
  /** [Required] Account credentials. */
  credentials: DatastoreCredentialsUnion;
  /** Enum to determine the datastore contents type. */
  /** The discriminator possible values: AzureBlob, AzureDataLakeGen1, AzureDataLakeGen2, AzureFile, OneLake */
  datastoreType: DatastoreType;
  /** Readonly property to indicate if datastore is the workspace default datastore */
  readonly isDefault?: boolean;
}

export function datastorePropertiesSerializer(item: DatastoreProperties): any {
  return {
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    credentials: datastoreCredentialsUnionSerializer(item["credentials"]),
    datastoreType: item["datastoreType"],
  };
}

export function datastorePropertiesDeserializer(item: any): DatastoreProperties {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    credentials: datastoreCredentialsUnionDeserializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    isDefault: item["isDefault"],
  };
}

/** Alias for DatastorePropertiesUnion */
export type DatastorePropertiesUnion =
  | AzureBlobDatastore
  | AzureDataLakeGen1Datastore
  | AzureDataLakeGen2Datastore
  | AzureFileDatastore
  | OneLakeDatastore
  | DatastoreProperties;

export function datastorePropertiesUnionSerializer(item: DatastorePropertiesUnion): any {
  switch (item.datastoreType) {
    case "AzureBlob":
      return azureBlobDatastoreSerializer(item as AzureBlobDatastore);

    case "AzureDataLakeGen1":
      return azureDataLakeGen1DatastoreSerializer(item as AzureDataLakeGen1Datastore);

    case "AzureDataLakeGen2":
      return azureDataLakeGen2DatastoreSerializer(item as AzureDataLakeGen2Datastore);

    case "AzureFile":
      return azureFileDatastoreSerializer(item as AzureFileDatastore);

    case "OneLake":
      return oneLakeDatastoreSerializer(item as OneLakeDatastore);

    default:
      return datastorePropertiesSerializer(item);
  }
}

export function datastorePropertiesUnionDeserializer(item: any): DatastorePropertiesUnion {
  switch (item["datastoreType"]) {
    case "AzureBlob":
      return azureBlobDatastoreDeserializer(item as AzureBlobDatastore);

    case "AzureDataLakeGen1":
      return azureDataLakeGen1DatastoreDeserializer(item as AzureDataLakeGen1Datastore);

    case "AzureDataLakeGen2":
      return azureDataLakeGen2DatastoreDeserializer(item as AzureDataLakeGen2Datastore);

    case "AzureFile":
      return azureFileDatastoreDeserializer(item as AzureFileDatastore);

    case "OneLake":
      return oneLakeDatastoreDeserializer(item as OneLakeDatastore);

    default:
      return datastorePropertiesDeserializer(item);
  }
}

/** Base definition for datastore credentials. */
export interface DatastoreCredentials {
  /** [Required] Credential type used to authentication with storage. */
  /** The discriminator possible values: AccountKey, Certificate, None, Sas, ServicePrincipal */
  credentialsType: CredentialsType;
}

export function datastoreCredentialsSerializer(item: DatastoreCredentials): any {
  return { credentialsType: item["credentialsType"] };
}

export function datastoreCredentialsDeserializer(item: any): DatastoreCredentials {
  return {
    credentialsType: item["credentialsType"],
  };
}

/** Alias for DatastoreCredentialsUnion */
export type DatastoreCredentialsUnion =
  | AccountKeyDatastoreCredentials
  | CertificateDatastoreCredentials
  | NoneDatastoreCredentials
  | SasDatastoreCredentials
  | ServicePrincipalDatastoreCredentials
  | DatastoreCredentials;

export function datastoreCredentialsUnionSerializer(item: DatastoreCredentialsUnion): any {
  switch (item.credentialsType) {
    case "AccountKey":
      return accountKeyDatastoreCredentialsSerializer(item as AccountKeyDatastoreCredentials);

    case "Certificate":
      return certificateDatastoreCredentialsSerializer(item as CertificateDatastoreCredentials);

    case "None":
      return noneDatastoreCredentialsSerializer(item as NoneDatastoreCredentials);

    case "Sas":
      return sasDatastoreCredentialsSerializer(item as SasDatastoreCredentials);

    case "ServicePrincipal":
      return servicePrincipalDatastoreCredentialsSerializer(
        item as ServicePrincipalDatastoreCredentials,
      );

    default:
      return datastoreCredentialsSerializer(item);
  }
}

export function datastoreCredentialsUnionDeserializer(item: any): DatastoreCredentialsUnion {
  switch (item["credentialsType"]) {
    case "AccountKey":
      return accountKeyDatastoreCredentialsDeserializer(item as AccountKeyDatastoreCredentials);

    case "Certificate":
      return certificateDatastoreCredentialsDeserializer(item as CertificateDatastoreCredentials);

    case "None":
      return noneDatastoreCredentialsDeserializer(item as NoneDatastoreCredentials);

    case "Sas":
      return sasDatastoreCredentialsDeserializer(item as SasDatastoreCredentials);

    case "ServicePrincipal":
      return servicePrincipalDatastoreCredentialsDeserializer(
        item as ServicePrincipalDatastoreCredentials,
      );

    default:
      return datastoreCredentialsDeserializer(item);
  }
}

/** Enum to determine the datastore credentials type. */
export enum KnownCredentialsType {
  /** AccountKey */
  AccountKey = "AccountKey",
  /** Certificate */
  Certificate = "Certificate",
  /** None */
  None = "None",
  /** Sas */
  Sas = "Sas",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
}

/**
 * Enum to determine the datastore credentials type. \
 * {@link KnownCredentialsType} can be used interchangeably with CredentialsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountKey** \
 * **Certificate** \
 * **None** \
 * **Sas** \
 * **ServicePrincipal**
 */
export type CredentialsType = string;

/** Account key datastore credentials configuration. */
export interface AccountKeyDatastoreCredentials extends DatastoreCredentials {
  /** [Required] Storage account secrets. */
  secrets: AccountKeyDatastoreSecrets;
  /** [Required] Credential type used to authentication with storage. */
  credentialsType: "AccountKey";
}

export function accountKeyDatastoreCredentialsSerializer(
  item: AccountKeyDatastoreCredentials,
): any {
  return {
    credentialsType: item["credentialsType"],
    secrets: accountKeyDatastoreSecretsSerializer(item["secrets"]),
  };
}

export function accountKeyDatastoreCredentialsDeserializer(
  item: any,
): AccountKeyDatastoreCredentials {
  return {
    credentialsType: item["credentialsType"],
    secrets: accountKeyDatastoreSecretsDeserializer(item["secrets"]),
  };
}

/** Datastore account key secrets. */
export interface AccountKeyDatastoreSecrets extends DatastoreSecrets {
  /** Storage account key. */
  key?: string;
  /** [Required] Credential type used to authentication with storage. */
  secretsType: "AccountKey";
}

export function accountKeyDatastoreSecretsSerializer(item: AccountKeyDatastoreSecrets): any {
  return { secretsType: item["secretsType"], key: item["key"] };
}

export function accountKeyDatastoreSecretsDeserializer(item: any): AccountKeyDatastoreSecrets {
  return {
    secretsType: item["secretsType"],
    key: item["key"],
  };
}

/** Certificate datastore credentials configuration. */
export interface CertificateDatastoreCredentials extends DatastoreCredentials {
  /** Authority URL used for authentication. */
  authorityUrl?: string;
  /** [Required] Service principal client ID. */
  clientId: string;
  /** Resource the service principal has access to. */
  resourceUrl?: string;
  /** [Required] Service principal secrets. */
  secrets: CertificateDatastoreSecrets;
  /** [Required] ID of the tenant to which the service principal belongs. */
  tenantId: string;
  /** [Required] Thumbprint of the certificate used for authentication. */
  thumbprint: string;
  /** [Required] Credential type used to authentication with storage. */
  credentialsType: "Certificate";
}

export function certificateDatastoreCredentialsSerializer(
  item: CertificateDatastoreCredentials,
): any {
  return {
    credentialsType: item["credentialsType"],
    authorityUrl: item["authorityUrl"],
    clientId: item["clientId"],
    resourceUrl: item["resourceUrl"],
    secrets: certificateDatastoreSecretsSerializer(item["secrets"]),
    tenantId: item["tenantId"],
    thumbprint: item["thumbprint"],
  };
}

export function certificateDatastoreCredentialsDeserializer(
  item: any,
): CertificateDatastoreCredentials {
  return {
    credentialsType: item["credentialsType"],
    authorityUrl: item["authorityUrl"],
    clientId: item["clientId"],
    resourceUrl: item["resourceUrl"],
    secrets: certificateDatastoreSecretsDeserializer(item["secrets"]),
    tenantId: item["tenantId"],
    thumbprint: item["thumbprint"],
  };
}

/** Datastore certificate secrets. */
export interface CertificateDatastoreSecrets extends DatastoreSecrets {
  /** Service principal certificate. */
  certificate?: string;
  /** [Required] Credential type used to authentication with storage. */
  secretsType: "Certificate";
}

export function certificateDatastoreSecretsSerializer(item: CertificateDatastoreSecrets): any {
  return { secretsType: item["secretsType"], certificate: item["certificate"] };
}

export function certificateDatastoreSecretsDeserializer(item: any): CertificateDatastoreSecrets {
  return {
    secretsType: item["secretsType"],
    certificate: item["certificate"],
  };
}

/** Empty/none datastore credentials. */
export interface NoneDatastoreCredentials extends DatastoreCredentials {
  /** [Required] Credential type used to authentication with storage. */
  credentialsType: "None";
}

export function noneDatastoreCredentialsSerializer(item: NoneDatastoreCredentials): any {
  return { credentialsType: item["credentialsType"] };
}

export function noneDatastoreCredentialsDeserializer(item: any): NoneDatastoreCredentials {
  return {
    credentialsType: item["credentialsType"],
  };
}

/** SAS datastore credentials configuration. */
export interface SasDatastoreCredentials extends DatastoreCredentials {
  /** [Required] Storage container secrets. */
  secrets: SasDatastoreSecrets;
  /** [Required] Credential type used to authentication with storage. */
  credentialsType: "Sas";
}

export function sasDatastoreCredentialsSerializer(item: SasDatastoreCredentials): any {
  return {
    credentialsType: item["credentialsType"],
    secrets: sasDatastoreSecretsSerializer(item["secrets"]),
  };
}

export function sasDatastoreCredentialsDeserializer(item: any): SasDatastoreCredentials {
  return {
    credentialsType: item["credentialsType"],
    secrets: sasDatastoreSecretsDeserializer(item["secrets"]),
  };
}

/** Datastore SAS secrets. */
export interface SasDatastoreSecrets extends DatastoreSecrets {
  /** Storage container SAS token. */
  sasToken?: string;
  /** [Required] Credential type used to authentication with storage. */
  secretsType: "Sas";
}

export function sasDatastoreSecretsSerializer(item: SasDatastoreSecrets): any {
  return { secretsType: item["secretsType"], sasToken: item["sasToken"] };
}

export function sasDatastoreSecretsDeserializer(item: any): SasDatastoreSecrets {
  return {
    secretsType: item["secretsType"],
    sasToken: item["sasToken"],
  };
}

/** Service Principal datastore credentials configuration. */
export interface ServicePrincipalDatastoreCredentials extends DatastoreCredentials {
  /** Authority URL used for authentication. */
  authorityUrl?: string;
  /** [Required] Service principal client ID. */
  clientId: string;
  /** Resource the service principal has access to. */
  resourceUrl?: string;
  /** [Required] Service principal secrets. */
  secrets: ServicePrincipalDatastoreSecrets;
  /** [Required] ID of the tenant to which the service principal belongs. */
  tenantId: string;
  /** [Required] Credential type used to authentication with storage. */
  credentialsType: "ServicePrincipal";
}

export function servicePrincipalDatastoreCredentialsSerializer(
  item: ServicePrincipalDatastoreCredentials,
): any {
  return {
    credentialsType: item["credentialsType"],
    authorityUrl: item["authorityUrl"],
    clientId: item["clientId"],
    resourceUrl: item["resourceUrl"],
    secrets: servicePrincipalDatastoreSecretsSerializer(item["secrets"]),
    tenantId: item["tenantId"],
  };
}

export function servicePrincipalDatastoreCredentialsDeserializer(
  item: any,
): ServicePrincipalDatastoreCredentials {
  return {
    credentialsType: item["credentialsType"],
    authorityUrl: item["authorityUrl"],
    clientId: item["clientId"],
    resourceUrl: item["resourceUrl"],
    secrets: servicePrincipalDatastoreSecretsDeserializer(item["secrets"]),
    tenantId: item["tenantId"],
  };
}

/** Datastore Service Principal secrets. */
export interface ServicePrincipalDatastoreSecrets extends DatastoreSecrets {
  /** Service principal secret. */
  clientSecret?: string;
  /** [Required] Credential type used to authentication with storage. */
  secretsType: "ServicePrincipal";
}

export function servicePrincipalDatastoreSecretsSerializer(
  item: ServicePrincipalDatastoreSecrets,
): any {
  return { secretsType: item["secretsType"], clientSecret: item["clientSecret"] };
}

export function servicePrincipalDatastoreSecretsDeserializer(
  item: any,
): ServicePrincipalDatastoreSecrets {
  return {
    secretsType: item["secretsType"],
    clientSecret: item["clientSecret"],
  };
}

/** Enum to determine the datastore contents type. */
export enum KnownDatastoreType {
  /** AzureBlob */
  AzureBlob = "AzureBlob",
  /** AzureDataLakeGen1 */
  AzureDataLakeGen1 = "AzureDataLakeGen1",
  /** AzureDataLakeGen2 */
  AzureDataLakeGen2 = "AzureDataLakeGen2",
  /** AzureFile */
  AzureFile = "AzureFile",
  /** OneLake */
  OneLake = "OneLake",
}

/**
 * Enum to determine the datastore contents type. \
 * {@link KnownDatastoreType} can be used interchangeably with DatastoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureBlob** \
 * **AzureDataLakeGen1** \
 * **AzureDataLakeGen2** \
 * **AzureFile** \
 * **OneLake**
 */
export type DatastoreType = string;

/** Azure Blob datastore configuration. */
export interface AzureBlobDatastore extends DatastoreProperties {
  /** Azure Resource Group name */
  resourceGroup?: string;
  /** Azure Subscription Id */
  subscriptionId?: string;
  /** Storage account name. */
  accountName?: string;
  /** Storage account container name. */
  containerName?: string;
  /** Azure cloud endpoint for the storage account. */
  endpoint?: string;
  /** Protocol used to communicate with the storage account. */
  protocol?: string;
  /** Indicates which identity to use to authenticate service data access to customer's storage. */
  serviceDataAccessAuthIdentity?: ServiceDataAccessAuthIdentity;
  /** [Required] Storage type backing the datastore. */
  datastoreType: "AzureBlob";
}

export function azureBlobDatastoreSerializer(item: AzureBlobDatastore): any {
  return {
    credentials: datastoreCredentialsUnionSerializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    containerName: item["containerName"],
    endpoint: item["endpoint"],
    protocol: item["protocol"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

export function azureBlobDatastoreDeserializer(item: any): AzureBlobDatastore {
  return {
    credentials: datastoreCredentialsUnionDeserializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    isDefault: item["isDefault"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    containerName: item["containerName"],
    endpoint: item["endpoint"],
    protocol: item["protocol"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

/** Known values of {@link ServiceDataAccessAuthIdentity} that the service accepts. */
export enum KnownServiceDataAccessAuthIdentity {
  /** Do not use any identity for service data access. */
  None = "None",
  /** Use the system assigned managed identity of the Workspace to authenticate service data access. */
  WorkspaceSystemAssignedIdentity = "WorkspaceSystemAssignedIdentity",
  /** Use the user assigned managed identity of the Workspace to authenticate service data access. */
  WorkspaceUserAssignedIdentity = "WorkspaceUserAssignedIdentity",
}

/** Type of ServiceDataAccessAuthIdentity */
export type ServiceDataAccessAuthIdentity = string;

/** Azure Data Lake Gen1 datastore configuration. */
export interface AzureDataLakeGen1Datastore extends DatastoreProperties {
  /** Azure Resource Group name */
  resourceGroup?: string;
  /** Azure Subscription Id */
  subscriptionId?: string;
  /** Indicates which identity to use to authenticate service data access to customer's storage. */
  serviceDataAccessAuthIdentity?: ServiceDataAccessAuthIdentity;
  /** [Required] Azure Data Lake store name. */
  storeName: string;
  /** [Required] Storage type backing the datastore. */
  datastoreType: "AzureDataLakeGen1";
}

export function azureDataLakeGen1DatastoreSerializer(item: AzureDataLakeGen1Datastore): any {
  return {
    credentials: datastoreCredentialsUnionSerializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
    storeName: item["storeName"],
  };
}

export function azureDataLakeGen1DatastoreDeserializer(item: any): AzureDataLakeGen1Datastore {
  return {
    credentials: datastoreCredentialsUnionDeserializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    isDefault: item["isDefault"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
    storeName: item["storeName"],
  };
}

/** Azure Data Lake Gen2 datastore configuration. */
export interface AzureDataLakeGen2Datastore extends DatastoreProperties {
  /** Azure Resource Group name */
  resourceGroup?: string;
  /** Azure Subscription Id */
  subscriptionId?: string;
  /** [Required] Storage account name. */
  accountName: string;
  /** Azure cloud endpoint for the storage account. */
  endpoint?: string;
  /** [Required] The name of the Data Lake Gen2 filesystem. */
  filesystem: string;
  /** Protocol used to communicate with the storage account. */
  protocol?: string;
  /** Indicates which identity to use to authenticate service data access to customer's storage. */
  serviceDataAccessAuthIdentity?: ServiceDataAccessAuthIdentity;
  /** [Required] Storage type backing the datastore. */
  datastoreType: "AzureDataLakeGen2";
}

export function azureDataLakeGen2DatastoreSerializer(item: AzureDataLakeGen2Datastore): any {
  return {
    credentials: datastoreCredentialsUnionSerializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    endpoint: item["endpoint"],
    filesystem: item["filesystem"],
    protocol: item["protocol"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

export function azureDataLakeGen2DatastoreDeserializer(item: any): AzureDataLakeGen2Datastore {
  return {
    credentials: datastoreCredentialsUnionDeserializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    isDefault: item["isDefault"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    endpoint: item["endpoint"],
    filesystem: item["filesystem"],
    protocol: item["protocol"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

/** Azure File datastore configuration. */
export interface AzureFileDatastore extends DatastoreProperties {
  /** Azure Resource Group name */
  resourceGroup?: string;
  /** Azure Subscription Id */
  subscriptionId?: string;
  /** [Required] Storage account name. */
  accountName: string;
  /** Azure cloud endpoint for the storage account. */
  endpoint?: string;
  /** [Required] The name of the Azure file share that the datastore points to. */
  fileShareName: string;
  /** Protocol used to communicate with the storage account. */
  protocol?: string;
  /** Indicates which identity to use to authenticate service data access to customer's storage. */
  serviceDataAccessAuthIdentity?: ServiceDataAccessAuthIdentity;
  /** [Required] Storage type backing the datastore. */
  datastoreType: "AzureFile";
}

export function azureFileDatastoreSerializer(item: AzureFileDatastore): any {
  return {
    credentials: datastoreCredentialsUnionSerializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    endpoint: item["endpoint"],
    fileShareName: item["fileShareName"],
    protocol: item["protocol"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

export function azureFileDatastoreDeserializer(item: any): AzureFileDatastore {
  return {
    credentials: datastoreCredentialsUnionDeserializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    isDefault: item["isDefault"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    accountName: item["accountName"],
    endpoint: item["endpoint"],
    fileShareName: item["fileShareName"],
    protocol: item["protocol"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

/** OneLake (Trident) datastore configuration. */
export interface OneLakeDatastore extends DatastoreProperties {
  /** [Required] OneLake artifact backing the datastore. */
  artifact: OneLakeArtifactUnion;
  /** OneLake endpoint to use for the datastore. */
  endpoint?: string;
  /** [Required] OneLake workspace name. */
  oneLakeWorkspaceName: string;
  /** Indicates which identity to use to authenticate service data access to customer's storage. */
  serviceDataAccessAuthIdentity?: ServiceDataAccessAuthIdentity;
  /** [Required] Storage type backing the datastore. */
  datastoreType: "OneLake";
}

export function oneLakeDatastoreSerializer(item: OneLakeDatastore): any {
  return {
    credentials: datastoreCredentialsUnionSerializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    artifact: oneLakeArtifactUnionSerializer(item["artifact"]),
    endpoint: item["endpoint"],
    oneLakeWorkspaceName: item["oneLakeWorkspaceName"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

export function oneLakeDatastoreDeserializer(item: any): OneLakeDatastore {
  return {
    credentials: datastoreCredentialsUnionDeserializer(item["credentials"]),
    datastoreType: item["datastoreType"],
    isDefault: item["isDefault"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    artifact: oneLakeArtifactUnionDeserializer(item["artifact"]),
    endpoint: item["endpoint"],
    oneLakeWorkspaceName: item["oneLakeWorkspaceName"],
    serviceDataAccessAuthIdentity: item["serviceDataAccessAuthIdentity"],
  };
}

/** OneLake artifact (data source) configuration. */
export interface OneLakeArtifact {
  /** [Required] OneLake artifact name */
  artifactName: string;
  /** [Required] OneLake artifact type */
  /** The discriminator possible values: LakeHouse */
  artifactType: OneLakeArtifactType;
}

export function oneLakeArtifactSerializer(item: OneLakeArtifact): any {
  return { artifactName: item["artifactName"], artifactType: item["artifactType"] };
}

export function oneLakeArtifactDeserializer(item: any): OneLakeArtifact {
  return {
    artifactName: item["artifactName"],
    artifactType: item["artifactType"],
  };
}

/** Alias for OneLakeArtifactUnion */
export type OneLakeArtifactUnion = LakeHouseArtifact | OneLakeArtifact;

export function oneLakeArtifactUnionSerializer(item: OneLakeArtifactUnion): any {
  switch (item.artifactType) {
    case "LakeHouse":
      return lakeHouseArtifactSerializer(item as LakeHouseArtifact);

    default:
      return oneLakeArtifactSerializer(item);
  }
}

export function oneLakeArtifactUnionDeserializer(item: any): OneLakeArtifactUnion {
  switch (item["artifactType"]) {
    case "LakeHouse":
      return lakeHouseArtifactDeserializer(item as LakeHouseArtifact);

    default:
      return oneLakeArtifactDeserializer(item);
  }
}

/** Enum to determine OneLake artifact type. */
export enum KnownOneLakeArtifactType {
  /** LakeHouse */
  LakeHouse = "LakeHouse",
}

/**
 * Enum to determine OneLake artifact type. \
 * {@link KnownOneLakeArtifactType} can be used interchangeably with OneLakeArtifactType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LakeHouse**
 */
export type OneLakeArtifactType = string;

/** model interface LakeHouseArtifact */
export interface LakeHouseArtifact extends OneLakeArtifact {
  /** [Required] OneLake artifact type */
  artifactType: "LakeHouse";
}

export function lakeHouseArtifactSerializer(item: LakeHouseArtifact): any {
  return { artifactName: item["artifactName"], artifactType: item["artifactType"] };
}

export function lakeHouseArtifactDeserializer(item: any): LakeHouseArtifact {
  return {
    artifactName: item["artifactName"],
    artifactType: item["artifactType"],
  };
}

/** Base definition for datastore secrets. */
export interface DatastoreSecrets {
  /** [Required] Credential type used to authentication with storage. */
  /** The discriminator possible values: AccountKey, Certificate, Sas, ServicePrincipal */
  secretsType: SecretsType;
}

export function datastoreSecretsSerializer(item: DatastoreSecrets): any {
  return { secretsType: item["secretsType"] };
}

export function datastoreSecretsDeserializer(item: any): DatastoreSecrets {
  return {
    secretsType: item["secretsType"],
  };
}

/** Alias for DatastoreSecretsUnion */
export type DatastoreSecretsUnion =
  | AccountKeyDatastoreSecrets
  | CertificateDatastoreSecrets
  | SasDatastoreSecrets
  | ServicePrincipalDatastoreSecrets
  | DatastoreSecrets;

export function datastoreSecretsUnionSerializer(item: DatastoreSecretsUnion): any {
  switch (item.secretsType) {
    case "AccountKey":
      return accountKeyDatastoreSecretsSerializer(item as AccountKeyDatastoreSecrets);

    case "Certificate":
      return certificateDatastoreSecretsSerializer(item as CertificateDatastoreSecrets);

    case "Sas":
      return sasDatastoreSecretsSerializer(item as SasDatastoreSecrets);

    case "ServicePrincipal":
      return servicePrincipalDatastoreSecretsSerializer(item as ServicePrincipalDatastoreSecrets);

    default:
      return datastoreSecretsSerializer(item);
  }
}

export function datastoreSecretsUnionDeserializer(item: any): DatastoreSecretsUnion {
  switch (item["secretsType"]) {
    case "AccountKey":
      return accountKeyDatastoreSecretsDeserializer(item as AccountKeyDatastoreSecrets);

    case "Certificate":
      return certificateDatastoreSecretsDeserializer(item as CertificateDatastoreSecrets);

    case "Sas":
      return sasDatastoreSecretsDeserializer(item as SasDatastoreSecrets);

    case "ServicePrincipal":
      return servicePrincipalDatastoreSecretsDeserializer(item as ServicePrincipalDatastoreSecrets);

    default:
      return datastoreSecretsDeserializer(item);
  }
}

/** Enum to determine the datastore secrets type. */
export enum KnownSecretsType {
  /** AccountKey */
  AccountKey = "AccountKey",
  /** Certificate */
  Certificate = "Certificate",
  /** Sas */
  Sas = "Sas",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
}

/**
 * Enum to determine the datastore secrets type. \
 * {@link KnownSecretsType} can be used interchangeably with SecretsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountKey** \
 * **Certificate** \
 * **Sas** \
 * **ServicePrincipal**
 */
export type SecretsType = string;

/** A paginated list of Datastore entities. */
export interface _DatastoreResourceArmPaginatedResult {
  /** The Datastore items on this page */
  value: Datastore[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datastoreResourceArmPaginatedResultDeserializer(
  item: any,
): _DatastoreResourceArmPaginatedResult {
  return {
    value: datastoreArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datastoreArraySerializer(result: Array<Datastore>): any[] {
  return result.map((item) => {
    return datastoreSerializer(item);
  });
}

export function datastoreArrayDeserializer(result: Array<Datastore>): any[] {
  return result.map((item) => {
    return datastoreDeserializer(item);
  });
}

/** Secret expiration configuration. */
export interface SecretExpiry {
  /** Indicates if the secret is expirable. */
  expirableSecret?: boolean;
  /** Number of hours after which the secret will expire. */
  expireAfterHours?: number;
}

export function secretExpirySerializer(item: SecretExpiry): any {
  return { expirableSecret: item["expirableSecret"], expireAfterHours: item["expireAfterHours"] };
}

/** Azure Resource Manager resource envelope. */
export interface FeaturesetContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: FeaturesetContainerProperties;
}

export function featuresetContainerSerializer(item: FeaturesetContainer): any {
  return { properties: featuresetContainerPropertiesSerializer(item["properties"]) };
}

export function featuresetContainerDeserializer(item: any): FeaturesetContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: featuresetContainerPropertiesDeserializer(item["properties"]),
  };
}

/** DTO object representing feature set */
export interface FeaturesetContainerProperties extends AssetContainer {
  /** Provisioning state for the featureset container. */
  readonly provisioningState?: AssetProvisioningState;
}

export function featuresetContainerPropertiesSerializer(item: FeaturesetContainerProperties): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function featuresetContainerPropertiesDeserializer(
  item: any,
): FeaturesetContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** A paginated list of FeaturesetContainer entities. */
export interface _FeaturesetContainerResourceArmPaginatedResult {
  /** The FeaturesetContainer items on this page */
  value: FeaturesetContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _featuresetContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _FeaturesetContainerResourceArmPaginatedResult {
  return {
    value: featuresetContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function featuresetContainerArraySerializer(result: Array<FeaturesetContainer>): any[] {
  return result.map((item) => {
    return featuresetContainerSerializer(item);
  });
}

export function featuresetContainerArrayDeserializer(result: Array<FeaturesetContainer>): any[] {
  return result.map((item) => {
    return featuresetContainerDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface Feature extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: FeatureProperties;
}

export function featureDeserializer(item: any): Feature {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: featurePropertiesDeserializer(item["properties"]),
  };
}

/** DTO object representing feature */
export interface FeatureProperties extends ResourceBase {
  /** Specifies type */
  dataType?: FeatureDataType;
  /** Specifies name */
  featureName?: string;
}

export function featurePropertiesDeserializer(item: any): FeatureProperties {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataType: item["dataType"],
    featureName: item["featureName"],
  };
}

/** Known values of {@link FeatureDataType} that the service accepts. */
export enum KnownFeatureDataType {
  /** String */
  String = "String",
  /** Integer */
  Integer = "Integer",
  /** Long */
  Long = "Long",
  /** Float */
  Float = "Float",
  /** Double */
  Double = "Double",
  /** Binary */
  Binary = "Binary",
  /** Datetime */
  Datetime = "Datetime",
  /** Boolean */
  Boolean = "Boolean",
}

/** Type of FeatureDataType */
export type FeatureDataType = string;

/** A paginated list of Feature entities. */
export interface _FeatureResourceArmPaginatedResult {
  /** The Feature items on this page */
  value: Feature[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _featureResourceArmPaginatedResultDeserializer(
  item: any,
): _FeatureResourceArmPaginatedResult {
  return {
    value: featureArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function featureArrayDeserializer(result: Array<Feature>): any[] {
  return result.map((item) => {
    return featureDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface FeaturesetVersion extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: FeaturesetVersionProperties;
}

export function featuresetVersionSerializer(item: FeaturesetVersion): any {
  return { properties: featuresetVersionPropertiesSerializer(item["properties"]) };
}

export function featuresetVersionDeserializer(item: any): FeaturesetVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: featuresetVersionPropertiesDeserializer(item["properties"]),
  };
}

/** DTO object representing feature set version */
export interface FeaturesetVersionProperties extends AssetBase {
  /** Specifies list of entities */
  entities?: string[];
  /** Specifies the materialization settings */
  materializationSettings?: MaterializationSettings;
  /** Provisioning state for the featureset version container. */
  readonly provisioningState?: AssetProvisioningState;
  /** Specifies the feature spec details */
  specification?: FeaturesetSpecification;
  /** Specifies the asset stage */
  stage?: string;
}

export function featuresetVersionPropertiesSerializer(item: FeaturesetVersionProperties): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    entities: !item["entities"]
      ? item["entities"]
      : item["entities"].map((p: any) => {
          return p;
        }),
    materializationSettings: !item["materializationSettings"]
      ? item["materializationSettings"]
      : materializationSettingsSerializer(item["materializationSettings"]),
    specification: !item["specification"]
      ? item["specification"]
      : featuresetSpecificationSerializer(item["specification"]),
    stage: item["stage"],
  };
}

export function featuresetVersionPropertiesDeserializer(item: any): FeaturesetVersionProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    entities: !item["entities"]
      ? item["entities"]
      : item["entities"].map((p1: any) => {
          return p1;
        }),
    materializationSettings: !item["materializationSettings"]
      ? item["materializationSettings"]
      : materializationSettingsDeserializer(item["materializationSettings"]),
    provisioningState: item["provisioningState"],
    specification: !item["specification"]
      ? item["specification"]
      : featuresetSpecificationDeserializer(item["specification"]),
    stage: item["stage"],
  };
}

/** model interface MaterializationSettings */
export interface MaterializationSettings {
  /** Specifies the notification details */
  notification?: NotificationSetting;
  /** Specifies the compute resource settings */
  resource?: MaterializationComputeResource;
  /** Specifies the schedule details */
  schedule?: RecurrenceTrigger;
  /** Specifies the spark compute settings */
  sparkConfiguration?: Record<string, string>;
  /** Specifies the stores to which materialization should happen */
  storeType?: MaterializationStoreType;
}

export function materializationSettingsSerializer(item: MaterializationSettings): any {
  return {
    notification: !item["notification"]
      ? item["notification"]
      : notificationSettingSerializer(item["notification"]),
    resource: !item["resource"]
      ? item["resource"]
      : materializationComputeResourceSerializer(item["resource"]),
    schedule: !item["schedule"] ? item["schedule"] : recurrenceTriggerSerializer(item["schedule"]),
    sparkConfiguration: item["sparkConfiguration"],
    storeType: item["storeType"],
  };
}

export function materializationSettingsDeserializer(item: any): MaterializationSettings {
  return {
    notification: !item["notification"]
      ? item["notification"]
      : notificationSettingDeserializer(item["notification"]),
    resource: !item["resource"]
      ? item["resource"]
      : materializationComputeResourceDeserializer(item["resource"]),
    schedule: !item["schedule"]
      ? item["schedule"]
      : recurrenceTriggerDeserializer(item["schedule"]),
    sparkConfiguration: !item["sparkConfiguration"]
      ? item["sparkConfiguration"]
      : Object.fromEntries(
          Object.entries(item["sparkConfiguration"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    storeType: item["storeType"],
  };
}

/** Configuration for notification. */
export interface NotificationSetting {
  /** Send email notification to user on specified notification type */
  emailOn?: EmailNotificationEnableType[];
  /** This is the email recipient list which has a limitation of 499 characters in total concat with comma separator */
  emails?: string[];
  /** Send webhook callback to a service. Key is a user-provided name for the webhook. */
  webhooks?: Record<string, WebhookUnion>;
}

export function notificationSettingSerializer(item: NotificationSetting): any {
  return {
    emailOn: !item["emailOn"]
      ? item["emailOn"]
      : item["emailOn"].map((p: any) => {
          return p;
        }),
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
    webhooks: item["webhooks"],
  };
}

export function notificationSettingDeserializer(item: any): NotificationSetting {
  return {
    emailOn: !item["emailOn"]
      ? item["emailOn"]
      : item["emailOn"].map((p1: any) => {
          return p1;
        }),
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p1: any) => {
          return p1;
        }),
    webhooks: !item["webhooks"]
      ? item["webhooks"]
      : Object.fromEntries(
          Object.entries(item["webhooks"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : webhookUnionDeserializer(p1),
          ]),
        ),
  };
}

/** Enum to determine the email notification type. */
export enum KnownEmailNotificationEnableType {
  /** JobCompleted */
  JobCompleted = "JobCompleted",
  /** JobFailed */
  JobFailed = "JobFailed",
  /** JobCancelled */
  JobCancelled = "JobCancelled",
}

/**
 * Enum to determine the email notification type. \
 * {@link KnownEmailNotificationEnableType} can be used interchangeably with EmailNotificationEnableType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **JobCompleted** \
 * **JobFailed** \
 * **JobCancelled**
 */
export type EmailNotificationEnableType = string;

/** Webhook base */
export interface Webhook {
  /** Send callback on a specified notification event */
  eventType?: string;
  /** [Required] Specifies the type of service to send a callback */
  /** The discriminator possible values: AzureDevOps */
  webhookType: WebhookType;
}

export function webhookSerializer(item: Webhook): any {
  return { eventType: item["eventType"], webhookType: item["webhookType"] };
}

export function webhookDeserializer(item: any): Webhook {
  return {
    eventType: item["eventType"],
    webhookType: item["webhookType"],
  };
}

/** Alias for WebhookUnion */
export type WebhookUnion = AzureDevOpsWebhook | Webhook;

export function webhookUnionSerializer(item: WebhookUnion): any {
  switch (item.webhookType) {
    case "AzureDevOps":
      return azureDevOpsWebhookSerializer(item as AzureDevOpsWebhook);

    default:
      return webhookSerializer(item);
  }
}

export function webhookUnionDeserializer(item: any): WebhookUnion {
  switch (item["webhookType"]) {
    case "AzureDevOps":
      return azureDevOpsWebhookDeserializer(item as AzureDevOpsWebhook);

    default:
      return webhookDeserializer(item);
  }
}

/** Enum to determine the webhook callback service type. */
export enum KnownWebhookType {
  /** AzureDevOps */
  AzureDevOps = "AzureDevOps",
}

/**
 * Enum to determine the webhook callback service type. \
 * {@link KnownWebhookType} can be used interchangeably with WebhookType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureDevOps**
 */
export type WebhookType = string;

/** Webhook details specific for Azure DevOps */
export interface AzureDevOpsWebhook extends Webhook {
  /** [Required] Specifies the type of service to send a callback */
  webhookType: "AzureDevOps";
}

export function azureDevOpsWebhookSerializer(item: AzureDevOpsWebhook): any {
  return { eventType: item["eventType"], webhookType: item["webhookType"] };
}

export function azureDevOpsWebhookDeserializer(item: any): AzureDevOpsWebhook {
  return {
    eventType: item["eventType"],
    webhookType: item["webhookType"],
  };
}

/** DTO object representing compute resource */
export interface MaterializationComputeResource {
  /** Specifies the instance type */
  instanceType?: string;
}

export function materializationComputeResourceSerializer(
  item: MaterializationComputeResource,
): any {
  return { instanceType: item["instanceType"] };
}

export function materializationComputeResourceDeserializer(
  item: any,
): MaterializationComputeResource {
  return {
    instanceType: item["instanceType"],
  };
}

/** model interface RecurrenceTrigger */
export interface RecurrenceTrigger extends TriggerBase {
  /** [Required] The frequency to trigger schedule. */
  frequency: RecurrenceFrequency;
  /** [Required] Specifies schedule interval in conjunction with frequency */
  interval: number;
  /** The recurrence schedule. */
  schedule?: RecurrenceSchedule;
  /** [Required] */
  triggerType: "Recurrence";
}

export function recurrenceTriggerSerializer(item: RecurrenceTrigger): any {
  return {
    endTime: item["endTime"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    triggerType: item["triggerType"],
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: !item["schedule"] ? item["schedule"] : recurrenceScheduleSerializer(item["schedule"]),
  };
}

export function recurrenceTriggerDeserializer(item: any): RecurrenceTrigger {
  return {
    endTime: item["endTime"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    triggerType: item["triggerType"],
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : recurrenceScheduleDeserializer(item["schedule"]),
  };
}

/** Enum to describe the frequency of a recurrence schedule */
export enum KnownRecurrenceFrequency {
  /** Minute frequency */
  Minute = "Minute",
  /** Hour frequency */
  Hour = "Hour",
  /** Day frequency */
  Day = "Day",
  /** Week frequency */
  Week = "Week",
  /** Month frequency */
  Month = "Month",
}

/**
 * Enum to describe the frequency of a recurrence schedule \
 * {@link KnownRecurrenceFrequency} can be used interchangeably with RecurrenceFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Minute**: Minute frequency \
 * **Hour**: Hour frequency \
 * **Day**: Day frequency \
 * **Week**: Week frequency \
 * **Month**: Month frequency
 */
export type RecurrenceFrequency = string;

/** model interface RecurrenceSchedule */
export interface RecurrenceSchedule {
  /** [Required] List of hours for the schedule. */
  hours: number[];
  /** [Required] List of minutes for the schedule. */
  minutes: number[];
  /** List of month days for the schedule */
  monthDays?: number[];
  /** List of days for the schedule. */
  weekDays?: WeekDay[];
}

export function recurrenceScheduleSerializer(item: RecurrenceSchedule): any {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
  };
}

export function recurrenceScheduleDeserializer(item: any): RecurrenceSchedule {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p1: any) => {
          return p1;
        }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Enum of weekday */
export enum KnownWeekDay {
  /** Monday weekday */
  Monday = "Monday",
  /** Tuesday weekday */
  Tuesday = "Tuesday",
  /** Wednesday weekday */
  Wednesday = "Wednesday",
  /** Thursday weekday */
  Thursday = "Thursday",
  /** Friday weekday */
  Friday = "Friday",
  /** Saturday weekday */
  Saturday = "Saturday",
  /** Sunday weekday */
  Sunday = "Sunday",
}

/**
 * Enum of weekday \
 * {@link KnownWeekDay} can be used interchangeably with WeekDay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday**: Monday weekday \
 * **Tuesday**: Tuesday weekday \
 * **Wednesday**: Wednesday weekday \
 * **Thursday**: Thursday weekday \
 * **Friday**: Friday weekday \
 * **Saturday**: Saturday weekday \
 * **Sunday**: Sunday weekday
 */
export type WeekDay = string;

/** Known values of {@link MaterializationStoreType} that the service accepts. */
export enum KnownMaterializationStoreType {
  /** None */
  None = "None",
  /** Online */
  Online = "Online",
  /** Offline */
  Offline = "Offline",
  /** OnlineAndOffline */
  OnlineAndOffline = "OnlineAndOffline",
}

/** Type of MaterializationStoreType */
export type MaterializationStoreType = string;

/** DTO object representing specification */
export interface FeaturesetSpecification {
  /** Specifies the spec path */
  path?: string;
}

export function featuresetSpecificationSerializer(item: FeaturesetSpecification): any {
  return { path: item["path"] };
}

export function featuresetSpecificationDeserializer(item: any): FeaturesetSpecification {
  return {
    path: item["path"],
  };
}

/** model interface TriggerBase */
export interface TriggerBase {
  /**
   * Specifies end time of schedule in ISO 8601, but without a UTC offset. Refer https://en.wikipedia.org/wiki/ISO_8601.
   * Recommented format would be "2022-06-01T00:00:01"
   * If not present, the schedule will run indefinitely
   */
  endTime?: string;
  /** Specifies start time of schedule in ISO 8601 format, but without a UTC offset. */
  startTime?: string;
  /**
   * Specifies time zone in which the schedule runs.
   * TimeZone should follow Windows time zone format. Refer: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11
   */
  timeZone?: string;
  /** [Required] */
  /** The discriminator possible values: Recurrence, Cron */
  triggerType: TriggerType;
}

export function triggerBaseSerializer(item: TriggerBase): any {
  return {
    endTime: item["endTime"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    triggerType: item["triggerType"],
  };
}

export function triggerBaseDeserializer(item: any): TriggerBase {
  return {
    endTime: item["endTime"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    triggerType: item["triggerType"],
  };
}

/** Alias for TriggerBaseUnion */
export type TriggerBaseUnion = RecurrenceTrigger | CronTrigger | TriggerBase;

export function triggerBaseUnionSerializer(item: TriggerBaseUnion): any {
  switch (item.triggerType) {
    case "Recurrence":
      return recurrenceTriggerSerializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerSerializer(item as CronTrigger);

    default:
      return triggerBaseSerializer(item);
  }
}

export function triggerBaseUnionDeserializer(item: any): TriggerBaseUnion {
  switch (item["triggerType"]) {
    case "Recurrence":
      return recurrenceTriggerDeserializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerDeserializer(item as CronTrigger);

    default:
      return triggerBaseDeserializer(item);
  }
}

/** Known values of {@link TriggerType} that the service accepts. */
export enum KnownTriggerType {
  /** Recurrence */
  Recurrence = "Recurrence",
  /** Cron */
  Cron = "Cron",
}

/** Type of TriggerType */
export type TriggerType = string;

/** model interface CronTrigger */
export interface CronTrigger extends TriggerBase {
  /**
   * [Required] Specifies cron expression of schedule.
   * The expression should follow NCronTab format.
   */
  expression: string;
  /** [Required] */
  triggerType: "Cron";
}

export function cronTriggerSerializer(item: CronTrigger): any {
  return {
    endTime: item["endTime"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    triggerType: item["triggerType"],
    expression: item["expression"],
  };
}

export function cronTriggerDeserializer(item: any): CronTrigger {
  return {
    endTime: item["endTime"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    triggerType: item["triggerType"],
    expression: item["expression"],
  };
}

/** A paginated list of FeaturesetVersion entities. */
export interface _FeaturesetVersionResourceArmPaginatedResult {
  /** The FeaturesetVersion items on this page */
  value: FeaturesetVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _featuresetVersionResourceArmPaginatedResultDeserializer(
  item: any,
): _FeaturesetVersionResourceArmPaginatedResult {
  return {
    value: featuresetVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function featuresetVersionArraySerializer(result: Array<FeaturesetVersion>): any[] {
  return result.map((item) => {
    return featuresetVersionSerializer(item);
  });
}

export function featuresetVersionArrayDeserializer(result: Array<FeaturesetVersion>): any[] {
  return result.map((item) => {
    return featuresetVersionDeserializer(item);
  });
}

/** Request payload for creating a backfill request for a given feature set version */
export interface FeaturesetVersionBackfillRequest {
  /** Specified the data availability status that you want to backfill */
  dataAvailabilityStatus?: DataAvailabilityStatus[];
  /** Specifies description */
  description?: string;
  /** Specifies description */
  displayName?: string;
  /** Specifies the backfill feature window to be materialized */
  featureWindow?: FeatureWindow;
  /** Specify the jobId to retry the failed materialization */
  jobId?: string;
  /** Specifies the properties */
  properties?: Record<string, string>;
  /** Specifies the compute resource settings */
  resource?: MaterializationComputeResource;
  /** Specifies the spark compute settings */
  sparkConfiguration?: Record<string, string>;
  /** Specifies the tags */
  tags?: Record<string, string>;
}

export function featuresetVersionBackfillRequestSerializer(
  item: FeaturesetVersionBackfillRequest,
): any {
  return {
    dataAvailabilityStatus: !item["dataAvailabilityStatus"]
      ? item["dataAvailabilityStatus"]
      : item["dataAvailabilityStatus"].map((p: any) => {
          return p;
        }),
    description: item["description"],
    displayName: item["displayName"],
    featureWindow: !item["featureWindow"]
      ? item["featureWindow"]
      : featureWindowSerializer(item["featureWindow"]),
    jobId: item["jobId"],
    properties: item["properties"],
    resource: !item["resource"]
      ? item["resource"]
      : materializationComputeResourceSerializer(item["resource"]),
    sparkConfiguration: item["sparkConfiguration"],
    tags: item["tags"],
  };
}

/** Known values of {@link DataAvailabilityStatus} that the service accepts. */
export enum KnownDataAvailabilityStatus {
  /** None */
  None = "None",
  /** Pending */
  Pending = "Pending",
  /** Incomplete */
  Incomplete = "Incomplete",
  /** Complete */
  Complete = "Complete",
}

/** Type of DataAvailabilityStatus */
export type DataAvailabilityStatus = string;

/** Specifies the feature window */
export interface FeatureWindow {
  /** Specifies the feature window end time */
  featureWindowEnd?: Date;
  /** Specifies the feature window start time */
  featureWindowStart?: Date;
}

export function featureWindowSerializer(item: FeatureWindow): any {
  return {
    featureWindowEnd: !item["featureWindowEnd"]
      ? item["featureWindowEnd"]
      : item["featureWindowEnd"].toISOString(),
    featureWindowStart: !item["featureWindowStart"]
      ? item["featureWindowStart"]
      : item["featureWindowStart"].toISOString(),
  };
}

/** Response payload for creating a backfill request for a given feature set version */
export interface FeaturesetVersionBackfillResponse {
  /** List of jobs submitted as part of the backfill request. */
  jobIds?: string[];
}

export function featuresetVersionBackfillResponseDeserializer(
  item: any,
): FeaturesetVersionBackfillResponse {
  return {
    jobIds: !item["jobIds"]
      ? item["jobIds"]
      : item["jobIds"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Azure Resource Manager resource envelope. */
export interface FeaturestoreEntityContainer extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: FeaturestoreEntityContainerProperties;
}

export function featurestoreEntityContainerSerializer(item: FeaturestoreEntityContainer): any {
  return { properties: featurestoreEntityContainerPropertiesSerializer(item["properties"]) };
}

export function featurestoreEntityContainerDeserializer(item: any): FeaturestoreEntityContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: featurestoreEntityContainerPropertiesDeserializer(item["properties"]),
  };
}

/** DTO object representing feature entity */
export interface FeaturestoreEntityContainerProperties extends AssetContainer {
  /** Provisioning state for the featurestore entity container. */
  readonly provisioningState?: AssetProvisioningState;
}

export function featurestoreEntityContainerPropertiesSerializer(
  item: FeaturestoreEntityContainerProperties,
): any {
  return {
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
  };
}

export function featurestoreEntityContainerPropertiesDeserializer(
  item: any,
): FeaturestoreEntityContainerProperties {
  return {
    isArchived: item["isArchived"],
    latestVersion: item["latestVersion"],
    nextVersion: item["nextVersion"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** A paginated list of FeaturestoreEntityContainer entities. */
export interface _FeaturestoreEntityContainerResourceArmPaginatedResult {
  /** The FeaturestoreEntityContainer items on this page */
  value: FeaturestoreEntityContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _featurestoreEntityContainerResourceArmPaginatedResultDeserializer(
  item: any,
): _FeaturestoreEntityContainerResourceArmPaginatedResult {
  return {
    value: featurestoreEntityContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function featurestoreEntityContainerArraySerializer(
  result: Array<FeaturestoreEntityContainer>,
): any[] {
  return result.map((item) => {
    return featurestoreEntityContainerSerializer(item);
  });
}

export function featurestoreEntityContainerArrayDeserializer(
  result: Array<FeaturestoreEntityContainer>,
): any[] {
  return result.map((item) => {
    return featurestoreEntityContainerDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface FeaturestoreEntityVersion extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: FeaturestoreEntityVersionProperties;
}

export function featurestoreEntityVersionSerializer(item: FeaturestoreEntityVersion): any {
  return { properties: featurestoreEntityVersionPropertiesSerializer(item["properties"]) };
}

export function featurestoreEntityVersionDeserializer(item: any): FeaturestoreEntityVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: featurestoreEntityVersionPropertiesDeserializer(item["properties"]),
  };
}

/** DTO object representing feature entity version */
export interface FeaturestoreEntityVersionProperties extends AssetBase {
  /** Specifies index columns */
  indexColumns?: IndexColumn[];
  /** Provisioning state for the featurestore entity version. */
  readonly provisioningState?: AssetProvisioningState;
  /** Specifies the asset stage */
  stage?: string;
}

export function featurestoreEntityVersionPropertiesSerializer(
  item: FeaturestoreEntityVersionProperties,
): any {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    indexColumns: !item["indexColumns"]
      ? item["indexColumns"]
      : indexColumnArraySerializer(item["indexColumns"]),
    stage: item["stage"],
  };
}

export function featurestoreEntityVersionPropertiesDeserializer(
  item: any,
): FeaturestoreEntityVersionProperties {
  return {
    isAnonymous: item["isAnonymous"],
    isArchived: item["isArchived"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    indexColumns: !item["indexColumns"]
      ? item["indexColumns"]
      : indexColumnArrayDeserializer(item["indexColumns"]),
    provisioningState: item["provisioningState"],
    stage: item["stage"],
  };
}

export function indexColumnArraySerializer(result: Array<IndexColumn>): any[] {
  return result.map((item) => {
    return indexColumnSerializer(item);
  });
}

export function indexColumnArrayDeserializer(result: Array<IndexColumn>): any[] {
  return result.map((item) => {
    return indexColumnDeserializer(item);
  });
}

/** DTO object representing index column */
export interface IndexColumn {
  /** Specifies the column name */
  columnName?: string;
  /** Specifies the data type */
  dataType?: FeatureDataType;
}

export function indexColumnSerializer(item: IndexColumn): any {
  return { columnName: item["columnName"], dataType: item["dataType"] };
}

export function indexColumnDeserializer(item: any): IndexColumn {
  return {
    columnName: item["columnName"],
    dataType: item["dataType"],
  };
}

/** A paginated list of FeaturestoreEntityVersion entities. */
export interface _FeaturestoreEntityVersionResourceArmPaginatedResult {
  /** The FeaturestoreEntityVersion items on this page */
  value: FeaturestoreEntityVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _featurestoreEntityVersionResourceArmPaginatedResultDeserializer(
  item: any,
): _FeaturestoreEntityVersionResourceArmPaginatedResult {
  return {
    value: featurestoreEntityVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function featurestoreEntityVersionArraySerializer(
  result: Array<FeaturestoreEntityVersion>,
): any[] {
  return result.map((item) => {
    return featurestoreEntityVersionSerializer(item);
  });
}

export function featurestoreEntityVersionArrayDeserializer(
  result: Array<FeaturestoreEntityVersion>,
): any[] {
  return result.map((item) => {
    return featurestoreEntityVersionDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface MarketplaceSubscription extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: MarketplaceSubscriptionProperties;
}

export function marketplaceSubscriptionSerializer(item: MarketplaceSubscription): any {
  return { properties: marketplaceSubscriptionPropertiesSerializer(item["properties"]) };
}

export function marketplaceSubscriptionDeserializer(item: any): MarketplaceSubscription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: marketplaceSubscriptionPropertiesDeserializer(item["properties"]),
  };
}

/** model interface MarketplaceSubscriptionProperties */
export interface MarketplaceSubscriptionProperties {
  /** Marketplace Plan associated with the Marketplace Subscription. */
  readonly marketplacePlan?: MarketplacePlan;
  /** Current status of the Marketplace Subscription. */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** [Required] Target Marketplace Model ID to create a Marketplace Subscription for. */
  modelId: string;
  /** Provisioning State of the Marketplace Subscription. */
  readonly provisioningState?: MarketplaceSubscriptionProvisioningState;
}

export function marketplaceSubscriptionPropertiesSerializer(
  item: MarketplaceSubscriptionProperties,
): any {
  return { modelId: item["modelId"] };
}

export function marketplaceSubscriptionPropertiesDeserializer(
  item: any,
): MarketplaceSubscriptionProperties {
  return {
    marketplacePlan: !item["marketplacePlan"]
      ? item["marketplacePlan"]
      : marketplacePlanDeserializer(item["marketplacePlan"]),
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    modelId: item["modelId"],
    provisioningState: item["provisioningState"],
  };
}

/** model interface MarketplacePlan */
export interface MarketplacePlan {
  /** The identifying name of the Offer of the Marketplace Plan. */
  readonly offerId?: string;
  /** The identifying name of the Plan of the Marketplace Plan. */
  readonly planId?: string;
  /** The identifying name of the Publisher of the Marketplace Plan. */
  readonly publisherId?: string;
}

export function marketplacePlanDeserializer(item: any): MarketplacePlan {
  return {
    offerId: item["offerId"],
    planId: item["planId"],
    publisherId: item["publisherId"],
  };
}

/** Known values of {@link MarketplaceSubscriptionStatus} that the service accepts. */
export enum KnownMarketplaceSubscriptionStatus {
  /**
   * The customer can now use the Marketplace Subscription's
   * model and will be billed.
   */
  Subscribed = "Subscribed",
  /**
   * The customer could not be billed for the Marketplace Subscription.
   * The customer will not be able to access the model.
   */
  Suspended = "Suspended",
  /**
   * Marketplace Subscriptions reach this state in response to an explicit customer or CSP action.
   * A Marketplace Subscription can also be canceled implicitly, as a result of nonpayment of dues,
   * after being in the Suspended state for some time.
   */
  Unsubscribed = "Unsubscribed",
}

/** Type of MarketplaceSubscriptionStatus */
export type MarketplaceSubscriptionStatus = string;

/** Known values of {@link MarketplaceSubscriptionProvisioningState} that the service accepts. */
export enum KnownMarketplaceSubscriptionProvisioningState {
  /** MarketplaceSubscription is being created. */
  Creating = "Creating",
  /** MarketplaceSubscription is being deleted. */
  Deleting = "Deleting",
  /** MarketplaceSubscription is successfully provisioned. */
  Succeeded = "Succeeded",
  /** MarketplaceSubscription provisioning failed. */
  Failed = "Failed",
  /** MarketplaceSubscription is being updated. */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/** Type of MarketplaceSubscriptionProvisioningState */
export type MarketplaceSubscriptionProvisioningState = string;

/** A paginated list of MarketplaceSubscription entities. */
export interface _MarketplaceSubscriptionResourceArmPaginatedResult {
  /** The MarketplaceSubscription items on this page */
  value: MarketplaceSubscription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _marketplaceSubscriptionResourceArmPaginatedResultDeserializer(
  item: any,
): _MarketplaceSubscriptionResourceArmPaginatedResult {
  return {
    value: marketplaceSubscriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function marketplaceSubscriptionArraySerializer(
  result: Array<MarketplaceSubscription>,
): any[] {
  return result.map((item) => {
    return marketplaceSubscriptionSerializer(item);
  });
}

export function marketplaceSubscriptionArrayDeserializer(
  result: Array<MarketplaceSubscription>,
): any[] {
  return result.map((item) => {
    return marketplaceSubscriptionDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface OnlineEndpoint extends TrackedResource {
  /** [Required] Additional attributes of the entity. */
  properties: OnlineEndpointProperties;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: Sku;
}

export function onlineEndpointSerializer(item: OnlineEndpoint): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: onlineEndpointPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function onlineEndpointDeserializer(item: any): OnlineEndpoint {
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
    properties: onlineEndpointPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Online endpoint configuration */
export interface OnlineEndpointProperties extends EndpointPropertiesBase {
  /**
   * ARM resource ID of the compute if it exists.
   * optional
   */
  compute?: string;
  /** Percentage of traffic to be mirrored to each deployment without using returned scoring. Traffic values need to sum to utmost 50. */
  mirrorTraffic?: Record<string, number>;
  /** Provisioning state for the endpoint. */
  readonly provisioningState?: EndpointProvisioningState;
  /** Enum to determine whether PublicNetworkAccess is Enabled or Disabled. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Percentage of traffic from endpoint to divert to each deployment. Traffic values need to sum to 100. */
  traffic?: Record<string, number>;
}

export function onlineEndpointPropertiesSerializer(item: OnlineEndpointProperties): any {
  return {
    authMode: item["authMode"],
    description: item["description"],
    keys: !item["keys"] ? item["keys"] : endpointAuthKeysSerializer(item["keys"]),
    properties: item["properties"],
    compute: item["compute"],
    mirrorTraffic: item["mirrorTraffic"],
    publicNetworkAccess: item["publicNetworkAccess"],
    traffic: item["traffic"],
  };
}

export function onlineEndpointPropertiesDeserializer(item: any): OnlineEndpointProperties {
  return {
    authMode: item["authMode"],
    description: item["description"],
    keys: !item["keys"] ? item["keys"] : endpointAuthKeysDeserializer(item["keys"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    scoringUri: item["scoringUri"],
    swaggerUri: item["swaggerUri"],
    compute: item["compute"],
    mirrorTraffic: !item["mirrorTraffic"]
      ? item["mirrorTraffic"]
      : Object.fromEntries(
          Object.entries(item["mirrorTraffic"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
    traffic: !item["traffic"]
      ? item["traffic"]
      : Object.fromEntries(
          Object.entries(item["traffic"]).map(([k1, p1]: [string, any]) => [k1, p1]),
        ),
  };
}

/** A paginated list of OnlineEndpoint entities. */
export interface _OnlineEndpointTrackedResourceArmPaginatedResult {
  /** The OnlineEndpoint items on this page */
  value: OnlineEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _onlineEndpointTrackedResourceArmPaginatedResultDeserializer(
  item: any,
): _OnlineEndpointTrackedResourceArmPaginatedResult {
  return {
    value: onlineEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function onlineEndpointArraySerializer(result: Array<OnlineEndpoint>): any[] {
  return result.map((item) => {
    return onlineEndpointSerializer(item);
  });
}

export function onlineEndpointArrayDeserializer(result: Array<OnlineEndpoint>): any[] {
  return result.map((item) => {
    return onlineEndpointDeserializer(item);
  });
}

/** model interface RegenerateEndpointKeysRequest */
export interface RegenerateEndpointKeysRequest {
  /** [Required] Specification for which type of key to generate. Primary or Secondary. */
  keyType: KeyType;
  /** The value the key is set to. */
  keyValue?: string;
}

export function regenerateEndpointKeysRequestSerializer(item: RegenerateEndpointKeysRequest): any {
  return { keyType: item["keyType"], keyValue: item["keyValue"] };
}

/** Known values of {@link KeyType} that the service accepts. */
export enum KnownKeyType {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/** Type of KeyType */
export type KeyType = string;

/** Service Token */
export interface EndpointAuthToken {
  /** Access token for endpoint authentication. */
  accessToken?: string;
  /** Access token expiry time (UTC). */
  expiryTimeUtc?: number;
  /** Refresh access token after time (UTC). */
  refreshAfterTimeUtc?: number;
  /** Access token type. */
  tokenType?: string;
}

export function endpointAuthTokenDeserializer(item: any): EndpointAuthToken {
  return {
    accessToken: item["accessToken"],
    expiryTimeUtc: item["expiryTimeUtc"],
    refreshAfterTimeUtc: item["refreshAfterTimeUtc"],
    tokenType: item["tokenType"],
  };
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface OnlineDeployment extends TrackedResource {
  /** [Required] Additional attributes of the entity. */
  properties: OnlineDeploymentPropertiesUnion;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: Sku;
}

export function onlineDeploymentSerializer(item: OnlineDeployment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: onlineDeploymentPropertiesUnionSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function onlineDeploymentDeserializer(item: any): OnlineDeployment {
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
    properties: onlineDeploymentPropertiesUnionDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** model interface OnlineDeploymentProperties */
export interface OnlineDeploymentProperties extends EndpointDeploymentPropertiesBase {
  /** If true, enables Application Insights logging. */
  appInsightsEnabled?: boolean;
  /** The mdc configuration, we disable mdc when it's null. */
  dataCollector?: DataCollector;
  /** Enum to determine whether PublicNetworkAccess is Enabled or Disabled for egress of a deployment. */
  egressPublicNetworkAccess?: EgressPublicNetworkAccessType;
  /** [Required] The compute type of the endpoint. */
  /** The discriminator possible values: Kubernetes, Managed */
  endpointComputeType: EndpointComputeType;
  /** Compute instance type. Default: Standard_F4s_v2. */
  instanceType?: string;
  /** Liveness probe monitors the health of the container regularly. */
  livenessProbe?: ProbeSettings;
  /** The URI path to the model. */
  model?: string;
  /** The path to mount the model in custom container. */
  modelMountPath?: string;
  /** Provisioning state for the endpoint deployment. */
  readonly provisioningState?: DeploymentProvisioningState;
  /** Readiness probe validates if the container is ready to serve traffic. The properties and defaults are the same as liveness probe. */
  readinessProbe?: ProbeSettings;
  /** Request settings for the deployment. */
  requestSettings?: OnlineRequestSettings;
  /**
   * Scale settings for the deployment.
   * If it is null or not provided,
   * it defaults to TargetUtilizationScaleSettings for KubernetesOnlineDeployment
   * and to DefaultScaleSettings for ManagedOnlineDeployment.
   */
  scaleSettings?: OnlineScaleSettingsUnion;
  /** Startup probe verify whether an application within a container has started successfully. */
  startupProbe?: ProbeSettings;
}

export function onlineDeploymentPropertiesSerializer(item: OnlineDeploymentProperties): any {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationSerializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    properties: item["properties"],
    appInsightsEnabled: item["appInsightsEnabled"],
    dataCollector: !item["dataCollector"]
      ? item["dataCollector"]
      : dataCollectorSerializer(item["dataCollector"]),
    egressPublicNetworkAccess: item["egressPublicNetworkAccess"],
    endpointComputeType: item["endpointComputeType"],
    instanceType: item["instanceType"],
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : probeSettingsSerializer(item["livenessProbe"]),
    model: item["model"],
    modelMountPath: item["modelMountPath"],
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : probeSettingsSerializer(item["readinessProbe"]),
    requestSettings: !item["requestSettings"]
      ? item["requestSettings"]
      : onlineRequestSettingsSerializer(item["requestSettings"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : onlineScaleSettingsUnionSerializer(item["scaleSettings"]),
    startupProbe: !item["startupProbe"]
      ? item["startupProbe"]
      : probeSettingsSerializer(item["startupProbe"]),
  };
}

export function onlineDeploymentPropertiesDeserializer(item: any): OnlineDeploymentProperties {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationDeserializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    appInsightsEnabled: item["appInsightsEnabled"],
    dataCollector: !item["dataCollector"]
      ? item["dataCollector"]
      : dataCollectorDeserializer(item["dataCollector"]),
    egressPublicNetworkAccess: item["egressPublicNetworkAccess"],
    endpointComputeType: item["endpointComputeType"],
    instanceType: item["instanceType"],
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : probeSettingsDeserializer(item["livenessProbe"]),
    model: item["model"],
    modelMountPath: item["modelMountPath"],
    provisioningState: item["provisioningState"],
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : probeSettingsDeserializer(item["readinessProbe"]),
    requestSettings: !item["requestSettings"]
      ? item["requestSettings"]
      : onlineRequestSettingsDeserializer(item["requestSettings"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : onlineScaleSettingsUnionDeserializer(item["scaleSettings"]),
    startupProbe: !item["startupProbe"]
      ? item["startupProbe"]
      : probeSettingsDeserializer(item["startupProbe"]),
  };
}

/** Alias for OnlineDeploymentPropertiesUnion */
export type OnlineDeploymentPropertiesUnion =
  | KubernetesOnlineDeployment
  | ManagedOnlineDeployment
  | OnlineDeploymentProperties;

export function onlineDeploymentPropertiesUnionSerializer(
  item: OnlineDeploymentPropertiesUnion,
): any {
  switch (item.endpointComputeType) {
    case "Kubernetes":
      return kubernetesOnlineDeploymentSerializer(item as KubernetesOnlineDeployment);

    case "Managed":
      return managedOnlineDeploymentSerializer(item as ManagedOnlineDeployment);

    default:
      return onlineDeploymentPropertiesSerializer(item);
  }
}

export function onlineDeploymentPropertiesUnionDeserializer(
  item: any,
): OnlineDeploymentPropertiesUnion {
  switch (item["endpointComputeType"]) {
    case "Kubernetes":
      return kubernetesOnlineDeploymentDeserializer(item as KubernetesOnlineDeployment);

    case "Managed":
      return managedOnlineDeploymentDeserializer(item as ManagedOnlineDeployment);

    default:
      return onlineDeploymentPropertiesDeserializer(item);
  }
}

/** model interface DataCollector */
export interface DataCollector {
  /**
   * [Required] The collection configuration. Each collection has it own configuration to collect model data and the name of collection can be arbitrary string.
   * Model data collector can be used for either payload logging or custom logging or both of them. Collection request and response are reserved for payload logging, others are for custom logging.
   */
  collections: Record<string, Collection | null>;
  /** The request logging configuration for mdc, it includes advanced logging settings for all collections. It's optional. */
  requestLogging?: RequestLogging;
  /**
   * When model data is collected to blob storage, we need to roll the data to different path to avoid logging all of them in a single blob file.
   * If the rolling rate is hour, all data will be collected in the blob path /yyyy/MM/dd/HH/.
   * If it's day, all data will be collected in blob path /yyyy/MM/dd/.
   * The other benefit of rolling path is that model monitoring ui is able to select a time range of data very quickly.
   */
  rollingRate?: RollingRateType;
}

export function dataCollectorSerializer(item: DataCollector): any {
  return {
    collections: item["collections"],
    requestLogging: !item["requestLogging"]
      ? item["requestLogging"]
      : requestLoggingSerializer(item["requestLogging"]),
    rollingRate: item["rollingRate"],
  };
}

export function dataCollectorDeserializer(item: any): DataCollector {
  return {
    collections: Object.fromEntries(
      Object.entries(item["collections"]).map(([k, p]: [string, any]) => [
        k,
        !p ? p : collectionDeserializer(p),
      ]),
    ),
    requestLogging: !item["requestLogging"]
      ? item["requestLogging"]
      : requestLoggingDeserializer(item["requestLogging"]),
    rollingRate: item["rollingRate"],
  };
}

/** model interface Collection */
export interface Collection {
  /** The msi client id used to collect logging to blob storage. If it's null,backend will pick a registered endpoint identity to auth. */
  clientId?: string;
  /** Enable or disable data collection. */
  dataCollectionMode?: DataCollectionMode;
  /** The data asset arm resource id. Client side will ensure data asset is pointing to the blob storage, and backend will collect data to the blob storage. */
  dataId?: string;
  /** The sampling rate for collection. Sampling rate 1.0 means we collect 100% of data by default. */
  samplingRate?: number;
}

export function collectionSerializer(item: Collection): any {
  return {
    clientId: item["clientId"],
    dataCollectionMode: item["dataCollectionMode"],
    dataId: item["dataId"],
    samplingRate: item["samplingRate"],
  };
}

export function collectionDeserializer(item: any): Collection {
  return {
    clientId: item["clientId"],
    dataCollectionMode: item["dataCollectionMode"],
    dataId: item["dataId"],
    samplingRate: item["samplingRate"],
  };
}

/** Known values of {@link DataCollectionMode} that the service accepts. */
export enum KnownDataCollectionMode {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of DataCollectionMode */
export type DataCollectionMode = string;

/** model interface RequestLogging */
export interface RequestLogging {
  /** For payload logging, we only collect payload by default. If customers also want to collect the specified headers, they can set them in captureHeaders so that backend will collect those headers along with payload. */
  captureHeaders?: string[];
}

export function requestLoggingSerializer(item: RequestLogging): any {
  return {
    captureHeaders: !item["captureHeaders"]
      ? item["captureHeaders"]
      : item["captureHeaders"].map((p: any) => {
          return p;
        }),
  };
}

export function requestLoggingDeserializer(item: any): RequestLogging {
  return {
    captureHeaders: !item["captureHeaders"]
      ? item["captureHeaders"]
      : item["captureHeaders"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Known values of {@link RollingRateType} that the service accepts. */
export enum KnownRollingRateType {
  /** Year */
  Year = "Year",
  /** Month */
  Month = "Month",
  /** Day */
  Day = "Day",
  /** Hour */
  Hour = "Hour",
  /** Minute */
  Minute = "Minute",
}

/** Type of RollingRateType */
export type RollingRateType = string;

/** Enum to determine whether PublicNetworkAccess is Enabled or Disabled for egress of a deployment. */
export enum KnownEgressPublicNetworkAccessType {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enum to determine whether PublicNetworkAccess is Enabled or Disabled for egress of a deployment. \
 * {@link KnownEgressPublicNetworkAccessType} can be used interchangeably with EgressPublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type EgressPublicNetworkAccessType = string;

/** Enum to determine endpoint compute type. */
export enum KnownEndpointComputeType {
  /** Managed */
  Managed = "Managed",
  /** Kubernetes */
  Kubernetes = "Kubernetes",
  /** AzureMLCompute */
  AzureMLCompute = "AzureMLCompute",
}

/**
 * Enum to determine endpoint compute type. \
 * {@link KnownEndpointComputeType} can be used interchangeably with EndpointComputeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed** \
 * **Kubernetes** \
 * **AzureMLCompute**
 */
export type EndpointComputeType = string;

/** Deployment container liveness/readiness probe configuration. */
export interface ProbeSettings {
  /** The number of failures to allow before returning an unhealthy status. */
  failureThreshold?: number;
  /** The delay before the first probe in ISO 8601 format. */
  initialDelay?: string;
  /** The length of time between probes in ISO 8601 format. */
  period?: string;
  /** The number of successful probes before returning a healthy status. */
  successThreshold?: number;
  /** The probe timeout in ISO 8601 format. */
  timeout?: string;
}

export function probeSettingsSerializer(item: ProbeSettings): any {
  return {
    failureThreshold: item["failureThreshold"],
    initialDelay: item["initialDelay"],
    period: item["period"],
    successThreshold: item["successThreshold"],
    timeout: item["timeout"],
  };
}

export function probeSettingsDeserializer(item: any): ProbeSettings {
  return {
    failureThreshold: item["failureThreshold"],
    initialDelay: item["initialDelay"],
    period: item["period"],
    successThreshold: item["successThreshold"],
    timeout: item["timeout"],
  };
}

/** Online deployment scoring requests configuration. */
export interface OnlineRequestSettings {
  /** The number of maximum concurrent requests per node allowed per deployment. Defaults to 1. */
  maxConcurrentRequestsPerInstance?: number;
  /**
   * (Deprecated for Managed Online Endpoints) The maximum amount of time a request will stay in the queue in ISO 8601 format.
   * Defaults to 500ms.
   * (Now increase `request_timeout_ms` to account for any networking/queue delays)
   */
  maxQueueWait?: string;
  /**
   * The scoring timeout in ISO 8601 format.
   * Defaults to 5000ms.
   */
  requestTimeout?: string;
}

export function onlineRequestSettingsSerializer(item: OnlineRequestSettings): any {
  return {
    maxConcurrentRequestsPerInstance: item["maxConcurrentRequestsPerInstance"],
    maxQueueWait: item["maxQueueWait"],
    requestTimeout: item["requestTimeout"],
  };
}

export function onlineRequestSettingsDeserializer(item: any): OnlineRequestSettings {
  return {
    maxConcurrentRequestsPerInstance: item["maxConcurrentRequestsPerInstance"],
    maxQueueWait: item["maxQueueWait"],
    requestTimeout: item["requestTimeout"],
  };
}

/** Online deployment scaling configuration. */
export interface OnlineScaleSettings {
  /** [Required] Type of deployment scaling algorithm */
  /** The discriminator possible values: Default, TargetUtilization */
  scaleType: ScaleType;
}

export function onlineScaleSettingsSerializer(item: OnlineScaleSettings): any {
  return { scaleType: item["scaleType"] };
}

export function onlineScaleSettingsDeserializer(item: any): OnlineScaleSettings {
  return {
    scaleType: item["scaleType"],
  };
}

/** Alias for OnlineScaleSettingsUnion */
export type OnlineScaleSettingsUnion =
  | DefaultScaleSettings
  | TargetUtilizationScaleSettings
  | OnlineScaleSettings;

export function onlineScaleSettingsUnionSerializer(item: OnlineScaleSettingsUnion): any {
  switch (item.scaleType) {
    case "Default":
      return defaultScaleSettingsSerializer(item as DefaultScaleSettings);

    case "TargetUtilization":
      return targetUtilizationScaleSettingsSerializer(item as TargetUtilizationScaleSettings);

    default:
      return onlineScaleSettingsSerializer(item);
  }
}

export function onlineScaleSettingsUnionDeserializer(item: any): OnlineScaleSettingsUnion {
  switch (item["scaleType"]) {
    case "Default":
      return defaultScaleSettingsDeserializer(item as DefaultScaleSettings);

    case "TargetUtilization":
      return targetUtilizationScaleSettingsDeserializer(item as TargetUtilizationScaleSettings);

    default:
      return onlineScaleSettingsDeserializer(item);
  }
}

/** Known values of {@link ScaleType} that the service accepts. */
export enum KnownScaleType {
  /** Default */
  Default = "Default",
  /** TargetUtilization */
  TargetUtilization = "TargetUtilization",
}

/** Type of ScaleType */
export type ScaleType = string;

/** model interface DefaultScaleSettings */
export interface DefaultScaleSettings extends OnlineScaleSettings {
  /** [Required] Type of deployment scaling algorithm */
  scaleType: "Default";
}

export function defaultScaleSettingsSerializer(item: DefaultScaleSettings): any {
  return { scaleType: item["scaleType"] };
}

export function defaultScaleSettingsDeserializer(item: any): DefaultScaleSettings {
  return {
    scaleType: item["scaleType"],
  };
}

/** model interface TargetUtilizationScaleSettings */
export interface TargetUtilizationScaleSettings extends OnlineScaleSettings {
  /** The maximum number of instances that the deployment can scale to. The quota will be reserved for max_instances. */
  maxInstances?: number;
  /** The minimum number of instances to always be present. */
  minInstances?: number;
  /** The polling interval in ISO 8691 format. Only supports duration with precision as low as Seconds. */
  pollingInterval?: string;
  /** Target CPU usage for the autoscaler. */
  targetUtilizationPercentage?: number;
  /** [Required] Type of deployment scaling algorithm */
  scaleType: "TargetUtilization";
}

export function targetUtilizationScaleSettingsSerializer(
  item: TargetUtilizationScaleSettings,
): any {
  return {
    scaleType: item["scaleType"],
    maxInstances: item["maxInstances"],
    minInstances: item["minInstances"],
    pollingInterval: item["pollingInterval"],
    targetUtilizationPercentage: item["targetUtilizationPercentage"],
  };
}

export function targetUtilizationScaleSettingsDeserializer(
  item: any,
): TargetUtilizationScaleSettings {
  return {
    scaleType: item["scaleType"],
    maxInstances: item["maxInstances"],
    minInstances: item["minInstances"],
    pollingInterval: item["pollingInterval"],
    targetUtilizationPercentage: item["targetUtilizationPercentage"],
  };
}

/** Properties specific to a KubernetesOnlineDeployment. */
export interface KubernetesOnlineDeployment extends OnlineDeploymentProperties {
  /** The resource requirements for the container (cpu and memory). */
  containerResourceRequirements?: ContainerResourceRequirements;
  /** [Required] The compute type of the endpoint. */
  endpointComputeType: "Kubernetes";
}

export function kubernetesOnlineDeploymentSerializer(item: KubernetesOnlineDeployment): any {
  return {
    appInsightsEnabled: item["appInsightsEnabled"],
    dataCollector: !item["dataCollector"]
      ? item["dataCollector"]
      : dataCollectorSerializer(item["dataCollector"]),
    egressPublicNetworkAccess: item["egressPublicNetworkAccess"],
    endpointComputeType: item["endpointComputeType"],
    instanceType: item["instanceType"],
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : probeSettingsSerializer(item["livenessProbe"]),
    model: item["model"],
    modelMountPath: item["modelMountPath"],
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : probeSettingsSerializer(item["readinessProbe"]),
    requestSettings: !item["requestSettings"]
      ? item["requestSettings"]
      : onlineRequestSettingsSerializer(item["requestSettings"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : onlineScaleSettingsUnionSerializer(item["scaleSettings"]),
    startupProbe: !item["startupProbe"]
      ? item["startupProbe"]
      : probeSettingsSerializer(item["startupProbe"]),
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationSerializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    properties: item["properties"],
    containerResourceRequirements: !item["containerResourceRequirements"]
      ? item["containerResourceRequirements"]
      : containerResourceRequirementsSerializer(item["containerResourceRequirements"]),
  };
}

export function kubernetesOnlineDeploymentDeserializer(item: any): KubernetesOnlineDeployment {
  return {
    appInsightsEnabled: item["appInsightsEnabled"],
    dataCollector: !item["dataCollector"]
      ? item["dataCollector"]
      : dataCollectorDeserializer(item["dataCollector"]),
    egressPublicNetworkAccess: item["egressPublicNetworkAccess"],
    endpointComputeType: item["endpointComputeType"],
    instanceType: item["instanceType"],
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : probeSettingsDeserializer(item["livenessProbe"]),
    model: item["model"],
    modelMountPath: item["modelMountPath"],
    provisioningState: item["provisioningState"],
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : probeSettingsDeserializer(item["readinessProbe"]),
    requestSettings: !item["requestSettings"]
      ? item["requestSettings"]
      : onlineRequestSettingsDeserializer(item["requestSettings"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : onlineScaleSettingsUnionDeserializer(item["scaleSettings"]),
    startupProbe: !item["startupProbe"]
      ? item["startupProbe"]
      : probeSettingsDeserializer(item["startupProbe"]),
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationDeserializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    containerResourceRequirements: !item["containerResourceRequirements"]
      ? item["containerResourceRequirements"]
      : containerResourceRequirementsDeserializer(item["containerResourceRequirements"]),
  };
}

/** Resource requirements for each container instance within an online deployment. */
export interface ContainerResourceRequirements {
  /** Container resource limit info: */
  containerResourceLimits?: ContainerResourceSettings;
  /** Container resource request info: */
  containerResourceRequests?: ContainerResourceSettings;
}

export function containerResourceRequirementsSerializer(item: ContainerResourceRequirements): any {
  return {
    containerResourceLimits: !item["containerResourceLimits"]
      ? item["containerResourceLimits"]
      : containerResourceSettingsSerializer(item["containerResourceLimits"]),
    containerResourceRequests: !item["containerResourceRequests"]
      ? item["containerResourceRequests"]
      : containerResourceSettingsSerializer(item["containerResourceRequests"]),
  };
}

export function containerResourceRequirementsDeserializer(
  item: any,
): ContainerResourceRequirements {
  return {
    containerResourceLimits: !item["containerResourceLimits"]
      ? item["containerResourceLimits"]
      : containerResourceSettingsDeserializer(item["containerResourceLimits"]),
    containerResourceRequests: !item["containerResourceRequests"]
      ? item["containerResourceRequests"]
      : containerResourceSettingsDeserializer(item["containerResourceRequests"]),
  };
}

/** model interface ContainerResourceSettings */
export interface ContainerResourceSettings {
  /**
   * Number of vCPUs request/limit for container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  cpu?: string;
  /**
   * Number of Nvidia GPU cards request/limit for container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  gpu?: string;
  /**
   * Memory size request/limit for container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  memory?: string;
}

export function containerResourceSettingsSerializer(item: ContainerResourceSettings): any {
  return { cpu: item["cpu"], gpu: item["gpu"], memory: item["memory"] };
}

export function containerResourceSettingsDeserializer(item: any): ContainerResourceSettings {
  return {
    cpu: item["cpu"],
    gpu: item["gpu"],
    memory: item["memory"],
  };
}

/** Properties specific to a ManagedOnlineDeployment. */
export interface ManagedOnlineDeployment extends OnlineDeploymentProperties {
  /** [Required] The compute type of the endpoint. */
  endpointComputeType: "Managed";
}

export function managedOnlineDeploymentSerializer(item: ManagedOnlineDeployment): any {
  return {
    appInsightsEnabled: item["appInsightsEnabled"],
    dataCollector: !item["dataCollector"]
      ? item["dataCollector"]
      : dataCollectorSerializer(item["dataCollector"]),
    egressPublicNetworkAccess: item["egressPublicNetworkAccess"],
    endpointComputeType: item["endpointComputeType"],
    instanceType: item["instanceType"],
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : probeSettingsSerializer(item["livenessProbe"]),
    model: item["model"],
    modelMountPath: item["modelMountPath"],
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : probeSettingsSerializer(item["readinessProbe"]),
    requestSettings: !item["requestSettings"]
      ? item["requestSettings"]
      : onlineRequestSettingsSerializer(item["requestSettings"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : onlineScaleSettingsUnionSerializer(item["scaleSettings"]),
    startupProbe: !item["startupProbe"]
      ? item["startupProbe"]
      : probeSettingsSerializer(item["startupProbe"]),
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationSerializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    properties: item["properties"],
  };
}

export function managedOnlineDeploymentDeserializer(item: any): ManagedOnlineDeployment {
  return {
    appInsightsEnabled: item["appInsightsEnabled"],
    dataCollector: !item["dataCollector"]
      ? item["dataCollector"]
      : dataCollectorDeserializer(item["dataCollector"]),
    egressPublicNetworkAccess: item["egressPublicNetworkAccess"],
    endpointComputeType: item["endpointComputeType"],
    instanceType: item["instanceType"],
    livenessProbe: !item["livenessProbe"]
      ? item["livenessProbe"]
      : probeSettingsDeserializer(item["livenessProbe"]),
    model: item["model"],
    modelMountPath: item["modelMountPath"],
    provisioningState: item["provisioningState"],
    readinessProbe: !item["readinessProbe"]
      ? item["readinessProbe"]
      : probeSettingsDeserializer(item["readinessProbe"]),
    requestSettings: !item["requestSettings"]
      ? item["requestSettings"]
      : onlineRequestSettingsDeserializer(item["requestSettings"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : onlineScaleSettingsUnionDeserializer(item["scaleSettings"]),
    startupProbe: !item["startupProbe"]
      ? item["startupProbe"]
      : probeSettingsDeserializer(item["startupProbe"]),
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : codeConfigurationDeserializer(item["codeConfiguration"]),
    description: item["description"],
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
  };
}

/** Strictly used in update requests. */
export interface PartialMinimalTrackedResourceWithSku extends PartialMinimalTrackedResource {
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: PartialSku;
}

export function partialMinimalTrackedResourceWithSkuSerializer(
  item: PartialMinimalTrackedResourceWithSku,
): any {
  return {
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : partialSkuSerializer(item["sku"]),
  };
}

/** A paginated list of OnlineDeployment entities. */
export interface _OnlineDeploymentTrackedResourceArmPaginatedResult {
  /** The OnlineDeployment items on this page */
  value: OnlineDeployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _onlineDeploymentTrackedResourceArmPaginatedResultDeserializer(
  item: any,
): _OnlineDeploymentTrackedResourceArmPaginatedResult {
  return {
    value: onlineDeploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function onlineDeploymentArraySerializer(result: Array<OnlineDeployment>): any[] {
  return result.map((item) => {
    return onlineDeploymentSerializer(item);
  });
}

export function onlineDeploymentArrayDeserializer(result: Array<OnlineDeployment>): any[] {
  return result.map((item) => {
    return onlineDeploymentDeserializer(item);
  });
}

/** model interface DeploymentLogsRequest */
export interface DeploymentLogsRequest {
  /** The type of container to retrieve logs from. */
  containerType?: ContainerType;
  /** The maximum number of lines to tail. */
  tail?: number;
}

export function deploymentLogsRequestSerializer(item: DeploymentLogsRequest): any {
  return { containerType: item["containerType"], tail: item["tail"] };
}

/** Known values of {@link ContainerType} that the service accepts. */
export enum KnownContainerType {
  /** StorageInitializer */
  StorageInitializer = "StorageInitializer",
  /** InferenceServer */
  InferenceServer = "InferenceServer",
}

/** Type of ContainerType */
export type ContainerType = string;

/** model interface DeploymentLogs */
export interface DeploymentLogs {
  /** The retrieved online deployment logs. */
  content?: string;
}

export function deploymentLogsDeserializer(item: any): DeploymentLogs {
  return {
    content: item["content"],
  };
}

/** A paginated list of SkuResource entities. */
export interface _SkuResourceArmPaginatedResult {
  /** The SkuResource items on this page */
  value: SkuResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _skuResourceArmPaginatedResultDeserializer(
  item: any,
): _SkuResourceArmPaginatedResult {
  return {
    value: skuResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuResourceArrayDeserializer(result: Array<SkuResource>): any[] {
  return result.map((item) => {
    return skuResourceDeserializer(item);
  });
}

/** Fulfills ARM Contract requirement to list all available SKUS for a resource. */
export interface SkuResource {
  /** Gets or sets the Sku Capacity. */
  capacity?: SkuCapacity;
  /** The resource type name. */
  readonly resourceType?: string;
  /** Gets or sets the Sku. */
  sku?: SkuSetting;
}

export function skuResourceDeserializer(item: any): SkuResource {
  return {
    capacity: !item["capacity"] ? item["capacity"] : skuCapacityDeserializer(item["capacity"]),
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : skuSettingDeserializer(item["sku"]),
  };
}

/** SKU capacity information */
export interface SkuCapacity {
  /** Gets or sets the default capacity. */
  default?: number;
  /** Gets or sets the maximum. */
  maximum?: number;
  /** Gets or sets the minimum. */
  minimum?: number;
  /** Node scaling setting for the compute sku. */
  scaleType?: SkuScaleType;
}

export function skuCapacityDeserializer(item: any): SkuCapacity {
  return {
    default: item["default"],
    maximum: item["maximum"],
    minimum: item["minimum"],
    scaleType: item["scaleType"],
  };
}

/** Node scaling setting for the compute sku. */
export enum KnownSkuScaleType {
  /** Automatically scales node count. */
  Automatic = "Automatic",
  /** Node count scaled upon user request. */
  Manual = "Manual",
  /** Fixed set of nodes. */
  None = "None",
}

/**
 * Node scaling setting for the compute sku. \
 * {@link KnownSkuScaleType} can be used interchangeably with SkuScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatically scales node count. \
 * **Manual**: Node count scaled upon user request. \
 * **None**: Fixed set of nodes.
 */
export type SkuScaleType = string;

/** SkuSetting fulfills the need for stripped down SKU info in ARM contract. */
export interface SkuSetting {
  /** [Required] The name of the SKU. Ex - P3. It is typically a letter+number code. */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
}

export function skuSettingDeserializer(item: any): SkuSetting {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Azure Resource Manager resource envelope. */
export interface Schedule extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: ScheduleProperties;
}

export function scheduleSerializer(item: Schedule): any {
  return { properties: schedulePropertiesSerializer(item["properties"]) };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: schedulePropertiesDeserializer(item["properties"]),
  };
}

/** Base definition of a schedule */
export interface ScheduleProperties extends ResourceBase {
  /** [Required] Specifies the action of the schedule */
  action: ScheduleActionBaseUnion;
  /** Display name of schedule. */
  displayName?: string;
  /** Is the schedule enabled? */
  isEnabled?: boolean;
  /** Provisioning state for the schedule. */
  readonly provisioningState?: ScheduleProvisioningStatus;
  /** [Required] Specifies the trigger details */
  trigger: TriggerBaseUnion;
}

export function schedulePropertiesSerializer(item: ScheduleProperties): any {
  return {
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    action: scheduleActionBaseUnionSerializer(item["action"]),
    displayName: item["displayName"],
    isEnabled: item["isEnabled"],
    trigger: triggerBaseUnionSerializer(item["trigger"]),
  };
}

export function schedulePropertiesDeserializer(item: any): ScheduleProperties {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    action: scheduleActionBaseUnionDeserializer(item["action"]),
    displayName: item["displayName"],
    isEnabled: item["isEnabled"],
    provisioningState: item["provisioningState"],
    trigger: triggerBaseUnionDeserializer(item["trigger"]),
  };
}

/** model interface ScheduleActionBase */
export interface ScheduleActionBase {
  /** [Required] Specifies the action type of the schedule */
  /** The discriminator possible values: CreateMonitor, InvokeBatchEndpoint, CreateJob */
  actionType: ScheduleActionType;
}

export function scheduleActionBaseSerializer(item: ScheduleActionBase): any {
  return { actionType: item["actionType"] };
}

export function scheduleActionBaseDeserializer(item: any): ScheduleActionBase {
  return {
    actionType: item["actionType"],
  };
}

/** Alias for ScheduleActionBaseUnion */
export type ScheduleActionBaseUnion =
  | CreateMonitorAction
  | EndpointScheduleAction
  | JobScheduleAction
  | ScheduleActionBase;

export function scheduleActionBaseUnionSerializer(item: ScheduleActionBaseUnion): any {
  switch (item.actionType) {
    case "CreateMonitor":
      return createMonitorActionSerializer(item as CreateMonitorAction);

    case "InvokeBatchEndpoint":
      return endpointScheduleActionSerializer(item as EndpointScheduleAction);

    case "CreateJob":
      return jobScheduleActionSerializer(item as JobScheduleAction);

    default:
      return scheduleActionBaseSerializer(item);
  }
}

export function scheduleActionBaseUnionDeserializer(item: any): ScheduleActionBaseUnion {
  switch (item["actionType"]) {
    case "CreateMonitor":
      return createMonitorActionDeserializer(item as CreateMonitorAction);

    case "InvokeBatchEndpoint":
      return endpointScheduleActionDeserializer(item as EndpointScheduleAction);

    case "CreateJob":
      return jobScheduleActionDeserializer(item as JobScheduleAction);

    default:
      return scheduleActionBaseDeserializer(item);
  }
}

/** Known values of {@link ScheduleActionType} that the service accepts. */
export enum KnownScheduleActionType {
  /** CreateJob */
  CreateJob = "CreateJob",
  /** InvokeBatchEndpoint */
  InvokeBatchEndpoint = "InvokeBatchEndpoint",
  /** CreateMonitor */
  CreateMonitor = "CreateMonitor",
}

/** Type of ScheduleActionType */
export type ScheduleActionType = string;

/** model interface CreateMonitorAction */
export interface CreateMonitorAction extends ScheduleActionBase {
  /** [Required] Defines the monitor. */
  monitorDefinition: MonitorDefinition;
  /** [Required] Specifies the action type of the schedule */
  actionType: "CreateMonitor";
}

export function createMonitorActionSerializer(item: CreateMonitorAction): any {
  return {
    actionType: item["actionType"],
    monitorDefinition: monitorDefinitionSerializer(item["monitorDefinition"]),
  };
}

export function createMonitorActionDeserializer(item: any): CreateMonitorAction {
  return {
    actionType: item["actionType"],
    monitorDefinition: monitorDefinitionDeserializer(item["monitorDefinition"]),
  };
}

/** model interface MonitorDefinition */
export interface MonitorDefinition {
  /** The monitor's notification settings. */
  alertNotificationSettings?: MonitorNotificationSettings;
  /** [Required] The ARM resource ID of the compute resource to run the monitoring job on. */
  computeConfiguration: MonitorComputeConfigurationBaseUnion;
  /** The entities targeted by the monitor. */
  monitoringTarget?: MonitoringTarget;
  /** [Required] The signals to monitor. */
  signals: Record<string, MonitoringSignalBaseUnion | null>;
}

export function monitorDefinitionSerializer(item: MonitorDefinition): any {
  return {
    alertNotificationSettings: !item["alertNotificationSettings"]
      ? item["alertNotificationSettings"]
      : monitorNotificationSettingsSerializer(item["alertNotificationSettings"]),
    computeConfiguration: monitorComputeConfigurationBaseUnionSerializer(
      item["computeConfiguration"],
    ),
    monitoringTarget: !item["monitoringTarget"]
      ? item["monitoringTarget"]
      : monitoringTargetSerializer(item["monitoringTarget"]),
    signals: item["signals"],
  };
}

export function monitorDefinitionDeserializer(item: any): MonitorDefinition {
  return {
    alertNotificationSettings: !item["alertNotificationSettings"]
      ? item["alertNotificationSettings"]
      : monitorNotificationSettingsDeserializer(item["alertNotificationSettings"]),
    computeConfiguration: monitorComputeConfigurationBaseUnionDeserializer(
      item["computeConfiguration"],
    ),
    monitoringTarget: !item["monitoringTarget"]
      ? item["monitoringTarget"]
      : monitoringTargetDeserializer(item["monitoringTarget"]),
    signals: Object.fromEntries(
      Object.entries(item["signals"]).map(([k, p]: [string, any]) => [
        k,
        !p ? p : monitoringSignalBaseUnionDeserializer(p),
      ]),
    ),
  };
}

/** model interface MonitorNotificationSettings */
export interface MonitorNotificationSettings {
  /** The AML notification email settings. */
  emailNotificationSettings?: MonitorEmailNotificationSettings;
}

export function monitorNotificationSettingsSerializer(item: MonitorNotificationSettings): any {
  return {
    emailNotificationSettings: !item["emailNotificationSettings"]
      ? item["emailNotificationSettings"]
      : monitorEmailNotificationSettingsSerializer(item["emailNotificationSettings"]),
  };
}

export function monitorNotificationSettingsDeserializer(item: any): MonitorNotificationSettings {
  return {
    emailNotificationSettings: !item["emailNotificationSettings"]
      ? item["emailNotificationSettings"]
      : monitorEmailNotificationSettingsDeserializer(item["emailNotificationSettings"]),
  };
}

/** model interface MonitorEmailNotificationSettings */
export interface MonitorEmailNotificationSettings {
  /** The email recipient list which has a limitation of 499 characters in total. */
  emails?: string[];
}

export function monitorEmailNotificationSettingsSerializer(
  item: MonitorEmailNotificationSettings,
): any {
  return {
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
  };
}

export function monitorEmailNotificationSettingsDeserializer(
  item: any,
): MonitorEmailNotificationSettings {
  return {
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Monitor compute configuration base definition. */
export interface MonitorComputeConfigurationBase {
  /** [Required] Specifies the type of signal to monitor. */
  /** The discriminator possible values: ServerlessSpark */
  computeType: MonitorComputeType;
}

export function monitorComputeConfigurationBaseSerializer(
  item: MonitorComputeConfigurationBase,
): any {
  return { computeType: item["computeType"] };
}

export function monitorComputeConfigurationBaseDeserializer(
  item: any,
): MonitorComputeConfigurationBase {
  return {
    computeType: item["computeType"],
  };
}

/** Alias for MonitorComputeConfigurationBaseUnion */
export type MonitorComputeConfigurationBaseUnion =
  | MonitorServerlessSparkCompute
  | MonitorComputeConfigurationBase;

export function monitorComputeConfigurationBaseUnionSerializer(
  item: MonitorComputeConfigurationBaseUnion,
): any {
  switch (item.computeType) {
    case "ServerlessSpark":
      return monitorServerlessSparkComputeSerializer(item as MonitorServerlessSparkCompute);

    default:
      return monitorComputeConfigurationBaseSerializer(item);
  }
}

export function monitorComputeConfigurationBaseUnionDeserializer(
  item: any,
): MonitorComputeConfigurationBaseUnion {
  switch (item["computeType"]) {
    case "ServerlessSpark":
      return monitorServerlessSparkComputeDeserializer(item as MonitorServerlessSparkCompute);

    default:
      return monitorComputeConfigurationBaseDeserializer(item);
  }
}

/** Monitor compute type enum. */
export enum KnownMonitorComputeType {
  /** Serverless Spark compute. */
  ServerlessSpark = "ServerlessSpark",
}

/**
 * Monitor compute type enum. \
 * {@link KnownMonitorComputeType} can be used interchangeably with MonitorComputeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerlessSpark**: Serverless Spark compute.
 */
export type MonitorComputeType = string;

/** Monitor serverless spark compute definition. */
export interface MonitorServerlessSparkCompute extends MonitorComputeConfigurationBase {
  /** [Required] The identity scheme leveraged to by the spark jobs running on serverless Spark. */
  computeIdentity: MonitorComputeIdentityBaseUnion;
  /** [Required] The instance type running the Spark job. */
  instanceType: string;
  /** [Required] The Spark runtime version. */
  runtimeVersion: string;
  /** [Required] Specifies the type of signal to monitor. */
  computeType: "ServerlessSpark";
}

export function monitorServerlessSparkComputeSerializer(item: MonitorServerlessSparkCompute): any {
  return {
    computeType: item["computeType"],
    computeIdentity: monitorComputeIdentityBaseUnionSerializer(item["computeIdentity"]),
    instanceType: item["instanceType"],
    runtimeVersion: item["runtimeVersion"],
  };
}

export function monitorServerlessSparkComputeDeserializer(
  item: any,
): MonitorServerlessSparkCompute {
  return {
    computeType: item["computeType"],
    computeIdentity: monitorComputeIdentityBaseUnionDeserializer(item["computeIdentity"]),
    instanceType: item["instanceType"],
    runtimeVersion: item["runtimeVersion"],
  };
}

/** Monitor compute identity base definition. */
export interface MonitorComputeIdentityBase {
  /** [Required] Specifies the type of identity to use within the monitoring jobs. */
  /** The discriminator possible values: AmlToken, ManagedIdentity */
  computeIdentityType: MonitorComputeIdentityType;
}

export function monitorComputeIdentityBaseSerializer(item: MonitorComputeIdentityBase): any {
  return { computeIdentityType: item["computeIdentityType"] };
}

export function monitorComputeIdentityBaseDeserializer(item: any): MonitorComputeIdentityBase {
  return {
    computeIdentityType: item["computeIdentityType"],
  };
}

/** Alias for MonitorComputeIdentityBaseUnion */
export type MonitorComputeIdentityBaseUnion =
  | AmlTokenComputeIdentity
  | ManagedComputeIdentity
  | MonitorComputeIdentityBase;

export function monitorComputeIdentityBaseUnionSerializer(
  item: MonitorComputeIdentityBaseUnion,
): any {
  switch (item.computeIdentityType) {
    case "AmlToken":
      return amlTokenComputeIdentitySerializer(item as AmlTokenComputeIdentity);

    case "ManagedIdentity":
      return managedComputeIdentitySerializer(item as ManagedComputeIdentity);

    default:
      return monitorComputeIdentityBaseSerializer(item);
  }
}

export function monitorComputeIdentityBaseUnionDeserializer(
  item: any,
): MonitorComputeIdentityBaseUnion {
  switch (item["computeIdentityType"]) {
    case "AmlToken":
      return amlTokenComputeIdentityDeserializer(item as AmlTokenComputeIdentity);

    case "ManagedIdentity":
      return managedComputeIdentityDeserializer(item as ManagedComputeIdentity);

    default:
      return monitorComputeIdentityBaseDeserializer(item);
  }
}

/** Monitor compute identity type enum. */
export enum KnownMonitorComputeIdentityType {
  /** Authenticates through user's AML token. */
  AmlToken = "AmlToken",
  /** Authenticates through a user-provided managed identity. */
  ManagedIdentity = "ManagedIdentity",
}

/**
 * Monitor compute identity type enum. \
 * {@link KnownMonitorComputeIdentityType} can be used interchangeably with MonitorComputeIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AmlToken**: Authenticates through user's AML token. \
 * **ManagedIdentity**: Authenticates through a user-provided managed identity.
 */
export type MonitorComputeIdentityType = string;

/** AML token compute identity definition. */
export interface AmlTokenComputeIdentity extends MonitorComputeIdentityBase {
  /** [Required] Specifies the type of identity to use within the monitoring jobs. */
  computeIdentityType: "AmlToken";
}

export function amlTokenComputeIdentitySerializer(item: AmlTokenComputeIdentity): any {
  return { computeIdentityType: item["computeIdentityType"] };
}

export function amlTokenComputeIdentityDeserializer(item: any): AmlTokenComputeIdentity {
  return {
    computeIdentityType: item["computeIdentityType"],
  };
}

/** Managed compute identity definition. */
export interface ManagedComputeIdentity extends MonitorComputeIdentityBase {
  /** The identity which will be leveraged by the monitoring jobs. */
  identity?: ManagedServiceIdentity;
  /** [Required] Specifies the type of identity to use within the monitoring jobs. */
  computeIdentityType: "ManagedIdentity";
}

export function managedComputeIdentitySerializer(item: ManagedComputeIdentity): any {
  return {
    computeIdentityType: item["computeIdentityType"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function managedComputeIdentityDeserializer(item: any): ManagedComputeIdentity {
  return {
    computeIdentityType: item["computeIdentityType"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Monitoring target definition. */
export interface MonitoringTarget {
  /** Reference to the deployment asset targeted by this monitor. */
  deploymentId?: string;
  /** Reference to the model asset targeted by this monitor. */
  modelId?: string;
  /** [Required] The machine learning task type of the monitored model. */
  taskType: ModelTaskType;
}

export function monitoringTargetSerializer(item: MonitoringTarget): any {
  return {
    deploymentId: item["deploymentId"],
    modelId: item["modelId"],
    taskType: item["taskType"],
  };
}

export function monitoringTargetDeserializer(item: any): MonitoringTarget {
  return {
    deploymentId: item["deploymentId"],
    modelId: item["modelId"],
    taskType: item["taskType"],
  };
}

/** Model task type enum. */
export enum KnownModelTaskType {
  /** Classification */
  Classification = "Classification",
  /** Regression */
  Regression = "Regression",
}

/**
 * Model task type enum. \
 * {@link KnownModelTaskType} can be used interchangeably with ModelTaskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Classification** \
 * **Regression**
 */
export type ModelTaskType = string;

/** model interface MonitoringSignalBase */
export interface MonitoringSignalBase {
  /** The current notification mode for this signal. */
  notificationTypes?: MonitoringNotificationType[];
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
  /** [Required] Specifies the type of signal to monitor. */
  /** The discriminator possible values: Custom, DataDrift, DataQuality, FeatureAttributionDrift, PredictionDrift */
  signalType: MonitoringSignalType;
}

export function monitoringSignalBaseSerializer(item: MonitoringSignalBase): any {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p: any) => {
          return p;
        }),
    properties: item["properties"],
    signalType: item["signalType"],
  };
}

export function monitoringSignalBaseDeserializer(item: any): MonitoringSignalBase {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p1: any) => {
          return p1;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    signalType: item["signalType"],
  };
}

/** Alias for MonitoringSignalBaseUnion */
export type MonitoringSignalBaseUnion =
  | CustomMonitoringSignal
  | DataDriftMonitoringSignal
  | DataQualityMonitoringSignal
  | FeatureAttributionDriftMonitoringSignal
  | PredictionDriftMonitoringSignal
  | MonitoringSignalBase;

export function monitoringSignalBaseUnionSerializer(item: MonitoringSignalBaseUnion): any {
  switch (item.signalType) {
    case "Custom":
      return customMonitoringSignalSerializer(item as CustomMonitoringSignal);

    case "DataDrift":
      return dataDriftMonitoringSignalSerializer(item as DataDriftMonitoringSignal);

    case "DataQuality":
      return dataQualityMonitoringSignalSerializer(item as DataQualityMonitoringSignal);

    case "FeatureAttributionDrift":
      return featureAttributionDriftMonitoringSignalSerializer(
        item as FeatureAttributionDriftMonitoringSignal,
      );

    case "PredictionDrift":
      return predictionDriftMonitoringSignalSerializer(item as PredictionDriftMonitoringSignal);

    default:
      return monitoringSignalBaseSerializer(item);
  }
}

export function monitoringSignalBaseUnionDeserializer(item: any): MonitoringSignalBaseUnion {
  switch (item["signalType"]) {
    case "Custom":
      return customMonitoringSignalDeserializer(item as CustomMonitoringSignal);

    case "DataDrift":
      return dataDriftMonitoringSignalDeserializer(item as DataDriftMonitoringSignal);

    case "DataQuality":
      return dataQualityMonitoringSignalDeserializer(item as DataQualityMonitoringSignal);

    case "FeatureAttributionDrift":
      return featureAttributionDriftMonitoringSignalDeserializer(
        item as FeatureAttributionDriftMonitoringSignal,
      );

    case "PredictionDrift":
      return predictionDriftMonitoringSignalDeserializer(item as PredictionDriftMonitoringSignal);

    default:
      return monitoringSignalBaseDeserializer(item);
  }
}

/** Known values of {@link MonitoringNotificationType} that the service accepts. */
export enum KnownMonitoringNotificationType {
  /** Enables email notifications through AML notifications. */
  AmlNotification = "AmlNotification",
}

/** Type of MonitoringNotificationType */
export type MonitoringNotificationType = string;

/** Known values of {@link MonitoringSignalType} that the service accepts. */
export enum KnownMonitoringSignalType {
  /** Tracks model input data distribution change, comparing against training data or past production data. */
  DataDrift = "DataDrift",
  /** Tracks prediction result data distribution change, comparing against validation/test label data or past production data. */
  PredictionDrift = "PredictionDrift",
  /** Tracks model input data integrity. */
  DataQuality = "DataQuality",
  /** Tracks feature importance change in production, comparing against feature importance at training time. */
  FeatureAttributionDrift = "FeatureAttributionDrift",
  /** Tracks a custom signal provided by users. */
  Custom = "Custom",
}

/** Type of MonitoringSignalType */
export type MonitoringSignalType = string;

/** model interface CustomMonitoringSignal */
export interface CustomMonitoringSignal extends MonitoringSignalBase {
  /** [Required] Reference to the component asset used to calculate the custom metrics. */
  componentId: string;
  /** Monitoring assets to take as input. Key is the component input port name, value is the data asset. */
  inputAssets?: Record<string, MonitoringInputDataBaseUnion>;
  /** Extra component parameters to take as input. Key is the component literal input port name, value is the parameter value. */
  inputs?: Record<string, JobInputUnion>;
  /** [Required] A list of metrics to calculate and their associated thresholds. */
  metricThresholds: CustomMetricThreshold[];
  /** [Required] Specifies the type of signal to monitor. */
  signalType: "Custom";
}

export function customMonitoringSignalSerializer(item: CustomMonitoringSignal): any {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p: any) => {
          return p;
        }),
    properties: item["properties"],
    signalType: item["signalType"],
    componentId: item["componentId"],
    inputAssets: item["inputAssets"],
    inputs: item["inputs"],
    metricThresholds: customMetricThresholdArraySerializer(item["metricThresholds"]),
  };
}

export function customMonitoringSignalDeserializer(item: any): CustomMonitoringSignal {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p1: any) => {
          return p1;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    signalType: item["signalType"],
    componentId: item["componentId"],
    inputAssets: !item["inputAssets"]
      ? item["inputAssets"]
      : Object.fromEntries(
          Object.entries(item["inputAssets"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : monitoringInputDataBaseUnionDeserializer(p1),
          ]),
        ),
    inputs: !item["inputs"]
      ? item["inputs"]
      : Object.fromEntries(
          Object.entries(item["inputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobInputUnionDeserializer(p1),
          ]),
        ),
    metricThresholds: customMetricThresholdArrayDeserializer(item["metricThresholds"]),
  };
}

/** Monitoring input data base definition. */
export interface MonitoringInputDataBase {
  /** Mapping of column names to special uses. */
  columns?: Record<string, string>;
  /** The context metadata of the data source. */
  dataContext?: string;
  /** [Required] Specifies the type of signal to monitor. */
  /** The discriminator possible values: Fixed, Rolling, Static */
  inputDataType: MonitoringInputDataType;
  /** [Required] Specifies the type of job. */
  jobInputType: JobInputType;
  /** [Required] Input Asset URI. */
  uri: string;
}

export function monitoringInputDataBaseSerializer(item: MonitoringInputDataBase): any {
  return {
    columns: item["columns"],
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
  };
}

export function monitoringInputDataBaseDeserializer(item: any): MonitoringInputDataBase {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : Object.fromEntries(
          Object.entries(item["columns"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
  };
}

/** Alias for MonitoringInputDataBaseUnion */
export type MonitoringInputDataBaseUnion =
  | FixedInputData
  | RollingInputData
  | StaticInputData
  | MonitoringInputDataBase;

export function monitoringInputDataBaseUnionSerializer(item: MonitoringInputDataBaseUnion): any {
  switch (item.inputDataType) {
    case "Fixed":
      return fixedInputDataSerializer(item as FixedInputData);

    case "Rolling":
      return rollingInputDataSerializer(item as RollingInputData);

    case "Static":
      return staticInputDataSerializer(item as StaticInputData);

    default:
      return monitoringInputDataBaseSerializer(item);
  }
}

export function monitoringInputDataBaseUnionDeserializer(item: any): MonitoringInputDataBaseUnion {
  switch (item["inputDataType"]) {
    case "Fixed":
      return fixedInputDataDeserializer(item as FixedInputData);

    case "Rolling":
      return rollingInputDataDeserializer(item as RollingInputData);

    case "Static":
      return staticInputDataDeserializer(item as StaticInputData);

    default:
      return monitoringInputDataBaseDeserializer(item);
  }
}

/** Monitoring input data type enum. */
export enum KnownMonitoringInputDataType {
  /** An input data with a fixed window size. */
  Static = "Static",
  /** An input data which rolls relatively to the monitor's current run time. */
  Rolling = "Rolling",
  /** An input data with tabular format which doesn't require preprocessing. */
  Fixed = "Fixed",
}

/**
 * Monitoring input data type enum. \
 * {@link KnownMonitoringInputDataType} can be used interchangeably with MonitoringInputDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static**: An input data with a fixed window size. \
 * **Rolling**: An input data which rolls relatively to the monitor's current run time. \
 * **Fixed**: An input data with tabular format which doesn't require preprocessing.
 */
export type MonitoringInputDataType = string;

/** Enum to determine the Job Input Type. */
export enum KnownJobInputType {
  /** literal */
  Literal = "literal",
  /** uri_file */
  UriFile = "uri_file",
  /** uri_folder */
  UriFolder = "uri_folder",
  /** mltable */
  Mltable = "mltable",
  /** custom_model */
  CustomModel = "custom_model",
  /** mlflow_model */
  MlflowModel = "mlflow_model",
  /** triton_model */
  TritonModel = "triton_model",
}

/**
 * Enum to determine the Job Input Type. \
 * {@link KnownJobInputType} can be used interchangeably with JobInputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **literal** \
 * **uri_file** \
 * **uri_folder** \
 * **mltable** \
 * **custom_model** \
 * **mlflow_model** \
 * **triton_model**
 */
export type JobInputType = string;

/** Fixed input data definition. */
export interface FixedInputData extends MonitoringInputDataBase {
  /** [Required] Specifies the type of signal to monitor. */
  inputDataType: "Fixed";
}

export function fixedInputDataSerializer(item: FixedInputData): any {
  return {
    columns: item["columns"],
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
  };
}

export function fixedInputDataDeserializer(item: any): FixedInputData {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : Object.fromEntries(
          Object.entries(item["columns"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
  };
}

/** Rolling input data definition. */
export interface RollingInputData extends MonitoringInputDataBase {
  /** Reference to the component asset used to preprocess the data. */
  preprocessingComponentId?: string;
  /** [Required] The time offset between the end of the data window and the monitor's current run time. */
  windowOffset: string;
  /** [Required] The size of the rolling data window. */
  windowSize: string;
  /** [Required] Specifies the type of signal to monitor. */
  inputDataType: "Rolling";
}

export function rollingInputDataSerializer(item: RollingInputData): any {
  return {
    columns: item["columns"],
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
    preprocessingComponentId: item["preprocessingComponentId"],
    windowOffset: item["windowOffset"],
    windowSize: item["windowSize"],
  };
}

export function rollingInputDataDeserializer(item: any): RollingInputData {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : Object.fromEntries(
          Object.entries(item["columns"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
    preprocessingComponentId: item["preprocessingComponentId"],
    windowOffset: item["windowOffset"],
    windowSize: item["windowSize"],
  };
}

/** Static input data definition. */
export interface StaticInputData extends MonitoringInputDataBase {
  /** Reference to the component asset used to preprocess the data. */
  preprocessingComponentId?: string;
  /** [Required] The end date of the data window. */
  windowEnd: Date;
  /** [Required] The start date of the data window. */
  windowStart: Date;
  /** [Required] Specifies the type of signal to monitor. */
  inputDataType: "Static";
}

export function staticInputDataSerializer(item: StaticInputData): any {
  return {
    columns: item["columns"],
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
    preprocessingComponentId: item["preprocessingComponentId"],
    windowEnd: item["windowEnd"].toISOString(),
    windowStart: item["windowStart"].toISOString(),
  };
}

export function staticInputDataDeserializer(item: any): StaticInputData {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : Object.fromEntries(
          Object.entries(item["columns"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dataContext: item["dataContext"],
    inputDataType: item["inputDataType"],
    jobInputType: item["jobInputType"],
    uri: item["uri"],
    preprocessingComponentId: item["preprocessingComponentId"],
    windowEnd: new Date(item["windowEnd"]),
    windowStart: new Date(item["windowStart"]),
  };
}

/** Command job definition. */
export interface JobInput {
  /** Description for the input. */
  description?: string;
  /** [Required] Specifies the type of job. */
  /** The discriminator possible values: mltable, custom_model, mlflow_model, literal, triton_model, uri_file, uri_folder */
  jobInputType: JobInputType;
}

export function jobInputSerializer(item: JobInput): any {
  return { description: item["description"], jobInputType: item["jobInputType"] };
}

export function jobInputDeserializer(item: any): JobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
  };
}

/** Alias for JobInputUnion */
export type JobInputUnion =
  | MLTableJobInput
  | CustomModelJobInput
  | MLFlowModelJobInput
  | LiteralJobInput
  | TritonModelJobInput
  | UriFileJobInput
  | UriFolderJobInput
  | JobInput;

export function jobInputUnionSerializer(item: JobInputUnion): any {
  switch (item.jobInputType) {
    case "mltable":
      return mlTableJobInputSerializer(item as MLTableJobInput);

    case "custom_model":
      return customModelJobInputSerializer(item as CustomModelJobInput);

    case "mlflow_model":
      return mlFlowModelJobInputSerializer(item as MLFlowModelJobInput);

    case "literal":
      return literalJobInputSerializer(item as LiteralJobInput);

    case "triton_model":
      return tritonModelJobInputSerializer(item as TritonModelJobInput);

    case "uri_file":
      return uriFileJobInputSerializer(item as UriFileJobInput);

    case "uri_folder":
      return uriFolderJobInputSerializer(item as UriFolderJobInput);

    default:
      return jobInputSerializer(item);
  }
}

export function jobInputUnionDeserializer(item: any): JobInputUnion {
  switch (item["jobInputType"]) {
    case "mltable":
      return mlTableJobInputDeserializer(item as MLTableJobInput);

    case "custom_model":
      return customModelJobInputDeserializer(item as CustomModelJobInput);

    case "mlflow_model":
      return mlFlowModelJobInputDeserializer(item as MLFlowModelJobInput);

    case "literal":
      return literalJobInputDeserializer(item as LiteralJobInput);

    case "triton_model":
      return tritonModelJobInputDeserializer(item as TritonModelJobInput);

    case "uri_file":
      return uriFileJobInputDeserializer(item as UriFileJobInput);

    case "uri_folder":
      return uriFolderJobInputDeserializer(item as UriFolderJobInput);

    default:
      return jobInputDeserializer(item);
  }
}

/** model interface MLTableJobInput */
export interface MLTableJobInput extends JobInput {
  /** Enum to determine the input data delivery mode. */
  mode?: InputDeliveryMode;
  /** [Required] Input Asset URI. */
  uri: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "mltable";
}

export function mlTableJobInputSerializer(item: MLTableJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function mlTableJobInputDeserializer(item: any): MLTableJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** Enum to determine the input data delivery mode. */
export enum KnownInputDeliveryMode {
  /** ReadOnlyMount */
  ReadOnlyMount = "ReadOnlyMount",
  /** ReadWriteMount */
  ReadWriteMount = "ReadWriteMount",
  /** Download */
  Download = "Download",
  /** Direct */
  Direct = "Direct",
  /** EvalMount */
  EvalMount = "EvalMount",
  /** EvalDownload */
  EvalDownload = "EvalDownload",
}

/**
 * Enum to determine the input data delivery mode. \
 * {@link KnownInputDeliveryMode} can be used interchangeably with InputDeliveryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadOnlyMount** \
 * **ReadWriteMount** \
 * **Download** \
 * **Direct** \
 * **EvalMount** \
 * **EvalDownload**
 */
export type InputDeliveryMode = string;

/** model interface CustomModelJobInput */
export interface CustomModelJobInput extends JobInput {
  /** Enum to determine the input data delivery mode. */
  mode?: InputDeliveryMode;
  /** [Required] Input Asset URI. */
  uri: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "custom_model";
}

export function customModelJobInputSerializer(item: CustomModelJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function customModelJobInputDeserializer(item: any): CustomModelJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface MLFlowModelJobInput */
export interface MLFlowModelJobInput extends JobInput {
  /** Enum to determine the input data delivery mode. */
  mode?: InputDeliveryMode;
  /** [Required] Input Asset URI. */
  uri: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "mlflow_model";
}

export function mlFlowModelJobInputSerializer(item: MLFlowModelJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function mlFlowModelJobInputDeserializer(item: any): MLFlowModelJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** Literal input type. */
export interface LiteralJobInput extends JobInput {
  /** [Required] Literal value for the input. */
  value: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "literal";
}

export function literalJobInputSerializer(item: LiteralJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    value: item["value"],
  };
}

export function literalJobInputDeserializer(item: any): LiteralJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    value: item["value"],
  };
}

/** model interface TritonModelJobInput */
export interface TritonModelJobInput extends JobInput {
  /** Enum to determine the input data delivery mode. */
  mode?: InputDeliveryMode;
  /** [Required] Input Asset URI. */
  uri: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "triton_model";
}

export function tritonModelJobInputSerializer(item: TritonModelJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function tritonModelJobInputDeserializer(item: any): TritonModelJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface UriFileJobInput */
export interface UriFileJobInput extends JobInput {
  /** Enum to determine the input data delivery mode. */
  mode?: InputDeliveryMode;
  /** [Required] Input Asset URI. */
  uri: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "uri_file";
}

export function uriFileJobInputSerializer(item: UriFileJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function uriFileJobInputDeserializer(item: any): UriFileJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface UriFolderJobInput */
export interface UriFolderJobInput extends JobInput {
  /** Enum to determine the input data delivery mode. */
  mode?: InputDeliveryMode;
  /** [Required] Input Asset URI. */
  uri: string;
  /** [Required] Specifies the type of job. */
  jobInputType: "uri_folder";
}

export function uriFolderJobInputSerializer(item: UriFolderJobInput): any {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function uriFolderJobInputDeserializer(item: any): UriFolderJobInput {
  return {
    description: item["description"],
    jobInputType: item["jobInputType"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function customMetricThresholdArraySerializer(result: Array<CustomMetricThreshold>): any[] {
  return result.map((item) => {
    return customMetricThresholdSerializer(item);
  });
}

export function customMetricThresholdArrayDeserializer(
  result: Array<CustomMetricThreshold>,
): any[] {
  return result.map((item) => {
    return customMetricThresholdDeserializer(item);
  });
}

/** model interface CustomMetricThreshold */
export interface CustomMetricThreshold {
  /** [Required] The user-defined metric to calculate. */
  metric: string;
  /** The threshold value. If null, a default value will be set depending on the selected metric. */
  threshold?: MonitoringThreshold;
}

export function customMetricThresholdSerializer(item: CustomMetricThreshold): any {
  return {
    metric: item["metric"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
  };
}

export function customMetricThresholdDeserializer(item: any): CustomMetricThreshold {
  return {
    metric: item["metric"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
  };
}

/** model interface MonitoringThreshold */
export interface MonitoringThreshold {
  /** The threshold value. If null, the set default is dependent on the metric type. */
  value?: number;
}

export function monitoringThresholdSerializer(item: MonitoringThreshold): any {
  return { value: item["value"] };
}

export function monitoringThresholdDeserializer(item: any): MonitoringThreshold {
  return {
    value: item["value"],
  };
}

/** model interface DataDriftMonitoringSignal */
export interface DataDriftMonitoringSignal extends MonitoringSignalBase {
  /** A dictionary that maps feature names to their respective data types. */
  featureDataTypeOverride?: Record<string, MonitoringFeatureDataType>;
  /** The settings for computing feature importance. */
  featureImportanceSettings?: FeatureImportanceSettings;
  /** The feature filter which identifies which feature to calculate drift over. */
  features?: MonitoringFeatureFilterBaseUnion;
  /** [Required] A list of metrics to calculate and their associated thresholds. */
  metricThresholds: DataDriftMetricThresholdBaseUnion[];
  /** [Required] The data which drift will be calculated for. */
  productionData: MonitoringInputDataBaseUnion;
  /** [Required] The data to calculate drift against. */
  referenceData: MonitoringInputDataBaseUnion;
  /** [Required] Specifies the type of signal to monitor. */
  signalType: "DataDrift";
}

export function dataDriftMonitoringSignalSerializer(item: DataDriftMonitoringSignal): any {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p: any) => {
          return p;
        }),
    properties: item["properties"],
    signalType: item["signalType"],
    featureDataTypeOverride: item["featureDataTypeOverride"],
    featureImportanceSettings: !item["featureImportanceSettings"]
      ? item["featureImportanceSettings"]
      : featureImportanceSettingsSerializer(item["featureImportanceSettings"]),
    features: !item["features"]
      ? item["features"]
      : monitoringFeatureFilterBaseUnionSerializer(item["features"]),
    metricThresholds: dataDriftMetricThresholdBaseUnionArraySerializer(item["metricThresholds"]),
    productionData: monitoringInputDataBaseUnionSerializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionSerializer(item["referenceData"]),
  };
}

export function dataDriftMonitoringSignalDeserializer(item: any): DataDriftMonitoringSignal {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p1: any) => {
          return p1;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    signalType: item["signalType"],
    featureDataTypeOverride: !item["featureDataTypeOverride"]
      ? item["featureDataTypeOverride"]
      : Object.fromEntries(
          Object.entries(item["featureDataTypeOverride"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    featureImportanceSettings: !item["featureImportanceSettings"]
      ? item["featureImportanceSettings"]
      : featureImportanceSettingsDeserializer(item["featureImportanceSettings"]),
    features: !item["features"]
      ? item["features"]
      : monitoringFeatureFilterBaseUnionDeserializer(item["features"]),
    metricThresholds: dataDriftMetricThresholdBaseUnionArrayDeserializer(item["metricThresholds"]),
    productionData: monitoringInputDataBaseUnionDeserializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionDeserializer(item["referenceData"]),
  };
}

/** Known values of {@link MonitoringFeatureDataType} that the service accepts. */
export enum KnownMonitoringFeatureDataType {
  /** Used for features of numerical data type. */
  Numerical = "Numerical",
  /** Used for features of categorical data type. */
  Categorical = "Categorical",
}

/** Type of MonitoringFeatureDataType */
export type MonitoringFeatureDataType = string;

/** model interface FeatureImportanceSettings */
export interface FeatureImportanceSettings {
  /** The mode of operation for computing feature importance. */
  mode?: FeatureImportanceMode;
  /** The name of the target column within the input data asset. */
  targetColumn?: string;
}

export function featureImportanceSettingsSerializer(item: FeatureImportanceSettings): any {
  return { mode: item["mode"], targetColumn: item["targetColumn"] };
}

export function featureImportanceSettingsDeserializer(item: any): FeatureImportanceSettings {
  return {
    mode: item["mode"],
    targetColumn: item["targetColumn"],
  };
}

/** The mode of operation for computing feature importance. */
export enum KnownFeatureImportanceMode {
  /** Disables computing feature importance within a signal. */
  Disabled = "Disabled",
  /** Enables computing feature importance within a signal. */
  Enabled = "Enabled",
}

/**
 * The mode of operation for computing feature importance. \
 * {@link KnownFeatureImportanceMode} can be used interchangeably with FeatureImportanceMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disables computing feature importance within a signal. \
 * **Enabled**: Enables computing feature importance within a signal.
 */
export type FeatureImportanceMode = string;

/** model interface MonitoringFeatureFilterBase */
export interface MonitoringFeatureFilterBase {
  /** [Required] Specifies the feature filter to leverage when selecting features to calculate metrics over. */
  /** The discriminator possible values: AllFeatures, FeatureSubset, TopNByAttribution */
  filterType: MonitoringFeatureFilterType;
}

export function monitoringFeatureFilterBaseSerializer(item: MonitoringFeatureFilterBase): any {
  return { filterType: item["filterType"] };
}

export function monitoringFeatureFilterBaseDeserializer(item: any): MonitoringFeatureFilterBase {
  return {
    filterType: item["filterType"],
  };
}

/** Alias for MonitoringFeatureFilterBaseUnion */
export type MonitoringFeatureFilterBaseUnion =
  | AllFeatures
  | FeatureSubset
  | TopNFeaturesByAttribution
  | MonitoringFeatureFilterBase;

export function monitoringFeatureFilterBaseUnionSerializer(
  item: MonitoringFeatureFilterBaseUnion,
): any {
  switch (item.filterType) {
    case "AllFeatures":
      return allFeaturesSerializer(item as AllFeatures);

    case "FeatureSubset":
      return featureSubsetSerializer(item as FeatureSubset);

    case "TopNByAttribution":
      return topNFeaturesByAttributionSerializer(item as TopNFeaturesByAttribution);

    default:
      return monitoringFeatureFilterBaseSerializer(item);
  }
}

export function monitoringFeatureFilterBaseUnionDeserializer(
  item: any,
): MonitoringFeatureFilterBaseUnion {
  switch (item["filterType"]) {
    case "AllFeatures":
      return allFeaturesDeserializer(item as AllFeatures);

    case "FeatureSubset":
      return featureSubsetDeserializer(item as FeatureSubset);

    case "TopNByAttribution":
      return topNFeaturesByAttributionDeserializer(item as TopNFeaturesByAttribution);

    default:
      return monitoringFeatureFilterBaseDeserializer(item);
  }
}

/** Known values of {@link MonitoringFeatureFilterType} that the service accepts. */
export enum KnownMonitoringFeatureFilterType {
  /** Includes all features. */
  AllFeatures = "AllFeatures",
  /** Only includes the top contributing features, measured by feature attribution. */
  TopNByAttribution = "TopNByAttribution",
  /** Includes a user-defined subset of features. */
  FeatureSubset = "FeatureSubset",
}

/** Type of MonitoringFeatureFilterType */
export type MonitoringFeatureFilterType = string;

/** model interface AllFeatures */
export interface AllFeatures extends MonitoringFeatureFilterBase {
  /** [Required] Specifies the feature filter to leverage when selecting features to calculate metrics over. */
  filterType: "AllFeatures";
}

export function allFeaturesSerializer(item: AllFeatures): any {
  return { filterType: item["filterType"] };
}

export function allFeaturesDeserializer(item: any): AllFeatures {
  return {
    filterType: item["filterType"],
  };
}

/** model interface FeatureSubset */
export interface FeatureSubset extends MonitoringFeatureFilterBase {
  /** [Required] The list of features to include. */
  features: string[];
  /** [Required] Specifies the feature filter to leverage when selecting features to calculate metrics over. */
  filterType: "FeatureSubset";
}

export function featureSubsetSerializer(item: FeatureSubset): any {
  return {
    filterType: item["filterType"],
    features: item["features"].map((p: any) => {
      return p;
    }),
  };
}

export function featureSubsetDeserializer(item: any): FeatureSubset {
  return {
    filterType: item["filterType"],
    features: item["features"].map((p: any) => {
      return p;
    }),
  };
}

/** model interface TopNFeaturesByAttribution */
export interface TopNFeaturesByAttribution extends MonitoringFeatureFilterBase {
  /** The number of top features to include. */
  top?: number;
  /** [Required] Specifies the feature filter to leverage when selecting features to calculate metrics over. */
  filterType: "TopNByAttribution";
}

export function topNFeaturesByAttributionSerializer(item: TopNFeaturesByAttribution): any {
  return { filterType: item["filterType"], top: item["top"] };
}

export function topNFeaturesByAttributionDeserializer(item: any): TopNFeaturesByAttribution {
  return {
    filterType: item["filterType"],
    top: item["top"],
  };
}

export function dataDriftMetricThresholdBaseUnionArraySerializer(
  result: Array<DataDriftMetricThresholdBaseUnion>,
): any[] {
  return result.map((item) => {
    return dataDriftMetricThresholdBaseUnionSerializer(item);
  });
}

export function dataDriftMetricThresholdBaseUnionArrayDeserializer(
  result: Array<DataDriftMetricThresholdBaseUnion>,
): any[] {
  return result.map((item) => {
    return dataDriftMetricThresholdBaseUnionDeserializer(item);
  });
}

/** model interface DataDriftMetricThresholdBase */
export interface DataDriftMetricThresholdBase {
  /** [Required] Specifies the data type of the metric threshold. */
  /** The discriminator possible values: Categorical, Numerical */
  dataType: MonitoringFeatureDataType;
  /** The threshold value. If null, a default value will be set depending on the selected metric. */
  threshold?: MonitoringThreshold;
}

export function dataDriftMetricThresholdBaseSerializer(item: DataDriftMetricThresholdBase): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
  };
}

export function dataDriftMetricThresholdBaseDeserializer(item: any): DataDriftMetricThresholdBase {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
  };
}

/** Alias for DataDriftMetricThresholdBaseUnion */
export type DataDriftMetricThresholdBaseUnion =
  | CategoricalDataDriftMetricThreshold
  | NumericalDataDriftMetricThreshold
  | DataDriftMetricThresholdBase;

export function dataDriftMetricThresholdBaseUnionSerializer(
  item: DataDriftMetricThresholdBaseUnion,
): any {
  switch (item.dataType) {
    case "Categorical":
      return categoricalDataDriftMetricThresholdSerializer(
        item as CategoricalDataDriftMetricThreshold,
      );

    case "Numerical":
      return numericalDataDriftMetricThresholdSerializer(item as NumericalDataDriftMetricThreshold);

    default:
      return dataDriftMetricThresholdBaseSerializer(item);
  }
}

export function dataDriftMetricThresholdBaseUnionDeserializer(
  item: any,
): DataDriftMetricThresholdBaseUnion {
  switch (item["dataType"]) {
    case "Categorical":
      return categoricalDataDriftMetricThresholdDeserializer(
        item as CategoricalDataDriftMetricThreshold,
      );

    case "Numerical":
      return numericalDataDriftMetricThresholdDeserializer(
        item as NumericalDataDriftMetricThreshold,
      );

    default:
      return dataDriftMetricThresholdBaseDeserializer(item);
  }
}

/** model interface CategoricalDataDriftMetricThreshold */
export interface CategoricalDataDriftMetricThreshold extends DataDriftMetricThresholdBase {
  /** [Required] The categorical data drift metric to calculate. */
  metric: CategoricalDataDriftMetric;
  /** [Required] Specifies the data type of the metric threshold. */
  dataType: "Categorical";
}

export function categoricalDataDriftMetricThresholdSerializer(
  item: CategoricalDataDriftMetricThreshold,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
    metric: item["metric"],
  };
}

export function categoricalDataDriftMetricThresholdDeserializer(
  item: any,
): CategoricalDataDriftMetricThreshold {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
    metric: item["metric"],
  };
}

/** Known values of {@link CategoricalDataDriftMetric} that the service accepts. */
export enum KnownCategoricalDataDriftMetric {
  /** The Jensen Shannon Distance (JSD) metric. */
  JensenShannonDistance = "JensenShannonDistance",
  /** The Population Stability Index (PSI) metric. */
  PopulationStabilityIndex = "PopulationStabilityIndex",
  /** The Pearsons Chi Squared Test metric. */
  PearsonsChiSquaredTest = "PearsonsChiSquaredTest",
}

/** Type of CategoricalDataDriftMetric */
export type CategoricalDataDriftMetric = string;

/** model interface NumericalDataDriftMetricThreshold */
export interface NumericalDataDriftMetricThreshold extends DataDriftMetricThresholdBase {
  /** [Required] The numerical data drift metric to calculate. */
  metric: NumericalDataDriftMetric;
  /** [Required] Specifies the data type of the metric threshold. */
  dataType: "Numerical";
}

export function numericalDataDriftMetricThresholdSerializer(
  item: NumericalDataDriftMetricThreshold,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
    metric: item["metric"],
  };
}

export function numericalDataDriftMetricThresholdDeserializer(
  item: any,
): NumericalDataDriftMetricThreshold {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
    metric: item["metric"],
  };
}

/** Known values of {@link NumericalDataDriftMetric} that the service accepts. */
export enum KnownNumericalDataDriftMetric {
  /** The Jensen Shannon Distance (JSD) metric. */
  JensenShannonDistance = "JensenShannonDistance",
  /** The Population Stability Index (PSI) metric. */
  PopulationStabilityIndex = "PopulationStabilityIndex",
  /** The Normalized Wasserstein Distance metric. */
  NormalizedWassersteinDistance = "NormalizedWassersteinDistance",
  /** The Two Sample Kolmogorov-Smirnov Test (two-sample Kâ€“S) metric. */
  TwoSampleKolmogorovSmirnovTest = "TwoSampleKolmogorovSmirnovTest",
}

/** Type of NumericalDataDriftMetric */
export type NumericalDataDriftMetric = string;

/** model interface DataQualityMonitoringSignal */
export interface DataQualityMonitoringSignal extends MonitoringSignalBase {
  /** A dictionary that maps feature names to their respective data types. */
  featureDataTypeOverride?: Record<string, MonitoringFeatureDataType>;
  /** The settings for computing feature importance. */
  featureImportanceSettings?: FeatureImportanceSettings;
  /** The features to calculate drift over. */
  features?: MonitoringFeatureFilterBaseUnion;
  /** [Required] A list of metrics to calculate and their associated thresholds. */
  metricThresholds: DataQualityMetricThresholdBaseUnion[];
  /** [Required] The data produced by the production service which drift will be calculated for. */
  productionData: MonitoringInputDataBaseUnion;
  /** [Required] The data to calculate drift against. */
  referenceData: MonitoringInputDataBaseUnion;
  /** [Required] Specifies the type of signal to monitor. */
  signalType: "DataQuality";
}

export function dataQualityMonitoringSignalSerializer(item: DataQualityMonitoringSignal): any {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p: any) => {
          return p;
        }),
    properties: item["properties"],
    signalType: item["signalType"],
    featureDataTypeOverride: item["featureDataTypeOverride"],
    featureImportanceSettings: !item["featureImportanceSettings"]
      ? item["featureImportanceSettings"]
      : featureImportanceSettingsSerializer(item["featureImportanceSettings"]),
    features: !item["features"]
      ? item["features"]
      : monitoringFeatureFilterBaseUnionSerializer(item["features"]),
    metricThresholds: dataQualityMetricThresholdBaseUnionArraySerializer(item["metricThresholds"]),
    productionData: monitoringInputDataBaseUnionSerializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionSerializer(item["referenceData"]),
  };
}

export function dataQualityMonitoringSignalDeserializer(item: any): DataQualityMonitoringSignal {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p1: any) => {
          return p1;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    signalType: item["signalType"],
    featureDataTypeOverride: !item["featureDataTypeOverride"]
      ? item["featureDataTypeOverride"]
      : Object.fromEntries(
          Object.entries(item["featureDataTypeOverride"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    featureImportanceSettings: !item["featureImportanceSettings"]
      ? item["featureImportanceSettings"]
      : featureImportanceSettingsDeserializer(item["featureImportanceSettings"]),
    features: !item["features"]
      ? item["features"]
      : monitoringFeatureFilterBaseUnionDeserializer(item["features"]),
    metricThresholds: dataQualityMetricThresholdBaseUnionArrayDeserializer(
      item["metricThresholds"],
    ),
    productionData: monitoringInputDataBaseUnionDeserializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionDeserializer(item["referenceData"]),
  };
}

export function dataQualityMetricThresholdBaseUnionArraySerializer(
  result: Array<DataQualityMetricThresholdBaseUnion>,
): any[] {
  return result.map((item) => {
    return dataQualityMetricThresholdBaseUnionSerializer(item);
  });
}

export function dataQualityMetricThresholdBaseUnionArrayDeserializer(
  result: Array<DataQualityMetricThresholdBaseUnion>,
): any[] {
  return result.map((item) => {
    return dataQualityMetricThresholdBaseUnionDeserializer(item);
  });
}

/** model interface DataQualityMetricThresholdBase */
export interface DataQualityMetricThresholdBase {
  /** [Required] Specifies the data type of the metric threshold. */
  /** The discriminator possible values: Categorical, Numerical */
  dataType: MonitoringFeatureDataType;
  /** The threshold value. If null, a default value will be set depending on the selected metric. */
  threshold?: MonitoringThreshold;
}

export function dataQualityMetricThresholdBaseSerializer(
  item: DataQualityMetricThresholdBase,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
  };
}

export function dataQualityMetricThresholdBaseDeserializer(
  item: any,
): DataQualityMetricThresholdBase {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
  };
}

/** Alias for DataQualityMetricThresholdBaseUnion */
export type DataQualityMetricThresholdBaseUnion =
  | CategoricalDataQualityMetricThreshold
  | NumericalDataQualityMetricThreshold
  | DataQualityMetricThresholdBase;

export function dataQualityMetricThresholdBaseUnionSerializer(
  item: DataQualityMetricThresholdBaseUnion,
): any {
  switch (item.dataType) {
    case "Categorical":
      return categoricalDataQualityMetricThresholdSerializer(
        item as CategoricalDataQualityMetricThreshold,
      );

    case "Numerical":
      return numericalDataQualityMetricThresholdSerializer(
        item as NumericalDataQualityMetricThreshold,
      );

    default:
      return dataQualityMetricThresholdBaseSerializer(item);
  }
}

export function dataQualityMetricThresholdBaseUnionDeserializer(
  item: any,
): DataQualityMetricThresholdBaseUnion {
  switch (item["dataType"]) {
    case "Categorical":
      return categoricalDataQualityMetricThresholdDeserializer(
        item as CategoricalDataQualityMetricThreshold,
      );

    case "Numerical":
      return numericalDataQualityMetricThresholdDeserializer(
        item as NumericalDataQualityMetricThreshold,
      );

    default:
      return dataQualityMetricThresholdBaseDeserializer(item);
  }
}

/** model interface CategoricalDataQualityMetricThreshold */
export interface CategoricalDataQualityMetricThreshold extends DataQualityMetricThresholdBase {
  /** [Required] The categorical data quality metric to calculate. */
  metric: CategoricalDataQualityMetric;
  /** [Required] Specifies the data type of the metric threshold. */
  dataType: "Categorical";
}

export function categoricalDataQualityMetricThresholdSerializer(
  item: CategoricalDataQualityMetricThreshold,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
    metric: item["metric"],
  };
}

export function categoricalDataQualityMetricThresholdDeserializer(
  item: any,
): CategoricalDataQualityMetricThreshold {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
    metric: item["metric"],
  };
}

/** Known values of {@link CategoricalDataQualityMetric} that the service accepts. */
export enum KnownCategoricalDataQualityMetric {
  /** Calculates the rate of null values. */
  NullValueRate = "NullValueRate",
  /** Calculates the rate of data type errors. */
  DataTypeErrorRate = "DataTypeErrorRate",
  /** Calculates the rate values are out of bounds. */
  OutOfBoundsRate = "OutOfBoundsRate",
}

/** Type of CategoricalDataQualityMetric */
export type CategoricalDataQualityMetric = string;

/** model interface NumericalDataQualityMetricThreshold */
export interface NumericalDataQualityMetricThreshold extends DataQualityMetricThresholdBase {
  /** [Required] The numerical data quality metric to calculate. */
  metric: NumericalDataQualityMetric;
  /** [Required] Specifies the data type of the metric threshold. */
  dataType: "Numerical";
}

export function numericalDataQualityMetricThresholdSerializer(
  item: NumericalDataQualityMetricThreshold,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
    metric: item["metric"],
  };
}

export function numericalDataQualityMetricThresholdDeserializer(
  item: any,
): NumericalDataQualityMetricThreshold {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
    metric: item["metric"],
  };
}

/** Known values of {@link NumericalDataQualityMetric} that the service accepts. */
export enum KnownNumericalDataQualityMetric {
  /** Calculates the rate of null values. */
  NullValueRate = "NullValueRate",
  /** Calculates the rate of data type errors. */
  DataTypeErrorRate = "DataTypeErrorRate",
  /** Calculates the rate values are out of bounds. */
  OutOfBoundsRate = "OutOfBoundsRate",
}

/** Type of NumericalDataQualityMetric */
export type NumericalDataQualityMetric = string;

/** model interface FeatureAttributionDriftMonitoringSignal */
export interface FeatureAttributionDriftMonitoringSignal extends MonitoringSignalBase {
  /** A dictionary that maps feature names to their respective data types. */
  featureDataTypeOverride?: Record<string, MonitoringFeatureDataType>;
  /** [Required] The settings for computing feature importance. */
  featureImportanceSettings: FeatureImportanceSettings;
  /** [Required] A list of metrics to calculate and their associated thresholds. */
  metricThreshold: FeatureAttributionMetricThreshold;
  /** [Required] The data which drift will be calculated for. */
  productionData: MonitoringInputDataBaseUnion[];
  /** [Required] The data to calculate drift against. */
  referenceData: MonitoringInputDataBaseUnion;
  /** [Required] Specifies the type of signal to monitor. */
  signalType: "FeatureAttributionDrift";
}

export function featureAttributionDriftMonitoringSignalSerializer(
  item: FeatureAttributionDriftMonitoringSignal,
): any {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p: any) => {
          return p;
        }),
    properties: item["properties"],
    signalType: item["signalType"],
    featureDataTypeOverride: item["featureDataTypeOverride"],
    featureImportanceSettings: featureImportanceSettingsSerializer(
      item["featureImportanceSettings"],
    ),
    metricThreshold: featureAttributionMetricThresholdSerializer(item["metricThreshold"]),
    productionData: monitoringInputDataBaseUnionArraySerializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionSerializer(item["referenceData"]),
  };
}

export function featureAttributionDriftMonitoringSignalDeserializer(
  item: any,
): FeatureAttributionDriftMonitoringSignal {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p1: any) => {
          return p1;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    signalType: item["signalType"],
    featureDataTypeOverride: !item["featureDataTypeOverride"]
      ? item["featureDataTypeOverride"]
      : Object.fromEntries(
          Object.entries(item["featureDataTypeOverride"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    featureImportanceSettings: featureImportanceSettingsDeserializer(
      item["featureImportanceSettings"],
    ),
    metricThreshold: featureAttributionMetricThresholdDeserializer(item["metricThreshold"]),
    productionData: monitoringInputDataBaseUnionArrayDeserializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionDeserializer(item["referenceData"]),
  };
}

/** model interface FeatureAttributionMetricThreshold */
export interface FeatureAttributionMetricThreshold {
  /** [Required] The feature attribution metric to calculate. */
  metric: FeatureAttributionMetric;
  /** The threshold value. If null, a default value will be set depending on the selected metric. */
  threshold?: MonitoringThreshold;
}

export function featureAttributionMetricThresholdSerializer(
  item: FeatureAttributionMetricThreshold,
): any {
  return {
    metric: item["metric"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
  };
}

export function featureAttributionMetricThresholdDeserializer(
  item: any,
): FeatureAttributionMetricThreshold {
  return {
    metric: item["metric"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
  };
}

/** Known values of {@link FeatureAttributionMetric} that the service accepts. */
export enum KnownFeatureAttributionMetric {
  /** The Normalized Discounted Cumulative Gain metric. */
  NormalizedDiscountedCumulativeGain = "NormalizedDiscountedCumulativeGain",
}

/** Type of FeatureAttributionMetric */
export type FeatureAttributionMetric = string;

export function monitoringInputDataBaseUnionArraySerializer(
  result: Array<MonitoringInputDataBaseUnion>,
): any[] {
  return result.map((item) => {
    return monitoringInputDataBaseUnionSerializer(item);
  });
}

export function monitoringInputDataBaseUnionArrayDeserializer(
  result: Array<MonitoringInputDataBaseUnion>,
): any[] {
  return result.map((item) => {
    return monitoringInputDataBaseUnionDeserializer(item);
  });
}

/** model interface PredictionDriftMonitoringSignal */
export interface PredictionDriftMonitoringSignal extends MonitoringSignalBase {
  /** A dictionary that maps feature names to their respective data types. */
  featureDataTypeOverride?: Record<string, MonitoringFeatureDataType>;
  /** [Required] A list of metrics to calculate and their associated thresholds. */
  metricThresholds: PredictionDriftMetricThresholdBaseUnion[];
  /** [Required] The data which drift will be calculated for. */
  productionData: MonitoringInputDataBaseUnion;
  /** [Required] The data to calculate drift against. */
  referenceData: MonitoringInputDataBaseUnion;
  /** [Required] Specifies the type of signal to monitor. */
  signalType: "PredictionDrift";
}

export function predictionDriftMonitoringSignalSerializer(
  item: PredictionDriftMonitoringSignal,
): any {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p: any) => {
          return p;
        }),
    properties: item["properties"],
    signalType: item["signalType"],
    featureDataTypeOverride: item["featureDataTypeOverride"],
    metricThresholds: predictionDriftMetricThresholdBaseUnionArraySerializer(
      item["metricThresholds"],
    ),
    productionData: monitoringInputDataBaseUnionSerializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionSerializer(item["referenceData"]),
  };
}

export function predictionDriftMonitoringSignalDeserializer(
  item: any,
): PredictionDriftMonitoringSignal {
  return {
    notificationTypes: !item["notificationTypes"]
      ? item["notificationTypes"]
      : item["notificationTypes"].map((p1: any) => {
          return p1;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    signalType: item["signalType"],
    featureDataTypeOverride: !item["featureDataTypeOverride"]
      ? item["featureDataTypeOverride"]
      : Object.fromEntries(
          Object.entries(item["featureDataTypeOverride"]).map(([k1, p1]: [string, any]) => [
            k1,
            p1,
          ]),
        ),
    metricThresholds: predictionDriftMetricThresholdBaseUnionArrayDeserializer(
      item["metricThresholds"],
    ),
    productionData: monitoringInputDataBaseUnionDeserializer(item["productionData"]),
    referenceData: monitoringInputDataBaseUnionDeserializer(item["referenceData"]),
  };
}

export function predictionDriftMetricThresholdBaseUnionArraySerializer(
  result: Array<PredictionDriftMetricThresholdBaseUnion>,
): any[] {
  return result.map((item) => {
    return predictionDriftMetricThresholdBaseUnionSerializer(item);
  });
}

export function predictionDriftMetricThresholdBaseUnionArrayDeserializer(
  result: Array<PredictionDriftMetricThresholdBaseUnion>,
): any[] {
  return result.map((item) => {
    return predictionDriftMetricThresholdBaseUnionDeserializer(item);
  });
}

/** model interface PredictionDriftMetricThresholdBase */
export interface PredictionDriftMetricThresholdBase {
  /** [Required] Specifies the data type of the metric threshold. */
  /** The discriminator possible values: Categorical, Numerical */
  dataType: MonitoringFeatureDataType;
  /** The threshold value. If null, a default value will be set depending on the selected metric. */
  threshold?: MonitoringThreshold;
}

export function predictionDriftMetricThresholdBaseSerializer(
  item: PredictionDriftMetricThresholdBase,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
  };
}

export function predictionDriftMetricThresholdBaseDeserializer(
  item: any,
): PredictionDriftMetricThresholdBase {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
  };
}

/** Alias for PredictionDriftMetricThresholdBaseUnion */
export type PredictionDriftMetricThresholdBaseUnion =
  | CategoricalPredictionDriftMetricThreshold
  | NumericalPredictionDriftMetricThreshold
  | PredictionDriftMetricThresholdBase;

export function predictionDriftMetricThresholdBaseUnionSerializer(
  item: PredictionDriftMetricThresholdBaseUnion,
): any {
  switch (item.dataType) {
    case "Categorical":
      return categoricalPredictionDriftMetricThresholdSerializer(
        item as CategoricalPredictionDriftMetricThreshold,
      );

    case "Numerical":
      return numericalPredictionDriftMetricThresholdSerializer(
        item as NumericalPredictionDriftMetricThreshold,
      );

    default:
      return predictionDriftMetricThresholdBaseSerializer(item);
  }
}

export function predictionDriftMetricThresholdBaseUnionDeserializer(
  item: any,
): PredictionDriftMetricThresholdBaseUnion {
  switch (item["dataType"]) {
    case "Categorical":
      return categoricalPredictionDriftMetricThresholdDeserializer(
        item as CategoricalPredictionDriftMetricThreshold,
      );

    case "Numerical":
      return numericalPredictionDriftMetricThresholdDeserializer(
        item as NumericalPredictionDriftMetricThreshold,
      );

    default:
      return predictionDriftMetricThresholdBaseDeserializer(item);
  }
}

/** model interface CategoricalPredictionDriftMetricThreshold */
export interface CategoricalPredictionDriftMetricThreshold extends PredictionDriftMetricThresholdBase {
  /** [Required] The categorical prediction drift metric to calculate. */
  metric: CategoricalPredictionDriftMetric;
  /** [Required] Specifies the data type of the metric threshold. */
  dataType: "Categorical";
}

export function categoricalPredictionDriftMetricThresholdSerializer(
  item: CategoricalPredictionDriftMetricThreshold,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
    metric: item["metric"],
  };
}

export function categoricalPredictionDriftMetricThresholdDeserializer(
  item: any,
): CategoricalPredictionDriftMetricThreshold {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
    metric: item["metric"],
  };
}

/** Known values of {@link CategoricalPredictionDriftMetric} that the service accepts. */
export enum KnownCategoricalPredictionDriftMetric {
  /** The Jensen Shannon Distance (JSD) metric. */
  JensenShannonDistance = "JensenShannonDistance",
  /** The Population Stability Index (PSI) metric. */
  PopulationStabilityIndex = "PopulationStabilityIndex",
  /** The Pearsons Chi Squared Test metric. */
  PearsonsChiSquaredTest = "PearsonsChiSquaredTest",
}

/** Type of CategoricalPredictionDriftMetric */
export type CategoricalPredictionDriftMetric = string;

/** model interface NumericalPredictionDriftMetricThreshold */
export interface NumericalPredictionDriftMetricThreshold extends PredictionDriftMetricThresholdBase {
  /** [Required] The numerical prediction drift metric to calculate. */
  metric: NumericalPredictionDriftMetric;
  /** [Required] Specifies the data type of the metric threshold. */
  dataType: "Numerical";
}

export function numericalPredictionDriftMetricThresholdSerializer(
  item: NumericalPredictionDriftMetricThreshold,
): any {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdSerializer(item["threshold"]),
    metric: item["metric"],
  };
}

export function numericalPredictionDriftMetricThresholdDeserializer(
  item: any,
): NumericalPredictionDriftMetricThreshold {
  return {
    dataType: item["dataType"],
    threshold: !item["threshold"]
      ? item["threshold"]
      : monitoringThresholdDeserializer(item["threshold"]),
    metric: item["metric"],
  };
}

/** Known values of {@link NumericalPredictionDriftMetric} that the service accepts. */
export enum KnownNumericalPredictionDriftMetric {
  /** The Jensen Shannon Distance (JSD) metric. */
  JensenShannonDistance = "JensenShannonDistance",
  /** The Population Stability Index (PSI) metric. */
  PopulationStabilityIndex = "PopulationStabilityIndex",
  /** The Normalized Wasserstein Distance metric. */
  NormalizedWassersteinDistance = "NormalizedWassersteinDistance",
  /** The Two Sample Kolmogorov-Smirnov Test (two-sample Kâ€“S) metric. */
  TwoSampleKolmogorovSmirnovTest = "TwoSampleKolmogorovSmirnovTest",
}

/** Type of NumericalPredictionDriftMetric */
export type NumericalPredictionDriftMetric = string;

/** model interface EndpointScheduleAction */
export interface EndpointScheduleAction extends ScheduleActionBase {
  /**
   * [Required] Defines Schedule action definition details.
   * <see href="TBD" />
   */
  endpointInvocationDefinition: Record<string, any>;
  /** [Required] Specifies the action type of the schedule */
  actionType: "InvokeBatchEndpoint";
}

export function endpointScheduleActionSerializer(item: EndpointScheduleAction): any {
  return {
    actionType: item["actionType"],
    endpointInvocationDefinition: item["endpointInvocationDefinition"],
  };
}

export function endpointScheduleActionDeserializer(item: any): EndpointScheduleAction {
  return {
    actionType: item["actionType"],
    endpointInvocationDefinition: Object.fromEntries(
      Object.entries(item["endpointInvocationDefinition"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** model interface JobScheduleAction */
export interface JobScheduleAction extends ScheduleActionBase {
  /** [Required] Defines Schedule action definition details. */
  jobDefinition: JobBasePropertiesUnion;
  /** [Required] Specifies the action type of the schedule */
  actionType: "CreateJob";
}

export function jobScheduleActionSerializer(item: JobScheduleAction): any {
  return {
    actionType: item["actionType"],
    jobDefinition: jobBasePropertiesUnionSerializer(item["jobDefinition"]),
  };
}

export function jobScheduleActionDeserializer(item: any): JobScheduleAction {
  return {
    actionType: item["actionType"],
    jobDefinition: jobBasePropertiesUnionDeserializer(item["jobDefinition"]),
  };
}

/** Base definition for a job. */
export interface JobBaseProperties extends ResourceBase {
  /** ARM resource ID of the component resource. */
  componentId?: string;
  /** ARM resource ID of the compute resource. */
  computeId?: string;
  /** Display name of job. */
  displayName?: string;
  /** The name of the experiment the job belongs to. If not set, the job is placed in the "Default" experiment. */
  experimentName?: string;
  /**
   * Identity configuration. If set, this should be one of AmlToken, ManagedIdentity, UserIdentity or null.
   * Defaults to AmlToken if null.
   */
  identity?: IdentityConfigurationUnion;
  /** Is the asset archived? */
  isArchived?: boolean;
  /** [Required] Specifies the type of job. */
  /** The discriminator possible values: AutoML, Command, Pipeline, Spark, Sweep */
  jobType: JobType;
  /** Notification setting for the job */
  notificationSetting?: NotificationSetting;
  /**
   * List of JobEndpoints.
   * For local jobs, a job endpoint will have an endpoint value of FileStreamObject.
   */
  services?: Record<string, JobService>;
  /** Status of the job. */
  readonly status?: JobStatus;
}

export function jobBasePropertiesSerializer(item: JobBaseProperties): any {
  return {
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionSerializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingSerializer(item["notificationSetting"]),
    services: item["services"],
  };
}

export function jobBasePropertiesDeserializer(item: any): JobBaseProperties {
  return {
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionDeserializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingDeserializer(item["notificationSetting"]),
    services: !item["services"]
      ? item["services"]
      : Object.fromEntries(
          Object.entries(item["services"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobServiceDeserializer(p1),
          ]),
        ),
    status: item["status"],
  };
}

/** Alias for JobBasePropertiesUnion */
export type JobBasePropertiesUnion =
  | AutoMLJob
  | CommandJob
  | PipelineJob
  | SparkJob
  | SweepJob
  | JobBaseProperties;

export function jobBasePropertiesUnionSerializer(item: JobBasePropertiesUnion): any {
  switch (item.jobType) {
    case "AutoML":
      return autoMLJobSerializer(item as AutoMLJob);

    case "Command":
      return commandJobSerializer(item as CommandJob);

    case "Pipeline":
      return pipelineJobSerializer(item as PipelineJob);

    case "Spark":
      return sparkJobSerializer(item as SparkJob);

    case "Sweep":
      return sweepJobSerializer(item as SweepJob);

    default:
      return jobBasePropertiesSerializer(item);
  }
}

export function jobBasePropertiesUnionDeserializer(item: any): JobBasePropertiesUnion {
  switch (item["jobType"]) {
    case "AutoML":
      return autoMLJobDeserializer(item as AutoMLJob);

    case "Command":
      return commandJobDeserializer(item as CommandJob);

    case "Pipeline":
      return pipelineJobDeserializer(item as PipelineJob);

    case "Spark":
      return sparkJobDeserializer(item as SparkJob);

    case "Sweep":
      return sweepJobDeserializer(item as SweepJob);

    default:
      return jobBasePropertiesDeserializer(item);
  }
}

/** Base definition for identity configuration. */
export interface IdentityConfiguration {
  /** [Required] Specifies the type of identity framework. */
  /** The discriminator possible values: AMLToken, Managed, UserIdentity */
  identityType: IdentityConfigurationType;
}

export function identityConfigurationSerializer(item: IdentityConfiguration): any {
  return { identityType: item["identityType"] };
}

export function identityConfigurationDeserializer(item: any): IdentityConfiguration {
  return {
    identityType: item["identityType"],
  };
}

/** Alias for IdentityConfigurationUnion */
export type IdentityConfigurationUnion =
  | AmlToken
  | ManagedIdentity
  | UserIdentity
  | IdentityConfiguration;

export function identityConfigurationUnionSerializer(item: IdentityConfigurationUnion): any {
  switch (item.identityType) {
    case "AMLToken":
      return amlTokenSerializer(item as AmlToken);

    case "Managed":
      return managedIdentitySerializer(item as ManagedIdentity);

    case "UserIdentity":
      return userIdentitySerializer(item as UserIdentity);

    default:
      return identityConfigurationSerializer(item);
  }
}

export function identityConfigurationUnionDeserializer(item: any): IdentityConfigurationUnion {
  switch (item["identityType"]) {
    case "AMLToken":
      return amlTokenDeserializer(item as AmlToken);

    case "Managed":
      return managedIdentityDeserializer(item as ManagedIdentity);

    case "UserIdentity":
      return userIdentityDeserializer(item as UserIdentity);

    default:
      return identityConfigurationDeserializer(item);
  }
}

/** Enum to determine identity framework. */
export enum KnownIdentityConfigurationType {
  /** Managed */
  Managed = "Managed",
  /** AMLToken */
  AMLToken = "AMLToken",
  /** UserIdentity */
  UserIdentity = "UserIdentity",
}

/**
 * Enum to determine identity framework. \
 * {@link KnownIdentityConfigurationType} can be used interchangeably with IdentityConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed** \
 * **AMLToken** \
 * **UserIdentity**
 */
export type IdentityConfigurationType = string;

/** AML Token identity configuration. */
export interface AmlToken extends IdentityConfiguration {
  /** [Required] Specifies the type of identity framework. */
  identityType: "AMLToken";
}

export function amlTokenSerializer(item: AmlToken): any {
  return { identityType: item["identityType"] };
}

export function amlTokenDeserializer(item: any): AmlToken {
  return {
    identityType: item["identityType"],
  };
}

/** Managed identity configuration. */
export interface ManagedIdentity extends IdentityConfiguration {
  /** Specifies a user-assigned identity by client ID. For system-assigned, do not set this field. */
  clientId?: string;
  /** Specifies a user-assigned identity by object ID. For system-assigned, do not set this field. */
  objectId?: string;
  /** Specifies a user-assigned identity by ARM resource ID. For system-assigned, do not set this field. */
  resourceId?: string;
  /** [Required] Specifies the type of identity framework. */
  identityType: "Managed";
}

export function managedIdentitySerializer(item: ManagedIdentity): any {
  return {
    identityType: item["identityType"],
    clientId: item["clientId"],
    objectId: item["objectId"],
    resourceId: item["resourceId"],
  };
}

export function managedIdentityDeserializer(item: any): ManagedIdentity {
  return {
    identityType: item["identityType"],
    clientId: item["clientId"],
    objectId: item["objectId"],
    resourceId: item["resourceId"],
  };
}

/** User identity configuration. */
export interface UserIdentity extends IdentityConfiguration {
  /** [Required] Specifies the type of identity framework. */
  identityType: "UserIdentity";
}

export function userIdentitySerializer(item: UserIdentity): any {
  return { identityType: item["identityType"] };
}

export function userIdentityDeserializer(item: any): UserIdentity {
  return {
    identityType: item["identityType"],
  };
}

/** Enum to determine the type of job. */
export enum KnownJobType {
  /** AutoML */
  AutoML = "AutoML",
  /** Command */
  Command = "Command",
  /** Sweep */
  Sweep = "Sweep",
  /** Pipeline */
  Pipeline = "Pipeline",
  /** Spark */
  Spark = "Spark",
}

/**
 * Enum to determine the type of job. \
 * {@link KnownJobType} can be used interchangeably with JobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoML** \
 * **Command** \
 * **Sweep** \
 * **Pipeline** \
 * **Spark**
 */
export type JobType = string;

/** Job endpoint definition */
export interface JobService {
  /** Url for endpoint. */
  endpoint?: string;
  /** Any error in the service. */
  readonly errorMessage?: string;
  /** Endpoint type. */
  jobServiceType?: string;
  /**
   * Nodes that user would like to start the service on.
   * If Nodes is not set or set to null, the service will only be started on leader node.
   */
  nodes?: NodesUnion;
  /** Port for endpoint. */
  port?: number;
  /** Additional properties to set on the endpoint. */
  properties?: Record<string, string>;
  /** Status of endpoint. */
  readonly status?: string;
}

export function jobServiceSerializer(item: JobService): any {
  return {
    endpoint: item["endpoint"],
    jobServiceType: item["jobServiceType"],
    nodes: !item["nodes"] ? item["nodes"] : nodesUnionSerializer(item["nodes"]),
    port: item["port"],
    properties: item["properties"],
  };
}

export function jobServiceDeserializer(item: any): JobService {
  return {
    endpoint: item["endpoint"],
    errorMessage: item["errorMessage"],
    jobServiceType: item["jobServiceType"],
    nodes: !item["nodes"] ? item["nodes"] : nodesUnionDeserializer(item["nodes"]),
    port: item["port"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    status: item["status"],
  };
}

/** Abstract Nodes definition */
export interface Nodes {
  /** [Required] Type of the Nodes value */
  /** The discriminator possible values: All */
  nodesValueType: NodesValueType;
}

export function nodesSerializer(item: Nodes): any {
  return { nodesValueType: item["nodesValueType"] };
}

export function nodesDeserializer(item: any): Nodes {
  return {
    nodesValueType: item["nodesValueType"],
  };
}

/** Alias for NodesUnion */
export type NodesUnion = AllNodes | Nodes;

export function nodesUnionSerializer(item: NodesUnion): any {
  switch (item.nodesValueType) {
    case "All":
      return allNodesSerializer(item as AllNodes);

    default:
      return nodesSerializer(item);
  }
}

export function nodesUnionDeserializer(item: any): NodesUnion {
  switch (item["nodesValueType"]) {
    case "All":
      return allNodesDeserializer(item as AllNodes);

    default:
      return nodesDeserializer(item);
  }
}

/** The enumerated types for the nodes value */
export enum KnownNodesValueType {
  /** All */
  All = "All",
}

/**
 * The enumerated types for the nodes value \
 * {@link KnownNodesValueType} can be used interchangeably with NodesValueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All**
 */
export type NodesValueType = string;

/** All nodes means the service will be running on all of the nodes of the job */
export interface AllNodes extends Nodes {
  /** [Required] Type of the Nodes value */
  nodesValueType: "All";
}

export function allNodesSerializer(item: AllNodes): any {
  return { nodesValueType: item["nodesValueType"] };
}

export function allNodesDeserializer(item: any): AllNodes {
  return {
    nodesValueType: item["nodesValueType"],
  };
}

/** The status of a job. */
export enum KnownJobStatus {
  /** Run hasn't started yet. */
  NotStarted = "NotStarted",
  /** Run has started. The user has a run ID. */
  Starting = "Starting",
  /** (Not used currently) It will be used if ES is creating the compute target. */
  Provisioning = "Provisioning",
  /** The run environment is being prepared. */
  Preparing = "Preparing",
  /** The job is queued in the compute target. For example, in BatchAI the job is in queued state, while waiting for all required nodes to be ready. */
  Queued = "Queued",
  /** The job started to run in the compute target. */
  Running = "Running",
  /** Job is completed in the target. It is in output collection state now. */
  Finalizing = "Finalizing",
  /** Cancellation has been requested for the job. */
  CancelRequested = "CancelRequested",
  /** Job completed successfully. This reflects that both the job itself and output collection states completed successfully */
  Completed = "Completed",
  /** Job failed. */
  Failed = "Failed",
  /** Following cancellation request, the job is now successfully canceled. */
  Canceled = "Canceled",
  /**
   * When heartbeat is enabled, if the run isn't updating any information to RunHistory then the run goes to NotResponding state.
   * NotResponding is the only state that is exempt from strict transition orders. A run can go from NotResponding to any of the previous states.
   */
  NotResponding = "NotResponding",
  /** The job is paused by users. Some adjustment to labeling jobs can be made only in paused state. */
  Paused = "Paused",
  /** Default job status if not mapped to all other statuses */
  Unknown = "Unknown",
}

/**
 * The status of a job. \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Run hasn't started yet. \
 * **Starting**: Run has started. The user has a run ID. \
 * **Provisioning**: (Not used currently) It will be used if ES is creating the compute target. \
 * **Preparing**: The run environment is being prepared. \
 * **Queued**: The job is queued in the compute target. For example, in BatchAI the job is in queued state, while waiting for all required nodes to be ready. \
 * **Running**: The job started to run in the compute target. \
 * **Finalizing**: Job is completed in the target. It is in output collection state now. \
 * **CancelRequested**: Cancellation has been requested for the job. \
 * **Completed**: Job completed successfully. This reflects that both the job itself and output collection states completed successfully \
 * **Failed**: Job failed. \
 * **Canceled**: Following cancellation request, the job is now successfully canceled. \
 * **NotResponding**: When heartbeat is enabled, if the run isn't updating any information to RunHistory then the run goes to NotResponding state.
 * NotResponding is the only state that is exempt from strict transition orders. A run can go from NotResponding to any of the previous states. \
 * **Paused**: The job is paused by users. Some adjustment to labeling jobs can be made only in paused state. \
 * **Unknown**: Default job status if not mapped to all other statuses
 */
export type JobStatus = string;

/**
 * AutoMLJob class.
 * Use this class for executing AutoML tasks like Classification/Regression etc.
 * See TaskType enum for all the tasks supported.
 */
export interface AutoMLJob extends JobBaseProperties {
  /**
   * The ARM resource ID of the Environment specification for the job.
   * This is optional value to provide, if not provided, AutoML will default this to Production AutoML curated environment version when running the job.
   */
  environmentId?: string;
  /** Environment variables included in the job. */
  environmentVariables?: Record<string, string>;
  /** Mapping of output data bindings used in the job. */
  outputs?: Record<string, JobOutputUnion>;
  /** Queue settings for the job */
  queueSettings?: QueueSettings;
  /** Compute Resource configuration for the job. */
  resources?: JobResourceConfiguration;
  /** [Required] This represents scenario which can be one of Tables/NLP/Image */
  taskDetails: AutoMLVerticalUnion;
  /** [Required] Specifies the type of job. */
  jobType: "AutoML";
}

export function autoMLJobSerializer(item: AutoMLJob): any {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionSerializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingSerializer(item["notificationSetting"]),
    services: item["services"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    outputs: item["outputs"],
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsSerializer(item["queueSettings"]),
    resources: !item["resources"]
      ? item["resources"]
      : jobResourceConfigurationSerializer(item["resources"]),
    taskDetails: autoMLVerticalUnionSerializer(item["taskDetails"]),
  };
}

export function autoMLJobDeserializer(item: any): AutoMLJob {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionDeserializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingDeserializer(item["notificationSetting"]),
    services: !item["services"]
      ? item["services"]
      : Object.fromEntries(
          Object.entries(item["services"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobServiceDeserializer(p1),
          ]),
        ),
    status: item["status"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    outputs: !item["outputs"]
      ? item["outputs"]
      : Object.fromEntries(
          Object.entries(item["outputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobOutputUnionDeserializer(p1),
          ]),
        ),
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsDeserializer(item["queueSettings"]),
    resources: !item["resources"]
      ? item["resources"]
      : jobResourceConfigurationDeserializer(item["resources"]),
    taskDetails: autoMLVerticalUnionDeserializer(item["taskDetails"]),
  };
}

/** Job output definition container information on where to find job output/logs. */
export interface JobOutput {
  /** Description for the output. */
  description?: string;
  /** [Required] Specifies the type of job. */
  /** The discriminator possible values: custom_model, mlflow_model, mltable, triton_model, uri_file, uri_folder */
  jobOutputType: JobOutputType;
}

export function jobOutputSerializer(item: JobOutput): any {
  return { description: item["description"], jobOutputType: item["jobOutputType"] };
}

export function jobOutputDeserializer(item: any): JobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
  };
}

/** Alias for JobOutputUnion */
export type JobOutputUnion =
  | CustomModelJobOutput
  | MLFlowModelJobOutput
  | MLTableJobOutput
  | TritonModelJobOutput
  | UriFileJobOutput
  | UriFolderJobOutput
  | JobOutput;

export function jobOutputUnionSerializer(item: JobOutputUnion): any {
  switch (item.jobOutputType) {
    case "custom_model":
      return customModelJobOutputSerializer(item as CustomModelJobOutput);

    case "mlflow_model":
      return mlFlowModelJobOutputSerializer(item as MLFlowModelJobOutput);

    case "mltable":
      return mlTableJobOutputSerializer(item as MLTableJobOutput);

    case "triton_model":
      return tritonModelJobOutputSerializer(item as TritonModelJobOutput);

    case "uri_file":
      return uriFileJobOutputSerializer(item as UriFileJobOutput);

    case "uri_folder":
      return uriFolderJobOutputSerializer(item as UriFolderJobOutput);

    default:
      return jobOutputSerializer(item);
  }
}

export function jobOutputUnionDeserializer(item: any): JobOutputUnion {
  switch (item["jobOutputType"]) {
    case "custom_model":
      return customModelJobOutputDeserializer(item as CustomModelJobOutput);

    case "mlflow_model":
      return mlFlowModelJobOutputDeserializer(item as MLFlowModelJobOutput);

    case "mltable":
      return mlTableJobOutputDeserializer(item as MLTableJobOutput);

    case "triton_model":
      return tritonModelJobOutputDeserializer(item as TritonModelJobOutput);

    case "uri_file":
      return uriFileJobOutputDeserializer(item as UriFileJobOutput);

    case "uri_folder":
      return uriFolderJobOutputDeserializer(item as UriFolderJobOutput);

    default:
      return jobOutputDeserializer(item);
  }
}

/** Enum to determine the Job Output Type. */
export enum KnownJobOutputType {
  /** uri_file */
  UriFile = "uri_file",
  /** uri_folder */
  UriFolder = "uri_folder",
  /** mltable */
  Mltable = "mltable",
  /** custom_model */
  CustomModel = "custom_model",
  /** mlflow_model */
  MlflowModel = "mlflow_model",
  /** triton_model */
  TritonModel = "triton_model",
}

/**
 * Enum to determine the Job Output Type. \
 * {@link KnownJobOutputType} can be used interchangeably with JobOutputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **uri_file** \
 * **uri_folder** \
 * **mltable** \
 * **custom_model** \
 * **mlflow_model** \
 * **triton_model**
 */
export type JobOutputType = string;

/** model interface CustomModelJobOutput */
export interface CustomModelJobOutput extends JobOutput {
  /** Output Asset Name. */
  assetName?: string;
  /** Output data delivery mode enums. */
  mode?: OutputDeliveryMode;
  /** Output Asset URI. */
  uri?: string;
  /** [Required] Specifies the type of job. */
  jobOutputType: "custom_model";
}

export function customModelJobOutputSerializer(item: CustomModelJobOutput): any {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function customModelJobOutputDeserializer(item: any): CustomModelJobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** Output data delivery mode enums. */
export enum KnownOutputDeliveryMode {
  /** ReadWriteMount */
  ReadWriteMount = "ReadWriteMount",
  /** Upload */
  Upload = "Upload",
  /** Direct */
  Direct = "Direct",
}

/**
 * Output data delivery mode enums. \
 * {@link KnownOutputDeliveryMode} can be used interchangeably with OutputDeliveryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWriteMount** \
 * **Upload** \
 * **Direct**
 */
export type OutputDeliveryMode = string;

/** model interface MLFlowModelJobOutput */
export interface MLFlowModelJobOutput extends JobOutput {
  /** Output Asset Name. */
  assetName?: string;
  /** Output data delivery mode enums. */
  mode?: OutputDeliveryMode;
  /** Output Asset URI. */
  uri?: string;
  /** [Required] Specifies the type of job. */
  jobOutputType: "mlflow_model";
}

export function mlFlowModelJobOutputSerializer(item: MLFlowModelJobOutput): any {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function mlFlowModelJobOutputDeserializer(item: any): MLFlowModelJobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface MLTableJobOutput */
export interface MLTableJobOutput extends JobOutput {
  /** Output Asset Name. */
  assetName?: string;
  /** Output data delivery mode enums. */
  mode?: OutputDeliveryMode;
  /** Output Asset URI. */
  uri?: string;
  /** [Required] Specifies the type of job. */
  jobOutputType: "mltable";
}

export function mlTableJobOutputSerializer(item: MLTableJobOutput): any {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function mlTableJobOutputDeserializer(item: any): MLTableJobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface TritonModelJobOutput */
export interface TritonModelJobOutput extends JobOutput {
  /** Output Asset Name. */
  assetName?: string;
  /** Output data delivery mode enums. */
  mode?: OutputDeliveryMode;
  /** Output Asset URI. */
  uri?: string;
  /** [Required] Specifies the type of job. */
  jobOutputType: "triton_model";
}

export function tritonModelJobOutputSerializer(item: TritonModelJobOutput): any {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function tritonModelJobOutputDeserializer(item: any): TritonModelJobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface UriFileJobOutput */
export interface UriFileJobOutput extends JobOutput {
  /** Output Asset Name. */
  assetName?: string;
  /** Output data delivery mode enums. */
  mode?: OutputDeliveryMode;
  /** Output Asset URI. */
  uri?: string;
  /** [Required] Specifies the type of job. */
  jobOutputType: "uri_file";
}

export function uriFileJobOutputSerializer(item: UriFileJobOutput): any {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function uriFileJobOutputDeserializer(item: any): UriFileJobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface UriFolderJobOutput */
export interface UriFolderJobOutput extends JobOutput {
  /** Output Asset Name. */
  assetName?: string;
  /** Output data delivery mode enums. */
  mode?: OutputDeliveryMode;
  /** Output Asset URI. */
  uri?: string;
  /** [Required] Specifies the type of job. */
  jobOutputType: "uri_folder";
}

export function uriFolderJobOutputSerializer(item: UriFolderJobOutput): any {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

export function uriFolderJobOutputDeserializer(item: any): UriFolderJobOutput {
  return {
    description: item["description"],
    jobOutputType: item["jobOutputType"],
    assetName: item["assetName"],
    mode: item["mode"],
    uri: item["uri"],
  };
}

/** model interface QueueSettings */
export interface QueueSettings {
  /** Enum to determine the job tier. */
  jobTier?: JobTier;
}

export function queueSettingsSerializer(item: QueueSettings): any {
  return { jobTier: item["jobTier"] };
}

export function queueSettingsDeserializer(item: any): QueueSettings {
  return {
    jobTier: item["jobTier"],
  };
}

/** Enum to determine the job tier. */
export enum KnownJobTier {
  /** Null */
  Null = "Null",
  /** Spot */
  Spot = "Spot",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
}

/**
 * Enum to determine the job tier. \
 * {@link KnownJobTier} can be used interchangeably with JobTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Null** \
 * **Spot** \
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type JobTier = string;

/** model interface JobResourceConfiguration */
export interface JobResourceConfiguration extends ResourceConfiguration {
  /** Extra arguments to pass to the Docker run command. This would override any parameters that have already been set by the system, or in this section. This parameter is only supported for Azure ML compute types. */
  dockerArgs?: string;
  /** Extra arguments to pass to the Docker run command, as a collection. This would override any parameters that have already been set by the system, or in this section. This parameter is only supported for Azure ML compute types. */
  dockerArgsList?: string[];
  /** Size of the docker container's shared memory block. This should be in the format of (number)(unit) where number as to be greater than 0 and the unit can be one of b(bytes), k(kilobytes), m(megabytes), or g(gigabytes). */
  shmSize?: string;
}

export function jobResourceConfigurationSerializer(item: JobResourceConfiguration): any {
  return {
    instanceCount: item["instanceCount"],
    instanceType: item["instanceType"],
    properties: item["properties"],
    dockerArgs: item["dockerArgs"],
    dockerArgsList: !item["dockerArgsList"]
      ? item["dockerArgsList"]
      : item["dockerArgsList"].map((p: any) => {
          return p;
        }),
    shmSize: item["shmSize"],
  };
}

export function jobResourceConfigurationDeserializer(item: any): JobResourceConfiguration {
  return {
    instanceCount: item["instanceCount"],
    instanceType: item["instanceType"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    dockerArgs: item["dockerArgs"],
    dockerArgsList: !item["dockerArgsList"]
      ? item["dockerArgsList"]
      : item["dockerArgsList"].map((p1: any) => {
          return p1;
        }),
    shmSize: item["shmSize"],
  };
}

/**
 * AutoML vertical class.
 * Base class for AutoML verticals - TableVertical/ImageVertical/NLPVertical
 */
export interface AutoMLVertical {
  /** Enum for setting log verbosity. */
  logVerbosity?: LogVerbosity;
  /**
   * Target column name: This is prediction values column.
   * Also known as label column name in context of classification tasks.
   */
  targetColumnName?: string;
  /** [Required] Task type for AutoMLJob. */
  /** The discriminator possible values: Classification, Forecasting, ImageClassification, ImageClassificationMultilabel, ImageInstanceSegmentation, ImageObjectDetection, Regression, TextClassification, TextClassificationMultilabel, TextNER */
  taskType: TaskType;
  /** [Required] Training data input. */
  trainingData: MLTableJobInput;
}

export function autoMLVerticalSerializer(item: AutoMLVertical): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
  };
}

export function autoMLVerticalDeserializer(item: any): AutoMLVertical {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
  };
}

/** Alias for AutoMLVerticalUnion */
export type AutoMLVerticalUnion =
  | Classification
  | Forecasting
  | ImageClassification
  | ImageClassificationMultilabel
  | ImageInstanceSegmentation
  | ImageObjectDetection
  | Regression
  | TextClassification
  | TextClassificationMultilabel
  | TextNer
  | AutoMLVertical;

export function autoMLVerticalUnionSerializer(item: AutoMLVerticalUnion): any {
  switch (item.taskType) {
    case "Classification":
      return classificationSerializer(item as Classification);

    case "Forecasting":
      return forecastingSerializer(item as Forecasting);

    case "ImageClassification":
      return imageClassificationSerializer(item as ImageClassification);

    case "ImageClassificationMultilabel":
      return imageClassificationMultilabelSerializer(item as ImageClassificationMultilabel);

    case "ImageInstanceSegmentation":
      return imageInstanceSegmentationSerializer(item as ImageInstanceSegmentation);

    case "ImageObjectDetection":
      return imageObjectDetectionSerializer(item as ImageObjectDetection);

    case "Regression":
      return regressionSerializer(item as Regression);

    case "TextClassification":
      return textClassificationSerializer(item as TextClassification);

    case "TextClassificationMultilabel":
      return textClassificationMultilabelSerializer(item as TextClassificationMultilabel);

    case "TextNER":
      return textNerSerializer(item as TextNer);

    default:
      return autoMLVerticalSerializer(item);
  }
}

export function autoMLVerticalUnionDeserializer(item: any): AutoMLVerticalUnion {
  switch (item["taskType"]) {
    case "Classification":
      return classificationDeserializer(item as Classification);

    case "Forecasting":
      return forecastingDeserializer(item as Forecasting);

    case "ImageClassification":
      return imageClassificationDeserializer(item as ImageClassification);

    case "ImageClassificationMultilabel":
      return imageClassificationMultilabelDeserializer(item as ImageClassificationMultilabel);

    case "ImageInstanceSegmentation":
      return imageInstanceSegmentationDeserializer(item as ImageInstanceSegmentation);

    case "ImageObjectDetection":
      return imageObjectDetectionDeserializer(item as ImageObjectDetection);

    case "Regression":
      return regressionDeserializer(item as Regression);

    case "TextClassification":
      return textClassificationDeserializer(item as TextClassification);

    case "TextClassificationMultilabel":
      return textClassificationMultilabelDeserializer(item as TextClassificationMultilabel);

    case "TextNER":
      return textNerDeserializer(item as TextNer);

    default:
      return autoMLVerticalDeserializer(item);
  }
}

/** Enum for setting log verbosity. */
export enum KnownLogVerbosity {
  /** No logs emitted. */
  NotSet = "NotSet",
  /** Debug and above log statements logged. */
  Debug = "Debug",
  /** Info and above log statements logged. */
  Info = "Info",
  /** Warning and above log statements logged. */
  Warning = "Warning",
  /** Error and above log statements logged. */
  Error = "Error",
  /** Only critical statements logged. */
  Critical = "Critical",
}

/**
 * Enum for setting log verbosity. \
 * {@link KnownLogVerbosity} can be used interchangeably with LogVerbosity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSet**: No logs emitted. \
 * **Debug**: Debug and above log statements logged. \
 * **Info**: Info and above log statements logged. \
 * **Warning**: Warning and above log statements logged. \
 * **Error**: Error and above log statements logged. \
 * **Critical**: Only critical statements logged.
 */
export type LogVerbosity = string;

/** AutoMLJob Task type. */
export enum KnownTaskType {
  /**
   * Classification in machine learning and statistics is a supervised learning approach in which
   * the computer program learns from the data given to it and make new observations or classifications.
   */
  Classification = "Classification",
  /** Regression means to predict the value using the input data. Regression models are used to predict a continuous value. */
  Regression = "Regression",
  /**
   * Forecasting is a special kind of regression task that deals with time-series data and creates forecasting model
   * that can be used to predict the near future values based on the inputs.
   */
  Forecasting = "Forecasting",
  /**
   * Image Classification. Multi-class image classification is used when an image is classified with only a single label
   * from a set of classes - e.g. each image is classified as either an image of a 'cat' or a 'dog' or a 'duck'.
   */
  ImageClassification = "ImageClassification",
  /**
   * Image Classification Multilabel. Multi-label image classification is used when an image could have one or more labels
   * from a set of labels - e.g. an image could be labeled with both 'cat' and 'dog'.
   */
  ImageClassificationMultilabel = "ImageClassificationMultilabel",
  /**
   * Image Object Detection. Object detection is used to identify objects in an image and locate each object with a
   * bounding box e.g. locate all dogs and cats in an image and draw a bounding box around each.
   */
  ImageObjectDetection = "ImageObjectDetection",
  /**
   * Image Instance Segmentation. Instance segmentation is used to identify objects in an image at the pixel level,
   * drawing a polygon around each object in the image.
   */
  ImageInstanceSegmentation = "ImageInstanceSegmentation",
  /**
   * Text classification (also known as text tagging or text categorization) is the process of sorting texts into categories.
   * Categories are mutually exclusive.
   */
  TextClassification = "TextClassification",
  /** Multilabel classification task assigns each sample to a group (zero or more) of target labels. */
  TextClassificationMultilabel = "TextClassificationMultilabel",
  /**
   * Text Named Entity Recognition a.k.a. TextNER.
   * Named Entity Recognition (NER) is the ability to take free-form text and identify the occurrences of entities such as people, locations, organizations, and more.
   */
  TextNER = "TextNER",
}

/**
 * AutoMLJob Task type. \
 * {@link KnownTaskType} can be used interchangeably with TaskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Classification**: Classification in machine learning and statistics is a supervised learning approach in which
 * the computer program learns from the data given to it and make new observations or classifications. \
 * **Regression**: Regression means to predict the value using the input data. Regression models are used to predict a continuous value. \
 * **Forecasting**: Forecasting is a special kind of regression task that deals with time-series data and creates forecasting model
 * that can be used to predict the near future values based on the inputs. \
 * **ImageClassification**: Image Classification. Multi-class image classification is used when an image is classified with only a single label
 * from a set of classes - e.g. each image is classified as either an image of a 'cat' or a 'dog' or a 'duck'. \
 * **ImageClassificationMultilabel**: Image Classification Multilabel. Multi-label image classification is used when an image could have one or more labels
 * from a set of labels - e.g. an image could be labeled with both 'cat' and 'dog'. \
 * **ImageObjectDetection**: Image Object Detection. Object detection is used to identify objects in an image and locate each object with a
 * bounding box e.g. locate all dogs and cats in an image and draw a bounding box around each. \
 * **ImageInstanceSegmentation**: Image Instance Segmentation. Instance segmentation is used to identify objects in an image at the pixel level,
 * drawing a polygon around each object in the image. \
 * **TextClassification**: Text classification (also known as text tagging or text categorization) is the process of sorting texts into categories.
 * Categories are mutually exclusive. \
 * **TextClassificationMultilabel**: Multilabel classification task assigns each sample to a group (zero or more) of target labels. \
 * **TextNER**: Text Named Entity Recognition a.k.a. TextNER.
 * Named Entity Recognition (NER) is the ability to take free-form text and identify the occurrences of entities such as people, locations, organizations, and more.
 */
export type TaskType = string;

/** Classification task in AutoML Table vertical. */
export interface Classification extends AutoMLVertical {
  /** Columns to use for CVSplit data. */
  cvSplitColumnNames?: string[];
  /** Featurization inputs needed for AutoML job. */
  featurizationSettings?: TableVerticalFeaturizationSettings;
  /** Execution constraints for AutoMLJob. */
  limitSettings?: TableVerticalLimitSettings;
  /**
   * Number of cross validation folds to be applied on training dataset
   * when validation dataset is not provided.
   */
  nCrossValidations?: NCrossValidationsUnion;
  /** Test data input. */
  testData?: MLTableJobInput;
  /**
   * The fraction of test dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  testDataSize?: number;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** The name of the sample weight column. Automated ML supports a weighted column as an input, causing rows in the data to be weighted up or down. */
  weightColumnName?: string;
  /** Positive label for binary metrics calculation. */
  positiveLabel?: string;
  /** Primary metrics for classification tasks. */
  primaryMetric?: ClassificationPrimaryMetrics;
  /** Inputs for training phase for an AutoML Job. */
  trainingSettings?: ClassificationTrainingSettings;
  /** [Required] Task type for AutoMLJob. */
  taskType: "Classification";
}

export function classificationSerializer(item: Classification): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    cvSplitColumnNames: !item["cvSplitColumnNames"]
      ? item["cvSplitColumnNames"]
      : item["cvSplitColumnNames"].map((p: any) => {
          return p;
        }),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : tableVerticalFeaturizationSettingsSerializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : tableVerticalLimitSettingsSerializer(item["limitSettings"]),
    nCrossValidations: !item["nCrossValidations"]
      ? item["nCrossValidations"]
      : nCrossValidationsUnionSerializer(item["nCrossValidations"]),
    testData: !item["testData"] ? item["testData"] : mlTableJobInputSerializer(item["testData"]),
    testDataSize: item["testDataSize"],
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    weightColumnName: item["weightColumnName"],
    positiveLabel: item["positiveLabel"],
    primaryMetric: item["primaryMetric"],
    trainingSettings: !item["trainingSettings"]
      ? item["trainingSettings"]
      : classificationTrainingSettingsSerializer(item["trainingSettings"]),
  };
}

export function classificationDeserializer(item: any): Classification {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    cvSplitColumnNames: !item["cvSplitColumnNames"]
      ? item["cvSplitColumnNames"]
      : item["cvSplitColumnNames"].map((p1: any) => {
          return p1;
        }),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : tableVerticalFeaturizationSettingsDeserializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : tableVerticalLimitSettingsDeserializer(item["limitSettings"]),
    nCrossValidations: !item["nCrossValidations"]
      ? item["nCrossValidations"]
      : nCrossValidationsUnionDeserializer(item["nCrossValidations"]),
    testData: !item["testData"] ? item["testData"] : mlTableJobInputDeserializer(item["testData"]),
    testDataSize: item["testDataSize"],
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    weightColumnName: item["weightColumnName"],
    positiveLabel: item["positiveLabel"],
    primaryMetric: item["primaryMetric"],
    trainingSettings: !item["trainingSettings"]
      ? item["trainingSettings"]
      : classificationTrainingSettingsDeserializer(item["trainingSettings"]),
  };
}

/** Featurization Configuration. */
export interface TableVerticalFeaturizationSettings extends FeaturizationSettings {
  /** These transformers shall not be used in featurization. */
  blockedTransformers?: BlockedTransformers[];
  /** Dictionary of column name and its type (int, float, string, datetime etc). */
  columnNameAndTypes?: Record<string, string>;
  /** Determines whether to use Dnn based featurizers for data featurization. */
  enableDnnFeaturization?: boolean;
  /**
   * Featurization mode - User can keep the default 'Auto' mode and AutoML will take care of necessary transformation of the data in featurization phase.
   * If 'Off' is selected then no featurization is done.
   * If 'Custom' is selected then user can specify additional inputs to customize how featurization is done.
   */
  mode?: FeaturizationMode;
  /** User can specify additional transformers to be used along with the columns to which it would be applied and parameters for the transformer constructor. */
  transformerParams?: Record<string, ColumnTransformer[]>;
}

export function tableVerticalFeaturizationSettingsSerializer(
  item: TableVerticalFeaturizationSettings,
): any {
  return {
    datasetLanguage: item["datasetLanguage"],
    blockedTransformers: !item["blockedTransformers"]
      ? item["blockedTransformers"]
      : item["blockedTransformers"].map((p: any) => {
          return p;
        }),
    columnNameAndTypes: item["columnNameAndTypes"],
    enableDnnFeaturization: item["enableDnnFeaturization"],
    mode: item["mode"],
    transformerParams: item["transformerParams"],
  };
}

export function tableVerticalFeaturizationSettingsDeserializer(
  item: any,
): TableVerticalFeaturizationSettings {
  return {
    datasetLanguage: item["datasetLanguage"],
    blockedTransformers: !item["blockedTransformers"]
      ? item["blockedTransformers"]
      : item["blockedTransformers"].map((p1: any) => {
          return p1;
        }),
    columnNameAndTypes: !item["columnNameAndTypes"]
      ? item["columnNameAndTypes"]
      : Object.fromEntries(
          Object.entries(item["columnNameAndTypes"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    enableDnnFeaturization: item["enableDnnFeaturization"],
    mode: item["mode"],
    transformerParams: !item["transformerParams"]
      ? item["transformerParams"]
      : Object.fromEntries(
          Object.entries(item["transformerParams"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : columnTransformerArrayDeserializer(p1),
          ]),
        ),
  };
}

/** Enum for all classification models supported by AutoML. */
export enum KnownBlockedTransformers {
  /** Target encoding for text data. */
  TextTargetEncoder = "TextTargetEncoder",
  /** Ohe hot encoding creates a binary feature transformation. */
  OneHotEncoder = "OneHotEncoder",
  /** Target encoding for categorical data. */
  CatTargetEncoder = "CatTargetEncoder",
  /** Tf-Idf stands for, term-frequency times inverse document-frequency. This is a common term weighting scheme for identifying information from documents. */
  TfIdf = "TfIdf",
  /** Weight of Evidence encoding is a technique used to encode categorical variables. It uses the natural log of the P(1)/P(0) to create weights. */
  WoETargetEncoder = "WoETargetEncoder",
  /** Label encoder converts labels/categorical variables in a numerical form. */
  LabelEncoder = "LabelEncoder",
  /** Word embedding helps represents words or phrases as a vector, or a series of numbers. */
  WordEmbedding = "WordEmbedding",
  /** Naive Bayes is a classified that is used for classification of discrete features that are categorically distributed. */
  NaiveBayes = "NaiveBayes",
  /** Count Vectorizer converts a collection of text documents to a matrix of token counts. */
  CountVectorizer = "CountVectorizer",
  /** Hashing One Hot Encoder can turn categorical variables into a limited number of new features. This is often used for high-cardinality categorical features. */
  HashOneHotEncoder = "HashOneHotEncoder",
}

/**
 * Enum for all classification models supported by AutoML. \
 * {@link KnownBlockedTransformers} can be used interchangeably with BlockedTransformers,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TextTargetEncoder**: Target encoding for text data. \
 * **OneHotEncoder**: Ohe hot encoding creates a binary feature transformation. \
 * **CatTargetEncoder**: Target encoding for categorical data. \
 * **TfIdf**: Tf-Idf stands for, term-frequency times inverse document-frequency. This is a common term weighting scheme for identifying information from documents. \
 * **WoETargetEncoder**: Weight of Evidence encoding is a technique used to encode categorical variables. It uses the natural log of the P(1)\/P(0) to create weights. \
 * **LabelEncoder**: Label encoder converts labels\/categorical variables in a numerical form. \
 * **WordEmbedding**: Word embedding helps represents words or phrases as a vector, or a series of numbers. \
 * **NaiveBayes**: Naive Bayes is a classified that is used for classification of discrete features that are categorically distributed. \
 * **CountVectorizer**: Count Vectorizer converts a collection of text documents to a matrix of token counts. \
 * **HashOneHotEncoder**: Hashing One Hot Encoder can turn categorical variables into a limited number of new features. This is often used for high-cardinality categorical features.
 */
export type BlockedTransformers = string;

/** Featurization mode - determines data featurization mode. */
export enum KnownFeaturizationMode {
  /** Auto mode, system performs featurization without any custom featurization inputs. */
  Auto = "Auto",
  /** Custom featurization. */
  Custom = "Custom",
  /** Featurization off. 'Forecasting' task cannot use this value. */
  Off = "Off",
}

/**
 * Featurization mode - determines data featurization mode. \
 * {@link KnownFeaturizationMode} can be used interchangeably with FeaturizationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Auto mode, system performs featurization without any custom featurization inputs. \
 * **Custom**: Custom featurization. \
 * **Off**: Featurization off. 'Forecasting' task cannot use this value.
 */
export type FeaturizationMode = string;

export function columnTransformerArraySerializer(result: Array<ColumnTransformer>): any[] {
  return result.map((item) => {
    return columnTransformerSerializer(item);
  });
}

export function columnTransformerArrayDeserializer(result: Array<ColumnTransformer>): any[] {
  return result.map((item) => {
    return columnTransformerDeserializer(item);
  });
}

/** Column transformer parameters. */
export interface ColumnTransformer {
  /** Fields to apply transformer logic on. */
  fields?: string[];
  /**
   * Different properties to be passed to transformer.
   * Input expected is dictionary of key,value pairs in JSON format.
   */
  parameters?: any;
}

export function columnTransformerSerializer(item: ColumnTransformer): any {
  return {
    fields: !item["fields"]
      ? item["fields"]
      : item["fields"].map((p: any) => {
          return p;
        }),
    parameters: item["parameters"],
  };
}

export function columnTransformerDeserializer(item: any): ColumnTransformer {
  return {
    fields: !item["fields"]
      ? item["fields"]
      : item["fields"].map((p1: any) => {
          return p1;
        }),
    parameters: item["parameters"],
  };
}

/** Job execution constraints. */
export interface TableVerticalLimitSettings {
  /** Enable early termination, determines whether or not if AutoMLJob will terminate early if there is no score improvement in last 20 iterations. */
  enableEarlyTermination?: boolean;
  /** Exit score for the AutoML job. */
  exitScore?: number;
  /** Maximum Concurrent iterations. */
  maxConcurrentTrials?: number;
  /** Max cores per iteration. */
  maxCoresPerTrial?: number;
  /** Number of iterations. */
  maxTrials?: number;
  /** AutoML job timeout. */
  timeout?: string;
  /** Iteration timeout. */
  trialTimeout?: string;
}

export function tableVerticalLimitSettingsSerializer(item: TableVerticalLimitSettings): any {
  return {
    enableEarlyTermination: item["enableEarlyTermination"],
    exitScore: item["exitScore"],
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxCoresPerTrial: item["maxCoresPerTrial"],
    maxTrials: item["maxTrials"],
    timeout: item["timeout"],
    trialTimeout: item["trialTimeout"],
  };
}

export function tableVerticalLimitSettingsDeserializer(item: any): TableVerticalLimitSettings {
  return {
    enableEarlyTermination: item["enableEarlyTermination"],
    exitScore: item["exitScore"],
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxCoresPerTrial: item["maxCoresPerTrial"],
    maxTrials: item["maxTrials"],
    timeout: item["timeout"],
    trialTimeout: item["trialTimeout"],
  };
}

/** N-Cross validations value. */
export interface NCrossValidations {
  /** [Required] Mode for determining N-Cross validations. */
  /** The discriminator possible values: Auto, Custom */
  mode: NCrossValidationsMode;
}

export function nCrossValidationsSerializer(item: NCrossValidations): any {
  return { mode: item["mode"] };
}

export function nCrossValidationsDeserializer(item: any): NCrossValidations {
  return {
    mode: item["mode"],
  };
}

/** Alias for NCrossValidationsUnion */
export type NCrossValidationsUnion =
  | AutoNCrossValidations
  | CustomNCrossValidations
  | NCrossValidations;

export function nCrossValidationsUnionSerializer(item: NCrossValidationsUnion): any {
  switch (item.mode) {
    case "Auto":
      return autoNCrossValidationsSerializer(item as AutoNCrossValidations);

    case "Custom":
      return customNCrossValidationsSerializer(item as CustomNCrossValidations);

    default:
      return nCrossValidationsSerializer(item);
  }
}

export function nCrossValidationsUnionDeserializer(item: any): NCrossValidationsUnion {
  switch (item["mode"]) {
    case "Auto":
      return autoNCrossValidationsDeserializer(item as AutoNCrossValidations);

    case "Custom":
      return customNCrossValidationsDeserializer(item as CustomNCrossValidations);

    default:
      return nCrossValidationsDeserializer(item);
  }
}

/** Determines how N-Cross validations value is determined. */
export enum KnownNCrossValidationsMode {
  /** Determine N-Cross validations value automatically. Supported only for 'Forecasting' AutoML task. */
  Auto = "Auto",
  /** Use custom N-Cross validations value. */
  Custom = "Custom",
}

/**
 * Determines how N-Cross validations value is determined. \
 * {@link KnownNCrossValidationsMode} can be used interchangeably with NCrossValidationsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Determine N-Cross validations value automatically. Supported only for 'Forecasting' AutoML task. \
 * **Custom**: Use custom N-Cross validations value.
 */
export type NCrossValidationsMode = string;

/** N-Cross validations determined automatically. */
export interface AutoNCrossValidations extends NCrossValidations {
  /** [Required] Mode for determining N-Cross validations. */
  mode: "Auto";
}

export function autoNCrossValidationsSerializer(item: AutoNCrossValidations): any {
  return { mode: item["mode"] };
}

export function autoNCrossValidationsDeserializer(item: any): AutoNCrossValidations {
  return {
    mode: item["mode"],
  };
}

/** N-Cross validations are specified by user. */
export interface CustomNCrossValidations extends NCrossValidations {
  /** [Required] N-Cross validations value. */
  value: number;
  /** [Required] Mode for determining N-Cross validations. */
  mode: "Custom";
}

export function customNCrossValidationsSerializer(item: CustomNCrossValidations): any {
  return { mode: item["mode"], value: item["value"] };
}

export function customNCrossValidationsDeserializer(item: any): CustomNCrossValidations {
  return {
    mode: item["mode"],
    value: item["value"],
  };
}

/** Primary metrics for classification tasks. */
export enum KnownClassificationPrimaryMetrics {
  /**
   * AUC is the Area under the curve.
   * This metric represents arithmetic mean of the score for each class,
   * weighted by the number of true instances in each class.
   */
  AUCWeighted = "AUCWeighted",
  /** Accuracy is the ratio of predictions that exactly match the true class labels. */
  Accuracy = "Accuracy",
  /**
   * Normalized macro recall is recall macro-averaged and normalized, so that random
   * performance has a score of 0, and perfect performance has a score of 1.
   */
  NormMacroRecall = "NormMacroRecall",
  /**
   * The arithmetic mean of the average precision score for each class, weighted by
   * the number of true instances in each class.
   */
  AveragePrecisionScoreWeighted = "AveragePrecisionScoreWeighted",
  /** The arithmetic mean of precision for each class, weighted by number of true instances in each class. */
  PrecisionScoreWeighted = "PrecisionScoreWeighted",
}

/**
 * Primary metrics for classification tasks. \
 * {@link KnownClassificationPrimaryMetrics} can be used interchangeably with ClassificationPrimaryMetrics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AUCWeighted**: AUC is the Area under the curve.
 * This metric represents arithmetic mean of the score for each class,
 * weighted by the number of true instances in each class. \
 * **Accuracy**: Accuracy is the ratio of predictions that exactly match the true class labels. \
 * **NormMacroRecall**: Normalized macro recall is recall macro-averaged and normalized, so that random
 * performance has a score of 0, and perfect performance has a score of 1. \
 * **AveragePrecisionScoreWeighted**: The arithmetic mean of the average precision score for each class, weighted by
 * the number of true instances in each class. \
 * **PrecisionScoreWeighted**: The arithmetic mean of precision for each class, weighted by number of true instances in each class.
 */
export type ClassificationPrimaryMetrics = string;

/** Classification Training related configuration. */
export interface ClassificationTrainingSettings extends TrainingSettings {
  /** Allowed models for classification task. */
  allowedTrainingAlgorithms?: ClassificationModels[];
  /** Blocked models for classification task. */
  blockedTrainingAlgorithms?: ClassificationModels[];
}

export function classificationTrainingSettingsSerializer(
  item: ClassificationTrainingSettings,
): any {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsSerializer(item["stackEnsembleSettings"]),
    allowedTrainingAlgorithms: !item["allowedTrainingAlgorithms"]
      ? item["allowedTrainingAlgorithms"]
      : item["allowedTrainingAlgorithms"].map((p: any) => {
          return p;
        }),
    blockedTrainingAlgorithms: !item["blockedTrainingAlgorithms"]
      ? item["blockedTrainingAlgorithms"]
      : item["blockedTrainingAlgorithms"].map((p: any) => {
          return p;
        }),
  };
}

export function classificationTrainingSettingsDeserializer(
  item: any,
): ClassificationTrainingSettings {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsDeserializer(item["stackEnsembleSettings"]),
    allowedTrainingAlgorithms: !item["allowedTrainingAlgorithms"]
      ? item["allowedTrainingAlgorithms"]
      : item["allowedTrainingAlgorithms"].map((p1: any) => {
          return p1;
        }),
    blockedTrainingAlgorithms: !item["blockedTrainingAlgorithms"]
      ? item["blockedTrainingAlgorithms"]
      : item["blockedTrainingAlgorithms"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Enum for all classification models supported by AutoML. */
export enum KnownClassificationModels {
  /**
   * Logistic regression is a fundamental classification technique.
   * It belongs to the group of linear classifiers and is somewhat similar to polynomial and linear regression.
   * Logistic regression is fast and relatively uncomplicated, and it's convenient for you to interpret the results.
   * Although it's essentially a method for binary classification, it can also be applied to multiclass problems.
   */
  LogisticRegression = "LogisticRegression",
  /**
   * SGD: Stochastic gradient descent is an optimization algorithm often used in machine learning applications
   * to find the model parameters that correspond to the best fit between predicted and actual outputs.
   */
  SGD = "SGD",
  /**
   * The multinomial Naive Bayes classifier is suitable for classification with discrete features (e.g., word counts for text classification).
   * The multinomial distribution normally requires integer feature counts. However, in practice, fractional counts such as tf-idf may also work.
   */
  MultinomialNaiveBayes = "MultinomialNaiveBayes",
  /** Naive Bayes classifier for multivariate Bernoulli models. */
  BernoulliNaiveBayes = "BernoulliNaiveBayes",
  /**
   * A support vector machine (SVM) is a supervised machine learning model that uses classification algorithms for two-group classification problems.
   * After giving an SVM model sets of labeled training data for each category, they're able to categorize new text.
   */
  SVM = "SVM",
  /**
   * A support vector machine (SVM) is a supervised machine learning model that uses classification algorithms for two-group classification problems.
   * After giving an SVM model sets of labeled training data for each category, they're able to categorize new text.
   * Linear SVM performs best when input data is linear, i.e., data can be easily classified by drawing the straight line between classified values on a plotted graph.
   */
  LinearSVM = "LinearSVM",
  /**
   * K-nearest neighbors (KNN) algorithm uses 'feature similarity' to predict the values of new datapoints
   * which further means that the new data point will be assigned a value based on how closely it matches the points in the training set.
   */
  KNN = "KNN",
  /**
   * Decision Trees are a non-parametric supervised learning method used for both classification and regression tasks.
   * The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.
   */
  DecisionTree = "DecisionTree",
  /**
   * Random forest is a supervised learning algorithm.
   * The "forest" it builds, is an ensemble of decision trees, usually trained with the "bagging" method.
   * The general idea of the bagging method is that a combination of learning models increases the overall result.
   */
  RandomForest = "RandomForest",
  /** Extreme Trees is an ensemble machine learning algorithm that combines the predictions from many decision trees. It is related to the widely used random forest algorithm. */
  ExtremeRandomTrees = "ExtremeRandomTrees",
  /** LightGBM is a gradient boosting framework that uses tree based learning algorithms. */
  LightGBM = "LightGBM",
  /** The technique of transiting week learners into a strong learner is called Boosting. The gradient boosting algorithm process works on this theory of execution. */
  GradientBoosting = "GradientBoosting",
  /** XGBoost: Extreme Gradient Boosting Algorithm. This algorithm is used for structured data where target column values can be divided into distinct class values. */
  XGBoostClassifier = "XGBoostClassifier",
}

/**
 * Enum for all classification models supported by AutoML. \
 * {@link KnownClassificationModels} can be used interchangeably with ClassificationModels,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogisticRegression**: Logistic regression is a fundamental classification technique.
 * It belongs to the group of linear classifiers and is somewhat similar to polynomial and linear regression.
 * Logistic regression is fast and relatively uncomplicated, and it's convenient for you to interpret the results.
 * Although it's essentially a method for binary classification, it can also be applied to multiclass problems. \
 * **SGD**: SGD: Stochastic gradient descent is an optimization algorithm often used in machine learning applications
 * to find the model parameters that correspond to the best fit between predicted and actual outputs. \
 * **MultinomialNaiveBayes**: The multinomial Naive Bayes classifier is suitable for classification with discrete features (e.g., word counts for text classification).
 * The multinomial distribution normally requires integer feature counts. However, in practice, fractional counts such as tf-idf may also work. \
 * **BernoulliNaiveBayes**: Naive Bayes classifier for multivariate Bernoulli models. \
 * **SVM**: A support vector machine (SVM) is a supervised machine learning model that uses classification algorithms for two-group classification problems.
 * After giving an SVM model sets of labeled training data for each category, they're able to categorize new text. \
 * **LinearSVM**: A support vector machine (SVM) is a supervised machine learning model that uses classification algorithms for two-group classification problems.
 * After giving an SVM model sets of labeled training data for each category, they're able to categorize new text.
 * Linear SVM performs best when input data is linear, i.e., data can be easily classified by drawing the straight line between classified values on a plotted graph. \
 * **KNN**: K-nearest neighbors (KNN) algorithm uses 'feature similarity' to predict the values of new datapoints
 * which further means that the new data point will be assigned a value based on how closely it matches the points in the training set. \
 * **DecisionTree**: Decision Trees are a non-parametric supervised learning method used for both classification and regression tasks.
 * The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features. \
 * **RandomForest**: Random forest is a supervised learning algorithm.
 * The "forest" it builds, is an ensemble of decision trees, usually trained with the "bagging" method.
 * The general idea of the bagging method is that a combination of learning models increases the overall result. \
 * **ExtremeRandomTrees**: Extreme Trees is an ensemble machine learning algorithm that combines the predictions from many decision trees. It is related to the widely used random forest algorithm. \
 * **LightGBM**: LightGBM is a gradient boosting framework that uses tree based learning algorithms. \
 * **GradientBoosting**: The technique of transiting week learners into a strong learner is called Boosting. The gradient boosting algorithm process works on this theory of execution. \
 * **XGBoostClassifier**: XGBoost: Extreme Gradient Boosting Algorithm. This algorithm is used for structured data where target column values can be divided into distinct class values.
 */
export type ClassificationModels = string;

/** Forecasting task in AutoML Table vertical. */
export interface Forecasting extends AutoMLVertical {
  /** Columns to use for CVSplit data. */
  cvSplitColumnNames?: string[];
  /** Featurization inputs needed for AutoML job. */
  featurizationSettings?: TableVerticalFeaturizationSettings;
  /** Execution constraints for AutoMLJob. */
  limitSettings?: TableVerticalLimitSettings;
  /**
   * Number of cross validation folds to be applied on training dataset
   * when validation dataset is not provided.
   */
  nCrossValidations?: NCrossValidationsUnion;
  /** Test data input. */
  testData?: MLTableJobInput;
  /**
   * The fraction of test dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  testDataSize?: number;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** The name of the sample weight column. Automated ML supports a weighted column as an input, causing rows in the data to be weighted up or down. */
  weightColumnName?: string;
  /** Forecasting task specific inputs. */
  forecastingSettings?: ForecastingSettings;
  /** Primary metrics for Forecasting task. */
  primaryMetric?: ForecastingPrimaryMetrics;
  /** Inputs for training phase for an AutoML Job. */
  trainingSettings?: ForecastingTrainingSettings;
  /** [Required] Task type for AutoMLJob. */
  taskType: "Forecasting";
}

export function forecastingSerializer(item: Forecasting): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    cvSplitColumnNames: !item["cvSplitColumnNames"]
      ? item["cvSplitColumnNames"]
      : item["cvSplitColumnNames"].map((p: any) => {
          return p;
        }),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : tableVerticalFeaturizationSettingsSerializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : tableVerticalLimitSettingsSerializer(item["limitSettings"]),
    nCrossValidations: !item["nCrossValidations"]
      ? item["nCrossValidations"]
      : nCrossValidationsUnionSerializer(item["nCrossValidations"]),
    testData: !item["testData"] ? item["testData"] : mlTableJobInputSerializer(item["testData"]),
    testDataSize: item["testDataSize"],
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    weightColumnName: item["weightColumnName"],
    forecastingSettings: !item["forecastingSettings"]
      ? item["forecastingSettings"]
      : forecastingSettingsSerializer(item["forecastingSettings"]),
    primaryMetric: item["primaryMetric"],
    trainingSettings: !item["trainingSettings"]
      ? item["trainingSettings"]
      : forecastingTrainingSettingsSerializer(item["trainingSettings"]),
  };
}

export function forecastingDeserializer(item: any): Forecasting {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    cvSplitColumnNames: !item["cvSplitColumnNames"]
      ? item["cvSplitColumnNames"]
      : item["cvSplitColumnNames"].map((p1: any) => {
          return p1;
        }),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : tableVerticalFeaturizationSettingsDeserializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : tableVerticalLimitSettingsDeserializer(item["limitSettings"]),
    nCrossValidations: !item["nCrossValidations"]
      ? item["nCrossValidations"]
      : nCrossValidationsUnionDeserializer(item["nCrossValidations"]),
    testData: !item["testData"] ? item["testData"] : mlTableJobInputDeserializer(item["testData"]),
    testDataSize: item["testDataSize"],
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    weightColumnName: item["weightColumnName"],
    forecastingSettings: !item["forecastingSettings"]
      ? item["forecastingSettings"]
      : forecastingSettingsDeserializer(item["forecastingSettings"]),
    primaryMetric: item["primaryMetric"],
    trainingSettings: !item["trainingSettings"]
      ? item["trainingSettings"]
      : forecastingTrainingSettingsDeserializer(item["trainingSettings"]),
  };
}

/** Forecasting specific parameters. */
export interface ForecastingSettings {
  /**
   * Country or region for holidays for forecasting tasks.
   * These should be ISO 3166 two-letter country/region codes, for example 'US' or 'GB'.
   */
  countryOrRegionForHolidays?: string;
  /**
   * Number of periods between the origin time of one CV fold and the next fold. For
   * example, if `CVStepSize` = 3 for daily data, the origin time for each fold will be
   * three days apart.
   */
  cvStepSize?: number;
  /** Flag for generating lags for the numeric features. */
  featureLags?: FeatureLags;
  /** The desired maximum forecast horizon in units of time-series frequency. */
  forecastHorizon?: ForecastHorizonUnion;
  /** When forecasting, this parameter represents the period with which the forecast is desired, for example daily, weekly, yearly, etc. The forecast frequency is dataset frequency by default. */
  frequency?: string;
  /**
   * Set time series seasonality as an integer multiple of the series frequency.
   * If seasonality is set to 'auto', it will be inferred.
   */
  seasonality?: SeasonalityUnion;
  /** The parameter defining how if AutoML should handle short time series. */
  shortSeriesHandlingConfig?: ShortSeriesHandlingConfiguration;
  /** Target aggregate function. */
  targetAggregateFunction?: TargetAggregationFunction;
  /** The number of past periods to lag from the target column. */
  targetLags?: TargetLagsUnion;
  /** The number of past periods used to create a rolling window average of the target column. */
  targetRollingWindowSize?: TargetRollingWindowSizeUnion;
  /** The name of the time column. This parameter is required when forecasting to specify the datetime column in the input data used for building the time series and inferring its frequency. */
  timeColumnName?: string;
  /**
   * The names of columns used to group a timeseries. It can be used to create multiple series.
   * If grain is not defined, the data set is assumed to be one time-series. This parameter is used with task type forecasting.
   */
  timeSeriesIdColumnNames?: string[];
  /** Configure STL Decomposition of the time-series target column. */
  useStl?: UseStl;
}

export function forecastingSettingsSerializer(item: ForecastingSettings): any {
  return {
    countryOrRegionForHolidays: item["countryOrRegionForHolidays"],
    cvStepSize: item["cvStepSize"],
    featureLags: item["featureLags"],
    forecastHorizon: !item["forecastHorizon"]
      ? item["forecastHorizon"]
      : forecastHorizonUnionSerializer(item["forecastHorizon"]),
    frequency: item["frequency"],
    seasonality: !item["seasonality"]
      ? item["seasonality"]
      : seasonalityUnionSerializer(item["seasonality"]),
    shortSeriesHandlingConfig: item["shortSeriesHandlingConfig"],
    targetAggregateFunction: item["targetAggregateFunction"],
    targetLags: !item["targetLags"]
      ? item["targetLags"]
      : targetLagsUnionSerializer(item["targetLags"]),
    targetRollingWindowSize: !item["targetRollingWindowSize"]
      ? item["targetRollingWindowSize"]
      : targetRollingWindowSizeUnionSerializer(item["targetRollingWindowSize"]),
    timeColumnName: item["timeColumnName"],
    timeSeriesIdColumnNames: !item["timeSeriesIdColumnNames"]
      ? item["timeSeriesIdColumnNames"]
      : item["timeSeriesIdColumnNames"].map((p: any) => {
          return p;
        }),
    useStl: item["useStl"],
  };
}

export function forecastingSettingsDeserializer(item: any): ForecastingSettings {
  return {
    countryOrRegionForHolidays: item["countryOrRegionForHolidays"],
    cvStepSize: item["cvStepSize"],
    featureLags: item["featureLags"],
    forecastHorizon: !item["forecastHorizon"]
      ? item["forecastHorizon"]
      : forecastHorizonUnionDeserializer(item["forecastHorizon"]),
    frequency: item["frequency"],
    seasonality: !item["seasonality"]
      ? item["seasonality"]
      : seasonalityUnionDeserializer(item["seasonality"]),
    shortSeriesHandlingConfig: item["shortSeriesHandlingConfig"],
    targetAggregateFunction: item["targetAggregateFunction"],
    targetLags: !item["targetLags"]
      ? item["targetLags"]
      : targetLagsUnionDeserializer(item["targetLags"]),
    targetRollingWindowSize: !item["targetRollingWindowSize"]
      ? item["targetRollingWindowSize"]
      : targetRollingWindowSizeUnionDeserializer(item["targetRollingWindowSize"]),
    timeColumnName: item["timeColumnName"],
    timeSeriesIdColumnNames: !item["timeSeriesIdColumnNames"]
      ? item["timeSeriesIdColumnNames"]
      : item["timeSeriesIdColumnNames"].map((p1: any) => {
          return p1;
        }),
    useStl: item["useStl"],
  };
}

/** Flag for generating lags for the numeric features. */
export enum KnownFeatureLags {
  /** No feature lags generated. */
  None = "None",
  /** System auto-generates feature lags. */
  Auto = "Auto",
}

/**
 * Flag for generating lags for the numeric features. \
 * {@link KnownFeatureLags} can be used interchangeably with FeatureLags,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No feature lags generated. \
 * **Auto**: System auto-generates feature lags.
 */
export type FeatureLags = string;

/** The desired maximum forecast horizon in units of time-series frequency. */
export interface ForecastHorizon {
  /** [Required] Set forecast horizon value selection mode. */
  /** The discriminator possible values: Auto, Custom */
  mode: ForecastHorizonMode;
}

export function forecastHorizonSerializer(item: ForecastHorizon): any {
  return { mode: item["mode"] };
}

export function forecastHorizonDeserializer(item: any): ForecastHorizon {
  return {
    mode: item["mode"],
  };
}

/** Alias for ForecastHorizonUnion */
export type ForecastHorizonUnion = AutoForecastHorizon | CustomForecastHorizon | ForecastHorizon;

export function forecastHorizonUnionSerializer(item: ForecastHorizonUnion): any {
  switch (item.mode) {
    case "Auto":
      return autoForecastHorizonSerializer(item as AutoForecastHorizon);

    case "Custom":
      return customForecastHorizonSerializer(item as CustomForecastHorizon);

    default:
      return forecastHorizonSerializer(item);
  }
}

export function forecastHorizonUnionDeserializer(item: any): ForecastHorizonUnion {
  switch (item["mode"]) {
    case "Auto":
      return autoForecastHorizonDeserializer(item as AutoForecastHorizon);

    case "Custom":
      return customForecastHorizonDeserializer(item as CustomForecastHorizon);

    default:
      return forecastHorizonDeserializer(item);
  }
}

/** Enum to determine forecast horizon selection mode. */
export enum KnownForecastHorizonMode {
  /** Forecast horizon to be determined automatically. */
  Auto = "Auto",
  /** Use the custom forecast horizon. */
  Custom = "Custom",
}

/**
 * Enum to determine forecast horizon selection mode. \
 * {@link KnownForecastHorizonMode} can be used interchangeably with ForecastHorizonMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Forecast horizon to be determined automatically. \
 * **Custom**: Use the custom forecast horizon.
 */
export type ForecastHorizonMode = string;

/** Forecast horizon determined automatically by system. */
export interface AutoForecastHorizon extends ForecastHorizon {
  /** [Required] Set forecast horizon value selection mode. */
  mode: "Auto";
}

export function autoForecastHorizonSerializer(item: AutoForecastHorizon): any {
  return { mode: item["mode"] };
}

export function autoForecastHorizonDeserializer(item: any): AutoForecastHorizon {
  return {
    mode: item["mode"],
  };
}

/** The desired maximum forecast horizon in units of time-series frequency. */
export interface CustomForecastHorizon extends ForecastHorizon {
  /** [Required] Forecast horizon value. */
  value: number;
  /** [Required] Set forecast horizon value selection mode. */
  mode: "Custom";
}

export function customForecastHorizonSerializer(item: CustomForecastHorizon): any {
  return { mode: item["mode"], value: item["value"] };
}

export function customForecastHorizonDeserializer(item: any): CustomForecastHorizon {
  return {
    mode: item["mode"],
    value: item["value"],
  };
}

/** Forecasting seasonality. */
export interface Seasonality {
  /** [Required] Seasonality mode. */
  /** The discriminator possible values: Auto, Custom */
  mode: SeasonalityMode;
}

export function seasonalitySerializer(item: Seasonality): any {
  return { mode: item["mode"] };
}

export function seasonalityDeserializer(item: any): Seasonality {
  return {
    mode: item["mode"],
  };
}

/** Alias for SeasonalityUnion */
export type SeasonalityUnion = AutoSeasonality | CustomSeasonality | Seasonality;

export function seasonalityUnionSerializer(item: SeasonalityUnion): any {
  switch (item.mode) {
    case "Auto":
      return autoSeasonalitySerializer(item as AutoSeasonality);

    case "Custom":
      return customSeasonalitySerializer(item as CustomSeasonality);

    default:
      return seasonalitySerializer(item);
  }
}

export function seasonalityUnionDeserializer(item: any): SeasonalityUnion {
  switch (item["mode"]) {
    case "Auto":
      return autoSeasonalityDeserializer(item as AutoSeasonality);

    case "Custom":
      return customSeasonalityDeserializer(item as CustomSeasonality);

    default:
      return seasonalityDeserializer(item);
  }
}

/** Forecasting seasonality mode. */
export enum KnownSeasonalityMode {
  /** Seasonality to be determined automatically. */
  Auto = "Auto",
  /** Use the custom seasonality value. */
  Custom = "Custom",
}

/**
 * Forecasting seasonality mode. \
 * {@link KnownSeasonalityMode} can be used interchangeably with SeasonalityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Seasonality to be determined automatically. \
 * **Custom**: Use the custom seasonality value.
 */
export type SeasonalityMode = string;

/** model interface AutoSeasonality */
export interface AutoSeasonality extends Seasonality {
  /** [Required] Seasonality mode. */
  mode: "Auto";
}

export function autoSeasonalitySerializer(item: AutoSeasonality): any {
  return { mode: item["mode"] };
}

export function autoSeasonalityDeserializer(item: any): AutoSeasonality {
  return {
    mode: item["mode"],
  };
}

/** model interface CustomSeasonality */
export interface CustomSeasonality extends Seasonality {
  /** [Required] Seasonality value. */
  value: number;
  /** [Required] Seasonality mode. */
  mode: "Custom";
}

export function customSeasonalitySerializer(item: CustomSeasonality): any {
  return { mode: item["mode"], value: item["value"] };
}

export function customSeasonalityDeserializer(item: any): CustomSeasonality {
  return {
    mode: item["mode"],
    value: item["value"],
  };
}

/** The parameter defining how if AutoML should handle short time series. */
export enum KnownShortSeriesHandlingConfiguration {
  /** Represents no/null value. */
  None = "None",
  /** Short series will be padded if there are no long series, otherwise short series will be dropped. */
  Auto = "Auto",
  /** All the short series will be padded. */
  Pad = "Pad",
  /** All the short series will be dropped. */
  Drop = "Drop",
}

/**
 * The parameter defining how if AutoML should handle short time series. \
 * {@link KnownShortSeriesHandlingConfiguration} can be used interchangeably with ShortSeriesHandlingConfiguration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Represents no\/null value. \
 * **Auto**: Short series will be padded if there are no long series, otherwise short series will be dropped. \
 * **Pad**: All the short series will be padded. \
 * **Drop**: All the short series will be dropped.
 */
export type ShortSeriesHandlingConfiguration = string;

/** Target aggregate function. */
export enum KnownTargetAggregationFunction {
  /** Represent no value set. */
  None = "None",
  /** Sum */
  Sum = "Sum",
  /** Max */
  Max = "Max",
  /** Min */
  Min = "Min",
  /** Mean */
  Mean = "Mean",
}

/**
 * Target aggregate function. \
 * {@link KnownTargetAggregationFunction} can be used interchangeably with TargetAggregationFunction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Represent no value set. \
 * **Sum** \
 * **Max** \
 * **Min** \
 * **Mean**
 */
export type TargetAggregationFunction = string;

/** The number of past periods to lag from the target column. */
export interface TargetLags {
  /** [Required] Set target lags mode - Auto/Custom */
  /** The discriminator possible values: Auto, Custom */
  mode: TargetLagsMode;
}

export function targetLagsSerializer(item: TargetLags): any {
  return { mode: item["mode"] };
}

export function targetLagsDeserializer(item: any): TargetLags {
  return {
    mode: item["mode"],
  };
}

/** Alias for TargetLagsUnion */
export type TargetLagsUnion = AutoTargetLags | CustomTargetLags | TargetLags;

export function targetLagsUnionSerializer(item: TargetLagsUnion): any {
  switch (item.mode) {
    case "Auto":
      return autoTargetLagsSerializer(item as AutoTargetLags);

    case "Custom":
      return customTargetLagsSerializer(item as CustomTargetLags);

    default:
      return targetLagsSerializer(item);
  }
}

export function targetLagsUnionDeserializer(item: any): TargetLagsUnion {
  switch (item["mode"]) {
    case "Auto":
      return autoTargetLagsDeserializer(item as AutoTargetLags);

    case "Custom":
      return customTargetLagsDeserializer(item as CustomTargetLags);

    default:
      return targetLagsDeserializer(item);
  }
}

/** Target lags selection modes. */
export enum KnownTargetLagsMode {
  /** Target lags to be determined automatically. */
  Auto = "Auto",
  /** Use the custom target lags. */
  Custom = "Custom",
}

/**
 * Target lags selection modes. \
 * {@link KnownTargetLagsMode} can be used interchangeably with TargetLagsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Target lags to be determined automatically. \
 * **Custom**: Use the custom target lags.
 */
export type TargetLagsMode = string;

/** model interface AutoTargetLags */
export interface AutoTargetLags extends TargetLags {
  /** [Required] Set target lags mode - Auto/Custom */
  mode: "Auto";
}

export function autoTargetLagsSerializer(item: AutoTargetLags): any {
  return { mode: item["mode"] };
}

export function autoTargetLagsDeserializer(item: any): AutoTargetLags {
  return {
    mode: item["mode"],
  };
}

/** model interface CustomTargetLags */
export interface CustomTargetLags extends TargetLags {
  /** [Required] Set target lags values. */
  values: number[];
  /** [Required] Set target lags mode - Auto/Custom */
  mode: "Custom";
}

export function customTargetLagsSerializer(item: CustomTargetLags): any {
  return {
    mode: item["mode"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

export function customTargetLagsDeserializer(item: any): CustomTargetLags {
  return {
    mode: item["mode"],
    values: item["values"].map((p: any) => {
      return p;
    }),
  };
}

/** Forecasting target rolling window size. */
export interface TargetRollingWindowSize {
  /** [Required] TargetRollingWindowSiz detection mode. */
  /** The discriminator possible values: Auto, Custom */
  mode: TargetRollingWindowSizeMode;
}

export function targetRollingWindowSizeSerializer(item: TargetRollingWindowSize): any {
  return { mode: item["mode"] };
}

export function targetRollingWindowSizeDeserializer(item: any): TargetRollingWindowSize {
  return {
    mode: item["mode"],
  };
}

/** Alias for TargetRollingWindowSizeUnion */
export type TargetRollingWindowSizeUnion =
  | AutoTargetRollingWindowSize
  | CustomTargetRollingWindowSize
  | TargetRollingWindowSize;

export function targetRollingWindowSizeUnionSerializer(item: TargetRollingWindowSizeUnion): any {
  switch (item.mode) {
    case "Auto":
      return autoTargetRollingWindowSizeSerializer(item as AutoTargetRollingWindowSize);

    case "Custom":
      return customTargetRollingWindowSizeSerializer(item as CustomTargetRollingWindowSize);

    default:
      return targetRollingWindowSizeSerializer(item);
  }
}

export function targetRollingWindowSizeUnionDeserializer(item: any): TargetRollingWindowSizeUnion {
  switch (item["mode"]) {
    case "Auto":
      return autoTargetRollingWindowSizeDeserializer(item as AutoTargetRollingWindowSize);

    case "Custom":
      return customTargetRollingWindowSizeDeserializer(item as CustomTargetRollingWindowSize);

    default:
      return targetRollingWindowSizeDeserializer(item);
  }
}

/** Target rolling windows size mode. */
export enum KnownTargetRollingWindowSizeMode {
  /** Determine rolling windows size automatically. */
  Auto = "Auto",
  /** Use the specified rolling window size. */
  Custom = "Custom",
}

/**
 * Target rolling windows size mode. \
 * {@link KnownTargetRollingWindowSizeMode} can be used interchangeably with TargetRollingWindowSizeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Determine rolling windows size automatically. \
 * **Custom**: Use the specified rolling window size.
 */
export type TargetRollingWindowSizeMode = string;

/** Target lags rolling window determined automatically. */
export interface AutoTargetRollingWindowSize extends TargetRollingWindowSize {
  /** [Required] TargetRollingWindowSiz detection mode. */
  mode: "Auto";
}

export function autoTargetRollingWindowSizeSerializer(item: AutoTargetRollingWindowSize): any {
  return { mode: item["mode"] };
}

export function autoTargetRollingWindowSizeDeserializer(item: any): AutoTargetRollingWindowSize {
  return {
    mode: item["mode"],
  };
}

/** model interface CustomTargetRollingWindowSize */
export interface CustomTargetRollingWindowSize extends TargetRollingWindowSize {
  /** [Required] TargetRollingWindowSize value. */
  value: number;
  /** [Required] TargetRollingWindowSiz detection mode. */
  mode: "Custom";
}

export function customTargetRollingWindowSizeSerializer(item: CustomTargetRollingWindowSize): any {
  return { mode: item["mode"], value: item["value"] };
}

export function customTargetRollingWindowSizeDeserializer(
  item: any,
): CustomTargetRollingWindowSize {
  return {
    mode: item["mode"],
    value: item["value"],
  };
}

/** Configure STL Decomposition of the time-series target column. */
export enum KnownUseStl {
  /** No stl decomposition. */
  None = "None",
  /** Season */
  Season = "Season",
  /** SeasonTrend */
  SeasonTrend = "SeasonTrend",
}

/**
 * Configure STL Decomposition of the time-series target column. \
 * {@link KnownUseStl} can be used interchangeably with UseStl,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No stl decomposition. \
 * **Season** \
 * **SeasonTrend**
 */
export type UseStl = string;

/** Primary metrics for Forecasting task. */
export enum KnownForecastingPrimaryMetrics {
  /** The Spearman's rank coefficient of correlation is a non-parametric measure of rank correlation. */
  SpearmanCorrelation = "SpearmanCorrelation",
  /** The Normalized Root Mean Squared Error (NRMSE) the RMSE facilitates the comparison between models with different scales. */
  NormalizedRootMeanSquaredError = "NormalizedRootMeanSquaredError",
  /** The R2 score is one of the performance evaluation measures for forecasting-based machine learning models. */
  R2Score = "R2Score",
  /** The Normalized Mean Absolute Error (NMAE) is a validation metric to compare the Mean Absolute Error (MAE) of (time) series with different scales. */
  NormalizedMeanAbsoluteError = "NormalizedMeanAbsoluteError",
}

/**
 * Primary metrics for Forecasting task. \
 * {@link KnownForecastingPrimaryMetrics} can be used interchangeably with ForecastingPrimaryMetrics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SpearmanCorrelation**: The Spearman's rank coefficient of correlation is a non-parametric measure of rank correlation. \
 * **NormalizedRootMeanSquaredError**: The Normalized Root Mean Squared Error (NRMSE) the RMSE facilitates the comparison between models with different scales. \
 * **R2Score**: The R2 score is one of the performance evaluation measures for forecasting-based machine learning models. \
 * **NormalizedMeanAbsoluteError**: The Normalized Mean Absolute Error (NMAE) is a validation metric to compare the Mean Absolute Error (MAE) of (time) series with different scales.
 */
export type ForecastingPrimaryMetrics = string;

/** Forecasting Training related configuration. */
export interface ForecastingTrainingSettings extends TrainingSettings {
  /** Allowed models for forecasting task. */
  allowedTrainingAlgorithms?: ForecastingModels[];
  /** Blocked models for forecasting task. */
  blockedTrainingAlgorithms?: ForecastingModels[];
}

export function forecastingTrainingSettingsSerializer(item: ForecastingTrainingSettings): any {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsSerializer(item["stackEnsembleSettings"]),
    allowedTrainingAlgorithms: !item["allowedTrainingAlgorithms"]
      ? item["allowedTrainingAlgorithms"]
      : item["allowedTrainingAlgorithms"].map((p: any) => {
          return p;
        }),
    blockedTrainingAlgorithms: !item["blockedTrainingAlgorithms"]
      ? item["blockedTrainingAlgorithms"]
      : item["blockedTrainingAlgorithms"].map((p: any) => {
          return p;
        }),
  };
}

export function forecastingTrainingSettingsDeserializer(item: any): ForecastingTrainingSettings {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsDeserializer(item["stackEnsembleSettings"]),
    allowedTrainingAlgorithms: !item["allowedTrainingAlgorithms"]
      ? item["allowedTrainingAlgorithms"]
      : item["allowedTrainingAlgorithms"].map((p1: any) => {
          return p1;
        }),
    blockedTrainingAlgorithms: !item["blockedTrainingAlgorithms"]
      ? item["blockedTrainingAlgorithms"]
      : item["blockedTrainingAlgorithms"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Enum for all forecasting models supported by AutoML. */
export enum KnownForecastingModels {
  /**
   * Auto-Autoregressive Integrated Moving Average (ARIMA) model uses time-series data and statistical analysis to interpret the data and make future predictions.
   * This model aims to explain data by using time series data on its past values and uses linear regression to make predictions.
   */
  AutoArima = "AutoArima",
  /**
   * Prophet is a procedure for forecasting time series data based on an additive model where non-linear trends are fit with yearly, weekly, and daily seasonality, plus holiday effects.
   * It works best with time series that have strong seasonal effects and several seasons of historical data. Prophet is robust to missing data and shifts in the trend, and typically handles outliers well.
   */
  Prophet = "Prophet",
  /** The Naive forecasting model makes predictions by carrying forward the latest target value for each time-series in the training data. */
  Naive = "Naive",
  /** The Seasonal Naive forecasting model makes predictions by carrying forward the latest season of target values for each time-series in the training data. */
  SeasonalNaive = "SeasonalNaive",
  /** The Average forecasting model makes predictions by carrying forward the average of the target values for each time-series in the training data. */
  Average = "Average",
  /** The Seasonal Average forecasting model makes predictions by carrying forward the average value of the latest season of data for each time-series in the training data. */
  SeasonalAverage = "SeasonalAverage",
  /** Exponential smoothing is a time series forecasting method for univariate data that can be extended to support data with a systematic trend or seasonal component. */
  ExponentialSmoothing = "ExponentialSmoothing",
  /**
   * An Autoregressive Integrated Moving Average with Explanatory Variable (ARIMAX) model can be viewed as a multiple regression model with one or more autoregressive (AR) terms and/or one or more moving average (MA) terms.
   * This method is suitable for forecasting when data is stationary/non stationary, and multivariate with any type of data pattern, i.e., level/trend /seasonality/cyclicity.
   */
  Arimax = "Arimax",
  /** TCNForecaster: Temporal Convolutional Networks Forecaster. //TODO: Ask forecasting team for brief intro. */
  TCNForecaster = "TCNForecaster",
  /** Elastic net is a popular type of regularized linear regression that combines two popular penalties, specifically the L1 and L2 penalty functions. */
  ElasticNet = "ElasticNet",
  /** The technique of transiting week learners into a strong learner is called Boosting. The gradient boosting algorithm process works on this theory of execution. */
  GradientBoosting = "GradientBoosting",
  /**
   * Decision Trees are a non-parametric supervised learning method used for both classification and regression tasks.
   * The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.
   */
  DecisionTree = "DecisionTree",
  /**
   * K-nearest neighbors (KNN) algorithm uses 'feature similarity' to predict the values of new datapoints
   * which further means that the new data point will be assigned a value based on how closely it matches the points in the training set.
   */
  KNN = "KNN",
  /** Lasso model fit with Least Angle Regression a.k.a. Lars. It is a Linear Model trained with an L1 prior as regularizer. */
  LassoLars = "LassoLars",
  /**
   * SGD: Stochastic gradient descent is an optimization algorithm often used in machine learning applications
   * to find the model parameters that correspond to the best fit between predicted and actual outputs.
   * It's an inexact but powerful technique.
   */
  SGD = "SGD",
  /**
   * Random forest is a supervised learning algorithm.
   * The "forest" it builds, is an ensemble of decision trees, usually trained with the "bagging" method.
   * The general idea of the bagging method is that a combination of learning models increases the overall result.
   */
  RandomForest = "RandomForest",
  /** Extreme Trees is an ensemble machine learning algorithm that combines the predictions from many decision trees. It is related to the widely used random forest algorithm. */
  ExtremeRandomTrees = "ExtremeRandomTrees",
  /** LightGBM is a gradient boosting framework that uses tree based learning algorithms. */
  LightGBM = "LightGBM",
  /** XGBoostRegressor: Extreme Gradient Boosting Regressor is a supervised machine learning model using ensemble of base learners. */
  XGBoostRegressor = "XGBoostRegressor",
}

/**
 * Enum for all forecasting models supported by AutoML. \
 * {@link KnownForecastingModels} can be used interchangeably with ForecastingModels,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoArima**: Auto-Autoregressive Integrated Moving Average (ARIMA) model uses time-series data and statistical analysis to interpret the data and make future predictions.
 * This model aims to explain data by using time series data on its past values and uses linear regression to make predictions. \
 * **Prophet**: Prophet is a procedure for forecasting time series data based on an additive model where non-linear trends are fit with yearly, weekly, and daily seasonality, plus holiday effects.
 * It works best with time series that have strong seasonal effects and several seasons of historical data. Prophet is robust to missing data and shifts in the trend, and typically handles outliers well. \
 * **Naive**: The Naive forecasting model makes predictions by carrying forward the latest target value for each time-series in the training data. \
 * **SeasonalNaive**: The Seasonal Naive forecasting model makes predictions by carrying forward the latest season of target values for each time-series in the training data. \
 * **Average**: The Average forecasting model makes predictions by carrying forward the average of the target values for each time-series in the training data. \
 * **SeasonalAverage**: The Seasonal Average forecasting model makes predictions by carrying forward the average value of the latest season of data for each time-series in the training data. \
 * **ExponentialSmoothing**: Exponential smoothing is a time series forecasting method for univariate data that can be extended to support data with a systematic trend or seasonal component. \
 * **Arimax**: An Autoregressive Integrated Moving Average with Explanatory Variable (ARIMAX) model can be viewed as a multiple regression model with one or more autoregressive (AR) terms and\/or one or more moving average (MA) terms.
 * This method is suitable for forecasting when data is stationary\/non stationary, and multivariate with any type of data pattern, i.e., level\/trend \/seasonality\/cyclicity. \
 * **TCNForecaster**: TCNForecaster: Temporal Convolutional Networks Forecaster. \//TODO: Ask forecasting team for brief intro. \
 * **ElasticNet**: Elastic net is a popular type of regularized linear regression that combines two popular penalties, specifically the L1 and L2 penalty functions. \
 * **GradientBoosting**: The technique of transiting week learners into a strong learner is called Boosting. The gradient boosting algorithm process works on this theory of execution. \
 * **DecisionTree**: Decision Trees are a non-parametric supervised learning method used for both classification and regression tasks.
 * The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features. \
 * **KNN**: K-nearest neighbors (KNN) algorithm uses 'feature similarity' to predict the values of new datapoints
 * which further means that the new data point will be assigned a value based on how closely it matches the points in the training set. \
 * **LassoLars**: Lasso model fit with Least Angle Regression a.k.a. Lars. It is a Linear Model trained with an L1 prior as regularizer. \
 * **SGD**: SGD: Stochastic gradient descent is an optimization algorithm often used in machine learning applications
 * to find the model parameters that correspond to the best fit between predicted and actual outputs.
 * It's an inexact but powerful technique. \
 * **RandomForest**: Random forest is a supervised learning algorithm.
 * The "forest" it builds, is an ensemble of decision trees, usually trained with the "bagging" method.
 * The general idea of the bagging method is that a combination of learning models increases the overall result. \
 * **ExtremeRandomTrees**: Extreme Trees is an ensemble machine learning algorithm that combines the predictions from many decision trees. It is related to the widely used random forest algorithm. \
 * **LightGBM**: LightGBM is a gradient boosting framework that uses tree based learning algorithms. \
 * **XGBoostRegressor**: XGBoostRegressor: Extreme Gradient Boosting Regressor is a supervised machine learning model using ensemble of base learners.
 */
export type ForecastingModels = string;

/**
 * Image Classification. Multi-class image classification is used when an image is classified with only a single label
 * from a set of classes - e.g. each image is classified as either an image of a 'cat' or a 'dog' or a 'duck'.
 */
export interface ImageClassification extends AutoMLVertical {
  /** Settings used for training the model. */
  modelSettings?: ImageModelSettingsClassification;
  /** Search space for sampling different combinations of models and their hyperparameters. */
  searchSpace?: ImageModelDistributionSettingsClassification[];
  /** [Required] Limit settings for the AutoML job. */
  limitSettings: ImageLimitSettings;
  /** Model sweeping and hyperparameter sweeping related settings. */
  sweepSettings?: ImageSweepSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** Primary metrics for classification tasks. */
  primaryMetric?: ClassificationPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "ImageClassification";
}

export function imageClassificationSerializer(item: ImageClassification): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsClassificationSerializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsClassificationArraySerializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsSerializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsSerializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

export function imageClassificationDeserializer(item: any): ImageClassification {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsClassificationDeserializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsClassificationArrayDeserializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsDeserializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsDeserializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

/**
 * Settings used for training the model.
 * For more information on the available settings please visit the official documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
 */
export interface ImageModelSettingsClassification extends ImageModelSettings {
  /** Image crop size that is input to the neural network for the training dataset. Must be a positive integer. */
  trainingCropSize?: number;
  /** Image crop size that is input to the neural network for the validation dataset. Must be a positive integer. */
  validationCropSize?: number;
  /** Image size to which to resize before cropping for validation dataset. Must be a positive integer. */
  validationResizeSize?: number;
  /**
   * Weighted loss. The accepted values are 0 for no weighted loss.
   * 1 for weighted loss with sqrt.(class_weights). 2 for weighted loss with class_weights. Must be 0 or 1 or 2.
   */
  weightedLoss?: number;
}

export function imageModelSettingsClassificationSerializer(
  item: ImageModelSettingsClassification,
): any {
  return {
    advancedSettings: item["advancedSettings"],
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    checkpointFrequency: item["checkpointFrequency"],
    checkpointModel: !item["checkpointModel"]
      ? item["checkpointModel"]
      : mlFlowModelJobInputSerializer(item["checkpointModel"]),
    checkpointRunId: item["checkpointRunId"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    trainingCropSize: item["trainingCropSize"],
    validationCropSize: item["validationCropSize"],
    validationResizeSize: item["validationResizeSize"],
    weightedLoss: item["weightedLoss"],
  };
}

export function imageModelSettingsClassificationDeserializer(
  item: any,
): ImageModelSettingsClassification {
  return {
    advancedSettings: item["advancedSettings"],
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    checkpointFrequency: item["checkpointFrequency"],
    checkpointModel: !item["checkpointModel"]
      ? item["checkpointModel"]
      : mlFlowModelJobInputDeserializer(item["checkpointModel"]),
    checkpointRunId: item["checkpointRunId"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    trainingCropSize: item["trainingCropSize"],
    validationCropSize: item["validationCropSize"],
    validationResizeSize: item["validationResizeSize"],
    weightedLoss: item["weightedLoss"],
  };
}

export function imageModelDistributionSettingsClassificationArraySerializer(
  result: Array<ImageModelDistributionSettingsClassification>,
): any[] {
  return result.map((item) => {
    return imageModelDistributionSettingsClassificationSerializer(item);
  });
}

export function imageModelDistributionSettingsClassificationArrayDeserializer(
  result: Array<ImageModelDistributionSettingsClassification>,
): any[] {
  return result.map((item) => {
    return imageModelDistributionSettingsClassificationDeserializer(item);
  });
}

/**
 * Distribution expressions to sweep over values of model settings.
 * <example>
 * Some examples are:
 * ```
 * ModelName = "choice('seresnext', 'resnest50')";
 * LearningRate = "uniform(0.001, 0.01)";
 * LayersToFreeze = "choice(0, 2)";
 * ```</example>
 * For more details on how to compose distribution expressions please check the documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-tune-hyperparameters
 * For more information on the available settings please visit the official documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
 */
export interface ImageModelDistributionSettingsClassification extends ImageModelDistributionSettings {
  /** Image crop size that is input to the neural network for the training dataset. Must be a positive integer. */
  trainingCropSize?: string;
  /** Image crop size that is input to the neural network for the validation dataset. Must be a positive integer. */
  validationCropSize?: string;
  /** Image size to which to resize before cropping for validation dataset. Must be a positive integer. */
  validationResizeSize?: string;
  /**
   * Weighted loss. The accepted values are 0 for no weighted loss.
   * 1 for weighted loss with sqrt.(class_weights). 2 for weighted loss with class_weights. Must be 0 or 1 or 2.
   */
  weightedLoss?: string;
}

export function imageModelDistributionSettingsClassificationSerializer(
  item: ImageModelDistributionSettingsClassification,
): any {
  return {
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    trainingCropSize: item["trainingCropSize"],
    validationCropSize: item["validationCropSize"],
    validationResizeSize: item["validationResizeSize"],
    weightedLoss: item["weightedLoss"],
  };
}

export function imageModelDistributionSettingsClassificationDeserializer(
  item: any,
): ImageModelDistributionSettingsClassification {
  return {
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    trainingCropSize: item["trainingCropSize"],
    validationCropSize: item["validationCropSize"],
    validationResizeSize: item["validationResizeSize"],
    weightedLoss: item["weightedLoss"],
  };
}

/** Limit settings for the AutoML job. */
export interface ImageLimitSettings {
  /** Maximum number of concurrent AutoML iterations. */
  maxConcurrentTrials?: number;
  /** Maximum number of AutoML iterations. */
  maxTrials?: number;
  /** AutoML job timeout. */
  timeout?: string;
}

export function imageLimitSettingsSerializer(item: ImageLimitSettings): any {
  return {
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxTrials: item["maxTrials"],
    timeout: item["timeout"],
  };
}

export function imageLimitSettingsDeserializer(item: any): ImageLimitSettings {
  return {
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxTrials: item["maxTrials"],
    timeout: item["timeout"],
  };
}

/** Model sweeping and hyperparameter sweeping related settings. */
export interface ImageSweepSettings {
  /** Type of early termination policy. */
  earlyTermination?: EarlyTerminationPolicyUnion;
  /** [Required] Type of the hyperparameter sampling algorithms. */
  samplingAlgorithm: SamplingAlgorithmType;
}

export function imageSweepSettingsSerializer(item: ImageSweepSettings): any {
  return {
    earlyTermination: !item["earlyTermination"]
      ? item["earlyTermination"]
      : earlyTerminationPolicyUnionSerializer(item["earlyTermination"]),
    samplingAlgorithm: item["samplingAlgorithm"],
  };
}

export function imageSweepSettingsDeserializer(item: any): ImageSweepSettings {
  return {
    earlyTermination: !item["earlyTermination"]
      ? item["earlyTermination"]
      : earlyTerminationPolicyUnionDeserializer(item["earlyTermination"]),
    samplingAlgorithm: item["samplingAlgorithm"],
  };
}

/** Early termination policies enable canceling poor-performing runs before they complete */
export interface EarlyTerminationPolicy {
  /** Number of intervals by which to delay the first evaluation. */
  delayEvaluation?: number;
  /** Interval (number of runs) between policy evaluations. */
  evaluationInterval?: number;
  /** [Required] Name of policy configuration */
  /** The discriminator possible values: Bandit, MedianStopping, TruncationSelection */
  policyType: EarlyTerminationPolicyType;
}

export function earlyTerminationPolicySerializer(item: EarlyTerminationPolicy): any {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
  };
}

export function earlyTerminationPolicyDeserializer(item: any): EarlyTerminationPolicy {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
  };
}

/** Alias for EarlyTerminationPolicyUnion */
export type EarlyTerminationPolicyUnion =
  | BanditPolicy
  | MedianStoppingPolicy
  | TruncationSelectionPolicy
  | EarlyTerminationPolicy;

export function earlyTerminationPolicyUnionSerializer(item: EarlyTerminationPolicyUnion): any {
  switch (item.policyType) {
    case "Bandit":
      return banditPolicySerializer(item as BanditPolicy);

    case "MedianStopping":
      return medianStoppingPolicySerializer(item as MedianStoppingPolicy);

    case "TruncationSelection":
      return truncationSelectionPolicySerializer(item as TruncationSelectionPolicy);

    default:
      return earlyTerminationPolicySerializer(item);
  }
}

export function earlyTerminationPolicyUnionDeserializer(item: any): EarlyTerminationPolicyUnion {
  switch (item["policyType"]) {
    case "Bandit":
      return banditPolicyDeserializer(item as BanditPolicy);

    case "MedianStopping":
      return medianStoppingPolicyDeserializer(item as MedianStoppingPolicy);

    case "TruncationSelection":
      return truncationSelectionPolicyDeserializer(item as TruncationSelectionPolicy);

    default:
      return earlyTerminationPolicyDeserializer(item);
  }
}

/** Known values of {@link EarlyTerminationPolicyType} that the service accepts. */
export enum KnownEarlyTerminationPolicyType {
  /** Bandit */
  Bandit = "Bandit",
  /** MedianStopping */
  MedianStopping = "MedianStopping",
  /** TruncationSelection */
  TruncationSelection = "TruncationSelection",
}

/** Type of EarlyTerminationPolicyType */
export type EarlyTerminationPolicyType = string;

/** Defines an early termination policy based on slack criteria, and a frequency and delay interval for evaluation */
export interface BanditPolicy extends EarlyTerminationPolicy {
  /** Absolute distance allowed from the best performing run. */
  slackAmount?: number;
  /** Ratio of the allowed distance from the best performing run. */
  slackFactor?: number;
  /** [Required] Name of policy configuration */
  policyType: "Bandit";
}

export function banditPolicySerializer(item: BanditPolicy): any {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
    slackAmount: item["slackAmount"],
    slackFactor: item["slackFactor"],
  };
}

export function banditPolicyDeserializer(item: any): BanditPolicy {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
    slackAmount: item["slackAmount"],
    slackFactor: item["slackFactor"],
  };
}

/** Defines an early termination policy based on running averages of the primary metric of all runs */
export interface MedianStoppingPolicy extends EarlyTerminationPolicy {
  /** [Required] Name of policy configuration */
  policyType: "MedianStopping";
}

export function medianStoppingPolicySerializer(item: MedianStoppingPolicy): any {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
  };
}

export function medianStoppingPolicyDeserializer(item: any): MedianStoppingPolicy {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
  };
}

/** Defines an early termination policy that cancels a given percentage of runs at each evaluation interval. */
export interface TruncationSelectionPolicy extends EarlyTerminationPolicy {
  /** The percentage of runs to cancel at each evaluation interval. */
  truncationPercentage?: number;
  /** [Required] Name of policy configuration */
  policyType: "TruncationSelection";
}

export function truncationSelectionPolicySerializer(item: TruncationSelectionPolicy): any {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
    truncationPercentage: item["truncationPercentage"],
  };
}

export function truncationSelectionPolicyDeserializer(item: any): TruncationSelectionPolicy {
  return {
    delayEvaluation: item["delayEvaluation"],
    evaluationInterval: item["evaluationInterval"],
    policyType: item["policyType"],
    truncationPercentage: item["truncationPercentage"],
  };
}

/** Known values of {@link SamplingAlgorithmType} that the service accepts. */
export enum KnownSamplingAlgorithmType {
  /** Grid */
  Grid = "Grid",
  /** Random */
  Random = "Random",
  /** Bayesian */
  Bayesian = "Bayesian",
}

/** Type of SamplingAlgorithmType */
export type SamplingAlgorithmType = string;

/**
 * Image Classification Multilabel. Multi-label image classification is used when an image could have one or more labels
 * from a set of labels - e.g. an image could be labeled with both 'cat' and 'dog'.
 */
export interface ImageClassificationMultilabel extends AutoMLVertical {
  /** Settings used for training the model. */
  modelSettings?: ImageModelSettingsClassification;
  /** Search space for sampling different combinations of models and their hyperparameters. */
  searchSpace?: ImageModelDistributionSettingsClassification[];
  /** [Required] Limit settings for the AutoML job. */
  limitSettings: ImageLimitSettings;
  /** Model sweeping and hyperparameter sweeping related settings. */
  sweepSettings?: ImageSweepSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** Primary metrics for classification multilabel tasks. */
  primaryMetric?: ClassificationMultilabelPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "ImageClassificationMultilabel";
}

export function imageClassificationMultilabelSerializer(item: ImageClassificationMultilabel): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsClassificationSerializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsClassificationArraySerializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsSerializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsSerializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

export function imageClassificationMultilabelDeserializer(
  item: any,
): ImageClassificationMultilabel {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsClassificationDeserializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsClassificationArrayDeserializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsDeserializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsDeserializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

/** Primary metrics for classification multilabel tasks. */
export enum KnownClassificationMultilabelPrimaryMetrics {
  /**
   * AUC is the Area under the curve.
   * This metric represents arithmetic mean of the score for each class,
   * weighted by the number of true instances in each class.
   */
  AUCWeighted = "AUCWeighted",
  /** Accuracy is the ratio of predictions that exactly match the true class labels. */
  Accuracy = "Accuracy",
  /**
   * Normalized macro recall is recall macro-averaged and normalized, so that random
   * performance has a score of 0, and perfect performance has a score of 1.
   */
  NormMacroRecall = "NormMacroRecall",
  /**
   * The arithmetic mean of the average precision score for each class, weighted by
   * the number of true instances in each class.
   */
  AveragePrecisionScoreWeighted = "AveragePrecisionScoreWeighted",
  /** The arithmetic mean of precision for each class, weighted by number of true instances in each class. */
  PrecisionScoreWeighted = "PrecisionScoreWeighted",
  /** Intersection Over Union. Intersection of predictions divided by union of predictions. */
  IOU = "IOU",
}

/**
 * Primary metrics for classification multilabel tasks. \
 * {@link KnownClassificationMultilabelPrimaryMetrics} can be used interchangeably with ClassificationMultilabelPrimaryMetrics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AUCWeighted**: AUC is the Area under the curve.
 * This metric represents arithmetic mean of the score for each class,
 * weighted by the number of true instances in each class. \
 * **Accuracy**: Accuracy is the ratio of predictions that exactly match the true class labels. \
 * **NormMacroRecall**: Normalized macro recall is recall macro-averaged and normalized, so that random
 * performance has a score of 0, and perfect performance has a score of 1. \
 * **AveragePrecisionScoreWeighted**: The arithmetic mean of the average precision score for each class, weighted by
 * the number of true instances in each class. \
 * **PrecisionScoreWeighted**: The arithmetic mean of precision for each class, weighted by number of true instances in each class. \
 * **IOU**: Intersection Over Union. Intersection of predictions divided by union of predictions.
 */
export type ClassificationMultilabelPrimaryMetrics = string;

/**
 * Image Instance Segmentation. Instance segmentation is used to identify objects in an image at the pixel level,
 * drawing a polygon around each object in the image.
 */
export interface ImageInstanceSegmentation extends AutoMLVertical {
  /** Settings used for training the model. */
  modelSettings?: ImageModelSettingsObjectDetection;
  /** Search space for sampling different combinations of models and their hyperparameters. */
  searchSpace?: ImageModelDistributionSettingsObjectDetection[];
  /** [Required] Limit settings for the AutoML job. */
  limitSettings: ImageLimitSettings;
  /** Model sweeping and hyperparameter sweeping related settings. */
  sweepSettings?: ImageSweepSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** Primary metrics for InstanceSegmentation tasks. */
  primaryMetric?: InstanceSegmentationPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "ImageInstanceSegmentation";
}

export function imageInstanceSegmentationSerializer(item: ImageInstanceSegmentation): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsObjectDetectionSerializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsObjectDetectionArraySerializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsSerializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsSerializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

export function imageInstanceSegmentationDeserializer(item: any): ImageInstanceSegmentation {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsObjectDetectionDeserializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsObjectDetectionArrayDeserializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsDeserializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsDeserializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

/**
 * Settings used for training the model.
 * For more information on the available settings please visit the official documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
 */
export interface ImageModelSettingsObjectDetection extends ImageModelSettings {
  /**
   * Maximum number of detections per image, for all classes. Must be a positive integer.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  boxDetectionsPerImage?: number;
  /**
   * During inference, only return proposals with a classification score greater than
   * BoxScoreThreshold. Must be a float in the range[0, 1].
   */
  boxScoreThreshold?: number;
  /**
   * Image size for train and validation. Must be a positive integer.
   * Note: The training run may get into CUDA OOM if the size is too big.
   * Note: This settings is only supported for the 'yolov5' algorithm.
   */
  imageSize?: number;
  /**
   * Maximum size of the image to be rescaled before feeding it to the backbone.
   * Must be a positive integer. Note: training run may get into CUDA OOM if the size is too big.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  maxSize?: number;
  /**
   * Minimum size of the image to be rescaled before feeding it to the backbone.
   * Must be a positive integer. Note: training run may get into CUDA OOM if the size is too big.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  minSize?: number;
  /** Image model size. */
  modelSize?: ModelSize;
  /**
   * Enable multi-scale image by varying image size by +/- 50%.
   * Note: training run may get into CUDA OOM if no sufficient GPU memory.
   * Note: This settings is only supported for the 'yolov5' algorithm.
   */
  multiScale?: boolean;
  /** IOU threshold used during inference in NMS post processing. Must be a float in the range [0, 1]. */
  nmsIouThreshold?: number;
  /**
   * The grid size to use for tiling each image. Note: TileGridSize must not be
   * None to enable small object detection logic. A string containing two integers in mxn format.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  tileGridSize?: string;
  /**
   * Overlap ratio between adjacent tiles in each dimension. Must be float in the range [0, 1).
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  tileOverlapRatio?: number;
  /**
   * The IOU threshold to use to perform NMS while merging predictions from tiles and image.
   * Used in validation/ inference. Must be float in the range [0, 1].
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  tilePredictionsNmsThreshold?: number;
  /** IOU threshold to use when computing validation metric. Must be float in the range [0, 1]. */
  validationIouThreshold?: number;
  /** Metric computation method to use for validation metrics in image tasks. */
  validationMetricType?: ValidationMetricType;
}

export function imageModelSettingsObjectDetectionSerializer(
  item: ImageModelSettingsObjectDetection,
): any {
  return {
    advancedSettings: item["advancedSettings"],
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    checkpointFrequency: item["checkpointFrequency"],
    checkpointModel: !item["checkpointModel"]
      ? item["checkpointModel"]
      : mlFlowModelJobInputSerializer(item["checkpointModel"]),
    checkpointRunId: item["checkpointRunId"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    boxDetectionsPerImage: item["boxDetectionsPerImage"],
    boxScoreThreshold: item["boxScoreThreshold"],
    imageSize: item["imageSize"],
    maxSize: item["maxSize"],
    minSize: item["minSize"],
    modelSize: item["modelSize"],
    multiScale: item["multiScale"],
    nmsIouThreshold: item["nmsIouThreshold"],
    tileGridSize: item["tileGridSize"],
    tileOverlapRatio: item["tileOverlapRatio"],
    tilePredictionsNmsThreshold: item["tilePredictionsNmsThreshold"],
    validationIouThreshold: item["validationIouThreshold"],
    validationMetricType: item["validationMetricType"],
  };
}

export function imageModelSettingsObjectDetectionDeserializer(
  item: any,
): ImageModelSettingsObjectDetection {
  return {
    advancedSettings: item["advancedSettings"],
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    checkpointFrequency: item["checkpointFrequency"],
    checkpointModel: !item["checkpointModel"]
      ? item["checkpointModel"]
      : mlFlowModelJobInputDeserializer(item["checkpointModel"]),
    checkpointRunId: item["checkpointRunId"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    boxDetectionsPerImage: item["boxDetectionsPerImage"],
    boxScoreThreshold: item["boxScoreThreshold"],
    imageSize: item["imageSize"],
    maxSize: item["maxSize"],
    minSize: item["minSize"],
    modelSize: item["modelSize"],
    multiScale: item["multiScale"],
    nmsIouThreshold: item["nmsIouThreshold"],
    tileGridSize: item["tileGridSize"],
    tileOverlapRatio: item["tileOverlapRatio"],
    tilePredictionsNmsThreshold: item["tilePredictionsNmsThreshold"],
    validationIouThreshold: item["validationIouThreshold"],
    validationMetricType: item["validationMetricType"],
  };
}

/** Image model size. */
export enum KnownModelSize {
  /** No value selected. */
  None = "None",
  /** Small size. */
  Small = "Small",
  /** Medium size. */
  Medium = "Medium",
  /** Large size. */
  Large = "Large",
  /** Extra large size. */
  ExtraLarge = "ExtraLarge",
}

/**
 * Image model size. \
 * {@link KnownModelSize} can be used interchangeably with ModelSize,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No value selected. \
 * **Small**: Small size. \
 * **Medium**: Medium size. \
 * **Large**: Large size. \
 * **ExtraLarge**: Extra large size.
 */
export type ModelSize = string;

/** Metric computation method to use for validation metrics in image tasks. */
export enum KnownValidationMetricType {
  /** No metric. */
  None = "None",
  /** Coco metric. */
  Coco = "Coco",
  /** Voc metric. */
  Voc = "Voc",
  /** CocoVoc metric. */
  CocoVoc = "CocoVoc",
}

/**
 * Metric computation method to use for validation metrics in image tasks. \
 * {@link KnownValidationMetricType} can be used interchangeably with ValidationMetricType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No metric. \
 * **Coco**: Coco metric. \
 * **Voc**: Voc metric. \
 * **CocoVoc**: CocoVoc metric.
 */
export type ValidationMetricType = string;

export function imageModelDistributionSettingsObjectDetectionArraySerializer(
  result: Array<ImageModelDistributionSettingsObjectDetection>,
): any[] {
  return result.map((item) => {
    return imageModelDistributionSettingsObjectDetectionSerializer(item);
  });
}

export function imageModelDistributionSettingsObjectDetectionArrayDeserializer(
  result: Array<ImageModelDistributionSettingsObjectDetection>,
): any[] {
  return result.map((item) => {
    return imageModelDistributionSettingsObjectDetectionDeserializer(item);
  });
}

/**
 * Distribution expressions to sweep over values of model settings.
 * <example>
 * Some examples are:
 * ```
 * ModelName = "choice('seresnext', 'resnest50')";
 * LearningRate = "uniform(0.001, 0.01)";
 * LayersToFreeze = "choice(0, 2)";
 * ```</example>
 * For more details on how to compose distribution expressions please check the documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-tune-hyperparameters
 * For more information on the available settings please visit the official documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
 */
export interface ImageModelDistributionSettingsObjectDetection extends ImageModelDistributionSettings {
  /**
   * Maximum number of detections per image, for all classes. Must be a positive integer.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  boxDetectionsPerImage?: string;
  /**
   * During inference, only return proposals with a classification score greater than
   * BoxScoreThreshold. Must be a float in the range[0, 1].
   */
  boxScoreThreshold?: string;
  /**
   * Image size for train and validation. Must be a positive integer.
   * Note: The training run may get into CUDA OOM if the size is too big.
   * Note: This settings is only supported for the 'yolov5' algorithm.
   */
  imageSize?: string;
  /**
   * Maximum size of the image to be rescaled before feeding it to the backbone.
   * Must be a positive integer. Note: training run may get into CUDA OOM if the size is too big.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  maxSize?: string;
  /**
   * Minimum size of the image to be rescaled before feeding it to the backbone.
   * Must be a positive integer. Note: training run may get into CUDA OOM if the size is too big.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  minSize?: string;
  /**
   * Model size. Must be 'small', 'medium', 'large', or 'xlarge'.
   * Note: training run may get into CUDA OOM if the model size is too big.
   * Note: This settings is only supported for the 'yolov5' algorithm.
   */
  modelSize?: string;
  /**
   * Enable multi-scale image by varying image size by +/- 50%.
   * Note: training run may get into CUDA OOM if no sufficient GPU memory.
   * Note: This settings is only supported for the 'yolov5' algorithm.
   */
  multiScale?: string;
  /** IOU threshold used during inference in NMS post processing. Must be float in the range [0, 1]. */
  nmsIouThreshold?: string;
  /**
   * The grid size to use for tiling each image. Note: TileGridSize must not be
   * None to enable small object detection logic. A string containing two integers in mxn format.
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  tileGridSize?: string;
  /**
   * Overlap ratio between adjacent tiles in each dimension. Must be float in the range [0, 1).
   * Note: This settings is not supported for the 'yolov5' algorithm.
   */
  tileOverlapRatio?: string;
  /**
   * The IOU threshold to use to perform NMS while merging predictions from tiles and image.
   * Used in validation/ inference. Must be float in the range [0, 1].
   * Note: This settings is not supported for the 'yolov5' algorithm.
   * NMS: Non-maximum suppression
   */
  tilePredictionsNmsThreshold?: string;
  /** IOU threshold to use when computing validation metric. Must be float in the range [0, 1]. */
  validationIouThreshold?: string;
  /** Metric computation method to use for validation metrics. Must be 'none', 'coco', 'voc', or 'coco_voc'. */
  validationMetricType?: string;
}

export function imageModelDistributionSettingsObjectDetectionSerializer(
  item: ImageModelDistributionSettingsObjectDetection,
): any {
  return {
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    boxDetectionsPerImage: item["boxDetectionsPerImage"],
    boxScoreThreshold: item["boxScoreThreshold"],
    imageSize: item["imageSize"],
    maxSize: item["maxSize"],
    minSize: item["minSize"],
    modelSize: item["modelSize"],
    multiScale: item["multiScale"],
    nmsIouThreshold: item["nmsIouThreshold"],
    tileGridSize: item["tileGridSize"],
    tileOverlapRatio: item["tileOverlapRatio"],
    tilePredictionsNmsThreshold: item["tilePredictionsNmsThreshold"],
    validationIouThreshold: item["validationIouThreshold"],
    validationMetricType: item["validationMetricType"],
  };
}

export function imageModelDistributionSettingsObjectDetectionDeserializer(
  item: any,
): ImageModelDistributionSettingsObjectDetection {
  return {
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
    boxDetectionsPerImage: item["boxDetectionsPerImage"],
    boxScoreThreshold: item["boxScoreThreshold"],
    imageSize: item["imageSize"],
    maxSize: item["maxSize"],
    minSize: item["minSize"],
    modelSize: item["modelSize"],
    multiScale: item["multiScale"],
    nmsIouThreshold: item["nmsIouThreshold"],
    tileGridSize: item["tileGridSize"],
    tileOverlapRatio: item["tileOverlapRatio"],
    tilePredictionsNmsThreshold: item["tilePredictionsNmsThreshold"],
    validationIouThreshold: item["validationIouThreshold"],
    validationMetricType: item["validationMetricType"],
  };
}

/** Primary metrics for InstanceSegmentation tasks. */
export enum KnownInstanceSegmentationPrimaryMetrics {
  /**
   * Mean Average Precision (MAP) is the average of AP (Average Precision).
   * AP is calculated for each class and averaged to get the MAP.
   */
  MeanAveragePrecision = "MeanAveragePrecision",
}

/**
 * Primary metrics for InstanceSegmentation tasks. \
 * {@link KnownInstanceSegmentationPrimaryMetrics} can be used interchangeably with InstanceSegmentationPrimaryMetrics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MeanAveragePrecision**: Mean Average Precision (MAP) is the average of AP (Average Precision).
 * AP is calculated for each class and averaged to get the MAP.
 */
export type InstanceSegmentationPrimaryMetrics = string;

/**
 * Image Object Detection. Object detection is used to identify objects in an image and locate each object with a
 * bounding box e.g. locate all dogs and cats in an image and draw a bounding box around each.
 */
export interface ImageObjectDetection extends AutoMLVertical {
  /** Settings used for training the model. */
  modelSettings?: ImageModelSettingsObjectDetection;
  /** Search space for sampling different combinations of models and their hyperparameters. */
  searchSpace?: ImageModelDistributionSettingsObjectDetection[];
  /** [Required] Limit settings for the AutoML job. */
  limitSettings: ImageLimitSettings;
  /** Model sweeping and hyperparameter sweeping related settings. */
  sweepSettings?: ImageSweepSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** Primary metrics for Image ObjectDetection task. */
  primaryMetric?: ObjectDetectionPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "ImageObjectDetection";
}

export function imageObjectDetectionSerializer(item: ImageObjectDetection): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsObjectDetectionSerializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsObjectDetectionArraySerializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsSerializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsSerializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

export function imageObjectDetectionDeserializer(item: any): ImageObjectDetection {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : imageModelSettingsObjectDetectionDeserializer(item["modelSettings"]),
    searchSpace: !item["searchSpace"]
      ? item["searchSpace"]
      : imageModelDistributionSettingsObjectDetectionArrayDeserializer(item["searchSpace"]),
    limitSettings: imageLimitSettingsDeserializer(item["limitSettings"]),
    sweepSettings: !item["sweepSettings"]
      ? item["sweepSettings"]
      : imageSweepSettingsDeserializer(item["sweepSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    primaryMetric: item["primaryMetric"],
  };
}

/** Primary metrics for Image ObjectDetection task. */
export enum KnownObjectDetectionPrimaryMetrics {
  /**
   * Mean Average Precision (MAP) is the average of AP (Average Precision).
   * AP is calculated for each class and averaged to get the MAP.
   */
  MeanAveragePrecision = "MeanAveragePrecision",
}

/**
 * Primary metrics for Image ObjectDetection task. \
 * {@link KnownObjectDetectionPrimaryMetrics} can be used interchangeably with ObjectDetectionPrimaryMetrics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MeanAveragePrecision**: Mean Average Precision (MAP) is the average of AP (Average Precision).
 * AP is calculated for each class and averaged to get the MAP.
 */
export type ObjectDetectionPrimaryMetrics = string;

/** Regression task in AutoML Table vertical. */
export interface Regression extends AutoMLVertical {
  /** Columns to use for CVSplit data. */
  cvSplitColumnNames?: string[];
  /** Featurization inputs needed for AutoML job. */
  featurizationSettings?: TableVerticalFeaturizationSettings;
  /** Execution constraints for AutoMLJob. */
  limitSettings?: TableVerticalLimitSettings;
  /**
   * Number of cross validation folds to be applied on training dataset
   * when validation dataset is not provided.
   */
  nCrossValidations?: NCrossValidationsUnion;
  /** Test data input. */
  testData?: MLTableJobInput;
  /**
   * The fraction of test dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  testDataSize?: number;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * The fraction of training dataset that needs to be set aside for validation purpose.
   * Values between (0.0 , 1.0)
   * Applied when validation dataset is not provided.
   */
  validationDataSize?: number;
  /** The name of the sample weight column. Automated ML supports a weighted column as an input, causing rows in the data to be weighted up or down. */
  weightColumnName?: string;
  /** Primary metrics for Regression task. */
  primaryMetric?: RegressionPrimaryMetrics;
  /** Inputs for training phase for an AutoML Job. */
  trainingSettings?: RegressionTrainingSettings;
  /** [Required] Task type for AutoMLJob. */
  taskType: "Regression";
}

export function regressionSerializer(item: Regression): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    cvSplitColumnNames: !item["cvSplitColumnNames"]
      ? item["cvSplitColumnNames"]
      : item["cvSplitColumnNames"].map((p: any) => {
          return p;
        }),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : tableVerticalFeaturizationSettingsSerializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : tableVerticalLimitSettingsSerializer(item["limitSettings"]),
    nCrossValidations: !item["nCrossValidations"]
      ? item["nCrossValidations"]
      : nCrossValidationsUnionSerializer(item["nCrossValidations"]),
    testData: !item["testData"] ? item["testData"] : mlTableJobInputSerializer(item["testData"]),
    testDataSize: item["testDataSize"],
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    weightColumnName: item["weightColumnName"],
    primaryMetric: item["primaryMetric"],
    trainingSettings: !item["trainingSettings"]
      ? item["trainingSettings"]
      : regressionTrainingSettingsSerializer(item["trainingSettings"]),
  };
}

export function regressionDeserializer(item: any): Regression {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    cvSplitColumnNames: !item["cvSplitColumnNames"]
      ? item["cvSplitColumnNames"]
      : item["cvSplitColumnNames"].map((p1: any) => {
          return p1;
        }),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : tableVerticalFeaturizationSettingsDeserializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : tableVerticalLimitSettingsDeserializer(item["limitSettings"]),
    nCrossValidations: !item["nCrossValidations"]
      ? item["nCrossValidations"]
      : nCrossValidationsUnionDeserializer(item["nCrossValidations"]),
    testData: !item["testData"] ? item["testData"] : mlTableJobInputDeserializer(item["testData"]),
    testDataSize: item["testDataSize"],
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    validationDataSize: item["validationDataSize"],
    weightColumnName: item["weightColumnName"],
    primaryMetric: item["primaryMetric"],
    trainingSettings: !item["trainingSettings"]
      ? item["trainingSettings"]
      : regressionTrainingSettingsDeserializer(item["trainingSettings"]),
  };
}

/** Primary metrics for Regression task. */
export enum KnownRegressionPrimaryMetrics {
  /** The Spearman's rank coefficient of correlation is a nonparametric measure of rank correlation. */
  SpearmanCorrelation = "SpearmanCorrelation",
  /** The Normalized Root Mean Squared Error (NRMSE) the RMSE facilitates the comparison between models with different scales. */
  NormalizedRootMeanSquaredError = "NormalizedRootMeanSquaredError",
  /** The R2 score is one of the performance evaluation measures for forecasting-based machine learning models. */
  R2Score = "R2Score",
  /** The Normalized Mean Absolute Error (NMAE) is a validation metric to compare the Mean Absolute Error (MAE) of (time) series with different scales. */
  NormalizedMeanAbsoluteError = "NormalizedMeanAbsoluteError",
}

/**
 * Primary metrics for Regression task. \
 * {@link KnownRegressionPrimaryMetrics} can be used interchangeably with RegressionPrimaryMetrics,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SpearmanCorrelation**: The Spearman's rank coefficient of correlation is a nonparametric measure of rank correlation. \
 * **NormalizedRootMeanSquaredError**: The Normalized Root Mean Squared Error (NRMSE) the RMSE facilitates the comparison between models with different scales. \
 * **R2Score**: The R2 score is one of the performance evaluation measures for forecasting-based machine learning models. \
 * **NormalizedMeanAbsoluteError**: The Normalized Mean Absolute Error (NMAE) is a validation metric to compare the Mean Absolute Error (MAE) of (time) series with different scales.
 */
export type RegressionPrimaryMetrics = string;

/** Regression Training related configuration. */
export interface RegressionTrainingSettings extends TrainingSettings {
  /** Allowed models for regression task. */
  allowedTrainingAlgorithms?: RegressionModels[];
  /** Blocked models for regression task. */
  blockedTrainingAlgorithms?: RegressionModels[];
}

export function regressionTrainingSettingsSerializer(item: RegressionTrainingSettings): any {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsSerializer(item["stackEnsembleSettings"]),
    allowedTrainingAlgorithms: !item["allowedTrainingAlgorithms"]
      ? item["allowedTrainingAlgorithms"]
      : item["allowedTrainingAlgorithms"].map((p: any) => {
          return p;
        }),
    blockedTrainingAlgorithms: !item["blockedTrainingAlgorithms"]
      ? item["blockedTrainingAlgorithms"]
      : item["blockedTrainingAlgorithms"].map((p: any) => {
          return p;
        }),
  };
}

export function regressionTrainingSettingsDeserializer(item: any): RegressionTrainingSettings {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsDeserializer(item["stackEnsembleSettings"]),
    allowedTrainingAlgorithms: !item["allowedTrainingAlgorithms"]
      ? item["allowedTrainingAlgorithms"]
      : item["allowedTrainingAlgorithms"].map((p1: any) => {
          return p1;
        }),
    blockedTrainingAlgorithms: !item["blockedTrainingAlgorithms"]
      ? item["blockedTrainingAlgorithms"]
      : item["blockedTrainingAlgorithms"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Enum for all Regression models supported by AutoML. */
export enum KnownRegressionModels {
  /** Elastic net is a popular type of regularized linear regression that combines two popular penalties, specifically the L1 and L2 penalty functions. */
  ElasticNet = "ElasticNet",
  /** The technique of transiting week learners into a strong learner is called Boosting. The gradient boosting algorithm process works on this theory of execution. */
  GradientBoosting = "GradientBoosting",
  /**
   * Decision Trees are a non-parametric supervised learning method used for both classification and regression tasks.
   * The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.
   */
  DecisionTree = "DecisionTree",
  /**
   * K-nearest neighbors (KNN) algorithm uses 'feature similarity' to predict the values of new datapoints
   * which further means that the new data point will be assigned a value based on how closely it matches the points in the training set.
   */
  KNN = "KNN",
  /** Lasso model fit with Least Angle Regression a.k.a. Lars. It is a Linear Model trained with an L1 prior as regularizer. */
  LassoLars = "LassoLars",
  /**
   * SGD: Stochastic gradient descent is an optimization algorithm often used in machine learning applications
   * to find the model parameters that correspond to the best fit between predicted and actual outputs.
   * It's an inexact but powerful technique.
   */
  SGD = "SGD",
  /**
   * Random forest is a supervised learning algorithm.
   * The "forest" it builds, is an ensemble of decision trees, usually trained with the "bagging" method.
   * The general idea of the bagging method is that a combination of learning models increases the overall result.
   */
  RandomForest = "RandomForest",
  /** Extreme Trees is an ensemble machine learning algorithm that combines the predictions from many decision trees. It is related to the widely used random forest algorithm. */
  ExtremeRandomTrees = "ExtremeRandomTrees",
  /** LightGBM is a gradient boosting framework that uses tree based learning algorithms. */
  LightGBM = "LightGBM",
  /** XGBoostRegressor: Extreme Gradient Boosting Regressor is a supervised machine learning model using ensemble of base learners. */
  XGBoostRegressor = "XGBoostRegressor",
}

/**
 * Enum for all Regression models supported by AutoML. \
 * {@link KnownRegressionModels} can be used interchangeably with RegressionModels,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ElasticNet**: Elastic net is a popular type of regularized linear regression that combines two popular penalties, specifically the L1 and L2 penalty functions. \
 * **GradientBoosting**: The technique of transiting week learners into a strong learner is called Boosting. The gradient boosting algorithm process works on this theory of execution. \
 * **DecisionTree**: Decision Trees are a non-parametric supervised learning method used for both classification and regression tasks.
 * The goal is to create a model that predicts the value of a target variable by learning simple decision rules inferred from the data features. \
 * **KNN**: K-nearest neighbors (KNN) algorithm uses 'feature similarity' to predict the values of new datapoints
 * which further means that the new data point will be assigned a value based on how closely it matches the points in the training set. \
 * **LassoLars**: Lasso model fit with Least Angle Regression a.k.a. Lars. It is a Linear Model trained with an L1 prior as regularizer. \
 * **SGD**: SGD: Stochastic gradient descent is an optimization algorithm often used in machine learning applications
 * to find the model parameters that correspond to the best fit between predicted and actual outputs.
 * It's an inexact but powerful technique. \
 * **RandomForest**: Random forest is a supervised learning algorithm.
 * The "forest" it builds, is an ensemble of decision trees, usually trained with the "bagging" method.
 * The general idea of the bagging method is that a combination of learning models increases the overall result. \
 * **ExtremeRandomTrees**: Extreme Trees is an ensemble machine learning algorithm that combines the predictions from many decision trees. It is related to the widely used random forest algorithm. \
 * **LightGBM**: LightGBM is a gradient boosting framework that uses tree based learning algorithms. \
 * **XGBoostRegressor**: XGBoostRegressor: Extreme Gradient Boosting Regressor is a supervised machine learning model using ensemble of base learners.
 */
export type RegressionModels = string;

/**
 * Text Classification task in AutoML NLP vertical.
 * NLP - Natural Language Processing.
 */
export interface TextClassification extends AutoMLVertical {
  /** Featurization inputs needed for AutoML job. */
  featurizationSettings?: NlpVerticalFeaturizationSettings;
  /** Execution constraints for AutoMLJob. */
  limitSettings?: NlpVerticalLimitSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /** Primary metrics for classification tasks. */
  primaryMetric?: ClassificationPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "TextClassification";
}

export function textClassificationSerializer(item: TextClassification): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : nlpVerticalFeaturizationSettingsSerializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : nlpVerticalLimitSettingsSerializer(item["limitSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
    primaryMetric: item["primaryMetric"],
  };
}

export function textClassificationDeserializer(item: any): TextClassification {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : nlpVerticalFeaturizationSettingsDeserializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : nlpVerticalLimitSettingsDeserializer(item["limitSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    primaryMetric: item["primaryMetric"],
  };
}

/** model interface NlpVerticalFeaturizationSettings */
export interface NlpVerticalFeaturizationSettings extends FeaturizationSettings {}

export function nlpVerticalFeaturizationSettingsSerializer(
  item: NlpVerticalFeaturizationSettings,
): any {
  return { datasetLanguage: item["datasetLanguage"] };
}

export function nlpVerticalFeaturizationSettingsDeserializer(
  item: any,
): NlpVerticalFeaturizationSettings {
  return {
    datasetLanguage: item["datasetLanguage"],
  };
}

/** Job execution constraints. */
export interface NlpVerticalLimitSettings {
  /** Maximum Concurrent AutoML iterations. */
  maxConcurrentTrials?: number;
  /** Number of AutoML iterations. */
  maxTrials?: number;
  /** AutoML job timeout. */
  timeout?: string;
}

export function nlpVerticalLimitSettingsSerializer(item: NlpVerticalLimitSettings): any {
  return {
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxTrials: item["maxTrials"],
    timeout: item["timeout"],
  };
}

export function nlpVerticalLimitSettingsDeserializer(item: any): NlpVerticalLimitSettings {
  return {
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxTrials: item["maxTrials"],
    timeout: item["timeout"],
  };
}

/**
 * Text Classification Multilabel task in AutoML NLP vertical.
 * NLP - Natural Language Processing.
 */
export interface TextClassificationMultilabel extends AutoMLVertical {
  /** Featurization inputs needed for AutoML job. */
  featurizationSettings?: NlpVerticalFeaturizationSettings;
  /** Execution constraints for AutoMLJob. */
  limitSettings?: NlpVerticalLimitSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * Primary metric for Text-Classification-Multilabel task.
   * Currently only Accuracy is supported as primary metric, hence user need not set it explicitly.
   */
  readonly primaryMetric?: ClassificationMultilabelPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "TextClassificationMultilabel";
}

export function textClassificationMultilabelSerializer(item: TextClassificationMultilabel): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : nlpVerticalFeaturizationSettingsSerializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : nlpVerticalLimitSettingsSerializer(item["limitSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
  };
}

export function textClassificationMultilabelDeserializer(item: any): TextClassificationMultilabel {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : nlpVerticalFeaturizationSettingsDeserializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : nlpVerticalLimitSettingsDeserializer(item["limitSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    primaryMetric: item["primaryMetric"],
  };
}

/**
 * Text-NER task in AutoML NLP vertical.
 * NER - Named Entity Recognition.
 * NLP - Natural Language Processing.
 */
export interface TextNer extends AutoMLVertical {
  /** Featurization inputs needed for AutoML job. */
  featurizationSettings?: NlpVerticalFeaturizationSettings;
  /** Execution constraints for AutoMLJob. */
  limitSettings?: NlpVerticalLimitSettings;
  /** Validation data inputs. */
  validationData?: MLTableJobInput;
  /**
   * Primary metric for Text-NER task.
   * Only 'Accuracy' is supported for Text-NER, so user need not set this explicitly.
   */
  readonly primaryMetric?: ClassificationPrimaryMetrics;
  /** [Required] Task type for AutoMLJob. */
  taskType: "TextNER";
}

export function textNerSerializer(item: TextNer): any {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputSerializer(item["trainingData"]),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : nlpVerticalFeaturizationSettingsSerializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : nlpVerticalLimitSettingsSerializer(item["limitSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputSerializer(item["validationData"]),
  };
}

export function textNerDeserializer(item: any): TextNer {
  return {
    logVerbosity: item["logVerbosity"],
    targetColumnName: item["targetColumnName"],
    taskType: item["taskType"],
    trainingData: mlTableJobInputDeserializer(item["trainingData"]),
    featurizationSettings: !item["featurizationSettings"]
      ? item["featurizationSettings"]
      : nlpVerticalFeaturizationSettingsDeserializer(item["featurizationSettings"]),
    limitSettings: !item["limitSettings"]
      ? item["limitSettings"]
      : nlpVerticalLimitSettingsDeserializer(item["limitSettings"]),
    validationData: !item["validationData"]
      ? item["validationData"]
      : mlTableJobInputDeserializer(item["validationData"]),
    primaryMetric: item["primaryMetric"],
  };
}

/** Command job definition. */
export interface CommandJob extends JobBaseProperties {
  /** ARM resource ID of the code asset. */
  codeId?: string;
  /** [Required] The command to execute on startup of the job. eg. "python train.py" */
  command: string;
  /** Distribution configuration of the job. If set, this should be one of Mpi, Tensorflow, PyTorch, or null. */
  distribution?: DistributionConfigurationUnion;
  /** [Required] The ARM resource ID of the Environment specification for the job. */
  environmentId: string;
  /** Environment variables included in the job. */
  environmentVariables?: Record<string, string>;
  /** Mapping of input data bindings used in the job. */
  inputs?: Record<string, JobInputUnion>;
  /** Command Job limit. */
  limits?: CommandJobLimits;
  /** Mapping of output data bindings used in the job. */
  outputs?: Record<string, JobOutputUnion>;
  /** Input parameters. */
  readonly parameters?: any;
  /** Queue settings for the job */
  queueSettings?: QueueSettings;
  /** Compute Resource configuration for the job. */
  resources?: JobResourceConfiguration;
  /** [Required] Specifies the type of job. */
  jobType: "Command";
}

export function commandJobSerializer(item: CommandJob): any {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionSerializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingSerializer(item["notificationSetting"]),
    services: item["services"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    codeId: item["codeId"],
    command: item["command"],
    distribution: !item["distribution"]
      ? item["distribution"]
      : distributionConfigurationUnionSerializer(item["distribution"]),
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    inputs: item["inputs"],
    limits: !item["limits"] ? item["limits"] : commandJobLimitsSerializer(item["limits"]),
    outputs: item["outputs"],
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsSerializer(item["queueSettings"]),
    resources: !item["resources"]
      ? item["resources"]
      : jobResourceConfigurationSerializer(item["resources"]),
  };
}

export function commandJobDeserializer(item: any): CommandJob {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionDeserializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingDeserializer(item["notificationSetting"]),
    services: !item["services"]
      ? item["services"]
      : Object.fromEntries(
          Object.entries(item["services"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobServiceDeserializer(p1),
          ]),
        ),
    status: item["status"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    codeId: item["codeId"],
    command: item["command"],
    distribution: !item["distribution"]
      ? item["distribution"]
      : distributionConfigurationUnionDeserializer(item["distribution"]),
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    inputs: !item["inputs"]
      ? item["inputs"]
      : Object.fromEntries(
          Object.entries(item["inputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobInputUnionDeserializer(p1),
          ]),
        ),
    limits: !item["limits"] ? item["limits"] : commandJobLimitsDeserializer(item["limits"]),
    outputs: !item["outputs"]
      ? item["outputs"]
      : Object.fromEntries(
          Object.entries(item["outputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobOutputUnionDeserializer(p1),
          ]),
        ),
    parameters: item["parameters"],
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsDeserializer(item["queueSettings"]),
    resources: !item["resources"]
      ? item["resources"]
      : jobResourceConfigurationDeserializer(item["resources"]),
  };
}

/** Base definition for job distribution configuration. */
export interface DistributionConfiguration {
  /** [Required] Specifies the type of distribution framework. */
  /** The discriminator possible values: Mpi, PyTorch, TensorFlow */
  distributionType: DistributionType;
}

export function distributionConfigurationSerializer(item: DistributionConfiguration): any {
  return { distributionType: item["distributionType"] };
}

export function distributionConfigurationDeserializer(item: any): DistributionConfiguration {
  return {
    distributionType: item["distributionType"],
  };
}

/** Alias for DistributionConfigurationUnion */
export type DistributionConfigurationUnion = Mpi | PyTorch | TensorFlow | DistributionConfiguration;

export function distributionConfigurationUnionSerializer(
  item: DistributionConfigurationUnion,
): any {
  switch (item.distributionType) {
    case "Mpi":
      return mpiSerializer(item as Mpi);

    case "PyTorch":
      return pyTorchSerializer(item as PyTorch);

    case "TensorFlow":
      return tensorFlowSerializer(item as TensorFlow);

    default:
      return distributionConfigurationSerializer(item);
  }
}

export function distributionConfigurationUnionDeserializer(
  item: any,
): DistributionConfigurationUnion {
  switch (item["distributionType"]) {
    case "Mpi":
      return mpiDeserializer(item as Mpi);

    case "PyTorch":
      return pyTorchDeserializer(item as PyTorch);

    case "TensorFlow":
      return tensorFlowDeserializer(item as TensorFlow);

    default:
      return distributionConfigurationDeserializer(item);
  }
}

/** Enum to determine the job distribution type. */
export enum KnownDistributionType {
  /** PyTorch */
  PyTorch = "PyTorch",
  /** TensorFlow */
  TensorFlow = "TensorFlow",
  /** Mpi */
  Mpi = "Mpi",
}

/**
 * Enum to determine the job distribution type. \
 * {@link KnownDistributionType} can be used interchangeably with DistributionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PyTorch** \
 * **TensorFlow** \
 * **Mpi**
 */
export type DistributionType = string;

/** MPI distribution configuration. */
export interface Mpi extends DistributionConfiguration {
  /** Number of processes per MPI node. */
  processCountPerInstance?: number;
  /** [Required] Specifies the type of distribution framework. */
  distributionType: "Mpi";
}

export function mpiSerializer(item: Mpi): any {
  return {
    distributionType: item["distributionType"],
    processCountPerInstance: item["processCountPerInstance"],
  };
}

export function mpiDeserializer(item: any): Mpi {
  return {
    distributionType: item["distributionType"],
    processCountPerInstance: item["processCountPerInstance"],
  };
}

/** PyTorch distribution configuration. */
export interface PyTorch extends DistributionConfiguration {
  /** Number of processes per node. */
  processCountPerInstance?: number;
  /** [Required] Specifies the type of distribution framework. */
  distributionType: "PyTorch";
}

export function pyTorchSerializer(item: PyTorch): any {
  return {
    distributionType: item["distributionType"],
    processCountPerInstance: item["processCountPerInstance"],
  };
}

export function pyTorchDeserializer(item: any): PyTorch {
  return {
    distributionType: item["distributionType"],
    processCountPerInstance: item["processCountPerInstance"],
  };
}

/** TensorFlow distribution configuration. */
export interface TensorFlow extends DistributionConfiguration {
  /** Number of parameter server tasks. */
  parameterServerCount?: number;
  /** Number of workers. If not specified, will default to the instance count. */
  workerCount?: number;
  /** [Required] Specifies the type of distribution framework. */
  distributionType: "TensorFlow";
}

export function tensorFlowSerializer(item: TensorFlow): any {
  return {
    distributionType: item["distributionType"],
    parameterServerCount: item["parameterServerCount"],
    workerCount: item["workerCount"],
  };
}

export function tensorFlowDeserializer(item: any): TensorFlow {
  return {
    distributionType: item["distributionType"],
    parameterServerCount: item["parameterServerCount"],
    workerCount: item["workerCount"],
  };
}

/** Command Job limit class. */
export interface CommandJobLimits extends JobLimits {
  /** [Required] JobLimit type. */
  jobLimitsType: "Command";
}

export function commandJobLimitsSerializer(item: CommandJobLimits): any {
  return { jobLimitsType: item["jobLimitsType"], timeout: item["timeout"] };
}

export function commandJobLimitsDeserializer(item: any): CommandJobLimits {
  return {
    jobLimitsType: item["jobLimitsType"],
    timeout: item["timeout"],
  };
}

/** Pipeline Job definition: defines generic to MFE attributes. */
export interface PipelineJob extends JobBaseProperties {
  /** Inputs for the pipeline job. */
  inputs?: Record<string, JobInputUnion>;
  /** Jobs construct the Pipeline Job. */
  jobs?: Record<string, any>;
  /** Outputs for the pipeline job */
  outputs?: Record<string, JobOutputUnion>;
  /** Pipeline settings, for things like ContinueRunOnStepFailure etc. */
  settings?: any;
  /** ARM resource ID of source job. */
  sourceJobId?: string;
  /** [Required] Specifies the type of job. */
  jobType: "Pipeline";
}

export function pipelineJobSerializer(item: PipelineJob): any {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionSerializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingSerializer(item["notificationSetting"]),
    services: item["services"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    inputs: item["inputs"],
    jobs: item["jobs"],
    outputs: item["outputs"],
    settings: item["settings"],
    sourceJobId: item["sourceJobId"],
  };
}

export function pipelineJobDeserializer(item: any): PipelineJob {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionDeserializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingDeserializer(item["notificationSetting"]),
    services: !item["services"]
      ? item["services"]
      : Object.fromEntries(
          Object.entries(item["services"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobServiceDeserializer(p1),
          ]),
        ),
    status: item["status"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    inputs: !item["inputs"]
      ? item["inputs"]
      : Object.fromEntries(
          Object.entries(item["inputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobInputUnionDeserializer(p1),
          ]),
        ),
    jobs: !item["jobs"]
      ? item["jobs"]
      : Object.fromEntries(
          Object.entries(item["jobs"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    outputs: !item["outputs"]
      ? item["outputs"]
      : Object.fromEntries(
          Object.entries(item["outputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobOutputUnionDeserializer(p1),
          ]),
        ),
    settings: item["settings"],
    sourceJobId: item["sourceJobId"],
  };
}

/** Spark job definition. */
export interface SparkJob extends JobBaseProperties {
  /** Archive files used in the job. */
  archives?: string[];
  /** Arguments for the job. */
  args?: string;
  /** [Required] arm-id of the code asset. */
  codeId: string;
  /** Spark configured properties. */
  conf?: Record<string, string>;
  /** [Required] The entry to execute on startup of the job. */
  entry: SparkJobEntryUnion;
  /** The ARM resource ID of the Environment specification for the job. */
  environmentId?: string;
  /** Environment variables included in the job. */
  environmentVariables?: Record<string, string>;
  /** Files used in the job. */
  files?: string[];
  /** Mapping of input data bindings used in the job. */
  inputs?: Record<string, JobInputUnion>;
  /** Jar files used in the job. */
  jars?: string[];
  /** Mapping of output data bindings used in the job. */
  outputs?: Record<string, JobOutputUnion>;
  /** Python files used in the job. */
  pyFiles?: string[];
  /** Queue settings for the job */
  queueSettings?: QueueSettings;
  /** Compute Resource configuration for the job. */
  resources?: SparkResourceConfiguration;
  /** [Required] Specifies the type of job. */
  jobType: "Spark";
}

export function sparkJobSerializer(item: SparkJob): any {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionSerializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingSerializer(item["notificationSetting"]),
    services: item["services"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    archives: !item["archives"]
      ? item["archives"]
      : item["archives"].map((p: any) => {
          return p;
        }),
    args: item["args"],
    codeId: item["codeId"],
    conf: item["conf"],
    entry: sparkJobEntryUnionSerializer(item["entry"]),
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    files: !item["files"]
      ? item["files"]
      : item["files"].map((p: any) => {
          return p;
        }),
    inputs: item["inputs"],
    jars: !item["jars"]
      ? item["jars"]
      : item["jars"].map((p: any) => {
          return p;
        }),
    outputs: item["outputs"],
    pyFiles: !item["pyFiles"]
      ? item["pyFiles"]
      : item["pyFiles"].map((p: any) => {
          return p;
        }),
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsSerializer(item["queueSettings"]),
    resources: !item["resources"]
      ? item["resources"]
      : sparkResourceConfigurationSerializer(item["resources"]),
  };
}

export function sparkJobDeserializer(item: any): SparkJob {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionDeserializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingDeserializer(item["notificationSetting"]),
    services: !item["services"]
      ? item["services"]
      : Object.fromEntries(
          Object.entries(item["services"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobServiceDeserializer(p1),
          ]),
        ),
    status: item["status"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    archives: !item["archives"]
      ? item["archives"]
      : item["archives"].map((p1: any) => {
          return p1;
        }),
    args: item["args"],
    codeId: item["codeId"],
    conf: !item["conf"]
      ? item["conf"]
      : Object.fromEntries(
          Object.entries(item["conf"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    entry: sparkJobEntryUnionDeserializer(item["entry"]),
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    files: !item["files"]
      ? item["files"]
      : item["files"].map((p1: any) => {
          return p1;
        }),
    inputs: !item["inputs"]
      ? item["inputs"]
      : Object.fromEntries(
          Object.entries(item["inputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobInputUnionDeserializer(p1),
          ]),
        ),
    jars: !item["jars"]
      ? item["jars"]
      : item["jars"].map((p1: any) => {
          return p1;
        }),
    outputs: !item["outputs"]
      ? item["outputs"]
      : Object.fromEntries(
          Object.entries(item["outputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobOutputUnionDeserializer(p1),
          ]),
        ),
    pyFiles: !item["pyFiles"]
      ? item["pyFiles"]
      : item["pyFiles"].map((p1: any) => {
          return p1;
        }),
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsDeserializer(item["queueSettings"]),
    resources: !item["resources"]
      ? item["resources"]
      : sparkResourceConfigurationDeserializer(item["resources"]),
  };
}

/** Spark job entry point definition. */
export interface SparkJobEntry {
  /** [Required] Type of the job's entry point. */
  /** The discriminator possible values: SparkJobPythonEntry, SparkJobScalaEntry */
  sparkJobEntryType: SparkJobEntryType;
}

export function sparkJobEntrySerializer(item: SparkJobEntry): any {
  return { sparkJobEntryType: item["sparkJobEntryType"] };
}

export function sparkJobEntryDeserializer(item: any): SparkJobEntry {
  return {
    sparkJobEntryType: item["sparkJobEntryType"],
  };
}

/** Alias for SparkJobEntryUnion */
export type SparkJobEntryUnion = SparkJobPythonEntry | SparkJobScalaEntry | SparkJobEntry;

export function sparkJobEntryUnionSerializer(item: SparkJobEntryUnion): any {
  switch (item.sparkJobEntryType) {
    case "SparkJobPythonEntry":
      return sparkJobPythonEntrySerializer(item as SparkJobPythonEntry);

    case "SparkJobScalaEntry":
      return sparkJobScalaEntrySerializer(item as SparkJobScalaEntry);

    default:
      return sparkJobEntrySerializer(item);
  }
}

export function sparkJobEntryUnionDeserializer(item: any): SparkJobEntryUnion {
  switch (item["sparkJobEntryType"]) {
    case "SparkJobPythonEntry":
      return sparkJobPythonEntryDeserializer(item as SparkJobPythonEntry);

    case "SparkJobScalaEntry":
      return sparkJobScalaEntryDeserializer(item as SparkJobScalaEntry);

    default:
      return sparkJobEntryDeserializer(item);
  }
}

/** Known values of {@link SparkJobEntryType} that the service accepts. */
export enum KnownSparkJobEntryType {
  /** SparkJobPythonEntry */
  SparkJobPythonEntry = "SparkJobPythonEntry",
  /** SparkJobScalaEntry */
  SparkJobScalaEntry = "SparkJobScalaEntry",
}

/** Type of SparkJobEntryType */
export type SparkJobEntryType = string;

/** model interface SparkJobPythonEntry */
export interface SparkJobPythonEntry extends SparkJobEntry {
  /** [Required] Relative python file path for job entry point. */
  file: string;
  /** [Required] Type of the job's entry point. */
  sparkJobEntryType: "SparkJobPythonEntry";
}

export function sparkJobPythonEntrySerializer(item: SparkJobPythonEntry): any {
  return { sparkJobEntryType: item["sparkJobEntryType"], file: item["file"] };
}

export function sparkJobPythonEntryDeserializer(item: any): SparkJobPythonEntry {
  return {
    sparkJobEntryType: item["sparkJobEntryType"],
    file: item["file"],
  };
}

/** model interface SparkJobScalaEntry */
export interface SparkJobScalaEntry extends SparkJobEntry {
  /** [Required] Scala class name used as entry point. */
  className: string;
  /** [Required] Type of the job's entry point. */
  sparkJobEntryType: "SparkJobScalaEntry";
}

export function sparkJobScalaEntrySerializer(item: SparkJobScalaEntry): any {
  return { sparkJobEntryType: item["sparkJobEntryType"], className: item["className"] };
}

export function sparkJobScalaEntryDeserializer(item: any): SparkJobScalaEntry {
  return {
    sparkJobEntryType: item["sparkJobEntryType"],
    className: item["className"],
  };
}

/** model interface SparkResourceConfiguration */
export interface SparkResourceConfiguration {
  /** Optional type of VM used as supported by the compute target. */
  instanceType?: string;
  /** Version of spark runtime used for the job. */
  runtimeVersion?: string;
}

export function sparkResourceConfigurationSerializer(item: SparkResourceConfiguration): any {
  return { instanceType: item["instanceType"], runtimeVersion: item["runtimeVersion"] };
}

export function sparkResourceConfigurationDeserializer(item: any): SparkResourceConfiguration {
  return {
    instanceType: item["instanceType"],
    runtimeVersion: item["runtimeVersion"],
  };
}

/** Sweep job definition. */
export interface SweepJob extends JobBaseProperties {
  /** Early termination policies enable canceling poor-performing runs before they complete */
  earlyTermination?: EarlyTerminationPolicyUnion;
  /** Mapping of input data bindings used in the job. */
  inputs?: Record<string, JobInputUnion>;
  /** Sweep Job limit. */
  limits?: SweepJobLimits;
  /** [Required] Optimization objective. */
  objective: Objective;
  /** Mapping of output data bindings used in the job. */
  outputs?: Record<string, JobOutputUnion>;
  /** Queue settings for the job */
  queueSettings?: QueueSettings;
  /** [Required] The hyperparameter sampling algorithm */
  samplingAlgorithm: SamplingAlgorithmUnion;
  /** [Required] A dictionary containing each parameter and its distribution. The dictionary key is the name of the parameter */
  searchSpace: any;
  /** [Required] Trial component definition. */
  trial: TrialComponent;
  /** [Required] Specifies the type of job. */
  jobType: "Sweep";
}

export function sweepJobSerializer(item: SweepJob): any {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionSerializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingSerializer(item["notificationSetting"]),
    services: item["services"],
    description: item["description"],
    properties: item["properties"],
    tags: item["tags"],
    earlyTermination: !item["earlyTermination"]
      ? item["earlyTermination"]
      : earlyTerminationPolicyUnionSerializer(item["earlyTermination"]),
    inputs: item["inputs"],
    limits: !item["limits"] ? item["limits"] : sweepJobLimitsSerializer(item["limits"]),
    objective: objectiveSerializer(item["objective"]),
    outputs: item["outputs"],
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsSerializer(item["queueSettings"]),
    samplingAlgorithm: samplingAlgorithmUnionSerializer(item["samplingAlgorithm"]),
    searchSpace: item["searchSpace"],
    trial: trialComponentSerializer(item["trial"]),
  };
}

export function sweepJobDeserializer(item: any): SweepJob {
  return {
    componentId: item["componentId"],
    computeId: item["computeId"],
    displayName: item["displayName"],
    experimentName: item["experimentName"],
    identity: !item["identity"]
      ? item["identity"]
      : identityConfigurationUnionDeserializer(item["identity"]),
    isArchived: item["isArchived"],
    jobType: item["jobType"],
    notificationSetting: !item["notificationSetting"]
      ? item["notificationSetting"]
      : notificationSettingDeserializer(item["notificationSetting"]),
    services: !item["services"]
      ? item["services"]
      : Object.fromEntries(
          Object.entries(item["services"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobServiceDeserializer(p1),
          ]),
        ),
    status: item["status"],
    description: item["description"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    earlyTermination: !item["earlyTermination"]
      ? item["earlyTermination"]
      : earlyTerminationPolicyUnionDeserializer(item["earlyTermination"]),
    inputs: !item["inputs"]
      ? item["inputs"]
      : Object.fromEntries(
          Object.entries(item["inputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobInputUnionDeserializer(p1),
          ]),
        ),
    limits: !item["limits"] ? item["limits"] : sweepJobLimitsDeserializer(item["limits"]),
    objective: objectiveDeserializer(item["objective"]),
    outputs: !item["outputs"]
      ? item["outputs"]
      : Object.fromEntries(
          Object.entries(item["outputs"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : jobOutputUnionDeserializer(p1),
          ]),
        ),
    queueSettings: !item["queueSettings"]
      ? item["queueSettings"]
      : queueSettingsDeserializer(item["queueSettings"]),
    samplingAlgorithm: samplingAlgorithmUnionDeserializer(item["samplingAlgorithm"]),
    searchSpace: item["searchSpace"],
    trial: trialComponentDeserializer(item["trial"]),
  };
}

/** Sweep Job limit class. */
export interface SweepJobLimits extends JobLimits {
  /** Sweep Job max concurrent trials. */
  maxConcurrentTrials?: number;
  /** Sweep Job max total trials. */
  maxTotalTrials?: number;
  /** Sweep Job Trial timeout value. */
  trialTimeout?: string;
  /** [Required] JobLimit type. */
  jobLimitsType: "Sweep";
}

export function sweepJobLimitsSerializer(item: SweepJobLimits): any {
  return {
    jobLimitsType: item["jobLimitsType"],
    timeout: item["timeout"],
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxTotalTrials: item["maxTotalTrials"],
    trialTimeout: item["trialTimeout"],
  };
}

export function sweepJobLimitsDeserializer(item: any): SweepJobLimits {
  return {
    jobLimitsType: item["jobLimitsType"],
    timeout: item["timeout"],
    maxConcurrentTrials: item["maxConcurrentTrials"],
    maxTotalTrials: item["maxTotalTrials"],
    trialTimeout: item["trialTimeout"],
  };
}

/** Optimization objective. */
export interface Objective {
  /** [Required] Defines supported metric goals for hyperparameter tuning */
  goal: Goal;
  /** [Required] Name of the metric to optimize. */
  primaryMetric: string;
}

export function objectiveSerializer(item: Objective): any {
  return { goal: item["goal"], primaryMetric: item["primaryMetric"] };
}

export function objectiveDeserializer(item: any): Objective {
  return {
    goal: item["goal"],
    primaryMetric: item["primaryMetric"],
  };
}

/** Defines supported metric goals for hyperparameter tuning */
export enum KnownGoal {
  /** Minimize */
  Minimize = "Minimize",
  /** Maximize */
  Maximize = "Maximize",
}

/**
 * Defines supported metric goals for hyperparameter tuning \
 * {@link KnownGoal} can be used interchangeably with Goal,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Minimize** \
 * **Maximize**
 */
export type Goal = string;

/**
 * The Sampling Algorithm used to generate hyperparameter values, along with properties to
 * configure the algorithm
 */
export interface SamplingAlgorithm {
  /** [Required] The algorithm used for generating hyperparameter values, along with configuration properties */
  /** The discriminator possible values: Bayesian, Grid, Random */
  samplingAlgorithmType: SamplingAlgorithmType;
}

export function samplingAlgorithmSerializer(item: SamplingAlgorithm): any {
  return { samplingAlgorithmType: item["samplingAlgorithmType"] };
}

export function samplingAlgorithmDeserializer(item: any): SamplingAlgorithm {
  return {
    samplingAlgorithmType: item["samplingAlgorithmType"],
  };
}

/** Alias for SamplingAlgorithmUnion */
export type SamplingAlgorithmUnion =
  | BayesianSamplingAlgorithm
  | GridSamplingAlgorithm
  | RandomSamplingAlgorithm
  | SamplingAlgorithm;

export function samplingAlgorithmUnionSerializer(item: SamplingAlgorithmUnion): any {
  switch (item.samplingAlgorithmType) {
    case "Bayesian":
      return bayesianSamplingAlgorithmSerializer(item as BayesianSamplingAlgorithm);

    case "Grid":
      return gridSamplingAlgorithmSerializer(item as GridSamplingAlgorithm);

    case "Random":
      return randomSamplingAlgorithmSerializer(item as RandomSamplingAlgorithm);

    default:
      return samplingAlgorithmSerializer(item);
  }
}

export function samplingAlgorithmUnionDeserializer(item: any): SamplingAlgorithmUnion {
  switch (item["samplingAlgorithmType"]) {
    case "Bayesian":
      return bayesianSamplingAlgorithmDeserializer(item as BayesianSamplingAlgorithm);

    case "Grid":
      return gridSamplingAlgorithmDeserializer(item as GridSamplingAlgorithm);

    case "Random":
      return randomSamplingAlgorithmDeserializer(item as RandomSamplingAlgorithm);

    default:
      return samplingAlgorithmDeserializer(item);
  }
}

/** Defines a Sampling Algorithm that generates values based on previous values */
export interface BayesianSamplingAlgorithm extends SamplingAlgorithm {
  /** [Required] The algorithm used for generating hyperparameter values, along with configuration properties */
  samplingAlgorithmType: "Bayesian";
}

export function bayesianSamplingAlgorithmSerializer(item: BayesianSamplingAlgorithm): any {
  return { samplingAlgorithmType: item["samplingAlgorithmType"] };
}

export function bayesianSamplingAlgorithmDeserializer(item: any): BayesianSamplingAlgorithm {
  return {
    samplingAlgorithmType: item["samplingAlgorithmType"],
  };
}

/** Defines a Sampling Algorithm that exhaustively generates every value combination in the space */
export interface GridSamplingAlgorithm extends SamplingAlgorithm {
  /** [Required] The algorithm used for generating hyperparameter values, along with configuration properties */
  samplingAlgorithmType: "Grid";
}

export function gridSamplingAlgorithmSerializer(item: GridSamplingAlgorithm): any {
  return { samplingAlgorithmType: item["samplingAlgorithmType"] };
}

export function gridSamplingAlgorithmDeserializer(item: any): GridSamplingAlgorithm {
  return {
    samplingAlgorithmType: item["samplingAlgorithmType"],
  };
}

/** Defines a Sampling Algorithm that generates values randomly */
export interface RandomSamplingAlgorithm extends SamplingAlgorithm {
  /** The specific type of random algorithm */
  rule?: RandomSamplingAlgorithmRule;
  /** An optional integer to use as the seed for random number generation */
  seed?: number;
  /** [Required] The algorithm used for generating hyperparameter values, along with configuration properties */
  samplingAlgorithmType: "Random";
}

export function randomSamplingAlgorithmSerializer(item: RandomSamplingAlgorithm): any {
  return {
    samplingAlgorithmType: item["samplingAlgorithmType"],
    rule: item["rule"],
    seed: item["seed"],
  };
}

export function randomSamplingAlgorithmDeserializer(item: any): RandomSamplingAlgorithm {
  return {
    samplingAlgorithmType: item["samplingAlgorithmType"],
    rule: item["rule"],
    seed: item["seed"],
  };
}

/** The specific type of random algorithm */
export enum KnownRandomSamplingAlgorithmRule {
  /** Random */
  Random = "Random",
  /** Sobol */
  Sobol = "Sobol",
}

/**
 * The specific type of random algorithm \
 * {@link KnownRandomSamplingAlgorithmRule} can be used interchangeably with RandomSamplingAlgorithmRule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Random** \
 * **Sobol**
 */
export type RandomSamplingAlgorithmRule = string;

/** Trial component definition. */
export interface TrialComponent {
  /** ARM resource ID of the code asset. */
  codeId?: string;
  /** [Required] The command to execute on startup of the job. eg. "python train.py" */
  command: string;
  /** Distribution configuration of the job. If set, this should be one of Mpi, Tensorflow, PyTorch, or null. */
  distribution?: DistributionConfigurationUnion;
  /** [Required] The ARM resource ID of the Environment specification for the job. */
  environmentId: string;
  /** Environment variables included in the job. */
  environmentVariables?: Record<string, string>;
  /** Compute Resource configuration for the job. */
  resources?: JobResourceConfiguration;
}

export function trialComponentSerializer(item: TrialComponent): any {
  return {
    codeId: item["codeId"],
    command: item["command"],
    distribution: !item["distribution"]
      ? item["distribution"]
      : distributionConfigurationUnionSerializer(item["distribution"]),
    environmentId: item["environmentId"],
    environmentVariables: item["environmentVariables"],
    resources: !item["resources"]
      ? item["resources"]
      : jobResourceConfigurationSerializer(item["resources"]),
  };
}

export function trialComponentDeserializer(item: any): TrialComponent {
  return {
    codeId: item["codeId"],
    command: item["command"],
    distribution: !item["distribution"]
      ? item["distribution"]
      : distributionConfigurationUnionDeserializer(item["distribution"]),
    environmentId: item["environmentId"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    resources: !item["resources"]
      ? item["resources"]
      : jobResourceConfigurationDeserializer(item["resources"]),
  };
}

/** Known values of {@link ScheduleProvisioningStatus} that the service accepts. */
export enum KnownScheduleProvisioningStatus {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/** Type of ScheduleProvisioningStatus */
export type ScheduleProvisioningStatus = string;

/** Featurization Configuration. */
export interface FeaturizationSettings {
  /** Dataset language, useful for the text data. */
  datasetLanguage?: string;
}

export function featurizationSettingsSerializer(item: FeaturizationSettings): any {
  return { datasetLanguage: item["datasetLanguage"] };
}

export function featurizationSettingsDeserializer(item: any): FeaturizationSettings {
  return {
    datasetLanguage: item["datasetLanguage"],
  };
}

/** Training related configuration. */
export interface TrainingSettings {
  /** Enable recommendation of DNN models. */
  enableDnnTraining?: boolean;
  /** Flag to turn on explainability on best model. */
  enableModelExplainability?: boolean;
  /** Flag for enabling onnx compatible models. */
  enableOnnxCompatibleModels?: boolean;
  /** Enable stack ensemble run. */
  enableStackEnsemble?: boolean;
  /** Enable voting ensemble run. */
  enableVoteEnsemble?: boolean;
  /**
   * During VotingEnsemble and StackEnsemble model generation, multiple fitted models from the previous child runs are downloaded.
   * Configure this parameter with a higher value than 300 secs, if more time is needed.
   */
  ensembleModelDownloadTimeout?: string;
  /** Stack ensemble settings for stack ensemble run. */
  stackEnsembleSettings?: StackEnsembleSettings;
}

export function trainingSettingsSerializer(item: TrainingSettings): any {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsSerializer(item["stackEnsembleSettings"]),
  };
}

export function trainingSettingsDeserializer(item: any): TrainingSettings {
  return {
    enableDnnTraining: item["enableDnnTraining"],
    enableModelExplainability: item["enableModelExplainability"],
    enableOnnxCompatibleModels: item["enableOnnxCompatibleModels"],
    enableStackEnsemble: item["enableStackEnsemble"],
    enableVoteEnsemble: item["enableVoteEnsemble"],
    ensembleModelDownloadTimeout: item["ensembleModelDownloadTimeout"],
    stackEnsembleSettings: !item["stackEnsembleSettings"]
      ? item["stackEnsembleSettings"]
      : stackEnsembleSettingsDeserializer(item["stackEnsembleSettings"]),
  };
}

/** Advances setting to customize StackEnsemble run. */
export interface StackEnsembleSettings {
  /** Optional parameters to pass to the initializer of the meta-learner. */
  stackMetaLearnerKWargs?: any;
  /** Specifies the proportion of the training set (when choosing train and validation type of training) to be reserved for training the meta-learner. Default value is 0.2. */
  stackMetaLearnerTrainPercentage?: number;
  /** The meta-learner is a model trained on the output of the individual heterogeneous models.\r\nDefault meta-learners are LogisticRegression for classification tasks (or LogisticRegressionCV if cross-validation is enabled) and ElasticNet for regression/forecasting tasks (or ElasticNetCV if cross-validation is enabled).\r\nThis parameter can be one of the following strings: LogisticRegression, LogisticRegressionCV, LightGBMClassifier, ElasticNet, ElasticNetCV, LightGBMRegressor, or LinearRegression */
  stackMetaLearnerType?: StackMetaLearnerType;
}

export function stackEnsembleSettingsSerializer(item: StackEnsembleSettings): any {
  return {
    stackMetaLearnerKWargs: item["stackMetaLearnerKWargs"],
    stackMetaLearnerTrainPercentage: item["stackMetaLearnerTrainPercentage"],
    stackMetaLearnerType: item["stackMetaLearnerType"],
  };
}

export function stackEnsembleSettingsDeserializer(item: any): StackEnsembleSettings {
  return {
    stackMetaLearnerKWargs: item["stackMetaLearnerKWargs"],
    stackMetaLearnerTrainPercentage: item["stackMetaLearnerTrainPercentage"],
    stackMetaLearnerType: item["stackMetaLearnerType"],
  };
}

/**
 * The meta-learner is a model trained on the output of the individual heterogeneous models.
 * Default meta-learners are LogisticRegression for classification tasks (or LogisticRegressionCV if cross-validation is enabled) and ElasticNet for regression/forecasting tasks (or ElasticNetCV if cross-validation is enabled).
 * This parameter can be one of the following strings: LogisticRegression, LogisticRegressionCV, LightGBMClassifier, ElasticNet, ElasticNetCV, LightGBMRegressor, or LinearRegression
 */
export enum KnownStackMetaLearnerType {
  /** None */
  None = "None",
  /** Default meta-learners are LogisticRegression for classification tasks. */
  LogisticRegression = "LogisticRegression",
  /** Default meta-learners are LogisticRegression for classification task when CV is on. */
  LogisticRegressionCV = "LogisticRegressionCV",
  /** LightGBMClassifier */
  LightGBMClassifier = "LightGBMClassifier",
  /** Default meta-learners are LogisticRegression for regression task. */
  ElasticNet = "ElasticNet",
  /** Default meta-learners are LogisticRegression for regression task when CV is on. */
  ElasticNetCV = "ElasticNetCV",
  /** LightGBMRegressor */
  LightGBMRegressor = "LightGBMRegressor",
  /** LinearRegression */
  LinearRegression = "LinearRegression",
}

/**
 * The meta-learner is a model trained on the output of the individual heterogeneous models.
 * Default meta-learners are LogisticRegression for classification tasks (or LogisticRegressionCV if cross-validation is enabled) and ElasticNet for regression/forecasting tasks (or ElasticNetCV if cross-validation is enabled).
 * This parameter can be one of the following strings: LogisticRegression, LogisticRegressionCV, LightGBMClassifier, ElasticNet, ElasticNetCV, LightGBMRegressor, or LinearRegression \
 * {@link KnownStackMetaLearnerType} can be used interchangeably with StackMetaLearnerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **LogisticRegression**: Default meta-learners are LogisticRegression for classification tasks. \
 * **LogisticRegressionCV**: Default meta-learners are LogisticRegression for classification task when CV is on. \
 * **LightGBMClassifier** \
 * **ElasticNet**: Default meta-learners are LogisticRegression for regression task. \
 * **ElasticNetCV**: Default meta-learners are LogisticRegression for regression task when CV is on. \
 * **LightGBMRegressor** \
 * **LinearRegression**
 */
export type StackMetaLearnerType = string;

/**
 * Settings used for training the model.
 * For more information on the available settings please visit the official documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
 */
export interface ImageModelSettings {
  /** Settings for advanced scenarios. */
  advancedSettings?: string;
  /** Enable AMSGrad when optimizer is 'adam' or 'adamw'. */
  amsGradient?: boolean;
  /** Settings for using Augmentations. */
  augmentations?: string;
  /** Value of 'beta1' when optimizer is 'adam' or 'adamw'. Must be a float in the range [0, 1]. */
  beta1?: number;
  /** Value of 'beta2' when optimizer is 'adam' or 'adamw'. Must be a float in the range [0, 1]. */
  beta2?: number;
  /** Frequency to store model checkpoints. Must be a positive integer. */
  checkpointFrequency?: number;
  /** The pretrained checkpoint model for incremental training. */
  checkpointModel?: MLFlowModelJobInput;
  /** The id of a previous run that has a pretrained checkpoint for incremental training. */
  checkpointRunId?: string;
  /** Whether to use distributed training. */
  distributed?: boolean;
  /** Enable early stopping logic during training. */
  earlyStopping?: boolean;
  /**
   * Minimum number of epochs or validation evaluations to wait before primary metric improvement
   * is tracked for early stopping. Must be a positive integer.
   */
  earlyStoppingDelay?: number;
  /**
   * Minimum number of epochs or validation evaluations with no primary metric improvement before
   * the run is stopped. Must be a positive integer.
   */
  earlyStoppingPatience?: number;
  /** Enable normalization when exporting ONNX model. */
  enableOnnxNormalization?: boolean;
  /** Frequency to evaluate validation dataset to get metric scores. Must be a positive integer. */
  evaluationFrequency?: number;
  /**
   * Gradient accumulation means running a configured number of "GradAccumulationStep" steps without
   * updating the model weights while accumulating the gradients of those steps, and then using
   * the accumulated gradients to compute the weight updates. Must be a positive integer.
   */
  gradientAccumulationStep?: number;
  /**
   * Number of layers to freeze for the model. Must be a positive integer.
   * For instance, passing 2 as value for 'seresnext' means
   * freezing layer0 and layer1. For a full list of models supported and details on layer freeze, please
   * see: https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
   */
  layersToFreeze?: number;
  /** Initial learning rate. Must be a float in the range [0, 1]. */
  learningRate?: number;
  /** Learning rate scheduler enum. */
  learningRateScheduler?: LearningRateScheduler;
  /**
   * Name of the model to use for training.
   * For more information on the available models please visit the official documentation:
   * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
   */
  modelName?: string;
  /** Value of momentum when optimizer is 'sgd'. Must be a float in the range [0, 1]. */
  momentum?: number;
  /** Enable nesterov when optimizer is 'sgd'. */
  nesterov?: boolean;
  /** Number of training epochs. Must be a positive integer. */
  numberOfEpochs?: number;
  /** Number of data loader workers. Must be a non-negative integer. */
  numberOfWorkers?: number;
  /** Stochastic optimizer for image models. */
  optimizer?: StochasticOptimizer;
  /** Random seed to be used when using deterministic training. */
  randomSeed?: number;
  /** Value of gamma when learning rate scheduler is 'step'. Must be a float in the range [0, 1]. */
  stepLRGamma?: number;
  /** Value of step size when learning rate scheduler is 'step'. Must be a positive integer. */
  stepLRStepSize?: number;
  /** Training batch size. Must be a positive integer. */
  trainingBatchSize?: number;
  /** Validation batch size. Must be a positive integer. */
  validationBatchSize?: number;
  /** Value of cosine cycle when learning rate scheduler is 'warmup_cosine'. Must be a float in the range [0, 1]. */
  warmupCosineLRCycles?: number;
  /** Value of warmup epochs when learning rate scheduler is 'warmup_cosine'. Must be a positive integer. */
  warmupCosineLRWarmupEpochs?: number;
  /** Value of weight decay when optimizer is 'sgd', 'adam', or 'adamw'. Must be a float in the range[0, 1]. */
  weightDecay?: number;
}

export function imageModelSettingsSerializer(item: ImageModelSettings): any {
  return {
    advancedSettings: item["advancedSettings"],
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    checkpointFrequency: item["checkpointFrequency"],
    checkpointModel: !item["checkpointModel"]
      ? item["checkpointModel"]
      : mlFlowModelJobInputSerializer(item["checkpointModel"]),
    checkpointRunId: item["checkpointRunId"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
  };
}

export function imageModelSettingsDeserializer(item: any): ImageModelSettings {
  return {
    advancedSettings: item["advancedSettings"],
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    checkpointFrequency: item["checkpointFrequency"],
    checkpointModel: !item["checkpointModel"]
      ? item["checkpointModel"]
      : mlFlowModelJobInputDeserializer(item["checkpointModel"]),
    checkpointRunId: item["checkpointRunId"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
  };
}

/** Learning rate scheduler enum. */
export enum KnownLearningRateScheduler {
  /** No learning rate scheduler selected. */
  None = "None",
  /** Cosine Annealing With Warmup. */
  WarmupCosine = "WarmupCosine",
  /** Step learning rate scheduler. */
  Step = "Step",
}

/**
 * Learning rate scheduler enum. \
 * {@link KnownLearningRateScheduler} can be used interchangeably with LearningRateScheduler,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No learning rate scheduler selected. \
 * **WarmupCosine**: Cosine Annealing With Warmup. \
 * **Step**: Step learning rate scheduler.
 */
export type LearningRateScheduler = string;

/** Stochastic optimizer for image models. */
export enum KnownStochasticOptimizer {
  /** No optimizer selected. */
  None = "None",
  /** Stochastic Gradient Descent optimizer. */
  Sgd = "Sgd",
  /** Adam is algorithm the optimizes stochastic objective functions based on adaptive estimates of moments */
  Adam = "Adam",
  /** AdamW is a variant of the optimizer Adam that has an improved implementation of weight decay. */
  Adamw = "Adamw",
}

/**
 * Stochastic optimizer for image models. \
 * {@link KnownStochasticOptimizer} can be used interchangeably with StochasticOptimizer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No optimizer selected. \
 * **Sgd**: Stochastic Gradient Descent optimizer. \
 * **Adam**: Adam is algorithm the optimizes stochastic objective functions based on adaptive estimates of moments \
 * **Adamw**: AdamW is a variant of the optimizer Adam that has an improved implementation of weight decay.
 */
export type StochasticOptimizer = string;

/**
 * Distribution expressions to sweep over values of model settings.
 * <example>
 * Some examples are:
 * ```
 * ModelName = "choice('seresnext', 'resnest50')";
 * LearningRate = "uniform(0.001, 0.01)";
 * LayersToFreeze = "choice(0, 2)";
 * ```</example>
 * All distributions can be specified as distribution_name(min, max) or choice(val1, val2, ..., valn)
 * where distribution name can be: uniform, quniform, loguniform, etc
 * For more details on how to compose distribution expressions please check the documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-tune-hyperparameters
 * For more information on the available settings please visit the official documentation:
 * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
 */
export interface ImageModelDistributionSettings {
  /** Enable AMSGrad when optimizer is 'adam' or 'adamw'. */
  amsGradient?: string;
  /** Settings for using Augmentations. */
  augmentations?: string;
  /** Value of 'beta1' when optimizer is 'adam' or 'adamw'. Must be a float in the range [0, 1]. */
  beta1?: string;
  /** Value of 'beta2' when optimizer is 'adam' or 'adamw'. Must be a float in the range [0, 1]. */
  beta2?: string;
  /** Whether to use distributer training. */
  distributed?: string;
  /** Enable early stopping logic during training. */
  earlyStopping?: string;
  /**
   * Minimum number of epochs or validation evaluations to wait before primary metric improvement
   * is tracked for early stopping. Must be a positive integer.
   */
  earlyStoppingDelay?: string;
  /**
   * Minimum number of epochs or validation evaluations with no primary metric improvement before
   * the run is stopped. Must be a positive integer.
   */
  earlyStoppingPatience?: string;
  /** Enable normalization when exporting ONNX model. */
  enableOnnxNormalization?: string;
  /** Frequency to evaluate validation dataset to get metric scores. Must be a positive integer. */
  evaluationFrequency?: string;
  /**
   * Gradient accumulation means running a configured number of "GradAccumulationStep" steps without
   * updating the model weights while accumulating the gradients of those steps, and then using
   * the accumulated gradients to compute the weight updates. Must be a positive integer.
   */
  gradientAccumulationStep?: string;
  /**
   * Number of layers to freeze for the model. Must be a positive integer.
   * For instance, passing 2 as value for 'seresnext' means
   * freezing layer0 and layer1. For a full list of models supported and details on layer freeze, please
   * see: https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
   */
  layersToFreeze?: string;
  /** Initial learning rate. Must be a float in the range [0, 1]. */
  learningRate?: string;
  /** Type of learning rate scheduler. Must be 'warmup_cosine' or 'step'. */
  learningRateScheduler?: string;
  /**
   * Name of the model to use for training.
   * For more information on the available models please visit the official documentation:
   * https://docs.microsoft.com/en-us/azure/machine-learning/how-to-auto-train-image-models.
   */
  modelName?: string;
  /** Value of momentum when optimizer is 'sgd'. Must be a float in the range [0, 1]. */
  momentum?: string;
  /** Enable nesterov when optimizer is 'sgd'. */
  nesterov?: string;
  /** Number of training epochs. Must be a positive integer. */
  numberOfEpochs?: string;
  /** Number of data loader workers. Must be a non-negative integer. */
  numberOfWorkers?: string;
  /** Type of optimizer. Must be either 'sgd', 'adam', or 'adamw'. */
  optimizer?: string;
  /** Random seed to be used when using deterministic training. */
  randomSeed?: string;
  /** Value of gamma when learning rate scheduler is 'step'. Must be a float in the range [0, 1]. */
  stepLRGamma?: string;
  /** Value of step size when learning rate scheduler is 'step'. Must be a positive integer. */
  stepLRStepSize?: string;
  /** Training batch size. Must be a positive integer. */
  trainingBatchSize?: string;
  /** Validation batch size. Must be a positive integer. */
  validationBatchSize?: string;
  /** Value of cosine cycle when learning rate scheduler is 'warmup_cosine'. Must be a float in the range [0, 1]. */
  warmupCosineLRCycles?: string;
  /** Value of warmup epochs when learning rate scheduler is 'warmup_cosine'. Must be a positive integer. */
  warmupCosineLRWarmupEpochs?: string;
  /** Value of weight decay when optimizer is 'sgd', 'adam', or 'adamw'. Must be a float in the range[0, 1]. */
  weightDecay?: string;
}

export function imageModelDistributionSettingsSerializer(
  item: ImageModelDistributionSettings,
): any {
  return {
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
  };
}

export function imageModelDistributionSettingsDeserializer(
  item: any,
): ImageModelDistributionSettings {
  return {
    amsGradient: item["amsGradient"],
    augmentations: item["augmentations"],
    beta1: item["beta1"],
    beta2: item["beta2"],
    distributed: item["distributed"],
    earlyStopping: item["earlyStopping"],
    earlyStoppingDelay: item["earlyStoppingDelay"],
    earlyStoppingPatience: item["earlyStoppingPatience"],
    enableOnnxNormalization: item["enableOnnxNormalization"],
    evaluationFrequency: item["evaluationFrequency"],
    gradientAccumulationStep: item["gradientAccumulationStep"],
    layersToFreeze: item["layersToFreeze"],
    learningRate: item["learningRate"],
    learningRateScheduler: item["learningRateScheduler"],
    modelName: item["modelName"],
    momentum: item["momentum"],
    nesterov: item["nesterov"],
    numberOfEpochs: item["numberOfEpochs"],
    numberOfWorkers: item["numberOfWorkers"],
    optimizer: item["optimizer"],
    randomSeed: item["randomSeed"],
    stepLRGamma: item["stepLRGamma"],
    stepLRStepSize: item["stepLRStepSize"],
    trainingBatchSize: item["trainingBatchSize"],
    validationBatchSize: item["validationBatchSize"],
    warmupCosineLRCycles: item["warmupCosineLRCycles"],
    warmupCosineLRWarmupEpochs: item["warmupCosineLRWarmupEpochs"],
    weightDecay: item["weightDecay"],
  };
}

/** model interface JobLimits */
export interface JobLimits {
  /** [Required] JobLimit type. */
  /** The discriminator possible values: Command, Sweep */
  jobLimitsType: JobLimitsType;
  /** The max run duration in ISO 8601 format, after which the job will be cancelled. Only supports duration with precision as low as Seconds. */
  timeout?: string;
}

export function jobLimitsSerializer(item: JobLimits): any {
  return { jobLimitsType: item["jobLimitsType"], timeout: item["timeout"] };
}

export function jobLimitsDeserializer(item: any): JobLimits {
  return {
    jobLimitsType: item["jobLimitsType"],
    timeout: item["timeout"],
  };
}

/** Alias for JobLimitsUnion */
export type JobLimitsUnion = CommandJobLimits | SweepJobLimits | JobLimits;

export function jobLimitsUnionSerializer(item: JobLimitsUnion): any {
  switch (item.jobLimitsType) {
    case "Command":
      return commandJobLimitsSerializer(item as CommandJobLimits);

    case "Sweep":
      return sweepJobLimitsSerializer(item as SweepJobLimits);

    default:
      return jobLimitsSerializer(item);
  }
}

export function jobLimitsUnionDeserializer(item: any): JobLimitsUnion {
  switch (item["jobLimitsType"]) {
    case "Command":
      return commandJobLimitsDeserializer(item as CommandJobLimits);

    case "Sweep":
      return sweepJobLimitsDeserializer(item as SweepJobLimits);

    default:
      return jobLimitsDeserializer(item);
  }
}

/** Known values of {@link JobLimitsType} that the service accepts. */
export enum KnownJobLimitsType {
  /** Command */
  Command = "Command",
  /** Sweep */
  Sweep = "Sweep",
}

/** Type of JobLimitsType */
export type JobLimitsType = string;

/** A paginated list of Schedule entities. */
export interface _ScheduleResourceArmPaginatedResult {
  /** The Schedule items on this page */
  value: Schedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduleResourceArmPaginatedResultDeserializer(
  item: any,
): _ScheduleResourceArmPaginatedResult {
  return {
    value: scheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduleArraySerializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleSerializer(item);
  });
}

export function scheduleArrayDeserializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface ServerlessEndpoint extends TrackedResource {
  /** [Required] Additional attributes of the entity. */
  properties: ServerlessEndpointProperties;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: Sku;
}

export function serverlessEndpointSerializer(item: ServerlessEndpoint): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: serverlessEndpointPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function serverlessEndpointDeserializer(item: any): ServerlessEndpoint {
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
    properties: serverlessEndpointPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** model interface ServerlessEndpointProperties */
export interface ServerlessEndpointProperties {
  /** [Required] Specifies the authentication mode for the Serverless endpoint. */
  authMode: ServerlessInferenceEndpointAuthMode;
  /** Specifies the content safety options. If omitted, the default content safety settings will be configured */
  contentSafety?: ContentSafety;
  /** The current state of the ServerlessEndpoint. */
  readonly endpointState?: ServerlessEndpointState;
  /** The inference uri to target when making requests against the serverless endpoint */
  readonly inferenceEndpoint?: ServerlessInferenceEndpoint;
  /** The MarketplaceSubscription Azure ID associated to this ServerlessEndpoint. */
  readonly marketplaceSubscriptionId?: string;
  /** The model settings (model id) for the model being serviced on the ServerlessEndpoint. */
  modelSettings?: ModelSettings;
  /** State of endpoint provisioning. */
  readonly provisioningState?: EndpointProvisioningState;
}

export function serverlessEndpointPropertiesSerializer(item: ServerlessEndpointProperties): any {
  return {
    authMode: item["authMode"],
    contentSafety: !item["contentSafety"]
      ? item["contentSafety"]
      : contentSafetySerializer(item["contentSafety"]),
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : modelSettingsSerializer(item["modelSettings"]),
  };
}

export function serverlessEndpointPropertiesDeserializer(item: any): ServerlessEndpointProperties {
  return {
    authMode: item["authMode"],
    contentSafety: !item["contentSafety"]
      ? item["contentSafety"]
      : contentSafetyDeserializer(item["contentSafety"]),
    endpointState: item["endpointState"],
    inferenceEndpoint: !item["inferenceEndpoint"]
      ? item["inferenceEndpoint"]
      : serverlessInferenceEndpointDeserializer(item["inferenceEndpoint"]),
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    modelSettings: !item["modelSettings"]
      ? item["modelSettings"]
      : modelSettingsDeserializer(item["modelSettings"]),
    provisioningState: item["provisioningState"],
  };
}

/** Known values of {@link ServerlessInferenceEndpointAuthMode} that the service accepts. */
export enum KnownServerlessInferenceEndpointAuthMode {
  /** Key */
  Key = "Key",
  /** AAD */
  AAD = "AAD",
  /** KeyAndAAD */
  KeyAndAAD = "KeyAndAAD",
}

/** Type of ServerlessInferenceEndpointAuthMode */
export type ServerlessInferenceEndpointAuthMode = string;

/** model interface ContentSafety */
export interface ContentSafety {
  /** [Required] Specifies the status of content safety. */
  contentSafetyStatus: ContentSafetyStatus;
}

export function contentSafetySerializer(item: ContentSafety): any {
  return { contentSafetyStatus: item["contentSafetyStatus"] };
}

export function contentSafetyDeserializer(item: any): ContentSafety {
  return {
    contentSafetyStatus: item["contentSafetyStatus"],
  };
}

/** Specifies the status of content safety. */
export enum KnownContentSafetyStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Specifies the status of content safety. \
 * {@link KnownContentSafetyStatus} can be used interchangeably with ContentSafetyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ContentSafetyStatus = string;

/** State of the Serverless Endpoint. */
export enum KnownServerlessEndpointState {
  /** Unknown */
  Unknown = "Unknown",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Suspending */
  Suspending = "Suspending",
  /** Reinstating */
  Reinstating = "Reinstating",
  /** Online */
  Online = "Online",
  /** Suspended */
  Suspended = "Suspended",
  /** CreationFailed */
  CreationFailed = "CreationFailed",
  /** DeletionFailed */
  DeletionFailed = "DeletionFailed",
}

/**
 * State of the Serverless Endpoint. \
 * {@link KnownServerlessEndpointState} can be used interchangeably with ServerlessEndpointState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Creating** \
 * **Deleting** \
 * **Suspending** \
 * **Reinstating** \
 * **Online** \
 * **Suspended** \
 * **CreationFailed** \
 * **DeletionFailed**
 */
export type ServerlessEndpointState = string;

/** model interface ServerlessInferenceEndpoint */
export interface ServerlessInferenceEndpoint {
  /** Specifies any required headers to target this serverless endpoint. */
  readonly headers?: Record<string, string>;
  /** [Required] The inference uri to target when making requests against the Serverless Endpoint. */
  readonly uri: string;
}

export function serverlessInferenceEndpointDeserializer(item: any): ServerlessInferenceEndpoint {
  return {
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k1, p1]: [string, any]) => [k1, !p1 ? p1 : p1]),
        ),
    uri: item["uri"],
  };
}

/** model interface ModelSettings */
export interface ModelSettings {
  /** The unique model identifier that this ServerlessEndpoint should provision. */
  modelId?: string;
}

export function modelSettingsSerializer(item: ModelSettings): any {
  return { modelId: item["modelId"] };
}

export function modelSettingsDeserializer(item: any): ModelSettings {
  return {
    modelId: item["modelId"],
  };
}

/** Strictly used in update requests. */
export interface PartialMinimalTrackedResourceWithSkuAndIdentity extends PartialMinimalTrackedResource {
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: PartialManagedServiceIdentity;
  /** Sku details required for ARM contract for Autoscaling. */
  sku?: PartialSku;
}

export function partialMinimalTrackedResourceWithSkuAndIdentitySerializer(
  item: PartialMinimalTrackedResourceWithSkuAndIdentity,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : partialManagedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : partialSkuSerializer(item["sku"]),
  };
}

/** A paginated list of ServerlessEndpoint entities. */
export interface _ServerlessEndpointTrackedResourceArmPaginatedResult {
  /** The ServerlessEndpoint items on this page */
  value: ServerlessEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverlessEndpointTrackedResourceArmPaginatedResultDeserializer(
  item: any,
): _ServerlessEndpointTrackedResourceArmPaginatedResult {
  return {
    value: serverlessEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverlessEndpointArraySerializer(result: Array<ServerlessEndpoint>): any[] {
  return result.map((item) => {
    return serverlessEndpointSerializer(item);
  });
}

export function serverlessEndpointArrayDeserializer(result: Array<ServerlessEndpoint>): any[] {
  return result.map((item) => {
    return serverlessEndpointDeserializer(item);
  });
}

/** List of private endpoint connection associated with the specified workspace */
export interface _PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Machine Learning compute object wrapped into ARM resource envelope. */
export interface ComputeResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ComputeUnion;
  /** Specifies the location of the resource. */
  location?: string;
  /** Contains resource tags defined as key/value pairs. */
  tags?: Record<string, string>;
  /** The sku of the workspace. */
  sku?: Sku;
  /** The identity of the resource. */
  identity?: ManagedServiceIdentity;
}

export function computeResourceSerializer(item: ComputeResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : computeUnionSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function computeResourceDeserializer(item: any): ComputeResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : computeUnionDeserializer(item["properties"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Machine Learning compute object. */
export interface Compute {
  /** The type of compute */
  /** The discriminator possible values: AKS, Kubernetes, AmlCompute, ComputeInstance, VirtualMachine, HDInsight, DataFactory, Databricks, DataLakeAnalytics, SynapseSpark */
  computeType: ComputeType;
  /** Location for the underlying compute */
  computeLocation?: string;
  /** The provision state of the cluster. Valid values are Unknown, Updating, Provisioning, Succeeded, and Failed. */
  readonly provisioningState?: ProvisioningState;
  /** The description of the Machine Learning compute. */
  description?: string;
  /** The time at which the compute was created. */
  readonly createdOn?: Date;
  /** The time at which the compute was last modified. */
  readonly modifiedOn?: Date;
  /** ARM resource id of the underlying compute */
  resourceId?: string;
  /** Errors during provisioning */
  readonly provisioningErrors?: ErrorResponse[];
  /** Indicating whether the compute was provisioned by user and brought from outside if true, or machine learning service provisioned it if false. */
  readonly isAttachedCompute?: boolean;
  /** Opt-out of local authentication and ensure customers can use only MSI and AAD exclusively for authentication. */
  disableLocalAuth?: boolean;
}

export function computeSerializer(item: Compute): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function computeDeserializer(item: any): Compute {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** Alias for ComputeUnion */
export type ComputeUnion =
  | AKS
  | Kubernetes
  | AmlCompute
  | ComputeInstance
  | VirtualMachine
  | HDInsight
  | DataFactory
  | Databricks
  | DataLakeAnalytics
  | SynapseSpark
  | Compute;

export function computeUnionSerializer(item: ComputeUnion): any {
  switch (item.computeType) {
    case "AKS":
      return aksSerializer(item as AKS);

    case "Kubernetes":
      return kubernetesSerializer(item as Kubernetes);

    case "AmlCompute":
      return amlComputeSerializer(item as AmlCompute);

    case "ComputeInstance":
      return computeInstanceSerializer(item as ComputeInstance);

    case "VirtualMachine":
      return virtualMachineSerializer(item as VirtualMachine);

    case "HDInsight":
      return hdInsightSerializer(item as HDInsight);

    case "DataFactory":
      return dataFactorySerializer(item as DataFactory);

    case "Databricks":
      return databricksSerializer(item as Databricks);

    case "DataLakeAnalytics":
      return dataLakeAnalyticsSerializer(item as DataLakeAnalytics);

    case "SynapseSpark":
      return synapseSparkSerializer(item as SynapseSpark);

    default:
      return computeSerializer(item);
  }
}

export function computeUnionDeserializer(item: any): ComputeUnion {
  switch (item["computeType"]) {
    case "AKS":
      return aksDeserializer(item as AKS);

    case "Kubernetes":
      return kubernetesDeserializer(item as Kubernetes);

    case "AmlCompute":
      return amlComputeDeserializer(item as AmlCompute);

    case "ComputeInstance":
      return computeInstanceDeserializer(item as ComputeInstance);

    case "VirtualMachine":
      return virtualMachineDeserializer(item as VirtualMachine);

    case "HDInsight":
      return hdInsightDeserializer(item as HDInsight);

    case "DataFactory":
      return dataFactoryDeserializer(item as DataFactory);

    case "Databricks":
      return databricksDeserializer(item as Databricks);

    case "DataLakeAnalytics":
      return dataLakeAnalyticsDeserializer(item as DataLakeAnalytics);

    case "SynapseSpark":
      return synapseSparkDeserializer(item as SynapseSpark);

    default:
      return computeDeserializer(item);
  }
}

/** The type of compute */
export enum KnownComputeType {
  /** AKS */
  AKS = "AKS",
  /** Kubernetes */
  Kubernetes = "Kubernetes",
  /** AmlCompute */
  AmlCompute = "AmlCompute",
  /** ComputeInstance */
  ComputeInstance = "ComputeInstance",
  /** DataFactory */
  DataFactory = "DataFactory",
  /** VirtualMachine */
  VirtualMachine = "VirtualMachine",
  /** HDInsight */
  HDInsight = "HDInsight",
  /** Databricks */
  Databricks = "Databricks",
  /** DataLakeAnalytics */
  DataLakeAnalytics = "DataLakeAnalytics",
  /** SynapseSpark */
  SynapseSpark = "SynapseSpark",
}

/**
 * The type of compute \
 * {@link KnownComputeType} can be used interchangeably with ComputeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AKS** \
 * **Kubernetes** \
 * **AmlCompute** \
 * **ComputeInstance** \
 * **DataFactory** \
 * **VirtualMachine** \
 * **HDInsight** \
 * **Databricks** \
 * **DataLakeAnalytics** \
 * **SynapseSpark**
 */
export type ComputeType = string;

export function errorResponseArrayDeserializer(result: Array<ErrorResponse>): any[] {
  return result.map((item) => {
    return errorResponseDeserializer(item);
  });
}

/** A Machine Learning compute based on AKS. */
export interface AKS extends Compute {
  /** AKS properties */
  properties?: AKSSchemaProperties;
  /** The type of compute */
  computeType: "AKS";
}

export function aksSerializer(item: AKS): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : aksSchemaPropertiesSerializer(item["properties"]),
  };
}

export function aksDeserializer(item: any): AKS {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : aksSchemaPropertiesDeserializer(item["properties"]),
  };
}

/** AKS properties */
export interface AKSSchemaProperties {
  /** Cluster full qualified domain name */
  clusterFqdn?: string;
  /** System services */
  readonly systemServices?: SystemService[];
  /** Number of agents */
  agentCount?: number;
  /** Agent virtual machine size */
  agentVmSize?: string;
  /** Intended usage of the cluster */
  clusterPurpose?: ClusterPurpose;
  /** SSL configuration */
  sslConfiguration?: SslConfiguration;
  /** AKS networking configuration for vnet */
  aksNetworkingConfiguration?: AksNetworkingConfiguration;
  /** Load Balancer Type */
  loadBalancerType?: LoadBalancerType;
  /** Load Balancer Subnet */
  loadBalancerSubnet?: string;
}

export function aksSchemaPropertiesSerializer(item: AKSSchemaProperties): any {
  return {
    clusterFqdn: item["clusterFqdn"],
    agentCount: item["agentCount"],
    agentVmSize: item["agentVmSize"],
    clusterPurpose: item["clusterPurpose"],
    sslConfiguration: !item["sslConfiguration"]
      ? item["sslConfiguration"]
      : sslConfigurationSerializer(item["sslConfiguration"]),
    aksNetworkingConfiguration: !item["aksNetworkingConfiguration"]
      ? item["aksNetworkingConfiguration"]
      : aksNetworkingConfigurationSerializer(item["aksNetworkingConfiguration"]),
    loadBalancerType: item["loadBalancerType"],
    loadBalancerSubnet: item["loadBalancerSubnet"],
  };
}

export function aksSchemaPropertiesDeserializer(item: any): AKSSchemaProperties {
  return {
    clusterFqdn: item["clusterFqdn"],
    systemServices: !item["systemServices"]
      ? item["systemServices"]
      : systemServiceArrayDeserializer(item["systemServices"]),
    agentCount: item["agentCount"],
    agentVmSize: item["agentVmSize"],
    clusterPurpose: item["clusterPurpose"],
    sslConfiguration: !item["sslConfiguration"]
      ? item["sslConfiguration"]
      : sslConfigurationDeserializer(item["sslConfiguration"]),
    aksNetworkingConfiguration: !item["aksNetworkingConfiguration"]
      ? item["aksNetworkingConfiguration"]
      : aksNetworkingConfigurationDeserializer(item["aksNetworkingConfiguration"]),
    loadBalancerType: item["loadBalancerType"],
    loadBalancerSubnet: item["loadBalancerSubnet"],
  };
}

export function systemServiceArrayDeserializer(result: Array<SystemService>): any[] {
  return result.map((item) => {
    return systemServiceDeserializer(item);
  });
}

/** A system service running on a compute. */
export interface SystemService {
  /** The type of this system service. */
  readonly systemServiceType?: string;
  /** Public IP address */
  readonly publicIpAddress?: string;
  /** The version for this type. */
  readonly version?: string;
}

export function systemServiceDeserializer(item: any): SystemService {
  return {
    systemServiceType: item["systemServiceType"],
    publicIpAddress: item["publicIpAddress"],
    version: item["version"],
  };
}

/** Intended usage of the cluster */
export enum KnownClusterPurpose {
  /** FastProd */
  FastProd = "FastProd",
  /** DenseProd */
  DenseProd = "DenseProd",
  /** DevTest */
  DevTest = "DevTest",
}

/**
 * Intended usage of the cluster \
 * {@link KnownClusterPurpose} can be used interchangeably with ClusterPurpose,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FastProd** \
 * **DenseProd** \
 * **DevTest**
 */
export type ClusterPurpose = string;

/** The ssl configuration for scoring */
export interface SslConfiguration {
  /** Enable or disable ssl for scoring */
  status?: SslConfigStatus;
  /** Cert data */
  cert?: string;
  /** Key data */
  key?: string;
  /** CNAME of the cert */
  cname?: string;
  /** Leaf domain label of public endpoint */
  leafDomainLabel?: string;
  /** Indicates whether to overwrite existing domain label. */
  overwriteExistingDomain?: boolean;
}

export function sslConfigurationSerializer(item: SslConfiguration): any {
  return {
    status: item["status"],
    cert: item["cert"],
    key: item["key"],
    cname: item["cname"],
    leafDomainLabel: item["leafDomainLabel"],
    overwriteExistingDomain: item["overwriteExistingDomain"],
  };
}

export function sslConfigurationDeserializer(item: any): SslConfiguration {
  return {
    status: item["status"],
    cert: item["cert"],
    key: item["key"],
    cname: item["cname"],
    leafDomainLabel: item["leafDomainLabel"],
    overwriteExistingDomain: item["overwriteExistingDomain"],
  };
}

/** Enable or disable ssl for scoring */
export enum KnownSslConfigStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** Auto */
  Auto = "Auto",
}

/**
 * Enable or disable ssl for scoring \
 * {@link KnownSslConfigStatus} can be used interchangeably with SslConfigStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled** \
 * **Auto**
 */
export type SslConfigStatus = string;

/** Advance configuration for AKS networking */
export interface AksNetworkingConfiguration {
  /** Virtual network subnet resource ID the compute nodes belong to */
  subnetId?: string;
  /** A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges. */
  serviceCidr?: string;
  /** An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr. */
  dnsServiceIP?: string;
  /** A CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the Kubernetes service address range. */
  dockerBridgeCidr?: string;
}

export function aksNetworkingConfigurationSerializer(item: AksNetworkingConfiguration): any {
  return {
    subnetId: item["subnetId"],
    serviceCidr: item["serviceCidr"],
    dnsServiceIP: item["dnsServiceIP"],
    dockerBridgeCidr: item["dockerBridgeCidr"],
  };
}

export function aksNetworkingConfigurationDeserializer(item: any): AksNetworkingConfiguration {
  return {
    subnetId: item["subnetId"],
    serviceCidr: item["serviceCidr"],
    dnsServiceIP: item["dnsServiceIP"],
    dockerBridgeCidr: item["dockerBridgeCidr"],
  };
}

/** Load Balancer Type */
export enum KnownLoadBalancerType {
  /** PublicIp */
  PublicIp = "PublicIp",
  /** InternalLoadBalancer */
  InternalLoadBalancer = "InternalLoadBalancer",
}

/**
 * Load Balancer Type \
 * {@link KnownLoadBalancerType} can be used interchangeably with LoadBalancerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PublicIp** \
 * **InternalLoadBalancer**
 */
export type LoadBalancerType = string;

/** A Machine Learning compute based on Kubernetes Compute. */
export interface Kubernetes extends Compute {
  /** Properties of Kubernetes */
  properties?: KubernetesProperties;
  /** The type of compute */
  computeType: "Kubernetes";
}

export function kubernetesSerializer(item: Kubernetes): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : kubernetesPropertiesSerializer(item["properties"]),
  };
}

export function kubernetesDeserializer(item: any): Kubernetes {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : kubernetesPropertiesDeserializer(item["properties"]),
  };
}

/** Kubernetes properties */
export interface KubernetesProperties {
  /** Relay connection string. */
  relayConnectionString?: string;
  /** ServiceBus connection string. */
  serviceBusConnectionString?: string;
  /** Extension principal-id. */
  extensionPrincipalId?: string;
  /** Extension instance release train. */
  extensionInstanceReleaseTrain?: string;
  /** VC name. */
  vcName?: string;
  /** Compute namespace */
  namespace?: string;
  /** Default instance type */
  defaultInstanceType?: string;
  /** Instance Type Schema */
  instanceTypes?: Record<string, InstanceTypeSchema>;
}

export function kubernetesPropertiesSerializer(item: KubernetesProperties): any {
  return {
    relayConnectionString: item["relayConnectionString"],
    serviceBusConnectionString: item["serviceBusConnectionString"],
    extensionPrincipalId: item["extensionPrincipalId"],
    extensionInstanceReleaseTrain: item["extensionInstanceReleaseTrain"],
    vcName: item["vcName"],
    namespace: item["namespace"],
    defaultInstanceType: item["defaultInstanceType"],
    instanceTypes: !item["instanceTypes"]
      ? item["instanceTypes"]
      : instanceTypeSchemaRecordSerializer(item["instanceTypes"]),
  };
}

export function kubernetesPropertiesDeserializer(item: any): KubernetesProperties {
  return {
    relayConnectionString: item["relayConnectionString"],
    serviceBusConnectionString: item["serviceBusConnectionString"],
    extensionPrincipalId: item["extensionPrincipalId"],
    extensionInstanceReleaseTrain: item["extensionInstanceReleaseTrain"],
    vcName: item["vcName"],
    namespace: item["namespace"],
    defaultInstanceType: item["defaultInstanceType"],
    instanceTypes: !item["instanceTypes"]
      ? item["instanceTypes"]
      : instanceTypeSchemaRecordDeserializer(item["instanceTypes"]),
  };
}

export function instanceTypeSchemaRecordSerializer(
  item: Record<string, InstanceTypeSchema>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : instanceTypeSchemaSerializer(item[key]);
  });
  return result;
}

export function instanceTypeSchemaRecordDeserializer(
  item: Record<string, any>,
): Record<string, InstanceTypeSchema> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : instanceTypeSchemaDeserializer(item[key]);
  });
  return result;
}

/** Instance type schema. */
export interface InstanceTypeSchema {
  /** Node Selector */
  nodeSelector?: Record<string, string>;
  /** Resource requests/limits for this instance type */
  resources?: InstanceTypeSchemaResources;
}

export function instanceTypeSchemaSerializer(item: InstanceTypeSchema): any {
  return {
    nodeSelector: item["nodeSelector"],
    resources: !item["resources"]
      ? item["resources"]
      : instanceTypeSchemaResourcesSerializer(item["resources"]),
  };
}

export function instanceTypeSchemaDeserializer(item: any): InstanceTypeSchema {
  return {
    nodeSelector: !item["nodeSelector"]
      ? item["nodeSelector"]
      : Object.fromEntries(
          Object.entries(item["nodeSelector"]).map(([k1, p1]: [string, any]) => [
            k1,
            !p1 ? p1 : p1,
          ]),
        ),
    resources: !item["resources"]
      ? item["resources"]
      : instanceTypeSchemaResourcesDeserializer(item["resources"]),
  };
}

/** Resource requests/limits for this instance type */
export interface InstanceTypeSchemaResources {
  /** Resource requests for this instance type */
  requests?: Record<string, string>;
  /** Resource limits for this instance type */
  limits?: Record<string, string>;
}

export function instanceTypeSchemaResourcesSerializer(item: InstanceTypeSchemaResources): any {
  return { requests: item["requests"], limits: item["limits"] };
}

export function instanceTypeSchemaResourcesDeserializer(item: any): InstanceTypeSchemaResources {
  return {
    requests: !item["requests"]
      ? item["requests"]
      : Object.fromEntries(Object.entries(item["requests"]).map(([k, p]: [string, any]) => [k, p])),
    limits: !item["limits"]
      ? item["limits"]
      : Object.fromEntries(Object.entries(item["limits"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** An Azure Machine Learning compute. */
export interface AmlCompute extends Compute {
  /** Properties of AmlCompute */
  properties?: AmlComputeProperties;
  /** The type of compute */
  computeType: "AmlCompute";
}

export function amlComputeSerializer(item: AmlCompute): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : amlComputePropertiesSerializer(item["properties"]),
  };
}

export function amlComputeDeserializer(item: any): AmlCompute {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : amlComputePropertiesDeserializer(item["properties"]),
  };
}

/** AML Compute properties */
export interface AmlComputeProperties {
  /** Compute OS Type */
  osType?: OsType;
  /** Virtual Machine Size */
  vmSize?: string;
  /** Virtual Machine priority */
  vmPriority?: VmPriority;
  /** Virtual Machine image for AML Compute - windows only */
  virtualMachineImage?: VirtualMachineImage;
  /** Network is isolated or not */
  isolatedNetwork?: boolean;
  /** Scale settings for AML Compute */
  scaleSettings?: ScaleSettings;
  /** Credentials for an administrator user account that will be created on each compute node. */
  userAccountCredentials?: UserAccountCredentials;
  /** Virtual network subnet resource ID the compute nodes belong to. */
  subnet?: ResourceId;
  /** State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on all nodes of the cluster. Enabled - Indicates that the public ssh port is open on all nodes of the cluster. NotSpecified - Indicates that the public ssh port is closed on all nodes of the cluster if VNet is defined, else is open all public nodes. It can be default only during cluster creation time, after creation it will be either enabled or disabled. */
  remoteLoginPortPublicAccess?: RemoteLoginPortPublicAccess;
  /** Allocation state of the compute. Possible values are: steady - Indicates that the compute is not resizing. There are no changes to the number of compute nodes in the compute in progress. A compute enters this state when it is created and when no operations are being performed on the compute to change the number of compute nodes. resizing - Indicates that the compute is resizing; that is, compute nodes are being added to or removed from the compute. */
  readonly allocationState?: AllocationState;
  /** The time at which the compute entered its current allocation state. */
  readonly allocationStateTransitionTime?: Date;
  /** Collection of errors encountered by various compute nodes during node setup. */
  readonly errors?: ErrorResponse[];
  /** The number of compute nodes currently assigned to the compute. */
  readonly currentNodeCount?: number;
  /** The target number of compute nodes for the compute. If the allocationState is resizing, this property denotes the target node count for the ongoing resize operation. If the allocationState is steady, this property denotes the target node count for the previous resize operation. */
  readonly targetNodeCount?: number;
  /** Counts of various node states on the compute. */
  readonly nodeStateCounts?: NodeStateCounts;
  /** Enable or disable node public IP address provisioning. Possible values are: Possible values are: true - Indicates that the compute nodes will have public IPs provisioned. false - Indicates that the compute nodes will have a private endpoint and no public IPs. */
  enableNodePublicIp?: boolean;
  /** A property bag containing additional properties. */
  propertyBag?: any;
}

export function amlComputePropertiesSerializer(item: AmlComputeProperties): any {
  return {
    osType: item["osType"],
    vmSize: item["vmSize"],
    vmPriority: item["vmPriority"],
    virtualMachineImage: !item["virtualMachineImage"]
      ? item["virtualMachineImage"]
      : virtualMachineImageSerializer(item["virtualMachineImage"]),
    isolatedNetwork: item["isolatedNetwork"],
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsSerializer(item["scaleSettings"]),
    userAccountCredentials: !item["userAccountCredentials"]
      ? item["userAccountCredentials"]
      : userAccountCredentialsSerializer(item["userAccountCredentials"]),
    subnet: !item["subnet"] ? item["subnet"] : resourceIdSerializer(item["subnet"]),
    remoteLoginPortPublicAccess: item["remoteLoginPortPublicAccess"],
    enableNodePublicIp: item["enableNodePublicIp"],
    propertyBag: item["propertyBag"],
  };
}

export function amlComputePropertiesDeserializer(item: any): AmlComputeProperties {
  return {
    osType: item["osType"],
    vmSize: item["vmSize"],
    vmPriority: item["vmPriority"],
    virtualMachineImage: !item["virtualMachineImage"]
      ? item["virtualMachineImage"]
      : virtualMachineImageDeserializer(item["virtualMachineImage"]),
    isolatedNetwork: item["isolatedNetwork"],
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsDeserializer(item["scaleSettings"]),
    userAccountCredentials: !item["userAccountCredentials"]
      ? item["userAccountCredentials"]
      : userAccountCredentialsDeserializer(item["userAccountCredentials"]),
    subnet: !item["subnet"] ? item["subnet"] : resourceIdDeserializer(item["subnet"]),
    remoteLoginPortPublicAccess: item["remoteLoginPortPublicAccess"],
    allocationState: item["allocationState"],
    allocationStateTransitionTime: !item["allocationStateTransitionTime"]
      ? item["allocationStateTransitionTime"]
      : new Date(item["allocationStateTransitionTime"]),
    errors: !item["errors"] ? item["errors"] : errorResponseArrayDeserializer(item["errors"]),
    currentNodeCount: item["currentNodeCount"],
    targetNodeCount: item["targetNodeCount"],
    nodeStateCounts: !item["nodeStateCounts"]
      ? item["nodeStateCounts"]
      : nodeStateCountsDeserializer(item["nodeStateCounts"]),
    enableNodePublicIp: item["enableNodePublicIp"],
    propertyBag: item["propertyBag"],
  };
}

/** Compute OS Type */
export enum KnownOsType {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * Compute OS Type \
 * {@link KnownOsType} can be used interchangeably with OsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux** \
 * **Windows**
 */
export type OsType = string;

/** Virtual Machine priority */
export enum KnownVmPriority {
  /** Dedicated */
  Dedicated = "Dedicated",
  /** LowPriority */
  LowPriority = "LowPriority",
}

/**
 * Virtual Machine priority \
 * {@link KnownVmPriority} can be used interchangeably with VmPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dedicated** \
 * **LowPriority**
 */
export type VmPriority = string;

/** Virtual Machine image for Windows AML Compute */
export interface VirtualMachineImage {
  /** Virtual Machine image path */
  id: string;
}

export function virtualMachineImageSerializer(item: VirtualMachineImage): any {
  return { id: item["id"] };
}

export function virtualMachineImageDeserializer(item: any): VirtualMachineImage {
  return {
    id: item["id"],
  };
}

/** scale settings for AML Compute */
export interface ScaleSettings {
  /** Max number of nodes to use */
  maxNodeCount: number;
  /** Min number of nodes to use */
  minNodeCount?: number;
  /** Node Idle Time before scaling down amlCompute. This string needs to be in the RFC Format. */
  nodeIdleTimeBeforeScaleDown?: string;
}

export function scaleSettingsSerializer(item: ScaleSettings): any {
  return {
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
    nodeIdleTimeBeforeScaleDown: item["nodeIdleTimeBeforeScaleDown"],
  };
}

export function scaleSettingsDeserializer(item: any): ScaleSettings {
  return {
    maxNodeCount: item["maxNodeCount"],
    minNodeCount: item["minNodeCount"],
    nodeIdleTimeBeforeScaleDown: item["nodeIdleTimeBeforeScaleDown"],
  };
}

/** Settings for user account that gets created on each on the nodes of a compute. */
export interface UserAccountCredentials {
  /** Name of the administrator user account which can be used to SSH to nodes. */
  adminUserName: string;
  /** SSH public key of the administrator user account. */
  adminUserSshPublicKey?: string;
  /** Password of the administrator user account. */
  adminUserPassword?: string;
}

export function userAccountCredentialsSerializer(item: UserAccountCredentials): any {
  return {
    adminUserName: item["adminUserName"],
    adminUserSshPublicKey: item["adminUserSshPublicKey"],
    adminUserPassword: item["adminUserPassword"],
  };
}

export function userAccountCredentialsDeserializer(item: any): UserAccountCredentials {
  return {
    adminUserName: item["adminUserName"],
    adminUserSshPublicKey: item["adminUserSshPublicKey"],
    adminUserPassword: item["adminUserPassword"],
  };
}

/** Represents a resource ID. For example, for a subnet, it is the resource URL for the subnet. */
export interface ResourceId {
  /** The ID of the resource */
  id: string;
}

export function resourceIdSerializer(item: ResourceId): any {
  return { id: item["id"] };
}

export function resourceIdDeserializer(item: any): ResourceId {
  return {
    id: item["id"],
  };
}

/** State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on all nodes of the cluster. Enabled - Indicates that the public ssh port is open on all nodes of the cluster. NotSpecified - Indicates that the public ssh port is closed on all nodes of the cluster if VNet is defined, else is open all public nodes. It can be default only during cluster creation time, after creation it will be either enabled or disabled. */
export enum KnownRemoteLoginPortPublicAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** NotSpecified */
  NotSpecified = "NotSpecified",
}

/**
 * State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on all nodes of the cluster. Enabled - Indicates that the public ssh port is open on all nodes of the cluster. NotSpecified - Indicates that the public ssh port is closed on all nodes of the cluster if VNet is defined, else is open all public nodes. It can be default only during cluster creation time, after creation it will be either enabled or disabled. \
 * {@link KnownRemoteLoginPortPublicAccess} can be used interchangeably with RemoteLoginPortPublicAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **NotSpecified**
 */
export type RemoteLoginPortPublicAccess = string;

/** Allocation state of the compute. Possible values are: steady - Indicates that the compute is not resizing. There are no changes to the number of compute nodes in the compute in progress. A compute enters this state when it is created and when no operations are being performed on the compute to change the number of compute nodes. resizing - Indicates that the compute is resizing; that is, compute nodes are being added to or removed from the compute. */
export enum KnownAllocationState {
  /** Steady */
  Steady = "Steady",
  /** Resizing */
  Resizing = "Resizing",
}

/**
 * Allocation state of the compute. Possible values are: steady - Indicates that the compute is not resizing. There are no changes to the number of compute nodes in the compute in progress. A compute enters this state when it is created and when no operations are being performed on the compute to change the number of compute nodes. resizing - Indicates that the compute is resizing; that is, compute nodes are being added to or removed from the compute. \
 * {@link KnownAllocationState} can be used interchangeably with AllocationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Steady** \
 * **Resizing**
 */
export type AllocationState = string;

/** Counts of various compute node states on the amlCompute. */
export interface NodeStateCounts {
  /** Number of compute nodes in idle state. */
  readonly idleNodeCount?: number;
  /** Number of compute nodes which are running jobs. */
  readonly runningNodeCount?: number;
  /** Number of compute nodes which are being prepared. */
  readonly preparingNodeCount?: number;
  /** Number of compute nodes which are in unusable state. */
  readonly unusableNodeCount?: number;
  /** Number of compute nodes which are leaving the amlCompute. */
  readonly leavingNodeCount?: number;
  /** Number of compute nodes which are in preempted state. */
  readonly preemptedNodeCount?: number;
}

export function nodeStateCountsDeserializer(item: any): NodeStateCounts {
  return {
    idleNodeCount: item["idleNodeCount"],
    runningNodeCount: item["runningNodeCount"],
    preparingNodeCount: item["preparingNodeCount"],
    unusableNodeCount: item["unusableNodeCount"],
    leavingNodeCount: item["leavingNodeCount"],
    preemptedNodeCount: item["preemptedNodeCount"],
  };
}

/** An Azure Machine Learning compute instance. */
export interface ComputeInstance extends Compute {
  /** Properties of ComputeInstance */
  properties?: ComputeInstanceProperties;
  /** The type of compute */
  computeType: "ComputeInstance";
}

export function computeInstanceSerializer(item: ComputeInstance): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : computeInstancePropertiesSerializer(item["properties"]),
  };
}

export function computeInstanceDeserializer(item: any): ComputeInstance {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : computeInstancePropertiesDeserializer(item["properties"]),
  };
}

/** Compute Instance properties */
export interface ComputeInstanceProperties {
  /** Virtual Machine Size */
  vmSize?: string;
  /** Virtual network subnet resource ID the compute nodes belong to. */
  subnet?: ResourceId;
  /** Policy for sharing applications on this compute instance among users of parent workspace. If Personal, only the creator can access applications on this compute instance. When Shared, any workspace user can access applications on this instance depending on his/her assigned role. */
  applicationSharingPolicy?: ApplicationSharingPolicy;
  /** Specifies policy and settings for SSH access. */
  sshSettings?: ComputeInstanceSshSettings;
  /** List of Custom Services added to the compute. */
  customServices?: CustomService[];
  /** Returns metadata about the operating system image for this compute instance. */
  readonly osImageMetadata?: ImageMetadata;
  /** Describes all connectivity endpoints available for this ComputeInstance. */
  readonly connectivityEndpoints?: ComputeInstanceConnectivityEndpoints;
  /** Describes available applications and their endpoints on this ComputeInstance. */
  readonly applications?: ComputeInstanceApplication[];
  /** Describes information on user who created this ComputeInstance. */
  readonly createdBy?: ComputeInstanceCreatedBy;
  /** Collection of errors encountered on this ComputeInstance. */
  readonly errors?: ErrorResponse[];
  /** The current state of this ComputeInstance. */
  readonly state?: ComputeInstanceState;
  /** The Compute Instance Authorization type. Available values are personal (default). */
  computeInstanceAuthorizationType?: ComputeInstanceAuthorizationType;
  /** Enable SSO (single sign on). Possible values are: true, false. */
  enableSSO?: boolean;
  /** Settings for a personal compute instance. */
  personalComputeInstanceSettings?: PersonalComputeInstanceSettings;
  /** Details of customized scripts to execute for setting up the cluster. */
  setupScripts?: SetupScripts;
  /** The last operation on ComputeInstance. */
  readonly lastOperation?: ComputeInstanceLastOperation;
  /** The list of schedules to be applied on the computes. */
  schedules?: ComputeSchedules;
  /** Stops compute instance after user defined period of inactivity. Time is defined in ISO8601 format. Minimum is 15 min, maximum is 3 days. */
  idleTimeBeforeShutdown?: string;
  /** Enable or disable node public IP address provisioning. Possible values are: Possible values are: true - Indicates that the compute nodes will have public IPs provisioned. false - Indicates that the compute nodes will have a private endpoint and no public IPs. */
  enableNodePublicIp?: boolean;
  /** Describes informations of containers on this ComputeInstance. */
  readonly containers?: ComputeInstanceContainer[];
  /** Describes informations of dataDisks on this ComputeInstance. */
  readonly dataDisks?: ComputeInstanceDataDisk[];
  /** Describes informations of dataMounts on this ComputeInstance. */
  readonly dataMounts?: ComputeInstanceDataMount[];
  /** ComputeInstance version. */
  readonly versions?: ComputeInstanceVersion;
}

export function computeInstancePropertiesSerializer(item: ComputeInstanceProperties): any {
  return {
    vmSize: item["vmSize"],
    subnet: !item["subnet"] ? item["subnet"] : resourceIdSerializer(item["subnet"]),
    applicationSharingPolicy: item["applicationSharingPolicy"],
    sshSettings: !item["sshSettings"]
      ? item["sshSettings"]
      : computeInstanceSshSettingsSerializer(item["sshSettings"]),
    customServices: !item["customServices"]
      ? item["customServices"]
      : customServiceArraySerializer(item["customServices"]),
    computeInstanceAuthorizationType: item["computeInstanceAuthorizationType"],
    enableSSO: item["enableSSO"],
    personalComputeInstanceSettings: !item["personalComputeInstanceSettings"]
      ? item["personalComputeInstanceSettings"]
      : personalComputeInstanceSettingsSerializer(item["personalComputeInstanceSettings"]),
    setupScripts: !item["setupScripts"]
      ? item["setupScripts"]
      : setupScriptsSerializer(item["setupScripts"]),
    schedules: !item["schedules"]
      ? item["schedules"]
      : computeSchedulesSerializer(item["schedules"]),
    idleTimeBeforeShutdown: item["idleTimeBeforeShutdown"],
    enableNodePublicIp: item["enableNodePublicIp"],
  };
}

export function computeInstancePropertiesDeserializer(item: any): ComputeInstanceProperties {
  return {
    vmSize: item["vmSize"],
    subnet: !item["subnet"] ? item["subnet"] : resourceIdDeserializer(item["subnet"]),
    applicationSharingPolicy: item["applicationSharingPolicy"],
    sshSettings: !item["sshSettings"]
      ? item["sshSettings"]
      : computeInstanceSshSettingsDeserializer(item["sshSettings"]),
    customServices: !item["customServices"]
      ? item["customServices"]
      : customServiceArrayDeserializer(item["customServices"]),
    osImageMetadata: !item["osImageMetadata"]
      ? item["osImageMetadata"]
      : imageMetadataDeserializer(item["osImageMetadata"]),
    connectivityEndpoints: !item["connectivityEndpoints"]
      ? item["connectivityEndpoints"]
      : computeInstanceConnectivityEndpointsDeserializer(item["connectivityEndpoints"]),
    applications: !item["applications"]
      ? item["applications"]
      : computeInstanceApplicationArrayDeserializer(item["applications"]),
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : computeInstanceCreatedByDeserializer(item["createdBy"]),
    errors: !item["errors"] ? item["errors"] : errorResponseArrayDeserializer(item["errors"]),
    state: item["state"],
    computeInstanceAuthorizationType: item["computeInstanceAuthorizationType"],
    enableSSO: item["enableSSO"],
    personalComputeInstanceSettings: !item["personalComputeInstanceSettings"]
      ? item["personalComputeInstanceSettings"]
      : personalComputeInstanceSettingsDeserializer(item["personalComputeInstanceSettings"]),
    setupScripts: !item["setupScripts"]
      ? item["setupScripts"]
      : setupScriptsDeserializer(item["setupScripts"]),
    lastOperation: !item["lastOperation"]
      ? item["lastOperation"]
      : computeInstanceLastOperationDeserializer(item["lastOperation"]),
    schedules: !item["schedules"]
      ? item["schedules"]
      : computeSchedulesDeserializer(item["schedules"]),
    idleTimeBeforeShutdown: item["idleTimeBeforeShutdown"],
    enableNodePublicIp: item["enableNodePublicIp"],
    containers: !item["containers"]
      ? item["containers"]
      : computeInstanceContainerArrayDeserializer(item["containers"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : computeInstanceDataDiskArrayDeserializer(item["dataDisks"]),
    dataMounts: !item["dataMounts"]
      ? item["dataMounts"]
      : computeInstanceDataMountArrayDeserializer(item["dataMounts"]),
    versions: !item["versions"]
      ? item["versions"]
      : computeInstanceVersionDeserializer(item["versions"]),
  };
}

/** Policy for sharing applications on this compute instance among users of parent workspace. If Personal, only the creator can access applications on this compute instance. When Shared, any workspace user can access applications on this instance depending on his/her assigned role. */
export enum KnownApplicationSharingPolicy {
  /** Personal */
  Personal = "Personal",
  /** Shared */
  Shared = "Shared",
}

/**
 * Policy for sharing applications on this compute instance among users of parent workspace. If Personal, only the creator can access applications on this compute instance. When Shared, any workspace user can access applications on this instance depending on his/her assigned role. \
 * {@link KnownApplicationSharingPolicy} can be used interchangeably with ApplicationSharingPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Personal** \
 * **Shared**
 */
export type ApplicationSharingPolicy = string;

/** Specifies policy and settings for SSH access. */
export interface ComputeInstanceSshSettings {
  /** State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on this instance. Enabled - Indicates that the public ssh port is open and accessible according to the VNet/subnet policy if applicable. */
  sshPublicAccess?: SshPublicAccess;
  /** Describes the admin user name. */
  readonly adminUserName?: string;
  /** Describes the port for connecting through SSH. */
  readonly sshPort?: number;
  /** Specifies the SSH rsa public key file as a string. Use "ssh-keygen -t rsa -b 2048" to generate your SSH key pairs. */
  adminPublicKey?: string;
}

export function computeInstanceSshSettingsSerializer(item: ComputeInstanceSshSettings): any {
  return { sshPublicAccess: item["sshPublicAccess"], adminPublicKey: item["adminPublicKey"] };
}

export function computeInstanceSshSettingsDeserializer(item: any): ComputeInstanceSshSettings {
  return {
    sshPublicAccess: item["sshPublicAccess"],
    adminUserName: item["adminUserName"],
    sshPort: item["sshPort"],
    adminPublicKey: item["adminPublicKey"],
  };
}

/** State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on this instance. Enabled - Indicates that the public ssh port is open and accessible according to the VNet/subnet policy if applicable. */
export enum KnownSshPublicAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on this instance. Enabled - Indicates that the public ssh port is open and accessible according to the VNet/subnet policy if applicable. \
 * {@link KnownSshPublicAccess} can be used interchangeably with SshPublicAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SshPublicAccess = string;

export function customServiceArraySerializer(result: Array<CustomService>): any[] {
  return result.map((item) => {
    return customServiceSerializer(item);
  });
}

export function customServiceArrayDeserializer(result: Array<CustomService>): any[] {
  return result.map((item) => {
    return customServiceDeserializer(item);
  });
}

/** Specifies the custom service configuration */
export interface CustomService {
  /** Name of the Custom Service */
  name?: string;
  /** Describes the Image Specifications */
  image?: Image;
  /** Environment Variable for the container */
  environmentVariables?: Record<string, EnvironmentVariable>;
  /** Describes the docker settings for the image */
  docker?: Docker;
  /** Configuring the endpoints for the container */
  endpoints?: Endpoint[];
  /** Configuring the volumes for the container */
  volumes?: VolumeDefinition[];
  /** Describes the jupyter kernel settings for the image if its a custom environment */
  kernel?: JupyterKernelConfig;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function customServiceSerializer(item: CustomService): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    name: item["name"],
    image: !item["image"] ? item["image"] : imageSerializer(item["image"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableRecordSerializer(item["environmentVariables"]),
    docker: !item["docker"] ? item["docker"] : dockerSerializer(item["docker"]),
    endpoints: !item["endpoints"] ? item["endpoints"] : endpointArraySerializer(item["endpoints"]),
    volumes: !item["volumes"] ? item["volumes"] : volumeDefinitionArraySerializer(item["volumes"]),
    kernel: !item["kernel"] ? item["kernel"] : jupyterKernelConfigSerializer(item["kernel"]),
  };
}

export function customServiceDeserializer(item: any): CustomService {
  return {
    additionalProperties: serializeRecord(item, [
      "name",
      "image",
      "environmentVariables",
      "docker",
      "endpoints",
      "volumes",
      "kernel",
    ]),
    name: item["name"],
    image: !item["image"] ? item["image"] : imageDeserializer(item["image"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableRecordDeserializer(item["environmentVariables"]),
    docker: !item["docker"] ? item["docker"] : dockerDeserializer(item["docker"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointArrayDeserializer(item["endpoints"]),
    volumes: !item["volumes"]
      ? item["volumes"]
      : volumeDefinitionArrayDeserializer(item["volumes"]),
    kernel: !item["kernel"] ? item["kernel"] : jupyterKernelConfigDeserializer(item["kernel"]),
  };
}

/** model interface Image */
export interface Image {
  /** Type of the image. Possible values are: docker - For docker images. azureml - For AzureML Environment images (custom and curated) */
  type?: ImageType;
  /** Image reference URL if type is docker. Environment name if type is azureml */
  reference?: string;
  /** Version of image being used. If latest then skip this field */
  version?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function imageSerializer(item: Image): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    type: item["type"],
    reference: item["reference"],
    version: item["version"],
  };
}

export function imageDeserializer(item: any): Image {
  return {
    additionalProperties: serializeRecord(item, ["type", "reference", "version"]),
    type: item["type"],
    reference: item["reference"],
    version: item["version"],
  };
}

/** Type of the image. Possible values are: docker - For docker images. azureml - For AzureML Environment images (custom and curated) */
export enum KnownImageType {
  /** docker */
  Docker = "docker",
  /** azureml */
  Azureml = "azureml",
}

/**
 * Type of the image. Possible values are: docker - For docker images. azureml - For AzureML Environment images (custom and curated) \
 * {@link KnownImageType} can be used interchangeably with ImageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **docker** \
 * **azureml**
 */
export type ImageType = string;

export function environmentVariableRecordSerializer(
  item: Record<string, EnvironmentVariable>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : environmentVariableSerializer(item[key]);
  });
  return result;
}

export function environmentVariableRecordDeserializer(
  item: Record<string, any>,
): Record<string, EnvironmentVariable> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : environmentVariableDeserializer(item[key]);
  });
  return result;
}

/** model interface EnvironmentVariable */
export interface EnvironmentVariable {
  /** Type of the Environment Variable. Possible values are: local - For local variable */
  type?: EnvironmentVariableType;
  /** Value of the Environment variable */
  value?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function environmentVariableSerializer(item: EnvironmentVariable): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    type: item["type"],
    value: item["value"],
  };
}

export function environmentVariableDeserializer(item: any): EnvironmentVariable {
  return {
    additionalProperties: serializeRecord(item, ["type", "value"]),
    type: item["type"],
    value: item["value"],
  };
}

/** Type of the Environment Variable. Possible values are: local - For local variable */
export enum KnownEnvironmentVariableType {
  /** local */
  Local = "local",
}

/**
 * Type of the Environment Variable. Possible values are: local - For local variable \
 * {@link KnownEnvironmentVariableType} can be used interchangeably with EnvironmentVariableType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **local**
 */
export type EnvironmentVariableType = string;

/** model interface Docker */
export interface Docker {
  /** Indicate whether container shall run in privileged or non-privileged mode. */
  privileged?: boolean;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function dockerSerializer(item: Docker): any {
  return { ...serializeRecord(item.additionalProperties ?? {}), privileged: item["privileged"] };
}

export function dockerDeserializer(item: any): Docker {
  return {
    additionalProperties: serializeRecord(item, ["privileged"]),
    privileged: item["privileged"],
  };
}

export function endpointArraySerializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointSerializer(item);
  });
}

export function endpointArrayDeserializer(result: Array<Endpoint>): any[] {
  return result.map((item) => {
    return endpointDeserializer(item);
  });
}

/** model interface Endpoint */
export interface Endpoint {
  /** Protocol over which communication will happen over this endpoint */
  protocol?: Protocol;
  /** Name of the Endpoint */
  name?: string;
  /** Application port inside the container. */
  target?: number;
  /** Port over which the application is exposed from container. */
  published?: number;
  /** Host IP over which the application is exposed from the container */
  hostIp?: string;
}

export function endpointSerializer(item: Endpoint): any {
  return {
    protocol: item["protocol"],
    name: item["name"],
    target: item["target"],
    published: item["published"],
    hostIp: item["hostIp"],
  };
}

export function endpointDeserializer(item: any): Endpoint {
  return {
    protocol: item["protocol"],
    name: item["name"],
    target: item["target"],
    published: item["published"],
    hostIp: item["hostIp"],
  };
}

/** Protocol over which communication will happen over this endpoint */
export enum KnownProtocol {
  /** tcp */
  Tcp = "tcp",
  /** udp */
  Udp = "udp",
  /** http */
  Http = "http",
}

/**
 * Protocol over which communication will happen over this endpoint \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **tcp** \
 * **udp** \
 * **http**
 */
export type Protocol = string;

export function volumeDefinitionArraySerializer(result: Array<VolumeDefinition>): any[] {
  return result.map((item) => {
    return volumeDefinitionSerializer(item);
  });
}

export function volumeDefinitionArrayDeserializer(result: Array<VolumeDefinition>): any[] {
  return result.map((item) => {
    return volumeDefinitionDeserializer(item);
  });
}

/** model interface VolumeDefinition */
export interface VolumeDefinition {
  /** Type of Volume Definition. Possible Values: bind,volume,tmpfs,npipe */
  type?: VolumeDefinitionType;
  /** Indicate whether to mount volume as readOnly. Default value for this is false. */
  readOnly?: boolean;
  /** Source of the mount. For bind mounts this is the host path. */
  source?: string;
  /** Target of the mount. For bind mounts this is the path in the container. */
  target?: string;
  /** Consistency of the volume */
  consistency?: string;
  /** Bind Options of the mount */
  bind?: BindOptions;
  /** Volume Options of the mount */
  volume?: VolumeOptions;
  /** tmpfs option of the mount */
  tmpfs?: TmpfsOptions;
}

export function volumeDefinitionSerializer(item: VolumeDefinition): any {
  return {
    type: item["type"],
    readOnly: item["readOnly"],
    source: item["source"],
    target: item["target"],
    consistency: item["consistency"],
    bind: !item["bind"] ? item["bind"] : bindOptionsSerializer(item["bind"]),
    volume: !item["volume"] ? item["volume"] : volumeOptionsSerializer(item["volume"]),
    tmpfs: !item["tmpfs"] ? item["tmpfs"] : tmpfsOptionsSerializer(item["tmpfs"]),
  };
}

export function volumeDefinitionDeserializer(item: any): VolumeDefinition {
  return {
    type: item["type"],
    readOnly: item["readOnly"],
    source: item["source"],
    target: item["target"],
    consistency: item["consistency"],
    bind: !item["bind"] ? item["bind"] : bindOptionsDeserializer(item["bind"]),
    volume: !item["volume"] ? item["volume"] : volumeOptionsDeserializer(item["volume"]),
    tmpfs: !item["tmpfs"] ? item["tmpfs"] : tmpfsOptionsDeserializer(item["tmpfs"]),
  };
}

/** Type of Volume Definition. Possible Values: bind,volume,tmpfs,npipe */
export enum KnownVolumeDefinitionType {
  /** bind */
  Bind = "bind",
  /** volume */
  Volume = "volume",
  /** tmpfs */
  Tmpfs = "tmpfs",
  /** npipe */
  Npipe = "npipe",
}

/**
 * Type of Volume Definition. Possible Values: bind,volume,tmpfs,npipe \
 * {@link KnownVolumeDefinitionType} can be used interchangeably with VolumeDefinitionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **bind** \
 * **volume** \
 * **tmpfs** \
 * **npipe**
 */
export type VolumeDefinitionType = string;

/** model interface BindOptions */
export interface BindOptions {
  /** Type of Bind Option */
  propagation?: string;
  /** Indicate whether to create host path. */
  createHostPath?: boolean;
  /** Mention the selinux options. */
  selinux?: string;
}

export function bindOptionsSerializer(item: BindOptions): any {
  return {
    propagation: item["propagation"],
    createHostPath: item["createHostPath"],
    selinux: item["selinux"],
  };
}

export function bindOptionsDeserializer(item: any): BindOptions {
  return {
    propagation: item["propagation"],
    createHostPath: item["createHostPath"],
    selinux: item["selinux"],
  };
}

/** model interface VolumeOptions */
export interface VolumeOptions {
  /** Indicate whether volume is nocopy */
  nocopy?: boolean;
}

export function volumeOptionsSerializer(item: VolumeOptions): any {
  return { nocopy: item["nocopy"] };
}

export function volumeOptionsDeserializer(item: any): VolumeOptions {
  return {
    nocopy: item["nocopy"],
  };
}

/** model interface TmpfsOptions */
export interface TmpfsOptions {
  /** Mention the Tmpfs size */
  size?: number;
}

export function tmpfsOptionsSerializer(item: TmpfsOptions): any {
  return { size: item["size"] };
}

export function tmpfsOptionsDeserializer(item: any): TmpfsOptions {
  return {
    size: item["size"],
  };
}

/** Jupyter kernel configuration. */
export interface JupyterKernelConfig {
  /** Argument to the the runtime */
  argv?: string[];
  /** Display name of the kernel */
  displayName?: string;
  /** Language of the kernel [Example value: python] */
  language?: string;
}

export function jupyterKernelConfigSerializer(item: JupyterKernelConfig): any {
  return {
    argv: !item["argv"]
      ? item["argv"]
      : item["argv"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    language: item["language"],
  };
}

export function jupyterKernelConfigDeserializer(item: any): JupyterKernelConfig {
  return {
    argv: !item["argv"]
      ? item["argv"]
      : item["argv"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
    language: item["language"],
  };
}

/** Returns metadata about the operating system image for this compute instance. */
export interface ImageMetadata {
  /** Specifies the current operating system image version this compute instance is running on. */
  currentImageVersion?: string;
  /** Specifies the latest available operating system image version. */
  latestImageVersion?: string;
  /** Specifies whether this compute instance is running on the latest operating system image. */
  isLatestOsImageVersion?: boolean;
  /** Metadata about the os patching. */
  readonly osPatchingStatus?: OsPatchingStatus;
}

export function imageMetadataDeserializer(item: any): ImageMetadata {
  return {
    currentImageVersion: item["currentImageVersion"],
    latestImageVersion: item["latestImageVersion"],
    isLatestOsImageVersion: item["isLatestOsImageVersion"],
    osPatchingStatus: !item["osPatchingStatus"]
      ? item["osPatchingStatus"]
      : osPatchingStatusDeserializer(item["osPatchingStatus"]),
  };
}

/** Returns metadata about the os patching. */
export interface OsPatchingStatus {
  /** The os patching status. */
  patchStatus?: PatchStatus;
  /** Time of the latest os patching. */
  latestPatchTime?: string;
  /** Specifies whether this compute instance is pending for reboot to finish os patching. */
  rebootPending?: boolean;
  /** Time of scheduled reboot. */
  scheduledRebootTime?: string;
  /** Collection of errors encountered when doing os patching. */
  osPatchingErrors?: ErrorResponse[];
}

export function osPatchingStatusDeserializer(item: any): OsPatchingStatus {
  return {
    patchStatus: item["patchStatus"],
    latestPatchTime: item["latestPatchTime"],
    rebootPending: item["rebootPending"],
    scheduledRebootTime: item["scheduledRebootTime"],
    osPatchingErrors: !item["osPatchingErrors"]
      ? item["osPatchingErrors"]
      : errorResponseArrayDeserializer(item["osPatchingErrors"]),
  };
}

/** The os patching status. */
export enum KnownPatchStatus {
  /** CompletedWithWarnings */
  CompletedWithWarnings = "CompletedWithWarnings",
  /** Failed */
  Failed = "Failed",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The os patching status. \
 * {@link KnownPatchStatus} can be used interchangeably with PatchStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CompletedWithWarnings** \
 * **Failed** \
 * **InProgress** \
 * **Succeeded** \
 * **Unknown**
 */
export type PatchStatus = string;

/** Defines all connectivity endpoints and properties for an ComputeInstance. */
export interface ComputeInstanceConnectivityEndpoints {
  /** Public IP Address of this ComputeInstance. */
  readonly publicIpAddress?: string;
  /** Private IP Address of this ComputeInstance (local to the VNET in which the compute instance is deployed). */
  readonly privateIpAddress?: string;
}

export function computeInstanceConnectivityEndpointsDeserializer(
  item: any,
): ComputeInstanceConnectivityEndpoints {
  return {
    publicIpAddress: item["publicIpAddress"],
    privateIpAddress: item["privateIpAddress"],
  };
}

export function computeInstanceApplicationArrayDeserializer(
  result: Array<ComputeInstanceApplication>,
): any[] {
  return result.map((item) => {
    return computeInstanceApplicationDeserializer(item);
  });
}

/** Defines an Aml Instance application and its connectivity endpoint URI. */
export interface ComputeInstanceApplication {
  /** Name of the ComputeInstance application. */
  displayName?: string;
  /** Application' endpoint URI. */
  endpointUri?: string;
}

export function computeInstanceApplicationDeserializer(item: any): ComputeInstanceApplication {
  return {
    displayName: item["displayName"],
    endpointUri: item["endpointUri"],
  };
}

/** Describes information on user who created this ComputeInstance. */
export interface ComputeInstanceCreatedBy {
  /** Name of the user. */
  readonly userName?: string;
  /** Uniquely identifies user' Azure Active Directory organization. */
  readonly userOrgId?: string;
  /** Uniquely identifies the user within his/her organization. */
  readonly userId?: string;
}

export function computeInstanceCreatedByDeserializer(item: any): ComputeInstanceCreatedBy {
  return {
    userName: item["userName"],
    userOrgId: item["userOrgId"],
    userId: item["userId"],
  };
}

/** Current state of an ComputeInstance. */
export enum KnownComputeInstanceState {
  /** Creating */
  Creating = "Creating",
  /** CreateFailed */
  CreateFailed = "CreateFailed",
  /** Deleting */
  Deleting = "Deleting",
  /** Running */
  Running = "Running",
  /** Restarting */
  Restarting = "Restarting",
  /** Resizing */
  Resizing = "Resizing",
  /** JobRunning */
  JobRunning = "JobRunning",
  /** SettingUp */
  SettingUp = "SettingUp",
  /** SetupFailed */
  SetupFailed = "SetupFailed",
  /** Starting */
  Starting = "Starting",
  /** Stopped */
  Stopped = "Stopped",
  /** Stopping */
  Stopping = "Stopping",
  /** UserSettingUp */
  UserSettingUp = "UserSettingUp",
  /** UserSetupFailed */
  UserSetupFailed = "UserSetupFailed",
  /** Unknown */
  Unknown = "Unknown",
  /** Unusable */
  Unusable = "Unusable",
}

/**
 * Current state of an ComputeInstance. \
 * {@link KnownComputeInstanceState} can be used interchangeably with ComputeInstanceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **CreateFailed** \
 * **Deleting** \
 * **Running** \
 * **Restarting** \
 * **Resizing** \
 * **JobRunning** \
 * **SettingUp** \
 * **SetupFailed** \
 * **Starting** \
 * **Stopped** \
 * **Stopping** \
 * **UserSettingUp** \
 * **UserSetupFailed** \
 * **Unknown** \
 * **Unusable**
 */
export type ComputeInstanceState = string;

/** The Compute Instance Authorization type. Available values are personal (default). */
export enum KnownComputeInstanceAuthorizationType {
  /** personal */
  Personal = "personal",
}

/**
 * The Compute Instance Authorization type. Available values are personal (default). \
 * {@link KnownComputeInstanceAuthorizationType} can be used interchangeably with ComputeInstanceAuthorizationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **personal**
 */
export type ComputeInstanceAuthorizationType = string;

/** Settings for a personal compute instance. */
export interface PersonalComputeInstanceSettings {
  /** A user explicitly assigned to a personal compute instance. */
  assignedUser?: AssignedUser;
}

export function personalComputeInstanceSettingsSerializer(
  item: PersonalComputeInstanceSettings,
): any {
  return {
    assignedUser: !item["assignedUser"]
      ? item["assignedUser"]
      : assignedUserSerializer(item["assignedUser"]),
  };
}

export function personalComputeInstanceSettingsDeserializer(
  item: any,
): PersonalComputeInstanceSettings {
  return {
    assignedUser: !item["assignedUser"]
      ? item["assignedUser"]
      : assignedUserDeserializer(item["assignedUser"]),
  };
}

/** A user that can be assigned to a compute instance. */
export interface AssignedUser {
  /** User’s AAD Object Id. */
  objectId: string;
  /** User’s AAD Tenant Id. */
  tenantId: string;
}

export function assignedUserSerializer(item: AssignedUser): any {
  return { objectId: item["objectId"], tenantId: item["tenantId"] };
}

export function assignedUserDeserializer(item: any): AssignedUser {
  return {
    objectId: item["objectId"],
    tenantId: item["tenantId"],
  };
}

/** Details of customized scripts to execute for setting up the cluster. */
export interface SetupScripts {
  /** Customized setup scripts */
  scripts?: ScriptsToExecute;
}

export function setupScriptsSerializer(item: SetupScripts): any {
  return {
    scripts: !item["scripts"] ? item["scripts"] : scriptsToExecuteSerializer(item["scripts"]),
  };
}

export function setupScriptsDeserializer(item: any): SetupScripts {
  return {
    scripts: !item["scripts"] ? item["scripts"] : scriptsToExecuteDeserializer(item["scripts"]),
  };
}

/** Customized setup scripts */
export interface ScriptsToExecute {
  /** Script that's run every time the machine starts. */
  startupScript?: ScriptReference;
  /** Script that's run only once during provision of the compute. */
  creationScript?: ScriptReference;
}

export function scriptsToExecuteSerializer(item: ScriptsToExecute): any {
  return {
    startupScript: !item["startupScript"]
      ? item["startupScript"]
      : scriptReferenceSerializer(item["startupScript"]),
    creationScript: !item["creationScript"]
      ? item["creationScript"]
      : scriptReferenceSerializer(item["creationScript"]),
  };
}

export function scriptsToExecuteDeserializer(item: any): ScriptsToExecute {
  return {
    startupScript: !item["startupScript"]
      ? item["startupScript"]
      : scriptReferenceDeserializer(item["startupScript"]),
    creationScript: !item["creationScript"]
      ? item["creationScript"]
      : scriptReferenceDeserializer(item["creationScript"]),
  };
}

/** Script reference */
export interface ScriptReference {
  /** The storage source of the script: inline, workspace. */
  scriptSource?: string;
  /** The location of scripts in the mounted volume. */
  scriptData?: string;
  /** Optional command line arguments passed to the script to run. */
  scriptArguments?: string;
  /** Optional time period passed to timeout command. */
  timeout?: string;
}

export function scriptReferenceSerializer(item: ScriptReference): any {
  return {
    scriptSource: item["scriptSource"],
    scriptData: item["scriptData"],
    scriptArguments: item["scriptArguments"],
    timeout: item["timeout"],
  };
}

export function scriptReferenceDeserializer(item: any): ScriptReference {
  return {
    scriptSource: item["scriptSource"],
    scriptData: item["scriptData"],
    scriptArguments: item["scriptArguments"],
    timeout: item["timeout"],
  };
}

/** The last operation on ComputeInstance. */
export interface ComputeInstanceLastOperation {
  /** Name of the last operation. */
  operationName?: OperationName;
  /** Time of the last operation. */
  operationTime?: Date;
  /** Operation status. */
  operationStatus?: OperationStatus;
  /** Trigger of operation. */
  operationTrigger?: OperationTrigger;
}

export function computeInstanceLastOperationDeserializer(item: any): ComputeInstanceLastOperation {
  return {
    operationName: item["operationName"],
    operationTime: !item["operationTime"] ? item["operationTime"] : new Date(item["operationTime"]),
    operationStatus: item["operationStatus"],
    operationTrigger: item["operationTrigger"],
  };
}

/** Name of the last operation. */
export enum KnownOperationName {
  /** Create */
  Create = "Create",
  /** Start */
  Start = "Start",
  /** Stop */
  Stop = "Stop",
  /** Restart */
  Restart = "Restart",
  /** Resize */
  Resize = "Resize",
  /** Reimage */
  Reimage = "Reimage",
  /** Delete */
  Delete = "Delete",
}

/**
 * Name of the last operation. \
 * {@link KnownOperationName} can be used interchangeably with OperationName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Create** \
 * **Start** \
 * **Stop** \
 * **Restart** \
 * **Resize** \
 * **Reimage** \
 * **Delete**
 */
export type OperationName = string;

/** Operation status. */
export enum KnownOperationStatus {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** CreateFailed */
  CreateFailed = "CreateFailed",
  /** StartFailed */
  StartFailed = "StartFailed",
  /** StopFailed */
  StopFailed = "StopFailed",
  /** RestartFailed */
  RestartFailed = "RestartFailed",
  /** ResizeFailed */
  ResizeFailed = "ResizeFailed",
  /** ReimageFailed */
  ReimageFailed = "ReimageFailed",
  /** DeleteFailed */
  DeleteFailed = "DeleteFailed",
}

/**
 * Operation status. \
 * {@link KnownOperationStatus} can be used interchangeably with OperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Succeeded** \
 * **CreateFailed** \
 * **StartFailed** \
 * **StopFailed** \
 * **RestartFailed** \
 * **ResizeFailed** \
 * **ReimageFailed** \
 * **DeleteFailed**
 */
export type OperationStatus = string;

/** Trigger of operation. */
export enum KnownOperationTrigger {
  /** User */
  User = "User",
  /** Schedule */
  Schedule = "Schedule",
  /** IdleShutdown */
  IdleShutdown = "IdleShutdown",
}

/**
 * Trigger of operation. \
 * {@link KnownOperationTrigger} can be used interchangeably with OperationTrigger,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **Schedule** \
 * **IdleShutdown**
 */
export type OperationTrigger = string;

/** The list of schedules to be applied on the computes */
export interface ComputeSchedules {
  /** The list of compute start stop schedules to be applied. */
  computeStartStop?: ComputeStartStopSchedule[];
}

export function computeSchedulesSerializer(item: ComputeSchedules): any {
  return {
    computeStartStop: !item["computeStartStop"]
      ? item["computeStartStop"]
      : computeStartStopScheduleArraySerializer(item["computeStartStop"]),
  };
}

export function computeSchedulesDeserializer(item: any): ComputeSchedules {
  return {
    computeStartStop: !item["computeStartStop"]
      ? item["computeStartStop"]
      : computeStartStopScheduleArrayDeserializer(item["computeStartStop"]),
  };
}

export function computeStartStopScheduleArraySerializer(
  result: Array<ComputeStartStopSchedule>,
): any[] {
  return result.map((item) => {
    return computeStartStopScheduleSerializer(item);
  });
}

export function computeStartStopScheduleArrayDeserializer(
  result: Array<ComputeStartStopSchedule>,
): any[] {
  return result.map((item) => {
    return computeStartStopScheduleDeserializer(item);
  });
}

/** Compute start stop schedule properties */
export interface ComputeStartStopSchedule {
  /** A system assigned id for the schedule. */
  readonly id?: string;
  /** The current deployment state of schedule. */
  readonly provisioningStatus?: ProvisioningStatus;
  /** Is the schedule enabled or disabled? */
  status?: ScheduleStatus;
  /** [Required] The compute power action. */
  action?: ComputePowerAction;
  /** [Required] The schedule trigger type. */
  triggerType?: ComputeTriggerType;
  /** Required if triggerType is Recurrence. */
  recurrence?: Recurrence;
  /** Required if triggerType is Cron. */
  cron?: Cron;
  /** [Deprecated] Not used any more. */
  schedule?: ScheduleBase;
}

export function computeStartStopScheduleSerializer(item: ComputeStartStopSchedule): any {
  return {
    status: item["status"],
    action: item["action"],
    triggerType: item["triggerType"],
    recurrence: !item["recurrence"] ? item["recurrence"] : recurrenceSerializer(item["recurrence"]),
    cron: !item["cron"] ? item["cron"] : cronSerializer(item["cron"]),
    schedule: !item["schedule"] ? item["schedule"] : scheduleBaseSerializer(item["schedule"]),
  };
}

export function computeStartStopScheduleDeserializer(item: any): ComputeStartStopSchedule {
  return {
    id: item["id"],
    provisioningStatus: item["provisioningStatus"],
    status: item["status"],
    action: item["action"],
    triggerType: item["triggerType"],
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : recurrenceDeserializer(item["recurrence"]),
    cron: !item["cron"] ? item["cron"] : cronDeserializer(item["cron"]),
    schedule: !item["schedule"] ? item["schedule"] : scheduleBaseDeserializer(item["schedule"]),
  };
}

/** The current deployment state of schedule. */
export enum KnownProvisioningStatus {
  /** Completed */
  Completed = "Completed",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current deployment state of schedule. \
 * {@link KnownProvisioningStatus} can be used interchangeably with ProvisioningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed** \
 * **Provisioning** \
 * **Failed**
 */
export type ProvisioningStatus = string;

/** Is the schedule enabled or disabled? */
export enum KnownScheduleStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Is the schedule enabled or disabled? \
 * {@link KnownScheduleStatus} can be used interchangeably with ScheduleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ScheduleStatus = string;

/** [Required] The compute power action. */
export enum KnownComputePowerAction {
  /** Start */
  Start = "Start",
  /** Stop */
  Stop = "Stop",
}

/**
 * [Required] The compute power action. \
 * {@link KnownComputePowerAction} can be used interchangeably with ComputePowerAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Start** \
 * **Stop**
 */
export type ComputePowerAction = string;

/** Known values of {@link ComputeTriggerType} that the service accepts. */
export enum KnownComputeTriggerType {
  /** Recurrence */
  Recurrence = "Recurrence",
  /** Cron */
  Cron = "Cron",
}

/** Type of ComputeTriggerType */
export type ComputeTriggerType = string;

/** The workflow trigger recurrence for ComputeStartStop schedule type. */
export interface Recurrence {
  /** [Required] The frequency to trigger schedule. */
  frequency?: ComputeRecurrenceFrequency;
  /** [Required] Specifies schedule interval in conjunction with frequency */
  interval?: number;
  /** The start time in yyyy-MM-ddTHH:mm:ss format. */
  startTime?: string;
  /**
   * Specifies time zone in which the schedule runs.
   * TimeZone should follow Windows time zone format. Refer: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11
   */
  timeZone?: string;
  /** [Required] The recurrence schedule. */
  schedule?: ComputeRecurrenceSchedule;
}

export function recurrenceSerializer(item: Recurrence): any {
  return {
    frequency: item["frequency"],
    interval: item["interval"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : computeRecurrenceScheduleSerializer(item["schedule"]),
  };
}

export function recurrenceDeserializer(item: any): Recurrence {
  return {
    frequency: item["frequency"],
    interval: item["interval"],
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : computeRecurrenceScheduleDeserializer(item["schedule"]),
  };
}

/** Enum to describe the frequency of a compute recurrence schedule */
export enum KnownComputeRecurrenceFrequency {
  /** Minute frequency */
  Minute = "Minute",
  /** Hour frequency */
  Hour = "Hour",
  /** Day frequency */
  Day = "Day",
  /** Week frequency */
  Week = "Week",
  /** Month frequency */
  Month = "Month",
}

/**
 * Enum to describe the frequency of a compute recurrence schedule \
 * {@link KnownComputeRecurrenceFrequency} can be used interchangeably with ComputeRecurrenceFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Minute**: Minute frequency \
 * **Hour**: Hour frequency \
 * **Day**: Day frequency \
 * **Week**: Week frequency \
 * **Month**: Month frequency
 */
export type ComputeRecurrenceFrequency = string;

/** model interface ComputeRecurrenceSchedule */
export interface ComputeRecurrenceSchedule {
  /** [Required] List of hours for the schedule. */
  hours: number[];
  /** [Required] List of minutes for the schedule. */
  minutes: number[];
  /** List of month days for the schedule */
  monthDays?: number[];
  /** List of days for the schedule. */
  weekDays?: ComputeWeekDay[];
}

export function computeRecurrenceScheduleSerializer(item: ComputeRecurrenceSchedule): any {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
  };
}

export function computeRecurrenceScheduleDeserializer(item: any): ComputeRecurrenceSchedule {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p1: any) => {
          return p1;
        }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p1: any) => {
          return p1;
        }),
  };
}

/** Enum of weekday */
export enum KnownComputeWeekDay {
  /** Monday weekday */
  Monday = "Monday",
  /** Tuesday weekday */
  Tuesday = "Tuesday",
  /** Wednesday weekday */
  Wednesday = "Wednesday",
  /** Thursday weekday */
  Thursday = "Thursday",
  /** Friday weekday */
  Friday = "Friday",
  /** Saturday weekday */
  Saturday = "Saturday",
  /** Sunday weekday */
  Sunday = "Sunday",
}

/**
 * Enum of weekday \
 * {@link KnownComputeWeekDay} can be used interchangeably with ComputeWeekDay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday**: Monday weekday \
 * **Tuesday**: Tuesday weekday \
 * **Wednesday**: Wednesday weekday \
 * **Thursday**: Thursday weekday \
 * **Friday**: Friday weekday \
 * **Saturday**: Saturday weekday \
 * **Sunday**: Sunday weekday
 */
export type ComputeWeekDay = string;

/** The workflow trigger cron for ComputeStartStop schedule type. */
export interface Cron {
  /** The start time in yyyy-MM-ddTHH:mm:ss format. */
  startTime?: string;
  /**
   * Specifies time zone in which the schedule runs.
   * TimeZone should follow Windows time zone format. Refer: https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11
   */
  timeZone?: string;
  /**
   * [Required] Specifies cron expression of schedule.
   * The expression should follow NCronTab format.
   */
  expression?: string;
}

export function cronSerializer(item: Cron): any {
  return {
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    expression: item["expression"],
  };
}

export function cronDeserializer(item: any): Cron {
  return {
    startTime: item["startTime"],
    timeZone: item["timeZone"],
    expression: item["expression"],
  };
}

/** model interface ScheduleBase */
export interface ScheduleBase {
  /** A system assigned id for the schedule. */
  id?: string;
  /** The current deployment state of schedule. */
  provisioningStatus?: ScheduleProvisioningState;
  /** Is the schedule enabled or disabled? */
  status?: ScheduleStatus;
}

export function scheduleBaseSerializer(item: ScheduleBase): any {
  return { id: item["id"], provisioningStatus: item["provisioningStatus"], status: item["status"] };
}

export function scheduleBaseDeserializer(item: any): ScheduleBase {
  return {
    id: item["id"],
    provisioningStatus: item["provisioningStatus"],
    status: item["status"],
  };
}

/** The current deployment state of schedule. */
export enum KnownScheduleProvisioningState {
  /** Completed */
  Completed = "Completed",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current deployment state of schedule. \
 * {@link KnownScheduleProvisioningState} can be used interchangeably with ScheduleProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed** \
 * **Provisioning** \
 * **Failed**
 */
export type ScheduleProvisioningState = string;

export function computeInstanceContainerArrayDeserializer(
  result: Array<ComputeInstanceContainer>,
): any[] {
  return result.map((item) => {
    return computeInstanceContainerDeserializer(item);
  });
}

/** Defines an Aml Instance container. */
export interface ComputeInstanceContainer {
  /** Name of the ComputeInstance container. */
  name?: string;
  /** Auto save settings. */
  autosave?: Autosave;
  /** Information of GPU. */
  gpu?: string;
  /** network of this container. */
  network?: Network;
  /** Environment information of this container. */
  environment?: ComputeInstanceEnvironmentInfo;
  /** services of this containers. */
  readonly services?: any[];
}

export function computeInstanceContainerDeserializer(item: any): ComputeInstanceContainer {
  return {
    name: item["name"],
    autosave: item["autosave"],
    gpu: item["gpu"],
    network: item["network"],
    environment: !item["environment"]
      ? item["environment"]
      : computeInstanceEnvironmentInfoDeserializer(item["environment"]),
    services: !item["services"]
      ? item["services"]
      : item["services"].map((p: any) => {
          return p;
        }),
  };
}

/** Auto save settings. */
export enum KnownAutosave {
  /** None */
  None = "None",
  /** Local */
  Local = "Local",
  /** Remote */
  Remote = "Remote",
}

/**
 * Auto save settings. \
 * {@link KnownAutosave} can be used interchangeably with Autosave,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Local** \
 * **Remote**
 */
export type Autosave = string;

/** network of this container. */
export enum KnownNetwork {
  /** Bridge */
  Bridge = "Bridge",
  /** Host */
  Host = "Host",
}

/**
 * network of this container. \
 * {@link KnownNetwork} can be used interchangeably with Network,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bridge** \
 * **Host**
 */
export type Network = string;

/** Environment information */
export interface ComputeInstanceEnvironmentInfo {
  /** name of environment. */
  name?: string;
  /** version of environment. */
  version?: string;
}

export function computeInstanceEnvironmentInfoDeserializer(
  item: any,
): ComputeInstanceEnvironmentInfo {
  return {
    name: item["name"],
    version: item["version"],
  };
}

export function computeInstanceDataDiskArrayDeserializer(
  result: Array<ComputeInstanceDataDisk>,
): any[] {
  return result.map((item) => {
    return computeInstanceDataDiskDeserializer(item);
  });
}

/** Defines an Aml Instance DataDisk. */
export interface ComputeInstanceDataDisk {
  /** Caching type of Data Disk. */
  caching?: Caching;
  /** The initial disk size in gigabytes. */
  diskSizeGB?: number;
  /** The lun is used to uniquely identify each data disk. If attaching multiple disks, each should have a distinct lun. */
  lun?: number;
  /** type of this storage account. */
  storageAccountType?: StorageAccountType;
}

export function computeInstanceDataDiskDeserializer(item: any): ComputeInstanceDataDisk {
  return {
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    lun: item["lun"],
    storageAccountType: item["storageAccountType"],
  };
}

/** Caching type of Data Disk. */
export enum KnownCaching {
  /** None */
  None = "None",
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Caching type of Data Disk. \
 * {@link KnownCaching} can be used interchangeably with Caching,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ReadOnly** \
 * **ReadWrite**
 */
export type Caching = string;

/** type of this storage account. */
export enum KnownStorageAccountType {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
}

/**
 * type of this storage account. \
 * {@link KnownStorageAccountType} can be used interchangeably with StorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS** \
 * **Premium_LRS**
 */
export type StorageAccountType = string;

export function computeInstanceDataMountArrayDeserializer(
  result: Array<ComputeInstanceDataMount>,
): any[] {
  return result.map((item) => {
    return computeInstanceDataMountDeserializer(item);
  });
}

/** Defines an Aml Instance DataMount. */
export interface ComputeInstanceDataMount {
  /** Source of the ComputeInstance data mount. */
  source?: string;
  /** Data source type. */
  sourceType?: SourceType;
  /** name of the ComputeInstance data mount. */
  mountName?: string;
  /** Mount Action. */
  mountAction?: MountAction;
  /** Mount Mode. */
  mountMode?: MountMode;
  /** who this data mount created by. */
  createdBy?: string;
  /** Path of this data mount. */
  mountPath?: string;
  /** Mount state. */
  mountState?: MountState;
  /** The time when the disk mounted. */
  mountedOn?: Date;
  /** Error of this data mount. */
  error?: string;
}

export function computeInstanceDataMountDeserializer(item: any): ComputeInstanceDataMount {
  return {
    source: item["source"],
    sourceType: item["sourceType"],
    mountName: item["mountName"],
    mountAction: item["mountAction"],
    mountMode: item["mountMode"],
    createdBy: item["createdBy"],
    mountPath: item["mountPath"],
    mountState: item["mountState"],
    mountedOn: !item["mountedOn"] ? item["mountedOn"] : new Date(item["mountedOn"]),
    error: item["error"],
  };
}

/** Data source type. */
export enum KnownSourceType {
  /** Dataset */
  Dataset = "Dataset",
  /** Datastore */
  Datastore = "Datastore",
  /** URI */
  URI = "URI",
}

/**
 * Data source type. \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dataset** \
 * **Datastore** \
 * **URI**
 */
export type SourceType = string;

/** Mount Action. */
export enum KnownMountAction {
  /** Mount */
  Mount = "Mount",
  /** Unmount */
  Unmount = "Unmount",
}

/**
 * Mount Action. \
 * {@link KnownMountAction} can be used interchangeably with MountAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Mount** \
 * **Unmount**
 */
export type MountAction = string;

/** Mount Mode. */
export enum KnownMountMode {
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Mount Mode. \
 * {@link KnownMountMode} can be used interchangeably with MountMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadOnly** \
 * **ReadWrite**
 */
export type MountMode = string;

/** Mount state. */
export enum KnownMountState {
  /** MountRequested */
  MountRequested = "MountRequested",
  /** Mounted */
  Mounted = "Mounted",
  /** MountFailed */
  MountFailed = "MountFailed",
  /** UnmountRequested */
  UnmountRequested = "UnmountRequested",
  /** UnmountFailed */
  UnmountFailed = "UnmountFailed",
  /** Unmounted */
  Unmounted = "Unmounted",
}

/**
 * Mount state. \
 * {@link KnownMountState} can be used interchangeably with MountState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MountRequested** \
 * **Mounted** \
 * **MountFailed** \
 * **UnmountRequested** \
 * **UnmountFailed** \
 * **Unmounted**
 */
export type MountState = string;

/** Version of computeInstance. */
export interface ComputeInstanceVersion {
  /** Runtime of compute instance. */
  runtime?: string;
}

export function computeInstanceVersionDeserializer(item: any): ComputeInstanceVersion {
  return {
    runtime: item["runtime"],
  };
}

/** A Machine Learning compute based on Azure Virtual Machines. */
export interface VirtualMachine extends Compute {
  properties?: VirtualMachineSchemaProperties;
  /** The type of compute */
  computeType: "VirtualMachine";
}

export function virtualMachineSerializer(item: VirtualMachine): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineSchemaPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineDeserializer(item: any): VirtualMachine {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineSchemaPropertiesDeserializer(item["properties"]),
  };
}

/** model interface VirtualMachineSchemaProperties */
export interface VirtualMachineSchemaProperties {
  /** Virtual Machine size */
  virtualMachineSize?: string;
  /** Port open for ssh connections. */
  sshPort?: number;
  /** Notebook server port open for ssh connections. */
  notebookServerPort?: number;
  /** Public IP address of the virtual machine. */
  address?: string;
  /** Admin credentials for virtual machine */
  administratorAccount?: VirtualMachineSshCredentials;
  /** Indicates whether this compute will be used for running notebooks. */
  isNotebookInstanceCompute?: boolean;
}

export function virtualMachineSchemaPropertiesSerializer(
  item: VirtualMachineSchemaProperties,
): any {
  return {
    virtualMachineSize: item["virtualMachineSize"],
    sshPort: item["sshPort"],
    notebookServerPort: item["notebookServerPort"],
    address: item["address"],
    administratorAccount: !item["administratorAccount"]
      ? item["administratorAccount"]
      : virtualMachineSshCredentialsSerializer(item["administratorAccount"]),
    isNotebookInstanceCompute: item["isNotebookInstanceCompute"],
  };
}

export function virtualMachineSchemaPropertiesDeserializer(
  item: any,
): VirtualMachineSchemaProperties {
  return {
    virtualMachineSize: item["virtualMachineSize"],
    sshPort: item["sshPort"],
    notebookServerPort: item["notebookServerPort"],
    address: item["address"],
    administratorAccount: !item["administratorAccount"]
      ? item["administratorAccount"]
      : virtualMachineSshCredentialsDeserializer(item["administratorAccount"]),
    isNotebookInstanceCompute: item["isNotebookInstanceCompute"],
  };
}

/** Admin credentials for virtual machine */
export interface VirtualMachineSshCredentials {
  /** Username of admin account */
  username?: string;
  /** Password of admin account */
  password?: string;
  /** Public key data */
  publicKeyData?: string;
  /** Private key data */
  privateKeyData?: string;
}

export function virtualMachineSshCredentialsSerializer(item: VirtualMachineSshCredentials): any {
  return {
    username: item["username"],
    password: item["password"],
    publicKeyData: item["publicKeyData"],
    privateKeyData: item["privateKeyData"],
  };
}

export function virtualMachineSshCredentialsDeserializer(item: any): VirtualMachineSshCredentials {
  return {
    username: item["username"],
    password: item["password"],
    publicKeyData: item["publicKeyData"],
    privateKeyData: item["privateKeyData"],
  };
}

/** A HDInsight compute. */
export interface HDInsight extends Compute {
  properties?: HDInsightProperties;
  /** The type of compute */
  computeType: "HDInsight";
}

export function hdInsightSerializer(item: HDInsight): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : hdInsightPropertiesSerializer(item["properties"]),
  };
}

export function hdInsightDeserializer(item: any): HDInsight {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : hdInsightPropertiesDeserializer(item["properties"]),
  };
}

/** HDInsight compute properties */
export interface HDInsightProperties {
  /** Port open for ssh connections on the master node of the cluster. */
  sshPort?: number;
  /** Public IP address of the master node of the cluster. */
  address?: string;
  /** Admin credentials for master node of the cluster */
  administratorAccount?: VirtualMachineSshCredentials;
}

export function hdInsightPropertiesSerializer(item: HDInsightProperties): any {
  return {
    sshPort: item["sshPort"],
    address: item["address"],
    administratorAccount: !item["administratorAccount"]
      ? item["administratorAccount"]
      : virtualMachineSshCredentialsSerializer(item["administratorAccount"]),
  };
}

export function hdInsightPropertiesDeserializer(item: any): HDInsightProperties {
  return {
    sshPort: item["sshPort"],
    address: item["address"],
    administratorAccount: !item["administratorAccount"]
      ? item["administratorAccount"]
      : virtualMachineSshCredentialsDeserializer(item["administratorAccount"]),
  };
}

/** A DataFactory compute. */
export interface DataFactory extends Compute {
  /** The type of compute */
  computeType: "DataFactory";
}

export function dataFactorySerializer(item: DataFactory): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function dataFactoryDeserializer(item: any): DataFactory {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** A DataFactory compute. */
export interface Databricks extends Compute {
  properties?: DatabricksProperties;
  /** The type of compute */
  computeType: "Databricks";
}

export function databricksSerializer(item: Databricks): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : databricksPropertiesSerializer(item["properties"]),
  };
}

export function databricksDeserializer(item: any): Databricks {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : databricksPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Databricks */
export interface DatabricksProperties {
  /** Databricks access token */
  databricksAccessToken?: string;
  /** Workspace Url */
  workspaceUrl?: string;
}

export function databricksPropertiesSerializer(item: DatabricksProperties): any {
  return {
    databricksAccessToken: item["databricksAccessToken"],
    workspaceUrl: item["workspaceUrl"],
  };
}

export function databricksPropertiesDeserializer(item: any): DatabricksProperties {
  return {
    databricksAccessToken: item["databricksAccessToken"],
    workspaceUrl: item["workspaceUrl"],
  };
}

/** A DataLakeAnalytics compute. */
export interface DataLakeAnalytics extends Compute {
  properties?: DataLakeAnalyticsSchemaProperties;
  /** The type of compute */
  computeType: "DataLakeAnalytics";
}

export function dataLakeAnalyticsSerializer(item: DataLakeAnalytics): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : dataLakeAnalyticsSchemaPropertiesSerializer(item["properties"]),
  };
}

export function dataLakeAnalyticsDeserializer(item: any): DataLakeAnalytics {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : dataLakeAnalyticsSchemaPropertiesDeserializer(item["properties"]),
  };
}

/** model interface DataLakeAnalyticsSchemaProperties */
export interface DataLakeAnalyticsSchemaProperties {
  /** DataLake Store Account Name */
  dataLakeStoreAccountName?: string;
}

export function dataLakeAnalyticsSchemaPropertiesSerializer(
  item: DataLakeAnalyticsSchemaProperties,
): any {
  return { dataLakeStoreAccountName: item["dataLakeStoreAccountName"] };
}

export function dataLakeAnalyticsSchemaPropertiesDeserializer(
  item: any,
): DataLakeAnalyticsSchemaProperties {
  return {
    dataLakeStoreAccountName: item["dataLakeStoreAccountName"],
  };
}

/** A SynapseSpark compute. */
export interface SynapseSpark extends Compute {
  properties?: SynapseSparkProperties;
  /** The type of compute */
  computeType: "SynapseSpark";
}

export function synapseSparkSerializer(item: SynapseSpark): any {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    description: item["description"],
    resourceId: item["resourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : synapseSparkPropertiesSerializer(item["properties"]),
  };
}

export function synapseSparkDeserializer(item: any): SynapseSpark {
  return {
    computeType: item["computeType"],
    computeLocation: item["computeLocation"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    resourceId: item["resourceId"],
    provisioningErrors: !item["provisioningErrors"]
      ? item["provisioningErrors"]
      : errorResponseArrayDeserializer(item["provisioningErrors"]),
    isAttachedCompute: item["isAttachedCompute"],
    disableLocalAuth: item["disableLocalAuth"],
    properties: !item["properties"]
      ? item["properties"]
      : synapseSparkPropertiesDeserializer(item["properties"]),
  };
}

/** model interface SynapseSparkProperties */
export interface SynapseSparkProperties {
  /** Auto scale properties. */
  autoScaleProperties?: AutoScaleProperties;
  /** Auto pause properties. */
  autoPauseProperties?: AutoPauseProperties;
  /** Spark version. */
  sparkVersion?: string;
  /** The number of compute nodes currently assigned to the compute. */
  nodeCount?: number;
  /** Node size. */
  nodeSize?: string;
  /** Node size family. */
  nodeSizeFamily?: string;
  /** Azure subscription identifier. */
  subscriptionId?: string;
  /** Name of the resource group in which workspace is located. */
  resourceGroup?: string;
  /** Name of Azure Machine Learning workspace. */
  workspaceName?: string;
  /** Pool name. */
  poolName?: string;
}

export function synapseSparkPropertiesSerializer(item: SynapseSparkProperties): any {
  return {
    autoScaleProperties: !item["autoScaleProperties"]
      ? item["autoScaleProperties"]
      : autoScalePropertiesSerializer(item["autoScaleProperties"]),
    autoPauseProperties: !item["autoPauseProperties"]
      ? item["autoPauseProperties"]
      : autoPausePropertiesSerializer(item["autoPauseProperties"]),
    sparkVersion: item["sparkVersion"],
    nodeCount: item["nodeCount"],
    nodeSize: item["nodeSize"],
    nodeSizeFamily: item["nodeSizeFamily"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    workspaceName: item["workspaceName"],
    poolName: item["poolName"],
  };
}

export function synapseSparkPropertiesDeserializer(item: any): SynapseSparkProperties {
  return {
    autoScaleProperties: !item["autoScaleProperties"]
      ? item["autoScaleProperties"]
      : autoScalePropertiesDeserializer(item["autoScaleProperties"]),
    autoPauseProperties: !item["autoPauseProperties"]
      ? item["autoPauseProperties"]
      : autoPausePropertiesDeserializer(item["autoPauseProperties"]),
    sparkVersion: item["sparkVersion"],
    nodeCount: item["nodeCount"],
    nodeSize: item["nodeSize"],
    nodeSizeFamily: item["nodeSizeFamily"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    workspaceName: item["workspaceName"],
    poolName: item["poolName"],
  };
}

/** Auto scale properties */
export interface AutoScaleProperties {
  minNodeCount?: number;
  enabled?: boolean;
  maxNodeCount?: number;
}

export function autoScalePropertiesSerializer(item: AutoScaleProperties): any {
  return {
    minNodeCount: item["minNodeCount"],
    enabled: item["enabled"],
    maxNodeCount: item["maxNodeCount"],
  };
}

export function autoScalePropertiesDeserializer(item: any): AutoScaleProperties {
  return {
    minNodeCount: item["minNodeCount"],
    enabled: item["enabled"],
    maxNodeCount: item["maxNodeCount"],
  };
}

/** Auto pause properties */
export interface AutoPauseProperties {
  delayInMinutes?: number;
  enabled?: boolean;
}

export function autoPausePropertiesSerializer(item: AutoPauseProperties): any {
  return { delayInMinutes: item["delayInMinutes"], enabled: item["enabled"] };
}

export function autoPausePropertiesDeserializer(item: any): AutoPauseProperties {
  return {
    delayInMinutes: item["delayInMinutes"],
    enabled: item["enabled"],
  };
}

/** AmlCompute update parameters. */
export interface ClusterUpdateParameters {
  /** Properties of ClusterUpdate */
  properties?: ScaleSettingsInformation;
}

export function clusterUpdateParametersSerializer(item: ClusterUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["properties"])
      ? undefined
      : _clusterUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of a amlCompute that need to be updated. */
export interface ClusterUpdateProperties {
  /** Properties of ClusterUpdate */
  properties?: ScaleSettingsInformation;
}

export function clusterUpdatePropertiesSerializer(item: ClusterUpdateProperties): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scaleSettingsInformationSerializer(item["properties"]),
  };
}

/** Desired scale settings for the amlCompute. */
export interface ScaleSettingsInformation {
  scaleSettings?: ScaleSettings;
}

export function scaleSettingsInformationSerializer(item: ScaleSettingsInformation): any {
  return {
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : scaleSettingsSerializer(item["scaleSettings"]),
  };
}

/** Paginated list of Machine Learning compute objects wrapped in ARM resource envelope. */
export interface _PaginatedComputeResourcesList {
  /** The ComputeResource items on this page */
  value: ComputeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _paginatedComputeResourcesListDeserializer(
  item: any,
): _PaginatedComputeResourcesList {
  return {
    value: computeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function computeResourceArraySerializer(result: Array<ComputeResource>): any[] {
  return result.map((item) => {
    return computeResourceSerializer(item);
  });
}

export function computeResourceArrayDeserializer(result: Array<ComputeResource>): any[] {
  return result.map((item) => {
    return computeResourceDeserializer(item);
  });
}

/** Result of AmlCompute Nodes */
export interface _AmlComputeNodesInformation {
  /** The collection of returned AmlCompute nodes details. */
  readonly nodes?: AmlComputeNodeInformation[];
  /** The continuation token. */
  readonly nextLink?: string;
}

export function _amlComputeNodesInformationDeserializer(item: any): _AmlComputeNodesInformation {
  return {
    nodes: !item["nodes"]
      ? item["nodes"]
      : amlComputeNodeInformationArrayDeserializer(item["nodes"]),
    nextLink: item["nextLink"],
  };
}

export function amlComputeNodeInformationArrayDeserializer(
  result: Array<AmlComputeNodeInformation>,
): any[] {
  return result.map((item) => {
    return amlComputeNodeInformationDeserializer(item);
  });
}

/** Compute node information related to a AmlCompute. */
export interface AmlComputeNodeInformation {
  /** ID of the compute node. */
  readonly nodeId?: string;
  /** Private IP address of the compute node. */
  readonly privateIpAddress?: string;
  /** Public IP address of the compute node. */
  readonly publicIpAddress?: string;
  /** SSH port number of the node. */
  readonly port?: number;
  /** State of the compute node. Values are idle, running, preparing, unusable, leaving and preempted. */
  readonly nodeState?: NodeState;
  /** ID of the Experiment running on the node, if any else null. */
  readonly runId?: string;
}

export function amlComputeNodeInformationDeserializer(item: any): AmlComputeNodeInformation {
  return {
    nodeId: item["nodeId"],
    privateIpAddress: item["privateIpAddress"],
    publicIpAddress: item["publicIpAddress"],
    port: item["port"],
    nodeState: item["nodeState"],
    runId: item["runId"],
  };
}

/** State of the compute node. Values are idle, running, preparing, unusable, leaving and preempted. */
export enum KnownNodeState {
  /** idle */
  Idle = "idle",
  /** running */
  Running = "running",
  /** preparing */
  Preparing = "preparing",
  /** unusable */
  Unusable = "unusable",
  /** leaving */
  Leaving = "leaving",
  /** preempted */
  Preempted = "preempted",
}

/**
 * State of the compute node. Values are idle, running, preparing, unusable, leaving and preempted. \
 * {@link KnownNodeState} can be used interchangeably with NodeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **idle** \
 * **running** \
 * **preparing** \
 * **unusable** \
 * **leaving** \
 * **preempted**
 */
export type NodeState = string;

/** Secrets related to a Machine Learning compute. Might differ for every type of compute. */
export interface ComputeSecrets {
  /** The type of compute */
  /** The discriminator possible values: AKS, VirtualMachine, Databricks */
  computeType: ComputeType;
}

export function computeSecretsDeserializer(item: any): ComputeSecrets {
  return {
    computeType: item["computeType"],
  };
}

/** Alias for ComputeSecretsUnion */
export type ComputeSecretsUnion =
  | AksComputeSecrets
  | VirtualMachineSecrets
  | DatabricksComputeSecrets
  | ComputeSecrets;

export function computeSecretsUnionDeserializer(item: any): ComputeSecretsUnion {
  switch (item["computeType"]) {
    case "AKS":
      return aksComputeSecretsDeserializer(item as AksComputeSecrets);

    case "VirtualMachine":
      return virtualMachineSecretsDeserializer(item as VirtualMachineSecrets);

    case "Databricks":
      return databricksComputeSecretsDeserializer(item as DatabricksComputeSecrets);

    default:
      return computeSecretsDeserializer(item);
  }
}

/** Secrets related to a Machine Learning compute based on AKS. */
export interface AksComputeSecrets extends ComputeSecrets {
  /** Content of kubeconfig file that can be used to connect to the Kubernetes cluster. */
  userKubeConfig?: string;
  /** Content of kubeconfig file that can be used to connect to the Kubernetes cluster. */
  adminKubeConfig?: string;
  /** Image registry pull secret. */
  imagePullSecretName?: string;
  /** The type of compute */
  computeType: "AKS";
}

export function aksComputeSecretsDeserializer(item: any): AksComputeSecrets {
  return {
    computeType: item["computeType"],
    userKubeConfig: item["userKubeConfig"],
    adminKubeConfig: item["adminKubeConfig"],
    imagePullSecretName: item["imagePullSecretName"],
  };
}

/** Secrets related to a Machine Learning compute based on AKS. */
export interface VirtualMachineSecrets extends ComputeSecrets {
  /** Admin credentials for virtual machine. */
  administratorAccount?: VirtualMachineSshCredentials;
  /** The type of compute */
  computeType: "VirtualMachine";
}

export function virtualMachineSecretsDeserializer(item: any): VirtualMachineSecrets {
  return {
    computeType: item["computeType"],
    administratorAccount: !item["administratorAccount"]
      ? item["administratorAccount"]
      : virtualMachineSshCredentialsDeserializer(item["administratorAccount"]),
  };
}

/** Secrets related to a Machine Learning compute based on Databricks. */
export interface DatabricksComputeSecrets extends ComputeSecrets {
  /** access token for databricks account. */
  databricksAccessToken?: string;
  /** The type of compute */
  computeType: "Databricks";
}

export function databricksComputeSecretsDeserializer(item: any): DatabricksComputeSecrets {
  return {
    computeType: item["computeType"],
    databricksAccessToken: item["databricksAccessToken"],
  };
}

/** The List Aml user feature operation response. */
export interface _ListAmlUserFeatureResult {
  /** The AmlUserFeature items on this page */
  readonly value: AmlUserFeature[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listAmlUserFeatureResultDeserializer(item: any): _ListAmlUserFeatureResult {
  return {
    value: amlUserFeatureArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function amlUserFeatureArrayDeserializer(result: Array<AmlUserFeature>): any[] {
  return result.map((item) => {
    return amlUserFeatureDeserializer(item);
  });
}

/** Features enabled for a workspace */
export interface AmlUserFeature {
  /** Specifies the feature ID */
  id?: string;
  /** Specifies the feature name */
  displayName?: string;
  /** Describes the feature for user experience */
  description?: string;
}

export function amlUserFeatureDeserializer(item: any): AmlUserFeature {
  return {
    id: item["id"],
    displayName: item["displayName"],
    description: item["description"],
  };
}

/** A list of private link resources */
export interface _PrivateLinkResourceListResult {
  /** A list of private link resources */
  value?: PrivateLinkResource[];
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends Resource {
  identity?: ManagedServiceIdentity;
  /** Same as workspace location. */
  location?: string;
  /** Optional. This field is required to be implemented by the RP because AML is supporting more than one tier */
  sku?: Sku;
  tags?: Record<string, string>;
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
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

/** Managed Network Provisioning options for managed network of a machine learning workspace. */
export interface ManagedNetworkProvisionOptions {
  includeSpark?: boolean;
}

export function managedNetworkProvisionOptionsSerializer(
  item: ManagedNetworkProvisionOptions,
): any {
  return { includeSpark: item["includeSpark"] };
}

/** BlobReferenceSASRequest for getBlobReferenceSAS API */
export interface GetBlobReferenceSASRequestDto {
  /** Id of the asset to be accessed */
  assetId?: string;
  /** Blob uri of the asset to be accessed */
  blobUri?: string;
}

export function getBlobReferenceSASRequestDtoSerializer(item: GetBlobReferenceSASRequestDto): any {
  return { assetId: item["assetId"], blobUri: item["blobUri"] };
}

/** BlobReferenceSASResponse for getBlobReferenceSAS API */
export interface GetBlobReferenceSASResponseDto {
  /** Blob reference for consumption details */
  blobReferenceForConsumption?: GetBlobReferenceForConsumptionDto;
}

export function getBlobReferenceSASResponseDtoDeserializer(
  item: any,
): GetBlobReferenceSASResponseDto {
  return {
    blobReferenceForConsumption: !item["blobReferenceForConsumption"]
      ? item["blobReferenceForConsumption"]
      : getBlobReferenceForConsumptionDtoDeserializer(item["blobReferenceForConsumption"]),
  };
}

/** model interface GetBlobReferenceForConsumptionDto */
export interface GetBlobReferenceForConsumptionDto {
  /** Blob uri, example: https://blob.windows.core.net/Container/Path */
  blobUri?: string;
  /** Credential info to access storage account */
  credential?: DataReferenceCredentialUnion;
  /** The ARM id of the storage account */
  storageAccountArmId?: string;
}

export function getBlobReferenceForConsumptionDtoDeserializer(
  item: any,
): GetBlobReferenceForConsumptionDto {
  return {
    blobUri: item["blobUri"],
    credential: !item["credential"]
      ? item["credential"]
      : dataReferenceCredentialUnionDeserializer(item["credential"]),
    storageAccountArmId: item["storageAccountArmId"],
  };
}

/** DataReferenceCredential base class */
export interface DataReferenceCredential {
  /** [Required] Credential type used to authentication with storage. */
  /** The discriminator possible values: NoCredentials, DockerCredentials, ManagedIdentity, SAS */
  credentialType: DataReferenceCredentialType;
}

export function dataReferenceCredentialDeserializer(item: any): DataReferenceCredential {
  return {
    credentialType: item["credentialType"],
  };
}

/** Alias for DataReferenceCredentialUnion */
export type DataReferenceCredentialUnion =
  | AnonymousAccessCredential
  | DockerCredential
  | ManagedIdentityCredential
  | SASCredential
  | DataReferenceCredential;

export function dataReferenceCredentialUnionDeserializer(item: any): DataReferenceCredentialUnion {
  switch (item["credentialType"]) {
    case "NoCredentials":
      return anonymousAccessCredentialDeserializer(item as AnonymousAccessCredential);

    case "DockerCredentials":
      return dockerCredentialDeserializer(item as DockerCredential);

    case "ManagedIdentity":
      return managedIdentityCredentialDeserializer(item as ManagedIdentityCredential);

    case "SAS":
      return sasCredentialDeserializer(item as SASCredential);

    default:
      return dataReferenceCredentialDeserializer(item);
  }
}

/** Enum to determine the DataReference credentials type. */
export enum KnownDataReferenceCredentialType {
  /** SAS */
  SAS = "SAS",
  /** DockerCredentials */
  DockerCredentials = "DockerCredentials",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
  /** NoCredentials */
  NoCredentials = "NoCredentials",
}

/**
 * Enum to determine the DataReference credentials type. \
 * {@link KnownDataReferenceCredentialType} can be used interchangeably with DataReferenceCredentialType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SAS** \
 * **DockerCredentials** \
 * **ManagedIdentity** \
 * **NoCredentials**
 */
export type DataReferenceCredentialType = string;

/** Access credential with no credentials */
export interface AnonymousAccessCredential extends DataReferenceCredential {
  /** [Required] Credential type used to authentication with storage. */
  credentialType: "NoCredentials";
}

export function anonymousAccessCredentialDeserializer(item: any): AnonymousAccessCredential {
  return {
    credentialType: item["credentialType"],
  };
}

/** Credential for docker with username and password */
export interface DockerCredential extends DataReferenceCredential {
  /** DockerCredential user password */
  password?: string;
  /** DockerCredential user name */
  userName?: string;
  /** [Required] Credential type used to authentication with storage. */
  credentialType: "DockerCredentials";
}

export function dockerCredentialDeserializer(item: any): DockerCredential {
  return {
    credentialType: item["credentialType"],
    password: item["password"],
    userName: item["userName"],
  };
}

/** Credential for user managed identity */
export interface ManagedIdentityCredential extends DataReferenceCredential {
  /** ManagedIdentityCredential identity type */
  managedIdentityType?: string;
  /** ClientId for the UAMI. For ManagedIdentityType = SystemManaged, this field is null. */
  userManagedIdentityClientId?: string;
  /** PrincipalId for the UAMI. For ManagedIdentityType = SystemManaged, this field is null. */
  userManagedIdentityPrincipalId?: string;
  /** Full arm scope for the Id. For ManagedIdentityType = SystemManaged, this field is null. */
  userManagedIdentityResourceId?: string;
  /** TenantId for the UAMI. For ManagedIdentityType = SystemManaged, this field is null. */
  userManagedIdentityTenantId?: string;
  /** [Required] Credential type used to authentication with storage. */
  credentialType: "ManagedIdentity";
}

export function managedIdentityCredentialDeserializer(item: any): ManagedIdentityCredential {
  return {
    credentialType: item["credentialType"],
    managedIdentityType: item["managedIdentityType"],
    userManagedIdentityClientId: item["userManagedIdentityClientId"],
    userManagedIdentityPrincipalId: item["userManagedIdentityPrincipalId"],
    userManagedIdentityResourceId: item["userManagedIdentityResourceId"],
    userManagedIdentityTenantId: item["userManagedIdentityTenantId"],
  };
}

/** Access with full SAS uri */
export interface SASCredential extends DataReferenceCredential {
  /** Full SAS Uri, including the storage, container/blob path and SAS token */
  sasUri?: string;
  /** [Required] Credential type used to authentication with storage. */
  credentialType: "SAS";
}

export function sasCredentialDeserializer(item: any): SASCredential {
  return {
    credentialType: item["credentialType"],
    sasUri: item["sasUri"],
  };
}

/** Azure Resource Manager resource envelope. */
export interface JobBase extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: JobBasePropertiesUnion;
}

export function jobBaseSerializer(item: JobBase): any {
  return { properties: jobBasePropertiesUnionSerializer(item["properties"]) };
}

export function jobBaseDeserializer(item: any): JobBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: jobBasePropertiesUnionDeserializer(item["properties"]),
  };
}

/** A paginated list of JobBase entities. */
export interface _JobBaseResourceArmPaginatedResult {
  /** The JobBase items on this page */
  value: JobBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobBaseResourceArmPaginatedResultDeserializer(
  item: any,
): _JobBaseResourceArmPaginatedResult {
  return {
    value: jobBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobBaseArraySerializer(result: Array<JobBase>): any[] {
  return result.map((item) => {
    return jobBaseSerializer(item);
  });
}

export function jobBaseArrayDeserializer(result: Array<JobBase>): any[] {
  return result.map((item) => {
    return jobBaseDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface WorkspaceConnectionPropertiesV2BasicResource extends ProxyResource {
  properties: WorkspaceConnectionPropertiesV2Union;
}

export function workspaceConnectionPropertiesV2BasicResourceSerializer(
  item: WorkspaceConnectionPropertiesV2BasicResource,
): any {
  return { properties: workspaceConnectionPropertiesV2UnionSerializer(item["properties"]) };
}

export function workspaceConnectionPropertiesV2BasicResourceDeserializer(
  item: any,
): WorkspaceConnectionPropertiesV2BasicResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: workspaceConnectionPropertiesV2UnionDeserializer(item["properties"]),
  };
}

/** model interface WorkspaceConnectionPropertiesV2 */
export interface WorkspaceConnectionPropertiesV2 {
  /** Authentication type of the connection target */
  /** The discriminator possible values: AAD, AccessKey, AccountKey, ApiKey, CustomKeys, ManagedIdentity, None, OAuth2, PAT, SAS, ServicePrincipal, UsernamePassword */
  authType: ConnectionAuthType;
  /** Category of the connection */
  category?: ConnectionCategory;
  readonly createdByWorkspaceArmId?: string;
  error?: string;
  expiryTime?: Date;
  /** Group based on connection category */
  readonly group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /** Store user metadata for this connection */
  metadata?: Record<string, string>;
  peRequirement?: ManagedPERequirement;
  peStatus?: ManagedPEStatus;
  sharedUserList?: string[];
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export function workspaceConnectionPropertiesV2Serializer(
  item: WorkspaceConnectionPropertiesV2,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

export function workspaceConnectionPropertiesV2Deserializer(
  item: any,
): WorkspaceConnectionPropertiesV2 {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

/** Alias for WorkspaceConnectionPropertiesV2Union */
export type WorkspaceConnectionPropertiesV2Union =
  | AADAuthTypeWorkspaceConnectionProperties
  | AccessKeyAuthTypeWorkspaceConnectionProperties
  | AccountKeyAuthTypeWorkspaceConnectionProperties
  | ApiKeyAuthWorkspaceConnectionProperties
  | CustomKeysWorkspaceConnectionProperties
  | ManagedIdentityAuthTypeWorkspaceConnectionProperties
  | NoneAuthTypeWorkspaceConnectionProperties
  | OAuth2AuthTypeWorkspaceConnectionProperties
  | PATAuthTypeWorkspaceConnectionProperties
  | SASAuthTypeWorkspaceConnectionProperties
  | ServicePrincipalAuthTypeWorkspaceConnectionProperties
  | UsernamePasswordAuthTypeWorkspaceConnectionProperties
  | WorkspaceConnectionPropertiesV2;

export function workspaceConnectionPropertiesV2UnionSerializer(
  item: WorkspaceConnectionPropertiesV2Union,
): any {
  switch (item.authType) {
    case "AAD":
      return aadAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as AADAuthTypeWorkspaceConnectionProperties,
      );

    case "AccessKey":
      return accessKeyAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as AccessKeyAuthTypeWorkspaceConnectionProperties,
      );

    case "AccountKey":
      return accountKeyAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as AccountKeyAuthTypeWorkspaceConnectionProperties,
      );

    case "ApiKey":
      return apiKeyAuthWorkspaceConnectionPropertiesSerializer(
        item as ApiKeyAuthWorkspaceConnectionProperties,
      );

    case "CustomKeys":
      return customKeysWorkspaceConnectionPropertiesSerializer(
        item as CustomKeysWorkspaceConnectionProperties,
      );

    case "ManagedIdentity":
      return managedIdentityAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as ManagedIdentityAuthTypeWorkspaceConnectionProperties,
      );

    case "None":
      return noneAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as NoneAuthTypeWorkspaceConnectionProperties,
      );

    case "OAuth2":
      return oAuth2AuthTypeWorkspaceConnectionPropertiesSerializer(
        item as OAuth2AuthTypeWorkspaceConnectionProperties,
      );

    case "PAT":
      return patAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as PATAuthTypeWorkspaceConnectionProperties,
      );

    case "SAS":
      return sasAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as SASAuthTypeWorkspaceConnectionProperties,
      );

    case "ServicePrincipal":
      return servicePrincipalAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as ServicePrincipalAuthTypeWorkspaceConnectionProperties,
      );

    case "UsernamePassword":
      return usernamePasswordAuthTypeWorkspaceConnectionPropertiesSerializer(
        item as UsernamePasswordAuthTypeWorkspaceConnectionProperties,
      );

    default:
      return workspaceConnectionPropertiesV2Serializer(item);
  }
}

export function workspaceConnectionPropertiesV2UnionDeserializer(
  item: any,
): WorkspaceConnectionPropertiesV2Union {
  switch (item["authType"]) {
    case "AAD":
      return aadAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as AADAuthTypeWorkspaceConnectionProperties,
      );

    case "AccessKey":
      return accessKeyAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as AccessKeyAuthTypeWorkspaceConnectionProperties,
      );

    case "AccountKey":
      return accountKeyAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as AccountKeyAuthTypeWorkspaceConnectionProperties,
      );

    case "ApiKey":
      return apiKeyAuthWorkspaceConnectionPropertiesDeserializer(
        item as ApiKeyAuthWorkspaceConnectionProperties,
      );

    case "CustomKeys":
      return customKeysWorkspaceConnectionPropertiesDeserializer(
        item as CustomKeysWorkspaceConnectionProperties,
      );

    case "ManagedIdentity":
      return managedIdentityAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as ManagedIdentityAuthTypeWorkspaceConnectionProperties,
      );

    case "None":
      return noneAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as NoneAuthTypeWorkspaceConnectionProperties,
      );

    case "OAuth2":
      return oAuth2AuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as OAuth2AuthTypeWorkspaceConnectionProperties,
      );

    case "PAT":
      return patAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as PATAuthTypeWorkspaceConnectionProperties,
      );

    case "SAS":
      return sasAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as SASAuthTypeWorkspaceConnectionProperties,
      );

    case "ServicePrincipal":
      return servicePrincipalAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as ServicePrincipalAuthTypeWorkspaceConnectionProperties,
      );

    case "UsernamePassword":
      return usernamePasswordAuthTypeWorkspaceConnectionPropertiesDeserializer(
        item as UsernamePasswordAuthTypeWorkspaceConnectionProperties,
      );

    default:
      return workspaceConnectionPropertiesV2Deserializer(item);
  }
}

/** Authentication type of the connection target */
export enum KnownConnectionAuthType {
  /** PAT */
  PAT = "PAT",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
  /** UsernamePassword */
  UsernamePassword = "UsernamePassword",
  /** None */
  None = "None",
  /** SAS */
  SAS = "SAS",
  /** AccountKey */
  AccountKey = "AccountKey",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
  /** AccessKey */
  AccessKey = "AccessKey",
  /** ApiKey */
  ApiKey = "ApiKey",
  /** CustomKeys */
  CustomKeys = "CustomKeys",
  /** OAuth2 */
  OAuth2 = "OAuth2",
  /** AAD */
  AAD = "AAD",
  /** DelegatedSAS */
  DelegatedSAS = "DelegatedSAS",
  /** ProjectManagedIdentity */
  ProjectManagedIdentity = "ProjectManagedIdentity",
  /** AccountManagedIdentity */
  AccountManagedIdentity = "AccountManagedIdentity",
  /** UserEntraToken */
  UserEntraToken = "UserEntraToken",
  /** AgentUserImpersonation */
  AgentUserImpersonation = "AgentUserImpersonation",
  /** AgenticIdentityToken */
  AgenticIdentityToken = "AgenticIdentityToken",
  /** AgenticUser */
  AgenticUser = "AgenticUser",
}

/**
 * Authentication type of the connection target \
 * {@link KnownConnectionAuthType} can be used interchangeably with ConnectionAuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAT** \
 * **ManagedIdentity** \
 * **UsernamePassword** \
 * **None** \
 * **SAS** \
 * **AccountKey** \
 * **ServicePrincipal** \
 * **AccessKey** \
 * **ApiKey** \
 * **CustomKeys** \
 * **OAuth2** \
 * **AAD** \
 * **DelegatedSAS** \
 * **ProjectManagedIdentity** \
 * **AccountManagedIdentity** \
 * **UserEntraToken** \
 * **AgentUserImpersonation** \
 * **AgenticIdentityToken** \
 * **AgenticUser**
 */
export type ConnectionAuthType = string;

/** Category of the connection */
export enum KnownConnectionCategory {
  /** PythonFeed */
  PythonFeed = "PythonFeed",
  /** ContainerRegistry */
  ContainerRegistry = "ContainerRegistry",
  /** Git */
  Git = "Git",
  /** S3 */
  S3 = "S3",
  /** Snowflake */
  Snowflake = "Snowflake",
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
  /** AzureSqlDb */
  AzureSqlDb = "AzureSqlDb",
  /** AzureSynapseAnalytics */
  AzureSynapseAnalytics = "AzureSynapseAnalytics",
  /** AzureMySqlDb */
  AzureMySqlDb = "AzureMySqlDb",
  /** AzurePostgresDb */
  AzurePostgresDb = "AzurePostgresDb",
  /** ADLSGen2 */
  AdlsGen2 = "ADLSGen2",
  /** AzureContainerAppEnvironment */
  AzureContainerAppEnvironment = "AzureContainerAppEnvironment",
  /** Redis */
  Redis = "Redis",
  /** ApiKey */
  ApiKey = "ApiKey",
  /** AzureOpenAI */
  AzureOpenAI = "AzureOpenAI",
  /** AIServices */
  AIServices = "AIServices",
  /** CognitiveSearch */
  CognitiveSearch = "CognitiveSearch",
  /** CognitiveService */
  CognitiveService = "CognitiveService",
  /** CustomKeys */
  CustomKeys = "CustomKeys",
  /** AzureBlob */
  AzureBlob = "AzureBlob",
  /** AzureStorageAccount */
  AzureStorageAccount = "AzureStorageAccount",
  /** AzureOneLake */
  AzureOneLake = "AzureOneLake",
  /** CosmosDb */
  CosmosDb = "CosmosDb",
  /** CosmosDbMongoDbApi */
  CosmosDbMongoDbApi = "CosmosDbMongoDbApi",
  /** AzureDataExplorer */
  AzureDataExplorer = "AzureDataExplorer",
  /** AzureMariaDb */
  AzureMariaDb = "AzureMariaDb",
  /** AzureDatabricksDeltaLake */
  AzureDatabricksDeltaLake = "AzureDatabricksDeltaLake",
  /** AzureSqlMi */
  AzureSqlMi = "AzureSqlMi",
  /** AzureTableStorage */
  AzureTableStorage = "AzureTableStorage",
  /** AmazonRdsForOracle */
  AmazonRdsForOracle = "AmazonRdsForOracle",
  /** AmazonRdsForSqlServer */
  AmazonRdsForSqlServer = "AmazonRdsForSqlServer",
  /** AmazonRedshift */
  AmazonRedshift = "AmazonRedshift",
  /** Db2 */
  Db2 = "Db2",
  /** Drill */
  Drill = "Drill",
  /** GoogleBigQuery */
  GoogleBigQuery = "GoogleBigQuery",
  /** Greenplum */
  Greenplum = "Greenplum",
  /** Hbase */
  Hbase = "Hbase",
  /** Hive */
  Hive = "Hive",
  /** Impala */
  Impala = "Impala",
  /** Informix */
  Informix = "Informix",
  /** MariaDb */
  MariaDb = "MariaDb",
  /** MicrosoftAccess */
  MicrosoftAccess = "MicrosoftAccess",
  /** MySql */
  MySql = "MySql",
  /** Netezza */
  Netezza = "Netezza",
  /** Oracle */
  Oracle = "Oracle",
  /** Phoenix */
  Phoenix = "Phoenix",
  /** PostgreSql */
  PostgreSql = "PostgreSql",
  /** Presto */
  Presto = "Presto",
  /** SapOpenHub */
  SapOpenHub = "SapOpenHub",
  /** SapBw */
  SapBw = "SapBw",
  /** SapHana */
  SapHana = "SapHana",
  /** SapTable */
  SapTable = "SapTable",
  /** Spark */
  Spark = "Spark",
  /** SqlServer */
  SqlServer = "SqlServer",
  /** Sybase */
  Sybase = "Sybase",
  /** Teradata */
  Teradata = "Teradata",
  /** Vertica */
  Vertica = "Vertica",
  /** Pinecone */
  Pinecone = "Pinecone",
  /** Databricks */
  Databricks = "Databricks",
  /** Cassandra */
  Cassandra = "Cassandra",
  /** Couchbase */
  Couchbase = "Couchbase",
  /** MongoDbV2 */
  MongoDbV2 = "MongoDbV2",
  /** MongoDbAtlas */
  MongoDbAtlas = "MongoDbAtlas",
  /** AmazonS3Compatible */
  AmazonS3Compatible = "AmazonS3Compatible",
  /** FileServer */
  FileServer = "FileServer",
  /** FtpServer */
  FtpServer = "FtpServer",
  /** GoogleCloudStorage */
  GoogleCloudStorage = "GoogleCloudStorage",
  /** Hdfs */
  Hdfs = "Hdfs",
  /** OracleCloudStorage */
  OracleCloudStorage = "OracleCloudStorage",
  /** Sftp */
  Sftp = "Sftp",
  /** GenericHttp */
  GenericHttp = "GenericHttp",
  /** ODataRest */
  ODataRest = "ODataRest",
  /** Odbc */
  Odbc = "Odbc",
  /** GenericRest */
  GenericRest = "GenericRest",
  /** RemoteTool */
  RemoteTool = "RemoteTool",
  /** AmazonMws */
  AmazonMws = "AmazonMws",
  /** Concur */
  Concur = "Concur",
  /** Dynamics */
  Dynamics = "Dynamics",
  /** DynamicsAx */
  DynamicsAx = "DynamicsAx",
  /** DynamicsCrm */
  DynamicsCrm = "DynamicsCrm",
  /** GoogleAdWords */
  GoogleAdWords = "GoogleAdWords",
  /** Hubspot */
  Hubspot = "Hubspot",
  /** Jira */
  Jira = "Jira",
  /** Magento */
  Magento = "Magento",
  /** Marketo */
  Marketo = "Marketo",
  /** Office365 */
  Office365 = "Office365",
  /** Eloqua */
  Eloqua = "Eloqua",
  /** Responsys */
  Responsys = "Responsys",
  /** OracleServiceCloud */
  OracleServiceCloud = "OracleServiceCloud",
  /** PayPal */
  PayPal = "PayPal",
  /** QuickBooks */
  QuickBooks = "QuickBooks",
  /** Salesforce */
  Salesforce = "Salesforce",
  /** SalesforceServiceCloud */
  SalesforceServiceCloud = "SalesforceServiceCloud",
  /** SalesforceMarketingCloud */
  SalesforceMarketingCloud = "SalesforceMarketingCloud",
  /** SapCloudForCustomer */
  SapCloudForCustomer = "SapCloudForCustomer",
  /** SapEcc */
  SapEcc = "SapEcc",
  /** ServiceNow */
  ServiceNow = "ServiceNow",
  /** SharePointOnlineList */
  SharePointOnlineList = "SharePointOnlineList",
  /** Shopify */
  Shopify = "Shopify",
  /** Square */
  Square = "Square",
  /** WebTable */
  WebTable = "WebTable",
  /** Xero */
  Xero = "Xero",
  /** Zoho */
  Zoho = "Zoho",
  /** GenericContainerRegistry */
  GenericContainerRegistry = "GenericContainerRegistry",
  /** Elasticsearch */
  Elasticsearch = "Elasticsearch",
  /** AppInsights */
  AppInsights = "AppInsights",
  /** AppConfig */
  AppConfig = "AppConfig",
  /** OpenAI */
  OpenAI = "OpenAI",
  /** Serp */
  Serp = "Serp",
  /** BingLLMSearch */
  BingLLMSearch = "BingLLMSearch",
  /** Serverless */
  Serverless = "Serverless",
  /** ManagedOnlineEndpoint */
  ManagedOnlineEndpoint = "ManagedOnlineEndpoint",
  /** ApiManagement */
  ApiManagement = "ApiManagement",
  /** ModelGateway */
  ModelGateway = "ModelGateway",
  /** GroundingWithBingSearch */
  GroundingWithBingSearch = "GroundingWithBingSearch",
  /** GroundingWithCustomSearch */
  GroundingWithCustomSearch = "GroundingWithCustomSearch",
  /** Sharepoint */
  Sharepoint = "Sharepoint",
  /** MicrosoftFabric */
  MicrosoftFabric = "MicrosoftFabric",
  /** PowerPlatformEnvironment */
  PowerPlatformEnvironment = "PowerPlatformEnvironment",
  /** RemoteA2A */
  RemoteA2A = "RemoteA2A",
}

/**
 * Category of the connection \
 * {@link KnownConnectionCategory} can be used interchangeably with ConnectionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PythonFeed** \
 * **ContainerRegistry** \
 * **Git** \
 * **S3** \
 * **Snowflake** \
 * **AzureKeyVault** \
 * **AzureSqlDb** \
 * **AzureSynapseAnalytics** \
 * **AzureMySqlDb** \
 * **AzurePostgresDb** \
 * **ADLSGen2** \
 * **AzureContainerAppEnvironment** \
 * **Redis** \
 * **ApiKey** \
 * **AzureOpenAI** \
 * **AIServices** \
 * **CognitiveSearch** \
 * **CognitiveService** \
 * **CustomKeys** \
 * **AzureBlob** \
 * **AzureStorageAccount** \
 * **AzureOneLake** \
 * **CosmosDb** \
 * **CosmosDbMongoDbApi** \
 * **AzureDataExplorer** \
 * **AzureMariaDb** \
 * **AzureDatabricksDeltaLake** \
 * **AzureSqlMi** \
 * **AzureTableStorage** \
 * **AmazonRdsForOracle** \
 * **AmazonRdsForSqlServer** \
 * **AmazonRedshift** \
 * **Db2** \
 * **Drill** \
 * **GoogleBigQuery** \
 * **Greenplum** \
 * **Hbase** \
 * **Hive** \
 * **Impala** \
 * **Informix** \
 * **MariaDb** \
 * **MicrosoftAccess** \
 * **MySql** \
 * **Netezza** \
 * **Oracle** \
 * **Phoenix** \
 * **PostgreSql** \
 * **Presto** \
 * **SapOpenHub** \
 * **SapBw** \
 * **SapHana** \
 * **SapTable** \
 * **Spark** \
 * **SqlServer** \
 * **Sybase** \
 * **Teradata** \
 * **Vertica** \
 * **Pinecone** \
 * **Databricks** \
 * **Cassandra** \
 * **Couchbase** \
 * **MongoDbV2** \
 * **MongoDbAtlas** \
 * **AmazonS3Compatible** \
 * **FileServer** \
 * **FtpServer** \
 * **GoogleCloudStorage** \
 * **Hdfs** \
 * **OracleCloudStorage** \
 * **Sftp** \
 * **GenericHttp** \
 * **ODataRest** \
 * **Odbc** \
 * **GenericRest** \
 * **RemoteTool** \
 * **AmazonMws** \
 * **Concur** \
 * **Dynamics** \
 * **DynamicsAx** \
 * **DynamicsCrm** \
 * **GoogleAdWords** \
 * **Hubspot** \
 * **Jira** \
 * **Magento** \
 * **Marketo** \
 * **Office365** \
 * **Eloqua** \
 * **Responsys** \
 * **OracleServiceCloud** \
 * **PayPal** \
 * **QuickBooks** \
 * **Salesforce** \
 * **SalesforceServiceCloud** \
 * **SalesforceMarketingCloud** \
 * **SapCloudForCustomer** \
 * **SapEcc** \
 * **ServiceNow** \
 * **SharePointOnlineList** \
 * **Shopify** \
 * **Square** \
 * **WebTable** \
 * **Xero** \
 * **Zoho** \
 * **GenericContainerRegistry** \
 * **Elasticsearch** \
 * **AppInsights** \
 * **AppConfig** \
 * **OpenAI** \
 * **Serp** \
 * **BingLLMSearch** \
 * **Serverless** \
 * **ManagedOnlineEndpoint** \
 * **ApiManagement** \
 * **ModelGateway** \
 * **GroundingWithBingSearch** \
 * **GroundingWithCustomSearch** \
 * **Sharepoint** \
 * **MicrosoftFabric** \
 * **PowerPlatformEnvironment** \
 * **RemoteA2A**
 */
export type ConnectionCategory = string;

/** Group based on connection category */
export enum KnownConnectionGroup {
  /** Azure */
  Azure = "Azure",
  /** AzureAI */
  AzureAI = "AzureAI",
  /** Database */
  Database = "Database",
  /** NoSQL */
  NoSQL = "NoSQL",
  /** File */
  File = "File",
  /** GenericProtocol */
  GenericProtocol = "GenericProtocol",
  /** ServicesAndApps */
  ServicesAndApps = "ServicesAndApps",
}

/**
 * Group based on connection category \
 * {@link KnownConnectionGroup} can be used interchangeably with ConnectionGroup,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure** \
 * **AzureAI** \
 * **Database** \
 * **NoSQL** \
 * **File** \
 * **GenericProtocol** \
 * **ServicesAndApps**
 */
export type ConnectionGroup = string;

/** Known values of {@link ManagedPERequirement} that the service accepts. */
export enum KnownManagedPERequirement {
  /** Required */
  Required = "Required",
  /** NotRequired */
  NotRequired = "NotRequired",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/** Type of ManagedPERequirement */
export type ManagedPERequirement = string;

/** Known values of {@link ManagedPEStatus} that the service accepts. */
export enum KnownManagedPEStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/** Type of ManagedPEStatus */
export type ManagedPEStatus = string;

/** This connection type covers the AAD auth for any applicable Azure service */
export interface AADAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  /** Authentication type of the connection target */
  authType: "AAD";
}

export function aadAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: AADAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

export function aadAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): AADAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

/** model interface AccessKeyAuthTypeWorkspaceConnectionProperties */
export interface AccessKeyAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionAccessKey;
  /** Authentication type of the connection target */
  authType: "AccessKey";
}

export function accessKeyAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: AccessKeyAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionAccessKeySerializer(item["credentials"]),
  };
}

export function accessKeyAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): AccessKeyAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionAccessKeyDeserializer(item["credentials"]),
  };
}

/** model interface WorkspaceConnectionAccessKey */
export interface WorkspaceConnectionAccessKey {
  accessKeyId?: string;
  secretAccessKey?: string;
}

export function workspaceConnectionAccessKeySerializer(item: WorkspaceConnectionAccessKey): any {
  return { accessKeyId: item["accessKeyId"], secretAccessKey: item["secretAccessKey"] };
}

export function workspaceConnectionAccessKeyDeserializer(item: any): WorkspaceConnectionAccessKey {
  return {
    accessKeyId: item["accessKeyId"],
    secretAccessKey: item["secretAccessKey"],
  };
}

/** This connection type covers the account key connection for Azure storage */
export interface AccountKeyAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  /** Account key object for workspace connection credential. */
  credentials?: WorkspaceConnectionAccountKey;
  /** Authentication type of the connection target */
  authType: "AccountKey";
}

export function accountKeyAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: AccountKeyAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionAccountKeySerializer(item["credentials"]),
  };
}

export function accountKeyAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): AccountKeyAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionAccountKeyDeserializer(item["credentials"]),
  };
}

/** Account key object for workspace connection credential. */
export interface WorkspaceConnectionAccountKey {
  key?: string;
}

export function workspaceConnectionAccountKeySerializer(item: WorkspaceConnectionAccountKey): any {
  return { key: item["key"] };
}

export function workspaceConnectionAccountKeyDeserializer(
  item: any,
): WorkspaceConnectionAccountKey {
  return {
    key: item["key"],
  };
}

/**
 * This connection type covers the generic ApiKey auth connection categories, for examples:
 * AzureOpenAI:
 * Category:= AzureOpenAI
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {ApiKey} as Microsoft.MachineLearning.AccountRP.Contracts.WorkspaceConnection.ApiKey
 * Target:= {ApiBase}
 *
 * CognitiveService:
 * Category:= CognitiveService
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {SubscriptionKey} as Microsoft.MachineLearning.AccountRP.Contracts.WorkspaceConnection.ApiKey
 * Target:= ServiceRegion={serviceRegion}
 *
 * CognitiveSearch:
 * Category:= CognitiveSearch
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {Key} as Microsoft.MachineLearning.AccountRP.Contracts.WorkspaceConnection.ApiKey
 * Target:= {Endpoint}
 *
 * Use Metadata property bag for ApiType, ApiVersion, Kind and other metadata fields
 */
export interface ApiKeyAuthWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionApiKey;
  /** Authentication type of the connection target */
  authType: "ApiKey";
}

export function apiKeyAuthWorkspaceConnectionPropertiesSerializer(
  item: ApiKeyAuthWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionApiKeySerializer(item["credentials"]),
  };
}

export function apiKeyAuthWorkspaceConnectionPropertiesDeserializer(
  item: any,
): ApiKeyAuthWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionApiKeyDeserializer(item["credentials"]),
  };
}

/** Api key object for workspace connection credential. */
export interface WorkspaceConnectionApiKey {
  key?: string;
}

export function workspaceConnectionApiKeySerializer(item: WorkspaceConnectionApiKey): any {
  return { key: item["key"] };
}

export function workspaceConnectionApiKeyDeserializer(item: any): WorkspaceConnectionApiKey {
  return {
    key: item["key"],
  };
}

/**
 * Category:= CustomKeys
 * AuthType:= CustomKeys (as type discriminator)
 * Credentials:= {CustomKeys} as Microsoft.MachineLearning.AccountRP.Contracts.WorkspaceConnection.CustomKeys
 * Target:= {any value}
 * Use Metadata property bag for ApiVersion and other metadata fields
 */
export interface CustomKeysWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  /** Custom Keys credential object */
  credentials?: CustomKeys;
  /** Authentication type of the connection target */
  authType: "CustomKeys";
}

export function customKeysWorkspaceConnectionPropertiesSerializer(
  item: CustomKeysWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : customKeysSerializer(item["credentials"]),
  };
}

export function customKeysWorkspaceConnectionPropertiesDeserializer(
  item: any,
): CustomKeysWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : customKeysDeserializer(item["credentials"]),
  };
}

/** Custom Keys credential object */
export interface CustomKeys {
  keys?: Record<string, string>;
}

export function customKeysSerializer(item: CustomKeys): any {
  return { keys: item["keys"] };
}

export function customKeysDeserializer(item: any): CustomKeys {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : Object.fromEntries(Object.entries(item["keys"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** model interface ManagedIdentityAuthTypeWorkspaceConnectionProperties */
export interface ManagedIdentityAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionManagedIdentity;
  /** Authentication type of the connection target */
  authType: "ManagedIdentity";
}

export function managedIdentityAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: ManagedIdentityAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionManagedIdentitySerializer(item["credentials"]),
  };
}

export function managedIdentityAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): ManagedIdentityAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionManagedIdentityDeserializer(item["credentials"]),
  };
}

/** model interface WorkspaceConnectionManagedIdentity */
export interface WorkspaceConnectionManagedIdentity {
  clientId?: string;
  resourceId?: string;
}

export function workspaceConnectionManagedIdentitySerializer(
  item: WorkspaceConnectionManagedIdentity,
): any {
  return { clientId: item["clientId"], resourceId: item["resourceId"] };
}

export function workspaceConnectionManagedIdentityDeserializer(
  item: any,
): WorkspaceConnectionManagedIdentity {
  return {
    clientId: item["clientId"],
    resourceId: item["resourceId"],
  };
}

/** model interface NoneAuthTypeWorkspaceConnectionProperties */
export interface NoneAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  /** Authentication type of the connection target */
  authType: "None";
}

export function noneAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: NoneAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

export function noneAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): NoneAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

/** model interface OAuth2AuthTypeWorkspaceConnectionProperties */
export interface OAuth2AuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionOAuth2;
  /** Authentication type of the connection target */
  authType: "OAuth2";
}

export function oAuth2AuthTypeWorkspaceConnectionPropertiesSerializer(
  item: OAuth2AuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionOAuth2Serializer(item["credentials"]),
  };
}

export function oAuth2AuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): OAuth2AuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionOAuth2Deserializer(item["credentials"]),
  };
}

/**
 * ClientId and ClientSecret are required. Other properties are optional
 * depending on each OAuth2 provider's implementation.
 */
export interface WorkspaceConnectionOAuth2 {
  /** Required by Concur connection category */
  authUrl?: string;
  /** Client id in the format of UUID */
  clientId?: string;
  clientSecret?: string;
  /** Required by GoogleAdWords connection category */
  developerToken?: string;
  password?: string;
  /**
   * Required by GoogleBigQuery, GoogleAdWords, Hubspot, QuickBooks, Square, Xero, Zoho
   * where user needs to get RefreshToken offline
   */
  refreshToken?: string;
  /** Required by QuickBooks and Xero connection categories */
  tenantId?: string;
  /**
   * Concur, ServiceNow auth server AccessToken grant type is 'Password'
   * which requires UsernamePassword
   */
  username?: string;
}

export function workspaceConnectionOAuth2Serializer(item: WorkspaceConnectionOAuth2): any {
  return {
    authUrl: item["authUrl"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    developerToken: item["developerToken"],
    password: item["password"],
    refreshToken: item["refreshToken"],
    tenantId: item["tenantId"],
    username: item["username"],
  };
}

export function workspaceConnectionOAuth2Deserializer(item: any): WorkspaceConnectionOAuth2 {
  return {
    authUrl: item["authUrl"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    developerToken: item["developerToken"],
    password: item["password"],
    refreshToken: item["refreshToken"],
    tenantId: item["tenantId"],
    username: item["username"],
  };
}

/** model interface PATAuthTypeWorkspaceConnectionProperties */
export interface PATAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionPersonalAccessToken;
  /** Authentication type of the connection target */
  authType: "PAT";
}

export function patAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: PATAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionPersonalAccessTokenSerializer(item["credentials"]),
  };
}

export function patAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): PATAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionPersonalAccessTokenDeserializer(item["credentials"]),
  };
}

/** model interface WorkspaceConnectionPersonalAccessToken */
export interface WorkspaceConnectionPersonalAccessToken {
  pat?: string;
}

export function workspaceConnectionPersonalAccessTokenSerializer(
  item: WorkspaceConnectionPersonalAccessToken,
): any {
  return { pat: item["pat"] };
}

export function workspaceConnectionPersonalAccessTokenDeserializer(
  item: any,
): WorkspaceConnectionPersonalAccessToken {
  return {
    pat: item["pat"],
  };
}

/** model interface SASAuthTypeWorkspaceConnectionProperties */
export interface SASAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionSharedAccessSignature;
  /** Authentication type of the connection target */
  authType: "SAS";
}

export function sasAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: SASAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionSharedAccessSignatureSerializer(item["credentials"]),
  };
}

export function sasAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): SASAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionSharedAccessSignatureDeserializer(item["credentials"]),
  };
}

/** model interface WorkspaceConnectionSharedAccessSignature */
export interface WorkspaceConnectionSharedAccessSignature {
  sas?: string;
}

export function workspaceConnectionSharedAccessSignatureSerializer(
  item: WorkspaceConnectionSharedAccessSignature,
): any {
  return { sas: item["sas"] };
}

export function workspaceConnectionSharedAccessSignatureDeserializer(
  item: any,
): WorkspaceConnectionSharedAccessSignature {
  return {
    sas: item["sas"],
  };
}

/** model interface ServicePrincipalAuthTypeWorkspaceConnectionProperties */
export interface ServicePrincipalAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionServicePrincipal;
  /** Authentication type of the connection target */
  authType: "ServicePrincipal";
}

export function servicePrincipalAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: ServicePrincipalAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionServicePrincipalSerializer(item["credentials"]),
  };
}

export function servicePrincipalAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): ServicePrincipalAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionServicePrincipalDeserializer(item["credentials"]),
  };
}

/** model interface WorkspaceConnectionServicePrincipal */
export interface WorkspaceConnectionServicePrincipal {
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
}

export function workspaceConnectionServicePrincipalSerializer(
  item: WorkspaceConnectionServicePrincipal,
): any {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    tenantId: item["tenantId"],
  };
}

export function workspaceConnectionServicePrincipalDeserializer(
  item: any,
): WorkspaceConnectionServicePrincipal {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    tenantId: item["tenantId"],
  };
}

/** model interface UsernamePasswordAuthTypeWorkspaceConnectionProperties */
export interface UsernamePasswordAuthTypeWorkspaceConnectionProperties extends WorkspaceConnectionPropertiesV2 {
  credentials?: WorkspaceConnectionUsernamePassword;
  /** Authentication type of the connection target */
  authType: "UsernamePassword";
}

export function usernamePasswordAuthTypeWorkspaceConnectionPropertiesSerializer(
  item: UsernamePasswordAuthTypeWorkspaceConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionUsernamePasswordSerializer(item["credentials"]),
  };
}

export function usernamePasswordAuthTypeWorkspaceConnectionPropertiesDeserializer(
  item: any,
): UsernamePasswordAuthTypeWorkspaceConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : workspaceConnectionUsernamePasswordDeserializer(item["credentials"]),
  };
}

/** model interface WorkspaceConnectionUsernamePassword */
export interface WorkspaceConnectionUsernamePassword {
  password?: string;
  /** Optional, required by connections like SalesForce for extra security in addition to UsernamePassword */
  securityToken?: string;
  username?: string;
}

export function workspaceConnectionUsernamePasswordSerializer(
  item: WorkspaceConnectionUsernamePassword,
): any {
  return {
    password: item["password"],
    securityToken: item["securityToken"],
    username: item["username"],
  };
}

export function workspaceConnectionUsernamePasswordDeserializer(
  item: any,
): WorkspaceConnectionUsernamePassword {
  return {
    password: item["password"],
    securityToken: item["securityToken"],
    username: item["username"],
  };
}

/** The properties that the machine learning workspace connection will be updated with. */
export interface WorkspaceConnectionUpdateParameter {
  /** The properties that the machine learning workspace connection will be updated with. */
  properties?: WorkspaceConnectionPropertiesV2Union;
}

export function workspaceConnectionUpdateParameterSerializer(
  item: WorkspaceConnectionUpdateParameter,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workspaceConnectionPropertiesV2UnionSerializer(item["properties"]),
  };
}

/** Paged collection of WorkspaceConnectionPropertiesV2BasicResource items */
export interface _WorkspaceConnectionPropertiesV2BasicResourceArmPaginatedResult {
  /** The WorkspaceConnectionPropertiesV2BasicResource items on this page */
  value: WorkspaceConnectionPropertiesV2BasicResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceConnectionPropertiesV2BasicResourceArmPaginatedResultDeserializer(
  item: any,
): _WorkspaceConnectionPropertiesV2BasicResourceArmPaginatedResult {
  return {
    value: workspaceConnectionPropertiesV2BasicResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceConnectionPropertiesV2BasicResourceArraySerializer(
  result: Array<WorkspaceConnectionPropertiesV2BasicResource>,
): any[] {
  return result.map((item) => {
    return workspaceConnectionPropertiesV2BasicResourceSerializer(item);
  });
}

export function workspaceConnectionPropertiesV2BasicResourceArrayDeserializer(
  result: Array<WorkspaceConnectionPropertiesV2BasicResource>,
): any[] {
  return result.map((item) => {
    return workspaceConnectionPropertiesV2BasicResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface OutboundRuleBasicResource extends ProxyResource {
  /** Outbound Rule for the managed network of a machine learning workspace. */
  properties: OutboundRuleUnion;
}

export function outboundRuleBasicResourceSerializer(item: OutboundRuleBasicResource): any {
  return { properties: outboundRuleUnionSerializer(item["properties"]) };
}

export function outboundRuleBasicResourceDeserializer(item: any): OutboundRuleBasicResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: outboundRuleUnionDeserializer(item["properties"]),
  };
}

/** Paged collection of OutboundRuleBasicResource items */
export interface _OutboundRuleListResult {
  /** The OutboundRuleBasicResource items on this page */
  value: OutboundRuleBasicResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundRuleListResultDeserializer(item: any): _OutboundRuleListResult {
  return {
    value: outboundRuleBasicResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundRuleBasicResourceArraySerializer(
  result: Array<OutboundRuleBasicResource>,
): any[] {
  return result.map((item) => {
    return outboundRuleBasicResourceSerializer(item);
  });
}

export function outboundRuleBasicResourceArrayDeserializer(
  result: Array<OutboundRuleBasicResource>,
): any[] {
  return result.map((item) => {
    return outboundRuleBasicResourceDeserializer(item);
  });
}

/** The List Usages operation response. */
export interface _ListUsagesResult {
  /** The Usage items on this page */
  readonly value: Usage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listUsagesResultDeserializer(item: any): _ListUsagesResult {
  return {
    value: usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** Describes AML Resource Usage. */
export interface Usage {
  /** Specifies the resource ID. */
  readonly id?: string;
  /** Region of the AML workspace in the id. */
  readonly amlWorkspaceLocation?: string;
  /** Specifies the resource type. */
  readonly type?: string;
  /** An enum describing the unit of usage measurement. */
  readonly unit?: UsageUnit;
  /** The current usage of the resource. */
  readonly currentValue?: number;
  /** The maximum permitted usage of the resource. */
  readonly limit?: number;
  /** The name of the type of usage. */
  readonly name?: UsageName;
}

export function usageDeserializer(item: any): Usage {
  return {
    id: item["id"],
    amlWorkspaceLocation: item["amlWorkspaceLocation"],
    type: item["type"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : usageNameDeserializer(item["name"]),
  };
}

/** An enum describing the unit of usage measurement. */
export enum KnownUsageUnit {
  /** Count */
  Count = "Count",
}

/**
 * An enum describing the unit of usage measurement. \
 * {@link KnownUsageUnit} can be used interchangeably with UsageUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**
 */
export type UsageUnit = string;

/** The Usage Names. */
export interface UsageName {
  /** The name of the resource. */
  readonly value?: string;
  /** The localized name of the resource. */
  readonly localizedValue?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The List Virtual Machine size operation response. */
export interface VirtualMachineSizeListResult {
  /** The list of virtual machine sizes supported by AmlCompute. */
  value?: VirtualMachineSize[];
}

export function virtualMachineSizeListResultDeserializer(item: any): VirtualMachineSizeListResult {
  return {
    value: !item["value"] ? item["value"] : virtualMachineSizeArrayDeserializer(item["value"]),
  };
}

export function virtualMachineSizeArrayDeserializer(result: Array<VirtualMachineSize>): any[] {
  return result.map((item) => {
    return virtualMachineSizeDeserializer(item);
  });
}

/** Describes the properties of a VM size. */
export interface VirtualMachineSize {
  /** The name of the virtual machine size. */
  readonly name?: string;
  /** The family name of the virtual machine size. */
  readonly family?: string;
  /** The number of vCPUs supported by the virtual machine size. */
  readonly vCPUs?: number;
  /** The number of gPUs supported by the virtual machine size. */
  readonly gpus?: number;
  /** The OS VHD disk size, in MB, allowed by the virtual machine size. */
  readonly osVhdSizeMB?: number;
  /** The resource volume size, in MB, allowed by the virtual machine size. */
  readonly maxResourceVolumeMB?: number;
  /** The amount of memory, in GB, supported by the virtual machine size. */
  readonly memoryGB?: number;
  /** Specifies if the virtual machine size supports low priority VMs. */
  readonly lowPriorityCapable?: boolean;
  /** Specifies if the virtual machine size supports premium IO. */
  readonly premiumIO?: boolean;
  /** The estimated price information for using a VM. */
  estimatedVMPrices?: EstimatedVMPrices;
  /** Specifies the compute types supported by the virtual machine size. */
  supportedComputeTypes?: string[];
}

export function virtualMachineSizeDeserializer(item: any): VirtualMachineSize {
  return {
    name: item["name"],
    family: item["family"],
    vCPUs: item["vCPUs"],
    gpus: item["gpus"],
    osVhdSizeMB: item["osVhdSizeMB"],
    maxResourceVolumeMB: item["maxResourceVolumeMB"],
    memoryGB: item["memoryGB"],
    lowPriorityCapable: item["lowPriorityCapable"],
    premiumIO: item["premiumIO"],
    estimatedVMPrices: !item["estimatedVMPrices"]
      ? item["estimatedVMPrices"]
      : estimatedVMPricesDeserializer(item["estimatedVMPrices"]),
    supportedComputeTypes: !item["supportedComputeTypes"]
      ? item["supportedComputeTypes"]
      : item["supportedComputeTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The estimated price info for using a VM. */
export interface EstimatedVMPrices {
  /** Three lettered code specifying the currency of the VM price. Example: USD */
  billingCurrency: BillingCurrency;
  /** The unit of time measurement for the specified VM price. Example: OneHour */
  unitOfMeasure: UnitOfMeasure;
  /** The list of estimated prices for using a VM of a particular OS type, tier, etc. */
  values: EstimatedVMPrice[];
}

export function estimatedVMPricesDeserializer(item: any): EstimatedVMPrices {
  return {
    billingCurrency: item["billingCurrency"],
    unitOfMeasure: item["unitOfMeasure"],
    values: estimatedVMPriceArrayDeserializer(item["values"]),
  };
}

/** Three lettered code specifying the currency of the VM price. Example: USD */
export enum KnownBillingCurrency {
  /** USD */
  USD = "USD",
}

/**
 * Three lettered code specifying the currency of the VM price. Example: USD \
 * {@link KnownBillingCurrency} can be used interchangeably with BillingCurrency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **USD**
 */
export type BillingCurrency = string;

/** The unit of time measurement for the specified VM price. Example: OneHour */
export enum KnownUnitOfMeasure {
  /** OneHour */
  OneHour = "OneHour",
}

/**
 * The unit of time measurement for the specified VM price. Example: OneHour \
 * {@link KnownUnitOfMeasure} can be used interchangeably with UnitOfMeasure,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OneHour**
 */
export type UnitOfMeasure = string;

export function estimatedVMPriceArrayDeserializer(result: Array<EstimatedVMPrice>): any[] {
  return result.map((item) => {
    return estimatedVMPriceDeserializer(item);
  });
}

/** The estimated price info for using a VM of a particular OS type, tier, etc. */
export interface EstimatedVMPrice {
  /** The price charged for using the VM. */
  retailPrice: number;
  /** Operating system type used by the VM. */
  osType: VMPriceOSType;
  /** The type of the VM. */
  vmTier: VMTier;
}

export function estimatedVMPriceDeserializer(item: any): EstimatedVMPrice {
  return {
    retailPrice: item["retailPrice"],
    osType: item["osType"],
    vmTier: item["vmTier"],
  };
}

/** Operating system type used by the VM. */
export enum KnownVMPriceOSType {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * Operating system type used by the VM. \
 * {@link KnownVMPriceOSType} can be used interchangeably with VMPriceOSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux** \
 * **Windows**
 */
export type VMPriceOSType = string;

/** The type of the VM. */
export enum KnownVMTier {
  /** Standard */
  Standard = "Standard",
  /** LowPriority */
  LowPriority = "LowPriority",
  /** Spot */
  Spot = "Spot",
}

/**
 * The type of the VM. \
 * {@link KnownVMTier} can be used interchangeably with VMTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **LowPriority** \
 * **Spot**
 */
export type VMTier = string;

/** Quota update parameters. */
export interface QuotaUpdateParameters {
  /** The list for update quota. */
  value?: QuotaBaseProperties[];
  /** Region of workspace quota to be updated. */
  location?: string;
}

export function quotaUpdateParametersSerializer(item: QuotaUpdateParameters): any {
  return {
    value: !item["value"] ? item["value"] : quotaBasePropertiesArraySerializer(item["value"]),
    location: item["location"],
  };
}

export function quotaBasePropertiesArraySerializer(result: Array<QuotaBaseProperties>): any[] {
  return result.map((item) => {
    return quotaBasePropertiesSerializer(item);
  });
}

/** The properties for Quota update or retrieval. */
export interface QuotaBaseProperties {
  /** Specifies the resource ID. */
  id?: string;
  /** Specifies the resource type. */
  type?: string;
  /** The maximum permitted quota of the resource. */
  limit?: number;
  /** An enum describing the unit of quota measurement. */
  unit?: QuotaUnit;
}

export function quotaBasePropertiesSerializer(item: QuotaBaseProperties): any {
  return { id: item["id"], type: item["type"], limit: item["limit"], unit: item["unit"] };
}

/** An enum describing the unit of quota measurement. */
export enum KnownQuotaUnit {
  /** Count */
  Count = "Count",
}

/**
 * An enum describing the unit of quota measurement. \
 * {@link KnownQuotaUnit} can be used interchangeably with QuotaUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**
 */
export type QuotaUnit = string;

/** The result of update workspace quota. */
export interface UpdateWorkspaceQuotasResult {
  /** The list of workspace quota update result. */
  readonly value?: UpdateWorkspaceQuotas[];
  /** The URI to fetch the next page of workspace quota update result. Call ListNext() with this to fetch the next page of Workspace Quota update result. */
  readonly nextLink?: string;
}

export function updateWorkspaceQuotasResultDeserializer(item: any): UpdateWorkspaceQuotasResult {
  return {
    value: !item["value"] ? item["value"] : updateWorkspaceQuotasArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateWorkspaceQuotasArrayDeserializer(
  result: Array<UpdateWorkspaceQuotas>,
): any[] {
  return result.map((item) => {
    return updateWorkspaceQuotasDeserializer(item);
  });
}

/** The properties for update Quota response. */
export interface UpdateWorkspaceQuotas {
  /** Specifies the resource ID. */
  readonly id?: string;
  /** Specifies the resource type. */
  readonly type?: string;
  /** The maximum permitted quota of the resource. */
  limit?: number;
  /** An enum describing the unit of quota measurement. */
  readonly unit?: QuotaUnit;
  /** Status of update workspace quota. */
  readonly status?: Status;
}

export function updateWorkspaceQuotasDeserializer(item: any): UpdateWorkspaceQuotas {
  return {
    id: item["id"],
    type: item["type"],
    limit: item["limit"],
    unit: item["unit"],
    status: item["status"],
  };
}

/** Status of update workspace quota. */
export enum KnownStatus {
  /** Undefined */
  Undefined = "Undefined",
  /** Success */
  Success = "Success",
  /** Failure */
  Failure = "Failure",
  /** InvalidQuotaBelowClusterMinimum */
  InvalidQuotaBelowClusterMinimum = "InvalidQuotaBelowClusterMinimum",
  /** InvalidQuotaExceedsSubscriptionLimit */
  InvalidQuotaExceedsSubscriptionLimit = "InvalidQuotaExceedsSubscriptionLimit",
  /** InvalidVMFamilyName */
  InvalidVMFamilyName = "InvalidVMFamilyName",
  /** OperationNotSupportedForSku */
  OperationNotSupportedForSku = "OperationNotSupportedForSku",
  /** OperationNotEnabledForRegion */
  OperationNotEnabledForRegion = "OperationNotEnabledForRegion",
}

/**
 * Status of update workspace quota. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Undefined** \
 * **Success** \
 * **Failure** \
 * **InvalidQuotaBelowClusterMinimum** \
 * **InvalidQuotaExceedsSubscriptionLimit** \
 * **InvalidVMFamilyName** \
 * **OperationNotSupportedForSku** \
 * **OperationNotEnabledForRegion**
 */
export type Status = string;

/** The List WorkspaceQuotasByVMFamily operation response. */
export interface _ListWorkspaceQuotas {
  /** The ResourceQuota items on this page */
  readonly value: ResourceQuota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listWorkspaceQuotasDeserializer(item: any): _ListWorkspaceQuotas {
  return {
    value: resourceQuotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceQuotaArrayDeserializer(result: Array<ResourceQuota>): any[] {
  return result.map((item) => {
    return resourceQuotaDeserializer(item);
  });
}

/** The quota assigned to a resource. */
export interface ResourceQuota {
  /** Specifies the resource ID. */
  readonly id?: string;
  /** Region of the AML workspace in the id. */
  readonly amlWorkspaceLocation?: string;
  /** Specifies the resource type. */
  readonly type?: string;
  /** Name of the resource. */
  readonly name?: ResourceName;
  /** The maximum permitted quota of the resource. */
  readonly limit?: number;
  /** An enum describing the unit of quota measurement. */
  readonly unit?: QuotaUnit;
}

export function resourceQuotaDeserializer(item: any): ResourceQuota {
  return {
    id: item["id"],
    amlWorkspaceLocation: item["amlWorkspaceLocation"],
    type: item["type"],
    name: !item["name"] ? item["name"] : resourceNameDeserializer(item["name"]),
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** The Resource Name. */
export interface ResourceName {
  /** The name of the resource. */
  readonly value?: string;
  /** The localized name of the resource. */
  readonly localizedValue?: string;
}

export function resourceNameDeserializer(item: any): ResourceName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Known values of {@link ListViewType} that the service accepts. */
export enum KnownListViewType {
  /** ActiveOnly */
  ActiveOnly = "ActiveOnly",
  /** ArchivedOnly */
  ArchivedOnly = "ArchivedOnly",
  /** All */
  All = "All",
}

/** Type of ListViewType */
export type ListViewType = string;

/** Known values of {@link OrderString} that the service accepts. */
export enum KnownOrderString {
  /** CreatedAtDesc */
  CreatedAtDesc = "CreatedAtDesc",
  /** CreatedAtAsc */
  CreatedAtAsc = "CreatedAtAsc",
  /** UpdatedAtDesc */
  UpdatedAtDesc = "UpdatedAtDesc",
  /** UpdatedAtAsc */
  UpdatedAtAsc = "UpdatedAtAsc",
}

/** Type of OrderString */
export type OrderString = string;

/** Known values of {@link ScheduleListViewType} that the service accepts. */
export enum KnownScheduleListViewType {
  /** EnabledOnly */
  EnabledOnly = "EnabledOnly",
  /** DisabledOnly */
  DisabledOnly = "DisabledOnly",
  /** All */
  All = "All",
}

/** Type of ScheduleListViewType */
export type ScheduleListViewType = string;

/** Known values of {@link UnderlyingResourceAction} that the service accepts. */
export enum KnownUnderlyingResourceAction {
  /** Delete */
  Delete = "Delete",
  /** Detach */
  Detach = "Detach",
}

/** Type of UnderlyingResourceAction */
export type UnderlyingResourceAction = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-12-01 API version. */
  V20251201 = "2025-12-01",
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : workspacePrivateEndpointResourceSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : workspacePrivateEndpointResourceDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _sharedPrivateLinkResourcePropertiesSerializer(
  item: SharedPrivateLinkResource,
): any {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    requestMessage: item["requestMessage"],
    status: item["status"],
  };
}

export function _sharedPrivateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    privateLinkResourceId: item["privateLinkResourceId"],
    requestMessage: item["requestMessage"],
    status: item["status"],
  };
}

export function _workspacePropertiesSerializer(item: Workspace): any {
  return {
    allowPublicAccessWhenBehindVnet: item["allowPublicAccessWhenBehindVnet"],
    applicationInsights: item["applicationInsights"],
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : item["associatedWorkspaces"].map((p: any) => {
          return p;
        }),
    containerRegistry: item["containerRegistry"],
    description: item["description"],
    discoveryUrl: item["discoveryUrl"],
    enableDataIsolation: item["enableDataIsolation"],
    enableServiceSideCMKEncryption: item["enableServiceSideCMKEncryption"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertySerializer(item["encryption"]),
    featureStoreSettings: !item["featureStoreSettings"]
      ? item["featureStoreSettings"]
      : featureStoreSettingsSerializer(item["featureStoreSettings"]),
    friendlyName: item["friendlyName"],
    hbiWorkspace: item["hbiWorkspace"],
    hubResourceId: item["hubResourceId"],
    imageBuildCompute: item["imageBuildCompute"],
    keyVault: item["keyVault"],
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsSerializer(item["managedNetwork"]),
    primaryUserAssignedIdentity: item["primaryUserAssignedIdentity"],
    provisionNetworkNow: item["provisionNetworkNow"],
    publicNetworkAccess: item["publicNetworkAccess"],
    serverlessComputeSettings: !item["serverlessComputeSettings"]
      ? item["serverlessComputeSettings"]
      : serverlessComputeSettingsSerializer(item["serverlessComputeSettings"]),
    serviceManagedResourcesSettings: !item["serviceManagedResourcesSettings"]
      ? item["serviceManagedResourcesSettings"]
      : serviceManagedResourcesSettingsSerializer(item["serviceManagedResourcesSettings"]),
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArraySerializer(item["sharedPrivateLinkResources"]),
    storageAccount: item["storageAccount"],
    systemDatastoresAuthMode: item["systemDatastoresAuthMode"],
    v1LegacyMode: item["v1LegacyMode"],
    workspaceHubConfig: !item["workspaceHubConfig"]
      ? item["workspaceHubConfig"]
      : workspaceHubConfigSerializer(item["workspaceHubConfig"]),
  };
}

export function _workspacePropertiesDeserializer(item: any) {
  return {
    allowPublicAccessWhenBehindVnet: item["allowPublicAccessWhenBehindVnet"],
    applicationInsights: item["applicationInsights"],
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : item["associatedWorkspaces"].map((p: any) => {
          return p;
        }),
    containerRegistry: item["containerRegistry"],
    description: item["description"],
    discoveryUrl: item["discoveryUrl"],
    enableDataIsolation: item["enableDataIsolation"],
    enableServiceSideCMKEncryption: item["enableServiceSideCMKEncryption"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertyDeserializer(item["encryption"]),
    featureStoreSettings: !item["featureStoreSettings"]
      ? item["featureStoreSettings"]
      : featureStoreSettingsDeserializer(item["featureStoreSettings"]),
    friendlyName: item["friendlyName"],
    hbiWorkspace: item["hbiWorkspace"],
    hubResourceId: item["hubResourceId"],
    imageBuildCompute: item["imageBuildCompute"],
    keyVault: item["keyVault"],
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsDeserializer(item["managedNetwork"]),
    mlFlowTrackingUri: item["mlFlowTrackingUri"],
    notebookInfo: !item["notebookInfo"]
      ? item["notebookInfo"]
      : notebookResourceInfoDeserializer(item["notebookInfo"]),
    primaryUserAssignedIdentity: item["primaryUserAssignedIdentity"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    privateLinkCount: item["privateLinkCount"],
    provisionNetworkNow: item["provisionNetworkNow"],
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
    serverlessComputeSettings: !item["serverlessComputeSettings"]
      ? item["serverlessComputeSettings"]
      : serverlessComputeSettingsDeserializer(item["serverlessComputeSettings"]),
    serviceManagedResourcesSettings: !item["serviceManagedResourcesSettings"]
      ? item["serviceManagedResourcesSettings"]
      : serviceManagedResourcesSettingsDeserializer(item["serviceManagedResourcesSettings"]),
    serviceProvisionedResourceGroup: item["serviceProvisionedResourceGroup"],
    sharedPrivateLinkResources: !item["sharedPrivateLinkResources"]
      ? item["sharedPrivateLinkResources"]
      : sharedPrivateLinkResourceArrayDeserializer(item["sharedPrivateLinkResources"]),
    storageAccount: item["storageAccount"],
    storageHnsEnabled: item["storageHnsEnabled"],
    systemDatastoresAuthMode: item["systemDatastoresAuthMode"],
    tenantId: item["tenantId"],
    v1LegacyMode: item["v1LegacyMode"],
    workspaceHubConfig: !item["workspaceHubConfig"]
      ? item["workspaceHubConfig"]
      : workspaceHubConfigDeserializer(item["workspaceHubConfig"]),
    workspaceId: item["workspaceId"],
  };
}

export function _workspaceUpdateParametersPropertiesSerializer(
  item: WorkspaceUpdateParameters,
): any {
  return {
    applicationInsights: item["applicationInsights"],
    containerRegistry: item["containerRegistry"],
    description: item["description"],
    enableDataIsolation: item["enableDataIsolation"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionUpdatePropertiesSerializer(item["encryption"]),
    featureStoreSettings: !item["featureStoreSettings"]
      ? item["featureStoreSettings"]
      : featureStoreSettingsSerializer(item["featureStoreSettings"]),
    friendlyName: item["friendlyName"],
    imageBuildCompute: item["imageBuildCompute"],
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsSerializer(item["managedNetwork"]),
    primaryUserAssignedIdentity: item["primaryUserAssignedIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    serverlessComputeSettings: !item["serverlessComputeSettings"]
      ? item["serverlessComputeSettings"]
      : serverlessComputeSettingsSerializer(item["serverlessComputeSettings"]),
    serviceManagedResourcesSettings: !item["serviceManagedResourcesSettings"]
      ? item["serviceManagedResourcesSettings"]
      : serviceManagedResourcesSettingsSerializer(item["serviceManagedResourcesSettings"]),
    systemDatastoresAuthMode: item["systemDatastoresAuthMode"],
    v1LegacyMode: item["v1LegacyMode"],
  };
}

export function _registryPropertiesSerializer(item: Registry): any {
  return {
    discoveryUrl: item["discoveryUrl"],
    intellectualPropertyPublisher: item["intellectualPropertyPublisher"],
    managedResourceGroup: !item["managedResourceGroup"]
      ? item["managedResourceGroup"]
      : armResourceIdSerializer(item["managedResourceGroup"]),
    managedResourceGroupSettings: !item["managedResourceGroupSettings"]
      ? item["managedResourceGroupSettings"]
      : managedResourceGroupSettingsSerializer(item["managedResourceGroupSettings"]),
    mlFlowRegistryUri: item["mlFlowRegistryUri"],
    registryPrivateEndpointConnections: !item["registryPrivateEndpointConnections"]
      ? item["registryPrivateEndpointConnections"]
      : registryPrivateEndpointConnectionArraySerializer(
          item["registryPrivateEndpointConnections"],
        ),
    publicNetworkAccess: item["publicNetworkAccess"],
    regionDetails: !item["regionDetails"]
      ? item["regionDetails"]
      : registryRegionArmDetailsArraySerializer(item["regionDetails"]),
  };
}

export function _registryPropertiesDeserializer(item: any) {
  return {
    discoveryUrl: item["discoveryUrl"],
    intellectualPropertyPublisher: item["intellectualPropertyPublisher"],
    managedResourceGroup: !item["managedResourceGroup"]
      ? item["managedResourceGroup"]
      : armResourceIdDeserializer(item["managedResourceGroup"]),
    managedResourceGroupSettings: !item["managedResourceGroupSettings"]
      ? item["managedResourceGroupSettings"]
      : managedResourceGroupSettingsDeserializer(item["managedResourceGroupSettings"]),
    mlFlowRegistryUri: item["mlFlowRegistryUri"],
    registryPrivateEndpointConnections: !item["registryPrivateEndpointConnections"]
      ? item["registryPrivateEndpointConnections"]
      : registryPrivateEndpointConnectionArrayDeserializer(
          item["registryPrivateEndpointConnections"],
        ),
    publicNetworkAccess: item["publicNetworkAccess"],
    regionDetails: !item["regionDetails"]
      ? item["regionDetails"]
      : registryRegionArmDetailsArrayDeserializer(item["regionDetails"]),
  };
}

export function _clusterUpdateParametersPropertiesSerializer(item: ClusterUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : scaleSettingsInformationSerializer(item["properties"]),
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
