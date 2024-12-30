// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Schema version's definition. */
export interface SchemaVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaVersionProperties;
}

export function schemaVersionSerializer(item: SchemaVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesSerializer(item["properties"]),
  };
}

export function schemaVersionDeserializer(item: any): SchemaVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the schema version properties. */
export interface SchemaVersionProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Human-readable description of the schema. */
  description?: string;
  /** Schema content. */
  schemaContent: string;
  /** Hash of the schema content. */
  readonly hash?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function schemaVersionPropertiesSerializer(item: SchemaVersionProperties): any {
  return {
    description: item["description"],
    schemaContent: item["schemaContent"],
  };
}

export function schemaVersionPropertiesDeserializer(item: any): SchemaVersionProperties {
  return {
    uuid: item["uuid"],
    description: item["description"],
    schemaContent: item["schemaContent"],
    hash: item["hash"],
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning status of the resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource has been accepted by the server. */
  Accepted = "Accepted",
  /** Resource is deleting. */
  Deleting = "Deleting",
}

/**
 * The provisioning status of the resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Resource has been accepted by the server. \
 * **Deleting**: Resource is deleting.
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

/** The response of a SchemaVersion list operation. */
export interface _SchemaVersionListResult {
  /** The SchemaVersion items on this page */
  value: SchemaVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaVersionListResultDeserializer(item: any): _SchemaVersionListResult {
  return {
    value: schemaVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaVersionArraySerializer(result: Array<SchemaVersion>): any[] {
  return result.map((item) => {
    return schemaVersionSerializer(item);
  });
}

export function schemaVersionArrayDeserializer(result: Array<SchemaVersion>): any[] {
  return result.map((item) => {
    return schemaVersionDeserializer(item);
  });
}

/** Schema definition. */
export interface Schema extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaProperties;
}

export function schemaSerializer(item: Schema): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaPropertiesSerializer(item["properties"]),
  };
}

export function schemaDeserializer(item: any): Schema {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the schema properties. */
export interface SchemaProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the schema. */
  description?: string;
  /** Format of the schema. */
  format: Format;
  /** Type of the schema. */
  schemaType: SchemaType;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Schema tags. */
  tags?: Record<string, string>;
}

export function schemaPropertiesSerializer(item: SchemaProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    format: item["format"],
    schemaType: item["schemaType"],
    tags: item["tags"],
  };
}

export function schemaPropertiesDeserializer(item: any): SchemaProperties {
  return {
    uuid: item["uuid"],
    displayName: item["displayName"],
    description: item["description"],
    format: item["format"],
    schemaType: item["schemaType"],
    provisioningState: item["provisioningState"],
    tags: item["tags"],
  };
}

/** Defines the schema format. */
export enum KnownFormat {
  /** JSON Schema version draft 7 format */
  JsonSchemaDraft7 = "JsonSchema/draft-07",
  /** Delta format */
  Delta_1_0 = "Delta/1.0",
}

/**
 * Defines the schema format. \
 * {@link KnownFormat} can be used interchangeably with Format,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **JsonSchema\/draft-07**: JSON Schema version draft 7 format \
 * **Delta\/1.0**: Delta format
 */
export type Format = string;

/** Defines the schema type. */
export enum KnownSchemaType {
  /** Message Schema schema type */
  MessageSchema = "MessageSchema",
}

/**
 * Defines the schema type. \
 * {@link KnownSchemaType} can be used interchangeably with SchemaType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MessageSchema**: Message Schema schema type
 */
export type SchemaType = string;

/** The response of a Schema list operation. */
export interface _SchemaListResult {
  /** The Schema items on this page */
  value: Schema[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaListResultDeserializer(item: any): _SchemaListResult {
  return {
    value: schemaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaArraySerializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaSerializer(item);
  });
}

export function schemaArrayDeserializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaDeserializer(item);
  });
}

/** Schema registry definition. */
export interface SchemaRegistry extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaRegistryProperties;
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
}

export function schemaRegistrySerializer(item: SchemaRegistry): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : schemaRegistryPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
  };
}

export function schemaRegistryDeserializer(item: any): SchemaRegistry {
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
      : schemaRegistryPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Defines the schema registry properties. */
export interface SchemaRegistryProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Schema registry namespace. Uniquely identifies a schema registry within a tenant. */
  namespace: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the schema registry. */
  description?: string;
  /** The Storage Account's Container URL where schemas will be stored. */
  storageAccountContainerUrl: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function schemaRegistryPropertiesSerializer(item: SchemaRegistryProperties): any {
  return {
    namespace: item["namespace"],
    displayName: item["displayName"],
    description: item["description"],
    storageAccountContainerUrl: item["storageAccountContainerUrl"],
  };
}

export function schemaRegistryPropertiesDeserializer(item: any): SchemaRegistryProperties {
  return {
    uuid: item["uuid"],
    namespace: item["namespace"],
    displayName: item["displayName"],
    description: item["description"],
    storageAccountContainerUrl: item["storageAccountContainerUrl"],
    provisioningState: item["provisioningState"],
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentitySerializer(item: SystemAssignedServiceIdentity): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityDeserializer(
  item: any,
): SystemAssignedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of managed service identity (either system assigned, or none). */
export enum KnownSystemAssignedServiceIdentityType {
  /** No managed system identity. */
  None = "None",
  /** System assigned managed system identity. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Type of managed service identity (either system assigned, or none). \
 * {@link KnownSystemAssignedServiceIdentityType} can be used interchangeably with SystemAssignedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed system identity. \
 * **SystemAssigned**: System assigned managed system identity.
 */
export type SystemAssignedServiceIdentityType = string;

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

/** The type used for update operations of the SchemaRegistry. */
export interface SchemaRegistryUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: SystemAssignedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SchemaRegistryUpdateProperties;
}

export function schemaRegistryUpdateSerializer(item: SchemaRegistryUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : systemAssignedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : schemaRegistryUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SchemaRegistry. */
export interface SchemaRegistryUpdateProperties {
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the schema registry. */
  description?: string;
}

export function schemaRegistryUpdatePropertiesSerializer(
  item: SchemaRegistryUpdateProperties,
): any {
  return { displayName: item["displayName"], description: item["description"] };
}

/** The response of a SchemaRegistry list operation. */
export interface _SchemaRegistryListResult {
  /** The SchemaRegistry items on this page */
  value: SchemaRegistry[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaRegistryListResultDeserializer(item: any): _SchemaRegistryListResult {
  return {
    value: schemaRegistryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaRegistryArraySerializer(result: Array<SchemaRegistry>): any[] {
  return result.map((item) => {
    return schemaRegistrySerializer(item);
  });
}

export function schemaRegistryArrayDeserializer(result: Array<SchemaRegistry>): any[] {
  return result.map((item) => {
    return schemaRegistryDeserializer(item);
  });
}

/** Discovered Asset Endpoint Profile definition. */
export interface DiscoveredAssetEndpointProfile extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DiscoveredAssetEndpointProfileProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function discoveredAssetEndpointProfileSerializer(
  item: DiscoveredAssetEndpointProfile,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : discoveredAssetEndpointProfilePropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function discoveredAssetEndpointProfileDeserializer(
  item: any,
): DiscoveredAssetEndpointProfile {
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
      : discoveredAssetEndpointProfilePropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the Discovered Asset Endpoint Profile properties. */
export interface DiscoveredAssetEndpointProfileProperties {
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress: string;
  /** Stringified JSON that contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
  /** List of supported authentication methods supported by the target server. */
  supportedAuthenticationMethods?: AuthenticationMethod[];
  /** Defines the configuration for the connector type that is being used with the endpoint profile. */
  endpointProfileType: string;
  /** Identifier used to detect changes in the asset endpoint profile. */
  discoveryId: string;
  /** An integer that is incremented each time the resource is modified. */
  version: number;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function discoveredAssetEndpointProfilePropertiesSerializer(
  item: DiscoveredAssetEndpointProfileProperties,
): any {
  return {
    targetAddress: item["targetAddress"],
    additionalConfiguration: item["additionalConfiguration"],
    supportedAuthenticationMethods: !item["supportedAuthenticationMethods"]
      ? item["supportedAuthenticationMethods"]
      : item["supportedAuthenticationMethods"].map((p: any) => {
          return p;
        }),
    endpointProfileType: item["endpointProfileType"],
    discoveryId: item["discoveryId"],
    version: item["version"],
  };
}

export function discoveredAssetEndpointProfilePropertiesDeserializer(
  item: any,
): DiscoveredAssetEndpointProfileProperties {
  return {
    targetAddress: item["targetAddress"],
    additionalConfiguration: item["additionalConfiguration"],
    supportedAuthenticationMethods: !item["supportedAuthenticationMethods"]
      ? item["supportedAuthenticationMethods"]
      : item["supportedAuthenticationMethods"].map((p: any) => {
          return p;
        }),
    endpointProfileType: item["endpointProfileType"],
    discoveryId: item["discoveryId"],
    version: item["version"],
    provisioningState: item["provisioningState"],
  };
}

/** The method to authenticate the user of the client at the server. */
export enum KnownAuthenticationMethod {
  /** The user authentication method is anonymous. */
  Anonymous = "Anonymous",
  /** The user authentication method is an x509 certificate. */
  Certificate = "Certificate",
  /** The user authentication method is a username and password. */
  UsernamePassword = "UsernamePassword",
}

/**
 * The method to authenticate the user of the client at the server. \
 * {@link KnownAuthenticationMethod} can be used interchangeably with AuthenticationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Anonymous**: The user authentication method is anonymous. \
 * **Certificate**: The user authentication method is an x509 certificate. \
 * **UsernamePassword**: The user authentication method is a username and password.
 */
export type AuthenticationMethod = string;

/** The extended location. */
export interface ExtendedLocation {
  /** The extended location type. */
  type: string;
  /** The extended location name. */
  name: string;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { type: item["type"], name: item["name"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** The type used for update operations of the DiscoveredAssetEndpointProfile. */
export interface DiscoveredAssetEndpointProfileUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: DiscoveredAssetEndpointProfileUpdateProperties;
}

export function discoveredAssetEndpointProfileUpdateSerializer(
  item: DiscoveredAssetEndpointProfileUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : discoveredAssetEndpointProfileUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the DiscoveredAssetEndpointProfile. */
export interface DiscoveredAssetEndpointProfileUpdateProperties {
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress?: string;
  /** Stringified JSON that contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
  /** List of supported authentication methods supported by the target server. */
  supportedAuthenticationMethods?: AuthenticationMethod[];
  /** Defines the configuration for the connector type that is being used with the endpoint profile. */
  endpointProfileType?: string;
  /** Identifier used to detect changes in the asset endpoint profile. */
  discoveryId?: string;
  /** An integer that is incremented each time the resource is modified. */
  version?: number;
}

export function discoveredAssetEndpointProfileUpdatePropertiesSerializer(
  item: DiscoveredAssetEndpointProfileUpdateProperties,
): any {
  return {
    targetAddress: item["targetAddress"],
    additionalConfiguration: item["additionalConfiguration"],
    supportedAuthenticationMethods: !item["supportedAuthenticationMethods"]
      ? item["supportedAuthenticationMethods"]
      : item["supportedAuthenticationMethods"].map((p: any) => {
          return p;
        }),
    endpointProfileType: item["endpointProfileType"],
    discoveryId: item["discoveryId"],
    version: item["version"],
  };
}

/** The response of a DiscoveredAssetEndpointProfile list operation. */
export interface _DiscoveredAssetEndpointProfileListResult {
  /** The DiscoveredAssetEndpointProfile items on this page */
  value: DiscoveredAssetEndpointProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discoveredAssetEndpointProfileListResultDeserializer(
  item: any,
): _DiscoveredAssetEndpointProfileListResult {
  return {
    value: discoveredAssetEndpointProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discoveredAssetEndpointProfileArraySerializer(
  result: Array<DiscoveredAssetEndpointProfile>,
): any[] {
  return result.map((item) => {
    return discoveredAssetEndpointProfileSerializer(item);
  });
}

export function discoveredAssetEndpointProfileArrayDeserializer(
  result: Array<DiscoveredAssetEndpointProfile>,
): any[] {
  return result.map((item) => {
    return discoveredAssetEndpointProfileDeserializer(item);
  });
}

/** Discovered Asset definition. */
export interface DiscoveredAsset extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DiscoveredAssetProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function discoveredAssetSerializer(item: DiscoveredAsset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : discoveredAssetPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function discoveredAssetDeserializer(item: any): DiscoveredAsset {
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
      : discoveredAssetPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the discovered asset properties. */
export interface DiscoveredAssetProperties {
  /** A reference to the asset endpoint profile (connection information) used by brokers to connect to an endpoint that provides data points for this asset. Must provide asset endpoint profile name. */
  assetEndpointProfileRef: string;
  /** Identifier used to detect changes in the asset. */
  discoveryId: string;
  /** An integer that is incremented each time the resource is modified. */
  version: number;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Object that describes the default topic information for the asset. */
  defaultTopic?: Topic;
  /** Array of datasets that are part of the asset. Each dataset spec describes the data points that make up the set. */
  datasets?: DiscoveredDataset[];
  /** Array of events that are part of the asset. Each event can have per-event configuration. */
  events?: DiscoveredEvent[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function discoveredAssetPropertiesSerializer(item: DiscoveredAssetProperties): any {
  return {
    assetEndpointProfileRef: item["assetEndpointProfileRef"],
    discoveryId: item["discoveryId"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicSerializer(item["defaultTopic"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : discoveredDatasetArraySerializer(item["datasets"]),
    events: !item["events"] ? item["events"] : discoveredEventArraySerializer(item["events"]),
  };
}

export function discoveredAssetPropertiesDeserializer(item: any): DiscoveredAssetProperties {
  return {
    assetEndpointProfileRef: item["assetEndpointProfileRef"],
    discoveryId: item["discoveryId"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicDeserializer(item["defaultTopic"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : discoveredDatasetArrayDeserializer(item["datasets"]),
    events: !item["events"] ? item["events"] : discoveredEventArrayDeserializer(item["events"]),
    provisioningState: item["provisioningState"],
  };
}

/** Object that describes the topic information. */
export interface Topic {
  /** The topic path for messages published to an MQTT broker. */
  path: string;
  /** When set to 'Keep', messages published to an MQTT broker will have the retain flag set. Default: 'Never'. */
  retain?: TopicRetainType;
}

export function topicSerializer(item: Topic): any {
  return { path: item["path"], retain: item["retain"] };
}

export function topicDeserializer(item: any): Topic {
  return {
    path: item["path"],
    retain: item["retain"],
  };
}

/** Topic retain types. */
export enum KnownTopicRetainType {
  /** Retain the messages. */
  Keep = "Keep",
  /** Never retain messages. */
  Never = "Never",
}

/**
 * Topic retain types. \
 * {@link KnownTopicRetainType} can be used interchangeably with TopicRetainType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Keep**: Retain the messages. \
 * **Never**: Never retain messages.
 */
export type TopicRetainType = string;

export function discoveredDatasetArraySerializer(result: Array<DiscoveredDataset>): any[] {
  return result.map((item) => {
    return discoveredDatasetSerializer(item);
  });
}

export function discoveredDatasetArrayDeserializer(result: Array<DiscoveredDataset>): any[] {
  return result.map((item) => {
    return discoveredDatasetDeserializer(item);
  });
}

/** Defines the dataset properties. */
export interface DiscoveredDataset {
  /** Name of the dataset. */
  name: string;
  /** Stringified JSON that contains connector-specific properties that describes configuration for the specific dataset. */
  datasetConfiguration?: string;
  /** Object that describes the topic information for the specific dataset. */
  topic?: Topic;
  /** Array of data points that are part of the dataset. Each data point can have per-data point configuration. */
  dataPoints?: DiscoveredDataPoint[];
}

export function discoveredDatasetSerializer(item: DiscoveredDataset): any {
  return {
    name: item["name"],
    datasetConfiguration: item["datasetConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : discoveredDataPointArraySerializer(item["dataPoints"]),
  };
}

export function discoveredDatasetDeserializer(item: any): DiscoveredDataset {
  return {
    name: item["name"],
    datasetConfiguration: item["datasetConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : discoveredDataPointArrayDeserializer(item["dataPoints"]),
  };
}

export function discoveredDataPointArraySerializer(result: Array<DiscoveredDataPoint>): any[] {
  return result.map((item) => {
    return discoveredDataPointSerializer(item);
  });
}

export function discoveredDataPointArrayDeserializer(result: Array<DiscoveredDataPoint>): any[] {
  return result.map((item) => {
    return discoveredDataPointDeserializer(item);
  });
}

/** Defines the data point properties. */
export interface DiscoveredDataPoint {
  /** The name of the data point. */
  name: string;
  /** The address of the source of the data in the asset (e.g. URL) so that a client can access the data source on the asset. */
  dataSource: string;
  /** Stringified JSON that contains connector-specific configuration for the data point. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  dataPointConfiguration?: string;
  /** UTC timestamp indicating when the data point was added or modified. */
  lastUpdatedOn?: Date;
}

export function discoveredDataPointSerializer(item: DiscoveredDataPoint): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    lastUpdatedOn: item["lastUpdatedOn"]?.toISOString(),
  };
}

export function discoveredDataPointDeserializer(item: any): DiscoveredDataPoint {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

export function discoveredEventArraySerializer(result: Array<DiscoveredEvent>): any[] {
  return result.map((item) => {
    return discoveredEventSerializer(item);
  });
}

export function discoveredEventArrayDeserializer(result: Array<DiscoveredEvent>): any[] {
  return result.map((item) => {
    return discoveredEventDeserializer(item);
  });
}

/** Defines the event properties. */
export interface DiscoveredEvent {
  /** The name of the event. */
  name: string;
  /** The address of the notifier of the event in the asset (e.g. URL) so that a client can access the event on the asset. */
  eventNotifier: string;
  /** Stringified JSON that contains connector-specific configuration for the event. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventConfiguration?: string;
  /** Object that describes the topic information for the specific event. */
  topic?: Topic;
  /** UTC timestamp indicating when the event was added or modified. */
  lastUpdatedOn?: Date;
}

export function discoveredEventSerializer(item: DiscoveredEvent): any {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
    lastUpdatedOn: item["lastUpdatedOn"]?.toISOString(),
  };
}

export function discoveredEventDeserializer(item: any): DiscoveredEvent {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
  };
}

/** The type used for update operations of the DiscoveredAsset. */
export interface DiscoveredAssetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: DiscoveredAssetUpdateProperties;
}

export function discoveredAssetUpdateSerializer(item: DiscoveredAssetUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : discoveredAssetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the DiscoveredAsset. */
export interface DiscoveredAssetUpdateProperties {
  /** Identifier used to detect changes in the asset. */
  discoveryId?: string;
  /** An integer that is incremented each time the resource is modified. */
  version?: number;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Object that describes the default topic information for the asset. */
  defaultTopic?: Topic;
  /** Array of datasets that are part of the asset. Each dataset spec describes the data points that make up the set. */
  datasets?: DiscoveredDataset[];
  /** Array of events that are part of the asset. Each event can have per-event configuration. */
  events?: DiscoveredEvent[];
}

export function discoveredAssetUpdatePropertiesSerializer(
  item: DiscoveredAssetUpdateProperties,
): any {
  return {
    discoveryId: item["discoveryId"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicSerializer(item["defaultTopic"]),
    datasets: !item["datasets"]
      ? item["datasets"]
      : discoveredDatasetArraySerializer(item["datasets"]),
    events: !item["events"] ? item["events"] : discoveredEventArraySerializer(item["events"]),
  };
}

/** The response of a DiscoveredAsset list operation. */
export interface _DiscoveredAssetListResult {
  /** The DiscoveredAsset items on this page */
  value: DiscoveredAsset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discoveredAssetListResultDeserializer(item: any): _DiscoveredAssetListResult {
  return {
    value: discoveredAssetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discoveredAssetArraySerializer(result: Array<DiscoveredAsset>): any[] {
  return result.map((item) => {
    return discoveredAssetSerializer(item);
  });
}

export function discoveredAssetArrayDeserializer(result: Array<DiscoveredAsset>): any[] {
  return result.map((item) => {
    return discoveredAssetDeserializer(item);
  });
}

/** billingContainer Model as Azure resource whose sole purpose is to keep track of billables resources under a subscription. */
export interface BillingContainer extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BillingContainerProperties;
  /** Resource ETag */
  readonly etag?: string;
}

export function billingContainerDeserializer(item: any): BillingContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingContainerPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Defines the billingContainer properties. */
export interface BillingContainerProperties {
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function billingContainerPropertiesDeserializer(item: any): BillingContainerProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The response of a BillingContainer list operation. */
export interface _BillingContainerListResult {
  /** The BillingContainer items on this page */
  value: BillingContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingContainerListResultDeserializer(item: any): _BillingContainerListResult {
  return {
    value: billingContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingContainerArrayDeserializer(result: Array<BillingContainer>): any[] {
  return result.map((item) => {
    return billingContainerDeserializer(item);
  });
}

/** Asset Endpoint Profile definition. */
export interface AssetEndpointProfile extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AssetEndpointProfileProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function assetEndpointProfileSerializer(item: AssetEndpointProfile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : assetEndpointProfilePropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function assetEndpointProfileDeserializer(item: any): AssetEndpointProfile {
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
      : assetEndpointProfilePropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the Asset Endpoint Profile properties. */
export interface AssetEndpointProfileProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress: string;
  /** Defines the configuration for the connector type that is being used with the endpoint profile. */
  endpointProfileType: string;
  /** Defines the client authentication mechanism to the server. */
  authentication?: Authentication;
  /** Stringified JSON that contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
  /** Reference to a discovered asset endpoint profile. Populated only if the asset endpoint profile has been created from discovery flow. Discovered asset endpoint profile name must be provided. */
  discoveredAssetEndpointProfileRef?: string;
  /** Read only object to reflect changes that have occurred on the Edge. Similar to Kubernetes status property for custom resources. */
  readonly status?: AssetEndpointProfileStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function assetEndpointProfilePropertiesSerializer(
  item: AssetEndpointProfileProperties,
): any {
  return {
    targetAddress: item["targetAddress"],
    endpointProfileType: item["endpointProfileType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
    additionalConfiguration: item["additionalConfiguration"],
    discoveredAssetEndpointProfileRef: item["discoveredAssetEndpointProfileRef"],
  };
}

export function assetEndpointProfilePropertiesDeserializer(
  item: any,
): AssetEndpointProfileProperties {
  return {
    uuid: item["uuid"],
    targetAddress: item["targetAddress"],
    endpointProfileType: item["endpointProfileType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationDeserializer(item["authentication"]),
    additionalConfiguration: item["additionalConfiguration"],
    discoveredAssetEndpointProfileRef: item["discoveredAssetEndpointProfileRef"],
    status: !item["status"]
      ? item["status"]
      : assetEndpointProfileStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Definition of the client authentication mechanism to the server. */
export interface Authentication {
  /** Defines the method to authenticate the user of the client at the server. */
  method: AuthenticationMethod;
  /** Defines the username and password references when UsernamePassword user authentication mode is selected. */
  usernamePasswordCredentials?: UsernamePasswordCredentials;
  /** Defines the certificate reference when Certificate user authentication mode is selected. */
  x509Credentials?: X509Credentials;
}

export function authenticationSerializer(item: Authentication): any {
  return {
    method: item["method"],
    usernamePasswordCredentials: !item["usernamePasswordCredentials"]
      ? item["usernamePasswordCredentials"]
      : usernamePasswordCredentialsSerializer(item["usernamePasswordCredentials"]),
    x509Credentials: !item["x509Credentials"]
      ? item["x509Credentials"]
      : x509CredentialsSerializer(item["x509Credentials"]),
  };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    method: item["method"],
    usernamePasswordCredentials: !item["usernamePasswordCredentials"]
      ? item["usernamePasswordCredentials"]
      : usernamePasswordCredentialsDeserializer(item["usernamePasswordCredentials"]),
    x509Credentials: !item["x509Credentials"]
      ? item["x509Credentials"]
      : x509CredentialsDeserializer(item["x509Credentials"]),
  };
}

/** The credentials for authentication mode UsernamePassword. */
export interface UsernamePasswordCredentials {
  /** The name of the secret containing the username. */
  usernameSecretName: string;
  /** The name of the secret containing the password. */
  passwordSecretName: string;
}

export function usernamePasswordCredentialsSerializer(item: UsernamePasswordCredentials): any {
  return {
    usernameSecretName: item["usernameSecretName"],
    passwordSecretName: item["passwordSecretName"],
  };
}

export function usernamePasswordCredentialsDeserializer(item: any): UsernamePasswordCredentials {
  return {
    usernameSecretName: item["usernameSecretName"],
    passwordSecretName: item["passwordSecretName"],
  };
}

/** The x509 certificate for authentication mode Certificate. */
export interface X509Credentials {
  /** The name of the secret containing the certificate and private key (e.g. stored as .der/.pem or .der/.pfx). */
  certificateSecretName: string;
}

export function x509CredentialsSerializer(item: X509Credentials): any {
  return { certificateSecretName: item["certificateSecretName"] };
}

export function x509CredentialsDeserializer(item: any): X509Credentials {
  return {
    certificateSecretName: item["certificateSecretName"],
  };
}

/** Defines the asset endpoint profile status properties. */
export interface AssetEndpointProfileStatus {
  /** Array object to transfer and persist errors that originate from the Edge. */
  readonly errors?: AssetEndpointProfileStatusError[];
}

export function assetEndpointProfileStatusDeserializer(item: any): AssetEndpointProfileStatus {
  return {
    errors: !item["errors"]
      ? item["errors"]
      : assetEndpointProfileStatusErrorArrayDeserializer(item["errors"]),
  };
}

export function assetEndpointProfileStatusErrorArrayDeserializer(
  result: Array<AssetEndpointProfileStatusError>,
): any[] {
  return result.map((item) => {
    return assetEndpointProfileStatusErrorDeserializer(item);
  });
}

/** Defines the asset endpoint profile status error properties. */
export interface AssetEndpointProfileStatusError {
  /** Error code for classification of errors (ex: 400, 404, 500, etc.). */
  readonly code?: number;
  /** Human readable helpful error message to provide additional context for error (ex: “targetAddress 'foo' is not a valid url”). */
  readonly message?: string;
}

export function assetEndpointProfileStatusErrorDeserializer(
  item: any,
): AssetEndpointProfileStatusError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The type used for update operations of the AssetEndpointProfile. */
export interface AssetEndpointProfileUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AssetEndpointProfileUpdateProperties;
}

export function assetEndpointProfileUpdateSerializer(item: AssetEndpointProfileUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : assetEndpointProfileUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AssetEndpointProfile. */
export interface AssetEndpointProfileUpdateProperties {
  /** The local valid URI specifying the network address/DNS name of a southbound device. The scheme part of the targetAddress URI specifies the type of the device. The additionalConfiguration field holds further connector type specific configuration. */
  targetAddress?: string;
  /** Defines the configuration for the connector type that is being used with the endpoint profile. */
  endpointProfileType?: string;
  /** Defines the client authentication mechanism to the server. */
  authentication?: Authentication;
  /** Stringified JSON that contains connectivity type specific further configuration (e.g. OPC UA, Modbus, ONVIF). */
  additionalConfiguration?: string;
}

export function assetEndpointProfileUpdatePropertiesSerializer(
  item: AssetEndpointProfileUpdateProperties,
): any {
  return {
    targetAddress: item["targetAddress"],
    endpointProfileType: item["endpointProfileType"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
    additionalConfiguration: item["additionalConfiguration"],
  };
}

/** The response of a AssetEndpointProfile list operation. */
export interface _AssetEndpointProfileListResult {
  /** The AssetEndpointProfile items on this page */
  value: AssetEndpointProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assetEndpointProfileListResultDeserializer(
  item: any,
): _AssetEndpointProfileListResult {
  return {
    value: assetEndpointProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assetEndpointProfileArraySerializer(result: Array<AssetEndpointProfile>): any[] {
  return result.map((item) => {
    return assetEndpointProfileSerializer(item);
  });
}

export function assetEndpointProfileArrayDeserializer(result: Array<AssetEndpointProfile>): any[] {
  return result.map((item) => {
    return assetEndpointProfileDeserializer(item);
  });
}

/** Asset definition. */
export interface Asset extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AssetProperties;
  /** The extended location. */
  extendedLocation: ExtendedLocation;
}

export function assetSerializer(item: Asset): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : assetPropertiesSerializer(item["properties"]),
    extendedLocation: extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function assetDeserializer(item: any): Asset {
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
      : assetPropertiesDeserializer(item["properties"]),
    extendedLocation: extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Defines the asset properties. */
export interface AssetProperties {
  /** Globally unique, immutable, non-reusable id. */
  readonly uuid?: string;
  /** Enabled/Disabled status of the asset. */
  enabled?: boolean;
  /** Asset id provided by the customer. */
  externalAssetId?: string;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** A reference to the asset endpoint profile (connection information) used by brokers to connect to an endpoint that provides data points for this asset. Must provide asset endpoint profile name. */
  assetEndpointProfileRef: string;
  /** An integer that is incremented each time the resource is modified. */
  readonly version?: number;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Reference to a list of discovered assets. Populated only if the asset has been created from discovery flow. Discovered asset names must be provided. */
  discoveredAssetRefs?: string[];
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Object that describes the default topic information for the asset. */
  defaultTopic?: Topic;
  /** Array of datasets that are part of the asset. Each dataset describes the data points that make up the set. */
  datasets?: Dataset[];
  /** Array of events that are part of the asset. Each event can have per-event configuration. */
  events?: Event[];
  /** Read only object to reflect changes that have occurred on the Edge. Similar to Kubernetes status property for custom resources. */
  readonly status?: AssetStatus;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function assetPropertiesSerializer(item: AssetProperties): any {
  return {
    enabled: item["enabled"],
    externalAssetId: item["externalAssetId"],
    displayName: item["displayName"],
    description: item["description"],
    assetEndpointProfileRef: item["assetEndpointProfileRef"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    discoveredAssetRefs: !item["discoveredAssetRefs"]
      ? item["discoveredAssetRefs"]
      : item["discoveredAssetRefs"].map((p: any) => {
          return p;
        }),
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicSerializer(item["defaultTopic"]),
    datasets: !item["datasets"] ? item["datasets"] : datasetArraySerializer(item["datasets"]),
    events: !item["events"] ? item["events"] : eventArraySerializer(item["events"]),
  };
}

export function assetPropertiesDeserializer(item: any): AssetProperties {
  return {
    uuid: item["uuid"],
    enabled: item["enabled"],
    externalAssetId: item["externalAssetId"],
    displayName: item["displayName"],
    description: item["description"],
    assetEndpointProfileRef: item["assetEndpointProfileRef"],
    version: item["version"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    discoveredAssetRefs: !item["discoveredAssetRefs"]
      ? item["discoveredAssetRefs"]
      : item["discoveredAssetRefs"].map((p: any) => {
          return p;
        }),
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicDeserializer(item["defaultTopic"]),
    datasets: !item["datasets"] ? item["datasets"] : datasetArrayDeserializer(item["datasets"]),
    events: !item["events"] ? item["events"] : eventArrayDeserializer(item["events"]),
    status: !item["status"] ? item["status"] : assetStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

export function datasetArraySerializer(result: Array<Dataset>): any[] {
  return result.map((item) => {
    return datasetSerializer(item);
  });
}

export function datasetArrayDeserializer(result: Array<Dataset>): any[] {
  return result.map((item) => {
    return datasetDeserializer(item);
  });
}

/** Defines the dataset properties. */
export interface Dataset {
  /** Name of the dataset. */
  name: string;
  /** Stringified JSON that contains connector-specific JSON string that describes configuration for the specific dataset. */
  datasetConfiguration?: string;
  /** Object that describes the topic information for the specific dataset. */
  topic?: Topic;
  /** Array of data points that are part of the dataset. Each data point can have per-data point configuration. */
  dataPoints?: DataPoint[];
}

export function datasetSerializer(item: Dataset): any {
  return {
    name: item["name"],
    datasetConfiguration: item["datasetConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : dataPointArraySerializer(item["dataPoints"]),
  };
}

export function datasetDeserializer(item: any): Dataset {
  return {
    name: item["name"],
    datasetConfiguration: item["datasetConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
    dataPoints: !item["dataPoints"]
      ? item["dataPoints"]
      : dataPointArrayDeserializer(item["dataPoints"]),
  };
}

export function dataPointArraySerializer(result: Array<DataPoint>): any[] {
  return result.map((item) => {
    return dataPointSerializer(item);
  });
}

export function dataPointArrayDeserializer(result: Array<DataPoint>): any[] {
  return result.map((item) => {
    return dataPointDeserializer(item);
  });
}

/** Defines the data point properties. */
export interface DataPoint extends DataPointBase {
  /** An indication of how the data point should be mapped to OpenTelemetry. */
  observabilityMode?: DataPointObservabilityMode;
}

export function dataPointSerializer(item: DataPoint): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    observabilityMode: item["observabilityMode"],
  };
}

export function dataPointDeserializer(item: any): DataPoint {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
    observabilityMode: item["observabilityMode"],
  };
}

/** Defines the data point observability mode. */
export enum KnownDataPointObservabilityMode {
  /** No mapping to OpenTelemetry. */
  None = "None",
  /** Map as counter to OpenTelemetry. */
  Counter = "Counter",
  /** Map as gauge to OpenTelemetry. */
  Gauge = "Gauge",
  /** Map as histogram to OpenTelemetry. */
  Histogram = "Histogram",
  /** Map as log to OpenTelemetry. */
  Log = "Log",
}

/**
 * Defines the data point observability mode. \
 * {@link KnownDataPointObservabilityMode} can be used interchangeably with DataPointObservabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No mapping to OpenTelemetry. \
 * **Counter**: Map as counter to OpenTelemetry. \
 * **Gauge**: Map as gauge to OpenTelemetry. \
 * **Histogram**: Map as histogram to OpenTelemetry. \
 * **Log**: Map as log to OpenTelemetry.
 */
export type DataPointObservabilityMode = string;

export function eventArraySerializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventSerializer(item);
  });
}

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** Defines the event properties. */
export interface Event extends EventBase {
  /** An indication of how the event should be mapped to OpenTelemetry. */
  observabilityMode?: EventObservabilityMode;
}

export function eventSerializer(item: Event): any {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
    observabilityMode: item["observabilityMode"],
  };
}

export function eventDeserializer(item: any): Event {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
    observabilityMode: item["observabilityMode"],
  };
}

/** Defines the event observability mode. */
export enum KnownEventObservabilityMode {
  /** No mapping to OpenTelemetry. */
  None = "None",
  /** Map as log to OpenTelemetry. */
  Log = "Log",
}

/**
 * Defines the event observability mode. \
 * {@link KnownEventObservabilityMode} can be used interchangeably with EventObservabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No mapping to OpenTelemetry. \
 * **Log**: Map as log to OpenTelemetry.
 */
export type EventObservabilityMode = string;

/** Defines the asset status properties. */
export interface AssetStatus {
  /** Array object to transfer and persist errors that originate from the Edge. */
  readonly errors?: AssetStatusError[];
  /** A read only incremental counter indicating the number of times the configuration has been modified from the perspective of the current actual (Edge) state of the Asset. Edge would be the only writer of this value and would sync back up to the cloud. In steady state, this should equal version. */
  readonly version?: number;
  /** Array of dataset statuses that describe the status of each dataset. */
  readonly datasets?: AssetStatusDataset[];
  /** Array of event statuses that describe the status of each event. */
  readonly events?: AssetStatusEvent[];
}

export function assetStatusDeserializer(item: any): AssetStatus {
  return {
    errors: !item["errors"] ? item["errors"] : assetStatusErrorArrayDeserializer(item["errors"]),
    version: item["version"],
    datasets: !item["datasets"]
      ? item["datasets"]
      : assetStatusDatasetArrayDeserializer(item["datasets"]),
    events: !item["events"] ? item["events"] : assetStatusEventArrayDeserializer(item["events"]),
  };
}

export function assetStatusErrorArrayDeserializer(result: Array<AssetStatusError>): any[] {
  return result.map((item) => {
    return assetStatusErrorDeserializer(item);
  });
}

/** Defines the asset status error properties. */
export interface AssetStatusError {
  /** Error code for classification of errors (ex: 400, 404, 500, etc.). */
  readonly code?: number;
  /** Human readable helpful error message to provide additional context for error (ex: “capability Id 'foo' does not exist”). */
  readonly message?: string;
}

export function assetStatusErrorDeserializer(item: any): AssetStatusError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function assetStatusDatasetArrayDeserializer(result: Array<AssetStatusDataset>): any[] {
  return result.map((item) => {
    return assetStatusDatasetDeserializer(item);
  });
}

/** Defines the asset status dataset properties. */
export interface AssetStatusDataset {
  /** The name of the dataset. Must be unique within the status.datasets array. This name is used to correlate between the spec and status dataset information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: MessageSchemaReference;
}

export function assetStatusDatasetDeserializer(item: any): AssetStatusDataset {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : messageSchemaReferenceDeserializer(item["messageSchemaReference"]),
  };
}

/** Defines the message schema reference properties. */
export interface MessageSchemaReference {
  /** The message schema registry namespace. */
  readonly schemaRegistryNamespace: string;
  /** The message schema name. */
  readonly schemaName: string;
  /** The message schema version. */
  readonly schemaVersion: string;
}

export function messageSchemaReferenceDeserializer(item: any): MessageSchemaReference {
  return {
    schemaRegistryNamespace: item["schemaRegistryNamespace"],
    schemaName: item["schemaName"],
    schemaVersion: item["schemaVersion"],
  };
}

export function assetStatusEventArrayDeserializer(result: Array<AssetStatusEvent>): any[] {
  return result.map((item) => {
    return assetStatusEventDeserializer(item);
  });
}

/** Defines the asset status event properties. */
export interface AssetStatusEvent {
  /** The name of the event. Must be unique within the status.events array. This name is used to correlate between the spec and status event information. */
  readonly name: string;
  /** The message schema reference object. */
  readonly messageSchemaReference?: MessageSchemaReference;
}

export function assetStatusEventDeserializer(item: any): AssetStatusEvent {
  return {
    name: item["name"],
    messageSchemaReference: !item["messageSchemaReference"]
      ? item["messageSchemaReference"]
      : messageSchemaReferenceDeserializer(item["messageSchemaReference"]),
  };
}

/** Defines the data point properties. */
export interface DataPointBase {
  /** The name of the data point. */
  name: string;
  /** The address of the source of the data in the asset (e.g. URL) so that a client can access the data source on the asset. */
  dataSource: string;
  /** Stringified JSON that contains connector-specific configuration for the data point. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  dataPointConfiguration?: string;
}

export function dataPointBaseSerializer(item: DataPointBase): any {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
  };
}

export function dataPointBaseDeserializer(item: any): DataPointBase {
  return {
    name: item["name"],
    dataSource: item["dataSource"],
    dataPointConfiguration: item["dataPointConfiguration"],
  };
}

/** Defines the event properties. */
export interface EventBase {
  /** The name of the event. */
  name: string;
  /** The address of the notifier of the event in the asset (e.g. URL) so that a client can access the event on the asset. */
  eventNotifier: string;
  /** Stringified JSON that contains connector-specific configuration for the event. For OPC UA, this could include configuration like, publishingInterval, samplingInterval, and queueSize. */
  eventConfiguration?: string;
  /** Object that describes the topic information for the specific event. */
  topic?: Topic;
}

export function eventBaseSerializer(item: EventBase): any {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicSerializer(item["topic"]),
  };
}

export function eventBaseDeserializer(item: any): EventBase {
  return {
    name: item["name"],
    eventNotifier: item["eventNotifier"],
    eventConfiguration: item["eventConfiguration"],
    topic: !item["topic"] ? item["topic"] : topicDeserializer(item["topic"]),
  };
}

/** The type used for update operations of the Asset. */
export interface AssetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AssetUpdateProperties;
}

export function assetUpdateSerializer(item: AssetUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : assetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Asset. */
export interface AssetUpdateProperties {
  /** Enabled/Disabled status of the asset. */
  enabled?: boolean;
  /** Human-readable display name. */
  displayName?: string;
  /** Human-readable description of the asset. */
  description?: string;
  /** Asset manufacturer name. */
  manufacturer?: string;
  /** Asset manufacturer URI. */
  manufacturerUri?: string;
  /** Asset model name. */
  model?: string;
  /** Asset product code. */
  productCode?: string;
  /** Revision number of the hardware. */
  hardwareRevision?: string;
  /** Revision number of the software. */
  softwareRevision?: string;
  /** Reference to the documentation. */
  documentationUri?: string;
  /** Asset serial number. */
  serialNumber?: string;
  /** A set of key-value pairs that contain custom attributes set by the customer. */
  attributes?: Record<string, any>;
  /** Stringified JSON that contains connector-specific default configuration for all datasets. Each dataset can have its own configuration that overrides the default settings here. */
  defaultDatasetsConfiguration?: string;
  /** Stringified JSON that contains connector-specific default configuration for all events. Each event can have its own configuration that overrides the default settings here. */
  defaultEventsConfiguration?: string;
  /** Object that describes the default topic information for the asset. */
  defaultTopic?: Topic;
  /** Array of datasets that are part of the asset. Each dataset describes the data points that make up the set. */
  datasets?: Dataset[];
  /** Array of events that are part of the asset. Each event can have per-event configuration. */
  events?: Event[];
}

export function assetUpdatePropertiesSerializer(item: AssetUpdateProperties): any {
  return {
    enabled: item["enabled"],
    displayName: item["displayName"],
    description: item["description"],
    manufacturer: item["manufacturer"],
    manufacturerUri: item["manufacturerUri"],
    model: item["model"],
    productCode: item["productCode"],
    hardwareRevision: item["hardwareRevision"],
    softwareRevision: item["softwareRevision"],
    documentationUri: item["documentationUri"],
    serialNumber: item["serialNumber"],
    attributes: item["attributes"],
    defaultDatasetsConfiguration: item["defaultDatasetsConfiguration"],
    defaultEventsConfiguration: item["defaultEventsConfiguration"],
    defaultTopic: !item["defaultTopic"]
      ? item["defaultTopic"]
      : topicSerializer(item["defaultTopic"]),
    datasets: !item["datasets"] ? item["datasets"] : datasetArraySerializer(item["datasets"]),
    events: !item["events"] ? item["events"] : eventArraySerializer(item["events"]),
  };
}

/** The response of a Asset list operation. */
export interface _AssetListResult {
  /** The Asset items on this page */
  value: Asset[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assetListResultDeserializer(item: any): _AssetListResult {
  return {
    value: assetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assetArraySerializer(result: Array<Asset>): any[] {
  return result.map((item) => {
    return assetSerializer(item);
  });
}

export function assetArrayDeserializer(result: Array<Asset>): any[] {
  return result.map((item) => {
    return assetDeserializer(item);
  });
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
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
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

/** Microsoft.DeviceRegistry Resource Provider supported API versions. */
export enum KnownVersions {
  /** Microsoft.DeviceRegistry Resource Provider management API version 2023-11-01-preview. */
  V2023_11_01_Preview = "2023-11-01-preview",
  /** Microsoft.DeviceRegistry Resource Provider management API version 2024-09-01-preview. */
  V2024_09_01_Preview = "2024-09-01-preview",
}
