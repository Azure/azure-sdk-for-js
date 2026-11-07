// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ExistingResourceProps,
  type Expression,
  type ExpressionOrValue,
  type ProvisioningComponent,
  Resource,
  type ResourceOptions,
} from "@azure/provisioning-core";
import {
  createAnyShape,
  createDeferredShape,
  createEnumShape,
  createFlatModelShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
  type SingletonExistingResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type AdministratorName,
  type AdministratorPropertiesInput,
  administratorPropertiesShape,
  type AdministratorPropertiesView,
  type AdvancedThreatProtectionName,
  type AdvancedThreatProtectionPropertiesInput,
  advancedThreatProtectionPropertiesShape,
  type AdvancedThreatProtectionPropertiesView,
  type AdvisorProperties,
  advisorPropertiesShape,
  type AuthenticationName,
  type AutomaticTuningServerProperties,
  automaticTuningServerPropertiesShape,
  type AzureAdOnlyAuthPropertiesInput,
  azureAdOnlyAuthPropertiesShape,
  type AzureAdOnlyAuthPropertiesView,
  type BackupShortTermRetentionPolicyPropertiesInput,
  backupShortTermRetentionPolicyPropertiesShape,
  type BackupShortTermRetentionPolicyPropertiesView,
  type BaselineName,
  type BlobAuditingPolicyName,
  type ConnectionPolicyName,
  type CurrentSensitivityLabelSource,
  type DatabaseAutomaticTuningProperties,
  databaseAutomaticTuningPropertiesShape,
  type DatabaseBlobAuditingPolicyPropertiesInput,
  databaseBlobAuditingPolicyPropertiesShape,
  type DatabaseBlobAuditingPolicyPropertiesView,
  type DatabaseColumnProperties,
  databaseColumnPropertiesShape,
  type DatabaseExtensionsPropertiesInput,
  databaseExtensionsPropertiesShape,
  type DatabaseExtensionsPropertiesView,
  type DatabaseIdentityInput,
  databaseIdentityShape,
  type DatabaseIdentityView,
  type DatabasePropertiesInput,
  databasePropertiesShape,
  type DatabasePropertiesView,
  type DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesInput,
  databaseSqlVulnerabilityAssessmentBaselineSetPropertiesShape,
  type DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesView,
  type DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput,
  databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesShape,
  type DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesView,
  type DatabaseTableProperties,
  databaseTablePropertiesShape,
  type DatabaseVulnerabilityAssessmentPropertiesInput,
  databaseVulnerabilityAssessmentPropertiesShape,
  type DatabaseVulnerabilityAssessmentPropertiesView,
  type DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput,
  databaseVulnerabilityAssessmentRuleBaselinePropertiesShape,
  type DatabaseVulnerabilityAssessmentRuleBaselinePropertiesView,
  type DataMaskingPolicyName,
  type DataMaskingPolicyPropertiesInput,
  dataMaskingPolicyPropertiesShape,
  type DataMaskingPolicyPropertiesView,
  type DataMaskingRulePropertiesInput,
  dataMaskingRulePropertiesShape,
  type DataMaskingRulePropertiesView,
  type DataWarehouseUserActivitiesProperties,
  dataWarehouseUserActivitiesPropertiesShape,
  type DataWarehouseUserActivityName,
  type DevOpsAuditingSettingsName,
  type ElasticPoolPropertiesInput,
  elasticPoolPropertiesShape,
  type ElasticPoolPropertiesView,
  type EncryptionProtectorName,
  type EncryptionProtectorPropertiesInput,
  encryptionProtectorPropertiesShape,
  type EncryptionProtectorPropertiesView,
  type ExtendedDatabaseBlobAuditingPolicyPropertiesInput,
  extendedDatabaseBlobAuditingPolicyPropertiesShape,
  type ExtendedDatabaseBlobAuditingPolicyPropertiesView,
  type ExtendedServerBlobAuditingPolicyPropertiesInput,
  extendedServerBlobAuditingPolicyPropertiesShape,
  type ExtendedServerBlobAuditingPolicyPropertiesView,
  type FailoverGroupPropertiesInput,
  failoverGroupPropertiesShape,
  type FailoverGroupPropertiesView,
  type GeoBackupPolicyName,
  type GeoBackupPolicyPropertiesInput,
  geoBackupPolicyPropertiesShape,
  type GeoBackupPolicyPropertiesView,
  type IPv6ServerFirewallRulePropertiesInput,
  iPv6ServerFirewallRulePropertiesShape,
  type IPv6ServerFirewallRulePropertiesView,
  type JobAgentIdentityInput,
  jobAgentIdentityShape,
  type JobAgentIdentityView,
  type JobAgentPropertiesInput,
  jobAgentPropertiesShape,
  type JobAgentPropertiesView,
  type JobCredentialPropertiesInput,
  jobCredentialPropertiesShape,
  type JobCredentialPropertiesView,
  type JobExecutionProperties,
  jobExecutionPropertiesShape,
  type JobPrivateEndpointPropertiesInput,
  jobPrivateEndpointPropertiesShape,
  type JobPrivateEndpointPropertiesView,
  type JobPropertiesInput,
  jobPropertiesShape,
  type JobPropertiesView,
  type JobStepProperties,
  type JobStepPropertiesInput,
  jobStepPropertiesShape,
  type JobStepPropertiesView,
  type JobTargetGroupPropertiesInput,
  jobTargetGroupPropertiesShape,
  type JobTargetGroupPropertiesView,
  type LedgerDigestUploadsName,
  type LedgerDigestUploadsPropertiesInput,
  ledgerDigestUploadsPropertiesShape,
  type LedgerDigestUploadsPropertiesView,
  type LongTermRetentionPolicyName,
  type LongTermRetentionPolicyPropertiesInput,
  longTermRetentionPolicyPropertiesShape,
  type LongTermRetentionPolicyPropertiesView,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type OutboundFirewallRuleProperties,
  outboundFirewallRulePropertiesShape,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type PrivateLinkResourceProperties,
  privateLinkResourcePropertiesShape,
  type RecommendedActionProperties,
  recommendedActionPropertiesShape,
  type RecoverableDatabaseProperties,
  recoverableDatabasePropertiesShape,
  type ReplicationLinkPropertiesInput,
  replicationLinkPropertiesShape,
  type ReplicationLinkPropertiesView,
  type ResourceIdentityInput,
  resourceIdentityShape,
  type ResourceIdentityView,
  type RestorableDroppedDatabaseProperties,
  restorableDroppedDatabasePropertiesShape,
  type RestorePointProperties,
  restorePointPropertiesShape,
  type SecurityAlertPolicyName,
  type SecurityAlertsPolicyPropertiesInput,
  securityAlertsPolicyPropertiesShape,
  type SecurityAlertsPolicyPropertiesView,
  type SensitivityLabelPropertiesInput,
  sensitivityLabelPropertiesShape,
  type SensitivityLabelPropertiesView,
  type ServerBlobAuditingPolicyPropertiesInput,
  serverBlobAuditingPolicyPropertiesShape,
  type ServerBlobAuditingPolicyPropertiesView,
  type ServerConnectionPolicyPropertiesInput,
  serverConnectionPolicyPropertiesShape,
  type ServerConnectionPolicyPropertiesView,
  type ServerDevOpsAuditSettingsPropertiesInput,
  serverDevOpsAuditSettingsPropertiesShape,
  type ServerDevOpsAuditSettingsPropertiesView,
  type ServerDnsAliasProperties,
  serverDnsAliasPropertiesShape,
  type ServerFirewallRulePropertiesInput,
  serverFirewallRulePropertiesShape,
  type ServerFirewallRulePropertiesView,
  type ServerKeyPropertiesInput,
  serverKeyPropertiesShape,
  type ServerKeyPropertiesView,
  type ServerPropertiesInput,
  serverPropertiesShape,
  type ServerPropertiesView,
  type ServerVulnerabilityAssessmentPropertiesInput,
  serverVulnerabilityAssessmentPropertiesShape,
  type ServerVulnerabilityAssessmentPropertiesView,
  type ShortTermRetentionPolicyName,
  type Sku,
  type SkuInput,
  skuShape,
  type SkuView,
  type SqlVulnerabilityAssessmentName,
  type SqlVulnerabilityAssessmentPolicyProperties,
  type SqlVulnerabilityAssessmentPolicyPropertiesInput,
  sqlVulnerabilityAssessmentPolicyPropertiesShape,
  type SqlVulnerabilityAssessmentPolicyPropertiesView,
  type SqlVulnerabilityAssessmentScanRecordProperties,
  sqlVulnerabilityAssessmentScanRecordPropertiesShape,
  type SqlVulnerabilityAssessmentScanResultProperties,
  sqlVulnerabilityAssessmentScanResultPropertiesShape,
  type SyncAgentPropertiesInput,
  syncAgentPropertiesShape,
  type SyncAgentPropertiesView,
  type SyncGroupPropertiesInput,
  syncGroupPropertiesShape,
  type SyncGroupPropertiesView,
  type SyncMemberPropertiesInput,
  syncMemberPropertiesShape,
  type SyncMemberPropertiesView,
  type TransparentDataEncryptionName,
  type TransparentDataEncryptionPropertiesInput,
  transparentDataEncryptionPropertiesShape,
  type TransparentDataEncryptionPropertiesView,
  type VirtualNetworkRulePropertiesInput,
  virtualNetworkRulePropertiesShape,
  type VirtualNetworkRulePropertiesView,
  type VulnerabilityAssessmentName,
  type VulnerabilityAssessmentPolicyBaselineName,
  type VulnerabilityAssessmentScanRecordProperties,
  vulnerabilityAssessmentScanRecordPropertiesShape,
  type WorkloadClassifierPropertiesInput,
  workloadClassifierPropertiesShape,
  type WorkloadClassifierPropertiesView,
  type WorkloadGroupPropertiesInput,
  workloadGroupPropertiesShape,
  type WorkloadGroupPropertiesView,
} from "./types.js";

const API_VERSION = "2025-01-01";

export interface ServerProps {
  /**
   * The Azure Active Directory identity of the server.
   */
  identity?: ResourceIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the server.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ServerAdministratorProps {
  /**
   * The name of server active directory administrator.
   */
  name?: ExpressionOrValue<AdministratorName> | undefined;
  /**
   * Resource properties.
   */
  properties?: AdministratorPropertiesInput | undefined;
}

/**
 * Azure Active Directory administrator.
 */
export class ServerAdministrator extends Resource<"Microsoft.Sql/servers/administrators"> {
  static resourceType = "Microsoft.Sql/servers/administrators" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "a",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => administratorPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerAdministratorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/administrators"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerAdministrator.resourceType,
      apiVersion: ServerAdministrator.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerAdministratorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerAdministrator.buildResourceProps(props), options);
  }

  /**
   * The name of server active directory administrator.
   */
  get name(): Expression<AdministratorName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<AdministratorName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): AdministratorPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AdministratorPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ServerAdvancedThreatProtectionProps {
  /**
   * The name of the Advanced Threat Protection state.
   */
  name?: ExpressionOrValue<AdvancedThreatProtectionName> | undefined;
  /**
   * Resource properties.
   */
  properties?: AdvancedThreatProtectionPropertiesInput | undefined;
}

/**
 * A server Advanced Threat Protection.
 */
export class ServerAdvancedThreatProtection extends Resource<"Microsoft.Sql/servers/advancedThreatProtectionSettings"> {
  static resourceType = "Microsoft.Sql/servers/advancedThreatProtectionSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "atps",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => advancedThreatProtectionPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/advancedThreatProtectionSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServerAdvancedThreatProtection.resourceType,
      apiVersion: ServerAdvancedThreatProtection.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerAdvancedThreatProtection.buildResourceProps(props), options);
  }

  /**
   * The name of the Advanced Threat Protection state.
   */
  get name(): Expression<AdvancedThreatProtectionName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<AdvancedThreatProtectionName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): AdvancedThreatProtectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AdvancedThreatProtectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Database, Server or Elastic Pool Advisor.
 */
export class SqlServerAdvisor extends Resource<"Microsoft.Sql/servers/advisors"> {
  static resourceType = "Microsoft.Sql/servers/advisors" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "a",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => advisorPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/advisors"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlServerAdvisor.resourceType,
      apiVersion: SqlServerAdvisor.apiVersion,
    };
  }

  constructor(
    context: Server,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlServerAdvisor.buildResourceProps(props), options);
  }

  /**
   * Resource kind.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the Database Advisor.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<AdvisorProperties> {
    return this.expr("properties") as any;
  }
}

export interface SqlServerBlobAuditingPolicyProps {
  name: ExpressionOrValue<BlobAuditingPolicyName>;
  /**
   * Resource properties.
   */
  properties?: ServerBlobAuditingPolicyPropertiesInput | undefined;
}

/**
 * A server blob auditing policy.
 */
export class SqlServerBlobAuditingPolicy extends Resource<"Microsoft.Sql/servers/auditingSettings"> {
  static resourceType = "Microsoft.Sql/servers/auditingSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "as",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverBlobAuditingPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlServerBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/auditingSettings"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlServerBlobAuditingPolicy.resourceType,
      apiVersion: SqlServerBlobAuditingPolicy.apiVersion,
    };
  }

  constructor(
    context: Server,
    props:
      | (SqlServerBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlServerBlobAuditingPolicy.buildResourceProps(props), options);
  }

  get name(): Expression<BlobAuditingPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<BlobAuditingPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerBlobAuditingPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerBlobAuditingPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Server-level Automatic Tuning.
 */
export class ServerAutomaticTuning extends Resource<"Microsoft.Sql/servers/automaticTuning"> {
  static resourceType = "Microsoft.Sql/servers/automaticTuning" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => automaticTuningServerPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: SingletonExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/automaticTuning"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerAutomaticTuning.resourceType,
      apiVersion: ServerAutomaticTuning.apiVersion,
      name: "current",
    };
  }

  constructor(
    context: Server,
    props: SingletonExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ServerAutomaticTuning.buildResourceProps(props), options);
  }

  get name(): Expression<"current"> {
    return this.expr("name");
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<AutomaticTuningServerProperties> {
    return this.expr("properties") as any;
  }
}

export interface ServerAzureAdOnlyAuthenticationProps {
  /**
   * The name of server azure active directory only authentication.
   */
  name?: ExpressionOrValue<AuthenticationName> | undefined;
  /**
   * Resource properties.
   */
  properties?: AzureAdOnlyAuthPropertiesInput | undefined;
}

/**
 * Azure Active Directory only authentication.
 */
export class ServerAzureAdOnlyAuthentication extends Resource<"Microsoft.Sql/servers/azureADOnlyAuthentications"> {
  static resourceType = "Microsoft.Sql/servers/azureADOnlyAuthentications" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "aaa",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => azureAdOnlyAuthPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerAzureAdOnlyAuthenticationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/azureADOnlyAuthentications"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerAzureAdOnlyAuthentication.resourceType,
      apiVersion: ServerAzureAdOnlyAuthentication.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerAzureAdOnlyAuthenticationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerAzureAdOnlyAuthentication.buildResourceProps(props), options);
  }

  /**
   * The name of server azure active directory only authentication.
   */
  get name(): Expression<AuthenticationName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<AuthenticationName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): AzureAdOnlyAuthPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AzureAdOnlyAuthPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ConnectionPolicyProps {
  /**
   * The name of the connection policy.
   */
  name?: ExpressionOrValue<ConnectionPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerConnectionPolicyPropertiesInput | undefined;
}

/**
 * A server connection policy
 */
export class ConnectionPolicy extends Resource<"Microsoft.Sql/servers/connectionPolicies"> {
  static resourceType = "Microsoft.Sql/servers/connectionPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverConnectionPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (ConnectionPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/connectionPolicies"> & Record<string, unknown> {
    return {
      ...props,
      type: ConnectionPolicy.resourceType,
      apiVersion: ConnectionPolicy.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (ConnectionPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ConnectionPolicy.buildResourceProps(props), options);
  }

  /**
   * Metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the connection policy.
   */
  get name(): Expression<ConnectionPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ConnectionPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerConnectionPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerConnectionPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ServerDatabaseProps {
  /**
   * The Azure Active Directory identity of the database.
   */
  identity?: DatabaseIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the database.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: DatabasePropertiesInput | undefined;
  /**
   * The database SKU.
   *
   * The list of SKUs may vary by region and support offer. To determine the SKUs (including the SKU name, tier/edition, family, and capacity) that are available to your subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or one of the following commands:
   *
   * ```azurecli
   * az sql db list-editions -l <location> -o table
   * ```
   *
   * ```powershell
   * Get-AzSqlServerServiceObjective -Location <location>
   * ```
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface DatabaseAdvancedThreatProtectionProps {
  /**
   * The name of the Advanced Threat Protection state.
   */
  name?: ExpressionOrValue<AdvancedThreatProtectionName> | undefined;
  /**
   * Resource properties.
   */
  properties?: AdvancedThreatProtectionPropertiesInput | undefined;
}

/**
 * A database Advanced Threat Protection.
 */
export class DatabaseAdvancedThreatProtection extends Resource<"Microsoft.Sql/servers/databases/advancedThreatProtectionSettings"> {
  static resourceType = "Microsoft.Sql/servers/databases/advancedThreatProtectionSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "atps",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => advancedThreatProtectionPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (DatabaseAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/advancedThreatProtectionSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DatabaseAdvancedThreatProtection.resourceType,
      apiVersion: DatabaseAdvancedThreatProtection.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (DatabaseAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DatabaseAdvancedThreatProtection.buildResourceProps(props), options);
  }

  /**
   * The name of the Advanced Threat Protection state.
   */
  get name(): Expression<AdvancedThreatProtectionName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<AdvancedThreatProtectionName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): AdvancedThreatProtectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: AdvancedThreatProtectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Database, Server or Elastic Pool Recommended Action.
 */
export class RecommendedAction extends Resource<"Microsoft.Sql/servers/databases/advisors/recommendedActions"> {
  static resourceType = "Microsoft.Sql/servers/databases/advisors/recommendedActions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ra",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => recommendedActionPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/advisors/recommendedActions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RecommendedAction.resourceType,
      apiVersion: RecommendedAction.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseAdvisor,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RecommendedAction.buildResourceProps(props), options);
  }

  /**
   * Resource kind.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of Database Recommended Action.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<RecommendedActionProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * Database, Server or Elastic Pool Advisor.
 */
export class SqlDatabaseAdvisor extends Resource<"Microsoft.Sql/servers/databases/advisors"> {
  static resourceType = "Microsoft.Sql/servers/databases/advisors" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "a",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => advisorPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/advisors"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseAdvisor.resourceType,
      apiVersion: SqlDatabaseAdvisor.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseAdvisor.buildResourceProps(props), options);
  }

  /**
   * Resource kind.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the Database Advisor.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<AdvisorProperties> {
    return this.expr("properties") as any;
  }
}

export interface DatabaseBlobAuditingPolicyProps {
  name: ExpressionOrValue<BlobAuditingPolicyName>;
  /**
   * Resource properties.
   */
  properties?: DatabaseBlobAuditingPolicyPropertiesInput | undefined;
}

/**
 * A database blob auditing policy.
 */
export class DatabaseBlobAuditingPolicy extends Resource<"Microsoft.Sql/servers/databases/auditingSettings"> {
  static resourceType = "Microsoft.Sql/servers/databases/auditingSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "as",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseBlobAuditingPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (DatabaseBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/auditingSettings"> & Record<string, unknown> {
    return {
      ...props,
      type: DatabaseBlobAuditingPolicy.resourceType,
      apiVersion: DatabaseBlobAuditingPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props:
      | (DatabaseBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DatabaseBlobAuditingPolicy.buildResourceProps(props), options);
  }

  /**
   * Resource kind.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  get name(): Expression<BlobAuditingPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<BlobAuditingPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabaseBlobAuditingPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseBlobAuditingPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Database-level Automatic Tuning.
 */
export class DatabaseAutomaticTuning extends Resource<"Microsoft.Sql/servers/databases/automaticTuning"> {
  static resourceType = "Microsoft.Sql/servers/databases/automaticTuning" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseAutomaticTuningPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: SingletonExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/automaticTuning"> & Record<string, unknown> {
    return {
      ...props,
      type: DatabaseAutomaticTuning.resourceType,
      apiVersion: DatabaseAutomaticTuning.apiVersion,
      name: "current",
    };
  }

  constructor(
    context: ServerDatabase,
    props: SingletonExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, DatabaseAutomaticTuning.buildResourceProps(props), options);
  }

  get name(): Expression<"current"> {
    return this.expr("name");
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<DatabaseAutomaticTuningProperties> {
    return this.expr("properties") as any;
  }
}

export interface LongTermRetentionPolicyProps {
  /**
   * The policy name. Should always be Default.
   */
  name?: ExpressionOrValue<LongTermRetentionPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: LongTermRetentionPolicyPropertiesInput | undefined;
}

/**
 * A long term retention policy.
 */
export class LongTermRetentionPolicy extends Resource<"Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies"> {
  static resourceType = "Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "bltrp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => longTermRetentionPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (LongTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: LongTermRetentionPolicy.resourceType,
      apiVersion: LongTermRetentionPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (LongTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, LongTermRetentionPolicy.buildResourceProps(props), options);
  }

  /**
   * The policy name. Should always be Default.
   */
  get name(): Expression<LongTermRetentionPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<LongTermRetentionPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): LongTermRetentionPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LongTermRetentionPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface BackupShortTermRetentionPolicyProps {
  /**
   * The policy name. Should always be default.
   */
  name?: ExpressionOrValue<ShortTermRetentionPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: BackupShortTermRetentionPolicyPropertiesInput | undefined;
}

/**
 * A short term retention policy.
 */
export class BackupShortTermRetentionPolicy extends Resource<"Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies"> {
  static resourceType = "Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "bstrp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => backupShortTermRetentionPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (BackupShortTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: BackupShortTermRetentionPolicy.resourceType,
      apiVersion: BackupShortTermRetentionPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (BackupShortTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, BackupShortTermRetentionPolicy.buildResourceProps(props), options);
  }

  /**
   * The policy name. Should always be default.
   */
  get name(): Expression<ShortTermRetentionPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ShortTermRetentionPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): BackupShortTermRetentionPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: BackupShortTermRetentionPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface DataMaskingPolicyProps {
  /**
   * The name of the database for which the data masking policy applies.
   */
  name?: ExpressionOrValue<DataMaskingPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: DataMaskingPolicyPropertiesInput | undefined;
}

export interface RuleProps {
  /**
   * The name of the resource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: DataMaskingRulePropertiesInput | undefined;
}

/**
 * A database data masking rule.
 */
export class Rule extends Resource<"Microsoft.Sql/servers/databases/dataMaskingPolicies/rules"> {
  static resourceType = "Microsoft.Sql/servers/databases/dataMaskingPolicies/rules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => dataMaskingRulePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (RuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/dataMaskingPolicies/rules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Rule.resourceType,
      apiVersion: Rule.apiVersion,
    };
  }

  constructor(
    context: DataMaskingPolicy,
    props?: (RuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Rule.buildResourceProps(props), options);
  }

  /**
   * The kind of Data Masking Rule. Metadata, used for Azure portal.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The location of the data masking rule.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DataMaskingRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DataMaskingRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A database data masking policy.
 */
export class DataMaskingPolicy extends Resource<"Microsoft.Sql/servers/databases/dataMaskingPolicies"> {
  static resourceType = "Microsoft.Sql/servers/databases/dataMaskingPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dmp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => dataMaskingPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (DataMaskingPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/dataMaskingPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DataMaskingPolicy.resourceType,
      apiVersion: DataMaskingPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (DataMaskingPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DataMaskingPolicy.buildResourceProps(props), options);
  }

  /**
   * The kind of Data Masking Policy. Metadata, used for Azure portal.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The location of the data masking policy.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the database for which the data masking policy applies.
   */
  get name(): Expression<DataMaskingPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<DataMaskingPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DataMaskingPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DataMaskingPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * User activities of a data warehouse
 */
export class DataWarehouseUserActivities extends Resource<"Microsoft.Sql/servers/databases/dataWarehouseUserActivities"> {
  static resourceType = "Microsoft.Sql/servers/databases/dataWarehouseUserActivities" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dwua",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => dataWarehouseUserActivitiesPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/dataWarehouseUserActivities"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DataWarehouseUserActivities.resourceType,
      apiVersion: DataWarehouseUserActivities.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, DataWarehouseUserActivities.buildResourceProps(props), options);
  }

  /**
   * The activity name of the data warehouse.
   */
  get name(): Expression<DataWarehouseUserActivityName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<DataWarehouseUserActivityName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<DataWarehouseUserActivitiesProperties> {
    return this.expr("properties") as any;
  }
}

export interface ExtendedDatabaseBlobAuditingPolicyProps {
  name: ExpressionOrValue<BlobAuditingPolicyName>;
  /**
   * Resource properties.
   */
  properties?: ExtendedDatabaseBlobAuditingPolicyPropertiesInput | undefined;
}

/**
 * An extended database blob auditing policy.
 */
export class ExtendedDatabaseBlobAuditingPolicy extends Resource<"Microsoft.Sql/servers/databases/extendedAuditingSettings"> {
  static resourceType = "Microsoft.Sql/servers/databases/extendedAuditingSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "eas",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => extendedDatabaseBlobAuditingPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ExtendedDatabaseBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/extendedAuditingSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ExtendedDatabaseBlobAuditingPolicy.resourceType,
      apiVersion: ExtendedDatabaseBlobAuditingPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props:
      | (ExtendedDatabaseBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ExtendedDatabaseBlobAuditingPolicy.buildResourceProps(props), options);
  }

  get name(): Expression<BlobAuditingPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<BlobAuditingPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ExtendedDatabaseBlobAuditingPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ExtendedDatabaseBlobAuditingPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ExtensionProps {
  /**
   * The name of the resource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: DatabaseExtensionsPropertiesInput | undefined;
}

/**
 * An Import, Export, or PolybaseImport resource.
 */
export class Extension extends Resource<"Microsoft.Sql/servers/databases/extensions"> {
  static resourceType = "Microsoft.Sql/servers/databases/extensions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "e",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseExtensionsPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (ExtensionProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/extensions"> & Record<string, unknown> {
    return {
      ...props,
      type: Extension.resourceType,
      apiVersion: Extension.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?: (ExtensionProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Extension.buildResourceProps(props), options);
  }

  /**
   * The name of the resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabaseExtensionsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseExtensionsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface GeoBackupPolicyProps {
  /**
   * The name of the Geo backup policy. This should always be 'Default'.
   */
  name?: ExpressionOrValue<GeoBackupPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: GeoBackupPolicyPropertiesInput | undefined;
}

/**
 * A Geo backup policy.
 */
export class GeoBackupPolicy extends Resource<"Microsoft.Sql/servers/databases/geoBackupPolicies"> {
  static resourceType = "Microsoft.Sql/servers/databases/geoBackupPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "gbp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => geoBackupPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (GeoBackupPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/geoBackupPolicies"> & Record<string, unknown> {
    return {
      ...props,
      type: GeoBackupPolicy.resourceType,
      apiVersion: GeoBackupPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      (GeoBackupPolicyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, GeoBackupPolicy.buildResourceProps(props), options);
  }

  /**
   * Kind of geo backup policy. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Backup policy location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the Geo backup policy. This should always be 'Default'.
   */
  get name(): Expression<GeoBackupPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<GeoBackupPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): GeoBackupPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: GeoBackupPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ServerDatabaseLedgerDigestUploadProps {
  name?: ExpressionOrValue<LedgerDigestUploadsName> | undefined;
  /**
   * Resource properties.
   */
  properties?: LedgerDigestUploadsPropertiesInput | undefined;
}

/**
 * Azure SQL Database ledger digest upload settings.
 */
export class ServerDatabaseLedgerDigestUpload extends Resource<"Microsoft.Sql/servers/databases/ledgerDigestUploads"> {
  static resourceType = "Microsoft.Sql/servers/databases/ledgerDigestUploads" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ldu",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => ledgerDigestUploadsPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerDatabaseLedgerDigestUploadProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/ledgerDigestUploads"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServerDatabaseLedgerDigestUpload.resourceType,
      apiVersion: ServerDatabaseLedgerDigestUpload.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (ServerDatabaseLedgerDigestUploadProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerDatabaseLedgerDigestUpload.buildResourceProps(props), options);
  }

  get name(): Expression<LedgerDigestUploadsName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<LedgerDigestUploadsName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): LedgerDigestUploadsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LedgerDigestUploadsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ReplicationLinkProps {
  /**
   * The name of the replication link.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ReplicationLinkPropertiesInput | undefined;
}

/**
 * A replication link.
 */
export class ReplicationLink extends Resource<"Microsoft.Sql/servers/databases/replicationLinks"> {
  static resourceType = "Microsoft.Sql/servers/databases/replicationLinks" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rl",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => replicationLinkPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (ReplicationLinkProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/replicationLinks"> & Record<string, unknown> {
    return {
      ...props,
      type: ReplicationLink.resourceType,
      apiVersion: ReplicationLink.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      (ReplicationLinkProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ReplicationLink.buildResourceProps(props), options);
  }

  /**
   * The name of the replication link.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ReplicationLinkPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ReplicationLinkPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Database restore points.
 */
export class RestorePoint extends Resource<"Microsoft.Sql/servers/databases/restorePoints"> {
  static resourceType = "Microsoft.Sql/servers/databases/restorePoints" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => restorePointPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/restorePoints"> & Record<string, unknown> {
    return {
      ...props,
      type: RestorePoint.resourceType,
      apiVersion: RestorePoint.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RestorePoint.buildResourceProps(props), options);
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the restore point.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<RestorePointProperties> {
    return this.expr("properties") as any;
  }
}

export interface SqlDatabaseSensitivityLabelProps {
  /**
   * The source of the sensitivity label.
   */
  name: ExpressionOrValue<CurrentSensitivityLabelSource>;
  /**
   * Resource properties.
   */
  properties?: SensitivityLabelPropertiesInput | undefined;
}

/**
 * A sensitivity label.
 */
export class SqlDatabaseSensitivityLabel extends Resource<"Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sl",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        managedBy: { armPath: ["managedBy"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sensitivityLabelPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlDatabaseSensitivityLabelProps & { existing?: false })
      | (ExistingResourceProps<CurrentSensitivityLabelSource> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSensitivityLabel.resourceType,
      apiVersion: SqlDatabaseSensitivityLabel.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseColumn,
    props:
      | (SqlDatabaseSensitivityLabelProps & { existing?: false })
      | (ExistingResourceProps<CurrentSensitivityLabelSource> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseSensitivityLabel.buildResourceProps(props), options);
  }

  /**
   * Resource that manages the sensitivity label.
   */
  get managedBy(): Expression<string> {
    return this.expr("managedBy");
  }

  /**
   * The source of the sensitivity label.
   */
  get name(): Expression<CurrentSensitivityLabelSource> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<CurrentSensitivityLabelSource>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SensitivityLabelPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SensitivityLabelPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A database column resource.
 */
export class SqlDatabaseColumn extends Resource<"Microsoft.Sql/servers/databases/schemas/tables/columns"> {
  static resourceType = "Microsoft.Sql/servers/databases/schemas/tables/columns" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseColumnPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/schemas/tables/columns"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseColumn.resourceType,
      apiVersion: SqlDatabaseColumn.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseTable,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseColumn.buildResourceProps(props), options);
  }

  /**
   * The name of the column.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<DatabaseColumnProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A database table resource.
 */
export class SqlDatabaseTable extends Resource<"Microsoft.Sql/servers/databases/schemas/tables"> {
  static resourceType = "Microsoft.Sql/servers/databases/schemas/tables" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseTablePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/schemas/tables"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseTable.resourceType,
      apiVersion: SqlDatabaseTable.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseSchema,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseTable.buildResourceProps(props), options);
  }

  /**
   * The name of the table.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<DatabaseTableProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A database schema resource.
 */
export class SqlDatabaseSchema extends Resource<"Microsoft.Sql/servers/databases/schemas"> {
  static resourceType = "Microsoft.Sql/servers/databases/schemas" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: { armPath: ["properties"], value: createAnyShape(), readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/schemas"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSchema.resourceType,
      apiVersion: SqlDatabaseSchema.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseSchema.buildResourceProps(props), options);
  }

  /**
   * The name of the schema.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The resource-specific properties for this resource.
   */
  get properties(): Expression<any> {
    return this.expr("properties");
  }
}

export interface ServerDatabaseSecurityAlertPolicyProps {
  /**
   * The name of the security alert policy.
   */
  name?: ExpressionOrValue<SecurityAlertPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: SecurityAlertsPolicyPropertiesInput | undefined;
}

/**
 * A database security alert policy.
 */
export class ServerDatabaseSecurityAlertPolicy extends Resource<"Microsoft.Sql/servers/databases/securityAlertPolicies"> {
  static resourceType = "Microsoft.Sql/servers/databases/securityAlertPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sap",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => securityAlertsPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerDatabaseSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/securityAlertPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServerDatabaseSecurityAlertPolicy.resourceType,
      apiVersion: ServerDatabaseSecurityAlertPolicy.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (ServerDatabaseSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerDatabaseSecurityAlertPolicy.buildResourceProps(props), options);
  }

  /**
   * The name of the security alert policy.
   */
  get name(): Expression<SecurityAlertPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<SecurityAlertPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SecurityAlertsPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SecurityAlertsPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SqlDatabaseSqlVulnerabilityAssessmentBaselineProps {
  name?: ExpressionOrValue<BaselineName> | undefined;
  /**
   * Resource properties.
   */
  properties?: DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesInput | undefined;
}

export interface SqlDatabaseSqlVulnerabilityAssessmentBaselineRuleProps {
  /**
   * The vulnerability assessment rule ID.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput | undefined;
}

/**
 * A database sql vulnerability assessment rule baseline.
 */
export class SqlDatabaseSqlVulnerabilityAssessmentBaselineRule extends Resource<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines/rules"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines/rules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "r",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(
            () => databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesShape,
          ),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlDatabaseSqlVulnerabilityAssessmentBaselineRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines/rules"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSqlVulnerabilityAssessmentBaselineRule.resourceType,
      apiVersion: SqlDatabaseSqlVulnerabilityAssessmentBaselineRule.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseSqlVulnerabilityAssessmentBaseline,
    props?:
      | (SqlDatabaseSqlVulnerabilityAssessmentBaselineRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(
      context,
      SqlDatabaseSqlVulnerabilityAssessmentBaselineRule.buildResourceProps(props),
      options,
    );
  }

  /**
   * The vulnerability assessment rule ID.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A database sql vulnerability assessment baseline set.
 */
export class SqlDatabaseSqlVulnerabilityAssessmentBaseline extends Resource<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "b",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(
            () => databaseSqlVulnerabilityAssessmentBaselineSetPropertiesShape,
          ),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlDatabaseSqlVulnerabilityAssessmentBaselineProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSqlVulnerabilityAssessmentBaseline.resourceType,
      apiVersion: SqlDatabaseSqlVulnerabilityAssessmentBaseline.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseSqlVulnerabilityAssessment,
    props?:
      | (SqlDatabaseSqlVulnerabilityAssessmentBaselineProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(
      context,
      SqlDatabaseSqlVulnerabilityAssessmentBaseline.buildResourceProps(props),
      options,
    );
  }

  get name(): Expression<BaselineName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<BaselineName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Concrete proxy resource types can be created by aliasing this type using a specific property type.
 */
export class SqlDatabaseSqlVulnerabilityAssessmentScanResult extends Resource<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans/scanResults"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans/scanResults" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sr",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlVulnerabilityAssessmentScanResultPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans/scanResults"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSqlVulnerabilityAssessmentScanResult.resourceType,
      apiVersion: SqlDatabaseSqlVulnerabilityAssessmentScanResult.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseSqlVulnerabilityAssessmentScan,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(
      context,
      SqlDatabaseSqlVulnerabilityAssessmentScanResult.buildResourceProps(props),
      options,
    );
  }

  /**
   * The scan result id of the specific result to retrieve.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<SqlVulnerabilityAssessmentScanResultProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A vulnerability assessment scan record.
 */
export class SqlDatabaseSqlVulnerabilityAssessmentScan extends Resource<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlVulnerabilityAssessmentScanRecordPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSqlVulnerabilityAssessmentScan.resourceType,
      apiVersion: SqlDatabaseSqlVulnerabilityAssessmentScan.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseSqlVulnerabilityAssessment,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseSqlVulnerabilityAssessmentScan.buildResourceProps(props), options);
  }

  /**
   * The vulnerability assessment scan Id of the scan to retrieve.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<SqlVulnerabilityAssessmentScanRecordProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A SQL Vulnerability Assessment.
 */
export class SqlDatabaseSqlVulnerabilityAssessment extends Resource<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments"> {
  static resourceType = "Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sva",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlVulnerabilityAssessmentPolicyPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseSqlVulnerabilityAssessment.resourceType,
      apiVersion: SqlDatabaseSqlVulnerabilityAssessment.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseSqlVulnerabilityAssessment.buildResourceProps(props), options);
  }

  /**
   * The name of the SQL Vulnerability Assessment.
   */
  get name(): Expression<SqlVulnerabilityAssessmentName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<SqlVulnerabilityAssessmentName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<SqlVulnerabilityAssessmentPolicyProperties> {
    return this.expr("properties") as any;
  }
}

export interface SyncGroupProps {
  /**
   * The name of the sync group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: SyncGroupPropertiesInput | undefined;
  /**
   * The name and capacity of the SKU.
   */
  sku?: SkuInput | undefined;
}

export interface SyncMemberProps {
  /**
   * The name of the sync member.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: SyncMemberPropertiesInput | undefined;
}

/**
 * An Azure SQL Database sync member.
 */
export class SyncMember extends Resource<"Microsoft.Sql/servers/databases/syncGroups/syncMembers"> {
  static resourceType = "Microsoft.Sql/servers/databases/syncGroups/syncMembers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sm",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => syncMemberPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (SyncMemberProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/syncGroups/syncMembers"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SyncMember.resourceType,
      apiVersion: SyncMember.apiVersion,
    };
  }

  constructor(
    context: SyncGroup,
    props?: (SyncMemberProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SyncMember.buildResourceProps(props), options);
  }

  /**
   * The name of the sync member.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SyncMemberPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SyncMemberPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Azure SQL Database sync group.
 */
export class SyncGroup extends Resource<"Microsoft.Sql/servers/databases/syncGroups"> {
  static resourceType = "Microsoft.Sql/servers/databases/syncGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sg",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => syncGroupPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (SyncGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/syncGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: SyncGroup.resourceType,
      apiVersion: SyncGroup.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?: (SyncGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SyncGroup.buildResourceProps(props), options);
  }

  /**
   * The name of the sync group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SyncGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SyncGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The name and capacity of the SKU.
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
    this.setProperty("sku", value);
  }
}

export interface ServerDatabaseTransparentDataEncryptionProps {
  /**
   * The name of the transparent data encryption configuration.
   */
  name?: ExpressionOrValue<TransparentDataEncryptionName> | undefined;
  /**
   * Resource properties.
   */
  properties?: TransparentDataEncryptionPropertiesInput | undefined;
}

/**
 * A logical database transparent data encryption scan state.
 */
export class ServerDatabaseTransparentDataEncryption extends Resource<"Microsoft.Sql/servers/databases/transparentDataEncryption"> {
  static resourceType = "Microsoft.Sql/servers/databases/transparentDataEncryption" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "tde",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => transparentDataEncryptionPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerDatabaseTransparentDataEncryptionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/transparentDataEncryption"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServerDatabaseTransparentDataEncryption.resourceType,
      apiVersion: ServerDatabaseTransparentDataEncryption.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (ServerDatabaseTransparentDataEncryptionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerDatabaseTransparentDataEncryption.buildResourceProps(props), options);
  }

  /**
   * The name of the transparent data encryption configuration.
   */
  get name(): Expression<TransparentDataEncryptionName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<TransparentDataEncryptionName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): TransparentDataEncryptionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TransparentDataEncryptionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SqlDatabaseVulnerabilityAssessmentProps {
  /**
   * The name of the vulnerability assessment.
   */
  name?: ExpressionOrValue<VulnerabilityAssessmentName> | undefined;
  /**
   * Resource properties.
   */
  properties?: DatabaseVulnerabilityAssessmentPropertiesInput | undefined;
}

export interface SqlDatabaseVulnerabilityAssessmentRuleBaselineProps {
  /**
   * The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
   */
  name: ExpressionOrValue<VulnerabilityAssessmentPolicyBaselineName>;
  /**
   * Resource properties.
   */
  properties?: DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput | undefined;
}

/**
 * A database vulnerability assessment rule baseline.
 */
export class SqlDatabaseVulnerabilityAssessmentRuleBaseline extends Resource<"Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "b",
    nameSegments: 2,
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(
            () => databaseVulnerabilityAssessmentRuleBaselinePropertiesShape,
          ),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlDatabaseVulnerabilityAssessmentRuleBaselineProps & { existing?: false })
      | (ExistingResourceProps<VulnerabilityAssessmentPolicyBaselineName> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseVulnerabilityAssessmentRuleBaseline.resourceType,
      apiVersion: SqlDatabaseVulnerabilityAssessmentRuleBaseline.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseVulnerabilityAssessment,
    props:
      | (SqlDatabaseVulnerabilityAssessmentRuleBaselineProps & { existing?: false })
      | (ExistingResourceProps<VulnerabilityAssessmentPolicyBaselineName> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(
      context,
      SqlDatabaseVulnerabilityAssessmentRuleBaseline.buildResourceProps(props),
      options,
    );
  }

  /**
   * The name of the vulnerability assessment rule baseline (default implies a baseline on a
   * database level rule and master for server level rule).
   */
  get name(): Expression<VulnerabilityAssessmentPolicyBaselineName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<VulnerabilityAssessmentPolicyBaselineName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabaseVulnerabilityAssessmentRuleBaselinePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A vulnerability assessment scan record.
 */
export class SqlDatabaseVulnerabilityAssessmentScan extends Resource<"Microsoft.Sql/servers/databases/vulnerabilityAssessments/scans"> {
  static resourceType = "Microsoft.Sql/servers/databases/vulnerabilityAssessments/scans" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => vulnerabilityAssessmentScanRecordPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/databases/vulnerabilityAssessments/scans"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseVulnerabilityAssessmentScan.resourceType,
      apiVersion: SqlDatabaseVulnerabilityAssessmentScan.apiVersion,
    };
  }

  constructor(
    context: SqlDatabaseVulnerabilityAssessment,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseVulnerabilityAssessmentScan.buildResourceProps(props), options);
  }

  /**
   * The vulnerability assessment scan Id of the scan to retrieve.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<VulnerabilityAssessmentScanRecordProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A database vulnerability assessment.
 */
export class SqlDatabaseVulnerabilityAssessment extends Resource<"Microsoft.Sql/servers/databases/vulnerabilityAssessments"> {
  static resourceType = "Microsoft.Sql/servers/databases/vulnerabilityAssessments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "va",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseVulnerabilityAssessmentPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlDatabaseVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/vulnerabilityAssessments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabaseVulnerabilityAssessment.resourceType,
      apiVersion: SqlDatabaseVulnerabilityAssessment.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      | (SqlDatabaseVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabaseVulnerabilityAssessment.buildResourceProps(props), options);
  }

  /**
   * The name of the vulnerability assessment.
   */
  get name(): Expression<VulnerabilityAssessmentName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<VulnerabilityAssessmentName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabaseVulnerabilityAssessmentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseVulnerabilityAssessmentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface WorkloadGroupProps {
  /**
   * The name of the workload group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: WorkloadGroupPropertiesInput | undefined;
}

export interface WorkloadClassifierProps {
  /**
   * The name of the workload classifier.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: WorkloadClassifierPropertiesInput | undefined;
}

/**
 * Workload classifier operations for a data warehouse
 */
export class WorkloadClassifier extends Resource<"Microsoft.Sql/servers/databases/workloadGroups/workloadClassifiers"> {
  static resourceType =
    "Microsoft.Sql/servers/databases/workloadGroups/workloadClassifiers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "wc",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => workloadClassifierPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (WorkloadClassifierProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/workloadGroups/workloadClassifiers"> &
    Record<string, unknown> {
    return {
      ...props,
      type: WorkloadClassifier.resourceType,
      apiVersion: WorkloadClassifier.apiVersion,
    };
  }

  constructor(
    context: WorkloadGroup,
    props?:
      | (WorkloadClassifierProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, WorkloadClassifier.buildResourceProps(props), options);
  }

  /**
   * The name of the workload classifier.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): WorkloadClassifierPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WorkloadClassifierPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Workload group operations for a data warehouse
 */
export class WorkloadGroup extends Resource<"Microsoft.Sql/servers/databases/workloadGroups"> {
  static resourceType = "Microsoft.Sql/servers/databases/workloadGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "wg",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => workloadGroupPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (WorkloadGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases/workloadGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: WorkloadGroup.resourceType,
      apiVersion: WorkloadGroup.apiVersion,
    };
  }

  constructor(
    context: ServerDatabase,
    props?:
      (WorkloadGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, WorkloadGroup.buildResourceProps(props), options);
  }

  /**
   * The name of the workload group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): WorkloadGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WorkloadGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A database resource.
 */
export class ServerDatabase extends Resource<"Microsoft.Sql/servers/databases"> {
  static resourceType = "Microsoft.Sql/servers/databases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "d",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => databaseIdentityShape),
        },
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape() },
        managedBy: { armPath: ["managedBy"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databasePropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (ServerDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/databases"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerDatabase.resourceType,
      apiVersion: ServerDatabase.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (ServerDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerDatabase.buildResourceProps(props), options);
  }

  /**
   * The Azure Active Directory identity of the database.
   */
  get identity(): DatabaseIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: DatabaseIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * Kind of database. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * Resource that manages the database.
   */
  get managedBy(): Expression<string> {
    return this.expr("managedBy");
  }

  /**
   * The name of the database.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): DatabasePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabasePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The database SKU. The list of SKUs may vary by region and support offer. To determine the SKUs
   * (including the SKU name, tier/edition, family, and capacity) that are available to your
   * subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or one of the
   * following commands: ```azurecli az sql db list-editions -l <location> -o table ```
   * ```powershell Get-AzSqlServerServiceObjective -Location <location> ```
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
    this.setProperty("sku", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface DevOpsAuditingSettingProps {
  name?: ExpressionOrValue<DevOpsAuditingSettingsName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerDevOpsAuditSettingsPropertiesInput | undefined;
}

/**
 * A server DevOps auditing settings.
 */
export class DevOpsAuditingSetting extends Resource<"Microsoft.Sql/servers/devOpsAuditingSettings"> {
  static resourceType = "Microsoft.Sql/servers/devOpsAuditingSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "doas",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverDevOpsAuditSettingsPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (DevOpsAuditingSettingProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/devOpsAuditingSettings"> & Record<string, unknown> {
    return {
      ...props,
      type: DevOpsAuditingSetting.resourceType,
      apiVersion: DevOpsAuditingSetting.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (DevOpsAuditingSettingProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DevOpsAuditingSetting.buildResourceProps(props), options);
  }

  get name(): Expression<DevOpsAuditingSettingsName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<DevOpsAuditingSettingsName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerDevOpsAuditSettingsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerDevOpsAuditSettingsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ServerDnsAliasProps {
  /**
   * The name of the server dns alias.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * A server DNS alias.
 */
export class ServerDnsAlias extends Resource<"Microsoft.Sql/servers/dnsAliases"> {
  static resourceType = "Microsoft.Sql/servers/dnsAliases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "da",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverDnsAliasPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (ServerDnsAliasProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/dnsAliases"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerDnsAlias.resourceType,
      apiVersion: ServerDnsAlias.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (ServerDnsAliasProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerDnsAlias.buildResourceProps(props), options);
  }

  /**
   * The name of the server dns alias.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<ServerDnsAliasProperties> {
    return this.expr("properties") as any;
  }
}

export interface ElasticPoolProps {
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the elastic pool.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ElasticPoolPropertiesInput | undefined;
  /**
   * The elastic pool SKU.
   *
   * The list of SKUs may vary by region and support offer. To determine the SKUs (including the SKU name, tier/edition, family, and capacity) that are available to your subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or the following command:
   *
   * ```azurecli
   * az sql elastic-pool list-editions -l <location> -o table
   * ```
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An elastic pool.
 */
export class ElasticPool extends Resource<"Microsoft.Sql/servers/elasticPools"> {
  static resourceType = "Microsoft.Sql/servers/elasticPools" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ep",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => elasticPoolPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (ElasticPoolProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/elasticPools"> & Record<string, unknown> {
    return {
      ...props,
      type: ElasticPool.resourceType,
      apiVersion: ElasticPool.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (ElasticPoolProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ElasticPool.buildResourceProps(props), options);
  }

  /**
   * Kind of elastic pool. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the elastic pool.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ElasticPoolPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ElasticPoolPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The elastic pool SKU. The list of SKUs may vary by region and support offer. To determine the
   * SKUs (including the SKU name, tier/edition, family, and capacity) that are available to your
   * subscription in an Azure region, use the `Capabilities_ListByLocation` REST API or the
   * following command: ```azurecli az sql elastic-pool list-editions -l <location> -o table ```
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
    this.setProperty("sku", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface ServerEncryptionProtectorProps {
  /**
   * The name of the encryption protector to be retrieved.
   */
  name?: ExpressionOrValue<EncryptionProtectorName> | undefined;
  /**
   * Resource properties.
   */
  properties?: EncryptionProtectorPropertiesInput | undefined;
}

/**
 * The server encryption protector.
 */
export class ServerEncryptionProtector extends Resource<"Microsoft.Sql/servers/encryptionProtector"> {
  static resourceType = "Microsoft.Sql/servers/encryptionProtector" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ep",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => encryptionProtectorPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerEncryptionProtectorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/encryptionProtector"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerEncryptionProtector.resourceType,
      apiVersion: ServerEncryptionProtector.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerEncryptionProtectorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerEncryptionProtector.buildResourceProps(props), options);
  }

  /**
   * Kind of encryption protector. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the encryption protector to be retrieved.
   */
  get name(): Expression<EncryptionProtectorName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<EncryptionProtectorName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): EncryptionProtectorPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: EncryptionProtectorPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ExtendedServerBlobAuditingPolicyProps {
  name: ExpressionOrValue<BlobAuditingPolicyName>;
  /**
   * Resource properties.
   */
  properties?: ExtendedServerBlobAuditingPolicyPropertiesInput | undefined;
}

/**
 * An extended server blob auditing policy.
 */
export class ExtendedServerBlobAuditingPolicy extends Resource<"Microsoft.Sql/servers/extendedAuditingSettings"> {
  static resourceType = "Microsoft.Sql/servers/extendedAuditingSettings" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "eas",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => extendedServerBlobAuditingPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ExtendedServerBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/extendedAuditingSettings"> & Record<string, unknown> {
    return {
      ...props,
      type: ExtendedServerBlobAuditingPolicy.resourceType,
      apiVersion: ExtendedServerBlobAuditingPolicy.apiVersion,
    };
  }

  constructor(
    context: Server,
    props:
      | (ExtendedServerBlobAuditingPolicyProps & { existing?: false })
      | (ExistingResourceProps<BlobAuditingPolicyName> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ExtendedServerBlobAuditingPolicy.buildResourceProps(props), options);
  }

  get name(): Expression<BlobAuditingPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<BlobAuditingPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ExtendedServerBlobAuditingPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ExtendedServerBlobAuditingPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface FailoverGroupProps {
  /**
   * The name of the failover group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: FailoverGroupPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * A failover group.
 */
export class FailoverGroup extends Resource<"Microsoft.Sql/servers/failoverGroups"> {
  static resourceType = "Microsoft.Sql/servers/failoverGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "fg",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => failoverGroupPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (FailoverGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/failoverGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: FailoverGroup.resourceType,
      apiVersion: FailoverGroup.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (FailoverGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, FailoverGroup.buildResourceProps(props), options);
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the failover group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): FailoverGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: FailoverGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface FirewallRuleProps {
  /**
   * Resource name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerFirewallRulePropertiesInput | undefined;
}

/**
 * A server firewall rule.
 */
export class FirewallRule extends Resource<"Microsoft.Sql/servers/firewallRules"> {
  static resourceType = "Microsoft.Sql/servers/firewallRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "fr",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverFirewallRulePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (FirewallRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/firewallRules"> & Record<string, unknown> {
    return {
      ...props,
      type: FirewallRule.resourceType,
      apiVersion: FirewallRule.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (FirewallRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, FirewallRule.buildResourceProps(props), options);
  }

  /**
   * Resource name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerFirewallRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerFirewallRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface IPv6FirewallRuleProps {
  /**
   * Resource name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: IPv6ServerFirewallRulePropertiesInput | undefined;
}

/**
 * An IPv6 server firewall rule.
 */
export class IPv6FirewallRule extends Resource<"Microsoft.Sql/servers/ipv6FirewallRules"> {
  static resourceType = "Microsoft.Sql/servers/ipv6FirewallRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ir",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => iPv6ServerFirewallRulePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (IPv6FirewallRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/ipv6FirewallRules"> & Record<string, unknown> {
    return {
      ...props,
      type: IPv6FirewallRule.resourceType,
      apiVersion: IPv6FirewallRule.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      (IPv6FirewallRuleProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, IPv6FirewallRule.buildResourceProps(props), options);
  }

  /**
   * Resource name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): IPv6ServerFirewallRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: IPv6ServerFirewallRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface JobAgentProps {
  /**
   * The identity of the job agent.
   */
  identity?: JobAgentIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the job agent to be retrieved.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: JobAgentPropertiesInput | undefined;
  /**
   * The name and tier of the SKU.
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CredentialProps {
  /**
   * The name of the credential.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: JobCredentialPropertiesInput | undefined;
}

/**
 * A stored credential that can be used by a job to connect to target databases.
 */
export class Credential extends Resource<"Microsoft.Sql/servers/jobAgents/credentials"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/credentials" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobCredentialPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (CredentialProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/credentials"> & Record<string, unknown> {
    return {
      ...props,
      type: Credential.resourceType,
      apiVersion: Credential.apiVersion,
    };
  }

  constructor(
    context: JobAgent,
    props?: (CredentialProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Credential.buildResourceProps(props), options);
  }

  /**
   * The name of the credential.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): JobCredentialPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: JobCredentialPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface JobProps {
  /**
   * The name of the job to get.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: JobPropertiesInput | undefined;
}

export interface SqlServerJobExecutionProps {
  /**
   * The id of the job execution
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * An execution of a job
 */
export class SqlServerJobExecutionStepTarget extends Resource<"Microsoft.Sql/servers/jobAgents/jobs/executions/steps/targets"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs/executions/steps/targets" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobExecutionPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs/executions/steps/targets"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlServerJobExecutionStepTarget.resourceType,
      apiVersion: SqlServerJobExecutionStepTarget.apiVersion,
    };
  }

  constructor(
    context: SqlServerJobExecutionStep,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlServerJobExecutionStepTarget.buildResourceProps(props), options);
  }

  /**
   * The id of the job execution
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<JobExecutionProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * An execution of a job
 */
export class SqlServerJobExecutionStep extends Resource<"Microsoft.Sql/servers/jobAgents/jobs/executions/steps"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs/executions/steps" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobExecutionPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs/executions/steps"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlServerJobExecutionStep.resourceType,
      apiVersion: SqlServerJobExecutionStep.apiVersion,
    };
  }

  constructor(
    context: SqlServerJobExecution,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlServerJobExecutionStep.buildResourceProps(props), options);
  }

  /**
   * The id of the job execution
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<JobExecutionProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * An execution of a job
 */
export class SqlServerJobExecution extends Resource<"Microsoft.Sql/servers/jobAgents/jobs/executions"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs/executions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "e",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobExecutionPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlServerJobExecutionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs/executions"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlServerJobExecution.resourceType,
      apiVersion: SqlServerJobExecution.apiVersion,
    };
  }

  constructor(
    context: Job,
    props?:
      | (SqlServerJobExecutionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlServerJobExecution.buildResourceProps(props), options);
  }

  /**
   * The id of the job execution
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<JobExecutionProperties> {
    return this.expr("properties") as any;
  }
}

export interface SqlServerJobStepProps {
  /**
   * The name of the job step.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: JobStepPropertiesInput | undefined;
}

/**
 * A job step.
 */
export class SqlServerJobStep extends Resource<"Microsoft.Sql/servers/jobAgents/jobs/steps"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs/steps" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobStepPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (SqlServerJobStepProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs/steps"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlServerJobStep.resourceType,
      apiVersion: SqlServerJobStep.apiVersion,
    };
  }

  constructor(
    context: Job,
    props?:
      (SqlServerJobStepProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlServerJobStep.buildResourceProps(props), options);
  }

  /**
   * The name of the job step.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): JobStepPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: JobStepPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A job step.
 */
export class SqlServerJobVersionStep extends Resource<"Microsoft.Sql/servers/jobAgents/jobs/versions/steps"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs/versions/steps" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobStepPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs/versions/steps"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlServerJobVersionStep.resourceType,
      apiVersion: SqlServerJobVersionStep.apiVersion,
    };
  }

  constructor(
    context: Version,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, SqlServerJobVersionStep.buildResourceProps(props), options);
  }

  /**
   * The name of the job step.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<JobStepProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A job version.
 */
export class Version extends Resource<"Microsoft.Sql/servers/jobAgents/jobs/versions"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs/versions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "v",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: { armPath: ["properties"], value: createAnyShape(), readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs/versions"> & Record<string, unknown> {
    return {
      ...props,
      type: Version.resourceType,
      apiVersion: Version.apiVersion,
    };
  }

  constructor(
    context: Job,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, Version.buildResourceProps(props), options);
  }

  /**
   * The version of the job to get.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The resource-specific properties for this resource.
   */
  get properties(): Expression<any> {
    return this.expr("properties");
  }
}

/**
 * A job.
 */
export class Job extends Resource<"Microsoft.Sql/servers/jobAgents/jobs"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/jobs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "j",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (JobProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/jobs"> & Record<string, unknown> {
    return {
      ...props,
      type: Job.resourceType,
      apiVersion: Job.apiVersion,
    };
  }

  constructor(
    context: JobAgent,
    props?: (JobProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Job.buildResourceProps(props), options);
  }

  /**
   * The name of the job to get.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): JobPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: JobPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface PrivateEndpointProps {
  /**
   * The name of the private endpoint to get.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: JobPrivateEndpointPropertiesInput | undefined;
}

/**
 * A job agent private endpoint.
 */
export class PrivateEndpoint extends Resource<"Microsoft.Sql/servers/jobAgents/privateEndpoints"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/privateEndpoints" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pe",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobPrivateEndpointPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (PrivateEndpointProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/privateEndpoints"> & Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpoint.resourceType,
      apiVersion: PrivateEndpoint.apiVersion,
    };
  }

  constructor(
    context: JobAgent,
    props?:
      (PrivateEndpointProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpoint.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint to get.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): JobPrivateEndpointPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: JobPrivateEndpointPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TargetGroupProps {
  /**
   * The name of the target group.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: JobTargetGroupPropertiesInput | undefined;
}

/**
 * A group of job targets.
 */
export class TargetGroup extends Resource<"Microsoft.Sql/servers/jobAgents/targetGroups"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents/targetGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "tg",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobTargetGroupPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (TargetGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents/targetGroups"> & Record<string, unknown> {
    return {
      ...props,
      type: TargetGroup.resourceType,
      apiVersion: TargetGroup.apiVersion,
    };
  }

  constructor(
    context: JobAgent,
    props?:
      (TargetGroupProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, TargetGroup.buildResourceProps(props), options);
  }

  /**
   * The name of the target group.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): JobTargetGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: JobTargetGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Azure SQL job agent.
 */
export class JobAgent extends Resource<"Microsoft.Sql/servers/jobAgents"> {
  static resourceType = "Microsoft.Sql/servers/jobAgents" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ja",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => jobAgentIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => jobAgentPropertiesShape),
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape) },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (JobAgentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/jobAgents"> & Record<string, unknown> {
    return {
      ...props,
      type: JobAgent.resourceType,
      apiVersion: JobAgent.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?: (JobAgentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, JobAgent.buildResourceProps(props), options);
  }

  /**
   * The identity of the job agent.
   */
  get identity(): JobAgentIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: JobAgentIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the job agent to be retrieved.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): JobAgentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: JobAgentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * The name and tier of the SKU.
   */
  get sku(): SkuView {
    return this.expr("sku") as any;
  }
  set sku(value: SkuInput | undefined) {
    this.setProperty("sku", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface ServerKeyProps {
  /**
   * The name of the server key to be retrieved.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerKeyPropertiesInput | undefined;
}

/**
 * A server key.
 */
export class ServerKey extends Resource<"Microsoft.Sql/servers/keys"> {
  static resourceType = "Microsoft.Sql/servers/keys" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "k",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverKeyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (ServerKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/keys"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerKey.resourceType,
      apiVersion: ServerKey.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?: (ServerKeyProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerKey.buildResourceProps(props), options);
  }

  /**
   * Kind of encryption protector. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  /**
   * The name of the server key to be retrieved.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerKeyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerKeyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * NSP Configuration for a server.
 */
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.Sql/servers/networkSecurityPerimeterConfigurations"> {
  static resourceType = "Microsoft.Sql/servers/networkSecurityPerimeterConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nspc",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => networkSecurityPerimeterConfigurationPropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/networkSecurityPerimeterConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NetworkSecurityPerimeterConfiguration.resourceType,
      apiVersion: NetworkSecurityPerimeterConfiguration.apiVersion,
    };
  }

  constructor(
    context: Server,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, NetworkSecurityPerimeterConfiguration.buildResourceProps(props), options);
  }

  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<NetworkSecurityPerimeterConfigurationProperties> {
    return this.expr("properties") as any;
  }
}

export interface OutboundFirewallRuleProps {
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * An Azure SQL DB Server Outbound Firewall Rule.
 */
export class OutboundFirewallRule extends Resource<"Microsoft.Sql/servers/outboundFirewallRules"> {
  static resourceType = "Microsoft.Sql/servers/outboundFirewallRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ofr",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => outboundFirewallRulePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (OutboundFirewallRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/outboundFirewallRules"> & Record<string, unknown> {
    return {
      ...props,
      type: OutboundFirewallRule.resourceType,
      apiVersion: OutboundFirewallRule.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (OutboundFirewallRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, OutboundFirewallRule.buildResourceProps(props), options);
  }

  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<OutboundFirewallRuleProperties> {
    return this.expr("properties") as any;
  }
}

export interface ServerPrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * A private endpoint connection
 */
export class ServerPrivateEndpointConnection extends Resource<"Microsoft.Sql/servers/privateEndpointConnections"> {
  static resourceType = "Microsoft.Sql/servers/privateEndpointConnections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pec",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/privateEndpointConnections"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerPrivateEndpointConnection.resourceType,
      apiVersion: ServerPrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerPrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerPrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint connection.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A private link resource
 */
export class PrivateLinkResource extends Resource<"Microsoft.Sql/servers/privateLinkResources"> {
  static resourceType = "Microsoft.Sql/servers/privateLinkResources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "plr",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateLinkResourcePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/privateLinkResources"> & Record<string, unknown> {
    return {
      ...props,
      type: PrivateLinkResource.resourceType,
      apiVersion: PrivateLinkResource.apiVersion,
    };
  }

  constructor(
    context: Server,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, PrivateLinkResource.buildResourceProps(props), options);
  }

  /**
   * The name of the private link resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The private link resource group id.
   */
  get properties(): Expression<PrivateLinkResourceProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A recoverable database resource.
 */
export class RecoverableDatabase extends Resource<"Microsoft.Sql/servers/recoverableDatabases"> {
  static resourceType = "Microsoft.Sql/servers/recoverableDatabases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => recoverableDatabasePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/recoverableDatabases"> & Record<string, unknown> {
    return {
      ...props,
      type: RecoverableDatabase.resourceType,
      apiVersion: RecoverableDatabase.apiVersion,
    };
  }

  constructor(
    context: Server,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RecoverableDatabase.buildResourceProps(props), options);
  }

  /**
   * The name of the database.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<RecoverableDatabaseProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A restorable dropped database resource.
 */
export class RestorableDroppedDatabase extends Resource<"Microsoft.Sql/servers/restorableDroppedDatabases"> {
  static resourceType = "Microsoft.Sql/servers/restorableDroppedDatabases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "rdd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        location: { armPath: ["location"], value: createStringShape(), readOnly: true },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => restorableDroppedDatabasePropertiesShape),
          readOnly: true,
        },
        sku: { armPath: ["sku"], value: createDeferredShape(() => skuShape), readOnly: true },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()), readOnly: true },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.Sql/servers/restorableDroppedDatabases"> & Record<string, unknown> {
    return {
      ...props,
      type: RestorableDroppedDatabase.resourceType,
      apiVersion: RestorableDroppedDatabase.apiVersion,
    };
  }

  constructor(
    context: Server,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RestorableDroppedDatabase.buildResourceProps(props), options);
  }

  /**
   * Resource location.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }

  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<RestorableDroppedDatabaseProperties> {
    return this.expr("properties") as any;
  }

  /**
   * The name and tier of the SKU.
   */
  get sku(): Expression<Sku> {
    return this.expr("sku") as any;
  }

  /**
   * Resource tags.
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}

export interface ServerSecurityAlertPolicyProps {
  /**
   * The name of the security alert policy.
   */
  name?: ExpressionOrValue<SecurityAlertPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: SecurityAlertsPolicyPropertiesInput | undefined;
}

/**
 * A server security alert policy.
 */
export class ServerSecurityAlertPolicy extends Resource<"Microsoft.Sql/servers/securityAlertPolicies"> {
  static resourceType = "Microsoft.Sql/servers/securityAlertPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sap",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => securityAlertsPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/securityAlertPolicies"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerSecurityAlertPolicy.resourceType,
      apiVersion: ServerSecurityAlertPolicy.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerSecurityAlertPolicy.buildResourceProps(props), options);
  }

  /**
   * The name of the security alert policy.
   */
  get name(): Expression<SecurityAlertPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<SecurityAlertPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SecurityAlertsPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SecurityAlertsPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SqlServerSqlVulnerabilityAssessmentProps {
  /**
   * The name of the SQL Vulnerability Assessment.
   */
  name?: ExpressionOrValue<VulnerabilityAssessmentName> | undefined;
  /**
   * Resource properties.
   */
  properties?: SqlVulnerabilityAssessmentPolicyPropertiesInput | undefined;
}

/**
 * A SQL Vulnerability Assessment.
 */
export class SqlServerSqlVulnerabilityAssessment extends Resource<"Microsoft.Sql/servers/sqlVulnerabilityAssessments"> {
  static resourceType = "Microsoft.Sql/servers/sqlVulnerabilityAssessments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sva",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlVulnerabilityAssessmentPolicyPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlServerSqlVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/sqlVulnerabilityAssessments"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlServerSqlVulnerabilityAssessment.resourceType,
      apiVersion: SqlServerSqlVulnerabilityAssessment.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (SqlServerSqlVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlServerSqlVulnerabilityAssessment.buildResourceProps(props), options);
  }

  /**
   * The name of the SQL Vulnerability Assessment.
   */
  get name(): Expression<VulnerabilityAssessmentName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<VulnerabilityAssessmentName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SqlVulnerabilityAssessmentPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlVulnerabilityAssessmentPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SyncAgentProps {
  /**
   * The name of the sync agent.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: SyncAgentPropertiesInput | undefined;
}

/**
 * An Azure SQL Database sync agent.
 */
export class SyncAgent extends Resource<"Microsoft.Sql/servers/syncAgents"> {
  static resourceType = "Microsoft.Sql/servers/syncAgents" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sa",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => syncAgentPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (SyncAgentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/syncAgents"> & Record<string, unknown> {
    return {
      ...props,
      type: SyncAgent.resourceType,
      apiVersion: SyncAgent.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?: (SyncAgentProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SyncAgent.buildResourceProps(props), options);
  }

  /**
   * The name of the sync agent.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): SyncAgentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SyncAgentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface VirtualNetworkRuleProps {
  /**
   * The name of the virtual network rule.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: VirtualNetworkRulePropertiesInput | undefined;
}

/**
 * A virtual network rule.
 */
export class VirtualNetworkRule extends Resource<"Microsoft.Sql/servers/virtualNetworkRules"> {
  static resourceType = "Microsoft.Sql/servers/virtualNetworkRules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "vnr",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => virtualNetworkRulePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (VirtualNetworkRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/virtualNetworkRules"> & Record<string, unknown> {
    return {
      ...props,
      type: VirtualNetworkRule.resourceType,
      apiVersion: VirtualNetworkRule.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (VirtualNetworkRuleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, VirtualNetworkRule.buildResourceProps(props), options);
  }

  /**
   * The name of the virtual network rule.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): VirtualNetworkRulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: VirtualNetworkRulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ServerVulnerabilityAssessmentProps {
  /**
   * The name of the vulnerability assessment.
   */
  name?: ExpressionOrValue<VulnerabilityAssessmentName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerVulnerabilityAssessmentPropertiesInput | undefined;
}

/**
 * A server vulnerability assessment.
 */
export class ServerVulnerabilityAssessment extends Resource<"Microsoft.Sql/servers/vulnerabilityAssessments"> {
  static resourceType = "Microsoft.Sql/servers/vulnerabilityAssessments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "va",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverVulnerabilityAssessmentPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ServerVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers/vulnerabilityAssessments"> & Record<string, unknown> {
    return {
      ...props,
      type: ServerVulnerabilityAssessment.resourceType,
      apiVersion: ServerVulnerabilityAssessment.apiVersion,
    };
  }

  constructor(
    context: Server,
    props?:
      | (ServerVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerVulnerabilityAssessment.buildResourceProps(props), options);
  }

  /**
   * The name of the vulnerability assessment.
   */
  get name(): Expression<VulnerabilityAssessmentName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<VulnerabilityAssessmentName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerVulnerabilityAssessmentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerVulnerabilityAssessmentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Azure SQL Database server.
 */
export class Server extends Resource<"Microsoft.Sql/servers"> {
  static resourceType = "Microsoft.Sql/servers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sql",
    pattern: {
      regex: "",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => resourceIdentityShape),
        },
        kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (ServerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/servers"> & Record<string, unknown> {
    return {
      ...props,
      type: Server.resourceType,
      apiVersion: Server.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (ServerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Server.buildResourceProps(props), options);
  }

  /**
   * The Azure Active Directory identity of the server.
   */
  get identity(): ResourceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ResourceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * Kind of sql server. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the server.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}
