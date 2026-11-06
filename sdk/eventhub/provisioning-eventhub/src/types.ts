// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type DiscriminatedModelShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * Type of Azure Active Directory Managed Identity.
 */
export type CaptureIdentityType = "SystemAssigned" | "UserAssigned";

/**
 * Enumerates the possible values for the encoding format of capture description. Note: 'AvroDeflate' will be deprecated in New API Version
 */
export type EncodingCaptureDescription = "Avro" | "AvroDeflate";

/**
 * Enumerates the possible values for the status of the Event Hub.
 */
export type EntityStatus =
  | "Active"
  | "Disabled"
  | "Restoring"
  | "SendDisabled"
  | "ReceiveDisabled"
  | "Creating"
  | "Deleting"
  | "Renaming"
  | "Unknown";

/**
 * Type of managed service identity.
 */
export type ManagedServiceIdentityType =
  "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";

/**
 * Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed'
 */
export type ProvisioningStateDr = "Accepted" | "Succeeded" | "Failed";

/**
 * role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary'
 */
export type RoleDisasterRecovery = "Primary" | "PrimaryNotReplicating" | "Secondary";

/**
 * Properties of the Application Group policy
 */
export type ApplicationGroupPolicy = ThrottlingPolicy;

/**
 * Input type for Properties of the Application Group policy
 */
export type ApplicationGroupPolicyInput = ThrottlingPolicyInput;

/**
 * View type for Properties of the Application Group policy
 */
export type ApplicationGroupPolicyView = ThrottlingPolicyView;

export const applicationGroupPolicyShape: DiscriminatedModelShape = createDiscriminatedModelShape(
  "type",
  {
    ThrottlingPolicy: createDeferredShape(() => throttlingPolicyShape),
  },
);

export interface ApplicationGroupProperties {
  /**
   * The Unique identifier for application group.Supports SAS(SASKeyName=KeyName) or AAD(AADAppID=Guid)
   */
  clientAppGroupIdentifier: string;
  /**
   * Determines if Application Group is allowed to create connection with namespace or not. Once the isEnabled is set to false, all the existing connections of application group gets dropped and no new connections will be allowed
   */
  isEnabled?: boolean;
  /**
   * List of group policies that define the behavior of application group. The policies can support resource governance scenarios such as limiting ingress or egress traffic.
   */
  policies?: ApplicationGroupPolicy[];
}

export interface ApplicationGroupPropertiesInput extends InputOf<ApplicationGroupProperties> {
  /**
   * The Unique identifier for application group.Supports SAS(SASKeyName=KeyName) or AAD(AADAppID=Guid)
   */
  clientAppGroupIdentifier: ExpressionOrValue<string>;
  /**
   * Determines if Application Group is allowed to create connection with namespace or not. Once the isEnabled is set to false, all the existing connections of application group gets dropped and no new connections will be allowed
   */
  isEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of group policies that define the behavior of application group. The policies can support resource governance scenarios such as limiting ingress or egress traffic.
   */
  policies?: InputArray<ApplicationGroupPolicyInput, ApplicationGroupPolicy[]> | undefined;
}

export type ApplicationGroupPropertiesView = ApplicationGroupPropertiesInput;

export const applicationGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  clientAppGroupIdentifier: { armPath: ["clientAppGroupIdentifier"], value: createStringShape() },
  isEnabled: { armPath: ["isEnabled"], value: createBooleanShape() },
  policies: {
    armPath: ["policies"],
    value: createArrayShape(createDeferredShape(() => applicationGroupPolicyShape)),
  },
});

/**
 * Properties required to the Create Or Update Alias(Disaster Recovery configurations)
 */
export interface ArmDisasterRecoveryProperties {
  /**
   * Alternate name specified when alias and namespace names are same.
   */
  alternateName?: string;
  /**
   * ARM Id of the Primary/Secondary eventhub namespace name, which is part of GEO DR pairing
   */
  partnerNamespace?: string;
  /**
   * Number of entities pending to be replicated.
   */
  pendingReplicationOperationsCount?: number;
  /**
   * Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed'
   */
  provisioningState?: ProvisioningStateDr;
  /**
   * role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary'
   */
  role?: RoleDisasterRecovery;
}

/**
 * Input type for Properties required to the Create Or Update Alias(Disaster Recovery configurations)
 */
export interface ArmDisasterRecoveryPropertiesInput extends InputOf<ArmDisasterRecoveryProperties> {
  /**
   * Alternate name specified when alias and namespace names are same.
   */
  alternateName?: ExpressionOrValue<string> | undefined;
  /**
   * ARM Id of the Primary/Secondary eventhub namespace name, which is part of GEO DR pairing
   */
  partnerNamespace?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties required to the Create Or Update Alias(Disaster Recovery configurations)
 */
export interface ArmDisasterRecoveryPropertiesView extends InputOf<ArmDisasterRecoveryProperties> {
  /**
   * Alternate name specified when alias and namespace names are same.
   */
  alternateName?: ExpressionOrValue<string> | undefined;
  /**
   * ARM Id of the Primary/Secondary eventhub namespace name, which is part of GEO DR pairing
   */
  partnerNamespace?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Number of entities pending to be replicated.
   */
  readonly pendingReplicationOperationsCount?: Expression<number> | undefined;
  /**
   * Read-only output: Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed'
   */
  readonly provisioningState?: Expression<ProvisioningStateDr> | undefined;
  /**
   * Read-only output: role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary'
   */
  readonly role?: Expression<RoleDisasterRecovery> | undefined;
}

export const armDisasterRecoveryPropertiesShape: FlatModelShape = createFlatModelShape({
  alternateName: { armPath: ["alternateName"], value: createStringShape() },
  partnerNamespace: { armPath: ["partnerNamespace"], value: createStringShape() },
  pendingReplicationOperationsCount: {
    armPath: ["pendingReplicationOperationsCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createEnumShape(), readOnly: true },
  role: { armPath: ["role"], value: createEnumShape(), readOnly: true },
});

/**
 * Properties supplied to create or update AuthorizationRule
 */
export interface AuthorizationRuleProperties {
  /**
   * The rights associated with the rule.
   */
  rights: AccessRights[];
}

/**
 * Input type for Properties supplied to create or update AuthorizationRule
 */
export interface AuthorizationRulePropertiesInput extends InputOf<AuthorizationRuleProperties> {
  /**
   * The rights associated with the rule.
   */
  rights: InputArray<ExpressionOrValue<AccessRights>, AccessRights[]>;
}

/**
 * View type for Properties supplied to create or update AuthorizationRule
 */
export type AuthorizationRulePropertiesView = AuthorizationRulePropertiesInput;

export const authorizationRulePropertiesShape: FlatModelShape = createFlatModelShape({
  rights: { armPath: ["rights"], value: createArrayShape(createUnionShape()) },
});

/**
 * Properties to configure capture description for eventhub
 */
export interface CaptureDescription {
  /**
   * Properties of Destination where capture will be stored. (Storage Account, Blob Names)
   */
  destination?: Destination;
  /**
   * A value that indicates whether capture description is enabled.
   */
  enabled?: boolean;
  /**
   * Enumerates the possible values for the encoding format of capture description. Note: 'AvroDeflate' will be deprecated in New API Version
   */
  encoding?: EncodingCaptureDescription;
  /**
   * The time window allows you to set the frequency with which the capture to Azure Blobs will happen, value should between 60 to 900 seconds
   */
  intervalInSeconds?: number;
  /**
   * The size window defines the amount of data built up in your Event Hub before an capture operation, value should be between 10485760 to 524288000 bytes
   */
  sizeLimitInBytes?: number;
  /**
   * A value that indicates whether to Skip Empty Archives
   */
  skipEmptyArchives?: boolean;
}

/**
 * Input type for Properties to configure capture description for eventhub
 */
export interface CaptureDescriptionInput extends InputOf<CaptureDescription> {
  /**
   * Properties of Destination where capture will be stored. (Storage Account, Blob Names)
   */
  destination?: DestinationInput | undefined;
  /**
   * A value that indicates whether capture description is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enumerates the possible values for the encoding format of capture description. Note: 'AvroDeflate' will be deprecated in New API Version
   */
  encoding?: ExpressionOrValue<EncodingCaptureDescription> | undefined;
  /**
   * The time window allows you to set the frequency with which the capture to Azure Blobs will happen, value should between 60 to 900 seconds
   */
  intervalInSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * The size window defines the amount of data built up in your Event Hub before an capture operation, value should be between 10485760 to 524288000 bytes
   */
  sizeLimitInBytes?: ExpressionOrValue<number> | undefined;
  /**
   * A value that indicates whether to Skip Empty Archives
   */
  skipEmptyArchives?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties to configure capture description for eventhub
 */
export type CaptureDescriptionView = CaptureDescriptionInput;

export const captureDescriptionShape: FlatModelShape = createFlatModelShape({
  destination: { armPath: ["destination"], value: createDeferredShape(() => destinationShape) },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  encoding: { armPath: ["encoding"], value: createEnumShape() },
  intervalInSeconds: { armPath: ["intervalInSeconds"], value: createNumberShape() },
  sizeLimitInBytes: { armPath: ["sizeLimitInBytes"], value: createNumberShape() },
  skipEmptyArchives: { armPath: ["skipEmptyArchives"], value: createBooleanShape() },
});

/**
 * A value that indicates whether capture description is enabled.
 */
export interface CaptureIdentity {
  /**
   * Type of Azure Active Directory Managed Identity.
   */
  type?: CaptureIdentityType;
  /**
   * ARM ID of Managed User Identity. This property is required is the type is UserAssignedIdentity. If type is SystemAssigned, then the System Assigned Identity Associated with the namespace will be used.
   */
  userAssignedIdentity?: string;
}

/**
 * Input type for A value that indicates whether capture description is enabled.
 */
export interface CaptureIdentityInput extends InputOf<CaptureIdentity> {
  /**
   * Type of Azure Active Directory Managed Identity.
   */
  type?: ExpressionOrValue<CaptureIdentityType> | undefined;
  /**
   * ARM ID of Managed User Identity. This property is required is the type is UserAssignedIdentity. If type is SystemAssigned, then the System Assigned Identity Associated with the namespace will be used.
   */
  userAssignedIdentity?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for A value that indicates whether capture description is enabled.
 */
export type CaptureIdentityView = CaptureIdentityInput;

export const captureIdentityShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"], value: createEnumShape() },
  userAssignedIdentity: { armPath: ["userAssignedIdentity"], value: createStringShape() },
});

/**
 * Event Hubs Cluster properties supplied in responses in List or Get operations.
 */
export interface ClusterProperties {
  /**
   * The UTC time when the Event Hubs Cluster was created.
   */
  createdAt?: string;
  /**
   * The metric ID of the cluster resource. Provided by the service and not modifiable by the user.
   */
  metricId?: string;
  platformCapabilities?: PlatformCapabilities;
  /**
   * Provisioning state of the Cluster.
   */
  provisioningState?: ProvisioningState;
  /**
   * Status of the Cluster resource
   */
  status?: string;
  /**
   * A value that indicates whether Scaling is Supported.
   */
  supportsScaling?: boolean;
  /**
   * The UTC time when the Event Hubs Cluster was last updated.
   */
  updatedAt?: string;
  /**
   * A value that indicates whether the cluster is zone redundant.
   */
  zoneRedundant?: boolean;
}

/**
 * Input type for Event Hubs Cluster properties supplied in responses in List or Get operations.
 */
export interface ClusterPropertiesInput extends InputOf<ClusterProperties> {
  platformCapabilities?: PlatformCapabilitiesInput | undefined;
  /**
   * A value that indicates whether Scaling is Supported.
   */
  supportsScaling?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether the cluster is zone redundant.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Event Hubs Cluster properties supplied in responses in List or Get operations.
 */
export interface ClusterPropertiesView extends InputOf<ClusterProperties> {
  /**
   * Read-only output: The UTC time when the Event Hubs Cluster was created.
   */
  readonly createdAt?: Expression<string> | undefined;
  /**
   * Read-only output: The metric ID of the cluster resource. Provided by the service and not modifiable by the user.
   */
  readonly metricId?: Expression<string> | undefined;
  platformCapabilities?: PlatformCapabilitiesView | undefined;
  /**
   * Read-only output: Provisioning state of the Cluster.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Read-only output: Status of the Cluster resource
   */
  readonly status?: Expression<string> | undefined;
  /**
   * A value that indicates whether Scaling is Supported.
   */
  supportsScaling?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The UTC time when the Event Hubs Cluster was last updated.
   */
  readonly updatedAt?: Expression<string> | undefined;
  /**
   * A value that indicates whether the cluster is zone redundant.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

export const clusterPropertiesShape: FlatModelShape = createFlatModelShape({
  createdAt: { armPath: ["createdAt"], value: createStringShape(), readOnly: true },
  metricId: { armPath: ["metricId"], value: createStringShape(), readOnly: true },
  platformCapabilities: {
    armPath: ["platformCapabilities"],
    value: createDeferredShape(() => platformCapabilitiesShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  status: { armPath: ["status"], value: createStringShape(), readOnly: true },
  supportsScaling: { armPath: ["supportsScaling"], value: createBooleanShape() },
  updatedAt: { armPath: ["updatedAt"], value: createStringShape(), readOnly: true },
  zoneRedundant: { armPath: ["zoneRedundant"], value: createBooleanShape() },
});

/**
 * SKU parameters particular to a cluster instance.
 */
export interface ClusterSku {
  /**
   * The quantity of Event Hubs Cluster Capacity Units contained in this cluster.
   */
  capacity?: number;
  /**
   * Name of this SKU.
   */
  name: ClusterSkuName;
}

/**
 * Input type for SKU parameters particular to a cluster instance.
 */
export interface ClusterSkuInput extends InputOf<ClusterSku> {
  /**
   * The quantity of Event Hubs Cluster Capacity Units contained in this cluster.
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * Name of this SKU.
   */
  name: ExpressionOrValue<ClusterSkuName>;
}

/**
 * View type for SKU parameters particular to a cluster instance.
 */
export type ClusterSkuView = ClusterSkuInput;

export const clusterSkuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  name: { armPath: ["name"], value: createUnionShape() },
});

export interface ConfidentialCompute {
  /**
   * Setting to Enable or Disable Confidential Compute
   */
  mode?: Mode;
}

export interface ConfidentialComputeInput extends InputOf<ConfidentialCompute> {
  /**
   * Setting to Enable or Disable Confidential Compute
   */
  mode?: ExpressionOrValue<Mode> | undefined;
}

export type ConfidentialComputeView = ConfidentialComputeInput;

export const confidentialComputeShape: FlatModelShape = createFlatModelShape({
  mode: { armPath: ["mode"], value: createUnionShape() },
});

/**
 * ConnectionState information.
 */
export interface ConnectionState {
  /**
   * Description of the connection state.
   */
  description?: string;
  /**
   * Status of the connection.
   */
  status?: PrivateLinkConnectionStatus;
}

/**
 * Input type for ConnectionState information.
 */
export interface ConnectionStateInput extends InputOf<ConnectionState> {
  /**
   * Description of the connection state.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Status of the connection.
   */
  status?: ExpressionOrValue<PrivateLinkConnectionStatus> | undefined;
}

/**
 * View type for ConnectionState information.
 */
export type ConnectionStateView = ConnectionStateInput;

export const connectionStateShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * Single item in List or Get Consumer group operation
 */
export interface ConsumerGroupProperties {
  /**
   * Exact time the message was created.
   */
  createdAt?: Date;
  /**
   * The exact time the message was updated.
   */
  updatedAt?: Date;
  /**
   * User Metadata is a placeholder to store user-defined string data with maximum length 1024. e.g. it can be used to store descriptive data, such as list of teams and their contact information also user-defined configuration settings can be stored.
   */
  userMetadata?: string;
}

/**
 * Input type for Single item in List or Get Consumer group operation
 */
export interface ConsumerGroupPropertiesInput extends InputOf<ConsumerGroupProperties> {
  /**
   * User Metadata is a placeholder to store user-defined string data with maximum length 1024. e.g. it can be used to store descriptive data, such as list of teams and their contact information also user-defined configuration settings can be stored.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Single item in List or Get Consumer group operation
 */
export interface ConsumerGroupPropertiesView extends InputOf<ConsumerGroupProperties> {
  /**
   * Read-only output: Exact time the message was created.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The exact time the message was updated.
   */
  readonly updatedAt?: Expression<Date> | undefined;
  /**
   * User Metadata is a placeholder to store user-defined string data with maximum length 1024. e.g. it can be used to store descriptive data, such as list of teams and their contact information also user-defined configuration settings can be stored.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

export const consumerGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  updatedAt: {
    armPath: ["updatedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  userMetadata: { armPath: ["userMetadata"], value: createStringShape() },
});

/**
 * Capture storage details for capture description
 */
export interface Destination {
  /**
   * A value that indicates whether capture description is enabled.
   */
  identity?: CaptureIdentity;
  /**
   * Name for capture destination
   */
  name?: string;
  /**
   * Properties describing the storage account, blob container and archive name format for capture destination
   */
  properties?: DestinationProperties;
}

/**
 * Input type for Capture storage details for capture description
 */
export interface DestinationInput extends InputOf<Destination> {
  /**
   * A value that indicates whether capture description is enabled.
   */
  identity?: CaptureIdentityInput | undefined;
  /**
   * Name for capture destination
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties describing the storage account, blob container and archive name format for capture destination
   */
  properties?: DestinationPropertiesInput | undefined;
}

/**
 * View type for Capture storage details for capture description
 */
export type DestinationView = DestinationInput;

export const destinationShape: FlatModelShape = createFlatModelShape({
  identity: { armPath: ["identity"], value: createDeferredShape(() => captureIdentityShape) },
  name: { armPath: ["name"], value: createStringShape() },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => destinationPropertiesShape),
  },
});

/**
 * Properties describing the storage account, blob container and archive name format for capture destination
 */
export interface DestinationProperties {
  /**
   * Blob naming convention for archive, e.g. {Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}. Here all the parameters (Namespace,EventHub .. etc) are mandatory irrespective of order
   */
  archiveNameFormat?: string;
  /**
   * Blob container Name
   */
  blobContainer?: string;
  /**
   * The Azure Data Lake Store name for the captured events
   */
  dataLakeAccountName?: string;
  /**
   * The destination folder path for the captured events
   */
  dataLakeFolderPath?: string;
  /**
   * Subscription Id of Azure Data Lake Store
   */
  dataLakeSubscriptionId?: string;
  /**
   * Resource id of the storage account to be used to create the blobs
   */
  storageAccountResourceId?: string;
}

/**
 * Input type for Properties describing the storage account, blob container and archive name format for capture destination
 */
export interface DestinationPropertiesInput extends InputOf<DestinationProperties> {
  /**
   * Blob naming convention for archive, e.g. {Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}. Here all the parameters (Namespace,EventHub .. etc) are mandatory irrespective of order
   */
  archiveNameFormat?: ExpressionOrValue<string> | undefined;
  /**
   * Blob container Name
   */
  blobContainer?: ExpressionOrValue<string> | undefined;
  /**
   * The Azure Data Lake Store name for the captured events
   */
  dataLakeAccountName?: ExpressionOrValue<string> | undefined;
  /**
   * The destination folder path for the captured events
   */
  dataLakeFolderPath?: ExpressionOrValue<string> | undefined;
  /**
   * Subscription Id of Azure Data Lake Store
   */
  dataLakeSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * Resource id of the storage account to be used to create the blobs
   */
  storageAccountResourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties describing the storage account, blob container and archive name format for capture destination
 */
export type DestinationPropertiesView = DestinationPropertiesInput;

export const destinationPropertiesShape: FlatModelShape = createFlatModelShape({
  archiveNameFormat: { armPath: ["archiveNameFormat"], value: createStringShape() },
  blobContainer: { armPath: ["blobContainer"], value: createStringShape() },
  dataLakeAccountName: { armPath: ["dataLakeAccountName"], value: createStringShape() },
  dataLakeFolderPath: { armPath: ["dataLakeFolderPath"], value: createStringShape() },
  dataLakeSubscriptionId: { armPath: ["dataLakeSubscriptionId"], value: createStringShape() },
  storageAccountResourceId: { armPath: ["storageAccountResourceId"], value: createStringShape() },
});

/**
 * Namespace properties supplied for create namespace operation.
 */
export interface EhNamespaceProperties {
  /**
   * Alternate name specified when alias and namespace names are same.
   */
  alternateName?: string;
  /**
   * Cluster ARM ID of the Namespace.
   */
  clusterArmId?: string;
  /**
   * The time the Namespace was created.
   */
  createdAt?: Date;
  /**
   * This property disables SAS authentication for the Event Hubs namespace.
   */
  disableLocalAuth?: boolean;
  /**
   * Properties of BYOK Encryption description
   */
  encryption?: Encryption;
  /**
   * Geo Data Replication settings for the namespace
   */
  geoDataReplication?: GeoDataReplicationProperties;
  /**
   * The IP address type for the namespace. Determines whether the namespace supports IPv4 only or both IPv4 and IPv6 (dual stack).
   */
  ipAddressType?: IpAddressType;
  /**
   * Value that indicates whether AutoInflate is enabled for eventhub namespace.
   */
  isAutoInflateEnabled?: boolean;
  /**
   * Value that indicates whether Kafka is enabled for eventhub namespace.
   */
  kafkaEnabled?: boolean;
  /**
   * Upper limit of throughput units when AutoInflate is enabled, value should be within 0 to 20 throughput units. ( '0' if AutoInflateEnabled = true)
   */
  maximumThroughputUnits?: number;
  /**
   * Identifier for Azure Insights metrics.
   */
  metricId?: string;
  /**
   * The minimum TLS version for the cluster to support, e.g. '1.2'
   */
  minimumTlsVersion?: TlsVersion;
  platformCapabilities?: PlatformCapabilities;
  /**
   * List of private endpoint connections.
   */
  privateEndpointConnections?: EventHubPrivateEndpointConnection[];
  /**
   * Provisioning state of the Namespace.
   */
  provisioningState?: string;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /**
   * Endpoint you can use to perform Service Bus operations.
   */
  serviceBusEndpoint?: string;
  /**
   * Status of the Namespace.
   */
  status?: string;
  /**
   * The time the Namespace was updated.
   */
  updatedAt?: Date;
  /**
   * Enabling this property creates a Standard Event Hubs Namespace in regions supported availability zones.
   */
  zoneRedundant?: boolean;
}

/**
 * Input type for Namespace properties supplied for create namespace operation.
 */
export interface EhNamespacePropertiesInput extends InputOf<EhNamespaceProperties> {
  /**
   * Alternate name specified when alias and namespace names are same.
   */
  alternateName?: ExpressionOrValue<string> | undefined;
  /**
   * Cluster ARM ID of the Namespace.
   */
  clusterArmId?: ExpressionOrValue<string> | undefined;
  /**
   * This property disables SAS authentication for the Event Hubs namespace.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Properties of BYOK Encryption description
   */
  encryption?: EncryptionInput | undefined;
  /**
   * Geo Data Replication settings for the namespace
   */
  geoDataReplication?: GeoDataReplicationPropertiesInput | undefined;
  /**
   * The IP address type for the namespace. Determines whether the namespace supports IPv4 only or both IPv4 and IPv6 (dual stack).
   */
  ipAddressType?: ExpressionOrValue<IpAddressType> | undefined;
  /**
   * Value that indicates whether AutoInflate is enabled for eventhub namespace.
   */
  isAutoInflateEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether Kafka is enabled for eventhub namespace.
   */
  kafkaEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Upper limit of throughput units when AutoInflate is enabled, value should be within 0 to 20 throughput units. ( '0' if AutoInflateEnabled = true)
   */
  maximumThroughputUnits?: ExpressionOrValue<number> | undefined;
  /**
   * The minimum TLS version for the cluster to support, e.g. '1.2'
   */
  minimumTlsVersion?: ExpressionOrValue<TlsVersion> | undefined;
  platformCapabilities?: PlatformCapabilitiesInput | undefined;
  /**
   * List of private endpoint connections.
   */
  privateEndpointConnections?:
    | InputArray<EventHubPrivateEndpointConnectionInput, EventHubPrivateEndpointConnection[]>
    | undefined;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Enabling this property creates a Standard Event Hubs Namespace in regions supported availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Namespace properties supplied for create namespace operation.
 */
export interface EhNamespacePropertiesView extends InputOf<EhNamespaceProperties> {
  /**
   * Alternate name specified when alias and namespace names are same.
   */
  alternateName?: ExpressionOrValue<string> | undefined;
  /**
   * Cluster ARM ID of the Namespace.
   */
  clusterArmId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The time the Namespace was created.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * This property disables SAS authentication for the Event Hubs namespace.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Properties of BYOK Encryption description
   */
  encryption?: EncryptionView | undefined;
  /**
   * Geo Data Replication settings for the namespace
   */
  geoDataReplication?: GeoDataReplicationPropertiesView | undefined;
  /**
   * The IP address type for the namespace. Determines whether the namespace supports IPv4 only or both IPv4 and IPv6 (dual stack).
   */
  ipAddressType?: ExpressionOrValue<IpAddressType> | undefined;
  /**
   * Value that indicates whether AutoInflate is enabled for eventhub namespace.
   */
  isAutoInflateEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether Kafka is enabled for eventhub namespace.
   */
  kafkaEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Upper limit of throughput units when AutoInflate is enabled, value should be within 0 to 20 throughput units. ( '0' if AutoInflateEnabled = true)
   */
  maximumThroughputUnits?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Identifier for Azure Insights metrics.
   */
  readonly metricId?: Expression<string> | undefined;
  /**
   * The minimum TLS version for the cluster to support, e.g. '1.2'
   */
  minimumTlsVersion?: ExpressionOrValue<TlsVersion> | undefined;
  platformCapabilities?: PlatformCapabilitiesView | undefined;
  /**
   * List of private endpoint connections.
   */
  privateEndpointConnections?:
    | InputArray<EventHubPrivateEndpointConnectionView, EventHubPrivateEndpointConnection[]>
    | undefined;
  /**
   * Read-only output: Provisioning state of the Namespace.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Read-only output: Endpoint you can use to perform Service Bus operations.
   */
  readonly serviceBusEndpoint?: Expression<string> | undefined;
  /**
   * Read-only output: Status of the Namespace.
   */
  readonly status?: Expression<string> | undefined;
  /**
   * Read-only output: The time the Namespace was updated.
   */
  readonly updatedAt?: Expression<Date> | undefined;
  /**
   * Enabling this property creates a Standard Event Hubs Namespace in regions supported availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

export const ehNamespacePropertiesShape: FlatModelShape = createFlatModelShape({
  alternateName: { armPath: ["alternateName"], value: createStringShape() },
  clusterArmId: { armPath: ["clusterArmId"], value: createStringShape() },
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  disableLocalAuth: { armPath: ["disableLocalAuth"], value: createBooleanShape() },
  encryption: { armPath: ["encryption"], value: createDeferredShape(() => encryptionShape) },
  geoDataReplication: {
    armPath: ["geoDataReplication"],
    value: createDeferredShape(() => geoDataReplicationPropertiesShape),
  },
  ipAddressType: { armPath: ["ipAddressType"], value: createUnionShape() },
  isAutoInflateEnabled: { armPath: ["isAutoInflateEnabled"], value: createBooleanShape() },
  kafkaEnabled: { armPath: ["kafkaEnabled"], value: createBooleanShape() },
  maximumThroughputUnits: { armPath: ["maximumThroughputUnits"], value: createNumberShape() },
  metricId: { armPath: ["metricId"], value: createStringShape(), readOnly: true },
  minimumTlsVersion: { armPath: ["minimumTlsVersion"], value: createUnionShape() },
  platformCapabilities: {
    armPath: ["platformCapabilities"],
    value: createDeferredShape(() => platformCapabilitiesShape),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => eventHubPrivateEndpointConnectionShape)),
  },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  serviceBusEndpoint: {
    armPath: ["serviceBusEndpoint"],
    value: createStringShape(),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createStringShape(), readOnly: true },
  updatedAt: {
    armPath: ["updatedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  zoneRedundant: { armPath: ["zoneRedundant"], value: createBooleanShape() },
});

/**
 * Properties to configure Encryption
 */
export interface Encryption {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: "Microsoft.KeyVault";
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: KeyVaultProperties[];
  /**
   * Enable Infrastructure Encryption (Double Encryption)
   */
  requireInfrastructureEncryption?: boolean;
}

/**
 * Input type for Properties to configure Encryption
 */
export interface EncryptionInput extends InputOf<Encryption> {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: ExpressionOrValue<"Microsoft.KeyVault"> | undefined;
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: InputArray<KeyVaultPropertiesInput, KeyVaultProperties[]> | undefined;
  /**
   * Enable Infrastructure Encryption (Double Encryption)
   */
  requireInfrastructureEncryption?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties to configure Encryption
 */
export type EncryptionView = EncryptionInput;

export const encryptionShape: FlatModelShape = createFlatModelShape({
  keySource: { armPath: ["keySource"], value: createStringLiteralShape() },
  keyVaultProperties: {
    armPath: ["keyVaultProperties"],
    value: createArrayShape(createDeferredShape(() => keyVaultPropertiesShape)),
  },
  requireInfrastructureEncryption: {
    armPath: ["requireInfrastructureEncryption"],
    value: createBooleanShape(),
  },
});

/**
 * Properties of the PrivateEndpointConnection.
 */
export interface EventHubPrivateEndpointConnection {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The geo-location where the resource lives
   */
  location?: string;
  /**
   * The PrivateEndpointConnection name
   */
  name?: string;
  /**
   * Properties of the PrivateEndpointConnection.
   */
  properties?: PrivateEndpointConnectionProperties;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  systemData?: SystemData;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  type?: string;
}

/**
 * Input type for Properties of the PrivateEndpointConnection.
 */
export interface EventHubPrivateEndpointConnectionInput extends InputOf<EventHubPrivateEndpointConnection> {
  /**
   * Properties of the PrivateEndpointConnection.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for Properties of the PrivateEndpointConnection.
 */
export interface EventHubPrivateEndpointConnectionView extends InputOf<EventHubPrivateEndpointConnection> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The geo-location where the resource lives
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The PrivateEndpointConnection name
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Properties of the PrivateEndpointConnection.
   */
  properties?: PrivateEndpointConnectionPropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const eventHubPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
  },
  systemData: {
    armPath: ["systemData"],
    value: createDeferredShape(() => systemDataShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * Properties supplied to the Create Or Update Event Hub operation.
 */
export interface EventhubProperties {
  /**
   * Properties of capture description
   */
  captureDescription?: CaptureDescription;
  /**
   * Exact time the Event Hub was created.
   */
  createdAt?: Date;
  /**
   * Denotes the unique identifier for event hub and is generated by service while creating topic. This identifier can be used in kafka runtime apis wherever a UUID is required e.g Fetch & Delete Topic. This identifier is not supported in AMQP runtime operations yet.
   */
  identifier?: string;
  /**
   * Number of days to retain the events for this Event Hub, value should be 1 to 7 days
   */
  messageRetentionInDays?: number;
  /**
   * Properties of MessageTimestamp Description
   */
  messageTimestampDescription?: MessageTimestampDescription;
  /**
   * Number of partitions created for the Event Hub, allowed values are from 1 to 32 partitions.
   */
  partitionCount?: number;
  /**
   * Current number of shards on the Event Hub.
   */
  partitionIds?: string[];
  /**
   * Event Hub retention settings
   */
  retentionDescription?: RetentionDescription;
  /**
   * Enumerates the possible values for the status of the Event Hub.
   */
  status?: EntityStatus;
  /**
   * The exact time the message was updated.
   */
  updatedAt?: Date;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: string;
}

/**
 * Input type for Properties supplied to the Create Or Update Event Hub operation.
 */
export interface EventhubPropertiesInput extends InputOf<EventhubProperties> {
  /**
   * Properties of capture description
   */
  captureDescription?: CaptureDescriptionInput | undefined;
  /**
   * Number of days to retain the events for this Event Hub, value should be 1 to 7 days
   */
  messageRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Properties of MessageTimestamp Description
   */
  messageTimestampDescription?: MessageTimestampDescriptionInput | undefined;
  /**
   * Number of partitions created for the Event Hub, allowed values are from 1 to 32 partitions.
   */
  partitionCount?: ExpressionOrValue<number> | undefined;
  /**
   * Event Hub retention settings
   */
  retentionDescription?: RetentionDescriptionInput | undefined;
  /**
   * Enumerates the possible values for the status of the Event Hub.
   */
  status?: ExpressionOrValue<EntityStatus> | undefined;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties supplied to the Create Or Update Event Hub operation.
 */
export interface EventhubPropertiesView extends InputOf<EventhubProperties> {
  /**
   * Properties of capture description
   */
  captureDescription?: CaptureDescriptionView | undefined;
  /**
   * Read-only output: Exact time the Event Hub was created.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: Denotes the unique identifier for event hub and is generated by service while creating topic. This identifier can be used in kafka runtime apis wherever a UUID is required e.g Fetch & Delete Topic. This identifier is not supported in AMQP runtime operations yet.
   */
  readonly identifier?: Expression<string> | undefined;
  /**
   * Number of days to retain the events for this Event Hub, value should be 1 to 7 days
   */
  messageRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Properties of MessageTimestamp Description
   */
  messageTimestampDescription?: MessageTimestampDescriptionView | undefined;
  /**
   * Number of partitions created for the Event Hub, allowed values are from 1 to 32 partitions.
   */
  partitionCount?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Current number of shards on the Event Hub.
   */
  readonly partitionIds?: Expression<string[]> | undefined;
  /**
   * Event Hub retention settings
   */
  retentionDescription?: RetentionDescriptionView | undefined;
  /**
   * Enumerates the possible values for the status of the Event Hub.
   */
  status?: ExpressionOrValue<EntityStatus> | undefined;
  /**
   * Read-only output: The exact time the message was updated.
   */
  readonly updatedAt?: Expression<Date> | undefined;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

export const eventhubPropertiesShape: FlatModelShape = createFlatModelShape({
  captureDescription: {
    armPath: ["captureDescription"],
    value: createDeferredShape(() => captureDescriptionShape),
  },
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  identifier: { armPath: ["identifier"], value: createStringShape(), readOnly: true },
  messageRetentionInDays: { armPath: ["messageRetentionInDays"], value: createNumberShape() },
  messageTimestampDescription: {
    armPath: ["messageTimestampDescription"],
    value: createDeferredShape(() => messageTimestampDescriptionShape),
  },
  partitionCount: { armPath: ["partitionCount"], value: createNumberShape() },
  partitionIds: {
    armPath: ["partitionIds"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  retentionDescription: {
    armPath: ["retentionDescription"],
    value: createDeferredShape(() => retentionDescriptionShape),
  },
  status: { armPath: ["status"], value: createEnumShape() },
  updatedAt: {
    armPath: ["updatedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  userMetadata: { armPath: ["userMetadata"], value: createStringShape() },
});

/**
 * GeoDR Replication properties
 */
export interface GeoDataReplicationProperties {
  /**
   * A list of regions where replicas of the namespace are maintained.
   */
  locations?: NamespaceReplicaLocation[];
  /**
   * The maximum acceptable lag for data replication operations from the primary replica to a quorum of secondary replicas. When the lag exceeds the configured amount, operations on the primary replica will be failed. The allowed values are 0 and 5 minutes to 1 day.
   */
  maxReplicationLagDurationInSeconds?: number;
}

/**
 * Input type for GeoDR Replication properties
 */
export interface GeoDataReplicationPropertiesInput extends InputOf<GeoDataReplicationProperties> {
  /**
   * A list of regions where replicas of the namespace are maintained.
   */
  locations?: InputArray<NamespaceReplicaLocationInput, NamespaceReplicaLocation[]> | undefined;
  /**
   * The maximum acceptable lag for data replication operations from the primary replica to a quorum of secondary replicas. When the lag exceeds the configured amount, operations on the primary replica will be failed. The allowed values are 0 and 5 minutes to 1 day.
   */
  maxReplicationLagDurationInSeconds?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for GeoDR Replication properties
 */
export interface GeoDataReplicationPropertiesView extends InputOf<GeoDataReplicationProperties> {
  /**
   * A list of regions where replicas of the namespace are maintained.
   */
  locations?: InputArray<NamespaceReplicaLocationView, NamespaceReplicaLocation[]> | undefined;
  /**
   * The maximum acceptable lag for data replication operations from the primary replica to a quorum of secondary replicas. When the lag exceeds the configured amount, operations on the primary replica will be failed. The allowed values are 0 and 5 minutes to 1 day.
   */
  maxReplicationLagDurationInSeconds?: ExpressionOrValue<number> | undefined;
}

export const geoDataReplicationPropertiesShape: FlatModelShape = createFlatModelShape({
  locations: {
    armPath: ["locations"],
    value: createArrayShape(createDeferredShape(() => namespaceReplicaLocationShape)),
  },
  maxReplicationLagDurationInSeconds: {
    armPath: ["maxReplicationLagDurationInSeconds"],
    value: createNumberShape(),
  },
});

/**
 * Properties to configure Identity for Bring your Own Keys
 */
export interface Identity {
  /**
   * ObjectId from the KeyVault
   */
  principalId?: string;
  /**
   * TenantId from the KeyVault
   */
  tenantId?: string;
  /**
   * Type of managed service identity.
   */
  type?: ManagedServiceIdentityType;
  /**
   * Properties for User Assigned Identities
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

/**
 * Input type for Properties to configure Identity for Bring your Own Keys
 */
export interface IdentityInput extends InputOf<Identity> {
  /**
   * Type of managed service identity.
   */
  type?: ExpressionOrValue<ManagedServiceIdentityType> | undefined;
  /**
   * Properties for User Assigned Identities
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityInput, Record<string, UserAssignedIdentity>> | undefined;
}

/**
 * View type for Properties to configure Identity for Bring your Own Keys
 */
export interface IdentityView extends InputOf<Identity> {
  /**
   * Read-only output: ObjectId from the KeyVault
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: TenantId from the KeyVault
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Type of managed service identity.
   */
  type?: ExpressionOrValue<ManagedServiceIdentityType> | undefined;
  /**
   * Properties for User Assigned Identities
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityView, Record<string, UserAssignedIdentity>> | undefined;
}

export const identityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createEnumShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
  },
});

/**
 * Properties to configure keyVault Properties
 */
export interface KeyVaultProperties {
  identity?: UserAssignedIdentityProperties;
  /**
   * Name of the Key from KeyVault
   */
  keyName?: string;
  /**
   * Uri of KeyVault
   */
  keyVaultUri?: string;
  /**
   * Key Version
   */
  keyVersion?: string;
}

/**
 * Input type for Properties to configure keyVault Properties
 */
export interface KeyVaultPropertiesInput extends InputOf<KeyVaultProperties> {
  identity?: UserAssignedIdentityPropertiesInput | undefined;
  /**
   * Name of the Key from KeyVault
   */
  keyName?: ExpressionOrValue<string> | undefined;
  /**
   * Uri of KeyVault
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * Key Version
   */
  keyVersion?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties to configure keyVault Properties
 */
export type KeyVaultPropertiesView = KeyVaultPropertiesInput;

export const keyVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  identity: {
    armPath: ["identity"],
    value: createDeferredShape(() => userAssignedIdentityPropertiesShape),
  },
  keyName: { armPath: ["keyName"], value: createStringShape() },
  keyVaultUri: { armPath: ["keyVaultUri"], value: createStringShape() },
  keyVersion: { armPath: ["keyVersion"], value: createStringShape() },
});

/**
 * Properties of MessageTimestamp Description
 */
export interface MessageTimestampDescription {
  /**
   * Denotes the type of timestamp the message will hold.Two types of timestamp types - "AppendTime" and "CreateTime". AppendTime refers the time in which message got appended inside broker log. CreateTime refers to the time in which the message was generated on source side and producers can set this timestamp while sending the message. Default value is AppendTime. If you are using AMQP protocol, CreateTime equals AppendTime and its behavior remains the same.
   */
  timestampType?: TimestampType;
}

/**
 * Input type for Properties of MessageTimestamp Description
 */
export interface MessageTimestampDescriptionInput extends InputOf<MessageTimestampDescription> {
  /**
   * Denotes the type of timestamp the message will hold.Two types of timestamp types - "AppendTime" and "CreateTime". AppendTime refers the time in which message got appended inside broker log. CreateTime refers to the time in which the message was generated on source side and producers can set this timestamp while sending the message. Default value is AppendTime. If you are using AMQP protocol, CreateTime equals AppendTime and its behavior remains the same.
   */
  timestampType?: ExpressionOrValue<TimestampType> | undefined;
}

/**
 * View type for Properties of MessageTimestamp Description
 */
export type MessageTimestampDescriptionView = MessageTimestampDescriptionInput;

export const messageTimestampDescriptionShape: FlatModelShape = createFlatModelShape({
  timestampType: { armPath: ["timestampType"], value: createUnionShape() },
});

/**
 * Namespace replication properties
 */
export interface NamespaceReplicaLocation {
  /**
   * Optional property that denotes the ARM ID of the Cluster. This is required, if a namespace replica should be placed in a Dedicated Event Hub Cluster
   */
  clusterArmId?: string;
  /**
   * Azure regions where a replica of the namespace is maintained
   */
  locationName?: string;
  /**
   * state of Namespace replica.
   */
  replicaState?: string;
  /**
   * GeoDR Role Types
   */
  roleType?: GeoDrRoleType;
}

/**
 * Input type for Namespace replication properties
 */
export interface NamespaceReplicaLocationInput extends InputOf<NamespaceReplicaLocation> {
  /**
   * Optional property that denotes the ARM ID of the Cluster. This is required, if a namespace replica should be placed in a Dedicated Event Hub Cluster
   */
  clusterArmId?: ExpressionOrValue<string> | undefined;
  /**
   * Azure regions where a replica of the namespace is maintained
   */
  locationName?: ExpressionOrValue<string> | undefined;
  /**
   * GeoDR Role Types
   */
  roleType?: ExpressionOrValue<GeoDrRoleType> | undefined;
}

/**
 * View type for Namespace replication properties
 */
export interface NamespaceReplicaLocationView extends InputOf<NamespaceReplicaLocation> {
  /**
   * Optional property that denotes the ARM ID of the Cluster. This is required, if a namespace replica should be placed in a Dedicated Event Hub Cluster
   */
  clusterArmId?: ExpressionOrValue<string> | undefined;
  /**
   * Azure regions where a replica of the namespace is maintained
   */
  locationName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: state of Namespace replica.
   */
  readonly replicaState?: Expression<string> | undefined;
  /**
   * GeoDR Role Types
   */
  roleType?: ExpressionOrValue<GeoDrRoleType> | undefined;
}

export const namespaceReplicaLocationShape: FlatModelShape = createFlatModelShape({
  clusterArmId: { armPath: ["clusterArmId"], value: createStringShape() },
  locationName: { armPath: ["locationName"], value: createStringShape() },
  replicaState: { armPath: ["replicaState"], value: createStringShape(), readOnly: true },
  roleType: { armPath: ["roleType"], value: createUnionShape() },
});

/**
 * NetworkRuleSet properties
 */
export interface NetworkRuleSetProperties {
  /**
   * Default Action for Network Rule Set
   */
  defaultAction?: DefaultAction;
  /**
   * List of IpRules
   */
  ipRules?: NwRuleSetIpRules[];
  /**
   * This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules.
   */
  publicNetworkAccess?: PublicNetworkAccessFlag;
  /**
   * Value that indicates whether Trusted Service Access is Enabled or not.
   */
  trustedServiceAccessEnabled?: boolean;
  /**
   * List VirtualNetwork Rules
   */
  virtualNetworkRules?: NwRuleSetVirtualNetworkRules[];
}

/**
 * Input type for NetworkRuleSet properties
 */
export interface NetworkRuleSetPropertiesInput extends InputOf<NetworkRuleSetProperties> {
  /**
   * Default Action for Network Rule Set
   */
  defaultAction?: ExpressionOrValue<DefaultAction> | undefined;
  /**
   * List of IpRules
   */
  ipRules?: InputArray<NwRuleSetIpRulesInput, NwRuleSetIpRules[]> | undefined;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccessFlag> | undefined;
  /**
   * Value that indicates whether Trusted Service Access is Enabled or not.
   */
  trustedServiceAccessEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * List VirtualNetwork Rules
   */
  virtualNetworkRules?:
    InputArray<NwRuleSetVirtualNetworkRulesInput, NwRuleSetVirtualNetworkRules[]> | undefined;
}

/**
 * View type for NetworkRuleSet properties
 */
export type NetworkRuleSetPropertiesView = NetworkRuleSetPropertiesInput;

export const networkRuleSetPropertiesShape: FlatModelShape = createFlatModelShape({
  defaultAction: { armPath: ["defaultAction"], value: createUnionShape() },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => nwRuleSetIpRulesShape)),
  },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  trustedServiceAccessEnabled: {
    armPath: ["trustedServiceAccessEnabled"],
    value: createBooleanShape(),
  },
  virtualNetworkRules: {
    armPath: ["virtualNetworkRules"],
    value: createArrayShape(createDeferredShape(() => nwRuleSetVirtualNetworkRulesShape)),
  },
});

/**
 * NetworkSecurityPerimeter related information
 */
export interface NetworkSecurityPerimeter {
  /**
   * Fully qualified identifier of the resource
   */
  id?: string;
  /**
   * Location of the resource
   */
  location?: string;
  /**
   * Guid of the resource
   */
  perimeterGuid?: string;
}

/**
 * Input type for NetworkSecurityPerimeter related information
 */
export interface NetworkSecurityPerimeterInput extends InputOf<NetworkSecurityPerimeter> {}

/**
 * View type for NetworkSecurityPerimeter related information
 */
export interface NetworkSecurityPerimeterView extends InputOf<NetworkSecurityPerimeter> {
  /**
   * Read-only output: Fully qualified identifier of the resource
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Location of the resource
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Guid of the resource
   */
  readonly perimeterGuid?: Expression<string> | undefined;
}

export const networkSecurityPerimeterShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  perimeterGuid: { armPath: ["perimeterGuid"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of NetworkSecurityPerimeterConfiguration
 */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /**
   * Indicates that the NSP controls related to backing association are only applicable to a specific feature in backing resource's data plane.
   */
  applicableFeatures?: string[];
  /**
   * True if the EventHub namespace is backed by another Azure resource and not visible to end users.
   */
  isBackingResource?: boolean;
  /**
   * NetworkSecurityPerimeter related information
   */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /**
   * Source Resource Association name
   */
  parentAssociationName?: string;
  /**
   * Information about current network profile
   */
  profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
  /**
   * List of Provisioning Issues if any
   */
  provisioningIssues?: ProvisioningIssue[];
  /**
   * Provisioning state of NetworkSecurityPerimeter configuration propagation
   */
  provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /**
   * Information about resource association
   */
  resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
  /**
   * ARM Id of source resource
   */
  sourceResourceId?: string;
}

/**
 * Input type for Properties of NetworkSecurityPerimeterConfiguration
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesInput extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {}

/**
 * View type for Properties of NetworkSecurityPerimeterConfiguration
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesView extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {
  /**
   * Read-only output: Indicates that the NSP controls related to backing association are only applicable to a specific feature in backing resource's data plane.
   */
  readonly applicableFeatures?: Expression<string[]> | undefined;
  /**
   * Read-only output: True if the EventHub namespace is backed by another Azure resource and not visible to end users.
   */
  readonly isBackingResource?: Expression<boolean> | undefined;
  /**
   * Read-only output: NetworkSecurityPerimeter related information
   */
  readonly networkSecurityPerimeter?: Expression<NetworkSecurityPerimeter> | undefined;
  /**
   * Read-only output: Source Resource Association name
   */
  readonly parentAssociationName?: Expression<string> | undefined;
  /**
   * Read-only output: Information about current network profile
   */
  readonly profile?: Expression<NetworkSecurityPerimeterConfigurationPropertiesProfile> | undefined;
  /**
   * Read-only output: List of Provisioning Issues if any
   */
  readonly provisioningIssues?: Expression<ProvisioningIssue[]> | undefined;
  /**
   * Read-only output: Provisioning state of NetworkSecurityPerimeter configuration propagation
   */
  readonly provisioningState?:
    Expression<NetworkSecurityPerimeterConfigurationProvisioningState> | undefined;
  /**
   * Read-only output: Information about resource association
   */
  readonly resourceAssociation?:
    Expression<NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation> | undefined;
  /**
   * Read-only output: ARM Id of source resource
   */
  readonly sourceResourceId?: Expression<string> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesShape: FlatModelShape =
  createFlatModelShape({
    applicableFeatures: {
      armPath: ["applicableFeatures"],
      value: createArrayShape(createStringShape()),
      readOnly: true,
    },
    isBackingResource: {
      armPath: ["isBackingResource"],
      value: createBooleanShape(),
      readOnly: true,
    },
    networkSecurityPerimeter: {
      armPath: ["networkSecurityPerimeter"],
      value: createDeferredShape(() => networkSecurityPerimeterShape),
      readOnly: true,
    },
    parentAssociationName: {
      armPath: ["parentAssociationName"],
      value: createStringShape(),
      readOnly: true,
    },
    profile: {
      armPath: ["profile"],
      value: createDeferredShape(() => networkSecurityPerimeterConfigurationPropertiesProfileShape),
      readOnly: true,
    },
    provisioningIssues: {
      armPath: ["provisioningIssues"],
      value: createArrayShape(createDeferredShape(() => provisioningIssueShape)),
      readOnly: true,
    },
    provisioningState: {
      armPath: ["provisioningState"],
      value: createUnionShape(),
      readOnly: true,
    },
    resourceAssociation: {
      armPath: ["resourceAssociation"],
      value: createDeferredShape(
        () => networkSecurityPerimeterConfigurationPropertiesResourceAssociationShape,
      ),
      readOnly: true,
    },
    sourceResourceId: { armPath: ["sourceResourceId"], value: createStringShape(), readOnly: true },
  });

/**
 * Information about current network profile
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfile {
  /**
   * List of Access Rules
   */
  accessRules?: NspAccessRule[];
  /**
   * Current access rules version
   */
  accessRulesVersion?: string;
  /**
   * Name of the resource
   */
  name?: string;
}

/**
 * Input type for Information about current network profile
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfileInput extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesProfile> {}

/**
 * View type for Information about current network profile
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfileView extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesProfile> {
  /**
   * Read-only output: List of Access Rules
   */
  readonly accessRules?: Expression<NspAccessRule[]> | undefined;
  /**
   * Read-only output: Current access rules version
   */
  readonly accessRulesVersion?: Expression<string> | undefined;
  /**
   * Read-only output: Name of the resource
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesProfileShape: FlatModelShape =
  createFlatModelShape({
    accessRules: {
      armPath: ["accessRules"],
      value: createArrayShape(createDeferredShape(() => nspAccessRuleShape)),
      readOnly: true,
    },
    accessRulesVersion: {
      armPath: ["accessRulesVersion"],
      value: createStringShape(),
      readOnly: true,
    },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  });

/**
 * Information about resource association
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation {
  /**
   * Access Mode of the resource association
   */
  accessMode?: ResourceAssociationAccessMode;
  /**
   * Name of the resource association
   */
  name?: string;
}

/**
 * Input type for Information about resource association
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociationInput extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation> {}

/**
 * View type for Information about resource association
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociationView extends InputOf<NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation> {
  /**
   * Read-only output: Access Mode of the resource association
   */
  readonly accessMode?: Expression<ResourceAssociationAccessMode> | undefined;
  /**
   * Read-only output: Name of the resource association
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesResourceAssociationShape: FlatModelShape =
  createFlatModelShape({
    accessMode: { armPath: ["accessMode"], value: createUnionShape(), readOnly: true },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  });

/**
 * Information of Access Rule in Network Profile
 */
export interface NspAccessRule {
  /**
   * Fully qualified identifier of the resource
   */
  id?: string;
  /**
   * Name of the resource
   */
  name?: string;
  /**
   * Properties of Access Rule
   */
  properties?: NspAccessRuleProperties;
  /**
   * Type of the resource
   */
  type?: string;
}

/**
 * Input type for Information of Access Rule in Network Profile
 */
export interface NspAccessRuleInput extends InputOf<NspAccessRule> {}

/**
 * View type for Information of Access Rule in Network Profile
 */
export interface NspAccessRuleView extends InputOf<NspAccessRule> {
  /**
   * Read-only output: Fully qualified identifier of the resource
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Name of the resource
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of Access Rule
   */
  readonly properties?: Expression<NspAccessRuleProperties> | undefined;
  /**
   * Read-only output: Type of the resource
   */
  readonly type?: Expression<string> | undefined;
}

export const nspAccessRuleShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => nspAccessRulePropertiesShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of Access Rule
 */
export interface NspAccessRuleProperties {
  /**
   * Address prefixes in the CIDR format for inbound rules
   */
  addressPrefixes?: string[];
  /**
   * Direction of Access Rule
   */
  direction?: NspAccessRuleDirection;
  /**
   * FQDN for outbound rules
   */
  fullyQualifiedDomainNames?: string[];
  /**
   * NetworkSecurityPerimeters for inbound rules
   */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /**
   * Subscriptions for inbound rules
   */
  subscriptions?: NspAccessRulePropertiesSubscriptionsItem[];
}

/**
 * Input type for Properties of Access Rule
 */
export interface NspAccessRulePropertiesInput extends InputOf<NspAccessRuleProperties> {}

/**
 * View type for Properties of Access Rule
 */
export interface NspAccessRulePropertiesView extends InputOf<NspAccessRuleProperties> {
  /**
   * Read-only output: Address prefixes in the CIDR format for inbound rules
   */
  readonly addressPrefixes?: Expression<string[]> | undefined;
  /**
   * Read-only output: Direction of Access Rule
   */
  readonly direction?: Expression<NspAccessRuleDirection> | undefined;
  /**
   * Read-only output: FQDN for outbound rules
   */
  readonly fullyQualifiedDomainNames?: Expression<string[]> | undefined;
  /**
   * Read-only output: NetworkSecurityPerimeters for inbound rules
   */
  readonly networkSecurityPerimeters?: Expression<NetworkSecurityPerimeter[]> | undefined;
  /**
   * Read-only output: Subscriptions for inbound rules
   */
  readonly subscriptions?: Expression<NspAccessRulePropertiesSubscriptionsItem[]> | undefined;
}

export const nspAccessRulePropertiesShape: FlatModelShape = createFlatModelShape({
  addressPrefixes: {
    armPath: ["addressPrefixes"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  direction: { armPath: ["direction"], value: createUnionShape(), readOnly: true },
  fullyQualifiedDomainNames: {
    armPath: ["fullyQualifiedDomainNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  networkSecurityPerimeters: {
    armPath: ["networkSecurityPerimeters"],
    value: createArrayShape(createDeferredShape(() => networkSecurityPerimeterShape)),
    readOnly: true,
  },
  subscriptions: {
    armPath: ["subscriptions"],
    value: createArrayShape(
      createDeferredShape(() => nspAccessRulePropertiesSubscriptionsItemShape),
    ),
    readOnly: true,
  },
});

/**
 * Subscription for inbound rule
 */
export interface NspAccessRulePropertiesSubscriptionsItem {
  /**
   * Fully qualified identifier of subscription
   */
  id?: string;
}

/**
 * Input type for Subscription for inbound rule
 */
export interface NspAccessRulePropertiesSubscriptionsItemInput extends InputOf<NspAccessRulePropertiesSubscriptionsItem> {}

/**
 * View type for Subscription for inbound rule
 */
export interface NspAccessRulePropertiesSubscriptionsItemView extends InputOf<NspAccessRulePropertiesSubscriptionsItem> {
  /**
   * Read-only output: Fully qualified identifier of subscription
   */
  readonly id?: Expression<string> | undefined;
}

export const nspAccessRulePropertiesSubscriptionsItemShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
});

/**
 * The response from the List namespace operation.
 */
export interface NwRuleSetIpRules {
  /**
   * The IP Filter Action
   */
  action?: NetworkRuleIpAction;
  /**
   * IP Mask
   */
  ipMask?: string;
}

/**
 * Input type for The response from the List namespace operation.
 */
export interface NwRuleSetIpRulesInput extends InputOf<NwRuleSetIpRules> {
  /**
   * The IP Filter Action
   */
  action?: ExpressionOrValue<NetworkRuleIpAction> | undefined;
  /**
   * IP Mask
   */
  ipMask?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The response from the List namespace operation.
 */
export type NwRuleSetIpRulesView = NwRuleSetIpRulesInput;

export const nwRuleSetIpRulesShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape() },
  ipMask: { armPath: ["ipMask"], value: createStringShape() },
});

/**
 * The response from the List namespace operation.
 */
export interface NwRuleSetVirtualNetworkRules {
  /**
   * Value that indicates whether to ignore missing Vnet Service Endpoint
   */
  ignoreMissingVnetServiceEndpoint?: boolean;
  /**
   * Subnet properties
   */
  subnet?: Subnet;
}

/**
 * Input type for The response from the List namespace operation.
 */
export interface NwRuleSetVirtualNetworkRulesInput extends InputOf<NwRuleSetVirtualNetworkRules> {
  /**
   * Value that indicates whether to ignore missing Vnet Service Endpoint
   */
  ignoreMissingVnetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
  /**
   * Subnet properties
   */
  subnet?: SubnetInput | undefined;
}

/**
 * View type for The response from the List namespace operation.
 */
export type NwRuleSetVirtualNetworkRulesView = NwRuleSetVirtualNetworkRulesInput;

export const nwRuleSetVirtualNetworkRulesShape: FlatModelShape = createFlatModelShape({
  ignoreMissingVnetServiceEndpoint: {
    armPath: ["ignoreMissingVnetServiceEndpoint"],
    value: createBooleanShape(),
  },
  subnet: { armPath: ["subnet"], value: createDeferredShape(() => subnetShape) },
});

export interface PlatformCapabilities {
  confidentialCompute?: ConfidentialCompute;
}

export interface PlatformCapabilitiesInput extends InputOf<PlatformCapabilities> {
  confidentialCompute?: ConfidentialComputeInput | undefined;
}

export type PlatformCapabilitiesView = PlatformCapabilitiesInput;

export const platformCapabilitiesShape: FlatModelShape = createFlatModelShape({
  confidentialCompute: {
    armPath: ["confidentialCompute"],
    value: createDeferredShape(() => confidentialComputeShape),
  },
});

/**
 * PrivateEndpoint information.
 */
export interface PrivateEndpoint {
  /**
   * The ARM identifier for Private Endpoint.
   */
  id?: string;
}

/**
 * Input type for PrivateEndpoint information.
 */
export interface PrivateEndpointInput extends InputOf<PrivateEndpoint> {
  /**
   * The ARM identifier for Private Endpoint.
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for PrivateEndpoint information.
 */
export type PrivateEndpointView = PrivateEndpointInput;

export const privateEndpointShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * Properties of the private endpoint connection resource.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * The Private Endpoint resource for this Connection.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * Details about the state of the connection.
   */
  privateLinkServiceConnectionState?: ConnectionState;
  /**
   * Provisioning state of the Private Endpoint Connection.
   */
  provisioningState?: EndPointProvisioningState;
}

/**
 * Input type for Properties of the private endpoint connection resource.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The Private Endpoint resource for this Connection.
   */
  privateEndpoint?: PrivateEndpointInput | undefined;
  /**
   * Details about the state of the connection.
   */
  privateLinkServiceConnectionState?: ConnectionStateInput | undefined;
  /**
   * Provisioning state of the Private Endpoint Connection.
   */
  provisioningState?: ExpressionOrValue<EndPointProvisioningState> | undefined;
}

/**
 * View type for Properties of the private endpoint connection resource.
 */
export type PrivateEndpointConnectionPropertiesView = PrivateEndpointConnectionPropertiesInput;

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => connectionStateShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape() },
});

/**
 * Describes Provisioning issue for given NetworkSecurityPerimeterConfiguration
 */
export interface ProvisioningIssue {
  /**
   * Name of the issue
   */
  name?: string;
  /**
   * Properties of Provisioning Issue
   */
  properties?: ProvisioningIssueProperties;
}

/**
 * Input type for Describes Provisioning issue for given NetworkSecurityPerimeterConfiguration
 */
export interface ProvisioningIssueInput extends InputOf<ProvisioningIssue> {}

/**
 * View type for Describes Provisioning issue for given NetworkSecurityPerimeterConfiguration
 */
export interface ProvisioningIssueView extends InputOf<ProvisioningIssue> {
  /**
   * Read-only output: Name of the issue
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of Provisioning Issue
   */
  readonly properties?: Expression<ProvisioningIssueProperties> | undefined;
}

export const provisioningIssueShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => provisioningIssuePropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of Provisioning Issue
 */
export interface ProvisioningIssueProperties {
  /**
   * Description of the issue
   */
  description?: string;
  /**
   * Type of Issue
   */
  issueType?: string;
}

/**
 * Input type for Properties of Provisioning Issue
 */
export interface ProvisioningIssuePropertiesInput extends InputOf<ProvisioningIssueProperties> {}

/**
 * View type for Properties of Provisioning Issue
 */
export interface ProvisioningIssuePropertiesView extends InputOf<ProvisioningIssueProperties> {
  /**
   * Read-only output: Description of the issue
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: Type of Issue
   */
  readonly issueType?: Expression<string> | undefined;
}

export const provisioningIssuePropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  issueType: { armPath: ["issueType"], value: createStringShape(), readOnly: true },
});

/**
 * Properties to configure retention settings for the eventhub
 */
export interface RetentionDescription {
  /**
   * Enumerates the possible values for cleanup policy
   */
  cleanupPolicy?: CleanupPolicyRetentionDescription;
  /**
   * The minimum time a message will remain ineligible for compaction in the log. This value is used when cleanupPolicy is Compact or DeleteOrCompact.
   */
  minCompactionLagTimeInMinutes?: number;
  /**
   * Number of hours to retain the events for this Event Hub. This should be positive value upto namespace SKU max. -1 is a special case where retention time is infinite, but the size of an entity is restricted and its size depends on namespace SKU type.
   */
  retentionTimeInHours?: number;
  /**
   * Number of hours to retain the tombstone markers of a compacted Event Hub. This value is used when cleanupPolicy is Compact or DeleteOrCompact. Consumer must complete reading the tombstone marker within this specified amount of time if consumer begins from starting offset to ensure they get a valid snapshot for the specific key described by the tombstone marker within the compacted Event Hub
   */
  tombstoneRetentionTimeInHours?: number;
}

/**
 * Input type for Properties to configure retention settings for the eventhub
 */
export interface RetentionDescriptionInput extends InputOf<RetentionDescription> {
  /**
   * Enumerates the possible values for cleanup policy
   */
  cleanupPolicy?: ExpressionOrValue<CleanupPolicyRetentionDescription> | undefined;
  /**
   * The minimum time a message will remain ineligible for compaction in the log. This value is used when cleanupPolicy is Compact or DeleteOrCompact.
   */
  minCompactionLagTimeInMinutes?: ExpressionOrValue<number> | undefined;
  /**
   * Number of hours to retain the events for this Event Hub. This should be positive value upto namespace SKU max. -1 is a special case where retention time is infinite, but the size of an entity is restricted and its size depends on namespace SKU type.
   */
  retentionTimeInHours?: ExpressionOrValue<number> | undefined;
  /**
   * Number of hours to retain the tombstone markers of a compacted Event Hub. This value is used when cleanupPolicy is Compact or DeleteOrCompact. Consumer must complete reading the tombstone marker within this specified amount of time if consumer begins from starting offset to ensure they get a valid snapshot for the specific key described by the tombstone marker within the compacted Event Hub
   */
  tombstoneRetentionTimeInHours?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Properties to configure retention settings for the eventhub
 */
export type RetentionDescriptionView = RetentionDescriptionInput;

export const retentionDescriptionShape: FlatModelShape = createFlatModelShape({
  cleanupPolicy: { armPath: ["cleanupPolicy"], value: createUnionShape() },
  minCompactionLagTimeInMinutes: {
    armPath: ["minCompactionLagTimeInMinutes"],
    value: createNumberShape(),
  },
  retentionTimeInHours: { armPath: ["retentionTimeInHours"], value: createNumberShape() },
  tombstoneRetentionTimeInHours: {
    armPath: ["tombstoneRetentionTimeInHours"],
    value: createNumberShape(),
  },
});

export interface SchemaGroupProperties {
  /**
   * Exact time the Schema Group was created.
   */
  createdAtUtc?: Date;
  /**
   * The ETag value.
   */
  eTag?: string;
  /**
   * dictionary object for SchemaGroup group properties
   */
  groupProperties?: Record<string, string>;
  schemaCompatibility?: SchemaCompatibility;
  schemaType?: SchemaType;
  /**
   * Exact time the Schema Group was updated
   */
  updatedAtUtc?: Date;
}

export interface SchemaGroupPropertiesInput extends InputOf<SchemaGroupProperties> {
  /**
   * dictionary object for SchemaGroup group properties
   */
  groupProperties?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  schemaCompatibility?: ExpressionOrValue<SchemaCompatibility> | undefined;
  schemaType?: ExpressionOrValue<SchemaType> | undefined;
}

export interface SchemaGroupPropertiesView extends InputOf<SchemaGroupProperties> {
  /**
   * Read-only output: Exact time the Schema Group was created.
   */
  readonly createdAtUtc?: Expression<Date> | undefined;
  /**
   * Read-only output: The ETag value.
   */
  readonly eTag?: Expression<string> | undefined;
  /**
   * dictionary object for SchemaGroup group properties
   */
  groupProperties?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  schemaCompatibility?: ExpressionOrValue<SchemaCompatibility> | undefined;
  schemaType?: ExpressionOrValue<SchemaType> | undefined;
  /**
   * Read-only output: Exact time the Schema Group was updated
   */
  readonly updatedAtUtc?: Expression<Date> | undefined;
}

export const schemaGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  createdAtUtc: {
    armPath: ["createdAtUtc"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  eTag: { armPath: ["eTag"], value: createStringShape(), readOnly: true },
  groupProperties: { armPath: ["groupProperties"], value: createRecordShape(createStringShape()) },
  schemaCompatibility: { armPath: ["schemaCompatibility"], value: createUnionShape() },
  schemaType: { armPath: ["schemaType"], value: createUnionShape() },
  updatedAtUtc: {
    armPath: ["updatedAtUtc"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * SKU parameters supplied to the create namespace operation
 */
export interface Sku {
  /**
   * The Event Hubs throughput units for Basic or Standard tiers, where value should be 0 to 20 throughput units. The Event Hubs premium units for Premium tier, where value should be 0 to 10 premium units.
   */
  capacity?: number;
  /**
   * Name of this SKU.
   */
  name: SkuName;
  /**
   * The billing tier of this particular SKU.
   */
  tier?: SkuTier;
}

/**
 * Input type for SKU parameters supplied to the create namespace operation
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * The Event Hubs throughput units for Basic or Standard tiers, where value should be 0 to 20 throughput units. The Event Hubs premium units for Premium tier, where value should be 0 to 10 premium units.
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * Name of this SKU.
   */
  name: ExpressionOrValue<SkuName>;
  /**
   * The billing tier of this particular SKU.
   */
  tier?: ExpressionOrValue<SkuTier> | undefined;
}

/**
 * View type for SKU parameters supplied to the create namespace operation
 */
export type SkuView = SkuInput;

export const skuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  name: { armPath: ["name"], value: createUnionShape() },
  tier: { armPath: ["tier"], value: createUnionShape() },
});

/**
 * Properties supplied for Subnet
 */
export interface Subnet {
  /**
   * Resource ID of Virtual Network Subnet
   */
  id?: string;
}

/**
 * Input type for Properties supplied for Subnet
 */
export interface SubnetInput extends InputOf<Subnet> {
  /**
   * Resource ID of Virtual Network Subnet
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties supplied for Subnet
 */
export type SubnetView = SubnetInput;

export const subnetShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
}

/**
 * Input type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataInput extends InputOf<SystemData> {}

/**
 * View type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataView extends InputOf<SystemData> {
  /**
   * Read-only output: The timestamp of resource creation (UTC).
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that created the resource.
   */
  readonly createdBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that created the resource.
   */
  readonly createdByType?: Expression<CreatedByType> | undefined;
  /**
   * Read-only output: The timestamp of resource last modification (UTC)
   */
  readonly lastModifiedAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that last modified the resource.
   */
  readonly lastModifiedBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that last modified the resource.
   */
  readonly lastModifiedByType?: Expression<CreatedByType> | undefined;
}

export const systemDataShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  createdBy: { armPath: ["createdBy"], value: createStringShape(), readOnly: true },
  createdByType: { armPath: ["createdByType"], value: createUnionShape(), readOnly: true },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastModifiedBy: { armPath: ["lastModifiedBy"], value: createStringShape(), readOnly: true },
  lastModifiedByType: {
    armPath: ["lastModifiedByType"],
    value: createUnionShape(),
    readOnly: true,
  },
});

/**
 * Properties of the throttling policy
 */
export interface ThrottlingPolicy {
  /**
   * Metric Id on which the throttle limit should be set, MetricId can be discovered by hovering over Metric in the Metrics section of Event Hub Namespace inside Azure Portal
   */
  metricId: MetricId;
  /**
   * The Name of this policy
   */
  name: string;
  /**
   * The Threshold limit above which the application group will be throttled.Rate limit is always per second.
   */
  rateLimitThreshold: number;
  /**
   * Application Group Policy types
   *
   * Selects this variant. Must be "ThrottlingPolicy".
   */
  type: "ThrottlingPolicy";
}

/**
 * Input type for Properties of the throttling policy
 */
export interface ThrottlingPolicyInput extends InputOf<ThrottlingPolicy> {
  /**
   * Metric Id on which the throttle limit should be set, MetricId can be discovered by hovering over Metric in the Metrics section of Event Hub Namespace inside Azure Portal
   */
  metricId: ExpressionOrValue<MetricId>;
  /**
   * The Name of this policy
   */
  name: ExpressionOrValue<string>;
  /**
   * The Threshold limit above which the application group will be throttled.Rate limit is always per second.
   */
  rateLimitThreshold: ExpressionOrValue<number>;
  /**
   * Application Group Policy types
   *
   * Selects this variant. Must be "ThrottlingPolicy".
   */
  type: "ThrottlingPolicy";
}

/**
 * View type for Properties of the throttling policy
 */
export type ThrottlingPolicyView = ThrottlingPolicyInput;

export const throttlingPolicyShape: FlatModelShape = createFlatModelShape({
  metricId: { armPath: ["metricId"], value: createUnionShape() },
  name: { armPath: ["name"], value: createStringShape() },
  rateLimitThreshold: { armPath: ["rateLimitThreshold"], value: createNumberShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Recognized Dictionary value.
 */
export interface UserAssignedIdentity {
  /**
   * Client Id of user assigned identity
   */
  clientId?: string;
  /**
   * Principal Id of user assigned identity
   */
  principalId?: string;
}

/**
 * Input type for Recognized Dictionary value.
 */
export interface UserAssignedIdentityInput extends InputOf<UserAssignedIdentity> {}

/**
 * View type for Recognized Dictionary value.
 */
export interface UserAssignedIdentityView extends InputOf<UserAssignedIdentity> {
  /**
   * Read-only output: Client Id of user assigned identity
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: Principal Id of user assigned identity
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

export interface UserAssignedIdentityProperties {
  /**
   * ARM ID of user Identity selected for encryption
   */
  userAssignedIdentity?: string;
}

export interface UserAssignedIdentityPropertiesInput extends InputOf<UserAssignedIdentityProperties> {
  /**
   * ARM ID of user Identity selected for encryption
   */
  userAssignedIdentity?: ExpressionOrValue<string> | undefined;
}

export type UserAssignedIdentityPropertiesView = UserAssignedIdentityPropertiesInput;

export const userAssignedIdentityPropertiesShape: FlatModelShape = createFlatModelShape({
  userAssignedIdentity: { armPath: ["userAssignedIdentity"], value: createStringShape() },
});

/**
 * Known values:
 *
 * - `"Manage"`
 *
 * - `"Send"`
 *
 * - `"Listen"`
 */
export type AccessRights = string;

/**
 * Enumerates the possible values for cleanup policy
 *
 * Known values:
 *
 * - `"Delete"`
 *
 * - `"Compact"`
 *
 * - `"DeleteOrCompact"`
 */
export type CleanupPolicyRetentionDescription = string;

/**
 * Name of this SKU.
 *
 * Known values:
 *
 * - `"Dedicated"`
 */
export type ClusterSkuName = string;

/**
 * The kind of entity that created the resource.
 *
 * Known values:
 *
 * - `"User"`: The entity was created by a user.
 *
 * - `"Application"`: The entity was created by an application.
 *
 * - `"ManagedIdentity"`: The entity was created by a managed identity.
 *
 * - `"Key"`: The entity was created by a key.
 */
export type CreatedByType = string;

/**
 * Default Action for Network Rule Set
 *
 * Known values:
 *
 * - `"Allow"`
 *
 * - `"Deny"`
 */
export type DefaultAction = string;

/**
 * Provisioning state of the Private Endpoint Connection.
 *
 * Known values:
 *
 * - `"Creating"`
 *
 * - `"Updating"`
 *
 * - `"Deleting"`
 *
 * - `"Succeeded"`
 *
 * - `"Canceled"`
 *
 * - `"Failed"`
 */
export type EndPointProvisioningState = string;

/**
 * GeoDR Role Types
 *
 * Known values:
 *
 * - `"Primary"`
 *
 * - `"Secondary"`
 */
export type GeoDrRoleType = string;

/**
 * The IP address type for the namespace. Determines whether the namespace supports IPv4 only or both IPv4 and IPv6 (dual stack).
 *
 * Known values:
 *
 * - `"IPv4"`: The namespace supports IPv4 addresses only.
 *
 * - `"DualStack"`: The namespace supports both IPv4 and IPv6 addresses (dual stack).
 */
export type IpAddressType = string;

/**
 * Metric Id on which the throttle limit should be set, MetricId can be discovered by hovering over Metric in the Metrics section of Event Hub Namespace inside Azure Portal
 *
 * Known values:
 *
 * - `"IncomingBytes"`
 *
 * - `"OutgoingBytes"`
 *
 * - `"IncomingMessages"`
 *
 * - `"OutgoingMessages"`
 */
export type MetricId = string;

/**
 * Setting to Enable or Disable Confidential Compute
 *
 * Known values:
 *
 * - `"Disabled"`
 *
 * - `"Enabled"`
 */
export type Mode = string;

/**
 * The IP Filter Action
 *
 * Known values:
 *
 * - `"Allow"`
 */
export type NetworkRuleIpAction = string;

/**
 * Provisioning state of NetworkSecurityPerimeter configuration propagation
 *
 * Known values:
 *
 * - `"Unknown"`
 *
 * - `"Creating"`
 *
 * - `"Updating"`
 *
 * - `"Accepted"`
 *
 * - `"InvalidResponse"`
 *
 * - `"Succeeded"`
 *
 * - `"SucceededWithIssues"`
 *
 * - `"Failed"`
 *
 * - `"Deleting"`
 *
 * - `"Deleted"`
 *
 * - `"Canceled"`
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

/**
 * Direction of Access Rule
 *
 * Known values:
 *
 * - `"Inbound"`
 *
 * - `"Outbound"`
 */
export type NspAccessRuleDirection = string;

/**
 * Status of the connection.
 *
 * Known values:
 *
 * - `"Pending"`
 *
 * - `"Approved"`
 *
 * - `"Rejected"`
 *
 * - `"Disconnected"`
 */
export type PrivateLinkConnectionStatus = string;

/**
 * Provisioning state of the Cluster.
 *
 * Known values:
 *
 * - `"Unknown"`
 *
 * - `"Creating"`
 *
 * - `"Deleting"`
 *
 * - `"Scaling"`
 *
 * - `"Active"`
 *
 * - `"Failed"`
 *
 * - `"Succeeded"`
 *
 * - `"Canceled"`
 */
export type ProvisioningState = string;

/**
 * This determines if traffic is allowed over public network. By default it is enabled.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 *
 * - `"SecuredByPerimeter"`
 */
export type PublicNetworkAccess = string;

/**
 * This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 *
 * - `"SecuredByPerimeter"`
 */
export type PublicNetworkAccessFlag = string;

/**
 * Access Mode of the resource association
 *
 * Known values:
 *
 * - `"NoAssociationMode"`
 *
 * - `"EnforcedMode"`
 *
 * - `"LearningMode"`
 *
 * - `"AuditMode"`
 *
 * - `"UnspecifiedMode"`
 */
export type ResourceAssociationAccessMode = string;

/**
 * Known values:
 *
 * - `"None"`
 *
 * - `"Backward"`
 *
 * - `"Forward"`
 */
export type SchemaCompatibility = string;

/**
 * Known values:
 *
 * - `"Unknown"`
 *
 * - `"Avro"`
 *
 * - `"ProtoBuf"`
 *
 * - `"Json"`
 */
export type SchemaType = string;

/**
 * Name of this SKU.
 *
 * Known values:
 *
 * - `"Basic"`
 *
 * - `"Standard"`
 *
 * - `"Premium"`
 */
export type SkuName = string;

/**
 * The billing tier of this particular SKU.
 *
 * Known values:
 *
 * - `"Basic"`
 *
 * - `"Standard"`
 *
 * - `"Premium"`
 */
export type SkuTier = string;

/**
 * Denotes the type of timestamp the message will hold.Two types of timestamp types - "AppendTime" and "CreateTime". AppendTime refers the time in which message got appended inside broker log. CreateTime refers to the time in which the message was generated on source side and producers can set this timestamp while sending the message. Default value is AppendTime. If you are using AMQP protocol, CreateTime equals AppendTime and its behavior remains the same.
 *
 * Known values:
 *
 * - `"LogAppend"`
 *
 * - `"Create"`
 */
export type TimestampType = string;

/**
 * The minimum TLS version for the cluster to support, e.g. '1.2'
 *
 * Known values:
 *
 * - `"1.0"`
 *
 * - `"1.1"`
 *
 * - `"1.2"`
 *
 * - `"1.3"`
 */
export type TlsVersion = string;
