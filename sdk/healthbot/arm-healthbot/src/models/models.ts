// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Available operations of the service. */
export interface _AvailableOperations {
  /** Collection of available operation details. */
  value: OperationDetail[];
  /**
   * URL client should use to fetch the next page (per server side paging).
   * It's null for now, added for future use.
   */
  nextLink?: string;
}

export function _availableOperationsDeserializer(item: any): _AvailableOperations {
  return {
    value: operationDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationDetailArrayDeserializer(result: Array<OperationDetail>): any[] {
  return result.map((item) => {
    return operationDetailDeserializer(item);
  });
}

/** Operation detail payload */
export interface OperationDetail {
  /** Name of the operation */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
  /** Additional properties. */
  properties?: any;
}

export function operationDetailDeserializer(item: any): OperationDetail {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** Operation display payload */
export interface OperationDisplay {
  /** Resource provider of the operation */
  provider?: string;
  /** Resource of the operation */
  resource?: string;
  /** Localized friendly name for the operation */
  operation?: string;
  /** Localized friendly description for the operation */
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

/** The resource management error response. */
export interface ErrorModel {
  /** The error object. */
  error?: ErrorError;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    error: !item["error"] ? item["error"] : errorErrorDeserializer(item["error"]),
  };
}

/** The error object. */
export interface ErrorError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorModel[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorErrorDeserializer(item: any): ErrorError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
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

/** Azure Health Bot resource definition */
export interface HealthBot extends TrackedResource {
  /** The set of properties specific to Azure Health Bot resource. */
  properties?: HealthBotProperties;
  /** SKU of the Azure Health Bot. */
  sku: Sku;
  /** The identity of the Azure Health Bot. */
  identity?: Identity;
}

export function healthBotSerializer(item: HealthBot): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : healthBotPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function healthBotDeserializer(item: any): HealthBot {
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
      : healthBotPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** The properties of a Azure Health Bot. The Health Bot Service is a cloud platform that empowers developers in Healthcare organizations to build and deploy their compliant, AI-powered virtual health assistants and health bots, that help them improve processes and reduce costs. */
export interface HealthBotProperties {
  /** The provisioning state of the Azure Health Bot resource. */
  readonly provisioningState?: string;
  /** The link. */
  readonly botManagementPortalLink?: string;
  /** KeyVault properties for the resource encryption. */
  keyVaultProperties?: KeyVaultProperties;
  /** The access control method for the Azure Health Bot resource. */
  readonly accessControlMethod?: string;
}

export function healthBotPropertiesSerializer(item: HealthBotProperties): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
  };
}

export function healthBotPropertiesDeserializer(item: any): HealthBotProperties {
  return {
    provisioningState: item["provisioningState"],
    botManagementPortalLink: item["botManagementPortalLink"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    accessControlMethod: item["accessControlMethod"],
  };
}

/** Properties of the key vault. */
export interface KeyVaultProperties {
  /** The name of the key vault key. */
  keyName: string;
  /** The version of the key vault key. */
  keyVersion?: string;
  /** The Uri of the key vault. */
  keyVaultUri: string;
  /** The user assigned identity (ARM resource id) that has access to the key. */
  userIdentity?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    userIdentity: item["userIdentity"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    userIdentity: item["userIdentity"],
  };
}

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the Azure Health Bot SKU */
  name: SkuName;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
  };
}

/** The name of the Azure Health Bot SKU */
export type SkuName = "F0" | "C0" | "PES" | "C1";

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The identity type. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the Azure Health Bot */
  type?: ResourceIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the Azure Health Bot */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

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

/** The details of the user assigned managed identity used by the Video Analyzer resource. */
export interface UserAssignedIdentity {
  /** The principal ID of user assigned identity. */
  readonly principalId?: string;
  /** The client ID of user assigned identity. */
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

/** Parameters for updating a Azure Health Bot. */
export interface HealthBotUpdateParameters {
  /** Properties of Azure Health Bot. */
  properties?: HealthBotProperties;
  /** Tags for a Azure Health Bot. */
  tags?: Record<string, string>;
  /** SKU of the Azure Health Bot. */
  sku?: Sku;
  /** The identity of the Azure Health Bot. */
  identity?: Identity;
  location?: string;
}

export function healthBotUpdateParametersSerializer(item: HealthBotUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : healthBotPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    location: item["location"],
  };
}

/** The list of Azure Health Bot operation response. */
export interface _BotResponseList {
  /** The HealthBot items on this page */
  readonly value: HealthBot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _botResponseListDeserializer(item: any): _BotResponseList {
  return {
    value: healthBotArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function healthBotArraySerializer(result: Array<HealthBot>): any[] {
  return result.map((item) => {
    return healthBotSerializer(item);
  });
}

export function healthBotArrayDeserializer(result: Array<HealthBot>): any[] {
  return result.map((item) => {
    return healthBotDeserializer(item);
  });
}

/** Health Bot Keys Response. */
export interface HealthBotKeysResponse {
  /** Array of Azure Health Bot Secrets. */
  secrets?: HealthBotKey[];
}

export function healthBotKeysResponseDeserializer(item: any): HealthBotKeysResponse {
  return {
    secrets: !item["secrets"] ? item["secrets"] : healthBotKeyArrayDeserializer(item["secrets"]),
  };
}

export function healthBotKeyArrayDeserializer(result: Array<HealthBotKey>): any[] {
  return result.map((item) => {
    return healthBotKeyDeserializer(item);
  });
}

/** An entry of HealthBotKeysResponse */
export interface HealthBotKey {
  /** The name of the key. */
  keyName?: string;
  /** The value of the key. */
  value?: string;
}

export function healthBotKeyDeserializer(item: any): HealthBotKey {
  return {
    keyName: item["keyName"],
    value: item["value"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The API versions. */
  V20250525 = "2025-05-25",
  /** 2025-11-01 */
  V20251101 = "2025-11-01",
}
