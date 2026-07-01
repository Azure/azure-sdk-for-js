// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list Resource Provider operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of operations supported by the Resource Provider. */
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
  /** The object that represents the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft.ResourceProvider */
  provider?: string;
  /** Resource on which the operation is performed: Profile, endpoint, etc. */
  resource?: string;
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
  /** Description of operation */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["Provider"],
    resource: item["Resource"],
    operation: item["Operation"],
    description: item["Description"],
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

/** An Azure Cosmos DB database account. */
export interface DatabaseAccountGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** Indicates the type of database account. This can only be set at database account creation. */
  kind?: DatabaseAccountKind;
  /** The provisioning state of the resource. */
  readonly provisioningState?: string;
  /** The connection endpoint for the Cosmos DB database account. */
  readonly documentEndpoint?: string;
  /** The offer type for the Cosmos DB database account. Default value: Standard. */
  readonly databaseAccountOfferType?: "Standard";
  /** List of IpRules. */
  ipRules?: IpAddressOrRange[];
  /** Flag to indicate whether to enable/disable Virtual Network ACL rules. */
  isVirtualNetworkFilterEnabled?: boolean;
  /** Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account. */
  enableAutomaticFailover?: boolean;
  /** The consistency policy for the Cosmos DB database account. */
  consistencyPolicy?: ConsistencyPolicy;
  /** List of Cosmos DB capabilities for the account */
  capabilities?: Capability[];
  /** An array that contains the write location for the Cosmos DB account. */
  readonly writeLocations?: Location[];
  /** An array that contains of the read locations enabled for the Cosmos DB account. */
  readonly readLocations?: Location[];
  /** An array that contains all of the locations enabled for the Cosmos DB account. */
  readonly locations?: Location[];
  /** An array that contains the regions ordered by their failover priorities. */
  readonly failoverPolicies?: FailoverPolicy[];
  /** List of Virtual Network ACL rules configured for the Cosmos DB account. */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** List of Private Endpoint Connections configured for the Cosmos DB account. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Enables the account to write in multiple locations */
  enableMultipleWriteLocations?: boolean;
  /** Enables the cassandra connector on the Cosmos DB C* account */
  enableCassandraConnector?: boolean;
  /** The cassandra connector offer type for the Cosmos DB database C* account. */
  connectorOffer?: ConnectorOffer;
  /** Disable write operations on metadata resources (databases, containers, throughput) via account keys */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /** The URI of the key vault */
  keyVaultKeyUri?: string;
  /** The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more. */
  defaultIdentity?: string;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Flag to indicate whether Free Tier is enabled. */
  enableFreeTier?: boolean;
  /** API specific properties. */
  apiProperties?: ApiProperties;
  /** Flag to indicate whether to enable storage analytics. */
  enableAnalyticalStorage?: boolean;
  /** Analytical storage specific properties. */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /** A unique identifier assigned to the database account */
  readonly instanceId?: string;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
  /** Parameters to indicate the information about the restore. */
  restoreParameters?: RestoreParameters;
  /** The object representing the policy for taking backups on an account. */
  backupPolicy?: BackupPolicyUnion;
  /** The CORS policy for the Cosmos DB database account. */
  cors?: CorsPolicy[];
  /** Indicates what services are allowed to bypass firewall checks. */
  networkAclBypass?: NetworkAclBypass;
  /** An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account. */
  networkAclBypassResourceIds?: string[];
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** The object that represents all properties related to capacity enforcement on an account. */
  capacity?: Capacity;
  /** The object that represents the metadata for the Account Keys of the Cosmos DB account. */
  readonly keysMetadata?: DatabaseAccountKeysMetadata;
  /** Flag to indicate enabling/disabling of Partition Merge feature on the account */
  enablePartitionMerge?: boolean;
  /** Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account */
  enableBurstCapacity?: boolean;
  /** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance. */
  customerManagedKeyStatus?: string;
  /** The version of the Customer Managed Key currently being used by the account */
  readonly keyVaultKeyUriVersion?: string;
  /** Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account */
  enablePriorityBasedExecution?: boolean;
  /** Enum to indicate default Priority Level of request for Priority Based Execution. */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /** Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /** Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account. */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
}

export function databaseAccountGetResultsDeserializer(item: any): DatabaseAccountGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseAccountGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** Properties for the database account. */
export interface DatabaseAccountGetProperties {
  /** The provisioning state of the resource. */
  readonly provisioningState?: string;
  /** The connection endpoint for the Cosmos DB database account. */
  readonly documentEndpoint?: string;
  /** The offer type for the Cosmos DB database account. Default value: Standard. */
  readonly databaseAccountOfferType?: "Standard";
  /** List of IpRules. */
  ipRules?: IpAddressOrRange[];
  /** Flag to indicate whether to enable/disable Virtual Network ACL rules. */
  isVirtualNetworkFilterEnabled?: boolean;
  /** Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account. */
  enableAutomaticFailover?: boolean;
  /** The consistency policy for the Cosmos DB database account. */
  consistencyPolicy?: ConsistencyPolicy;
  /** List of Cosmos DB capabilities for the account */
  capabilities?: Capability[];
  /** An array that contains the write location for the Cosmos DB account. */
  readonly writeLocations?: Location[];
  /** An array that contains of the read locations enabled for the Cosmos DB account. */
  readonly readLocations?: Location[];
  /** An array that contains all of the locations enabled for the Cosmos DB account. */
  readonly locations?: Location[];
  /** An array that contains the regions ordered by their failover priorities. */
  readonly failoverPolicies?: FailoverPolicy[];
  /** List of Virtual Network ACL rules configured for the Cosmos DB account. */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** List of Private Endpoint Connections configured for the Cosmos DB account. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Enables the account to write in multiple locations */
  enableMultipleWriteLocations?: boolean;
  /** Enables the cassandra connector on the Cosmos DB C* account */
  enableCassandraConnector?: boolean;
  /** The cassandra connector offer type for the Cosmos DB database C* account. */
  connectorOffer?: ConnectorOffer;
  /** Disable write operations on metadata resources (databases, containers, throughput) via account keys */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /** The URI of the key vault */
  keyVaultKeyUri?: string;
  /** The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more. */
  defaultIdentity?: string;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Flag to indicate whether Free Tier is enabled. */
  enableFreeTier?: boolean;
  /** API specific properties. */
  apiProperties?: ApiProperties;
  /** Flag to indicate whether to enable storage analytics. */
  enableAnalyticalStorage?: boolean;
  /** Analytical storage specific properties. */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /** A unique identifier assigned to the database account */
  readonly instanceId?: string;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
  /** Parameters to indicate the information about the restore. */
  restoreParameters?: RestoreParameters;
  /** The object representing the policy for taking backups on an account. */
  backupPolicy?: BackupPolicyUnion;
  /** The CORS policy for the Cosmos DB database account. */
  cors?: CorsPolicy[];
  /** Indicates what services are allowed to bypass firewall checks. */
  networkAclBypass?: NetworkAclBypass;
  /** An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account. */
  networkAclBypassResourceIds?: string[];
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** The object that represents all properties related to capacity enforcement on an account. */
  capacity?: Capacity;
  /** The object that represents the metadata for the Account Keys of the Cosmos DB account. */
  readonly keysMetadata?: DatabaseAccountKeysMetadata;
  /** Flag to indicate enabling/disabling of Partition Merge feature on the account */
  enablePartitionMerge?: boolean;
  /** Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account */
  enableBurstCapacity?: boolean;
  /** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance. */
  customerManagedKeyStatus?: string;
  /** The version of the Customer Managed Key currently being used by the account */
  readonly keyVaultKeyUriVersion?: string;
  /** Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account */
  enablePriorityBasedExecution?: boolean;
  /** Enum to indicate default Priority Level of request for Priority Based Execution. */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /** Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /** Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account. */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
}

export function databaseAccountGetPropertiesDeserializer(item: any): DatabaseAccountGetProperties {
  return {
    provisioningState: item["provisioningState"],
    documentEndpoint: item["documentEndpoint"],
    databaseAccountOfferType: item["databaseAccountOfferType"],
    ipRules: !item["ipRules"]
      ? item["ipRules"]
      : ipAddressOrRangeArrayDeserializer(item["ipRules"]),
    isVirtualNetworkFilterEnabled: item["isVirtualNetworkFilterEnabled"],
    enableAutomaticFailover: item["enableAutomaticFailover"],
    consistencyPolicy: !item["consistencyPolicy"]
      ? item["consistencyPolicy"]
      : consistencyPolicyDeserializer(item["consistencyPolicy"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArrayDeserializer(item["capabilities"]),
    writeLocations: !item["writeLocations"]
      ? item["writeLocations"]
      : locationArrayDeserializer(item["writeLocations"]),
    readLocations: !item["readLocations"]
      ? item["readLocations"]
      : locationArrayDeserializer(item["readLocations"]),
    locations: !item["locations"]
      ? item["locations"]
      : locationArrayDeserializer(item["locations"]),
    failoverPolicies: !item["failoverPolicies"]
      ? item["failoverPolicies"]
      : failoverPolicyArrayDeserializer(item["failoverPolicies"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    enableMultipleWriteLocations: item["enableMultipleWriteLocations"],
    enableCassandraConnector: item["enableCassandraConnector"],
    connectorOffer: item["connectorOffer"],
    disableKeyBasedMetadataWriteAccess: item["disableKeyBasedMetadataWriteAccess"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    defaultIdentity: item["defaultIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enableFreeTier: item["enableFreeTier"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesDeserializer(item["apiProperties"]),
    enableAnalyticalStorage: item["enableAnalyticalStorage"],
    analyticalStorageConfiguration: !item["analyticalStorageConfiguration"]
      ? item["analyticalStorageConfiguration"]
      : analyticalStorageConfigurationDeserializer(item["analyticalStorageConfiguration"]),
    instanceId: item["instanceId"],
    createMode: item["createMode"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : restoreParametersDeserializer(item["restoreParameters"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyUnionDeserializer(item["backupPolicy"]),
    cors: !item["cors"] ? item["cors"] : corsPolicyArrayDeserializer(item["cors"]),
    networkAclBypass: item["networkAclBypass"],
    networkAclBypassResourceIds: !item["networkAclBypassResourceIds"]
      ? item["networkAclBypassResourceIds"]
      : item["networkAclBypassResourceIds"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    capacity: !item["capacity"] ? item["capacity"] : capacityDeserializer(item["capacity"]),
    keysMetadata: !item["keysMetadata"]
      ? item["keysMetadata"]
      : databaseAccountKeysMetadataDeserializer(item["keysMetadata"]),
    enablePartitionMerge: item["enablePartitionMerge"],
    enableBurstCapacity: item["enableBurstCapacity"],
    minimalTlsVersion: item["minimalTlsVersion"],
    customerManagedKeyStatus: item["customerManagedKeyStatus"],
    keyVaultKeyUriVersion: item["keyVaultKeyUriVersion"],
    enablePriorityBasedExecution: item["enablePriorityBasedExecution"],
    defaultPriorityLevel: item["defaultPriorityLevel"],
    enablePerRegionPerPartitionAutoscale: item["enablePerRegionPerPartitionAutoscale"],
    enforceHierarchicalPartitionKeyIdLastLevel: item["enforceHierarchicalPartitionKeyIdLastLevel"],
  };
}

export function ipAddressOrRangeArraySerializer(result: Array<IpAddressOrRange>): any[] {
  return result.map((item) => {
    return ipAddressOrRangeSerializer(item);
  });
}

export function ipAddressOrRangeArrayDeserializer(result: Array<IpAddressOrRange>): any[] {
  return result.map((item) => {
    return ipAddressOrRangeDeserializer(item);
  });
}

/** IpAddressOrRange object */
export interface IpAddressOrRange {
  /** A single IPv4 address or a single IPv4 address range in CIDR format. Provided IPs must be well-formatted and cannot be contained in one of the following ranges: 10.0.0.0/8, 100.64.0.0/10, 172.16.0.0/12, 192.168.0.0/16, since these are not enforceable by the IP address filter. Example of valid inputs: “23.40.210.245” or “23.40.210.0/8”. */
  ipAddressOrRange?: string;
}

export function ipAddressOrRangeSerializer(item: IpAddressOrRange): any {
  return { ipAddressOrRange: item["ipAddressOrRange"] };
}

export function ipAddressOrRangeDeserializer(item: any): IpAddressOrRange {
  return {
    ipAddressOrRange: item["ipAddressOrRange"],
  };
}

/** The consistency policy for the Cosmos DB database account. */
export interface ConsistencyPolicy {
  /** The default consistency level and configuration settings of the Cosmos DB account. */
  defaultConsistencyLevel: DefaultConsistencyLevel;
  /** When used with the Bounded Staleness consistency level, this value represents the number of stale requests tolerated. Accepted range for this value is 1 – 2,147,483,647. Required when defaultConsistencyPolicy is set to 'BoundedStaleness'. */
  maxStalenessPrefix?: number;
  /** When used with the Bounded Staleness consistency level, this value represents the time amount of staleness (in seconds) tolerated. Accepted range for this value is 5 - 86400. Required when defaultConsistencyPolicy is set to 'BoundedStaleness'. */
  maxIntervalInSeconds?: number;
}

export function consistencyPolicySerializer(item: ConsistencyPolicy): any {
  return {
    defaultConsistencyLevel: item["defaultConsistencyLevel"],
    maxStalenessPrefix: item["maxStalenessPrefix"],
    maxIntervalInSeconds: item["maxIntervalInSeconds"],
  };
}

export function consistencyPolicyDeserializer(item: any): ConsistencyPolicy {
  return {
    defaultConsistencyLevel: item["defaultConsistencyLevel"],
    maxStalenessPrefix: item["maxStalenessPrefix"],
    maxIntervalInSeconds: item["maxIntervalInSeconds"],
  };
}

/** The default consistency level and configuration settings of the Cosmos DB account. */
export type DefaultConsistencyLevel =
  "Eventual" | "Session" | "BoundedStaleness" | "Strong" | "ConsistentPrefix";

export function capabilityArraySerializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilitySerializer(item);
  });
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** Cosmos DB capability object */
export interface Capability {
  /** Name of the Cosmos DB capability. For example, "name": "EnableCassandra". Current values also include "EnableTable" and "EnableGremlin". */
  name?: string;
}

export function capabilitySerializer(item: Capability): any {
  return { name: item["name"] };
}

export function capabilityDeserializer(item: any): Capability {
  return {
    name: item["name"],
  };
}

export function locationArraySerializer(result: Array<Location>): any[] {
  return result.map((item) => {
    return locationSerializer(item);
  });
}

export function locationArrayDeserializer(result: Array<Location>): any[] {
  return result.map((item) => {
    return locationDeserializer(item);
  });
}

/** A region in which the Azure Cosmos DB database account is deployed. */
export interface Location {
  /** The unique identifier of the region within the database account. Example: &lt;accountName&gt;-&lt;locationName&gt;. */
  readonly id?: string;
  /** The name of the region. */
  locationName?: string;
  /** The connection endpoint for the specific region. Example: https://&lt;accountName&gt;-&lt;locationName&gt;.documents.azure.com:443/ */
  readonly documentEndpoint?: string;
  /** The provisioning state of the resource. */
  readonly provisioningState?: string;
  /** The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists. */
  failoverPriority?: number;
  /** Flag to indicate whether or not this region is an AvailabilityZone region */
  isZoneRedundant?: boolean;
}

export function locationSerializer(item: Location): any {
  return {
    locationName: item["locationName"],
    failoverPriority: item["failoverPriority"],
    isZoneRedundant: item["isZoneRedundant"],
  };
}

export function locationDeserializer(item: any): Location {
  return {
    id: item["id"],
    locationName: item["locationName"],
    documentEndpoint: item["documentEndpoint"],
    provisioningState: item["provisioningState"],
    failoverPriority: item["failoverPriority"],
    isZoneRedundant: item["isZoneRedundant"],
  };
}

export function failoverPolicyArraySerializer(result: Array<FailoverPolicy>): any[] {
  return result.map((item) => {
    return failoverPolicySerializer(item);
  });
}

export function failoverPolicyArrayDeserializer(result: Array<FailoverPolicy>): any[] {
  return result.map((item) => {
    return failoverPolicyDeserializer(item);
  });
}

/** The failover policy for a given region of a database account. */
export interface FailoverPolicy {
  /** The unique identifier of the region in which the database account replicates to. Example: &lt;accountName&gt;-&lt;locationName&gt;. */
  readonly id?: string;
  /** The name of the region in which the database account exists. */
  locationName?: string;
  /** The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists. */
  failoverPriority?: number;
}

export function failoverPolicySerializer(item: FailoverPolicy): any {
  return { locationName: item["locationName"], failoverPriority: item["failoverPriority"] };
}

export function failoverPolicyDeserializer(item: any): FailoverPolicy {
  return {
    id: item["id"],
    locationName: item["locationName"],
    failoverPriority: item["failoverPriority"],
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

/** Virtual Network ACL Rule object */
export interface VirtualNetworkRule {
  /** Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}. */
  id?: string;
  /** Create firewall rule before the virtual network has vnet service endpoint enabled. */
  ignoreMissingVNetServiceEndpoint?: boolean;
}

export function virtualNetworkRuleSerializer(item: VirtualNetworkRule): any {
  return {
    id: item["id"],
    ignoreMissingVNetServiceEndpoint: item["ignoreMissingVNetServiceEndpoint"],
  };
}

export function virtualNetworkRuleDeserializer(item: any): VirtualNetworkRule {
  return {
    id: item["id"],
    ignoreMissingVNetServiceEndpoint: item["ignoreMissingVNetServiceEndpoint"],
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

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /** Group id of the private endpoint. */
  groupId?: string;
  /** Provisioning state of the private endpoint. */
  provisioningState?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "privateEndpoint",
      "privateLinkServiceConnectionState",
      "groupId",
      "provisioningState",
    ])
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

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /** Group id of the private endpoint. */
  groupId?: string;
  /** Provisioning state of the private endpoint. */
  provisioningState?: string;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

/** Private endpoint which the connection belongs to. */
export interface PrivateEndpointProperty {
  /** Resource id of the private endpoint. */
  id?: string;
}

export function privateEndpointPropertySerializer(item: PrivateEndpointProperty): any {
  return { id: item["id"] };
}

export function privateEndpointPropertyDeserializer(item: any): PrivateEndpointProperty {
  return {
    id: item["id"],
  };
}

/** Connection State of the Private Endpoint Connection. */
export interface PrivateLinkServiceConnectionStateProperty {
  /** The private link service connection status. */
  status?: string;
  /** The private link service connection description. */
  description?: string;
  /** Any action that is required beyond basic workflow (approve/ reject/ disconnect) */
  readonly actionsRequired?: string;
}

export function privateLinkServiceConnectionStatePropertySerializer(
  item: PrivateLinkServiceConnectionStateProperty,
): any {
  return { status: item["status"], description: item["description"] };
}

export function privateLinkServiceConnectionStatePropertyDeserializer(
  item: any,
): PrivateLinkServiceConnectionStateProperty {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The cassandra connector offer type for the Cosmos DB C* database account. */
export enum KnownConnectorOffer {
  /** Small */
  Small = "Small",
}

/**
 * The cassandra connector offer type for the Cosmos DB C* database account. \
 * {@link KnownConnectorOffer} can be used interchangeably with ConnectorOffer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Small**
 */
export type ConnectorOffer = string;

/** Whether requests from Public Network are allowed */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * Whether requests from Public Network are allowed \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccess = string;

/** model interface ApiProperties */
export interface ApiProperties {
  /** Describes the version of the MongoDB account. */
  serverVersion?: ServerVersion;
}

export function apiPropertiesSerializer(item: ApiProperties): any {
  return { serverVersion: item["serverVersion"] };
}

export function apiPropertiesDeserializer(item: any): ApiProperties {
  return {
    serverVersion: item["serverVersion"],
  };
}

/** Describes the version of the MongoDB account. */
export enum KnownServerVersion {
  /** 3.2 */
  Three2 = "3.2",
  /** 3.6 */
  Three6 = "3.6",
  /** 4.0 */
  Four0 = "4.0",
  /** 4.2 */
  Four2 = "4.2",
  /** 5.0 */
  Five0 = "5.0",
  /** 6.0 */
  Six0 = "6.0",
  /** 7.0 */
  Seven0 = "7.0",
}

/**
 * Describes the version of the MongoDB account. \
 * {@link KnownServerVersion} can be used interchangeably with ServerVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **3.2** \
 * **3.6** \
 * **4.0** \
 * **4.2** \
 * **5.0** \
 * **6.0** \
 * **7.0**
 */
export type ServerVersion = string;

/** Analytical storage specific properties. */
export interface AnalyticalStorageConfiguration {
  /** Describes the types of schema for analytical storage. */
  schemaType?: AnalyticalStorageSchemaType;
}

export function analyticalStorageConfigurationSerializer(
  item: AnalyticalStorageConfiguration,
): any {
  return { schemaType: item["schemaType"] };
}

export function analyticalStorageConfigurationDeserializer(
  item: any,
): AnalyticalStorageConfiguration {
  return {
    schemaType: item["schemaType"],
  };
}

/** Describes the types of schema for analytical storage. */
export enum KnownAnalyticalStorageSchemaType {
  /** WellDefined */
  WellDefined = "WellDefined",
  /** FullFidelity */
  FullFidelity = "FullFidelity",
}

/**
 * Describes the types of schema for analytical storage. \
 * {@link KnownAnalyticalStorageSchemaType} can be used interchangeably with AnalyticalStorageSchemaType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WellDefined** \
 * **FullFidelity**
 */
export type AnalyticalStorageSchemaType = string;

/** Enum to indicate the mode of account creation. */
export enum KnownCreateMode {
  /** Default */
  Default = "Default",
  /** Restore */
  Restore = "Restore",
}

/**
 * Enum to indicate the mode of account creation. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Restore**
 */
export type CreateMode = string;

/** Parameters to indicate the information about the restore. */
export interface RestoreParameters extends RestoreParametersBase {
  /** Describes the mode of the restore. */
  restoreMode?: RestoreMode;
  /** The id of the restorable database account from which the restore has to be initiated. For example: /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{restorableDatabaseAccountName} */
  restoreSource?: string;
  /** Time to which the account has to be restored (ISO-8601 format). */
  restoreTimestampInUtc?: Date;
  /** List of specific databases available for restore. */
  databasesToRestore?: DatabaseRestoreResource[];
  /** List of specific gremlin databases available for restore. */
  gremlinDatabasesToRestore?: GremlinDatabaseRestoreResource[];
  /** List of specific tables available for restore. */
  tablesToRestore?: string[];
  /** The source backup location for restore. */
  sourceBackupLocation?: string;
}

export function restoreParametersSerializer(item: RestoreParameters): any {
  return {
    restoreSource: item["restoreSource"],
    restoreTimestampInUtc: !item["restoreTimestampInUtc"]
      ? item["restoreTimestampInUtc"]
      : item["restoreTimestampInUtc"].toISOString(),
    restoreWithTtlDisabled: item["restoreWithTtlDisabled"],
    restoreMode: item["restoreMode"],
    databasesToRestore: !item["databasesToRestore"]
      ? item["databasesToRestore"]
      : databaseRestoreResourceArraySerializer(item["databasesToRestore"]),
    gremlinDatabasesToRestore: !item["gremlinDatabasesToRestore"]
      ? item["gremlinDatabasesToRestore"]
      : gremlinDatabaseRestoreResourceArraySerializer(item["gremlinDatabasesToRestore"]),
    tablesToRestore: !item["tablesToRestore"]
      ? item["tablesToRestore"]
      : item["tablesToRestore"].map((p: any) => {
          return p;
        }),
    sourceBackupLocation: item["sourceBackupLocation"],
  };
}

export function restoreParametersDeserializer(item: any): RestoreParameters {
  return {
    restoreSource: item["restoreSource"],
    restoreTimestampInUtc: !item["restoreTimestampInUtc"]
      ? item["restoreTimestampInUtc"]
      : new Date(item["restoreTimestampInUtc"]),
    restoreWithTtlDisabled: item["restoreWithTtlDisabled"],
    restoreMode: item["restoreMode"],
    databasesToRestore: !item["databasesToRestore"]
      ? item["databasesToRestore"]
      : databaseRestoreResourceArrayDeserializer(item["databasesToRestore"]),
    gremlinDatabasesToRestore: !item["gremlinDatabasesToRestore"]
      ? item["gremlinDatabasesToRestore"]
      : gremlinDatabaseRestoreResourceArrayDeserializer(item["gremlinDatabasesToRestore"]),
    tablesToRestore: !item["tablesToRestore"]
      ? item["tablesToRestore"]
      : item["tablesToRestore"].map((p: any) => {
          return p;
        }),
    sourceBackupLocation: item["sourceBackupLocation"],
  };
}

/** Describes the mode of the restore. */
export enum KnownRestoreMode {
  /** PointInTime */
  PointInTime = "PointInTime",
}

/**
 * Describes the mode of the restore. \
 * {@link KnownRestoreMode} can be used interchangeably with RestoreMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PointInTime**
 */
export type RestoreMode = string;

export function databaseRestoreResourceArraySerializer(
  result: Array<DatabaseRestoreResource>,
): any[] {
  return result.map((item) => {
    return databaseRestoreResourceSerializer(item);
  });
}

export function databaseRestoreResourceArrayDeserializer(
  result: Array<DatabaseRestoreResource>,
): any[] {
  return result.map((item) => {
    return databaseRestoreResourceDeserializer(item);
  });
}

/** Specific Databases to restore. */
export interface DatabaseRestoreResource {
  /** The name of the database available for restore. */
  databaseName?: string;
  /** The names of the collections available for restore. */
  collectionNames?: string[];
}

export function databaseRestoreResourceSerializer(item: DatabaseRestoreResource): any {
  return {
    databaseName: item["databaseName"],
    collectionNames: !item["collectionNames"]
      ? item["collectionNames"]
      : item["collectionNames"].map((p: any) => {
          return p;
        }),
  };
}

export function databaseRestoreResourceDeserializer(item: any): DatabaseRestoreResource {
  return {
    databaseName: item["databaseName"],
    collectionNames: !item["collectionNames"]
      ? item["collectionNames"]
      : item["collectionNames"].map((p: any) => {
          return p;
        }),
  };
}

export function gremlinDatabaseRestoreResourceArraySerializer(
  result: Array<GremlinDatabaseRestoreResource>,
): any[] {
  return result.map((item) => {
    return gremlinDatabaseRestoreResourceSerializer(item);
  });
}

export function gremlinDatabaseRestoreResourceArrayDeserializer(
  result: Array<GremlinDatabaseRestoreResource>,
): any[] {
  return result.map((item) => {
    return gremlinDatabaseRestoreResourceDeserializer(item);
  });
}

/** Specific Gremlin Databases to restore. */
export interface GremlinDatabaseRestoreResource {
  /** The name of the gremlin database available for restore. */
  databaseName?: string;
  /** The names of the graphs available for restore. */
  graphNames?: string[];
}

export function gremlinDatabaseRestoreResourceSerializer(
  item: GremlinDatabaseRestoreResource,
): any {
  return {
    databaseName: item["databaseName"],
    graphNames: !item["graphNames"]
      ? item["graphNames"]
      : item["graphNames"].map((p: any) => {
          return p;
        }),
  };
}

export function gremlinDatabaseRestoreResourceDeserializer(
  item: any,
): GremlinDatabaseRestoreResource {
  return {
    databaseName: item["databaseName"],
    graphNames: !item["graphNames"]
      ? item["graphNames"]
      : item["graphNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The object representing the policy for taking backups on an account. */
export interface BackupPolicy {
  /** Describes the mode of backups. */
  /** The discriminator possible values: Periodic, Continuous */
  type: BackupPolicyType;
  /** The object representing the state of the migration between the backup policies. */
  migrationState?: BackupPolicyMigrationState;
}

export function backupPolicySerializer(item: BackupPolicy): any {
  return {
    type: item["type"],
    migrationState: !item["migrationState"]
      ? item["migrationState"]
      : backupPolicyMigrationStateSerializer(item["migrationState"]),
  };
}

export function backupPolicyDeserializer(item: any): BackupPolicy {
  return {
    type: item["type"],
    migrationState: !item["migrationState"]
      ? item["migrationState"]
      : backupPolicyMigrationStateDeserializer(item["migrationState"]),
  };
}

/** Alias for BackupPolicyUnion */
export type BackupPolicyUnion =
  PeriodicModeBackupPolicy | ContinuousModeBackupPolicy | BackupPolicy;

export function backupPolicyUnionSerializer(item: BackupPolicyUnion): any {
  switch (item.type) {
    case "Periodic":
      return periodicModeBackupPolicySerializer(item as PeriodicModeBackupPolicy);

    case "Continuous":
      return continuousModeBackupPolicySerializer(item as ContinuousModeBackupPolicy);

    default:
      return backupPolicySerializer(item);
  }
}

export function backupPolicyUnionDeserializer(item: any): BackupPolicyUnion {
  switch (item["type"]) {
    case "Periodic":
      return periodicModeBackupPolicyDeserializer(item as PeriodicModeBackupPolicy);

    case "Continuous":
      return continuousModeBackupPolicyDeserializer(item as ContinuousModeBackupPolicy);

    default:
      return backupPolicyDeserializer(item);
  }
}

/** Describes the mode of backups. */
export enum KnownBackupPolicyType {
  /** Periodic */
  Periodic = "Periodic",
  /** Continuous */
  Continuous = "Continuous",
}

/**
 * Describes the mode of backups. \
 * {@link KnownBackupPolicyType} can be used interchangeably with BackupPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Periodic** \
 * **Continuous**
 */
export type BackupPolicyType = string;

/** The object representing the state of the migration between the backup policies. */
export interface BackupPolicyMigrationState {
  /** Describes the status of migration between backup policy types. */
  status?: BackupPolicyMigrationStatus;
  /** Describes the target backup policy type of the backup policy migration. */
  targetType?: BackupPolicyType;
  /** Time at which the backup policy migration started (ISO-8601 format). */
  startTime?: Date;
}

export function backupPolicyMigrationStateSerializer(item: BackupPolicyMigrationState): any {
  return {
    status: item["status"],
    targetType: item["targetType"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
  };
}

export function backupPolicyMigrationStateDeserializer(item: any): BackupPolicyMigrationState {
  return {
    status: item["status"],
    targetType: item["targetType"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

/** Describes the status of migration between backup policy types. */
export enum KnownBackupPolicyMigrationStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
}

/**
 * Describes the status of migration between backup policy types. \
 * {@link KnownBackupPolicyMigrationStatus} can be used interchangeably with BackupPolicyMigrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **InProgress** \
 * **Completed** \
 * **Failed**
 */
export type BackupPolicyMigrationStatus = string;

/** The object representing periodic mode backup policy. */
export interface PeriodicModeBackupPolicy extends BackupPolicy {
  /** Configuration values for periodic mode backup */
  periodicModeProperties?: PeriodicModeProperties;
  /** Describes the mode of backups. */
  type: "Periodic";
}

export function periodicModeBackupPolicySerializer(item: PeriodicModeBackupPolicy): any {
  return {
    type: item["type"],
    migrationState: !item["migrationState"]
      ? item["migrationState"]
      : backupPolicyMigrationStateSerializer(item["migrationState"]),
    periodicModeProperties: !item["periodicModeProperties"]
      ? item["periodicModeProperties"]
      : periodicModePropertiesSerializer(item["periodicModeProperties"]),
  };
}

export function periodicModeBackupPolicyDeserializer(item: any): PeriodicModeBackupPolicy {
  return {
    type: item["type"],
    migrationState: !item["migrationState"]
      ? item["migrationState"]
      : backupPolicyMigrationStateDeserializer(item["migrationState"]),
    periodicModeProperties: !item["periodicModeProperties"]
      ? item["periodicModeProperties"]
      : periodicModePropertiesDeserializer(item["periodicModeProperties"]),
  };
}

/** Configuration values for periodic mode backup */
export interface PeriodicModeProperties {
  /** An integer representing the interval in minutes between two backups */
  backupIntervalInMinutes?: number;
  /** An integer representing the time (in hours) that each backup is retained */
  backupRetentionIntervalInHours?: number;
  /** Enum to indicate type of backup residency */
  backupStorageRedundancy?: BackupStorageRedundancy;
}

export function periodicModePropertiesSerializer(item: PeriodicModeProperties): any {
  return {
    backupIntervalInMinutes: item["backupIntervalInMinutes"],
    backupRetentionIntervalInHours: item["backupRetentionIntervalInHours"],
    backupStorageRedundancy: item["backupStorageRedundancy"],
  };
}

export function periodicModePropertiesDeserializer(item: any): PeriodicModeProperties {
  return {
    backupIntervalInMinutes: item["backupIntervalInMinutes"],
    backupRetentionIntervalInHours: item["backupRetentionIntervalInHours"],
    backupStorageRedundancy: item["backupStorageRedundancy"],
  };
}

/** Enum to indicate type of backup storage redundancy. */
export enum KnownBackupStorageRedundancy {
  /** Geo */
  Geo = "Geo",
  /** Local */
  Local = "Local",
  /** Zone */
  Zone = "Zone",
}

/**
 * Enum to indicate type of backup storage redundancy. \
 * {@link KnownBackupStorageRedundancy} can be used interchangeably with BackupStorageRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Geo** \
 * **Local** \
 * **Zone**
 */
export type BackupStorageRedundancy = string;

/** The object representing continuous mode backup policy. */
export interface ContinuousModeBackupPolicy extends BackupPolicy {
  /** Configuration values for continuous mode backup */
  continuousModeProperties?: ContinuousModeProperties;
  /** Describes the mode of backups. */
  type: "Continuous";
}

export function continuousModeBackupPolicySerializer(item: ContinuousModeBackupPolicy): any {
  return {
    type: item["type"],
    migrationState: !item["migrationState"]
      ? item["migrationState"]
      : backupPolicyMigrationStateSerializer(item["migrationState"]),
    continuousModeProperties: !item["continuousModeProperties"]
      ? item["continuousModeProperties"]
      : continuousModePropertiesSerializer(item["continuousModeProperties"]),
  };
}

export function continuousModeBackupPolicyDeserializer(item: any): ContinuousModeBackupPolicy {
  return {
    type: item["type"],
    migrationState: !item["migrationState"]
      ? item["migrationState"]
      : backupPolicyMigrationStateDeserializer(item["migrationState"]),
    continuousModeProperties: !item["continuousModeProperties"]
      ? item["continuousModeProperties"]
      : continuousModePropertiesDeserializer(item["continuousModeProperties"]),
  };
}

/** Configuration values for periodic mode backup */
export interface ContinuousModeProperties {
  /** Enum to indicate type of Continuos backup mode */
  tier?: ContinuousTier;
}

export function continuousModePropertiesSerializer(item: ContinuousModeProperties): any {
  return { tier: item["tier"] };
}

export function continuousModePropertiesDeserializer(item: any): ContinuousModeProperties {
  return {
    tier: item["tier"],
  };
}

/** Enum to indicate type of Continuous backup tier. */
export enum KnownContinuousTier {
  /** Continuous7Days */
  Continuous7Days = "Continuous7Days",
  /** Continuous30Days */
  Continuous30Days = "Continuous30Days",
}

/**
 * Enum to indicate type of Continuous backup tier. \
 * {@link KnownContinuousTier} can be used interchangeably with ContinuousTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Continuous7Days** \
 * **Continuous30Days**
 */
export type ContinuousTier = string;

export function corsPolicyArraySerializer(result: Array<CorsPolicy>): any[] {
  return result.map((item) => {
    return corsPolicySerializer(item);
  });
}

export function corsPolicyArrayDeserializer(result: Array<CorsPolicy>): any[] {
  return result.map((item) => {
    return corsPolicyDeserializer(item);
  });
}

/** The CORS policy for the Cosmos DB database account. */
export interface CorsPolicy {
  /** The origin domains that are permitted to make a request against the service via CORS. */
  allowedOrigins: string;
  /** The methods (HTTP request verbs) that the origin domain may use for a CORS request. */
  allowedMethods?: string;
  /** The request headers that the origin domain may specify on the CORS request. */
  allowedHeaders?: string;
  /** The response headers that may be sent in the response to the CORS request and exposed by the browser to the request issuer. */
  exposedHeaders?: string;
  /** The maximum amount time that a browser should cache the preflight OPTIONS request. */
  maxAgeInSeconds?: number;
}

export function corsPolicySerializer(item: CorsPolicy): any {
  return {
    allowedOrigins: item["allowedOrigins"],
    allowedMethods: item["allowedMethods"],
    allowedHeaders: item["allowedHeaders"],
    exposedHeaders: item["exposedHeaders"],
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

export function corsPolicyDeserializer(item: any): CorsPolicy {
  return {
    allowedOrigins: item["allowedOrigins"],
    allowedMethods: item["allowedMethods"],
    allowedHeaders: item["allowedHeaders"],
    exposedHeaders: item["exposedHeaders"],
    maxAgeInSeconds: item["maxAgeInSeconds"],
  };
}

/** Indicates what services are allowed to bypass firewall checks. */
export type NetworkAclBypass = "None" | "AzureServices";

/** The object that represents all properties related to capacity enforcement on an account. */
export interface Capacity {
  /** The total throughput limit imposed on the account. A totalThroughputLimit of 2000 imposes a strict limit of max throughput that can be provisioned on that account to be 2000. A totalThroughputLimit of -1 indicates no limits on provisioning of throughput. */
  totalThroughputLimit?: number;
}

export function capacitySerializer(item: Capacity): any {
  return { totalThroughputLimit: item["totalThroughputLimit"] };
}

export function capacityDeserializer(item: any): Capacity {
  return {
    totalThroughputLimit: item["totalThroughputLimit"],
  };
}

/** The metadata related to each access key for the given Cosmos DB database account. */
export interface DatabaseAccountKeysMetadata {
  /** The metadata related to the Primary Read-Write Key for the given Cosmos DB database account. */
  readonly primaryMasterKey?: AccountKeyMetadata;
  /** The metadata related to the Secondary Read-Write Key for the given Cosmos DB database account. */
  readonly secondaryMasterKey?: AccountKeyMetadata;
  /** The metadata related to the Primary Read-Only Key for the given Cosmos DB database account. */
  readonly primaryReadonlyMasterKey?: AccountKeyMetadata;
  /** The metadata related to the Secondary Read-Only Key for the given Cosmos DB database account. */
  readonly secondaryReadonlyMasterKey?: AccountKeyMetadata;
}

export function databaseAccountKeysMetadataDeserializer(item: any): DatabaseAccountKeysMetadata {
  return {
    primaryMasterKey: !item["primaryMasterKey"]
      ? item["primaryMasterKey"]
      : accountKeyMetadataDeserializer(item["primaryMasterKey"]),
    secondaryMasterKey: !item["secondaryMasterKey"]
      ? item["secondaryMasterKey"]
      : accountKeyMetadataDeserializer(item["secondaryMasterKey"]),
    primaryReadonlyMasterKey: !item["primaryReadonlyMasterKey"]
      ? item["primaryReadonlyMasterKey"]
      : accountKeyMetadataDeserializer(item["primaryReadonlyMasterKey"]),
    secondaryReadonlyMasterKey: !item["secondaryReadonlyMasterKey"]
      ? item["secondaryReadonlyMasterKey"]
      : accountKeyMetadataDeserializer(item["secondaryReadonlyMasterKey"]),
  };
}

/** The metadata related to an access key for a given database account. */
export interface AccountKeyMetadata {
  /** Generation time in UTC of the key in ISO-8601 format. If the value is missing from the object, it means that the last key regeneration was triggered before 2022-06-18. */
  readonly generationTime?: Date;
}

export function accountKeyMetadataDeserializer(item: any): AccountKeyMetadata {
  return {
    generationTime: !item["generationTime"]
      ? item["generationTime"]
      : new Date(item["generationTime"]),
  };
}

/** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
export enum KnownMinimalTlsVersion {
  /** Tls */
  Tls = "Tls",
  /** Tls11 */
  Tls11 = "Tls11",
  /** Tls12 */
  Tls12 = "Tls12",
}

/**
 * Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. \
 * {@link KnownMinimalTlsVersion} can be used interchangeably with MinimalTlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tls** \
 * **Tls11** \
 * **Tls12**
 */
export type MinimalTlsVersion = string;

/** Enum to indicate default priorityLevel of requests */
export enum KnownDefaultPriorityLevel {
  /** High */
  High = "High",
  /** Low */
  Low = "Low",
}

/**
 * Enum to indicate default priorityLevel of requests \
 * {@link KnownDefaultPriorityLevel} can be used interchangeably with DefaultPriorityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High** \
 * **Low**
 */
export type DefaultPriorityLevel = string;

/** Identity for the resource. */
export interface ManagedServiceIdentity {
  /** The principal id of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  >;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
          item["userAssignedIdentities"],
        ),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service. */
export type ResourceIdentityType =
  "SystemAssigned" | "UserAssigned" | "SystemAssigned,UserAssigned" | "None";

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
  item: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  >,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
          item[key],
        );
  });
  return result;
}

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<
  string,
  Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
          item[key],
        );
  });
  return result;
}

/** model interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties */
export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
  _item: Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties,
): any {
  return {};
}

export function components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
  item: any,
): Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Indicates the type of database account. This can only be set at database account creation. */
export enum KnownDatabaseAccountKind {
  /** GlobalDocumentDB */
  GlobalDocumentDB = "GlobalDocumentDB",
  /** MongoDB */
  MongoDB = "MongoDB",
  /** Parse */
  Parse = "Parse",
}

/**
 * Indicates the type of database account. This can only be set at database account creation. \
 * {@link KnownDatabaseAccountKind} can be used interchangeably with DatabaseAccountKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GlobalDocumentDB** \
 * **MongoDB** \
 * **Parse**
 */
export type DatabaseAccountKind = string;

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

/** Parameters to indicate the information about the restore. */
export interface RestoreParametersBase {
  /** The id of the restorable database account from which the restore has to be initiated. For example: /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{restorableDatabaseAccountName} */
  restoreSource?: string;
  /** Time to which the account has to be restored (ISO-8601 format). */
  restoreTimestampInUtc?: Date;
  /** Specifies whether the restored account will have Time-To-Live disabled upon the successful restore. */
  restoreWithTtlDisabled?: boolean;
}

export function restoreParametersBaseSerializer(item: RestoreParametersBase): any {
  return {
    restoreSource: item["restoreSource"],
    restoreTimestampInUtc: !item["restoreTimestampInUtc"]
      ? item["restoreTimestampInUtc"]
      : item["restoreTimestampInUtc"].toISOString(),
    restoreWithTtlDisabled: item["restoreWithTtlDisabled"],
  };
}

export function restoreParametersBaseDeserializer(item: any): RestoreParametersBase {
  return {
    restoreSource: item["restoreSource"],
    restoreTimestampInUtc: !item["restoreTimestampInUtc"]
      ? item["restoreTimestampInUtc"]
      : new Date(item["restoreTimestampInUtc"]),
    restoreWithTtlDisabled: item["restoreWithTtlDisabled"],
  };
}

/** Parameters to create and update Cosmos DB database accounts. */
export interface DatabaseAccountCreateUpdateParameters extends ARMResourceProperties {
  /** Indicates the type of database account. This can only be set at database account creation. */
  kind?: DatabaseAccountKind;
  identity?: ManagedServiceIdentity;
  /** The consistency policy for the Cosmos DB account. */
  consistencyPolicy?: ConsistencyPolicy;
  /** An array that contains the georeplication locations enabled for the Cosmos DB account. */
  locations: Location[];
  /** The offer type for the Cosmos DB database account. */
  databaseAccountOfferType: "Standard";
  /** List of IpRules. */
  ipRules?: IpAddressOrRange[];
  /** Flag to indicate whether to enable/disable Virtual Network ACL rules. */
  isVirtualNetworkFilterEnabled?: boolean;
  /** Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account. */
  enableAutomaticFailover?: boolean;
  /** List of Cosmos DB capabilities for the account */
  capabilities?: Capability[];
  /** List of Virtual Network ACL rules configured for the Cosmos DB account. */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** Enables the account to write in multiple locations */
  enableMultipleWriteLocations?: boolean;
  /** Enables the cassandra connector on the Cosmos DB C* account */
  enableCassandraConnector?: boolean;
  /** The cassandra connector offer type for the Cosmos DB database C* account. */
  connectorOffer?: ConnectorOffer;
  /** Disable write operations on metadata resources (databases, containers, throughput) via account keys */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /** The URI of the key vault */
  keyVaultKeyUri?: string;
  /** The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more. */
  defaultIdentity?: string;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Flag to indicate whether Free Tier is enabled. */
  enableFreeTier?: boolean;
  /** API specific properties. Currently, supported only for MongoDB API. */
  apiProperties?: ApiProperties;
  /** Flag to indicate whether to enable storage analytics. */
  enableAnalyticalStorage?: boolean;
  /** Analytical storage specific properties. */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
  /** The object representing the policy for taking backups on an account. */
  backupPolicy?: BackupPolicyUnion;
  /** The CORS policy for the Cosmos DB database account. */
  cors?: CorsPolicy[];
  /** Indicates what services are allowed to bypass firewall checks. */
  networkAclBypass?: NetworkAclBypass;
  /** An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account. */
  networkAclBypassResourceIds?: string[];
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** Parameters to indicate the information about the restore. */
  restoreParameters?: RestoreParameters;
  /** The object that represents all properties related to capacity enforcement on an account. */
  capacity?: Capacity;
  /** This property is ignored during the update/create operation, as the metadata is read-only. The object represents the metadata for the Account Keys of the Cosmos DB account. */
  readonly keysMetadata?: DatabaseAccountKeysMetadata;
  /** Flag to indicate enabling/disabling of Partition Merge feature on the account */
  enablePartitionMerge?: boolean;
  /** Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account */
  enableBurstCapacity?: boolean;
  /** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance. */
  customerManagedKeyStatus?: string;
  /** Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account */
  enablePriorityBasedExecution?: boolean;
  /** Enum to indicate default Priority Level of request for Priority Based Execution. */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /** Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /** Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account. */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
}

export function databaseAccountCreateUpdateParametersSerializer(
  item: DatabaseAccountCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    properties: _databaseAccountCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB database accounts. */
export interface DatabaseAccountCreateUpdateProperties {
  /** The consistency policy for the Cosmos DB account. */
  consistencyPolicy?: ConsistencyPolicy;
  /** An array that contains the georeplication locations enabled for the Cosmos DB account. */
  locations: Location[];
  /** The offer type for the Cosmos DB database account. */
  databaseAccountOfferType: "Standard";
  /** List of IpRules. */
  ipRules?: IpAddressOrRange[];
  /** Flag to indicate whether to enable/disable Virtual Network ACL rules. */
  isVirtualNetworkFilterEnabled?: boolean;
  /** Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account. */
  enableAutomaticFailover?: boolean;
  /** List of Cosmos DB capabilities for the account */
  capabilities?: Capability[];
  /** List of Virtual Network ACL rules configured for the Cosmos DB account. */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** Enables the account to write in multiple locations */
  enableMultipleWriteLocations?: boolean;
  /** Enables the cassandra connector on the Cosmos DB C* account */
  enableCassandraConnector?: boolean;
  /** The cassandra connector offer type for the Cosmos DB database C* account. */
  connectorOffer?: ConnectorOffer;
  /** Disable write operations on metadata resources (databases, containers, throughput) via account keys */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /** The URI of the key vault */
  keyVaultKeyUri?: string;
  /** The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more. */
  defaultIdentity?: string;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Flag to indicate whether Free Tier is enabled. */
  enableFreeTier?: boolean;
  /** API specific properties. Currently, supported only for MongoDB API. */
  apiProperties?: ApiProperties;
  /** Flag to indicate whether to enable storage analytics. */
  enableAnalyticalStorage?: boolean;
  /** Analytical storage specific properties. */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
  /** The object representing the policy for taking backups on an account. */
  backupPolicy?: BackupPolicyUnion;
  /** The CORS policy for the Cosmos DB database account. */
  cors?: CorsPolicy[];
  /** Indicates what services are allowed to bypass firewall checks. */
  networkAclBypass?: NetworkAclBypass;
  /** An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account. */
  networkAclBypassResourceIds?: string[];
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** Parameters to indicate the information about the restore. */
  restoreParameters?: RestoreParameters;
  /** The object that represents all properties related to capacity enforcement on an account. */
  capacity?: Capacity;
  /** This property is ignored during the update/create operation, as the metadata is read-only. The object represents the metadata for the Account Keys of the Cosmos DB account. */
  readonly keysMetadata?: DatabaseAccountKeysMetadata;
  /** Flag to indicate enabling/disabling of Partition Merge feature on the account */
  enablePartitionMerge?: boolean;
  /** Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account */
  enableBurstCapacity?: boolean;
  /** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance. */
  customerManagedKeyStatus?: string;
  /** Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account */
  enablePriorityBasedExecution?: boolean;
  /** Enum to indicate default Priority Level of request for Priority Based Execution. */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /** Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /** Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account. */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
}

export function databaseAccountCreateUpdatePropertiesSerializer(
  item: DatabaseAccountCreateUpdateProperties,
): any {
  return {
    consistencyPolicy: !item["consistencyPolicy"]
      ? item["consistencyPolicy"]
      : consistencyPolicySerializer(item["consistencyPolicy"]),
    locations: locationArraySerializer(item["locations"]),
    databaseAccountOfferType: item["databaseAccountOfferType"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipAddressOrRangeArraySerializer(item["ipRules"]),
    isVirtualNetworkFilterEnabled: item["isVirtualNetworkFilterEnabled"],
    enableAutomaticFailover: item["enableAutomaticFailover"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArraySerializer(item["capabilities"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
    enableMultipleWriteLocations: item["enableMultipleWriteLocations"],
    enableCassandraConnector: item["enableCassandraConnector"],
    connectorOffer: item["connectorOffer"],
    disableKeyBasedMetadataWriteAccess: item["disableKeyBasedMetadataWriteAccess"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    defaultIdentity: item["defaultIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enableFreeTier: item["enableFreeTier"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesSerializer(item["apiProperties"]),
    enableAnalyticalStorage: item["enableAnalyticalStorage"],
    analyticalStorageConfiguration: !item["analyticalStorageConfiguration"]
      ? item["analyticalStorageConfiguration"]
      : analyticalStorageConfigurationSerializer(item["analyticalStorageConfiguration"]),
    createMode: item["createMode"],
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyUnionSerializer(item["backupPolicy"]),
    cors: !item["cors"] ? item["cors"] : corsPolicyArraySerializer(item["cors"]),
    networkAclBypass: item["networkAclBypass"],
    networkAclBypassResourceIds: !item["networkAclBypassResourceIds"]
      ? item["networkAclBypassResourceIds"]
      : item["networkAclBypassResourceIds"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : restoreParametersSerializer(item["restoreParameters"]),
    capacity: !item["capacity"] ? item["capacity"] : capacitySerializer(item["capacity"]),
    enablePartitionMerge: item["enablePartitionMerge"],
    enableBurstCapacity: item["enableBurstCapacity"],
    minimalTlsVersion: item["minimalTlsVersion"],
    customerManagedKeyStatus: item["customerManagedKeyStatus"],
    enablePriorityBasedExecution: item["enablePriorityBasedExecution"],
    defaultPriorityLevel: item["defaultPriorityLevel"],
    enablePerRegionPerPartitionAutoscale: item["enablePerRegionPerPartitionAutoscale"],
    enforceHierarchicalPartitionKeyIdLastLevel: item["enforceHierarchicalPartitionKeyIdLastLevel"],
  };
}

/** The core properties of ARM resources. */
export interface ARMResourceProperties {
  /** The unique resource identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
}

export function armResourcePropertiesSerializer(item: ARMResourceProperties): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** Parameters for patching Azure Cosmos DB database account properties. */
export interface DatabaseAccountUpdateParameters {
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB". */
  tags?: Record<string, string>;
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** The consistency policy for the Cosmos DB account. */
  consistencyPolicy?: ConsistencyPolicy;
  /** An array that contains the georeplication locations enabled for the Cosmos DB account. */
  locations?: Location[];
  /** List of IpRules. */
  ipRules?: IpAddressOrRange[];
  /** Flag to indicate whether to enable/disable Virtual Network ACL rules. */
  isVirtualNetworkFilterEnabled?: boolean;
  /** Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account. */
  enableAutomaticFailover?: boolean;
  /** List of Cosmos DB capabilities for the account */
  capabilities?: Capability[];
  /** List of Virtual Network ACL rules configured for the Cosmos DB account. */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** Enables the account to write in multiple locations */
  enableMultipleWriteLocations?: boolean;
  /** Enables the cassandra connector on the Cosmos DB C* account */
  enableCassandraConnector?: boolean;
  /** The cassandra connector offer type for the Cosmos DB database C* account. */
  connectorOffer?: ConnectorOffer;
  /** Disable write operations on metadata resources (databases, containers, throughput) via account keys */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /** The URI of the key vault */
  keyVaultKeyUri?: string;
  /** The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more. */
  defaultIdentity?: string;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Flag to indicate whether Free Tier is enabled. */
  enableFreeTier?: boolean;
  /** API specific properties. Currently, supported only for MongoDB API. */
  apiProperties?: ApiProperties;
  /** Flag to indicate whether to enable storage analytics. */
  enableAnalyticalStorage?: boolean;
  /** Analytical storage specific properties. */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /** The object representing the policy for taking backups on an account. */
  backupPolicy?: BackupPolicyUnion;
  /** The CORS policy for the Cosmos DB database account. */
  cors?: CorsPolicy[];
  /** Indicates what services are allowed to bypass firewall checks. */
  networkAclBypass?: NetworkAclBypass;
  /** An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account. */
  networkAclBypassResourceIds?: string[];
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** The object that represents all properties related to capacity enforcement on an account. */
  capacity?: Capacity;
  /** This property is ignored during the update operation, as the metadata is read-only. The object represents the metadata for the Account Keys of the Cosmos DB account. */
  readonly keysMetadata?: DatabaseAccountKeysMetadata;
  /** Flag to indicate enabling/disabling of Partition Merge feature on the account */
  enablePartitionMerge?: boolean;
  /** Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account */
  enableBurstCapacity?: boolean;
  /** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance. */
  customerManagedKeyStatus?: string;
  /** Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account */
  enablePriorityBasedExecution?: boolean;
  /** Enum to indicate default Priority Level of request for Priority Based Execution. */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /** Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /** Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account. */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
}

export function databaseAccountUpdateParametersSerializer(
  item: DatabaseAccountUpdateParameters,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "consistencyPolicy",
      "locations",
      "ipRules",
      "isVirtualNetworkFilterEnabled",
      "enableAutomaticFailover",
      "capabilities",
      "virtualNetworkRules",
      "enableMultipleWriteLocations",
      "enableCassandraConnector",
      "connectorOffer",
      "disableKeyBasedMetadataWriteAccess",
      "keyVaultKeyUri",
      "defaultIdentity",
      "publicNetworkAccess",
      "enableFreeTier",
      "apiProperties",
      "enableAnalyticalStorage",
      "analyticalStorageConfiguration",
      "backupPolicy",
      "cors",
      "networkAclBypass",
      "networkAclBypassResourceIds",
      "disableLocalAuth",
      "capacity",
      "enablePartitionMerge",
      "enableBurstCapacity",
      "minimalTlsVersion",
      "customerManagedKeyStatus",
      "enablePriorityBasedExecution",
      "defaultPriorityLevel",
      "enablePerRegionPerPartitionAutoscale",
      "enforceHierarchicalPartitionKeyIdLastLevel",
    ])
      ? undefined
      : _databaseAccountUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to update Azure Cosmos DB database accounts. */
export interface DatabaseAccountUpdateProperties {
  /** The consistency policy for the Cosmos DB account. */
  consistencyPolicy?: ConsistencyPolicy;
  /** An array that contains the georeplication locations enabled for the Cosmos DB account. */
  locations?: Location[];
  /** List of IpRules. */
  ipRules?: IpAddressOrRange[];
  /** Flag to indicate whether to enable/disable Virtual Network ACL rules. */
  isVirtualNetworkFilterEnabled?: boolean;
  /** Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account. */
  enableAutomaticFailover?: boolean;
  /** List of Cosmos DB capabilities for the account */
  capabilities?: Capability[];
  /** List of Virtual Network ACL rules configured for the Cosmos DB account. */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** Enables the account to write in multiple locations */
  enableMultipleWriteLocations?: boolean;
  /** Enables the cassandra connector on the Cosmos DB C* account */
  enableCassandraConnector?: boolean;
  /** The cassandra connector offer type for the Cosmos DB database C* account. */
  connectorOffer?: ConnectorOffer;
  /** Disable write operations on metadata resources (databases, containers, throughput) via account keys */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /** The URI of the key vault */
  keyVaultKeyUri?: string;
  /** The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more. */
  defaultIdentity?: string;
  /** Whether requests from Public Network are allowed */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Flag to indicate whether Free Tier is enabled. */
  enableFreeTier?: boolean;
  /** API specific properties. Currently, supported only for MongoDB API. */
  apiProperties?: ApiProperties;
  /** Flag to indicate whether to enable storage analytics. */
  enableAnalyticalStorage?: boolean;
  /** Analytical storage specific properties. */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /** The object representing the policy for taking backups on an account. */
  backupPolicy?: BackupPolicyUnion;
  /** The CORS policy for the Cosmos DB database account. */
  cors?: CorsPolicy[];
  /** Indicates what services are allowed to bypass firewall checks. */
  networkAclBypass?: NetworkAclBypass;
  /** An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account. */
  networkAclBypassResourceIds?: string[];
  /** Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication. */
  disableLocalAuth?: boolean;
  /** The object that represents all properties related to capacity enforcement on an account. */
  capacity?: Capacity;
  /** This property is ignored during the update operation, as the metadata is read-only. The object represents the metadata for the Account Keys of the Cosmos DB account. */
  readonly keysMetadata?: DatabaseAccountKeysMetadata;
  /** Flag to indicate enabling/disabling of Partition Merge feature on the account */
  enablePartitionMerge?: boolean;
  /** Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account */
  enableBurstCapacity?: boolean;
  /** Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2. */
  minimalTlsVersion?: MinimalTlsVersion;
  /** Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance. */
  customerManagedKeyStatus?: string;
  /** Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account */
  enablePriorityBasedExecution?: boolean;
  /** Enum to indicate default Priority Level of request for Priority Based Execution. */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /** Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /** Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account. */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
}

export function databaseAccountUpdatePropertiesSerializer(
  item: DatabaseAccountUpdateProperties,
): any {
  return {
    consistencyPolicy: !item["consistencyPolicy"]
      ? item["consistencyPolicy"]
      : consistencyPolicySerializer(item["consistencyPolicy"]),
    locations: !item["locations"] ? item["locations"] : locationArraySerializer(item["locations"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : ipAddressOrRangeArraySerializer(item["ipRules"]),
    isVirtualNetworkFilterEnabled: item["isVirtualNetworkFilterEnabled"],
    enableAutomaticFailover: item["enableAutomaticFailover"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArraySerializer(item["capabilities"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
    enableMultipleWriteLocations: item["enableMultipleWriteLocations"],
    enableCassandraConnector: item["enableCassandraConnector"],
    connectorOffer: item["connectorOffer"],
    disableKeyBasedMetadataWriteAccess: item["disableKeyBasedMetadataWriteAccess"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    defaultIdentity: item["defaultIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enableFreeTier: item["enableFreeTier"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesSerializer(item["apiProperties"]),
    enableAnalyticalStorage: item["enableAnalyticalStorage"],
    analyticalStorageConfiguration: !item["analyticalStorageConfiguration"]
      ? item["analyticalStorageConfiguration"]
      : analyticalStorageConfigurationSerializer(item["analyticalStorageConfiguration"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyUnionSerializer(item["backupPolicy"]),
    cors: !item["cors"] ? item["cors"] : corsPolicyArraySerializer(item["cors"]),
    networkAclBypass: item["networkAclBypass"],
    networkAclBypassResourceIds: !item["networkAclBypassResourceIds"]
      ? item["networkAclBypassResourceIds"]
      : item["networkAclBypassResourceIds"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    capacity: !item["capacity"] ? item["capacity"] : capacitySerializer(item["capacity"]),
    enablePartitionMerge: item["enablePartitionMerge"],
    enableBurstCapacity: item["enableBurstCapacity"],
    minimalTlsVersion: item["minimalTlsVersion"],
    customerManagedKeyStatus: item["customerManagedKeyStatus"],
    enablePriorityBasedExecution: item["enablePriorityBasedExecution"],
    defaultPriorityLevel: item["defaultPriorityLevel"],
    enablePerRegionPerPartitionAutoscale: item["enablePerRegionPerPartitionAutoscale"],
    enforceHierarchicalPartitionKeyIdLastLevel: item["enforceHierarchicalPartitionKeyIdLastLevel"],
  };
}

/** The List operation response, that contains the database accounts and their properties. */
export interface _DatabaseAccountsListResult {
  /** List of database account and their properties. */
  readonly value?: DatabaseAccountGetResults[];
  nextLink?: string;
}

export function _databaseAccountsListResultDeserializer(item: any): _DatabaseAccountsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : databaseAccountGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseAccountGetResultsArrayDeserializer(
  result: Array<DatabaseAccountGetResults>,
): any[] {
  return result.map((item) => {
    return databaseAccountGetResultsDeserializer(item);
  });
}

/** The list of new failover policies for the failover priority change. */
export interface FailoverPolicies {
  /** List of failover policies. */
  failoverPolicies: FailoverPolicy[];
}

export function failoverPoliciesSerializer(item: FailoverPolicies): any {
  return { failoverPolicies: failoverPolicyArraySerializer(item["failoverPolicies"]) };
}

/** The access keys for the given database account. */
export interface DatabaseAccountListKeysResult extends DatabaseAccountListReadOnlyKeysResult {
  /** Base 64 encoded value of the primary read-write key. */
  readonly primaryMasterKey?: string;
  /** Base 64 encoded value of the secondary read-write key. */
  readonly secondaryMasterKey?: string;
}

export function databaseAccountListKeysResultDeserializer(
  item: any,
): DatabaseAccountListKeysResult {
  return {
    primaryReadonlyMasterKey: item["primaryReadonlyMasterKey"],
    secondaryReadonlyMasterKey: item["secondaryReadonlyMasterKey"],
    primaryMasterKey: item["primaryMasterKey"],
    secondaryMasterKey: item["secondaryMasterKey"],
  };
}

/** The read-only access keys for the given database account. */
export interface DatabaseAccountListReadOnlyKeysResult {
  /** Base 64 encoded value of the primary read-only key. */
  readonly primaryReadonlyMasterKey?: string;
  /** Base 64 encoded value of the secondary read-only key. */
  readonly secondaryReadonlyMasterKey?: string;
}

export function databaseAccountListReadOnlyKeysResultDeserializer(
  item: any,
): DatabaseAccountListReadOnlyKeysResult {
  return {
    primaryReadonlyMasterKey: item["primaryReadonlyMasterKey"],
    secondaryReadonlyMasterKey: item["secondaryReadonlyMasterKey"],
  };
}

/** The connection strings for the given database account. */
export interface DatabaseAccountListConnectionStringsResult {
  /** An array that contains the connection strings for the Cosmos DB account. */
  connectionStrings?: DatabaseAccountConnectionString[];
}

export function databaseAccountListConnectionStringsResultDeserializer(
  item: any,
): DatabaseAccountListConnectionStringsResult {
  return {
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : databaseAccountConnectionStringArrayDeserializer(item["connectionStrings"]),
  };
}

export function databaseAccountConnectionStringArrayDeserializer(
  result: Array<DatabaseAccountConnectionString>,
): any[] {
  return result.map((item) => {
    return databaseAccountConnectionStringDeserializer(item);
  });
}

/** Connection string for the Cosmos DB account */
export interface DatabaseAccountConnectionString {
  /** Value of the connection string */
  readonly connectionString?: string;
  /** Description of the connection string */
  readonly description?: string;
  /** Kind of the connection string key */
  readonly keyKind?: Kind;
  /** Type of the connection string */
  readonly type?: Type;
}

export function databaseAccountConnectionStringDeserializer(
  item: any,
): DatabaseAccountConnectionString {
  return {
    connectionString: item["connectionString"],
    description: item["description"],
    keyKind: item["keyKind"],
    type: item["type"],
  };
}

/** Kind of the connection string key */
export enum KnownKind {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
  /** PrimaryReadonly */
  PrimaryReadonly = "PrimaryReadonly",
  /** SecondaryReadonly */
  SecondaryReadonly = "SecondaryReadonly",
}

/**
 * Kind of the connection string key \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Secondary** \
 * **PrimaryReadonly** \
 * **SecondaryReadonly**
 */
export type Kind = string;

/** Type of the connection string */
export enum KnownType {
  /** Sql */
  Sql = "Sql",
  /** Table */
  Table = "Table",
  /** MongoDB */
  MongoDB = "MongoDB",
  /** Cassandra */
  Cassandra = "Cassandra",
  /** CassandraConnectorMetadata */
  CassandraConnectorMetadata = "CassandraConnectorMetadata",
  /** Gremlin */
  Gremlin = "Gremlin",
  /** SqlDedicatedGateway */
  SqlDedicatedGateway = "SqlDedicatedGateway",
  /** GremlinV2 */
  GremlinV2 = "GremlinV2",
  /** Undefined */
  Undefined = "Undefined",
}

/**
 * Type of the connection string \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sql** \
 * **Table** \
 * **MongoDB** \
 * **Cassandra** \
 * **CassandraConnectorMetadata** \
 * **Gremlin** \
 * **SqlDedicatedGateway** \
 * **GremlinV2** \
 * **Undefined**
 */
export type Type = string;

/** Cosmos DB region to online or offline. */
export interface RegionForOnlineOffline {
  /** Cosmos DB region, with spaces between words and each word capitalized. */
  region: string;
}

export function regionForOnlineOfflineSerializer(item: RegionForOnlineOffline): any {
  return { region: item["region"] };
}

/** Parameters to regenerate the keys within the database account. */
export interface DatabaseAccountRegenerateKeyParameters {
  /** The access key to regenerate. */
  keyKind: KeyKind;
}

export function databaseAccountRegenerateKeyParametersSerializer(
  item: DatabaseAccountRegenerateKeyParameters,
): any {
  return { keyKind: item["keyKind"] };
}

/** The access key to regenerate. */
export enum KnownKeyKind {
  /** primary */
  Primary = "primary",
  /** secondary */
  Secondary = "secondary",
  /** primaryReadonly */
  PrimaryReadonly = "primaryReadonly",
  /** secondaryReadonly */
  SecondaryReadonly = "secondaryReadonly",
}

/**
 * The access key to regenerate. \
 * {@link KnownKeyKind} can be used interchangeably with KeyKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **primary** \
 * **secondary** \
 * **primaryReadonly** \
 * **secondaryReadonly**
 */
export type KeyKind = string;

/** The response to a list metrics request. */
export interface _MetricListResult {
  /** The list of metrics for the account. */
  readonly value?: Metric[];
  nextLink?: string;
}

export function _metricListResultDeserializer(item: any): _MetricListResult {
  return {
    value: !item["value"] ? item["value"] : metricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricArrayDeserializer(result: Array<Metric>): any[] {
  return result.map((item) => {
    return metricDeserializer(item);
  });
}

/** Metric data */
export interface Metric {
  /** The start time for the metric (ISO-8601 format). */
  readonly startTime?: Date;
  /** The end time for the metric (ISO-8601 format). */
  readonly endTime?: Date;
  /** The time grain to be used to summarize the metric values. */
  readonly timeGrain?: string;
  /** The unit of the metric. */
  readonly unit?: UnitType;
  /** The name information for the metric. */
  readonly name?: MetricName;
  /** The metric values for the specified time window and timestep. */
  readonly metricValues?: MetricValue[];
}

export function metricDeserializer(item: any): Metric {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    timeGrain: item["timeGrain"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    metricValues: !item["metricValues"]
      ? item["metricValues"]
      : metricValueArrayDeserializer(item["metricValues"]),
  };
}

/** The unit of the metric. */
export enum KnownUnitType {
  /** Count */
  Count = "Count",
  /** Bytes */
  Bytes = "Bytes",
  /** Seconds */
  Seconds = "Seconds",
  /** Percent */
  Percent = "Percent",
  /** CountPerSecond */
  CountPerSecond = "CountPerSecond",
  /** BytesPerSecond */
  BytesPerSecond = "BytesPerSecond",
  /** Milliseconds */
  Milliseconds = "Milliseconds",
}

/**
 * The unit of the metric. \
 * {@link KnownUnitType} can be used interchangeably with UnitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count** \
 * **Bytes** \
 * **Seconds** \
 * **Percent** \
 * **CountPerSecond** \
 * **BytesPerSecond** \
 * **Milliseconds**
 */
export type UnitType = string;

/** A metric name. */
export interface MetricName {
  /** The name of the metric. */
  readonly value?: string;
  /** The friendly name of the metric. */
  readonly localizedValue?: string;
}

export function metricNameDeserializer(item: any): MetricName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

export function metricValueArrayDeserializer(result: Array<MetricValue>): any[] {
  return result.map((item) => {
    return metricValueDeserializer(item);
  });
}

/** Represents metrics values. */
export interface MetricValue {
  /** The number of values for the metric. */
  readonly count?: number;
  /** The average value of the metric. */
  readonly average?: number;
  /** The max value of the metric. */
  readonly maximum?: number;
  /** The min value of the metric. */
  readonly minimum?: number;
  /** The metric timestamp (ISO-8601 format). */
  readonly timestamp?: Date;
  /** The total value of the metric. */
  readonly total?: number;
}

export function metricValueDeserializer(item: any): MetricValue {
  return {
    count: item["_count"],
    average: item["average"],
    maximum: item["maximum"],
    minimum: item["minimum"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    total: item["total"],
  };
}

/** The response to a list usage request. */
export interface _UsagesResult {
  /** The list of usages for the database. A usage is a point in time metric */
  readonly value?: Usage[];
  nextLink?: string;
}

export function _usagesResultDeserializer(item: any): _UsagesResult {
  return {
    value: !item["value"] ? item["value"] : usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** The usage data for a usage request. */
export interface Usage {
  /** The unit of the metric. */
  readonly unit?: UnitType;
  /** The name information for the metric. */
  readonly name?: MetricName;
  /** The quota period used to summarize the usage values. */
  readonly quotaPeriod?: string;
  /** Maximum value for this metric */
  readonly limit?: number;
  /** Current value for this metric */
  readonly currentValue?: number;
}

export function usageDeserializer(item: any): Usage {
  return {
    unit: item["unit"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    quotaPeriod: item["quotaPeriod"],
    limit: item["limit"],
    currentValue: item["currentValue"],
  };
}

/** The response to a list metric definitions request. */
export interface _MetricDefinitionsListResult {
  /** The list of metric definitions for the account. */
  readonly value?: MetricDefinition[];
  nextLink?: string;
}

export function _metricDefinitionsListResultDeserializer(item: any): _MetricDefinitionsListResult {
  return {
    value: !item["value"] ? item["value"] : metricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metricDefinitionArrayDeserializer(result: Array<MetricDefinition>): any[] {
  return result.map((item) => {
    return metricDefinitionDeserializer(item);
  });
}

/** The definition of a metric. */
export interface MetricDefinition {
  /** The list of metric availabilities for the account. */
  readonly metricAvailabilities?: MetricAvailability[];
  /** The primary aggregation type of the metric. */
  readonly primaryAggregationType?: PrimaryAggregationType;
  /** The unit of the metric. */
  readonly unit?: UnitType;
  /** The resource uri of the database. */
  readonly resourceUri?: string;
  /** The name information for the metric. */
  readonly name?: MetricName;
}

export function metricDefinitionDeserializer(item: any): MetricDefinition {
  return {
    metricAvailabilities: !item["metricAvailabilities"]
      ? item["metricAvailabilities"]
      : metricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    primaryAggregationType: item["primaryAggregationType"],
    unit: item["unit"],
    resourceUri: item["resourceUri"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
  };
}

export function metricAvailabilityArrayDeserializer(result: Array<MetricAvailability>): any[] {
  return result.map((item) => {
    return metricAvailabilityDeserializer(item);
  });
}

/** The availability of the metric. */
export interface MetricAvailability {
  /** The time grain to be used to summarize the metric values. */
  readonly timeGrain?: string;
  /** The retention for the metric values. */
  readonly retention?: string;
}

export function metricAvailabilityDeserializer(item: any): MetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    retention: item["retention"],
  };
}

/** The primary aggregation type of the metric. */
export enum KnownPrimaryAggregationType {
  /** None */
  None = "None",
  /** Average */
  Average = "Average",
  /** Total */
  Total = "Total",
  /** Minimum */
  Minimum = "Minimum",
  /** Maximum */
  Maximum = "Maximum",
  /** Last */
  Last = "Last",
}

/**
 * The primary aggregation type of the metric. \
 * {@link KnownPrimaryAggregationType} can be used interchangeably with PrimaryAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Average** \
 * **Total** \
 * **Minimum** \
 * **Maximum** \
 * **Last**
 */
export type PrimaryAggregationType = string;

/** An Azure Cosmos DB SQL database. */
export interface SqlDatabaseGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: SqlDatabaseGetPropertiesResource;
  options?: SqlDatabaseGetPropertiesOptions;
}

export function sqlDatabaseGetResultsDeserializer(item: any): SqlDatabaseGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlDatabaseGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB SQL database */
export interface SqlDatabaseGetProperties {
  resource?: SqlDatabaseGetPropertiesResource;
  options?: SqlDatabaseGetPropertiesOptions;
}

export function sqlDatabaseGetPropertiesDeserializer(item: any): SqlDatabaseGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlDatabaseGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : sqlDatabaseGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface SqlDatabaseGetPropertiesResource */
export interface SqlDatabaseGetPropertiesResource extends SqlDatabaseResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
  /** A system generated property that specified the addressable path of the collections resource. */
  colls?: string;
  /** A system generated property that specifies the addressable path of the users resource. */
  users?: string;
}

export function sqlDatabaseGetPropertiesResourceDeserializer(
  item: any,
): SqlDatabaseGetPropertiesResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
    colls: item["_colls"],
    users: item["_users"],
  };
}

/** model interface SqlDatabaseGetPropertiesOptions */
export interface SqlDatabaseGetPropertiesOptions extends OptionsResource {}

export function sqlDatabaseGetPropertiesOptionsDeserializer(
  item: any,
): SqlDatabaseGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB SQL database resource object */
export interface SqlDatabaseResource {
  /** Name of the Cosmos DB SQL database */
  id: string;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
}

export function sqlDatabaseResourceSerializer(item: SqlDatabaseResource): any {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function sqlDatabaseResourceDeserializer(item: any): SqlDatabaseResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

/** Parameters to indicate the information about the restore. */
export interface ResourceRestoreParameters extends RestoreParametersBase {}

export function resourceRestoreParametersSerializer(item: ResourceRestoreParameters): any {
  return {
    restoreSource: item["restoreSource"],
    restoreTimestampInUtc: !item["restoreTimestampInUtc"]
      ? item["restoreTimestampInUtc"]
      : item["restoreTimestampInUtc"].toISOString(),
    restoreWithTtlDisabled: item["restoreWithTtlDisabled"],
  };
}

export function resourceRestoreParametersDeserializer(item: any): ResourceRestoreParameters {
  return {
    restoreSource: item["restoreSource"],
    restoreTimestampInUtc: !item["restoreTimestampInUtc"]
      ? item["restoreTimestampInUtc"]
      : new Date(item["restoreTimestampInUtc"]),
    restoreWithTtlDisabled: item["restoreWithTtlDisabled"],
  };
}

/** Cosmos DB options resource object */
export interface OptionsResource {
  /** Value of the Cosmos DB resource throughput or autoscaleSettings. Use the ThroughputSetting resource when retrieving offer details. */
  throughput?: number;
  /** Specifies the Autoscale settings. */
  autoscaleSettings?: AutoscaleSettings;
}

export function optionsResourceDeserializer(item: any): OptionsResource {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** model interface AutoscaleSettings */
export interface AutoscaleSettings {
  /** Represents maximum throughput, the resource can scale up to. */
  maxThroughput?: number;
}

export function autoscaleSettingsSerializer(item: AutoscaleSettings): any {
  return { maxThroughput: item["maxThroughput"] };
}

export function autoscaleSettingsDeserializer(item: any): AutoscaleSettings {
  return {
    maxThroughput: item["maxThroughput"],
  };
}

/** Parameters to create and update Cosmos DB SQL database. */
export interface SqlDatabaseCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a SQL database */
  resource: SqlDatabaseResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlDatabaseCreateUpdateParametersSerializer(
  item: SqlDatabaseCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _sqlDatabaseCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB SQL database. */
export interface SqlDatabaseCreateUpdateProperties {
  /** The standard JSON format of a SQL database */
  resource: SqlDatabaseResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlDatabaseCreateUpdatePropertiesSerializer(
  item: SqlDatabaseCreateUpdateProperties,
): any {
  return {
    resource: sqlDatabaseResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput" */
export interface CreateUpdateOptions {
  /** Request Units per second. For example, "throughput": 10000. */
  throughput?: number;
  /** Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both. */
  autoscaleSettings?: AutoscaleSettings;
}

export function createUpdateOptionsSerializer(item: CreateUpdateOptions): any {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsSerializer(item["autoscaleSettings"]),
  };
}

/** The List operation response, that contains the SQL databases and their properties. */
export interface _SqlDatabaseListResult {
  /** List of SQL databases and their properties. */
  readonly value?: SqlDatabaseGetResults[];
  nextLink?: string;
}

export function _sqlDatabaseListResultDeserializer(item: any): _SqlDatabaseListResult {
  return {
    value: !item["value"] ? item["value"] : sqlDatabaseGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlDatabaseGetResultsArrayDeserializer(
  result: Array<SqlDatabaseGetResults>,
): any[] {
  return result.map((item) => {
    return sqlDatabaseGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB resource throughput. */
export interface ThroughputSettingsGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: ThroughputSettingsGetPropertiesResource;
}

export function throughputSettingsGetResultsDeserializer(item: any): ThroughputSettingsGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _throughputSettingsGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB resource throughput */
export interface ThroughputSettingsGetProperties {
  resource?: ThroughputSettingsGetPropertiesResource;
}

export function throughputSettingsGetPropertiesDeserializer(
  item: any,
): ThroughputSettingsGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : throughputSettingsGetPropertiesResourceDeserializer(item["resource"]),
  };
}

/** model interface ThroughputSettingsGetPropertiesResource */
export interface ThroughputSettingsGetPropertiesResource extends ThroughputSettingsResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function throughputSettingsGetPropertiesResourceDeserializer(
  item: any,
): ThroughputSettingsGetPropertiesResource {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsResourceDeserializer(item["autoscaleSettings"]),
    minimumThroughput: item["minimumThroughput"],
    offerReplacePending: item["offerReplacePending"],
    instantMaximumThroughput: item["instantMaximumThroughput"],
    softAllowedMaximumThroughput: item["softAllowedMaximumThroughput"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** Cosmos DB resource throughput object. Either throughput is required or autoscaleSettings is required, but not both. */
export interface ThroughputSettingsResource {
  /** Value of the Cosmos DB resource throughput. Either throughput is required or autoscaleSettings is required, but not both. */
  throughput?: number;
  /** Cosmos DB resource for autoscale settings. Either throughput is required or autoscaleSettings is required, but not both. */
  autoscaleSettings?: AutoscaleSettingsResource;
  /** The minimum throughput of the resource */
  readonly minimumThroughput?: string;
  /** The throughput replace is pending */
  readonly offerReplacePending?: string;
  /** The offer throughput value to instantly scale up without triggering splits */
  readonly instantMaximumThroughput?: string;
  /** The maximum throughput value or the maximum maxThroughput value (for autoscale) that can be specified */
  readonly softAllowedMaximumThroughput?: string;
}

export function throughputSettingsResourceSerializer(item: ThroughputSettingsResource): any {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsResourceSerializer(item["autoscaleSettings"]),
  };
}

export function throughputSettingsResourceDeserializer(item: any): ThroughputSettingsResource {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsResourceDeserializer(item["autoscaleSettings"]),
    minimumThroughput: item["minimumThroughput"],
    offerReplacePending: item["offerReplacePending"],
    instantMaximumThroughput: item["instantMaximumThroughput"],
    softAllowedMaximumThroughput: item["softAllowedMaximumThroughput"],
  };
}

/** Cosmos DB provisioned throughput settings object */
export interface AutoscaleSettingsResource {
  /** Represents maximum throughput container can scale up to. */
  maxThroughput: number;
  /** Cosmos DB resource auto-upgrade policy */
  autoUpgradePolicy?: AutoUpgradePolicyResource;
  /** Represents target maximum throughput container can scale up to once offer is no longer in pending state. */
  readonly targetMaxThroughput?: number;
}

export function autoscaleSettingsResourceSerializer(item: AutoscaleSettingsResource): any {
  return {
    maxThroughput: item["maxThroughput"],
    autoUpgradePolicy: !item["autoUpgradePolicy"]
      ? item["autoUpgradePolicy"]
      : autoUpgradePolicyResourceSerializer(item["autoUpgradePolicy"]),
  };
}

export function autoscaleSettingsResourceDeserializer(item: any): AutoscaleSettingsResource {
  return {
    maxThroughput: item["maxThroughput"],
    autoUpgradePolicy: !item["autoUpgradePolicy"]
      ? item["autoUpgradePolicy"]
      : autoUpgradePolicyResourceDeserializer(item["autoUpgradePolicy"]),
    targetMaxThroughput: item["targetMaxThroughput"],
  };
}

/** Cosmos DB resource auto-upgrade policy */
export interface AutoUpgradePolicyResource {
  /** Represents throughput policy which service must adhere to for auto-upgrade */
  throughputPolicy?: ThroughputPolicyResource;
}

export function autoUpgradePolicyResourceSerializer(item: AutoUpgradePolicyResource): any {
  return {
    throughputPolicy: !item["throughputPolicy"]
      ? item["throughputPolicy"]
      : throughputPolicyResourceSerializer(item["throughputPolicy"]),
  };
}

export function autoUpgradePolicyResourceDeserializer(item: any): AutoUpgradePolicyResource {
  return {
    throughputPolicy: !item["throughputPolicy"]
      ? item["throughputPolicy"]
      : throughputPolicyResourceDeserializer(item["throughputPolicy"]),
  };
}

/** Cosmos DB resource throughput policy */
export interface ThroughputPolicyResource {
  /** Determines whether the ThroughputPolicy is active or not */
  isEnabled?: boolean;
  /** Represents the percentage by which throughput can increase every time throughput policy kicks in. */
  incrementPercent?: number;
}

export function throughputPolicyResourceSerializer(item: ThroughputPolicyResource): any {
  return { isEnabled: item["isEnabled"], incrementPercent: item["incrementPercent"] };
}

export function throughputPolicyResourceDeserializer(item: any): ThroughputPolicyResource {
  return {
    isEnabled: item["isEnabled"],
    incrementPercent: item["incrementPercent"],
  };
}

/** Parameters to update Cosmos DB resource throughput. */
export interface ThroughputSettingsUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a resource throughput */
  resource: ThroughputSettingsResource;
}

export function throughputSettingsUpdateParametersSerializer(
  item: ThroughputSettingsUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _throughputSettingsUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to update Azure Cosmos DB resource throughput. */
export interface ThroughputSettingsUpdateProperties {
  /** The standard JSON format of a resource throughput */
  resource: ThroughputSettingsResource;
}

export function throughputSettingsUpdatePropertiesSerializer(
  item: ThroughputSettingsUpdateProperties,
): any {
  return { resource: throughputSettingsResourceSerializer(item["resource"]) };
}

/** An error response from the service. */
export interface CloudError {
  /** Error Response. */
  error?: CosmosDBErrorResult;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cosmosDBErrorResultDeserializer(item["error"]),
  };
}

/** Error Response. */
export interface CosmosDBErrorResult {
  /** Error code. */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function cosmosDBErrorResultDeserializer(item: any): CosmosDBErrorResult {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Client Encryption Key. */
export interface ClientEncryptionKeyGetResults extends ProxyResource {
  resource?: ClientEncryptionKeyGetPropertiesResource;
}

export function clientEncryptionKeyGetResultsDeserializer(
  item: any,
): ClientEncryptionKeyGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clientEncryptionKeyGetResultsPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a ClientEncryptionKey resource */
export interface ClientEncryptionKeyGetProperties {
  resource?: ClientEncryptionKeyGetPropertiesResource;
}

export function clientEncryptionKeyGetPropertiesDeserializer(
  item: any,
): ClientEncryptionKeyGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : clientEncryptionKeyGetPropertiesResourceDeserializer(item["resource"]),
  };
}

/** model interface ClientEncryptionKeyGetPropertiesResource */
export interface ClientEncryptionKeyGetPropertiesResource extends ClientEncryptionKeyResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function clientEncryptionKeyGetPropertiesResourceDeserializer(
  item: any,
): ClientEncryptionKeyGetPropertiesResource {
  return {
    id: item["id"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
    wrappedDataEncryptionKey: !item["wrappedDataEncryptionKey"]
      ? item["wrappedDataEncryptionKey"]
      : typeof item["wrappedDataEncryptionKey"] === "string"
        ? stringToUint8Array(item["wrappedDataEncryptionKey"], "base64")
        : item["wrappedDataEncryptionKey"],
    keyWrapMetadata: !item["keyWrapMetadata"]
      ? item["keyWrapMetadata"]
      : keyWrapMetadataDeserializer(item["keyWrapMetadata"]),
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** Cosmos DB client encryption key resource object. */
export interface ClientEncryptionKeyResource {
  /** Name of the ClientEncryptionKey */
  id?: string;
  /** Encryption algorithm that will be used along with this client encryption key to encrypt/decrypt data. */
  encryptionAlgorithm?: string;
  /** Wrapped (encrypted) form of the key represented as a byte array. */
  wrappedDataEncryptionKey?: Uint8Array;
  /** Metadata for the wrapping provider that can be used to unwrap the wrapped client encryption key. */
  keyWrapMetadata?: KeyWrapMetadata;
}

export function clientEncryptionKeyResourceSerializer(item: ClientEncryptionKeyResource): any {
  return {
    id: item["id"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
    wrappedDataEncryptionKey: !item["wrappedDataEncryptionKey"]
      ? item["wrappedDataEncryptionKey"]
      : uint8ArrayToString(item["wrappedDataEncryptionKey"], "base64"),
    keyWrapMetadata: !item["keyWrapMetadata"]
      ? item["keyWrapMetadata"]
      : keyWrapMetadataSerializer(item["keyWrapMetadata"]),
  };
}

export function clientEncryptionKeyResourceDeserializer(item: any): ClientEncryptionKeyResource {
  return {
    id: item["id"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
    wrappedDataEncryptionKey: !item["wrappedDataEncryptionKey"]
      ? item["wrappedDataEncryptionKey"]
      : typeof item["wrappedDataEncryptionKey"] === "string"
        ? stringToUint8Array(item["wrappedDataEncryptionKey"], "base64")
        : item["wrappedDataEncryptionKey"],
    keyWrapMetadata: !item["keyWrapMetadata"]
      ? item["keyWrapMetadata"]
      : keyWrapMetadataDeserializer(item["keyWrapMetadata"]),
  };
}

/** Represents key wrap metadata that a key wrapping provider can use to wrap/unwrap a client encryption key. */
export interface KeyWrapMetadata {
  /** The name of associated KeyEncryptionKey (aka CustomerManagedKey). */
  name?: string;
  /** ProviderName of KeyStoreProvider. */
  type?: string;
  /** Reference / link to the KeyEncryptionKey. */
  value?: string;
  /** Algorithm used in wrapping and unwrapping of the data encryption key. */
  algorithm?: string;
}

export function keyWrapMetadataSerializer(item: KeyWrapMetadata): any {
  return {
    name: item["name"],
    type: item["type"],
    value: item["value"],
    algorithm: item["algorithm"],
  };
}

export function keyWrapMetadataDeserializer(item: any): KeyWrapMetadata {
  return {
    name: item["name"],
    type: item["type"],
    value: item["value"],
    algorithm: item["algorithm"],
  };
}

/** Parameters to create and update ClientEncryptionKey. */
export interface ClientEncryptionKeyCreateUpdateParameters {
  /** The standard JSON format of a ClientEncryptionKey */
  resource: ClientEncryptionKeyResource;
}

export function clientEncryptionKeyCreateUpdateParametersSerializer(
  item: ClientEncryptionKeyCreateUpdateParameters,
): any {
  return { properties: _clientEncryptionKeyCreateUpdateParametersPropertiesSerializer(item) };
}

/** Properties to create and update ClientEncryptionKey. */
export interface ClientEncryptionKeyCreateUpdateProperties {
  /** The standard JSON format of a ClientEncryptionKey */
  resource: ClientEncryptionKeyResource;
}

export function clientEncryptionKeyCreateUpdatePropertiesSerializer(
  item: ClientEncryptionKeyCreateUpdateProperties,
): any {
  return { resource: clientEncryptionKeyResourceSerializer(item["resource"]) };
}

/** The List operation response, that contains the client encryption keys and their properties. */
export interface _ClientEncryptionKeysListResult {
  /** List of client encryption keys and their properties. */
  readonly value?: ClientEncryptionKeyGetResults[];
  nextLink?: string;
}

export function _clientEncryptionKeysListResultDeserializer(
  item: any,
): _ClientEncryptionKeysListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : clientEncryptionKeyGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clientEncryptionKeyGetResultsArrayDeserializer(
  result: Array<ClientEncryptionKeyGetResults>,
): any[] {
  return result.map((item) => {
    return clientEncryptionKeyGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB container. */
export interface SqlContainerGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: SqlContainerGetPropertiesResource;
  options?: SqlContainerGetPropertiesOptions;
}

export function sqlContainerGetResultsDeserializer(item: any): SqlContainerGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlContainerGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB container */
export interface SqlContainerGetProperties {
  resource?: SqlContainerGetPropertiesResource;
  options?: SqlContainerGetPropertiesOptions;
}

export function sqlContainerGetPropertiesDeserializer(item: any): SqlContainerGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlContainerGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : sqlContainerGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface SqlContainerGetPropertiesResource */
export interface SqlContainerGetPropertiesResource extends SqlContainerResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function sqlContainerGetPropertiesResourceDeserializer(
  item: any,
): SqlContainerGetPropertiesResource {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicyDeserializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeyDeserializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicyDeserializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicyDeserializer(item["conflictResolutionPolicy"]),
    clientEncryptionPolicy: !item["clientEncryptionPolicy"]
      ? item["clientEncryptionPolicy"]
      : clientEncryptionPolicyDeserializer(item["clientEncryptionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    computedProperties: !item["computedProperties"]
      ? item["computedProperties"]
      : computedPropertyArrayDeserializer(item["computedProperties"]),
    vectorEmbeddingPolicy: !item["vectorEmbeddingPolicy"]
      ? item["vectorEmbeddingPolicy"]
      : vectorEmbeddingPolicyDeserializer(item["vectorEmbeddingPolicy"]),
    fullTextPolicy: !item["fullTextPolicy"]
      ? item["fullTextPolicy"]
      : fullTextPolicyDeserializer(item["fullTextPolicy"]),
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface SqlContainerGetPropertiesOptions */
export interface SqlContainerGetPropertiesOptions extends OptionsResource {}

export function sqlContainerGetPropertiesOptionsDeserializer(
  item: any,
): SqlContainerGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB SQL container resource object */
export interface SqlContainerResource {
  /** Name of the Cosmos DB SQL container */
  id: string;
  /** The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the container */
  indexingPolicy?: IndexingPolicy;
  /** The configuration of the partition key to be used for partitioning data into multiple partitions */
  partitionKey?: ContainerPartitionKey;
  /** Default time to live */
  defaultTtl?: number;
  /** The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service. */
  uniqueKeyPolicy?: UniqueKeyPolicy;
  /** The conflict resolution policy for the container. */
  conflictResolutionPolicy?: ConflictResolutionPolicy;
  /** The client encryption policy for the container. */
  clientEncryptionPolicy?: ClientEncryptionPolicy;
  /** Analytical TTL. */
  analyticalStorageTtl?: number;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
  /** List of computed properties */
  computedProperties?: ComputedProperty[];
  /** The vector embedding policy for the container. */
  vectorEmbeddingPolicy?: VectorEmbeddingPolicy;
  /** The FullText policy for the container. */
  fullTextPolicy?: FullTextPolicy;
}

export function sqlContainerResourceSerializer(item: SqlContainerResource): any {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicySerializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeySerializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicySerializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicySerializer(item["conflictResolutionPolicy"]),
    clientEncryptionPolicy: !item["clientEncryptionPolicy"]
      ? item["clientEncryptionPolicy"]
      : clientEncryptionPolicySerializer(item["clientEncryptionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
    computedProperties: !item["computedProperties"]
      ? item["computedProperties"]
      : computedPropertyArraySerializer(item["computedProperties"]),
    vectorEmbeddingPolicy: !item["vectorEmbeddingPolicy"]
      ? item["vectorEmbeddingPolicy"]
      : vectorEmbeddingPolicySerializer(item["vectorEmbeddingPolicy"]),
    fullTextPolicy: !item["fullTextPolicy"]
      ? item["fullTextPolicy"]
      : fullTextPolicySerializer(item["fullTextPolicy"]),
  };
}

export function sqlContainerResourceDeserializer(item: any): SqlContainerResource {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicyDeserializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeyDeserializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicyDeserializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicyDeserializer(item["conflictResolutionPolicy"]),
    clientEncryptionPolicy: !item["clientEncryptionPolicy"]
      ? item["clientEncryptionPolicy"]
      : clientEncryptionPolicyDeserializer(item["clientEncryptionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    computedProperties: !item["computedProperties"]
      ? item["computedProperties"]
      : computedPropertyArrayDeserializer(item["computedProperties"]),
    vectorEmbeddingPolicy: !item["vectorEmbeddingPolicy"]
      ? item["vectorEmbeddingPolicy"]
      : vectorEmbeddingPolicyDeserializer(item["vectorEmbeddingPolicy"]),
    fullTextPolicy: !item["fullTextPolicy"]
      ? item["fullTextPolicy"]
      : fullTextPolicyDeserializer(item["fullTextPolicy"]),
  };
}

/** Cosmos DB indexing policy */
export interface IndexingPolicy {
  /** Indicates if the indexing policy is automatic */
  automatic?: boolean;
  /** Indicates the indexing mode. */
  indexingMode?: IndexingMode;
  /** List of paths to include in the indexing */
  includedPaths?: IncludedPath[];
  /** List of paths to exclude from indexing */
  excludedPaths?: ExcludedPath[];
  /** List of composite path list */
  compositeIndexes?: CompositePath[][];
  /** List of spatial specifics */
  spatialIndexes?: SpatialSpec[];
  /** List of paths to include in the vector indexing */
  vectorIndexes?: VectorIndex[];
  /** List of paths to include in the full text indexing */
  fullTextIndexes?: FullTextIndexPath[];
}

export function indexingPolicySerializer(item: IndexingPolicy): any {
  return {
    automatic: item["automatic"],
    indexingMode: item["indexingMode"],
    includedPaths: !item["includedPaths"]
      ? item["includedPaths"]
      : includedPathArraySerializer(item["includedPaths"]),
    excludedPaths: !item["excludedPaths"]
      ? item["excludedPaths"]
      : excludedPathArraySerializer(item["excludedPaths"]),
    compositeIndexes: !item["compositeIndexes"]
      ? item["compositeIndexes"]
      : compositePathArrayArraySerializer(item["compositeIndexes"]),
    spatialIndexes: !item["spatialIndexes"]
      ? item["spatialIndexes"]
      : spatialSpecArraySerializer(item["spatialIndexes"]),
    vectorIndexes: !item["vectorIndexes"]
      ? item["vectorIndexes"]
      : vectorIndexArraySerializer(item["vectorIndexes"]),
    fullTextIndexes: !item["fullTextIndexes"]
      ? item["fullTextIndexes"]
      : fullTextIndexPathArraySerializer(item["fullTextIndexes"]),
  };
}

export function indexingPolicyDeserializer(item: any): IndexingPolicy {
  return {
    automatic: item["automatic"],
    indexingMode: item["indexingMode"],
    includedPaths: !item["includedPaths"]
      ? item["includedPaths"]
      : includedPathArrayDeserializer(item["includedPaths"]),
    excludedPaths: !item["excludedPaths"]
      ? item["excludedPaths"]
      : excludedPathArrayDeserializer(item["excludedPaths"]),
    compositeIndexes: !item["compositeIndexes"]
      ? item["compositeIndexes"]
      : compositePathArrayArrayDeserializer(item["compositeIndexes"]),
    spatialIndexes: !item["spatialIndexes"]
      ? item["spatialIndexes"]
      : spatialSpecArrayDeserializer(item["spatialIndexes"]),
    vectorIndexes: !item["vectorIndexes"]
      ? item["vectorIndexes"]
      : vectorIndexArrayDeserializer(item["vectorIndexes"]),
    fullTextIndexes: !item["fullTextIndexes"]
      ? item["fullTextIndexes"]
      : fullTextIndexPathArrayDeserializer(item["fullTextIndexes"]),
  };
}

/** Indicates the indexing mode. */
export enum KnownIndexingMode {
  /** consistent */
  Consistent = "consistent",
  /** lazy */
  Lazy = "lazy",
  /** none */
  None = "none",
}

/**
 * Indicates the indexing mode. \
 * {@link KnownIndexingMode} can be used interchangeably with IndexingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **consistent** \
 * **lazy** \
 * **none**
 */
export type IndexingMode = string;

export function includedPathArraySerializer(result: Array<IncludedPath>): any[] {
  return result.map((item) => {
    return includedPathSerializer(item);
  });
}

export function includedPathArrayDeserializer(result: Array<IncludedPath>): any[] {
  return result.map((item) => {
    return includedPathDeserializer(item);
  });
}

/** The paths that are included in indexing */
export interface IncludedPath {
  /** The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*) */
  path?: string;
  /** List of indexes for this path */
  indexes?: Indexes[];
}

export function includedPathSerializer(item: IncludedPath): any {
  return {
    path: item["path"],
    indexes: !item["indexes"] ? item["indexes"] : indexesArraySerializer(item["indexes"]),
  };
}

export function includedPathDeserializer(item: any): IncludedPath {
  return {
    path: item["path"],
    indexes: !item["indexes"] ? item["indexes"] : indexesArrayDeserializer(item["indexes"]),
  };
}

export function indexesArraySerializer(result: Array<Indexes>): any[] {
  return result.map((item) => {
    return indexesSerializer(item);
  });
}

export function indexesArrayDeserializer(result: Array<Indexes>): any[] {
  return result.map((item) => {
    return indexesDeserializer(item);
  });
}

/** The indexes for the path. */
export interface Indexes {
  /** The datatype for which the indexing behavior is applied to. */
  dataType?: DataType;
  /** The precision of the index. -1 is maximum precision. */
  precision?: number;
  /** Indicates the type of index. */
  kind?: IndexKind;
}

export function indexesSerializer(item: Indexes): any {
  return { dataType: item["dataType"], precision: item["precision"], kind: item["kind"] };
}

export function indexesDeserializer(item: any): Indexes {
  return {
    dataType: item["dataType"],
    precision: item["precision"],
    kind: item["kind"],
  };
}

/** The datatype for which the indexing behavior is applied to. */
export enum KnownDataType {
  /** String */
  String = "String",
  /** Number */
  Number = "Number",
  /** Point */
  Point = "Point",
  /** Polygon */
  Polygon = "Polygon",
  /** LineString */
  LineString = "LineString",
  /** MultiPolygon */
  MultiPolygon = "MultiPolygon",
}

/**
 * The datatype for which the indexing behavior is applied to. \
 * {@link KnownDataType} can be used interchangeably with DataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String** \
 * **Number** \
 * **Point** \
 * **Polygon** \
 * **LineString** \
 * **MultiPolygon**
 */
export type DataType = string;

/** Indicates the type of index. */
export enum KnownIndexKind {
  /** Hash */
  Hash = "Hash",
  /** Range */
  Range = "Range",
  /** Spatial */
  Spatial = "Spatial",
}

/**
 * Indicates the type of index. \
 * {@link KnownIndexKind} can be used interchangeably with IndexKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hash** \
 * **Range** \
 * **Spatial**
 */
export type IndexKind = string;

export function excludedPathArraySerializer(result: Array<ExcludedPath>): any[] {
  return result.map((item) => {
    return excludedPathSerializer(item);
  });
}

export function excludedPathArrayDeserializer(result: Array<ExcludedPath>): any[] {
  return result.map((item) => {
    return excludedPathDeserializer(item);
  });
}

/** model interface ExcludedPath */
export interface ExcludedPath {
  /** The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*) */
  path?: string;
}

export function excludedPathSerializer(item: ExcludedPath): any {
  return { path: item["path"] };
}

export function excludedPathDeserializer(item: any): ExcludedPath {
  return {
    path: item["path"],
  };
}

export function compositePathArrayArraySerializer(result: Array<Array<CompositePath>>): any[] {
  return result.map((item) => {
    return compositePathArraySerializer(item);
  });
}

export function compositePathArrayArrayDeserializer(result: Array<Array<CompositePath>>): any[] {
  return result.map((item) => {
    return compositePathArrayDeserializer(item);
  });
}

export function compositePathArraySerializer(result: Array<CompositePath>): any[] {
  return result.map((item) => {
    return compositePathSerializer(item);
  });
}

export function compositePathArrayDeserializer(result: Array<CompositePath>): any[] {
  return result.map((item) => {
    return compositePathDeserializer(item);
  });
}

/** model interface CompositePath */
export interface CompositePath {
  /** The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*) */
  path?: string;
  /** Sort order for composite paths. */
  order?: CompositePathSortOrder;
}

export function compositePathSerializer(item: CompositePath): any {
  return { path: item["path"], order: item["order"] };
}

export function compositePathDeserializer(item: any): CompositePath {
  return {
    path: item["path"],
    order: item["order"],
  };
}

/** Sort order for composite paths. */
export enum KnownCompositePathSortOrder {
  /** ascending */
  Ascending = "ascending",
  /** descending */
  Descending = "descending",
}

/**
 * Sort order for composite paths. \
 * {@link KnownCompositePathSortOrder} can be used interchangeably with CompositePathSortOrder,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ascending** \
 * **descending**
 */
export type CompositePathSortOrder = string;

export function spatialSpecArraySerializer(result: Array<SpatialSpec>): any[] {
  return result.map((item) => {
    return spatialSpecSerializer(item);
  });
}

export function spatialSpecArrayDeserializer(result: Array<SpatialSpec>): any[] {
  return result.map((item) => {
    return spatialSpecDeserializer(item);
  });
}

/** model interface SpatialSpec */
export interface SpatialSpec {
  /** The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*) */
  path?: string;
  /** List of path's spatial type */
  types?: SpatialType[];
}

export function spatialSpecSerializer(item: SpatialSpec): any {
  return {
    path: item["path"],
    types: !item["types"]
      ? item["types"]
      : item["types"].map((p: any) => {
          return p;
        }),
  };
}

export function spatialSpecDeserializer(item: any): SpatialSpec {
  return {
    path: item["path"],
    types: !item["types"]
      ? item["types"]
      : item["types"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates the spatial type of index. */
export enum KnownSpatialType {
  /** Point */
  Point = "Point",
  /** LineString */
  LineString = "LineString",
  /** Polygon */
  Polygon = "Polygon",
  /** MultiPolygon */
  MultiPolygon = "MultiPolygon",
}

/**
 * Indicates the spatial type of index. \
 * {@link KnownSpatialType} can be used interchangeably with SpatialType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Point** \
 * **LineString** \
 * **Polygon** \
 * **MultiPolygon**
 */
export type SpatialType = string;

export function vectorIndexArraySerializer(result: Array<VectorIndex>): any[] {
  return result.map((item) => {
    return vectorIndexSerializer(item);
  });
}

export function vectorIndexArrayDeserializer(result: Array<VectorIndex>): any[] {
  return result.map((item) => {
    return vectorIndexDeserializer(item);
  });
}

/** model interface VectorIndex */
export interface VectorIndex {
  /** The path to the vector field in the document. */
  path: string;
  /** The index type of the vector. Currently, flat, diskANN, and quantizedFlat are supported. */
  type: VectorIndexType;
  /** The number of bytes used in product quantization of the vectors. A larger value may result in better recall for vector searches at the expense of latency. This is only applicable for the quantizedFlat and diskANN vector index types. */
  quantizationByteSize?: number;
  /** This is the size of the candidate list of approximate neighbors stored while building the DiskANN index as part of the optimization processes. Large values may improve recall at the expense of latency. This is only applicable for the diskANN vector index type. */
  indexingSearchListSize?: number;
  /** Array of shard keys for the vector index. This is only applicable for the quantizedFlat and diskANN vector index types. */
  vectorIndexShardKey?: string[];
}

export function vectorIndexSerializer(item: VectorIndex): any {
  return {
    path: item["path"],
    type: item["type"],
    quantizationByteSize: item["quantizationByteSize"],
    indexingSearchListSize: item["indexingSearchListSize"],
    vectorIndexShardKey: !item["vectorIndexShardKey"]
      ? item["vectorIndexShardKey"]
      : item["vectorIndexShardKey"].map((p: any) => {
          return p;
        }),
  };
}

export function vectorIndexDeserializer(item: any): VectorIndex {
  return {
    path: item["path"],
    type: item["type"],
    quantizationByteSize: item["quantizationByteSize"],
    indexingSearchListSize: item["indexingSearchListSize"],
    vectorIndexShardKey: !item["vectorIndexShardKey"]
      ? item["vectorIndexShardKey"]
      : item["vectorIndexShardKey"].map((p: any) => {
          return p;
        }),
  };
}

/** The index type of the vector. Currently, flat, diskANN, and quantizedFlat are supported. */
export enum KnownVectorIndexType {
  /** flat */
  Flat = "flat",
  /** diskANN */
  DiskANN = "diskANN",
  /** quantizedFlat */
  QuantizedFlat = "quantizedFlat",
}

/**
 * The index type of the vector. Currently, flat, diskANN, and quantizedFlat are supported. \
 * {@link KnownVectorIndexType} can be used interchangeably with VectorIndexType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **flat** \
 * **diskANN** \
 * **quantizedFlat**
 */
export type VectorIndexType = string;

export function fullTextIndexPathArraySerializer(result: Array<FullTextIndexPath>): any[] {
  return result.map((item) => {
    return fullTextIndexPathSerializer(item);
  });
}

export function fullTextIndexPathArrayDeserializer(result: Array<FullTextIndexPath>): any[] {
  return result.map((item) => {
    return fullTextIndexPathDeserializer(item);
  });
}

/** Represents the full text index path. */
export interface FullTextIndexPath {
  /** The path to the full text field in the document. */
  path: string;
}

export function fullTextIndexPathSerializer(item: FullTextIndexPath): any {
  return { path: item["path"] };
}

export function fullTextIndexPathDeserializer(item: any): FullTextIndexPath {
  return {
    path: item["path"],
  };
}

/** The configuration of the partition key to be used for partitioning data into multiple partitions */
export interface ContainerPartitionKey {
  /** List of paths using which data within the container can be partitioned */
  paths?: string[];
  /** Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create */
  kind?: PartitionKind;
  /** Indicates the version of the partition key definition */
  version?: number;
  /** Indicates if the container is using a system generated partition key */
  readonly systemKey?: boolean;
}

export function containerPartitionKeySerializer(item: ContainerPartitionKey): any {
  return {
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
    kind: item["kind"],
    version: item["version"],
  };
}

export function containerPartitionKeyDeserializer(item: any): ContainerPartitionKey {
  return {
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
    kind: item["kind"],
    version: item["version"],
    systemKey: item["systemKey"],
  };
}

/** Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create */
export enum KnownPartitionKind {
  /** Hash */
  Hash = "Hash",
  /** Range */
  Range = "Range",
  /** MultiHash */
  MultiHash = "MultiHash",
}

/**
 * Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create \
 * {@link KnownPartitionKind} can be used interchangeably with PartitionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hash** \
 * **Range** \
 * **MultiHash**
 */
export type PartitionKind = string;

/** The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service. */
export interface UniqueKeyPolicy {
  /** List of unique keys on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service. */
  uniqueKeys?: UniqueKey[];
}

export function uniqueKeyPolicySerializer(item: UniqueKeyPolicy): any {
  return {
    uniqueKeys: !item["uniqueKeys"]
      ? item["uniqueKeys"]
      : uniqueKeyArraySerializer(item["uniqueKeys"]),
  };
}

export function uniqueKeyPolicyDeserializer(item: any): UniqueKeyPolicy {
  return {
    uniqueKeys: !item["uniqueKeys"]
      ? item["uniqueKeys"]
      : uniqueKeyArrayDeserializer(item["uniqueKeys"]),
  };
}

export function uniqueKeyArraySerializer(result: Array<UniqueKey>): any[] {
  return result.map((item) => {
    return uniqueKeySerializer(item);
  });
}

export function uniqueKeyArrayDeserializer(result: Array<UniqueKey>): any[] {
  return result.map((item) => {
    return uniqueKeyDeserializer(item);
  });
}

/** The unique key on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service. */
export interface UniqueKey {
  /** List of paths must be unique for each document in the Azure Cosmos DB service */
  paths?: string[];
}

export function uniqueKeySerializer(item: UniqueKey): any {
  return {
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
  };
}

export function uniqueKeyDeserializer(item: any): UniqueKey {
  return {
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
  };
}

/** The conflict resolution policy for the container. */
export interface ConflictResolutionPolicy {
  /** Indicates the conflict resolution mode. */
  mode?: ConflictResolutionMode;
  /** The conflict resolution path in the case of LastWriterWins mode. */
  conflictResolutionPath?: string;
  /** The procedure to resolve conflicts in the case of custom mode. */
  conflictResolutionProcedure?: string;
}

export function conflictResolutionPolicySerializer(item: ConflictResolutionPolicy): any {
  return {
    mode: item["mode"],
    conflictResolutionPath: item["conflictResolutionPath"],
    conflictResolutionProcedure: item["conflictResolutionProcedure"],
  };
}

export function conflictResolutionPolicyDeserializer(item: any): ConflictResolutionPolicy {
  return {
    mode: item["mode"],
    conflictResolutionPath: item["conflictResolutionPath"],
    conflictResolutionProcedure: item["conflictResolutionProcedure"],
  };
}

/** Indicates the conflict resolution mode. */
export enum KnownConflictResolutionMode {
  /** LastWriterWins */
  LastWriterWins = "LastWriterWins",
  /** Custom */
  Custom = "Custom",
}

/**
 * Indicates the conflict resolution mode. \
 * {@link KnownConflictResolutionMode} can be used interchangeably with ConflictResolutionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LastWriterWins** \
 * **Custom**
 */
export type ConflictResolutionMode = string;

/** Cosmos DB client encryption policy. */
export interface ClientEncryptionPolicy {
  /** Paths of the item that need encryption along with path-specific settings. */
  includedPaths: ClientEncryptionIncludedPath[];
  /** Version of the client encryption policy definition. Supported versions are 1 and 2. Version 2 supports id and partition key path encryption. */
  policyFormatVersion: number;
}

export function clientEncryptionPolicySerializer(item: ClientEncryptionPolicy): any {
  return {
    includedPaths: clientEncryptionIncludedPathArraySerializer(item["includedPaths"]),
    policyFormatVersion: item["policyFormatVersion"],
  };
}

export function clientEncryptionPolicyDeserializer(item: any): ClientEncryptionPolicy {
  return {
    includedPaths: clientEncryptionIncludedPathArrayDeserializer(item["includedPaths"]),
    policyFormatVersion: item["policyFormatVersion"],
  };
}

export function clientEncryptionIncludedPathArraySerializer(
  result: Array<ClientEncryptionIncludedPath>,
): any[] {
  return result.map((item) => {
    return clientEncryptionIncludedPathSerializer(item);
  });
}

export function clientEncryptionIncludedPathArrayDeserializer(
  result: Array<ClientEncryptionIncludedPath>,
): any[] {
  return result.map((item) => {
    return clientEncryptionIncludedPathDeserializer(item);
  });
}

/** . */
export interface ClientEncryptionIncludedPath {
  /** Path that needs to be encrypted. */
  path: string;
  /** The identifier of the Client Encryption Key to be used to encrypt the path. */
  clientEncryptionKeyId: string;
  /** The type of encryption to be performed. Eg - Deterministic, Randomized. */
  encryptionType: string;
  /** The encryption algorithm which will be used. Eg - AEAD_AES_256_CBC_HMAC_SHA256. */
  encryptionAlgorithm: string;
}

export function clientEncryptionIncludedPathSerializer(item: ClientEncryptionIncludedPath): any {
  return {
    path: item["path"],
    clientEncryptionKeyId: item["clientEncryptionKeyId"],
    encryptionType: item["encryptionType"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
  };
}

export function clientEncryptionIncludedPathDeserializer(item: any): ClientEncryptionIncludedPath {
  return {
    path: item["path"],
    clientEncryptionKeyId: item["clientEncryptionKeyId"],
    encryptionType: item["encryptionType"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
  };
}

export function computedPropertyArraySerializer(result: Array<ComputedProperty>): any[] {
  return result.map((item) => {
    return computedPropertySerializer(item);
  });
}

export function computedPropertyArrayDeserializer(result: Array<ComputedProperty>): any[] {
  return result.map((item) => {
    return computedPropertyDeserializer(item);
  });
}

/** The definition of a computed property */
export interface ComputedProperty {
  /** The name of a computed property, for example - "cp_lowerName" */
  name?: string;
  /** The query that evaluates the value for computed property, for example - "SELECT VALUE LOWER(c.name) FROM c" */
  query?: string;
}

export function computedPropertySerializer(item: ComputedProperty): any {
  return { name: item["name"], query: item["query"] };
}

export function computedPropertyDeserializer(item: any): ComputedProperty {
  return {
    name: item["name"],
    query: item["query"],
  };
}

/** Cosmos DB Vector Embedding Policy */
export interface VectorEmbeddingPolicy {
  /** List of vector embeddings */
  vectorEmbeddings?: VectorEmbedding[];
}

export function vectorEmbeddingPolicySerializer(item: VectorEmbeddingPolicy): any {
  return {
    vectorEmbeddings: !item["vectorEmbeddings"]
      ? item["vectorEmbeddings"]
      : vectorEmbeddingArraySerializer(item["vectorEmbeddings"]),
  };
}

export function vectorEmbeddingPolicyDeserializer(item: any): VectorEmbeddingPolicy {
  return {
    vectorEmbeddings: !item["vectorEmbeddings"]
      ? item["vectorEmbeddings"]
      : vectorEmbeddingArrayDeserializer(item["vectorEmbeddings"]),
  };
}

export function vectorEmbeddingArraySerializer(result: Array<VectorEmbedding>): any[] {
  return result.map((item) => {
    return vectorEmbeddingSerializer(item);
  });
}

export function vectorEmbeddingArrayDeserializer(result: Array<VectorEmbedding>): any[] {
  return result.map((item) => {
    return vectorEmbeddingDeserializer(item);
  });
}

/** Represents a vector embedding. A vector embedding is used to define a vector field in the documents. */
export interface VectorEmbedding {
  /** The path to the vector field in the document. */
  path: string;
  /** Indicates the data type of vector. */
  dataType: VectorDataType;
  /** The distance function to use for distance calculation in between vectors. */
  distanceFunction: DistanceFunction;
  /** The number of dimensions in the vector. */
  dimensions: number;
}

export function vectorEmbeddingSerializer(item: VectorEmbedding): any {
  return {
    path: item["path"],
    dataType: item["dataType"],
    distanceFunction: item["distanceFunction"],
    dimensions: item["dimensions"],
  };
}

export function vectorEmbeddingDeserializer(item: any): VectorEmbedding {
  return {
    path: item["path"],
    dataType: item["dataType"],
    distanceFunction: item["distanceFunction"],
    dimensions: item["dimensions"],
  };
}

/** Indicates the data type of vector. */
export enum KnownVectorDataType {
  /** float32 */
  Float32 = "float32",
  /** uint8 */
  Uint8 = "uint8",
  /** int8 */
  Int8 = "int8",
  /** float16 */
  Float16 = "float16",
}

/**
 * Indicates the data type of vector. \
 * {@link KnownVectorDataType} can be used interchangeably with VectorDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **float32** \
 * **uint8** \
 * **int8** \
 * **float16**
 */
export type VectorDataType = string;

/** The distance function to use for distance calculation in between vectors. */
export enum KnownDistanceFunction {
  /** euclidean */
  Euclidean = "euclidean",
  /** cosine */
  Cosine = "cosine",
  /** dotproduct */
  Dotproduct = "dotproduct",
}

/**
 * The distance function to use for distance calculation in between vectors. \
 * {@link KnownDistanceFunction} can be used interchangeably with DistanceFunction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **euclidean** \
 * **cosine** \
 * **dotproduct**
 */
export type DistanceFunction = string;

/** Cosmos DB FullText Policy */
export interface FullTextPolicy {
  /** The default language for a full text paths. */
  defaultLanguage?: string;
  /** List of FullText Paths */
  fullTextPaths?: FullTextPath[];
}

export function fullTextPolicySerializer(item: FullTextPolicy): any {
  return {
    defaultLanguage: item["defaultLanguage"],
    fullTextPaths: !item["fullTextPaths"]
      ? item["fullTextPaths"]
      : fullTextPathArraySerializer(item["fullTextPaths"]),
  };
}

export function fullTextPolicyDeserializer(item: any): FullTextPolicy {
  return {
    defaultLanguage: item["defaultLanguage"],
    fullTextPaths: !item["fullTextPaths"]
      ? item["fullTextPaths"]
      : fullTextPathArrayDeserializer(item["fullTextPaths"]),
  };
}

export function fullTextPathArraySerializer(result: Array<FullTextPath>): any[] {
  return result.map((item) => {
    return fullTextPathSerializer(item);
  });
}

export function fullTextPathArrayDeserializer(result: Array<FullTextPath>): any[] {
  return result.map((item) => {
    return fullTextPathDeserializer(item);
  });
}

/** Represents the full text path specification. */
export interface FullTextPath {
  /** The path to the full text field in the document. */
  path: string;
  /** The language of the full text field in the document. */
  language?: string;
}

export function fullTextPathSerializer(item: FullTextPath): any {
  return { path: item["path"], language: item["language"] };
}

export function fullTextPathDeserializer(item: any): FullTextPath {
  return {
    path: item["path"],
    language: item["language"],
  };
}

/** Parameters to create and update Cosmos DB container. */
export interface SqlContainerCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a container */
  resource: SqlContainerResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlContainerCreateUpdateParametersSerializer(
  item: SqlContainerCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _sqlContainerCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB container. */
export interface SqlContainerCreateUpdateProperties {
  /** The standard JSON format of a container */
  resource: SqlContainerResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlContainerCreateUpdatePropertiesSerializer(
  item: SqlContainerCreateUpdateProperties,
): any {
  return {
    resource: sqlContainerResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the containers and their properties. */
export interface _SqlContainerListResult {
  /** List of containers and their properties. */
  readonly value?: SqlContainerGetResults[];
  nextLink?: string;
}

export function _sqlContainerListResultDeserializer(item: any): _SqlContainerListResult {
  return {
    value: !item["value"] ? item["value"] : sqlContainerGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlContainerGetResultsArrayDeserializer(
  result: Array<SqlContainerGetResults>,
): any[] {
  return result.map((item) => {
    return sqlContainerGetResultsDeserializer(item);
  });
}

/** Properties of the regional restorable account. */
export interface ContinuousBackupRestoreLocation {
  /** The name of the continuous backup restore location. */
  location?: string;
}

export function continuousBackupRestoreLocationSerializer(
  item: ContinuousBackupRestoreLocation,
): any {
  return { location: item["location"] };
}

/** Backup information of a resource. */
export interface BackupInformation {
  /** Information about the status of continuous backups. */
  continuousBackupInformation?: ContinuousBackupInformation;
}

export function backupInformationDeserializer(item: any): BackupInformation {
  return {
    continuousBackupInformation: !item["continuousBackupInformation"]
      ? item["continuousBackupInformation"]
      : continuousBackupInformationDeserializer(item["continuousBackupInformation"]),
  };
}

/** Information about the status of continuous backups. */
export interface ContinuousBackupInformation {
  /** The latest restorable timestamp for a resource. */
  latestRestorableTimestamp?: string;
}

export function continuousBackupInformationDeserializer(item: any): ContinuousBackupInformation {
  return {
    latestRestorableTimestamp: item["latestRestorableTimestamp"],
  };
}

/** An Azure Cosmos DB storedProcedure. */
export interface SqlStoredProcedureGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: SqlStoredProcedureGetPropertiesResource;
}

export function sqlStoredProcedureGetResultsDeserializer(item: any): SqlStoredProcedureGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlStoredProcedureGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB StoredProcedure */
export interface SqlStoredProcedureGetProperties {
  resource?: SqlStoredProcedureGetPropertiesResource;
}

export function sqlStoredProcedureGetPropertiesDeserializer(
  item: any,
): SqlStoredProcedureGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlStoredProcedureGetPropertiesResourceDeserializer(item["resource"]),
  };
}

/** model interface SqlStoredProcedureGetPropertiesResource */
export interface SqlStoredProcedureGetPropertiesResource extends SqlStoredProcedureResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function sqlStoredProcedureGetPropertiesResourceDeserializer(
  item: any,
): SqlStoredProcedureGetPropertiesResource {
  return {
    id: item["id"],
    body: item["body"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** Cosmos DB SQL storedProcedure resource object */
export interface SqlStoredProcedureResource {
  /** Name of the Cosmos DB SQL storedProcedure */
  id: string;
  /** Body of the Stored Procedure */
  body?: string;
}

export function sqlStoredProcedureResourceSerializer(item: SqlStoredProcedureResource): any {
  return { id: item["id"], body: item["body"] };
}

export function sqlStoredProcedureResourceDeserializer(item: any): SqlStoredProcedureResource {
  return {
    id: item["id"],
    body: item["body"],
  };
}

/** Parameters to create and update Cosmos DB storedProcedure. */
export interface SqlStoredProcedureCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a storedProcedure */
  resource: SqlStoredProcedureResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlStoredProcedureCreateUpdateParametersSerializer(
  item: SqlStoredProcedureCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _sqlStoredProcedureCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB storedProcedure. */
export interface SqlStoredProcedureCreateUpdateProperties {
  /** The standard JSON format of a storedProcedure */
  resource: SqlStoredProcedureResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlStoredProcedureCreateUpdatePropertiesSerializer(
  item: SqlStoredProcedureCreateUpdateProperties,
): any {
  return {
    resource: sqlStoredProcedureResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the storedProcedures and their properties. */
export interface _SqlStoredProcedureListResult {
  /** List of storedProcedures and their properties. */
  readonly value?: SqlStoredProcedureGetResults[];
  nextLink?: string;
}

export function _sqlStoredProcedureListResultDeserializer(
  item: any,
): _SqlStoredProcedureListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlStoredProcedureGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlStoredProcedureGetResultsArrayDeserializer(
  result: Array<SqlStoredProcedureGetResults>,
): any[] {
  return result.map((item) => {
    return sqlStoredProcedureGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB userDefinedFunction. */
export interface SqlUserDefinedFunctionGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: SqlUserDefinedFunctionGetPropertiesResource;
}

export function sqlUserDefinedFunctionGetResultsDeserializer(
  item: any,
): SqlUserDefinedFunctionGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlUserDefinedFunctionGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB userDefinedFunction */
export interface SqlUserDefinedFunctionGetProperties {
  resource?: SqlUserDefinedFunctionGetPropertiesResource;
}

export function sqlUserDefinedFunctionGetPropertiesDeserializer(
  item: any,
): SqlUserDefinedFunctionGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlUserDefinedFunctionGetPropertiesResourceDeserializer(item["resource"]),
  };
}

/** model interface SqlUserDefinedFunctionGetPropertiesResource */
export interface SqlUserDefinedFunctionGetPropertiesResource extends SqlUserDefinedFunctionResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function sqlUserDefinedFunctionGetPropertiesResourceDeserializer(
  item: any,
): SqlUserDefinedFunctionGetPropertiesResource {
  return {
    id: item["id"],
    body: item["body"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** Cosmos DB SQL userDefinedFunction resource object */
export interface SqlUserDefinedFunctionResource {
  /** Name of the Cosmos DB SQL userDefinedFunction */
  id: string;
  /** Body of the User Defined Function */
  body?: string;
}

export function sqlUserDefinedFunctionResourceSerializer(
  item: SqlUserDefinedFunctionResource,
): any {
  return { id: item["id"], body: item["body"] };
}

export function sqlUserDefinedFunctionResourceDeserializer(
  item: any,
): SqlUserDefinedFunctionResource {
  return {
    id: item["id"],
    body: item["body"],
  };
}

/** Parameters to create and update Cosmos DB userDefinedFunction. */
export interface SqlUserDefinedFunctionCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a userDefinedFunction */
  resource: SqlUserDefinedFunctionResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlUserDefinedFunctionCreateUpdateParametersSerializer(
  item: SqlUserDefinedFunctionCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _sqlUserDefinedFunctionCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB userDefinedFunction. */
export interface SqlUserDefinedFunctionCreateUpdateProperties {
  /** The standard JSON format of a userDefinedFunction */
  resource: SqlUserDefinedFunctionResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlUserDefinedFunctionCreateUpdatePropertiesSerializer(
  item: SqlUserDefinedFunctionCreateUpdateProperties,
): any {
  return {
    resource: sqlUserDefinedFunctionResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the userDefinedFunctions and their properties. */
export interface _SqlUserDefinedFunctionListResult {
  /** List of userDefinedFunctions and their properties. */
  readonly value?: SqlUserDefinedFunctionGetResults[];
  nextLink?: string;
}

export function _sqlUserDefinedFunctionListResultDeserializer(
  item: any,
): _SqlUserDefinedFunctionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlUserDefinedFunctionGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlUserDefinedFunctionGetResultsArrayDeserializer(
  result: Array<SqlUserDefinedFunctionGetResults>,
): any[] {
  return result.map((item) => {
    return sqlUserDefinedFunctionGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB trigger. */
export interface SqlTriggerGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: SqlTriggerGetPropertiesResource;
}

export function sqlTriggerGetResultsDeserializer(item: any): SqlTriggerGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlTriggerGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB trigger */
export interface SqlTriggerGetProperties {
  resource?: SqlTriggerGetPropertiesResource;
}

export function sqlTriggerGetPropertiesDeserializer(item: any): SqlTriggerGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlTriggerGetPropertiesResourceDeserializer(item["resource"]),
  };
}

/** model interface SqlTriggerGetPropertiesResource */
export interface SqlTriggerGetPropertiesResource extends SqlTriggerResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function sqlTriggerGetPropertiesResourceDeserializer(
  item: any,
): SqlTriggerGetPropertiesResource {
  return {
    id: item["id"],
    body: item["body"],
    triggerType: item["triggerType"],
    triggerOperation: item["triggerOperation"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** Cosmos DB SQL trigger resource object */
export interface SqlTriggerResource {
  /** Name of the Cosmos DB SQL trigger */
  id: string;
  /** Body of the Trigger */
  body?: string;
  /** Type of the Trigger */
  triggerType?: TriggerType;
  /** The operation the trigger is associated with */
  triggerOperation?: TriggerOperation;
}

export function sqlTriggerResourceSerializer(item: SqlTriggerResource): any {
  return {
    id: item["id"],
    body: item["body"],
    triggerType: item["triggerType"],
    triggerOperation: item["triggerOperation"],
  };
}

export function sqlTriggerResourceDeserializer(item: any): SqlTriggerResource {
  return {
    id: item["id"],
    body: item["body"],
    triggerType: item["triggerType"],
    triggerOperation: item["triggerOperation"],
  };
}

/** Type of the Trigger */
export enum KnownTriggerType {
  /** Pre */
  Pre = "Pre",
  /** Post */
  Post = "Post",
}

/**
 * Type of the Trigger \
 * {@link KnownTriggerType} can be used interchangeably with TriggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pre** \
 * **Post**
 */
export type TriggerType = string;

/** The operation the trigger is associated with */
export enum KnownTriggerOperation {
  /** All */
  All = "All",
  /** Create */
  Create = "Create",
  /** Update */
  Update = "Update",
  /** Delete */
  Delete = "Delete",
  /** Replace */
  Replace = "Replace",
}

/**
 * The operation the trigger is associated with \
 * {@link KnownTriggerOperation} can be used interchangeably with TriggerOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **All** \
 * **Create** \
 * **Update** \
 * **Delete** \
 * **Replace**
 */
export type TriggerOperation = string;

/** Parameters to create and update Cosmos DB trigger. */
export interface SqlTriggerCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a trigger */
  resource: SqlTriggerResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlTriggerCreateUpdateParametersSerializer(
  item: SqlTriggerCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _sqlTriggerCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB trigger. */
export interface SqlTriggerCreateUpdateProperties {
  /** The standard JSON format of a trigger */
  resource: SqlTriggerResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function sqlTriggerCreateUpdatePropertiesSerializer(
  item: SqlTriggerCreateUpdateProperties,
): any {
  return {
    resource: sqlTriggerResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the triggers and their properties. */
export interface _SqlTriggerListResult {
  /** List of triggers and their properties. */
  readonly value?: SqlTriggerGetResults[];
  nextLink?: string;
}

export function _sqlTriggerListResultDeserializer(item: any): _SqlTriggerListResult {
  return {
    value: !item["value"] ? item["value"] : sqlTriggerGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlTriggerGetResultsArrayDeserializer(result: Array<SqlTriggerGetResults>): any[] {
  return result.map((item) => {
    return sqlTriggerGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB SQL Role Definition. */
export interface SqlRoleDefinitionGetResults extends ProxyResource {
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  typePropertiesType?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function sqlRoleDefinitionGetResultsDeserializer(item: any): SqlRoleDefinitionGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlRoleDefinitionGetResultsPropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB SQL Role Definition resource object. */
export interface SqlRoleDefinitionResource {
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function sqlRoleDefinitionResourceSerializer(item: SqlRoleDefinitionResource): any {
  return {
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function sqlRoleDefinitionResourceDeserializer(item: any): SqlRoleDefinitionResource {
  return {
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

/** Indicates whether the Role Definition was built-in or user created. */
export type RoleDefinitionType = "BuiltInRole" | "CustomRole";

export function permissionArraySerializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionSerializer(item);
  });
}

export function permissionArrayDeserializer(result: Array<Permission>): any[] {
  return result.map((item) => {
    return permissionDeserializer(item);
  });
}

/** The set of data plane operations permitted through this Role Definition. */
export interface Permission {
  /** The id for the permission. */
  id?: string;
  /** An array of data actions that are allowed. */
  dataActions?: string[];
  /** An array of data actions that are denied. */
  notDataActions?: string[];
}

export function permissionSerializer(item: Permission): any {
  return {
    id: item["id"],
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
  };
}

export function permissionDeserializer(item: any): Permission {
  return {
    id: item["id"],
    dataActions: !item["dataActions"]
      ? item["dataActions"]
      : item["dataActions"].map((p: any) => {
          return p;
        }),
    notDataActions: !item["notDataActions"]
      ? item["notDataActions"]
      : item["notDataActions"].map((p: any) => {
          return p;
        }),
  };
}

/** Parameters to create and update an Azure Cosmos DB SQL Role Definition. */
export interface SqlRoleDefinitionCreateUpdateParameters {
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function sqlRoleDefinitionCreateUpdateParametersSerializer(
  item: SqlRoleDefinitionCreateUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["roleName", "type", "assignableScopes", "permissions"])
      ? undefined
      : _sqlRoleDefinitionCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** The relevant Role Definitions. */
export interface _SqlRoleDefinitionListResult {
  /** List of Role Definitions and their properties. */
  readonly value?: SqlRoleDefinitionGetResults[];
  nextLink?: string;
}

export function _sqlRoleDefinitionListResultDeserializer(item: any): _SqlRoleDefinitionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlRoleDefinitionGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlRoleDefinitionGetResultsArrayDeserializer(
  result: Array<SqlRoleDefinitionGetResults>,
): any[] {
  return result.map((item) => {
    return sqlRoleDefinitionGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB Role Assignment */
export interface SqlRoleAssignmentGetResults extends ProxyResource {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
}

export function sqlRoleAssignmentGetResultsDeserializer(item: any): SqlRoleAssignmentGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sqlRoleAssignmentGetResultsPropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB SQL Role Assignment resource object. */
export interface SqlRoleAssignmentResource {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
}

export function sqlRoleAssignmentResourceSerializer(item: SqlRoleAssignmentResource): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function sqlRoleAssignmentResourceDeserializer(item: any): SqlRoleAssignmentResource {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

/** Parameters to create and update an Azure Cosmos DB SQL Role Assignment. */
export interface SqlRoleAssignmentCreateUpdateParameters {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
}

export function sqlRoleAssignmentCreateUpdateParametersSerializer(
  item: SqlRoleAssignmentCreateUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["roleDefinitionId", "scope", "principalId"])
      ? undefined
      : _sqlRoleAssignmentCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** The relevant Role Assignments. */
export interface _SqlRoleAssignmentListResult {
  /** List of Role Assignments and their properties */
  readonly value?: SqlRoleAssignmentGetResults[];
  nextLink?: string;
}

export function _sqlRoleAssignmentListResultDeserializer(item: any): _SqlRoleAssignmentListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : sqlRoleAssignmentGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlRoleAssignmentGetResultsArrayDeserializer(
  result: Array<SqlRoleAssignmentGetResults>,
): any[] {
  return result.map((item) => {
    return sqlRoleAssignmentGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB MongoDB database. */
export interface MongoDBDatabaseGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: MongoDBDatabaseGetPropertiesResource;
  options?: MongoDBDatabaseGetPropertiesOptions;
}

export function mongoDBDatabaseGetResultsDeserializer(item: any): MongoDBDatabaseGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mongoDBDatabaseGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB MongoDB database */
export interface MongoDBDatabaseGetProperties {
  resource?: MongoDBDatabaseGetPropertiesResource;
  options?: MongoDBDatabaseGetPropertiesOptions;
}

export function mongoDBDatabaseGetPropertiesDeserializer(item: any): MongoDBDatabaseGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : mongoDBDatabaseGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : mongoDBDatabaseGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface MongoDBDatabaseGetPropertiesResource */
export interface MongoDBDatabaseGetPropertiesResource extends MongoDBDatabaseResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function mongoDBDatabaseGetPropertiesResourceDeserializer(
  item: any,
): MongoDBDatabaseGetPropertiesResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface MongoDBDatabaseGetPropertiesOptions */
export interface MongoDBDatabaseGetPropertiesOptions extends OptionsResource {}

export function mongoDBDatabaseGetPropertiesOptionsDeserializer(
  item: any,
): MongoDBDatabaseGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB MongoDB database resource object */
export interface MongoDBDatabaseResource {
  /** Name of the Cosmos DB MongoDB database */
  id: string;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
}

export function mongoDBDatabaseResourceSerializer(item: MongoDBDatabaseResource): any {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function mongoDBDatabaseResourceDeserializer(item: any): MongoDBDatabaseResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

/** Parameters to create and update Cosmos DB MongoDB database. */
export interface MongoDBDatabaseCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a MongoDB database */
  resource: MongoDBDatabaseResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function mongoDBDatabaseCreateUpdateParametersSerializer(
  item: MongoDBDatabaseCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _mongoDBDatabaseCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB MongoDB database. */
export interface MongoDBDatabaseCreateUpdateProperties {
  /** The standard JSON format of a MongoDB database */
  resource: MongoDBDatabaseResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function mongoDBDatabaseCreateUpdatePropertiesSerializer(
  item: MongoDBDatabaseCreateUpdateProperties,
): any {
  return {
    resource: mongoDBDatabaseResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the MongoDB databases and their properties. */
export interface _MongoDBDatabaseListResult {
  /** List of MongoDB databases and their properties. */
  readonly value?: MongoDBDatabaseGetResults[];
  nextLink?: string;
}

export function _mongoDBDatabaseListResultDeserializer(item: any): _MongoDBDatabaseListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : mongoDBDatabaseGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoDBDatabaseGetResultsArrayDeserializer(
  result: Array<MongoDBDatabaseGetResults>,
): any[] {
  return result.map((item) => {
    return mongoDBDatabaseGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB MongoDB collection. */
export interface MongoDBCollectionGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: MongoDBCollectionGetPropertiesResource;
  options?: MongoDBCollectionGetPropertiesOptions;
}

export function mongoDBCollectionGetResultsDeserializer(item: any): MongoDBCollectionGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mongoDBCollectionGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB MongoDB collection */
export interface MongoDBCollectionGetProperties {
  resource?: MongoDBCollectionGetPropertiesResource;
  options?: MongoDBCollectionGetPropertiesOptions;
}

export function mongoDBCollectionGetPropertiesDeserializer(
  item: any,
): MongoDBCollectionGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : mongoDBCollectionGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : mongoDBCollectionGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface MongoDBCollectionGetPropertiesResource */
export interface MongoDBCollectionGetPropertiesResource extends MongoDBCollectionResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function mongoDBCollectionGetPropertiesResourceDeserializer(
  item: any,
): MongoDBCollectionGetPropertiesResource {
  return {
    id: item["id"],
    shardKey: !item["shardKey"]
      ? item["shardKey"]
      : Object.fromEntries(Object.entries(item["shardKey"]).map(([k, p]: [string, any]) => [k, p])),
    indexes: !item["indexes"] ? item["indexes"] : mongoIndexArrayDeserializer(item["indexes"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface MongoDBCollectionGetPropertiesOptions */
export interface MongoDBCollectionGetPropertiesOptions extends OptionsResource {}

export function mongoDBCollectionGetPropertiesOptionsDeserializer(
  item: any,
): MongoDBCollectionGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB MongoDB collection resource object */
export interface MongoDBCollectionResource {
  /** Name of the Cosmos DB MongoDB collection */
  id: string;
  /** A key-value pair of shard keys to be applied for the request. */
  shardKey?: Record<string, string>;
  /** List of index keys */
  indexes?: MongoIndex[];
  /** Analytical TTL. */
  analyticalStorageTtl?: number;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of resource creation. */
  createMode?: CreateMode;
}

export function mongoDBCollectionResourceSerializer(item: MongoDBCollectionResource): any {
  return {
    id: item["id"],
    shardKey: item["shardKey"],
    indexes: !item["indexes"] ? item["indexes"] : mongoIndexArraySerializer(item["indexes"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function mongoDBCollectionResourceDeserializer(item: any): MongoDBCollectionResource {
  return {
    id: item["id"],
    shardKey: !item["shardKey"]
      ? item["shardKey"]
      : Object.fromEntries(Object.entries(item["shardKey"]).map(([k, p]: [string, any]) => [k, p])),
    indexes: !item["indexes"] ? item["indexes"] : mongoIndexArrayDeserializer(item["indexes"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function mongoIndexArraySerializer(result: Array<MongoIndex>): any[] {
  return result.map((item) => {
    return mongoIndexSerializer(item);
  });
}

export function mongoIndexArrayDeserializer(result: Array<MongoIndex>): any[] {
  return result.map((item) => {
    return mongoIndexDeserializer(item);
  });
}

/** Cosmos DB MongoDB collection index key */
export interface MongoIndex {
  /** Cosmos DB MongoDB collection index key options */
  options?: MongoIndexOptions;
  /** List of keys for each MongoDB collection in the Azure Cosmos DB service */
  keys?: string[];
}

export function mongoIndexSerializer(item: MongoIndex): any {
  return {
    key: areAllPropsUndefined(item, ["keys"]) ? undefined : _mongoIndexKeySerializer(item),
    options: !item["options"] ? item["options"] : mongoIndexOptionsSerializer(item["options"]),
  };
}

export function mongoIndexDeserializer(item: any): MongoIndex {
  return {
    ...(!item["key"] ? item["key"] : _mongoIndexKeyDeserializer(item["key"])),
    options: !item["options"] ? item["options"] : mongoIndexOptionsDeserializer(item["options"]),
  };
}

/** Cosmos DB MongoDB collection resource object */
export interface MongoIndexKeys {
  /** List of keys for each MongoDB collection in the Azure Cosmos DB service */
  keys?: string[];
}

export function mongoIndexKeysSerializer(item: MongoIndexKeys): any {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function mongoIndexKeysDeserializer(item: any): MongoIndexKeys {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

/** Cosmos DB MongoDB collection index options */
export interface MongoIndexOptions {
  /** Expire after seconds */
  expireAfterSeconds?: number;
  /** Is unique or not */
  unique?: boolean;
}

export function mongoIndexOptionsSerializer(item: MongoIndexOptions): any {
  return { expireAfterSeconds: item["expireAfterSeconds"], unique: item["unique"] };
}

export function mongoIndexOptionsDeserializer(item: any): MongoIndexOptions {
  return {
    expireAfterSeconds: item["expireAfterSeconds"],
    unique: item["unique"],
  };
}

/** Parameters to create and update Cosmos DB MongoDB collection. */
export interface MongoDBCollectionCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a MongoDB collection */
  resource: MongoDBCollectionResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function mongoDBCollectionCreateUpdateParametersSerializer(
  item: MongoDBCollectionCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _mongoDBCollectionCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB MongoDB collection. */
export interface MongoDBCollectionCreateUpdateProperties {
  /** The standard JSON format of a MongoDB collection */
  resource: MongoDBCollectionResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function mongoDBCollectionCreateUpdatePropertiesSerializer(
  item: MongoDBCollectionCreateUpdateProperties,
): any {
  return {
    resource: mongoDBCollectionResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the MongoDB collections and their properties. */
export interface _MongoDBCollectionListResult {
  /** List of MongoDB collections and their properties. */
  readonly value?: MongoDBCollectionGetResults[];
  nextLink?: string;
}

export function _mongoDBCollectionListResultDeserializer(item: any): _MongoDBCollectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : mongoDBCollectionGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoDBCollectionGetResultsArrayDeserializer(
  result: Array<MongoDBCollectionGetResults>,
): any[] {
  return result.map((item) => {
    return mongoDBCollectionGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB Mongo Role Definition. */
export interface MongoRoleDefinitionGetResults extends ProxyResource {
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  typePropertiesType?: MongoRoleDefinitionType;
  /** The database name for which access is being granted for this Role Definition. */
  databaseName?: string;
  /** A set of privileges contained by the Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Scopes higher than Database are not enforceable as privilege. */
  privileges?: Privilege[];
  /** The set of roles inherited by this Role Definition. */
  roles?: Role[];
}

export function mongoRoleDefinitionGetResultsDeserializer(
  item: any,
): MongoRoleDefinitionGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mongoRoleDefinitionGetResultsPropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Mongo Role Definition resource object. */
export interface MongoRoleDefinitionResource {
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: MongoRoleDefinitionType;
  /** The database name for which access is being granted for this Role Definition. */
  databaseName?: string;
  /** A set of privileges contained by the Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Scopes higher than Database are not enforceable as privilege. */
  privileges?: Privilege[];
  /** The set of roles inherited by this Role Definition. */
  roles?: Role[];
}

export function mongoRoleDefinitionResourceSerializer(item: MongoRoleDefinitionResource): any {
  return {
    roleName: item["roleName"],
    type: item["type"],
    databaseName: item["databaseName"],
    privileges: !item["privileges"]
      ? item["privileges"]
      : privilegeArraySerializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]),
  };
}

export function mongoRoleDefinitionResourceDeserializer(item: any): MongoRoleDefinitionResource {
  return {
    roleName: item["roleName"],
    type: item["type"],
    databaseName: item["databaseName"],
    privileges: !item["privileges"]
      ? item["privileges"]
      : privilegeArrayDeserializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
  };
}

/** Indicates whether the Role Definition was built-in or user created. */
export type MongoRoleDefinitionType = "BuiltInRole" | "CustomRole";

export function privilegeArraySerializer(result: Array<Privilege>): any[] {
  return result.map((item) => {
    return privilegeSerializer(item);
  });
}

export function privilegeArrayDeserializer(result: Array<Privilege>): any[] {
  return result.map((item) => {
    return privilegeDeserializer(item);
  });
}

/** The set of data plane operations permitted through this Role Definition. */
export interface Privilege {
  /** An Azure Cosmos DB Mongo DB Resource. */
  resource?: PrivilegeResource;
  /** An array of actions that are allowed. */
  actions?: string[];
}

export function privilegeSerializer(item: Privilege): any {
  return {
    resource: !item["resource"] ? item["resource"] : privilegeResourceSerializer(item["resource"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

export function privilegeDeserializer(item: any): Privilege {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : privilegeResourceDeserializer(item["resource"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** An Azure Cosmos DB Mongo DB Resource. */
export interface PrivilegeResource {
  /** The database name the role is applied. */
  db?: string;
  /** The collection name the role is applied. */
  collection?: string;
}

export function privilegeResourceSerializer(item: PrivilegeResource): any {
  return { db: item["db"], collection: item["collection"] };
}

export function privilegeResourceDeserializer(item: any): PrivilegeResource {
  return {
    db: item["db"],
    collection: item["collection"],
  };
}

export function roleArraySerializer(result: Array<Role>): any[] {
  return result.map((item) => {
    return roleSerializer(item);
  });
}

export function roleArrayDeserializer(result: Array<Role>): any[] {
  return result.map((item) => {
    return roleDeserializer(item);
  });
}

/** The set of roles permitted through this Role Definition. */
export interface Role {
  /** The database name the role is applied. */
  db?: string;
  /** The role name. */
  role?: string;
}

export function roleSerializer(item: Role): any {
  return { db: item["db"], role: item["role"] };
}

export function roleDeserializer(item: any): Role {
  return {
    db: item["db"],
    role: item["role"],
  };
}

/** Parameters to create and update an Azure Cosmos DB Mongo Role Definition. */
export interface MongoRoleDefinitionCreateUpdateParameters {
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: MongoRoleDefinitionType;
  /** The database name for which access is being granted for this Role Definition. */
  databaseName?: string;
  /** A set of privileges contained by the Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Scopes higher than Database are not enforceable as privilege. */
  privileges?: Privilege[];
  /** The set of roles inherited by this Role Definition. */
  roles?: Role[];
}

export function mongoRoleDefinitionCreateUpdateParametersSerializer(
  item: MongoRoleDefinitionCreateUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "roleName",
      "type",
      "databaseName",
      "privileges",
      "roles",
    ])
      ? undefined
      : _mongoRoleDefinitionCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** The relevant Mongo Role Definitions. */
export interface _MongoRoleDefinitionListResult {
  /** List of Mongo Role Definitions and their properties. */
  readonly value?: MongoRoleDefinitionGetResults[];
  nextLink?: string;
}

export function _mongoRoleDefinitionListResultDeserializer(
  item: any,
): _MongoRoleDefinitionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : mongoRoleDefinitionGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoRoleDefinitionGetResultsArrayDeserializer(
  result: Array<MongoRoleDefinitionGetResults>,
): any[] {
  return result.map((item) => {
    return mongoRoleDefinitionGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB User Definition */
export interface MongoUserDefinitionGetResults extends ProxyResource {
  /** The user name for User Definition. */
  userName?: string;
  /** The password for User Definition. Response does not contain user password. */
  password?: string;
  /** The database name for which access is being granted for this User Definition. */
  databaseName?: string;
  /** A custom definition for the USer Definition. */
  customData?: string;
  /** The set of roles inherited by the User Definition. */
  roles?: Role[];
  /** The Mongo Auth mechanism. For now, we only support auth mechanism SCRAM-SHA-256. */
  mechanisms?: string;
}

export function mongoUserDefinitionGetResultsDeserializer(
  item: any,
): MongoUserDefinitionGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mongoUserDefinitionGetResultsPropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Mongo User Definition resource object. */
export interface MongoUserDefinitionResource {
  /** The user name for User Definition. */
  userName?: string;
  /** The password for User Definition. Response does not contain user password. */
  password?: string;
  /** The database name for which access is being granted for this User Definition. */
  databaseName?: string;
  /** A custom definition for the USer Definition. */
  customData?: string;
  /** The set of roles inherited by the User Definition. */
  roles?: Role[];
  /** The Mongo Auth mechanism. For now, we only support auth mechanism SCRAM-SHA-256. */
  mechanisms?: string;
}

export function mongoUserDefinitionResourceSerializer(item: MongoUserDefinitionResource): any {
  return {
    userName: item["userName"],
    password: item["password"],
    databaseName: item["databaseName"],
    customData: item["customData"],
    roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]),
    mechanisms: item["mechanisms"],
  };
}

export function mongoUserDefinitionResourceDeserializer(item: any): MongoUserDefinitionResource {
  return {
    userName: item["userName"],
    password: item["password"],
    databaseName: item["databaseName"],
    customData: item["customData"],
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
    mechanisms: item["mechanisms"],
  };
}

/** Parameters to create and update an Azure Cosmos DB Mongo User Definition. */
export interface MongoUserDefinitionCreateUpdateParameters {
  /** The user name for User Definition. */
  userName?: string;
  /** The password for User Definition. Response does not contain user password. */
  password?: string;
  /** The database name for which access is being granted for this User Definition. */
  databaseName?: string;
  /** A custom definition for the USer Definition. */
  customData?: string;
  /** The set of roles inherited by the User Definition. */
  roles?: Role[];
  /** The Mongo Auth mechanism. For now, we only support auth mechanism SCRAM-SHA-256. */
  mechanisms?: string;
}

export function mongoUserDefinitionCreateUpdateParametersSerializer(
  item: MongoUserDefinitionCreateUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "userName",
      "password",
      "databaseName",
      "customData",
      "roles",
      "mechanisms",
    ])
      ? undefined
      : _mongoUserDefinitionCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** The relevant User Definition. */
export interface _MongoUserDefinitionListResult {
  /** List of User Definition and their properties */
  readonly value?: MongoUserDefinitionGetResults[];
  nextLink?: string;
}

export function _mongoUserDefinitionListResultDeserializer(
  item: any,
): _MongoUserDefinitionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : mongoUserDefinitionGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoUserDefinitionGetResultsArrayDeserializer(
  result: Array<MongoUserDefinitionGetResults>,
): any[] {
  return result.map((item) => {
    return mongoUserDefinitionGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB Table. */
export interface TableGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: TableGetPropertiesResource;
  options?: TableGetPropertiesOptions;
}

export function tableGetResultsDeserializer(item: any): TableGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tableGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos Table */
export interface TableGetProperties {
  resource?: TableGetPropertiesResource;
  options?: TableGetPropertiesOptions;
}

export function tableGetPropertiesDeserializer(item: any): TableGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : tableGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : tableGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface TableGetPropertiesResource */
export interface TableGetPropertiesResource extends TableResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function tableGetPropertiesResourceDeserializer(item: any): TableGetPropertiesResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface TableGetPropertiesOptions */
export interface TableGetPropertiesOptions extends OptionsResource {}

export function tableGetPropertiesOptionsDeserializer(item: any): TableGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB table resource object */
export interface TableResource {
  /** Name of the Cosmos DB table */
  id: string;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of account creation. */
  createMode?: CreateMode;
}

export function tableResourceSerializer(item: TableResource): any {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function tableResourceDeserializer(item: any): TableResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

/** Parameters to create and update Cosmos DB Table. */
export interface TableCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a Table */
  resource: TableResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function tableCreateUpdateParametersSerializer(item: TableCreateUpdateParameters): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _tableCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB Table. */
export interface TableCreateUpdateProperties {
  /** The standard JSON format of a Table */
  resource: TableResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function tableCreateUpdatePropertiesSerializer(item: TableCreateUpdateProperties): any {
  return {
    resource: tableResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the Table and their properties. */
export interface _TableListResult {
  /** List of Table and their properties. */
  readonly value?: TableGetResults[];
  nextLink?: string;
}

export function _tableListResultDeserializer(item: any): _TableListResult {
  return {
    value: !item["value"] ? item["value"] : tableGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tableGetResultsArrayDeserializer(result: Array<TableGetResults>): any[] {
  return result.map((item) => {
    return tableGetResultsDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB Table Role Definition. */
export interface TableRoleDefinitionResource extends ProxyResource {
  /** The path id for the Role Definition. */
  idPropertiesId?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  typePropertiesType?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Table Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function tableRoleDefinitionResourceSerializer(item: TableRoleDefinitionResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "id",
      "roleName",
      "type",
      "assignableScopes",
      "permissions",
    ])
      ? undefined
      : _tableRoleDefinitionResourcePropertiesSerializer(item),
  };
}

export function tableRoleDefinitionResourceDeserializer(item: any): TableRoleDefinitionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tableRoleDefinitionResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Table Role Definition resource object. */
export interface TableRoleDefinitionResourceProperties {
  /** The path id for the Role Definition. */
  id?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Table Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function tableRoleDefinitionResourcePropertiesSerializer(
  item: TableRoleDefinitionResourceProperties,
): any {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function tableRoleDefinitionResourcePropertiesDeserializer(
  item: any,
): TableRoleDefinitionResourceProperties {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

/** The response of a TableRoleDefinitionResource list operation. */
export interface _TableRoleDefinitionListResult {
  /** The TableRoleDefinitionResource items on this page */
  value: TableRoleDefinitionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tableRoleDefinitionListResultDeserializer(
  item: any,
): _TableRoleDefinitionListResult {
  return {
    value: tableRoleDefinitionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tableRoleDefinitionResourceArraySerializer(
  result: Array<TableRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return tableRoleDefinitionResourceSerializer(item);
  });
}

export function tableRoleDefinitionResourceArrayDeserializer(
  result: Array<TableRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return tableRoleDefinitionResourceDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB Table Role Assignment. */
export interface TableRoleAssignmentResource extends ProxyResource {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Table Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Table Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function tableRoleAssignmentResourceSerializer(item: TableRoleAssignmentResource): any {
  return {
    properties: areAllPropsUndefined(item, ["roleDefinitionId", "scope", "principalId"])
      ? undefined
      : _tableRoleAssignmentResourcePropertiesSerializer(item),
  };
}

export function tableRoleAssignmentResourceDeserializer(item: any): TableRoleAssignmentResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tableRoleAssignmentResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Table Role Assignment resource object. */
export interface TableRoleAssignmentResourceProperties {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Table Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Table Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function tableRoleAssignmentResourcePropertiesSerializer(
  item: TableRoleAssignmentResourceProperties,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function tableRoleAssignmentResourcePropertiesDeserializer(
  item: any,
): TableRoleAssignmentResourceProperties {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a TableRoleAssignmentResource list operation. */
export interface _TableRoleAssignmentListResult {
  /** The TableRoleAssignmentResource items on this page */
  value: TableRoleAssignmentResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tableRoleAssignmentListResultDeserializer(
  item: any,
): _TableRoleAssignmentListResult {
  return {
    value: tableRoleAssignmentResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tableRoleAssignmentResourceArraySerializer(
  result: Array<TableRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return tableRoleAssignmentResourceSerializer(item);
  });
}

export function tableRoleAssignmentResourceArrayDeserializer(
  result: Array<TableRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return tableRoleAssignmentResourceDeserializer(item);
  });
}

/** An Azure Cosmos DB Cassandra keyspace. */
export interface CassandraKeyspaceGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: CassandraKeyspaceGetPropertiesResource;
  options?: CassandraKeyspaceGetPropertiesOptions;
}

export function cassandraKeyspaceGetResultsDeserializer(item: any): CassandraKeyspaceGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cassandraKeyspaceGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB Cassandra keyspace */
export interface CassandraKeyspaceGetProperties {
  resource?: CassandraKeyspaceGetPropertiesResource;
  options?: CassandraKeyspaceGetPropertiesOptions;
}

export function cassandraKeyspaceGetPropertiesDeserializer(
  item: any,
): CassandraKeyspaceGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : cassandraKeyspaceGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : cassandraKeyspaceGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface CassandraKeyspaceGetPropertiesResource */
export interface CassandraKeyspaceGetPropertiesResource extends CassandraKeyspaceResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function cassandraKeyspaceGetPropertiesResourceDeserializer(
  item: any,
): CassandraKeyspaceGetPropertiesResource {
  return {
    id: item["id"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface CassandraKeyspaceGetPropertiesOptions */
export interface CassandraKeyspaceGetPropertiesOptions extends OptionsResource {}

export function cassandraKeyspaceGetPropertiesOptionsDeserializer(
  item: any,
): CassandraKeyspaceGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB Cassandra keyspace resource object */
export interface CassandraKeyspaceResource {
  /** Name of the Cosmos DB Cassandra keyspace */
  id: string;
}

export function cassandraKeyspaceResourceSerializer(item: CassandraKeyspaceResource): any {
  return { id: item["id"] };
}

export function cassandraKeyspaceResourceDeserializer(item: any): CassandraKeyspaceResource {
  return {
    id: item["id"],
  };
}

/** Parameters to create and update Cosmos DB Cassandra keyspace. */
export interface CassandraKeyspaceCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a Cassandra keyspace */
  resource: CassandraKeyspaceResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function cassandraKeyspaceCreateUpdateParametersSerializer(
  item: CassandraKeyspaceCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _cassandraKeyspaceCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB Cassandra keyspace. */
export interface CassandraKeyspaceCreateUpdateProperties {
  /** The standard JSON format of a Cassandra keyspace */
  resource: CassandraKeyspaceResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function cassandraKeyspaceCreateUpdatePropertiesSerializer(
  item: CassandraKeyspaceCreateUpdateProperties,
): any {
  return {
    resource: cassandraKeyspaceResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the Cassandra keyspaces and their properties. */
export interface _CassandraKeyspaceListResult {
  /** List of Cassandra keyspaces and their properties. */
  readonly value?: CassandraKeyspaceGetResults[];
  nextLink?: string;
}

export function _cassandraKeyspaceListResultDeserializer(item: any): _CassandraKeyspaceListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : cassandraKeyspaceGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cassandraKeyspaceGetResultsArrayDeserializer(
  result: Array<CassandraKeyspaceGetResults>,
): any[] {
  return result.map((item) => {
    return cassandraKeyspaceGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB Cassandra table. */
export interface CassandraTableGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: CassandraTableGetPropertiesResource;
  options?: CassandraTableGetPropertiesOptions;
}

export function cassandraTableGetResultsDeserializer(item: any): CassandraTableGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cassandraTableGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB Cassandra table */
export interface CassandraTableGetProperties {
  resource?: CassandraTableGetPropertiesResource;
  options?: CassandraTableGetPropertiesOptions;
}

export function cassandraTableGetPropertiesDeserializer(item: any): CassandraTableGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : cassandraTableGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : cassandraTableGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface CassandraTableGetPropertiesResource */
export interface CassandraTableGetPropertiesResource extends CassandraTableResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function cassandraTableGetPropertiesResourceDeserializer(
  item: any,
): CassandraTableGetPropertiesResource {
  return {
    id: item["id"],
    defaultTtl: item["defaultTtl"],
    schema: !item["schema"] ? item["schema"] : cassandraSchemaDeserializer(item["schema"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface CassandraTableGetPropertiesOptions */
export interface CassandraTableGetPropertiesOptions extends OptionsResource {}

export function cassandraTableGetPropertiesOptionsDeserializer(
  item: any,
): CassandraTableGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB Cassandra table resource object */
export interface CassandraTableResource {
  /** Name of the Cosmos DB Cassandra table */
  id: string;
  /** Time to live of the Cosmos DB Cassandra table */
  defaultTtl?: number;
  /** Schema of the Cosmos DB Cassandra table */
  schema?: CassandraSchema;
  /** Analytical TTL. */
  analyticalStorageTtl?: number;
}

export function cassandraTableResourceSerializer(item: CassandraTableResource): any {
  return {
    id: item["id"],
    defaultTtl: item["defaultTtl"],
    schema: !item["schema"] ? item["schema"] : cassandraSchemaSerializer(item["schema"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
  };
}

export function cassandraTableResourceDeserializer(item: any): CassandraTableResource {
  return {
    id: item["id"],
    defaultTtl: item["defaultTtl"],
    schema: !item["schema"] ? item["schema"] : cassandraSchemaDeserializer(item["schema"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
  };
}

/** Cosmos DB Cassandra table schema */
export interface CassandraSchema {
  /** List of Cassandra table columns. */
  columns?: Column[];
  /** List of partition key. */
  partitionKeys?: CassandraPartitionKey[];
  /** List of cluster key. */
  clusterKeys?: ClusterKey[];
}

export function cassandraSchemaSerializer(item: CassandraSchema): any {
  return {
    columns: !item["columns"] ? item["columns"] : columnArraySerializer(item["columns"]),
    partitionKeys: !item["partitionKeys"]
      ? item["partitionKeys"]
      : cassandraPartitionKeyArraySerializer(item["partitionKeys"]),
    clusterKeys: !item["clusterKeys"]
      ? item["clusterKeys"]
      : clusterKeyArraySerializer(item["clusterKeys"]),
  };
}

export function cassandraSchemaDeserializer(item: any): CassandraSchema {
  return {
    columns: !item["columns"] ? item["columns"] : columnArrayDeserializer(item["columns"]),
    partitionKeys: !item["partitionKeys"]
      ? item["partitionKeys"]
      : cassandraPartitionKeyArrayDeserializer(item["partitionKeys"]),
    clusterKeys: !item["clusterKeys"]
      ? item["clusterKeys"]
      : clusterKeyArrayDeserializer(item["clusterKeys"]),
  };
}

export function columnArraySerializer(result: Array<Column>): any[] {
  return result.map((item) => {
    return columnSerializer(item);
  });
}

export function columnArrayDeserializer(result: Array<Column>): any[] {
  return result.map((item) => {
    return columnDeserializer(item);
  });
}

/** Cosmos DB Cassandra table column */
export interface Column {
  /** Name of the Cosmos DB Cassandra table column */
  name?: string;
  /** Type of the Cosmos DB Cassandra table column */
  type?: string;
}

export function columnSerializer(item: Column): any {
  return { name: item["name"], type: item["type"] };
}

export function columnDeserializer(item: any): Column {
  return {
    name: item["name"],
    type: item["type"],
  };
}

export function cassandraPartitionKeyArraySerializer(result: Array<CassandraPartitionKey>): any[] {
  return result.map((item) => {
    return cassandraPartitionKeySerializer(item);
  });
}

export function cassandraPartitionKeyArrayDeserializer(
  result: Array<CassandraPartitionKey>,
): any[] {
  return result.map((item) => {
    return cassandraPartitionKeyDeserializer(item);
  });
}

/** Cosmos DB Cassandra table partition key */
export interface CassandraPartitionKey {
  /** Name of the Cosmos DB Cassandra table partition key */
  name?: string;
}

export function cassandraPartitionKeySerializer(item: CassandraPartitionKey): any {
  return { name: item["name"] };
}

export function cassandraPartitionKeyDeserializer(item: any): CassandraPartitionKey {
  return {
    name: item["name"],
  };
}

export function clusterKeyArraySerializer(result: Array<ClusterKey>): any[] {
  return result.map((item) => {
    return clusterKeySerializer(item);
  });
}

export function clusterKeyArrayDeserializer(result: Array<ClusterKey>): any[] {
  return result.map((item) => {
    return clusterKeyDeserializer(item);
  });
}

/** Cosmos DB Cassandra table cluster key */
export interface ClusterKey {
  /** Name of the Cosmos DB Cassandra table cluster key */
  name?: string;
  /** Order of the Cosmos DB Cassandra table cluster key, only support "Asc" and "Desc" */
  orderBy?: string;
}

export function clusterKeySerializer(item: ClusterKey): any {
  return { name: item["name"], orderBy: item["orderBy"] };
}

export function clusterKeyDeserializer(item: any): ClusterKey {
  return {
    name: item["name"],
    orderBy: item["orderBy"],
  };
}

/** Parameters to create and update Cosmos DB Cassandra table. */
export interface CassandraTableCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a Cassandra table */
  resource: CassandraTableResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function cassandraTableCreateUpdateParametersSerializer(
  item: CassandraTableCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _cassandraTableCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB Cassandra table. */
export interface CassandraTableCreateUpdateProperties {
  /** The standard JSON format of a Cassandra table */
  resource: CassandraTableResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function cassandraTableCreateUpdatePropertiesSerializer(
  item: CassandraTableCreateUpdateProperties,
): any {
  return {
    resource: cassandraTableResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the Cassandra tables and their properties. */
export interface _CassandraTableListResult {
  /** List of Cassandra tables and their properties. */
  readonly value?: CassandraTableGetResults[];
  nextLink?: string;
}

export function _cassandraTableListResultDeserializer(item: any): _CassandraTableListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : cassandraTableGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cassandraTableGetResultsArrayDeserializer(
  result: Array<CassandraTableGetResults>,
): any[] {
  return result.map((item) => {
    return cassandraTableGetResultsDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB Cassandra Role Definition. */
export interface CassandraRoleDefinitionResource extends ProxyResource {
  /** The path id for the Role Definition. */
  idPropertiesId?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  typePropertiesType?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Cassandra Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function cassandraRoleDefinitionResourceSerializer(
  item: CassandraRoleDefinitionResource,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "id",
      "roleName",
      "type",
      "assignableScopes",
      "permissions",
    ])
      ? undefined
      : _cassandraRoleDefinitionResourcePropertiesSerializer(item),
  };
}

export function cassandraRoleDefinitionResourceDeserializer(
  item: any,
): CassandraRoleDefinitionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cassandraRoleDefinitionResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Cassandra Role Definition resource object. */
export interface CassandraRoleDefinitionResourceProperties {
  /** The path id for the Role Definition. */
  id?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Cassandra Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function cassandraRoleDefinitionResourcePropertiesSerializer(
  item: CassandraRoleDefinitionResourceProperties,
): any {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function cassandraRoleDefinitionResourcePropertiesDeserializer(
  item: any,
): CassandraRoleDefinitionResourceProperties {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

/** The response of a CassandraRoleDefinitionResource list operation. */
export interface _CassandraRoleDefinitionListResult {
  /** The CassandraRoleDefinitionResource items on this page */
  value: CassandraRoleDefinitionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cassandraRoleDefinitionListResultDeserializer(
  item: any,
): _CassandraRoleDefinitionListResult {
  return {
    value: cassandraRoleDefinitionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cassandraRoleDefinitionResourceArraySerializer(
  result: Array<CassandraRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return cassandraRoleDefinitionResourceSerializer(item);
  });
}

export function cassandraRoleDefinitionResourceArrayDeserializer(
  result: Array<CassandraRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return cassandraRoleDefinitionResourceDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB Cassandra Role Assignment. */
export interface CassandraRoleAssignmentResource extends ProxyResource {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Cassandra Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Cassandra Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function cassandraRoleAssignmentResourceSerializer(
  item: CassandraRoleAssignmentResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["roleDefinitionId", "scope", "principalId"])
      ? undefined
      : _cassandraRoleAssignmentResourcePropertiesSerializer(item),
  };
}

export function cassandraRoleAssignmentResourceDeserializer(
  item: any,
): CassandraRoleAssignmentResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cassandraRoleAssignmentResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Cassandra Role Assignment resource object. */
export interface CassandraRoleAssignmentResourceProperties {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Cassandra Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Cassandra Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function cassandraRoleAssignmentResourcePropertiesSerializer(
  item: CassandraRoleAssignmentResourceProperties,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function cassandraRoleAssignmentResourcePropertiesDeserializer(
  item: any,
): CassandraRoleAssignmentResourceProperties {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a CassandraRoleAssignmentResource list operation. */
export interface _CassandraRoleAssignmentListResult {
  /** The CassandraRoleAssignmentResource items on this page */
  value: CassandraRoleAssignmentResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cassandraRoleAssignmentListResultDeserializer(
  item: any,
): _CassandraRoleAssignmentListResult {
  return {
    value: cassandraRoleAssignmentResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cassandraRoleAssignmentResourceArraySerializer(
  result: Array<CassandraRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return cassandraRoleAssignmentResourceSerializer(item);
  });
}

export function cassandraRoleAssignmentResourceArrayDeserializer(
  result: Array<CassandraRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return cassandraRoleAssignmentResourceDeserializer(item);
  });
}

/** An Azure Cosmos DB Gremlin database. */
export interface GremlinDatabaseGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: GremlinDatabaseGetPropertiesResource;
  options?: GremlinDatabaseGetPropertiesOptions;
}

export function gremlinDatabaseGetResultsDeserializer(item: any): GremlinDatabaseGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gremlinDatabaseGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB SQL database */
export interface GremlinDatabaseGetProperties {
  resource?: GremlinDatabaseGetPropertiesResource;
  options?: GremlinDatabaseGetPropertiesOptions;
}

export function gremlinDatabaseGetPropertiesDeserializer(item: any): GremlinDatabaseGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : gremlinDatabaseGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : gremlinDatabaseGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface GremlinDatabaseGetPropertiesResource */
export interface GremlinDatabaseGetPropertiesResource extends GremlinDatabaseResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function gremlinDatabaseGetPropertiesResourceDeserializer(
  item: any,
): GremlinDatabaseGetPropertiesResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface GremlinDatabaseGetPropertiesOptions */
export interface GremlinDatabaseGetPropertiesOptions extends OptionsResource {}

export function gremlinDatabaseGetPropertiesOptionsDeserializer(
  item: any,
): GremlinDatabaseGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB Gremlin database resource object */
export interface GremlinDatabaseResource {
  /** Name of the Cosmos DB Gremlin database */
  id: string;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of resource creation. */
  createMode?: CreateMode;
}

export function gremlinDatabaseResourceSerializer(item: GremlinDatabaseResource): any {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function gremlinDatabaseResourceDeserializer(item: any): GremlinDatabaseResource {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

/** Parameters to create and update Cosmos DB Gremlin database. */
export interface GremlinDatabaseCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a Gremlin database */
  resource: GremlinDatabaseResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function gremlinDatabaseCreateUpdateParametersSerializer(
  item: GremlinDatabaseCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _gremlinDatabaseCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB Gremlin database. */
export interface GremlinDatabaseCreateUpdateProperties {
  /** The standard JSON format of a Gremlin database */
  resource: GremlinDatabaseResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function gremlinDatabaseCreateUpdatePropertiesSerializer(
  item: GremlinDatabaseCreateUpdateProperties,
): any {
  return {
    resource: gremlinDatabaseResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the Gremlin databases and their properties. */
export interface _GremlinDatabaseListResult {
  /** List of Gremlin databases and their properties. */
  readonly value?: GremlinDatabaseGetResults[];
  nextLink?: string;
}

export function _gremlinDatabaseListResultDeserializer(item: any): _GremlinDatabaseListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : gremlinDatabaseGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gremlinDatabaseGetResultsArrayDeserializer(
  result: Array<GremlinDatabaseGetResults>,
): any[] {
  return result.map((item) => {
    return gremlinDatabaseGetResultsDeserializer(item);
  });
}

/** An Azure Cosmos DB Gremlin graph. */
export interface GremlinGraphGetResults extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  resource?: GremlinGraphGetPropertiesResource;
  options?: GremlinGraphGetPropertiesOptions;
}

export function gremlinGraphGetResultsDeserializer(item: any): GremlinGraphGetResults {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gremlinGraphGetResultsPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of an Azure Cosmos DB Gremlin graph */
export interface GremlinGraphGetProperties {
  resource?: GremlinGraphGetPropertiesResource;
  options?: GremlinGraphGetPropertiesOptions;
}

export function gremlinGraphGetPropertiesDeserializer(item: any): GremlinGraphGetProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : gremlinGraphGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : gremlinGraphGetPropertiesOptionsDeserializer(item["options"]),
  };
}

/** model interface GremlinGraphGetPropertiesResource */
export interface GremlinGraphGetPropertiesResource extends GremlinGraphResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
}

export function gremlinGraphGetPropertiesResourceDeserializer(
  item: any,
): GremlinGraphGetPropertiesResource {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicyDeserializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeyDeserializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicyDeserializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicyDeserializer(item["conflictResolutionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
  };
}

/** model interface GremlinGraphGetPropertiesOptions */
export interface GremlinGraphGetPropertiesOptions extends OptionsResource {}

export function gremlinGraphGetPropertiesOptionsDeserializer(
  item: any,
): GremlinGraphGetPropertiesOptions {
  return {
    throughput: item["throughput"],
    autoscaleSettings: !item["autoscaleSettings"]
      ? item["autoscaleSettings"]
      : autoscaleSettingsDeserializer(item["autoscaleSettings"]),
  };
}

/** Cosmos DB Gremlin graph resource object */
export interface GremlinGraphResource {
  /** Name of the Cosmos DB Gremlin graph */
  id: string;
  /** The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the graph */
  indexingPolicy?: IndexingPolicy;
  /** The configuration of the partition key to be used for partitioning data into multiple partitions */
  partitionKey?: ContainerPartitionKey;
  /** Default time to live */
  defaultTtl?: number;
  /** The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service. */
  uniqueKeyPolicy?: UniqueKeyPolicy;
  /** The conflict resolution policy for the graph. */
  conflictResolutionPolicy?: ConflictResolutionPolicy;
  /** Analytical TTL. */
  analyticalStorageTtl?: number;
  /** Parameters to indicate the information about the restore */
  restoreParameters?: ResourceRestoreParameters;
  /** Enum to indicate the mode of resource creation. */
  createMode?: CreateMode;
}

export function gremlinGraphResourceSerializer(item: GremlinGraphResource): any {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicySerializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeySerializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicySerializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicySerializer(item["conflictResolutionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersSerializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

export function gremlinGraphResourceDeserializer(item: any): GremlinGraphResource {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicyDeserializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeyDeserializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicyDeserializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicyDeserializer(item["conflictResolutionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
  };
}

/** Parameters to create and update Cosmos DB Gremlin graph. */
export interface GremlinGraphCreateUpdateParameters extends ARMResourceProperties {
  /** The standard JSON format of a Gremlin graph */
  resource: GremlinGraphResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function gremlinGraphCreateUpdateParametersSerializer(
  item: GremlinGraphCreateUpdateParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: _gremlinGraphCreateUpdateParametersPropertiesSerializer(item),
  };
}

/** Properties to create and update Azure Cosmos DB Gremlin graph. */
export interface GremlinGraphCreateUpdateProperties {
  /** The standard JSON format of a Gremlin graph */
  resource: GremlinGraphResource;
  /** A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request. */
  options?: CreateUpdateOptions;
}

export function gremlinGraphCreateUpdatePropertiesSerializer(
  item: GremlinGraphCreateUpdateProperties,
): any {
  return {
    resource: gremlinGraphResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

/** The List operation response, that contains the graphs and their properties. */
export interface _GremlinGraphListResult {
  /** List of graphs and their properties. */
  readonly value?: GremlinGraphGetResults[];
  nextLink?: string;
}

export function _gremlinGraphListResultDeserializer(item: any): _GremlinGraphListResult {
  return {
    value: !item["value"] ? item["value"] : gremlinGraphGetResultsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gremlinGraphGetResultsArrayDeserializer(
  result: Array<GremlinGraphGetResults>,
): any[] {
  return result.map((item) => {
    return gremlinGraphGetResultsDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB Gremlin Role Definition. */
export interface GremlinRoleDefinitionResource extends ProxyResource {
  /** The path id for the Role Definition. */
  idPropertiesId?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  typePropertiesType?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Gremlin Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function gremlinRoleDefinitionResourceSerializer(item: GremlinRoleDefinitionResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "id",
      "roleName",
      "type",
      "assignableScopes",
      "permissions",
    ])
      ? undefined
      : _gremlinRoleDefinitionResourcePropertiesSerializer(item),
  };
}

export function gremlinRoleDefinitionResourceDeserializer(
  item: any,
): GremlinRoleDefinitionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gremlinRoleDefinitionResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Gremlin Role Definition resource object. */
export interface GremlinRoleDefinitionResourceProperties {
  /** The path id for the Role Definition. */
  id?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which Gremlin Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function gremlinRoleDefinitionResourcePropertiesSerializer(
  item: GremlinRoleDefinitionResourceProperties,
): any {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function gremlinRoleDefinitionResourcePropertiesDeserializer(
  item: any,
): GremlinRoleDefinitionResourceProperties {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

/** The response of a GremlinRoleDefinitionResource list operation. */
export interface _GremlinRoleDefinitionListResult {
  /** The GremlinRoleDefinitionResource items on this page */
  value: GremlinRoleDefinitionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gremlinRoleDefinitionListResultDeserializer(
  item: any,
): _GremlinRoleDefinitionListResult {
  return {
    value: gremlinRoleDefinitionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gremlinRoleDefinitionResourceArraySerializer(
  result: Array<GremlinRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return gremlinRoleDefinitionResourceSerializer(item);
  });
}

export function gremlinRoleDefinitionResourceArrayDeserializer(
  result: Array<GremlinRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return gremlinRoleDefinitionResourceDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB Gremlin Role Assignment. */
export interface GremlinRoleAssignmentResource extends ProxyResource {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Gremlin Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Gremlin Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function gremlinRoleAssignmentResourceSerializer(item: GremlinRoleAssignmentResource): any {
  return {
    properties: areAllPropsUndefined(item, ["roleDefinitionId", "scope", "principalId"])
      ? undefined
      : _gremlinRoleAssignmentResourcePropertiesSerializer(item),
  };
}

export function gremlinRoleAssignmentResourceDeserializer(
  item: any,
): GremlinRoleAssignmentResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _gremlinRoleAssignmentResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB Gremlin Role Assignment resource object. */
export interface GremlinRoleAssignmentResourceProperties {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this Gremlin Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Gremlin Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function gremlinRoleAssignmentResourcePropertiesSerializer(
  item: GremlinRoleAssignmentResourceProperties,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function gremlinRoleAssignmentResourcePropertiesDeserializer(
  item: any,
): GremlinRoleAssignmentResourceProperties {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a GremlinRoleAssignmentResource list operation. */
export interface _GremlinRoleAssignmentListResult {
  /** The GremlinRoleAssignmentResource items on this page */
  value: GremlinRoleAssignmentResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gremlinRoleAssignmentListResultDeserializer(
  item: any,
): _GremlinRoleAssignmentListResult {
  return {
    value: gremlinRoleAssignmentResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gremlinRoleAssignmentResourceArraySerializer(
  result: Array<GremlinRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return gremlinRoleAssignmentResourceSerializer(item);
  });
}

export function gremlinRoleAssignmentResourceArrayDeserializer(
  result: Array<GremlinRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return gremlinRoleAssignmentResourceDeserializer(item);
  });
}

/** A notebook workspace resource */
export interface NotebookWorkspace extends ProxyResource {
  /** Specifies the endpoint of Notebook server. */
  readonly notebookServerEndpoint?: string;
  /** Status of the notebook workspace. Possible values are: Creating, Online, Deleting, Failed, Updating. */
  readonly status?: string;
}

export function notebookWorkspaceDeserializer(item: any): NotebookWorkspace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _notebookWorkspacePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a notebook workspace resource. */
export interface NotebookWorkspaceProperties {
  /** Specifies the endpoint of Notebook server. */
  readonly notebookServerEndpoint?: string;
  /** Status of the notebook workspace. Possible values are: Creating, Online, Deleting, Failed, Updating. */
  readonly status?: string;
}

export function notebookWorkspacePropertiesDeserializer(item: any): NotebookWorkspaceProperties {
  return {
    notebookServerEndpoint: item["notebookServerEndpoint"],
    status: item["status"],
  };
}

/** Known values of {@link NotebookWorkspaceName} that the service accepts. */
export enum KnownNotebookWorkspaceName {
  /** default */
  Default = "default",
}

/** Type of NotebookWorkspaceName */
export type NotebookWorkspaceName = string;

/** Parameters to create a notebook workspace resource */
export interface NotebookWorkspaceCreateUpdateParameters extends ARMProxyResource {}

export function notebookWorkspaceCreateUpdateParametersSerializer(
  _item: NotebookWorkspaceCreateUpdateParameters,
): any {
  return {};
}

/** The resource model definition for a ARM proxy resource. It will have everything other than required location and tags */
export interface ARMProxyResource {
  /** The unique resource identifier of the database account. */
  readonly id?: string;
  /** The name of the database account. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
}

export function armProxyResourceSerializer(_item: ARMProxyResource): any {
  return {};
}

/** A list of notebook workspace resources */
export interface _NotebookWorkspaceListResult {
  /** Array of notebook workspace resources */
  value?: NotebookWorkspace[];
  nextLink?: string;
}

export function _notebookWorkspaceListResultDeserializer(item: any): _NotebookWorkspaceListResult {
  return {
    value: !item["value"] ? item["value"] : notebookWorkspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function notebookWorkspaceArrayDeserializer(result: Array<NotebookWorkspace>): any[] {
  return result.map((item) => {
    return notebookWorkspaceDeserializer(item);
  });
}

/** The connection info for the given notebook workspace */
export interface NotebookWorkspaceConnectionInfoResult {
  /** Specifies auth token used for connecting to Notebook server (uses token-based auth). */
  readonly authToken?: string;
  /** Specifies the endpoint of Notebook server. */
  readonly notebookServerEndpoint?: string;
}

export function notebookWorkspaceConnectionInfoResultDeserializer(
  item: any,
): NotebookWorkspaceConnectionInfoResult {
  return {
    authToken: item["authToken"],
    notebookServerEndpoint: item["notebookServerEndpoint"],
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

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource required zone names. */
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
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource required zone names. */
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

/** A list of private link resources */
export interface _PrivateLinkResourceListResult {
  /** Array of private link resources */
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

/** The response to a list percentile metrics request. */
export interface _PercentileMetricListResult {
  /** The list of percentile metrics for the account. */
  readonly value?: PercentileMetric[];
  nextLink?: string;
}

export function _percentileMetricListResultDeserializer(item: any): _PercentileMetricListResult {
  return {
    value: !item["value"] ? item["value"] : percentileMetricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function percentileMetricArrayDeserializer(result: Array<PercentileMetric>): any[] {
  return result.map((item) => {
    return percentileMetricDeserializer(item);
  });
}

/** Percentile Metric data */
export interface PercentileMetric {
  /** The start time for the metric (ISO-8601 format). */
  readonly startTime?: Date;
  /** The end time for the metric (ISO-8601 format). */
  readonly endTime?: Date;
  /** The time grain to be used to summarize the metric values. */
  readonly timeGrain?: string;
  /** The unit of the metric. */
  readonly unit?: UnitType;
  /** The name information for the metric. */
  readonly name?: MetricName;
  /** The percentile metric values for the specified time window and timestep. */
  readonly metricValues?: PercentileMetricValue[];
}

export function percentileMetricDeserializer(item: any): PercentileMetric {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    timeGrain: item["timeGrain"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    metricValues: !item["metricValues"]
      ? item["metricValues"]
      : percentileMetricValueArrayDeserializer(item["metricValues"]),
  };
}

export function percentileMetricValueArrayDeserializer(
  result: Array<PercentileMetricValue>,
): any[] {
  return result.map((item) => {
    return percentileMetricValueDeserializer(item);
  });
}

/** Represents percentile metrics values. */
export interface PercentileMetricValue extends MetricValue {
  /** The 10th percentile value for the metric. */
  readonly p10?: number;
  /** The 25th percentile value for the metric. */
  readonly p25?: number;
  /** The 50th percentile value for the metric. */
  readonly p50?: number;
  /** The 75th percentile value for the metric. */
  readonly p75?: number;
  /** The 90th percentile value for the metric. */
  readonly p90?: number;
  /** The 95th percentile value for the metric. */
  readonly p95?: number;
  /** The 99th percentile value for the metric. */
  readonly p99?: number;
}

export function percentileMetricValueDeserializer(item: any): PercentileMetricValue {
  return {
    count: item["_count"],
    average: item["average"],
    maximum: item["maximum"],
    minimum: item["minimum"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    total: item["total"],
    p10: item["P10"],
    p25: item["P25"],
    p50: item["P50"],
    p75: item["P75"],
    p90: item["P90"],
    p95: item["P95"],
    p99: item["P99"],
  };
}

/** The response to a list partition metrics request. */
export interface _PartitionMetricListResult {
  /** The list of partition-level metrics for the account. */
  readonly value?: PartitionMetric[];
  nextLink?: string;
}

export function _partitionMetricListResultDeserializer(item: any): _PartitionMetricListResult {
  return {
    value: !item["value"] ? item["value"] : partitionMetricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partitionMetricArrayDeserializer(result: Array<PartitionMetric>): any[] {
  return result.map((item) => {
    return partitionMetricDeserializer(item);
  });
}

/** The metric values for a single partition. */
export interface PartitionMetric extends Metric {
  /** The partition id (GUID identifier) of the metric values. */
  readonly partitionId?: string;
  /** The partition key range id (integer identifier) of the metric values. */
  readonly partitionKeyRangeId?: string;
}

export function partitionMetricDeserializer(item: any): PartitionMetric {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    timeGrain: item["timeGrain"],
    unit: item["unit"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    metricValues: !item["metricValues"]
      ? item["metricValues"]
      : metricValueArrayDeserializer(item["metricValues"]),
    partitionId: item["partitionId"],
    partitionKeyRangeId: item["partitionKeyRangeId"],
  };
}

/** The response to a list partition level usage request. */
export interface _PartitionUsagesResult {
  /** The list of partition-level usages for the database. A usage is a point in time metric */
  readonly value?: PartitionUsage[];
  nextLink?: string;
}

export function _partitionUsagesResultDeserializer(item: any): _PartitionUsagesResult {
  return {
    value: !item["value"] ? item["value"] : partitionUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partitionUsageArrayDeserializer(result: Array<PartitionUsage>): any[] {
  return result.map((item) => {
    return partitionUsageDeserializer(item);
  });
}

/** The partition level usage data for a usage request. */
export interface PartitionUsage extends Usage {
  /** The partition id (GUID identifier) of the usages. */
  readonly partitionId?: string;
  /** The partition key range id (integer identifier) of the usages. */
  readonly partitionKeyRangeId?: string;
}

export function partitionUsageDeserializer(item: any): PartitionUsage {
  return {
    unit: item["unit"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    quotaPeriod: item["quotaPeriod"],
    limit: item["limit"],
    currentValue: item["currentValue"],
    partitionId: item["partitionId"],
    partitionKeyRangeId: item["partitionKeyRangeId"],
  };
}

/** Cosmos DB location get result */
export interface LocationGetResult extends ProxyResource {
  /** Cosmos DB location metadata */
  properties?: LocationProperties;
}

export function locationGetResultDeserializer(item: any): LocationGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : locationPropertiesDeserializer(item["properties"]),
  };
}

/** Cosmos DB location metadata */
export interface LocationProperties {
  /** Flag indicating whether the location supports availability zones or not. */
  readonly supportsAvailabilityZone?: boolean;
  /** Flag indicating whether the location is residency sensitive. */
  readonly isResidencyRestricted?: boolean;
  /** The properties of available backup storage redundancies. */
  readonly backupStorageRedundancies?: BackupStorageRedundancy[];
  /** Flag indicating whether the subscription have access in region for Non-Availability Zones. */
  readonly isSubscriptionRegionAccessAllowedForRegular?: boolean;
  /** Flag indicating whether the subscription have access in region for Availability Zones(Az). */
  readonly isSubscriptionRegionAccessAllowedForAz?: boolean;
  /** Enum to indicate current buildout status of the region. */
  readonly status?: Status;
}

export function locationPropertiesDeserializer(item: any): LocationProperties {
  return {
    supportsAvailabilityZone: item["supportsAvailabilityZone"],
    isResidencyRestricted: item["isResidencyRestricted"],
    backupStorageRedundancies: !item["backupStorageRedundancies"]
      ? item["backupStorageRedundancies"]
      : item["backupStorageRedundancies"].map((p: any) => {
          return p;
        }),
    isSubscriptionRegionAccessAllowedForRegular:
      item["isSubscriptionRegionAccessAllowedForRegular"],
    isSubscriptionRegionAccessAllowedForAz: item["isSubscriptionRegionAccessAllowedForAz"],
    status: item["status"],
  };
}

/** Enum to indicate current buildout status of the region. */
export enum KnownStatus {
  /** Uninitialized */
  Uninitialized = "Uninitialized",
  /** Initializing */
  Initializing = "Initializing",
  /** InternallyReady */
  InternallyReady = "InternallyReady",
  /** Online */
  Online = "Online",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Updating */
  Updating = "Updating",
  /** Creating */
  Creating = "Creating",
}

/**
 * Enum to indicate current buildout status of the region. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Uninitialized** \
 * **Initializing** \
 * **InternallyReady** \
 * **Online** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Updating** \
 * **Creating**
 */
export type Status = string;

/** The List operation response, that contains Cosmos DB locations and their properties. */
export interface _LocationListResult {
  /** List of Cosmos DB locations and their properties. */
  readonly value?: LocationGetResult[];
  nextLink?: string;
}

export function _locationListResultDeserializer(item: any): _LocationListResult {
  return {
    value: !item["value"] ? item["value"] : locationGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function locationGetResultArrayDeserializer(result: Array<LocationGetResult>): any[] {
  return result.map((item) => {
    return locationGetResultDeserializer(item);
  });
}

/** Representation of a managed Cassandra cluster. */
export interface ClusterResource extends ProxyResource {
  /** Properties of a managed Cassandra cluster. */
  properties?: ClusterResourceProperties;
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with \"defaultExperience\": \"Cassandra\". Current \"defaultExperience\" values also include \"Table\", \"Graph\", \"DocumentDB\", and \"MongoDB\". */
  tags?: Record<string, string>;
  /** Identity for the resource. */
  identity?: ManagedCassandraManagedServiceIdentity;
}

export function clusterResourceSerializer(item: ClusterResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : clusterResourcePropertiesSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedCassandraManagedServiceIdentitySerializer(item["identity"]),
  };
}

export function clusterResourceDeserializer(item: any): ClusterResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : clusterResourcePropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedCassandraManagedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a managed Cassandra cluster. */
export interface ClusterResourceProperties {
  /** The status of the resource at the time the operation was called. */
  provisioningState?: ManagedCassandraProvisioningState;
  /** To create an empty cluster, omit this field or set it to null. To restore a backup into a new cluster, set this field to the resource id of the backup. */
  restoreFromBackupId?: string;
  /** Resource id of a subnet that this cluster's management service should have its network interface attached to. The subnet must be routable to all subnets that will be delegated to data centers. The resource id must be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>' */
  delegatedManagementSubnetId?: string;
  /** Which version of Cassandra should this cluster converge to running (e.g., 3.11). When updated, the cluster may take some time to migrate to the new version. */
  cassandraVersion?: string;
  /** If you need to set the clusterName property in cassandra.yaml to something besides the resource name of the cluster, set the value to use on this property. */
  clusterNameOverride?: string;
  /** Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'. */
  authenticationMethod?: AuthenticationMethod;
  /** Initial password for clients connecting as admin to the cluster. Should be changed after cluster creation. Returns null on GET. This field only applies when the authenticationMethod field is 'Cassandra'. */
  initialCassandraAdminPassword?: string;
  /** Hostname or IP address where the Prometheus endpoint containing data about the managed Cassandra nodes can be reached. */
  prometheusEndpoint?: SeedNode;
  /** Should automatic repairs run on this cluster? If omitted, this is true, and should stay true unless you are running a hybrid cluster where you are already doing your own repairs. */
  repairEnabled?: boolean;
  /** The form of AutoReplicate that is being used by this cluster. */
  autoReplicate?: AutoReplicate;
  /** List of TLS certificates used to authorize clients connecting to the cluster. All connections are TLS encrypted whether clientCertificates is set or not, but if clientCertificates is set, the managed Cassandra cluster will reject all connections not bearing a TLS client certificate that can be validated from one or more of the public certificates in this property. */
  clientCertificates?: Certificate[];
  /** List of TLS certificates used to authorize gossip from unmanaged data centers. The TLS certificates of all nodes in unmanaged data centers must be verifiable using one of the certificates provided in this property. */
  externalGossipCertificates?: Certificate[];
  /** List of TLS certificates that unmanaged nodes must trust for gossip with managed nodes. All managed nodes will present TLS client certificates that are verifiable using one of the certificates provided in this property. */
  readonly gossipCertificates?: Certificate[];
  /** List of IP addresses of seed nodes in unmanaged data centers. These will be added to the seed node lists of all managed nodes. */
  externalSeedNodes?: SeedNode[];
  /** List of IP addresses of seed nodes in the managed data centers. These should be added to the seed node lists of all unmanaged nodes. */
  readonly seedNodes?: SeedNode[];
  /** List of the data center names for unmanaged data centers in this cluster to be included in auto-replication. */
  externalDataCenters?: string[];
  /** (Deprecated) Number of hours to wait between taking a backup of the cluster. */
  hoursBetweenBackups?: number;
  /** Whether the cluster and associated data centers has been deallocated. */
  deallocated?: boolean;
  /** Whether Cassandra audit logging is enabled */
  cassandraAuditLoggingEnabled?: boolean;
  /** Error related to resource provisioning. */
  provisionError?: CassandraError;
  /** Extensions to be added or updated on cluster. */
  extensions?: string[];
  /** List of backup schedules that define when you want to back up your data. */
  backupSchedules?: BackupSchedule[];
  /** How the nodes in the cluster react to scheduled events */
  scheduledEventStrategy?: ScheduledEventStrategy;
  /** How to connect to the azure services needed for running the cluster */
  azureConnectionMethod?: AzureConnectionType;
  /** If the Connection Method is Vpn, this is the Id of the private link resource that the datacenters need to connect to. */
  readonly privateLinkResourceId?: string;
}

export function clusterResourcePropertiesSerializer(item: ClusterResourceProperties): any {
  return {
    provisioningState: item["provisioningState"],
    restoreFromBackupId: item["restoreFromBackupId"],
    delegatedManagementSubnetId: item["delegatedManagementSubnetId"],
    cassandraVersion: item["cassandraVersion"],
    clusterNameOverride: item["clusterNameOverride"],
    authenticationMethod: item["authenticationMethod"],
    initialCassandraAdminPassword: item["initialCassandraAdminPassword"],
    prometheusEndpoint: !item["prometheusEndpoint"]
      ? item["prometheusEndpoint"]
      : seedNodeSerializer(item["prometheusEndpoint"]),
    repairEnabled: item["repairEnabled"],
    autoReplicate: item["autoReplicate"],
    clientCertificates: !item["clientCertificates"]
      ? item["clientCertificates"]
      : certificateArraySerializer(item["clientCertificates"]),
    externalGossipCertificates: !item["externalGossipCertificates"]
      ? item["externalGossipCertificates"]
      : certificateArraySerializer(item["externalGossipCertificates"]),
    externalSeedNodes: !item["externalSeedNodes"]
      ? item["externalSeedNodes"]
      : seedNodeArraySerializer(item["externalSeedNodes"]),
    externalDataCenters: !item["externalDataCenters"]
      ? item["externalDataCenters"]
      : item["externalDataCenters"].map((p: any) => {
          return p;
        }),
    hoursBetweenBackups: item["hoursBetweenBackups"],
    deallocated: item["deallocated"],
    cassandraAuditLoggingEnabled: item["cassandraAuditLoggingEnabled"],
    provisionError: !item["provisionError"]
      ? item["provisionError"]
      : cassandraErrorSerializer(item["provisionError"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : item["extensions"].map((p: any) => {
          return p;
        }),
    backupSchedules: !item["backupSchedules"]
      ? item["backupSchedules"]
      : backupScheduleArraySerializer(item["backupSchedules"]),
    scheduledEventStrategy: item["scheduledEventStrategy"],
    azureConnectionMethod: item["azureConnectionMethod"],
  };
}

export function clusterResourcePropertiesDeserializer(item: any): ClusterResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    restoreFromBackupId: item["restoreFromBackupId"],
    delegatedManagementSubnetId: item["delegatedManagementSubnetId"],
    cassandraVersion: item["cassandraVersion"],
    clusterNameOverride: item["clusterNameOverride"],
    authenticationMethod: item["authenticationMethod"],
    initialCassandraAdminPassword: item["initialCassandraAdminPassword"],
    prometheusEndpoint: !item["prometheusEndpoint"]
      ? item["prometheusEndpoint"]
      : seedNodeDeserializer(item["prometheusEndpoint"]),
    repairEnabled: item["repairEnabled"],
    autoReplicate: item["autoReplicate"],
    clientCertificates: !item["clientCertificates"]
      ? item["clientCertificates"]
      : certificateArrayDeserializer(item["clientCertificates"]),
    externalGossipCertificates: !item["externalGossipCertificates"]
      ? item["externalGossipCertificates"]
      : certificateArrayDeserializer(item["externalGossipCertificates"]),
    gossipCertificates: !item["gossipCertificates"]
      ? item["gossipCertificates"]
      : certificateArrayDeserializer(item["gossipCertificates"]),
    externalSeedNodes: !item["externalSeedNodes"]
      ? item["externalSeedNodes"]
      : seedNodeArrayDeserializer(item["externalSeedNodes"]),
    seedNodes: !item["seedNodes"]
      ? item["seedNodes"]
      : seedNodeArrayDeserializer(item["seedNodes"]),
    externalDataCenters: !item["externalDataCenters"]
      ? item["externalDataCenters"]
      : item["externalDataCenters"].map((p: any) => {
          return p;
        }),
    hoursBetweenBackups: item["hoursBetweenBackups"],
    deallocated: item["deallocated"],
    cassandraAuditLoggingEnabled: item["cassandraAuditLoggingEnabled"],
    provisionError: !item["provisionError"]
      ? item["provisionError"]
      : cassandraErrorDeserializer(item["provisionError"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : item["extensions"].map((p: any) => {
          return p;
        }),
    backupSchedules: !item["backupSchedules"]
      ? item["backupSchedules"]
      : backupScheduleArrayDeserializer(item["backupSchedules"]),
    scheduledEventStrategy: item["scheduledEventStrategy"],
    azureConnectionMethod: item["azureConnectionMethod"],
    privateLinkResourceId: item["privateLinkResourceId"],
  };
}

/** The status of the resource at the time the operation was called. */
export enum KnownManagedCassandraProvisioningState {
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

/**
 * The status of the resource at the time the operation was called. \
 * {@link KnownManagedCassandraProvisioningState} can be used interchangeably with ManagedCassandraProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ManagedCassandraProvisioningState = string;

/** Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'. */
export enum KnownAuthenticationMethod {
  /** None */
  None = "None",
  /** Cassandra */
  Cassandra = "Cassandra",
  /** Ldap */
  Ldap = "Ldap",
}

/**
 * Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'. \
 * {@link KnownAuthenticationMethod} can be used interchangeably with AuthenticationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Cassandra** \
 * **Ldap**
 */
export type AuthenticationMethod = string;

/** model interface SeedNode */
export interface SeedNode {
  /** IP address of this seed node. */
  ipAddress?: string;
}

export function seedNodeSerializer(item: SeedNode): any {
  return { ipAddress: item["ipAddress"] };
}

export function seedNodeDeserializer(item: any): SeedNode {
  return {
    ipAddress: item["ipAddress"],
  };
}

/** The form of AutoReplicate that is being used by this cluster. */
export enum KnownAutoReplicate {
  /** None */
  None = "None",
  /** SystemKeyspaces */
  SystemKeyspaces = "SystemKeyspaces",
  /** AllKeyspaces */
  AllKeyspaces = "AllKeyspaces",
}

/**
 * The form of AutoReplicate that is being used by this cluster. \
 * {@link KnownAutoReplicate} can be used interchangeably with AutoReplicate,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemKeyspaces** \
 * **AllKeyspaces**
 */
export type AutoReplicate = string;

export function certificateArraySerializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateSerializer(item);
  });
}

export function certificateArrayDeserializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateDeserializer(item);
  });
}

/** model interface Certificate */
export interface Certificate {
  /** PEM formatted public key. */
  pem?: string;
}

export function certificateSerializer(item: Certificate): any {
  return { pem: item["pem"] };
}

export function certificateDeserializer(item: any): Certificate {
  return {
    pem: item["pem"],
  };
}

export function seedNodeArraySerializer(result: Array<SeedNode>): any[] {
  return result.map((item) => {
    return seedNodeSerializer(item);
  });
}

export function seedNodeArrayDeserializer(result: Array<SeedNode>): any[] {
  return result.map((item) => {
    return seedNodeDeserializer(item);
  });
}

/** model interface CassandraError */
export interface CassandraError {
  /** The code of error that occurred. */
  code?: string;
  /** The message of the error. */
  message?: string;
  /** The target resource of the error. */
  target?: string;
  /** Additional information about the error. */
  additionalErrorInfo?: string;
}

export function cassandraErrorSerializer(item: CassandraError): any {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalErrorInfo: item["additionalErrorInfo"],
  };
}

export function cassandraErrorDeserializer(item: any): CassandraError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalErrorInfo: item["additionalErrorInfo"],
  };
}

export function backupScheduleArraySerializer(result: Array<BackupSchedule>): any[] {
  return result.map((item) => {
    return backupScheduleSerializer(item);
  });
}

export function backupScheduleArrayDeserializer(result: Array<BackupSchedule>): any[] {
  return result.map((item) => {
    return backupScheduleDeserializer(item);
  });
}

/** model interface BackupSchedule */
export interface BackupSchedule {
  /** The unique identifier of backup schedule. */
  scheduleName?: string;
  /** The cron expression that defines when you want to back up your data. */
  cronExpression?: string;
  /** The retention period (hours) of the backups. If you want to retain data forever, set retention to 0. */
  retentionInHours?: number;
}

export function backupScheduleSerializer(item: BackupSchedule): any {
  return {
    scheduleName: item["scheduleName"],
    cronExpression: item["cronExpression"],
    retentionInHours: item["retentionInHours"],
  };
}

export function backupScheduleDeserializer(item: any): BackupSchedule {
  return {
    scheduleName: item["scheduleName"],
    cronExpression: item["cronExpression"],
    retentionInHours: item["retentionInHours"],
  };
}

/** How the nodes in the cluster react to scheduled events */
export enum KnownScheduledEventStrategy {
  /** Ignore */
  Ignore = "Ignore",
  /** StopAny */
  StopAny = "StopAny",
  /** StopByRack */
  StopByRack = "StopByRack",
}

/**
 * How the nodes in the cluster react to scheduled events \
 * {@link KnownScheduledEventStrategy} can be used interchangeably with ScheduledEventStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ignore** \
 * **StopAny** \
 * **StopByRack**
 */
export type ScheduledEventStrategy = string;

/** How to connect to the azure services needed for running the cluster */
export enum KnownAzureConnectionType {
  /** None */
  None = "None",
  /** VPN */
  VPN = "VPN",
}

/**
 * How to connect to the azure services needed for running the cluster \
 * {@link KnownAzureConnectionType} can be used interchangeably with AzureConnectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **VPN**
 */
export type AzureConnectionType = string;

/** Identity for the resource. */
export interface ManagedCassandraManagedServiceIdentity {
  /** The object id of the identity resource. */
  readonly principalId?: string;
  /** The tenant id of the resource. */
  readonly tenantId?: string;
  /** The type of the resource. */
  type?: ManagedCassandraResourceIdentityType;
}

export function managedCassandraManagedServiceIdentitySerializer(
  item: ManagedCassandraManagedServiceIdentity,
): any {
  return { type: item["type"] };
}

export function managedCassandraManagedServiceIdentityDeserializer(
  item: any,
): ManagedCassandraManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The type of the resource. */
export enum KnownManagedCassandraResourceIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** None */
  None = "None",
}

/**
 * The type of the resource. \
 * {@link KnownManagedCassandraResourceIdentityType} can be used interchangeably with ManagedCassandraResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **None**
 */
export type ManagedCassandraResourceIdentityType = string;

/** List of managed Cassandra clusters. */
export interface _ListClusters {
  /** Container for the array of clusters. */
  value?: ClusterResource[];
  nextLink?: string;
}

export function _listClustersDeserializer(item: any): _ListClusters {
  return {
    value: !item["value"] ? item["value"] : clusterResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterResourceArraySerializer(result: Array<ClusterResource>): any[] {
  return result.map((item) => {
    return clusterResourceSerializer(item);
  });
}

export function clusterResourceArrayDeserializer(result: Array<ClusterResource>): any[] {
  return result.map((item) => {
    return clusterResourceDeserializer(item);
  });
}

/** Specification of which command to run where */
export interface CommandPostBody {
  /** The command which should be run */
  command: string;
  /** The arguments for the command to be run */
  arguments?: Record<string, string>;
  /** IP address of the cassandra host to run the command on */
  host: string;
  /** If true, stops cassandra before executing the command and then start it again */
  cassandraStopStart?: boolean;
  /** If true, allows the command to *write* to the cassandra directory, otherwise read-only. */
  readwrite?: boolean;
}

export function commandPostBodySerializer(item: CommandPostBody): any {
  return {
    command: item["command"],
    arguments: item["arguments"],
    host: item["host"],
    "cassandra-stop-start": item["cassandraStopStart"],
    readwrite: item["readwrite"],
  };
}

/** Response of /command api */
export interface CommandOutput {
  /** Output of the command. */
  commandOutput?: string;
}

export function commandOutputDeserializer(item: any): CommandOutput {
  return {
    commandOutput: item["commandOutput"],
  };
}

/** Properties of a managed Cassandra cluster public status. */
export interface CassandraClusterPublicStatus {
  eTag?: string;
  reaperStatus?: ManagedCassandraReaperStatus;
  /** List relevant information about any connection errors to the Datacenters. */
  connectionErrors?: ConnectionError[];
  /** List relevant information about any errors about cluster, data center and connection error. */
  errors?: CassandraError[];
  /** List of the status of each datacenter in this cluster. */
  dataCenters?: CassandraClusterPublicStatusDataCentersItem[];
}

export function cassandraClusterPublicStatusDeserializer(item: any): CassandraClusterPublicStatus {
  return {
    eTag: item["eTag"],
    reaperStatus: !item["reaperStatus"]
      ? item["reaperStatus"]
      : managedCassandraReaperStatusDeserializer(item["reaperStatus"]),
    connectionErrors: !item["connectionErrors"]
      ? item["connectionErrors"]
      : connectionErrorArrayDeserializer(item["connectionErrors"]),
    errors: !item["errors"] ? item["errors"] : cassandraErrorArrayDeserializer(item["errors"]),
    dataCenters: !item["dataCenters"]
      ? item["dataCenters"]
      : cassandraClusterPublicStatusDataCentersItemArrayDeserializer(item["dataCenters"]),
  };
}

/** model interface ManagedCassandraReaperStatus */
export interface ManagedCassandraReaperStatus {
  healthy?: boolean;
  /** Dictionary of <string> */
  repairRunIds?: Record<string, string>;
  /** Dictionary of <string> */
  repairSchedules?: Record<string, string>;
}

export function managedCassandraReaperStatusDeserializer(item: any): ManagedCassandraReaperStatus {
  return {
    healthy: item["healthy"],
    repairRunIds: !item["repairRunIds"]
      ? item["repairRunIds"]
      : Object.fromEntries(
          Object.entries(item["repairRunIds"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    repairSchedules: !item["repairSchedules"]
      ? item["repairSchedules"]
      : Object.fromEntries(
          Object.entries(item["repairSchedules"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function connectionErrorArrayDeserializer(result: Array<ConnectionError>): any[] {
  return result.map((item) => {
    return connectionErrorDeserializer(item);
  });
}

/** model interface ConnectionError */
export interface ConnectionError {
  /** The kind of connection error that occurred. */
  connectionState?: ConnectionState;
  /** The IP of host that originated the failed connection. */
  iPFrom?: string;
  /** The IP that the connection attempted to reach. */
  iPTo?: string;
  /** The TCP port the connection was attempted on. */
  port?: number;
  /** Detailed error message about the failed connection. */
  exception?: string;
}

export function connectionErrorDeserializer(item: any): ConnectionError {
  return {
    connectionState: item["connectionState"],
    iPFrom: item["iPFrom"],
    iPTo: item["iPTo"],
    port: item["port"],
    exception: item["exception"],
  };
}

/** The kind of connection error that occurred. */
export enum KnownConnectionState {
  /** Unknown */
  Unknown = "Unknown",
  /** OK */
  OK = "OK",
  /** OperatorToDataCenterNetworkError */
  OperatorToDataCenterNetworkError = "OperatorToDataCenterNetworkError",
  /** DatacenterToDatacenterNetworkError */
  DatacenterToDatacenterNetworkError = "DatacenterToDatacenterNetworkError",
  /** InternalOperatorToDataCenterCertificateError */
  InternalOperatorToDataCenterCertificateError = "InternalOperatorToDataCenterCertificateError",
  /** InternalError */
  InternalError = "InternalError",
}

/**
 * The kind of connection error that occurred. \
 * {@link KnownConnectionState} can be used interchangeably with ConnectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **OK** \
 * **OperatorToDataCenterNetworkError** \
 * **DatacenterToDatacenterNetworkError** \
 * **InternalOperatorToDataCenterCertificateError** \
 * **InternalError**
 */
export type ConnectionState = string;

export function cassandraErrorArraySerializer(result: Array<CassandraError>): any[] {
  return result.map((item) => {
    return cassandraErrorSerializer(item);
  });
}

export function cassandraErrorArrayDeserializer(result: Array<CassandraError>): any[] {
  return result.map((item) => {
    return cassandraErrorDeserializer(item);
  });
}

export function cassandraClusterPublicStatusDataCentersItemArrayDeserializer(
  result: Array<CassandraClusterPublicStatusDataCentersItem>,
): any[] {
  return result.map((item) => {
    return cassandraClusterPublicStatusDataCentersItemDeserializer(item);
  });
}

/** model interface CassandraClusterPublicStatusDataCentersItem */
export interface CassandraClusterPublicStatusDataCentersItem {
  /** The name of this Datacenter. */
  name?: string;
  /** A list of all seed nodes in the cluster, managed and unmanaged. */
  seedNodes?: string[];
  nodes?: ComponentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItems[];
}

export function cassandraClusterPublicStatusDataCentersItemDeserializer(
  item: any,
): CassandraClusterPublicStatusDataCentersItem {
  return {
    name: item["name"],
    seedNodes: !item["seedNodes"]
      ? item["seedNodes"]
      : item["seedNodes"].map((p: any) => {
          return p;
        }),
    nodes: !item["nodes"]
      ? item["nodes"]
      : componentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItemsArrayDeserializer(
          item["nodes"],
        ),
  };
}

export function componentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItemsArrayDeserializer(
  result: Array<ComponentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItems>,
): any[] {
  return result.map((item) => {
    return componentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItemsDeserializer(
      item,
    );
  });
}

/** model interface ComponentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItems */
export interface ComponentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItems {
  /** The node's IP address. */
  address?: string;
  /** The state of the node in Cassandra ring. */
  state?: NodeState;
  status?: string;
  /** Cassandra service status on this node */
  cassandraProcessStatus?: string;
  /** The amount of file system data in the data directory (e.g., 47.66 kB), excluding all content in the snapshots subdirectories. Because all SSTable data files are included, any data that is not cleaned up (such as TTL-expired cells or tombstones) is counted. */
  load?: string;
  /** List of tokens this node covers. */
  tokens?: string[];
  size?: number;
  /** The network ID of the node. */
  hostID?: string;
  /** The rack this node is part of. */
  rack?: string;
  /** The timestamp when these statistics were captured. */
  timestamp?: string;
  /** The amount of disk used, in kB, of the directory /var/lib/cassandra. */
  diskUsedKB?: number;
  /** The amount of disk free, in kB, of the directory /var/lib/cassandra. */
  diskFreeKB?: number;
  /** Used memory (calculated as total - free - buffers - cache), in kB. */
  memoryUsedKB?: number;
  /** Memory used by kernel buffers (Buffers in /proc/meminfo) and page cache and slabs (Cached and SReclaimable in /proc/meminfo), in kB. */
  memoryBuffersAndCachedKB?: number;
  /** Unused memory (MemFree and SwapFree in /proc/meminfo), in kB. */
  memoryFreeKB?: number;
  /** Total installed memory (MemTotal and SwapTotal in /proc/meminfo), in kB. */
  memoryTotalKB?: number;
  /** A float representing the current system-wide CPU utilization as a percentage. */
  cpuUsage?: number;
  /** If node has been updated to latest model */
  isLatestModel?: boolean;
}

export function componentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItemsDeserializer(
  item: any,
): ComponentsM9L909SchemasCassandraclusterpublicstatusPropertiesDatacentersItemsPropertiesNodesItems {
  return {
    address: item["address"],
    state: item["state"],
    status: item["status"],
    cassandraProcessStatus: item["cassandraProcessStatus"],
    load: item["load"],
    tokens: !item["tokens"]
      ? item["tokens"]
      : item["tokens"].map((p: any) => {
          return p;
        }),
    size: item["size"],
    hostID: item["hostID"],
    rack: item["rack"],
    timestamp: item["timestamp"],
    diskUsedKB: item["diskUsedKB"],
    diskFreeKB: item["diskFreeKB"],
    memoryUsedKB: item["memoryUsedKB"],
    memoryBuffersAndCachedKB: item["memoryBuffersAndCachedKB"],
    memoryFreeKB: item["memoryFreeKB"],
    memoryTotalKB: item["memoryTotalKB"],
    cpuUsage: item["cpuUsage"],
    isLatestModel: item["isLatestModel"],
  };
}

/** The state of the node in Cassandra ring. */
export enum KnownNodeState {
  /** Normal */
  Normal = "Normal",
  /** Leaving */
  Leaving = "Leaving",
  /** Joining */
  Joining = "Joining",
  /** Moving */
  Moving = "Moving",
  /** Stopped */
  Stopped = "Stopped",
}

/**
 * The state of the node in Cassandra ring. \
 * {@link KnownNodeState} can be used interchangeably with NodeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Normal** \
 * **Leaving** \
 * **Joining** \
 * **Moving** \
 * **Stopped**
 */
export type NodeState = string;

/** A managed Cassandra data center. */
export interface DataCenterResource extends ProxyResource {
  /** Properties of a managed Cassandra data center. */
  properties?: DataCenterResourceProperties;
}

export function dataCenterResourceSerializer(item: DataCenterResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dataCenterResourcePropertiesSerializer(item["properties"]),
  };
}

export function dataCenterResourceDeserializer(item: any): DataCenterResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dataCenterResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a managed Cassandra data center. */
export interface DataCenterResourceProperties {
  /** The status of the resource at the time the operation was called. */
  provisioningState?: ManagedCassandraProvisioningState;
  /** The region this data center should be created in. */
  dataCenterLocation?: string;
  /** Resource id of a subnet the nodes in this data center should have their network interfaces connected to. The subnet must be in the same region specified in 'dataCenterLocation' and must be able to route to the subnet specified in the cluster's 'delegatedManagementSubnetId' property. This resource id will be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'. */
  delegatedSubnetId?: string;
  /** The number of nodes the data center should have. This is the desired number. After it is set, it may take some time for the data center to be scaled to match. To monitor the number of nodes and their status, use the fetchNodeStatus method on the cluster. */
  nodeCount?: number;
  /** IP addresses for seed nodes in this data center. This is for reference. Generally you will want to use the seedNodes property on the cluster, which aggregates the seed nodes from all data centers in the cluster. */
  readonly seedNodes?: SeedNode[];
  /** A fragment of a cassandra.yaml configuration file to be included in the cassandra.yaml for all nodes in this data center. The fragment should be Base64 encoded, and only a subset of keys are allowed. */
  base64EncodedCassandraYamlFragment?: string;
  /** Key uri to use for encryption of managed disks. Ensure the system assigned identity of the cluster has been assigned appropriate permissions(key get/wrap/unwrap permissions) on the key. */
  managedDiskCustomerKeyUri?: string;
  /** Indicates the Key Uri of the customer key to use for encryption of the backup storage account. */
  backupStorageCustomerKeyUri?: string;
  /** Virtual Machine SKU used for data centers. Default value is Standard_DS14_v2 */
  sku?: string;
  /** Disk SKU used for data centers. Default value is P30. */
  diskSku?: string;
  /** Number of disks attached to each node. Default is 4. */
  diskCapacity?: number;
  /** If the data center has Availability Zone support, apply it to the Virtual Machine ScaleSet that host the cassandra data center virtual machines. */
  availabilityZone?: boolean;
  /** Ldap authentication method properties. This feature is in preview. */
  authenticationMethodLdapProperties?: AuthenticationMethodLdapProperties;
  /** Whether the data center has been deallocated. */
  deallocated?: boolean;
  /** Error related to resource provisioning. */
  provisionError?: CassandraError;
  /** Ip of the VPN Endpoint for this data center. */
  privateEndpointIpAddress?: string;
}

export function dataCenterResourcePropertiesSerializer(item: DataCenterResourceProperties): any {
  return {
    provisioningState: item["provisioningState"],
    dataCenterLocation: item["dataCenterLocation"],
    delegatedSubnetId: item["delegatedSubnetId"],
    nodeCount: item["nodeCount"],
    base64EncodedCassandraYamlFragment: item["base64EncodedCassandraYamlFragment"],
    managedDiskCustomerKeyUri: item["managedDiskCustomerKeyUri"],
    backupStorageCustomerKeyUri: item["backupStorageCustomerKeyUri"],
    sku: item["sku"],
    diskSku: item["diskSku"],
    diskCapacity: item["diskCapacity"],
    availabilityZone: item["availabilityZone"],
    authenticationMethodLdapProperties: !item["authenticationMethodLdapProperties"]
      ? item["authenticationMethodLdapProperties"]
      : authenticationMethodLdapPropertiesSerializer(item["authenticationMethodLdapProperties"]),
    deallocated: item["deallocated"],
    provisionError: !item["provisionError"]
      ? item["provisionError"]
      : cassandraErrorSerializer(item["provisionError"]),
    privateEndpointIpAddress: item["privateEndpointIpAddress"],
  };
}

export function dataCenterResourcePropertiesDeserializer(item: any): DataCenterResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    dataCenterLocation: item["dataCenterLocation"],
    delegatedSubnetId: item["delegatedSubnetId"],
    nodeCount: item["nodeCount"],
    seedNodes: !item["seedNodes"]
      ? item["seedNodes"]
      : seedNodeArrayDeserializer(item["seedNodes"]),
    base64EncodedCassandraYamlFragment: item["base64EncodedCassandraYamlFragment"],
    managedDiskCustomerKeyUri: item["managedDiskCustomerKeyUri"],
    backupStorageCustomerKeyUri: item["backupStorageCustomerKeyUri"],
    sku: item["sku"],
    diskSku: item["diskSku"],
    diskCapacity: item["diskCapacity"],
    availabilityZone: item["availabilityZone"],
    authenticationMethodLdapProperties: !item["authenticationMethodLdapProperties"]
      ? item["authenticationMethodLdapProperties"]
      : authenticationMethodLdapPropertiesDeserializer(item["authenticationMethodLdapProperties"]),
    deallocated: item["deallocated"],
    provisionError: !item["provisionError"]
      ? item["provisionError"]
      : cassandraErrorDeserializer(item["provisionError"]),
    privateEndpointIpAddress: item["privateEndpointIpAddress"],
  };
}

/** Ldap authentication method properties. This feature is in preview. */
export interface AuthenticationMethodLdapProperties {
  /** Hostname of the LDAP server. */
  serverHostname?: string;
  /** Port of the LDAP server. */
  serverPort?: number;
  /** Distinguished name of the look up user account, who can look up user details on authentication. */
  serviceUserDistinguishedName?: string;
  /** Password of the look up user. */
  serviceUserPassword?: string;
  /** Distinguished name of the object to start the recursive search of users from. */
  searchBaseDistinguishedName?: string;
  /** Template to use for searching. Defaults to (cn=%s) where %s will be replaced by the username used to login. */
  searchFilterTemplate?: string;
  serverCertificates?: Certificate[];
  /** Timeout for connecting to the LDAP server in miliseconds. The default is 5000 ms. */
  connectionTimeoutInMs?: number;
}

export function authenticationMethodLdapPropertiesSerializer(
  item: AuthenticationMethodLdapProperties,
): any {
  return {
    serverHostname: item["serverHostname"],
    serverPort: item["serverPort"],
    serviceUserDistinguishedName: item["serviceUserDistinguishedName"],
    serviceUserPassword: item["serviceUserPassword"],
    searchBaseDistinguishedName: item["searchBaseDistinguishedName"],
    searchFilterTemplate: item["searchFilterTemplate"],
    serverCertificates: !item["serverCertificates"]
      ? item["serverCertificates"]
      : certificateArraySerializer(item["serverCertificates"]),
    connectionTimeoutInMs: item["connectionTimeoutInMs"],
  };
}

export function authenticationMethodLdapPropertiesDeserializer(
  item: any,
): AuthenticationMethodLdapProperties {
  return {
    serverHostname: item["serverHostname"],
    serverPort: item["serverPort"],
    serviceUserDistinguishedName: item["serviceUserDistinguishedName"],
    serviceUserPassword: item["serviceUserPassword"],
    searchBaseDistinguishedName: item["searchBaseDistinguishedName"],
    searchFilterTemplate: item["searchFilterTemplate"],
    serverCertificates: !item["serverCertificates"]
      ? item["serverCertificates"]
      : certificateArrayDeserializer(item["serverCertificates"]),
    connectionTimeoutInMs: item["connectionTimeoutInMs"],
  };
}

/** List of managed Cassandra data centers and their properties. */
export interface _ListDataCenters {
  /** Container for array of data centers. */
  readonly value?: DataCenterResource[];
  nextLink?: string;
}

export function _listDataCentersDeserializer(item: any): _ListDataCenters {
  return {
    value: !item["value"] ? item["value"] : dataCenterResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataCenterResourceArraySerializer(result: Array<DataCenterResource>): any[] {
  return result.map((item) => {
    return dataCenterResourceSerializer(item);
  });
}

export function dataCenterResourceArrayDeserializer(result: Array<DataCenterResource>): any[] {
  return result.map((item) => {
    return dataCenterResourceDeserializer(item);
  });
}

/** A Azure Cosmos DB restorable database account. */
export interface RestorableDatabaseAccountGetResult extends ProxyResource {
  /** The location of the resource group to which the resource belongs. */
  location?: string;
  /** The name of the global database account */
  accountName?: string;
  /** The creation time of the restorable database account (ISO-8601 format). */
  creationTime?: Date;
  /** The least recent time at which the database account can be restored to (ISO-8601 format). */
  oldestRestorableTime?: Date;
  /** The time at which the restorable database account has been deleted (ISO-8601 format). */
  deletionTime?: Date;
  /** The API type of the restorable database account. */
  readonly apiType?: ApiType;
  /** List of regions where the of the database account can be restored from. */
  readonly restorableLocations?: RestorableLocationResource[];
}

export function restorableDatabaseAccountGetResultDeserializer(
  item: any,
): RestorableDatabaseAccountGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _restorableDatabaseAccountGetResultPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** The properties of a restorable database account. */
export interface RestorableDatabaseAccountProperties {
  /** The name of the global database account */
  accountName?: string;
  /** The creation time of the restorable database account (ISO-8601 format). */
  creationTime?: Date;
  /** The least recent time at which the database account can be restored to (ISO-8601 format). */
  oldestRestorableTime?: Date;
  /** The time at which the restorable database account has been deleted (ISO-8601 format). */
  deletionTime?: Date;
  /** The API type of the restorable database account. */
  readonly apiType?: ApiType;
  /** List of regions where the of the database account can be restored from. */
  readonly restorableLocations?: RestorableLocationResource[];
}

export function restorableDatabaseAccountPropertiesDeserializer(
  item: any,
): RestorableDatabaseAccountProperties {
  return {
    accountName: item["accountName"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    oldestRestorableTime: !item["oldestRestorableTime"]
      ? item["oldestRestorableTime"]
      : new Date(item["oldestRestorableTime"]),
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
    apiType: item["apiType"],
    restorableLocations: !item["restorableLocations"]
      ? item["restorableLocations"]
      : restorableLocationResourceArrayDeserializer(item["restorableLocations"]),
  };
}

/** Enum to indicate the API type of the restorable database account. */
export enum KnownApiType {
  /** MongoDB */
  MongoDB = "MongoDB",
  /** Gremlin */
  Gremlin = "Gremlin",
  /** Cassandra */
  Cassandra = "Cassandra",
  /** Table */
  Table = "Table",
  /** Sql */
  Sql = "Sql",
  /** GremlinV2 */
  GremlinV2 = "GremlinV2",
}

/**
 * Enum to indicate the API type of the restorable database account. \
 * {@link KnownApiType} can be used interchangeably with ApiType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MongoDB** \
 * **Gremlin** \
 * **Cassandra** \
 * **Table** \
 * **Sql** \
 * **GremlinV2**
 */
export type ApiType = string;

export function restorableLocationResourceArrayDeserializer(
  result: Array<RestorableLocationResource>,
): any[] {
  return result.map((item) => {
    return restorableLocationResourceDeserializer(item);
  });
}

/** Properties of the regional restorable account. */
export interface RestorableLocationResource {
  /** The location of the regional restorable account. */
  readonly locationName?: string;
  /** The instance id of the regional restorable account. */
  readonly regionalDatabaseAccountInstanceId?: string;
  /** The creation time of the regional restorable database account (ISO-8601 format). */
  readonly creationTime?: Date;
  /** The time at which the regional restorable database account has been deleted (ISO-8601 format). */
  readonly deletionTime?: Date;
}

export function restorableLocationResourceDeserializer(item: any): RestorableLocationResource {
  return {
    locationName: item["locationName"],
    regionalDatabaseAccountInstanceId: item["regionalDatabaseAccountInstanceId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
  };
}

/** The List operation response, that contains the restorable database accounts and their properties. */
export interface _RestorableDatabaseAccountsListResult {
  /** List of restorable database accounts and their properties. */
  readonly value?: RestorableDatabaseAccountGetResult[];
  nextLink?: string;
}

export function _restorableDatabaseAccountsListResultDeserializer(
  item: any,
): _RestorableDatabaseAccountsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableDatabaseAccountGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableDatabaseAccountGetResultArrayDeserializer(
  result: Array<RestorableDatabaseAccountGetResult>,
): any[] {
  return result.map((item) => {
    return restorableDatabaseAccountGetResultDeserializer(item);
  });
}

/** The List operation response, that contains the SQL database events and their properties. */
export interface _RestorableSqlDatabasesListResult {
  /** List of SQL database events and their properties. */
  readonly value?: RestorableSqlDatabaseGetResult[];
  nextLink?: string;
}

export function _restorableSqlDatabasesListResultDeserializer(
  item: any,
): _RestorableSqlDatabasesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableSqlDatabaseGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableSqlDatabaseGetResultArrayDeserializer(
  result: Array<RestorableSqlDatabaseGetResult>,
): any[] {
  return result.map((item) => {
    return restorableSqlDatabaseGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB SQL database event */
export interface RestorableSqlDatabaseGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB SQL database event */
  resource?: RestorableSqlDatabasePropertiesResource;
}

export function restorableSqlDatabaseGetResultDeserializer(
  item: any,
): RestorableSqlDatabaseGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableSqlDatabaseGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB SQL database event */
export interface RestorableSqlDatabaseProperties {
  /** The resource of an Azure Cosmos DB SQL database event */
  resource?: RestorableSqlDatabasePropertiesResource;
}

export function restorableSqlDatabasePropertiesDeserializer(
  item: any,
): RestorableSqlDatabaseProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableSqlDatabasePropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB SQL database event */
export interface RestorableSqlDatabasePropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this database event. */
  readonly operationType?: OperationType;
  /** A state of this database to identify if this database is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this database can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The time when this database event happened. */
  readonly eventTimestamp?: string;
  /** The name of the SQL database. */
  readonly ownerId?: string;
  /** The resource ID of the SQL database. */
  readonly ownerResourceId?: string;
  /** Cosmos DB SQL database resource object */
  database?: RestorableSqlDatabasePropertiesResourceDatabase;
}

export function restorableSqlDatabasePropertiesResourceDeserializer(
  item: any,
): RestorableSqlDatabasePropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
    database: !item["database"]
      ? item["database"]
      : restorableSqlDatabasePropertiesResourceDatabaseDeserializer(item["database"]),
  };
}

/** Enum to indicate the operation type of the event. */
export enum KnownOperationType {
  /** Create */
  Create = "Create",
  /** Replace */
  Replace = "Replace",
  /** Delete */
  Delete = "Delete",
  /** Recreate */
  Recreate = "Recreate",
  /** SystemOperation */
  SystemOperation = "SystemOperation",
}

/**
 * Enum to indicate the operation type of the event. \
 * {@link KnownOperationType} can be used interchangeably with OperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Create** \
 * **Replace** \
 * **Delete** \
 * **Recreate** \
 * **SystemOperation**
 */
export type OperationType = string;

/** Cosmos DB SQL database resource object */
export interface RestorableSqlDatabasePropertiesResourceDatabase extends SqlDatabaseResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
  /** A system generated property that specified the addressable path of the collections resource. */
  readonly colls?: string;
  /** A system generated property that specifies the addressable path of the users resource. */
  readonly users?: string;
  /** A system generated property that specifies the addressable path of the database resource. */
  readonly self?: string;
}

export function restorableSqlDatabasePropertiesResourceDatabaseDeserializer(
  item: any,
): RestorableSqlDatabasePropertiesResourceDatabase {
  return {
    id: item["id"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
    colls: item["_colls"],
    users: item["_users"],
    self: item["_self"],
  };
}

/** The List operation response, that contains the SQL container events and their properties. */
export interface _RestorableSqlContainersListResult {
  /** List of SQL container events and their properties. */
  readonly value?: RestorableSqlContainerGetResult[];
  nextLink?: string;
}

export function _restorableSqlContainersListResultDeserializer(
  item: any,
): _RestorableSqlContainersListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableSqlContainerGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableSqlContainerGetResultArrayDeserializer(
  result: Array<RestorableSqlContainerGetResult>,
): any[] {
  return result.map((item) => {
    return restorableSqlContainerGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB SQL container event */
export interface RestorableSqlContainerGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB SQL container event */
  resource?: RestorableSqlContainerPropertiesResource;
}

export function restorableSqlContainerGetResultDeserializer(
  item: any,
): RestorableSqlContainerGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableSqlContainerGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB SQL container event */
export interface RestorableSqlContainerProperties {
  /** The resource of an Azure Cosmos DB SQL container event */
  resource?: RestorableSqlContainerPropertiesResource;
}

export function restorableSqlContainerPropertiesDeserializer(
  item: any,
): RestorableSqlContainerProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableSqlContainerPropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB SQL container event */
export interface RestorableSqlContainerPropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this container event. */
  readonly operationType?: OperationType;
  /** A state of this container to identify if this container is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this container can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The when this container event happened. */
  readonly eventTimestamp?: string;
  /** The name of this SQL container. */
  readonly ownerId?: string;
  /** The resource ID of this SQL container. */
  readonly ownerResourceId?: string;
  /** Cosmos DB SQL container resource object */
  container?: RestorableSqlContainerPropertiesResourceContainer;
}

export function restorableSqlContainerPropertiesResourceDeserializer(
  item: any,
): RestorableSqlContainerPropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
    container: !item["container"]
      ? item["container"]
      : restorableSqlContainerPropertiesResourceContainerDeserializer(item["container"]),
  };
}

/** Cosmos DB SQL container resource object */
export interface RestorableSqlContainerPropertiesResourceContainer extends SqlContainerResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** A system generated property that denotes the last updated timestamp of the resource. */
  readonly ts?: number;
  /** A system generated property representing the resource etag required for optimistic concurrency control. */
  readonly etag?: string;
  /** A system generated property that specifies the addressable path of the container resource. */
  readonly self?: string;
}

export function restorableSqlContainerPropertiesResourceContainerDeserializer(
  item: any,
): RestorableSqlContainerPropertiesResourceContainer {
  return {
    id: item["id"],
    indexingPolicy: !item["indexingPolicy"]
      ? item["indexingPolicy"]
      : indexingPolicyDeserializer(item["indexingPolicy"]),
    partitionKey: !item["partitionKey"]
      ? item["partitionKey"]
      : containerPartitionKeyDeserializer(item["partitionKey"]),
    defaultTtl: item["defaultTtl"],
    uniqueKeyPolicy: !item["uniqueKeyPolicy"]
      ? item["uniqueKeyPolicy"]
      : uniqueKeyPolicyDeserializer(item["uniqueKeyPolicy"]),
    conflictResolutionPolicy: !item["conflictResolutionPolicy"]
      ? item["conflictResolutionPolicy"]
      : conflictResolutionPolicyDeserializer(item["conflictResolutionPolicy"]),
    clientEncryptionPolicy: !item["clientEncryptionPolicy"]
      ? item["clientEncryptionPolicy"]
      : clientEncryptionPolicyDeserializer(item["clientEncryptionPolicy"]),
    analyticalStorageTtl: item["analyticalStorageTtl"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : resourceRestoreParametersDeserializer(item["restoreParameters"]),
    createMode: item["createMode"],
    computedProperties: !item["computedProperties"]
      ? item["computedProperties"]
      : computedPropertyArrayDeserializer(item["computedProperties"]),
    vectorEmbeddingPolicy: !item["vectorEmbeddingPolicy"]
      ? item["vectorEmbeddingPolicy"]
      : vectorEmbeddingPolicyDeserializer(item["vectorEmbeddingPolicy"]),
    fullTextPolicy: !item["fullTextPolicy"]
      ? item["fullTextPolicy"]
      : fullTextPolicyDeserializer(item["fullTextPolicy"]),
    rid: item["_rid"],
    ts: item["_ts"],
    etag: item["_etag"],
    self: item["_self"],
  };
}

/** The List operation response, that contains the restorable SQL resources. */
export interface _RestorableSqlResourcesListResult {
  /** List of restorable SQL resources, including the database and collection names. */
  readonly value?: RestorableSqlResourcesGetResult[];
  nextLink?: string;
}

export function _restorableSqlResourcesListResultDeserializer(
  item: any,
): _RestorableSqlResourcesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableSqlResourcesGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableSqlResourcesGetResultArrayDeserializer(
  result: Array<RestorableSqlResourcesGetResult>,
): any[] {
  return result.map((item) => {
    return restorableSqlResourcesGetResultDeserializer(item);
  });
}

/** Specific Databases to restore. */
export interface RestorableSqlResourcesGetResult {
  /** The unique resource identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The name of the database available for restore. */
  databaseName?: string;
  /** The names of the collections available for restore. */
  collectionNames?: string[];
}

export function restorableSqlResourcesGetResultDeserializer(
  item: any,
): RestorableSqlResourcesGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    databaseName: item["databaseName"],
    collectionNames: !item["collectionNames"]
      ? item["collectionNames"]
      : item["collectionNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The List operation response, that contains the MongoDB database events and their properties. */
export interface _RestorableMongodbDatabasesListResult {
  /** List of MongoDB database events and their properties. */
  readonly value?: RestorableMongodbDatabaseGetResult[];
  nextLink?: string;
}

export function _restorableMongodbDatabasesListResultDeserializer(
  item: any,
): _RestorableMongodbDatabasesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableMongodbDatabaseGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableMongodbDatabaseGetResultArrayDeserializer(
  result: Array<RestorableMongodbDatabaseGetResult>,
): any[] {
  return result.map((item) => {
    return restorableMongodbDatabaseGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB MongoDB database event */
export interface RestorableMongodbDatabaseGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB MongoDB database event */
  resource?: RestorableMongodbDatabasePropertiesResource;
}

export function restorableMongodbDatabaseGetResultDeserializer(
  item: any,
): RestorableMongodbDatabaseGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableMongodbDatabaseGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB MongoDB database event */
export interface RestorableMongodbDatabaseProperties {
  /** The resource of an Azure Cosmos DB MongoDB database event */
  resource?: RestorableMongodbDatabasePropertiesResource;
}

export function restorableMongodbDatabasePropertiesDeserializer(
  item: any,
): RestorableMongodbDatabaseProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableMongodbDatabasePropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB MongoDB database event */
export interface RestorableMongodbDatabasePropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this database event. */
  readonly operationType?: OperationType;
  /** A state of this database to identify if this database is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this database can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The time when this database event happened. */
  readonly eventTimestamp?: string;
  /** The name of this MongoDB database. */
  readonly ownerId?: string;
  /** The resource ID of this MongoDB database. */
  readonly ownerResourceId?: string;
}

export function restorableMongodbDatabasePropertiesResourceDeserializer(
  item: any,
): RestorableMongodbDatabasePropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
  };
}

/** The List operation response, that contains the MongoDB collection events and their properties. */
export interface _RestorableMongodbCollectionsListResult {
  /** List of MongoDB collection events and their properties. */
  readonly value?: RestorableMongodbCollectionGetResult[];
  nextLink?: string;
}

export function _restorableMongodbCollectionsListResultDeserializer(
  item: any,
): _RestorableMongodbCollectionsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableMongodbCollectionGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableMongodbCollectionGetResultArrayDeserializer(
  result: Array<RestorableMongodbCollectionGetResult>,
): any[] {
  return result.map((item) => {
    return restorableMongodbCollectionGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB MongoDB collection event */
export interface RestorableMongodbCollectionGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB MongoDB collection event */
  resource?: RestorableMongodbCollectionPropertiesResource;
}

export function restorableMongodbCollectionGetResultDeserializer(
  item: any,
): RestorableMongodbCollectionGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableMongodbCollectionGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB MongoDB collection event */
export interface RestorableMongodbCollectionProperties {
  /** The resource of an Azure Cosmos DB MongoDB collection event */
  resource?: RestorableMongodbCollectionPropertiesResource;
}

export function restorableMongodbCollectionPropertiesDeserializer(
  item: any,
): RestorableMongodbCollectionProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableMongodbCollectionPropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB MongoDB collection event */
export interface RestorableMongodbCollectionPropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this collection event. */
  readonly operationType?: OperationType;
  /** A state of this collection to identify if this container is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this collection can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The time when this collection event happened. */
  readonly eventTimestamp?: string;
  /** The name of this MongoDB collection. */
  readonly ownerId?: string;
  /** The resource ID of this MongoDB collection. */
  readonly ownerResourceId?: string;
}

export function restorableMongodbCollectionPropertiesResourceDeserializer(
  item: any,
): RestorableMongodbCollectionPropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
  };
}

/** The List operation response, that contains the restorable MongoDB resources. */
export interface _RestorableMongodbResourcesListResult {
  /** List of restorable MongoDB resources, including the database and collection names. */
  readonly value?: RestorableMongodbResourcesGetResult[];
  nextLink?: string;
}

export function _restorableMongodbResourcesListResultDeserializer(
  item: any,
): _RestorableMongodbResourcesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableMongodbResourcesGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableMongodbResourcesGetResultArrayDeserializer(
  result: Array<RestorableMongodbResourcesGetResult>,
): any[] {
  return result.map((item) => {
    return restorableMongodbResourcesGetResultDeserializer(item);
  });
}

/** Specific Databases to restore. */
export interface RestorableMongodbResourcesGetResult {
  /** The unique resource identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The name of the database available for restore. */
  databaseName?: string;
  /** The names of the collections available for restore. */
  collectionNames?: string[];
}

export function restorableMongodbResourcesGetResultDeserializer(
  item: any,
): RestorableMongodbResourcesGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    databaseName: item["databaseName"],
    collectionNames: !item["collectionNames"]
      ? item["collectionNames"]
      : item["collectionNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The List operation response, that contains the Gremlin database events and their properties. */
export interface _RestorableGremlinDatabasesListResult {
  /** List of Gremlin database events and their properties. */
  readonly value?: RestorableGremlinDatabaseGetResult[];
  nextLink?: string;
}

export function _restorableGremlinDatabasesListResultDeserializer(
  item: any,
): _RestorableGremlinDatabasesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableGremlinDatabaseGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableGremlinDatabaseGetResultArrayDeserializer(
  result: Array<RestorableGremlinDatabaseGetResult>,
): any[] {
  return result.map((item) => {
    return restorableGremlinDatabaseGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB Gremlin database event */
export interface RestorableGremlinDatabaseGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB Gremlin database event */
  resource?: RestorableGremlinDatabasePropertiesResource;
}

export function restorableGremlinDatabaseGetResultDeserializer(
  item: any,
): RestorableGremlinDatabaseGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableGremlinDatabaseGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB Gremlin database event */
export interface RestorableGremlinDatabaseProperties {
  /** The resource of an Azure Cosmos DB Gremlin database event */
  resource?: RestorableGremlinDatabasePropertiesResource;
}

export function restorableGremlinDatabasePropertiesDeserializer(
  item: any,
): RestorableGremlinDatabaseProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableGremlinDatabasePropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB Gremlin database event */
export interface RestorableGremlinDatabasePropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this database event. */
  readonly operationType?: OperationType;
  /** A state of this database to identify if this database is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this database can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The time when this database event happened. */
  readonly eventTimestamp?: string;
  /** The name of this Gremlin database. */
  readonly ownerId?: string;
  /** The resource ID of this Gremlin database. */
  readonly ownerResourceId?: string;
}

export function restorableGremlinDatabasePropertiesResourceDeserializer(
  item: any,
): RestorableGremlinDatabasePropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
  };
}

/** The List operation response, that contains the Gremlin graph events and their properties. */
export interface _RestorableGremlinGraphsListResult {
  /** List of Gremlin graph events and their properties. */
  readonly value?: RestorableGremlinGraphGetResult[];
  nextLink?: string;
}

export function _restorableGremlinGraphsListResultDeserializer(
  item: any,
): _RestorableGremlinGraphsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableGremlinGraphGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableGremlinGraphGetResultArrayDeserializer(
  result: Array<RestorableGremlinGraphGetResult>,
): any[] {
  return result.map((item) => {
    return restorableGremlinGraphGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB Gremlin graph event */
export interface RestorableGremlinGraphGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB Gremlin graph event */
  resource?: RestorableGremlinGraphPropertiesResource;
}

export function restorableGremlinGraphGetResultDeserializer(
  item: any,
): RestorableGremlinGraphGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableGremlinGraphGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB Gremlin graph event */
export interface RestorableGremlinGraphProperties {
  /** The resource of an Azure Cosmos DB Gremlin graph event */
  resource?: RestorableGremlinGraphPropertiesResource;
}

export function restorableGremlinGraphPropertiesDeserializer(
  item: any,
): RestorableGremlinGraphProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableGremlinGraphPropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB Gremlin graph event */
export interface RestorableGremlinGraphPropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this graph event. */
  readonly operationType?: OperationType;
  /** A state of this graph to identify if this graph is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this graph can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The time when this graph event happened. */
  readonly eventTimestamp?: string;
  /** The name of this Gremlin graph. */
  readonly ownerId?: string;
  /** The resource ID of this Gremlin graph. */
  readonly ownerResourceId?: string;
}

export function restorableGremlinGraphPropertiesResourceDeserializer(
  item: any,
): RestorableGremlinGraphPropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
  };
}

/** The List operation response, that contains the restorable Gremlin resources. */
export interface _RestorableGremlinResourcesListResult {
  /** List of restorable Gremlin resources, including the gremlin database and graph names. */
  readonly value?: RestorableGremlinResourcesGetResult[];
  nextLink?: string;
}

export function _restorableGremlinResourcesListResultDeserializer(
  item: any,
): _RestorableGremlinResourcesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableGremlinResourcesGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableGremlinResourcesGetResultArrayDeserializer(
  result: Array<RestorableGremlinResourcesGetResult>,
): any[] {
  return result.map((item) => {
    return restorableGremlinResourcesGetResultDeserializer(item);
  });
}

/** Specific Databases to restore. */
export interface RestorableGremlinResourcesGetResult {
  /** The unique resource identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The name of the gremlin database available for restore. */
  databaseName?: string;
  /** The names of the graphs available for restore. */
  graphNames?: string[];
}

export function restorableGremlinResourcesGetResultDeserializer(
  item: any,
): RestorableGremlinResourcesGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    databaseName: item["databaseName"],
    graphNames: !item["graphNames"]
      ? item["graphNames"]
      : item["graphNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The List operation response, that contains the Table events and their properties. */
export interface _RestorableTablesListResult {
  /** List of Table events and their properties. */
  readonly value?: RestorableTableGetResult[];
  nextLink?: string;
}

export function _restorableTablesListResultDeserializer(item: any): _RestorableTablesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableTableGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableTableGetResultArrayDeserializer(
  result: Array<RestorableTableGetResult>,
): any[] {
  return result.map((item) => {
    return restorableTableGetResultDeserializer(item);
  });
}

/** An Azure Cosmos DB Table event */
export interface RestorableTableGetResult {
  /** The unique resource Identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the ARM resource. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
  /** The resource of an Azure Cosmos DB Table event */
  resource?: RestorableTablePropertiesResource;
}

export function restorableTableGetResultDeserializer(item: any): RestorableTableGetResult {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _restorableTableGetResultPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The properties of an Azure Cosmos DB Table event */
export interface RestorableTableProperties {
  /** The resource of an Azure Cosmos DB Table event */
  resource?: RestorableTablePropertiesResource;
}

export function restorableTablePropertiesDeserializer(item: any): RestorableTableProperties {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableTablePropertiesResourceDeserializer(item["resource"]),
  };
}

/** The resource of an Azure Cosmos DB Table event */
export interface RestorableTablePropertiesResource {
  /** A system generated property. A unique identifier. */
  readonly rid?: string;
  /** The operation type of this table event. */
  readonly operationType?: OperationType;
  /** A state of this table to identify if this table is restorable in same account. */
  readonly canUndelete?: string;
  /** The reason why this table can not be restored in same account. */
  readonly canUndeleteReason?: string;
  /** The time when this table event happened. */
  readonly eventTimestamp?: string;
  /** The name of this Table. */
  readonly ownerId?: string;
  /** The resource ID of this Table. */
  readonly ownerResourceId?: string;
}

export function restorableTablePropertiesResourceDeserializer(
  item: any,
): RestorableTablePropertiesResource {
  return {
    rid: item["_rid"],
    operationType: item["operationType"],
    canUndelete: item["canUndelete"],
    canUndeleteReason: item["canUndeleteReason"],
    eventTimestamp: item["eventTimestamp"],
    ownerId: item["ownerId"],
    ownerResourceId: item["ownerResourceId"],
  };
}

/** List of restorable table names. */
export interface _RestorableTableResourcesListResult {
  /** List of restorable table names. */
  readonly value?: RestorableTableResourcesGetResult[];
  nextLink?: string;
}

export function _restorableTableResourcesListResultDeserializer(
  item: any,
): _RestorableTableResourcesListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : restorableTableResourcesGetResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorableTableResourcesGetResultArrayDeserializer(
  result: Array<RestorableTableResourcesGetResult>,
): any[] {
  return result.map((item) => {
    return restorableTableResourcesGetResultDeserializer(item);
  });
}

/** Specific Databases to restore. */
export interface RestorableTableResourcesGetResult {
  /** The unique resource identifier of the ARM resource. */
  readonly id?: string;
  /** The name of the Table. */
  readonly name?: string;
  /** The type of Azure resource. */
  readonly type?: string;
}

export function restorableTableResourcesGetResultDeserializer(
  item: any,
): RestorableTableResourcesGetResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** Properties for the database account. */
export interface ServiceResource extends ProxyResource {
  /** Services response resource. */
  properties?: ServiceResourcePropertiesUnion;
}

export function serviceResourceDeserializer(item: any): ServiceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourcePropertiesUnionDeserializer(item["properties"]),
  };
}

/** Services response resource. */
export interface ServiceResourceProperties {
  /** Time of the last state change (ISO-8601 format). */
  readonly creationTime?: Date;
  /** Instance type for the service. */
  instanceSize?: ServiceSize;
  /** Instance count for the service. */
  instanceCount?: number;
  /** ServiceType for the service. */
  /** The discriminator possible values: DataTransfer, SqlDedicatedGateway, GraphAPICompute, MaterializedViewsBuilder */
  serviceType: ServiceType;
  /** Describes the status of a service. */
  readonly status?: ServiceStatus;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function serviceResourcePropertiesDeserializer(item: any): ServiceResourceProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "creationTime",
      "instanceSize",
      "instanceCount",
      "serviceType",
      "status",
    ]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
    status: item["status"],
  };
}

/** Alias for ServiceResourcePropertiesUnion */
export type ServiceResourcePropertiesUnion =
  | DataTransferServiceResourceProperties
  | SqlDedicatedGatewayServiceResourceProperties
  | GraphAPIComputeServiceResourceProperties
  | MaterializedViewsBuilderServiceResourceProperties
  | ServiceResourceProperties;

export function serviceResourcePropertiesUnionDeserializer(
  item: any,
): ServiceResourcePropertiesUnion {
  switch (item["serviceType"]) {
    case "DataTransfer":
      return dataTransferServiceResourcePropertiesDeserializer(
        item as DataTransferServiceResourceProperties,
      );

    case "SqlDedicatedGateway":
      return sqlDedicatedGatewayServiceResourcePropertiesDeserializer(
        item as SqlDedicatedGatewayServiceResourceProperties,
      );

    case "GraphAPICompute":
      return graphAPIComputeServiceResourcePropertiesDeserializer(
        item as GraphAPIComputeServiceResourceProperties,
      );

    case "MaterializedViewsBuilder":
      return materializedViewsBuilderServiceResourcePropertiesDeserializer(
        item as MaterializedViewsBuilderServiceResourceProperties,
      );

    default:
      return serviceResourcePropertiesDeserializer(item);
  }
}

/** Instance type for the service. */
export enum KnownServiceSize {
  /** Cosmos.D4s */
  CosmosD4S = "Cosmos.D4s",
  /** Cosmos.D8s */
  CosmosD8S = "Cosmos.D8s",
  /** Cosmos.D16s */
  CosmosD16S = "Cosmos.D16s",
}

/**
 * Instance type for the service. \
 * {@link KnownServiceSize} can be used interchangeably with ServiceSize,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cosmos.D4s** \
 * **Cosmos.D8s** \
 * **Cosmos.D16s**
 */
export type ServiceSize = string;

/** ServiceType for the service. */
export enum KnownServiceType {
  /** SqlDedicatedGateway */
  SqlDedicatedGateway = "SqlDedicatedGateway",
  /** DataTransfer */
  DataTransfer = "DataTransfer",
  /** GraphAPICompute */
  GraphAPICompute = "GraphAPICompute",
  /** MaterializedViewsBuilder */
  MaterializedViewsBuilder = "MaterializedViewsBuilder",
}

/**
 * ServiceType for the service. \
 * {@link KnownServiceType} can be used interchangeably with ServiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlDedicatedGateway** \
 * **DataTransfer** \
 * **GraphAPICompute** \
 * **MaterializedViewsBuilder**
 */
export type ServiceType = string;

/** Describes the status of a service. */
export enum KnownServiceStatus {
  /** Creating */
  Creating = "Creating",
  /** Running */
  Running = "Running",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Error */
  Error = "Error",
  /** Stopped */
  Stopped = "Stopped",
}

/**
 * Describes the status of a service. \
 * {@link KnownServiceStatus} can be used interchangeably with ServiceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Running** \
 * **Updating** \
 * **Deleting** \
 * **Error** \
 * **Stopped**
 */
export type ServiceStatus = string;

/** Properties for DataTransferServiceResource. */
export interface DataTransferServiceResourceProperties extends ServiceResourceProperties {
  /** An array that contains all of the locations for the service. */
  readonly locations?: DataTransferRegionalServiceResource[];
  /** ServiceType for the service. */
  serviceType: "DataTransfer";
}

export function dataTransferServiceResourcePropertiesDeserializer(
  item: any,
): DataTransferServiceResourceProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "creationTime",
      "instanceSize",
      "instanceCount",
      "serviceType",
      "status",
      "locations",
    ]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
    status: item["status"],
    locations: !item["locations"]
      ? item["locations"]
      : dataTransferRegionalServiceResourceArrayDeserializer(item["locations"]),
  };
}

export function dataTransferRegionalServiceResourceArrayDeserializer(
  result: Array<DataTransferRegionalServiceResource>,
): any[] {
  return result.map((item) => {
    return dataTransferRegionalServiceResourceDeserializer(item);
  });
}

/** Resource for a regional service location. */
export interface DataTransferRegionalServiceResource extends RegionalServiceResource {}

export function dataTransferRegionalServiceResourceDeserializer(
  item: any,
): DataTransferRegionalServiceResource {
  return {
    name: item["name"],
    location: item["location"],
    status: item["status"],
  };
}

/** Properties for SqlDedicatedGatewayServiceResource. */
export interface SqlDedicatedGatewayServiceResourceProperties extends ServiceResourceProperties {
  /** SqlDedicatedGateway endpoint for the service. */
  sqlDedicatedGatewayEndpoint?: string;
  /** DedicatedGatewayType for the service. */
  dedicatedGatewayType?: DedicatedGatewayType;
  /** An array that contains all of the locations for the service. */
  readonly locations?: SqlDedicatedGatewayRegionalServiceResource[];
  /** ServiceType for the service. */
  serviceType: "SqlDedicatedGateway";
}

export function sqlDedicatedGatewayServiceResourcePropertiesDeserializer(
  item: any,
): SqlDedicatedGatewayServiceResourceProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "creationTime",
      "instanceSize",
      "instanceCount",
      "serviceType",
      "status",
      "sqlDedicatedGatewayEndpoint",
      "dedicatedGatewayType",
      "locations",
    ]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
    status: item["status"],
    sqlDedicatedGatewayEndpoint: item["sqlDedicatedGatewayEndpoint"],
    dedicatedGatewayType: item["dedicatedGatewayType"],
    locations: !item["locations"]
      ? item["locations"]
      : sqlDedicatedGatewayRegionalServiceResourceArrayDeserializer(item["locations"]),
  };
}

/** DedicatedGatewayType for the service. */
export enum KnownDedicatedGatewayType {
  /** IntegratedCache */
  IntegratedCache = "IntegratedCache",
  /** DistributedQuery */
  DistributedQuery = "DistributedQuery",
}

/**
 * DedicatedGatewayType for the service. \
 * {@link KnownDedicatedGatewayType} can be used interchangeably with DedicatedGatewayType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IntegratedCache** \
 * **DistributedQuery**
 */
export type DedicatedGatewayType = string;

export function sqlDedicatedGatewayRegionalServiceResourceArrayDeserializer(
  result: Array<SqlDedicatedGatewayRegionalServiceResource>,
): any[] {
  return result.map((item) => {
    return sqlDedicatedGatewayRegionalServiceResourceDeserializer(item);
  });
}

/** Resource for a regional service location. */
export interface SqlDedicatedGatewayRegionalServiceResource extends RegionalServiceResource {
  /** The regional endpoint for SqlDedicatedGateway. */
  readonly sqlDedicatedGatewayEndpoint?: string;
}

export function sqlDedicatedGatewayRegionalServiceResourceDeserializer(
  item: any,
): SqlDedicatedGatewayRegionalServiceResource {
  return {
    name: item["name"],
    location: item["location"],
    status: item["status"],
    sqlDedicatedGatewayEndpoint: item["sqlDedicatedGatewayEndpoint"],
  };
}

/** Properties for GraphAPIComputeServiceResource. */
export interface GraphAPIComputeServiceResourceProperties extends ServiceResourceProperties {
  /** GraphAPICompute endpoint for the service. */
  graphApiComputeEndpoint?: string;
  /** An array that contains all of the locations for the service. */
  readonly locations?: GraphAPIComputeRegionalServiceResource[];
  /** ServiceType for the service. */
  serviceType: "GraphAPICompute";
}

export function graphAPIComputeServiceResourcePropertiesDeserializer(
  item: any,
): GraphAPIComputeServiceResourceProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "creationTime",
      "instanceSize",
      "instanceCount",
      "serviceType",
      "status",
      "graphApiComputeEndpoint",
      "locations",
    ]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
    status: item["status"],
    graphApiComputeEndpoint: item["graphApiComputeEndpoint"],
    locations: !item["locations"]
      ? item["locations"]
      : graphAPIComputeRegionalServiceResourceArrayDeserializer(item["locations"]),
  };
}

export function graphAPIComputeRegionalServiceResourceArrayDeserializer(
  result: Array<GraphAPIComputeRegionalServiceResource>,
): any[] {
  return result.map((item) => {
    return graphAPIComputeRegionalServiceResourceDeserializer(item);
  });
}

/** Resource for a regional service location. */
export interface GraphAPIComputeRegionalServiceResource extends RegionalServiceResource {
  /** The regional endpoint for GraphAPICompute. */
  readonly graphApiComputeEndpoint?: string;
}

export function graphAPIComputeRegionalServiceResourceDeserializer(
  item: any,
): GraphAPIComputeRegionalServiceResource {
  return {
    name: item["name"],
    location: item["location"],
    status: item["status"],
    graphApiComputeEndpoint: item["graphApiComputeEndpoint"],
  };
}

/** Properties for MaterializedViewsBuilderServiceResource. */
export interface MaterializedViewsBuilderServiceResourceProperties extends ServiceResourceProperties {
  /** An array that contains all of the locations for the service. */
  readonly locations?: MaterializedViewsBuilderRegionalServiceResource[];
  /** ServiceType for the service. */
  serviceType: "MaterializedViewsBuilder";
}

export function materializedViewsBuilderServiceResourcePropertiesDeserializer(
  item: any,
): MaterializedViewsBuilderServiceResourceProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "creationTime",
      "instanceSize",
      "instanceCount",
      "serviceType",
      "status",
      "locations",
    ]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
    status: item["status"],
    locations: !item["locations"]
      ? item["locations"]
      : materializedViewsBuilderRegionalServiceResourceArrayDeserializer(item["locations"]),
  };
}

export function materializedViewsBuilderRegionalServiceResourceArrayDeserializer(
  result: Array<MaterializedViewsBuilderRegionalServiceResource>,
): any[] {
  return result.map((item) => {
    return materializedViewsBuilderRegionalServiceResourceDeserializer(item);
  });
}

/** Resource for a regional service location. */
export interface MaterializedViewsBuilderRegionalServiceResource extends RegionalServiceResource {}

export function materializedViewsBuilderRegionalServiceResourceDeserializer(
  item: any,
): MaterializedViewsBuilderRegionalServiceResource {
  return {
    name: item["name"],
    location: item["location"],
    status: item["status"],
  };
}

/** Resource for a regional service location. */
export interface RegionalServiceResource {
  /** The regional service name. */
  readonly name?: string;
  /** The location name. */
  readonly location?: string;
  /** Describes the status of a service. */
  readonly status?: ServiceStatus;
}

export function regionalServiceResourceDeserializer(item: any): RegionalServiceResource {
  return {
    name: item["name"],
    location: item["location"],
    status: item["status"],
  };
}

/** Parameters for Create or Update request for ServiceResource */
export interface ServiceResourceCreateUpdateParameters {
  /** Properties in ServiceResourceCreateUpdateParameters. */
  properties?: ServiceResourceCreateUpdatePropertiesUnion;
}

export function serviceResourceCreateUpdateParametersSerializer(
  item: ServiceResourceCreateUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourceCreateUpdatePropertiesUnionSerializer(item["properties"]),
  };
}

/** Properties in ServiceResourceCreateUpdateParameters. */
export interface ServiceResourceCreateUpdateProperties {
  /** Instance type for the service. */
  instanceSize?: ServiceSize;
  /** Instance count for the service. */
  instanceCount?: number;
  /** ServiceType for the service. */
  /** The discriminator possible values: DataTransfer, SqlDedicatedGateway, GraphAPICompute, MaterializedViewsBuilder */
  serviceType: ServiceType;
}

export function serviceResourceCreateUpdatePropertiesSerializer(
  item: ServiceResourceCreateUpdateProperties,
): any {
  return {
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
  };
}

/** Alias for ServiceResourceCreateUpdatePropertiesUnion */
export type ServiceResourceCreateUpdatePropertiesUnion =
  | DataTransferServiceResourceCreateUpdateProperties
  | SqlDedicatedGatewayServiceResourceCreateUpdateProperties
  | GraphAPIComputeServiceResourceCreateUpdateProperties
  | MaterializedViewsBuilderServiceResourceCreateUpdateProperties
  | ServiceResourceCreateUpdateProperties;

export function serviceResourceCreateUpdatePropertiesUnionSerializer(
  item: ServiceResourceCreateUpdatePropertiesUnion,
): any {
  switch (item.serviceType) {
    case "DataTransfer":
      return dataTransferServiceResourceCreateUpdatePropertiesSerializer(
        item as DataTransferServiceResourceCreateUpdateProperties,
      );

    case "SqlDedicatedGateway":
      return sqlDedicatedGatewayServiceResourceCreateUpdatePropertiesSerializer(
        item as SqlDedicatedGatewayServiceResourceCreateUpdateProperties,
      );

    case "GraphAPICompute":
      return graphAPIComputeServiceResourceCreateUpdatePropertiesSerializer(
        item as GraphAPIComputeServiceResourceCreateUpdateProperties,
      );

    case "MaterializedViewsBuilder":
      return materializedViewsBuilderServiceResourceCreateUpdatePropertiesSerializer(
        item as MaterializedViewsBuilderServiceResourceCreateUpdateProperties,
      );

    default:
      return serviceResourceCreateUpdatePropertiesSerializer(item);
  }
}

/** Properties for Create or Update request for DataTransferServiceResource */
export interface DataTransferServiceResourceCreateUpdateProperties extends ServiceResourceCreateUpdateProperties {
  /** ServiceType for the service. */
  serviceType: "DataTransfer";
}

export function dataTransferServiceResourceCreateUpdatePropertiesSerializer(
  item: DataTransferServiceResourceCreateUpdateProperties,
): any {
  return {
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
  };
}

/** Properties for Create or Update request for SqlDedicatedGatewayServiceResource */
export interface SqlDedicatedGatewayServiceResourceCreateUpdateProperties extends ServiceResourceCreateUpdateProperties {
  /** DedicatedGatewayType for the service. */
  dedicatedGatewayType?: DedicatedGatewayType;
  /** ServiceType for the service. */
  serviceType: "SqlDedicatedGateway";
}

export function sqlDedicatedGatewayServiceResourceCreateUpdatePropertiesSerializer(
  item: SqlDedicatedGatewayServiceResourceCreateUpdateProperties,
): any {
  return {
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
    dedicatedGatewayType: item["dedicatedGatewayType"],
  };
}

/** Properties for Create or Update request for GraphAPIComputeServiceResource */
export interface GraphAPIComputeServiceResourceCreateUpdateProperties extends ServiceResourceCreateUpdateProperties {
  /** ServiceType for the service. */
  serviceType: "GraphAPICompute";
}

export function graphAPIComputeServiceResourceCreateUpdatePropertiesSerializer(
  item: GraphAPIComputeServiceResourceCreateUpdateProperties,
): any {
  return {
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
  };
}

/** Properties for Create or Update request for MaterializedViewsBuilderServiceResource */
export interface MaterializedViewsBuilderServiceResourceCreateUpdateProperties extends ServiceResourceCreateUpdateProperties {
  /** ServiceType for the service. */
  serviceType: "MaterializedViewsBuilder";
}

export function materializedViewsBuilderServiceResourceCreateUpdatePropertiesSerializer(
  item: MaterializedViewsBuilderServiceResourceCreateUpdateProperties,
): any {
  return {
    instanceSize: item["instanceSize"],
    instanceCount: item["instanceCount"],
    serviceType: item["serviceType"],
  };
}

/** The List operation response, that contains the Service Resource and their properties. */
export interface _ServiceResourceListResult {
  /** List of Service Resource and their properties. */
  readonly value?: ServiceResource[];
  nextLink?: string;
}

export function _serviceResourceListResultDeserializer(item: any): _ServiceResourceListResult {
  return {
    value: !item["value"] ? item["value"] : serviceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serviceResourceArrayDeserializer(result: Array<ServiceResource>): any[] {
  return result.map((item) => {
    return serviceResourceDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB MongoMI Role Definition. */
export interface MongoMIRoleDefinitionResource extends ProxyResource {
  /** The path id for the Role Definition. */
  idPropertiesId?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  typePropertiesType?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which MongoMI Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function mongoMIRoleDefinitionResourceSerializer(item: MongoMIRoleDefinitionResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "id",
      "roleName",
      "type",
      "assignableScopes",
      "permissions",
    ])
      ? undefined
      : _mongoMIRoleDefinitionResourcePropertiesSerializer(item),
  };
}

export function mongoMIRoleDefinitionResourceDeserializer(
  item: any,
): MongoMIRoleDefinitionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mongoMIRoleDefinitionResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB MongoMI Role Definition resource object. */
export interface MongoMIRoleDefinitionResourceProperties {
  /** The path id for the Role Definition. */
  id?: string;
  /** A user-friendly name for the Role Definition. Must be unique for the database account. */
  roleName?: string;
  /** Indicates whether the Role Definition was built-in or user created. */
  type?: RoleDefinitionType;
  /** A set of fully qualified Scopes at or below which MongoMI Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist. */
  assignableScopes?: string[];
  /** The set of operations allowed through this Role Definition. */
  permissions?: Permission[];
}

export function mongoMIRoleDefinitionResourcePropertiesSerializer(
  item: MongoMIRoleDefinitionResourceProperties,
): any {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function mongoMIRoleDefinitionResourcePropertiesDeserializer(
  item: any,
): MongoMIRoleDefinitionResourceProperties {
  return {
    id: item["id"],
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

/** The response of a MongoMIRoleDefinitionResource list operation. */
export interface _MongoMIRoleDefinitionListResult {
  /** The MongoMIRoleDefinitionResource items on this page */
  value: MongoMIRoleDefinitionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mongoMIRoleDefinitionListResultDeserializer(
  item: any,
): _MongoMIRoleDefinitionListResult {
  return {
    value: mongoMIRoleDefinitionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoMIRoleDefinitionResourceArraySerializer(
  result: Array<MongoMIRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return mongoMIRoleDefinitionResourceSerializer(item);
  });
}

export function mongoMIRoleDefinitionResourceArrayDeserializer(
  result: Array<MongoMIRoleDefinitionResource>,
): any[] {
  return result.map((item) => {
    return mongoMIRoleDefinitionResourceDeserializer(item);
  });
}

/** Parameters to create and update an Azure Cosmos DB MongoMI Role Assignment. */
export interface MongoMIRoleAssignmentResource extends ProxyResource {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this MongoMI Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this MongoMI Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function mongoMIRoleAssignmentResourceSerializer(item: MongoMIRoleAssignmentResource): any {
  return {
    properties: areAllPropsUndefined(item, ["roleDefinitionId", "scope", "principalId"])
      ? undefined
      : _mongoMIRoleAssignmentResourcePropertiesSerializer(item),
  };
}

export function mongoMIRoleAssignmentResourceDeserializer(
  item: any,
): MongoMIRoleAssignmentResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mongoMIRoleAssignmentResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Azure Cosmos DB MongoMI Role Assignment resource object. */
export interface MongoMIRoleAssignmentResourceProperties {
  /** The unique identifier for the associated Role Definition. */
  roleDefinitionId?: string;
  /** The data plane resource path for which access is being granted through this MongoMI Role Assignment. */
  scope?: string;
  /** The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this MongoMI Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription. */
  principalId?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: string;
}

export function mongoMIRoleAssignmentResourcePropertiesSerializer(
  item: MongoMIRoleAssignmentResourceProperties,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function mongoMIRoleAssignmentResourcePropertiesDeserializer(
  item: any,
): MongoMIRoleAssignmentResourceProperties {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a MongoMIRoleAssignmentResource list operation. */
export interface _MongoMIRoleAssignmentListResult {
  /** The MongoMIRoleAssignmentResource items on this page */
  value: MongoMIRoleAssignmentResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mongoMIRoleAssignmentListResultDeserializer(
  item: any,
): _MongoMIRoleAssignmentListResult {
  return {
    value: mongoMIRoleAssignmentResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoMIRoleAssignmentResourceArraySerializer(
  result: Array<MongoMIRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return mongoMIRoleAssignmentResourceSerializer(item);
  });
}

export function mongoMIRoleAssignmentResourceArrayDeserializer(
  result: Array<MongoMIRoleAssignmentResource>,
): any[] {
  return result.map((item) => {
    return mongoMIRoleAssignmentResourceDeserializer(item);
  });
}

/** An Azure Cosmos DB FleetResource. */
export interface FleetResource extends TrackedResource {
  /** A provisioning state of the Fleet. */
  readonly provisioningState?: Status;
}

export function fleetResourceSerializer(item: FleetResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _fleetResourcePropertiesSerializer(item),
  };
}

export function fleetResourceDeserializer(item: any): FleetResource {
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
      : _fleetResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties to update Azure Cosmos DB fleet resource. */
export interface FleetResourceProperties {
  /** A provisioning state of the Fleet. */
  readonly provisioningState?: Status;
}

export function fleetResourcePropertiesSerializer(_item: FleetResourceProperties): any {
  return {};
}

export function fleetResourcePropertiesDeserializer(item: any): FleetResourceProperties {
  return {
    provisioningState: item["provisioningState"],
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

/** Represents a fleet resource for updates. */
export interface FleetResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** A provisioning state of the Fleet. */
  readonly provisioningState?: Status;
}

export function fleetResourceUpdateSerializer(item: FleetResourceUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _fleetResourceUpdatePropertiesSerializer(item),
  };
}

/** The response of a FleetResource list operation. */
export interface _FleetListResult {
  /** The FleetResource items on this page */
  value: FleetResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetListResultDeserializer(item: any): _FleetListResult {
  return {
    value: fleetResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetResourceArraySerializer(result: Array<FleetResource>): any[] {
  return result.map((item) => {
    return fleetResourceSerializer(item);
  });
}

export function fleetResourceArrayDeserializer(result: Array<FleetResource>): any[] {
  return result.map((item) => {
    return fleetResourceDeserializer(item);
  });
}

/** An Azure Cosmos DB Fleetspace. */
export interface FleetspaceResource extends ProxyResource {
  /** A provisioning state of the Fleetspace. */
  readonly provisioningState?: Status;
  /** The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL' */
  fleetspaceApiKind?: FleetspacePropertiesFleetspaceApiKind;
  /** Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region. */
  serviceTier?: FleetspacePropertiesServiceTier;
  /** List of data regions assigned to the fleetspace. Eg [westus2] */
  dataRegions?: string[];
  /** Configuration for throughput pool in the fleetspace. */
  throughputPoolConfiguration?: FleetspacePropertiesThroughputPoolConfiguration;
}

export function fleetspaceResourceSerializer(item: FleetspaceResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "fleetspaceApiKind",
      "serviceTier",
      "dataRegions",
      "throughputPoolConfiguration",
    ])
      ? undefined
      : _fleetspaceResourcePropertiesSerializer(item),
  };
}

export function fleetspaceResourceDeserializer(item: any): FleetspaceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fleetspaceResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties to update Azure Cosmos DB Fleetspace. */
export interface FleetspaceProperties {
  /** A provisioning state of the Fleetspace. */
  readonly provisioningState?: Status;
  /** The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL' */
  fleetspaceApiKind?: FleetspacePropertiesFleetspaceApiKind;
  /** Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region. */
  serviceTier?: FleetspacePropertiesServiceTier;
  /** List of data regions assigned to the fleetspace. Eg [westus2] */
  dataRegions?: string[];
  /** Configuration for throughput pool in the fleetspace. */
  throughputPoolConfiguration?: FleetspacePropertiesThroughputPoolConfiguration;
}

export function fleetspacePropertiesSerializer(item: FleetspaceProperties): any {
  return {
    fleetspaceApiKind: item["fleetspaceApiKind"],
    serviceTier: item["serviceTier"],
    dataRegions: !item["dataRegions"]
      ? item["dataRegions"]
      : item["dataRegions"].map((p: any) => {
          return p;
        }),
    throughputPoolConfiguration: !item["throughputPoolConfiguration"]
      ? item["throughputPoolConfiguration"]
      : fleetspacePropertiesThroughputPoolConfigurationSerializer(
          item["throughputPoolConfiguration"],
        ),
  };
}

export function fleetspacePropertiesDeserializer(item: any): FleetspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    fleetspaceApiKind: item["fleetspaceApiKind"],
    serviceTier: item["serviceTier"],
    dataRegions: !item["dataRegions"]
      ? item["dataRegions"]
      : item["dataRegions"].map((p: any) => {
          return p;
        }),
    throughputPoolConfiguration: !item["throughputPoolConfiguration"]
      ? item["throughputPoolConfiguration"]
      : fleetspacePropertiesThroughputPoolConfigurationDeserializer(
          item["throughputPoolConfiguration"],
        ),
  };
}

/** The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL' */
export enum KnownFleetspacePropertiesFleetspaceApiKind {
  /** NoSQL */
  NoSQL = "NoSQL",
}

/**
 * The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL' \
 * {@link KnownFleetspacePropertiesFleetspaceApiKind} can be used interchangeably with FleetspacePropertiesFleetspaceApiKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoSQL**
 */
export type FleetspacePropertiesFleetspaceApiKind = string;

/** Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region. */
export enum KnownFleetspacePropertiesServiceTier {
  /** GeneralPurpose */
  GeneralPurpose = "GeneralPurpose",
  /** BusinessCritical */
  BusinessCritical = "BusinessCritical",
}

/**
 * Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region. \
 * {@link KnownFleetspacePropertiesServiceTier} can be used interchangeably with FleetspacePropertiesServiceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeneralPurpose** \
 * **BusinessCritical**
 */
export type FleetspacePropertiesServiceTier = string;

/** Configuration for throughput pool in the fleetspace. */
export interface FleetspacePropertiesThroughputPoolConfiguration {
  /** Minimum throughput for the pool. */
  minThroughput?: number;
  /** Maximum throughput for the pool. */
  maxThroughput?: number;
  /** Total dedicated throughput (RU/s) for fleetspace. Represents the sum of all manual provisioned throughput and all autoscale max RU/s across all shared throughput databases and dedicated throughput containers across all accounts in the fleetspace for 1 region. */
  dedicatedRUs?: number;
  /** Maximum consumable throughput (RU/s) for fleetspace. Represents the maximum throughput that resources in the fleetspace can consume from the fleetspace's pool in 1 region. */
  maxConsumableRUs?: number;
}

export function fleetspacePropertiesThroughputPoolConfigurationSerializer(
  item: FleetspacePropertiesThroughputPoolConfiguration,
): any {
  return {
    minThroughput: item["minThroughput"],
    maxThroughput: item["maxThroughput"],
    dedicatedRUs: item["dedicatedRUs"],
    maxConsumableRUs: item["maxConsumableRUs"],
  };
}

export function fleetspacePropertiesThroughputPoolConfigurationDeserializer(
  item: any,
): FleetspacePropertiesThroughputPoolConfiguration {
  return {
    minThroughput: item["minThroughput"],
    maxThroughput: item["maxThroughput"],
    dedicatedRUs: item["dedicatedRUs"],
    maxConsumableRUs: item["maxConsumableRUs"],
  };
}

/** Represents a fleetspace resource for updates. */
export interface FleetspaceUpdate {
  /** A provisioning state of the Fleetspace. */
  readonly provisioningState?: Status;
  /** The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL' */
  fleetspaceApiKind?: FleetspacePropertiesFleetspaceApiKind;
  /** Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region. */
  serviceTier?: FleetspacePropertiesServiceTier;
  /** List of data regions assigned to the fleetspace. Eg [westus2] */
  dataRegions?: string[];
  /** Configuration for throughput pool in the fleetspace. */
  throughputPoolConfiguration?: FleetspacePropertiesThroughputPoolConfiguration;
}

export function fleetspaceUpdateSerializer(item: FleetspaceUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "fleetspaceApiKind",
      "serviceTier",
      "dataRegions",
      "throughputPoolConfiguration",
    ])
      ? undefined
      : _fleetspaceUpdatePropertiesSerializer(item),
  };
}

/** The response of a FleetspaceResource list operation. */
export interface _FleetspaceListResult {
  /** The FleetspaceResource items on this page */
  value: FleetspaceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetspaceListResultDeserializer(item: any): _FleetspaceListResult {
  return {
    value: fleetspaceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetspaceResourceArraySerializer(result: Array<FleetspaceResource>): any[] {
  return result.map((item) => {
    return fleetspaceResourceSerializer(item);
  });
}

export function fleetspaceResourceArrayDeserializer(result: Array<FleetspaceResource>): any[] {
  return result.map((item) => {
    return fleetspaceResourceDeserializer(item);
  });
}

/** An Azure Cosmos DB Fleetspace Account */
export interface FleetspaceAccountResource extends ProxyResource {
  /** A provisioning state of the Fleetspace Account. */
  readonly provisioningState?: Status;
  /** Configuration for fleetspace Account in the fleetspace. */
  globalDatabaseAccountProperties?: FleetspaceAccountPropertiesGlobalDatabaseAccountProperties;
}

export function fleetspaceAccountResourceSerializer(item: FleetspaceAccountResource): any {
  return {
    properties: areAllPropsUndefined(item, ["globalDatabaseAccountProperties"])
      ? undefined
      : _fleetspaceAccountResourcePropertiesSerializer(item),
  };
}

export function fleetspaceAccountResourceDeserializer(item: any): FleetspaceAccountResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fleetspaceAccountResourcePropertiesDeserializer(item["properties"])),
  };
}

/** An Azure Cosmos DB Global Database Account which is part of a Fleetspace Account. */
export interface FleetspaceAccountProperties {
  /** A provisioning state of the Fleetspace Account. */
  readonly provisioningState?: Status;
  /** Configuration for fleetspace Account in the fleetspace. */
  globalDatabaseAccountProperties?: FleetspaceAccountPropertiesGlobalDatabaseAccountProperties;
}

export function fleetspaceAccountPropertiesSerializer(item: FleetspaceAccountProperties): any {
  return {
    globalDatabaseAccountProperties: !item["globalDatabaseAccountProperties"]
      ? item["globalDatabaseAccountProperties"]
      : fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesSerializer(
          item["globalDatabaseAccountProperties"],
        ),
  };
}

export function fleetspaceAccountPropertiesDeserializer(item: any): FleetspaceAccountProperties {
  return {
    provisioningState: item["provisioningState"],
    globalDatabaseAccountProperties: !item["globalDatabaseAccountProperties"]
      ? item["globalDatabaseAccountProperties"]
      : fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesDeserializer(
          item["globalDatabaseAccountProperties"],
        ),
  };
}

/** Configuration for fleetspace Account in the fleetspace. */
export interface FleetspaceAccountPropertiesGlobalDatabaseAccountProperties {
  /** The resource identifier of global database account in the Fleetspace Account. */
  resourceId?: string;
  /** The location of  global database account in the Fleetspace Account. */
  armLocation?: string;
}

export function fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesSerializer(
  item: FleetspaceAccountPropertiesGlobalDatabaseAccountProperties,
): any {
  return { resourceId: item["resourceId"], armLocation: item["armLocation"] };
}

export function fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesDeserializer(
  item: any,
): FleetspaceAccountPropertiesGlobalDatabaseAccountProperties {
  return {
    resourceId: item["resourceId"],
    armLocation: item["armLocation"],
  };
}

/** The response of a FleetspaceAccountResource list operation. */
export interface _FleetspaceAccountListResult {
  /** The FleetspaceAccountResource items on this page */
  value: FleetspaceAccountResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetspaceAccountListResultDeserializer(item: any): _FleetspaceAccountListResult {
  return {
    value: fleetspaceAccountResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetspaceAccountResourceArraySerializer(
  result: Array<FleetspaceAccountResource>,
): any[] {
  return result.map((item) => {
    return fleetspaceAccountResourceSerializer(item);
  });
}

export function fleetspaceAccountResourceArrayDeserializer(
  result: Array<FleetspaceAccountResource>,
): any[] {
  return result.map((item) => {
    return fleetspaceAccountResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-03-15 API version. */
  V20260315 = "2026-03-15",
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
  };
}

export function _databaseAccountGetResultsPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    documentEndpoint: item["documentEndpoint"],
    databaseAccountOfferType: item["databaseAccountOfferType"],
    ipRules: !item["ipRules"]
      ? item["ipRules"]
      : ipAddressOrRangeArrayDeserializer(item["ipRules"]),
    isVirtualNetworkFilterEnabled: item["isVirtualNetworkFilterEnabled"],
    enableAutomaticFailover: item["enableAutomaticFailover"],
    consistencyPolicy: !item["consistencyPolicy"]
      ? item["consistencyPolicy"]
      : consistencyPolicyDeserializer(item["consistencyPolicy"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArrayDeserializer(item["capabilities"]),
    writeLocations: !item["writeLocations"]
      ? item["writeLocations"]
      : locationArrayDeserializer(item["writeLocations"]),
    readLocations: !item["readLocations"]
      ? item["readLocations"]
      : locationArrayDeserializer(item["readLocations"]),
    locations: !item["locations"]
      ? item["locations"]
      : locationArrayDeserializer(item["locations"]),
    failoverPolicies: !item["failoverPolicies"]
      ? item["failoverPolicies"]
      : failoverPolicyArrayDeserializer(item["failoverPolicies"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    enableMultipleWriteLocations: item["enableMultipleWriteLocations"],
    enableCassandraConnector: item["enableCassandraConnector"],
    connectorOffer: item["connectorOffer"],
    disableKeyBasedMetadataWriteAccess: item["disableKeyBasedMetadataWriteAccess"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    defaultIdentity: item["defaultIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enableFreeTier: item["enableFreeTier"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesDeserializer(item["apiProperties"]),
    enableAnalyticalStorage: item["enableAnalyticalStorage"],
    analyticalStorageConfiguration: !item["analyticalStorageConfiguration"]
      ? item["analyticalStorageConfiguration"]
      : analyticalStorageConfigurationDeserializer(item["analyticalStorageConfiguration"]),
    instanceId: item["instanceId"],
    createMode: item["createMode"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : restoreParametersDeserializer(item["restoreParameters"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyUnionDeserializer(item["backupPolicy"]),
    cors: !item["cors"] ? item["cors"] : corsPolicyArrayDeserializer(item["cors"]),
    networkAclBypass: item["networkAclBypass"],
    networkAclBypassResourceIds: !item["networkAclBypassResourceIds"]
      ? item["networkAclBypassResourceIds"]
      : item["networkAclBypassResourceIds"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    capacity: !item["capacity"] ? item["capacity"] : capacityDeserializer(item["capacity"]),
    keysMetadata: !item["keysMetadata"]
      ? item["keysMetadata"]
      : databaseAccountKeysMetadataDeserializer(item["keysMetadata"]),
    enablePartitionMerge: item["enablePartitionMerge"],
    enableBurstCapacity: item["enableBurstCapacity"],
    minimalTlsVersion: item["minimalTlsVersion"],
    customerManagedKeyStatus: item["customerManagedKeyStatus"],
    keyVaultKeyUriVersion: item["keyVaultKeyUriVersion"],
    enablePriorityBasedExecution: item["enablePriorityBasedExecution"],
    defaultPriorityLevel: item["defaultPriorityLevel"],
    enablePerRegionPerPartitionAutoscale: item["enablePerRegionPerPartitionAutoscale"],
    enforceHierarchicalPartitionKeyIdLastLevel: item["enforceHierarchicalPartitionKeyIdLastLevel"],
  };
}

export function _databaseAccountCreateUpdateParametersPropertiesSerializer(
  item: DatabaseAccountCreateUpdateParameters,
): any {
  return {
    consistencyPolicy: !item["consistencyPolicy"]
      ? item["consistencyPolicy"]
      : consistencyPolicySerializer(item["consistencyPolicy"]),
    locations: locationArraySerializer(item["locations"]),
    databaseAccountOfferType: item["databaseAccountOfferType"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipAddressOrRangeArraySerializer(item["ipRules"]),
    isVirtualNetworkFilterEnabled: item["isVirtualNetworkFilterEnabled"],
    enableAutomaticFailover: item["enableAutomaticFailover"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArraySerializer(item["capabilities"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
    enableMultipleWriteLocations: item["enableMultipleWriteLocations"],
    enableCassandraConnector: item["enableCassandraConnector"],
    connectorOffer: item["connectorOffer"],
    disableKeyBasedMetadataWriteAccess: item["disableKeyBasedMetadataWriteAccess"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    defaultIdentity: item["defaultIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enableFreeTier: item["enableFreeTier"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesSerializer(item["apiProperties"]),
    enableAnalyticalStorage: item["enableAnalyticalStorage"],
    analyticalStorageConfiguration: !item["analyticalStorageConfiguration"]
      ? item["analyticalStorageConfiguration"]
      : analyticalStorageConfigurationSerializer(item["analyticalStorageConfiguration"]),
    createMode: item["createMode"],
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyUnionSerializer(item["backupPolicy"]),
    cors: !item["cors"] ? item["cors"] : corsPolicyArraySerializer(item["cors"]),
    networkAclBypass: item["networkAclBypass"],
    networkAclBypassResourceIds: !item["networkAclBypassResourceIds"]
      ? item["networkAclBypassResourceIds"]
      : item["networkAclBypassResourceIds"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : restoreParametersSerializer(item["restoreParameters"]),
    capacity: !item["capacity"] ? item["capacity"] : capacitySerializer(item["capacity"]),
    enablePartitionMerge: item["enablePartitionMerge"],
    enableBurstCapacity: item["enableBurstCapacity"],
    minimalTlsVersion: item["minimalTlsVersion"],
    customerManagedKeyStatus: item["customerManagedKeyStatus"],
    enablePriorityBasedExecution: item["enablePriorityBasedExecution"],
    defaultPriorityLevel: item["defaultPriorityLevel"],
    enablePerRegionPerPartitionAutoscale: item["enablePerRegionPerPartitionAutoscale"],
    enforceHierarchicalPartitionKeyIdLastLevel: item["enforceHierarchicalPartitionKeyIdLastLevel"],
  };
}

export function _databaseAccountUpdateParametersPropertiesSerializer(
  item: DatabaseAccountUpdateParameters,
): any {
  return {
    consistencyPolicy: !item["consistencyPolicy"]
      ? item["consistencyPolicy"]
      : consistencyPolicySerializer(item["consistencyPolicy"]),
    locations: !item["locations"] ? item["locations"] : locationArraySerializer(item["locations"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : ipAddressOrRangeArraySerializer(item["ipRules"]),
    isVirtualNetworkFilterEnabled: item["isVirtualNetworkFilterEnabled"],
    enableAutomaticFailover: item["enableAutomaticFailover"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArraySerializer(item["capabilities"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
    enableMultipleWriteLocations: item["enableMultipleWriteLocations"],
    enableCassandraConnector: item["enableCassandraConnector"],
    connectorOffer: item["connectorOffer"],
    disableKeyBasedMetadataWriteAccess: item["disableKeyBasedMetadataWriteAccess"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    defaultIdentity: item["defaultIdentity"],
    publicNetworkAccess: item["publicNetworkAccess"],
    enableFreeTier: item["enableFreeTier"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesSerializer(item["apiProperties"]),
    enableAnalyticalStorage: item["enableAnalyticalStorage"],
    analyticalStorageConfiguration: !item["analyticalStorageConfiguration"]
      ? item["analyticalStorageConfiguration"]
      : analyticalStorageConfigurationSerializer(item["analyticalStorageConfiguration"]),
    backupPolicy: !item["backupPolicy"]
      ? item["backupPolicy"]
      : backupPolicyUnionSerializer(item["backupPolicy"]),
    cors: !item["cors"] ? item["cors"] : corsPolicyArraySerializer(item["cors"]),
    networkAclBypass: item["networkAclBypass"],
    networkAclBypassResourceIds: !item["networkAclBypassResourceIds"]
      ? item["networkAclBypassResourceIds"]
      : item["networkAclBypassResourceIds"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    capacity: !item["capacity"] ? item["capacity"] : capacitySerializer(item["capacity"]),
    enablePartitionMerge: item["enablePartitionMerge"],
    enableBurstCapacity: item["enableBurstCapacity"],
    minimalTlsVersion: item["minimalTlsVersion"],
    customerManagedKeyStatus: item["customerManagedKeyStatus"],
    enablePriorityBasedExecution: item["enablePriorityBasedExecution"],
    defaultPriorityLevel: item["defaultPriorityLevel"],
    enablePerRegionPerPartitionAutoscale: item["enablePerRegionPerPartitionAutoscale"],
    enforceHierarchicalPartitionKeyIdLastLevel: item["enforceHierarchicalPartitionKeyIdLastLevel"],
  };
}

export function _sqlDatabaseGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlDatabaseGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : sqlDatabaseGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _sqlDatabaseCreateUpdateParametersPropertiesSerializer(
  item: SqlDatabaseCreateUpdateParameters,
): any {
  return {
    resource: sqlDatabaseResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _throughputSettingsGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : throughputSettingsGetPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _throughputSettingsUpdateParametersPropertiesSerializer(
  item: ThroughputSettingsUpdateParameters,
): any {
  return { resource: throughputSettingsResourceSerializer(item["resource"]) };
}

export function _clientEncryptionKeyGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : clientEncryptionKeyGetPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _clientEncryptionKeyCreateUpdateParametersPropertiesSerializer(
  item: ClientEncryptionKeyCreateUpdateParameters,
): any {
  return { resource: clientEncryptionKeyResourceSerializer(item["resource"]) };
}

export function _sqlContainerGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlContainerGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : sqlContainerGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _sqlContainerCreateUpdateParametersPropertiesSerializer(
  item: SqlContainerCreateUpdateParameters,
): any {
  return {
    resource: sqlContainerResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _sqlStoredProcedureGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlStoredProcedureGetPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _sqlStoredProcedureCreateUpdateParametersPropertiesSerializer(
  item: SqlStoredProcedureCreateUpdateParameters,
): any {
  return {
    resource: sqlStoredProcedureResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _sqlUserDefinedFunctionGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlUserDefinedFunctionGetPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _sqlUserDefinedFunctionCreateUpdateParametersPropertiesSerializer(
  item: SqlUserDefinedFunctionCreateUpdateParameters,
): any {
  return {
    resource: sqlUserDefinedFunctionResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _sqlTriggerGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : sqlTriggerGetPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _sqlTriggerCreateUpdateParametersPropertiesSerializer(
  item: SqlTriggerCreateUpdateParameters,
): any {
  return {
    resource: sqlTriggerResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _sqlRoleDefinitionGetResultsPropertiesSerializer(
  item: SqlRoleDefinitionGetResults,
): any {
  return {
    roleName: item["roleName"],
    type: item["typePropertiesType"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function _sqlRoleDefinitionGetResultsPropertiesDeserializer(item: any) {
  return {
    roleName: item["roleName"],
    typePropertiesType: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

export function _sqlRoleDefinitionCreateUpdateParametersPropertiesSerializer(
  item: SqlRoleDefinitionCreateUpdateParameters,
): any {
  return {
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function _sqlRoleDefinitionCreateUpdateParametersPropertiesDeserializer(item: any) {
  return {
    roleName: item["roleName"],
    type: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

export function _sqlRoleAssignmentGetResultsPropertiesSerializer(
  item: SqlRoleAssignmentGetResults,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _sqlRoleAssignmentGetResultsPropertiesDeserializer(item: any) {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _sqlRoleAssignmentCreateUpdateParametersPropertiesSerializer(
  item: SqlRoleAssignmentCreateUpdateParameters,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _sqlRoleAssignmentCreateUpdateParametersPropertiesDeserializer(item: any) {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _mongoDBDatabaseGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : mongoDBDatabaseGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : mongoDBDatabaseGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _mongoDBDatabaseCreateUpdateParametersPropertiesSerializer(
  item: MongoDBDatabaseCreateUpdateParameters,
): any {
  return {
    resource: mongoDBDatabaseResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _mongoDBCollectionGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : mongoDBCollectionGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : mongoDBCollectionGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _mongoIndexKeySerializer(item: MongoIndex): any {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function _mongoIndexKeyDeserializer(item: any) {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : item["keys"].map((p: any) => {
          return p;
        }),
  };
}

export function _mongoDBCollectionCreateUpdateParametersPropertiesSerializer(
  item: MongoDBCollectionCreateUpdateParameters,
): any {
  return {
    resource: mongoDBCollectionResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _mongoRoleDefinitionGetResultsPropertiesSerializer(
  item: MongoRoleDefinitionGetResults,
): any {
  return {
    roleName: item["roleName"],
    type: item["typePropertiesType"],
    databaseName: item["databaseName"],
    privileges: !item["privileges"]
      ? item["privileges"]
      : privilegeArraySerializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]),
  };
}

export function _mongoRoleDefinitionGetResultsPropertiesDeserializer(item: any) {
  return {
    roleName: item["roleName"],
    typePropertiesType: item["type"],
    databaseName: item["databaseName"],
    privileges: !item["privileges"]
      ? item["privileges"]
      : privilegeArrayDeserializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
  };
}

export function _mongoRoleDefinitionCreateUpdateParametersPropertiesSerializer(
  item: MongoRoleDefinitionCreateUpdateParameters,
): any {
  return {
    roleName: item["roleName"],
    type: item["type"],
    databaseName: item["databaseName"],
    privileges: !item["privileges"]
      ? item["privileges"]
      : privilegeArraySerializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]),
  };
}

export function _mongoRoleDefinitionCreateUpdateParametersPropertiesDeserializer(item: any) {
  return {
    roleName: item["roleName"],
    type: item["type"],
    databaseName: item["databaseName"],
    privileges: !item["privileges"]
      ? item["privileges"]
      : privilegeArrayDeserializer(item["privileges"]),
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
  };
}

export function _mongoUserDefinitionGetResultsPropertiesSerializer(
  item: MongoUserDefinitionGetResults,
): any {
  return {
    userName: item["userName"],
    password: item["password"],
    databaseName: item["databaseName"],
    customData: item["customData"],
    roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]),
    mechanisms: item["mechanisms"],
  };
}

export function _mongoUserDefinitionGetResultsPropertiesDeserializer(item: any) {
  return {
    userName: item["userName"],
    password: item["password"],
    databaseName: item["databaseName"],
    customData: item["customData"],
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
    mechanisms: item["mechanisms"],
  };
}

export function _mongoUserDefinitionCreateUpdateParametersPropertiesSerializer(
  item: MongoUserDefinitionCreateUpdateParameters,
): any {
  return {
    userName: item["userName"],
    password: item["password"],
    databaseName: item["databaseName"],
    customData: item["customData"],
    roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]),
    mechanisms: item["mechanisms"],
  };
}

export function _mongoUserDefinitionCreateUpdateParametersPropertiesDeserializer(item: any) {
  return {
    userName: item["userName"],
    password: item["password"],
    databaseName: item["databaseName"],
    customData: item["customData"],
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
    mechanisms: item["mechanisms"],
  };
}

export function _tableGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : tableGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : tableGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _tableCreateUpdateParametersPropertiesSerializer(
  item: TableCreateUpdateParameters,
): any {
  return {
    resource: tableResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _tableRoleDefinitionResourcePropertiesSerializer(
  item: TableRoleDefinitionResource,
): any {
  return {
    id: item["idPropertiesId"],
    roleName: item["roleName"],
    type: item["typePropertiesType"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function _tableRoleDefinitionResourcePropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    roleName: item["roleName"],
    typePropertiesType: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

export function _tableRoleAssignmentResourcePropertiesSerializer(
  item: TableRoleAssignmentResource,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _tableRoleAssignmentResourcePropertiesDeserializer(item: any) {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

export function _cassandraKeyspaceGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : cassandraKeyspaceGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : cassandraKeyspaceGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _cassandraKeyspaceCreateUpdateParametersPropertiesSerializer(
  item: CassandraKeyspaceCreateUpdateParameters,
): any {
  return {
    resource: cassandraKeyspaceResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _cassandraTableGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : cassandraTableGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : cassandraTableGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _cassandraTableCreateUpdateParametersPropertiesSerializer(
  item: CassandraTableCreateUpdateParameters,
): any {
  return {
    resource: cassandraTableResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _cassandraRoleDefinitionResourcePropertiesSerializer(
  item: CassandraRoleDefinitionResource,
): any {
  return {
    id: item["idPropertiesId"],
    roleName: item["roleName"],
    type: item["typePropertiesType"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function _cassandraRoleDefinitionResourcePropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    roleName: item["roleName"],
    typePropertiesType: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

export function _cassandraRoleAssignmentResourcePropertiesSerializer(
  item: CassandraRoleAssignmentResource,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _cassandraRoleAssignmentResourcePropertiesDeserializer(item: any) {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

export function _gremlinDatabaseGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : gremlinDatabaseGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : gremlinDatabaseGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _gremlinDatabaseCreateUpdateParametersPropertiesSerializer(
  item: GremlinDatabaseCreateUpdateParameters,
): any {
  return {
    resource: gremlinDatabaseResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _gremlinGraphGetResultsPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : gremlinGraphGetPropertiesResourceDeserializer(item["resource"]),
    options: !item["options"]
      ? item["options"]
      : gremlinGraphGetPropertiesOptionsDeserializer(item["options"]),
  };
}

export function _gremlinGraphCreateUpdateParametersPropertiesSerializer(
  item: GremlinGraphCreateUpdateParameters,
): any {
  return {
    resource: gremlinGraphResourceSerializer(item["resource"]),
    options: !item["options"] ? item["options"] : createUpdateOptionsSerializer(item["options"]),
  };
}

export function _gremlinRoleDefinitionResourcePropertiesSerializer(
  item: GremlinRoleDefinitionResource,
): any {
  return {
    id: item["idPropertiesId"],
    roleName: item["roleName"],
    type: item["typePropertiesType"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function _gremlinRoleDefinitionResourcePropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    roleName: item["roleName"],
    typePropertiesType: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

export function _gremlinRoleAssignmentResourcePropertiesSerializer(
  item: GremlinRoleAssignmentResource,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _gremlinRoleAssignmentResourcePropertiesDeserializer(item: any) {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

export function _notebookWorkspacePropertiesDeserializer(item: any) {
  return {
    notebookServerEndpoint: item["notebookServerEndpoint"],
    status: item["status"],
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

export function _restorableDatabaseAccountGetResultPropertiesDeserializer(item: any) {
  return {
    accountName: item["accountName"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    oldestRestorableTime: !item["oldestRestorableTime"]
      ? item["oldestRestorableTime"]
      : new Date(item["oldestRestorableTime"]),
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
    apiType: item["apiType"],
    restorableLocations: !item["restorableLocations"]
      ? item["restorableLocations"]
      : restorableLocationResourceArrayDeserializer(item["restorableLocations"]),
  };
}

export function _restorableSqlDatabaseGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableSqlDatabasePropertiesResourceDeserializer(item["resource"]),
  };
}

export function _restorableSqlContainerGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableSqlContainerPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _restorableMongodbDatabaseGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableMongodbDatabasePropertiesResourceDeserializer(item["resource"]),
  };
}

export function _restorableMongodbCollectionGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableMongodbCollectionPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _restorableGremlinDatabaseGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableGremlinDatabasePropertiesResourceDeserializer(item["resource"]),
  };
}

export function _restorableGremlinGraphGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableGremlinGraphPropertiesResourceDeserializer(item["resource"]),
  };
}

export function _restorableTableGetResultPropertiesDeserializer(item: any) {
  return {
    resource: !item["resource"]
      ? item["resource"]
      : restorableTablePropertiesResourceDeserializer(item["resource"]),
  };
}

export function _mongoMIRoleDefinitionResourcePropertiesSerializer(
  item: MongoMIRoleDefinitionResource,
): any {
  return {
    id: item["idPropertiesId"],
    roleName: item["roleName"],
    type: item["typePropertiesType"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArraySerializer(item["permissions"]),
  };
}

export function _mongoMIRoleDefinitionResourcePropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    roleName: item["roleName"],
    typePropertiesType: item["type"],
    assignableScopes: !item["assignableScopes"]
      ? item["assignableScopes"]
      : item["assignableScopes"].map((p: any) => {
          return p;
        }),
    permissions: !item["permissions"]
      ? item["permissions"]
      : permissionArrayDeserializer(item["permissions"]),
  };
}

export function _mongoMIRoleAssignmentResourcePropertiesSerializer(
  item: MongoMIRoleAssignmentResource,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
  };
}

export function _mongoMIRoleAssignmentResourcePropertiesDeserializer(item: any) {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    principalId: item["principalId"],
    provisioningState: item["provisioningState"],
  };
}

export function _fleetResourcePropertiesSerializer(_item: FleetResource): any {
  return {};
}

export function _fleetResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _fleetResourceUpdatePropertiesSerializer(_item: FleetResourceUpdate): any {
  return {};
}

export function _fleetResourceUpdatePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _fleetspaceResourcePropertiesSerializer(item: FleetspaceResource): any {
  return {
    fleetspaceApiKind: item["fleetspaceApiKind"],
    serviceTier: item["serviceTier"],
    dataRegions: !item["dataRegions"]
      ? item["dataRegions"]
      : item["dataRegions"].map((p: any) => {
          return p;
        }),
    throughputPoolConfiguration: !item["throughputPoolConfiguration"]
      ? item["throughputPoolConfiguration"]
      : fleetspacePropertiesThroughputPoolConfigurationSerializer(
          item["throughputPoolConfiguration"],
        ),
  };
}

export function _fleetspaceResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    fleetspaceApiKind: item["fleetspaceApiKind"],
    serviceTier: item["serviceTier"],
    dataRegions: !item["dataRegions"]
      ? item["dataRegions"]
      : item["dataRegions"].map((p: any) => {
          return p;
        }),
    throughputPoolConfiguration: !item["throughputPoolConfiguration"]
      ? item["throughputPoolConfiguration"]
      : fleetspacePropertiesThroughputPoolConfigurationDeserializer(
          item["throughputPoolConfiguration"],
        ),
  };
}

export function _fleetspaceUpdatePropertiesSerializer(item: FleetspaceUpdate): any {
  return {
    fleetspaceApiKind: item["fleetspaceApiKind"],
    serviceTier: item["serviceTier"],
    dataRegions: !item["dataRegions"]
      ? item["dataRegions"]
      : item["dataRegions"].map((p: any) => {
          return p;
        }),
    throughputPoolConfiguration: !item["throughputPoolConfiguration"]
      ? item["throughputPoolConfiguration"]
      : fleetspacePropertiesThroughputPoolConfigurationSerializer(
          item["throughputPoolConfiguration"],
        ),
  };
}

export function _fleetspaceUpdatePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    fleetspaceApiKind: item["fleetspaceApiKind"],
    serviceTier: item["serviceTier"],
    dataRegions: !item["dataRegions"]
      ? item["dataRegions"]
      : item["dataRegions"].map((p: any) => {
          return p;
        }),
    throughputPoolConfiguration: !item["throughputPoolConfiguration"]
      ? item["throughputPoolConfiguration"]
      : fleetspacePropertiesThroughputPoolConfigurationDeserializer(
          item["throughputPoolConfiguration"],
        ),
  };
}

export function _fleetspaceAccountResourcePropertiesSerializer(
  item: FleetspaceAccountResource,
): any {
  return {
    globalDatabaseAccountProperties: !item["globalDatabaseAccountProperties"]
      ? item["globalDatabaseAccountProperties"]
      : fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesSerializer(
          item["globalDatabaseAccountProperties"],
        ),
  };
}

export function _fleetspaceAccountResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    globalDatabaseAccountProperties: !item["globalDatabaseAccountProperties"]
      ? item["globalDatabaseAccountProperties"]
      : fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesDeserializer(
          item["globalDatabaseAccountProperties"],
        ),
  };
}

export type DatabaseAccountsCheckNameExistsResponse = { body: boolean };
