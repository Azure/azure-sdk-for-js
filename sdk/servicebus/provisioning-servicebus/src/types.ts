// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

export type AccessRights = "Manage" | "Send" | "Listen";

/**
 * Entity status.
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
 * Rule filter types
 */
export type FilterType = "SqlFilter" | "CorrelationFilter";

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
 * Name of this SKU.
 */
export type SkuName = "Basic" | "Standard" | "Premium";

/**
 * The billing tier of this particular SKU.
 */
export type SkuTier = "Basic" | "Standard" | "Premium";

/**
 * Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression.
 */
export interface Action {
  /**
   * This property is reserved for future use. An integer value showing the compatibility level, currently hard-coded to 20.
   */
  compatibilityLevel?: number;
  /**
   * Value that indicates whether the rule action requires preprocessing.
   */
  requiresPreprocessing?: boolean;
  /**
   * SQL expression. e.g. MyProperty='ABC'
   */
  sqlExpression?: string;
}

/**
 * Input type for Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression.
 */
export interface ActionInput extends InputOf<Action> {
  /**
   * This property is reserved for future use. An integer value showing the compatibility level, currently hard-coded to 20.
   */
  compatibilityLevel?: ExpressionOrValue<number> | undefined;
  /**
   * Value that indicates whether the rule action requires preprocessing.
   */
  requiresPreprocessing?: ExpressionOrValue<boolean> | undefined;
  /**
   * SQL expression. e.g. MyProperty='ABC'
   */
  sqlExpression?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression.
 */
export type ActionView = ActionInput;

export const actionShape: FlatModelShape = createFlatModelShape({
  compatibilityLevel: { armPath: ["compatibilityLevel"], value: createNumberShape() },
  requiresPreprocessing: { armPath: ["requiresPreprocessing"], value: createBooleanShape() },
  sqlExpression: { armPath: ["sqlExpression"], value: createStringShape() },
});

/**
 * Properties required to the Create Or Update Alias(Disaster Recovery configurations)
 */
export interface ArmDisasterRecoveryProperties {
  /**
   * Primary/Secondary eventhub namespace name, which is part of GEO DR pairing
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
   * Primary/Secondary eventhub namespace name, which is part of GEO DR pairing
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
   * Primary/Secondary eventhub namespace name, which is part of GEO DR pairing
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
 * Represents the correlation filter expression.
 */
export interface CorrelationFilter {
  /**
   * Content type of the message.
   */
  contentType?: string;
  /**
   * Identifier of the correlation.
   */
  correlationId?: string;
  /**
   * Application specific label.
   */
  label?: string;
  /**
   * Identifier of the message.
   */
  messageId?: string;
  /**
   * dictionary object for custom filters
   */
  properties?: Record<string, string>;
  /**
   * Address of the queue to reply to.
   */
  replyTo?: string;
  /**
   * Session identifier to reply to.
   */
  replyToSessionId?: string;
  /**
   * Value that indicates whether the rule action requires preprocessing.
   */
  requiresPreprocessing?: boolean;
  /**
   * Session identifier.
   */
  sessionId?: string;
  /**
   * Address to send to.
   */
  to?: string;
}

/**
 * Input type for Represents the correlation filter expression.
 */
export interface CorrelationFilterInput extends InputOf<CorrelationFilter> {
  /**
   * Content type of the message.
   */
  contentType?: ExpressionOrValue<string> | undefined;
  /**
   * Identifier of the correlation.
   */
  correlationId?: ExpressionOrValue<string> | undefined;
  /**
   * Application specific label.
   */
  label?: ExpressionOrValue<string> | undefined;
  /**
   * Identifier of the message.
   */
  messageId?: ExpressionOrValue<string> | undefined;
  /**
   * dictionary object for custom filters
   */
  properties?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Address of the queue to reply to.
   */
  replyTo?: ExpressionOrValue<string> | undefined;
  /**
   * Session identifier to reply to.
   */
  replyToSessionId?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether the rule action requires preprocessing.
   */
  requiresPreprocessing?: ExpressionOrValue<boolean> | undefined;
  /**
   * Session identifier.
   */
  sessionId?: ExpressionOrValue<string> | undefined;
  /**
   * Address to send to.
   */
  to?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Represents the correlation filter expression.
 */
export type CorrelationFilterView = CorrelationFilterInput;

export const correlationFilterShape: FlatModelShape = createFlatModelShape({
  contentType: { armPath: ["contentType"], value: createStringShape() },
  correlationId: { armPath: ["correlationId"], value: createStringShape() },
  label: { armPath: ["label"], value: createStringShape() },
  messageId: { armPath: ["messageId"], value: createStringShape() },
  properties: { armPath: ["properties"], value: createRecordShape(createStringShape()) },
  replyTo: { armPath: ["replyTo"], value: createStringShape() },
  replyToSessionId: { armPath: ["replyToSessionId"], value: createStringShape() },
  requiresPreprocessing: { armPath: ["requiresPreprocessing"], value: createBooleanShape() },
  sessionId: { armPath: ["sessionId"], value: createStringShape() },
  to: { armPath: ["to"], value: createStringShape() },
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
export type GeoDataReplicationPropertiesView = GeoDataReplicationPropertiesInput;

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
 * Properties to configure User Assigned Identities for Bring your Own Keys
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
 * Input type for Properties to configure User Assigned Identities for Bring your Own Keys
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
 * View type for Properties to configure User Assigned Identities for Bring your Own Keys
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
   * Version of KeyVault
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
   * Version of KeyVault
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
 * Message Count Details.
 */
export interface MessageCountDetails {
  /**
   * Number of active messages in the queue, topic, or subscription.
   */
  activeMessageCount?: number;
  /**
   * Number of messages that are dead lettered.
   */
  deadLetterMessageCount?: number;
  /**
   * Number of scheduled messages.
   */
  scheduledMessageCount?: number;
  /**
   * Number of messages transferred into dead letters.
   */
  transferDeadLetterMessageCount?: number;
  /**
   * Number of messages transferred to another queue, topic, or subscription.
   */
  transferMessageCount?: number;
}

/**
 * Input type for Message Count Details.
 */
export interface MessageCountDetailsInput extends InputOf<MessageCountDetails> {}

/**
 * View type for Message Count Details.
 */
export interface MessageCountDetailsView extends InputOf<MessageCountDetails> {
  /**
   * Read-only output: Number of active messages in the queue, topic, or subscription.
   */
  readonly activeMessageCount?: Expression<number> | undefined;
  /**
   * Read-only output: Number of messages that are dead lettered.
   */
  readonly deadLetterMessageCount?: Expression<number> | undefined;
  /**
   * Read-only output: Number of scheduled messages.
   */
  readonly scheduledMessageCount?: Expression<number> | undefined;
  /**
   * Read-only output: Number of messages transferred into dead letters.
   */
  readonly transferDeadLetterMessageCount?: Expression<number> | undefined;
  /**
   * Read-only output: Number of messages transferred to another queue, topic, or subscription.
   */
  readonly transferMessageCount?: Expression<number> | undefined;
}

export const messageCountDetailsShape: FlatModelShape = createFlatModelShape({
  activeMessageCount: {
    armPath: ["activeMessageCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  deadLetterMessageCount: {
    armPath: ["deadLetterMessageCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  scheduledMessageCount: {
    armPath: ["scheduledMessageCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  transferDeadLetterMessageCount: {
    armPath: ["transferDeadLetterMessageCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  transferMessageCount: {
    armPath: ["transferMessageCount"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * Properties required to the Create Migration Configuration
 */
export interface MigrationConfigPropertiesProperties {
  /**
   * State in which Standard to Premium Migration is, possible values : Unknown, Reverting, Completing, Initiating, Syncing, Active
   */
  migrationState?: string;
  /**
   * Number of entities pending to be replicated.
   */
  pendingReplicationOperationsCount?: number;
  /**
   * Name to access Standard Namespace after migration
   */
  postMigrationName: string;
  /**
   * Provisioning state of Migration ConfigurationProvisioning state of Migration Configuration
   */
  provisioningState?: string;
  /**
   * Existing premium Namespace ARM Id name which has no entities, will be used for migration
   */
  targetNamespace: string;
}

/**
 * Input type for Properties required to the Create Migration Configuration
 */
export interface MigrationConfigPropertiesPropertiesInput extends InputOf<MigrationConfigPropertiesProperties> {
  /**
   * Name to access Standard Namespace after migration
   */
  postMigrationName: ExpressionOrValue<string>;
  /**
   * Existing premium Namespace ARM Id name which has no entities, will be used for migration
   */
  targetNamespace: ExpressionOrValue<string>;
}

/**
 * View type for Properties required to the Create Migration Configuration
 */
export interface MigrationConfigPropertiesPropertiesView extends InputOf<MigrationConfigPropertiesProperties> {
  /**
   * Read-only output: State in which Standard to Premium Migration is, possible values : Unknown, Reverting, Completing, Initiating, Syncing, Active
   */
  readonly migrationState?: Expression<string> | undefined;
  /**
   * Read-only output: Number of entities pending to be replicated.
   */
  readonly pendingReplicationOperationsCount?: Expression<number> | undefined;
  /**
   * Name to access Standard Namespace after migration
   */
  postMigrationName: ExpressionOrValue<string>;
  /**
   * Read-only output: Provisioning state of Migration ConfigurationProvisioning state of Migration Configuration
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * Existing premium Namespace ARM Id name which has no entities, will be used for migration
   */
  targetNamespace: ExpressionOrValue<string>;
}

export const migrationConfigPropertiesPropertiesShape: FlatModelShape = createFlatModelShape({
  migrationState: { armPath: ["migrationState"], value: createStringShape(), readOnly: true },
  pendingReplicationOperationsCount: {
    armPath: ["pendingReplicationOperationsCount"],
    value: createNumberShape(),
    readOnly: true,
  },
  postMigrationName: { armPath: ["postMigrationName"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  targetNamespace: { armPath: ["targetNamespace"], value: createStringShape() },
});

/**
 * Namespace replication properties
 */
export interface NamespaceReplicaLocation {
  /**
   * Azure regions where a replica of the namespace is maintained
   */
  locationName?: string;
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
export type NamespaceReplicaLocationView = NamespaceReplicaLocationInput;

export const namespaceReplicaLocationShape: FlatModelShape = createFlatModelShape({
  locationName: { armPath: ["locationName"], value: createStringShape() },
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
   * This determines if traffic is allowed over public network. By default it is enabled.
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
   * This determines if traffic is allowed over public network. By default it is enabled.
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
   * True if the ServiceBus namespace is backed by another Azure resource and not visible to end users.
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
   * Read-only output: True if the ServiceBus namespace is backed by another Azure resource and not visible to end users.
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
 * Description of NetWorkRuleSet - IpRules resource.
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
 * Input type for Description of NetWorkRuleSet - IpRules resource.
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
 * View type for Description of NetWorkRuleSet - IpRules resource.
 */
export type NwRuleSetIpRulesView = NwRuleSetIpRulesInput;

export const nwRuleSetIpRulesShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape() },
  ipMask: { armPath: ["ipMask"], value: createStringShape() },
});

/**
 * Description of VirtualNetworkRules - NetworkRules resource.
 */
export interface NwRuleSetVirtualNetworkRules {
  /**
   * Value that indicates whether to ignore missing VNet Service Endpoint
   */
  ignoreMissingVnetServiceEndpoint?: boolean;
  /**
   * Subnet properties
   */
  subnet?: Subnet;
}

/**
 * Input type for Description of VirtualNetworkRules - NetworkRules resource.
 */
export interface NwRuleSetVirtualNetworkRulesInput extends InputOf<NwRuleSetVirtualNetworkRules> {
  /**
   * Value that indicates whether to ignore missing VNet Service Endpoint
   */
  ignoreMissingVnetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
  /**
   * Subnet properties
   */
  subnet?: SubnetInput | undefined;
}

/**
 * View type for Description of VirtualNetworkRules - NetworkRules resource.
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
 * Description of Rule Resource.
 */
export interface Ruleproperties {
  /**
   * Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression.
   */
  action?: Action;
  /**
   * Properties of correlationFilter
   */
  correlationFilter?: CorrelationFilter;
  /**
   * Filter type that is evaluated against a BrokeredMessage.
   */
  filterType?: FilterType;
  /**
   * Properties of sqlFilter
   */
  sqlFilter?: SqlFilter;
}

/**
 * Input type for Description of Rule Resource.
 */
export interface RulepropertiesInput extends InputOf<Ruleproperties> {
  /**
   * Represents the filter actions which are allowed for the transformation of a message that have been matched by a filter expression.
   */
  action?: ActionInput | undefined;
  /**
   * Properties of correlationFilter
   */
  correlationFilter?: CorrelationFilterInput | undefined;
  /**
   * Filter type that is evaluated against a BrokeredMessage.
   */
  filterType?: ExpressionOrValue<FilterType> | undefined;
  /**
   * Properties of sqlFilter
   */
  sqlFilter?: SqlFilterInput | undefined;
}

/**
 * View type for Description of Rule Resource.
 */
export type RulepropertiesView = RulepropertiesInput;

export const rulepropertiesShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createDeferredShape(() => actionShape) },
  correlationFilter: {
    armPath: ["correlationFilter"],
    value: createDeferredShape(() => correlationFilterShape),
  },
  filterType: { armPath: ["filterType"], value: createEnumShape() },
  sqlFilter: { armPath: ["sqlFilter"], value: createDeferredShape(() => sqlFilterShape) },
});

/**
 * AuthorizationRule properties.
 */
export interface SbAuthorizationRuleProperties {
  /**
   * The rights associated with the rule.
   */
  rights: AccessRights[];
}

/**
 * Input type for AuthorizationRule properties.
 */
export interface SbAuthorizationRulePropertiesInput extends InputOf<SbAuthorizationRuleProperties> {
  /**
   * The rights associated with the rule.
   */
  rights: InputArray<ExpressionOrValue<AccessRights>, AccessRights[]>;
}

/**
 * View type for AuthorizationRule properties.
 */
export type SbAuthorizationRulePropertiesView = SbAuthorizationRulePropertiesInput;

export const sbAuthorizationRulePropertiesShape: FlatModelShape = createFlatModelShape({
  rights: { armPath: ["rights"], value: createArrayShape(createEnumShape()) },
});

/**
 * Properties specific to client affine subscriptions.
 */
export interface SbClientAffineProperties {
  /**
   * Indicates the Client ID of the application that created the client-affine subscription.
   */
  clientId?: string;
  /**
   * For client-affine subscriptions, this value indicates whether the subscription is durable or not.
   */
  isDurable?: boolean;
  /**
   * For client-affine subscriptions, this value indicates whether the subscription is shared or not.
   */
  isShared?: boolean;
}

/**
 * Input type for Properties specific to client affine subscriptions.
 */
export interface SbClientAffinePropertiesInput extends InputOf<SbClientAffineProperties> {
  /**
   * Indicates the Client ID of the application that created the client-affine subscription.
   */
  clientId?: ExpressionOrValue<string> | undefined;
  /**
   * For client-affine subscriptions, this value indicates whether the subscription is durable or not.
   */
  isDurable?: ExpressionOrValue<boolean> | undefined;
  /**
   * For client-affine subscriptions, this value indicates whether the subscription is shared or not.
   */
  isShared?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties specific to client affine subscriptions.
 */
export type SbClientAffinePropertiesView = SbClientAffinePropertiesInput;

export const sbClientAffinePropertiesShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape() },
  isDurable: { armPath: ["isDurable"], value: createBooleanShape() },
  isShared: { armPath: ["isShared"], value: createBooleanShape() },
});

/**
 * Properties of the namespace.
 */
export interface SbNamespaceProperties {
  /**
   * Alternate name for namespace
   */
  alternateName?: string;
  /**
   * The time the namespace was created
   */
  createdAt?: Date;
  /**
   * This property disables SAS authentication for the Service Bus namespace.
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
   * Identifier for Azure Insights metrics
   */
  metricId?: string;
  /**
   * The minimum TLS version for the cluster to support, e.g. '1.2'
   */
  minimumTlsVersion?: TlsVersion;
  platformCapabilities?: PlatformCapabilities;
  /**
   * The number of partitions of a Service Bus namespace. This property is only applicable to Premium SKU namespaces. The default value is 1 and possible values are 1, 2 and 4
   */
  premiumMessagingPartitions?: number;
  /**
   * List of private endpoint connections.
   */
  privateEndpointConnections?: ServiceBusPrivateEndpointConnection[];
  /**
   * Provisioning state of the namespace.
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
   * Status of the namespace.
   */
  status?: string;
  /**
   * The time the namespace was updated.
   */
  updatedAt?: Date;
  /**
   * Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones.
   */
  zoneRedundant?: boolean;
}

/**
 * Input type for Properties of the namespace.
 */
export interface SbNamespacePropertiesInput extends InputOf<SbNamespaceProperties> {
  /**
   * Alternate name for namespace
   */
  alternateName?: ExpressionOrValue<string> | undefined;
  /**
   * This property disables SAS authentication for the Service Bus namespace.
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
   * The minimum TLS version for the cluster to support, e.g. '1.2'
   */
  minimumTlsVersion?: ExpressionOrValue<TlsVersion> | undefined;
  platformCapabilities?: PlatformCapabilitiesInput | undefined;
  /**
   * The number of partitions of a Service Bus namespace. This property is only applicable to Premium SKU namespaces. The default value is 1 and possible values are 1, 2 and 4
   */
  premiumMessagingPartitions?: ExpressionOrValue<number> | undefined;
  /**
   * List of private endpoint connections.
   */
  privateEndpointConnections?:
    | InputArray<ServiceBusPrivateEndpointConnectionInput, ServiceBusPrivateEndpointConnection[]>
    | undefined;
  /**
   * This determines if traffic is allowed over public network. By default it is enabled.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties of the namespace.
 */
export interface SbNamespacePropertiesView extends InputOf<SbNamespaceProperties> {
  /**
   * Alternate name for namespace
   */
  alternateName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The time the namespace was created
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * This property disables SAS authentication for the Service Bus namespace.
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
   * Read-only output: Identifier for Azure Insights metrics
   */
  readonly metricId?: Expression<string> | undefined;
  /**
   * The minimum TLS version for the cluster to support, e.g. '1.2'
   */
  minimumTlsVersion?: ExpressionOrValue<TlsVersion> | undefined;
  platformCapabilities?: PlatformCapabilitiesView | undefined;
  /**
   * The number of partitions of a Service Bus namespace. This property is only applicable to Premium SKU namespaces. The default value is 1 and possible values are 1, 2 and 4
   */
  premiumMessagingPartitions?: ExpressionOrValue<number> | undefined;
  /**
   * List of private endpoint connections.
   */
  privateEndpointConnections?:
    | InputArray<ServiceBusPrivateEndpointConnectionView, ServiceBusPrivateEndpointConnection[]>
    | undefined;
  /**
   * Read-only output: Provisioning state of the namespace.
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
   * Read-only output: Status of the namespace.
   */
  readonly status?: Expression<string> | undefined;
  /**
   * Read-only output: The time the namespace was updated.
   */
  readonly updatedAt?: Expression<Date> | undefined;
  /**
   * Enabling this property creates a Premium Service Bus Namespace in regions supported availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

export const sbNamespacePropertiesShape: FlatModelShape = createFlatModelShape({
  alternateName: { armPath: ["alternateName"], value: createStringShape() },
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
  metricId: { armPath: ["metricId"], value: createStringShape(), readOnly: true },
  minimumTlsVersion: { armPath: ["minimumTlsVersion"], value: createUnionShape() },
  platformCapabilities: {
    armPath: ["platformCapabilities"],
    value: createDeferredShape(() => platformCapabilitiesShape),
  },
  premiumMessagingPartitions: {
    armPath: ["premiumMessagingPartitions"],
    value: createNumberShape(),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => serviceBusPrivateEndpointConnectionShape)),
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
 * The Queue Properties definition.
 */
export interface SbQueueProperties {
  /**
   * Last time a message was sent, or the last time there was a receive request to this queue.
   */
  accessedAt?: Date;
  /**
   * ISO 8061 timeSpan idle interval after which the queue is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: string;
  /**
   * Message Count Details.
   */
  countDetails?: MessageCountDetails;
  /**
   * The exact time the message was created.
   */
  createdAt?: Date;
  /**
   * A value that indicates whether this queue has dead letter support when a message expires.
   */
  deadLetteringOnMessageExpiration?: boolean;
  /**
   * ISO 8601 default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: string;
  /**
   * ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: string;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: boolean;
  /**
   * A value that indicates whether Express Entities are enabled. An express queue holds a message in memory temporarily before writing it to persistent storage.
   */
  enableExpress?: boolean;
  /**
   * A value that indicates whether the queue is to be partitioned across multiple message brokers.
   */
  enablePartitioning?: boolean;
  /**
   * Queue/Topic name to forward the Dead Letter message
   */
  forwardDeadLetteredMessagesTo?: string;
  /**
   * Queue/Topic name to forward the messages
   */
  forwardTo?: string;
  /**
   * ISO 8601 timespan duration of a peek-lock; that is, the amount of time that the message is locked for other receivers. The maximum value for LockDuration is 5 minutes; the default value is 1 minute.
   */
  lockDuration?: string;
  /**
   * The maximum delivery count. A message is automatically deadlettered after this number of deliveries. default value is 10.
   */
  maxDeliveryCount?: number;
  /**
   * Maximum size (in KB) of the message payload that can be accepted by the queue. This property is only used in Premium today and default is 1024.
   */
  maxMessageSizeInKilobytes?: number;
  /**
   * The maximum size of the queue in megabytes, which is the size of memory allocated for the queue. Default is 1024.
   */
  maxSizeInMegabytes?: number;
  /**
   * The number of messages in the queue.
   */
  messageCount?: number;
  /**
   * A value indicating if this queue requires duplicate detection.
   */
  requiresDuplicateDetection?: boolean;
  /**
   * A value that indicates whether the queue supports the concept of sessions.
   */
  requiresSession?: boolean;
  /**
   * The size of the queue, in bytes.
   */
  sizeInBytes?: number;
  /**
   * Enumerates the possible values for the status of a messaging entity.
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
 * Input type for The Queue Properties definition.
 */
export interface SbQueuePropertiesInput extends InputOf<SbQueueProperties> {
  /**
   * ISO 8061 timeSpan idle interval after which the queue is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: ExpressionOrValue<string> | undefined;
  /**
   * A value that indicates whether this queue has dead letter support when a message expires.
   */
  deadLetteringOnMessageExpiration?: ExpressionOrValue<boolean> | undefined;
  /**
   * ISO 8601 default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether Express Entities are enabled. An express queue holds a message in memory temporarily before writing it to persistent storage.
   */
  enableExpress?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether the queue is to be partitioned across multiple message brokers.
   */
  enablePartitioning?: ExpressionOrValue<boolean> | undefined;
  /**
   * Queue/Topic name to forward the Dead Letter message
   */
  forwardDeadLetteredMessagesTo?: ExpressionOrValue<string> | undefined;
  /**
   * Queue/Topic name to forward the messages
   */
  forwardTo?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 timespan duration of a peek-lock; that is, the amount of time that the message is locked for other receivers. The maximum value for LockDuration is 5 minutes; the default value is 1 minute.
   */
  lockDuration?: ExpressionOrValue<string> | undefined;
  /**
   * The maximum delivery count. A message is automatically deadlettered after this number of deliveries. default value is 10.
   */
  maxDeliveryCount?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum size (in KB) of the message payload that can be accepted by the queue. This property is only used in Premium today and default is 1024.
   */
  maxMessageSizeInKilobytes?: ExpressionOrValue<number> | undefined;
  /**
   * The maximum size of the queue in megabytes, which is the size of memory allocated for the queue. Default is 1024.
   */
  maxSizeInMegabytes?: ExpressionOrValue<number> | undefined;
  /**
   * A value indicating if this queue requires duplicate detection.
   */
  requiresDuplicateDetection?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether the queue supports the concept of sessions.
   */
  requiresSession?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enumerates the possible values for the status of a messaging entity.
   */
  status?: ExpressionOrValue<EntityStatus> | undefined;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The Queue Properties definition.
 */
export interface SbQueuePropertiesView extends InputOf<SbQueueProperties> {
  /**
   * Read-only output: Last time a message was sent, or the last time there was a receive request to this queue.
   */
  readonly accessedAt?: Expression<Date> | undefined;
  /**
   * ISO 8061 timeSpan idle interval after which the queue is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Message Count Details.
   */
  readonly countDetails?: Expression<MessageCountDetails> | undefined;
  /**
   * Read-only output: The exact time the message was created.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * A value that indicates whether this queue has dead letter support when a message expires.
   */
  deadLetteringOnMessageExpiration?: ExpressionOrValue<boolean> | undefined;
  /**
   * ISO 8601 default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether Express Entities are enabled. An express queue holds a message in memory temporarily before writing it to persistent storage.
   */
  enableExpress?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether the queue is to be partitioned across multiple message brokers.
   */
  enablePartitioning?: ExpressionOrValue<boolean> | undefined;
  /**
   * Queue/Topic name to forward the Dead Letter message
   */
  forwardDeadLetteredMessagesTo?: ExpressionOrValue<string> | undefined;
  /**
   * Queue/Topic name to forward the messages
   */
  forwardTo?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 timespan duration of a peek-lock; that is, the amount of time that the message is locked for other receivers. The maximum value for LockDuration is 5 minutes; the default value is 1 minute.
   */
  lockDuration?: ExpressionOrValue<string> | undefined;
  /**
   * The maximum delivery count. A message is automatically deadlettered after this number of deliveries. default value is 10.
   */
  maxDeliveryCount?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum size (in KB) of the message payload that can be accepted by the queue. This property is only used in Premium today and default is 1024.
   */
  maxMessageSizeInKilobytes?: ExpressionOrValue<number> | undefined;
  /**
   * The maximum size of the queue in megabytes, which is the size of memory allocated for the queue. Default is 1024.
   */
  maxSizeInMegabytes?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The number of messages in the queue.
   */
  readonly messageCount?: Expression<number> | undefined;
  /**
   * A value indicating if this queue requires duplicate detection.
   */
  requiresDuplicateDetection?: ExpressionOrValue<boolean> | undefined;
  /**
   * A value that indicates whether the queue supports the concept of sessions.
   */
  requiresSession?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The size of the queue, in bytes.
   */
  readonly sizeInBytes?: Expression<number> | undefined;
  /**
   * Enumerates the possible values for the status of a messaging entity.
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

export const sbQueuePropertiesShape: FlatModelShape = createFlatModelShape({
  accessedAt: {
    armPath: ["accessedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  autoDeleteOnIdle: {
    armPath: ["autoDeleteOnIdle"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  countDetails: {
    armPath: ["countDetails"],
    value: createDeferredShape(() => messageCountDetailsShape),
    readOnly: true,
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
  deadLetteringOnMessageExpiration: {
    armPath: ["deadLetteringOnMessageExpiration"],
    value: createBooleanShape(),
  },
  defaultMessageTimeToLive: {
    armPath: ["defaultMessageTimeToLive"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  duplicateDetectionHistoryTimeWindow: {
    armPath: ["duplicateDetectionHistoryTimeWindow"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  enableBatchedOperations: { armPath: ["enableBatchedOperations"], value: createBooleanShape() },
  enableExpress: { armPath: ["enableExpress"], value: createBooleanShape() },
  enablePartitioning: { armPath: ["enablePartitioning"], value: createBooleanShape() },
  forwardDeadLetteredMessagesTo: {
    armPath: ["forwardDeadLetteredMessagesTo"],
    value: createStringShape(),
  },
  forwardTo: { armPath: ["forwardTo"], value: createStringShape() },
  lockDuration: {
    armPath: ["lockDuration"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  maxDeliveryCount: { armPath: ["maxDeliveryCount"], value: createNumberShape() },
  maxMessageSizeInKilobytes: { armPath: ["maxMessageSizeInKilobytes"], value: createNumberShape() },
  maxSizeInMegabytes: { armPath: ["maxSizeInMegabytes"], value: createNumberShape() },
  messageCount: { armPath: ["messageCount"], value: createNumberShape(), readOnly: true },
  requiresDuplicateDetection: {
    armPath: ["requiresDuplicateDetection"],
    value: createBooleanShape(),
  },
  requiresSession: { armPath: ["requiresSession"], value: createBooleanShape() },
  sizeInBytes: { armPath: ["sizeInBytes"], value: createNumberShape(), readOnly: true },
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
 * SKU of the namespace.
 */
export interface SbSku {
  /**
   * Messaging units for your service bus premium namespace. Valid capacities are {1, 2, 4, 8, 16} multiples of your properties.premiumMessagingPartitions setting. For example, If properties.premiumMessagingPartitions is 1 then possible capacity values are 1, 2, 4, 8, and 16. If properties.premiumMessagingPartitions is 4 then possible capacity values are 4, 8, 16, 32 and 64
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
 * Input type for SKU of the namespace.
 */
export interface SbSkuInput extends InputOf<SbSku> {
  /**
   * Messaging units for your service bus premium namespace. Valid capacities are {1, 2, 4, 8, 16} multiples of your properties.premiumMessagingPartitions setting. For example, If properties.premiumMessagingPartitions is 1 then possible capacity values are 1, 2, 4, 8, and 16. If properties.premiumMessagingPartitions is 4 then possible capacity values are 4, 8, 16, 32 and 64
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
 * View type for SKU of the namespace.
 */
export type SbSkuView = SbSkuInput;

export const sbSkuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  name: { armPath: ["name"], value: createEnumShape() },
  tier: { armPath: ["tier"], value: createEnumShape() },
});

/**
 * Description of Subscription Resource.
 */
export interface SbSubscriptionProperties {
  /**
   * Last time there was a receive request to this subscription.
   */
  accessedAt?: Date;
  /**
   * ISO 8061 timeSpan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: string;
  /**
   * Properties specific to client affine subscriptions.
   */
  clientAffineProperties?: SbClientAffineProperties;
  /**
   * Message count details
   */
  countDetails?: MessageCountDetails;
  /**
   * Exact time the message was created.
   */
  createdAt?: Date;
  /**
   * Value that indicates whether a subscription has dead letter support on filter evaluation exceptions.
   */
  deadLetteringOnFilterEvaluationExceptions?: boolean;
  /**
   * Value that indicates whether a subscription has dead letter support when a message expires.
   */
  deadLetteringOnMessageExpiration?: boolean;
  /**
   * ISO 8061 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: string;
  /**
   * ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: string;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: boolean;
  /**
   * Queue/Topic name to forward the Dead Letter message
   */
  forwardDeadLetteredMessagesTo?: string;
  /**
   * Queue/Topic name to forward the messages
   */
  forwardTo?: string;
  /**
   * Value that indicates whether the subscription has an affinity to the client id.
   */
  isClientAffine?: boolean;
  /**
   * ISO 8061 lock duration timespan for the subscription. The default value is 1 minute.
   */
  lockDuration?: string;
  /**
   * Number of maximum deliveries.
   */
  maxDeliveryCount?: number;
  /**
   * Number of messages.
   */
  messageCount?: number;
  /**
   * Value indicating if a subscription supports the concept of sessions.
   */
  requiresSession?: boolean;
  /**
   * Enumerates the possible values for the status of a messaging entity.
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
 * Input type for Description of Subscription Resource.
 */
export interface SbSubscriptionPropertiesInput extends InputOf<SbSubscriptionProperties> {
  /**
   * ISO 8061 timeSpan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: ExpressionOrValue<string> | undefined;
  /**
   * Properties specific to client affine subscriptions.
   */
  clientAffineProperties?: SbClientAffinePropertiesInput | undefined;
  /**
   * Value that indicates whether a subscription has dead letter support on filter evaluation exceptions.
   */
  deadLetteringOnFilterEvaluationExceptions?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether a subscription has dead letter support when a message expires.
   */
  deadLetteringOnMessageExpiration?: ExpressionOrValue<boolean> | undefined;
  /**
   * ISO 8061 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: ExpressionOrValue<boolean> | undefined;
  /**
   * Queue/Topic name to forward the Dead Letter message
   */
  forwardDeadLetteredMessagesTo?: ExpressionOrValue<string> | undefined;
  /**
   * Queue/Topic name to forward the messages
   */
  forwardTo?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether the subscription has an affinity to the client id.
   */
  isClientAffine?: ExpressionOrValue<boolean> | undefined;
  /**
   * ISO 8061 lock duration timespan for the subscription. The default value is 1 minute.
   */
  lockDuration?: ExpressionOrValue<string> | undefined;
  /**
   * Number of maximum deliveries.
   */
  maxDeliveryCount?: ExpressionOrValue<number> | undefined;
  /**
   * Value indicating if a subscription supports the concept of sessions.
   */
  requiresSession?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enumerates the possible values for the status of a messaging entity.
   */
  status?: ExpressionOrValue<EntityStatus> | undefined;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Description of Subscription Resource.
 */
export interface SbSubscriptionPropertiesView extends InputOf<SbSubscriptionProperties> {
  /**
   * Read-only output: Last time there was a receive request to this subscription.
   */
  readonly accessedAt?: Expression<Date> | undefined;
  /**
   * ISO 8061 timeSpan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: ExpressionOrValue<string> | undefined;
  /**
   * Properties specific to client affine subscriptions.
   */
  clientAffineProperties?: SbClientAffinePropertiesView | undefined;
  /**
   * Read-only output: Message count details
   */
  readonly countDetails?: Expression<MessageCountDetails> | undefined;
  /**
   * Read-only output: Exact time the message was created.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Value that indicates whether a subscription has dead letter support on filter evaluation exceptions.
   */
  deadLetteringOnFilterEvaluationExceptions?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether a subscription has dead letter support when a message expires.
   */
  deadLetteringOnMessageExpiration?: ExpressionOrValue<boolean> | undefined;
  /**
   * ISO 8061 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 timeSpan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: ExpressionOrValue<boolean> | undefined;
  /**
   * Queue/Topic name to forward the Dead Letter message
   */
  forwardDeadLetteredMessagesTo?: ExpressionOrValue<string> | undefined;
  /**
   * Queue/Topic name to forward the messages
   */
  forwardTo?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether the subscription has an affinity to the client id.
   */
  isClientAffine?: ExpressionOrValue<boolean> | undefined;
  /**
   * ISO 8061 lock duration timespan for the subscription. The default value is 1 minute.
   */
  lockDuration?: ExpressionOrValue<string> | undefined;
  /**
   * Number of maximum deliveries.
   */
  maxDeliveryCount?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Number of messages.
   */
  readonly messageCount?: Expression<number> | undefined;
  /**
   * Value indicating if a subscription supports the concept of sessions.
   */
  requiresSession?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enumerates the possible values for the status of a messaging entity.
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

export const sbSubscriptionPropertiesShape: FlatModelShape = createFlatModelShape({
  accessedAt: {
    armPath: ["accessedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  autoDeleteOnIdle: {
    armPath: ["autoDeleteOnIdle"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  clientAffineProperties: {
    armPath: ["clientAffineProperties"],
    value: createDeferredShape(() => sbClientAffinePropertiesShape),
  },
  countDetails: {
    armPath: ["countDetails"],
    value: createDeferredShape(() => messageCountDetailsShape),
    readOnly: true,
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
  deadLetteringOnFilterEvaluationExceptions: {
    armPath: ["deadLetteringOnFilterEvaluationExceptions"],
    value: createBooleanShape(),
  },
  deadLetteringOnMessageExpiration: {
    armPath: ["deadLetteringOnMessageExpiration"],
    value: createBooleanShape(),
  },
  defaultMessageTimeToLive: {
    armPath: ["defaultMessageTimeToLive"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  duplicateDetectionHistoryTimeWindow: {
    armPath: ["duplicateDetectionHistoryTimeWindow"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  enableBatchedOperations: { armPath: ["enableBatchedOperations"], value: createBooleanShape() },
  forwardDeadLetteredMessagesTo: {
    armPath: ["forwardDeadLetteredMessagesTo"],
    value: createStringShape(),
  },
  forwardTo: { armPath: ["forwardTo"], value: createStringShape() },
  isClientAffine: { armPath: ["isClientAffine"], value: createBooleanShape() },
  lockDuration: {
    armPath: ["lockDuration"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  maxDeliveryCount: { armPath: ["maxDeliveryCount"], value: createNumberShape() },
  messageCount: { armPath: ["messageCount"], value: createNumberShape(), readOnly: true },
  requiresSession: { armPath: ["requiresSession"], value: createBooleanShape() },
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
 * The Topic Properties definition.
 */
export interface SbTopicProperties {
  /**
   * Last time the message was sent, or a request was received, for this topic.
   */
  accessedAt?: Date;
  /**
   * ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: string;
  /**
   * Message count details
   */
  countDetails?: MessageCountDetails;
  /**
   * Exact time the message was created.
   */
  createdAt?: Date;
  /**
   * ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: string;
  /**
   * ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: string;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: boolean;
  /**
   * Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage.
   */
  enableExpress?: boolean;
  /**
   * Value that indicates whether the topic to be partitioned across multiple message brokers is enabled.
   */
  enablePartitioning?: boolean;
  /**
   * Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today and default is 1024.
   */
  maxMessageSizeInKilobytes?: number;
  /**
   * Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024.
   */
  maxSizeInMegabytes?: number;
  /**
   * Value indicating if this topic requires duplicate detection.
   */
  requiresDuplicateDetection?: boolean;
  /**
   * Size of the topic, in bytes.
   */
  sizeInBytes?: number;
  /**
   * Enumerates the possible values for the status of a messaging entity.
   */
  status?: EntityStatus;
  /**
   * Number of subscriptions.
   */
  subscriptionCount?: number;
  /**
   * Value that indicates whether the topic supports ordering.
   */
  supportOrdering?: boolean;
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
 * Input type for The Topic Properties definition.
 */
export interface SbTopicPropertiesInput extends InputOf<SbTopicProperties> {
  /**
   * ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: ExpressionOrValue<string> | undefined;
  /**
   * ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: ExpressionOrValue<string> | undefined;
  /**
   * ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage.
   */
  enableExpress?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether the topic to be partitioned across multiple message brokers is enabled.
   */
  enablePartitioning?: ExpressionOrValue<boolean> | undefined;
  /**
   * Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today and default is 1024.
   */
  maxMessageSizeInKilobytes?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024.
   */
  maxSizeInMegabytes?: ExpressionOrValue<number> | undefined;
  /**
   * Value indicating if this topic requires duplicate detection.
   */
  requiresDuplicateDetection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enumerates the possible values for the status of a messaging entity.
   */
  status?: ExpressionOrValue<EntityStatus> | undefined;
  /**
   * Value that indicates whether the topic supports ordering.
   */
  supportOrdering?: ExpressionOrValue<boolean> | undefined;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The Topic Properties definition.
 */
export interface SbTopicPropertiesView extends InputOf<SbTopicProperties> {
  /**
   * Read-only output: Last time the message was sent, or a request was received, for this topic.
   */
  readonly accessedAt?: Expression<Date> | undefined;
  /**
   * ISO 8601 timespan idle interval after which the topic is automatically deleted. The minimum duration is 5 minutes.
   */
  autoDeleteOnIdle?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Message count details
   */
  readonly countDetails?: Expression<MessageCountDetails> | undefined;
  /**
   * Read-only output: Exact time the message was created.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * ISO 8601 Default message timespan to live value. This is the duration after which the message expires, starting from when the message is sent to Service Bus. This is the default value used when TimeToLive is not set on a message itself.
   */
  defaultMessageTimeToLive?: ExpressionOrValue<string> | undefined;
  /**
   * ISO8601 timespan structure that defines the duration of the duplicate detection history. The default value is 10 minutes.
   */
  duplicateDetectionHistoryTimeWindow?: ExpressionOrValue<string> | undefined;
  /**
   * Value that indicates whether server-side batched operations are enabled.
   */
  enableBatchedOperations?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether Express Entities are enabled. An express topic holds a message in memory temporarily before writing it to persistent storage.
   */
  enableExpress?: ExpressionOrValue<boolean> | undefined;
  /**
   * Value that indicates whether the topic to be partitioned across multiple message brokers is enabled.
   */
  enablePartitioning?: ExpressionOrValue<boolean> | undefined;
  /**
   * Maximum size (in KB) of the message payload that can be accepted by the topic. This property is only used in Premium today and default is 1024.
   */
  maxMessageSizeInKilobytes?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum size of the topic in megabytes, which is the size of the memory allocated for the topic. Default is 1024.
   */
  maxSizeInMegabytes?: ExpressionOrValue<number> | undefined;
  /**
   * Value indicating if this topic requires duplicate detection.
   */
  requiresDuplicateDetection?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: Size of the topic, in bytes.
   */
  readonly sizeInBytes?: Expression<number> | undefined;
  /**
   * Enumerates the possible values for the status of a messaging entity.
   */
  status?: ExpressionOrValue<EntityStatus> | undefined;
  /**
   * Read-only output: Number of subscriptions.
   */
  readonly subscriptionCount?: Expression<number> | undefined;
  /**
   * Value that indicates whether the topic supports ordering.
   */
  supportOrdering?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The exact time the message was updated.
   */
  readonly updatedAt?: Expression<Date> | undefined;
  /**
   * Gets and Sets Metadata of User.
   */
  userMetadata?: ExpressionOrValue<string> | undefined;
}

export const sbTopicPropertiesShape: FlatModelShape = createFlatModelShape({
  accessedAt: {
    armPath: ["accessedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  autoDeleteOnIdle: {
    armPath: ["autoDeleteOnIdle"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  countDetails: {
    armPath: ["countDetails"],
    value: createDeferredShape(() => messageCountDetailsShape),
    readOnly: true,
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
  defaultMessageTimeToLive: {
    armPath: ["defaultMessageTimeToLive"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  duplicateDetectionHistoryTimeWindow: {
    armPath: ["duplicateDetectionHistoryTimeWindow"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
  },
  enableBatchedOperations: { armPath: ["enableBatchedOperations"], value: createBooleanShape() },
  enableExpress: { armPath: ["enableExpress"], value: createBooleanShape() },
  enablePartitioning: { armPath: ["enablePartitioning"], value: createBooleanShape() },
  maxMessageSizeInKilobytes: { armPath: ["maxMessageSizeInKilobytes"], value: createNumberShape() },
  maxSizeInMegabytes: { armPath: ["maxSizeInMegabytes"], value: createNumberShape() },
  requiresDuplicateDetection: {
    armPath: ["requiresDuplicateDetection"],
    value: createBooleanShape(),
  },
  sizeInBytes: { armPath: ["sizeInBytes"], value: createNumberShape(), readOnly: true },
  status: { armPath: ["status"], value: createEnumShape() },
  subscriptionCount: { armPath: ["subscriptionCount"], value: createNumberShape(), readOnly: true },
  supportOrdering: { armPath: ["supportOrdering"], value: createBooleanShape() },
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
 * Properties of the PrivateEndpointConnection.
 */
export interface ServiceBusPrivateEndpointConnection {
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
export interface ServiceBusPrivateEndpointConnectionInput extends InputOf<ServiceBusPrivateEndpointConnection> {
  /**
   * Properties of the PrivateEndpointConnection.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for Properties of the PrivateEndpointConnection.
 */
export interface ServiceBusPrivateEndpointConnectionView extends InputOf<ServiceBusPrivateEndpointConnection> {
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

export const serviceBusPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
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
 * Represents a filter which is a composition of an expression and an action that is executed in the pub/sub pipeline.
 */
export interface SqlFilter {
  /**
   * This property is reserved for future use. An integer value showing the compatibility level, currently hard-coded to 20.
   */
  compatibilityLevel?: number;
  /**
   * Value that indicates whether the rule action requires preprocessing.
   */
  requiresPreprocessing?: boolean;
  /**
   * The SQL expression. e.g. MyProperty='ABC'
   */
  sqlExpression?: string;
}

/**
 * Input type for Represents a filter which is a composition of an expression and an action that is executed in the pub/sub pipeline.
 */
export interface SqlFilterInput extends InputOf<SqlFilter> {
  /**
   * This property is reserved for future use. An integer value showing the compatibility level, currently hard-coded to 20.
   */
  compatibilityLevel?: ExpressionOrValue<number> | undefined;
  /**
   * Value that indicates whether the rule action requires preprocessing.
   */
  requiresPreprocessing?: ExpressionOrValue<boolean> | undefined;
  /**
   * The SQL expression. e.g. MyProperty='ABC'
   */
  sqlExpression?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Represents a filter which is a composition of an expression and an action that is executed in the pub/sub pipeline.
 */
export type SqlFilterView = SqlFilterInput;

export const sqlFilterShape: FlatModelShape = createFlatModelShape({
  compatibilityLevel: { armPath: ["compatibilityLevel"], value: createNumberShape() },
  requiresPreprocessing: { armPath: ["requiresPreprocessing"], value: createBooleanShape() },
  sqlExpression: { armPath: ["sqlExpression"], value: createStringShape() },
});

/**
 * Properties supplied for Subnet
 */
export interface Subnet {
  /**
   * Resource ID of Virtual Network Subnet
   */
  id: string;
}

/**
 * Input type for Properties supplied for Subnet
 */
export interface SubnetInput extends InputOf<Subnet> {
  /**
   * Resource ID of Virtual Network Subnet
   */
  id: ExpressionOrValue<string>;
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
 * Known values:
 *
 * - `"$default"`
 */
export type MigrationConfigurationName = string;

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
 * This determines if traffic is allowed over public network. By default it is enabled.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
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
 * The minimum TLS version for the cluster to support, e.g. '1.3'
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
