// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

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

/** Represents an image. */
export interface Image extends ProxyResource {
  /** Image properties. */
  properties?: ImageProperties;
}

export function imageDeserializer(item: any): Image {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an image. */
export interface ImageProperties {
  /** The description of the image. */
  readonly description?: string;
  /** The publisher of the image. */
  readonly publisher?: string;
  /** The name of the image offer. */
  readonly offer?: string;
  /** The SKU name for the image. */
  readonly sku?: string;
  /** The recommended machine configuration to use with the image. */
  readonly recommendedMachineConfiguration?: RecommendedMachineConfiguration;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Indicates whether this image has hibernate enabled. Not all images are capable of supporting hibernation. To find out more see https://aka.ms/devbox/hibernate */
  readonly hibernateSupport?: HibernateSupport;
  /** The architecture type of the image. */
  readonly architecture?: ArchitectureType;
}

export function imagePropertiesDeserializer(item: any): ImageProperties {
  return {
    description: item["description"],
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    recommendedMachineConfiguration: !item["recommendedMachineConfiguration"]
      ? item["recommendedMachineConfiguration"]
      : recommendedMachineConfigurationDeserializer(item["recommendedMachineConfiguration"]),
    provisioningState: item["provisioningState"],
    hibernateSupport: item["hibernateSupport"],
    architecture: item["architecture"],
  };
}

/** Properties for a recommended machine configuration. */
export interface RecommendedMachineConfiguration {
  /** Recommended memory range. */
  readonly memory?: ResourceRange;
  /** Recommended vCPU range. */
  readonly vCPUs?: ResourceRange;
}

export function recommendedMachineConfigurationDeserializer(
  item: any,
): RecommendedMachineConfiguration {
  return {
    memory: !item["memory"] ? item["memory"] : resourceRangeDeserializer(item["memory"]),
    vCPUs: !item["vCPUs"] ? item["vCPUs"] : resourceRangeDeserializer(item["vCPUs"]),
  };
}

/** Properties for a range of values. */
export interface ResourceRange {
  /** Minimum value. */
  readonly min?: number;
  /** Maximum value. */
  readonly max?: number;
}

export function resourceRangeDeserializer(item: any): ResourceRange {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** Provisioning state of the resource. */
export enum KnownProvisioningState {
  /** Not specified provisioning state. */
  NotSpecified = "NotSpecified",
  /** Accepted provisioning state. */
  Accepted = "Accepted",
  /** Running provisioning state. */
  Running = "Running",
  /** Creating provisioning state. */
  Creating = "Creating",
  /** Created provisioning state. */
  Created = "Created",
  /** Updating provisioning state. */
  Updating = "Updating",
  /** Updated provisioning state. */
  Updated = "Updated",
  /** Deleting provisioning state. */
  Deleting = "Deleting",
  /** Deleted provisioning state. */
  Deleted = "Deleted",
  /** Succeeded provisioning state. */
  Succeeded = "Succeeded",
  /** Failed provisioning state. */
  Failed = "Failed",
  /** Canceled provisioning state. */
  Canceled = "Canceled",
  /** Moving resources provisioning state. */
  MovingResources = "MovingResources",
  /** Transient failure provisioning state. */
  TransientFailure = "TransientFailure",
  /** Rollout in progress provisioning state. */
  RolloutInProgress = "RolloutInProgress",
  /** Storage provisioning failed provisioning state. */
  StorageProvisioningFailed = "StorageProvisioningFailed",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: Not specified provisioning state. \
 * **Accepted**: Accepted provisioning state. \
 * **Running**: Running provisioning state. \
 * **Creating**: Creating provisioning state. \
 * **Created**: Created provisioning state. \
 * **Updating**: Updating provisioning state. \
 * **Updated**: Updated provisioning state. \
 * **Deleting**: Deleting provisioning state. \
 * **Deleted**: Deleted provisioning state. \
 * **Succeeded**: Succeeded provisioning state. \
 * **Failed**: Failed provisioning state. \
 * **Canceled**: Canceled provisioning state. \
 * **MovingResources**: Moving resources provisioning state. \
 * **TransientFailure**: Transient failure provisioning state. \
 * **RolloutInProgress**: Rollout in progress provisioning state. \
 * **StorageProvisioningFailed**: Storage provisioning failed provisioning state.
 */
export type ProvisioningState = string;

/** Indicates whether hibernate is enabled/disabled. */
export enum KnownHibernateSupport {
  /** Hibernate is disabled. */
  Disabled = "Disabled",
  /** Hibernate is enabled. */
  Enabled = "Enabled",
}

/**
 * Indicates whether hibernate is enabled/disabled. \
 * {@link KnownHibernateSupport} can be used interchangeably with HibernateSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Hibernate is disabled. \
 * **Enabled**: Hibernate is enabled.
 */
export type HibernateSupport = string;

/** Architecture Types. */
export enum KnownArchitectureType {
  /** x64 architecture */
  X64 = "x64",
  /** ARM64 architecture */
  Arm64 = "Arm64",
}

/**
 * Architecture Types. \
 * {@link KnownArchitectureType} can be used interchangeably with ArchitectureType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **x64**: x64 architecture \
 * **Arm64**: ARM64 architecture
 */
export type ArchitectureType = string;

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

/** Paged collection of Image items */
export interface _ImageListResult {
  /** The Image items on this page */
  readonly value: Image[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageListResultDeserializer(item: any): _ImageListResult {
  return {
    value: imageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageArrayDeserializer(result: Array<Image>): any[] {
  return result.map((item) => {
    return imageDeserializer(item);
  });
}

/** Represents a devcenter resource. */
export interface DevCenter extends TrackedResource {
  /** DevCenter properties */
  properties?: DevCenterProperties;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
}

export function devCenterSerializer(item: DevCenter): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : devCenterPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function devCenterDeserializer(item: any): DevCenter {
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
      : devCenterPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the devcenter. */
export interface DevCenterProperties extends DevCenterUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The URI of the Dev Center. */
  readonly devCenterUri?: string;
}

export function devCenterPropertiesSerializer(item: DevCenterProperties): any {
  return {
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    displayName: item["displayName"],
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : devCenterProjectCatalogSettingsSerializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : devCenterNetworkSettingsSerializer(item["networkSettings"]),
    devBoxProvisioningSettings: !item["devBoxProvisioningSettings"]
      ? item["devBoxProvisioningSettings"]
      : devBoxProvisioningSettingsSerializer(item["devBoxProvisioningSettings"]),
  };
}

export function devCenterPropertiesDeserializer(item: any): DevCenterProperties {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    displayName: item["displayName"],
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : devCenterProjectCatalogSettingsDeserializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : devCenterNetworkSettingsDeserializer(item["networkSettings"]),
    devBoxProvisioningSettings: !item["devBoxProvisioningSettings"]
      ? item["devBoxProvisioningSettings"]
      : devBoxProvisioningSettingsDeserializer(item["devBoxProvisioningSettings"]),
    provisioningState: item["provisioningState"],
    devCenterUri: item["devCenterUri"],
  };
}

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
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned, UserAssigned**: System and user assigned managed identity.
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

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Properties of the devcenter. These properties can be updated after the resource has been created. */
export interface DevCenterUpdateProperties {
  /** Encryption settings to be used for server-side encryption for proprietary content (such as catalogs, logs, customizations). */
  encryption?: Encryption;
  /** The display name of the devcenter. */
  displayName?: string;
  /** Dev Center settings to be used when associating a project with a catalog. */
  projectCatalogSettings?: DevCenterProjectCatalogSettings;
  /** Network settings that will be enforced on network resources associated with the Dev Center. */
  networkSettings?: DevCenterNetworkSettings;
  /** Settings to be used in the provisioning of all Dev Boxes that belong to this dev center. */
  devBoxProvisioningSettings?: DevBoxProvisioningSettings;
}

export function devCenterUpdatePropertiesSerializer(item: DevCenterUpdateProperties): any {
  return {
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    displayName: item["displayName"],
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : devCenterProjectCatalogSettingsSerializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : devCenterNetworkSettingsSerializer(item["networkSettings"]),
    devBoxProvisioningSettings: !item["devBoxProvisioningSettings"]
      ? item["devBoxProvisioningSettings"]
      : devBoxProvisioningSettingsSerializer(item["devBoxProvisioningSettings"]),
  };
}

export function devCenterUpdatePropertiesDeserializer(item: any): DevCenterUpdateProperties {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    displayName: item["displayName"],
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : devCenterProjectCatalogSettingsDeserializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : devCenterNetworkSettingsDeserializer(item["networkSettings"]),
    devBoxProvisioningSettings: !item["devBoxProvisioningSettings"]
      ? item["devBoxProvisioningSettings"]
      : devBoxProvisioningSettingsDeserializer(item["devBoxProvisioningSettings"]),
  };
}

/** Encryption properties. */
export interface Encryption {
  /** All Customer-managed key encryption properties for the resource. */
  customerManagedKeyEncryption?: CustomerManagedKeyEncryption;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionSerializer(item["customerManagedKeyEncryption"]),
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionDeserializer(item["customerManagedKeyEncryption"]),
  };
}

/** Customer-managed key encryption properties for the resource. */
export interface CustomerManagedKeyEncryption {
  /** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
  keyEncryptionKeyIdentity?: CustomerManagedKeyEncryptionKeyIdentity;
  /** key encryption key Url, versioned or non-versioned. Ex: https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78 or https://contosovault.vault.azure.net/keys/contosokek. */
  keyEncryptionKeyUrl?: string;
}

export function customerManagedKeyEncryptionSerializer(item: CustomerManagedKeyEncryption): any {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : customerManagedKeyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

export function customerManagedKeyEncryptionDeserializer(item: any): CustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : customerManagedKeyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

/** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
export interface CustomerManagedKeyEncryptionKeyIdentity {
  /** The type of identity to use. Values can be systemAssignedIdentity, userAssignedIdentity, or delegatedResourceIdentity. */
  identityType?: IdentityType;
  /** User assigned identity to use for accessing key encryption key Url. Ex: /subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. Mutually exclusive with identityType systemAssignedIdentity. */
  userAssignedIdentityResourceId?: string;
  /** delegated identity to use for accessing key encryption key Url. Ex: /subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. Mutually exclusive with identityType systemAssignedIdentity and userAssignedIdentity - internal use only. */
  delegatedIdentityClientId?: string;
}

export function customerManagedKeyEncryptionKeyIdentitySerializer(
  item: CustomerManagedKeyEncryptionKeyIdentity,
): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    delegatedIdentityClientId: item["delegatedIdentityClientId"],
  };
}

export function customerManagedKeyEncryptionKeyIdentityDeserializer(
  item: any,
): CustomerManagedKeyEncryptionKeyIdentity {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    delegatedIdentityClientId: item["delegatedIdentityClientId"],
  };
}

/** The type of identity to use. */
export enum KnownIdentityType {
  /** System assigned identity */
  SystemAssignedIdentity = "systemAssignedIdentity",
  /** User assigned identity */
  UserAssignedIdentity = "userAssignedIdentity",
  /** Delegated identity */
  DelegatedResourceIdentity = "delegatedResourceIdentity",
}

/**
 * The type of identity to use. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **systemAssignedIdentity**: System assigned identity \
 * **userAssignedIdentity**: User assigned identity \
 * **delegatedResourceIdentity**: Delegated identity
 */
export type IdentityType = string;

/** Project catalog settings for project catalogs under a project associated to this dev center. */
export interface DevCenterProjectCatalogSettings {
  /** Whether project catalogs associated with projects in this dev center can be configured to sync catalog items. */
  catalogItemSyncEnableStatus?: CatalogItemSyncEnableStatus;
}

export function devCenterProjectCatalogSettingsSerializer(
  item: DevCenterProjectCatalogSettings,
): any {
  return { catalogItemSyncEnableStatus: item["catalogItemSyncEnableStatus"] };
}

export function devCenterProjectCatalogSettingsDeserializer(
  item: any,
): DevCenterProjectCatalogSettings {
  return {
    catalogItemSyncEnableStatus: item["catalogItemSyncEnableStatus"],
  };
}

/** Catalog item sync types enable or disable status. Indicates whether project catalogs are allowed to sync catalog items under projects associated to this dev center. */
export enum KnownCatalogItemSyncEnableStatus {
  /** Catalog item sync is enabled. */
  Enabled = "Enabled",
  /** Catalog item sync is disabled. */
  Disabled = "Disabled",
}

/**
 * Catalog item sync types enable or disable status. Indicates whether project catalogs are allowed to sync catalog items under projects associated to this dev center. \
 * {@link KnownCatalogItemSyncEnableStatus} can be used interchangeably with CatalogItemSyncEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Catalog item sync is enabled. \
 * **Disabled**: Catalog item sync is disabled.
 */
export type CatalogItemSyncEnableStatus = string;

/** Network settings for the Dev Center. */
export interface DevCenterNetworkSettings {
  /** Indicates whether pools in this Dev Center can use Microsoft Hosted Networks. Defaults to Enabled if not set. */
  microsoftHostedNetworkEnableStatus?: MicrosoftHostedNetworkEnableStatus;
}

export function devCenterNetworkSettingsSerializer(item: DevCenterNetworkSettings): any {
  return { microsoftHostedNetworkEnableStatus: item["microsoftHostedNetworkEnableStatus"] };
}

export function devCenterNetworkSettingsDeserializer(item: any): DevCenterNetworkSettings {
  return {
    microsoftHostedNetworkEnableStatus: item["microsoftHostedNetworkEnableStatus"],
  };
}

/** Indicates whether pools in this Dev Center can use Microsoft Hosted Networks. Defaults to Enabled if not set. */
export enum KnownMicrosoftHostedNetworkEnableStatus {
  /** Microsoft Hosted Networks are enabled for this Dev Center. */
  Enabled = "Enabled",
  /** Microsoft Hosted Networks are disabled for this Dev Center. */
  Disabled = "Disabled",
}

/**
 * Indicates whether pools in this Dev Center can use Microsoft Hosted Networks. Defaults to Enabled if not set. \
 * {@link KnownMicrosoftHostedNetworkEnableStatus} can be used interchangeably with MicrosoftHostedNetworkEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Microsoft Hosted Networks are enabled for this Dev Center. \
 * **Disabled**: Microsoft Hosted Networks are disabled for this Dev Center.
 */
export type MicrosoftHostedNetworkEnableStatus = string;

/** Provisioning settings that apply to all Dev Boxes created in this dev center. */
export interface DevBoxProvisioningSettings {
  /** Indicates whether to install the Azure Monitor Agent service on Dev Boxes that belong to this dev center */
  installAzureMonitorAgentEnableStatus?: InstallAzureMonitorAgentEnableStatus;
}

export function devBoxProvisioningSettingsSerializer(item: DevBoxProvisioningSettings): any {
  return { installAzureMonitorAgentEnableStatus: item["installAzureMonitorAgentEnableStatus"] };
}

export function devBoxProvisioningSettingsDeserializer(item: any): DevBoxProvisioningSettings {
  return {
    installAzureMonitorAgentEnableStatus: item["installAzureMonitorAgentEnableStatus"],
  };
}

/** Setting to be used when determining whether to install the Azure Monitor Agent service on Dev Boxes that belong to this dev center. */
export enum KnownInstallAzureMonitorAgentEnableStatus {
  /** Azure Monitor Agent service is enabled. */
  Enabled = "Enabled",
  /** Azure Monitor Agent service is disabled. */
  Disabled = "Disabled",
}

/**
 * Setting to be used when determining whether to install the Azure Monitor Agent service on Dev Boxes that belong to this dev center. \
 * {@link KnownInstallAzureMonitorAgentEnableStatus} can be used interchangeably with InstallAzureMonitorAgentEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Azure Monitor Agent service is enabled. \
 * **Disabled**: Azure Monitor Agent service is disabled.
 */
export type InstallAzureMonitorAgentEnableStatus = string;

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

/** The devcenter resource for partial updates. Properties not provided in the update request will not be changed. */
export interface DevCenterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
  /** Encryption settings to be used for server-side encryption for proprietary content (such as catalogs, logs, customizations). */
  encryption?: Encryption;
  /** The display name of the devcenter. */
  displayName?: string;
  /** Dev Center settings to be used when associating a project with a catalog. */
  projectCatalogSettings?: DevCenterProjectCatalogSettings;
  /** Network settings that will be enforced on network resources associated with the Dev Center. */
  networkSettings?: DevCenterNetworkSettings;
  /** Settings to be used in the provisioning of all Dev Boxes that belong to this dev center. */
  devBoxProvisioningSettings?: DevBoxProvisioningSettings;
}

export function devCenterUpdateSerializer(item: DevCenterUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "encryption",
      "displayName",
      "projectCatalogSettings",
      "networkSettings",
      "devBoxProvisioningSettings",
    ])
      ? undefined
      : _devCenterUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of DevCenter items */
export interface _DevCenterListResult {
  /** The DevCenter items on this page */
  readonly value: DevCenter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _devCenterListResultDeserializer(item: any): _DevCenterListResult {
  return {
    value: devCenterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devCenterArraySerializer(result: Array<DevCenter>): any[] {
  return result.map((item) => {
    return devCenterSerializer(item);
  });
}

export function devCenterArrayDeserializer(result: Array<DevCenter>): any[] {
  return result.map((item) => {
    return devCenterDeserializer(item);
  });
}

/** Represents an project policy resource. */
export interface ProjectPolicy extends ProxyResource {
  /** Properties of an project policy. */
  properties?: ProjectPolicyProperties;
}

export function projectPolicySerializer(item: ProjectPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectPolicyPropertiesSerializer(item["properties"]),
  };
}

export function projectPolicyDeserializer(item: any): ProjectPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : projectPolicyPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an project policy. */
export interface ProjectPolicyProperties extends ProjectPolicyUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function projectPolicyPropertiesSerializer(item: ProjectPolicyProperties): any {
  return {
    resourcePolicies: !item["resourcePolicies"]
      ? item["resourcePolicies"]
      : resourcePolicyArraySerializer(item["resourcePolicies"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    configurationPolicies: !item["configurationPolicies"]
      ? item["configurationPolicies"]
      : configurationPoliciesSerializer(item["configurationPolicies"]),
  };
}

export function projectPolicyPropertiesDeserializer(item: any): ProjectPolicyProperties {
  return {
    resourcePolicies: !item["resourcePolicies"]
      ? item["resourcePolicies"]
      : resourcePolicyArrayDeserializer(item["resourcePolicies"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    configurationPolicies: !item["configurationPolicies"]
      ? item["configurationPolicies"]
      : configurationPoliciesDeserializer(item["configurationPolicies"]),
    provisioningState: item["provisioningState"],
  };
}

/** Properties of an project policy. These properties can be updated after the resource has been created. */
export interface ProjectPolicyUpdateProperties {
  /** Resource policies that are a part of this project policy. */
  resourcePolicies?: ResourcePolicy[];
  /** Resources that have access to the shared resources that are a part of this project policy. */
  scopes?: string[];
  /** Configuration Policies part of this project policy. */
  configurationPolicies?: ConfigurationPolicies;
}

export function projectPolicyUpdatePropertiesSerializer(item: ProjectPolicyUpdateProperties): any {
  return {
    resourcePolicies: !item["resourcePolicies"]
      ? item["resourcePolicies"]
      : resourcePolicyArraySerializer(item["resourcePolicies"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    configurationPolicies: !item["configurationPolicies"]
      ? item["configurationPolicies"]
      : configurationPoliciesSerializer(item["configurationPolicies"]),
  };
}

export function projectPolicyUpdatePropertiesDeserializer(
  item: any,
): ProjectPolicyUpdateProperties {
  return {
    resourcePolicies: !item["resourcePolicies"]
      ? item["resourcePolicies"]
      : resourcePolicyArrayDeserializer(item["resourcePolicies"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    configurationPolicies: !item["configurationPolicies"]
      ? item["configurationPolicies"]
      : configurationPoliciesDeserializer(item["configurationPolicies"]),
  };
}

export function resourcePolicyArraySerializer(result: Array<ResourcePolicy>): any[] {
  return result.map((item) => {
    return resourcePolicySerializer(item);
  });
}

export function resourcePolicyArrayDeserializer(result: Array<ResourcePolicy>): any[] {
  return result.map((item) => {
    return resourcePolicyDeserializer(item);
  });
}

/** A resource policy. */
export interface ResourcePolicy {
  /** Resources that are included and shared as a part of a project policy. */
  resources?: string;
  /** Optional. When specified, this expression is used to filter the resources. */
  filter?: string;
  /** Policy action to be taken on the resources. This is optional, and defaults to allow */
  action?: PolicyAction;
  /** Optional. The resource type being restricted or allowed by a project policy. Used with a given action to restrict or allow access to a resource type. */
  resourceType?: DevCenterResourceType;
}

export function resourcePolicySerializer(item: ResourcePolicy): any {
  return {
    resources: item["resources"],
    filter: item["filter"],
    action: item["action"],
    resourceType: item["resourceType"],
  };
}

export function resourcePolicyDeserializer(item: any): ResourcePolicy {
  return {
    resources: item["resources"],
    filter: item["filter"],
    action: item["action"],
    resourceType: item["resourceType"],
  };
}

/** Indicates what action to perform for the policy. */
export enum KnownPolicyAction {
  /** Allow action for the policy. */
  Allow = "Allow",
  /** Deny action for the policy. */
  Deny = "Deny",
}

/**
 * Indicates what action to perform for the policy. \
 * {@link KnownPolicyAction} can be used interchangeably with PolicyAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow action for the policy. \
 * **Deny**: Deny action for the policy.
 */
export type PolicyAction = string;

/** Indicates dev center resource types. */
export enum KnownDevCenterResourceType {
  /** Images resource type. */
  Images = "Images",
  /** Attached networks resource type. */
  AttachedNetworks = "AttachedNetworks",
  /** Skus resource type. */
  Skus = "Skus",
}

/**
 * Indicates dev center resource types. \
 * {@link KnownDevCenterResourceType} can be used interchangeably with DevCenterResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Images**: Images resource type. \
 * **AttachedNetworks**: Attached networks resource type. \
 * **Skus**: Skus resource type.
 */
export type DevCenterResourceType = string;

/** Represents policies to enforce configuration settings on a project. */
export interface ConfigurationPolicies {
  /** The property indicates the Azure AI services settings on a project. */
  azureAiServicesFeatureStatus?: FeatureState;
  /** Indicates whether the setting is configurable at Project scope. */
  devBoxScheduleDeleteFeatureStatus?: FeatureState;
  /** Indicates whether DevBox limits are configurable at Project scope. */
  devBoxLimitsFeatureStatus?: FeatureState;
  /** Indicates whether project display name is configurable at Project scope. */
  displayNameFeatureStatus?: FeatureState;
  /** Indicates whether DevBox tunnel settings are configurable at Pool scope. */
  devBoxTunnelFeatureStatus?: FeatureState;
  /** Indicates whether project catalogs are configurable at Project scope. */
  projectCatalogFeatureStatus?: FeatureState;
  /** Indicates whether serverless GPU sessions are configurable at Project scope. */
  serverlessGpuSessionsFeatureStatus?: FeatureState;
  /** Indicates whether user customizations is configurable at Project scope. */
  userCustomizationsFeatureStatus?: FeatureState;
  /** Indicates whether workspace storage is configurable at Project scope. */
  workspaceStorageFeatureStatus?: FeatureState;
}

export function configurationPoliciesSerializer(item: ConfigurationPolicies): any {
  return {
    azureAiServicesFeatureStatus: !item["azureAiServicesFeatureStatus"]
      ? item["azureAiServicesFeatureStatus"]
      : featureStateSerializer(item["azureAiServicesFeatureStatus"]),
    devBoxScheduleDeleteFeatureStatus: !item["devBoxScheduleDeleteFeatureStatus"]
      ? item["devBoxScheduleDeleteFeatureStatus"]
      : featureStateSerializer(item["devBoxScheduleDeleteFeatureStatus"]),
    devBoxLimitsFeatureStatus: !item["devBoxLimitsFeatureStatus"]
      ? item["devBoxLimitsFeatureStatus"]
      : featureStateSerializer(item["devBoxLimitsFeatureStatus"]),
    displayNameFeatureStatus: !item["displayNameFeatureStatus"]
      ? item["displayNameFeatureStatus"]
      : featureStateSerializer(item["displayNameFeatureStatus"]),
    devBoxTunnelFeatureStatus: !item["devBoxTunnelFeatureStatus"]
      ? item["devBoxTunnelFeatureStatus"]
      : featureStateSerializer(item["devBoxTunnelFeatureStatus"]),
    projectCatalogFeatureStatus: !item["projectCatalogFeatureStatus"]
      ? item["projectCatalogFeatureStatus"]
      : featureStateSerializer(item["projectCatalogFeatureStatus"]),
    serverlessGpuSessionsFeatureStatus: !item["serverlessGpuSessionsFeatureStatus"]
      ? item["serverlessGpuSessionsFeatureStatus"]
      : featureStateSerializer(item["serverlessGpuSessionsFeatureStatus"]),
    userCustomizationsFeatureStatus: !item["userCustomizationsFeatureStatus"]
      ? item["userCustomizationsFeatureStatus"]
      : featureStateSerializer(item["userCustomizationsFeatureStatus"]),
    workspaceStorageFeatureStatus: !item["workspaceStorageFeatureStatus"]
      ? item["workspaceStorageFeatureStatus"]
      : featureStateSerializer(item["workspaceStorageFeatureStatus"]),
  };
}

export function configurationPoliciesDeserializer(item: any): ConfigurationPolicies {
  return {
    azureAiServicesFeatureStatus: !item["azureAiServicesFeatureStatus"]
      ? item["azureAiServicesFeatureStatus"]
      : featureStateDeserializer(item["azureAiServicesFeatureStatus"]),
    devBoxScheduleDeleteFeatureStatus: !item["devBoxScheduleDeleteFeatureStatus"]
      ? item["devBoxScheduleDeleteFeatureStatus"]
      : featureStateDeserializer(item["devBoxScheduleDeleteFeatureStatus"]),
    devBoxLimitsFeatureStatus: !item["devBoxLimitsFeatureStatus"]
      ? item["devBoxLimitsFeatureStatus"]
      : featureStateDeserializer(item["devBoxLimitsFeatureStatus"]),
    displayNameFeatureStatus: !item["displayNameFeatureStatus"]
      ? item["displayNameFeatureStatus"]
      : featureStateDeserializer(item["displayNameFeatureStatus"]),
    devBoxTunnelFeatureStatus: !item["devBoxTunnelFeatureStatus"]
      ? item["devBoxTunnelFeatureStatus"]
      : featureStateDeserializer(item["devBoxTunnelFeatureStatus"]),
    projectCatalogFeatureStatus: !item["projectCatalogFeatureStatus"]
      ? item["projectCatalogFeatureStatus"]
      : featureStateDeserializer(item["projectCatalogFeatureStatus"]),
    serverlessGpuSessionsFeatureStatus: !item["serverlessGpuSessionsFeatureStatus"]
      ? item["serverlessGpuSessionsFeatureStatus"]
      : featureStateDeserializer(item["serverlessGpuSessionsFeatureStatus"]),
    userCustomizationsFeatureStatus: !item["userCustomizationsFeatureStatus"]
      ? item["userCustomizationsFeatureStatus"]
      : featureStateDeserializer(item["userCustomizationsFeatureStatus"]),
    workspaceStorageFeatureStatus: !item["workspaceStorageFeatureStatus"]
      ? item["workspaceStorageFeatureStatus"]
      : featureStateDeserializer(item["workspaceStorageFeatureStatus"]),
  };
}

/** Feature state. */
export interface FeatureState {
  /** Indicates whether the feature's status, Enabled or Disabled, is configurable at the Project scope. */
  statusModifiable?: FeatureStateModifiable;
  /** Indicates whether the feature values are configurable at the Project scope. */
  valuesModifiable?: FeatureStateModifiable;
  /** Indicates the default status of the feature. */
  defaultStatus?: FeatureStatus;
  /** The default values of the feature. */
  defaultValues?: DefaultValue[];
}

export function featureStateSerializer(item: FeatureState): any {
  return {
    statusModifiable: item["statusModifiable"],
    valuesModifiable: item["valuesModifiable"],
    defaultStatus: item["defaultStatus"],
    defaultValues: !item["defaultValues"]
      ? item["defaultValues"]
      : defaultValueArraySerializer(item["defaultValues"]),
  };
}

export function featureStateDeserializer(item: any): FeatureState {
  return {
    statusModifiable: item["statusModifiable"],
    valuesModifiable: item["valuesModifiable"],
    defaultStatus: item["defaultStatus"],
    defaultValues: !item["defaultValues"]
      ? item["defaultValues"]
      : defaultValueArrayDeserializer(item["defaultValues"]),
  };
}

/** Feature enablement status. */
export enum KnownFeatureStateModifiable {
  /** Feature is not modifiable. */
  NotModifiable = "NotModifiable",
  /** Feature is modifiable. */
  Modifiable = "Modifiable",
}

/**
 * Feature enablement status. \
 * {@link KnownFeatureStateModifiable} can be used interchangeably with FeatureStateModifiable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotModifiable**: Feature is not modifiable. \
 * **Modifiable**: Feature is modifiable.
 */
export type FeatureStateModifiable = string;

/** Feature status. */
export enum KnownFeatureStatus {
  /** Feature is enabled. */
  Enabled = "Enabled",
  /** Feature is disabled. */
  Disabled = "Disabled",
  /** Auto Deploy feature status. */
  AutoDeploy = "AutoDeploy",
}

/**
 * Feature status. \
 * {@link KnownFeatureStatus} can be used interchangeably with FeatureStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Feature is enabled. \
 * **Disabled**: Feature is disabled. \
 * **AutoDeploy**: Auto Deploy feature status.
 */
export type FeatureStatus = string;

export function defaultValueArraySerializer(result: Array<DefaultValue>): any[] {
  return result.map((item) => {
    return defaultValueSerializer(item);
  });
}

export function defaultValueArrayDeserializer(result: Array<DefaultValue>): any[] {
  return result.map((item) => {
    return defaultValueDeserializer(item);
  });
}

/** A default value that can be provided for a feature property. */
export interface DefaultValue {
  /** The name of the feature property. */
  name?: string;
  /** The default value to be applied for the given property. */
  value?: string;
}

export function defaultValueSerializer(item: DefaultValue): any {
  return { name: item["name"], value: item["value"] };
}

export function defaultValueDeserializer(item: any): DefaultValue {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The project policy properties for partial update. Properties not provided in the update request will not be changed. */
export interface ProjectPolicyUpdate {
  /** Resource policies that are a part of this project policy. */
  resourcePolicies?: ResourcePolicy[];
  /** Resources that have access to the shared resources that are a part of this project policy. */
  scopes?: string[];
  /** Configuration Policies part of this project policy. */
  configurationPolicies?: ConfigurationPolicies;
}

export function projectPolicyUpdateSerializer(item: ProjectPolicyUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["resourcePolicies", "scopes", "configurationPolicies"])
      ? undefined
      : _projectPolicyUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of ProjectPolicy items */
export interface _ProjectPolicyListResult {
  /** The ProjectPolicy items on this page */
  readonly value: ProjectPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectPolicyListResultDeserializer(item: any): _ProjectPolicyListResult {
  return {
    value: projectPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectPolicyArraySerializer(result: Array<ProjectPolicy>): any[] {
  return result.map((item) => {
    return projectPolicySerializer(item);
  });
}

export function projectPolicyArrayDeserializer(result: Array<ProjectPolicy>): any[] {
  return result.map((item) => {
    return projectPolicyDeserializer(item);
  });
}

/** Represents a project resource. */
export interface Project extends TrackedResource {
  /** Properties of a project. */
  properties?: ProjectProperties;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
}

export function projectSerializer(item: Project): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function projectDeserializer(item: any): Project {
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
      : projectPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a project. */
export interface ProjectProperties extends ProjectUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The URI of the Dev Center resource this project is associated with. */
  readonly devCenterUri?: string;
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return {
    devCenterId: item["devCenterId"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
    displayName: item["displayName"],
    catalogSettings: !item["catalogSettings"]
      ? item["catalogSettings"]
      : projectCatalogSettingsSerializer(item["catalogSettings"]),
    customizationSettings: !item["customizationSettings"]
      ? item["customizationSettings"]
      : projectCustomizationSettingsSerializer(item["customizationSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : devBoxScheduleDeleteSettingsSerializer(item["devBoxScheduleDeleteSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : azureAiServicesSettingsSerializer(item["azureAiServicesSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : serverlessGpuSessionsSettingsSerializer(item["serverlessGpuSessionsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : workspaceStorageSettingsSerializer(item["workspaceStorageSettings"]),
    assignedGroups: !item["assignedGroups"]
      ? item["assignedGroups"]
      : assignedGroupArraySerializer(item["assignedGroups"]),
  };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    devCenterId: item["devCenterId"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
    displayName: item["displayName"],
    catalogSettings: !item["catalogSettings"]
      ? item["catalogSettings"]
      : projectCatalogSettingsDeserializer(item["catalogSettings"]),
    customizationSettings: !item["customizationSettings"]
      ? item["customizationSettings"]
      : projectCustomizationSettingsDeserializer(item["customizationSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : devBoxScheduleDeleteSettingsDeserializer(item["devBoxScheduleDeleteSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : azureAiServicesSettingsDeserializer(item["azureAiServicesSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : serverlessGpuSessionsSettingsDeserializer(item["serverlessGpuSessionsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : workspaceStorageSettingsDeserializer(item["workspaceStorageSettings"]),
    assignedGroups: !item["assignedGroups"]
      ? item["assignedGroups"]
      : assignedGroupArrayDeserializer(item["assignedGroups"]),
    provisioningState: item["provisioningState"],
    devCenterUri: item["devCenterUri"],
  };
}

/** Properties of a project. These properties can be updated after the resource has been created. */
export interface ProjectUpdateProperties {
  /** Resource Id of an associated DevCenter. */
  devCenterId?: string;
  /** Description of the project. */
  description?: string;
  /** When specified, limits the maximum number of Dev Boxes a single user can create across all pools in the project. This will have no effect on existing Dev Boxes when reduced. */
  maxDevBoxesPerUser?: number;
  /** The display name of the project. */
  displayName?: string;
  /** Settings to be used when associating a project with a catalog. */
  catalogSettings?: ProjectCatalogSettings;
  /** Settings to be used for customizations. */
  customizationSettings?: ProjectCustomizationSettings;
  /** Dev Box Schedule Delete settings. */
  devBoxScheduleDeleteSettings?: DevBoxScheduleDeleteSettings;
  /** Indicates whether Azure AI services are enabled for a project. */
  azureAiServicesSettings?: AzureAiServicesSettings;
  /** Settings to be used for serverless GPU. */
  serverlessGpuSessionsSettings?: ServerlessGpuSessionsSettings;
  /** Settings to be used for workspace storage. */
  workspaceStorageSettings?: WorkspaceStorageSettings;
  /** List of Entra ID group assignments associated with this project. */
  assignedGroups?: AssignedGroup[];
}

export function projectUpdatePropertiesSerializer(item: ProjectUpdateProperties): any {
  return {
    devCenterId: item["devCenterId"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
    displayName: item["displayName"],
    catalogSettings: !item["catalogSettings"]
      ? item["catalogSettings"]
      : projectCatalogSettingsSerializer(item["catalogSettings"]),
    customizationSettings: !item["customizationSettings"]
      ? item["customizationSettings"]
      : projectCustomizationSettingsSerializer(item["customizationSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : devBoxScheduleDeleteSettingsSerializer(item["devBoxScheduleDeleteSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : azureAiServicesSettingsSerializer(item["azureAiServicesSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : serverlessGpuSessionsSettingsSerializer(item["serverlessGpuSessionsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : workspaceStorageSettingsSerializer(item["workspaceStorageSettings"]),
    assignedGroups: !item["assignedGroups"]
      ? item["assignedGroups"]
      : assignedGroupArraySerializer(item["assignedGroups"]),
  };
}

export function projectUpdatePropertiesDeserializer(item: any): ProjectUpdateProperties {
  return {
    devCenterId: item["devCenterId"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
    displayName: item["displayName"],
    catalogSettings: !item["catalogSettings"]
      ? item["catalogSettings"]
      : projectCatalogSettingsDeserializer(item["catalogSettings"]),
    customizationSettings: !item["customizationSettings"]
      ? item["customizationSettings"]
      : projectCustomizationSettingsDeserializer(item["customizationSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : devBoxScheduleDeleteSettingsDeserializer(item["devBoxScheduleDeleteSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : azureAiServicesSettingsDeserializer(item["azureAiServicesSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : serverlessGpuSessionsSettingsDeserializer(item["serverlessGpuSessionsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : workspaceStorageSettingsDeserializer(item["workspaceStorageSettings"]),
    assignedGroups: !item["assignedGroups"]
      ? item["assignedGroups"]
      : assignedGroupArrayDeserializer(item["assignedGroups"]),
  };
}

/** Settings to be used when associating a project with a catalog. */
export interface ProjectCatalogSettings {
  /** Indicates catalog item types that can be synced. */
  catalogItemSyncTypes?: CatalogItemType[];
}

export function projectCatalogSettingsSerializer(item: ProjectCatalogSettings): any {
  return {
    catalogItemSyncTypes: !item["catalogItemSyncTypes"]
      ? item["catalogItemSyncTypes"]
      : item["catalogItemSyncTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function projectCatalogSettingsDeserializer(item: any): ProjectCatalogSettings {
  return {
    catalogItemSyncTypes: !item["catalogItemSyncTypes"]
      ? item["catalogItemSyncTypes"]
      : item["catalogItemSyncTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates catalog item types. */
export enum KnownCatalogItemType {
  /** Environment definition catalog item type. */
  EnvironmentDefinition = "EnvironmentDefinition",
  /** Image definition catalog item type. */
  ImageDefinition = "ImageDefinition",
}

/**
 * Indicates catalog item types. \
 * {@link KnownCatalogItemType} can be used interchangeably with CatalogItemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EnvironmentDefinition**: Environment definition catalog item type. \
 * **ImageDefinition**: Image definition catalog item type.
 */
export type CatalogItemType = string;

/** Settings to be used for customizations. */
export interface ProjectCustomizationSettings {
  /** The identities that can to be used in customization scenarios; e.g., to clone a repository. */
  identities?: ProjectCustomizationManagedIdentity[];
  /** Indicates whether user customizations are enabled. */
  userCustomizationsEnableStatus?: UserCustomizationsEnableStatus;
}

export function projectCustomizationSettingsSerializer(item: ProjectCustomizationSettings): any {
  return {
    identities: !item["identities"]
      ? item["identities"]
      : projectCustomizationManagedIdentityArraySerializer(item["identities"]),
    userCustomizationsEnableStatus: item["userCustomizationsEnableStatus"],
  };
}

export function projectCustomizationSettingsDeserializer(item: any): ProjectCustomizationSettings {
  return {
    identities: !item["identities"]
      ? item["identities"]
      : projectCustomizationManagedIdentityArrayDeserializer(item["identities"]),
    userCustomizationsEnableStatus: item["userCustomizationsEnableStatus"],
  };
}

export function projectCustomizationManagedIdentityArraySerializer(
  result: Array<ProjectCustomizationManagedIdentity>,
): any[] {
  return result.map((item) => {
    return projectCustomizationManagedIdentitySerializer(item);
  });
}

export function projectCustomizationManagedIdentityArrayDeserializer(
  result: Array<ProjectCustomizationManagedIdentity>,
): any[] {
  return result.map((item) => {
    return projectCustomizationManagedIdentityDeserializer(item);
  });
}

/** A reference to a Managed Identity that is attached to the Project. */
export interface ProjectCustomizationManagedIdentity {
  /** Values can be systemAssignedIdentity or userAssignedIdentity. */
  identityType?: ProjectCustomizationIdentityType;
  /** Ex: /subscriptions/fa5fc227-a624-475e-b696-cdd604c735bc/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. Mutually exclusive with identityType systemAssignedIdentity. */
  identityResourceId?: string;
}

export function projectCustomizationManagedIdentitySerializer(
  item: ProjectCustomizationManagedIdentity,
): any {
  return { identityType: item["identityType"], identityResourceId: item["identityResourceId"] };
}

export function projectCustomizationManagedIdentityDeserializer(
  item: any,
): ProjectCustomizationManagedIdentity {
  return {
    identityType: item["identityType"],
    identityResourceId: item["identityResourceId"],
  };
}

/** Values can be systemAssignedIdentity or userAssignedIdentity */
export enum KnownProjectCustomizationIdentityType {
  /** System assigned identity type. */
  SystemAssignedIdentity = "systemAssignedIdentity",
  /** User assigned identity type. */
  UserAssignedIdentity = "userAssignedIdentity",
}

/**
 * Values can be systemAssignedIdentity or userAssignedIdentity \
 * {@link KnownProjectCustomizationIdentityType} can be used interchangeably with ProjectCustomizationIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **systemAssignedIdentity**: System assigned identity type. \
 * **userAssignedIdentity**: User assigned identity type.
 */
export type ProjectCustomizationIdentityType = string;

/** Indicates whether user customizations are enabled. */
export enum KnownUserCustomizationsEnableStatus {
  /** User customizations are disabled. */
  Disabled = "Disabled",
  /** User customizations are enabled. */
  Enabled = "Enabled",
}

/**
 * Indicates whether user customizations are enabled. \
 * {@link KnownUserCustomizationsEnableStatus} can be used interchangeably with UserCustomizationsEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: User customizations are disabled. \
 * **Enabled**: User customizations are enabled.
 */
export type UserCustomizationsEnableStatus = string;

/** Settings controlling the auto deletion of inactive dev boxes. */
export interface DevBoxScheduleDeleteSettings {
  /** Indicates the delete mode for Dev Boxes within this project. */
  deleteMode?: DevBoxDeleteMode;
  /** ISO8601 duration required for the dev box to not be inactive prior to it being scheduled for deletion.  ISO8601 format PT[n]H[n]M[n]S. */
  inactiveThreshold?: string;
  /** ISO8601 duration required for the dev box to be marked for deletion prior to it being deleted. ISO8601 format PT[n]H[n]M[n]S. */
  gracePeriod?: string;
  /** Indicates whether scheduled deletion should be canceled when a user connects to the dev box. */
  cancelOnConnectEnableStatus?: CancelOnConnectEnableStatus;
}

export function devBoxScheduleDeleteSettingsSerializer(item: DevBoxScheduleDeleteSettings): any {
  return {
    deleteMode: item["deleteMode"],
    inactiveThreshold: item["inactiveThreshold"],
    gracePeriod: item["gracePeriod"],
    cancelOnConnectEnableStatus: item["cancelOnConnectEnableStatus"],
  };
}

export function devBoxScheduleDeleteSettingsDeserializer(item: any): DevBoxScheduleDeleteSettings {
  return {
    deleteMode: item["deleteMode"],
    inactiveThreshold: item["inactiveThreshold"],
    gracePeriod: item["gracePeriod"],
    cancelOnConnectEnableStatus: item["cancelOnConnectEnableStatus"],
  };
}

/** Indicates possible values for Dev Box delete mode. */
export enum KnownDevBoxDeleteMode {
  /** Dev Boxes will not be deleted automatically, and user must manually delete. This is the default. */
  Manual = "Manual",
  /** Dev Boxes will be deleted automatically according to configured settings. */
  Auto = "Auto",
}

/**
 * Indicates possible values for Dev Box delete mode. \
 * {@link KnownDevBoxDeleteMode} can be used interchangeably with DevBoxDeleteMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Dev Boxes will not be deleted automatically, and user must manually delete. This is the default. \
 * **Auto**: Dev Boxes will be deleted automatically according to configured settings.
 */
export type DevBoxDeleteMode = string;

/** Indicates whether cancel on connect is enabled. */
export enum KnownCancelOnConnectEnableStatus {
  /** Cancel on connect is enabled. */
  Enabled = "Enabled",
  /** Cancel on connect is disabled. */
  Disabled = "Disabled",
}

/**
 * Indicates whether cancel on connect is enabled. \
 * {@link KnownCancelOnConnectEnableStatus} can be used interchangeably with CancelOnConnectEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Cancel on connect is enabled. \
 * **Disabled**: Cancel on connect is disabled.
 */
export type CancelOnConnectEnableStatus = string;

/** Configures Azure AI related services for the project. */
export interface AzureAiServicesSettings {
  /** The property indicates whether Azure AI services is enabled. */
  azureAiServicesMode?: AzureAiServicesMode;
}

export function azureAiServicesSettingsSerializer(item: AzureAiServicesSettings): any {
  return { azureAiServicesMode: item["azureAiServicesMode"] };
}

export function azureAiServicesSettingsDeserializer(item: any): AzureAiServicesSettings {
  return {
    azureAiServicesMode: item["azureAiServicesMode"],
  };
}

/** Indicates whether Azure AI services are enabled for a project. */
export enum KnownAzureAiServicesMode {
  /** Azure AI services are disabled for this project. */
  Disabled = "Disabled",
  /** Azure AI services are enabled for this project and necessary resources will be automatically setup. */
  AutoDeploy = "AutoDeploy",
}

/**
 * Indicates whether Azure AI services are enabled for a project. \
 * {@link KnownAzureAiServicesMode} can be used interchangeably with AzureAiServicesMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Azure AI services are disabled for this project. \
 * **AutoDeploy**: Azure AI services are enabled for this project and necessary resources will be automatically setup.
 */
export type AzureAiServicesMode = string;

/** Represents settings for serverless GPU access. */
export interface ServerlessGpuSessionsSettings {
  /** The property indicates whether serverless GPU access is enabled on the project. */
  serverlessGpuSessionsMode?: ServerlessGpuSessionsMode;
  /** When specified, limits the maximum number of concurrent sessions across all pools in the project. */
  maxConcurrentSessionsPerProject?: number;
}

export function serverlessGpuSessionsSettingsSerializer(item: ServerlessGpuSessionsSettings): any {
  return {
    serverlessGpuSessionsMode: item["serverlessGpuSessionsMode"],
    maxConcurrentSessionsPerProject: item["maxConcurrentSessionsPerProject"],
  };
}

export function serverlessGpuSessionsSettingsDeserializer(
  item: any,
): ServerlessGpuSessionsSettings {
  return {
    serverlessGpuSessionsMode: item["serverlessGpuSessionsMode"],
    maxConcurrentSessionsPerProject: item["maxConcurrentSessionsPerProject"],
  };
}

/** Indicates whether serverless GPU session access is enabled. */
export enum KnownServerlessGpuSessionsMode {
  /** Serverless GPU session access is disabled. */
  Disabled = "Disabled",
  /** Serverless GPU session access is enabled and necessary resources will be automatically setup. */
  AutoDeploy = "AutoDeploy",
}

/**
 * Indicates whether serverless GPU session access is enabled. \
 * {@link KnownServerlessGpuSessionsMode} can be used interchangeably with ServerlessGpuSessionsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Serverless GPU session access is disabled. \
 * **AutoDeploy**: Serverless GPU session access is enabled and necessary resources will be automatically setup.
 */
export type ServerlessGpuSessionsMode = string;

/** Settings to be used for workspace storage. */
export interface WorkspaceStorageSettings {
  /** Indicates whether workspace storage is enabled. */
  workspaceStorageMode?: WorkspaceStorageMode;
}

export function workspaceStorageSettingsSerializer(item: WorkspaceStorageSettings): any {
  return { workspaceStorageMode: item["workspaceStorageMode"] };
}

export function workspaceStorageSettingsDeserializer(item: any): WorkspaceStorageSettings {
  return {
    workspaceStorageMode: item["workspaceStorageMode"],
  };
}

/** Indicates whether workspace storage is enabled. */
export enum KnownWorkspaceStorageMode {
  /** Workspace storage is disabled. */
  Disabled = "Disabled",
  /** Workspace storage is enabled and necessary resources will be automatically setup. */
  AutoDeploy = "AutoDeploy",
}

/**
 * Indicates whether workspace storage is enabled. \
 * {@link KnownWorkspaceStorageMode} can be used interchangeably with WorkspaceStorageMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Workspace storage is disabled. \
 * **AutoDeploy**: Workspace storage is enabled and necessary resources will be automatically setup.
 */
export type WorkspaceStorageMode = string;

export function assignedGroupArraySerializer(result: Array<AssignedGroup>): any[] {
  return result.map((item) => {
    return assignedGroupSerializer(item);
  });
}

export function assignedGroupArrayDeserializer(result: Array<AssignedGroup>): any[] {
  return result.map((item) => {
    return assignedGroupDeserializer(item);
  });
}

/** Represents an Entra group assigned to this Project, entitling all members to resources for the given scope. */
export interface AssignedGroup {
  /** The Entra group object ID (GUID). */
  objectId?: string;
  /** The scope of the assignment. */
  scope?: AssignedGroupScope;
}

export function assignedGroupSerializer(item: AssignedGroup): any {
  return { objectId: item["objectId"], scope: item["scope"] };
}

export function assignedGroupDeserializer(item: any): AssignedGroup {
  return {
    objectId: item["objectId"],
    scope: item["scope"],
  };
}

/** The scope of an assignment. */
export enum KnownAssignedGroupScope {
  /** Assignment entitles group members to Dev Boxes in the Project. */
  DevBox = "DevBox",
}

/**
 * The scope of an assignment. \
 * {@link KnownAssignedGroupScope} can be used interchangeably with AssignedGroupScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DevBox**: Assignment entitles group members to Dev Boxes in the Project.
 */
export type AssignedGroupScope = string;

/** The project properties for partial update. Properties not provided in the update request will not be changed. */
export interface ProjectUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
  /** Resource Id of an associated DevCenter. */
  devCenterId?: string;
  /** Description of the project. */
  description?: string;
  /** When specified, limits the maximum number of Dev Boxes a single user can create across all pools in the project. This will have no effect on existing Dev Boxes when reduced. */
  maxDevBoxesPerUser?: number;
  /** The display name of the project. */
  displayName?: string;
  /** Settings to be used when associating a project with a catalog. */
  catalogSettings?: ProjectCatalogSettings;
  /** Settings to be used for customizations. */
  customizationSettings?: ProjectCustomizationSettings;
  /** Dev Box Schedule Delete settings. */
  devBoxScheduleDeleteSettings?: DevBoxScheduleDeleteSettings;
  /** Indicates whether Azure AI services are enabled for a project. */
  azureAiServicesSettings?: AzureAiServicesSettings;
  /** Settings to be used for serverless GPU. */
  serverlessGpuSessionsSettings?: ServerlessGpuSessionsSettings;
  /** Settings to be used for workspace storage. */
  workspaceStorageSettings?: WorkspaceStorageSettings;
  /** List of Entra ID group assignments associated with this project. */
  assignedGroups?: AssignedGroup[];
}

export function projectUpdateSerializer(item: ProjectUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "devCenterId",
      "description",
      "maxDevBoxesPerUser",
      "displayName",
      "catalogSettings",
      "customizationSettings",
      "devBoxScheduleDeleteSettings",
      "azureAiServicesSettings",
      "serverlessGpuSessionsSettings",
      "workspaceStorageSettings",
      "assignedGroups",
    ])
      ? undefined
      : _projectUpdatePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Paged collection of Project items */
export interface _ProjectListResult {
  /** The Project items on this page */
  readonly value: Project[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectListResultDeserializer(item: any): _ProjectListResult {
  return {
    value: projectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectArraySerializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectSerializer(item);
  });
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** Applicable inherited settings for a project. */
export interface InheritedSettingsForProject {
  /** Dev Center settings to be used when associating a project with a catalog. */
  readonly projectCatalogSettings?: InheritedProjectCatalogSettings;
  /** Network settings that will be enforced on this project. */
  readonly networkSettings?: ProjectNetworkSettings;
  /** Azure AI project policy settings that will be enforced on this project. */
  readonly azureAiServicesSettings?: FeatureState;
  /** Dev box schedule delete project policy settings that will be enforced on this project. */
  readonly devBoxScheduleDeleteSettings?: FeatureState;
  /** Dev box limits project policy settings that will be enforced on this project. */
  readonly devBoxLimitsSettings?: FeatureState;
  /** Display name project policy settings that will be enforced on this project. */
  readonly displayNameSettings?: FeatureState;
  /** Dev box tunnel project policy settings that will be enforced on this project. */
  readonly devBoxTunnelSettings?: FeatureState;
  /** Serverless GPU sessions project policy settings that will be enforced on this project. */
  readonly serverlessGpuSessionsSettings?: FeatureState;
  /** User customizations project policy settings that will be enforced on this project. */
  readonly userCustomizationsSettings?: FeatureState;
  /** Workspace storage project policy settings that will be enforced on this project. */
  readonly workspaceStorageSettings?: FeatureState;
}

export function inheritedSettingsForProjectDeserializer(item: any): InheritedSettingsForProject {
  return {
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : inheritedProjectCatalogSettingsDeserializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : projectNetworkSettingsDeserializer(item["networkSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : featureStateDeserializer(item["azureAiServicesSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : featureStateDeserializer(item["devBoxScheduleDeleteSettings"]),
    devBoxLimitsSettings: !item["devBoxLimitsSettings"]
      ? item["devBoxLimitsSettings"]
      : featureStateDeserializer(item["devBoxLimitsSettings"]),
    displayNameSettings: !item["displayNameSettings"]
      ? item["displayNameSettings"]
      : featureStateDeserializer(item["displayNameSettings"]),
    devBoxTunnelSettings: !item["devBoxTunnelSettings"]
      ? item["devBoxTunnelSettings"]
      : featureStateDeserializer(item["devBoxTunnelSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : featureStateDeserializer(item["serverlessGpuSessionsSettings"]),
    userCustomizationsSettings: !item["userCustomizationsSettings"]
      ? item["userCustomizationsSettings"]
      : featureStateDeserializer(item["userCustomizationsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : featureStateDeserializer(item["workspaceStorageSettings"]),
  };
}

/** Inherited project catalog settings that combine project policy settings with dev center catalog settings. */
export interface InheritedProjectCatalogSettings {
  /** Indicates whether the feature's status, Enabled or Disabled, is configurable at the Project scope. */
  statusModifiable?: FeatureStateModifiable;
  /** Indicates whether the feature values are configurable at the Project scope. */
  valuesModifiable?: FeatureStateModifiable;
  /** Indicates the default status of the feature. */
  defaultStatus?: FeatureStatus;
  /** The default values of the feature. */
  defaultValues?: DefaultValue[];
  /** Whether project catalogs associated with projects in this dev center can be configured to sync catalog items. */
  catalogItemSyncEnableStatus?: CatalogItemSyncEnableStatus;
}

export function inheritedProjectCatalogSettingsDeserializer(
  item: any,
): InheritedProjectCatalogSettings {
  return {
    statusModifiable: item["statusModifiable"],
    valuesModifiable: item["valuesModifiable"],
    defaultStatus: item["defaultStatus"],
    defaultValues: !item["defaultValues"]
      ? item["defaultValues"]
      : defaultValueArrayDeserializer(item["defaultValues"]),
    catalogItemSyncEnableStatus: item["catalogItemSyncEnableStatus"],
  };
}

/** Network settings for the project. */
export interface ProjectNetworkSettings {
  /** Indicates whether pools in this Dev Center can use Microsoft Hosted Networks. Defaults to Enabled if not set. */
  readonly microsoftHostedNetworkEnableStatus?: MicrosoftHostedNetworkEnableStatus;
}

export function projectNetworkSettingsDeserializer(item: any): ProjectNetworkSettings {
  return {
    microsoftHostedNetworkEnableStatus: item["microsoftHostedNetworkEnableStatus"],
  };
}

/** Represents an attached NetworkConnection. */
export interface AttachedNetworkConnection extends ProxyResource {
  /** Attached NetworkConnection properties. */
  properties?: AttachedNetworkConnectionProperties;
}

export function attachedNetworkConnectionSerializer(item: AttachedNetworkConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : attachedNetworkConnectionPropertiesSerializer(item["properties"]),
  };
}

export function attachedNetworkConnectionDeserializer(item: any): AttachedNetworkConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : attachedNetworkConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an attached NetworkConnection. */
export interface AttachedNetworkConnectionProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of the NetworkConnection you want to attach. */
  networkConnectionId?: string;
  /** The geo-location where the NetworkConnection resource specified in 'networkConnectionResourceId' property lives. */
  readonly networkConnectionLocation?: string;
  /** Health check status values. */
  readonly healthCheckStatus?: HealthCheckStatus;
  /** AAD Join type of the network. This is populated based on the referenced Network Connection. */
  readonly domainJoinType?: DomainJoinType;
}

export function attachedNetworkConnectionPropertiesSerializer(
  item: AttachedNetworkConnectionProperties,
): any {
  return { networkConnectionId: item["networkConnectionId"] };
}

export function attachedNetworkConnectionPropertiesDeserializer(
  item: any,
): AttachedNetworkConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    networkConnectionId: item["networkConnectionId"],
    networkConnectionLocation: item["networkConnectionLocation"],
    healthCheckStatus: item["healthCheckStatus"],
    domainJoinType: item["domainJoinType"],
  };
}

/** Health check status values. */
export enum KnownHealthCheckStatus {
  /** Unknown health check status. */
  Unknown = "Unknown",
  /** Pending health check status. */
  Pending = "Pending",
  /** Running health check status. */
  Running = "Running",
  /** Passed health check status. */
  Passed = "Passed",
  /** Warning health check status. */
  Warning = "Warning",
  /** Failed health check status. */
  Failed = "Failed",
  /** Informational health check status. */
  Informational = "Informational",
}

/**
 * Health check status values. \
 * {@link KnownHealthCheckStatus} can be used interchangeably with HealthCheckStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown health check status. \
 * **Pending**: Pending health check status. \
 * **Running**: Running health check status. \
 * **Passed**: Passed health check status. \
 * **Warning**: Warning health check status. \
 * **Failed**: Failed health check status. \
 * **Informational**: Informational health check status.
 */
export type HealthCheckStatus = string;

/** Active Directory join type. */
export enum KnownDomainJoinType {
  /** Hybrid Azure AD Join type. */
  HybridAzureADJoin = "HybridAzureADJoin",
  /** Azure AD Join type. */
  AzureADJoin = "AzureADJoin",
  /** No Active Directory join type. */
  None = "None",
}

/**
 * Active Directory join type. \
 * {@link KnownDomainJoinType} can be used interchangeably with DomainJoinType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HybridAzureADJoin**: Hybrid Azure AD Join type. \
 * **AzureADJoin**: Azure AD Join type. \
 * **None**: No Active Directory join type.
 */
export type DomainJoinType = string;

/** Paged collection of AttachedNetworkConnection items */
export interface _AttachedNetworkListResult {
  /** The AttachedNetworkConnection items on this page */
  readonly value: AttachedNetworkConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _attachedNetworkListResultDeserializer(item: any): _AttachedNetworkListResult {
  return {
    value: attachedNetworkConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function attachedNetworkConnectionArraySerializer(
  result: Array<AttachedNetworkConnection>,
): any[] {
  return result.map((item) => {
    return attachedNetworkConnectionSerializer(item);
  });
}

export function attachedNetworkConnectionArrayDeserializer(
  result: Array<AttachedNetworkConnection>,
): any[] {
  return result.map((item) => {
    return attachedNetworkConnectionDeserializer(item);
  });
}

/** Represents a catalog. */
export interface Catalog extends ProxyResource {
  /** Catalog properties. */
  properties?: CatalogProperties;
}

export function catalogSerializer(item: Catalog): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : catalogPropertiesSerializer(item["properties"]),
  };
}

export function catalogDeserializer(item: any): Catalog {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : catalogPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a catalog. */
export interface CatalogProperties extends CatalogUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The synchronization state of the catalog. */
  readonly syncState?: CatalogSyncState;
  /** Stats of the latest synchronization. */
  readonly lastSyncStats?: SyncStats;
  /** The connection state of the catalog. */
  readonly connectionState?: CatalogConnectionState;
  /** When the catalog was last connected. */
  readonly lastConnectionTime?: Date;
  /** When the catalog was last synced. */
  readonly lastSyncTime?: Date;
}

export function catalogPropertiesSerializer(item: CatalogProperties): any {
  return {
    gitHub: !item["gitHub"] ? item["gitHub"] : gitCatalogSerializer(item["gitHub"]),
    adoGit: !item["adoGit"] ? item["adoGit"] : gitCatalogSerializer(item["adoGit"]),
    syncType: item["syncType"],
    autoImageBuildEnableStatus: item["autoImageBuildEnableStatus"],
    tags: item["tags"],
  };
}

export function catalogPropertiesDeserializer(item: any): CatalogProperties {
  return {
    gitHub: !item["gitHub"] ? item["gitHub"] : gitCatalogDeserializer(item["gitHub"]),
    adoGit: !item["adoGit"] ? item["adoGit"] : gitCatalogDeserializer(item["adoGit"]),
    syncType: item["syncType"],
    autoImageBuildEnableStatus: item["autoImageBuildEnableStatus"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    provisioningState: item["provisioningState"],
    syncState: item["syncState"],
    lastSyncStats: !item["lastSyncStats"]
      ? item["lastSyncStats"]
      : syncStatsDeserializer(item["lastSyncStats"]),
    connectionState: item["connectionState"],
    lastConnectionTime: !item["lastConnectionTime"]
      ? item["lastConnectionTime"]
      : new Date(item["lastConnectionTime"]),
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
  };
}

/** The synchronization state of the catalog. */
export enum KnownCatalogSyncState {
  /** Succeeded synchronization state. */
  Succeeded = "Succeeded",
  /** In progress synchronization state. */
  InProgress = "InProgress",
  /** Failed synchronization state. */
  Failed = "Failed",
  /** Canceled synchronization state. */
  Canceled = "Canceled",
}

/**
 * The synchronization state of the catalog. \
 * {@link KnownCatalogSyncState} can be used interchangeably with CatalogSyncState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded synchronization state. \
 * **InProgress**: In progress synchronization state. \
 * **Failed**: Failed synchronization state. \
 * **Canceled**: Canceled synchronization state.
 */
export type CatalogSyncState = string;

/** Stats of the synchronization. */
export interface SyncStats {
  /** Count of catalog items added during synchronization. */
  readonly added?: number;
  /** Count of catalog items updated during synchronization. */
  readonly updated?: number;
  /** Count of catalog items that were unchanged during synchronization. */
  readonly unchanged?: number;
  /** Count of catalog items removed during synchronization. */
  readonly removed?: number;
  /** Count of catalog items that had validation errors during synchronization. */
  readonly validationErrors?: number;
  /** Count of synchronization errors that occured during synchronization. */
  readonly synchronizationErrors?: number;
  /** Indicates catalog item types that were synced. */
  syncedCatalogItemTypes?: CatalogItemType[];
}

export function syncStatsDeserializer(item: any): SyncStats {
  return {
    added: item["added"],
    updated: item["updated"],
    unchanged: item["unchanged"],
    removed: item["removed"],
    validationErrors: item["validationErrors"],
    synchronizationErrors: item["synchronizationErrors"],
    syncedCatalogItemTypes: !item["syncedCatalogItemTypes"]
      ? item["syncedCatalogItemTypes"]
      : item["syncedCatalogItemTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The connection state of the catalog. */
export enum KnownCatalogConnectionState {
  /** Connected state. */
  Connected = "Connected",
  /** Disconnected state. */
  Disconnected = "Disconnected",
}

/**
 * The connection state of the catalog. \
 * {@link KnownCatalogConnectionState} can be used interchangeably with CatalogConnectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Connected state. \
 * **Disconnected**: Disconnected state.
 */
export type CatalogConnectionState = string;

/** Properties of a catalog. These properties can be updated after the resource has been created. */
export interface CatalogUpdateProperties {
  /** Properties for a GitHub catalog type. */
  gitHub?: GitCatalog;
  /** Properties for an Azure DevOps catalog type. */
  adoGit?: GitCatalog;
  /** Indicates the type of sync that is configured for the catalog. */
  syncType?: CatalogSyncType;
  /** Indicates whether the catalog is configured to automatically build image definitions. Defaults to disabled for newly created catalogs. */
  autoImageBuildEnableStatus?: CatalogAutoImageBuildEnableStatus;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function catalogUpdatePropertiesSerializer(item: CatalogUpdateProperties): any {
  return {
    gitHub: !item["gitHub"] ? item["gitHub"] : gitCatalogSerializer(item["gitHub"]),
    adoGit: !item["adoGit"] ? item["adoGit"] : gitCatalogSerializer(item["adoGit"]),
    syncType: item["syncType"],
    autoImageBuildEnableStatus: item["autoImageBuildEnableStatus"],
    tags: item["tags"],
  };
}

export function catalogUpdatePropertiesDeserializer(item: any): CatalogUpdateProperties {
  return {
    gitHub: !item["gitHub"] ? item["gitHub"] : gitCatalogDeserializer(item["gitHub"]),
    adoGit: !item["adoGit"] ? item["adoGit"] : gitCatalogDeserializer(item["adoGit"]),
    syncType: item["syncType"],
    autoImageBuildEnableStatus: item["autoImageBuildEnableStatus"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties for a Git repository catalog. */
export interface GitCatalog {
  /** Git URI. */
  uri?: string;
  /** Git branch. */
  branch?: string;
  /** A reference to the Key Vault secret containing a security token to authenticate to a Git repository. */
  secretIdentifier?: string;
  /** The folder where the catalog items can be found inside the repository. */
  path?: string;
}

export function gitCatalogSerializer(item: GitCatalog): any {
  return {
    uri: item["uri"],
    branch: item["branch"],
    secretIdentifier: item["secretIdentifier"],
    path: item["path"],
  };
}

export function gitCatalogDeserializer(item: any): GitCatalog {
  return {
    uri: item["uri"],
    branch: item["branch"],
    secretIdentifier: item["secretIdentifier"],
    path: item["path"],
  };
}

/** Indicates the type of sync that is configured for the catalog. */
export enum KnownCatalogSyncType {
  /** Manual sync type. */
  Manual = "Manual",
  /** Scheduled sync type. */
  Scheduled = "Scheduled",
}

/**
 * Indicates the type of sync that is configured for the catalog. \
 * {@link KnownCatalogSyncType} can be used interchangeably with CatalogSyncType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Manual sync type. \
 * **Scheduled**: Scheduled sync type.
 */
export type CatalogSyncType = string;

/** Indicates whether auto image build is enabled/disabled for image definitions in the catalog. */
export enum KnownCatalogAutoImageBuildEnableStatus {
  /** Auto image build is disabled. */
  Disabled = "Disabled",
  /** Auto image build is enabled. */
  Enabled = "Enabled",
}

/**
 * Indicates whether auto image build is enabled/disabled for image definitions in the catalog. \
 * {@link KnownCatalogAutoImageBuildEnableStatus} can be used interchangeably with CatalogAutoImageBuildEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Auto image build is disabled. \
 * **Enabled**: Auto image build is enabled.
 */
export type CatalogAutoImageBuildEnableStatus = string;

/** The catalog's properties for partial update. Properties not provided in the update request will not be changed. */
export interface CatalogUpdate {
  /** Properties for a GitHub catalog type. */
  gitHub?: GitCatalog;
  /** Properties for an Azure DevOps catalog type. */
  adoGit?: GitCatalog;
  /** Indicates the type of sync that is configured for the catalog. */
  syncType?: CatalogSyncType;
  /** Indicates whether the catalog is configured to automatically build image definitions. Defaults to disabled for newly created catalogs. */
  autoImageBuildEnableStatus?: CatalogAutoImageBuildEnableStatus;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function catalogUpdateSerializer(item: CatalogUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "gitHub",
      "adoGit",
      "syncType",
      "autoImageBuildEnableStatus",
      "tags",
    ])
      ? undefined
      : _catalogUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of Catalog items */
export interface _CatalogListResult {
  /** The Catalog items on this page */
  readonly value: Catalog[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _catalogListResultDeserializer(item: any): _CatalogListResult {
  return {
    value: catalogArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function catalogArraySerializer(result: Array<Catalog>): any[] {
  return result.map((item) => {
    return catalogSerializer(item);
  });
}

export function catalogArrayDeserializer(result: Array<Catalog>): any[] {
  return result.map((item) => {
    return catalogDeserializer(item);
  });
}

/** Synchronization error details. */
export interface SyncErrorDetails {
  /** Error information for the overall synchronization operation. */
  readonly operationError?: CatalogErrorDetails;
  /** Catalog items that have conflicting names. */
  readonly conflicts?: CatalogConflictError[];
  /** Errors that occured during synchronization. */
  readonly errors?: CatalogSyncError[];
}

export function syncErrorDetailsDeserializer(item: any): SyncErrorDetails {
  return {
    operationError: !item["operationError"]
      ? item["operationError"]
      : catalogErrorDetailsDeserializer(item["operationError"]),
    conflicts: !item["conflicts"]
      ? item["conflicts"]
      : catalogConflictErrorArrayDeserializer(item["conflicts"]),
    errors: !item["errors"] ? item["errors"] : catalogSyncErrorArrayDeserializer(item["errors"]),
  };
}

/** Catalog error details */
export interface CatalogErrorDetails {
  /** An identifier for the error. */
  code?: string;
  /** A message describing the error. */
  message?: string;
}

export function catalogErrorDetailsDeserializer(item: any): CatalogErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function catalogConflictErrorArrayDeserializer(result: Array<CatalogConflictError>): any[] {
  return result.map((item) => {
    return catalogConflictErrorDeserializer(item);
  });
}

/** An individual conflict error. */
export interface CatalogConflictError {
  /** The path of the file that has a conflicting name. */
  readonly path?: string;
  /** Name of the conflicting catalog item. */
  readonly name?: string;
}

export function catalogConflictErrorDeserializer(item: any): CatalogConflictError {
  return {
    path: item["path"],
    name: item["name"],
  };
}

export function catalogSyncErrorArrayDeserializer(result: Array<CatalogSyncError>): any[] {
  return result.map((item) => {
    return catalogSyncErrorDeserializer(item);
  });
}

/** An individual synchronization error. */
export interface CatalogSyncError {
  /** The path of the file the error is associated with. */
  readonly path?: string;
  /** Errors associated with the file. */
  readonly errorDetails?: CatalogErrorDetails[];
}

export function catalogSyncErrorDeserializer(item: any): CatalogSyncError {
  return {
    path: item["path"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : catalogErrorDetailsArrayDeserializer(item["errorDetails"]),
  };
}

export function catalogErrorDetailsArrayDeserializer(result: Array<CatalogErrorDetails>): any[] {
  return result.map((item) => {
    return catalogErrorDetailsDeserializer(item);
  });
}

/** Represents an environment definition catalog item. */
export interface EnvironmentDefinition extends ProxyResource {
  /** Environment definition properties. */
  properties?: EnvironmentDefinitionProperties;
}

export function environmentDefinitionDeserializer(item: any): EnvironmentDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : environmentDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an environment definition. */
export interface EnvironmentDefinitionProperties {
  /** A short description of the environment definition. */
  readonly description?: string;
  /** Input parameters passed to an environment. */
  readonly parameters?: EnvironmentDefinitionParameter[];
  /** Path to the Environment Definition entrypoint file. */
  readonly templatePath?: string;
  /** Validation status for the environment definition. */
  readonly validationStatus?: CatalogResourceValidationStatus;
}

export function environmentDefinitionPropertiesDeserializer(
  item: any,
): EnvironmentDefinitionProperties {
  return {
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : environmentDefinitionParameterArrayDeserializer(item["parameters"]),
    templatePath: item["templatePath"],
    validationStatus: item["validationStatus"],
  };
}

export function environmentDefinitionParameterArrayDeserializer(
  result: Array<EnvironmentDefinitionParameter>,
): any[] {
  return result.map((item) => {
    return environmentDefinitionParameterDeserializer(item);
  });
}

/** Properties of an Environment Definition parameter. */
export interface EnvironmentDefinitionParameter {
  /** Unique ID of the parameter. */
  readonly id?: string;
  /** Display name of the parameter. */
  readonly name?: string;
  /** Description of the parameter. */
  readonly description?: string;
  /** A string of one of the basic JSON types (number, integer, array, object, boolean, string). */
  readonly type?: ParameterType;
  /** Whether or not this parameter is read-only.  If true, default should have a value. */
  readonly readOnly?: boolean;
  /** Whether or not this parameter is required. */
  readonly required?: boolean;
}

export function environmentDefinitionParameterDeserializer(
  item: any,
): EnvironmentDefinitionParameter {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    type: item["type"],
    readOnly: item["readOnly"],
    required: item["required"],
  };
}

/** The type of data a parameter accepts. */
export enum KnownParameterType {
  /** The parameter accepts an array of values. */
  Array = "array",
  /** The parameter accepts a boolean value. */
  Boolean = "boolean",
  /** The parameter accepts an integer value. */
  Integer = "integer",
  /** The parameter accepts a number value. */
  Number = "number",
  /** The parameter accepts an object value. */
  Object = "object",
  /** The parameter accepts a string value. */
  String = "string",
}

/**
 * The type of data a parameter accepts. \
 * {@link KnownParameterType} can be used interchangeably with ParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **array**: The parameter accepts an array of values. \
 * **boolean**: The parameter accepts a boolean value. \
 * **integer**: The parameter accepts an integer value. \
 * **number**: The parameter accepts a number value. \
 * **object**: The parameter accepts an object value. \
 * **string**: The parameter accepts a string value.
 */
export type ParameterType = string;

/** Catalog resource validation status. */
export enum KnownCatalogResourceValidationStatus {
  /** Unknown validation status. */
  Unknown = "Unknown",
  /** Pending validation status. */
  Pending = "Pending",
  /** Succeeded validation status. */
  Succeeded = "Succeeded",
  /** Failed validation status. */
  Failed = "Failed",
}

/**
 * Catalog resource validation status. \
 * {@link KnownCatalogResourceValidationStatus} can be used interchangeably with CatalogResourceValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown validation status. \
 * **Pending**: Pending validation status. \
 * **Succeeded**: Succeeded validation status. \
 * **Failed**: Failed validation status.
 */
export type CatalogResourceValidationStatus = string;

/** Paged collection of EnvironmentDefinition items */
export interface _EnvironmentDefinitionListResult {
  /** The EnvironmentDefinition items on this page */
  readonly value: EnvironmentDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _environmentDefinitionListResultDeserializer(
  item: any,
): _EnvironmentDefinitionListResult {
  return {
    value: environmentDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentDefinitionArrayDeserializer(
  result: Array<EnvironmentDefinition>,
): any[] {
  return result.map((item) => {
    return environmentDefinitionDeserializer(item);
  });
}

/** List of validator error details. Populated when changes are made to the resource or its dependent resources that impact the validity of the Catalog resource. */
export interface CatalogResourceValidationErrorDetails {
  /** Errors associated with resources synchronized from the catalog. */
  readonly errors?: CatalogErrorDetails[];
}

export function catalogResourceValidationErrorDetailsDeserializer(
  item: any,
): CatalogResourceValidationErrorDetails {
  return {
    errors: !item["errors"] ? item["errors"] : catalogErrorDetailsArrayDeserializer(item["errors"]),
  };
}

/** Represents a gallery. */
export interface Gallery extends ProxyResource {
  /** Gallery properties. */
  properties?: GalleryProperties;
}

export function gallerySerializer(item: Gallery): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : galleryPropertiesSerializer(item["properties"]),
  };
}

export function galleryDeserializer(item: any): Gallery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : galleryPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a gallery. */
export interface GalleryProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource ID of the backing Azure Compute Gallery. */
  galleryResourceId: string;
}

export function galleryPropertiesSerializer(item: GalleryProperties): any {
  return { galleryResourceId: item["galleryResourceId"] };
}

export function galleryPropertiesDeserializer(item: any): GalleryProperties {
  return {
    provisioningState: item["provisioningState"],
    galleryResourceId: item["galleryResourceId"],
  };
}

/** Paged collection of Gallery items */
export interface _GalleryListResult {
  /** The Gallery items on this page */
  readonly value: Gallery[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryListResultDeserializer(item: any): _GalleryListResult {
  return {
    value: galleryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryArraySerializer(result: Array<Gallery>): any[] {
  return result.map((item) => {
    return gallerySerializer(item);
  });
}

export function galleryArrayDeserializer(result: Array<Gallery>): any[] {
  return result.map((item) => {
    return galleryDeserializer(item);
  });
}

/** Represents an image version. */
export interface ImageVersion extends ProxyResource {
  /** Image version properties. */
  properties?: ImageVersionProperties;
}

export function imageVersionDeserializer(item: any): ImageVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imageVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an image version. */
export interface ImageVersionProperties {
  /** The semantic version string. */
  readonly name?: string;
  /** The datetime that the backing image version was published. */
  readonly publishedDate?: Date;
  /** If the version should be excluded from being treated as the latest version. */
  readonly excludeFromLatest?: boolean;
  /** The size of the OS disk image, in GB. */
  readonly osDiskImageSizeInGb?: number;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function imageVersionPropertiesDeserializer(item: any): ImageVersionProperties {
  return {
    name: item["name"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    excludeFromLatest: item["excludeFromLatest"],
    osDiskImageSizeInGb: item["osDiskImageSizeInGb"],
    provisioningState: item["provisioningState"],
  };
}

/** Paged collection of ImageVersion items */
export interface _ImageVersionListResult {
  /** The ImageVersion items on this page */
  readonly value: ImageVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageVersionListResultDeserializer(item: any): _ImageVersionListResult {
  return {
    value: imageVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageVersionArrayDeserializer(result: Array<ImageVersion>): any[] {
  return result.map((item) => {
    return imageVersionDeserializer(item);
  });
}

/** Represents an environment type. */
export interface EnvironmentType extends ProxyResource {
  /** Properties of an environment type. */
  properties?: EnvironmentTypeProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function environmentTypeSerializer(item: EnvironmentType): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : environmentTypePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function environmentTypeDeserializer(item: any): EnvironmentType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : environmentTypePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of an environment type. */
export interface EnvironmentTypeProperties extends EnvironmentTypeUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function environmentTypePropertiesSerializer(item: EnvironmentTypeProperties): any {
  return { displayName: item["displayName"] };
}

export function environmentTypePropertiesDeserializer(item: any): EnvironmentTypeProperties {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
  };
}

/** Properties of an environment type. These properties can be updated after the resource has been created. */
export interface EnvironmentTypeUpdateProperties {
  /** The display name of the environment type. */
  displayName?: string;
}

export function environmentTypeUpdatePropertiesSerializer(
  item: EnvironmentTypeUpdateProperties,
): any {
  return { displayName: item["displayName"] };
}

export function environmentTypeUpdatePropertiesDeserializer(
  item: any,
): EnvironmentTypeUpdateProperties {
  return {
    displayName: item["displayName"],
  };
}

/** The environment type for partial update. Properties not provided in the update request will not be changed. */
export interface EnvironmentTypeUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The display name of the environment type. */
  displayName?: string;
}

export function environmentTypeUpdateSerializer(item: EnvironmentTypeUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName"])
      ? undefined
      : _environmentTypeUpdatePropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Paged collection of EnvironmentType items */
export interface _EnvironmentTypeListResult {
  /** The EnvironmentType items on this page */
  readonly value: EnvironmentType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _environmentTypeListResultDeserializer(item: any): _EnvironmentTypeListResult {
  return {
    value: environmentTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function environmentTypeArraySerializer(result: Array<EnvironmentType>): any[] {
  return result.map((item) => {
    return environmentTypeSerializer(item);
  });
}

export function environmentTypeArrayDeserializer(result: Array<EnvironmentType>): any[] {
  return result.map((item) => {
    return environmentTypeDeserializer(item);
  });
}

/** Represents an environment type. */
export interface ProjectEnvironmentType extends TrackedResource {
  /** Properties of an environment type. */
  properties?: ProjectEnvironmentTypeProperties;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
}

export function projectEnvironmentTypeSerializer(item: ProjectEnvironmentType): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : projectEnvironmentTypePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function projectEnvironmentTypeDeserializer(item: any): ProjectEnvironmentType {
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
      : projectEnvironmentTypePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a project environment type. */
export interface ProjectEnvironmentTypeProperties extends ProjectEnvironmentTypeUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The number of environments of this type. */
  readonly environmentCount?: number;
}

export function projectEnvironmentTypePropertiesSerializer(
  item: ProjectEnvironmentTypeProperties,
): any {
  return {
    deploymentTargetId: item["deploymentTargetId"],
    displayName: item["displayName"],
    status: item["status"],
    creatorRoleAssignment: !item["creatorRoleAssignment"]
      ? item["creatorRoleAssignment"]
      : projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentSerializer(
          item["creatorRoleAssignment"],
        ),
    userRoleAssignments: !item["userRoleAssignments"]
      ? item["userRoleAssignments"]
      : userRoleAssignmentValueRecordSerializer(item["userRoleAssignments"]),
  };
}

export function projectEnvironmentTypePropertiesDeserializer(
  item: any,
): ProjectEnvironmentTypeProperties {
  return {
    deploymentTargetId: item["deploymentTargetId"],
    displayName: item["displayName"],
    status: item["status"],
    creatorRoleAssignment: !item["creatorRoleAssignment"]
      ? item["creatorRoleAssignment"]
      : projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentDeserializer(
          item["creatorRoleAssignment"],
        ),
    userRoleAssignments: !item["userRoleAssignments"]
      ? item["userRoleAssignments"]
      : userRoleAssignmentValueRecordDeserializer(item["userRoleAssignments"]),
    provisioningState: item["provisioningState"],
    environmentCount: item["environmentCount"],
  };
}

/** Properties of a project environment type. These properties can be updated after the resource has been created. */
export interface ProjectEnvironmentTypeUpdateProperties {
  /** Id of a subscription that the environment type will be mapped to. The environment's resources will be deployed into this subscription. */
  deploymentTargetId?: string;
  /** The display name of the project environment type. */
  displayName?: string;
  /** Defines whether this Environment Type can be used in this Project. */
  status?: EnvironmentTypeEnableStatus;
  /** The role definition assigned to the environment creator on backing resources. */
  creatorRoleAssignment?: ProjectEnvironmentTypeUpdatePropertiesCreatorRoleAssignment;
  /** Role Assignments created on environment backing resources. This is a mapping from a user object ID to an object of role definition IDs. */
  userRoleAssignments?: Record<string, UserRoleAssignmentValue>;
}

export function projectEnvironmentTypeUpdatePropertiesSerializer(
  item: ProjectEnvironmentTypeUpdateProperties,
): any {
  return {
    deploymentTargetId: item["deploymentTargetId"],
    displayName: item["displayName"],
    status: item["status"],
    creatorRoleAssignment: !item["creatorRoleAssignment"]
      ? item["creatorRoleAssignment"]
      : projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentSerializer(
          item["creatorRoleAssignment"],
        ),
    userRoleAssignments: !item["userRoleAssignments"]
      ? item["userRoleAssignments"]
      : userRoleAssignmentValueRecordSerializer(item["userRoleAssignments"]),
  };
}

export function projectEnvironmentTypeUpdatePropertiesDeserializer(
  item: any,
): ProjectEnvironmentTypeUpdateProperties {
  return {
    deploymentTargetId: item["deploymentTargetId"],
    displayName: item["displayName"],
    status: item["status"],
    creatorRoleAssignment: !item["creatorRoleAssignment"]
      ? item["creatorRoleAssignment"]
      : projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentDeserializer(
          item["creatorRoleAssignment"],
        ),
    userRoleAssignments: !item["userRoleAssignments"]
      ? item["userRoleAssignments"]
      : userRoleAssignmentValueRecordDeserializer(item["userRoleAssignments"]),
  };
}

/** Indicates whether the environment type is either enabled or disabled. */
export enum KnownEnvironmentTypeEnableStatus {
  /** Environment type is enabled. */
  Enabled = "Enabled",
  /** Environment type is disabled. */
  Disabled = "Disabled",
}

/**
 * Indicates whether the environment type is either enabled or disabled. \
 * {@link KnownEnvironmentTypeEnableStatus} can be used interchangeably with EnvironmentTypeEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Environment type is enabled. \
 * **Disabled**: Environment type is disabled.
 */
export type EnvironmentTypeEnableStatus = string;

/** The role definition assigned to the environment creator on backing resources. */
export interface ProjectEnvironmentTypeUpdatePropertiesCreatorRoleAssignment {
  /** A map of roles to assign to the environment creator. */
  roles?: Record<string, EnvironmentRole>;
}

export function projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentSerializer(
  item: ProjectEnvironmentTypeUpdatePropertiesCreatorRoleAssignment,
): any {
  return { roles: !item["roles"] ? item["roles"] : environmentRoleRecordSerializer(item["roles"]) };
}

export function projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentDeserializer(
  item: any,
): ProjectEnvironmentTypeUpdatePropertiesCreatorRoleAssignment {
  return {
    roles: !item["roles"] ? item["roles"] : environmentRoleRecordDeserializer(item["roles"]),
  };
}

export function environmentRoleRecordSerializer(
  item: Record<string, EnvironmentRole>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : environmentRoleSerializer(item[key]);
  });
  return result;
}

export function environmentRoleRecordDeserializer(
  item: Record<string, any>,
): Record<string, EnvironmentRole> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : environmentRoleDeserializer(item[key]);
  });
  return result;
}

/** A role that can be assigned to a user. */
export interface EnvironmentRole {
  /** The common name of the Role Assignment. This is a descriptive name such as 'AcrPush'. */
  readonly roleName?: string;
  /** This is a description of the Role Assignment. */
  readonly description?: string;
}

export function environmentRoleSerializer(_item: EnvironmentRole): any {
  return {};
}

export function environmentRoleDeserializer(item: any): EnvironmentRole {
  return {
    roleName: item["roleName"],
    description: item["description"],
  };
}

export function userRoleAssignmentValueRecordSerializer(
  item: Record<string, UserRoleAssignmentValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userRoleAssignmentValueSerializer(item[key]);
  });
  return result;
}

export function userRoleAssignmentValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserRoleAssignmentValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userRoleAssignmentValueDeserializer(item[key]);
  });
  return result;
}

/** Mapping of user object ID to role assignments. */
export interface UserRoleAssignmentValue {
  /** A map of roles to assign to the parent user. */
  roles?: Record<string, EnvironmentRole>;
}

export function userRoleAssignmentValueSerializer(item: UserRoleAssignmentValue): any {
  return { roles: !item["roles"] ? item["roles"] : environmentRoleRecordSerializer(item["roles"]) };
}

export function userRoleAssignmentValueDeserializer(item: any): UserRoleAssignmentValue {
  return {
    roles: !item["roles"] ? item["roles"] : environmentRoleRecordDeserializer(item["roles"]),
  };
}

/** The project environment type for partial update. Properties not provided in the update request will not be changed. */
export interface ProjectEnvironmentTypeUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
  /** Id of a subscription that the environment type will be mapped to. The environment's resources will be deployed into this subscription. */
  deploymentTargetId?: string;
  /** The display name of the project environment type. */
  displayName?: string;
  /** Defines whether this Environment Type can be used in this Project. */
  status?: EnvironmentTypeEnableStatus;
  /** The role definition assigned to the environment creator on backing resources. */
  creatorRoleAssignment?: ProjectEnvironmentTypeUpdatePropertiesCreatorRoleAssignment;
  /** Role Assignments created on environment backing resources. This is a mapping from a user object ID to an object of role definition IDs. */
  userRoleAssignments?: Record<string, UserRoleAssignmentValue>;
}

export function projectEnvironmentTypeUpdateSerializer(item: ProjectEnvironmentTypeUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "deploymentTargetId",
      "displayName",
      "status",
      "creatorRoleAssignment",
      "userRoleAssignments",
    ])
      ? undefined
      : _projectEnvironmentTypeUpdatePropertiesSerializer(item),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Paged collection of ProjectEnvironmentType items */
export interface _ProjectEnvironmentTypeListResult {
  /** The ProjectEnvironmentType items on this page */
  readonly value: ProjectEnvironmentType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _projectEnvironmentTypeListResultDeserializer(
  item: any,
): _ProjectEnvironmentTypeListResult {
  return {
    value: projectEnvironmentTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectEnvironmentTypeArraySerializer(
  result: Array<ProjectEnvironmentType>,
): any[] {
  return result.map((item) => {
    return projectEnvironmentTypeSerializer(item);
  });
}

export function projectEnvironmentTypeArrayDeserializer(
  result: Array<ProjectEnvironmentType>,
): any[] {
  return result.map((item) => {
    return projectEnvironmentTypeDeserializer(item);
  });
}

/** Represents a definition for a Developer Machine. */
export interface DevBoxDefinition extends TrackedResource {
  /** Dev Box definition properties */
  properties?: DevBoxDefinitionProperties;
}

export function devBoxDefinitionSerializer(item: DevBoxDefinition): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : devBoxDefinitionPropertiesSerializer(item["properties"]),
  };
}

export function devBoxDefinitionDeserializer(item: any): DevBoxDefinition {
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
      : devBoxDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Dev Box definition. */
export interface DevBoxDefinitionProperties extends DevBoxDefinitionUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Validation status of the configured image. */
  readonly imageValidationStatus?: ImageValidationStatus;
  /** Details for image validator error. Populated when the image validation is not successful. */
  readonly imageValidationErrorDetails?: ImageValidationErrorDetails;
  /** Validation status for the Dev Box Definition. */
  readonly validationStatus?: CatalogResourceValidationStatus;
  /** Image reference information for the currently active image (only populated during updates). */
  readonly activeImageReference?: ImageReference;
}

export function devBoxDefinitionPropertiesSerializer(item: DevBoxDefinitionProperties): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    osStorageType: item["osStorageType"],
    hibernateSupport: item["hibernateSupport"],
  };
}

export function devBoxDefinitionPropertiesDeserializer(item: any): DevBoxDefinitionProperties {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    osStorageType: item["osStorageType"],
    hibernateSupport: item["hibernateSupport"],
    provisioningState: item["provisioningState"],
    imageValidationStatus: item["imageValidationStatus"],
    imageValidationErrorDetails: !item["imageValidationErrorDetails"]
      ? item["imageValidationErrorDetails"]
      : imageValidationErrorDetailsDeserializer(item["imageValidationErrorDetails"]),
    validationStatus: item["validationStatus"],
    activeImageReference: !item["activeImageReference"]
      ? item["activeImageReference"]
      : imageReferenceDeserializer(item["activeImageReference"]),
  };
}

/** Image validation status. */
export enum KnownImageValidationStatus {
  /** Unknown image validation status. */
  Unknown = "Unknown",
  /** Pending image validation status. */
  Pending = "Pending",
  /** Succeeded image validation status. */
  Succeeded = "Succeeded",
  /** Failed image validation status. */
  Failed = "Failed",
  /** Timed out image validation status. */
  TimedOut = "TimedOut",
}

/**
 * Image validation status. \
 * {@link KnownImageValidationStatus} can be used interchangeably with ImageValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown image validation status. \
 * **Pending**: Pending image validation status. \
 * **Succeeded**: Succeeded image validation status. \
 * **Failed**: Failed image validation status. \
 * **TimedOut**: Timed out image validation status.
 */
export type ImageValidationStatus = string;

/** Image validation error details. */
export interface ImageValidationErrorDetails {
  /** An identifier for the error. */
  code?: string;
  /** A message describing the error. */
  message?: string;
}

export function imageValidationErrorDetailsDeserializer(item: any): ImageValidationErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Image reference information. */
export interface ImageReference {
  /** Image ID, or Image version ID. When Image ID is provided, its latest version will be used. */
  id?: string;
  /** The actual version of the image after use. When id references a gallery image latest version, this will indicate the actual version in use. */
  readonly exactVersion?: string;
}

export function imageReferenceSerializer(item: ImageReference): any {
  return { id: item["id"] };
}

export function imageReferenceDeserializer(item: any): ImageReference {
  return {
    id: item["id"],
    exactVersion: item["exactVersion"],
  };
}

/** Properties of a Dev Box definition. These properties can be updated after the resource has been created. */
export interface DevBoxDefinitionUpdateProperties {
  /** Image reference information. */
  imageReference?: ImageReference;
  /** The SKU for Dev Boxes created using this definition. */
  sku?: Sku;
  /** The storage type used for the Operating System disk of Dev Boxes created using this definition. */
  osStorageType?: string;
  /** Indicates whether Dev Boxes created with this definition are capable of hibernation. Not all images are capable of supporting hibernation. To find out more see https://aka.ms/devbox/hibernate */
  hibernateSupport?: HibernateSupport;
}

export function devBoxDefinitionUpdatePropertiesSerializer(
  item: DevBoxDefinitionUpdateProperties,
): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    osStorageType: item["osStorageType"],
    hibernateSupport: item["hibernateSupport"],
  };
}

export function devBoxDefinitionUpdatePropertiesDeserializer(
  item: any,
): DevBoxDefinitionUpdateProperties {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    osStorageType: item["osStorageType"],
    hibernateSupport: item["hibernateSupport"],
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

/** Partial update of a Dev Box definition resource. */
export interface DevBoxDefinitionUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Image reference information. */
  imageReference?: ImageReference;
  /** The SKU for Dev Boxes created using this definition. */
  sku?: Sku;
  /** The storage type used for the Operating System disk of Dev Boxes created using this definition. */
  osStorageType?: string;
  /** Indicates whether Dev Boxes created with this definition are capable of hibernation. Not all images are capable of supporting hibernation. To find out more see https://aka.ms/devbox/hibernate */
  hibernateSupport?: HibernateSupport;
}

export function devBoxDefinitionUpdateSerializer(item: DevBoxDefinitionUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "imageReference",
      "sku",
      "osStorageType",
      "hibernateSupport",
    ])
      ? undefined
      : _devBoxDefinitionUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of DevBoxDefinition items */
export interface _DevBoxDefinitionListResult {
  /** The DevBoxDefinition items on this page */
  readonly value: DevBoxDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _devBoxDefinitionListResultDeserializer(item: any): _DevBoxDefinitionListResult {
  return {
    value: devBoxDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devBoxDefinitionArraySerializer(result: Array<DevBoxDefinition>): any[] {
  return result.map((item) => {
    return devBoxDefinitionSerializer(item);
  });
}

export function devBoxDefinitionArrayDeserializer(result: Array<DevBoxDefinition>): any[] {
  return result.map((item) => {
    return devBoxDefinitionDeserializer(item);
  });
}

/** Represents a Task to be used in customizing a Dev Box. */
export interface CustomizationTask extends ProxyResource {
  /** Task properties */
  properties?: CustomizationTaskProperties;
}

export function customizationTaskDeserializer(item: any): CustomizationTask {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : customizationTaskPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Task. */
export interface CustomizationTaskProperties {
  /** Inputs to the task. */
  readonly inputs?: Record<string, CustomizationTaskInput>;
  /** The default timeout for the task. */
  readonly timeout?: number;
  /** Validation status for the Task. */
  readonly validationStatus?: CatalogResourceValidationStatus;
}

export function customizationTaskPropertiesDeserializer(item: any): CustomizationTaskProperties {
  return {
    inputs: !item["inputs"]
      ? item["inputs"]
      : customizationTaskInputRecordDeserializer(item["inputs"]),
    timeout: item["timeout"],
    validationStatus: item["validationStatus"],
  };
}

export function customizationTaskInputRecordDeserializer(
  item: Record<string, any>,
): Record<string, CustomizationTaskInput> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customizationTaskInputDeserializer(item[key]);
  });
  return result;
}

/** Input for a Task. */
export interface CustomizationTaskInput {
  /** Description of the input. */
  readonly description?: string;
  /** Type of the input. */
  readonly type?: CustomizationTaskInputType;
  /** Whether or not the input is required. */
  readonly required?: boolean;
}

export function customizationTaskInputDeserializer(item: any): CustomizationTaskInput {
  return {
    description: item["description"],
    type: item["type"],
    required: item["required"],
  };
}

/** Type of the input. */
export enum KnownCustomizationTaskInputType {
  /** The parameter accepts a string value. */
  String = "string",
  /** The parameter accepts a number value. */
  Number = "number",
  /** The parameter accepts a boolean value. */
  Boolean = "boolean",
}

/**
 * Type of the input. \
 * {@link KnownCustomizationTaskInputType} can be used interchangeably with CustomizationTaskInputType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: The parameter accepts a string value. \
 * **number**: The parameter accepts a number value. \
 * **boolean**: The parameter accepts a boolean value.
 */
export type CustomizationTaskInputType = string;

/** Paged collection of CustomizationTask items */
export interface _CustomizationTaskListResult {
  /** The CustomizationTask items on this page */
  readonly value: CustomizationTask[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customizationTaskListResultDeserializer(item: any): _CustomizationTaskListResult {
  return {
    value: customizationTaskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customizationTaskArrayDeserializer(result: Array<CustomizationTask>): any[] {
  return result.map((item) => {
    return customizationTaskDeserializer(item);
  });
}

/** Represents a definition for an Image. */
export interface ImageDefinition extends ProxyResource {
  /** Image Definition properties */
  properties?: ImageDefinitionProperties;
}

export function imageDefinitionDeserializer(item: any): ImageDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imageDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an Image Definition. */
export interface ImageDefinitionProperties {
  /** Image reference information. */
  imageReference?: ImageReference;
  /** The URL to the repository file containing the image definition. */
  readonly fileUrl?: string;
  /** Details about the latest build. */
  latestBuild?: LatestImageBuild;
  /** Validation status of the configured image. */
  readonly imageValidationStatus?: ImageValidationStatus;
  /** Details for image validator error. Populated when the image validation is not successful. */
  readonly imageValidationErrorDetails?: ImageValidationErrorDetails;
  /** Validation status for the Image Definition. */
  readonly validationStatus?: CatalogResourceValidationStatus;
  /** Image reference information for the currently active image (only populated during updates). */
  readonly activeImageReference?: ImageReference;
  /** Indicates if automatic image builds will be triggered for image definition updates */
  readonly autoImageBuild?: AutoImageBuildStatus;
  /** Tasks to run at Dev Box provisioning time. */
  tasks?: CustomizationTaskInstance[];
  /** Tasks to run when a user first logs into a Dev Box. */
  userTasks?: CustomizationTaskInstance[];
  /** Another Image Definition that this one extends. */
  extends?: ImageDefinitionReference;
}

export function imageDefinitionPropertiesDeserializer(item: any): ImageDefinitionProperties {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    fileUrl: item["fileUrl"],
    latestBuild: !item["latestBuild"]
      ? item["latestBuild"]
      : latestImageBuildDeserializer(item["latestBuild"]),
    imageValidationStatus: item["imageValidationStatus"],
    imageValidationErrorDetails: !item["imageValidationErrorDetails"]
      ? item["imageValidationErrorDetails"]
      : imageValidationErrorDetailsDeserializer(item["imageValidationErrorDetails"]),
    validationStatus: item["validationStatus"],
    activeImageReference: !item["activeImageReference"]
      ? item["activeImageReference"]
      : imageReferenceDeserializer(item["activeImageReference"]),
    autoImageBuild: item["autoImageBuild"],
    tasks: !item["tasks"]
      ? item["tasks"]
      : customizationTaskInstanceArrayDeserializer(item["tasks"]),
    userTasks: !item["userTasks"]
      ? item["userTasks"]
      : customizationTaskInstanceArrayDeserializer(item["userTasks"]),
    extends: !item["extends"]
      ? item["extends"]
      : imageDefinitionReferenceDeserializer(item["extends"]),
  };
}

/** Details about the latest build. */
export interface LatestImageBuild {
  /** Identifier of a build. */
  readonly name?: string;
  /** Start time of the task group. */
  readonly startTime?: Date;
  /** End time of the task group. */
  readonly endTime?: Date;
  /** The state of an Image Definition Build. */
  readonly status?: ImageDefinitionBuildStatus;
}

export function latestImageBuildDeserializer(item: any): LatestImageBuild {
  return {
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
  };
}

/** The state of an Image Definition Build. */
export enum KnownImageDefinitionBuildStatus {
  /** The image build has succeeded. */
  Succeeded = "Succeeded",
  /** The image build is running. */
  Running = "Running",
  /** The built image has failed validation. */
  ValidationFailed = "ValidationFailed",
  /** The image build has failed. */
  Failed = "Failed",
  /** The image build has been cancelled. */
  Cancelled = "Cancelled",
  /** The image build has timed out. */
  TimedOut = "TimedOut",
}

/**
 * The state of an Image Definition Build. \
 * {@link KnownImageDefinitionBuildStatus} can be used interchangeably with ImageDefinitionBuildStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The image build has succeeded. \
 * **Running**: The image build is running. \
 * **ValidationFailed**: The built image has failed validation. \
 * **Failed**: The image build has failed. \
 * **Cancelled**: The image build has been cancelled. \
 * **TimedOut**: The image build has timed out.
 */
export type ImageDefinitionBuildStatus = string;

/** Indicates whether auto image build is enabled/disabled. */
export enum KnownAutoImageBuildStatus {
  /** Auto image build is disabled. */
  Disabled = "Disabled",
  /** Auto image build is enabled. */
  Enabled = "Enabled",
}

/**
 * Indicates whether auto image build is enabled/disabled. \
 * {@link KnownAutoImageBuildStatus} can be used interchangeably with AutoImageBuildStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Auto image build is disabled. \
 * **Enabled**: Auto image build is enabled.
 */
export type AutoImageBuildStatus = string;

export function customizationTaskInstanceArrayDeserializer(
  result: Array<CustomizationTaskInstance>,
): any[] {
  return result.map((item) => {
    return customizationTaskInstanceDeserializer(item);
  });
}

/** A customization task to run. */
export interface CustomizationTaskInstance {
  /** Name of the task. */
  name: string;
  /** Parameters for the task. */
  parameters?: DefinitionParametersItem[];
  /** Display name to help differentiate multiple instances of the same task. */
  displayName?: string;
  /** Timeout, in seconds. Overrides any timeout provided on the task definition. */
  timeoutInSeconds?: number;
  /** An expression that must evaluate to true in order for the task to run. */
  condition?: string;
}

export function customizationTaskInstanceDeserializer(item: any): CustomizationTaskInstance {
  return {
    name: item["name"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : definitionParametersItemArrayDeserializer(item["parameters"]),
    displayName: item["displayName"],
    timeoutInSeconds: item["timeoutInSeconds"],
    condition: item["condition"],
  };
}

export function definitionParametersItemArrayDeserializer(
  result: Array<DefinitionParametersItem>,
): any[] {
  return result.map((item) => {
    return definitionParametersItemDeserializer(item);
  });
}

/** Parameters for the task. */
export interface DefinitionParametersItem {
  /** Name of the parameter. */
  name: string;
  /** value of the parameter. */
  value: string;
}

export function definitionParametersItemDeserializer(item: any): DefinitionParametersItem {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** A reference to an Image Definition. */
export interface ImageDefinitionReference {
  /** Name of the referenced Image Definition. */
  imageDefinition: string;
  /** Parameters for the referenced Image Definition. */
  parameters?: DefinitionParametersItem[];
}

export function imageDefinitionReferenceDeserializer(item: any): ImageDefinitionReference {
  return {
    imageDefinition: item["imageDefinition"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : definitionParametersItemArrayDeserializer(item["parameters"]),
  };
}

/** Paged collection of ImageDefinition items */
export interface _ImageDefinitionListResult {
  /** The ImageDefinition items on this page */
  readonly value: ImageDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageDefinitionListResultDeserializer(item: any): _ImageDefinitionListResult {
  return {
    value: imageDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageDefinitionArrayDeserializer(result: Array<ImageDefinition>): any[] {
  return result.map((item) => {
    return imageDefinitionDeserializer(item);
  });
}

/** Represents a specific build of an Image Definition. */
export interface ImageDefinitionBuild extends ProxyResource {
  /** Image Definition Build properties */
  properties?: ImageDefinitionBuildProperties;
}

export function imageDefinitionBuildDeserializer(item: any): ImageDefinitionBuild {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imageDefinitionBuildPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an Image Definition Build. */
export interface ImageDefinitionBuildProperties {
  /** The specific image version used by the build. */
  readonly imageReference?: ImageReference;
  /** The status of the build. */
  readonly status?: ImageDefinitionBuildStatus;
  /** Start time of the task group. */
  readonly startTime?: Date;
  /** End time of the task group. */
  readonly endTime?: Date;
  /** Details for image creation error. Populated when the image creation is not successful. */
  readonly errorDetails?: ImageCreationErrorDetails;
}

export function imageDefinitionBuildPropertiesDeserializer(
  item: any,
): ImageDefinitionBuildProperties {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : imageCreationErrorDetailsDeserializer(item["errorDetails"]),
  };
}

/** Image creation error details. */
export interface ImageCreationErrorDetails {
  /** An identifier for the error. */
  code?: string;
  /** A message describing the error. */
  message?: string;
}

export function imageCreationErrorDetailsDeserializer(item: any): ImageCreationErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Represents a specific build of an Image Definition. */
export interface ImageDefinitionBuildDetails extends ProxyResource {
  /** The specific image version used by the build. */
  readonly imageReference?: ImageReference;
  /** The status of the build. */
  readonly status?: ImageDefinitionBuildStatus;
  /** Start time of the task group. */
  readonly startTime?: Date;
  /** End time of the task group. */
  readonly endTime?: Date;
  /** Details for image creation error. Populated when the image creation is not successful. */
  readonly errorDetails?: ImageCreationErrorDetails;
  /** The list of task groups executed during the image definition build. */
  readonly taskGroups?: ImageDefinitionBuildTaskGroup[];
}

export function imageDefinitionBuildDetailsDeserializer(item: any): ImageDefinitionBuildDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : imageCreationErrorDetailsDeserializer(item["errorDetails"]),
    taskGroups: !item["taskGroups"]
      ? item["taskGroups"]
      : imageDefinitionBuildTaskGroupArrayDeserializer(item["taskGroups"]),
  };
}

export function imageDefinitionBuildTaskGroupArrayDeserializer(
  result: Array<ImageDefinitionBuildTaskGroup>,
): any[] {
  return result.map((item) => {
    return imageDefinitionBuildTaskGroupDeserializer(item);
  });
}

/** A task group executed during the image definition build. */
export interface ImageDefinitionBuildTaskGroup {
  /** The name of the task group. */
  readonly name?: string;
  /** The status of the task group. */
  readonly status?: ImageDefinitionBuildStatus;
  /** Start time of the task group. */
  readonly startTime?: Date;
  /** End time of the task group. */
  readonly endTime?: Date;
  /** The list of tasks executed during the task group. */
  readonly tasks?: ImageDefinitionBuildTask[];
}

export function imageDefinitionBuildTaskGroupDeserializer(
  item: any,
): ImageDefinitionBuildTaskGroup {
  return {
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    tasks: !item["tasks"]
      ? item["tasks"]
      : imageDefinitionBuildTaskArrayDeserializer(item["tasks"]),
  };
}

export function imageDefinitionBuildTaskArrayDeserializer(
  result: Array<ImageDefinitionBuildTask>,
): any[] {
  return result.map((item) => {
    return imageDefinitionBuildTaskDeserializer(item);
  });
}

/** A task executed during the image definition build. */
export interface ImageDefinitionBuildTask {
  /** The name of the task. */
  name?: string;
  /** Parameters for the task. */
  parameters?: ImageDefinitionBuildTaskParametersItem[];
  /** Display name to help differentiate multiple instances of the same task. */
  displayName?: string;
  /** ID of the task instance. */
  readonly id?: string;
  /** Start time of the task. */
  readonly startTime?: Date;
  /** End time of the task. */
  readonly endTime?: Date;
  /** The status of the task. */
  readonly status?: ImageDefinitionBuildStatus;
  /** The URI for retrieving logs for the task execution. */
  readonly logUri?: string;
}

export function imageDefinitionBuildTaskDeserializer(item: any): ImageDefinitionBuildTask {
  return {
    name: item["name"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : imageDefinitionBuildTaskParametersItemArrayDeserializer(item["parameters"]),
    displayName: item["displayName"],
    id: item["id"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    logUri: item["logUri"],
  };
}

export function imageDefinitionBuildTaskParametersItemArrayDeserializer(
  result: Array<ImageDefinitionBuildTaskParametersItem>,
): any[] {
  return result.map((item) => {
    return imageDefinitionBuildTaskParametersItemDeserializer(item);
  });
}

/** Parameters for an image definition build task. */
export interface ImageDefinitionBuildTaskParametersItem {
  /** Key of the parameter. */
  key: string;
  /** Value of the parameter. */
  value: string;
}

export function imageDefinitionBuildTaskParametersItemDeserializer(
  item: any,
): ImageDefinitionBuildTaskParametersItem {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** A pool of Virtual Machines. */
export interface Pool extends TrackedResource {
  /** Pool properties */
  properties?: PoolProperties;
}

export function poolSerializer(item: Pool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : poolPropertiesSerializer(item["properties"]),
  };
}

export function poolDeserializer(item: any): Pool {
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
      : poolPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Pool. */
export interface PoolProperties extends PoolUpdateProperties {
  /** Overall health status of the Pool. Indicates whether or not the Pool is available to create Dev Boxes. */
  readonly healthStatus?: HealthStatus;
  /** Details on the Pool health status to help diagnose issues. This is only populated when the pool status indicates the pool is in a non-healthy state */
  readonly healthStatusDetails?: HealthStatusDetail[];
  /** Indicates the number of provisioned Dev Boxes in this pool. */
  readonly devBoxCount?: number;
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function poolPropertiesSerializer(item: PoolProperties): any {
  return {
    devBoxDefinitionType: item["devBoxDefinitionType"],
    devBoxDefinitionName: item["devBoxDefinitionName"],
    devBoxDefinition: !item["devBoxDefinition"]
      ? item["devBoxDefinition"]
      : poolDevBoxDefinitionSerializer(item["devBoxDefinition"]),
    networkConnectionName: item["networkConnectionName"],
    licenseType: item["licenseType"],
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationSerializer(item["stopOnDisconnect"]),
    stopOnNoConnect: !item["stopOnNoConnect"]
      ? item["stopOnNoConnect"]
      : stopOnNoConnectConfigurationSerializer(item["stopOnNoConnect"]),
    singleSignOnStatus: item["singleSignOnStatus"],
    displayName: item["displayName"],
    virtualNetworkType: item["virtualNetworkType"],
    managedVirtualNetworkRegions: !item["managedVirtualNetworkRegions"]
      ? item["managedVirtualNetworkRegions"]
      : item["managedVirtualNetworkRegions"].map((p: any) => {
          return p;
        }),
    activeHoursConfiguration: !item["activeHoursConfiguration"]
      ? item["activeHoursConfiguration"]
      : activeHoursConfigurationSerializer(item["activeHoursConfiguration"]),
    devBoxTunnelEnableStatus: item["devBoxTunnelEnableStatus"],
  };
}

export function poolPropertiesDeserializer(item: any): PoolProperties {
  return {
    devBoxDefinitionType: item["devBoxDefinitionType"],
    devBoxDefinitionName: item["devBoxDefinitionName"],
    devBoxDefinition: !item["devBoxDefinition"]
      ? item["devBoxDefinition"]
      : poolDevBoxDefinitionDeserializer(item["devBoxDefinition"]),
    networkConnectionName: item["networkConnectionName"],
    licenseType: item["licenseType"],
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationDeserializer(item["stopOnDisconnect"]),
    stopOnNoConnect: !item["stopOnNoConnect"]
      ? item["stopOnNoConnect"]
      : stopOnNoConnectConfigurationDeserializer(item["stopOnNoConnect"]),
    singleSignOnStatus: item["singleSignOnStatus"],
    displayName: item["displayName"],
    virtualNetworkType: item["virtualNetworkType"],
    managedVirtualNetworkRegions: !item["managedVirtualNetworkRegions"]
      ? item["managedVirtualNetworkRegions"]
      : item["managedVirtualNetworkRegions"].map((p: any) => {
          return p;
        }),
    activeHoursConfiguration: !item["activeHoursConfiguration"]
      ? item["activeHoursConfiguration"]
      : activeHoursConfigurationDeserializer(item["activeHoursConfiguration"]),
    devBoxTunnelEnableStatus: item["devBoxTunnelEnableStatus"],
    healthStatus: item["healthStatus"],
    healthStatusDetails: !item["healthStatusDetails"]
      ? item["healthStatusDetails"]
      : healthStatusDetailArrayDeserializer(item["healthStatusDetails"]),
    devBoxCount: item["devBoxCount"],
    provisioningState: item["provisioningState"],
  };
}

/** Health status indicating whether a pool is available to create Dev Boxes. */
export enum KnownHealthStatus {
  /** Unknown health status. */
  Unknown = "Unknown",
  /** Pending health status. */
  Pending = "Pending",
  /** Healthy health status. */
  Healthy = "Healthy",
  /** Warning health status. */
  Warning = "Warning",
  /** Unhealthy health status. */
  Unhealthy = "Unhealthy",
}

/**
 * Health status indicating whether a pool is available to create Dev Boxes. \
 * {@link KnownHealthStatus} can be used interchangeably with HealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown health status. \
 * **Pending**: Pending health status. \
 * **Healthy**: Healthy health status. \
 * **Warning**: Warning health status. \
 * **Unhealthy**: Unhealthy health status.
 */
export type HealthStatus = string;

export function healthStatusDetailArrayDeserializer(result: Array<HealthStatusDetail>): any[] {
  return result.map((item) => {
    return healthStatusDetailDeserializer(item);
  });
}

/** Pool health status detail. */
export interface HealthStatusDetail {
  /** An identifier for the issue. */
  readonly code?: string;
  /** A message describing the issue, intended to be suitable for display in a user interface */
  readonly message?: string;
}

export function healthStatusDetailDeserializer(item: any): HealthStatusDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Properties of a Pool. These properties can be updated after the resource has been created. */
export interface PoolUpdateProperties {
  /** Indicates if the pool is created from an existing Dev Box Definition or if one is provided directly. */
  devBoxDefinitionType?: PoolDevBoxDefinitionType;
  /** Name of a Dev Box definition in parent Project of this Pool. Will be ignored if devBoxDefinitionType is Value. */
  devBoxDefinitionName?: string;
  /** A definition of the machines that are created from this Pool. Will be ignored if devBoxDefinitionType is Reference or not provided. */
  devBoxDefinition?: PoolDevBoxDefinition;
  /** Name of a Network Connection in parent Project of this Pool. */
  networkConnectionName?: string;
  /** Specifies the license type indicating the caller has already acquired licenses for the Dev Boxes that will be created. */
  licenseType?: LicenseType;
  /** Indicates whether owners of Dev Boxes in this pool are added as local administrators on the Dev Box. */
  localAdministrator?: LocalAdminStatus;
  /** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
  stopOnDisconnect?: StopOnDisconnectConfiguration;
  /** Stop on no connect configuration settings for Dev Boxes created in this pool. */
  stopOnNoConnect?: StopOnNoConnectConfiguration;
  /** Indicates whether Dev Boxes in this pool are created with single sign on enabled. The also requires that single sign on be enabled on the tenant. */
  singleSignOnStatus?: SingleSignOnStatus;
  /** The display name of the pool. */
  displayName?: string;
  /** Indicates whether the pool uses a Virtual Network managed by Microsoft or a customer provided network. */
  virtualNetworkType?: VirtualNetworkType;
  /** The regions of the managed virtual network (required when managedNetworkType is Managed). */
  managedVirtualNetworkRegions?: string[];
  /** Active hours configuration settings for Dev Boxes created in this pool. */
  activeHoursConfiguration?: ActiveHoursConfiguration;
  /** Indicates whether Dev Box Tunnel is enabled for a the pool. */
  devBoxTunnelEnableStatus?: DevBoxTunnelEnableStatus;
}

export function poolUpdatePropertiesSerializer(item: PoolUpdateProperties): any {
  return {
    devBoxDefinitionType: item["devBoxDefinitionType"],
    devBoxDefinitionName: item["devBoxDefinitionName"],
    devBoxDefinition: !item["devBoxDefinition"]
      ? item["devBoxDefinition"]
      : poolDevBoxDefinitionSerializer(item["devBoxDefinition"]),
    networkConnectionName: item["networkConnectionName"],
    licenseType: item["licenseType"],
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationSerializer(item["stopOnDisconnect"]),
    stopOnNoConnect: !item["stopOnNoConnect"]
      ? item["stopOnNoConnect"]
      : stopOnNoConnectConfigurationSerializer(item["stopOnNoConnect"]),
    singleSignOnStatus: item["singleSignOnStatus"],
    displayName: item["displayName"],
    virtualNetworkType: item["virtualNetworkType"],
    managedVirtualNetworkRegions: !item["managedVirtualNetworkRegions"]
      ? item["managedVirtualNetworkRegions"]
      : item["managedVirtualNetworkRegions"].map((p: any) => {
          return p;
        }),
    activeHoursConfiguration: !item["activeHoursConfiguration"]
      ? item["activeHoursConfiguration"]
      : activeHoursConfigurationSerializer(item["activeHoursConfiguration"]),
    devBoxTunnelEnableStatus: item["devBoxTunnelEnableStatus"],
  };
}

export function poolUpdatePropertiesDeserializer(item: any): PoolUpdateProperties {
  return {
    devBoxDefinitionType: item["devBoxDefinitionType"],
    devBoxDefinitionName: item["devBoxDefinitionName"],
    devBoxDefinition: !item["devBoxDefinition"]
      ? item["devBoxDefinition"]
      : poolDevBoxDefinitionDeserializer(item["devBoxDefinition"]),
    networkConnectionName: item["networkConnectionName"],
    licenseType: item["licenseType"],
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationDeserializer(item["stopOnDisconnect"]),
    stopOnNoConnect: !item["stopOnNoConnect"]
      ? item["stopOnNoConnect"]
      : stopOnNoConnectConfigurationDeserializer(item["stopOnNoConnect"]),
    singleSignOnStatus: item["singleSignOnStatus"],
    displayName: item["displayName"],
    virtualNetworkType: item["virtualNetworkType"],
    managedVirtualNetworkRegions: !item["managedVirtualNetworkRegions"]
      ? item["managedVirtualNetworkRegions"]
      : item["managedVirtualNetworkRegions"].map((p: any) => {
          return p;
        }),
    activeHoursConfiguration: !item["activeHoursConfiguration"]
      ? item["activeHoursConfiguration"]
      : activeHoursConfigurationDeserializer(item["activeHoursConfiguration"]),
    devBoxTunnelEnableStatus: item["devBoxTunnelEnableStatus"],
  };
}

/** Indicates if the pool is created from an existing Dev Box Definition or if one is provided directly. */
export enum KnownPoolDevBoxDefinitionType {
  /** Indicates the pool is created from an existing Dev Box definition. */
  Reference = "Reference",
  /** Indicates the pool is created from a Dev Box definition that's created from an image reference and a SKU directly. This is used for creating an image definition pool or an image pool. */
  Value = "Value",
}

/**
 * Indicates if the pool is created from an existing Dev Box Definition or if one is provided directly. \
 * {@link KnownPoolDevBoxDefinitionType} can be used interchangeably with PoolDevBoxDefinitionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Reference**: Indicates the pool is created from an existing Dev Box definition. \
 * **Value**: Indicates the pool is created from a Dev Box definition that's created from an image reference and a SKU directly. This is used for creating an image definition pool or an image pool.
 */
export type PoolDevBoxDefinitionType = string;

/** Represents a definition for a Developer Machine. */
export interface PoolDevBoxDefinition {
  /** Image reference information. */
  imageReference?: ImageReference;
  /** The SKU for Dev Boxes created from the Pool. */
  sku?: Sku;
  /** Image reference information for the currently active image (only populated during updates). */
  readonly activeImageReference?: ImageReference;
}

export function poolDevBoxDefinitionSerializer(item: PoolDevBoxDefinition): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function poolDevBoxDefinitionDeserializer(item: any): PoolDevBoxDefinition {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    activeImageReference: !item["activeImageReference"]
      ? item["activeImageReference"]
      : imageReferenceDeserializer(item["activeImageReference"]),
  };
}

/** License Types */
export enum KnownLicenseType {
  /** Windows Client license type. */
  WindowsClient = "Windows_Client",
}

/**
 * License Types \
 * {@link KnownLicenseType} can be used interchangeably with LicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows_Client**: Windows Client license type.
 */
export type LicenseType = string;

/** Local Administrator enable or disable status. Indicates whether owners of Dev Boxes are added as local administrators on the Dev Box. */
export enum KnownLocalAdminStatus {
  /** Local administrator is disabled. */
  Disabled = "Disabled",
  /** Local administrator is enabled. */
  Enabled = "Enabled",
}

/**
 * Local Administrator enable or disable status. Indicates whether owners of Dev Boxes are added as local administrators on the Dev Box. \
 * {@link KnownLocalAdminStatus} can be used interchangeably with LocalAdminStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Local administrator is disabled. \
 * **Enabled**: Local administrator is enabled.
 */
export type LocalAdminStatus = string;

/** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
export interface StopOnDisconnectConfiguration {
  /** Whether the feature to stop the Dev Box on disconnect once the grace period has lapsed is enabled. */
  status?: StopOnDisconnectEnableStatus;
  /** The specified time in minutes to wait before stopping a Dev Box once disconnect is detected. */
  gracePeriodMinutes?: number;
}

export function stopOnDisconnectConfigurationSerializer(item: StopOnDisconnectConfiguration): any {
  return { status: item["status"], gracePeriodMinutes: item["gracePeriodMinutes"] };
}

export function stopOnDisconnectConfigurationDeserializer(
  item: any,
): StopOnDisconnectConfiguration {
  return {
    status: item["status"],
    gracePeriodMinutes: item["gracePeriodMinutes"],
  };
}

/** Stop on disconnect enable or disable status. Indicates whether stop on disconnect to is either enabled or disabled. */
export enum KnownStopOnDisconnectEnableStatus {
  /** Stop on disconnect is enabled. */
  Enabled = "Enabled",
  /** Stop on disconnect is disabled. */
  Disabled = "Disabled",
}

/**
 * Stop on disconnect enable or disable status. Indicates whether stop on disconnect to is either enabled or disabled. \
 * {@link KnownStopOnDisconnectEnableStatus} can be used interchangeably with StopOnDisconnectEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Stop on disconnect is enabled. \
 * **Disabled**: Stop on disconnect is disabled.
 */
export type StopOnDisconnectEnableStatus = string;

/** Stop on no connect configuration settings for Dev Boxes created in this pool. */
export interface StopOnNoConnectConfiguration {
  /** Enables the feature to stop a started Dev Box when it has not been connected to, once the grace period has lapsed. */
  status?: StopOnNoConnectEnableStatus;
  /** The specified time in minutes to wait before stopping a Dev Box if no connection is made. */
  gracePeriodMinutes?: number;
}

export function stopOnNoConnectConfigurationSerializer(item: StopOnNoConnectConfiguration): any {
  return { status: item["status"], gracePeriodMinutes: item["gracePeriodMinutes"] };
}

export function stopOnNoConnectConfigurationDeserializer(item: any): StopOnNoConnectConfiguration {
  return {
    status: item["status"],
    gracePeriodMinutes: item["gracePeriodMinutes"],
  };
}

/** Stop on no connect enable or disable status. */
export enum KnownStopOnNoConnectEnableStatus {
  /** Stop on no connect is enabled. */
  Enabled = "Enabled",
  /** Stop on no connect is disabled. */
  Disabled = "Disabled",
}

/**
 * Stop on no connect enable or disable status. \
 * {@link KnownStopOnNoConnectEnableStatus} can be used interchangeably with StopOnNoConnectEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Stop on no connect is enabled. \
 * **Disabled**: Stop on no connect is disabled.
 */
export type StopOnNoConnectEnableStatus = string;

/** SingleSignOn (SSO) enable or disable status. Indicates whether Dev Boxes in the Pool will have SSO enabled or disabled. */
export enum KnownSingleSignOnStatus {
  /** Single Sign On is disabled. */
  Disabled = "Disabled",
  /** Single Sign On is enabled. */
  Enabled = "Enabled",
}

/**
 * SingleSignOn (SSO) enable or disable status. Indicates whether Dev Boxes in the Pool will have SSO enabled or disabled. \
 * {@link KnownSingleSignOnStatus} can be used interchangeably with SingleSignOnStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Single Sign On is disabled. \
 * **Enabled**: Single Sign On is enabled.
 */
export type SingleSignOnStatus = string;

/** Indicates a pool uses a Virtual Network managed by Microsoft (Managed), or a customer provided Network (Unmanaged). */
export enum KnownVirtualNetworkType {
  /** Virtual Network is managed by Microsoft. */
  Managed = "Managed",
  /** Virtual Network is managed by user. */
  Unmanaged = "Unmanaged",
}

/**
 * Indicates a pool uses a Virtual Network managed by Microsoft (Managed), or a customer provided Network (Unmanaged). \
 * {@link KnownVirtualNetworkType} can be used interchangeably with VirtualNetworkType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Virtual Network is managed by Microsoft. \
 * **Unmanaged**: Virtual Network is managed by user.
 */
export type VirtualNetworkType = string;

/** Active hours configuration. */
export interface ActiveHoursConfiguration {
  /** Enables or disables whether the Dev Box should be kept awake during active hours. */
  keepAwakeEnableStatus?: KeepAwakeEnableStatus;
  /** Enables or disables whether the Dev Box should be automatically started at commencement of active hours. */
  autoStartEnableStatus?: AutoStartEnableStatus;
  /** The default IANA timezone id of the active hours. */
  defaultTimeZone?: string;
  /** The default start time of the active hours. */
  defaultStartTimeHour?: number;
  /** The default end time of the active hours. */
  defaultEndTimeHour?: number;
  /** The days of the week that active hours features will be enabled. This serves as a default that can be updated by each individual user. */
  defaultDaysOfWeek?: DayOfWeek[];
  /** The maximum amount of days per week that a user can enable active hours related features. */
  daysOfWeekLimit?: number;
}

export function activeHoursConfigurationSerializer(item: ActiveHoursConfiguration): any {
  return {
    keepAwakeEnableStatus: item["keepAwakeEnableStatus"],
    autoStartEnableStatus: item["autoStartEnableStatus"],
    defaultTimeZone: item["defaultTimeZone"],
    defaultStartTimeHour: item["defaultStartTimeHour"],
    defaultEndTimeHour: item["defaultEndTimeHour"],
    defaultDaysOfWeek: !item["defaultDaysOfWeek"]
      ? item["defaultDaysOfWeek"]
      : item["defaultDaysOfWeek"].map((p: any) => {
          return p;
        }),
    daysOfWeekLimit: item["daysOfWeekLimit"],
  };
}

export function activeHoursConfigurationDeserializer(item: any): ActiveHoursConfiguration {
  return {
    keepAwakeEnableStatus: item["keepAwakeEnableStatus"],
    autoStartEnableStatus: item["autoStartEnableStatus"],
    defaultTimeZone: item["defaultTimeZone"],
    defaultStartTimeHour: item["defaultStartTimeHour"],
    defaultEndTimeHour: item["defaultEndTimeHour"],
    defaultDaysOfWeek: !item["defaultDaysOfWeek"]
      ? item["defaultDaysOfWeek"]
      : item["defaultDaysOfWeek"].map((p: any) => {
          return p;
        }),
    daysOfWeekLimit: item["daysOfWeekLimit"],
  };
}

/** Enables or disables whether Dev Boxes should be kept awake during active hours. */
export enum KnownKeepAwakeEnableStatus {
  /** Keep awake is enabled. */
  Enabled = "Enabled",
  /** Keep awake is disabled. */
  Disabled = "Disabled",
}

/**
 * Enables or disables whether Dev Boxes should be kept awake during active hours. \
 * {@link KnownKeepAwakeEnableStatus} can be used interchangeably with KeepAwakeEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Keep awake is enabled. \
 * **Disabled**: Keep awake is disabled.
 */
export type KeepAwakeEnableStatus = string;

/** Enables or disables whether Dev Boxes should be automatically started at commencement of active hours. */
export enum KnownAutoStartEnableStatus {
  /** Auto start is enabled. */
  Enabled = "Enabled",
  /** Auto start is disabled. */
  Disabled = "Disabled",
}

/**
 * Enables or disables whether Dev Boxes should be automatically started at commencement of active hours. \
 * {@link KnownAutoStartEnableStatus} can be used interchangeably with AutoStartEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Auto start is enabled. \
 * **Disabled**: Auto start is disabled.
 */
export type AutoStartEnableStatus = string;
/** The days of the week. */
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Indicates whether Dev Box Tunnel is enabled. */
export enum KnownDevBoxTunnelEnableStatus {
  /** Dev Box Tunnel is enabled. */
  Disabled = "Disabled",
  /** Dev Box Tunnel is disabled. */
  Enabled = "Enabled",
}

/**
 * Indicates whether Dev Box Tunnel is enabled. \
 * {@link KnownDevBoxTunnelEnableStatus} can be used interchangeably with DevBoxTunnelEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Dev Box Tunnel is enabled. \
 * **Enabled**: Dev Box Tunnel is disabled.
 */
export type DevBoxTunnelEnableStatus = string;

/** The pool properties for partial update. Properties not provided in the update request will not be changed. */
export interface PoolUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Indicates if the pool is created from an existing Dev Box Definition or if one is provided directly. */
  devBoxDefinitionType?: PoolDevBoxDefinitionType;
  /** Name of a Dev Box definition in parent Project of this Pool. Will be ignored if devBoxDefinitionType is Value. */
  devBoxDefinitionName?: string;
  /** A definition of the machines that are created from this Pool. Will be ignored if devBoxDefinitionType is Reference or not provided. */
  devBoxDefinition?: PoolDevBoxDefinition;
  /** Name of a Network Connection in parent Project of this Pool. */
  networkConnectionName?: string;
  /** Specifies the license type indicating the caller has already acquired licenses for the Dev Boxes that will be created. */
  licenseType?: LicenseType;
  /** Indicates whether owners of Dev Boxes in this pool are added as local administrators on the Dev Box. */
  localAdministrator?: LocalAdminStatus;
  /** Stop on disconnect configuration settings for Dev Boxes created in this pool. */
  stopOnDisconnect?: StopOnDisconnectConfiguration;
  /** Stop on no connect configuration settings for Dev Boxes created in this pool. */
  stopOnNoConnect?: StopOnNoConnectConfiguration;
  /** Indicates whether Dev Boxes in this pool are created with single sign on enabled. The also requires that single sign on be enabled on the tenant. */
  singleSignOnStatus?: SingleSignOnStatus;
  /** The display name of the pool. */
  displayName?: string;
  /** Indicates whether the pool uses a Virtual Network managed by Microsoft or a customer provided network. */
  virtualNetworkType?: VirtualNetworkType;
  /** The regions of the managed virtual network (required when managedNetworkType is Managed). */
  managedVirtualNetworkRegions?: string[];
  /** Active hours configuration settings for Dev Boxes created in this pool. */
  activeHoursConfiguration?: ActiveHoursConfiguration;
  /** Indicates whether Dev Box Tunnel is enabled for a the pool. */
  devBoxTunnelEnableStatus?: DevBoxTunnelEnableStatus;
}

export function poolUpdateSerializer(item: PoolUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "devBoxDefinitionType",
      "devBoxDefinitionName",
      "devBoxDefinition",
      "networkConnectionName",
      "licenseType",
      "localAdministrator",
      "stopOnDisconnect",
      "stopOnNoConnect",
      "singleSignOnStatus",
      "displayName",
      "virtualNetworkType",
      "managedVirtualNetworkRegions",
      "activeHoursConfiguration",
      "devBoxTunnelEnableStatus",
    ])
      ? undefined
      : _poolUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of Pool items */
export interface _PoolListResult {
  /** The Pool items on this page */
  readonly value: Pool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _poolListResultDeserializer(item: any): _PoolListResult {
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

/** Represents a Schedule to execute a task. */
export interface Schedule extends ProxyResource {
  /** Properties of a Schedule resource */
  properties?: ScheduleProperties;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schedulePropertiesSerializer(item["properties"]),
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schedulePropertiesDeserializer(item["properties"]),
  };
}

/** The Schedule properties defining when and what to execute. */
export interface ScheduleProperties extends ScheduleUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function schedulePropertiesSerializer(item: ScheduleProperties): any {
  return {
    tags: item["tags"],
    location: item["location"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
    state: item["state"],
  };
}

export function schedulePropertiesDeserializer(item: any): ScheduleProperties {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** Updatable properties of a Schedule. */
export interface ScheduleUpdateProperties {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Supported type this scheduled task represents. */
  type?: ScheduledType;
  /** The frequency of this scheduled task. */
  frequency?: ScheduledFrequency;
  /** The target time to trigger the action. The format is HH:MM. */
  time?: string;
  /** The IANA timezone id at which the schedule should execute. */
  timeZone?: string;
  /** Indicates whether or not this scheduled task is enabled. */
  state?: ScheduleEnableStatus;
}

export function scheduleUpdatePropertiesSerializer(item: ScheduleUpdateProperties): any {
  return {
    tags: item["tags"],
    location: item["location"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
    state: item["state"],
  };
}

export function scheduleUpdatePropertiesDeserializer(item: any): ScheduleUpdateProperties {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
    state: item["state"],
  };
}

/** The supported types for a scheduled task. */
export enum KnownScheduledType {
  /** Stop Dev Box task type. */
  StopDevBox = "StopDevBox",
}

/**
 * The supported types for a scheduled task. \
 * {@link KnownScheduledType} can be used interchangeably with ScheduledType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StopDevBox**: Stop Dev Box task type.
 */
export type ScheduledType = string;

/** The frequency of task execution. */
export enum KnownScheduledFrequency {
  /** The scheduled task will run daily. */
  Daily = "Daily",
}

/**
 * The frequency of task execution. \
 * {@link KnownScheduledFrequency} can be used interchangeably with ScheduledFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily**: The scheduled task will run daily.
 */
export type ScheduledFrequency = string;

/** Schedule enable or disable status. Indicates whether the schedule applied to is either enabled or disabled. */
export enum KnownScheduleEnableStatus {
  /** Schedule is enabled. */
  Enabled = "Enabled",
  /** Schedule is disabled. */
  Disabled = "Disabled",
}

/**
 * Schedule enable or disable status. Indicates whether the schedule applied to is either enabled or disabled. \
 * {@link KnownScheduleEnableStatus} can be used interchangeably with ScheduleEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Schedule is enabled. \
 * **Disabled**: Schedule is disabled.
 */
export type ScheduleEnableStatus = string;

/** The schedule properties for partial update. Properties not provided in the update request will not be changed. */
export interface ScheduleUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Supported type this scheduled task represents. */
  type?: ScheduledType;
  /** The frequency of this scheduled task. */
  frequency?: ScheduledFrequency;
  /** The target time to trigger the action. The format is HH:MM. */
  time?: string;
  /** The IANA timezone id at which the schedule should execute. */
  timeZone?: string;
  /** Indicates whether or not this scheduled task is enabled. */
  state?: ScheduleEnableStatus;
}

export function scheduleUpdateSerializer(item: ScheduleUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "tags",
      "location",
      "type",
      "frequency",
      "time",
      "timeZone",
      "state",
    ])
      ? undefined
      : _scheduleUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of Schedule items */
export interface _ScheduleListResult {
  /** The Schedule items on this page */
  readonly value: Schedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduleListResultDeserializer(item: any): _ScheduleListResult {
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

/** Network related settings. */
export interface NetworkConnection extends TrackedResource {
  /** Properties of a Network Connection */
  properties?: NetworkProperties;
}

export function networkConnectionSerializer(item: NetworkConnection): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : networkPropertiesSerializer(item["properties"]),
  };
}

export function networkConnectionDeserializer(item: any): NetworkConnection {
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
      : networkPropertiesDeserializer(item["properties"]),
  };
}

/** Network properties */
export interface NetworkProperties extends NetworkConnectionUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Overall health status of the network connection. Health checks are run on creation, update, and periodically to validate the network connection. */
  readonly healthCheckStatus?: HealthCheckStatus;
  /** The name for resource group where NICs will be placed. */
  networkingResourceGroupName?: string;
  /** AAD Join type. */
  domainJoinType: DomainJoinType;
}

export function networkPropertiesSerializer(item: NetworkProperties): any {
  return {
    subnetId: item["subnetId"],
    domainName: item["domainName"],
    organizationUnit: item["organizationUnit"],
    domainUsername: item["domainUsername"],
    domainPassword: item["domainPassword"],
    networkingResourceGroupName: item["networkingResourceGroupName"],
    domainJoinType: item["domainJoinType"],
  };
}

export function networkPropertiesDeserializer(item: any): NetworkProperties {
  return {
    subnetId: item["subnetId"],
    domainName: item["domainName"],
    organizationUnit: item["organizationUnit"],
    domainUsername: item["domainUsername"],
    domainPassword: item["domainPassword"],
    provisioningState: item["provisioningState"],
    healthCheckStatus: item["healthCheckStatus"],
    networkingResourceGroupName: item["networkingResourceGroupName"],
    domainJoinType: item["domainJoinType"],
  };
}

/** Properties of network connection. These properties can be updated after the resource has been created. */
export interface NetworkConnectionUpdateProperties {
  /** The subnet to attach Virtual Machines to. */
  subnetId?: string;
  /** Active Directory domain name. */
  domainName?: string;
  /** Active Directory domain Organization Unit (OU). */
  organizationUnit?: string;
  /** The username of an Active Directory account (user or service account) that has permissions to create computer objects in Active Directory. Required format: admin@contoso.com. */
  domainUsername?: string;
  /** The password for the account used to join domain. */
  domainPassword?: string;
}

export function networkConnectionUpdatePropertiesSerializer(
  item: NetworkConnectionUpdateProperties,
): any {
  return {
    subnetId: item["subnetId"],
    domainName: item["domainName"],
    organizationUnit: item["organizationUnit"],
    domainUsername: item["domainUsername"],
    domainPassword: item["domainPassword"],
  };
}

export function networkConnectionUpdatePropertiesDeserializer(
  item: any,
): NetworkConnectionUpdateProperties {
  return {
    subnetId: item["subnetId"],
    domainName: item["domainName"],
    organizationUnit: item["organizationUnit"],
    domainUsername: item["domainUsername"],
    domainPassword: item["domainPassword"],
  };
}

/** The network connection properties for partial update. Properties not provided in the update request will not be changed. */
export interface NetworkConnectionUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** The subnet to attach Virtual Machines to. */
  subnetId?: string;
  /** Active Directory domain name. */
  domainName?: string;
  /** Active Directory domain Organization Unit (OU). */
  organizationUnit?: string;
  /** The username of an Active Directory account (user or service account) that has permissions to create computer objects in Active Directory. Required format: admin@contoso.com. */
  domainUsername?: string;
  /** The password for the account used to join domain. */
  domainPassword?: string;
}

export function networkConnectionUpdateSerializer(item: NetworkConnectionUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "subnetId",
      "domainName",
      "organizationUnit",
      "domainUsername",
      "domainPassword",
    ])
      ? undefined
      : _networkConnectionUpdatePropertiesSerializer(item),
  };
}

/** Paged collection of NetworkConnection items */
export interface _NetworkConnectionListResult {
  /** The NetworkConnection items on this page */
  readonly value: NetworkConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkConnectionListResultDeserializer(item: any): _NetworkConnectionListResult {
  return {
    value: networkConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkConnectionArraySerializer(result: Array<NetworkConnection>): any[] {
  return result.map((item) => {
    return networkConnectionSerializer(item);
  });
}

export function networkConnectionArrayDeserializer(result: Array<NetworkConnection>): any[] {
  return result.map((item) => {
    return networkConnectionDeserializer(item);
  });
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

/** A collection of related endpoints from the same service for which the agent requires outbound access. */
export interface OutboundEnvironmentEndpoint {
  /** The type of service that the agent connects to. */
  readonly category?: string;
  /** The endpoints for this service for which the agent requires outbound access. */
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

/** Health Check details. */
export interface HealthCheckStatusDetails extends ProxyResource {
  /** Health check status details properties. */
  properties?: HealthCheckStatusDetailsProperties;
}

export function healthCheckStatusDetailsDeserializer(item: any): HealthCheckStatusDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : healthCheckStatusDetailsPropertiesDeserializer(item["properties"]),
  };
}

/** Health Check properties. */
export interface HealthCheckStatusDetailsProperties {
  /** Start time of last execution of the health checks. */
  readonly startDateTime?: Date;
  /** End time of last execution of the health checks. */
  readonly endDateTime?: Date;
  /** Details for each health check item. */
  readonly healthChecks?: HealthCheck[];
}

export function healthCheckStatusDetailsPropertiesDeserializer(
  item: any,
): HealthCheckStatusDetailsProperties {
  return {
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    healthChecks: !item["healthChecks"]
      ? item["healthChecks"]
      : healthCheckArrayDeserializer(item["healthChecks"]),
  };
}

export function healthCheckArrayDeserializer(result: Array<HealthCheck>): any[] {
  return result.map((item) => {
    return healthCheckDeserializer(item);
  });
}

/** An individual health check item. */
export interface HealthCheck {
  /** The status of the health check item. */
  readonly status?: HealthCheckStatus;
  /** The display name of this health check item. */
  readonly displayName?: string;
  /** Start time of health check item. */
  readonly startDateTime?: Date;
  /** End time of the health check item. */
  readonly endDateTime?: Date;
  /** The type of error that occurred during this health check. */
  readonly errorType?: string;
  /** The recommended action to fix the corresponding error. */
  readonly recommendedAction?: string;
  /** Additional details about the health check or the recommended action. */
  readonly additionalDetails?: string;
}

export function healthCheckDeserializer(item: any): HealthCheck {
  return {
    status: item["status"],
    displayName: item["displayName"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    errorType: item["errorType"],
    recommendedAction: item["recommendedAction"],
    additionalDetails: item["additionalDetails"],
  };
}

/** Paged collection of HealthCheckStatusDetails items */
export interface _HealthCheckStatusDetailsListResult {
  /** The HealthCheckStatusDetails items on this page */
  readonly value: HealthCheckStatusDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _healthCheckStatusDetailsListResultDeserializer(
  item: any,
): _HealthCheckStatusDetailsListResult {
  return {
    value: healthCheckStatusDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function healthCheckStatusDetailsArrayDeserializer(
  result: Array<HealthCheckStatusDetails>,
): any[] {
  return result.map((item) => {
    return healthCheckStatusDetailsDeserializer(item);
  });
}

/** Represents a devcenter encryption set resource. */
export interface DevCenterEncryptionSet extends TrackedResource {
  /** Properties of a devcenter encryption set. */
  properties?: DevCenterEncryptionSetProperties;
  /** Managed identity properties. */
  identity?: ManagedServiceIdentity;
}

export function devCenterEncryptionSetSerializer(item: DevCenterEncryptionSet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : devCenterEncryptionSetPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function devCenterEncryptionSetDeserializer(item: any): DevCenterEncryptionSet {
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
      : devCenterEncryptionSetPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the devcenter encryption set. */
export interface DevCenterEncryptionSetProperties extends DevCenterEncryptionSetUpdateProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function devCenterEncryptionSetPropertiesSerializer(
  item: DevCenterEncryptionSetProperties,
): any {
  return {
    devboxDisksEncryptionEnableStatus: item["devboxDisksEncryptionEnableStatus"],
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
  };
}

export function devCenterEncryptionSetPropertiesDeserializer(
  item: any,
): DevCenterEncryptionSetProperties {
  return {
    devboxDisksEncryptionEnableStatus: item["devboxDisksEncryptionEnableStatus"],
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
    provisioningState: item["provisioningState"],
  };
}

/** Properties of the devcenter encryption set. These properties can be updated after the resource has been created. */
export interface DevCenterEncryptionSetUpdateProperties {
  /** Devbox disk encryption enable or disable status. Indicates if Devbox disks encryption using DevCenter CMK is enabled or not. */
  devboxDisksEncryptionEnableStatus?: DevboxDisksEncryptionEnableStatus;
  /** Key encryption key Url, versioned or non-versioned. Ex: https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78 or https://contosovault.vault.azure.net/keys/contosokek. */
  keyEncryptionKeyUrl?: string;
  /** The managed identity configuration used for key vault access. */
  keyEncryptionKeyIdentity?: KeyEncryptionKeyIdentity;
}

export function devCenterEncryptionSetUpdatePropertiesSerializer(
  item: DevCenterEncryptionSetUpdateProperties,
): any {
  return {
    devboxDisksEncryptionEnableStatus: item["devboxDisksEncryptionEnableStatus"],
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
  };
}

export function devCenterEncryptionSetUpdatePropertiesDeserializer(
  item: any,
): DevCenterEncryptionSetUpdateProperties {
  return {
    devboxDisksEncryptionEnableStatus: item["devboxDisksEncryptionEnableStatus"],
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
  };
}

/** Devbox disk encryption enable or disable status. Indicates if Devbox disks encryption is enabled or not. */
export enum KnownDevboxDisksEncryptionEnableStatus {
  /** Devbox disks encryption is enabled. */
  Enabled = "Enabled",
  /** Devbox disks encryption is disabled. */
  Disabled = "Disabled",
}

/**
 * Devbox disk encryption enable or disable status. Indicates if Devbox disks encryption is enabled or not. \
 * {@link KnownDevboxDisksEncryptionEnableStatus} can be used interchangeably with DevboxDisksEncryptionEnableStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Devbox disks encryption is enabled. \
 * **Disabled**: Devbox disks encryption is disabled.
 */
export type DevboxDisksEncryptionEnableStatus = string;

/** The managed identity configuration used for key vault access. */
export interface KeyEncryptionKeyIdentity {
  /** The type of managed identity to use for key vault access. */
  type?: CmkIdentityType;
  /** For system assigned identity, this will be null. For user assigned identity, this should be the resource ID of the identity. */
  userAssignedIdentityResourceId?: string;
}

export function keyEncryptionKeyIdentitySerializer(item: KeyEncryptionKeyIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function keyEncryptionKeyIdentityDeserializer(item: any): KeyEncryptionKeyIdentity {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** The type of identity used to access the key vault key. */
export enum KnownCmkIdentityType {
  /** System assigned identity type. */
  SystemAssigned = "SystemAssigned",
  /** User assigned identity type. */
  UserAssigned = "UserAssigned",
}

/**
 * The type of identity used to access the key vault key. \
 * {@link KnownCmkIdentityType} can be used interchangeably with CmkIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: System assigned identity type. \
 * **UserAssigned**: User assigned identity type.
 */
export type CmkIdentityType = string;

/** The devcenter encryption set resource for partial updates. Properties not provided in the update request will not be changed. */
export interface EncryptionSetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Managed identity properties */
  identity?: ManagedServiceIdentity;
  /** Devbox disk encryption enable or disable status. Indicates if Devbox disks encryption using DevCenter CMK is enabled or not. */
  devboxDisksEncryptionEnableStatus?: DevboxDisksEncryptionEnableStatus;
  /** Key encryption key Url, versioned or non-versioned. Ex: https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78 or https://contosovault.vault.azure.net/keys/contosokek. */
  keyEncryptionKeyUrl?: string;
  /** The managed identity configuration used for key vault access. */
  keyEncryptionKeyIdentity?: KeyEncryptionKeyIdentity;
}

export function encryptionSetUpdateSerializer(item: EncryptionSetUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "devboxDisksEncryptionEnableStatus",
      "keyEncryptionKeyUrl",
      "keyEncryptionKeyIdentity",
    ])
      ? undefined
      : _encryptionSetUpdatePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Paged collection of DevCenterEncryptionSet items */
export interface _EncryptionSetListResult {
  /** The DevCenterEncryptionSet items on this page */
  readonly value: DevCenterEncryptionSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _encryptionSetListResultDeserializer(item: any): _EncryptionSetListResult {
  return {
    value: devCenterEncryptionSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devCenterEncryptionSetArraySerializer(
  result: Array<DevCenterEncryptionSet>,
): any[] {
  return result.map((item) => {
    return devCenterEncryptionSetSerializer(item);
  });
}

export function devCenterEncryptionSetArrayDeserializer(
  result: Array<DevCenterEncryptionSet>,
): any[] {
  return result.map((item) => {
    return devCenterEncryptionSetDeserializer(item);
  });
}

/** Results of the Microsoft.DevCenter SKU list operation. */
export interface _SkuListResult {
  /** The DevCenterSku items on this page */
  readonly value: DevCenterSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _skuListResultDeserializer(item: any): _SkuListResult {
  return {
    value: devCenterSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devCenterSkuArrayDeserializer(result: Array<DevCenterSku>): any[] {
  return result.map((item) => {
    return devCenterSkuDeserializer(item);
  });
}

/** The resource model definition representing SKU for DevCenter resources. */
export interface DevCenterSku extends Sku {
  /** The name of the resource type. */
  readonly resourceType?: string;
  /** SKU supported locations. */
  readonly locations?: string[];
  /** Collection of name/value pairs to describe the SKU capabilities. */
  readonly capabilities?: Capability[];
}

export function devCenterSkuDeserializer(item: any): DevCenterSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
    resourceType: item["resourceType"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArrayDeserializer(item["capabilities"]),
  };
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** A name/value pair to describe a capability. */
export interface Capability {
  /** Name of the capability. */
  readonly name?: string;
  /** Value of the capability. */
  readonly value?: string;
}

export function capabilityDeserializer(item: any): Capability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Represents an allowed environment type. */
export interface AllowedEnvironmentType extends ProxyResource {
  /** Properties of an allowed environment type. */
  properties?: AllowedEnvironmentTypeProperties;
}

export function allowedEnvironmentTypeDeserializer(item: any): AllowedEnvironmentType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : allowedEnvironmentTypePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an allowed environment type. */
export interface AllowedEnvironmentTypeProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The display name of the allowed environment type. */
  readonly displayName?: string;
}

export function allowedEnvironmentTypePropertiesDeserializer(
  item: any,
): AllowedEnvironmentTypeProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
  };
}

/** Paged collection of AllowedEnvironmentType items */
export interface _AllowedEnvironmentTypeListResult {
  /** The AllowedEnvironmentType items on this page */
  readonly value: AllowedEnvironmentType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _allowedEnvironmentTypeListResultDeserializer(
  item: any,
): _AllowedEnvironmentTypeListResult {
  return {
    value: allowedEnvironmentTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function allowedEnvironmentTypeArrayDeserializer(
  result: Array<AllowedEnvironmentType>,
): any[] {
  return result.map((item) => {
    return allowedEnvironmentTypeDeserializer(item);
  });
}

/** Paged collection of ImageDefinitionBuild items */
export interface _ImageDefinitionBuildListResult {
  /** The ImageDefinitionBuild items on this page */
  readonly value: ImageDefinitionBuild[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageDefinitionBuildListResultDeserializer(
  item: any,
): _ImageDefinitionBuildListResult {
  return {
    value: imageDefinitionBuildArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageDefinitionBuildArrayDeserializer(result: Array<ImageDefinitionBuild>): any[] {
  return result.map((item) => {
    return imageDefinitionBuildDeserializer(item);
  });
}

/** The current status of an async operation */
export interface OperationStatus extends OperationStatusResult {
  /** Custom operation properties, populated only for a successful operation. */
  readonly properties?: Record<string, any>;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** List of Core Usages. */
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

/** The core usage details. */
export interface Usage {
  /** The current usage. */
  currentValue?: number;
  /** The limit integer. */
  limit?: number;
  /** The unit details. */
  unit?: UsageUnit;
  /** The name. */
  name?: UsageName;
  /** The fully qualified arm resource id. */
  id?: string;
}

export function usageDeserializer(item: any): Usage {
  return {
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : usageNameDeserializer(item["name"]),
    id: item["id"],
  };
}

/** The unit details. */
export enum KnownUsageUnit {
  /** Count. */
  Count = "Count",
}

/**
 * The unit details. \
 * {@link KnownUsageUnit} can be used interchangeably with UsageUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count**: Count.
 */
export type UsageUnit = string;

/** The Usage Names. */
export interface UsageName {
  /** The localized name of the resource. */
  localizedValue?: string;
  /** The name of the resource. */
  value?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    localizedValue: item["localizedValue"],
    value: item["value"],
  };
}

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

/** The scoped name check availability request body. */
export interface CheckScopedNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** The resource id to scope the name check. */
  scope?: string;
}

export function checkScopedNameAvailabilityRequestSerializer(
  item: CheckScopedNameAvailabilityRequest,
): any {
  return { name: item["name"], type: item["type"], scope: item["scope"] };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-01-preview API version. */
  V20250701Preview = "2025-07-01-preview",
  /** The 2025-10-01-preview API version. */
  V20251001Preview = "2025-10-01-preview",
  /** The 2026-01-01-preview API version. */
  V20260101Preview = "2026-01-01-preview",
}

export function _devCenterUpdatePropertiesSerializer(item: DevCenterUpdate): any {
  return {
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    displayName: item["displayName"],
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : devCenterProjectCatalogSettingsSerializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : devCenterNetworkSettingsSerializer(item["networkSettings"]),
    devBoxProvisioningSettings: !item["devBoxProvisioningSettings"]
      ? item["devBoxProvisioningSettings"]
      : devBoxProvisioningSettingsSerializer(item["devBoxProvisioningSettings"]),
  };
}

export function _devCenterUpdatePropertiesDeserializer(item: any) {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    displayName: item["displayName"],
    projectCatalogSettings: !item["projectCatalogSettings"]
      ? item["projectCatalogSettings"]
      : devCenterProjectCatalogSettingsDeserializer(item["projectCatalogSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : devCenterNetworkSettingsDeserializer(item["networkSettings"]),
    devBoxProvisioningSettings: !item["devBoxProvisioningSettings"]
      ? item["devBoxProvisioningSettings"]
      : devBoxProvisioningSettingsDeserializer(item["devBoxProvisioningSettings"]),
  };
}

export function _projectPolicyUpdatePropertiesSerializer(item: ProjectPolicyUpdate): any {
  return {
    resourcePolicies: !item["resourcePolicies"]
      ? item["resourcePolicies"]
      : resourcePolicyArraySerializer(item["resourcePolicies"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    configurationPolicies: !item["configurationPolicies"]
      ? item["configurationPolicies"]
      : configurationPoliciesSerializer(item["configurationPolicies"]),
  };
}

export function _projectPolicyUpdatePropertiesDeserializer(item: any) {
  return {
    resourcePolicies: !item["resourcePolicies"]
      ? item["resourcePolicies"]
      : resourcePolicyArrayDeserializer(item["resourcePolicies"]),
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    configurationPolicies: !item["configurationPolicies"]
      ? item["configurationPolicies"]
      : configurationPoliciesDeserializer(item["configurationPolicies"]),
  };
}

export function _projectUpdatePropertiesSerializer(item: ProjectUpdate): any {
  return {
    devCenterId: item["devCenterId"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
    displayName: item["displayName"],
    catalogSettings: !item["catalogSettings"]
      ? item["catalogSettings"]
      : projectCatalogSettingsSerializer(item["catalogSettings"]),
    customizationSettings: !item["customizationSettings"]
      ? item["customizationSettings"]
      : projectCustomizationSettingsSerializer(item["customizationSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : devBoxScheduleDeleteSettingsSerializer(item["devBoxScheduleDeleteSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : azureAiServicesSettingsSerializer(item["azureAiServicesSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : serverlessGpuSessionsSettingsSerializer(item["serverlessGpuSessionsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : workspaceStorageSettingsSerializer(item["workspaceStorageSettings"]),
    assignedGroups: !item["assignedGroups"]
      ? item["assignedGroups"]
      : assignedGroupArraySerializer(item["assignedGroups"]),
  };
}

export function _projectUpdatePropertiesDeserializer(item: any) {
  return {
    devCenterId: item["devCenterId"],
    description: item["description"],
    maxDevBoxesPerUser: item["maxDevBoxesPerUser"],
    displayName: item["displayName"],
    catalogSettings: !item["catalogSettings"]
      ? item["catalogSettings"]
      : projectCatalogSettingsDeserializer(item["catalogSettings"]),
    customizationSettings: !item["customizationSettings"]
      ? item["customizationSettings"]
      : projectCustomizationSettingsDeserializer(item["customizationSettings"]),
    devBoxScheduleDeleteSettings: !item["devBoxScheduleDeleteSettings"]
      ? item["devBoxScheduleDeleteSettings"]
      : devBoxScheduleDeleteSettingsDeserializer(item["devBoxScheduleDeleteSettings"]),
    azureAiServicesSettings: !item["azureAiServicesSettings"]
      ? item["azureAiServicesSettings"]
      : azureAiServicesSettingsDeserializer(item["azureAiServicesSettings"]),
    serverlessGpuSessionsSettings: !item["serverlessGpuSessionsSettings"]
      ? item["serverlessGpuSessionsSettings"]
      : serverlessGpuSessionsSettingsDeserializer(item["serverlessGpuSessionsSettings"]),
    workspaceStorageSettings: !item["workspaceStorageSettings"]
      ? item["workspaceStorageSettings"]
      : workspaceStorageSettingsDeserializer(item["workspaceStorageSettings"]),
    assignedGroups: !item["assignedGroups"]
      ? item["assignedGroups"]
      : assignedGroupArrayDeserializer(item["assignedGroups"]),
  };
}

export function _catalogUpdatePropertiesSerializer(item: CatalogUpdate): any {
  return {
    gitHub: !item["gitHub"] ? item["gitHub"] : gitCatalogSerializer(item["gitHub"]),
    adoGit: !item["adoGit"] ? item["adoGit"] : gitCatalogSerializer(item["adoGit"]),
    syncType: item["syncType"],
    autoImageBuildEnableStatus: item["autoImageBuildEnableStatus"],
    tags: item["tags"],
  };
}

export function _catalogUpdatePropertiesDeserializer(item: any) {
  return {
    gitHub: !item["gitHub"] ? item["gitHub"] : gitCatalogDeserializer(item["gitHub"]),
    adoGit: !item["adoGit"] ? item["adoGit"] : gitCatalogDeserializer(item["adoGit"]),
    syncType: item["syncType"],
    autoImageBuildEnableStatus: item["autoImageBuildEnableStatus"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _environmentTypeUpdatePropertiesSerializer(item: EnvironmentTypeUpdate): any {
  return { displayName: item["displayName"] };
}

export function _environmentTypeUpdatePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
  };
}

export function _projectEnvironmentTypeUpdatePropertiesSerializer(
  item: ProjectEnvironmentTypeUpdate,
): any {
  return {
    deploymentTargetId: item["deploymentTargetId"],
    displayName: item["displayName"],
    status: item["status"],
    creatorRoleAssignment: !item["creatorRoleAssignment"]
      ? item["creatorRoleAssignment"]
      : projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentSerializer(
          item["creatorRoleAssignment"],
        ),
    userRoleAssignments: !item["userRoleAssignments"]
      ? item["userRoleAssignments"]
      : userRoleAssignmentValueRecordSerializer(item["userRoleAssignments"]),
  };
}

export function _projectEnvironmentTypeUpdatePropertiesDeserializer(item: any) {
  return {
    deploymentTargetId: item["deploymentTargetId"],
    displayName: item["displayName"],
    status: item["status"],
    creatorRoleAssignment: !item["creatorRoleAssignment"]
      ? item["creatorRoleAssignment"]
      : projectEnvironmentTypeUpdatePropertiesCreatorRoleAssignmentDeserializer(
          item["creatorRoleAssignment"],
        ),
    userRoleAssignments: !item["userRoleAssignments"]
      ? item["userRoleAssignments"]
      : userRoleAssignmentValueRecordDeserializer(item["userRoleAssignments"]),
  };
}

export function _devBoxDefinitionUpdatePropertiesSerializer(item: DevBoxDefinitionUpdate): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    osStorageType: item["osStorageType"],
    hibernateSupport: item["hibernateSupport"],
  };
}

export function _devBoxDefinitionUpdatePropertiesDeserializer(item: any) {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    osStorageType: item["osStorageType"],
    hibernateSupport: item["hibernateSupport"],
  };
}

export function _poolUpdatePropertiesSerializer(item: PoolUpdate): any {
  return {
    devBoxDefinitionType: item["devBoxDefinitionType"],
    devBoxDefinitionName: item["devBoxDefinitionName"],
    devBoxDefinition: !item["devBoxDefinition"]
      ? item["devBoxDefinition"]
      : poolDevBoxDefinitionSerializer(item["devBoxDefinition"]),
    networkConnectionName: item["networkConnectionName"],
    licenseType: item["licenseType"],
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationSerializer(item["stopOnDisconnect"]),
    stopOnNoConnect: !item["stopOnNoConnect"]
      ? item["stopOnNoConnect"]
      : stopOnNoConnectConfigurationSerializer(item["stopOnNoConnect"]),
    singleSignOnStatus: item["singleSignOnStatus"],
    displayName: item["displayName"],
    virtualNetworkType: item["virtualNetworkType"],
    managedVirtualNetworkRegions: !item["managedVirtualNetworkRegions"]
      ? item["managedVirtualNetworkRegions"]
      : item["managedVirtualNetworkRegions"].map((p: any) => {
          return p;
        }),
    activeHoursConfiguration: !item["activeHoursConfiguration"]
      ? item["activeHoursConfiguration"]
      : activeHoursConfigurationSerializer(item["activeHoursConfiguration"]),
    devBoxTunnelEnableStatus: item["devBoxTunnelEnableStatus"],
  };
}

export function _poolUpdatePropertiesDeserializer(item: any) {
  return {
    devBoxDefinitionType: item["devBoxDefinitionType"],
    devBoxDefinitionName: item["devBoxDefinitionName"],
    devBoxDefinition: !item["devBoxDefinition"]
      ? item["devBoxDefinition"]
      : poolDevBoxDefinitionDeserializer(item["devBoxDefinition"]),
    networkConnectionName: item["networkConnectionName"],
    licenseType: item["licenseType"],
    localAdministrator: item["localAdministrator"],
    stopOnDisconnect: !item["stopOnDisconnect"]
      ? item["stopOnDisconnect"]
      : stopOnDisconnectConfigurationDeserializer(item["stopOnDisconnect"]),
    stopOnNoConnect: !item["stopOnNoConnect"]
      ? item["stopOnNoConnect"]
      : stopOnNoConnectConfigurationDeserializer(item["stopOnNoConnect"]),
    singleSignOnStatus: item["singleSignOnStatus"],
    displayName: item["displayName"],
    virtualNetworkType: item["virtualNetworkType"],
    managedVirtualNetworkRegions: !item["managedVirtualNetworkRegions"]
      ? item["managedVirtualNetworkRegions"]
      : item["managedVirtualNetworkRegions"].map((p: any) => {
          return p;
        }),
    activeHoursConfiguration: !item["activeHoursConfiguration"]
      ? item["activeHoursConfiguration"]
      : activeHoursConfigurationDeserializer(item["activeHoursConfiguration"]),
    devBoxTunnelEnableStatus: item["devBoxTunnelEnableStatus"],
  };
}

export function _scheduleUpdatePropertiesSerializer(item: ScheduleUpdate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
    state: item["state"],
  };
}

export function _scheduleUpdatePropertiesDeserializer(item: any) {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    type: item["type"],
    frequency: item["frequency"],
    time: item["time"],
    timeZone: item["timeZone"],
    state: item["state"],
  };
}

export function _networkConnectionUpdatePropertiesSerializer(item: NetworkConnectionUpdate): any {
  return {
    subnetId: item["subnetId"],
    domainName: item["domainName"],
    organizationUnit: item["organizationUnit"],
    domainUsername: item["domainUsername"],
    domainPassword: item["domainPassword"],
  };
}

export function _networkConnectionUpdatePropertiesDeserializer(item: any) {
  return {
    subnetId: item["subnetId"],
    domainName: item["domainName"],
    organizationUnit: item["organizationUnit"],
    domainUsername: item["domainUsername"],
    domainPassword: item["domainPassword"],
  };
}

export function _encryptionSetUpdatePropertiesSerializer(item: EncryptionSetUpdate): any {
  return {
    devboxDisksEncryptionEnableStatus: item["devboxDisksEncryptionEnableStatus"],
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
  };
}

export function _encryptionSetUpdatePropertiesDeserializer(item: any) {
  return {
    devboxDisksEncryptionEnableStatus: item["devboxDisksEncryptionEnableStatus"],
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
  };
}
