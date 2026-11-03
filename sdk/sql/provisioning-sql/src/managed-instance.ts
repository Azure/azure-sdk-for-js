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
  createBooleanShape,
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
  type AdvancedThreatProtectionName,
  type AdvancedThreatProtectionPropertiesInput,
  advancedThreatProtectionPropertiesShape,
  type AdvancedThreatProtectionPropertiesView,
  type AuthenticationName,
  type CurrentSensitivityLabelSource,
  type DatabaseColumnProperties,
  databaseColumnPropertiesShape,
  type DatabaseTableProperties,
  databaseTablePropertiesShape,
  type DatabaseVulnerabilityAssessmentPropertiesInput,
  databaseVulnerabilityAssessmentPropertiesShape,
  type DatabaseVulnerabilityAssessmentPropertiesView,
  type DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput,
  databaseVulnerabilityAssessmentRuleBaselinePropertiesShape,
  type DatabaseVulnerabilityAssessmentRuleBaselinePropertiesView,
  type DistributedAvailabilityGroupPropertiesInput,
  distributedAvailabilityGroupPropertiesShape,
  type DistributedAvailabilityGroupPropertiesView,
  type DtcName,
  type EncryptionProtectorName,
  type EndpointCertificateProperties,
  endpointCertificatePropertiesShape,
  type ManagedBackupShortTermRetentionPolicyPropertiesInput,
  managedBackupShortTermRetentionPolicyPropertiesShape,
  type ManagedBackupShortTermRetentionPolicyPropertiesView,
  type ManagedDatabasePropertiesInput,
  managedDatabasePropertiesShape,
  type ManagedDatabasePropertiesView,
  type ManagedDatabaseRestoreDetailsProperties,
  managedDatabaseRestoreDetailsPropertiesShape,
  type ManagedInstanceAdministratorPropertiesInput,
  managedInstanceAdministratorPropertiesShape,
  type ManagedInstanceAdministratorPropertiesView,
  type ManagedInstanceAzureAdOnlyAuthPropertiesInput,
  managedInstanceAzureAdOnlyAuthPropertiesShape,
  type ManagedInstanceAzureAdOnlyAuthPropertiesView,
  type ManagedInstanceDtcPropertiesInput,
  managedInstanceDtcPropertiesShape,
  type ManagedInstanceDtcPropertiesView,
  type ManagedInstanceEncryptionProtectorPropertiesInput,
  managedInstanceEncryptionProtectorPropertiesShape,
  type ManagedInstanceEncryptionProtectorPropertiesView,
  type ManagedInstanceKeyPropertiesInput,
  managedInstanceKeyPropertiesShape,
  type ManagedInstanceKeyPropertiesView,
  type ManagedInstanceLongTermRetentionPolicyName,
  type ManagedInstanceLongTermRetentionPolicyPropertiesInput,
  managedInstanceLongTermRetentionPolicyPropertiesShape,
  type ManagedInstanceLongTermRetentionPolicyPropertiesView,
  type ManagedInstanceOperationProperties,
  managedInstanceOperationPropertiesShape,
  type ManagedInstancePrivateEndpointConnectionPropertiesInput,
  managedInstancePrivateEndpointConnectionPropertiesShape,
  type ManagedInstancePrivateEndpointConnectionPropertiesView,
  type ManagedInstancePrivateLinkProperties,
  managedInstancePrivateLinkPropertiesShape,
  type ManagedInstancePropertiesInput,
  managedInstancePropertiesShape,
  type ManagedInstancePropertiesView,
  type ManagedInstanceVulnerabilityAssessmentPropertiesInput,
  managedInstanceVulnerabilityAssessmentPropertiesShape,
  type ManagedInstanceVulnerabilityAssessmentPropertiesView,
  type ManagedLedgerDigestUploadsName,
  type ManagedLedgerDigestUploadsPropertiesInput,
  managedLedgerDigestUploadsPropertiesShape,
  type ManagedLedgerDigestUploadsPropertiesView,
  type ManagedServerDnsAliasProperties,
  managedServerDnsAliasPropertiesShape,
  type ManagedShortTermRetentionPolicyName,
  type ManagedTransparentDataEncryptionPropertiesInput,
  managedTransparentDataEncryptionPropertiesShape,
  type ManagedTransparentDataEncryptionPropertiesView,
  type QueryProperties,
  queryPropertiesShape,
  type RecoverableManagedDatabaseProperties,
  recoverableManagedDatabasePropertiesShape,
  type ResourceIdentityInput,
  resourceIdentityShape,
  type ResourceIdentityView,
  type RestorableDroppedManagedDatabaseProperties,
  restorableDroppedManagedDatabasePropertiesShape,
  type RestoreDetailsName,
  type SecurityAlertPolicyName,
  type SecurityAlertPolicyPropertiesInput,
  securityAlertPolicyPropertiesShape,
  type SecurityAlertPolicyPropertiesView,
  type SecurityAlertsPolicyPropertiesInput,
  securityAlertsPolicyPropertiesShape,
  type SecurityAlertsPolicyPropertiesView,
  type SensitivityLabelPropertiesInput,
  sensitivityLabelPropertiesShape,
  type SensitivityLabelPropertiesView,
  type ServerConfigurationOptionName,
  type ServerConfigurationOptionPropertiesInput,
  serverConfigurationOptionPropertiesShape,
  type ServerConfigurationOptionPropertiesView,
  type ServerTrustCertificatePropertiesInput,
  serverTrustCertificatePropertiesShape,
  type ServerTrustCertificatePropertiesView,
  type SkuInput,
  skuShape,
  type SkuView,
  type SqlAgentConfigurationPropertiesInput,
  sqlAgentConfigurationPropertiesShape,
  type SqlAgentConfigurationPropertiesView,
  type StartStopManagedInstanceSchedulePropertiesInput,
  startStopManagedInstanceSchedulePropertiesShape,
  type StartStopManagedInstanceSchedulePropertiesView,
  type StartStopScheduleName,
  type TransparentDataEncryptionName,
  type VulnerabilityAssessmentName,
  type VulnerabilityAssessmentPolicyBaselineName,
  type VulnerabilityAssessmentScanRecordProperties,
  vulnerabilityAssessmentScanRecordPropertiesShape,
} from "./types.js";

const API_VERSION = "2025-01-01";

export interface ManagedInstanceProps {
  /**
   * The Azure Active Directory identity of the managed instance.
   */
  identity?: ResourceIdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the managed instance.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstancePropertiesInput | undefined;
  /**
   * Managed instance SKU. Allowed values for sku.name: GP_Gen5 (General Purpose, Standard-series); GP_G8IM (General Purpose, Premium-series); GP_G8IH (General Purpose, Premium-series memory optimized); BC_Gen5 (Business Critical, Standard-Series); BC_G8IM (Business Critical, Premium-series); BC_G8IH (Business Critical, Premium-series memory optimized).
   */
  sku?: SkuInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ManagedInstanceAdministratorProps {
  name?: ExpressionOrValue<AdministratorName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceAdministratorPropertiesInput | undefined;
}

/**
 * An Azure SQL managed instance administrator.
 */
export class ManagedInstanceAdministrator extends Resource<"Microsoft.Sql/managedInstances/administrators"> {
  static resourceType = "Microsoft.Sql/managedInstances/administrators" as const;
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
          value: createDeferredShape(() => managedInstanceAdministratorPropertiesShape),
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
      | (ManagedInstanceAdministratorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/administrators"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceAdministrator.resourceType,
      apiVersion: ManagedInstanceAdministrator.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceAdministratorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceAdministrator.buildResourceProps(props), options);
  }

  get name(): Expression<AdministratorName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<AdministratorName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ManagedInstanceAdministratorPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceAdministratorPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceAdvancedThreatProtectionProps {
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
 * A managed instance Advanced Threat Protection.
 */
export class ManagedInstanceAdvancedThreatProtection extends Resource<"Microsoft.Sql/managedInstances/advancedThreatProtectionSettings"> {
  static resourceType = "Microsoft.Sql/managedInstances/advancedThreatProtectionSettings" as const;
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
      | (ManagedInstanceAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/advancedThreatProtectionSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceAdvancedThreatProtection.resourceType,
      apiVersion: ManagedInstanceAdvancedThreatProtection.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceAdvancedThreatProtection.buildResourceProps(props), options);
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

export interface ManagedInstanceAzureAdOnlyAuthenticationProps {
  /**
   * The name of server azure active directory only authentication.
   */
  name?: ExpressionOrValue<AuthenticationName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceAzureAdOnlyAuthPropertiesInput | undefined;
}

/**
 * Azure Active Directory only authentication.
 */
export class ManagedInstanceAzureAdOnlyAuthentication extends Resource<"Microsoft.Sql/managedInstances/azureADOnlyAuthentications"> {
  static resourceType = "Microsoft.Sql/managedInstances/azureADOnlyAuthentications" as const;
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
          value: createDeferredShape(() => managedInstanceAzureAdOnlyAuthPropertiesShape),
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
      | (ManagedInstanceAzureAdOnlyAuthenticationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/azureADOnlyAuthentications"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceAzureAdOnlyAuthentication.resourceType,
      apiVersion: ManagedInstanceAzureAdOnlyAuthentication.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceAzureAdOnlyAuthenticationProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceAzureAdOnlyAuthentication.buildResourceProps(props), options);
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
  get properties(): ManagedInstanceAzureAdOnlyAuthPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceAzureAdOnlyAuthPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceDatabaseProps {
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
  properties?: ManagedDatabasePropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ManagedDatabaseAdvancedThreatProtectionProps {
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
 * A managed database Advanced Threat Protection.
 */
export class ManagedDatabaseAdvancedThreatProtection extends Resource<"Microsoft.Sql/managedInstances/databases/advancedThreatProtectionSettings"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/advancedThreatProtectionSettings" as const;
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
      | (ManagedDatabaseAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/advancedThreatProtectionSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseAdvancedThreatProtection.resourceType,
      apiVersion: ManagedDatabaseAdvancedThreatProtection.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedDatabaseAdvancedThreatProtectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseAdvancedThreatProtection.buildResourceProps(props), options);
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

export interface ManagedInstanceLongTermRetentionPolicyProps {
  /**
   * The policy name. Should always be Default.
   */
  name?: ExpressionOrValue<ManagedInstanceLongTermRetentionPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceLongTermRetentionPolicyPropertiesInput | undefined;
}

/**
 * A long term retention policy.
 */
export class ManagedInstanceLongTermRetentionPolicy extends Resource<"Microsoft.Sql/managedInstances/databases/backupLongTermRetentionPolicies"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/backupLongTermRetentionPolicies" as const;
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
          value: createDeferredShape(() => managedInstanceLongTermRetentionPolicyPropertiesShape),
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
      | (ManagedInstanceLongTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/backupLongTermRetentionPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceLongTermRetentionPolicy.resourceType,
      apiVersion: ManagedInstanceLongTermRetentionPolicy.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedInstanceLongTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceLongTermRetentionPolicy.buildResourceProps(props), options);
  }

  /**
   * The policy name. Should always be Default.
   */
  get name(): Expression<ManagedInstanceLongTermRetentionPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ManagedInstanceLongTermRetentionPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ManagedInstanceLongTermRetentionPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceLongTermRetentionPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedBackupShortTermRetentionPolicyProps {
  /**
   * The policy name.
   */
  name?: ExpressionOrValue<ManagedShortTermRetentionPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedBackupShortTermRetentionPolicyPropertiesInput | undefined;
}

/**
 * A short term retention policy.
 */
export class ManagedBackupShortTermRetentionPolicy extends Resource<"Microsoft.Sql/managedInstances/databases/backupShortTermRetentionPolicies"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/backupShortTermRetentionPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "bstrp",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedBackupShortTermRetentionPolicyPropertiesShape),
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
      | (ManagedBackupShortTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/backupShortTermRetentionPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedBackupShortTermRetentionPolicy.resourceType,
      apiVersion: ManagedBackupShortTermRetentionPolicy.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedBackupShortTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedBackupShortTermRetentionPolicy.buildResourceProps(props), options);
  }

  /**
   * The policy name.
   */
  get name(): Expression<ManagedShortTermRetentionPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ManagedShortTermRetentionPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ManagedBackupShortTermRetentionPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedBackupShortTermRetentionPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceDatabaseLedgerDigestUploadProps {
  name?: ExpressionOrValue<ManagedLedgerDigestUploadsName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedLedgerDigestUploadsPropertiesInput | undefined;
}

/**
 * Azure SQL Database ledger digest upload settings.
 */
export class ManagedInstanceDatabaseLedgerDigestUpload extends Resource<"Microsoft.Sql/managedInstances/databases/ledgerDigestUploads"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/ledgerDigestUploads" as const;
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
          value: createDeferredShape(() => managedLedgerDigestUploadsPropertiesShape),
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
      | (ManagedInstanceDatabaseLedgerDigestUploadProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/ledgerDigestUploads"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceDatabaseLedgerDigestUpload.resourceType,
      apiVersion: ManagedInstanceDatabaseLedgerDigestUpload.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedInstanceDatabaseLedgerDigestUploadProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceDatabaseLedgerDigestUpload.buildResourceProps(props), options);
  }

  get name(): Expression<ManagedLedgerDigestUploadsName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ManagedLedgerDigestUploadsName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ManagedLedgerDigestUploadsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedLedgerDigestUploadsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Database query.
 */
export class Query extends Resource<"Microsoft.Sql/managedInstances/databases/queries"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/queries" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "q",
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
          value: createDeferredShape(() => queryPropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/queries"> & Record<string, unknown> {
    return {
      ...props,
      type: Query.resourceType,
      apiVersion: Query.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, Query.buildResourceProps(props), options);
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
  get properties(): Expression<QueryProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A managed database restore details.
 */
export class RestoreDetail extends Resource<"Microsoft.Sql/managedInstances/databases/restoreDetails"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/restoreDetails" as const;
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
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedDatabaseRestoreDetailsPropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/restoreDetails"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RestoreDetail.resourceType,
      apiVersion: RestoreDetail.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RestoreDetail.buildResourceProps(props), options);
  }

  /**
   * The name of the restore details to retrieve.
   */
  get name(): Expression<RestoreDetailsName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<RestoreDetailsName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<ManagedDatabaseRestoreDetailsProperties> {
    return this.expr("properties") as any;
  }
}

export interface ManagedDatabaseSensitivityLabelProps {
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
export class ManagedDatabaseSensitivityLabel extends Resource<"Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels" as const;
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
      | (ManagedDatabaseSensitivityLabelProps & { existing?: false })
      | (ExistingResourceProps<CurrentSensitivityLabelSource> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseSensitivityLabel.resourceType,
      apiVersion: ManagedDatabaseSensitivityLabel.apiVersion,
    };
  }

  constructor(
    context: ManagedDatabaseColumn,
    props:
      | (ManagedDatabaseSensitivityLabelProps & { existing?: false })
      | (ExistingResourceProps<CurrentSensitivityLabelSource> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseSensitivityLabel.buildResourceProps(props), options);
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
export class ManagedDatabaseColumn extends Resource<"Microsoft.Sql/managedInstances/databases/schemas/tables/columns"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/schemas/tables/columns" as const;
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/schemas/tables/columns"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseColumn.resourceType,
      apiVersion: ManagedDatabaseColumn.apiVersion,
    };
  }

  constructor(
    context: ManagedDatabaseTable,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseColumn.buildResourceProps(props), options);
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
export class ManagedDatabaseTable extends Resource<"Microsoft.Sql/managedInstances/databases/schemas/tables"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/schemas/tables" as const;
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/schemas/tables"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseTable.resourceType,
      apiVersion: ManagedDatabaseTable.apiVersion,
    };
  }

  constructor(
    context: ManagedDatabaseSchema,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseTable.buildResourceProps(props), options);
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
export class ManagedDatabaseSchema extends Resource<"Microsoft.Sql/managedInstances/databases/schemas"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/schemas" as const;
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/schemas"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseSchema.resourceType,
      apiVersion: ManagedDatabaseSchema.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseSchema.buildResourceProps(props), options);
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

export interface ManagedInstanceDatabaseSecurityAlertPolicyProps {
  /**
   * The name of the security alert policy.
   */
  name?: ExpressionOrValue<SecurityAlertPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: SecurityAlertPolicyPropertiesInput | undefined;
}

/**
 * A managed database security alert policy.
 */
export class ManagedInstanceDatabaseSecurityAlertPolicy extends Resource<"Microsoft.Sql/managedInstances/databases/securityAlertPolicies"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases/securityAlertPolicies" as const;
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
          value: createDeferredShape(() => securityAlertPolicyPropertiesShape),
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
      | (ManagedInstanceDatabaseSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/securityAlertPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceDatabaseSecurityAlertPolicy.resourceType,
      apiVersion: ManagedInstanceDatabaseSecurityAlertPolicy.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedInstanceDatabaseSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceDatabaseSecurityAlertPolicy.buildResourceProps(props), options);
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
  get properties(): SecurityAlertPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SecurityAlertPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceDatabaseTransparentDataEncryptionProps {
  /**
   * The name of the transparent data encryption configuration.
   */
  name?: ExpressionOrValue<TransparentDataEncryptionName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedTransparentDataEncryptionPropertiesInput | undefined;
}

/**
 * A managed database transparent data encryption state.
 */
export class ManagedInstanceDatabaseTransparentDataEncryption extends Resource<"Microsoft.Sql/managedInstances/databases/transparentDataEncryption"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/transparentDataEncryption" as const;
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
          value: createDeferredShape(() => managedTransparentDataEncryptionPropertiesShape),
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
      | (ManagedInstanceDatabaseTransparentDataEncryptionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/transparentDataEncryption"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceDatabaseTransparentDataEncryption.resourceType,
      apiVersion: ManagedInstanceDatabaseTransparentDataEncryption.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedInstanceDatabaseTransparentDataEncryptionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(
      context,
      ManagedInstanceDatabaseTransparentDataEncryption.buildResourceProps(props),
      options,
    );
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
  get properties(): ManagedTransparentDataEncryptionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedTransparentDataEncryptionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedDatabaseVulnerabilityAssessmentProps {
  /**
   * The name of the vulnerability assessment.
   */
  name?: ExpressionOrValue<VulnerabilityAssessmentName> | undefined;
  /**
   * Resource properties.
   */
  properties?: DatabaseVulnerabilityAssessmentPropertiesInput | undefined;
}

export interface ManagedDatabaseVulnerabilityAssessmentRuleBaselineProps {
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
export class ManagedDatabaseVulnerabilityAssessmentRuleBaseline extends Resource<"Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines" as const;
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
      | (ManagedDatabaseVulnerabilityAssessmentRuleBaselineProps & { existing?: false })
      | (ExistingResourceProps<VulnerabilityAssessmentPolicyBaselineName> & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseVulnerabilityAssessmentRuleBaseline.resourceType,
      apiVersion: ManagedDatabaseVulnerabilityAssessmentRuleBaseline.apiVersion,
    };
  }

  constructor(
    context: ManagedDatabaseVulnerabilityAssessment,
    props:
      | (ManagedDatabaseVulnerabilityAssessmentRuleBaselineProps & { existing?: false })
      | (ExistingResourceProps<VulnerabilityAssessmentPolicyBaselineName> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(
      context,
      ManagedDatabaseVulnerabilityAssessmentRuleBaseline.buildResourceProps(props),
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
export class ManagedDatabaseVulnerabilityAssessmentScan extends Resource<"Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/scans"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/scans" as const;
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/scans"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseVulnerabilityAssessmentScan.resourceType,
      apiVersion: ManagedDatabaseVulnerabilityAssessmentScan.apiVersion,
    };
  }

  constructor(
    context: ManagedDatabaseVulnerabilityAssessment,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseVulnerabilityAssessmentScan.buildResourceProps(props), options);
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
export class ManagedDatabaseVulnerabilityAssessment extends Resource<"Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments" as const;
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
      | (ManagedDatabaseVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedDatabaseVulnerabilityAssessment.resourceType,
      apiVersion: ManagedDatabaseVulnerabilityAssessment.apiVersion,
    };
  }

  constructor(
    context: ManagedInstanceDatabase,
    props?:
      | (ManagedDatabaseVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedDatabaseVulnerabilityAssessment.buildResourceProps(props), options);
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

/**
 * A managed database resource.
 */
export class ManagedInstanceDatabase extends Resource<"Microsoft.Sql/managedInstances/databases"> {
  static resourceType = "Microsoft.Sql/managedInstances/databases" as const;
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
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedDatabasePropertiesShape),
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
      | (ManagedInstanceDatabaseProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/databases"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceDatabase.resourceType,
      apiVersion: ManagedInstanceDatabase.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceDatabaseProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceDatabase.buildResourceProps(props), options);
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
  get properties(): ManagedDatabasePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedDatabasePropertiesInput | undefined) {
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

export interface DistributedAvailabilityGroupProps {
  /**
   * The distributed availability group name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: DistributedAvailabilityGroupPropertiesInput | undefined;
}

/**
 * Distributed availability group between box and Sql Managed Instance.
 */
export class DistributedAvailabilityGroup extends Resource<"Microsoft.Sql/managedInstances/distributedAvailabilityGroups"> {
  static resourceType = "Microsoft.Sql/managedInstances/distributedAvailabilityGroups" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "dag",
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
          value: createDeferredShape(() => distributedAvailabilityGroupPropertiesShape),
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
      | (DistributedAvailabilityGroupProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/distributedAvailabilityGroups"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DistributedAvailabilityGroup.resourceType,
      apiVersion: DistributedAvailabilityGroup.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (DistributedAvailabilityGroupProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DistributedAvailabilityGroup.buildResourceProps(props), options);
  }

  /**
   * The distributed availability group name.
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
  get properties(): DistributedAvailabilityGroupPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DistributedAvailabilityGroupPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceDnsAliasProps {
  /**
   * Whether or not DNS record should be created for this alias.
   */
  createDnsRecord?: ExpressionOrValue<boolean> | undefined;
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * A managed server DNS alias.
 */
export class ManagedInstanceDnsAlias extends Resource<"Microsoft.Sql/managedInstances/dnsAliases"> {
  static resourceType = "Microsoft.Sql/managedInstances/dnsAliases" as const;
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
        createDnsRecord: { armPath: ["createDnsRecord"], value: createBooleanShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedServerDnsAliasPropertiesShape),
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
      | (ManagedInstanceDnsAliasProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/dnsAliases"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceDnsAlias.resourceType,
      apiVersion: ManagedInstanceDnsAlias.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceDnsAliasProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceDnsAlias.buildResourceProps(props), options);
  }

  /**
   * Whether or not DNS record should be created for this alias.
   */
  get createDnsRecord(): Expression<boolean> {
    return this.expr("createDnsRecord");
  }
  set createDnsRecord(value: ExpressionOrValue<boolean> | undefined) {
    this.setProperty("createDnsRecord", value);
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
  get properties(): Expression<ManagedServerDnsAliasProperties> {
    return this.expr("properties") as any;
  }
}

export interface DtcProps {
  /**
   * The name of the managed instance DTC.
   */
  name?: ExpressionOrValue<DtcName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceDtcPropertiesInput | undefined;
}

/**
 * SQL Managed Instance DTC
 */
export class Dtc extends Resource<"Microsoft.Sql/managedInstances/dtc"> {
  static resourceType = "Microsoft.Sql/managedInstances/dtc" as const;
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
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedInstanceDtcPropertiesShape),
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
    props?: (DtcProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/dtc"> & Record<string, unknown> {
    return {
      ...props,
      type: Dtc.resourceType,
      apiVersion: Dtc.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?: (DtcProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Dtc.buildResourceProps(props), options);
  }

  /**
   * The name of the managed instance DTC.
   */
  get name(): Expression<DtcName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<DtcName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ManagedInstanceDtcPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceDtcPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceEncryptionProtectorProps {
  /**
   * The name of the encryption protector to be retrieved.
   */
  name?: ExpressionOrValue<EncryptionProtectorName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceEncryptionProtectorPropertiesInput | undefined;
}

/**
 * The managed instance encryption protector.
 */
export class ManagedInstanceEncryptionProtector extends Resource<"Microsoft.Sql/managedInstances/encryptionProtector"> {
  static resourceType = "Microsoft.Sql/managedInstances/encryptionProtector" as const;
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
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedInstanceEncryptionProtectorPropertiesShape),
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
      | (ManagedInstanceEncryptionProtectorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/encryptionProtector"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceEncryptionProtector.resourceType,
      apiVersion: ManagedInstanceEncryptionProtector.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceEncryptionProtectorProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceEncryptionProtector.buildResourceProps(props), options);
  }

  /**
   * Kind of encryption protector. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
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
  get properties(): ManagedInstanceEncryptionProtectorPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceEncryptionProtectorPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * Certificate used on an endpoint on the Managed Instance.
 */
export class EndpointCertificate extends Resource<"Microsoft.Sql/managedInstances/endpointCertificates"> {
  static resourceType = "Microsoft.Sql/managedInstances/endpointCertificates" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ec",
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
          value: createDeferredShape(() => endpointCertificatePropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/endpointCertificates"> &
    Record<string, unknown> {
    return {
      ...props,
      type: EndpointCertificate.resourceType,
      apiVersion: EndpointCertificate.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, EndpointCertificate.buildResourceProps(props), options);
  }

  /**
   * Type of the endpoint whose certificate the customer is looking for.
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
  get properties(): Expression<EndpointCertificateProperties> {
    return this.expr("properties") as any;
  }
}

export interface ManagedInstanceKeyProps {
  /**
   * The name of the managed instance key to be retrieved.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceKeyPropertiesInput | undefined;
}

/**
 * A managed instance key.
 */
export class ManagedInstanceKey extends Resource<"Microsoft.Sql/managedInstances/keys"> {
  static resourceType = "Microsoft.Sql/managedInstances/keys" as const;
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
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedInstanceKeyPropertiesShape),
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
      | (ManagedInstanceKeyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/keys"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceKey.resourceType,
      apiVersion: ManagedInstanceKey.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceKeyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceKey.buildResourceProps(props), options);
  }

  /**
   * Kind of encryption protector. This is metadata used for the Azure portal experience.
   */
  get kind(): Expression<string> {
    return this.expr("kind");
  }

  /**
   * The name of the managed instance key to be retrieved.
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
  get properties(): ManagedInstanceKeyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceKeyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A managed instance operation.
 */
export class ManagedInstanceOperation extends Resource<"Microsoft.Sql/managedInstances/operations"> {
  static resourceType = "Microsoft.Sql/managedInstances/operations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "o",
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
          value: createDeferredShape(() => managedInstanceOperationPropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/operations"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceOperation.resourceType,
      apiVersion: ManagedInstanceOperation.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceOperation.buildResourceProps(props), options);
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
  get properties(): Expression<ManagedInstanceOperationProperties> {
    return this.expr("properties") as any;
  }
}

export interface ManagedInstancePrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstancePrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * A private endpoint connection
 */
export class ManagedInstancePrivateEndpointConnection extends Resource<"Microsoft.Sql/managedInstances/privateEndpointConnections"> {
  static resourceType = "Microsoft.Sql/managedInstances/privateEndpointConnections" as const;
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
          value: createDeferredShape(() => managedInstancePrivateEndpointConnectionPropertiesShape),
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
      | (ManagedInstancePrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstancePrivateEndpointConnection.resourceType,
      apiVersion: ManagedInstancePrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstancePrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstancePrivateEndpointConnection.buildResourceProps(props), options);
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
  get properties(): ManagedInstancePrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstancePrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A private link resource
 */
export class ManagedInstancePrivateLink extends Resource<"Microsoft.Sql/managedInstances/privateLinkResources"> {
  static resourceType = "Microsoft.Sql/managedInstances/privateLinkResources" as const;
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
          value: createDeferredShape(() => managedInstancePrivateLinkPropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/privateLinkResources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstancePrivateLink.resourceType,
      apiVersion: ManagedInstancePrivateLink.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstancePrivateLink.buildResourceProps(props), options);
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
  get properties(): Expression<ManagedInstancePrivateLinkProperties> {
    return this.expr("properties") as any;
  }
}

/**
 * A recoverable managed database resource.
 */
export class RecoverableManagedDatabase extends Resource<"Microsoft.Sql/managedInstances/recoverableDatabases"> {
  static resourceType = "Microsoft.Sql/managedInstances/recoverableDatabases" as const;
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
          value: createDeferredShape(() => recoverableManagedDatabasePropertiesShape),
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/recoverableDatabases"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RecoverableManagedDatabase.resourceType,
      apiVersion: RecoverableManagedDatabase.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RecoverableManagedDatabase.buildResourceProps(props), options);
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
  get properties(): Expression<RecoverableManagedDatabaseProperties> {
    return this.expr("properties") as any;
  }
}

export interface ManagedRestorableDroppedDbBackupShortTermRetentionPolicyProps {
  /**
   * The policy name.
   */
  name?: ExpressionOrValue<ManagedShortTermRetentionPolicyName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedBackupShortTermRetentionPolicyPropertiesInput | undefined;
}

/**
 * A short term retention policy.
 */
export class ManagedRestorableDroppedDbBackupShortTermRetentionPolicy extends Resource<"Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies"> {
  static resourceType =
    "Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "bstrp",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedBackupShortTermRetentionPolicyPropertiesShape),
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
      | (ManagedRestorableDroppedDbBackupShortTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedRestorableDroppedDbBackupShortTermRetentionPolicy.resourceType,
      apiVersion: ManagedRestorableDroppedDbBackupShortTermRetentionPolicy.apiVersion,
    };
  }

  constructor(
    context: RestorableDroppedManagedDatabase,
    props?:
      | (ManagedRestorableDroppedDbBackupShortTermRetentionPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(
      context,
      ManagedRestorableDroppedDbBackupShortTermRetentionPolicy.buildResourceProps(props),
      options,
    );
  }

  /**
   * The policy name.
   */
  get name(): Expression<ManagedShortTermRetentionPolicyName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ManagedShortTermRetentionPolicyName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ManagedBackupShortTermRetentionPolicyPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedBackupShortTermRetentionPolicyPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A restorable dropped managed database resource.
 */
export class RestorableDroppedManagedDatabase extends Resource<"Microsoft.Sql/managedInstances/restorableDroppedDatabases"> {
  static resourceType = "Microsoft.Sql/managedInstances/restorableDroppedDatabases" as const;
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
          value: createDeferredShape(() => restorableDroppedManagedDatabasePropertiesShape),
          readOnly: true,
        },
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
  ): ResourceProps<"Microsoft.Sql/managedInstances/restorableDroppedDatabases"> &
    Record<string, unknown> {
    return {
      ...props,
      type: RestorableDroppedManagedDatabase.resourceType,
      apiVersion: RestorableDroppedManagedDatabase.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, RestorableDroppedManagedDatabase.buildResourceProps(props), options);
  }

  /**
   * The geo-location where the resource lives
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
  get properties(): Expression<RestorableDroppedManagedDatabaseProperties> {
    return this.expr("properties") as any;
  }

  /**
   * Resource tags.
   */
  get tags(): Expression<Record<string, string>> {
    return this.expr("tags");
  }
}

export interface ManagedInstanceSecurityAlertPolicyProps {
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
 * A managed server security alert policy.
 */
export class ManagedInstanceSecurityAlertPolicy extends Resource<"Microsoft.Sql/managedInstances/securityAlertPolicies"> {
  static resourceType = "Microsoft.Sql/managedInstances/securityAlertPolicies" as const;
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
      | (ManagedInstanceSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/securityAlertPolicies"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceSecurityAlertPolicy.resourceType,
      apiVersion: ManagedInstanceSecurityAlertPolicy.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceSecurityAlertPolicyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceSecurityAlertPolicy.buildResourceProps(props), options);
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

export interface ServerConfigurationOptionProps {
  /**
   * The name of the server configuration option.
   */
  name?: ExpressionOrValue<ServerConfigurationOptionName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerConfigurationOptionPropertiesInput | undefined;
}

/**
 * A server configuration option
 */
export class ServerConfigurationOption extends Resource<"Microsoft.Sql/managedInstances/serverConfigurationOptions"> {
  static resourceType = "Microsoft.Sql/managedInstances/serverConfigurationOptions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sco",
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
          value: createDeferredShape(() => serverConfigurationOptionPropertiesShape),
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
      | (ServerConfigurationOptionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/serverConfigurationOptions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ServerConfigurationOption.resourceType,
      apiVersion: ServerConfigurationOption.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ServerConfigurationOptionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ServerConfigurationOption.buildResourceProps(props), options);
  }

  /**
   * The name of the server configuration option.
   */
  get name(): Expression<ServerConfigurationOptionName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<ServerConfigurationOptionName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): ServerConfigurationOptionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerConfigurationOptionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceServerTrustCertificateProps {
  /**
   * Name of of the certificate to get.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: ServerTrustCertificatePropertiesInput | undefined;
}

/**
 * Server trust certificate imported from box to enable connection between box and Sql Managed Instance.
 */
export class ManagedInstanceServerTrustCertificate extends Resource<"Microsoft.Sql/managedInstances/serverTrustCertificates"> {
  static resourceType = "Microsoft.Sql/managedInstances/serverTrustCertificates" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "stc",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serverTrustCertificatePropertiesShape),
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
      | (ManagedInstanceServerTrustCertificateProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/serverTrustCertificates"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceServerTrustCertificate.resourceType,
      apiVersion: ManagedInstanceServerTrustCertificate.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceServerTrustCertificateProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceServerTrustCertificate.buildResourceProps(props), options);
  }

  /**
   * Name of of the certificate to get.
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
  get properties(): ServerTrustCertificatePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServerTrustCertificatePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SqlAgentProps {
  /**
   * Resource properties.
   */
  properties?: SqlAgentConfigurationPropertiesInput | undefined;
}

/**
 * A recoverable managed database resource.
 */
export class SqlAgent extends Resource<"Microsoft.Sql/managedInstances/sqlAgent"> {
  static resourceType = "Microsoft.Sql/managedInstances/sqlAgent" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlAgentConfigurationPropertiesShape),
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
    props?:
      | (SqlAgentProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/sqlAgent"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlAgent.resourceType,
      apiVersion: SqlAgent.apiVersion,
      name: "current",
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (SqlAgentProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlAgent.buildResourceProps(props), options);
  }

  get name(): Expression<"current"> {
    return this.expr("name");
  }

  /**
   * Resource properties.
   */
  get properties(): SqlAgentConfigurationPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlAgentConfigurationPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface StartStopManagedInstanceScheduleProps {
  /**
   * Name of the managed instance Start/Stop schedule.
   */
  name?: ExpressionOrValue<StartStopScheduleName> | undefined;
  /**
   * Resource properties.
   */
  properties?: StartStopManagedInstanceSchedulePropertiesInput | undefined;
}

/**
 * Managed instance's Start/Stop schedule.
 */
export class StartStopManagedInstanceSchedule extends Resource<"Microsoft.Sql/managedInstances/startStopSchedules"> {
  static resourceType = "Microsoft.Sql/managedInstances/startStopSchedules" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sss",
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
          value: createDeferredShape(() => startStopManagedInstanceSchedulePropertiesShape),
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
      | (StartStopManagedInstanceScheduleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/startStopSchedules"> & Record<string, unknown> {
    return {
      ...props,
      type: StartStopManagedInstanceSchedule.resourceType,
      apiVersion: StartStopManagedInstanceSchedule.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (StartStopManagedInstanceScheduleProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, StartStopManagedInstanceSchedule.buildResourceProps(props), options);
  }

  /**
   * Name of the managed instance Start/Stop schedule.
   */
  get name(): Expression<StartStopScheduleName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<StartStopScheduleName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): StartStopManagedInstanceSchedulePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: StartStopManagedInstanceSchedulePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface ManagedInstanceVulnerabilityAssessmentProps {
  /**
   * The name of the vulnerability assessment.
   */
  name?: ExpressionOrValue<VulnerabilityAssessmentName> | undefined;
  /**
   * Resource properties.
   */
  properties?: ManagedInstanceVulnerabilityAssessmentPropertiesInput | undefined;
}

/**
 * A managed instance vulnerability assessment.
 */
export class ManagedInstanceVulnerabilityAssessment extends Resource<"Microsoft.Sql/managedInstances/vulnerabilityAssessments"> {
  static resourceType = "Microsoft.Sql/managedInstances/vulnerabilityAssessments" as const;
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
          value: createDeferredShape(() => managedInstanceVulnerabilityAssessmentPropertiesShape),
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
      | (ManagedInstanceVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances/vulnerabilityAssessments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstanceVulnerabilityAssessment.resourceType,
      apiVersion: ManagedInstanceVulnerabilityAssessment.apiVersion,
    };
  }

  constructor(
    context: ManagedInstance,
    props?:
      | (ManagedInstanceVulnerabilityAssessmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstanceVulnerabilityAssessment.buildResourceProps(props), options);
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
  get properties(): ManagedInstanceVulnerabilityAssessmentPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstanceVulnerabilityAssessmentPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * An Azure SQL managed instance.
 */
export class ManagedInstance extends Resource<"Microsoft.Sql/managedInstances"> {
  static resourceType = "Microsoft.Sql/managedInstances" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mi",
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
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => managedInstancePropertiesShape),
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
      (ManagedInstanceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.Sql/managedInstances"> & Record<string, unknown> {
    return {
      ...props,
      type: ManagedInstance.resourceType,
      apiVersion: ManagedInstance.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?:
      (ManagedInstanceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ManagedInstance.buildResourceProps(props), options);
  }

  /**
   * The Azure Active Directory identity of the managed instance.
   */
  get identity(): ResourceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ResourceIdentityInput | undefined) {
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
   * The name of the managed instance.
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
  get properties(): ManagedInstancePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ManagedInstancePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Managed instance SKU. Allowed values for sku.name: GP_Gen5 (General Purpose, Standard-series);
   * GP_G8IM (General Purpose, Premium-series); GP_G8IH (General Purpose, Premium-series memory
   * optimized); BC_Gen5 (Business Critical, Standard-Series); BC_G8IM (Business Critical,
   * Premium-series); BC_G8IH (Business Critical, Premium-series memory optimized).
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
