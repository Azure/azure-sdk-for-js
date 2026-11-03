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

/** Definition of the account. */
export interface Account extends TrackedResource {
  /** The internally assigned unique identifier of the resource. */
  readonly systemId?: string;
  /** The description of the account. */
  description?: string;
}

export function accountSerializer(item: Account): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["description"])
      ? undefined
      : _accountPropertiesSerializer(item),
  };
}

export function accountDeserializer(item: any): Account {
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
      : _accountPropertiesDeserializer(item["properties"])),
  };
}

/** The properties that define configuration for the account. */
export interface AccountProperties {
  /** The internally assigned unique identifier of the resource. */
  readonly systemId?: string;
  /** The description of the account. */
  description?: string;
}

export function accountPropertiesSerializer(item: AccountProperties): any {
  return { description: item["description"] };
}

export function accountPropertiesDeserializer(item: any): AccountProperties {
  return {
    systemId: item["systemId"],
    description: item["description"],
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

/** Definition of the account. */
export interface PatchAccount extends PatchTrackedResource {
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
  /** The internally assigned unique identifier of the resource. */
  readonly systemId?: string;
  /** The description of the account. */
  description?: string;
}

export function patchAccountSerializer(item: PatchAccount): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["description"])
      ? undefined
      : _patchAccountPropertiesSerializer(item),
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface PatchTrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
}

export function patchTrackedResourceSerializer(item: PatchTrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

/** The response of the list accounts operation. */
export interface _AccountList {
  /** The collection value. */
  value?: Account[];
  /** The next page link. */
  nextLink?: string;
}

export function _accountListDeserializer(item: any): _AccountList {
  return {
    value: !item["value"] ? item["value"] : accountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accountArraySerializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountSerializer(item);
  });
}

export function accountArrayDeserializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountDeserializer(item);
  });
}

/** Definition of the EnterprisePolicy. */
export interface EnterprisePolicy extends TrackedResource {
  /** The identity of the EnterprisePolicy. */
  identity?: EnterprisePolicyIdentity;
  /** The kind (type) of Enterprise Policy. */
  kind: EnterprisePolicyKind;
  /** The internally assigned unique identifier of the resource. */
  readonly systemId?: string;
  /** Settings concerning lockbox. */
  lockbox?: PropertiesLockbox;
  /** The encryption settings for a configuration store. */
  encryption?: PropertiesEncryption;
  /** Settings concerning network injection. */
  networkInjection?: PropertiesNetworkInjection;
  /** The health status of the resource. */
  healthStatus?: HealthStatus;
}

export function enterprisePolicySerializer(item: EnterprisePolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "lockbox",
      "encryption",
      "networkInjection",
      "healthStatus",
    ])
      ? undefined
      : _enterprisePolicyPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : enterprisePolicyIdentitySerializer(item["identity"]),
    kind: item["kind"],
  };
}

export function enterprisePolicyDeserializer(item: any): EnterprisePolicy {
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
      : _enterprisePolicyPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : enterprisePolicyIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** The properties that define configuration for the enterprise policy. */
export interface Properties {
  /** The internally assigned unique identifier of the resource. */
  readonly systemId?: string;
  /** Settings concerning lockbox. */
  lockbox?: PropertiesLockbox;
  /** The encryption settings for a configuration store. */
  encryption?: PropertiesEncryption;
  /** Settings concerning network injection. */
  networkInjection?: PropertiesNetworkInjection;
  /** The health status of the resource. */
  healthStatus?: HealthStatus;
}

export function propertiesSerializer(item: Properties): any {
  return {
    lockbox: !item["lockbox"] ? item["lockbox"] : propertiesLockboxSerializer(item["lockbox"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : propertiesEncryptionSerializer(item["encryption"]),
    networkInjection: !item["networkInjection"]
      ? item["networkInjection"]
      : propertiesNetworkInjectionSerializer(item["networkInjection"]),
    healthStatus: item["healthStatus"],
  };
}

export function propertiesDeserializer(item: any): Properties {
  return {
    systemId: item["systemId"],
    lockbox: !item["lockbox"] ? item["lockbox"] : propertiesLockboxDeserializer(item["lockbox"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : propertiesEncryptionDeserializer(item["encryption"]),
    networkInjection: !item["networkInjection"]
      ? item["networkInjection"]
      : propertiesNetworkInjectionDeserializer(item["networkInjection"]),
    healthStatus: item["healthStatus"],
  };
}

/** Settings concerning lockbox. */
export interface PropertiesLockbox {
  /** lockbox configuration */
  state?: State;
}

export function propertiesLockboxSerializer(item: PropertiesLockbox): any {
  return { state: item["state"] };
}

export function propertiesLockboxDeserializer(item: any): PropertiesLockbox {
  return {
    state: item["state"],
  };
}

/** The state of onboarding, which only appears in the response. */
export enum KnownState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** NotConfigured */
  NotConfigured = "NotConfigured",
}

/**
 * The state of onboarding, which only appears in the response. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **NotConfigured**: NotConfigured
 */
export type State = string;

/** The encryption settings for a configuration store. */
export interface PropertiesEncryption {
  /** Key vault properties. */
  keyVault?: KeyVaultProperties;
  /** The state of onboarding, which only appears in the response. */
  state?: State;
}

export function propertiesEncryptionSerializer(item: PropertiesEncryption): any {
  return {
    keyVault: !item["keyVault"] ? item["keyVault"] : keyVaultPropertiesSerializer(item["keyVault"]),
    state: item["state"],
  };
}

export function propertiesEncryptionDeserializer(item: any): PropertiesEncryption {
  return {
    keyVault: !item["keyVault"]
      ? item["keyVault"]
      : keyVaultPropertiesDeserializer(item["keyVault"]),
    state: item["state"],
  };
}

/** Settings concerning key vault encryption for a configuration store. */
export interface KeyVaultProperties {
  /** Uri of KeyVault */
  id?: string;
  /** Identity of the secret that includes name and version. */
  key?: KeyProperties;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return { id: item["id"], key: !item["key"] ? item["key"] : keyPropertiesSerializer(item["key"]) };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    id: item["id"],
    key: !item["key"] ? item["key"] : keyPropertiesDeserializer(item["key"]),
  };
}

/** Url and version of the KeyVault Secret */
export interface KeyProperties {
  /** The identifier of the key vault key used to encrypt data. */
  name?: string;
  /** The version of the identity which will be used to access key vault. */
  version?: string;
}

export function keyPropertiesSerializer(item: KeyProperties): any {
  return { name: item["name"], version: item["version"] };
}

export function keyPropertiesDeserializer(item: any): KeyProperties {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Settings concerning network injection. */
export interface PropertiesNetworkInjection {
  /** Network injection configuration */
  virtualNetworks?: VirtualNetworkProperties[];
}

export function propertiesNetworkInjectionSerializer(item: PropertiesNetworkInjection): any {
  return {
    virtualNetworks: !item["virtualNetworks"]
      ? item["virtualNetworks"]
      : virtualNetworkPropertiesArraySerializer(item["virtualNetworks"]),
  };
}

export function propertiesNetworkInjectionDeserializer(item: any): PropertiesNetworkInjection {
  return {
    virtualNetworks: !item["virtualNetworks"]
      ? item["virtualNetworks"]
      : virtualNetworkPropertiesArrayDeserializer(item["virtualNetworks"]),
  };
}

export function virtualNetworkPropertiesArraySerializer(
  result: Array<VirtualNetworkProperties>,
): any[] {
  return result.map((item) => {
    return virtualNetworkPropertiesSerializer(item);
  });
}

export function virtualNetworkPropertiesArrayDeserializer(
  result: Array<VirtualNetworkProperties>,
): any[] {
  return result.map((item) => {
    return virtualNetworkPropertiesDeserializer(item);
  });
}

/** Settings concerning the virtual network. */
export interface VirtualNetworkProperties {
  /** Uri of the virtual network. */
  id?: string;
  /** Properties of a subnet. */
  subnet?: SubnetProperties;
}

export function virtualNetworkPropertiesSerializer(item: VirtualNetworkProperties): any {
  return {
    id: item["id"],
    subnet: !item["subnet"] ? item["subnet"] : subnetPropertiesSerializer(item["subnet"]),
  };
}

export function virtualNetworkPropertiesDeserializer(item: any): VirtualNetworkProperties {
  return {
    id: item["id"],
    subnet: !item["subnet"] ? item["subnet"] : subnetPropertiesDeserializer(item["subnet"]),
  };
}

/** Properties of a subnet. */
export interface SubnetProperties {
  /** Subnet name. */
  name?: string;
}

export function subnetPropertiesSerializer(item: SubnetProperties): any {
  return { name: item["name"] };
}

export function subnetPropertiesDeserializer(item: any): SubnetProperties {
  return {
    name: item["name"],
  };
}

/** The health status of the resource. */
export enum KnownHealthStatus {
  /** Undetermined */
  Undetermined = "Undetermined",
  /** Healthy */
  Healthy = "Healthy",
  /** Warning */
  Warning = "Warning",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
}

/**
 * The health status of the resource. \
 * {@link KnownHealthStatus} can be used interchangeably with HealthStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Undetermined**: Undetermined \
 * **Healthy**: Healthy \
 * **Warning**: Warning \
 * **Unhealthy**: Unhealthy
 */
export type HealthStatus = string;

/** The identity of the EnterprisePolicy. */
export interface EnterprisePolicyIdentity {
  /** The principal id of EnterprisePolicy identity. */
  readonly systemAssignedIdentityPrincipalId?: string;
  /** The tenant id associated with the EnterprisePolicy. */
  readonly tenantId?: string;
  /** The type of identity used for the EnterprisePolicy. Currently, the only supported type is 'SystemAssigned', which implicitly creates an identity. */
  type?: ResourceIdentityType;
}

export function enterprisePolicyIdentitySerializer(item: EnterprisePolicyIdentity): any {
  return { type: item["type"] };
}

export function enterprisePolicyIdentityDeserializer(item: any): EnterprisePolicyIdentity {
  return {
    systemAssignedIdentityPrincipalId: item["systemAssignedIdentityPrincipalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The type of identity used for the EnterprisePolicy. Currently, the only supported type is 'SystemAssigned', which implicitly creates an identity. */
export type ResourceIdentityType = "SystemAssigned" | "None";

/** The Kind (type) of Enterprise Policy */
export enum KnownEnterprisePolicyKind {
  /** Lockbox */
  Lockbox = "Lockbox",
  /** PrivateEndpoint */
  PrivateEndpoint = "PrivateEndpoint",
  /** Encryption */
  Encryption = "Encryption",
  /** NetworkInjection */
  NetworkInjection = "NetworkInjection",
  /** Identity */
  Identity = "Identity",
}

/**
 * The Kind (type) of Enterprise Policy \
 * {@link KnownEnterprisePolicyKind} can be used interchangeably with EnterprisePolicyKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Lockbox**: Lockbox \
 * **PrivateEndpoint**: PrivateEndpoint \
 * **Encryption**: Encryption \
 * **NetworkInjection**: NetworkInjection \
 * **Identity**: Identity
 */
export type EnterprisePolicyKind = string;

/** Definition of the EnterprisePolicy. */
export interface PatchEnterprisePolicy extends PatchTrackedResource {
  /** The identity of the EnterprisePolicy. */
  identity?: EnterprisePolicyIdentity;
  /** The kind (type) of Enterprise Policy. */
  kind?: EnterprisePolicyKind;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
  /** The internally assigned unique identifier of the resource. */
  readonly systemId?: string;
  /** Settings concerning lockbox. */
  lockbox?: PropertiesLockbox;
  /** The encryption settings for a configuration store. */
  encryption?: PropertiesEncryption;
  /** Settings concerning network injection. */
  networkInjection?: PropertiesNetworkInjection;
  /** The health status of the resource. */
  healthStatus?: HealthStatus;
}

export function patchEnterprisePolicySerializer(item: PatchEnterprisePolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : enterprisePolicyIdentitySerializer(item["identity"]),
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "lockbox",
      "encryption",
      "networkInjection",
      "healthStatus",
    ])
      ? undefined
      : _patchEnterprisePolicyPropertiesSerializer(item),
  };
}

/** The response of the list EnterprisePolicy operation. */
export interface _EnterprisePolicyList {
  /** The collection value. */
  value?: EnterprisePolicy[];
  /** The next page link. */
  nextLink?: string;
}

export function _enterprisePolicyListDeserializer(item: any): _EnterprisePolicyList {
  return {
    value: !item["value"] ? item["value"] : enterprisePolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enterprisePolicyArraySerializer(result: Array<EnterprisePolicy>): any[] {
  return result.map((item) => {
    return enterprisePolicySerializer(item);
  });
}

export function enterprisePolicyArrayDeserializer(result: Array<EnterprisePolicy>): any[] {
  return result.map((item) => {
    return enterprisePolicyDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
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
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
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
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

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

/** A list of private endpoint connections */
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

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
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
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
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

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
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

/** The available API versions. */
export enum KnownVersions {
  /** The 2020-10-30-preview API version. */
  V20201030Preview = "2020-10-30-preview",
}

export function _accountPropertiesSerializer(item: Account): any {
  return { description: item["description"] };
}

export function _accountPropertiesDeserializer(item: any) {
  return {
    systemId: item["systemId"],
    description: item["description"],
  };
}

export function _patchAccountPropertiesSerializer(item: PatchAccount): any {
  return { description: item["description"] };
}

export function _patchAccountPropertiesDeserializer(item: any) {
  return {
    systemId: item["systemId"],
    description: item["description"],
  };
}

export function _enterprisePolicyPropertiesSerializer(item: EnterprisePolicy): any {
  return {
    lockbox: !item["lockbox"] ? item["lockbox"] : propertiesLockboxSerializer(item["lockbox"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : propertiesEncryptionSerializer(item["encryption"]),
    networkInjection: !item["networkInjection"]
      ? item["networkInjection"]
      : propertiesNetworkInjectionSerializer(item["networkInjection"]),
    healthStatus: item["healthStatus"],
  };
}

export function _enterprisePolicyPropertiesDeserializer(item: any) {
  return {
    systemId: item["systemId"],
    lockbox: !item["lockbox"] ? item["lockbox"] : propertiesLockboxDeserializer(item["lockbox"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : propertiesEncryptionDeserializer(item["encryption"]),
    networkInjection: !item["networkInjection"]
      ? item["networkInjection"]
      : propertiesNetworkInjectionDeserializer(item["networkInjection"]),
    healthStatus: item["healthStatus"],
  };
}

export function _patchEnterprisePolicyPropertiesSerializer(item: PatchEnterprisePolicy): any {
  return {
    lockbox: !item["lockbox"] ? item["lockbox"] : propertiesLockboxSerializer(item["lockbox"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : propertiesEncryptionSerializer(item["encryption"]),
    networkInjection: !item["networkInjection"]
      ? item["networkInjection"]
      : propertiesNetworkInjectionSerializer(item["networkInjection"]),
    healthStatus: item["healthStatus"],
  };
}

export function _patchEnterprisePolicyPropertiesDeserializer(item: any) {
  return {
    systemId: item["systemId"],
    lockbox: !item["lockbox"] ? item["lockbox"] : propertiesLockboxDeserializer(item["lockbox"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : propertiesEncryptionDeserializer(item["encryption"]),
    networkInjection: !item["networkInjection"]
      ? item["networkInjection"]
      : propertiesNetworkInjectionDeserializer(item["networkInjection"]),
    healthStatus: item["healthStatus"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
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

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
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
