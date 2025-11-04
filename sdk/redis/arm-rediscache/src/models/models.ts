// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/** Result of the request to list REST API operations. It contains a list of operations and a URL nextLink to get the next set of results. */
export interface _OperationListResult {
  /** List of operations supported by the resource provider. */
  value: Operation[];
  /** URL to get the next set of operation list results if there are any. */
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

/** REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The object that describes the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** The object that describes the operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider */
  provider?: string;
  /** Operation type: read, write, delete, listKeys/action, etc. */
  operation?: string;
  /** Resource type on which the operation is performed. */
  resource?: string;
  /** Friendly name of the operation */
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

/** Response to put/get linked server (with properties) for Redis cache. */
export interface RedisLinkedServerWithProperties extends ProxyResource {
  /** Properties of the linked server. */
  properties?: RedisLinkedServerProperties;
}

export function redisLinkedServerWithPropertiesDeserializer(
  item: any,
): RedisLinkedServerWithProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : redisLinkedServerPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a linked server to be returned in get/put response */
export interface RedisLinkedServerProperties extends RedisLinkedServerCreateProperties {
  /** Terminal state of the link between primary and secondary redis cache. */
  readonly provisioningState?: string;
}

export function redisLinkedServerPropertiesDeserializer(item: any): RedisLinkedServerProperties {
  return {
    linkedRedisCacheId: item["linkedRedisCacheId"],
    linkedRedisCacheLocation: item["linkedRedisCacheLocation"],
    serverRole: item["serverRole"],
    geoReplicatedPrimaryHostName: item["geoReplicatedPrimaryHostName"],
    primaryHostName: item["primaryHostName"],
    provisioningState: item["provisioningState"],
  };
}

/** Create properties for a linked server */
export interface RedisLinkedServerCreateProperties {
  /** Fully qualified resourceId of the linked redis cache. */
  linkedRedisCacheId: string;
  /** Location of the linked redis cache. */
  linkedRedisCacheLocation: string;
  /** Role of the linked server. */
  serverRole: ReplicationRole;
  /** The unchanging DNS name which will always point to current geo-primary cache among the linked redis caches for seamless Geo Failover experience. */
  readonly geoReplicatedPrimaryHostName?: string;
  /** The changing DNS name that resolves to the current geo-primary cache among the linked redis caches before or after the Geo Failover. */
  readonly primaryHostName?: string;
}

export function redisLinkedServerCreatePropertiesSerializer(
  item: RedisLinkedServerCreateProperties,
): any {
  return {
    linkedRedisCacheId: item["linkedRedisCacheId"],
    linkedRedisCacheLocation: item["linkedRedisCacheLocation"],
    serverRole: item["serverRole"],
  };
}

export function redisLinkedServerCreatePropertiesDeserializer(
  item: any,
): RedisLinkedServerCreateProperties {
  return {
    linkedRedisCacheId: item["linkedRedisCacheId"],
    linkedRedisCacheLocation: item["linkedRedisCacheLocation"],
    serverRole: item["serverRole"],
    geoReplicatedPrimaryHostName: item["geoReplicatedPrimaryHostName"],
    primaryHostName: item["primaryHostName"],
  };
}

/** Role of the linked server. */
export type ReplicationRole = "Primary" | "Secondary";

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

/** Parameter required for creating a linked server to redis cache. */
export interface RedisLinkedServerCreateParameters {
  /** Properties required to create a linked server. */
  properties: RedisLinkedServerCreateProperties;
}

export function redisLinkedServerCreateParametersSerializer(
  item: RedisLinkedServerCreateParameters,
): any {
  return {
    properties: redisLinkedServerCreatePropertiesSerializer(item["properties"]),
  };
}

/** List of linked servers (with properties) of a Redis cache. */
export interface _RedisLinkedServerWithPropertiesList {
  /** The RedisLinkedServerWithProperties items on this page */
  value: RedisLinkedServerWithProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _redisLinkedServerWithPropertiesListDeserializer(
  item: any,
): _RedisLinkedServerWithPropertiesList {
  return {
    value: redisLinkedServerWithPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redisLinkedServerWithPropertiesArrayDeserializer(
  result: Array<RedisLinkedServerWithProperties>,
): any[] {
  return result.map((item) => {
    return redisLinkedServerWithPropertiesDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
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
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
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

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
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

/** A single Redis item in List or Get Operation. */
export interface RedisResource extends TrackedResource {
  /** Redis cache properties. */
  properties: RedisProperties;
  /** The availability zones. */
  zones?: string[];
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function redisResourceDeserializer(item: any): RedisResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: redisPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the redis cache. */
export interface RedisProperties extends RedisCreateProperties {
  /** Redis instance provisioning status. */
  readonly provisioningState?: ProvisioningState;
  /** Redis host name. */
  readonly hostName?: string;
  /** Redis non-SSL port. */
  readonly port?: number;
  /** Redis SSL port. */
  readonly sslPort?: number;
  /** The keys of the Redis cache - not set if this object is not the response to Create or Update redis cache */
  readonly accessKeys?: RedisAccessKeys;
  /** List of the linked servers associated with the cache */
  readonly linkedServers?: RedisLinkedServer[];
  /** List of the Redis instances associated with the cache */
  readonly instances?: RedisInstanceDetails[];
  /** List of private endpoint connection associated with the specified redis cache */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function redisPropertiesDeserializer(item: any): RedisProperties {
  return {
    sku: skuDeserializer(item["sku"]),
    subnetId: item["subnetId"],
    staticIP: item["staticIP"],
    redisConfiguration: !item["redisConfiguration"]
      ? item["redisConfiguration"]
      : redisCommonPropertiesRedisConfigurationDeserializer(item["redisConfiguration"]),
    redisVersion: item["redisVersion"],
    enableNonSslPort: item["enableNonSslPort"],
    replicasPerMaster: item["replicasPerMaster"],
    replicasPerPrimary: item["replicasPerPrimary"],
    tenantSettings: item["tenantSettings"],
    shardCount: item["shardCount"],
    minimumTlsVersion: item["minimumTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    updateChannel: item["updateChannel"],
    disableAccessKeyAuthentication: item["disableAccessKeyAuthentication"],
    zonalAllocationPolicy: item["zonalAllocationPolicy"],
    provisioningState: item["provisioningState"],
    hostName: item["hostName"],
    port: item["port"],
    sslPort: item["sslPort"],
    accessKeys: !item["accessKeys"]
      ? item["accessKeys"]
      : redisAccessKeysDeserializer(item["accessKeys"]),
    linkedServers: !item["linkedServers"]
      ? item["linkedServers"]
      : redisLinkedServerArrayDeserializer(item["linkedServers"]),
    instances: !item["instances"]
      ? item["instances"]
      : redisInstanceDetailsArrayDeserializer(item["instances"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** Redis instance provisioning status. */
export enum KnownProvisioningState {
  /** A create operation is in progress. */
  Creating = "Creating",
  /** A delete operation is in progress. */
  Deleting = "Deleting",
  /** The cache is disabled and cannot be used. */
  Disabled = "Disabled",
  /** An operation such as create or update failed. If you failed to create the cache it will not be in a usable state, so you should delete and recreate it. */
  Failed = "Failed",
  /** Georeplication link is in progress */
  Linking = "Linking",
  /** An operation is in progress */
  Provisioning = "Provisioning",
  /** A scaling operation encountered an error and recovery is in progress. */
  RecoveringScaleFailure = "RecoveringScaleFailure",
  /** A scaling operation is in progress */
  Scaling = "Scaling",
  /** The most recent operation successfully completed */
  Succeeded = "Succeeded",
  /** Georeplication unlink is in progress */
  Unlinking = "Unlinking",
  /** The cache may be being disabled */
  Unprovisioning = "Unprovisioning",
  /** An update operation is in progress. */
  Updating = "Updating",
  /** An AAD configuration update operation is in progress. */
  ConfiguringAAD = "ConfiguringAAD",
}

/**
 * Redis instance provisioning status. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: A create operation is in progress. \
 * **Deleting**: A delete operation is in progress. \
 * **Disabled**: The cache is disabled and cannot be used. \
 * **Failed**: An operation such as create or update failed. If you failed to create the cache it will not be in a usable state, so you should delete and recreate it. \
 * **Linking**: Georeplication link is in progress \
 * **Provisioning**: An operation is in progress \
 * **RecoveringScaleFailure**: A scaling operation encountered an error and recovery is in progress. \
 * **Scaling**: A scaling operation is in progress \
 * **Succeeded**: The most recent operation successfully completed \
 * **Unlinking**: Georeplication unlink is in progress \
 * **Unprovisioning**: The cache may be being disabled \
 * **Updating**: An update operation is in progress. \
 * **ConfiguringAAD**: An AAD configuration update operation is in progress.
 */
export type ProvisioningState = string;

/** Redis cache access keys. */
export interface RedisAccessKeys {
  /** The current primary key that clients can use to authenticate with Redis cache. */
  readonly primaryKey?: string;
  /** The current secondary key that clients can use to authenticate with Redis cache. */
  readonly secondaryKey?: string;
}

export function redisAccessKeysDeserializer(item: any): RedisAccessKeys {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

export function redisLinkedServerArrayDeserializer(result: Array<RedisLinkedServer>): any[] {
  return result.map((item) => {
    return redisLinkedServerDeserializer(item);
  });
}

/** Linked server Id */
export interface RedisLinkedServer {
  /** Linked server Id. */
  readonly id?: string;
}

export function redisLinkedServerDeserializer(item: any): RedisLinkedServer {
  return {
    id: item["id"],
  };
}

export function redisInstanceDetailsArrayDeserializer(result: Array<RedisInstanceDetails>): any[] {
  return result.map((item) => {
    return redisInstanceDetailsDeserializer(item);
  });
}

/** Details of single instance of redis. */
export interface RedisInstanceDetails {
  /** Redis instance SSL port. */
  readonly sslPort?: number;
  /** If enableNonSslPort is true, provides Redis instance Non-SSL port. */
  readonly nonSslPort?: number;
  /** If the Cache uses availability zones, specifies availability zone where this instance is located. */
  readonly zone?: string;
  /** If clustering is enabled, the Shard ID of Redis Instance */
  readonly shardId?: number;
  /** Specifies whether the instance is a primary node. */
  readonly isMaster?: boolean;
  /** Specifies whether the instance is a primary node. */
  readonly isPrimary?: boolean;
}

export function redisInstanceDetailsDeserializer(item: any): RedisInstanceDetails {
  return {
    sslPort: item["sslPort"],
    nonSslPort: item["nonSslPort"],
    zone: item["zone"],
    shardId: item["shardId"],
    isMaster: item["isMaster"],
    isPrimary: item["isPrimary"],
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

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Properties supplied to Create Redis operation. */
export interface RedisCreateProperties extends RedisCommonProperties {
  /** The SKU of the Redis cache to deploy. */
  sku: Sku;
  /** The full resource ID of a subnet in a virtual network to deploy the Redis cache in. Example format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/Microsoft.{Network|ClassicNetwork}/VirtualNetworks/vnet1/subnets/subnet1 */
  subnetId?: string;
  /** Static IP address. Optionally, may be specified when deploying a Redis cache inside an existing Azure Virtual Network; auto assigned by default. */
  staticIP?: string;
}

export function redisCreatePropertiesSerializer(item: RedisCreateProperties): any {
  return {
    redisConfiguration: !item["redisConfiguration"]
      ? item["redisConfiguration"]
      : redisCommonPropertiesRedisConfigurationSerializer(item["redisConfiguration"]),
    redisVersion: item["redisVersion"],
    enableNonSslPort: item["enableNonSslPort"],
    replicasPerMaster: item["replicasPerMaster"],
    replicasPerPrimary: item["replicasPerPrimary"],
    tenantSettings: item["tenantSettings"],
    shardCount: item["shardCount"],
    minimumTlsVersion: item["minimumTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    updateChannel: item["updateChannel"],
    disableAccessKeyAuthentication: item["disableAccessKeyAuthentication"],
    zonalAllocationPolicy: item["zonalAllocationPolicy"],
    sku: skuSerializer(item["sku"]),
    subnetId: item["subnetId"],
    staticIP: item["staticIP"],
  };
}

export function redisCreatePropertiesDeserializer(item: any): RedisCreateProperties {
  return {
    redisConfiguration: !item["redisConfiguration"]
      ? item["redisConfiguration"]
      : redisCommonPropertiesRedisConfigurationDeserializer(item["redisConfiguration"]),
    redisVersion: item["redisVersion"],
    enableNonSslPort: item["enableNonSslPort"],
    replicasPerMaster: item["replicasPerMaster"],
    replicasPerPrimary: item["replicasPerPrimary"],
    tenantSettings: item["tenantSettings"],
    shardCount: item["shardCount"],
    minimumTlsVersion: item["minimumTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    updateChannel: item["updateChannel"],
    disableAccessKeyAuthentication: item["disableAccessKeyAuthentication"],
    zonalAllocationPolicy: item["zonalAllocationPolicy"],
    sku: skuDeserializer(item["sku"]),
    subnetId: item["subnetId"],
    staticIP: item["staticIP"],
  };
}

/** SKU parameters supplied to the create Redis operation. */
export interface Sku {
  /** The type of Redis cache to deploy. Valid values: (Basic, Standard, Premium) */
  name: SkuName;
  /** The SKU family to use. Valid values: (C, P). (C = Basic/Standard, P = Premium). */
  family: SkuFamily;
  /** The size of the Redis cache to deploy. Valid values: for C (Basic/Standard) family (0, 1, 2, 3, 4, 5, 6), for P (Premium) family (1, 2, 3, 4). */
  capacity: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** The type of Redis cache to deploy. Valid values: (Basic, Standard, Premium) */
export enum KnownSkuName {
  /** The well known 'Basic' SKU for Azure Cache for Redis. Basic SKU does not have an availability SLA. */
  Basic = "Basic",
  /** The well known 'Standard' SKU for Azure Cache for Redis. Standard SKU has an availability SLA. */
  Standard = "Standard",
  /** The well known 'Premium' SKU for Azure Cache for Redis. Premium SKU has an availability SLA, and higher performance tiers and more features compared with Standard SKU. */
  Premium = "Premium",
}

/**
 * The type of Redis cache to deploy. Valid values: (Basic, Standard, Premium) \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: The well known 'Basic' SKU for Azure Cache for Redis. Basic SKU does not have an availability SLA. \
 * **Standard**: The well known 'Standard' SKU for Azure Cache for Redis. Standard SKU has an availability SLA. \
 * **Premium**: The well known 'Premium' SKU for Azure Cache for Redis. Premium SKU has an availability SLA, and higher performance tiers and more features compared with Standard SKU.
 */
export type SkuName = string;

/** The SKU family to use. Valid values: (C, P). (C = Basic/Standard, P = Premium). */
export enum KnownSkuFamily {
  /** The SKU family to use - must be 'C' for Basic/Standard SKU redis caches. */
  C = "C",
  /** The SKU family to use - must be 'P' for Premium SKU redis caches. */
  P = "P",
}

/**
 * The SKU family to use. Valid values: (C, P). (C = Basic/Standard, P = Premium). \
 * {@link KnownSkuFamily} can be used interchangeably with SkuFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **C**: The SKU family to use - must be 'C' for Basic\/Standard SKU redis caches. \
 * **P**: The SKU family to use - must be 'P' for Premium SKU redis caches.
 */
export type SkuFamily = string;

/** Create/Update/Get common properties of the redis cache. */
export interface RedisCommonProperties {
  /** All Redis Settings. Few possible keys: rdb-backup-enabled,rdb-storage-connection-string,rdb-backup-frequency,maxmemory-delta, maxmemory-policy,notify-keyspace-events, aof-backup-enabled, aof-storage-connection-string-0, aof-storage-connection-string-1 etc. */
  redisConfiguration?: RedisCommonPropertiesRedisConfiguration;
  /** Redis version. This should be in the form 'major[.minor]' (only 'major' is required) or the value 'latest' which refers to the latest stable Redis version that is available. Supported versions: 4.0, 6.0 (latest). Default value is 'latest'. */
  redisVersion?: string;
  /** Specifies whether the non-ssl Redis server port (6379) is enabled. */
  enableNonSslPort?: boolean;
  /** The number of replicas to be created per primary. */
  replicasPerMaster?: number;
  /** The number of replicas to be created per primary. */
  replicasPerPrimary?: number;
  /** A dictionary of tenant settings */
  tenantSettings?: Record<string, string>;
  /** The number of shards to be created on a Premium Cluster Cache. */
  shardCount?: number;
  /** Optional: requires clients to use a specified TLS version (or higher) to connect (e,g, '1.0', '1.1', '1.2') */
  minimumTlsVersion?: TlsVersion;
  /** Whether or not public endpoint access is allowed for this cache.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Optional: Specifies the update channel for the monthly Redis updates your Redis Cache will receive. Caches using 'Preview' update channel get latest Redis updates at least 4 weeks ahead of 'Stable' channel caches. Default value is 'Stable'. */
  updateChannel?: UpdateChannel;
  /** Authentication to Redis through access keys is disabled when set as true. Default value is false. */
  disableAccessKeyAuthentication?: boolean;
  /** Optional: Specifies how availability zones are allocated to the Redis cache. 'Automatic' enables zone redundancy and Azure will automatically select zones based on regional availability and capacity. 'UserDefined' will select availability zones passed in by you using the 'zones' parameter. 'NoZones' will produce a non-zonal cache. If 'zonalAllocationPolicy' is not passed, it will be set to 'UserDefined' when zones are passed in, otherwise, it will be set to 'Automatic' in regions where zones are supported and 'NoZones' in regions where zones are not supported. */
  zonalAllocationPolicy?: ZonalAllocationPolicy;
}

export function redisCommonPropertiesSerializer(item: RedisCommonProperties): any {
  return {
    redisConfiguration: !item["redisConfiguration"]
      ? item["redisConfiguration"]
      : redisCommonPropertiesRedisConfigurationSerializer(item["redisConfiguration"]),
    redisVersion: item["redisVersion"],
    enableNonSslPort: item["enableNonSslPort"],
    replicasPerMaster: item["replicasPerMaster"],
    replicasPerPrimary: item["replicasPerPrimary"],
    tenantSettings: item["tenantSettings"],
    shardCount: item["shardCount"],
    minimumTlsVersion: item["minimumTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    updateChannel: item["updateChannel"],
    disableAccessKeyAuthentication: item["disableAccessKeyAuthentication"],
    zonalAllocationPolicy: item["zonalAllocationPolicy"],
  };
}

export function redisCommonPropertiesDeserializer(item: any): RedisCommonProperties {
  return {
    redisConfiguration: !item["redisConfiguration"]
      ? item["redisConfiguration"]
      : redisCommonPropertiesRedisConfigurationDeserializer(item["redisConfiguration"]),
    redisVersion: item["redisVersion"],
    enableNonSslPort: item["enableNonSslPort"],
    replicasPerMaster: item["replicasPerMaster"],
    replicasPerPrimary: item["replicasPerPrimary"],
    tenantSettings: item["tenantSettings"],
    shardCount: item["shardCount"],
    minimumTlsVersion: item["minimumTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    updateChannel: item["updateChannel"],
    disableAccessKeyAuthentication: item["disableAccessKeyAuthentication"],
    zonalAllocationPolicy: item["zonalAllocationPolicy"],
  };
}

/** All Redis Settings. Few possible keys: rdb-backup-enabled,rdb-storage-connection-string,rdb-backup-frequency,maxmemory-delta, maxmemory-policy,notify-keyspace-events, aof-backup-enabled, aof-storage-connection-string-0, aof-storage-connection-string-1 etc. */
export interface RedisCommonPropertiesRedisConfiguration {
  /** Specifies whether the RDB backup is enabled */
  rdbBackupEnabled?: string;
  /** Specifies the frequency for creating rdb backup in minutes. Valid values: (15, 30, 60, 360, 720, 1440) */
  rdbBackupFrequency?: string;
  /** Specifies the maximum number of snapshots for rdb backup */
  rdbBackupMaxSnapshotCount?: string;
  /** The storage account connection string for storing rdb file */
  rdbStorageConnectionString?: string;
  /** Specifies whether the aof backup is enabled */
  aofBackupEnabled?: string;
  /** First storage account connection string */
  aofStorageConnectionString0?: string;
  /** Second storage account connection string */
  aofStorageConnectionString1?: string;
  /** Value in megabytes reserved for fragmentation per shard */
  maxfragmentationmemoryReserved?: string;
  /** The eviction strategy used when your data won't fit within its memory limit. */
  maxmemoryPolicy?: string;
  /** Value in megabytes reserved for non-cache usage per shard e.g. failover. */
  maxmemoryReserved?: string;
  /** Value in megabytes reserved for non-cache usage per shard e.g. failover. */
  maxmemoryDelta?: string;
  /** The max clients config */
  readonly maxclients?: string;
  /** The keyspace events which should be monitored. */
  notifyKeyspaceEvents?: string;
  /** Preferred auth method to communicate to storage account used for data archive, specify SAS or ManagedIdentity, default value is SAS */
  readonly preferredDataArchiveAuthMethod?: string;
  /** Preferred auth method to communicate to storage account used for data persistence, specify SAS or ManagedIdentity, default value is SAS */
  preferredDataPersistenceAuthMethod?: string;
  /** Zonal Configuration */
  readonly zonalConfiguration?: string;
  /** Specifies whether the authentication is disabled. Setting this property is highly discouraged from security point of view; you should never disable authentication using this property! */
  authnotrequired?: string;
  /** SubscriptionId of the storage account for persistence (aof/rdb) using ManagedIdentity. */
  storageSubscriptionId?: string;
  /** Specifies whether AAD based authentication has been enabled or disabled for the cache */
  aadEnabled?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function redisCommonPropertiesRedisConfigurationSerializer(
  item: RedisCommonPropertiesRedisConfiguration,
): any {
  return {
    ...serializeRecord(item.additionalProperties),
    "rdb-backup-enabled": item["rdbBackupEnabled"],
    "rdb-backup-frequency": item["rdbBackupFrequency"],
    "rdb-backup-max-snapshot-count": item["rdbBackupMaxSnapshotCount"],
    "rdb-storage-connection-string": item["rdbStorageConnectionString"],
    "aof-backup-enabled": item["aofBackupEnabled"],
    "aof-storage-connection-string-0": item["aofStorageConnectionString0"],
    "aof-storage-connection-string-1": item["aofStorageConnectionString1"],
    "maxfragmentationmemory-reserved": item["maxfragmentationmemoryReserved"],
    "maxmemory-policy": item["maxmemoryPolicy"],
    "maxmemory-reserved": item["maxmemoryReserved"],
    "maxmemory-delta": item["maxmemoryDelta"],
    "notify-keyspace-events": item["notifyKeyspaceEvents"],
    "preferred-data-persistence-auth-method": item["preferredDataPersistenceAuthMethod"],
    authnotrequired: item["authnotrequired"],
    "storage-subscription-id": item["storageSubscriptionId"],
    "aad-enabled": item["aadEnabled"],
  };
}

export function redisCommonPropertiesRedisConfigurationDeserializer(
  item: any,
): RedisCommonPropertiesRedisConfiguration {
  return {
    additionalProperties: serializeRecord(item, [
      "rdbBackupEnabled",
      "rdbBackupFrequency",
      "rdbBackupMaxSnapshotCount",
      "rdbStorageConnectionString",
      "aofBackupEnabled",
      "aofStorageConnectionString0",
      "aofStorageConnectionString1",
      "maxfragmentationmemoryReserved",
      "maxmemoryPolicy",
      "maxmemoryReserved",
      "maxmemoryDelta",
      "maxclients",
      "notifyKeyspaceEvents",
      "preferredDataArchiveAuthMethod",
      "preferredDataPersistenceAuthMethod",
      "zonalConfiguration",
      "authnotrequired",
      "storageSubscriptionId",
      "aadEnabled",
    ]),
    rdbBackupEnabled: item["rdb-backup-enabled"],
    rdbBackupFrequency: item["rdb-backup-frequency"],
    rdbBackupMaxSnapshotCount: item["rdb-backup-max-snapshot-count"],
    rdbStorageConnectionString: item["rdb-storage-connection-string"],
    aofBackupEnabled: item["aof-backup-enabled"],
    aofStorageConnectionString0: item["aof-storage-connection-string-0"],
    aofStorageConnectionString1: item["aof-storage-connection-string-1"],
    maxfragmentationmemoryReserved: item["maxfragmentationmemory-reserved"],
    maxmemoryPolicy: item["maxmemory-policy"],
    maxmemoryReserved: item["maxmemory-reserved"],
    maxmemoryDelta: item["maxmemory-delta"],
    maxclients: item["maxclients"],
    notifyKeyspaceEvents: item["notify-keyspace-events"],
    preferredDataArchiveAuthMethod: item["preferred-data-archive-auth-method"],
    preferredDataPersistenceAuthMethod: item["preferred-data-persistence-auth-method"],
    zonalConfiguration: item["zonal-configuration"],
    authnotrequired: item["authnotrequired"],
    storageSubscriptionId: item["storage-subscription-id"],
    aadEnabled: item["aad-enabled"],
  };
}

/** Optional: requires clients to use a specified TLS version (or higher) to connect (e,g, '1.0', '1.1', '1.2') */
export enum KnownTlsVersion {
  /** TLS protocol version 1.0 -- deprecated for security reasons. Do not use this value for new caches. */
  One0 = "1.0",
  /** TLS protocol version 1.1 -- deprecated for security reasons. Do not use this value for new caches. */
  One1 = "1.1",
  /** TLS protocol version 1.2 -- use this value, or higher, for new caches. Or do not specify, so that your cache uses the recommended default value */
  One2 = "1.2",
}

/**
 * Optional: requires clients to use a specified TLS version (or higher) to connect (e,g, '1.0', '1.1', '1.2') \
 * {@link KnownTlsVersion} can be used interchangeably with TlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0**: TLS protocol version 1.0 -- deprecated for security reasons. Do not use this value for new caches. \
 * **1.1**: TLS protocol version 1.1 -- deprecated for security reasons. Do not use this value for new caches. \
 * **1.2**: TLS protocol version 1.2 -- use this value, or higher, for new caches. Or do not specify, so that your cache uses the recommended default value
 */
export type TlsVersion = string;

/** Whether or not public endpoint access is allowed for this cache.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' */
export enum KnownPublicNetworkAccess {
  /** Public internet access to the cache, via its public IP address, is enabled. Connections may use any network path. */
  Enabled = "Enabled",
  /** Public internet access to the cache, via its public IP address, is disabled. Connections must use be made via private endpoints. */
  Disabled = "Disabled",
}

/**
 * Whether or not public endpoint access is allowed for this cache.  Value is optional but if passed in, must be 'Enabled' or 'Disabled'. If 'Disabled', private endpoints are the exclusive access method. Default value is 'Enabled' \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Public internet access to the cache, via its public IP address, is enabled. Connections may use any network path. \
 * **Disabled**: Public internet access to the cache, via its public IP address, is disabled. Connections must use be made via private endpoints.
 */
export type PublicNetworkAccess = string;

/** Optional: Specifies the update channel for the monthly Redis updates your Redis Cache will receive. Caches using 'Preview' update channel get latest Redis updates at least 4 weeks ahead of 'Stable' channel caches. Default value is 'Stable'. */
export enum KnownUpdateChannel {
  /** Stable channel receives updates, which may include important security and stability updates, later than Preview channel. */
  Stable = "Stable",
  /** Preview channel normally receives updates before Stable channel, and is the recommended channel for non-production workloads. */
  Preview = "Preview",
}

/**
 * Optional: Specifies the update channel for the monthly Redis updates your Redis Cache will receive. Caches using 'Preview' update channel get latest Redis updates at least 4 weeks ahead of 'Stable' channel caches. Default value is 'Stable'. \
 * {@link KnownUpdateChannel} can be used interchangeably with UpdateChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stable**: Stable channel receives updates, which may include important security and stability updates, later than Preview channel. \
 * **Preview**: Preview channel normally receives updates before Stable channel, and is the recommended channel for non-production workloads.
 */
export type UpdateChannel = string;

/** Optional: Specifies how availability zones are allocated to the Redis cache. 'Automatic' enables zone redundancy and Azure will automatically select zones based on regional availability and capacity. 'UserDefined' will select availability zones passed in by you using the 'zones' parameter. 'NoZones' will produce a non-zonal cache. If 'zonalAllocationPolicy' is not passed, it will be set to 'UserDefined' when zones are passed in, otherwise, it will be set to 'Automatic' in regions where zones are supported and 'NoZones' in regions where zones are not supported. */
export enum KnownZonalAllocationPolicy {
  /** The zones for the cache will be selected automatically based on availability and capacity. */
  Automatic = "Automatic",
  /** UserDefined means the zones for the cache are manually configured using the 'zones' property, and can not be automatically selected. */
  UserDefined = "UserDefined",
  /** The cache will not use multiple availability zones. */
  NoZones = "NoZones",
}

/**
 * Optional: Specifies how availability zones are allocated to the Redis cache. 'Automatic' enables zone redundancy and Azure will automatically select zones based on regional availability and capacity. 'UserDefined' will select availability zones passed in by you using the 'zones' parameter. 'NoZones' will produce a non-zonal cache. If 'zonalAllocationPolicy' is not passed, it will be set to 'UserDefined' when zones are passed in, otherwise, it will be set to 'Automatic' in regions where zones are supported and 'NoZones' in regions where zones are not supported. \
 * {@link KnownZonalAllocationPolicy} can be used interchangeably with ZonalAllocationPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: The zones for the cache will be selected automatically based on availability and capacity. \
 * **UserDefined**: UserDefined means the zones for the cache are manually configured using the 'zones' property, and can not be automatically selected. \
 * **NoZones**: The cache will not use multiple availability zones.
 */
export type ZonalAllocationPolicy = string;

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

/** Parameters supplied to the Create Redis operation. */
export interface RedisCreateParameters {
  /** Redis cache properties. */
  properties: RedisCreateProperties;
  /** A list of availability zones denoting where the resource needs to come from. */
  zones?: string[];
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: ManagedServiceIdentity;
}

export function redisCreateParametersSerializer(item: RedisCreateParameters): any {
  return {
    properties: redisCreatePropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Parameters supplied to the Update Redis operation. */
export interface RedisUpdateParameters {
  /** Redis cache properties. */
  properties?: RedisUpdateProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: ManagedServiceIdentity;
}

export function redisUpdateParametersSerializer(item: RedisUpdateParameters): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : redisUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Patchable properties of the redis cache. */
export interface RedisUpdateProperties extends RedisCommonProperties {
  /** The SKU of the Redis cache to deploy. */
  sku?: Sku;
}

export function redisUpdatePropertiesSerializer(item: RedisUpdateProperties): any {
  return {
    redisConfiguration: !item["redisConfiguration"]
      ? item["redisConfiguration"]
      : redisCommonPropertiesRedisConfigurationSerializer(item["redisConfiguration"]),
    redisVersion: item["redisVersion"],
    enableNonSslPort: item["enableNonSslPort"],
    replicasPerMaster: item["replicasPerMaster"],
    replicasPerPrimary: item["replicasPerPrimary"],
    tenantSettings: item["tenantSettings"],
    shardCount: item["shardCount"],
    minimumTlsVersion: item["minimumTlsVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    updateChannel: item["updateChannel"],
    disableAccessKeyAuthentication: item["disableAccessKeyAuthentication"],
    zonalAllocationPolicy: item["zonalAllocationPolicy"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

/** The response of list Redis operation. */
export interface _RedisListResult {
  /** The RedisResource items on this page */
  value: RedisResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _redisListResultDeserializer(item: any): _RedisListResult {
  return {
    value: redisResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redisResourceArrayDeserializer(result: Array<RedisResource>): any[] {
  return result.map((item) => {
    return redisResourceDeserializer(item);
  });
}

/** The response of listUpgradeNotifications. */
export interface _NotificationListResponse {
  /** The UpgradeNotification items on this page */
  value: UpgradeNotification[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _notificationListResponseDeserializer(item: any): _NotificationListResponse {
  return {
    value: upgradeNotificationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function upgradeNotificationArrayDeserializer(result: Array<UpgradeNotification>): any[] {
  return result.map((item) => {
    return upgradeNotificationDeserializer(item);
  });
}

/** Properties of upgrade notification. */
export interface UpgradeNotification {
  /** Name of upgrade notification. */
  readonly name?: string;
  /** Timestamp when upgrade notification occurred. */
  readonly timestamp?: Date;
  /** Details about this upgrade notification */
  readonly upsellNotification?: Record<string, string>;
}

export function upgradeNotificationDeserializer(item: any): UpgradeNotification {
  return {
    name: item["name"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    upsellNotification: item["upsellNotification"],
  };
}

/** Specifies which Redis access keys to reset. */
export interface RedisRegenerateKeyParameters {
  /** The Redis access key to regenerate. */
  keyType: RedisKeyType;
}

export function redisRegenerateKeyParametersSerializer(item: RedisRegenerateKeyParameters): any {
  return { keyType: item["keyType"] };
}

/** The Redis access key to regenerate. */
export type RedisKeyType = "Primary" | "Secondary";

/** Specifies which Redis node(s) to reboot. */
export interface RedisRebootParameters {
  /** Which Redis node(s) to reboot. Depending on this value data loss is possible. */
  rebootType?: RebootType;
  /** If clustering is enabled, the ID of the shard to be rebooted. */
  shardId?: number;
  /** A list of redis instances to reboot, specified by per-instance SSL ports or non-SSL ports. */
  ports?: number[];
}

export function redisRebootParametersSerializer(item: RedisRebootParameters): any {
  return {
    rebootType: item["rebootType"],
    shardId: item["shardId"],
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

/** Which Redis node(s) to reboot. Depending on this value data loss is possible. */
export enum KnownRebootType {
  /** Reboot the primary nodes used for redis write operations. (This may trigger role changes.) */
  PrimaryNode = "PrimaryNode",
  /** Reboot only the secondary or replica nodes */
  SecondaryNode = "SecondaryNode",
  /** Reboot all nodes, not guaranteed to happen simultaneously. */
  AllNodes = "AllNodes",
}

/**
 * Which Redis node(s) to reboot. Depending on this value data loss is possible. \
 * {@link KnownRebootType} can be used interchangeably with RebootType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrimaryNode**: Reboot the primary nodes used for redis write operations. (This may trigger role changes.) \
 * **SecondaryNode**: Reboot only the secondary or replica nodes \
 * **AllNodes**: Reboot all nodes, not guaranteed to happen simultaneously.
 */
export type RebootType = string;

/** Response to force reboot for Redis cache. */
export interface RedisForceRebootResponse {
  /** Status message */
  readonly message?: string;
}

export function redisForceRebootResponseDeserializer(item: any): RedisForceRebootResponse {
  return {
    message: item["message"],
  };
}

/** Parameters for Redis import operation. */
export interface ImportRDBParameters {
  /** File format. */
  format?: string;
  /** files to import. */
  files: string[];
  /** Preferred auth method to communicate to storage account used for data archive, specify SAS or ManagedIdentity, default value is SAS */
  preferredDataArchiveAuthMethod?: string;
  /** Subscription id of the storage container containing files to import using Managed Identity. */
  storageSubscriptionId?: string;
}

export function importRDBParametersSerializer(item: ImportRDBParameters): any {
  return {
    format: item["format"],
    files: item["files"].map((p: any) => {
      return p;
    }),
    "preferred-data-archive-auth-method": item["preferredDataArchiveAuthMethod"],
    "storage-subscription-id": item["storageSubscriptionId"],
  };
}

/** Parameters for Redis export operation. */
export interface ExportRDBParameters {
  /** File format. */
  format?: string;
  /** Prefix to use for exported files. */
  prefix: string;
  /** Container name to export to. */
  container: string;
  /** Preferred auth method to communicate to storage account used for data archive, specify SAS or ManagedIdentity, default value is SAS */
  preferredDataArchiveAuthMethod?: string;
  /** Subscription id of the storage container for data to be exported using ManagedIdentity. */
  storageSubscriptionId?: string;
}

export function exportRDBParametersSerializer(item: ExportRDBParameters): any {
  return {
    format: item["format"],
    prefix: item["prefix"],
    container: item["container"],
    "preferred-data-archive-auth-method": item["preferredDataArchiveAuthMethod"],
    "storage-subscription-id": item["storageSubscriptionId"],
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

/** Parameters body to pass for resource name availability check. */
export interface CheckNameAvailabilityParameters {
  /** Resource name. */
  name: string;
  /** Resource type. The only legal value of this property for checking redis cache name availability is 'Microsoft.Cache/redis'. */
  type: string;
}

export function checkNameAvailabilityParametersSerializer(
  item: CheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
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

/** A private link resource. */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
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

/** A firewall rule on a redis cache has a name, and describes a contiguous range of IP addresses permitted to connect */
export interface RedisFirewallRule extends ProxyResource {
  /** redis cache firewall rule properties */
  properties: RedisFirewallRuleProperties;
}

export function redisFirewallRuleSerializer(item: RedisFirewallRule): any {
  return {
    properties: redisFirewallRulePropertiesSerializer(item["properties"]),
  };
}

export function redisFirewallRuleDeserializer(item: any): RedisFirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: redisFirewallRulePropertiesDeserializer(item["properties"]),
  };
}

/** Specifies a range of IP addresses permitted to connect to the cache */
export interface RedisFirewallRuleProperties {
  /** lowest IP address included in the range */
  startIP: string;
  /** highest IP address included in the range */
  endIP: string;
}

export function redisFirewallRulePropertiesSerializer(item: RedisFirewallRuleProperties): any {
  return { startIP: item["startIP"], endIP: item["endIP"] };
}

export function redisFirewallRulePropertiesDeserializer(item: any): RedisFirewallRuleProperties {
  return {
    startIP: item["startIP"],
    endIP: item["endIP"],
  };
}

/** The response of a RedisFirewallRule list operation. */
export interface _RedisFirewallRuleListResult {
  /** The RedisFirewallRule items on this page */
  value: RedisFirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _redisFirewallRuleListResultDeserializer(item: any): _RedisFirewallRuleListResult {
  return {
    value: redisFirewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redisFirewallRuleArraySerializer(result: Array<RedisFirewallRule>): any[] {
  return result.map((item) => {
    return redisFirewallRuleSerializer(item);
  });
}

export function redisFirewallRuleArrayDeserializer(result: Array<RedisFirewallRule>): any[] {
  return result.map((item) => {
    return redisFirewallRuleDeserializer(item);
  });
}

/** Response to put/get patch schedules for Redis cache. */
export interface RedisPatchSchedule extends ProxyResource {
  /** List of patch schedules for a Redis cache. */
  properties: ScheduleEntries;
  /** The geo-location where the resource lives */
  readonly location?: string;
}

export function redisPatchScheduleSerializer(item: RedisPatchSchedule): any {
  return { properties: scheduleEntriesSerializer(item["properties"]) };
}

export function redisPatchScheduleDeserializer(item: any): RedisPatchSchedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: scheduleEntriesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** List of patch schedules for a Redis cache. */
export interface ScheduleEntries {
  /** List of patch schedules for a Redis cache. */
  scheduleEntries: ScheduleEntry[];
}

export function scheduleEntriesSerializer(item: ScheduleEntries): any {
  return {
    scheduleEntries: scheduleEntryArraySerializer(item["scheduleEntries"]),
  };
}

export function scheduleEntriesDeserializer(item: any): ScheduleEntries {
  return {
    scheduleEntries: scheduleEntryArrayDeserializer(item["scheduleEntries"]),
  };
}

export function scheduleEntryArraySerializer(result: Array<ScheduleEntry>): any[] {
  return result.map((item) => {
    return scheduleEntrySerializer(item);
  });
}

export function scheduleEntryArrayDeserializer(result: Array<ScheduleEntry>): any[] {
  return result.map((item) => {
    return scheduleEntryDeserializer(item);
  });
}

/** Patch schedule entry for a Premium Redis Cache. */
export interface ScheduleEntry {
  /** Day of the week when a cache can be patched. */
  dayOfWeek: DayOfWeek;
  /** Start hour after which cache patching can start. */
  startHourUtc: number;
  /** ISO8601 timespan specifying how much time cache patching can take. */
  maintenanceWindow?: string;
}

export function scheduleEntrySerializer(item: ScheduleEntry): any {
  return {
    dayOfWeek: item["dayOfWeek"],
    startHourUtc: item["startHourUtc"],
    maintenanceWindow: item["maintenanceWindow"],
  };
}

export function scheduleEntryDeserializer(item: any): ScheduleEntry {
  return {
    dayOfWeek: item["dayOfWeek"],
    startHourUtc: item["startHourUtc"],
    maintenanceWindow: item["maintenanceWindow"],
  };
}

/** Day of the week when a cache can be patched. */
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | "Everyday"
  | "Weekend";

/** The name of the resource that is the target of a particular operation. For singleton resources, it must be 'Default'. */
export enum KnownDefaultName {
  /** The name of e.g. the patch schedules resource, which is a singleton, must always be 'Default' */
  Default = "default",
}

/**
 * The name of the resource that is the target of a particular operation. For singleton resources, it must be 'Default'. \
 * {@link KnownDefaultName} can be used interchangeably with DefaultName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **default**: The name of e.g. the patch schedules resource, which is a singleton, must always be 'Default'
 */
export type DefaultName = string;

/** The response of a RedisPatchSchedule list operation. */
export interface _RedisPatchScheduleListResult {
  /** The RedisPatchSchedule items on this page */
  value: RedisPatchSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _redisPatchScheduleListResultDeserializer(
  item: any,
): _RedisPatchScheduleListResult {
  return {
    value: redisPatchScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redisPatchScheduleArraySerializer(result: Array<RedisPatchSchedule>): any[] {
  return result.map((item) => {
    return redisPatchScheduleSerializer(item);
  });
}

export function redisPatchScheduleArrayDeserializer(result: Array<RedisPatchSchedule>): any[] {
  return result.map((item) => {
    return redisPatchScheduleDeserializer(item);
  });
}

/** Response to get/put access policy. */
export interface RedisCacheAccessPolicy extends ProxyResource {
  /** Properties of an access policy. */
  properties?: RedisCacheAccessPolicyProperties;
}

export function redisCacheAccessPolicySerializer(item: RedisCacheAccessPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : redisCacheAccessPolicyPropertiesSerializer(item["properties"]),
  };
}

export function redisCacheAccessPolicyDeserializer(item: any): RedisCacheAccessPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : redisCacheAccessPolicyPropertiesDeserializer(item["properties"]),
  };
}

/** All properties of an access policy. */
export interface RedisCacheAccessPolicyProperties {
  /** Provisioning state of access policy */
  readonly provisioningState?: AccessPolicyProvisioningState;
  /** Built-In or Custom access policy */
  readonly type?: AccessPolicyType;
  /** Permissions for the access policy. Learn how to configure permissions at https://aka.ms/redis/AADPreRequisites */
  permissions: string;
}

export function redisCacheAccessPolicyPropertiesSerializer(
  item: RedisCacheAccessPolicyProperties,
): any {
  return { permissions: item["permissions"] };
}

export function redisCacheAccessPolicyPropertiesDeserializer(
  item: any,
): RedisCacheAccessPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    type: item["type"],
    permissions: item["permissions"],
  };
}

/** Provisioning state of access policy */
export enum KnownAccessPolicyProvisioningState {
  /** An operation is in progress. */
  Updating = "Updating",
  /** The operation succeeded. */
  Succeeded = "Succeeded",
  /** A delete operation is in progress. */
  Deleting = "Deleting",
  /** The access policy is considered deleted, if it still exists. */
  Deleted = "Deleted",
  /** The operation was canceled. Access policies may be in a partially updated state. Update them again to have a well-defined state. */
  Canceled = "Canceled",
  /** The operation failed. Access policies may be in a partially updated state. Update them again to have a well-defined state. */
  Failed = "Failed",
}

/**
 * Provisioning state of access policy \
 * {@link KnownAccessPolicyProvisioningState} can be used interchangeably with AccessPolicyProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: An operation is in progress. \
 * **Succeeded**: The operation succeeded. \
 * **Deleting**: A delete operation is in progress. \
 * **Deleted**: The access policy is considered deleted, if it still exists. \
 * **Canceled**: The operation was canceled. Access policies may be in a partially updated state. Update them again to have a well-defined state. \
 * **Failed**: The operation failed. Access policies may be in a partially updated state. Update them again to have a well-defined state.
 */
export type AccessPolicyProvisioningState = string;

/** Built-In or Custom access policy */
export enum KnownAccessPolicyType {
  /** User-configurable access policy, using the redis access policy authoring language */
  Custom = "Custom",
  /** Built-in or well-known access policies, whose policy is not configurable. */
  BuiltIn = "BuiltIn",
}

/**
 * Built-In or Custom access policy \
 * {@link KnownAccessPolicyType} can be used interchangeably with AccessPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**: User-configurable access policy, using the redis access policy authoring language \
 * **BuiltIn**: Built-in or well-known access policies, whose policy is not configurable.
 */
export type AccessPolicyType = string;

/** List of access policies (with properties) of a Redis cache. */
export interface _RedisCacheAccessPolicyList {
  /** The RedisCacheAccessPolicy items on this page */
  value: RedisCacheAccessPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _redisCacheAccessPolicyListDeserializer(item: any): _RedisCacheAccessPolicyList {
  return {
    value: redisCacheAccessPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redisCacheAccessPolicyArraySerializer(
  result: Array<RedisCacheAccessPolicy>,
): any[] {
  return result.map((item) => {
    return redisCacheAccessPolicySerializer(item);
  });
}

export function redisCacheAccessPolicyArrayDeserializer(
  result: Array<RedisCacheAccessPolicy>,
): any[] {
  return result.map((item) => {
    return redisCacheAccessPolicyDeserializer(item);
  });
}

/** Response to an operation on access policy assignment */
export interface RedisCacheAccessPolicyAssignment extends ProxyResource {
  /** Properties of an access policy assignment */
  properties?: RedisCacheAccessPolicyAssignmentProperties;
}

export function redisCacheAccessPolicyAssignmentSerializer(
  item: RedisCacheAccessPolicyAssignment,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : redisCacheAccessPolicyAssignmentPropertiesSerializer(item["properties"]),
  };
}

export function redisCacheAccessPolicyAssignmentDeserializer(
  item: any,
): RedisCacheAccessPolicyAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : redisCacheAccessPolicyAssignmentPropertiesDeserializer(item["properties"]),
  };
}

/** Properties for an access policy assignment */
export interface RedisCacheAccessPolicyAssignmentProperties {
  /** Provisioning state of an access policy assignment set */
  readonly provisioningState?: AccessPolicyAssignmentProvisioningState;
  /** Object Id to assign access policy to */
  objectId: string;
  /** User friendly name for object id. Also represents username for token based authentication */
  objectIdAlias: string;
  /** The name of the access policy that is being assigned */
  accessPolicyName: string;
}

export function redisCacheAccessPolicyAssignmentPropertiesSerializer(
  item: RedisCacheAccessPolicyAssignmentProperties,
): any {
  return {
    objectId: item["objectId"],
    objectIdAlias: item["objectIdAlias"],
    accessPolicyName: item["accessPolicyName"],
  };
}

export function redisCacheAccessPolicyAssignmentPropertiesDeserializer(
  item: any,
): RedisCacheAccessPolicyAssignmentProperties {
  return {
    provisioningState: item["provisioningState"],
    objectId: item["objectId"],
    objectIdAlias: item["objectIdAlias"],
    accessPolicyName: item["accessPolicyName"],
  };
}

/** Provisioning state of an access policy assignment set */
export enum KnownAccessPolicyAssignmentProvisioningState {
  /** The access policy assignments are being updated */
  Updating = "Updating",
  /** The access policy assignments were successfully updated */
  Succeeded = "Succeeded",
  /** The access policy assignments are being deleted */
  Deleting = "Deleting",
  /** The access policy assignments are considered deleted, meaning no custom access policies are applied. */
  Deleted = "Deleted",
  /** The operation was canceled. Access policy assignments may be in a partially updated state. Update them again to have a well-defined state. */
  Canceled = "Canceled",
  /** The operation failed. Access policy assignments may be in a partially updated state. Update them again to have a well-defined state. */
  Failed = "Failed",
}

/**
 * Provisioning state of an access policy assignment set \
 * {@link KnownAccessPolicyAssignmentProvisioningState} can be used interchangeably with AccessPolicyAssignmentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: The access policy assignments are being updated \
 * **Succeeded**: The access policy assignments were successfully updated \
 * **Deleting**: The access policy assignments are being deleted \
 * **Deleted**: The access policy assignments are considered deleted, meaning no custom access policies are applied. \
 * **Canceled**: The operation was canceled. Access policy assignments may be in a partially updated state. Update them again to have a well-defined state. \
 * **Failed**: The operation failed. Access policy assignments may be in a partially updated state. Update them again to have a well-defined state.
 */
export type AccessPolicyAssignmentProvisioningState = string;

/** List of access policies assignments (with properties) of a Redis cache. */
export interface _RedisCacheAccessPolicyAssignmentList {
  /** The RedisCacheAccessPolicyAssignment items on this page */
  value: RedisCacheAccessPolicyAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _redisCacheAccessPolicyAssignmentListDeserializer(
  item: any,
): _RedisCacheAccessPolicyAssignmentList {
  return {
    value: redisCacheAccessPolicyAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function redisCacheAccessPolicyAssignmentArraySerializer(
  result: Array<RedisCacheAccessPolicyAssignment>,
): any[] {
  return result.map((item) => {
    return redisCacheAccessPolicyAssignmentSerializer(item);
  });
}

export function redisCacheAccessPolicyAssignmentArrayDeserializer(
  result: Array<RedisCacheAccessPolicyAssignment>,
): any[] {
  return result.map((item) => {
    return redisCacheAccessPolicyAssignmentDeserializer(item);
  });
}

/** Asynchronous operation status */
export interface OperationStatus extends OperationStatusResult {
  /** Additional properties from RP, only when operation is successful */
  properties?: Record<string, any>;
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
    properties: item["properties"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01 API version. */
  V20241101 = "2024-11-01",
}
