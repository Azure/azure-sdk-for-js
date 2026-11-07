// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createBytesShape,
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
 * The default consistency level and configuration settings of the Cosmos DB account.
 */
export type DefaultConsistencyLevel =
  "Eventual" | "Session" | "BoundedStaleness" | "Strong" | "ConsistentPrefix";

/**
 * Indicates whether the Role Definition was built-in or user created.
 */
export type MongoRoleDefinitionType = "BuiltInRole" | "CustomRole";

/**
 * Indicates what services are allowed to bypass firewall checks.
 */
export type NetworkAclBypass = "None" | "AzureServices";

/**
 * The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service.
 */
export type ResourceIdentityType =
  "SystemAssigned" | "UserAssigned" | "SystemAssigned,UserAssigned" | "None";

/**
 * Indicates whether the Role Definition was built-in or user created.
 */
export type RoleDefinitionType = "BuiltInRole" | "CustomRole";

/**
 * The metadata related to an access key for a given database account.
 */
export interface AccountKeyMetadata {
  /**
   * Generation time in UTC of the key in ISO-8601 format. If the value is missing from the object, it means that the last key regeneration was triggered before 2022-06-18.
   */
  generationTime?: Date;
}

/**
 * Input type for The metadata related to an access key for a given database account.
 */
export interface AccountKeyMetadataInput extends InputOf<AccountKeyMetadata> {}

/**
 * View type for The metadata related to an access key for a given database account.
 */
export interface AccountKeyMetadataView extends InputOf<AccountKeyMetadata> {
  /**
   * Read-only output: Generation time in UTC of the key in ISO-8601 format. If the value is missing from the object, it means that the last key regeneration was triggered before 2022-06-18.
   */
  readonly generationTime?: Expression<Date> | undefined;
}

export const accountKeyMetadataShape: FlatModelShape = createFlatModelShape({
  generationTime: {
    armPath: ["generationTime"],
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
 * Analytical storage specific properties.
 */
export interface AnalyticalStorageConfiguration {
  /**
   * Describes the types of schema for analytical storage.
   */
  schemaType?: AnalyticalStorageSchemaType;
}

/**
 * Input type for Analytical storage specific properties.
 */
export interface AnalyticalStorageConfigurationInput extends InputOf<AnalyticalStorageConfiguration> {
  /**
   * Describes the types of schema for analytical storage.
   */
  schemaType?: ExpressionOrValue<AnalyticalStorageSchemaType> | undefined;
}

/**
 * View type for Analytical storage specific properties.
 */
export type AnalyticalStorageConfigurationView = AnalyticalStorageConfigurationInput;

export const analyticalStorageConfigurationShape: FlatModelShape = createFlatModelShape({
  schemaType: { armPath: ["schemaType"], value: createUnionShape() },
});

export interface ApiProperties {
  /**
   * Describes the version of the MongoDB account.
   */
  serverVersion?: ServerVersion;
}

export interface ApiPropertiesInput extends InputOf<ApiProperties> {
  /**
   * Describes the version of the MongoDB account.
   */
  serverVersion?: ExpressionOrValue<ServerVersion> | undefined;
}

export type ApiPropertiesView = ApiPropertiesInput;

export const apiPropertiesShape: FlatModelShape = createFlatModelShape({
  serverVersion: { armPath: ["serverVersion"], value: createUnionShape() },
});

/**
 * Ldap authentication method properties. This feature is in preview.
 */
export interface AuthenticationMethodLdapProperties {
  /**
   * Timeout for connecting to the LDAP server in miliseconds. The default is 5000 ms.
   */
  connectionTimeoutInMs?: number;
  /**
   * Distinguished name of the object to start the recursive search of users from.
   */
  searchBaseDistinguishedName?: string;
  /**
   * Template to use for searching. Defaults to (cn=%s) where %s will be replaced by the username used to login.
   */
  searchFilterTemplate?: string;
  serverCertificates?: Certificate[];
  /**
   * Hostname of the LDAP server.
   */
  serverHostname?: string;
  /**
   * Port of the LDAP server.
   */
  serverPort?: number;
  /**
   * Distinguished name of the look up user account, who can look up user details on authentication.
   */
  serviceUserDistinguishedName?: string;
  /**
   * Password of the look up user.
   */
  serviceUserPassword?: string;
}

/**
 * Input type for Ldap authentication method properties. This feature is in preview.
 */
export interface AuthenticationMethodLdapPropertiesInput extends InputOf<AuthenticationMethodLdapProperties> {
  /**
   * Timeout for connecting to the LDAP server in miliseconds. The default is 5000 ms.
   */
  connectionTimeoutInMs?: ExpressionOrValue<number> | undefined;
  /**
   * Distinguished name of the object to start the recursive search of users from.
   */
  searchBaseDistinguishedName?: ExpressionOrValue<string> | undefined;
  /**
   * Template to use for searching. Defaults to (cn=%s) where %s will be replaced by the username used to login.
   */
  searchFilterTemplate?: ExpressionOrValue<string> | undefined;
  serverCertificates?: InputArray<CertificateInput, Certificate[]> | undefined;
  /**
   * Hostname of the LDAP server.
   */
  serverHostname?: ExpressionOrValue<string> | undefined;
  /**
   * Port of the LDAP server.
   */
  serverPort?: ExpressionOrValue<number> | undefined;
  /**
   * Distinguished name of the look up user account, who can look up user details on authentication.
   */
  serviceUserDistinguishedName?: ExpressionOrValue<string> | undefined;
  /**
   * Password of the look up user.
   */
  serviceUserPassword?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Ldap authentication method properties. This feature is in preview.
 */
export type AuthenticationMethodLdapPropertiesView = AuthenticationMethodLdapPropertiesInput;

export const authenticationMethodLdapPropertiesShape: FlatModelShape = createFlatModelShape({
  connectionTimeoutInMs: { armPath: ["connectionTimeoutInMs"], value: createNumberShape() },
  searchBaseDistinguishedName: {
    armPath: ["searchBaseDistinguishedName"],
    value: createStringShape(),
  },
  searchFilterTemplate: { armPath: ["searchFilterTemplate"], value: createStringShape() },
  serverCertificates: {
    armPath: ["serverCertificates"],
    value: createArrayShape(createDeferredShape(() => certificateShape)),
  },
  serverHostname: { armPath: ["serverHostname"], value: createStringShape() },
  serverPort: { armPath: ["serverPort"], value: createNumberShape() },
  serviceUserDistinguishedName: {
    armPath: ["serviceUserDistinguishedName"],
    value: createStringShape(),
  },
  serviceUserPassword: { armPath: ["serviceUserPassword"], value: createStringShape() },
});

export interface AutoscaleSettings {
  /**
   * Represents maximum throughput, the resource can scale up to.
   */
  maxThroughput?: number;
}

export interface AutoscaleSettingsInput extends InputOf<AutoscaleSettings> {
  /**
   * Represents maximum throughput, the resource can scale up to.
   */
  maxThroughput?: ExpressionOrValue<number> | undefined;
}

export type AutoscaleSettingsView = AutoscaleSettingsInput;

export const autoscaleSettingsShape: FlatModelShape = createFlatModelShape({
  maxThroughput: { armPath: ["maxThroughput"], value: createNumberShape() },
});

/**
 * Cosmos DB provisioned throughput settings object
 */
export interface AutoscaleSettingsResource {
  /**
   * Cosmos DB resource auto-upgrade policy
   */
  autoUpgradePolicy?: AutoUpgradePolicyResource;
  /**
   * Represents maximum throughput container can scale up to.
   */
  maxThroughput: number;
  /**
   * Represents target maximum throughput container can scale up to once offer is no longer in pending state.
   */
  targetMaxThroughput?: number;
}

/**
 * Input type for Cosmos DB provisioned throughput settings object
 */
export interface AutoscaleSettingsResourceInput extends InputOf<AutoscaleSettingsResource> {
  /**
   * Cosmos DB resource auto-upgrade policy
   */
  autoUpgradePolicy?: AutoUpgradePolicyResourceInput | undefined;
  /**
   * Represents maximum throughput container can scale up to.
   */
  maxThroughput: ExpressionOrValue<number>;
}

/**
 * View type for Cosmos DB provisioned throughput settings object
 */
export interface AutoscaleSettingsResourceView extends InputOf<AutoscaleSettingsResource> {
  /**
   * Cosmos DB resource auto-upgrade policy
   */
  autoUpgradePolicy?: AutoUpgradePolicyResourceView | undefined;
  /**
   * Represents maximum throughput container can scale up to.
   */
  maxThroughput: ExpressionOrValue<number>;
  /**
   * Read-only output: Represents target maximum throughput container can scale up to once offer is no longer in pending state.
   */
  readonly targetMaxThroughput?: Expression<number> | undefined;
}

export const autoscaleSettingsResourceShape: FlatModelShape = createFlatModelShape({
  autoUpgradePolicy: {
    armPath: ["autoUpgradePolicy"],
    value: createDeferredShape(() => autoUpgradePolicyResourceShape),
  },
  maxThroughput: { armPath: ["maxThroughput"], value: createNumberShape() },
  targetMaxThroughput: {
    armPath: ["targetMaxThroughput"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * Cosmos DB resource auto-upgrade policy
 */
export interface AutoUpgradePolicyResource {
  /**
   * Represents throughput policy which service must adhere to for auto-upgrade
   */
  throughputPolicy?: ThroughputPolicyResource;
}

/**
 * Input type for Cosmos DB resource auto-upgrade policy
 */
export interface AutoUpgradePolicyResourceInput extends InputOf<AutoUpgradePolicyResource> {
  /**
   * Represents throughput policy which service must adhere to for auto-upgrade
   */
  throughputPolicy?: ThroughputPolicyResourceInput | undefined;
}

/**
 * View type for Cosmos DB resource auto-upgrade policy
 */
export type AutoUpgradePolicyResourceView = AutoUpgradePolicyResourceInput;

export const autoUpgradePolicyResourceShape: FlatModelShape = createFlatModelShape({
  throughputPolicy: {
    armPath: ["throughputPolicy"],
    value: createDeferredShape(() => throughputPolicyResourceShape),
  },
});

/**
 * The object representing the policy for taking backups on an account.
 */
export type BackupPolicy = PeriodicModeBackupPolicy | ContinuousModeBackupPolicy;

/**
 * Input type for The object representing the policy for taking backups on an account.
 */
export type BackupPolicyInput = PeriodicModeBackupPolicyInput | ContinuousModeBackupPolicyInput;

/**
 * View type for The object representing the policy for taking backups on an account.
 */
export type BackupPolicyView = PeriodicModeBackupPolicyView | ContinuousModeBackupPolicyView;

export const backupPolicyShape: DiscriminatedModelShape = createDiscriminatedModelShape("type", {
  Periodic: createDeferredShape(() => periodicModeBackupPolicyShape),
  Continuous: createDeferredShape(() => continuousModeBackupPolicyShape),
});

/**
 * The object representing the state of the migration between the backup policies.
 */
export interface BackupPolicyMigrationState {
  /**
   * Time at which the backup policy migration started (ISO-8601 format).
   */
  startTime?: Date;
  /**
   * Describes the status of migration between backup policy types.
   */
  status?: BackupPolicyMigrationStatus;
  /**
   * Describes the target backup policy type of the backup policy migration.
   */
  targetType?: BackupPolicyType;
}

/**
 * Input type for The object representing the state of the migration between the backup policies.
 */
export interface BackupPolicyMigrationStateInput extends InputOf<BackupPolicyMigrationState> {
  /**
   * Time at which the backup policy migration started (ISO-8601 format).
   */
  startTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Describes the status of migration between backup policy types.
   */
  status?: ExpressionOrValue<BackupPolicyMigrationStatus> | undefined;
  /**
   * Describes the target backup policy type of the backup policy migration.
   */
  targetType?: ExpressionOrValue<BackupPolicyType> | undefined;
}

/**
 * View type for The object representing the state of the migration between the backup policies.
 */
export type BackupPolicyMigrationStateView = BackupPolicyMigrationStateInput;

export const backupPolicyMigrationStateShape: FlatModelShape = createFlatModelShape({
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  status: { armPath: ["status"], value: createUnionShape() },
  targetType: { armPath: ["targetType"], value: createUnionShape() },
});

export interface BackupSchedule {
  /**
   * The cron expression that defines when you want to back up your data.
   */
  cronExpression?: string;
  /**
   * The retention period (hours) of the backups. If you want to retain data forever, set retention to 0.
   */
  retentionInHours?: number;
  /**
   * The unique identifier of backup schedule.
   */
  scheduleName?: string;
}

export interface BackupScheduleInput extends InputOf<BackupSchedule> {
  /**
   * The cron expression that defines when you want to back up your data.
   */
  cronExpression?: ExpressionOrValue<string> | undefined;
  /**
   * The retention period (hours) of the backups. If you want to retain data forever, set retention to 0.
   */
  retentionInHours?: ExpressionOrValue<number> | undefined;
  /**
   * The unique identifier of backup schedule.
   */
  scheduleName?: ExpressionOrValue<string> | undefined;
}

export type BackupScheduleView = BackupScheduleInput;

export const backupScheduleShape: FlatModelShape = createFlatModelShape({
  cronExpression: { armPath: ["cronExpression"], value: createStringShape() },
  retentionInHours: { armPath: ["retentionInHours"], value: createNumberShape() },
  scheduleName: { armPath: ["scheduleName"], value: createStringShape() },
});

/**
 * Cosmos DB capability object
 */
export interface Capability {
  /**
   * Name of the Cosmos DB capability. For example, "name": "EnableCassandra". Current values also include "EnableTable" and "EnableGremlin".
   */
  name?: string;
}

/**
 * Input type for Cosmos DB capability object
 */
export interface CapabilityInput extends InputOf<Capability> {
  /**
   * Name of the Cosmos DB capability. For example, "name": "EnableCassandra". Current values also include "EnableTable" and "EnableGremlin".
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cosmos DB capability object
 */
export type CapabilityView = CapabilityInput;

export const capabilityShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
});

/**
 * The object that represents all properties related to capacity enforcement on an account.
 */
export interface Capacity {
  /**
   * The total throughput limit imposed on the account. A totalThroughputLimit of 2000 imposes a strict limit of max throughput that can be provisioned on that account to be 2000. A totalThroughputLimit of -1 indicates no limits on provisioning of throughput.
   */
  totalThroughputLimit?: number;
}

/**
 * Input type for The object that represents all properties related to capacity enforcement on an account.
 */
export interface CapacityInput extends InputOf<Capacity> {
  /**
   * The total throughput limit imposed on the account. A totalThroughputLimit of 2000 imposes a strict limit of max throughput that can be provisioned on that account to be 2000. A totalThroughputLimit of -1 indicates no limits on provisioning of throughput.
   */
  totalThroughputLimit?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The object that represents all properties related to capacity enforcement on an account.
 */
export type CapacityView = CapacityInput;

export const capacityShape: FlatModelShape = createFlatModelShape({
  totalThroughputLimit: { armPath: ["totalThroughputLimit"], value: createNumberShape() },
});

export interface CassandraError {
  /**
   * Additional information about the error.
   */
  additionalErrorInfo?: string;
  /**
   * The code of error that occurred.
   */
  code?: string;
  /**
   * The message of the error.
   */
  message?: string;
  /**
   * The target resource of the error.
   */
  target?: string;
}

export interface CassandraErrorInput extends InputOf<CassandraError> {
  /**
   * Additional information about the error.
   */
  additionalErrorInfo?: ExpressionOrValue<string> | undefined;
  /**
   * The code of error that occurred.
   */
  code?: ExpressionOrValue<string> | undefined;
  /**
   * The message of the error.
   */
  message?: ExpressionOrValue<string> | undefined;
  /**
   * The target resource of the error.
   */
  target?: ExpressionOrValue<string> | undefined;
}

export type CassandraErrorView = CassandraErrorInput;

export const cassandraErrorShape: FlatModelShape = createFlatModelShape({
  additionalErrorInfo: { armPath: ["additionalErrorInfo"], value: createStringShape() },
  code: { armPath: ["code"], value: createStringShape() },
  message: { armPath: ["message"], value: createStringShape() },
  target: { armPath: ["target"], value: createStringShape() },
});

/**
 * The properties of an Azure Cosmos DB Cassandra keyspace
 */
export interface CassandraKeyspaceGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CassandraKeyspaceGetPropertiesOptions;
  /**
   * The standard JSON format of a Cassandra keyspace
   */
  resource: CassandraKeyspaceGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB Cassandra keyspace
 */
export interface CassandraKeyspaceGetPropertiesInput extends InputOf<CassandraKeyspaceGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CassandraKeyspaceGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a Cassandra keyspace
   */
  resource: CassandraKeyspaceGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB Cassandra keyspace
 */
export interface CassandraKeyspaceGetPropertiesView extends InputOf<CassandraKeyspaceGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CassandraKeyspaceGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a Cassandra keyspace
   */
  resource: CassandraKeyspaceGetPropertiesResourceView;
}

export const cassandraKeyspaceGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => cassandraKeyspaceGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => cassandraKeyspaceGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface CassandraKeyspaceGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface CassandraKeyspaceGetPropertiesOptionsInput extends InputOf<CassandraKeyspaceGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type CassandraKeyspaceGetPropertiesOptionsView = CassandraKeyspaceGetPropertiesOptionsInput;

export const cassandraKeyspaceGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB Cassandra keyspace resource object
 */
export interface CassandraKeyspaceGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Name of the Cosmos DB Cassandra keyspace
   */
  id: string;
}

/**
 * Input type for Cosmos DB Cassandra keyspace resource object
 */
export interface CassandraKeyspaceGetPropertiesResourceInput extends InputOf<CassandraKeyspaceGetPropertiesResource> {
  /**
   * Name of the Cosmos DB Cassandra keyspace
   */
  id: ExpressionOrValue<string>;
}

/**
 * View type for Cosmos DB Cassandra keyspace resource object
 */
export interface CassandraKeyspaceGetPropertiesResourceView extends InputOf<CassandraKeyspaceGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Name of the Cosmos DB Cassandra keyspace
   */
  id: ExpressionOrValue<string>;
}

export const cassandraKeyspaceGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * Cosmos DB Cassandra table partition key
 */
export interface CassandraPartitionKey {
  /**
   * Name of the Cosmos DB Cassandra table partition key
   */
  name?: string;
}

/**
 * Input type for Cosmos DB Cassandra table partition key
 */
export interface CassandraPartitionKeyInput extends InputOf<CassandraPartitionKey> {
  /**
   * Name of the Cosmos DB Cassandra table partition key
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cosmos DB Cassandra table partition key
 */
export type CassandraPartitionKeyView = CassandraPartitionKeyInput;

export const cassandraPartitionKeyShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
});

/**
 * Azure Cosmos DB Cassandra Role Assignment resource object.
 */
export interface CassandraRoleAssignmentResourceProperties {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Cassandra Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: string;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: string;
  /**
   * The data plane resource path for which access is being granted through this Cassandra Role Assignment.
   */
  scope?: string;
}

/**
 * Input type for Azure Cosmos DB Cassandra Role Assignment resource object.
 */
export interface CassandraRoleAssignmentResourcePropertiesInput extends InputOf<CassandraRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Cassandra Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Cassandra Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Azure Cosmos DB Cassandra Role Assignment resource object.
 */
export interface CassandraRoleAssignmentResourcePropertiesView extends InputOf<CassandraRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Cassandra Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Cassandra Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

export const cassandraRoleAssignmentResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  roleDefinitionId: { armPath: ["roleDefinitionId"], value: createStringShape() },
  scope: { armPath: ["scope"], value: createStringShape() },
});

/**
 * Azure Cosmos DB Cassandra Role Definition resource object.
 */
export interface CassandraRoleDefinitionResourceProperties {
  /**
   * A set of fully qualified Scopes at or below which Cassandra Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: string[];
  /**
   * The path id for the Role Definition.
   */
  id?: string;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: Permission[];
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: string;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: RoleDefinitionType;
}

/**
 * Input type for Azure Cosmos DB Cassandra Role Definition resource object.
 */
export interface CassandraRoleDefinitionResourcePropertiesInput extends InputOf<CassandraRoleDefinitionResourceProperties> {
  /**
   * A set of fully qualified Scopes at or below which Cassandra Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The path id for the Role Definition.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: InputArray<PermissionInput, Permission[]> | undefined;
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: ExpressionOrValue<RoleDefinitionType> | undefined;
}

/**
 * View type for Azure Cosmos DB Cassandra Role Definition resource object.
 */
export type CassandraRoleDefinitionResourcePropertiesView =
  CassandraRoleDefinitionResourcePropertiesInput;

export const cassandraRoleDefinitionResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  assignableScopes: { armPath: ["assignableScopes"], value: createArrayShape(createStringShape()) },
  id: { armPath: ["id"], value: createStringShape() },
  permissions: {
    armPath: ["permissions"],
    value: createArrayShape(createDeferredShape(() => permissionShape)),
  },
  roleName: { armPath: ["roleName"], value: createStringShape() },
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * Cosmos DB Cassandra table schema
 */
export interface CassandraSchema {
  /**
   * List of cluster key.
   */
  clusterKeys?: ClusterKey[];
  /**
   * List of Cassandra table columns.
   */
  columns?: Column[];
  /**
   * List of partition key.
   */
  partitionKeys?: CassandraPartitionKey[];
}

/**
 * Input type for Cosmos DB Cassandra table schema
 */
export interface CassandraSchemaInput extends InputOf<CassandraSchema> {
  /**
   * List of cluster key.
   */
  clusterKeys?: InputArray<ClusterKeyInput, ClusterKey[]> | undefined;
  /**
   * List of Cassandra table columns.
   */
  columns?: InputArray<ColumnInput, Column[]> | undefined;
  /**
   * List of partition key.
   */
  partitionKeys?: InputArray<CassandraPartitionKeyInput, CassandraPartitionKey[]> | undefined;
}

/**
 * View type for Cosmos DB Cassandra table schema
 */
export type CassandraSchemaView = CassandraSchemaInput;

export const cassandraSchemaShape: FlatModelShape = createFlatModelShape({
  clusterKeys: {
    armPath: ["clusterKeys"],
    value: createArrayShape(createDeferredShape(() => clusterKeyShape)),
  },
  columns: {
    armPath: ["columns"],
    value: createArrayShape(createDeferredShape(() => columnShape)),
  },
  partitionKeys: {
    armPath: ["partitionKeys"],
    value: createArrayShape(createDeferredShape(() => cassandraPartitionKeyShape)),
  },
});

/**
 * The properties of an Azure Cosmos DB Cassandra table
 */
export interface CassandraTableGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CassandraTableGetPropertiesOptions;
  /**
   * The standard JSON format of a Cassandra table
   */
  resource: CassandraTableGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB Cassandra table
 */
export interface CassandraTableGetPropertiesInput extends InputOf<CassandraTableGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CassandraTableGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a Cassandra table
   */
  resource: CassandraTableGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB Cassandra table
 */
export interface CassandraTableGetPropertiesView extends InputOf<CassandraTableGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CassandraTableGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a Cassandra table
   */
  resource: CassandraTableGetPropertiesResourceView;
}

export const cassandraTableGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => cassandraTableGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => cassandraTableGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface CassandraTableGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface CassandraTableGetPropertiesOptionsInput extends InputOf<CassandraTableGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type CassandraTableGetPropertiesOptionsView = CassandraTableGetPropertiesOptionsInput;

export const cassandraTableGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB Cassandra table resource object
 */
export interface CassandraTableGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: number;
  /**
   * Time to live of the Cosmos DB Cassandra table
   */
  defaultTtl?: number;
  /**
   * Name of the Cosmos DB Cassandra table
   */
  id: string;
  /**
   * Schema of the Cosmos DB Cassandra table
   */
  schema?: CassandraSchema;
}

/**
 * Input type for Cosmos DB Cassandra table resource object
 */
export interface CassandraTableGetPropertiesResourceInput extends InputOf<CassandraTableGetPropertiesResource> {
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Time to live of the Cosmos DB Cassandra table
   */
  defaultTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Name of the Cosmos DB Cassandra table
   */
  id: ExpressionOrValue<string>;
  /**
   * Schema of the Cosmos DB Cassandra table
   */
  schema?: CassandraSchemaInput | undefined;
}

/**
 * View type for Cosmos DB Cassandra table resource object
 */
export interface CassandraTableGetPropertiesResourceView extends InputOf<CassandraTableGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Time to live of the Cosmos DB Cassandra table
   */
  defaultTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Name of the Cosmos DB Cassandra table
   */
  id: ExpressionOrValue<string>;
  /**
   * Schema of the Cosmos DB Cassandra table
   */
  schema?: CassandraSchemaView | undefined;
}

export const cassandraTableGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  analyticalStorageTtl: { armPath: ["analyticalStorageTtl"], value: createNumberShape() },
  defaultTtl: { armPath: ["defaultTtl"], value: createNumberShape() },
  id: { armPath: ["id"], value: createStringShape() },
  schema: { armPath: ["schema"], value: createDeferredShape(() => cassandraSchemaShape) },
});

export interface Certificate {
  /**
   * PEM formatted public key.
   */
  pem?: string;
}

export interface CertificateInput extends InputOf<Certificate> {
  /**
   * PEM formatted public key.
   */
  pem?: ExpressionOrValue<string> | undefined;
}

export type CertificateView = CertificateInput;

export const certificateShape: FlatModelShape = createFlatModelShape({
  pem: { armPath: ["pem"], value: createStringShape() },
});

/**
 * .
 */
export interface ClientEncryptionIncludedPath {
  /**
   * The identifier of the Client Encryption Key to be used to encrypt the path.
   */
  clientEncryptionKeyId: string;
  /**
   * The encryption algorithm which will be used. Eg - AEAD_AES_256_CBC_HMAC_SHA256.
   */
  encryptionAlgorithm: string;
  /**
   * The type of encryption to be performed. Eg - Deterministic, Randomized.
   */
  encryptionType: string;
  /**
   * Path that needs to be encrypted.
   */
  path: string;
}

/**
 * Input type for .
 */
export interface ClientEncryptionIncludedPathInput extends InputOf<ClientEncryptionIncludedPath> {
  /**
   * The identifier of the Client Encryption Key to be used to encrypt the path.
   */
  clientEncryptionKeyId: ExpressionOrValue<string>;
  /**
   * The encryption algorithm which will be used. Eg - AEAD_AES_256_CBC_HMAC_SHA256.
   */
  encryptionAlgorithm: ExpressionOrValue<string>;
  /**
   * The type of encryption to be performed. Eg - Deterministic, Randomized.
   */
  encryptionType: ExpressionOrValue<string>;
  /**
   * Path that needs to be encrypted.
   */
  path: ExpressionOrValue<string>;
}

/**
 * View type for .
 */
export type ClientEncryptionIncludedPathView = ClientEncryptionIncludedPathInput;

export const clientEncryptionIncludedPathShape: FlatModelShape = createFlatModelShape({
  clientEncryptionKeyId: { armPath: ["clientEncryptionKeyId"], value: createStringShape() },
  encryptionAlgorithm: { armPath: ["encryptionAlgorithm"], value: createStringShape() },
  encryptionType: { armPath: ["encryptionType"], value: createStringShape() },
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * The properties of a ClientEncryptionKey resource
 */
export interface ClientEncryptionKeyGetProperties {
  /**
   * The standard JSON format of a ClientEncryptionKey
   */
  resource: ClientEncryptionKeyGetPropertiesResource;
}

/**
 * Input type for The properties of a ClientEncryptionKey resource
 */
export interface ClientEncryptionKeyGetPropertiesInput extends InputOf<ClientEncryptionKeyGetProperties> {
  /**
   * The standard JSON format of a ClientEncryptionKey
   */
  resource: ClientEncryptionKeyGetPropertiesResourceInput;
}

/**
 * View type for The properties of a ClientEncryptionKey resource
 */
export interface ClientEncryptionKeyGetPropertiesView extends InputOf<ClientEncryptionKeyGetProperties> {
  /**
   * The standard JSON format of a ClientEncryptionKey
   */
  resource: ClientEncryptionKeyGetPropertiesResourceView;
}

export const clientEncryptionKeyGetPropertiesShape: FlatModelShape = createFlatModelShape({
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => clientEncryptionKeyGetPropertiesResourceShape),
  },
});

/**
 * Cosmos DB client encryption key resource object.
 */
export interface ClientEncryptionKeyGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Encryption algorithm that will be used along with this client encryption key to encrypt/decrypt data.
   */
  encryptionAlgorithm?: string;
  /**
   * Name of the ClientEncryptionKey
   */
  id?: string;
  /**
   * Metadata for the wrapping provider that can be used to unwrap the wrapped client encryption key.
   */
  keyWrapMetadata?: KeyWrapMetadata;
  /**
   * Wrapped (encrypted) form of the key represented as a byte array.
   */
  wrappedDataEncryptionKey?: Uint8Array;
}

/**
 * Input type for Cosmos DB client encryption key resource object.
 */
export interface ClientEncryptionKeyGetPropertiesResourceInput extends InputOf<ClientEncryptionKeyGetPropertiesResource> {
  /**
   * Encryption algorithm that will be used along with this client encryption key to encrypt/decrypt data.
   */
  encryptionAlgorithm?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the ClientEncryptionKey
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * Metadata for the wrapping provider that can be used to unwrap the wrapped client encryption key.
   */
  keyWrapMetadata?: KeyWrapMetadataInput | undefined;
  /**
   * Wrapped (encrypted) form of the key represented as a byte array.
   */
  wrappedDataEncryptionKey?: ExpressionOrValue<Uint8Array> | undefined;
}

/**
 * View type for Cosmos DB client encryption key resource object.
 */
export interface ClientEncryptionKeyGetPropertiesResourceView extends InputOf<ClientEncryptionKeyGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Encryption algorithm that will be used along with this client encryption key to encrypt/decrypt data.
   */
  encryptionAlgorithm?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the ClientEncryptionKey
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * Metadata for the wrapping provider that can be used to unwrap the wrapped client encryption key.
   */
  keyWrapMetadata?: KeyWrapMetadataView | undefined;
  /**
   * Wrapped (encrypted) form of the key represented as a byte array.
   */
  wrappedDataEncryptionKey?: ExpressionOrValue<Uint8Array> | undefined;
}

export const clientEncryptionKeyGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  encryptionAlgorithm: { armPath: ["encryptionAlgorithm"], value: createStringShape() },
  id: { armPath: ["id"], value: createStringShape() },
  keyWrapMetadata: {
    armPath: ["keyWrapMetadata"],
    value: createDeferredShape(() => keyWrapMetadataShape),
  },
  wrappedDataEncryptionKey: {
    armPath: ["wrappedDataEncryptionKey"],
    value: createBytesShape({
      kind: "bytes",
      source: "bytes",
      format: "base64",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
});

/**
 * Cosmos DB client encryption policy.
 */
export interface ClientEncryptionPolicy {
  /**
   * Paths of the item that need encryption along with path-specific settings.
   */
  includedPaths: ClientEncryptionIncludedPath[];
  /**
   * Version of the client encryption policy definition. Supported versions are 1 and 2. Version 2 supports id and partition key path encryption.
   */
  policyFormatVersion: number;
}

/**
 * Input type for Cosmos DB client encryption policy.
 */
export interface ClientEncryptionPolicyInput extends InputOf<ClientEncryptionPolicy> {
  /**
   * Paths of the item that need encryption along with path-specific settings.
   */
  includedPaths: InputArray<ClientEncryptionIncludedPathInput, ClientEncryptionIncludedPath[]>;
  /**
   * Version of the client encryption policy definition. Supported versions are 1 and 2. Version 2 supports id and partition key path encryption.
   */
  policyFormatVersion: ExpressionOrValue<number>;
}

/**
 * View type for Cosmos DB client encryption policy.
 */
export type ClientEncryptionPolicyView = ClientEncryptionPolicyInput;

export const clientEncryptionPolicyShape: FlatModelShape = createFlatModelShape({
  includedPaths: {
    armPath: ["includedPaths"],
    value: createArrayShape(createDeferredShape(() => clientEncryptionIncludedPathShape)),
  },
  policyFormatVersion: { armPath: ["policyFormatVersion"], value: createNumberShape() },
});

/**
 * Cosmos DB Cassandra table cluster key
 */
export interface ClusterKey {
  /**
   * Name of the Cosmos DB Cassandra table cluster key
   */
  name?: string;
  /**
   * Order of the Cosmos DB Cassandra table cluster key, only support "Asc" and "Desc"
   */
  orderBy?: string;
}

/**
 * Input type for Cosmos DB Cassandra table cluster key
 */
export interface ClusterKeyInput extends InputOf<ClusterKey> {
  /**
   * Name of the Cosmos DB Cassandra table cluster key
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Order of the Cosmos DB Cassandra table cluster key, only support "Asc" and "Desc"
   */
  orderBy?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cosmos DB Cassandra table cluster key
 */
export type ClusterKeyView = ClusterKeyInput;

export const clusterKeyShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  orderBy: { armPath: ["orderBy"], value: createStringShape() },
});

/**
 * Properties of a managed Cassandra cluster.
 */
export interface ClusterResourceProperties {
  /**
   * Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'.
   */
  authenticationMethod?: AuthenticationMethod;
  /**
   * The form of AutoReplicate that is being used by this cluster.
   */
  autoReplicate?: AutoReplicate;
  /**
   * How to connect to the azure services needed for running the cluster
   */
  azureConnectionMethod?: AzureConnectionType;
  /**
   * List of backup schedules that define when you want to back up your data.
   */
  backupSchedules?: BackupSchedule[];
  /**
   * Whether Cassandra audit logging is enabled
   */
  cassandraAuditLoggingEnabled?: boolean;
  /**
   * Which version of Cassandra should this cluster converge to running (e.g., 3.11). When updated, the cluster may take some time to migrate to the new version.
   */
  cassandraVersion?: string;
  /**
   * List of TLS certificates used to authorize clients connecting to the cluster. All connections are TLS encrypted whether clientCertificates is set or not, but if clientCertificates is set, the managed Cassandra cluster will reject all connections not bearing a TLS client certificate that can be validated from one or more of the public certificates in this property.
   */
  clientCertificates?: Certificate[];
  /**
   * If you need to set the clusterName property in cassandra.yaml to something besides the resource name of the cluster, set the value to use on this property.
   */
  clusterNameOverride?: string;
  /**
   * Whether the cluster and associated data centers has been deallocated.
   */
  deallocated?: boolean;
  /**
   * Resource id of a subnet that this cluster's management service should have its network interface attached to. The subnet must be routable to all subnets that will be delegated to data centers. The resource id must be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'
   */
  delegatedManagementSubnetId?: string;
  /**
   * Extensions to be added or updated on cluster.
   */
  extensions?: string[];
  /**
   * List of the data center names for unmanaged data centers in this cluster to be included in auto-replication.
   */
  externalDataCenters?: string[];
  /**
   * List of TLS certificates used to authorize gossip from unmanaged data centers. The TLS certificates of all nodes in unmanaged data centers must be verifiable using one of the certificates provided in this property.
   */
  externalGossipCertificates?: Certificate[];
  /**
   * List of IP addresses of seed nodes in unmanaged data centers. These will be added to the seed node lists of all managed nodes.
   */
  externalSeedNodes?: SeedNode[];
  /**
   * List of TLS certificates that unmanaged nodes must trust for gossip with managed nodes. All managed nodes will present TLS client certificates that are verifiable using one of the certificates provided in this property.
   */
  gossipCertificates?: Certificate[];
  /**
   * (Deprecated) Number of hours to wait between taking a backup of the cluster.
   */
  hoursBetweenBackups?: number;
  /**
   * Initial password for clients connecting as admin to the cluster. Should be changed after cluster creation. Returns null on GET. This field only applies when the authenticationMethod field is 'Cassandra'.
   */
  initialCassandraAdminPassword?: string;
  /**
   * If the Connection Method is Vpn, this is the Id of the private link resource that the datacenters need to connect to.
   */
  privateLinkResourceId?: string;
  /**
   * Hostname or IP address where the Prometheus endpoint containing data about the managed Cassandra nodes can be reached.
   */
  prometheusEndpoint?: SeedNode;
  /**
   * Error related to resource provisioning.
   */
  provisionError?: CassandraError;
  /**
   * The status of the resource at the time the operation was called.
   */
  provisioningState?: ManagedCassandraProvisioningState;
  /**
   * Should automatic repairs run on this cluster? If omitted, this is true, and should stay true unless you are running a hybrid cluster where you are already doing your own repairs.
   */
  repairEnabled?: boolean;
  /**
   * To create an empty cluster, omit this field or set it to null. To restore a backup into a new cluster, set this field to the resource id of the backup.
   */
  restoreFromBackupId?: string;
  /**
   * How the nodes in the cluster react to scheduled events
   */
  scheduledEventStrategy?: ScheduledEventStrategy;
  /**
   * List of IP addresses of seed nodes in the managed data centers. These should be added to the seed node lists of all unmanaged nodes.
   */
  seedNodes?: SeedNode[];
}

/**
 * Input type for Properties of a managed Cassandra cluster.
 */
export interface ClusterResourcePropertiesInput extends InputOf<ClusterResourceProperties> {
  /**
   * Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'.
   */
  authenticationMethod?: ExpressionOrValue<AuthenticationMethod> | undefined;
  /**
   * The form of AutoReplicate that is being used by this cluster.
   */
  autoReplicate?: ExpressionOrValue<AutoReplicate> | undefined;
  /**
   * How to connect to the azure services needed for running the cluster
   */
  azureConnectionMethod?: ExpressionOrValue<AzureConnectionType> | undefined;
  /**
   * List of backup schedules that define when you want to back up your data.
   */
  backupSchedules?: InputArray<BackupScheduleInput, BackupSchedule[]> | undefined;
  /**
   * Whether Cassandra audit logging is enabled
   */
  cassandraAuditLoggingEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Which version of Cassandra should this cluster converge to running (e.g., 3.11). When updated, the cluster may take some time to migrate to the new version.
   */
  cassandraVersion?: ExpressionOrValue<string> | undefined;
  /**
   * List of TLS certificates used to authorize clients connecting to the cluster. All connections are TLS encrypted whether clientCertificates is set or not, but if clientCertificates is set, the managed Cassandra cluster will reject all connections not bearing a TLS client certificate that can be validated from one or more of the public certificates in this property.
   */
  clientCertificates?: InputArray<CertificateInput, Certificate[]> | undefined;
  /**
   * If you need to set the clusterName property in cassandra.yaml to something besides the resource name of the cluster, set the value to use on this property.
   */
  clusterNameOverride?: ExpressionOrValue<string> | undefined;
  /**
   * Whether the cluster and associated data centers has been deallocated.
   */
  deallocated?: ExpressionOrValue<boolean> | undefined;
  /**
   * Resource id of a subnet that this cluster's management service should have its network interface attached to. The subnet must be routable to all subnets that will be delegated to data centers. The resource id must be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'
   */
  delegatedManagementSubnetId?: ExpressionOrValue<string> | undefined;
  /**
   * Extensions to be added or updated on cluster.
   */
  extensions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * List of the data center names for unmanaged data centers in this cluster to be included in auto-replication.
   */
  externalDataCenters?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * List of TLS certificates used to authorize gossip from unmanaged data centers. The TLS certificates of all nodes in unmanaged data centers must be verifiable using one of the certificates provided in this property.
   */
  externalGossipCertificates?: InputArray<CertificateInput, Certificate[]> | undefined;
  /**
   * List of IP addresses of seed nodes in unmanaged data centers. These will be added to the seed node lists of all managed nodes.
   */
  externalSeedNodes?: InputArray<SeedNodeInput, SeedNode[]> | undefined;
  /**
   * (Deprecated) Number of hours to wait between taking a backup of the cluster.
   */
  hoursBetweenBackups?: ExpressionOrValue<number> | undefined;
  /**
   * Initial password for clients connecting as admin to the cluster. Should be changed after cluster creation. Returns null on GET. This field only applies when the authenticationMethod field is 'Cassandra'.
   */
  initialCassandraAdminPassword?: ExpressionOrValue<string> | undefined;
  /**
   * Hostname or IP address where the Prometheus endpoint containing data about the managed Cassandra nodes can be reached.
   */
  prometheusEndpoint?: SeedNodeInput | undefined;
  /**
   * Error related to resource provisioning.
   */
  provisionError?: CassandraErrorInput | undefined;
  /**
   * The status of the resource at the time the operation was called.
   */
  provisioningState?: ExpressionOrValue<ManagedCassandraProvisioningState> | undefined;
  /**
   * Should automatic repairs run on this cluster? If omitted, this is true, and should stay true unless you are running a hybrid cluster where you are already doing your own repairs.
   */
  repairEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * To create an empty cluster, omit this field or set it to null. To restore a backup into a new cluster, set this field to the resource id of the backup.
   */
  restoreFromBackupId?: ExpressionOrValue<string> | undefined;
  /**
   * How the nodes in the cluster react to scheduled events
   */
  scheduledEventStrategy?: ExpressionOrValue<ScheduledEventStrategy> | undefined;
}

/**
 * View type for Properties of a managed Cassandra cluster.
 */
export interface ClusterResourcePropertiesView extends InputOf<ClusterResourceProperties> {
  /**
   * Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'.
   */
  authenticationMethod?: ExpressionOrValue<AuthenticationMethod> | undefined;
  /**
   * The form of AutoReplicate that is being used by this cluster.
   */
  autoReplicate?: ExpressionOrValue<AutoReplicate> | undefined;
  /**
   * How to connect to the azure services needed for running the cluster
   */
  azureConnectionMethod?: ExpressionOrValue<AzureConnectionType> | undefined;
  /**
   * List of backup schedules that define when you want to back up your data.
   */
  backupSchedules?: InputArray<BackupScheduleView, BackupSchedule[]> | undefined;
  /**
   * Whether Cassandra audit logging is enabled
   */
  cassandraAuditLoggingEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Which version of Cassandra should this cluster converge to running (e.g., 3.11). When updated, the cluster may take some time to migrate to the new version.
   */
  cassandraVersion?: ExpressionOrValue<string> | undefined;
  /**
   * List of TLS certificates used to authorize clients connecting to the cluster. All connections are TLS encrypted whether clientCertificates is set or not, but if clientCertificates is set, the managed Cassandra cluster will reject all connections not bearing a TLS client certificate that can be validated from one or more of the public certificates in this property.
   */
  clientCertificates?: InputArray<CertificateView, Certificate[]> | undefined;
  /**
   * If you need to set the clusterName property in cassandra.yaml to something besides the resource name of the cluster, set the value to use on this property.
   */
  clusterNameOverride?: ExpressionOrValue<string> | undefined;
  /**
   * Whether the cluster and associated data centers has been deallocated.
   */
  deallocated?: ExpressionOrValue<boolean> | undefined;
  /**
   * Resource id of a subnet that this cluster's management service should have its network interface attached to. The subnet must be routable to all subnets that will be delegated to data centers. The resource id must be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'
   */
  delegatedManagementSubnetId?: ExpressionOrValue<string> | undefined;
  /**
   * Extensions to be added or updated on cluster.
   */
  extensions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * List of the data center names for unmanaged data centers in this cluster to be included in auto-replication.
   */
  externalDataCenters?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * List of TLS certificates used to authorize gossip from unmanaged data centers. The TLS certificates of all nodes in unmanaged data centers must be verifiable using one of the certificates provided in this property.
   */
  externalGossipCertificates?: InputArray<CertificateView, Certificate[]> | undefined;
  /**
   * List of IP addresses of seed nodes in unmanaged data centers. These will be added to the seed node lists of all managed nodes.
   */
  externalSeedNodes?: InputArray<SeedNodeView, SeedNode[]> | undefined;
  /**
   * Read-only output: List of TLS certificates that unmanaged nodes must trust for gossip with managed nodes. All managed nodes will present TLS client certificates that are verifiable using one of the certificates provided in this property.
   */
  readonly gossipCertificates?: Expression<Certificate[]> | undefined;
  /**
   * (Deprecated) Number of hours to wait between taking a backup of the cluster.
   */
  hoursBetweenBackups?: ExpressionOrValue<number> | undefined;
  /**
   * Initial password for clients connecting as admin to the cluster. Should be changed after cluster creation. Returns null on GET. This field only applies when the authenticationMethod field is 'Cassandra'.
   */
  initialCassandraAdminPassword?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: If the Connection Method is Vpn, this is the Id of the private link resource that the datacenters need to connect to.
   */
  readonly privateLinkResourceId?: Expression<string> | undefined;
  /**
   * Hostname or IP address where the Prometheus endpoint containing data about the managed Cassandra nodes can be reached.
   */
  prometheusEndpoint?: SeedNodeView | undefined;
  /**
   * Error related to resource provisioning.
   */
  provisionError?: CassandraErrorView | undefined;
  /**
   * The status of the resource at the time the operation was called.
   */
  provisioningState?: ExpressionOrValue<ManagedCassandraProvisioningState> | undefined;
  /**
   * Should automatic repairs run on this cluster? If omitted, this is true, and should stay true unless you are running a hybrid cluster where you are already doing your own repairs.
   */
  repairEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * To create an empty cluster, omit this field or set it to null. To restore a backup into a new cluster, set this field to the resource id of the backup.
   */
  restoreFromBackupId?: ExpressionOrValue<string> | undefined;
  /**
   * How the nodes in the cluster react to scheduled events
   */
  scheduledEventStrategy?: ExpressionOrValue<ScheduledEventStrategy> | undefined;
  /**
   * Read-only output: List of IP addresses of seed nodes in the managed data centers. These should be added to the seed node lists of all unmanaged nodes.
   */
  readonly seedNodes?: Expression<SeedNode[]> | undefined;
}

export const clusterResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  authenticationMethod: { armPath: ["authenticationMethod"], value: createUnionShape() },
  autoReplicate: { armPath: ["autoReplicate"], value: createUnionShape() },
  azureConnectionMethod: { armPath: ["azureConnectionMethod"], value: createUnionShape() },
  backupSchedules: {
    armPath: ["backupSchedules"],
    value: createArrayShape(createDeferredShape(() => backupScheduleShape)),
  },
  cassandraAuditLoggingEnabled: {
    armPath: ["cassandraAuditLoggingEnabled"],
    value: createBooleanShape(),
  },
  cassandraVersion: { armPath: ["cassandraVersion"], value: createStringShape() },
  clientCertificates: {
    armPath: ["clientCertificates"],
    value: createArrayShape(createDeferredShape(() => certificateShape)),
  },
  clusterNameOverride: { armPath: ["clusterNameOverride"], value: createStringShape() },
  deallocated: { armPath: ["deallocated"], value: createBooleanShape() },
  delegatedManagementSubnetId: {
    armPath: ["delegatedManagementSubnetId"],
    value: createStringShape(),
  },
  extensions: { armPath: ["extensions"], value: createArrayShape(createStringShape()) },
  externalDataCenters: {
    armPath: ["externalDataCenters"],
    value: createArrayShape(createStringShape()),
  },
  externalGossipCertificates: {
    armPath: ["externalGossipCertificates"],
    value: createArrayShape(createDeferredShape(() => certificateShape)),
  },
  externalSeedNodes: {
    armPath: ["externalSeedNodes"],
    value: createArrayShape(createDeferredShape(() => seedNodeShape)),
  },
  gossipCertificates: {
    armPath: ["gossipCertificates"],
    value: createArrayShape(createDeferredShape(() => certificateShape)),
    readOnly: true,
  },
  hoursBetweenBackups: { armPath: ["hoursBetweenBackups"], value: createNumberShape() },
  initialCassandraAdminPassword: {
    armPath: ["initialCassandraAdminPassword"],
    value: createStringShape(),
  },
  privateLinkResourceId: {
    armPath: ["privateLinkResourceId"],
    value: createStringShape(),
    readOnly: true,
  },
  prometheusEndpoint: {
    armPath: ["prometheusEndpoint"],
    value: createDeferredShape(() => seedNodeShape),
  },
  provisionError: {
    armPath: ["provisionError"],
    value: createDeferredShape(() => cassandraErrorShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape() },
  repairEnabled: { armPath: ["repairEnabled"], value: createBooleanShape() },
  restoreFromBackupId: { armPath: ["restoreFromBackupId"], value: createStringShape() },
  scheduledEventStrategy: { armPath: ["scheduledEventStrategy"], value: createUnionShape() },
  seedNodes: {
    armPath: ["seedNodes"],
    value: createArrayShape(createDeferredShape(() => seedNodeShape)),
    readOnly: true,
  },
});

/**
 * Cosmos DB Cassandra table column
 */
export interface Column {
  /**
   * Name of the Cosmos DB Cassandra table column
   */
  name?: string;
  /**
   * Type of the Cosmos DB Cassandra table column
   */
  type?: string;
}

/**
 * Input type for Cosmos DB Cassandra table column
 */
export interface ColumnInput extends InputOf<Column> {
  /**
   * Name of the Cosmos DB Cassandra table column
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Type of the Cosmos DB Cassandra table column
   */
  type?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cosmos DB Cassandra table column
 */
export type ColumnView = ColumnInput;

export const columnShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  type: { armPath: ["type"], value: createStringShape() },
});

export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties {
  /**
   * The client id of user assigned identity.
   */
  clientId?: string;
  /**
   * The principal id of user assigned identity.
   */
  principalId?: string;
}

export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesInput extends InputOf<Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties> {}

export interface Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesView extends InputOf<Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties> {
  /**
   * Read-only output: The client id of user assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal id of user assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesShape: FlatModelShape =
  createFlatModelShape({
    clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
    principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  });

export interface CompositePath {
  /**
   * Sort order for composite paths.
   */
  order?: CompositePathSortOrder;
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: string;
}

export interface CompositePathInput extends InputOf<CompositePath> {
  /**
   * Sort order for composite paths.
   */
  order?: ExpressionOrValue<CompositePathSortOrder> | undefined;
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: ExpressionOrValue<string> | undefined;
}

export type CompositePathView = CompositePathInput;

export const compositePathShape: FlatModelShape = createFlatModelShape({
  order: { armPath: ["order"], value: createUnionShape() },
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * The definition of a computed property
 */
export interface ComputedProperty {
  /**
   * The name of a computed property, for example - "cp_lowerName"
   */
  name?: string;
  /**
   * The query that evaluates the value for computed property, for example - "SELECT VALUE LOWER(c.name) FROM c"
   */
  query?: string;
}

/**
 * Input type for The definition of a computed property
 */
export interface ComputedPropertyInput extends InputOf<ComputedProperty> {
  /**
   * The name of a computed property, for example - "cp_lowerName"
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The query that evaluates the value for computed property, for example - "SELECT VALUE LOWER(c.name) FROM c"
   */
  query?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The definition of a computed property
 */
export type ComputedPropertyView = ComputedPropertyInput;

export const computedPropertyShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  query: { armPath: ["query"], value: createStringShape() },
});

/**
 * The conflict resolution policy for the container.
 */
export interface ConflictResolutionPolicy {
  /**
   * The conflict resolution path in the case of LastWriterWins mode.
   */
  conflictResolutionPath?: string;
  /**
   * The procedure to resolve conflicts in the case of custom mode.
   */
  conflictResolutionProcedure?: string;
  /**
   * Indicates the conflict resolution mode.
   */
  mode?: ConflictResolutionMode;
}

/**
 * Input type for The conflict resolution policy for the container.
 */
export interface ConflictResolutionPolicyInput extends InputOf<ConflictResolutionPolicy> {
  /**
   * The conflict resolution path in the case of LastWriterWins mode.
   */
  conflictResolutionPath?: ExpressionOrValue<string> | undefined;
  /**
   * The procedure to resolve conflicts in the case of custom mode.
   */
  conflictResolutionProcedure?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates the conflict resolution mode.
   */
  mode?: ExpressionOrValue<ConflictResolutionMode> | undefined;
}

/**
 * View type for The conflict resolution policy for the container.
 */
export type ConflictResolutionPolicyView = ConflictResolutionPolicyInput;

export const conflictResolutionPolicyShape: FlatModelShape = createFlatModelShape({
  conflictResolutionPath: { armPath: ["conflictResolutionPath"], value: createStringShape() },
  conflictResolutionProcedure: {
    armPath: ["conflictResolutionProcedure"],
    value: createStringShape(),
  },
  mode: { armPath: ["mode"], value: createUnionShape() },
});

/**
 * The consistency policy for the Cosmos DB database account.
 */
export interface ConsistencyPolicy {
  /**
   * The default consistency level and configuration settings of the Cosmos DB account.
   */
  defaultConsistencyLevel: DefaultConsistencyLevel;
  /**
   * When used with the Bounded Staleness consistency level, this value represents the time amount of staleness (in seconds) tolerated. Accepted range for this value is 5 - 86400. Required when defaultConsistencyPolicy is set to 'BoundedStaleness'.
   */
  maxIntervalInSeconds?: number;
  /**
   * When used with the Bounded Staleness consistency level, this value represents the number of stale requests tolerated. Accepted range for this value is 1 – 2,147,483,647. Required when defaultConsistencyPolicy is set to 'BoundedStaleness'.
   */
  maxStalenessPrefix?: number;
}

/**
 * Input type for The consistency policy for the Cosmos DB database account.
 */
export interface ConsistencyPolicyInput extends InputOf<ConsistencyPolicy> {
  /**
   * The default consistency level and configuration settings of the Cosmos DB account.
   */
  defaultConsistencyLevel: ExpressionOrValue<DefaultConsistencyLevel>;
  /**
   * When used with the Bounded Staleness consistency level, this value represents the time amount of staleness (in seconds) tolerated. Accepted range for this value is 5 - 86400. Required when defaultConsistencyPolicy is set to 'BoundedStaleness'.
   */
  maxIntervalInSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * When used with the Bounded Staleness consistency level, this value represents the number of stale requests tolerated. Accepted range for this value is 1 – 2,147,483,647. Required when defaultConsistencyPolicy is set to 'BoundedStaleness'.
   */
  maxStalenessPrefix?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The consistency policy for the Cosmos DB database account.
 */
export type ConsistencyPolicyView = ConsistencyPolicyInput;

export const consistencyPolicyShape: FlatModelShape = createFlatModelShape({
  defaultConsistencyLevel: { armPath: ["defaultConsistencyLevel"], value: createEnumShape() },
  maxIntervalInSeconds: { armPath: ["maxIntervalInSeconds"], value: createNumberShape() },
  maxStalenessPrefix: { armPath: ["maxStalenessPrefix"], value: createNumberShape() },
});

/**
 * The configuration of the partition key to be used for partitioning data into multiple partitions
 */
export interface ContainerPartitionKey {
  /**
   * Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create
   */
  kind?: PartitionKind;
  /**
   * List of paths using which data within the container can be partitioned
   */
  paths?: string[];
  /**
   * Indicates if the container is using a system generated partition key
   */
  systemKey?: boolean;
  /**
   * Indicates the version of the partition key definition
   */
  version?: number;
}

/**
 * Input type for The configuration of the partition key to be used for partitioning data into multiple partitions
 */
export interface ContainerPartitionKeyInput extends InputOf<ContainerPartitionKey> {
  /**
   * Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create
   */
  kind?: ExpressionOrValue<PartitionKind> | undefined;
  /**
   * List of paths using which data within the container can be partitioned
   */
  paths?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Indicates the version of the partition key definition
   */
  version?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The configuration of the partition key to be used for partitioning data into multiple partitions
 */
export interface ContainerPartitionKeyView extends InputOf<ContainerPartitionKey> {
  /**
   * Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create
   */
  kind?: ExpressionOrValue<PartitionKind> | undefined;
  /**
   * List of paths using which data within the container can be partitioned
   */
  paths?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: Indicates if the container is using a system generated partition key
   */
  readonly systemKey?: Expression<boolean> | undefined;
  /**
   * Indicates the version of the partition key definition
   */
  version?: ExpressionOrValue<number> | undefined;
}

export const containerPartitionKeyShape: FlatModelShape = createFlatModelShape({
  kind: { armPath: ["kind"], value: createUnionShape() },
  paths: { armPath: ["paths"], value: createArrayShape(createStringShape()) },
  systemKey: { armPath: ["systemKey"], value: createBooleanShape(), readOnly: true },
  version: { armPath: ["version"], value: createNumberShape() },
});

/**
 * The object representing continuous mode backup policy.
 */
export interface ContinuousModeBackupPolicy {
  /**
   * Configuration values for continuous mode backup
   */
  continuousModeProperties?: ContinuousModeProperties;
  /**
   * The object representing the state of the migration between the backup policies.
   */
  migrationState?: BackupPolicyMigrationState;
  /**
   * Describes the mode of backups.
   *
   * Selects this variant. Must be "Continuous".
   */
  type: "Continuous";
}

/**
 * Input type for The object representing continuous mode backup policy.
 */
export interface ContinuousModeBackupPolicyInput extends InputOf<ContinuousModeBackupPolicy> {
  /**
   * Configuration values for continuous mode backup
   */
  continuousModeProperties?: ContinuousModePropertiesInput | undefined;
  /**
   * The object representing the state of the migration between the backup policies.
   */
  migrationState?: BackupPolicyMigrationStateInput | undefined;
  /**
   * Describes the mode of backups.
   *
   * Selects this variant. Must be "Continuous".
   */
  type: "Continuous";
}

/**
 * View type for The object representing continuous mode backup policy.
 */
export type ContinuousModeBackupPolicyView = ContinuousModeBackupPolicyInput;

export const continuousModeBackupPolicyShape: FlatModelShape = createFlatModelShape({
  continuousModeProperties: {
    armPath: ["continuousModeProperties"],
    value: createDeferredShape(() => continuousModePropertiesShape),
  },
  migrationState: {
    armPath: ["migrationState"],
    value: createDeferredShape(() => backupPolicyMigrationStateShape),
  },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Configuration values for periodic mode backup
 */
export interface ContinuousModeProperties {
  /**
   * Enum to indicate type of Continuos backup mode
   */
  tier?: ContinuousTier;
}

/**
 * Input type for Configuration values for periodic mode backup
 */
export interface ContinuousModePropertiesInput extends InputOf<ContinuousModeProperties> {
  /**
   * Enum to indicate type of Continuos backup mode
   */
  tier?: ExpressionOrValue<ContinuousTier> | undefined;
}

/**
 * View type for Configuration values for periodic mode backup
 */
export type ContinuousModePropertiesView = ContinuousModePropertiesInput;

export const continuousModePropertiesShape: FlatModelShape = createFlatModelShape({
  tier: { armPath: ["tier"], value: createUnionShape() },
});

/**
 * The CORS policy for the Cosmos DB database account.
 */
export interface CorsPolicy {
  /**
   * The request headers that the origin domain may specify on the CORS request.
   */
  allowedHeaders?: string;
  /**
   * The methods (HTTP request verbs) that the origin domain may use for a CORS request.
   */
  allowedMethods?: string;
  /**
   * The origin domains that are permitted to make a request against the service via CORS.
   */
  allowedOrigins: string;
  /**
   * The response headers that may be sent in the response to the CORS request and exposed by the browser to the request issuer.
   */
  exposedHeaders?: string;
  /**
   * The maximum amount time that a browser should cache the preflight OPTIONS request.
   */
  maxAgeInSeconds?: number;
}

/**
 * Input type for The CORS policy for the Cosmos DB database account.
 */
export interface CorsPolicyInput extends InputOf<CorsPolicy> {
  /**
   * The request headers that the origin domain may specify on the CORS request.
   */
  allowedHeaders?: ExpressionOrValue<string> | undefined;
  /**
   * The methods (HTTP request verbs) that the origin domain may use for a CORS request.
   */
  allowedMethods?: ExpressionOrValue<string> | undefined;
  /**
   * The origin domains that are permitted to make a request against the service via CORS.
   */
  allowedOrigins: ExpressionOrValue<string>;
  /**
   * The response headers that may be sent in the response to the CORS request and exposed by the browser to the request issuer.
   */
  exposedHeaders?: ExpressionOrValue<string> | undefined;
  /**
   * The maximum amount time that a browser should cache the preflight OPTIONS request.
   */
  maxAgeInSeconds?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The CORS policy for the Cosmos DB database account.
 */
export type CorsPolicyView = CorsPolicyInput;

export const corsPolicyShape: FlatModelShape = createFlatModelShape({
  allowedHeaders: { armPath: ["allowedHeaders"], value: createStringShape() },
  allowedMethods: { armPath: ["allowedMethods"], value: createStringShape() },
  allowedOrigins: { armPath: ["allowedOrigins"], value: createStringShape() },
  exposedHeaders: { armPath: ["exposedHeaders"], value: createStringShape() },
  maxAgeInSeconds: { armPath: ["maxAgeInSeconds"], value: createNumberShape() },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface CreateUpdateOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface CreateUpdateOptionsInput extends InputOf<CreateUpdateOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type CreateUpdateOptionsView = CreateUpdateOptionsInput;

export const createUpdateOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Properties for the database account.
 */
export interface DatabaseAccountGetProperties {
  /**
   * Analytical storage specific properties.
   */
  analyticalStorageConfiguration?: AnalyticalStorageConfiguration;
  /**
   * API specific properties. Currently, supported only for MongoDB API.
   */
  apiProperties?: ApiProperties;
  /**
   * The object representing the policy for taking backups on an account.
   */
  backupPolicy?: BackupPolicy;
  /**
   * List of Cosmos DB capabilities for the account
   */
  capabilities?: Capability[];
  /**
   * The object that represents all properties related to capacity enforcement on an account.
   */
  capacity?: Capacity;
  /**
   * The cassandra connector offer type for the Cosmos DB database C* account.
   */
  connectorOffer?: ConnectorOffer;
  /**
   * The consistency policy for the Cosmos DB account.
   */
  consistencyPolicy?: ConsistencyPolicy;
  /**
   * The CORS policy for the Cosmos DB database account.
   */
  cors?: CorsPolicy[];
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: CreateMode;
  /**
   * Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance.
   */
  customerManagedKeyStatus?: string;
  /**
   * The offer type for the Cosmos DB database account.
   */
  databaseAccountOfferType: "Standard";
  /**
   * The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more.
   */
  defaultIdentity?: string;
  /**
   * Enum to indicate default Priority Level of request for Priority Based Execution.
   */
  defaultPriorityLevel?: DefaultPriorityLevel;
  /**
   * Disable write operations on metadata resources (databases, containers, throughput) via account keys
   */
  disableKeyBasedMetadataWriteAccess?: boolean;
  /**
   * Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication.
   */
  disableLocalAuth?: boolean;
  /**
   * The connection endpoint for the Cosmos DB database account.
   */
  documentEndpoint?: string;
  /**
   * Flag to indicate whether to enable storage analytics.
   */
  enableAnalyticalStorage?: boolean;
  /**
   * Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account.
   */
  enableAutomaticFailover?: boolean;
  /**
   * Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account
   */
  enableBurstCapacity?: boolean;
  /**
   * Enables the cassandra connector on the Cosmos DB C* account
   */
  enableCassandraConnector?: boolean;
  /**
   * Flag to indicate whether Free Tier is enabled.
   */
  enableFreeTier?: boolean;
  /**
   * Enables the account to write in multiple locations
   */
  enableMultipleWriteLocations?: boolean;
  /**
   * Flag to indicate enabling/disabling of Partition Merge feature on the account
   */
  enablePartitionMerge?: boolean;
  /**
   * Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account
   */
  enablePerRegionPerPartitionAutoscale?: boolean;
  /**
   * Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account
   */
  enablePriorityBasedExecution?: boolean;
  /**
   * Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account.
   */
  enforceHierarchicalPartitionKeyIdLastLevel?: boolean;
  /**
   * An array that contains the regions ordered by their failover priorities.
   */
  failoverPolicies?: FailoverPolicy[];
  /**
   * A unique identifier assigned to the database account
   */
  instanceId?: string;
  /**
   * List of IpRules.
   */
  ipRules?: IpAddressOrRange[];
  /**
   * Flag to indicate whether to enable/disable Virtual Network ACL rules.
   */
  isVirtualNetworkFilterEnabled?: boolean;
  /**
   * The object that represents the metadata for the Account Keys of the Cosmos DB account.
   */
  keysMetadata?: DatabaseAccountKeysMetadata;
  /**
   * The URI of the key vault
   */
  keyVaultKeyUri?: string;
  /**
   * The version of the Customer Managed Key currently being used by the account
   */
  keyVaultKeyUriVersion?: string;
  /**
   * An array that contains the georeplication locations enabled for the Cosmos DB account.
   */
  locations: DocumentDbLocation[];
  /**
   * Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2.
   */
  minimalTlsVersion?: MinimalTlsVersion;
  /**
   * Indicates what services are allowed to bypass firewall checks.
   */
  networkAclBypass?: NetworkAclBypass;
  /**
   * An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account.
   */
  networkAclBypassResourceIds?: string[];
  /**
   * List of Private Endpoint Connections configured for the Cosmos DB account.
   */
  privateEndpointConnections?: DocumentDbPrivateEndpointConnection[];
  /**
   * The provisioning state of the resource.
   */
  provisioningState?: string;
  /**
   * Whether requests from Public Network are allowed
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /**
   * An array that contains of the read locations enabled for the Cosmos DB account.
   */
  readLocations?: DocumentDbLocation[];
  /**
   * Parameters to indicate the information about the restore.
   */
  restoreParameters?: RestoreParameters;
  /**
   * List of Virtual Network ACL rules configured for the Cosmos DB account.
   */
  virtualNetworkRules?: VirtualNetworkRule[];
  /**
   * An array that contains the write location for the Cosmos DB account.
   */
  writeLocations?: DocumentDbLocation[];
}

/**
 * Input type for Properties for the database account.
 */
export interface DatabaseAccountGetPropertiesInput extends InputOf<DatabaseAccountGetProperties> {
  /**
   * Analytical storage specific properties.
   */
  analyticalStorageConfiguration?: AnalyticalStorageConfigurationInput | undefined;
  /**
   * API specific properties. Currently, supported only for MongoDB API.
   */
  apiProperties?: ApiPropertiesInput | undefined;
  /**
   * The object representing the policy for taking backups on an account.
   */
  backupPolicy?: BackupPolicyInput | undefined;
  /**
   * List of Cosmos DB capabilities for the account
   */
  capabilities?: InputArray<CapabilityInput, Capability[]> | undefined;
  /**
   * The object that represents all properties related to capacity enforcement on an account.
   */
  capacity?: CapacityInput | undefined;
  /**
   * The cassandra connector offer type for the Cosmos DB database C* account.
   */
  connectorOffer?: ExpressionOrValue<ConnectorOffer> | undefined;
  /**
   * The consistency policy for the Cosmos DB account.
   */
  consistencyPolicy?: ConsistencyPolicyInput | undefined;
  /**
   * The CORS policy for the Cosmos DB database account.
   */
  cors?: InputArray<CorsPolicyInput, CorsPolicy[]> | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance.
   */
  customerManagedKeyStatus?: ExpressionOrValue<string> | undefined;
  /**
   * The offer type for the Cosmos DB database account.
   */
  databaseAccountOfferType: ExpressionOrValue<"Standard">;
  /**
   * The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more.
   */
  defaultIdentity?: ExpressionOrValue<string> | undefined;
  /**
   * Enum to indicate default Priority Level of request for Priority Based Execution.
   */
  defaultPriorityLevel?: ExpressionOrValue<DefaultPriorityLevel> | undefined;
  /**
   * Disable write operations on metadata resources (databases, containers, throughput) via account keys
   */
  disableKeyBasedMetadataWriteAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate whether to enable storage analytics.
   */
  enableAnalyticalStorage?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account.
   */
  enableAutomaticFailover?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account
   */
  enableBurstCapacity?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables the cassandra connector on the Cosmos DB C* account
   */
  enableCassandraConnector?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate whether Free Tier is enabled.
   */
  enableFreeTier?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables the account to write in multiple locations
   */
  enableMultipleWriteLocations?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Partition Merge feature on the account
   */
  enablePartitionMerge?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account
   */
  enablePerRegionPerPartitionAutoscale?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account
   */
  enablePriorityBasedExecution?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account.
   */
  enforceHierarchicalPartitionKeyIdLastLevel?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of IpRules.
   */
  ipRules?: InputArray<IpAddressOrRangeInput, IpAddressOrRange[]> | undefined;
  /**
   * Flag to indicate whether to enable/disable Virtual Network ACL rules.
   */
  isVirtualNetworkFilterEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The URI of the key vault
   */
  keyVaultKeyUri?: ExpressionOrValue<string> | undefined;
  /**
   * An array that contains the georeplication locations enabled for the Cosmos DB account.
   */
  locations: InputArray<DocumentDbLocationInput, DocumentDbLocation[]>;
  /**
   * Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2.
   */
  minimalTlsVersion?: ExpressionOrValue<MinimalTlsVersion> | undefined;
  /**
   * Indicates what services are allowed to bypass firewall checks.
   */
  networkAclBypass?: ExpressionOrValue<NetworkAclBypass> | undefined;
  /**
   * An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account.
   */
  networkAclBypassResourceIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Whether requests from Public Network are allowed
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Parameters to indicate the information about the restore.
   */
  restoreParameters?: RestoreParametersInput | undefined;
  /**
   * List of Virtual Network ACL rules configured for the Cosmos DB account.
   */
  virtualNetworkRules?: InputArray<VirtualNetworkRuleInput, VirtualNetworkRule[]> | undefined;
}

/**
 * View type for Properties for the database account.
 */
export interface DatabaseAccountGetPropertiesView extends InputOf<DatabaseAccountGetProperties> {
  /**
   * Analytical storage specific properties.
   */
  analyticalStorageConfiguration?: AnalyticalStorageConfigurationView | undefined;
  /**
   * API specific properties. Currently, supported only for MongoDB API.
   */
  apiProperties?: ApiPropertiesView | undefined;
  /**
   * The object representing the policy for taking backups on an account.
   */
  backupPolicy?: BackupPolicyView | undefined;
  /**
   * List of Cosmos DB capabilities for the account
   */
  capabilities?: InputArray<CapabilityView, Capability[]> | undefined;
  /**
   * The object that represents all properties related to capacity enforcement on an account.
   */
  capacity?: CapacityView | undefined;
  /**
   * The cassandra connector offer type for the Cosmos DB database C* account.
   */
  connectorOffer?: ExpressionOrValue<ConnectorOffer> | undefined;
  /**
   * The consistency policy for the Cosmos DB account.
   */
  consistencyPolicy?: ConsistencyPolicyView | undefined;
  /**
   * The CORS policy for the Cosmos DB database account.
   */
  cors?: InputArray<CorsPolicyView, CorsPolicy[]> | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Indicates the status of the Customer Managed Key feature on the account. In case there are errors, the property provides troubleshooting guidance.
   */
  customerManagedKeyStatus?: ExpressionOrValue<string> | undefined;
  /**
   * The offer type for the Cosmos DB database account.
   */
  databaseAccountOfferType: ExpressionOrValue<"Standard">;
  /**
   * The default identity for accessing key vault used in features like customer managed keys. The default identity needs to be explicitly set by the users. It can be "FirstPartyIdentity", "SystemAssignedIdentity" and more.
   */
  defaultIdentity?: ExpressionOrValue<string> | undefined;
  /**
   * Enum to indicate default Priority Level of request for Priority Based Execution.
   */
  defaultPriorityLevel?: ExpressionOrValue<DefaultPriorityLevel> | undefined;
  /**
   * Disable write operations on metadata resources (databases, containers, throughput) via account keys
   */
  disableKeyBasedMetadataWriteAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Opt-out of local authentication and ensure only MSI and AAD can be used exclusively for authentication.
   */
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The connection endpoint for the Cosmos DB database account.
   */
  readonly documentEndpoint?: Expression<string> | undefined;
  /**
   * Flag to indicate whether to enable storage analytics.
   */
  enableAnalyticalStorage?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables automatic failover of the write region in the rare event that the region is unavailable due to an outage. Automatic failover will result in a new write region for the account and is chosen based on the failover priorities configured for the account.
   */
  enableAutomaticFailover?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Burst Capacity Preview feature on the account
   */
  enableBurstCapacity?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables the cassandra connector on the Cosmos DB C* account
   */
  enableCassandraConnector?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate whether Free Tier is enabled.
   */
  enableFreeTier?: ExpressionOrValue<boolean> | undefined;
  /**
   * Enables the account to write in multiple locations
   */
  enableMultipleWriteLocations?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Partition Merge feature on the account
   */
  enablePartitionMerge?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Per-Region Per-partition autoscale Preview feature on the account
   */
  enablePerRegionPerPartitionAutoscale?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of Priority Based Execution Preview feature on the account
   */
  enablePriorityBasedExecution?: ExpressionOrValue<boolean> | undefined;
  /**
   * Flag to indicate enabling/disabling of hierarchical partition key ID last level enforcement on the account.
   */
  enforceHierarchicalPartitionKeyIdLastLevel?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: An array that contains the regions ordered by their failover priorities.
   */
  readonly failoverPolicies?: Expression<FailoverPolicy[]> | undefined;
  /**
   * Read-only output: A unique identifier assigned to the database account
   */
  readonly instanceId?: Expression<string> | undefined;
  /**
   * List of IpRules.
   */
  ipRules?: InputArray<IpAddressOrRangeView, IpAddressOrRange[]> | undefined;
  /**
   * Flag to indicate whether to enable/disable Virtual Network ACL rules.
   */
  isVirtualNetworkFilterEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The object that represents the metadata for the Account Keys of the Cosmos DB account.
   */
  readonly keysMetadata?: Expression<DatabaseAccountKeysMetadata> | undefined;
  /**
   * The URI of the key vault
   */
  keyVaultKeyUri?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The version of the Customer Managed Key currently being used by the account
   */
  readonly keyVaultKeyUriVersion?: Expression<string> | undefined;
  /**
   * An array that contains the georeplication locations enabled for the Cosmos DB account.
   */
  locations: InputArray<DocumentDbLocationView, DocumentDbLocation[]>;
  /**
   * Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2.
   */
  minimalTlsVersion?: ExpressionOrValue<MinimalTlsVersion> | undefined;
  /**
   * Indicates what services are allowed to bypass firewall checks.
   */
  networkAclBypass?: ExpressionOrValue<NetworkAclBypass> | undefined;
  /**
   * An array that contains the Resource Ids for Network Acl Bypass for the Cosmos DB account.
   */
  networkAclBypassResourceIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: List of Private Endpoint Connections configured for the Cosmos DB account.
   */
  readonly privateEndpointConnections?:
    Expression<DocumentDbPrivateEndpointConnection[]> | undefined;
  /**
   * Read-only output: The provisioning state of the resource.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * Whether requests from Public Network are allowed
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Read-only output: An array that contains of the read locations enabled for the Cosmos DB account.
   */
  readonly readLocations?: Expression<DocumentDbLocation[]> | undefined;
  /**
   * Parameters to indicate the information about the restore.
   */
  restoreParameters?: RestoreParametersView | undefined;
  /**
   * List of Virtual Network ACL rules configured for the Cosmos DB account.
   */
  virtualNetworkRules?: InputArray<VirtualNetworkRuleView, VirtualNetworkRule[]> | undefined;
  /**
   * Read-only output: An array that contains the write location for the Cosmos DB account.
   */
  readonly writeLocations?: Expression<DocumentDbLocation[]> | undefined;
}

export const databaseAccountGetPropertiesShape: FlatModelShape = createFlatModelShape({
  analyticalStorageConfiguration: {
    armPath: ["analyticalStorageConfiguration"],
    value: createDeferredShape(() => analyticalStorageConfigurationShape),
  },
  apiProperties: {
    armPath: ["apiProperties"],
    value: createDeferredShape(() => apiPropertiesShape),
  },
  backupPolicy: { armPath: ["backupPolicy"], value: createDeferredShape(() => backupPolicyShape) },
  capabilities: {
    armPath: ["capabilities"],
    value: createArrayShape(createDeferredShape(() => capabilityShape)),
  },
  capacity: { armPath: ["capacity"], value: createDeferredShape(() => capacityShape) },
  connectorOffer: { armPath: ["connectorOffer"], value: createUnionShape() },
  consistencyPolicy: {
    armPath: ["consistencyPolicy"],
    value: createDeferredShape(() => consistencyPolicyShape),
  },
  cors: { armPath: ["cors"], value: createArrayShape(createDeferredShape(() => corsPolicyShape)) },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  customerManagedKeyStatus: { armPath: ["customerManagedKeyStatus"], value: createStringShape() },
  databaseAccountOfferType: {
    armPath: ["databaseAccountOfferType"],
    value: createStringLiteralShape(),
  },
  defaultIdentity: { armPath: ["defaultIdentity"], value: createStringShape() },
  defaultPriorityLevel: { armPath: ["defaultPriorityLevel"], value: createUnionShape() },
  disableKeyBasedMetadataWriteAccess: {
    armPath: ["disableKeyBasedMetadataWriteAccess"],
    value: createBooleanShape(),
  },
  disableLocalAuth: { armPath: ["disableLocalAuth"], value: createBooleanShape() },
  documentEndpoint: { armPath: ["documentEndpoint"], value: createStringShape(), readOnly: true },
  enableAnalyticalStorage: { armPath: ["enableAnalyticalStorage"], value: createBooleanShape() },
  enableAutomaticFailover: { armPath: ["enableAutomaticFailover"], value: createBooleanShape() },
  enableBurstCapacity: { armPath: ["enableBurstCapacity"], value: createBooleanShape() },
  enableCassandraConnector: { armPath: ["enableCassandraConnector"], value: createBooleanShape() },
  enableFreeTier: { armPath: ["enableFreeTier"], value: createBooleanShape() },
  enableMultipleWriteLocations: {
    armPath: ["enableMultipleWriteLocations"],
    value: createBooleanShape(),
  },
  enablePartitionMerge: { armPath: ["enablePartitionMerge"], value: createBooleanShape() },
  enablePerRegionPerPartitionAutoscale: {
    armPath: ["enablePerRegionPerPartitionAutoscale"],
    value: createBooleanShape(),
  },
  enablePriorityBasedExecution: {
    armPath: ["enablePriorityBasedExecution"],
    value: createBooleanShape(),
  },
  enforceHierarchicalPartitionKeyIdLastLevel: {
    armPath: ["enforceHierarchicalPartitionKeyIdLastLevel"],
    value: createBooleanShape(),
  },
  failoverPolicies: {
    armPath: ["failoverPolicies"],
    value: createArrayShape(createDeferredShape(() => failoverPolicyShape)),
    readOnly: true,
  },
  instanceId: { armPath: ["instanceId"], value: createStringShape(), readOnly: true },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => ipAddressOrRangeShape)),
  },
  isVirtualNetworkFilterEnabled: {
    armPath: ["isVirtualNetworkFilterEnabled"],
    value: createBooleanShape(),
  },
  keysMetadata: {
    armPath: ["keysMetadata"],
    value: createDeferredShape(() => databaseAccountKeysMetadataShape),
    readOnly: true,
  },
  keyVaultKeyUri: { armPath: ["keyVaultKeyUri"], value: createStringShape() },
  keyVaultKeyUriVersion: {
    armPath: ["keyVaultKeyUriVersion"],
    value: createStringShape(),
    readOnly: true,
  },
  locations: {
    armPath: ["locations"],
    value: createArrayShape(createDeferredShape(() => documentDbLocationShape)),
  },
  minimalTlsVersion: { armPath: ["minimalTlsVersion"], value: createUnionShape() },
  networkAclBypass: { armPath: ["networkAclBypass"], value: createEnumShape() },
  networkAclBypassResourceIds: {
    armPath: ["networkAclBypassResourceIds"],
    value: createArrayShape(createStringShape()),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => documentDbPrivateEndpointConnectionShape)),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  readLocations: {
    armPath: ["readLocations"],
    value: createArrayShape(createDeferredShape(() => documentDbLocationShape)),
    readOnly: true,
  },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => restoreParametersShape),
  },
  virtualNetworkRules: {
    armPath: ["virtualNetworkRules"],
    value: createArrayShape(createDeferredShape(() => virtualNetworkRuleShape)),
  },
  writeLocations: {
    armPath: ["writeLocations"],
    value: createArrayShape(createDeferredShape(() => documentDbLocationShape)),
    readOnly: true,
  },
});

/**
 * The metadata related to each access key for the given Cosmos DB database account.
 */
export interface DatabaseAccountKeysMetadata {
  /**
   * The metadata related to the Primary Read-Write Key for the given Cosmos DB database account.
   */
  primaryMasterKey?: AccountKeyMetadata;
  /**
   * The metadata related to the Primary Read-Only Key for the given Cosmos DB database account.
   */
  primaryReadonlyMasterKey?: AccountKeyMetadata;
  /**
   * The metadata related to the Secondary Read-Write Key for the given Cosmos DB database account.
   */
  secondaryMasterKey?: AccountKeyMetadata;
  /**
   * The metadata related to the Secondary Read-Only Key for the given Cosmos DB database account.
   */
  secondaryReadonlyMasterKey?: AccountKeyMetadata;
}

/**
 * Input type for The metadata related to each access key for the given Cosmos DB database account.
 */
export interface DatabaseAccountKeysMetadataInput extends InputOf<DatabaseAccountKeysMetadata> {}

/**
 * View type for The metadata related to each access key for the given Cosmos DB database account.
 */
export interface DatabaseAccountKeysMetadataView extends InputOf<DatabaseAccountKeysMetadata> {
  /**
   * Read-only output: The metadata related to the Primary Read-Write Key for the given Cosmos DB database account.
   */
  readonly primaryMasterKey?: Expression<AccountKeyMetadata> | undefined;
  /**
   * Read-only output: The metadata related to the Primary Read-Only Key for the given Cosmos DB database account.
   */
  readonly primaryReadonlyMasterKey?: Expression<AccountKeyMetadata> | undefined;
  /**
   * Read-only output: The metadata related to the Secondary Read-Write Key for the given Cosmos DB database account.
   */
  readonly secondaryMasterKey?: Expression<AccountKeyMetadata> | undefined;
  /**
   * Read-only output: The metadata related to the Secondary Read-Only Key for the given Cosmos DB database account.
   */
  readonly secondaryReadonlyMasterKey?: Expression<AccountKeyMetadata> | undefined;
}

export const databaseAccountKeysMetadataShape: FlatModelShape = createFlatModelShape({
  primaryMasterKey: {
    armPath: ["primaryMasterKey"],
    value: createDeferredShape(() => accountKeyMetadataShape),
    readOnly: true,
  },
  primaryReadonlyMasterKey: {
    armPath: ["primaryReadonlyMasterKey"],
    value: createDeferredShape(() => accountKeyMetadataShape),
    readOnly: true,
  },
  secondaryMasterKey: {
    armPath: ["secondaryMasterKey"],
    value: createDeferredShape(() => accountKeyMetadataShape),
    readOnly: true,
  },
  secondaryReadonlyMasterKey: {
    armPath: ["secondaryReadonlyMasterKey"],
    value: createDeferredShape(() => accountKeyMetadataShape),
    readOnly: true,
  },
});

/**
 * Specific Databases to restore.
 */
export interface DatabaseRestoreResource {
  /**
   * The names of the collections available for restore.
   */
  collectionNames?: string[];
  /**
   * The name of the database available for restore.
   */
  databaseName?: string;
}

/**
 * Input type for Specific Databases to restore.
 */
export interface DatabaseRestoreResourceInput extends InputOf<DatabaseRestoreResource> {
  /**
   * The names of the collections available for restore.
   */
  collectionNames?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The name of the database available for restore.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Specific Databases to restore.
 */
export type DatabaseRestoreResourceView = DatabaseRestoreResourceInput;

export const databaseRestoreResourceShape: FlatModelShape = createFlatModelShape({
  collectionNames: { armPath: ["collectionNames"], value: createArrayShape(createStringShape()) },
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
});

/**
 * Properties of a managed Cassandra data center.
 */
export interface DataCenterResourceProperties {
  /**
   * Ldap authentication method properties. This feature is in preview.
   */
  authenticationMethodLdapProperties?: AuthenticationMethodLdapProperties;
  /**
   * If the data center has Availability Zone support, apply it to the Virtual Machine ScaleSet that host the cassandra data center virtual machines.
   */
  availabilityZone?: boolean;
  /**
   * Indicates the Key Uri of the customer key to use for encryption of the backup storage account.
   */
  backupStorageCustomerKeyUri?: string;
  /**
   * A fragment of a cassandra.yaml configuration file to be included in the cassandra.yaml for all nodes in this data center. The fragment should be Base64 encoded, and only a subset of keys are allowed.
   */
  base64EncodedCassandraYamlFragment?: string;
  /**
   * The region this data center should be created in.
   */
  dataCenterLocation?: string;
  /**
   * Whether the data center has been deallocated.
   */
  deallocated?: boolean;
  /**
   * Resource id of a subnet the nodes in this data center should have their network interfaces connected to. The subnet must be in the same region specified in 'dataCenterLocation' and must be able to route to the subnet specified in the cluster's 'delegatedManagementSubnetId' property. This resource id will be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'.
   */
  delegatedSubnetId?: string;
  /**
   * Number of disks attached to each node. Default is 4.
   */
  diskCapacity?: number;
  /**
   * Disk SKU used for data centers. Default value is P30.
   */
  diskSku?: string;
  /**
   * Key uri to use for encryption of managed disks. Ensure the system assigned identity of the cluster has been assigned appropriate permissions(key get/wrap/unwrap permissions) on the key.
   */
  managedDiskCustomerKeyUri?: string;
  /**
   * The number of nodes the data center should have. This is the desired number. After it is set, it may take some time for the data center to be scaled to match. To monitor the number of nodes and their status, use the fetchNodeStatus method on the cluster.
   */
  nodeCount?: number;
  /**
   * Ip of the VPN Endpoint for this data center.
   */
  privateEndpointIpAddress?: string;
  /**
   * Error related to resource provisioning.
   */
  provisionError?: CassandraError;
  /**
   * The status of the resource at the time the operation was called.
   */
  provisioningState?: ManagedCassandraProvisioningState;
  /**
   * IP addresses for seed nodes in this data center. This is for reference. Generally you will want to use the seedNodes property on the cluster, which aggregates the seed nodes from all data centers in the cluster.
   */
  seedNodes?: SeedNode[];
  /**
   * Virtual Machine SKU used for data centers. Default value is Standard_DS14_v2
   */
  sku?: string;
}

/**
 * Input type for Properties of a managed Cassandra data center.
 */
export interface DataCenterResourcePropertiesInput extends InputOf<DataCenterResourceProperties> {
  /**
   * Ldap authentication method properties. This feature is in preview.
   */
  authenticationMethodLdapProperties?: AuthenticationMethodLdapPropertiesInput | undefined;
  /**
   * If the data center has Availability Zone support, apply it to the Virtual Machine ScaleSet that host the cassandra data center virtual machines.
   */
  availabilityZone?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates the Key Uri of the customer key to use for encryption of the backup storage account.
   */
  backupStorageCustomerKeyUri?: ExpressionOrValue<string> | undefined;
  /**
   * A fragment of a cassandra.yaml configuration file to be included in the cassandra.yaml for all nodes in this data center. The fragment should be Base64 encoded, and only a subset of keys are allowed.
   */
  base64EncodedCassandraYamlFragment?: ExpressionOrValue<string> | undefined;
  /**
   * The region this data center should be created in.
   */
  dataCenterLocation?: ExpressionOrValue<string> | undefined;
  /**
   * Whether the data center has been deallocated.
   */
  deallocated?: ExpressionOrValue<boolean> | undefined;
  /**
   * Resource id of a subnet the nodes in this data center should have their network interfaces connected to. The subnet must be in the same region specified in 'dataCenterLocation' and must be able to route to the subnet specified in the cluster's 'delegatedManagementSubnetId' property. This resource id will be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'.
   */
  delegatedSubnetId?: ExpressionOrValue<string> | undefined;
  /**
   * Number of disks attached to each node. Default is 4.
   */
  diskCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * Disk SKU used for data centers. Default value is P30.
   */
  diskSku?: ExpressionOrValue<string> | undefined;
  /**
   * Key uri to use for encryption of managed disks. Ensure the system assigned identity of the cluster has been assigned appropriate permissions(key get/wrap/unwrap permissions) on the key.
   */
  managedDiskCustomerKeyUri?: ExpressionOrValue<string> | undefined;
  /**
   * The number of nodes the data center should have. This is the desired number. After it is set, it may take some time for the data center to be scaled to match. To monitor the number of nodes and their status, use the fetchNodeStatus method on the cluster.
   */
  nodeCount?: ExpressionOrValue<number> | undefined;
  /**
   * Ip of the VPN Endpoint for this data center.
   */
  privateEndpointIpAddress?: ExpressionOrValue<string> | undefined;
  /**
   * Error related to resource provisioning.
   */
  provisionError?: CassandraErrorInput | undefined;
  /**
   * The status of the resource at the time the operation was called.
   */
  provisioningState?: ExpressionOrValue<ManagedCassandraProvisioningState> | undefined;
  /**
   * Virtual Machine SKU used for data centers. Default value is Standard_DS14_v2
   */
  sku?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a managed Cassandra data center.
 */
export interface DataCenterResourcePropertiesView extends InputOf<DataCenterResourceProperties> {
  /**
   * Ldap authentication method properties. This feature is in preview.
   */
  authenticationMethodLdapProperties?: AuthenticationMethodLdapPropertiesView | undefined;
  /**
   * If the data center has Availability Zone support, apply it to the Virtual Machine ScaleSet that host the cassandra data center virtual machines.
   */
  availabilityZone?: ExpressionOrValue<boolean> | undefined;
  /**
   * Indicates the Key Uri of the customer key to use for encryption of the backup storage account.
   */
  backupStorageCustomerKeyUri?: ExpressionOrValue<string> | undefined;
  /**
   * A fragment of a cassandra.yaml configuration file to be included in the cassandra.yaml for all nodes in this data center. The fragment should be Base64 encoded, and only a subset of keys are allowed.
   */
  base64EncodedCassandraYamlFragment?: ExpressionOrValue<string> | undefined;
  /**
   * The region this data center should be created in.
   */
  dataCenterLocation?: ExpressionOrValue<string> | undefined;
  /**
   * Whether the data center has been deallocated.
   */
  deallocated?: ExpressionOrValue<boolean> | undefined;
  /**
   * Resource id of a subnet the nodes in this data center should have their network interfaces connected to. The subnet must be in the same region specified in 'dataCenterLocation' and must be able to route to the subnet specified in the cluster's 'delegatedManagementSubnetId' property. This resource id will be of the form '/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Network/virtualNetworks/<virtual network>/subnets/<subnet>'.
   */
  delegatedSubnetId?: ExpressionOrValue<string> | undefined;
  /**
   * Number of disks attached to each node. Default is 4.
   */
  diskCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * Disk SKU used for data centers. Default value is P30.
   */
  diskSku?: ExpressionOrValue<string> | undefined;
  /**
   * Key uri to use for encryption of managed disks. Ensure the system assigned identity of the cluster has been assigned appropriate permissions(key get/wrap/unwrap permissions) on the key.
   */
  managedDiskCustomerKeyUri?: ExpressionOrValue<string> | undefined;
  /**
   * The number of nodes the data center should have. This is the desired number. After it is set, it may take some time for the data center to be scaled to match. To monitor the number of nodes and their status, use the fetchNodeStatus method on the cluster.
   */
  nodeCount?: ExpressionOrValue<number> | undefined;
  /**
   * Ip of the VPN Endpoint for this data center.
   */
  privateEndpointIpAddress?: ExpressionOrValue<string> | undefined;
  /**
   * Error related to resource provisioning.
   */
  provisionError?: CassandraErrorView | undefined;
  /**
   * The status of the resource at the time the operation was called.
   */
  provisioningState?: ExpressionOrValue<ManagedCassandraProvisioningState> | undefined;
  /**
   * Read-only output: IP addresses for seed nodes in this data center. This is for reference. Generally you will want to use the seedNodes property on the cluster, which aggregates the seed nodes from all data centers in the cluster.
   */
  readonly seedNodes?: Expression<SeedNode[]> | undefined;
  /**
   * Virtual Machine SKU used for data centers. Default value is Standard_DS14_v2
   */
  sku?: ExpressionOrValue<string> | undefined;
}

export const dataCenterResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  authenticationMethodLdapProperties: {
    armPath: ["authenticationMethodLdapProperties"],
    value: createDeferredShape(() => authenticationMethodLdapPropertiesShape),
  },
  availabilityZone: { armPath: ["availabilityZone"], value: createBooleanShape() },
  backupStorageCustomerKeyUri: {
    armPath: ["backupStorageCustomerKeyUri"],
    value: createStringShape(),
  },
  base64EncodedCassandraYamlFragment: {
    armPath: ["base64EncodedCassandraYamlFragment"],
    value: createStringShape(),
  },
  dataCenterLocation: { armPath: ["dataCenterLocation"], value: createStringShape() },
  deallocated: { armPath: ["deallocated"], value: createBooleanShape() },
  delegatedSubnetId: { armPath: ["delegatedSubnetId"], value: createStringShape() },
  diskCapacity: { armPath: ["diskCapacity"], value: createNumberShape() },
  diskSku: { armPath: ["diskSku"], value: createStringShape() },
  managedDiskCustomerKeyUri: { armPath: ["managedDiskCustomerKeyUri"], value: createStringShape() },
  nodeCount: { armPath: ["nodeCount"], value: createNumberShape() },
  privateEndpointIpAddress: { armPath: ["privateEndpointIpAddress"], value: createStringShape() },
  provisionError: {
    armPath: ["provisionError"],
    value: createDeferredShape(() => cassandraErrorShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape() },
  seedNodes: {
    armPath: ["seedNodes"],
    value: createArrayShape(createDeferredShape(() => seedNodeShape)),
    readOnly: true,
  },
  sku: { armPath: ["sku"], value: createStringShape() },
});

/**
 * Resource for a regional service location.
 */
export interface DataTransferRegionalServiceResource {
  /**
   * The location name.
   */
  location?: string;
  /**
   * The regional service name.
   */
  name?: string;
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Resource for a regional service location.
 */
export interface DataTransferRegionalServiceResourceInput extends InputOf<DataTransferRegionalServiceResource> {}

/**
 * View type for Resource for a regional service location.
 */
export interface DataTransferRegionalServiceResourceView extends InputOf<DataTransferRegionalServiceResource> {
  /**
   * Read-only output: The location name.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The regional service name.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const dataTransferRegionalServiceResourceShape: FlatModelShape = createFlatModelShape({
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties for DataTransferServiceResource.
 */
export interface DataTransferServiceResourceProperties {
  /**
   * Time of the last state change (ISO-8601 format).
   */
  creationTime?: Date;
  /**
   * Instance count for the service.
   */
  instanceCount?: number;
  /**
   * Instance type for the service.
   */
  instanceSize?: ServiceSize;
  /**
   * An array that contains all of the locations for the service.
   */
  locations?: DataTransferRegionalServiceResource[];
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "DataTransfer".
   */
  serviceType: "DataTransfer";
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Properties for DataTransferServiceResource.
 */
export interface DataTransferServiceResourcePropertiesInput extends InputOf<DataTransferServiceResourceProperties> {
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "DataTransfer".
   */
  serviceType: "DataTransfer";
}

/**
 * View type for Properties for DataTransferServiceResource.
 */
export interface DataTransferServiceResourcePropertiesView extends InputOf<DataTransferServiceResourceProperties> {
  /**
   * Read-only output: Time of the last state change (ISO-8601 format).
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * Read-only output: An array that contains all of the locations for the service.
   */
  readonly locations?: Expression<DataTransferRegionalServiceResource[]> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "DataTransfer".
   */
  serviceType: "DataTransfer";
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const dataTransferServiceResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  instanceCount: { armPath: ["instanceCount"], value: createNumberShape() },
  instanceSize: { armPath: ["instanceSize"], value: createUnionShape() },
  locations: {
    armPath: ["locations"],
    value: createArrayShape(createDeferredShape(() => dataTransferRegionalServiceResourceShape)),
    readOnly: true,
  },
  serviceType: { armPath: ["serviceType"], value: createStringLiteralShape() },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * A region in which the Azure Cosmos DB database account is deployed.
 */
export interface DocumentDbLocation {
  /**
   * The connection endpoint for the specific region. Example: https://&lt;accountName&gt;-&lt;locationName&gt;.documents.azure.com:443/
   */
  documentEndpoint?: string;
  /**
   * The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
   */
  failoverPriority?: number;
  /**
   * The unique identifier of the region within the database account. Example: &lt;accountName&gt;-&lt;locationName&gt;.
   */
  id?: string;
  /**
   * Flag to indicate whether or not this region is an AvailabilityZone region
   */
  isZoneRedundant?: boolean;
  /**
   * The name of the region.
   */
  locationName?: string;
  /**
   * The provisioning state of the resource.
   */
  provisioningState?: string;
}

/**
 * Input type for A region in which the Azure Cosmos DB database account is deployed.
 */
export interface DocumentDbLocationInput extends InputOf<DocumentDbLocation> {
  /**
   * The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
   */
  failoverPriority?: ExpressionOrValue<number> | undefined;
  /**
   * Flag to indicate whether or not this region is an AvailabilityZone region
   */
  isZoneRedundant?: ExpressionOrValue<boolean> | undefined;
  /**
   * The name of the region.
   */
  locationName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for A region in which the Azure Cosmos DB database account is deployed.
 */
export interface DocumentDbLocationView extends InputOf<DocumentDbLocation> {
  /**
   * Read-only output: The connection endpoint for the specific region. Example: https://&lt;accountName&gt;-&lt;locationName&gt;.documents.azure.com:443/
   */
  readonly documentEndpoint?: Expression<string> | undefined;
  /**
   * The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
   */
  failoverPriority?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The unique identifier of the region within the database account. Example: &lt;accountName&gt;-&lt;locationName&gt;.
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Flag to indicate whether or not this region is an AvailabilityZone region
   */
  isZoneRedundant?: ExpressionOrValue<boolean> | undefined;
  /**
   * The name of the region.
   */
  locationName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The provisioning state of the resource.
   */
  readonly provisioningState?: Expression<string> | undefined;
}

export const documentDbLocationShape: FlatModelShape = createFlatModelShape({
  documentEndpoint: { armPath: ["documentEndpoint"], value: createStringShape(), readOnly: true },
  failoverPriority: { armPath: ["failoverPriority"], value: createNumberShape() },
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  isZoneRedundant: { armPath: ["isZoneRedundant"], value: createBooleanShape() },
  locationName: { armPath: ["locationName"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
});

/**
 * A private endpoint connection
 */
export interface DocumentDbPrivateEndpointConnection {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the private endpoint connection.
   */
  name?: string;
  /**
   * Resource properties.
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
 * Input type for A private endpoint connection
 */
export interface DocumentDbPrivateEndpointConnectionInput extends InputOf<DocumentDbPrivateEndpointConnection> {
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for A private endpoint connection
 */
export interface DocumentDbPrivateEndpointConnectionView extends InputOf<DocumentDbPrivateEndpointConnection> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the private endpoint connection.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Resource properties.
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

export const documentDbPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
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

export interface ExcludedPath {
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: string;
}

export interface ExcludedPathInput extends InputOf<ExcludedPath> {
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: ExpressionOrValue<string> | undefined;
}

export type ExcludedPathView = ExcludedPathInput;

export const excludedPathShape: FlatModelShape = createFlatModelShape({
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * The failover policy for a given region of a database account.
 */
export interface FailoverPolicy {
  /**
   * The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
   */
  failoverPriority?: number;
  /**
   * The unique identifier of the region in which the database account replicates to. Example: &lt;accountName&gt;-&lt;locationName&gt;.
   */
  id?: string;
  /**
   * The name of the region in which the database account exists.
   */
  locationName?: string;
}

/**
 * Input type for The failover policy for a given region of a database account.
 */
export interface FailoverPolicyInput extends InputOf<FailoverPolicy> {}

/**
 * View type for The failover policy for a given region of a database account.
 */
export interface FailoverPolicyView extends InputOf<FailoverPolicy> {
  /**
   * Read-only output: The failover priority of the region. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
   */
  readonly failoverPriority?: Expression<number> | undefined;
  /**
   * Read-only output: The unique identifier of the region in which the database account replicates to. Example: &lt;accountName&gt;-&lt;locationName&gt;.
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the region in which the database account exists.
   */
  readonly locationName?: Expression<string> | undefined;
}

export const failoverPolicyShape: FlatModelShape = createFlatModelShape({
  failoverPriority: { armPath: ["failoverPriority"], value: createNumberShape(), readOnly: true },
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  locationName: { armPath: ["locationName"], value: createStringShape(), readOnly: true },
});

/**
 * Properties to update Azure Cosmos DB fleet resource.
 */
export interface FleetResourceProperties {
  /**
   * A provisioning state of the Fleet.
   */
  provisioningState?: Status;
}

/**
 * Input type for Properties to update Azure Cosmos DB fleet resource.
 */
export interface FleetResourcePropertiesInput extends InputOf<FleetResourceProperties> {}

/**
 * View type for Properties to update Azure Cosmos DB fleet resource.
 */
export interface FleetResourcePropertiesView extends InputOf<FleetResourceProperties> {
  /**
   * Read-only output: A provisioning state of the Fleet.
   */
  readonly provisioningState?: Expression<Status> | undefined;
}

export const fleetResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * An Azure Cosmos DB Global Database Account which is part of a Fleetspace Account.
 */
export interface FleetspaceAccountProperties {
  /**
   * Configuration for fleetspace Account in the fleetspace.
   */
  globalDatabaseAccountProperties?: FleetspaceAccountPropertiesGlobalDatabaseAccountProperties;
  /**
   * A provisioning state of the Fleetspace Account.
   */
  provisioningState?: Status;
}

/**
 * Input type for An Azure Cosmos DB Global Database Account which is part of a Fleetspace Account.
 */
export interface FleetspaceAccountPropertiesInput extends InputOf<FleetspaceAccountProperties> {
  /**
   * Configuration for fleetspace Account in the fleetspace.
   */
  globalDatabaseAccountProperties?:
    FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesInput | undefined;
}

/**
 * View type for An Azure Cosmos DB Global Database Account which is part of a Fleetspace Account.
 */
export interface FleetspaceAccountPropertiesView extends InputOf<FleetspaceAccountProperties> {
  /**
   * Configuration for fleetspace Account in the fleetspace.
   */
  globalDatabaseAccountProperties?:
    FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesView | undefined;
  /**
   * Read-only output: A provisioning state of the Fleetspace Account.
   */
  readonly provisioningState?: Expression<Status> | undefined;
}

export const fleetspaceAccountPropertiesShape: FlatModelShape = createFlatModelShape({
  globalDatabaseAccountProperties: {
    armPath: ["globalDatabaseAccountProperties"],
    value: createDeferredShape(
      () => fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesShape,
    ),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Configuration for fleetspace Account in the fleetspace.
 */
export interface FleetspaceAccountPropertiesGlobalDatabaseAccountProperties {
  /**
   * The location of global database account in the Fleetspace Account.
   */
  armLocation?: string;
  /**
   * The resource identifier of global database account in the Fleetspace Account.
   */
  resourceId?: string;
}

/**
 * Input type for Configuration for fleetspace Account in the fleetspace.
 */
export interface FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesInput extends InputOf<FleetspaceAccountPropertiesGlobalDatabaseAccountProperties> {
  /**
   * The location of global database account in the Fleetspace Account.
   */
  armLocation?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of global database account in the Fleetspace Account.
   */
  resourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Configuration for fleetspace Account in the fleetspace.
 */
export type FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesView =
  FleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesInput;

export const fleetspaceAccountPropertiesGlobalDatabaseAccountPropertiesShape: FlatModelShape =
  createFlatModelShape({
    armLocation: { armPath: ["armLocation"], value: createStringShape() },
    resourceId: { armPath: ["resourceId"], value: createStringShape() },
  });

/**
 * Properties to update Azure Cosmos DB Fleetspace.
 */
export interface FleetspaceProperties {
  /**
   * List of data regions assigned to the fleetspace. Eg [westus2]
   */
  dataRegions?: string[];
  /**
   * The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL'
   */
  fleetspaceApiKind?: FleetspacePropertiesFleetspaceApiKind;
  /**
   * A provisioning state of the Fleetspace.
   */
  provisioningState?: Status;
  /**
   * Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region.
   */
  serviceTier?: FleetspacePropertiesServiceTier;
  /**
   * Configuration for throughput pool in the fleetspace.
   */
  throughputPoolConfiguration?: FleetspacePropertiesThroughputPoolConfiguration;
}

/**
 * Input type for Properties to update Azure Cosmos DB Fleetspace.
 */
export interface FleetspacePropertiesInput extends InputOf<FleetspaceProperties> {
  /**
   * List of data regions assigned to the fleetspace. Eg [westus2]
   */
  dataRegions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL'
   */
  fleetspaceApiKind?: ExpressionOrValue<FleetspacePropertiesFleetspaceApiKind> | undefined;
  /**
   * Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region.
   */
  serviceTier?: ExpressionOrValue<FleetspacePropertiesServiceTier> | undefined;
  /**
   * Configuration for throughput pool in the fleetspace.
   */
  throughputPoolConfiguration?: FleetspacePropertiesThroughputPoolConfigurationInput | undefined;
}

/**
 * View type for Properties to update Azure Cosmos DB Fleetspace.
 */
export interface FleetspacePropertiesView extends InputOf<FleetspaceProperties> {
  /**
   * List of data regions assigned to the fleetspace. Eg [westus2]
   */
  dataRegions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL'
   */
  fleetspaceApiKind?: ExpressionOrValue<FleetspacePropertiesFleetspaceApiKind> | undefined;
  /**
   * Read-only output: A provisioning state of the Fleetspace.
   */
  readonly provisioningState?: Expression<Status> | undefined;
  /**
   * Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region.
   */
  serviceTier?: ExpressionOrValue<FleetspacePropertiesServiceTier> | undefined;
  /**
   * Configuration for throughput pool in the fleetspace.
   */
  throughputPoolConfiguration?: FleetspacePropertiesThroughputPoolConfigurationView | undefined;
}

export const fleetspacePropertiesShape: FlatModelShape = createFlatModelShape({
  dataRegions: { armPath: ["dataRegions"], value: createArrayShape(createStringShape()) },
  fleetspaceApiKind: { armPath: ["fleetspaceApiKind"], value: createUnionShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  serviceTier: { armPath: ["serviceTier"], value: createUnionShape() },
  throughputPoolConfiguration: {
    armPath: ["throughputPoolConfiguration"],
    value: createDeferredShape(() => fleetspacePropertiesThroughputPoolConfigurationShape),
  },
});

/**
 * Configuration for throughput pool in the fleetspace.
 */
export interface FleetspacePropertiesThroughputPoolConfiguration {
  /**
   * Total dedicated throughput (RU/s) for fleetspace. Represents the sum of all manual provisioned throughput and all autoscale max RU/s across all shared throughput databases and dedicated throughput containers across all accounts in the fleetspace for 1 region.
   */
  dedicatedRUs?: number;
  /**
   * Maximum consumable throughput (RU/s) for fleetspace. Represents the maximum throughput that resources in the fleetspace can consume from the fleetspace's pool in 1 region.
   */
  maxConsumableRUs?: number;
  /**
   * Maximum throughput for the pool.
   */
  maxThroughput?: number;
  /**
   * Minimum throughput for the pool.
   */
  minThroughput?: number;
}

/**
 * Input type for Configuration for throughput pool in the fleetspace.
 */
export interface FleetspacePropertiesThroughputPoolConfigurationInput extends InputOf<FleetspacePropertiesThroughputPoolConfiguration> {
  /**
   * Total dedicated throughput (RU/s) for fleetspace. Represents the sum of all manual provisioned throughput and all autoscale max RU/s across all shared throughput databases and dedicated throughput containers across all accounts in the fleetspace for 1 region.
   */
  dedicatedRUs?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum consumable throughput (RU/s) for fleetspace. Represents the maximum throughput that resources in the fleetspace can consume from the fleetspace's pool in 1 region.
   */
  maxConsumableRUs?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum throughput for the pool.
   */
  maxThroughput?: ExpressionOrValue<number> | undefined;
  /**
   * Minimum throughput for the pool.
   */
  minThroughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Configuration for throughput pool in the fleetspace.
 */
export type FleetspacePropertiesThroughputPoolConfigurationView =
  FleetspacePropertiesThroughputPoolConfigurationInput;

export const fleetspacePropertiesThroughputPoolConfigurationShape: FlatModelShape =
  createFlatModelShape({
    dedicatedRUs: { armPath: ["dedicatedRUs"], value: createNumberShape() },
    maxConsumableRUs: { armPath: ["maxConsumableRUs"], value: createNumberShape() },
    maxThroughput: { armPath: ["maxThroughput"], value: createNumberShape() },
    minThroughput: { armPath: ["minThroughput"], value: createNumberShape() },
  });

/**
 * Represents the full text index path.
 */
export interface FullTextIndexPath {
  /**
   * The path to the full text field in the document.
   */
  path: string;
}

/**
 * Input type for Represents the full text index path.
 */
export interface FullTextIndexPathInput extends InputOf<FullTextIndexPath> {
  /**
   * The path to the full text field in the document.
   */
  path: ExpressionOrValue<string>;
}

/**
 * View type for Represents the full text index path.
 */
export type FullTextIndexPathView = FullTextIndexPathInput;

export const fullTextIndexPathShape: FlatModelShape = createFlatModelShape({
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * Represents the full text path specification.
 */
export interface FullTextPath {
  /**
   * The language of the full text field in the document.
   */
  language?: string;
  /**
   * The path to the full text field in the document.
   */
  path: string;
}

/**
 * Input type for Represents the full text path specification.
 */
export interface FullTextPathInput extends InputOf<FullTextPath> {
  /**
   * The language of the full text field in the document.
   */
  language?: ExpressionOrValue<string> | undefined;
  /**
   * The path to the full text field in the document.
   */
  path: ExpressionOrValue<string>;
}

/**
 * View type for Represents the full text path specification.
 */
export type FullTextPathView = FullTextPathInput;

export const fullTextPathShape: FlatModelShape = createFlatModelShape({
  language: { armPath: ["language"], value: createStringShape() },
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * Cosmos DB FullText Policy
 */
export interface FullTextPolicy {
  /**
   * The default language for a full text paths.
   */
  defaultLanguage?: string;
  /**
   * List of FullText Paths
   */
  fullTextPaths?: FullTextPath[];
}

/**
 * Input type for Cosmos DB FullText Policy
 */
export interface FullTextPolicyInput extends InputOf<FullTextPolicy> {
  /**
   * The default language for a full text paths.
   */
  defaultLanguage?: ExpressionOrValue<string> | undefined;
  /**
   * List of FullText Paths
   */
  fullTextPaths?: InputArray<FullTextPathInput, FullTextPath[]> | undefined;
}

/**
 * View type for Cosmos DB FullText Policy
 */
export type FullTextPolicyView = FullTextPolicyInput;

export const fullTextPolicyShape: FlatModelShape = createFlatModelShape({
  defaultLanguage: { armPath: ["defaultLanguage"], value: createStringShape() },
  fullTextPaths: {
    armPath: ["fullTextPaths"],
    value: createArrayShape(createDeferredShape(() => fullTextPathShape)),
  },
});

/**
 * Resource for a regional service location.
 */
export interface GraphApiComputeRegionalServiceResource {
  /**
   * The regional endpoint for GraphAPICompute.
   */
  graphApiComputeEndpoint?: string;
  /**
   * The location name.
   */
  location?: string;
  /**
   * The regional service name.
   */
  name?: string;
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Resource for a regional service location.
 */
export interface GraphApiComputeRegionalServiceResourceInput extends InputOf<GraphApiComputeRegionalServiceResource> {}

/**
 * View type for Resource for a regional service location.
 */
export interface GraphApiComputeRegionalServiceResourceView extends InputOf<GraphApiComputeRegionalServiceResource> {
  /**
   * Read-only output: The regional endpoint for GraphAPICompute.
   */
  readonly graphApiComputeEndpoint?: Expression<string> | undefined;
  /**
   * Read-only output: The location name.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The regional service name.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const graphApiComputeRegionalServiceResourceShape: FlatModelShape = createFlatModelShape({
  graphApiComputeEndpoint: {
    armPath: ["graphApiComputeEndpoint"],
    value: createStringShape(),
    readOnly: true,
  },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties for GraphAPIComputeServiceResource.
 */
export interface GraphApiComputeServiceResourceProperties {
  /**
   * Time of the last state change (ISO-8601 format).
   */
  creationTime?: Date;
  /**
   * GraphAPICompute endpoint for the service.
   */
  graphApiComputeEndpoint?: string;
  /**
   * Instance count for the service.
   */
  instanceCount?: number;
  /**
   * Instance type for the service.
   */
  instanceSize?: ServiceSize;
  /**
   * An array that contains all of the locations for the service.
   */
  locations?: GraphApiComputeRegionalServiceResource[];
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "GraphAPICompute".
   */
  serviceType: "GraphAPICompute";
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Properties for GraphAPIComputeServiceResource.
 */
export interface GraphApiComputeServiceResourcePropertiesInput extends InputOf<GraphApiComputeServiceResourceProperties> {
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "GraphAPICompute".
   */
  serviceType: "GraphAPICompute";
}

/**
 * View type for Properties for GraphAPIComputeServiceResource.
 */
export interface GraphApiComputeServiceResourcePropertiesView extends InputOf<GraphApiComputeServiceResourceProperties> {
  /**
   * Read-only output: Time of the last state change (ISO-8601 format).
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Read-only output: GraphAPICompute endpoint for the service.
   */
  readonly graphApiComputeEndpoint?: Expression<string> | undefined;
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * Read-only output: An array that contains all of the locations for the service.
   */
  readonly locations?: Expression<GraphApiComputeRegionalServiceResource[]> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "GraphAPICompute".
   */
  serviceType: "GraphAPICompute";
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const graphApiComputeServiceResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  graphApiComputeEndpoint: {
    armPath: ["graphApiComputeEndpoint"],
    value: createStringShape(),
    readOnly: true,
  },
  instanceCount: { armPath: ["instanceCount"], value: createNumberShape() },
  instanceSize: { armPath: ["instanceSize"], value: createUnionShape() },
  locations: {
    armPath: ["locations"],
    value: createArrayShape(createDeferredShape(() => graphApiComputeRegionalServiceResourceShape)),
    readOnly: true,
  },
  serviceType: { armPath: ["serviceType"], value: createStringLiteralShape() },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * The properties of an Azure Cosmos DB SQL database
 */
export interface GremlinDatabaseGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: GremlinDatabaseGetPropertiesOptions;
  /**
   * The standard JSON format of a Gremlin database
   */
  resource: GremlinDatabaseGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB SQL database
 */
export interface GremlinDatabaseGetPropertiesInput extends InputOf<GremlinDatabaseGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: GremlinDatabaseGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a Gremlin database
   */
  resource: GremlinDatabaseGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB SQL database
 */
export interface GremlinDatabaseGetPropertiesView extends InputOf<GremlinDatabaseGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: GremlinDatabaseGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a Gremlin database
   */
  resource: GremlinDatabaseGetPropertiesResourceView;
}

export const gremlinDatabaseGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => gremlinDatabaseGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => gremlinDatabaseGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface GremlinDatabaseGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface GremlinDatabaseGetPropertiesOptionsInput extends InputOf<GremlinDatabaseGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type GremlinDatabaseGetPropertiesOptionsView = GremlinDatabaseGetPropertiesOptionsInput;

export const gremlinDatabaseGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB Gremlin database resource object
 */
export interface GremlinDatabaseGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: CreateMode;
  /**
   * Name of the Cosmos DB Gremlin database
   */
  id: string;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
}

/**
 * Input type for Cosmos DB Gremlin database resource object
 */
export interface GremlinDatabaseGetPropertiesResourceInput extends InputOf<GremlinDatabaseGetPropertiesResource> {
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB Gremlin database
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
}

/**
 * View type for Cosmos DB Gremlin database resource object
 */
export interface GremlinDatabaseGetPropertiesResourceView extends InputOf<GremlinDatabaseGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB Gremlin database
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
}

export const gremlinDatabaseGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  id: { armPath: ["id"], value: createStringShape() },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
});

/**
 * Specific Gremlin Databases to restore.
 */
export interface GremlinDatabaseRestoreResource {
  /**
   * The name of the gremlin database available for restore.
   */
  databaseName?: string;
  /**
   * The names of the graphs available for restore.
   */
  graphNames?: string[];
}

/**
 * Input type for Specific Gremlin Databases to restore.
 */
export interface GremlinDatabaseRestoreResourceInput extends InputOf<GremlinDatabaseRestoreResource> {
  /**
   * The name of the gremlin database available for restore.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * The names of the graphs available for restore.
   */
  graphNames?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Specific Gremlin Databases to restore.
 */
export type GremlinDatabaseRestoreResourceView = GremlinDatabaseRestoreResourceInput;

export const gremlinDatabaseRestoreResourceShape: FlatModelShape = createFlatModelShape({
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  graphNames: { armPath: ["graphNames"], value: createArrayShape(createStringShape()) },
});

/**
 * The properties of an Azure Cosmos DB Gremlin graph
 */
export interface GremlinGraphGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: GremlinGraphGetPropertiesOptions;
  /**
   * The standard JSON format of a Gremlin graph
   */
  resource: GremlinGraphGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB Gremlin graph
 */
export interface GremlinGraphGetPropertiesInput extends InputOf<GremlinGraphGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: GremlinGraphGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a Gremlin graph
   */
  resource: GremlinGraphGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB Gremlin graph
 */
export interface GremlinGraphGetPropertiesView extends InputOf<GremlinGraphGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: GremlinGraphGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a Gremlin graph
   */
  resource: GremlinGraphGetPropertiesResourceView;
}

export const gremlinGraphGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => gremlinGraphGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => gremlinGraphGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface GremlinGraphGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface GremlinGraphGetPropertiesOptionsInput extends InputOf<GremlinGraphGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type GremlinGraphGetPropertiesOptionsView = GremlinGraphGetPropertiesOptionsInput;

export const gremlinGraphGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB Gremlin graph resource object
 */
export interface GremlinGraphGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: number;
  /**
   * The conflict resolution policy for the graph.
   */
  conflictResolutionPolicy?: ConflictResolutionPolicy;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: CreateMode;
  /**
   * Default time to live
   */
  defaultTtl?: number;
  /**
   * Name of the Cosmos DB Gremlin graph
   */
  id: string;
  /**
   * The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the graph
   */
  indexingPolicy?: IndexingPolicy;
  /**
   * The configuration of the partition key to be used for partitioning data into multiple partitions
   */
  partitionKey?: ContainerPartitionKey;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
  /**
   * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeyPolicy?: UniqueKeyPolicy;
}

/**
 * Input type for Cosmos DB Gremlin graph resource object
 */
export interface GremlinGraphGetPropertiesResourceInput extends InputOf<GremlinGraphGetPropertiesResource> {
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * The conflict resolution policy for the graph.
   */
  conflictResolutionPolicy?: ConflictResolutionPolicyInput | undefined;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Default time to live
   */
  defaultTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Name of the Cosmos DB Gremlin graph
   */
  id: ExpressionOrValue<string>;
  /**
   * The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the graph
   */
  indexingPolicy?: IndexingPolicyInput | undefined;
  /**
   * The configuration of the partition key to be used for partitioning data into multiple partitions
   */
  partitionKey?: ContainerPartitionKeyInput | undefined;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
  /**
   * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeyPolicy?: UniqueKeyPolicyInput | undefined;
}

/**
 * View type for Cosmos DB Gremlin graph resource object
 */
export interface GremlinGraphGetPropertiesResourceView extends InputOf<GremlinGraphGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * The conflict resolution policy for the graph.
   */
  conflictResolutionPolicy?: ConflictResolutionPolicyView | undefined;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Default time to live
   */
  defaultTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Name of the Cosmos DB Gremlin graph
   */
  id: ExpressionOrValue<string>;
  /**
   * The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the graph
   */
  indexingPolicy?: IndexingPolicyView | undefined;
  /**
   * The configuration of the partition key to be used for partitioning data into multiple partitions
   */
  partitionKey?: ContainerPartitionKeyView | undefined;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
  /**
   * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeyPolicy?: UniqueKeyPolicyView | undefined;
}

export const gremlinGraphGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  analyticalStorageTtl: { armPath: ["analyticalStorageTtl"], value: createNumberShape() },
  conflictResolutionPolicy: {
    armPath: ["conflictResolutionPolicy"],
    value: createDeferredShape(() => conflictResolutionPolicyShape),
  },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  defaultTtl: { armPath: ["defaultTtl"], value: createNumberShape() },
  id: { armPath: ["id"], value: createStringShape() },
  indexingPolicy: {
    armPath: ["indexingPolicy"],
    value: createDeferredShape(() => indexingPolicyShape),
  },
  partitionKey: {
    armPath: ["partitionKey"],
    value: createDeferredShape(() => containerPartitionKeyShape),
  },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
  uniqueKeyPolicy: {
    armPath: ["uniqueKeyPolicy"],
    value: createDeferredShape(() => uniqueKeyPolicyShape),
  },
});

/**
 * Azure Cosmos DB Gremlin Role Assignment resource object.
 */
export interface GremlinRoleAssignmentResourceProperties {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Gremlin Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: string;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: string;
  /**
   * The data plane resource path for which access is being granted through this Gremlin Role Assignment.
   */
  scope?: string;
}

/**
 * Input type for Azure Cosmos DB Gremlin Role Assignment resource object.
 */
export interface GremlinRoleAssignmentResourcePropertiesInput extends InputOf<GremlinRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Gremlin Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Gremlin Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Azure Cosmos DB Gremlin Role Assignment resource object.
 */
export interface GremlinRoleAssignmentResourcePropertiesView extends InputOf<GremlinRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Gremlin Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Gremlin Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

export const gremlinRoleAssignmentResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  roleDefinitionId: { armPath: ["roleDefinitionId"], value: createStringShape() },
  scope: { armPath: ["scope"], value: createStringShape() },
});

/**
 * Azure Cosmos DB Gremlin Role Definition resource object.
 */
export interface GremlinRoleDefinitionResourceProperties {
  /**
   * A set of fully qualified Scopes at or below which Gremlin Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: string[];
  /**
   * The path id for the Role Definition.
   */
  id?: string;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: Permission[];
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: string;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: RoleDefinitionType;
}

/**
 * Input type for Azure Cosmos DB Gremlin Role Definition resource object.
 */
export interface GremlinRoleDefinitionResourcePropertiesInput extends InputOf<GremlinRoleDefinitionResourceProperties> {
  /**
   * A set of fully qualified Scopes at or below which Gremlin Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The path id for the Role Definition.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: InputArray<PermissionInput, Permission[]> | undefined;
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: ExpressionOrValue<RoleDefinitionType> | undefined;
}

/**
 * View type for Azure Cosmos DB Gremlin Role Definition resource object.
 */
export type GremlinRoleDefinitionResourcePropertiesView =
  GremlinRoleDefinitionResourcePropertiesInput;

export const gremlinRoleDefinitionResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  assignableScopes: { armPath: ["assignableScopes"], value: createArrayShape(createStringShape()) },
  id: { armPath: ["id"], value: createStringShape() },
  permissions: {
    armPath: ["permissions"],
    value: createArrayShape(createDeferredShape(() => permissionShape)),
  },
  roleName: { armPath: ["roleName"], value: createStringShape() },
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * The paths that are included in indexing
 */
export interface IncludedPath {
  /**
   * List of indexes for this path
   */
  indexes?: Indexes[];
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: string;
}

/**
 * Input type for The paths that are included in indexing
 */
export interface IncludedPathInput extends InputOf<IncludedPath> {
  /**
   * List of indexes for this path
   */
  indexes?: InputArray<IndexesInput, Indexes[]> | undefined;
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The paths that are included in indexing
 */
export type IncludedPathView = IncludedPathInput;

export const includedPathShape: FlatModelShape = createFlatModelShape({
  indexes: {
    armPath: ["indexes"],
    value: createArrayShape(createDeferredShape(() => indexesShape)),
  },
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * The indexes for the path.
 */
export interface Indexes {
  /**
   * The datatype for which the indexing behavior is applied to.
   */
  dataType?: DataType;
  /**
   * Indicates the type of index.
   */
  kind?: IndexKind;
  /**
   * The precision of the index. -1 is maximum precision.
   */
  precision?: number;
}

/**
 * Input type for The indexes for the path.
 */
export interface IndexesInput extends InputOf<Indexes> {
  /**
   * The datatype for which the indexing behavior is applied to.
   */
  dataType?: ExpressionOrValue<DataType> | undefined;
  /**
   * Indicates the type of index.
   */
  kind?: ExpressionOrValue<IndexKind> | undefined;
  /**
   * The precision of the index. -1 is maximum precision.
   */
  precision?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The indexes for the path.
 */
export type IndexesView = IndexesInput;

export const indexesShape: FlatModelShape = createFlatModelShape({
  dataType: { armPath: ["dataType"], value: createUnionShape() },
  kind: { armPath: ["kind"], value: createUnionShape() },
  precision: { armPath: ["precision"], value: createNumberShape() },
});

/**
 * Cosmos DB indexing policy
 */
export interface IndexingPolicy {
  /**
   * Indicates if the indexing policy is automatic
   */
  automatic?: boolean;
  /**
   * List of composite path list
   */
  compositeIndexes?: CompositePath[][];
  /**
   * List of paths to exclude from indexing
   */
  excludedPaths?: ExcludedPath[];
  /**
   * List of paths to include in the full text indexing
   */
  fullTextIndexes?: FullTextIndexPath[];
  /**
   * List of paths to include in the indexing
   */
  includedPaths?: IncludedPath[];
  /**
   * Indicates the indexing mode.
   */
  indexingMode?: IndexingMode;
  /**
   * List of spatial specifics
   */
  spatialIndexes?: SpatialSpec[];
  /**
   * List of paths to include in the vector indexing
   */
  vectorIndexes?: VectorIndex[];
}

/**
 * Input type for Cosmos DB indexing policy
 */
export interface IndexingPolicyInput extends InputOf<IndexingPolicy> {
  /**
   * Indicates if the indexing policy is automatic
   */
  automatic?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of composite path list
   */
  compositeIndexes?:
    InputArray<InputArray<CompositePathInput, CompositePath[]>, CompositePath[][]> | undefined;
  /**
   * List of paths to exclude from indexing
   */
  excludedPaths?: InputArray<ExcludedPathInput, ExcludedPath[]> | undefined;
  /**
   * List of paths to include in the full text indexing
   */
  fullTextIndexes?: InputArray<FullTextIndexPathInput, FullTextIndexPath[]> | undefined;
  /**
   * List of paths to include in the indexing
   */
  includedPaths?: InputArray<IncludedPathInput, IncludedPath[]> | undefined;
  /**
   * Indicates the indexing mode.
   */
  indexingMode?: ExpressionOrValue<IndexingMode> | undefined;
  /**
   * List of spatial specifics
   */
  spatialIndexes?: InputArray<SpatialSpecInput, SpatialSpec[]> | undefined;
  /**
   * List of paths to include in the vector indexing
   */
  vectorIndexes?: InputArray<VectorIndexInput, VectorIndex[]> | undefined;
}

/**
 * View type for Cosmos DB indexing policy
 */
export type IndexingPolicyView = IndexingPolicyInput;

export const indexingPolicyShape: FlatModelShape = createFlatModelShape({
  automatic: { armPath: ["automatic"], value: createBooleanShape() },
  compositeIndexes: {
    armPath: ["compositeIndexes"],
    value: createArrayShape(createArrayShape(createDeferredShape(() => compositePathShape))),
  },
  excludedPaths: {
    armPath: ["excludedPaths"],
    value: createArrayShape(createDeferredShape(() => excludedPathShape)),
  },
  fullTextIndexes: {
    armPath: ["fullTextIndexes"],
    value: createArrayShape(createDeferredShape(() => fullTextIndexPathShape)),
  },
  includedPaths: {
    armPath: ["includedPaths"],
    value: createArrayShape(createDeferredShape(() => includedPathShape)),
  },
  indexingMode: { armPath: ["indexingMode"], value: createUnionShape() },
  spatialIndexes: {
    armPath: ["spatialIndexes"],
    value: createArrayShape(createDeferredShape(() => spatialSpecShape)),
  },
  vectorIndexes: {
    armPath: ["vectorIndexes"],
    value: createArrayShape(createDeferredShape(() => vectorIndexShape)),
  },
});

/**
 * IpAddressOrRange object
 */
export interface IpAddressOrRange {
  /**
   * A single IPv4 address or a single IPv4 address range in CIDR format. Provided IPs must be well-formatted and cannot be contained in one of the following ranges: 10.0.0.0/8, 100.64.0.0/10, 172.16.0.0/12, 192.168.0.0/16, since these are not enforceable by the IP address filter. Example of valid inputs: “23.40.210.245” or “23.40.210.0/8”.
   */
  ipAddressOrRange?: string;
}

/**
 * Input type for IpAddressOrRange object
 */
export interface IpAddressOrRangeInput extends InputOf<IpAddressOrRange> {
  /**
   * A single IPv4 address or a single IPv4 address range in CIDR format. Provided IPs must be well-formatted and cannot be contained in one of the following ranges: 10.0.0.0/8, 100.64.0.0/10, 172.16.0.0/12, 192.168.0.0/16, since these are not enforceable by the IP address filter. Example of valid inputs: “23.40.210.245” or “23.40.210.0/8”.
   */
  ipAddressOrRange?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for IpAddressOrRange object
 */
export type IpAddressOrRangeView = IpAddressOrRangeInput;

export const ipAddressOrRangeShape: FlatModelShape = createFlatModelShape({
  ipAddressOrRange: { armPath: ["ipAddressOrRange"], value: createStringShape() },
});

/**
 * Represents key wrap metadata that a key wrapping provider can use to wrap/unwrap a client encryption key.
 */
export interface KeyWrapMetadata {
  /**
   * Algorithm used in wrapping and unwrapping of the data encryption key.
   */
  algorithm?: string;
  /**
   * The name of associated KeyEncryptionKey (aka CustomerManagedKey).
   */
  name?: string;
  /**
   * ProviderName of KeyStoreProvider.
   */
  type?: string;
  /**
   * Reference / link to the KeyEncryptionKey.
   */
  value?: string;
}

/**
 * Input type for Represents key wrap metadata that a key wrapping provider can use to wrap/unwrap a client encryption key.
 */
export interface KeyWrapMetadataInput extends InputOf<KeyWrapMetadata> {
  /**
   * Algorithm used in wrapping and unwrapping of the data encryption key.
   */
  algorithm?: ExpressionOrValue<string> | undefined;
  /**
   * The name of associated KeyEncryptionKey (aka CustomerManagedKey).
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * ProviderName of KeyStoreProvider.
   */
  type?: ExpressionOrValue<string> | undefined;
  /**
   * Reference / link to the KeyEncryptionKey.
   */
  value?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Represents key wrap metadata that a key wrapping provider can use to wrap/unwrap a client encryption key.
 */
export type KeyWrapMetadataView = KeyWrapMetadataInput;

export const keyWrapMetadataShape: FlatModelShape = createFlatModelShape({
  algorithm: { armPath: ["algorithm"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
  type: { armPath: ["type"], value: createStringShape() },
  value: { armPath: ["value"], value: createStringShape() },
});

/**
 * Cosmos DB location metadata
 */
export interface LocationProperties {
  /**
   * The properties of available backup storage redundancies.
   */
  backupStorageRedundancies?: BackupStorageRedundancy[];
  /**
   * Flag indicating whether the location is residency sensitive.
   */
  isResidencyRestricted?: boolean;
  /**
   * Flag indicating whether the subscription have access in region for Availability Zones(Az).
   */
  isSubscriptionRegionAccessAllowedForAz?: boolean;
  /**
   * Flag indicating whether the subscription have access in region for Non-Availability Zones.
   */
  isSubscriptionRegionAccessAllowedForRegular?: boolean;
  /**
   * Enum to indicate current buildout status of the region.
   */
  status?: Status;
  /**
   * Flag indicating whether the location supports availability zones or not.
   */
  supportsAvailabilityZone?: boolean;
}

/**
 * Input type for Cosmos DB location metadata
 */
export interface LocationPropertiesInput extends InputOf<LocationProperties> {}

/**
 * View type for Cosmos DB location metadata
 */
export interface LocationPropertiesView extends InputOf<LocationProperties> {
  /**
   * Read-only output: The properties of available backup storage redundancies.
   */
  readonly backupStorageRedundancies?: Expression<BackupStorageRedundancy[]> | undefined;
  /**
   * Read-only output: Flag indicating whether the location is residency sensitive.
   */
  readonly isResidencyRestricted?: Expression<boolean> | undefined;
  /**
   * Read-only output: Flag indicating whether the subscription have access in region for Availability Zones(Az).
   */
  readonly isSubscriptionRegionAccessAllowedForAz?: Expression<boolean> | undefined;
  /**
   * Read-only output: Flag indicating whether the subscription have access in region for Non-Availability Zones.
   */
  readonly isSubscriptionRegionAccessAllowedForRegular?: Expression<boolean> | undefined;
  /**
   * Read-only output: Enum to indicate current buildout status of the region.
   */
  readonly status?: Expression<Status> | undefined;
  /**
   * Read-only output: Flag indicating whether the location supports availability zones or not.
   */
  readonly supportsAvailabilityZone?: Expression<boolean> | undefined;
}

export const locationPropertiesShape: FlatModelShape = createFlatModelShape({
  backupStorageRedundancies: {
    armPath: ["backupStorageRedundancies"],
    value: createArrayShape(createUnionShape()),
    readOnly: true,
  },
  isResidencyRestricted: {
    armPath: ["isResidencyRestricted"],
    value: createBooleanShape(),
    readOnly: true,
  },
  isSubscriptionRegionAccessAllowedForAz: {
    armPath: ["isSubscriptionRegionAccessAllowedForAz"],
    value: createBooleanShape(),
    readOnly: true,
  },
  isSubscriptionRegionAccessAllowedForRegular: {
    armPath: ["isSubscriptionRegionAccessAllowedForRegular"],
    value: createBooleanShape(),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  supportsAvailabilityZone: {
    armPath: ["supportsAvailabilityZone"],
    value: createBooleanShape(),
    readOnly: true,
  },
});

/**
 * Identity for the resource.
 */
export interface ManagedCassandraManagedServiceIdentity {
  /**
   * The object id of the identity resource.
   */
  principalId?: string;
  /**
   * The tenant id of the resource.
   */
  tenantId?: string;
  /**
   * The type of the resource.
   */
  type?: ManagedCassandraResourceIdentityType;
}

/**
 * Input type for Identity for the resource.
 */
export interface ManagedCassandraManagedServiceIdentityInput extends InputOf<ManagedCassandraManagedServiceIdentity> {
  /**
   * The type of the resource.
   */
  type?: ExpressionOrValue<ManagedCassandraResourceIdentityType> | undefined;
}

/**
 * View type for Identity for the resource.
 */
export interface ManagedCassandraManagedServiceIdentityView extends InputOf<ManagedCassandraManagedServiceIdentity> {
  /**
   * Read-only output: The object id of the identity resource.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant id of the resource.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The type of the resource.
   */
  type?: ExpressionOrValue<ManagedCassandraResourceIdentityType> | undefined;
}

export const managedCassandraManagedServiceIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * Identity for the resource.
 */
export interface ManagedServiceIdentity {
  /**
   * The principal id of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  principalId?: string;
  /**
   * The tenant id of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  tenantId?: string;
  /**
   * The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service.
   */
  type?: ResourceIdentityType;
  /**
   * The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<
    string,
    Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
  >;
}

/**
 * Input type for Identity for the resource.
 */
export interface ManagedServiceIdentityInput extends InputOf<ManagedServiceIdentity> {
  /**
   * The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service.
   */
  type?: ExpressionOrValue<ResourceIdentityType> | undefined;
  /**
   * The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    | InputRecord<
        Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesInput,
        Record<
          string,
          Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
        >
      >
    | undefined;
}

/**
 * View type for Identity for the resource.
 */
export interface ManagedServiceIdentityView extends InputOf<ManagedServiceIdentity> {
  /**
   * Read-only output: The principal id of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant id of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The type of identity used for the resource. The type 'SystemAssigned,UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the service.
   */
  type?: ExpressionOrValue<ResourceIdentityType> | undefined;
  /**
   * The list of user identities associated with resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    | InputRecord<
        Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesView,
        Record<
          string,
          Components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalproperties
        >
      >
    | undefined;
}

export const managedServiceIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createEnumShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(
      createDeferredShape(
        () =>
          components1Jq1T4ISchemasManagedserviceidentityPropertiesUserassignedidentitiesAdditionalpropertiesShape,
      ),
    ),
  },
});

/**
 * Resource for a regional service location.
 */
export interface MaterializedViewsBuilderRegionalServiceResource {
  /**
   * The location name.
   */
  location?: string;
  /**
   * The regional service name.
   */
  name?: string;
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Resource for a regional service location.
 */
export interface MaterializedViewsBuilderRegionalServiceResourceInput extends InputOf<MaterializedViewsBuilderRegionalServiceResource> {}

/**
 * View type for Resource for a regional service location.
 */
export interface MaterializedViewsBuilderRegionalServiceResourceView extends InputOf<MaterializedViewsBuilderRegionalServiceResource> {
  /**
   * Read-only output: The location name.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The regional service name.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const materializedViewsBuilderRegionalServiceResourceShape: FlatModelShape =
  createFlatModelShape({
    location: { armPath: ["location"], value: createStringShape(), readOnly: true },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
    status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  });

/**
 * Properties for MaterializedViewsBuilderServiceResource.
 */
export interface MaterializedViewsBuilderServiceResourceProperties {
  /**
   * Time of the last state change (ISO-8601 format).
   */
  creationTime?: Date;
  /**
   * Instance count for the service.
   */
  instanceCount?: number;
  /**
   * Instance type for the service.
   */
  instanceSize?: ServiceSize;
  /**
   * An array that contains all of the locations for the service.
   */
  locations?: MaterializedViewsBuilderRegionalServiceResource[];
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "MaterializedViewsBuilder".
   */
  serviceType: "MaterializedViewsBuilder";
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Properties for MaterializedViewsBuilderServiceResource.
 */
export interface MaterializedViewsBuilderServiceResourcePropertiesInput extends InputOf<MaterializedViewsBuilderServiceResourceProperties> {
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "MaterializedViewsBuilder".
   */
  serviceType: "MaterializedViewsBuilder";
}

/**
 * View type for Properties for MaterializedViewsBuilderServiceResource.
 */
export interface MaterializedViewsBuilderServiceResourcePropertiesView extends InputOf<MaterializedViewsBuilderServiceResourceProperties> {
  /**
   * Read-only output: Time of the last state change (ISO-8601 format).
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * Read-only output: An array that contains all of the locations for the service.
   */
  readonly locations?: Expression<MaterializedViewsBuilderRegionalServiceResource[]> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "MaterializedViewsBuilder".
   */
  serviceType: "MaterializedViewsBuilder";
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const materializedViewsBuilderServiceResourcePropertiesShape: FlatModelShape =
  createFlatModelShape({
    creationTime: {
      armPath: ["creationTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    instanceCount: { armPath: ["instanceCount"], value: createNumberShape() },
    instanceSize: { armPath: ["instanceSize"], value: createUnionShape() },
    locations: {
      armPath: ["locations"],
      value: createArrayShape(
        createDeferredShape(() => materializedViewsBuilderRegionalServiceResourceShape),
      ),
      readOnly: true,
    },
    serviceType: { armPath: ["serviceType"], value: createStringLiteralShape() },
    status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  });

/**
 * The properties of an Azure Cosmos DB MongoDB collection
 */
export interface MongoDbCollectionGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: MongoDbCollectionGetPropertiesOptions;
  /**
   * The standard JSON format of a MongoDB collection
   */
  resource: MongoDbCollectionGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB MongoDB collection
 */
export interface MongoDbCollectionGetPropertiesInput extends InputOf<MongoDbCollectionGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: MongoDbCollectionGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a MongoDB collection
   */
  resource: MongoDbCollectionGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB MongoDB collection
 */
export interface MongoDbCollectionGetPropertiesView extends InputOf<MongoDbCollectionGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: MongoDbCollectionGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a MongoDB collection
   */
  resource: MongoDbCollectionGetPropertiesResourceView;
}

export const mongoDbCollectionGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => mongoDbCollectionGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => mongoDbCollectionGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface MongoDbCollectionGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface MongoDbCollectionGetPropertiesOptionsInput extends InputOf<MongoDbCollectionGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type MongoDbCollectionGetPropertiesOptionsView = MongoDbCollectionGetPropertiesOptionsInput;

export const mongoDbCollectionGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB MongoDB collection resource object
 */
export interface MongoDbCollectionGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: number;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: CreateMode;
  /**
   * Name of the Cosmos DB MongoDB collection
   */
  id: string;
  /**
   * List of index keys
   */
  indexes?: MongoIndex[];
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
  /**
   * A key-value pair of shard keys to be applied for the request.
   */
  shardKey?: Record<string, string>;
}

/**
 * Input type for Cosmos DB MongoDB collection resource object
 */
export interface MongoDbCollectionGetPropertiesResourceInput extends InputOf<MongoDbCollectionGetPropertiesResource> {
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB MongoDB collection
   */
  id: ExpressionOrValue<string>;
  /**
   * List of index keys
   */
  indexes?: InputArray<MongoIndexInput, MongoIndex[]> | undefined;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
  /**
   * A key-value pair of shard keys to be applied for the request.
   */
  shardKey?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * View type for Cosmos DB MongoDB collection resource object
 */
export interface MongoDbCollectionGetPropertiesResourceView extends InputOf<MongoDbCollectionGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * Enum to indicate the mode of resource creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB MongoDB collection
   */
  id: ExpressionOrValue<string>;
  /**
   * List of index keys
   */
  indexes?: InputArray<MongoIndexView, MongoIndex[]> | undefined;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
  /**
   * A key-value pair of shard keys to be applied for the request.
   */
  shardKey?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export const mongoDbCollectionGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  analyticalStorageTtl: { armPath: ["analyticalStorageTtl"], value: createNumberShape() },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  id: { armPath: ["id"], value: createStringShape() },
  indexes: {
    armPath: ["indexes"],
    value: createArrayShape(createDeferredShape(() => mongoIndexShape)),
  },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
  shardKey: { armPath: ["shardKey"], value: createRecordShape(createStringShape()) },
});

/**
 * The properties of an Azure Cosmos DB MongoDB database
 */
export interface MongoDbDatabaseGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: MongoDbDatabaseGetPropertiesOptions;
  /**
   * The standard JSON format of a MongoDB database
   */
  resource: MongoDbDatabaseGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB MongoDB database
 */
export interface MongoDbDatabaseGetPropertiesInput extends InputOf<MongoDbDatabaseGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: MongoDbDatabaseGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a MongoDB database
   */
  resource: MongoDbDatabaseGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB MongoDB database
 */
export interface MongoDbDatabaseGetPropertiesView extends InputOf<MongoDbDatabaseGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: MongoDbDatabaseGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a MongoDB database
   */
  resource: MongoDbDatabaseGetPropertiesResourceView;
}

export const mongoDbDatabaseGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => mongoDbDatabaseGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => mongoDbDatabaseGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface MongoDbDatabaseGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface MongoDbDatabaseGetPropertiesOptionsInput extends InputOf<MongoDbDatabaseGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type MongoDbDatabaseGetPropertiesOptionsView = MongoDbDatabaseGetPropertiesOptionsInput;

export const mongoDbDatabaseGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB MongoDB database resource object
 */
export interface MongoDbDatabaseGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: CreateMode;
  /**
   * Name of the Cosmos DB MongoDB database
   */
  id: string;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
}

/**
 * Input type for Cosmos DB MongoDB database resource object
 */
export interface MongoDbDatabaseGetPropertiesResourceInput extends InputOf<MongoDbDatabaseGetPropertiesResource> {
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB MongoDB database
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
}

/**
 * View type for Cosmos DB MongoDB database resource object
 */
export interface MongoDbDatabaseGetPropertiesResourceView extends InputOf<MongoDbDatabaseGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB MongoDB database
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
}

export const mongoDbDatabaseGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  id: { armPath: ["id"], value: createStringShape() },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
});

/**
 * Cosmos DB MongoDB collection index key
 */
export interface MongoIndex {
  /**
   * Cosmos DB MongoDB collection index keys
   */
  key?: MongoIndexKeys;
  /**
   * Cosmos DB MongoDB collection index key options
   */
  options?: MongoIndexOptions;
}

/**
 * Input type for Cosmos DB MongoDB collection index key
 */
export interface MongoIndexInput extends InputOf<MongoIndex> {
  /**
   * Cosmos DB MongoDB collection index keys
   */
  key?: MongoIndexKeysInput | undefined;
  /**
   * Cosmos DB MongoDB collection index key options
   */
  options?: MongoIndexOptionsInput | undefined;
}

/**
 * View type for Cosmos DB MongoDB collection index key
 */
export type MongoIndexView = MongoIndexInput;

export const mongoIndexShape: FlatModelShape = createFlatModelShape({
  key: { armPath: ["key"], value: createDeferredShape(() => mongoIndexKeysShape) },
  options: { armPath: ["options"], value: createDeferredShape(() => mongoIndexOptionsShape) },
});

/**
 * Cosmos DB MongoDB collection resource object
 */
export interface MongoIndexKeys {
  /**
   * List of keys for each MongoDB collection in the Azure Cosmos DB service
   */
  keys?: string[];
}

/**
 * Input type for Cosmos DB MongoDB collection resource object
 */
export interface MongoIndexKeysInput extends InputOf<MongoIndexKeys> {
  /**
   * List of keys for each MongoDB collection in the Azure Cosmos DB service
   */
  keys?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Cosmos DB MongoDB collection resource object
 */
export type MongoIndexKeysView = MongoIndexKeysInput;

export const mongoIndexKeysShape: FlatModelShape = createFlatModelShape({
  keys: { armPath: ["keys"], value: createArrayShape(createStringShape()) },
});

/**
 * Cosmos DB MongoDB collection index options
 */
export interface MongoIndexOptions {
  /**
   * Expire after seconds
   */
  expireAfterSeconds?: number;
  /**
   * Is unique or not
   */
  unique?: boolean;
}

/**
 * Input type for Cosmos DB MongoDB collection index options
 */
export interface MongoIndexOptionsInput extends InputOf<MongoIndexOptions> {
  /**
   * Expire after seconds
   */
  expireAfterSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * Is unique or not
   */
  unique?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Cosmos DB MongoDB collection index options
 */
export type MongoIndexOptionsView = MongoIndexOptionsInput;

export const mongoIndexOptionsShape: FlatModelShape = createFlatModelShape({
  expireAfterSeconds: { armPath: ["expireAfterSeconds"], value: createNumberShape() },
  unique: { armPath: ["unique"], value: createBooleanShape() },
});

/**
 * Azure Cosmos DB MongoMI Role Assignment resource object.
 */
export interface MongoMiRoleAssignmentResourceProperties {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this MongoMI Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: string;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: string;
  /**
   * The data plane resource path for which access is being granted through this MongoMI Role Assignment.
   */
  scope?: string;
}

/**
 * Input type for Azure Cosmos DB MongoMI Role Assignment resource object.
 */
export interface MongoMiRoleAssignmentResourcePropertiesInput extends InputOf<MongoMiRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this MongoMI Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this MongoMI Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Azure Cosmos DB MongoMI Role Assignment resource object.
 */
export interface MongoMiRoleAssignmentResourcePropertiesView extends InputOf<MongoMiRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this MongoMI Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this MongoMI Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

export const mongoMiRoleAssignmentResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  roleDefinitionId: { armPath: ["roleDefinitionId"], value: createStringShape() },
  scope: { armPath: ["scope"], value: createStringShape() },
});

/**
 * Azure Cosmos DB MongoMI Role Definition resource object.
 */
export interface MongoMiRoleDefinitionResourceProperties {
  /**
   * A set of fully qualified Scopes at or below which MongoMI Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: string[];
  /**
   * The path id for the Role Definition.
   */
  id?: string;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: Permission[];
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: string;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: RoleDefinitionType;
}

/**
 * Input type for Azure Cosmos DB MongoMI Role Definition resource object.
 */
export interface MongoMiRoleDefinitionResourcePropertiesInput extends InputOf<MongoMiRoleDefinitionResourceProperties> {
  /**
   * A set of fully qualified Scopes at or below which MongoMI Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The path id for the Role Definition.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: InputArray<PermissionInput, Permission[]> | undefined;
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: ExpressionOrValue<RoleDefinitionType> | undefined;
}

/**
 * View type for Azure Cosmos DB MongoMI Role Definition resource object.
 */
export type MongoMiRoleDefinitionResourcePropertiesView =
  MongoMiRoleDefinitionResourcePropertiesInput;

export const mongoMiRoleDefinitionResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  assignableScopes: { armPath: ["assignableScopes"], value: createArrayShape(createStringShape()) },
  id: { armPath: ["id"], value: createStringShape() },
  permissions: {
    armPath: ["permissions"],
    value: createArrayShape(createDeferredShape(() => permissionShape)),
  },
  roleName: { armPath: ["roleName"], value: createStringShape() },
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * Azure Cosmos DB Mongo Role Definition resource object.
 */
export interface MongoRoleDefinitionResource {
  /**
   * The database name for which access is being granted for this Role Definition.
   */
  databaseName?: string;
  /**
   * A set of privileges contained by the Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Scopes higher than Database are not enforceable as privilege.
   */
  privileges?: Privilege[];
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: string;
  /**
   * The set of roles inherited by this Role Definition.
   */
  roles?: Role[];
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: MongoRoleDefinitionType;
}

/**
 * Input type for Azure Cosmos DB Mongo Role Definition resource object.
 */
export interface MongoRoleDefinitionResourceInput extends InputOf<MongoRoleDefinitionResource> {
  /**
   * The database name for which access is being granted for this Role Definition.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * A set of privileges contained by the Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Scopes higher than Database are not enforceable as privilege.
   */
  privileges?: InputArray<PrivilegeInput, Privilege[]> | undefined;
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: ExpressionOrValue<string> | undefined;
  /**
   * The set of roles inherited by this Role Definition.
   */
  roles?: InputArray<RoleInput, Role[]> | undefined;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: ExpressionOrValue<MongoRoleDefinitionType> | undefined;
}

/**
 * View type for Azure Cosmos DB Mongo Role Definition resource object.
 */
export type MongoRoleDefinitionResourceView = MongoRoleDefinitionResourceInput;

export const mongoRoleDefinitionResourceShape: FlatModelShape = createFlatModelShape({
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  privileges: {
    armPath: ["privileges"],
    value: createArrayShape(createDeferredShape(() => privilegeShape)),
  },
  roleName: { armPath: ["roleName"], value: createStringShape() },
  roles: { armPath: ["roles"], value: createArrayShape(createDeferredShape(() => roleShape)) },
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * Azure Cosmos DB Mongo User Definition resource object.
 */
export interface MongoUserDefinitionResource {
  /**
   * A custom definition for the USer Definition.
   */
  customData?: string;
  /**
   * The database name for which access is being granted for this User Definition.
   */
  databaseName?: string;
  /**
   * The Mongo Auth mechanism. For now, we only support auth mechanism SCRAM-SHA-256.
   */
  mechanisms?: string;
  /**
   * The password for User Definition. Response does not contain user password.
   */
  password?: string;
  /**
   * The set of roles inherited by the User Definition.
   */
  roles?: Role[];
  /**
   * The user name for User Definition.
   */
  userName?: string;
}

/**
 * Input type for Azure Cosmos DB Mongo User Definition resource object.
 */
export interface MongoUserDefinitionResourceInput extends InputOf<MongoUserDefinitionResource> {
  /**
   * A custom definition for the USer Definition.
   */
  customData?: ExpressionOrValue<string> | undefined;
  /**
   * The database name for which access is being granted for this User Definition.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * The Mongo Auth mechanism. For now, we only support auth mechanism SCRAM-SHA-256.
   */
  mechanisms?: ExpressionOrValue<string> | undefined;
  /**
   * The password for User Definition. Response does not contain user password.
   */
  password?: ExpressionOrValue<string> | undefined;
  /**
   * The set of roles inherited by the User Definition.
   */
  roles?: InputArray<RoleInput, Role[]> | undefined;
  /**
   * The user name for User Definition.
   */
  userName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Azure Cosmos DB Mongo User Definition resource object.
 */
export type MongoUserDefinitionResourceView = MongoUserDefinitionResourceInput;

export const mongoUserDefinitionResourceShape: FlatModelShape = createFlatModelShape({
  customData: { armPath: ["customData"], value: createStringShape() },
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  mechanisms: { armPath: ["mechanisms"], value: createStringShape() },
  password: { armPath: ["password"], value: createStringShape() },
  roles: { armPath: ["roles"], value: createArrayShape(createDeferredShape(() => roleShape)) },
  userName: { armPath: ["userName"], value: createStringShape() },
});

/**
 * Properties of a notebook workspace resource.
 */
export interface NotebookWorkspaceProperties {
  /**
   * Specifies the endpoint of Notebook server.
   */
  notebookServerEndpoint?: string;
  /**
   * Status of the notebook workspace. Possible values are: Creating, Online, Deleting, Failed, Updating.
   */
  status?: string;
}

/**
 * Input type for Properties of a notebook workspace resource.
 */
export interface NotebookWorkspacePropertiesInput extends InputOf<NotebookWorkspaceProperties> {}

/**
 * View type for Properties of a notebook workspace resource.
 */
export interface NotebookWorkspacePropertiesView extends InputOf<NotebookWorkspaceProperties> {
  /**
   * Read-only output: Specifies the endpoint of Notebook server.
   */
  readonly notebookServerEndpoint?: Expression<string> | undefined;
  /**
   * Read-only output: Status of the notebook workspace. Possible values are: Creating, Online, Deleting, Failed, Updating.
   */
  readonly status?: Expression<string> | undefined;
}

export const notebookWorkspacePropertiesShape: FlatModelShape = createFlatModelShape({
  notebookServerEndpoint: {
    armPath: ["notebookServerEndpoint"],
    value: createStringShape(),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createStringShape(), readOnly: true },
});

/**
 * The object representing periodic mode backup policy.
 */
export interface PeriodicModeBackupPolicy {
  /**
   * The object representing the state of the migration between the backup policies.
   */
  migrationState?: BackupPolicyMigrationState;
  /**
   * Configuration values for periodic mode backup
   */
  periodicModeProperties?: PeriodicModeProperties;
  /**
   * Describes the mode of backups.
   *
   * Selects this variant. Must be "Periodic".
   */
  type: "Periodic";
}

/**
 * Input type for The object representing periodic mode backup policy.
 */
export interface PeriodicModeBackupPolicyInput extends InputOf<PeriodicModeBackupPolicy> {
  /**
   * The object representing the state of the migration between the backup policies.
   */
  migrationState?: BackupPolicyMigrationStateInput | undefined;
  /**
   * Configuration values for periodic mode backup
   */
  periodicModeProperties?: PeriodicModePropertiesInput | undefined;
  /**
   * Describes the mode of backups.
   *
   * Selects this variant. Must be "Periodic".
   */
  type: "Periodic";
}

/**
 * View type for The object representing periodic mode backup policy.
 */
export type PeriodicModeBackupPolicyView = PeriodicModeBackupPolicyInput;

export const periodicModeBackupPolicyShape: FlatModelShape = createFlatModelShape({
  migrationState: {
    armPath: ["migrationState"],
    value: createDeferredShape(() => backupPolicyMigrationStateShape),
  },
  periodicModeProperties: {
    armPath: ["periodicModeProperties"],
    value: createDeferredShape(() => periodicModePropertiesShape),
  },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Configuration values for periodic mode backup
 */
export interface PeriodicModeProperties {
  /**
   * An integer representing the interval in minutes between two backups
   */
  backupIntervalInMinutes?: number;
  /**
   * An integer representing the time (in hours) that each backup is retained
   */
  backupRetentionIntervalInHours?: number;
  /**
   * Enum to indicate type of backup residency
   */
  backupStorageRedundancy?: BackupStorageRedundancy;
}

/**
 * Input type for Configuration values for periodic mode backup
 */
export interface PeriodicModePropertiesInput extends InputOf<PeriodicModeProperties> {
  /**
   * An integer representing the interval in minutes between two backups
   */
  backupIntervalInMinutes?: ExpressionOrValue<number> | undefined;
  /**
   * An integer representing the time (in hours) that each backup is retained
   */
  backupRetentionIntervalInHours?: ExpressionOrValue<number> | undefined;
  /**
   * Enum to indicate type of backup residency
   */
  backupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
}

/**
 * View type for Configuration values for periodic mode backup
 */
export type PeriodicModePropertiesView = PeriodicModePropertiesInput;

export const periodicModePropertiesShape: FlatModelShape = createFlatModelShape({
  backupIntervalInMinutes: { armPath: ["backupIntervalInMinutes"], value: createNumberShape() },
  backupRetentionIntervalInHours: {
    armPath: ["backupRetentionIntervalInHours"],
    value: createNumberShape(),
  },
  backupStorageRedundancy: { armPath: ["backupStorageRedundancy"], value: createUnionShape() },
});

/**
 * The set of data plane operations permitted through this Role Definition.
 */
export interface Permission {
  /**
   * An array of data actions that are allowed.
   */
  dataActions?: string[];
  /**
   * The id for the permission.
   */
  id?: string;
  /**
   * An array of data actions that are denied.
   */
  notDataActions?: string[];
}

/**
 * Input type for The set of data plane operations permitted through this Role Definition.
 */
export interface PermissionInput extends InputOf<Permission> {
  /**
   * An array of data actions that are allowed.
   */
  dataActions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The id for the permission.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * An array of data actions that are denied.
   */
  notDataActions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for The set of data plane operations permitted through this Role Definition.
 */
export type PermissionView = PermissionInput;

export const permissionShape: FlatModelShape = createFlatModelShape({
  dataActions: { armPath: ["dataActions"], value: createArrayShape(createStringShape()) },
  id: { armPath: ["id"], value: createStringShape() },
  notDataActions: { armPath: ["notDataActions"], value: createArrayShape(createStringShape()) },
});

/**
 * Properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * Group id of the private endpoint.
   */
  groupId?: string;
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: PrivateEndpointProperty;
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /**
   * Provisioning state of the private endpoint.
   */
  provisioningState?: string;
}

/**
 * Input type for Properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Group id of the private endpoint.
   */
  groupId?: ExpressionOrValue<string> | undefined;
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: PrivateEndpointPropertyInput | undefined;
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStatePropertyInput | undefined;
  /**
   * Provisioning state of the private endpoint.
   */
  provisioningState?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionPropertiesView extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Group id of the private endpoint.
   */
  groupId?: ExpressionOrValue<string> | undefined;
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: PrivateEndpointPropertyView | undefined;
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStatePropertyView | undefined;
  /**
   * Provisioning state of the private endpoint.
   */
  provisioningState?: ExpressionOrValue<string> | undefined;
}

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  groupId: { armPath: ["groupId"], value: createStringShape() },
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointPropertyShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => privateLinkServiceConnectionStatePropertyShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape() },
});

/**
 * Private endpoint which the connection belongs to.
 */
export interface PrivateEndpointProperty {
  /**
   * Resource id of the private endpoint.
   */
  id?: string;
}

/**
 * Input type for Private endpoint which the connection belongs to.
 */
export interface PrivateEndpointPropertyInput extends InputOf<PrivateEndpointProperty> {
  /**
   * Resource id of the private endpoint.
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Private endpoint which the connection belongs to.
 */
export type PrivateEndpointPropertyView = PrivateEndpointPropertyInput;

export const privateEndpointPropertyShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * Properties of a private link resource.
 */
export interface PrivateLinkResourceProperties {
  /**
   * The private link resource group id.
   */
  groupId?: string;
  /**
   * The private link resource required member names.
   */
  requiredMembers?: string[];
  /**
   * The private link resource required zone names.
   */
  requiredZoneNames?: string[];
}

/**
 * Input type for Properties of a private link resource.
 */
export interface PrivateLinkResourcePropertiesInput extends InputOf<PrivateLinkResourceProperties> {}

/**
 * View type for Properties of a private link resource.
 */
export interface PrivateLinkResourcePropertiesView extends InputOf<PrivateLinkResourceProperties> {
  /**
   * Read-only output: The private link resource group id.
   */
  readonly groupId?: Expression<string> | undefined;
  /**
   * Read-only output: The private link resource required member names.
   */
  readonly requiredMembers?: Expression<string[]> | undefined;
  /**
   * Read-only output: The private link resource required zone names.
   */
  readonly requiredZoneNames?: Expression<string[]> | undefined;
}

export const privateLinkResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  groupId: { armPath: ["groupId"], value: createStringShape(), readOnly: true },
  requiredMembers: {
    armPath: ["requiredMembers"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  requiredZoneNames: {
    armPath: ["requiredZoneNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
});

/**
 * Connection State of the Private Endpoint Connection.
 */
export interface PrivateLinkServiceConnectionStateProperty {
  /**
   * Any action that is required beyond basic workflow (approve/ reject/ disconnect)
   */
  actionsRequired?: string;
  /**
   * The private link service connection description.
   */
  description?: string;
  /**
   * The private link service connection status.
   */
  status?: string;
}

/**
 * Input type for Connection State of the Private Endpoint Connection.
 */
export interface PrivateLinkServiceConnectionStatePropertyInput extends InputOf<PrivateLinkServiceConnectionStateProperty> {
  /**
   * The private link service connection description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The private link service connection status.
   */
  status?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Connection State of the Private Endpoint Connection.
 */
export interface PrivateLinkServiceConnectionStatePropertyView extends InputOf<PrivateLinkServiceConnectionStateProperty> {
  /**
   * Read-only output: Any action that is required beyond basic workflow (approve/ reject/ disconnect)
   */
  readonly actionsRequired?: Expression<string> | undefined;
  /**
   * The private link service connection description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The private link service connection status.
   */
  status?: ExpressionOrValue<string> | undefined;
}

export const privateLinkServiceConnectionStatePropertyShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"], value: createStringShape(), readOnly: true },
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createStringShape() },
});

/**
 * The set of data plane operations permitted through this Role Definition.
 */
export interface Privilege {
  /**
   * An array of actions that are allowed.
   */
  actions?: string[];
  /**
   * An Azure Cosmos DB Mongo DB Resource.
   */
  resource?: PrivilegeResource;
}

/**
 * Input type for The set of data plane operations permitted through this Role Definition.
 */
export interface PrivilegeInput extends InputOf<Privilege> {
  /**
   * An array of actions that are allowed.
   */
  actions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * An Azure Cosmos DB Mongo DB Resource.
   */
  resource?: PrivilegeResourceInput | undefined;
}

/**
 * View type for The set of data plane operations permitted through this Role Definition.
 */
export type PrivilegeView = PrivilegeInput;

export const privilegeShape: FlatModelShape = createFlatModelShape({
  actions: { armPath: ["actions"], value: createArrayShape(createStringShape()) },
  resource: { armPath: ["resource"], value: createDeferredShape(() => privilegeResourceShape) },
});

/**
 * An Azure Cosmos DB Mongo DB Resource.
 */
export interface PrivilegeResource {
  /**
   * The collection name the role is applied.
   */
  collection?: string;
  /**
   * The database name the role is applied.
   */
  db?: string;
}

/**
 * Input type for An Azure Cosmos DB Mongo DB Resource.
 */
export interface PrivilegeResourceInput extends InputOf<PrivilegeResource> {
  /**
   * The collection name the role is applied.
   */
  collection?: ExpressionOrValue<string> | undefined;
  /**
   * The database name the role is applied.
   */
  db?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for An Azure Cosmos DB Mongo DB Resource.
 */
export type PrivilegeResourceView = PrivilegeResourceInput;

export const privilegeResourceShape: FlatModelShape = createFlatModelShape({
  collection: { armPath: ["collection"], value: createStringShape() },
  db: { armPath: ["db"], value: createStringShape() },
});

/**
 * Parameters to indicate the information about the restore.
 */
export interface ResourceRestoreParameters {
  /**
   * The id of the restorable database account from which the restore has to be initiated. For example: /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{restorableDatabaseAccountName}
   */
  restoreSource?: string;
  /**
   * Time to which the account has to be restored (ISO-8601 format).
   */
  restoreTimestampInUtc?: Date;
  /**
   * Specifies whether the restored account will have Time-To-Live disabled upon the successful restore.
   */
  restoreWithTtlDisabled?: boolean;
}

/**
 * Input type for Parameters to indicate the information about the restore.
 */
export interface ResourceRestoreParametersInput extends InputOf<ResourceRestoreParameters> {
  /**
   * The id of the restorable database account from which the restore has to be initiated. For example: /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{restorableDatabaseAccountName}
   */
  restoreSource?: ExpressionOrValue<string> | undefined;
  /**
   * Time to which the account has to be restored (ISO-8601 format).
   */
  restoreTimestampInUtc?: ExpressionOrValue<Date> | undefined;
  /**
   * Specifies whether the restored account will have Time-To-Live disabled upon the successful restore.
   */
  restoreWithTtlDisabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Parameters to indicate the information about the restore.
 */
export type ResourceRestoreParametersView = ResourceRestoreParametersInput;

export const resourceRestoreParametersShape: FlatModelShape = createFlatModelShape({
  restoreSource: { armPath: ["restoreSource"], value: createStringShape() },
  restoreTimestampInUtc: {
    armPath: ["restoreTimestampInUtc"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  restoreWithTtlDisabled: { armPath: ["restoreWithTtlDisabled"], value: createBooleanShape() },
});

/**
 * The properties of a restorable database account.
 */
export interface RestorableDatabaseAccountProperties {
  /**
   * The name of the global database account
   */
  accountName?: string;
  /**
   * The API type of the restorable database account.
   */
  apiType?: ApiType;
  /**
   * The creation time of the restorable database account (ISO-8601 format).
   */
  creationTime?: Date;
  /**
   * The time at which the restorable database account has been deleted (ISO-8601 format).
   */
  deletionTime?: Date;
  /**
   * The least recent time at which the database account can be restored to (ISO-8601 format).
   */
  oldestRestorableTime?: Date;
  /**
   * List of regions where the of the database account can be restored from.
   */
  restorableLocations?: RestorableLocationResource[];
}

/**
 * Input type for The properties of a restorable database account.
 */
export interface RestorableDatabaseAccountPropertiesInput extends InputOf<RestorableDatabaseAccountProperties> {}

/**
 * View type for The properties of a restorable database account.
 */
export interface RestorableDatabaseAccountPropertiesView extends InputOf<RestorableDatabaseAccountProperties> {
  /**
   * Read-only output: The name of the global database account
   */
  readonly accountName?: Expression<string> | undefined;
  /**
   * Read-only output: The API type of the restorable database account.
   */
  readonly apiType?: Expression<ApiType> | undefined;
  /**
   * Read-only output: The creation time of the restorable database account (ISO-8601 format).
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The time at which the restorable database account has been deleted (ISO-8601 format).
   */
  readonly deletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The least recent time at which the database account can be restored to (ISO-8601 format).
   */
  readonly oldestRestorableTime?: Expression<Date> | undefined;
  /**
   * Read-only output: List of regions where the of the database account can be restored from.
   */
  readonly restorableLocations?: Expression<RestorableLocationResource[]> | undefined;
}

export const restorableDatabaseAccountPropertiesShape: FlatModelShape = createFlatModelShape({
  accountName: { armPath: ["accountName"], value: createStringShape(), readOnly: true },
  apiType: { armPath: ["apiType"], value: createUnionShape(), readOnly: true },
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  deletionTime: {
    armPath: ["deletionTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  oldestRestorableTime: {
    armPath: ["oldestRestorableTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  restorableLocations: {
    armPath: ["restorableLocations"],
    value: createArrayShape(createDeferredShape(() => restorableLocationResourceShape)),
    readOnly: true,
  },
});

/**
 * Properties of the regional restorable account.
 */
export interface RestorableLocationResource {
  /**
   * The creation time of the regional restorable database account (ISO-8601 format).
   */
  creationTime?: Date;
  /**
   * The time at which the regional restorable database account has been deleted (ISO-8601 format).
   */
  deletionTime?: Date;
  /**
   * The location of the regional restorable account.
   */
  locationName?: string;
  /**
   * The instance id of the regional restorable account.
   */
  regionalDatabaseAccountInstanceId?: string;
}

/**
 * Input type for Properties of the regional restorable account.
 */
export interface RestorableLocationResourceInput extends InputOf<RestorableLocationResource> {}

/**
 * View type for Properties of the regional restorable account.
 */
export interface RestorableLocationResourceView extends InputOf<RestorableLocationResource> {
  /**
   * Read-only output: The creation time of the regional restorable database account (ISO-8601 format).
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The time at which the regional restorable database account has been deleted (ISO-8601 format).
   */
  readonly deletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The location of the regional restorable account.
   */
  readonly locationName?: Expression<string> | undefined;
  /**
   * Read-only output: The instance id of the regional restorable account.
   */
  readonly regionalDatabaseAccountInstanceId?: Expression<string> | undefined;
}

export const restorableLocationResourceShape: FlatModelShape = createFlatModelShape({
  creationTime: {
    armPath: ["creationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  deletionTime: {
    armPath: ["deletionTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  locationName: { armPath: ["locationName"], value: createStringShape(), readOnly: true },
  regionalDatabaseAccountInstanceId: {
    armPath: ["regionalDatabaseAccountInstanceId"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * Parameters to indicate the information about the restore.
 */
export interface RestoreParameters {
  /**
   * List of specific databases available for restore.
   */
  databasesToRestore?: DatabaseRestoreResource[];
  /**
   * List of specific gremlin databases available for restore.
   */
  gremlinDatabasesToRestore?: GremlinDatabaseRestoreResource[];
  /**
   * Describes the mode of the restore.
   */
  restoreMode?: RestoreMode;
  /**
   * The id of the restorable database account from which the restore has to be initiated. For example: /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{restorableDatabaseAccountName}
   */
  restoreSource?: string;
  /**
   * Time to which the account has to be restored (ISO-8601 format).
   */
  restoreTimestampInUtc?: Date;
  /**
   * Specifies whether the restored account will have Time-To-Live disabled upon the successful restore.
   */
  restoreWithTtlDisabled?: boolean;
  /**
   * The source backup location for restore.
   */
  sourceBackupLocation?: string;
  /**
   * List of specific tables available for restore.
   */
  tablesToRestore?: string[];
}

/**
 * Input type for Parameters to indicate the information about the restore.
 */
export interface RestoreParametersInput extends InputOf<RestoreParameters> {
  /**
   * List of specific databases available for restore.
   */
  databasesToRestore?:
    InputArray<DatabaseRestoreResourceInput, DatabaseRestoreResource[]> | undefined;
  /**
   * List of specific gremlin databases available for restore.
   */
  gremlinDatabasesToRestore?:
    InputArray<GremlinDatabaseRestoreResourceInput, GremlinDatabaseRestoreResource[]> | undefined;
  /**
   * Describes the mode of the restore.
   */
  restoreMode?: ExpressionOrValue<RestoreMode> | undefined;
  /**
   * The id of the restorable database account from which the restore has to be initiated. For example: /subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{restorableDatabaseAccountName}
   */
  restoreSource?: ExpressionOrValue<string> | undefined;
  /**
   * Time to which the account has to be restored (ISO-8601 format).
   */
  restoreTimestampInUtc?: ExpressionOrValue<Date> | undefined;
  /**
   * Specifies whether the restored account will have Time-To-Live disabled upon the successful restore.
   */
  restoreWithTtlDisabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The source backup location for restore.
   */
  sourceBackupLocation?: ExpressionOrValue<string> | undefined;
  /**
   * List of specific tables available for restore.
   */
  tablesToRestore?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Parameters to indicate the information about the restore.
 */
export type RestoreParametersView = RestoreParametersInput;

export const restoreParametersShape: FlatModelShape = createFlatModelShape({
  databasesToRestore: {
    armPath: ["databasesToRestore"],
    value: createArrayShape(createDeferredShape(() => databaseRestoreResourceShape)),
  },
  gremlinDatabasesToRestore: {
    armPath: ["gremlinDatabasesToRestore"],
    value: createArrayShape(createDeferredShape(() => gremlinDatabaseRestoreResourceShape)),
  },
  restoreMode: { armPath: ["restoreMode"], value: createUnionShape() },
  restoreSource: { armPath: ["restoreSource"], value: createStringShape() },
  restoreTimestampInUtc: {
    armPath: ["restoreTimestampInUtc"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  restoreWithTtlDisabled: { armPath: ["restoreWithTtlDisabled"], value: createBooleanShape() },
  sourceBackupLocation: { armPath: ["sourceBackupLocation"], value: createStringShape() },
  tablesToRestore: { armPath: ["tablesToRestore"], value: createArrayShape(createStringShape()) },
});

/**
 * The set of roles permitted through this Role Definition.
 */
export interface Role {
  /**
   * The database name the role is applied.
   */
  db?: string;
  /**
   * The role name.
   */
  role?: string;
}

/**
 * Input type for The set of roles permitted through this Role Definition.
 */
export interface RoleInput extends InputOf<Role> {
  /**
   * The database name the role is applied.
   */
  db?: ExpressionOrValue<string> | undefined;
  /**
   * The role name.
   */
  role?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The set of roles permitted through this Role Definition.
 */
export type RoleView = RoleInput;

export const roleShape: FlatModelShape = createFlatModelShape({
  db: { armPath: ["db"], value: createStringShape() },
  role: { armPath: ["role"], value: createStringShape() },
});

export interface SeedNode {
  /**
   * IP address of this seed node.
   */
  ipAddress?: string;
}

export interface SeedNodeInput extends InputOf<SeedNode> {
  /**
   * IP address of this seed node.
   */
  ipAddress?: ExpressionOrValue<string> | undefined;
}

export type SeedNodeView = SeedNodeInput;

export const seedNodeShape: FlatModelShape = createFlatModelShape({
  ipAddress: { armPath: ["ipAddress"], value: createStringShape() },
});

/**
 * Services response resource.
 */
export type ServiceResourceProperties =
  | DataTransferServiceResourceProperties
  | SqlDedicatedGatewayServiceResourceProperties
  | GraphApiComputeServiceResourceProperties
  | MaterializedViewsBuilderServiceResourceProperties;

/**
 * Input type for Services response resource.
 */
export type ServiceResourcePropertiesInput =
  | DataTransferServiceResourcePropertiesInput
  | SqlDedicatedGatewayServiceResourcePropertiesInput
  | GraphApiComputeServiceResourcePropertiesInput
  | MaterializedViewsBuilderServiceResourcePropertiesInput;

/**
 * View type for Services response resource.
 */
export type ServiceResourcePropertiesView =
  | DataTransferServiceResourcePropertiesView
  | SqlDedicatedGatewayServiceResourcePropertiesView
  | GraphApiComputeServiceResourcePropertiesView
  | MaterializedViewsBuilderServiceResourcePropertiesView;

export const serviceResourcePropertiesShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("serviceType", {
    DataTransfer: createDeferredShape(() => dataTransferServiceResourcePropertiesShape),
    SqlDedicatedGateway: createDeferredShape(
      () => sqlDedicatedGatewayServiceResourcePropertiesShape,
    ),
    GraphAPICompute: createDeferredShape(() => graphApiComputeServiceResourcePropertiesShape),
    MaterializedViewsBuilder: createDeferredShape(
      () => materializedViewsBuilderServiceResourcePropertiesShape,
    ),
  });

export interface SpatialSpec {
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: string;
  /**
   * List of path's spatial type
   */
  types?: SpatialType[];
}

export interface SpatialSpecInput extends InputOf<SpatialSpec> {
  /**
   * The path for which the indexing behavior applies to. Index paths typically start with root and end with wildcard (/path/*)
   */
  path?: ExpressionOrValue<string> | undefined;
  /**
   * List of path's spatial type
   */
  types?: InputArray<ExpressionOrValue<SpatialType>, SpatialType[]> | undefined;
}

export type SpatialSpecView = SpatialSpecInput;

export const spatialSpecShape: FlatModelShape = createFlatModelShape({
  path: { armPath: ["path"], value: createStringShape() },
  types: { armPath: ["types"], value: createArrayShape(createUnionShape()) },
});

/**
 * The properties of an Azure Cosmos DB container
 */
export interface SqlContainerGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: SqlContainerGetPropertiesOptions;
  /**
   * The standard JSON format of a container
   */
  resource: SqlContainerGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB container
 */
export interface SqlContainerGetPropertiesInput extends InputOf<SqlContainerGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: SqlContainerGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a container
   */
  resource: SqlContainerGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB container
 */
export interface SqlContainerGetPropertiesView extends InputOf<SqlContainerGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: SqlContainerGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a container
   */
  resource: SqlContainerGetPropertiesResourceView;
}

export const sqlContainerGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => sqlContainerGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => sqlContainerGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface SqlContainerGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface SqlContainerGetPropertiesOptionsInput extends InputOf<SqlContainerGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type SqlContainerGetPropertiesOptionsView = SqlContainerGetPropertiesOptionsInput;

export const sqlContainerGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB SQL container resource object
 */
export interface SqlContainerGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: number;
  /**
   * The client encryption policy for the container.
   */
  clientEncryptionPolicy?: ClientEncryptionPolicy;
  /**
   * List of computed properties
   */
  computedProperties?: ComputedProperty[];
  /**
   * The conflict resolution policy for the container.
   */
  conflictResolutionPolicy?: ConflictResolutionPolicy;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: CreateMode;
  /**
   * Default time to live
   */
  defaultTtl?: number;
  /**
   * The FullText policy for the container.
   */
  fullTextPolicy?: FullTextPolicy;
  /**
   * Name of the Cosmos DB SQL container
   */
  id: string;
  /**
   * The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the container
   */
  indexingPolicy?: IndexingPolicy;
  /**
   * The configuration of the partition key to be used for partitioning data into multiple partitions
   */
  partitionKey?: ContainerPartitionKey;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
  /**
   * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeyPolicy?: UniqueKeyPolicy;
  /**
   * The vector embedding policy for the container.
   */
  vectorEmbeddingPolicy?: VectorEmbeddingPolicy;
}

/**
 * Input type for Cosmos DB SQL container resource object
 */
export interface SqlContainerGetPropertiesResourceInput extends InputOf<SqlContainerGetPropertiesResource> {
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * The client encryption policy for the container.
   */
  clientEncryptionPolicy?: ClientEncryptionPolicyInput | undefined;
  /**
   * List of computed properties
   */
  computedProperties?: InputArray<ComputedPropertyInput, ComputedProperty[]> | undefined;
  /**
   * The conflict resolution policy for the container.
   */
  conflictResolutionPolicy?: ConflictResolutionPolicyInput | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Default time to live
   */
  defaultTtl?: ExpressionOrValue<number> | undefined;
  /**
   * The FullText policy for the container.
   */
  fullTextPolicy?: FullTextPolicyInput | undefined;
  /**
   * Name of the Cosmos DB SQL container
   */
  id: ExpressionOrValue<string>;
  /**
   * The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the container
   */
  indexingPolicy?: IndexingPolicyInput | undefined;
  /**
   * The configuration of the partition key to be used for partitioning data into multiple partitions
   */
  partitionKey?: ContainerPartitionKeyInput | undefined;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
  /**
   * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeyPolicy?: UniqueKeyPolicyInput | undefined;
  /**
   * The vector embedding policy for the container.
   */
  vectorEmbeddingPolicy?: VectorEmbeddingPolicyInput | undefined;
}

/**
 * View type for Cosmos DB SQL container resource object
 */
export interface SqlContainerGetPropertiesResourceView extends InputOf<SqlContainerGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Analytical TTL.
   */
  analyticalStorageTtl?: ExpressionOrValue<number> | undefined;
  /**
   * The client encryption policy for the container.
   */
  clientEncryptionPolicy?: ClientEncryptionPolicyView | undefined;
  /**
   * List of computed properties
   */
  computedProperties?: InputArray<ComputedPropertyView, ComputedProperty[]> | undefined;
  /**
   * The conflict resolution policy for the container.
   */
  conflictResolutionPolicy?: ConflictResolutionPolicyView | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Default time to live
   */
  defaultTtl?: ExpressionOrValue<number> | undefined;
  /**
   * The FullText policy for the container.
   */
  fullTextPolicy?: FullTextPolicyView | undefined;
  /**
   * Name of the Cosmos DB SQL container
   */
  id: ExpressionOrValue<string>;
  /**
   * The configuration of the indexing policy. By default, the indexing is automatic for all document paths within the container
   */
  indexingPolicy?: IndexingPolicyView | undefined;
  /**
   * The configuration of the partition key to be used for partitioning data into multiple partitions
   */
  partitionKey?: ContainerPartitionKeyView | undefined;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
  /**
   * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeyPolicy?: UniqueKeyPolicyView | undefined;
  /**
   * The vector embedding policy for the container.
   */
  vectorEmbeddingPolicy?: VectorEmbeddingPolicyView | undefined;
}

export const sqlContainerGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  analyticalStorageTtl: { armPath: ["analyticalStorageTtl"], value: createNumberShape() },
  clientEncryptionPolicy: {
    armPath: ["clientEncryptionPolicy"],
    value: createDeferredShape(() => clientEncryptionPolicyShape),
  },
  computedProperties: {
    armPath: ["computedProperties"],
    value: createArrayShape(createDeferredShape(() => computedPropertyShape)),
  },
  conflictResolutionPolicy: {
    armPath: ["conflictResolutionPolicy"],
    value: createDeferredShape(() => conflictResolutionPolicyShape),
  },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  defaultTtl: { armPath: ["defaultTtl"], value: createNumberShape() },
  fullTextPolicy: {
    armPath: ["fullTextPolicy"],
    value: createDeferredShape(() => fullTextPolicyShape),
  },
  id: { armPath: ["id"], value: createStringShape() },
  indexingPolicy: {
    armPath: ["indexingPolicy"],
    value: createDeferredShape(() => indexingPolicyShape),
  },
  partitionKey: {
    armPath: ["partitionKey"],
    value: createDeferredShape(() => containerPartitionKeyShape),
  },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
  uniqueKeyPolicy: {
    armPath: ["uniqueKeyPolicy"],
    value: createDeferredShape(() => uniqueKeyPolicyShape),
  },
  vectorEmbeddingPolicy: {
    armPath: ["vectorEmbeddingPolicy"],
    value: createDeferredShape(() => vectorEmbeddingPolicyShape),
  },
});

/**
 * The properties of an Azure Cosmos DB SQL database
 */
export interface SqlDatabaseGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: SqlDatabaseGetPropertiesOptions;
  /**
   * The standard JSON format of a SQL database
   */
  resource: SqlDatabaseGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB SQL database
 */
export interface SqlDatabaseGetPropertiesInput extends InputOf<SqlDatabaseGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: SqlDatabaseGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a SQL database
   */
  resource: SqlDatabaseGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB SQL database
 */
export interface SqlDatabaseGetPropertiesView extends InputOf<SqlDatabaseGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: SqlDatabaseGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a SQL database
   */
  resource: SqlDatabaseGetPropertiesResourceView;
}

export const sqlDatabaseGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => sqlDatabaseGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => sqlDatabaseGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface SqlDatabaseGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface SqlDatabaseGetPropertiesOptionsInput extends InputOf<SqlDatabaseGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type SqlDatabaseGetPropertiesOptionsView = SqlDatabaseGetPropertiesOptionsInput;

export const sqlDatabaseGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB SQL database resource object
 */
export interface SqlDatabaseGetPropertiesResource {
  /**
   * A system generated property that specified the addressable path of the collections resource.
   */
  _colls?: string;
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * A system generated property that specifies the addressable path of the users resource.
   */
  _users?: string;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: CreateMode;
  /**
   * Name of the Cosmos DB SQL database
   */
  id: string;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
}

/**
 * Input type for Cosmos DB SQL database resource object
 */
export interface SqlDatabaseGetPropertiesResourceInput extends InputOf<SqlDatabaseGetPropertiesResource> {
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB SQL database
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
}

/**
 * View type for Cosmos DB SQL database resource object
 */
export interface SqlDatabaseGetPropertiesResourceView extends InputOf<SqlDatabaseGetPropertiesResource> {
  /**
   * Read-only output: A system generated property that specified the addressable path of the collections resource.
   */
  readonly _colls?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Read-only output: A system generated property that specifies the addressable path of the users resource.
   */
  readonly _users?: Expression<string> | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB SQL database
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
}

export const sqlDatabaseGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _colls: { armPath: ["_colls"], value: createStringShape(), readOnly: true },
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  _users: { armPath: ["_users"], value: createStringShape(), readOnly: true },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  id: { armPath: ["id"], value: createStringShape() },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
});

/**
 * Resource for a regional service location.
 */
export interface SqlDedicatedGatewayRegionalServiceResource {
  /**
   * The location name.
   */
  location?: string;
  /**
   * The regional service name.
   */
  name?: string;
  /**
   * The regional endpoint for SqlDedicatedGateway.
   */
  sqlDedicatedGatewayEndpoint?: string;
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Resource for a regional service location.
 */
export interface SqlDedicatedGatewayRegionalServiceResourceInput extends InputOf<SqlDedicatedGatewayRegionalServiceResource> {}

/**
 * View type for Resource for a regional service location.
 */
export interface SqlDedicatedGatewayRegionalServiceResourceView extends InputOf<SqlDedicatedGatewayRegionalServiceResource> {
  /**
   * Read-only output: The location name.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The regional service name.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: The regional endpoint for SqlDedicatedGateway.
   */
  readonly sqlDedicatedGatewayEndpoint?: Expression<string> | undefined;
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const sqlDedicatedGatewayRegionalServiceResourceShape: FlatModelShape = createFlatModelShape(
  {
    location: { armPath: ["location"], value: createStringShape(), readOnly: true },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
    sqlDedicatedGatewayEndpoint: {
      armPath: ["sqlDedicatedGatewayEndpoint"],
      value: createStringShape(),
      readOnly: true,
    },
    status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  },
);

/**
 * Properties for SqlDedicatedGatewayServiceResource.
 */
export interface SqlDedicatedGatewayServiceResourceProperties {
  /**
   * Time of the last state change (ISO-8601 format).
   */
  creationTime?: Date;
  /**
   * DedicatedGatewayType for the service.
   */
  dedicatedGatewayType?: DedicatedGatewayType;
  /**
   * Instance count for the service.
   */
  instanceCount?: number;
  /**
   * Instance type for the service.
   */
  instanceSize?: ServiceSize;
  /**
   * An array that contains all of the locations for the service.
   */
  locations?: SqlDedicatedGatewayRegionalServiceResource[];
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "SqlDedicatedGateway".
   */
  serviceType: "SqlDedicatedGateway";
  /**
   * SqlDedicatedGateway endpoint for the service.
   */
  sqlDedicatedGatewayEndpoint?: string;
  /**
   * Describes the status of a service.
   */
  status?: ServiceStatus;
}

/**
 * Input type for Properties for SqlDedicatedGatewayServiceResource.
 */
export interface SqlDedicatedGatewayServiceResourcePropertiesInput extends InputOf<SqlDedicatedGatewayServiceResourceProperties> {
  /**
   * DedicatedGatewayType for the service.
   */
  dedicatedGatewayType?: ExpressionOrValue<DedicatedGatewayType> | undefined;
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "SqlDedicatedGateway".
   */
  serviceType: "SqlDedicatedGateway";
}

/**
 * View type for Properties for SqlDedicatedGatewayServiceResource.
 */
export interface SqlDedicatedGatewayServiceResourcePropertiesView extends InputOf<SqlDedicatedGatewayServiceResourceProperties> {
  /**
   * Read-only output: Time of the last state change (ISO-8601 format).
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * DedicatedGatewayType for the service.
   */
  dedicatedGatewayType?: ExpressionOrValue<DedicatedGatewayType> | undefined;
  /**
   * Instance count for the service.
   */
  instanceCount?: ExpressionOrValue<number> | undefined;
  /**
   * Instance type for the service.
   */
  instanceSize?: ExpressionOrValue<ServiceSize> | undefined;
  /**
   * Read-only output: An array that contains all of the locations for the service.
   */
  readonly locations?: Expression<SqlDedicatedGatewayRegionalServiceResource[]> | undefined;
  /**
   * ServiceType for the service.
   *
   * Selects this variant. Must be "SqlDedicatedGateway".
   */
  serviceType: "SqlDedicatedGateway";
  /**
   * Read-only output: SqlDedicatedGateway endpoint for the service.
   */
  readonly sqlDedicatedGatewayEndpoint?: Expression<string> | undefined;
  /**
   * Read-only output: Describes the status of a service.
   */
  readonly status?: Expression<ServiceStatus> | undefined;
}

export const sqlDedicatedGatewayServiceResourcePropertiesShape: FlatModelShape =
  createFlatModelShape({
    creationTime: {
      armPath: ["creationTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    dedicatedGatewayType: { armPath: ["dedicatedGatewayType"], value: createUnionShape() },
    instanceCount: { armPath: ["instanceCount"], value: createNumberShape() },
    instanceSize: { armPath: ["instanceSize"], value: createUnionShape() },
    locations: {
      armPath: ["locations"],
      value: createArrayShape(
        createDeferredShape(() => sqlDedicatedGatewayRegionalServiceResourceShape),
      ),
      readOnly: true,
    },
    serviceType: { armPath: ["serviceType"], value: createStringLiteralShape() },
    sqlDedicatedGatewayEndpoint: {
      armPath: ["sqlDedicatedGatewayEndpoint"],
      value: createStringShape(),
      readOnly: true,
    },
    status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  });

/**
 * Azure Cosmos DB SQL Role Assignment resource object.
 */
export interface SqlRoleAssignmentResource {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: string;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: string;
  /**
   * The data plane resource path for which access is being granted through this Role Assignment.
   */
  scope?: string;
}

/**
 * Input type for Azure Cosmos DB SQL Role Assignment resource object.
 */
export interface SqlRoleAssignmentResourceInput extends InputOf<SqlRoleAssignmentResource> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Azure Cosmos DB SQL Role Assignment resource object.
 */
export type SqlRoleAssignmentResourceView = SqlRoleAssignmentResourceInput;

export const sqlRoleAssignmentResourceShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape() },
  roleDefinitionId: { armPath: ["roleDefinitionId"], value: createStringShape() },
  scope: { armPath: ["scope"], value: createStringShape() },
});

/**
 * Azure Cosmos DB SQL Role Definition resource object.
 */
export interface SqlRoleDefinitionResource {
  /**
   * A set of fully qualified Scopes at or below which Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: string[];
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: Permission[];
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: string;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: RoleDefinitionType;
}

/**
 * Input type for Azure Cosmos DB SQL Role Definition resource object.
 */
export interface SqlRoleDefinitionResourceInput extends InputOf<SqlRoleDefinitionResource> {
  /**
   * A set of fully qualified Scopes at or below which Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: InputArray<PermissionInput, Permission[]> | undefined;
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: ExpressionOrValue<RoleDefinitionType> | undefined;
}

/**
 * View type for Azure Cosmos DB SQL Role Definition resource object.
 */
export type SqlRoleDefinitionResourceView = SqlRoleDefinitionResourceInput;

export const sqlRoleDefinitionResourceShape: FlatModelShape = createFlatModelShape({
  assignableScopes: { armPath: ["assignableScopes"], value: createArrayShape(createStringShape()) },
  permissions: {
    armPath: ["permissions"],
    value: createArrayShape(createDeferredShape(() => permissionShape)),
  },
  roleName: { armPath: ["roleName"], value: createStringShape() },
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * The properties of an Azure Cosmos DB StoredProcedure
 */
export interface SqlStoredProcedureGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptions;
  /**
   * The standard JSON format of a storedProcedure
   */
  resource: SqlStoredProcedureGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB StoredProcedure
 */
export interface SqlStoredProcedureGetPropertiesInput extends InputOf<SqlStoredProcedureGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptionsInput | undefined;
  /**
   * The standard JSON format of a storedProcedure
   */
  resource: SqlStoredProcedureGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB StoredProcedure
 */
export interface SqlStoredProcedureGetPropertiesView extends InputOf<SqlStoredProcedureGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptionsView | undefined;
  /**
   * The standard JSON format of a storedProcedure
   */
  resource: SqlStoredProcedureGetPropertiesResourceView;
}

export const sqlStoredProcedureGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: { armPath: ["options"], value: createDeferredShape(() => createUpdateOptionsShape) },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => sqlStoredProcedureGetPropertiesResourceShape),
  },
});

/**
 * Cosmos DB SQL storedProcedure resource object
 */
export interface SqlStoredProcedureGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Body of the Stored Procedure
   */
  body?: string;
  /**
   * Name of the Cosmos DB SQL storedProcedure
   */
  id: string;
}

/**
 * Input type for Cosmos DB SQL storedProcedure resource object
 */
export interface SqlStoredProcedureGetPropertiesResourceInput extends InputOf<SqlStoredProcedureGetPropertiesResource> {
  /**
   * Body of the Stored Procedure
   */
  body?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Cosmos DB SQL storedProcedure
   */
  id: ExpressionOrValue<string>;
}

/**
 * View type for Cosmos DB SQL storedProcedure resource object
 */
export interface SqlStoredProcedureGetPropertiesResourceView extends InputOf<SqlStoredProcedureGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Body of the Stored Procedure
   */
  body?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Cosmos DB SQL storedProcedure
   */
  id: ExpressionOrValue<string>;
}

export const sqlStoredProcedureGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  body: { armPath: ["body"], value: createStringShape() },
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * The properties of an Azure Cosmos DB trigger
 */
export interface SqlTriggerGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptions;
  /**
   * The standard JSON format of a trigger
   */
  resource: SqlTriggerGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB trigger
 */
export interface SqlTriggerGetPropertiesInput extends InputOf<SqlTriggerGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptionsInput | undefined;
  /**
   * The standard JSON format of a trigger
   */
  resource: SqlTriggerGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB trigger
 */
export interface SqlTriggerGetPropertiesView extends InputOf<SqlTriggerGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptionsView | undefined;
  /**
   * The standard JSON format of a trigger
   */
  resource: SqlTriggerGetPropertiesResourceView;
}

export const sqlTriggerGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: { armPath: ["options"], value: createDeferredShape(() => createUpdateOptionsShape) },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => sqlTriggerGetPropertiesResourceShape),
  },
});

/**
 * Cosmos DB SQL trigger resource object
 */
export interface SqlTriggerGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Body of the Trigger
   */
  body?: string;
  /**
   * Name of the Cosmos DB SQL trigger
   */
  id: string;
  /**
   * The operation the trigger is associated with
   */
  triggerOperation?: TriggerOperation;
  /**
   * Type of the Trigger
   */
  triggerType?: TriggerType;
}

/**
 * Input type for Cosmos DB SQL trigger resource object
 */
export interface SqlTriggerGetPropertiesResourceInput extends InputOf<SqlTriggerGetPropertiesResource> {
  /**
   * Body of the Trigger
   */
  body?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Cosmos DB SQL trigger
   */
  id: ExpressionOrValue<string>;
  /**
   * The operation the trigger is associated with
   */
  triggerOperation?: ExpressionOrValue<TriggerOperation> | undefined;
  /**
   * Type of the Trigger
   */
  triggerType?: ExpressionOrValue<TriggerType> | undefined;
}

/**
 * View type for Cosmos DB SQL trigger resource object
 */
export interface SqlTriggerGetPropertiesResourceView extends InputOf<SqlTriggerGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Body of the Trigger
   */
  body?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Cosmos DB SQL trigger
   */
  id: ExpressionOrValue<string>;
  /**
   * The operation the trigger is associated with
   */
  triggerOperation?: ExpressionOrValue<TriggerOperation> | undefined;
  /**
   * Type of the Trigger
   */
  triggerType?: ExpressionOrValue<TriggerType> | undefined;
}

export const sqlTriggerGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  body: { armPath: ["body"], value: createStringShape() },
  id: { armPath: ["id"], value: createStringShape() },
  triggerOperation: { armPath: ["triggerOperation"], value: createUnionShape() },
  triggerType: { armPath: ["triggerType"], value: createUnionShape() },
});

/**
 * The properties of an Azure Cosmos DB userDefinedFunction
 */
export interface SqlUserDefinedFunctionGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptions;
  /**
   * The standard JSON format of a userDefinedFunction
   */
  resource: SqlUserDefinedFunctionGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB userDefinedFunction
 */
export interface SqlUserDefinedFunctionGetPropertiesInput extends InputOf<SqlUserDefinedFunctionGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptionsInput | undefined;
  /**
   * The standard JSON format of a userDefinedFunction
   */
  resource: SqlUserDefinedFunctionGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB userDefinedFunction
 */
export interface SqlUserDefinedFunctionGetPropertiesView extends InputOf<SqlUserDefinedFunctionGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: CreateUpdateOptionsView | undefined;
  /**
   * The standard JSON format of a userDefinedFunction
   */
  resource: SqlUserDefinedFunctionGetPropertiesResourceView;
}

export const sqlUserDefinedFunctionGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: { armPath: ["options"], value: createDeferredShape(() => createUpdateOptionsShape) },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => sqlUserDefinedFunctionGetPropertiesResourceShape),
  },
});

/**
 * Cosmos DB SQL userDefinedFunction resource object
 */
export interface SqlUserDefinedFunctionGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Body of the User Defined Function
   */
  body?: string;
  /**
   * Name of the Cosmos DB SQL userDefinedFunction
   */
  id: string;
}

/**
 * Input type for Cosmos DB SQL userDefinedFunction resource object
 */
export interface SqlUserDefinedFunctionGetPropertiesResourceInput extends InputOf<SqlUserDefinedFunctionGetPropertiesResource> {
  /**
   * Body of the User Defined Function
   */
  body?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Cosmos DB SQL userDefinedFunction
   */
  id: ExpressionOrValue<string>;
}

/**
 * View type for Cosmos DB SQL userDefinedFunction resource object
 */
export interface SqlUserDefinedFunctionGetPropertiesResourceView extends InputOf<SqlUserDefinedFunctionGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Body of the User Defined Function
   */
  body?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Cosmos DB SQL userDefinedFunction
   */
  id: ExpressionOrValue<string>;
}

export const sqlUserDefinedFunctionGetPropertiesResourceShape: FlatModelShape =
  createFlatModelShape({
    _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
    _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
    _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
    body: { armPath: ["body"], value: createStringShape() },
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
 * The properties of an Azure Cosmos Table
 */
export interface TableGetProperties {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: TableGetPropertiesOptions;
  /**
   * The standard JSON format of a Table
   */
  resource: TableGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos Table
 */
export interface TableGetPropertiesInput extends InputOf<TableGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: TableGetPropertiesOptionsInput | undefined;
  /**
   * The standard JSON format of a Table
   */
  resource: TableGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos Table
 */
export interface TableGetPropertiesView extends InputOf<TableGetProperties> {
  /**
   * A key-value pair of options to be applied for the request. This corresponds to the headers sent with the request.
   */
  options?: TableGetPropertiesOptionsView | undefined;
  /**
   * The standard JSON format of a Table
   */
  resource: TableGetPropertiesResourceView;
}

export const tableGetPropertiesShape: FlatModelShape = createFlatModelShape({
  options: {
    armPath: ["options"],
    value: createDeferredShape(() => tableGetPropertiesOptionsShape),
  },
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => tableGetPropertiesResourceShape),
  },
});

/**
 * CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface TableGetPropertiesOptions {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettings;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: number;
}

/**
 * Input type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export interface TableGetPropertiesOptionsInput extends InputOf<TableGetPropertiesOptions> {
  /**
   * Specifies the Autoscale settings. Note: Either throughput or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsInput | undefined;
  /**
   * Request Units per second. For example, "throughput": 10000.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for CreateUpdateOptions are a list of key-value pairs that describe the resource. Supported keys are "If-Match", "If-None-Match", "Session-Token" and "Throughput"
 */
export type TableGetPropertiesOptionsView = TableGetPropertiesOptionsInput;

export const tableGetPropertiesOptionsShape: FlatModelShape = createFlatModelShape({
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsShape),
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * Cosmos DB table resource object
 */
export interface TableGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: CreateMode;
  /**
   * Name of the Cosmos DB table
   */
  id: string;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParameters;
}

/**
 * Input type for Cosmos DB table resource object
 */
export interface TableGetPropertiesResourceInput extends InputOf<TableGetPropertiesResource> {
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB table
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersInput | undefined;
}

/**
 * View type for Cosmos DB table resource object
 */
export interface TableGetPropertiesResourceView extends InputOf<TableGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Enum to indicate the mode of account creation.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Name of the Cosmos DB table
   */
  id: ExpressionOrValue<string>;
  /**
   * Parameters to indicate the information about the restore
   */
  restoreParameters?: ResourceRestoreParametersView | undefined;
}

export const tableGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  id: { armPath: ["id"], value: createStringShape() },
  restoreParameters: {
    armPath: ["restoreParameters"],
    value: createDeferredShape(() => resourceRestoreParametersShape),
  },
});

/**
 * Azure Cosmos DB Table Role Assignment resource object.
 */
export interface TableRoleAssignmentResourceProperties {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Table Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: string;
  /**
   * Provisioning state of the resource.
   */
  provisioningState?: string;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: string;
  /**
   * The data plane resource path for which access is being granted through this Table Role Assignment.
   */
  scope?: string;
}

/**
 * Input type for Azure Cosmos DB Table Role Assignment resource object.
 */
export interface TableRoleAssignmentResourcePropertiesInput extends InputOf<TableRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Table Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Table Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Azure Cosmos DB Table Role Assignment resource object.
 */
export interface TableRoleAssignmentResourcePropertiesView extends InputOf<TableRoleAssignmentResourceProperties> {
  /**
   * The unique identifier for the associated AAD principal in the AAD graph to which access is being granted through this Table Role Assignment. Tenant ID for the principal is inferred using the tenant associated with the subscription.
   */
  principalId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Provisioning state of the resource.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * The unique identifier for the associated Role Definition.
   */
  roleDefinitionId?: ExpressionOrValue<string> | undefined;
  /**
   * The data plane resource path for which access is being granted through this Table Role Assignment.
   */
  scope?: ExpressionOrValue<string> | undefined;
}

export const tableRoleAssignmentResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  roleDefinitionId: { armPath: ["roleDefinitionId"], value: createStringShape() },
  scope: { armPath: ["scope"], value: createStringShape() },
});

/**
 * Azure Cosmos DB Table Role Definition resource object.
 */
export interface TableRoleDefinitionResourceProperties {
  /**
   * A set of fully qualified Scopes at or below which Table Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: string[];
  /**
   * The path id for the Role Definition.
   */
  id?: string;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: Permission[];
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: string;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: RoleDefinitionType;
}

/**
 * Input type for Azure Cosmos DB Table Role Definition resource object.
 */
export interface TableRoleDefinitionResourcePropertiesInput extends InputOf<TableRoleDefinitionResourceProperties> {
  /**
   * A set of fully qualified Scopes at or below which Table Role Assignments may be created using this Role Definition. This will allow application of this Role Definition on the entire database account or any underlying Database / Collection. Must have at least one element. Scopes higher than Database account are not enforceable as assignable Scopes. Note that resources referenced in assignable Scopes need not exist.
   */
  assignableScopes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The path id for the Role Definition.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * The set of operations allowed through this Role Definition.
   */
  permissions?: InputArray<PermissionInput, Permission[]> | undefined;
  /**
   * A user-friendly name for the Role Definition. Must be unique for the database account.
   */
  roleName?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the Role Definition was built-in or user created.
   */
  type?: ExpressionOrValue<RoleDefinitionType> | undefined;
}

/**
 * View type for Azure Cosmos DB Table Role Definition resource object.
 */
export type TableRoleDefinitionResourcePropertiesView = TableRoleDefinitionResourcePropertiesInput;

export const tableRoleDefinitionResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  assignableScopes: { armPath: ["assignableScopes"], value: createArrayShape(createStringShape()) },
  id: { armPath: ["id"], value: createStringShape() },
  permissions: {
    armPath: ["permissions"],
    value: createArrayShape(createDeferredShape(() => permissionShape)),
  },
  roleName: { armPath: ["roleName"], value: createStringShape() },
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * Cosmos DB resource throughput policy
 */
export interface ThroughputPolicyResource {
  /**
   * Represents the percentage by which throughput can increase every time throughput policy kicks in.
   */
  incrementPercent?: number;
  /**
   * Determines whether the ThroughputPolicy is active or not
   */
  isEnabled?: boolean;
}

/**
 * Input type for Cosmos DB resource throughput policy
 */
export interface ThroughputPolicyResourceInput extends InputOf<ThroughputPolicyResource> {
  /**
   * Represents the percentage by which throughput can increase every time throughput policy kicks in.
   */
  incrementPercent?: ExpressionOrValue<number> | undefined;
  /**
   * Determines whether the ThroughputPolicy is active or not
   */
  isEnabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Cosmos DB resource throughput policy
 */
export type ThroughputPolicyResourceView = ThroughputPolicyResourceInput;

export const throughputPolicyResourceShape: FlatModelShape = createFlatModelShape({
  incrementPercent: { armPath: ["incrementPercent"], value: createNumberShape() },
  isEnabled: { armPath: ["isEnabled"], value: createBooleanShape() },
});

/**
 * The properties of an Azure Cosmos DB resource throughput
 */
export interface ThroughputSettingsGetProperties {
  /**
   * The standard JSON format of a resource throughput
   */
  resource: ThroughputSettingsGetPropertiesResource;
}

/**
 * Input type for The properties of an Azure Cosmos DB resource throughput
 */
export interface ThroughputSettingsGetPropertiesInput extends InputOf<ThroughputSettingsGetProperties> {
  /**
   * The standard JSON format of a resource throughput
   */
  resource: ThroughputSettingsGetPropertiesResourceInput;
}

/**
 * View type for The properties of an Azure Cosmos DB resource throughput
 */
export interface ThroughputSettingsGetPropertiesView extends InputOf<ThroughputSettingsGetProperties> {
  /**
   * The standard JSON format of a resource throughput
   */
  resource: ThroughputSettingsGetPropertiesResourceView;
}

export const throughputSettingsGetPropertiesShape: FlatModelShape = createFlatModelShape({
  resource: {
    armPath: ["resource"],
    value: createDeferredShape(() => throughputSettingsGetPropertiesResourceShape),
  },
});

/**
 * Cosmos DB resource throughput object. Either throughput is required or autoscaleSettings is required, but not both.
 */
export interface ThroughputSettingsGetPropertiesResource {
  /**
   * A system generated property representing the resource etag required for optimistic concurrency control.
   */
  _etag?: string;
  /**
   * A system generated property. A unique identifier.
   */
  _rid?: string;
  /**
   * A system generated property that denotes the last updated timestamp of the resource.
   */
  _ts?: number;
  /**
   * Cosmos DB resource for autoscale settings. Either throughput is required or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsResource;
  /**
   * The offer throughput value to instantly scale up without triggering splits
   */
  instantMaximumThroughput?: string;
  /**
   * The minimum throughput of the resource
   */
  minimumThroughput?: string;
  /**
   * The throughput replace is pending
   */
  offerReplacePending?: string;
  /**
   * The maximum throughput value or the maximum maxThroughput value (for autoscale) that can be specified
   */
  softAllowedMaximumThroughput?: string;
  /**
   * Value of the Cosmos DB resource throughput. Either throughput is required or autoscaleSettings is required, but not both.
   */
  throughput?: number;
}

/**
 * Input type for Cosmos DB resource throughput object. Either throughput is required or autoscaleSettings is required, but not both.
 */
export interface ThroughputSettingsGetPropertiesResourceInput extends InputOf<ThroughputSettingsGetPropertiesResource> {
  /**
   * Cosmos DB resource for autoscale settings. Either throughput is required or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsResourceInput | undefined;
  /**
   * Value of the Cosmos DB resource throughput. Either throughput is required or autoscaleSettings is required, but not both.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Cosmos DB resource throughput object. Either throughput is required or autoscaleSettings is required, but not both.
 */
export interface ThroughputSettingsGetPropertiesResourceView extends InputOf<ThroughputSettingsGetPropertiesResource> {
  /**
   * Read-only output: A system generated property representing the resource etag required for optimistic concurrency control.
   */
  readonly _etag?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property. A unique identifier.
   */
  readonly _rid?: Expression<string> | undefined;
  /**
   * Read-only output: A system generated property that denotes the last updated timestamp of the resource.
   */
  readonly _ts?: Expression<number> | undefined;
  /**
   * Cosmos DB resource for autoscale settings. Either throughput is required or autoscaleSettings is required, but not both.
   */
  autoscaleSettings?: AutoscaleSettingsResourceView | undefined;
  /**
   * Read-only output: The offer throughput value to instantly scale up without triggering splits
   */
  readonly instantMaximumThroughput?: Expression<string> | undefined;
  /**
   * Read-only output: The minimum throughput of the resource
   */
  readonly minimumThroughput?: Expression<string> | undefined;
  /**
   * Read-only output: The throughput replace is pending
   */
  readonly offerReplacePending?: Expression<string> | undefined;
  /**
   * Read-only output: The maximum throughput value or the maximum maxThroughput value (for autoscale) that can be specified
   */
  readonly softAllowedMaximumThroughput?: Expression<string> | undefined;
  /**
   * Value of the Cosmos DB resource throughput. Either throughput is required or autoscaleSettings is required, but not both.
   */
  throughput?: ExpressionOrValue<number> | undefined;
}

export const throughputSettingsGetPropertiesResourceShape: FlatModelShape = createFlatModelShape({
  _etag: { armPath: ["_etag"], value: createStringShape(), readOnly: true },
  _rid: { armPath: ["_rid"], value: createStringShape(), readOnly: true },
  _ts: { armPath: ["_ts"], value: createNumberShape(), readOnly: true },
  autoscaleSettings: {
    armPath: ["autoscaleSettings"],
    value: createDeferredShape(() => autoscaleSettingsResourceShape),
  },
  instantMaximumThroughput: {
    armPath: ["instantMaximumThroughput"],
    value: createStringShape(),
    readOnly: true,
  },
  minimumThroughput: { armPath: ["minimumThroughput"], value: createStringShape(), readOnly: true },
  offerReplacePending: {
    armPath: ["offerReplacePending"],
    value: createStringShape(),
    readOnly: true,
  },
  softAllowedMaximumThroughput: {
    armPath: ["softAllowedMaximumThroughput"],
    value: createStringShape(),
    readOnly: true,
  },
  throughput: { armPath: ["throughput"], value: createNumberShape() },
});

/**
 * The unique key on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service.
 */
export interface UniqueKey {
  /**
   * List of paths must be unique for each document in the Azure Cosmos DB service
   */
  paths?: string[];
}

/**
 * Input type for The unique key on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service.
 */
export interface UniqueKeyInput extends InputOf<UniqueKey> {
  /**
   * List of paths must be unique for each document in the Azure Cosmos DB service
   */
  paths?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for The unique key on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service.
 */
export type UniqueKeyView = UniqueKeyInput;

export const uniqueKeyShape: FlatModelShape = createFlatModelShape({
  paths: { armPath: ["paths"], value: createArrayShape(createStringShape()) },
});

/**
 * The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
 */
export interface UniqueKeyPolicy {
  /**
   * List of unique keys on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeys?: UniqueKey[];
}

/**
 * Input type for The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
 */
export interface UniqueKeyPolicyInput extends InputOf<UniqueKeyPolicy> {
  /**
   * List of unique keys on that enforces uniqueness constraint on documents in the collection in the Azure Cosmos DB service.
   */
  uniqueKeys?: InputArray<UniqueKeyInput, UniqueKey[]> | undefined;
}

/**
 * View type for The unique key policy configuration for specifying uniqueness constraints on documents in the collection in the Azure Cosmos DB service.
 */
export type UniqueKeyPolicyView = UniqueKeyPolicyInput;

export const uniqueKeyPolicyShape: FlatModelShape = createFlatModelShape({
  uniqueKeys: {
    armPath: ["uniqueKeys"],
    value: createArrayShape(createDeferredShape(() => uniqueKeyShape)),
  },
});

/**
 * Represents a vector embedding. A vector embedding is used to define a vector field in the documents.
 */
export interface VectorEmbedding {
  /**
   * Indicates the data type of vector.
   */
  dataType: VectorDataType;
  /**
   * The number of dimensions in the vector.
   */
  dimensions: number;
  /**
   * The distance function to use for distance calculation in between vectors.
   */
  distanceFunction: DistanceFunction;
  /**
   * The path to the vector field in the document.
   */
  path: string;
}

/**
 * Input type for Represents a vector embedding. A vector embedding is used to define a vector field in the documents.
 */
export interface VectorEmbeddingInput extends InputOf<VectorEmbedding> {
  /**
   * Indicates the data type of vector.
   */
  dataType: ExpressionOrValue<VectorDataType>;
  /**
   * The number of dimensions in the vector.
   */
  dimensions: ExpressionOrValue<number>;
  /**
   * The distance function to use for distance calculation in between vectors.
   */
  distanceFunction: ExpressionOrValue<DistanceFunction>;
  /**
   * The path to the vector field in the document.
   */
  path: ExpressionOrValue<string>;
}

/**
 * View type for Represents a vector embedding. A vector embedding is used to define a vector field in the documents.
 */
export type VectorEmbeddingView = VectorEmbeddingInput;

export const vectorEmbeddingShape: FlatModelShape = createFlatModelShape({
  dataType: { armPath: ["dataType"], value: createUnionShape() },
  dimensions: { armPath: ["dimensions"], value: createNumberShape() },
  distanceFunction: { armPath: ["distanceFunction"], value: createUnionShape() },
  path: { armPath: ["path"], value: createStringShape() },
});

/**
 * Cosmos DB Vector Embedding Policy
 */
export interface VectorEmbeddingPolicy {
  /**
   * List of vector embeddings
   */
  vectorEmbeddings?: VectorEmbedding[];
}

/**
 * Input type for Cosmos DB Vector Embedding Policy
 */
export interface VectorEmbeddingPolicyInput extends InputOf<VectorEmbeddingPolicy> {
  /**
   * List of vector embeddings
   */
  vectorEmbeddings?: InputArray<VectorEmbeddingInput, VectorEmbedding[]> | undefined;
}

/**
 * View type for Cosmos DB Vector Embedding Policy
 */
export type VectorEmbeddingPolicyView = VectorEmbeddingPolicyInput;

export const vectorEmbeddingPolicyShape: FlatModelShape = createFlatModelShape({
  vectorEmbeddings: {
    armPath: ["vectorEmbeddings"],
    value: createArrayShape(createDeferredShape(() => vectorEmbeddingShape)),
  },
});

export interface VectorIndex {
  /**
   * This is the size of the candidate list of approximate neighbors stored while building the DiskANN index as part of the optimization processes. Large values may improve recall at the expense of latency. This is only applicable for the diskANN vector index type.
   */
  indexingSearchListSize?: number;
  /**
   * The path to the vector field in the document.
   */
  path: string;
  /**
   * The number of bytes used in product quantization of the vectors. A larger value may result in better recall for vector searches at the expense of latency. This is only applicable for the quantizedFlat and diskANN vector index types.
   */
  quantizationByteSize?: number;
  /**
   * The index type of the vector. Currently, flat, diskANN, and quantizedFlat are supported.
   */
  type: VectorIndexType;
  /**
   * Array of shard keys for the vector index. This is only applicable for the quantizedFlat and diskANN vector index types.
   */
  vectorIndexShardKey?: string[];
}

export interface VectorIndexInput extends InputOf<VectorIndex> {
  /**
   * This is the size of the candidate list of approximate neighbors stored while building the DiskANN index as part of the optimization processes. Large values may improve recall at the expense of latency. This is only applicable for the diskANN vector index type.
   */
  indexingSearchListSize?: ExpressionOrValue<number> | undefined;
  /**
   * The path to the vector field in the document.
   */
  path: ExpressionOrValue<string>;
  /**
   * The number of bytes used in product quantization of the vectors. A larger value may result in better recall for vector searches at the expense of latency. This is only applicable for the quantizedFlat and diskANN vector index types.
   */
  quantizationByteSize?: ExpressionOrValue<number> | undefined;
  /**
   * The index type of the vector. Currently, flat, diskANN, and quantizedFlat are supported.
   */
  type: ExpressionOrValue<VectorIndexType>;
  /**
   * Array of shard keys for the vector index. This is only applicable for the quantizedFlat and diskANN vector index types.
   */
  vectorIndexShardKey?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

export type VectorIndexView = VectorIndexInput;

export const vectorIndexShape: FlatModelShape = createFlatModelShape({
  indexingSearchListSize: { armPath: ["indexingSearchListSize"], value: createNumberShape() },
  path: { armPath: ["path"], value: createStringShape() },
  quantizationByteSize: { armPath: ["quantizationByteSize"], value: createNumberShape() },
  type: { armPath: ["type"], value: createUnionShape() },
  vectorIndexShardKey: {
    armPath: ["vectorIndexShardKey"],
    value: createArrayShape(createStringShape()),
  },
});

/**
 * Virtual Network ACL Rule object
 */
export interface VirtualNetworkRule {
  /**
   * Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}.
   */
  id?: string;
  /**
   * Create firewall rule before the virtual network has vnet service endpoint enabled.
   */
  ignoreMissingVNetServiceEndpoint?: boolean;
}

/**
 * Input type for Virtual Network ACL Rule object
 */
export interface VirtualNetworkRuleInput extends InputOf<VirtualNetworkRule> {
  /**
   * Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}.
   */
  id?: ExpressionOrValue<string> | undefined;
  /**
   * Create firewall rule before the virtual network has vnet service endpoint enabled.
   */
  ignoreMissingVNetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Virtual Network ACL Rule object
 */
export type VirtualNetworkRuleView = VirtualNetworkRuleInput;

export const virtualNetworkRuleShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
  ignoreMissingVNetServiceEndpoint: {
    armPath: ["ignoreMissingVNetServiceEndpoint"],
    value: createBooleanShape(),
  },
});

/**
 * Describes the types of schema for analytical storage.
 *
 * Known values:
 *
 * - `"WellDefined"`
 *
 * - `"FullFidelity"`
 */
export type AnalyticalStorageSchemaType = string;

/**
 * Enum to indicate the API type of the restorable database account.
 *
 * Known values:
 *
 * - `"MongoDB"`
 *
 * - `"Gremlin"`
 *
 * - `"Cassandra"`
 *
 * - `"Table"`
 *
 * - `"Sql"`
 *
 * - `"GremlinV2"`
 */
export type ApiType = string;

/**
 * Which authentication method Cassandra should use to authenticate clients. 'None' turns off authentication, so should not be used except in emergencies. 'Cassandra' is the default password based authentication. The default is 'Cassandra'.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"Cassandra"`
 *
 * - `"Ldap"`
 */
export type AuthenticationMethod = string;

/**
 * The form of AutoReplicate that is being used by this cluster.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"SystemKeyspaces"`
 *
 * - `"AllKeyspaces"`
 */
export type AutoReplicate = string;

/**
 * How to connect to the azure services needed for running the cluster
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"VPN"`
 */
export type AzureConnectionType = string;

/**
 * Describes the status of migration between backup policy types.
 *
 * Known values:
 *
 * - `"Invalid"`
 *
 * - `"InProgress"`
 *
 * - `"Completed"`
 *
 * - `"Failed"`
 */
export type BackupPolicyMigrationStatus = string;

/**
 * Describes the mode of backups.
 *
 * Known values:
 *
 * - `"Periodic"`
 *
 * - `"Continuous"`
 */
export type BackupPolicyType = string;

/**
 * Enum to indicate type of backup storage redundancy.
 *
 * Known values:
 *
 * - `"Geo"`
 *
 * - `"Local"`
 *
 * - `"Zone"`
 */
export type BackupStorageRedundancy = string;

/**
 * Sort order for composite paths.
 *
 * Known values:
 *
 * - `"ascending"`
 *
 * - `"descending"`
 */
export type CompositePathSortOrder = string;

/**
 * Indicates the conflict resolution mode.
 *
 * Known values:
 *
 * - `"LastWriterWins"`
 *
 * - `"Custom"`
 */
export type ConflictResolutionMode = string;

/**
 * The cassandra connector offer type for the Cosmos DB C* database account.
 *
 * Known values:
 *
 * - `"Small"`
 */
export type ConnectorOffer = string;

/**
 * Enum to indicate type of Continuous backup tier.
 *
 * Known values:
 *
 * - `"Continuous7Days"`
 *
 * - `"Continuous30Days"`
 */
export type ContinuousTier = string;

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
 * Enum to indicate the mode of account creation.
 *
 * Known values:
 *
 * - `"Default"`
 *
 * - `"Restore"`
 */
export type CreateMode = string;

/**
 * Indicates the type of database account. This can only be set at database account creation.
 *
 * Known values:
 *
 * - `"GlobalDocumentDB"`
 *
 * - `"MongoDB"`
 *
 * - `"Parse"`
 */
export type DatabaseAccountKind = string;

/**
 * The datatype for which the indexing behavior is applied to.
 *
 * Known values:
 *
 * - `"String"`
 *
 * - `"Number"`
 *
 * - `"Point"`
 *
 * - `"Polygon"`
 *
 * - `"LineString"`
 *
 * - `"MultiPolygon"`
 */
export type DataType = string;

/**
 * DedicatedGatewayType for the service.
 *
 * Known values:
 *
 * - `"IntegratedCache"`
 *
 * - `"DistributedQuery"`
 */
export type DedicatedGatewayType = string;

/**
 * Enum to indicate default priorityLevel of requests
 *
 * Known values:
 *
 * - `"High"`
 *
 * - `"Low"`
 */
export type DefaultPriorityLevel = string;

/**
 * The distance function to use for distance calculation in between vectors.
 *
 * Known values:
 *
 * - `"euclidean"`
 *
 * - `"cosine"`
 *
 * - `"dotproduct"`
 */
export type DistanceFunction = string;

/**
 * The kind of API this fleetspace belongs to. Acceptable values: 'NoSQL'
 *
 * Known values:
 *
 * - `"NoSQL"`
 */
export type FleetspacePropertiesFleetspaceApiKind = string;

/**
 * Service Tier for the fleetspace. GeneralPurpose types refers to single write region accounts that can be added to this fleetspace, whereas BusinessCritical refers to multi write region.
 *
 * Known values:
 *
 * - `"GeneralPurpose"`
 *
 * - `"BusinessCritical"`
 */
export type FleetspacePropertiesServiceTier = string;

/**
 * Indicates the indexing mode.
 *
 * Known values:
 *
 * - `"consistent"`
 *
 * - `"lazy"`
 *
 * - `"none"`
 */
export type IndexingMode = string;

/**
 * Indicates the type of index.
 *
 * Known values:
 *
 * - `"Hash"`
 *
 * - `"Range"`
 *
 * - `"Spatial"`
 */
export type IndexKind = string;

/**
 * The status of the resource at the time the operation was called.
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
 * - `"Failed"`
 *
 * - `"Canceled"`
 */
export type ManagedCassandraProvisioningState = string;

/**
 * The type of the resource.
 *
 * Known values:
 *
 * - `"SystemAssigned"`
 *
 * - `"None"`
 */
export type ManagedCassandraResourceIdentityType = string;

/**
 * Indicates the minimum allowed Tls version. The default is Tls 1.0, except for Cassandra and Mongo API's, which only work with Tls 1.2.
 *
 * Known values:
 *
 * - `"Tls"`
 *
 * - `"Tls11"`
 *
 * - `"Tls12"`
 */
export type MinimalTlsVersion = string;

/**
 * Known values:
 *
 * - `"default"`
 */
export type NotebookWorkspaceName = string;

/**
 * Indicates the kind of algorithm used for partitioning. For MultiHash, multiple partition keys (upto three maximum) are supported for container create
 *
 * Known values:
 *
 * - `"Hash"`
 *
 * - `"Range"`
 *
 * - `"MultiHash"`
 */
export type PartitionKind = string;

/**
 * Whether requests from Public Network are allowed
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
 * Describes the mode of the restore.
 *
 * Known values:
 *
 * - `"PointInTime"`
 */
export type RestoreMode = string;

/**
 * How the nodes in the cluster react to scheduled events
 *
 * Known values:
 *
 * - `"Ignore"`
 *
 * - `"StopAny"`
 *
 * - `"StopByRack"`
 */
export type ScheduledEventStrategy = string;

/**
 * Describes the version of the MongoDB account.
 *
 * Known values:
 *
 * - `"3.2"`
 *
 * - `"3.6"`
 *
 * - `"4.0"`
 *
 * - `"4.2"`
 *
 * - `"5.0"`
 *
 * - `"6.0"`
 *
 * - `"7.0"`
 */
export type ServerVersion = string;

/**
 * Instance type for the service.
 *
 * Known values:
 *
 * - `"Cosmos.D4s"`
 *
 * - `"Cosmos.D8s"`
 *
 * - `"Cosmos.D16s"`
 */
export type ServiceSize = string;

/**
 * Describes the status of a service.
 *
 * Known values:
 *
 * - `"Creating"`
 *
 * - `"Running"`
 *
 * - `"Updating"`
 *
 * - `"Deleting"`
 *
 * - `"Error"`
 *
 * - `"Stopped"`
 */
export type ServiceStatus = string;

/**
 * Indicates the spatial type of index.
 *
 * Known values:
 *
 * - `"Point"`
 *
 * - `"LineString"`
 *
 * - `"Polygon"`
 *
 * - `"MultiPolygon"`
 */
export type SpatialType = string;

/**
 * Enum to indicate current buildout status of the region.
 *
 * Known values:
 *
 * - `"Uninitialized"`
 *
 * - `"Initializing"`
 *
 * - `"InternallyReady"`
 *
 * - `"Online"`
 *
 * - `"Deleting"`
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 *
 * - `"Canceled"`
 *
 * - `"Updating"`
 *
 * - `"Creating"`
 */
export type Status = string;

/**
 * The operation the trigger is associated with
 *
 * Known values:
 *
 * - `"All"`
 *
 * - `"Create"`
 *
 * - `"Update"`
 *
 * - `"Delete"`
 *
 * - `"Replace"`
 */
export type TriggerOperation = string;

/**
 * Type of the Trigger
 *
 * Known values:
 *
 * - `"Pre"`
 *
 * - `"Post"`
 */
export type TriggerType = string;

/**
 * Indicates the data type of vector.
 *
 * Known values:
 *
 * - `"float32"`
 *
 * - `"uint8"`
 *
 * - `"int8"`
 *
 * - `"float16"`
 */
export type VectorDataType = string;

/**
 * The index type of the vector. Currently, flat, diskANN, and quantizedFlat are supported.
 *
 * Known values:
 *
 * - `"flat"`
 *
 * - `"diskANN"`
 *
 * - `"quantizedFlat"`
 */
export type VectorIndexType = string;
