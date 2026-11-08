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
  createStringShape,
  createUnionShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
 */
export type AdvancedThreatProtectionState = "New" | "Enabled" | "Disabled";

/**
 * Gets the status of availability of this advisor to customers. Possible values are 'GA', 'PublicPreview', 'LimitedPublicPreview' and 'PrivatePreview'.
 */
export type AdvisorStatus = "GA" | "PublicPreview" | "LimitedPublicPreview" | "PrivatePreview";

/**
 * Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled'
 */
export type AutoExecuteStatus = "Enabled" | "Disabled" | "Default";

/**
 * Gets the resource from which current value of auto-execute status is inherited. Auto-execute status can be set on (and inherited from) different levels in the resource hierarchy. Possible values are 'Subscription', 'Server', 'ElasticPool', 'Database' and 'Default' (when status is not explicitly set on any level).
 */
export type AutoExecuteStatusInheritedFrom =
  "Default" | "Subscription" | "Server" | "ElasticPool" | "Database";

/**
 * Reason description if desired and actual state are different.
 */
export type AutomaticTuningDisabledReason =
  | "Default"
  | "Disabled"
  | "AutoConfigured"
  | "InheritedFromServer"
  | "QueryStoreOff"
  | "QueryStoreReadOnly"
  | "NotSupported";

/**
 * Automatic tuning desired state.
 */
export type AutomaticTuningMode = "Inherit" | "Custom" | "Auto" | "Unspecified";

/**
 * Automatic tuning option actual state.
 */
export type AutomaticTuningOptionModeActual = "Off" | "On";

/**
 * Automatic tuning option desired state.
 */
export type AutomaticTuningOptionModeDesired = "Off" | "On" | "Default";

/**
 * Automatic tuning desired state.
 */
export type AutomaticTuningServerMode = "Custom" | "Auto" | "Unspecified";

/**
 * Reason description if desired and actual state are different.
 */
export type AutomaticTuningServerReason = "Default" | "Disabled" | "AutoConfigured";

export type BlobAuditingPolicyName = "default";

/**
 * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
 */
export type BlobAuditingPolicyState = "Enabled" | "Disabled";

export type CurrentSensitivityLabelSource = "current";

/**
 * The masking function that is used for the data masking rule.
 */
export type DataMaskingFunction = "Default" | "CCN" | "Email" | "Number" | "SSN" | "Text";

/**
 * The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState.
 */
export type DataMaskingRuleState = "Enabled" | "Disabled";

/**
 * The state of the data masking policy.
 */
export type DataMaskingState = "Enabled" | "Disabled";

/**
 * The state of the geo backup policy.
 */
export type GeoBackupPolicyState = "Enabled" | "Disabled";

/**
 * Gets the method in which this recommended action can be manually implemented. e.g., TSql, AzurePowerShell.
 */
export type ImplementationMethod = "TSql" | "AzurePowerShell";

/**
 * Gets whether the error could be ignored and recommended action could be retried. Possible values are: Yes/No
 */
export type IsRetryable = "Yes" | "No";

/**
 * Schedule interval type
 */
export type JobScheduleType = "Once" | "Recurring";

/**
 * Whether the target is included or excluded from the group.
 */
export type JobTargetGroupMembershipType = "Include" | "Exclude";

/**
 * Specifies the state of ledger digest upload.
 */
export type LedgerDigestUploadsState = "Enabled" | "Disabled";

/**
 * Gets if approval for applying this recommended action was given by user/system.
 */
export type RecommendedActionInitiatedBy = "User" | "System";

/**
 * Local replication role.
 */
export type ReplicationRole = "Primary" | "Secondary" | "NonReadableSecondary" | "Source" | "Copy";

/**
 * The type of restore point
 */
export type RestorePointType = "CONTINUOUS" | "DISCRETE";

/**
 * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
 */
export type SecurityAlertPolicyState = "New" | "Enabled" | "Disabled";

/**
 * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
 */
export type SecurityAlertsPolicyState = "Enabled" | "Disabled";

export type SensitivityLabelRank = "None" | "Low" | "Medium" | "High" | "Critical";

/**
 * Specifies the state of the SQL Vulnerability Assessment, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
 */
export type SqlVulnerabilityAssessmentState = "Enabled" | "Disabled";

/**
 * Specifies the state of the transparent data encryption.
 */
export type TransparentDataEncryptionState = "Enabled" | "Disabled";

export type VulnerabilityAssessmentPolicyBaselineName = "master" | "default";

/**
 * The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases.
 *
 * Known values:
 *
 * - `12`: 12
 *
 * - `24`: 24
 */
export type DiffBackupIntervalInHours = number;

/**
 * Properties of a active directory administrator.
 */
export interface AdministratorProperties {
  /**
   * Type of the sever administrator.
   */
  administratorType?: AdministratorType;
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication?: boolean;
  /**
   * Login name of the server administrator.
   */
  login: string;
  /**
   * SID (object ID) of the server administrator.
   */
  sid: string;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: string;
}

/**
 * Input type for Properties of a active directory administrator.
 */
export interface AdministratorPropertiesInput extends InputOf<AdministratorProperties> {
  /**
   * Type of the sever administrator.
   */
  administratorType?: ExpressionOrValue<AdministratorType> | undefined;
  /**
   * Login name of the server administrator.
   */
  login: ExpressionOrValue<string>;
  /**
   * SID (object ID) of the server administrator.
   */
  sid: ExpressionOrValue<string>;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a active directory administrator.
 */
export interface AdministratorPropertiesView extends InputOf<AdministratorProperties> {
  /**
   * Type of the sever administrator.
   */
  administratorType?: ExpressionOrValue<AdministratorType> | undefined;
  /**
   * Read-only output: Azure Active Directory only Authentication enabled.
   */
  readonly azureAdOnlyAuthentication?: Expression<boolean> | undefined;
  /**
   * Login name of the server administrator.
   */
  login: ExpressionOrValue<string>;
  /**
   * SID (object ID) of the server administrator.
   */
  sid: ExpressionOrValue<string>;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

export const administratorPropertiesShape: FlatModelShape = createFlatModelShape({
  administratorType: { armPath: ["administratorType"], value: createUnionShape() },
  azureAdOnlyAuthentication: {
    armPath: ["azureADOnlyAuthentication"],
    value: createBooleanShape(),
    readOnly: true,
  },
  login: { armPath: ["login"], value: createStringShape() },
  sid: { armPath: ["sid"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

/**
 * Properties of an Advanced Threat Protection state.
 */
export interface AdvancedThreatProtectionProperties {
  /**
   * Specifies the UTC creation time of the policy.
   */
  creationTime?: Date;
  /**
   * Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
   */
  state: AdvancedThreatProtectionState;
}

/**
 * Input type for Properties of an Advanced Threat Protection state.
 */
export interface AdvancedThreatProtectionPropertiesInput extends InputOf<AdvancedThreatProtectionProperties> {
  /**
   * Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
   */
  state: ExpressionOrValue<AdvancedThreatProtectionState>;
}

/**
 * View type for Properties of an Advanced Threat Protection state.
 */
export interface AdvancedThreatProtectionPropertiesView extends InputOf<AdvancedThreatProtectionProperties> {
  /**
   * Read-only output: Specifies the UTC creation time of the policy.
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
   */
  state: ExpressionOrValue<AdvancedThreatProtectionState>;
}

export const advancedThreatProtectionPropertiesShape: FlatModelShape = createFlatModelShape({
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
  state: { armPath: ["state"], value: createEnumShape() },
});

/**
 * Properties for a Database, Server or Elastic Pool Advisor.
 */
export interface AdvisorProperties {
  /**
   * Gets the status of availability of this advisor to customers. Possible values are 'GA', 'PublicPreview', 'LimitedPublicPreview' and 'PrivatePreview'.
   */
  advisorStatus?: AdvisorStatus;
  /**
   * Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled'
   */
  autoExecuteStatus: AutoExecuteStatus;
  /**
   * Gets the resource from which current value of auto-execute status is inherited. Auto-execute status can be set on (and inherited from) different levels in the resource hierarchy. Possible values are 'Subscription', 'Server', 'ElasticPool', 'Database' and 'Default' (when status is not explicitly set on any level).
   */
  autoExecuteStatusInheritedFrom?: AutoExecuteStatusInheritedFrom;
  /**
   * Gets the time when the current resource was analyzed for recommendations by this advisor.
   */
  lastChecked?: Date;
  /**
   * Gets that status of recommendations for this advisor and reason for not having any recommendations. Possible values include, but are not limited to, 'Ok' (Recommendations available),LowActivity (not enough workload to analyze), 'DbSeemsTuned' (Database is doing well), etc.
   */
  recommendationsStatus?: string;
  /**
   * Gets the recommended actions for this advisor.
   */
  recommendedActions?: SqlRecommendedAction[];
}

/**
 * Input type for Properties for a Database, Server or Elastic Pool Advisor.
 */
export interface AdvisorPropertiesInput extends InputOf<AdvisorProperties> {
  /**
   * Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled'
   */
  autoExecuteStatus: ExpressionOrValue<AutoExecuteStatus>;
}

/**
 * View type for Properties for a Database, Server or Elastic Pool Advisor.
 */
export interface AdvisorPropertiesView extends InputOf<AdvisorProperties> {
  /**
   * Read-only output: Gets the status of availability of this advisor to customers. Possible values are 'GA', 'PublicPreview', 'LimitedPublicPreview' and 'PrivatePreview'.
   */
  readonly advisorStatus?: Expression<AdvisorStatus> | undefined;
  /**
   * Gets the auto-execute status (whether to let the system execute the recommendations) of this advisor. Possible values are 'Enabled' and 'Disabled'
   */
  autoExecuteStatus: ExpressionOrValue<AutoExecuteStatus>;
  /**
   * Read-only output: Gets the resource from which current value of auto-execute status is inherited. Auto-execute status can be set on (and inherited from) different levels in the resource hierarchy. Possible values are 'Subscription', 'Server', 'ElasticPool', 'Database' and 'Default' (when status is not explicitly set on any level).
   */
  readonly autoExecuteStatusInheritedFrom?: Expression<AutoExecuteStatusInheritedFrom> | undefined;
  /**
   * Read-only output: Gets the time when the current resource was analyzed for recommendations by this advisor.
   */
  readonly lastChecked?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets that status of recommendations for this advisor and reason for not having any recommendations. Possible values include, but are not limited to, 'Ok' (Recommendations available),LowActivity (not enough workload to analyze), 'DbSeemsTuned' (Database is doing well), etc.
   */
  readonly recommendationsStatus?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the recommended actions for this advisor.
   */
  readonly recommendedActions?: Expression<SqlRecommendedAction[]> | undefined;
}

export const advisorPropertiesShape: FlatModelShape = createFlatModelShape({
  advisorStatus: { armPath: ["advisorStatus"], value: createEnumShape(), readOnly: true },
  autoExecuteStatus: { armPath: ["autoExecuteStatus"], value: createEnumShape() },
  autoExecuteStatusInheritedFrom: {
    armPath: ["autoExecuteStatusInheritedFrom"],
    value: createEnumShape(),
    readOnly: true,
  },
  lastChecked: {
    armPath: ["lastChecked"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  recommendationsStatus: {
    armPath: ["recommendationsStatus"],
    value: createStringShape(),
    readOnly: true,
  },
  recommendedActions: {
    armPath: ["recommendedActions"],
    value: createArrayShape(createDeferredShape(() => sqlRecommendedActionShape)),
    readOnly: true,
  },
});

/**
 * Automatic tuning properties for individual advisors.
 */
export interface AutomaticTuningOptions {
  /**
   * Automatic tuning option actual state.
   */
  actualState?: AutomaticTuningOptionModeActual;
  /**
   * Automatic tuning option desired state.
   */
  desiredState?: AutomaticTuningOptionModeDesired;
  /**
   * Reason code if desired and actual state are different.
   */
  reasonCode?: number;
  /**
   * Reason description if desired and actual state are different.
   */
  reasonDesc?: AutomaticTuningDisabledReason;
}

/**
 * Input type for Automatic tuning properties for individual advisors.
 */
export interface AutomaticTuningOptionsInput extends InputOf<AutomaticTuningOptions> {
  /**
   * Automatic tuning option desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningOptionModeDesired> | undefined;
}

/**
 * View type for Automatic tuning properties for individual advisors.
 */
export interface AutomaticTuningOptionsView extends InputOf<AutomaticTuningOptions> {
  /**
   * Read-only output: Automatic tuning option actual state.
   */
  readonly actualState?: Expression<AutomaticTuningOptionModeActual> | undefined;
  /**
   * Automatic tuning option desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningOptionModeDesired> | undefined;
  /**
   * Read-only output: Reason code if desired and actual state are different.
   */
  readonly reasonCode?: Expression<number> | undefined;
  /**
   * Read-only output: Reason description if desired and actual state are different.
   */
  readonly reasonDesc?: Expression<AutomaticTuningDisabledReason> | undefined;
}

export const automaticTuningOptionsShape: FlatModelShape = createFlatModelShape({
  actualState: { armPath: ["actualState"], value: createEnumShape(), readOnly: true },
  desiredState: { armPath: ["desiredState"], value: createEnumShape() },
  reasonCode: { armPath: ["reasonCode"], value: createNumberShape(), readOnly: true },
  reasonDesc: { armPath: ["reasonDesc"], value: createEnumShape(), readOnly: true },
});

/**
 * Automatic tuning properties for individual advisors.
 */
export interface AutomaticTuningServerOptions {
  /**
   * Automatic tuning option actual state.
   */
  actualState?: AutomaticTuningOptionModeActual;
  /**
   * Automatic tuning option desired state.
   */
  desiredState?: AutomaticTuningOptionModeDesired;
  /**
   * Reason code if desired and actual state are different.
   */
  reasonCode?: number;
  /**
   * Reason description if desired and actual state are different.
   */
  reasonDesc?: AutomaticTuningServerReason;
}

/**
 * Input type for Automatic tuning properties for individual advisors.
 */
export interface AutomaticTuningServerOptionsInput extends InputOf<AutomaticTuningServerOptions> {
  /**
   * Automatic tuning option desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningOptionModeDesired> | undefined;
}

/**
 * View type for Automatic tuning properties for individual advisors.
 */
export interface AutomaticTuningServerOptionsView extends InputOf<AutomaticTuningServerOptions> {
  /**
   * Read-only output: Automatic tuning option actual state.
   */
  readonly actualState?: Expression<AutomaticTuningOptionModeActual> | undefined;
  /**
   * Automatic tuning option desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningOptionModeDesired> | undefined;
  /**
   * Read-only output: Reason code if desired and actual state are different.
   */
  readonly reasonCode?: Expression<number> | undefined;
  /**
   * Read-only output: Reason description if desired and actual state are different.
   */
  readonly reasonDesc?: Expression<AutomaticTuningServerReason> | undefined;
}

export const automaticTuningServerOptionsShape: FlatModelShape = createFlatModelShape({
  actualState: { armPath: ["actualState"], value: createEnumShape(), readOnly: true },
  desiredState: { armPath: ["desiredState"], value: createEnumShape() },
  reasonCode: { armPath: ["reasonCode"], value: createNumberShape(), readOnly: true },
  reasonDesc: { armPath: ["reasonDesc"], value: createEnumShape(), readOnly: true },
});

/**
 * Server-level Automatic Tuning properties.
 */
export interface AutomaticTuningServerProperties {
  /**
   * Automatic tuning actual state.
   */
  actualState?: AutomaticTuningServerMode;
  /**
   * Automatic tuning desired state.
   */
  desiredState?: AutomaticTuningServerMode;
  /**
   * Automatic tuning options definition.
   */
  options?: Record<string, AutomaticTuningServerOptions>;
}

/**
 * Input type for Server-level Automatic Tuning properties.
 */
export interface AutomaticTuningServerPropertiesInput extends InputOf<AutomaticTuningServerProperties> {
  /**
   * Automatic tuning desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningServerMode> | undefined;
  /**
   * Automatic tuning options definition.
   */
  options?:
    | InputRecord<AutomaticTuningServerOptionsInput, Record<string, AutomaticTuningServerOptions>>
    | undefined;
}

/**
 * View type for Server-level Automatic Tuning properties.
 */
export interface AutomaticTuningServerPropertiesView extends InputOf<AutomaticTuningServerProperties> {
  /**
   * Read-only output: Automatic tuning actual state.
   */
  readonly actualState?: Expression<AutomaticTuningServerMode> | undefined;
  /**
   * Automatic tuning desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningServerMode> | undefined;
  /**
   * Automatic tuning options definition.
   */
  options?:
    | InputRecord<AutomaticTuningServerOptionsView, Record<string, AutomaticTuningServerOptions>>
    | undefined;
}

export const automaticTuningServerPropertiesShape: FlatModelShape = createFlatModelShape({
  actualState: { armPath: ["actualState"], value: createEnumShape(), readOnly: true },
  desiredState: { armPath: ["desiredState"], value: createEnumShape() },
  options: {
    armPath: ["options"],
    value: createRecordShape(createDeferredShape(() => automaticTuningServerOptionsShape)),
  },
});

/**
 * Properties of a active directory only authentication.
 */
export interface AzureAdOnlyAuthProperties {
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication: boolean;
}

/**
 * Input type for Properties of a active directory only authentication.
 */
export interface AzureAdOnlyAuthPropertiesInput extends InputOf<AzureAdOnlyAuthProperties> {
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication: ExpressionOrValue<boolean>;
}

/**
 * View type for Properties of a active directory only authentication.
 */
export type AzureAdOnlyAuthPropertiesView = AzureAdOnlyAuthPropertiesInput;

export const azureAdOnlyAuthPropertiesShape: FlatModelShape = createFlatModelShape({
  azureAdOnlyAuthentication: {
    armPath: ["azureADOnlyAuthentication"],
    value: createBooleanShape(),
  },
});

/**
 * Properties of a short term retention policy
 */
export interface BackupShortTermRetentionPolicyProperties {
  /**
   * The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases.
   */
  diffBackupIntervalInHours?: DiffBackupIntervalInHours;
  /**
   * The backup retention period in days. This is how many days Point-in-Time Restore will be supported.
   */
  retentionDays?: number;
}

/**
 * Input type for Properties of a short term retention policy
 */
export interface BackupShortTermRetentionPolicyPropertiesInput extends InputOf<BackupShortTermRetentionPolicyProperties> {
  /**
   * The differential backup interval in hours. This is how many interval hours between each differential backup will be supported. This is only applicable to live databases but not dropped databases.
   */
  diffBackupIntervalInHours?: ExpressionOrValue<DiffBackupIntervalInHours> | undefined;
  /**
   * The backup retention period in days. This is how many days Point-in-Time Restore will be supported.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Properties of a short term retention policy
 */
export type BackupShortTermRetentionPolicyPropertiesView =
  BackupShortTermRetentionPolicyPropertiesInput;

export const backupShortTermRetentionPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  diffBackupIntervalInHours: { armPath: ["diffBackupIntervalInHours"], value: createUnionShape() },
  retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
});

/**
 * SQL Vulnerability Assessment baseline Details
 */
export interface Baseline {
  /**
   * SQL Vulnerability Assessment baseline expected results
   */
  expectedResults?: string[][];
  /**
   * SQL Vulnerability Assessment baseline update time (UTC)
   */
  updatedTime?: Date;
}

/**
 * Input type for SQL Vulnerability Assessment baseline Details
 */
export interface BaselineInput extends InputOf<Baseline> {}

/**
 * View type for SQL Vulnerability Assessment baseline Details
 */
export interface BaselineView extends InputOf<Baseline> {
  /**
   * Read-only output: SQL Vulnerability Assessment baseline expected results
   */
  readonly expectedResults?: Expression<string[][]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment baseline update time (UTC)
   */
  readonly updatedTime?: Expression<Date> | undefined;
}

export const baselineShape: FlatModelShape = createFlatModelShape({
  expectedResults: {
    armPath: ["expectedResults"],
    value: createArrayShape(createArrayShape(createStringShape())),
    readOnly: true,
  },
  updatedTime: {
    armPath: ["updatedTime"],
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
 * SQL Vulnerability Assessment baseline adjusted results
 */
export interface BaselineAdjustedResult {
  /**
   * SQL Vulnerability Assessment baseline details
   */
  baseline?: Baseline;
  /**
   * SQL Vulnerability Assessment results that are not in baseline
   */
  resultsNotInBaseline?: string[][];
  /**
   * SQL Vulnerability Assessment results that are in baseline.
   */
  resultsOnlyInBaseline?: string[][];
  /**
   * SQL Vulnerability Assessment baseline status
   */
  status?: RuleStatus;
}

/**
 * Input type for SQL Vulnerability Assessment baseline adjusted results
 */
export interface BaselineAdjustedResultInput extends InputOf<BaselineAdjustedResult> {}

/**
 * View type for SQL Vulnerability Assessment baseline adjusted results
 */
export interface BaselineAdjustedResultView extends InputOf<BaselineAdjustedResult> {
  /**
   * Read-only output: SQL Vulnerability Assessment baseline details
   */
  readonly baseline?: Expression<Baseline> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment results that are not in baseline
   */
  readonly resultsNotInBaseline?: Expression<string[][]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment results that are in baseline.
   */
  readonly resultsOnlyInBaseline?: Expression<string[][]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment baseline status
   */
  readonly status?: Expression<RuleStatus> | undefined;
}

export const baselineAdjustedResultShape: FlatModelShape = createFlatModelShape({
  baseline: {
    armPath: ["baseline"],
    value: createDeferredShape(() => baselineShape),
    readOnly: true,
  },
  resultsNotInBaseline: {
    armPath: ["resultsNotInBaseline"],
    value: createArrayShape(createArrayShape(createStringShape())),
    readOnly: true,
  },
  resultsOnlyInBaseline: {
    armPath: ["resultsOnlyInBaseline"],
    value: createArrayShape(createArrayShape(createStringShape())),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
});

/**
 * SQL Vulnerability Assessment benchmark reference
 */
export interface BenchmarkReference {
  /**
   * SQL Vulnerability Assessment benchmark name
   */
  benchmark?: string;
  /**
   * SQL Vulnerability Assessment benchmark reference.
   */
  reference?: string;
}

/**
 * Input type for SQL Vulnerability Assessment benchmark reference
 */
export interface BenchmarkReferenceInput extends InputOf<BenchmarkReference> {}

/**
 * View type for SQL Vulnerability Assessment benchmark reference
 */
export interface BenchmarkReferenceView extends InputOf<BenchmarkReference> {
  /**
   * Read-only output: SQL Vulnerability Assessment benchmark name
   */
  readonly benchmark?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment benchmark reference.
   */
  readonly reference?: Expression<string> | undefined;
}

export const benchmarkReferenceShape: FlatModelShape = createFlatModelShape({
  benchmark: { armPath: ["benchmark"], value: createStringShape(), readOnly: true },
  reference: { armPath: ["reference"], value: createStringShape(), readOnly: true },
});

/**
 * Certificate information
 */
export interface CertificateInfo {
  /**
   * The certificate name
   */
  certificateName?: string;
  /**
   * The certificate expiry date
   */
  expiryDate?: Date;
}

/**
 * Input type for Certificate information
 */
export interface CertificateInfoInput extends InputOf<CertificateInfo> {}

/**
 * View type for Certificate information
 */
export interface CertificateInfoView extends InputOf<CertificateInfo> {
  /**
   * Read-only output: The certificate name
   */
  readonly certificateName?: Expression<string> | undefined;
  /**
   * Read-only output: The certificate expiry date
   */
  readonly expiryDate?: Expression<Date> | undefined;
}

export const certificateInfoShape: FlatModelShape = createFlatModelShape({
  certificateName: { armPath: ["certificateName"], value: createStringShape(), readOnly: true },
  expiryDate: {
    armPath: ["expiryDate"],
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
 * Database-level Automatic Tuning properties.
 */
export interface DatabaseAutomaticTuningProperties {
  /**
   * Automatic tuning actual state.
   */
  actualState?: AutomaticTuningMode;
  /**
   * Automatic tuning desired state.
   */
  desiredState?: AutomaticTuningMode;
  /**
   * Automatic tuning options definition.
   */
  options?: Record<string, AutomaticTuningOptions>;
}

/**
 * Input type for Database-level Automatic Tuning properties.
 */
export interface DatabaseAutomaticTuningPropertiesInput extends InputOf<DatabaseAutomaticTuningProperties> {
  /**
   * Automatic tuning desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningMode> | undefined;
  /**
   * Automatic tuning options definition.
   */
  options?:
    InputRecord<AutomaticTuningOptionsInput, Record<string, AutomaticTuningOptions>> | undefined;
}

/**
 * View type for Database-level Automatic Tuning properties.
 */
export interface DatabaseAutomaticTuningPropertiesView extends InputOf<DatabaseAutomaticTuningProperties> {
  /**
   * Read-only output: Automatic tuning actual state.
   */
  readonly actualState?: Expression<AutomaticTuningMode> | undefined;
  /**
   * Automatic tuning desired state.
   */
  desiredState?: ExpressionOrValue<AutomaticTuningMode> | undefined;
  /**
   * Automatic tuning options definition.
   */
  options?:
    InputRecord<AutomaticTuningOptionsView, Record<string, AutomaticTuningOptions>> | undefined;
}

export const databaseAutomaticTuningPropertiesShape: FlatModelShape = createFlatModelShape({
  actualState: { armPath: ["actualState"], value: createEnumShape(), readOnly: true },
  desiredState: { armPath: ["desiredState"], value: createEnumShape() },
  options: {
    armPath: ["options"],
    value: createRecordShape(createDeferredShape(() => automaticTuningOptionsShape)),
  },
});

/**
 * Properties of a database blob auditing policy.
 */
export interface DatabaseBlobAuditingPolicyProperties {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: boolean;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: number;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: BlobAuditingPolicyState;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of a database blob auditing policy.
 */
export interface DatabaseBlobAuditingPolicyPropertiesInput extends InputOf<DatabaseBlobAuditingPolicyProperties> {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: ExpressionOrValue<BlobAuditingPolicyState>;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a database blob auditing policy.
 */
export type DatabaseBlobAuditingPolicyPropertiesView = DatabaseBlobAuditingPolicyPropertiesInput;

export const databaseBlobAuditingPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  auditActionsAndGroups: {
    armPath: ["auditActionsAndGroups"],
    value: createArrayShape(createStringShape()),
  },
  isAzureMonitorTargetEnabled: {
    armPath: ["isAzureMonitorTargetEnabled"],
    value: createBooleanShape(),
  },
  isManagedIdentityInUse: { armPath: ["isManagedIdentityInUse"], value: createBooleanShape() },
  isStorageSecondaryKeyInUse: {
    armPath: ["isStorageSecondaryKeyInUse"],
    value: createBooleanShape(),
  },
  queueDelayMs: { armPath: ["queueDelayMs"], value: createNumberShape() },
  retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
  state: { armPath: ["state"], value: createEnumShape() },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageAccountSubscriptionId: {
    armPath: ["storageAccountSubscriptionId"],
    value: createStringShape(),
  },
  storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
});

/**
 * Database column properties.
 */
export interface DatabaseColumnProperties {
  /**
   * The column data type.
   */
  columnType?: ColumnDataType;
  /**
   * Whether or not the column is computed.
   */
  isComputed?: boolean;
  /**
   * Whether or not the column belongs to a memory optimized table.
   */
  memoryOptimized?: boolean;
  /**
   * The table temporal type.
   */
  temporalType?: TableTemporalType;
}

/**
 * Input type for Database column properties.
 */
export interface DatabaseColumnPropertiesInput extends InputOf<DatabaseColumnProperties> {}

/**
 * View type for Database column properties.
 */
export interface DatabaseColumnPropertiesView extends InputOf<DatabaseColumnProperties> {
  /**
   * Read-only output: The column data type.
   */
  readonly columnType?: Expression<ColumnDataType> | undefined;
  /**
   * Read-only output: Whether or not the column is computed.
   */
  readonly isComputed?: Expression<boolean> | undefined;
  /**
   * Read-only output: Whether or not the column belongs to a memory optimized table.
   */
  readonly memoryOptimized?: Expression<boolean> | undefined;
  /**
   * Read-only output: The table temporal type.
   */
  readonly temporalType?: Expression<TableTemporalType> | undefined;
}

export const databaseColumnPropertiesShape: FlatModelShape = createFlatModelShape({
  columnType: { armPath: ["columnType"], value: createUnionShape(), readOnly: true },
  isComputed: { armPath: ["isComputed"], value: createBooleanShape(), readOnly: true },
  memoryOptimized: { armPath: ["memoryOptimized"], value: createBooleanShape(), readOnly: true },
  temporalType: { armPath: ["temporalType"], value: createUnionShape(), readOnly: true },
});

/**
 * Contains the database information after a successful Import, Export, or PolybaseImport
 */
export interface DatabaseExtensionsProperties {
  /**
   * Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID.
   */
  administratorLogin?: string;
  /**
   * Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified.
   */
  administratorLoginPassword?: string;
  /**
   * Authentication type used to access the SQL: Sql, ADPassword or ManagedIdentity.
   */
  authenticationType?: string;
  /**
   * Database edition for the newly created database in the case of an import operation.
   */
  databaseEdition?: string;
  /**
   * Database max size in bytes for the newly created database in the case of an import operation.
   */
  maxSizeBytes?: string;
  /**
   * Optional resource information to enable network isolation for request.
   */
  networkIsolation?: NetworkIsolationSettings;
  /**
   * Operation mode of the operation: Import, Export, or PolybaseImport.
   */
  operationMode: OperationMode;
  /**
   * Database service level objective for the newly created database in the case of an import operation.
   */
  serviceObjectiveName?: string;
  /**
   * Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID.
   */
  storageKey: string;
  /**
   * Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity.
   */
  storageKeyType: StorageKeyType;
  /**
   * Storage Uri for the storage account.
   */
  storageUri: string;
}

/**
 * Input type for Contains the database information after a successful Import, Export, or PolybaseImport
 */
export interface DatabaseExtensionsPropertiesInput extends InputOf<DatabaseExtensionsProperties> {
  /**
   * Administrator login name. If AuthenticationType is ManagedIdentity, this field should specify the Managed Identity's resource ID.
   */
  administratorLogin?: ExpressionOrValue<string> | undefined;
  /**
   * Administrator login password. If AuthenticationType is ManagedIdentity, this field should not be specified.
   */
  administratorLoginPassword?: ExpressionOrValue<string> | undefined;
  /**
   * Authentication type used to access the SQL: Sql, ADPassword or ManagedIdentity.
   */
  authenticationType?: ExpressionOrValue<string> | undefined;
  /**
   * Database edition for the newly created database in the case of an import operation.
   */
  databaseEdition?: ExpressionOrValue<string> | undefined;
  /**
   * Database max size in bytes for the newly created database in the case of an import operation.
   */
  maxSizeBytes?: ExpressionOrValue<string> | undefined;
  /**
   * Optional resource information to enable network isolation for request.
   */
  networkIsolation?: NetworkIsolationSettingsInput | undefined;
  /**
   * Operation mode of the operation: Import, Export, or PolybaseImport.
   */
  operationMode: ExpressionOrValue<OperationMode>;
  /**
   * Database service level objective for the newly created database in the case of an import operation.
   */
  serviceObjectiveName?: ExpressionOrValue<string> | undefined;
  /**
   * Storage key for the storage account. If StorageKeyType is ManagedIdentity, this field should specify the Managed Identity's resource ID.
   */
  storageKey: ExpressionOrValue<string>;
  /**
   * Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity.
   */
  storageKeyType: ExpressionOrValue<StorageKeyType>;
  /**
   * Storage Uri for the storage account.
   */
  storageUri: ExpressionOrValue<string>;
}

/**
 * View type for Contains the database information after a successful Import, Export, or PolybaseImport
 */
export type DatabaseExtensionsPropertiesView = DatabaseExtensionsPropertiesInput;

export const databaseExtensionsPropertiesShape: FlatModelShape = createFlatModelShape({
  administratorLogin: { armPath: ["administratorLogin"], value: createStringShape() },
  administratorLoginPassword: {
    armPath: ["administratorLoginPassword"],
    value: createStringShape(),
  },
  authenticationType: { armPath: ["authenticationType"], value: createStringShape() },
  databaseEdition: { armPath: ["databaseEdition"], value: createStringShape() },
  maxSizeBytes: { armPath: ["maxSizeBytes"], value: createStringShape() },
  networkIsolation: {
    armPath: ["networkIsolation"],
    value: createDeferredShape(() => networkIsolationSettingsShape),
  },
  operationMode: { armPath: ["operationMode"], value: createUnionShape() },
  serviceObjectiveName: { armPath: ["serviceObjectiveName"], value: createStringShape() },
  storageKey: { armPath: ["storageKey"], value: createStringShape() },
  storageKeyType: { armPath: ["storageKeyType"], value: createUnionShape() },
  storageUri: { armPath: ["storageUri"], value: createStringShape() },
});

/**
 * Azure Active Directory identity configuration for a resource.
 */
export interface DatabaseIdentity {
  /**
   * The Azure Active Directory tenant id.
   */
  tenantId?: string;
  /**
   * The identity type
   */
  type?: DatabaseIdentityType;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?: Record<string, DatabaseUserIdentity>;
}

/**
 * Input type for Azure Active Directory identity configuration for a resource.
 */
export interface DatabaseIdentityInput extends InputOf<DatabaseIdentity> {
  /**
   * The identity type
   */
  type?: ExpressionOrValue<DatabaseIdentityType> | undefined;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?:
    InputRecord<DatabaseUserIdentityInput, Record<string, DatabaseUserIdentity>> | undefined;
}

/**
 * View type for Azure Active Directory identity configuration for a resource.
 */
export interface DatabaseIdentityView extends InputOf<DatabaseIdentity> {
  /**
   * Read-only output: The Azure Active Directory tenant id.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The identity type
   */
  type?: ExpressionOrValue<DatabaseIdentityType> | undefined;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?:
    InputRecord<DatabaseUserIdentityView, Record<string, DatabaseUserIdentity>> | undefined;
}

export const databaseIdentityShape: FlatModelShape = createFlatModelShape({
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => databaseUserIdentityShape)),
  },
});

/**
 * Database level key used for encryption at rest.
 */
export interface DatabaseKey {
  /**
   * The database key creation date.
   */
  creationDate?: Date;
  /**
   * The database key's version.
   */
  keyVersion?: string;
  /**
   * Subregion of the server key.
   */
  subregion?: string;
  /**
   * Thumbprint of the database key.
   */
  thumbprint?: string;
  /**
   * The database key type. Only supported value is 'AzureKeyVault'.
   */
  type?: DatabaseKeyType;
}

/**
 * Input type for Database level key used for encryption at rest.
 */
export interface DatabaseKeyInput extends InputOf<DatabaseKey> {}

/**
 * View type for Database level key used for encryption at rest.
 */
export interface DatabaseKeyView extends InputOf<DatabaseKey> {
  /**
   * Read-only output: The database key creation date.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The database key's version.
   */
  readonly keyVersion?: Expression<string> | undefined;
  /**
   * Read-only output: Subregion of the server key.
   */
  readonly subregion?: Expression<string> | undefined;
  /**
   * Read-only output: Thumbprint of the database key.
   */
  readonly thumbprint?: Expression<string> | undefined;
  /**
   * Read-only output: The database key type. Only supported value is 'AzureKeyVault'.
   */
  readonly type?: Expression<DatabaseKeyType> | undefined;
}

export const databaseKeyShape: FlatModelShape = createFlatModelShape({
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  keyVersion: { armPath: ["keyVersion"], value: createStringShape(), readOnly: true },
  subregion: { armPath: ["subregion"], value: createStringShape(), readOnly: true },
  thumbprint: { armPath: ["thumbprint"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape(), readOnly: true },
});

/**
 * The database's properties.
 */
export interface DatabaseProperties {
  /**
   * Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled
   */
  autoPauseDelay?: number;
  /**
   * Specifies the availability zone the database is pinned to.
   */
  availabilityZone?: AvailabilityZoneType;
  /**
   * Collation of the metadata catalog.
   */
  catalogCollation?: CatalogCollationType;
  /**
   * The collation of the database.
   */
  collation?: string;
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: CreateMode;
  /**
   * The creation date of the database (ISO8601 format).
   */
  creationDate?: Date;
  /**
   * The storage account type used to store backups for this database.
   */
  currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * The current service level objective name of the database.
   */
  currentServiceObjectiveName?: string;
  /**
   * The name and tier of the SKU.
   */
  currentSku?: Sku;
  /**
   * The ID of the database.
   */
  databaseId?: string;
  /**
   * The default secondary region for this database.
   */
  defaultSecondaryLocation?: string;
  /**
   * This records the earliest start date and time that restore is available for this database (ISO8601 format).
   */
  earliestRestoreDate?: Date;
  /**
   * The resource identifier of the elastic pool containing this database.
   */
  elasticPoolId?: string;
  /**
   * The azure key vault URI of the database if it's configured with per Database Customer Managed Keys.
   */
  encryptionProtector?: string;
  /**
   * The flag to enable or disable auto rotation of database encryption protector AKV key.
   */
  encryptionProtectorAutoRotation?: boolean;
  /**
   * Failover Group resource identifier that this database belongs to.
   */
  failoverGroupId?: string;
  /**
   * The Client id used for cross tenant per database CMK scenario
   */
  federatedClientId?: string;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: FreeLimitExhaustionBehavior;
  /**
   * The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool.
   */
  highAvailabilityReplicaCount?: number;
  /**
   * Infra encryption is enabled for this database.
   */
  isInfraEncryptionEnabled?: boolean;
  /**
   * Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created.
   */
  isLedgerOn?: boolean;
  /**
   * The resource ids of the user assigned identities to use
   */
  keys?: Record<string, DatabaseKey>;
  /**
   * The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit.
   */
  licenseType?: DatabaseLicenseType;
  /**
   * The resource identifier of the long term retention backup associated with create operation of this database.
   */
  longTermRetentionBackupResourceId?: string;
  /**
   * Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur.
   */
  maintenanceConfigurationId?: string;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: boolean;
  /**
   * The max log size for this database.
   */
  maxLogSizeBytes?: number;
  /**
   * The max size of the database expressed in bytes.
   */
  maxSizeBytes?: number;
  /**
   * Minimal capacity that database will always have allocated, if not paused
   */
  minCapacity?: number;
  /**
   * The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready.
   */
  pausedDate?: Date;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: boolean;
  /**
   * Type of enclave requested on the database i.e. Default or VBS enclaves.
   */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /**
   * The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool.
   */
  readScale?: DatabaseReadScale;
  /**
   * The resource identifier of the recoverable database associated with create operation of this database.
   */
  recoverableDatabaseId?: string;
  /**
   * The resource identifier of the recovery point associated with create operation of this database.
   */
  recoveryServicesRecoveryPointId?: string;
  /**
   * The storage account type to be used to store backups for this database.
   */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * The requested service level objective name of the database.
   */
  requestedServiceObjectiveName?: string;
  /**
   * The resource identifier of the restorable dropped database associated with create operation of this database.
   */
  restorableDroppedDatabaseId?: string;
  /**
   * Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: Date;
  /**
   * The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused.
   */
  resumedDate?: Date;
  /**
   * The name of the sample schema to apply when creating this database.
   */
  sampleName?: SampleName;
  /**
   * The secondary type of the database if it is a secondary. Valid values are Geo, Named and Standby.
   */
  secondaryType?: SecondaryType;
  /**
   * Specifies the time that the database was deleted.
   */
  sourceDatabaseDeletionDate?: Date;
  /**
   * The resource identifier of the source database associated with create operation of this database.
   */
  sourceDatabaseId?: string;
  /**
   * The resource identifier of the source associated with the create operation of this database.
   *
   * This property is only supported for DataWarehouse edition and allows to restore across subscriptions.
   *
   * When sourceResourceId is specified, sourceDatabaseId, recoverableDatabaseId, restorableDroppedDatabaseId and sourceDatabaseDeletionDate must not be specified and CreateMode must be PointInTimeRestore, Restore or Recover.
   *
   * When createMode is PointInTimeRestore, sourceResourceId must be the resource ID of the existing database or existing sql pool, and restorePointInTime must be specified.
   *
   * When createMode is Restore, sourceResourceId must be the resource ID of restorable dropped database or restorable dropped sql pool.
   *
   * When createMode is Recover, sourceResourceId must be the resource ID of recoverable database or recoverable sql pool.
   *
   * When source subscription belongs to a different tenant than target subscription, “x-ms-authorization-auxiliary” header must contain authentication token for the source tenant. For more details about “x-ms-authorization-auxiliary” header see https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/authenticate-multi-tenant
   */
  sourceResourceId?: string;
  /**
   * The status of the database.
   */
  status?: DatabaseStatus;
  /**
   * Whether or not the database uses free monthly limits. Allowed on one database in a subscription.
   */
  useFreeLimit?: boolean;
  /**
   * Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones.
   */
  zoneRedundant?: boolean;
}

/**
 * Input type for The database's properties.
 */
export interface DatabasePropertiesInput extends InputOf<DatabaseProperties> {
  /**
   * Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled
   */
  autoPauseDelay?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the availability zone the database is pinned to.
   */
  availabilityZone?: ExpressionOrValue<AvailabilityZoneType> | undefined;
  /**
   * Collation of the metadata catalog.
   */
  catalogCollation?: ExpressionOrValue<CatalogCollationType> | undefined;
  /**
   * The collation of the database.
   */
  collation?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * The resource identifier of the elastic pool containing this database.
   */
  elasticPoolId?: ExpressionOrValue<string> | undefined;
  /**
   * The azure key vault URI of the database if it's configured with per Database Customer Managed Keys.
   */
  encryptionProtector?: ExpressionOrValue<string> | undefined;
  /**
   * The flag to enable or disable auto rotation of database encryption protector AKV key.
   */
  encryptionProtectorAutoRotation?: ExpressionOrValue<boolean> | undefined;
  /**
   * The Client id used for cross tenant per database CMK scenario
   */
  federatedClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: ExpressionOrValue<FreeLimitExhaustionBehavior> | undefined;
  /**
   * The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool.
   */
  highAvailabilityReplicaCount?: ExpressionOrValue<number> | undefined;
  /**
   * Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created.
   */
  isLedgerOn?: ExpressionOrValue<boolean> | undefined;
  /**
   * The resource ids of the user assigned identities to use
   */
  keys?: InputRecord<DatabaseKeyInput, Record<string, DatabaseKey>> | undefined;
  /**
   * The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit.
   */
  licenseType?: ExpressionOrValue<DatabaseLicenseType> | undefined;
  /**
   * The resource identifier of the long term retention backup associated with create operation of this database.
   */
  longTermRetentionBackupResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: ExpressionOrValue<boolean> | undefined;
  /**
   * The max size of the database expressed in bytes.
   */
  maxSizeBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Minimal capacity that database will always have allocated, if not paused
   */
  minCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: ExpressionOrValue<boolean> | undefined;
  /**
   * Type of enclave requested on the database i.e. Default or VBS enclaves.
   */
  preferredEnclaveType?: ExpressionOrValue<AlwaysEncryptedEnclaveType> | undefined;
  /**
   * The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool.
   */
  readScale?: ExpressionOrValue<DatabaseReadScale> | undefined;
  /**
   * The resource identifier of the recoverable database associated with create operation of this database.
   */
  recoverableDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the recovery point associated with create operation of this database.
   */
  recoveryServicesRecoveryPointId?: ExpressionOrValue<string> | undefined;
  /**
   * The storage account type to be used to store backups for this database.
   */
  requestedBackupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
  /**
   * The resource identifier of the restorable dropped database associated with create operation of this database.
   */
  restorableDroppedDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The name of the sample schema to apply when creating this database.
   */
  sampleName?: ExpressionOrValue<SampleName> | undefined;
  /**
   * The secondary type of the database if it is a secondary. Valid values are Geo, Named and Standby.
   */
  secondaryType?: ExpressionOrValue<SecondaryType> | undefined;
  /**
   * Specifies the time that the database was deleted.
   */
  sourceDatabaseDeletionDate?: ExpressionOrValue<Date> | undefined;
  /**
   * The resource identifier of the source database associated with create operation of this database.
   */
  sourceDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the source associated with the create operation of this database.
   *
   * This property is only supported for DataWarehouse edition and allows to restore across subscriptions.
   *
   * When sourceResourceId is specified, sourceDatabaseId, recoverableDatabaseId, restorableDroppedDatabaseId and sourceDatabaseDeletionDate must not be specified and CreateMode must be PointInTimeRestore, Restore or Recover.
   *
   * When createMode is PointInTimeRestore, sourceResourceId must be the resource ID of the existing database or existing sql pool, and restorePointInTime must be specified.
   *
   * When createMode is Restore, sourceResourceId must be the resource ID of restorable dropped database or restorable dropped sql pool.
   *
   * When createMode is Recover, sourceResourceId must be the resource ID of recoverable database or recoverable sql pool.
   *
   * When source subscription belongs to a different tenant than target subscription, “x-ms-authorization-auxiliary” header must contain authentication token for the source tenant. For more details about “x-ms-authorization-auxiliary” header see https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/authenticate-multi-tenant
   */
  sourceResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not the database uses free monthly limits. Allowed on one database in a subscription.
   */
  useFreeLimit?: ExpressionOrValue<boolean> | undefined;
  /**
   * Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The database's properties.
 */
export interface DatabasePropertiesView extends InputOf<DatabaseProperties> {
  /**
   * Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled
   */
  autoPauseDelay?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the availability zone the database is pinned to.
   */
  availabilityZone?: ExpressionOrValue<AvailabilityZoneType> | undefined;
  /**
   * Collation of the metadata catalog.
   */
  catalogCollation?: ExpressionOrValue<CatalogCollationType> | undefined;
  /**
   * The collation of the database.
   */
  collation?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the mode of database creation.
   *
   * Default: regular database creation.
   *
   * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
   *
   * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
   *
   * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
   *
   * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
   *
   * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
   *
   * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
   *
   * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
   */
  createMode?: ExpressionOrValue<CreateMode> | undefined;
  /**
   * Read-only output: The creation date of the database (ISO8601 format).
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The storage account type used to store backups for this database.
   */
  readonly currentBackupStorageRedundancy?: Expression<BackupStorageRedundancy> | undefined;
  /**
   * Read-only output: The current service level objective name of the database.
   */
  readonly currentServiceObjectiveName?: Expression<string> | undefined;
  /**
   * Read-only output: The name and tier of the SKU.
   */
  readonly currentSku?: Expression<Sku> | undefined;
  /**
   * Read-only output: The ID of the database.
   */
  readonly databaseId?: Expression<string> | undefined;
  /**
   * Read-only output: The default secondary region for this database.
   */
  readonly defaultSecondaryLocation?: Expression<string> | undefined;
  /**
   * Read-only output: This records the earliest start date and time that restore is available for this database (ISO8601 format).
   */
  readonly earliestRestoreDate?: Expression<Date> | undefined;
  /**
   * The resource identifier of the elastic pool containing this database.
   */
  elasticPoolId?: ExpressionOrValue<string> | undefined;
  /**
   * The azure key vault URI of the database if it's configured with per Database Customer Managed Keys.
   */
  encryptionProtector?: ExpressionOrValue<string> | undefined;
  /**
   * The flag to enable or disable auto rotation of database encryption protector AKV key.
   */
  encryptionProtectorAutoRotation?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: Failover Group resource identifier that this database belongs to.
   */
  readonly failoverGroupId?: Expression<string> | undefined;
  /**
   * The Client id used for cross tenant per database CMK scenario
   */
  federatedClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the behavior when monthly free limits are exhausted for the free database.
   *
   * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
   *
   * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
   */
  freeLimitExhaustionBehavior?: ExpressionOrValue<FreeLimitExhaustionBehavior> | undefined;
  /**
   * The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition database that are used to provide high availability. Not applicable to a Hyperscale database within an elastic pool.
   */
  highAvailabilityReplicaCount?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Infra encryption is enabled for this database.
   */
  readonly isInfraEncryptionEnabled?: Expression<boolean> | undefined;
  /**
   * Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created.
   */
  isLedgerOn?: ExpressionOrValue<boolean> | undefined;
  /**
   * The resource ids of the user assigned identities to use
   */
  keys?: InputRecord<DatabaseKeyView, Record<string, DatabaseKey>> | undefined;
  /**
   * The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit.
   */
  licenseType?: ExpressionOrValue<DatabaseLicenseType> | undefined;
  /**
   * The resource identifier of the long term retention backup associated with create operation of this database.
   */
  longTermRetentionBackupResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Maintenance configuration id assigned to the database. This configuration defines the period when the maintenance updates will occur.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not customer controlled manual cutover needs to be done during Update Database operation to Hyperscale tier.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier.
   *
   * When manualCutover is specified, the scaling operation will wait for user input to trigger cutover to Hyperscale database.
   *
   * To trigger cutover, please provide 'performCutover' parameter when the Scaling operation is in Waiting state.
   */
  manualCutover?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The max log size for this database.
   */
  readonly maxLogSizeBytes?: Expression<number> | undefined;
  /**
   * The max size of the database expressed in bytes.
   */
  maxSizeBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Minimal capacity that database will always have allocated, if not paused
   */
  minCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The date when database was paused by user configuration or action(ISO8601 format). Null if the database is ready.
   */
  readonly pausedDate?: Expression<Date> | undefined;
  /**
   * To trigger customer controlled manual cutover during the wait state while Scaling operation is in progress.
   *
   * This property parameter is only applicable for scaling operations that are initiated along with 'manualCutover' parameter.
   *
   * This property is only applicable when scaling database from Business Critical/General Purpose/Premium/Standard tier to Hyperscale tier is already in progress.
   *
   * When performCutover is specified, the scaling operation will trigger cutover and perform role-change to Hyperscale database.
   */
  performCutover?: ExpressionOrValue<boolean> | undefined;
  /**
   * Type of enclave requested on the database i.e. Default or VBS enclaves.
   */
  preferredEnclaveType?: ExpressionOrValue<AlwaysEncryptedEnclaveType> | undefined;
  /**
   * The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool.
   */
  readScale?: ExpressionOrValue<DatabaseReadScale> | undefined;
  /**
   * The resource identifier of the recoverable database associated with create operation of this database.
   */
  recoverableDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the recovery point associated with create operation of this database.
   */
  recoveryServicesRecoveryPointId?: ExpressionOrValue<string> | undefined;
  /**
   * The storage account type to be used to store backups for this database.
   */
  requestedBackupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
  /**
   * Read-only output: The requested service level objective name of the database.
   */
  readonly requestedServiceObjectiveName?: Expression<string> | undefined;
  /**
   * The resource identifier of the restorable dropped database associated with create operation of this database.
   */
  restorableDroppedDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: The date when database was resumed by user action or database login (ISO8601 format). Null if the database is paused.
   */
  readonly resumedDate?: Expression<Date> | undefined;
  /**
   * The name of the sample schema to apply when creating this database.
   */
  sampleName?: ExpressionOrValue<SampleName> | undefined;
  /**
   * The secondary type of the database if it is a secondary. Valid values are Geo, Named and Standby.
   */
  secondaryType?: ExpressionOrValue<SecondaryType> | undefined;
  /**
   * Specifies the time that the database was deleted.
   */
  sourceDatabaseDeletionDate?: ExpressionOrValue<Date> | undefined;
  /**
   * The resource identifier of the source database associated with create operation of this database.
   */
  sourceDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the source associated with the create operation of this database.
   *
   * This property is only supported for DataWarehouse edition and allows to restore across subscriptions.
   *
   * When sourceResourceId is specified, sourceDatabaseId, recoverableDatabaseId, restorableDroppedDatabaseId and sourceDatabaseDeletionDate must not be specified and CreateMode must be PointInTimeRestore, Restore or Recover.
   *
   * When createMode is PointInTimeRestore, sourceResourceId must be the resource ID of the existing database or existing sql pool, and restorePointInTime must be specified.
   *
   * When createMode is Restore, sourceResourceId must be the resource ID of restorable dropped database or restorable dropped sql pool.
   *
   * When createMode is Recover, sourceResourceId must be the resource ID of recoverable database or recoverable sql pool.
   *
   * When source subscription belongs to a different tenant than target subscription, “x-ms-authorization-auxiliary” header must contain authentication token for the source tenant. For more details about “x-ms-authorization-auxiliary” header see https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/authenticate-multi-tenant
   */
  sourceResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The status of the database.
   */
  readonly status?: Expression<DatabaseStatus> | undefined;
  /**
   * Whether or not the database uses free monthly limits. Allowed on one database in a subscription.
   */
  useFreeLimit?: ExpressionOrValue<boolean> | undefined;
  /**
   * Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

export const databasePropertiesShape: FlatModelShape = createFlatModelShape({
  autoPauseDelay: { armPath: ["autoPauseDelay"], value: createNumberShape() },
  availabilityZone: { armPath: ["availabilityZone"], value: createUnionShape() },
  catalogCollation: { armPath: ["catalogCollation"], value: createUnionShape() },
  collation: { armPath: ["collation"], value: createStringShape() },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  currentBackupStorageRedundancy: {
    armPath: ["currentBackupStorageRedundancy"],
    value: createUnionShape(),
    readOnly: true,
  },
  currentServiceObjectiveName: {
    armPath: ["currentServiceObjectiveName"],
    value: createStringShape(),
    readOnly: true,
  },
  currentSku: {
    armPath: ["currentSku"],
    value: createDeferredShape(() => skuShape),
    readOnly: true,
  },
  databaseId: { armPath: ["databaseId"], value: createStringShape(), readOnly: true },
  defaultSecondaryLocation: {
    armPath: ["defaultSecondaryLocation"],
    value: createStringShape(),
    readOnly: true,
  },
  earliestRestoreDate: {
    armPath: ["earliestRestoreDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  elasticPoolId: { armPath: ["elasticPoolId"], value: createStringShape() },
  encryptionProtector: { armPath: ["encryptionProtector"], value: createStringShape() },
  encryptionProtectorAutoRotation: {
    armPath: ["encryptionProtectorAutoRotation"],
    value: createBooleanShape(),
  },
  failoverGroupId: { armPath: ["failoverGroupId"], value: createStringShape(), readOnly: true },
  federatedClientId: { armPath: ["federatedClientId"], value: createStringShape() },
  freeLimitExhaustionBehavior: {
    armPath: ["freeLimitExhaustionBehavior"],
    value: createUnionShape(),
  },
  highAvailabilityReplicaCount: {
    armPath: ["highAvailabilityReplicaCount"],
    value: createNumberShape(),
  },
  isInfraEncryptionEnabled: {
    armPath: ["isInfraEncryptionEnabled"],
    value: createBooleanShape(),
    readOnly: true,
  },
  isLedgerOn: { armPath: ["isLedgerOn"], value: createBooleanShape() },
  keys: {
    armPath: ["keys"],
    value: createRecordShape(createDeferredShape(() => databaseKeyShape)),
  },
  licenseType: { armPath: ["licenseType"], value: createUnionShape() },
  longTermRetentionBackupResourceId: {
    armPath: ["longTermRetentionBackupResourceId"],
    value: createStringShape(),
  },
  maintenanceConfigurationId: {
    armPath: ["maintenanceConfigurationId"],
    value: createStringShape(),
  },
  manualCutover: { armPath: ["manualCutover"], value: createBooleanShape() },
  maxLogSizeBytes: { armPath: ["maxLogSizeBytes"], value: createNumberShape(), readOnly: true },
  maxSizeBytes: { armPath: ["maxSizeBytes"], value: createNumberShape() },
  minCapacity: { armPath: ["minCapacity"], value: createNumberShape() },
  pausedDate: {
    armPath: ["pausedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  performCutover: { armPath: ["performCutover"], value: createBooleanShape() },
  preferredEnclaveType: { armPath: ["preferredEnclaveType"], value: createUnionShape() },
  readScale: { armPath: ["readScale"], value: createUnionShape() },
  recoverableDatabaseId: { armPath: ["recoverableDatabaseId"], value: createStringShape() },
  recoveryServicesRecoveryPointId: {
    armPath: ["recoveryServicesRecoveryPointId"],
    value: createStringShape(),
  },
  requestedBackupStorageRedundancy: {
    armPath: ["requestedBackupStorageRedundancy"],
    value: createUnionShape(),
  },
  requestedServiceObjectiveName: {
    armPath: ["requestedServiceObjectiveName"],
    value: createStringShape(),
    readOnly: true,
  },
  restorableDroppedDatabaseId: {
    armPath: ["restorableDroppedDatabaseId"],
    value: createStringShape(),
  },
  restorePointInTime: {
    armPath: ["restorePointInTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  resumedDate: {
    armPath: ["resumedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  sampleName: { armPath: ["sampleName"], value: createUnionShape() },
  secondaryType: { armPath: ["secondaryType"], value: createUnionShape() },
  sourceDatabaseDeletionDate: {
    armPath: ["sourceDatabaseDeletionDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  sourceDatabaseId: { armPath: ["sourceDatabaseId"], value: createStringShape() },
  sourceResourceId: { armPath: ["sourceResourceId"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  useFreeLimit: { armPath: ["useFreeLimit"], value: createBooleanShape() },
  zoneRedundant: { armPath: ["zoneRedundant"], value: createBooleanShape() },
});

/**
 * Properties of a database Sql Vulnerability Assessment baseline set.
 */
export interface DatabaseSqlVulnerabilityAssessmentBaselineSetProperties {
  /**
   * The latest scan flag
   */
  latestScan: boolean;
  /**
   * The rule baseline result list
   */
  results: Record<string, string[][]>;
}

/**
 * Input type for Properties of a database Sql Vulnerability Assessment baseline set.
 */
export interface DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesInput extends InputOf<DatabaseSqlVulnerabilityAssessmentBaselineSetProperties> {
  /**
   * The latest scan flag
   */
  latestScan: ExpressionOrValue<boolean>;
  /**
   * The rule baseline result list
   */
  results: InputRecord<
    InputArray<InputArray<ExpressionOrValue<string>, string[]>, string[][]>,
    Record<string, string[][]>
  >;
}

/**
 * View type for Properties of a database Sql Vulnerability Assessment baseline set.
 */
export type DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesView =
  DatabaseSqlVulnerabilityAssessmentBaselineSetPropertiesInput;

export const databaseSqlVulnerabilityAssessmentBaselineSetPropertiesShape: FlatModelShape =
  createFlatModelShape({
    latestScan: { armPath: ["latestScan"], value: createBooleanShape() },
    results: {
      armPath: ["results"],
      value: createRecordShape(createArrayShape(createArrayShape(createStringShape()))),
    },
  });

/**
 * Properties of a database Sql Vulnerability Assessment rule baseline.
 */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselineProperties {
  /**
   * The latest scan flag
   */
  latestScan: boolean;
  /**
   * The rule baseline result
   */
  results: string[][];
}

/**
 * Input type for Properties of a database Sql Vulnerability Assessment rule baseline.
 */
export interface DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput extends InputOf<DatabaseSqlVulnerabilityAssessmentRuleBaselineProperties> {
  /**
   * The latest scan flag
   */
  latestScan: ExpressionOrValue<boolean>;
  /**
   * The rule baseline result
   */
  results: InputArray<InputArray<ExpressionOrValue<string>, string[]>, string[][]>;
}

/**
 * View type for Properties of a database Sql Vulnerability Assessment rule baseline.
 */
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesView =
  DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput;

export const databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesShape: FlatModelShape =
  createFlatModelShape({
    latestScan: { armPath: ["latestScan"], value: createBooleanShape() },
    results: {
      armPath: ["results"],
      value: createArrayShape(createArrayShape(createStringShape())),
    },
  });

/**
 * Database table properties.
 */
export interface DatabaseTableProperties {
  /**
   * Whether or not the table is memory optimized.
   */
  memoryOptimized?: boolean;
  /**
   * The table temporal type.
   */
  temporalType?: TableTemporalType;
}

/**
 * Input type for Database table properties.
 */
export interface DatabaseTablePropertiesInput extends InputOf<DatabaseTableProperties> {}

/**
 * View type for Database table properties.
 */
export interface DatabaseTablePropertiesView extends InputOf<DatabaseTableProperties> {
  /**
   * Read-only output: Whether or not the table is memory optimized.
   */
  readonly memoryOptimized?: Expression<boolean> | undefined;
  /**
   * Read-only output: The table temporal type.
   */
  readonly temporalType?: Expression<TableTemporalType> | undefined;
}

export const databaseTablePropertiesShape: FlatModelShape = createFlatModelShape({
  memoryOptimized: { armPath: ["memoryOptimized"], value: createBooleanShape(), readOnly: true },
  temporalType: { armPath: ["temporalType"], value: createUnionShape(), readOnly: true },
});

/**
 * Azure Active Directory identity configuration for a resource.
 */
export interface DatabaseUserIdentity {
  /**
   * The Azure Active Directory client id.
   */
  clientId?: string;
  /**
   * The Azure Active Directory principal id.
   */
  principalId?: string;
}

/**
 * Input type for Azure Active Directory identity configuration for a resource.
 */
export interface DatabaseUserIdentityInput extends InputOf<DatabaseUserIdentity> {}

/**
 * View type for Azure Active Directory identity configuration for a resource.
 */
export interface DatabaseUserIdentityView extends InputOf<DatabaseUserIdentity> {
  /**
   * Read-only output: The Azure Active Directory client id.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The Azure Active Directory principal id.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const databaseUserIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a database Vulnerability Assessment.
 */
export interface DatabaseVulnerabilityAssessmentProperties {
  /**
   * The recurring scans settings
   */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
  /**
   * Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageAccountAccessKey?: string;
  /**
   * A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/). It is required if server level vulnerability assessment policy doesn't set
   */
  storageContainerPath?: string;
  /**
   * A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageContainerSasKey?: string;
}

/**
 * Input type for Properties of a database Vulnerability Assessment.
 */
export interface DatabaseVulnerabilityAssessmentPropertiesInput extends InputOf<DatabaseVulnerabilityAssessmentProperties> {
  /**
   * The recurring scans settings
   */
  recurringScans?: VulnerabilityAssessmentRecurringScansPropertiesInput | undefined;
  /**
   * Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/). It is required if server level vulnerability assessment policy doesn't set
   */
  storageContainerPath?: ExpressionOrValue<string> | undefined;
  /**
   * A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageContainerSasKey?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a database Vulnerability Assessment.
 */
export type DatabaseVulnerabilityAssessmentPropertiesView =
  DatabaseVulnerabilityAssessmentPropertiesInput;

export const databaseVulnerabilityAssessmentPropertiesShape: FlatModelShape = createFlatModelShape({
  recurringScans: {
    armPath: ["recurringScans"],
    value: createDeferredShape(() => vulnerabilityAssessmentRecurringScansPropertiesShape),
  },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageContainerPath: { armPath: ["storageContainerPath"], value: createStringShape() },
  storageContainerSasKey: { armPath: ["storageContainerSasKey"], value: createStringShape() },
});

/**
 * Properties for an Azure SQL Database Vulnerability Assessment rule baseline's result.
 */
export interface DatabaseVulnerabilityAssessmentRuleBaselineItem {
  /**
   * The rule baseline result
   */
  result: string[];
}

/**
 * Input type for Properties for an Azure SQL Database Vulnerability Assessment rule baseline's result.
 */
export interface DatabaseVulnerabilityAssessmentRuleBaselineItemInput extends InputOf<DatabaseVulnerabilityAssessmentRuleBaselineItem> {
  /**
   * The rule baseline result
   */
  result: InputArray<ExpressionOrValue<string>, string[]>;
}

/**
 * View type for Properties for an Azure SQL Database Vulnerability Assessment rule baseline's result.
 */
export type DatabaseVulnerabilityAssessmentRuleBaselineItemView =
  DatabaseVulnerabilityAssessmentRuleBaselineItemInput;

export const databaseVulnerabilityAssessmentRuleBaselineItemShape: FlatModelShape =
  createFlatModelShape({
    result: { armPath: ["result"], value: createArrayShape(createStringShape()) },
  });

/**
 * Properties of a database Vulnerability Assessment rule baseline.
 */
export interface DatabaseVulnerabilityAssessmentRuleBaselineProperties {
  /**
   * The rule baseline result
   */
  baselineResults: DatabaseVulnerabilityAssessmentRuleBaselineItem[];
}

/**
 * Input type for Properties of a database Vulnerability Assessment rule baseline.
 */
export interface DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput extends InputOf<DatabaseVulnerabilityAssessmentRuleBaselineProperties> {
  /**
   * The rule baseline result
   */
  baselineResults: InputArray<
    DatabaseVulnerabilityAssessmentRuleBaselineItemInput,
    DatabaseVulnerabilityAssessmentRuleBaselineItem[]
  >;
}

/**
 * View type for Properties of a database Vulnerability Assessment rule baseline.
 */
export type DatabaseVulnerabilityAssessmentRuleBaselinePropertiesView =
  DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput;

export const databaseVulnerabilityAssessmentRuleBaselinePropertiesShape: FlatModelShape =
  createFlatModelShape({
    baselineResults: {
      armPath: ["baselineResults"],
      value: createArrayShape(
        createDeferredShape(() => databaseVulnerabilityAssessmentRuleBaselineItemShape),
      ),
    },
  });

/**
 * The properties of a database data masking policy.
 */
export interface DataMaskingPolicyProperties {
  /**
   * The list of the application principals. This is a legacy parameter and is no longer used.
   */
  applicationPrincipals?: string;
  /**
   * The state of the data masking policy.
   */
  dataMaskingState: DataMaskingState;
  /**
   * The list of the exempt principals. Specifies the semicolon-separated list of database users for which the data masking policy does not apply. The specified users receive data results without masking for all of the database queries.
   */
  exemptPrincipals?: string;
  /**
   * The masking level. This is a legacy parameter and is no longer used.
   */
  maskingLevel?: string;
}

/**
 * Input type for The properties of a database data masking policy.
 */
export interface DataMaskingPolicyPropertiesInput extends InputOf<DataMaskingPolicyProperties> {
  /**
   * The state of the data masking policy.
   */
  dataMaskingState: ExpressionOrValue<DataMaskingState>;
  /**
   * The list of the exempt principals. Specifies the semicolon-separated list of database users for which the data masking policy does not apply. The specified users receive data results without masking for all of the database queries.
   */
  exemptPrincipals?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a database data masking policy.
 */
export interface DataMaskingPolicyPropertiesView extends InputOf<DataMaskingPolicyProperties> {
  /**
   * Read-only output: The list of the application principals. This is a legacy parameter and is no longer used.
   */
  readonly applicationPrincipals?: Expression<string> | undefined;
  /**
   * The state of the data masking policy.
   */
  dataMaskingState: ExpressionOrValue<DataMaskingState>;
  /**
   * The list of the exempt principals. Specifies the semicolon-separated list of database users for which the data masking policy does not apply. The specified users receive data results without masking for all of the database queries.
   */
  exemptPrincipals?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The masking level. This is a legacy parameter and is no longer used.
   */
  readonly maskingLevel?: Expression<string> | undefined;
}

export const dataMaskingPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  applicationPrincipals: {
    armPath: ["applicationPrincipals"],
    value: createStringShape(),
    readOnly: true,
  },
  dataMaskingState: { armPath: ["dataMaskingState"], value: createEnumShape() },
  exemptPrincipals: { armPath: ["exemptPrincipals"], value: createStringShape() },
  maskingLevel: { armPath: ["maskingLevel"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of a database data masking rule.
 */
export interface DataMaskingRuleProperties {
  /**
   * The alias name. This is a legacy parameter and is no longer used.
   */
  aliasName?: string;
  /**
   * The column name on which the data masking rule is applied.
   */
  columnName: string;
  /**
   * The rule Id.
   */
  id?: string;
  /**
   * The masking function that is used for the data masking rule.
   */
  maskingFunction: DataMaskingFunction;
  /**
   * The numberFrom property of the masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored.
   */
  numberFrom?: string;
  /**
   * The numberTo property of the data masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored.
   */
  numberTo?: string;
  /**
   * If maskingFunction is set to Text, the number of characters to show unmasked in the beginning of the string. Otherwise, this parameter will be ignored.
   */
  prefixSize?: string;
  /**
   * If maskingFunction is set to Text, the character to use for masking the unexposed part of the string. Otherwise, this parameter will be ignored.
   */
  replacementString?: string;
  /**
   * The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState.
   */
  ruleState?: DataMaskingRuleState;
  /**
   * The schema name on which the data masking rule is applied.
   */
  schemaName: string;
  /**
   * If maskingFunction is set to Text, the number of characters to show unmasked at the end of the string. Otherwise, this parameter will be ignored.
   */
  suffixSize?: string;
  /**
   * The table name on which the data masking rule is applied.
   */
  tableName: string;
}

/**
 * Input type for The properties of a database data masking rule.
 */
export interface DataMaskingRulePropertiesInput extends InputOf<DataMaskingRuleProperties> {
  /**
   * The alias name. This is a legacy parameter and is no longer used.
   */
  aliasName?: ExpressionOrValue<string> | undefined;
  /**
   * The column name on which the data masking rule is applied.
   */
  columnName: ExpressionOrValue<string>;
  /**
   * The masking function that is used for the data masking rule.
   */
  maskingFunction: ExpressionOrValue<DataMaskingFunction>;
  /**
   * The numberFrom property of the masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored.
   */
  numberFrom?: ExpressionOrValue<string> | undefined;
  /**
   * The numberTo property of the data masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored.
   */
  numberTo?: ExpressionOrValue<string> | undefined;
  /**
   * If maskingFunction is set to Text, the number of characters to show unmasked in the beginning of the string. Otherwise, this parameter will be ignored.
   */
  prefixSize?: ExpressionOrValue<string> | undefined;
  /**
   * If maskingFunction is set to Text, the character to use for masking the unexposed part of the string. Otherwise, this parameter will be ignored.
   */
  replacementString?: ExpressionOrValue<string> | undefined;
  /**
   * The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState.
   */
  ruleState?: ExpressionOrValue<DataMaskingRuleState> | undefined;
  /**
   * The schema name on which the data masking rule is applied.
   */
  schemaName: ExpressionOrValue<string>;
  /**
   * If maskingFunction is set to Text, the number of characters to show unmasked at the end of the string. Otherwise, this parameter will be ignored.
   */
  suffixSize?: ExpressionOrValue<string> | undefined;
  /**
   * The table name on which the data masking rule is applied.
   */
  tableName: ExpressionOrValue<string>;
}

/**
 * View type for The properties of a database data masking rule.
 */
export interface DataMaskingRulePropertiesView extends InputOf<DataMaskingRuleProperties> {
  /**
   * The alias name. This is a legacy parameter and is no longer used.
   */
  aliasName?: ExpressionOrValue<string> | undefined;
  /**
   * The column name on which the data masking rule is applied.
   */
  columnName: ExpressionOrValue<string>;
  /**
   * Read-only output: The rule Id.
   */
  readonly id?: Expression<string> | undefined;
  /**
   * The masking function that is used for the data masking rule.
   */
  maskingFunction: ExpressionOrValue<DataMaskingFunction>;
  /**
   * The numberFrom property of the masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored.
   */
  numberFrom?: ExpressionOrValue<string> | undefined;
  /**
   * The numberTo property of the data masking rule. Required if maskingFunction is set to Number, otherwise this parameter will be ignored.
   */
  numberTo?: ExpressionOrValue<string> | undefined;
  /**
   * If maskingFunction is set to Text, the number of characters to show unmasked in the beginning of the string. Otherwise, this parameter will be ignored.
   */
  prefixSize?: ExpressionOrValue<string> | undefined;
  /**
   * If maskingFunction is set to Text, the character to use for masking the unexposed part of the string. Otherwise, this parameter will be ignored.
   */
  replacementString?: ExpressionOrValue<string> | undefined;
  /**
   * The rule state. Used to delete a rule. To delete an existing rule, specify the schemaName, tableName, columnName, maskingFunction, and specify ruleState as disabled. However, if the rule doesn't already exist, the rule will be created with ruleState set to enabled, regardless of the provided value of ruleState.
   */
  ruleState?: ExpressionOrValue<DataMaskingRuleState> | undefined;
  /**
   * The schema name on which the data masking rule is applied.
   */
  schemaName: ExpressionOrValue<string>;
  /**
   * If maskingFunction is set to Text, the number of characters to show unmasked at the end of the string. Otherwise, this parameter will be ignored.
   */
  suffixSize?: ExpressionOrValue<string> | undefined;
  /**
   * The table name on which the data masking rule is applied.
   */
  tableName: ExpressionOrValue<string>;
}

export const dataMaskingRulePropertiesShape: FlatModelShape = createFlatModelShape({
  aliasName: { armPath: ["aliasName"], value: createStringShape() },
  columnName: { armPath: ["columnName"], value: createStringShape() },
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  maskingFunction: { armPath: ["maskingFunction"], value: createEnumShape() },
  numberFrom: { armPath: ["numberFrom"], value: createStringShape() },
  numberTo: { armPath: ["numberTo"], value: createStringShape() },
  prefixSize: { armPath: ["prefixSize"], value: createStringShape() },
  replacementString: { armPath: ["replacementString"], value: createStringShape() },
  ruleState: { armPath: ["ruleState"], value: createEnumShape() },
  schemaName: { armPath: ["schemaName"], value: createStringShape() },
  suffixSize: { armPath: ["suffixSize"], value: createStringShape() },
  tableName: { armPath: ["tableName"], value: createStringShape() },
});

/**
 * User activities of a data warehouse. This currently includes the count of running or suspended queries. For more information, please view the sys.dm_pdw_exec_requests dynamic management view (DMV).
 */
export interface DataWarehouseUserActivitiesProperties {
  /**
   * Count of running and suspended queries.
   */
  activeQueriesCount?: number;
}

/**
 * Input type for User activities of a data warehouse. This currently includes the count of running or suspended queries. For more information, please view the sys.dm_pdw_exec_requests dynamic management view (DMV).
 */
export interface DataWarehouseUserActivitiesPropertiesInput extends InputOf<DataWarehouseUserActivitiesProperties> {}

/**
 * View type for User activities of a data warehouse. This currently includes the count of running or suspended queries. For more information, please view the sys.dm_pdw_exec_requests dynamic management view (DMV).
 */
export interface DataWarehouseUserActivitiesPropertiesView extends InputOf<DataWarehouseUserActivitiesProperties> {
  /**
   * Read-only output: Count of running and suspended queries.
   */
  readonly activeQueriesCount?: Expression<number> | undefined;
}

export const dataWarehouseUserActivitiesPropertiesShape: FlatModelShape = createFlatModelShape({
  activeQueriesCount: {
    armPath: ["activeQueriesCount"],
    value: createNumberShape(),
    readOnly: true,
  },
});

/**
 * The properties of a deleted server.
 */
export interface DeletedServerProperties {
  /**
   * The deletion time of the deleted server.
   */
  deletionTime?: Date;
  /**
   * The fully qualified domain name of the server.
   */
  fullyQualifiedDomainName?: string;
  /**
   * The original ID of the server before deletion.
   */
  originalId?: string;
  /**
   * The version of the deleted server.
   */
  version?: string;
}

/**
 * Input type for The properties of a deleted server.
 */
export interface DeletedServerPropertiesInput extends InputOf<DeletedServerProperties> {}

/**
 * View type for The properties of a deleted server.
 */
export interface DeletedServerPropertiesView extends InputOf<DeletedServerProperties> {
  /**
   * Read-only output: The deletion time of the deleted server.
   */
  readonly deletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The fully qualified domain name of the server.
   */
  readonly fullyQualifiedDomainName?: Expression<string> | undefined;
  /**
   * Read-only output: The original ID of the server before deletion.
   */
  readonly originalId?: Expression<string> | undefined;
  /**
   * Read-only output: The version of the deleted server.
   */
  readonly version?: Expression<string> | undefined;
}

export const deletedServerPropertiesShape: FlatModelShape = createFlatModelShape({
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
  fullyQualifiedDomainName: {
    armPath: ["fullyQualifiedDomainName"],
    value: createStringShape(),
    readOnly: true,
  },
  originalId: { armPath: ["originalId"], value: createStringShape(), readOnly: true },
  version: { armPath: ["version"], value: createStringShape(), readOnly: true },
});

/**
 * Database specific information
 */
export interface DistributedAvailabilityGroupDatabase {
  /**
   * Link connected state
   */
  connectedState?: ReplicaConnectedState;
  /**
   * The name of the database in link
   */
  databaseName?: string;
  /**
   * Redo lag when Managed Instance link side is primary
   */
  instanceRedoReplicationLagSeconds?: number;
  /**
   * Managed instance replica id
   */
  instanceReplicaId?: string;
  /**
   * Replication lag when Managed Instance link side is primary
   */
  instanceSendReplicationLagSeconds?: number;
  /**
   * Last backup LSN
   */
  lastBackupLsn?: string;
  /**
   * Last backup LSN time
   */
  lastBackupTime?: Date;
  /**
   * Last commit LSN
   */
  lastCommitLsn?: string;
  /**
   * Last commit LSN time
   */
  lastCommitTime?: Date;
  /**
   * Last hardened LSN
   */
  lastHardenedLsn?: string;
  /**
   * Last hardened LSN time
   */
  lastHardenedTime?: Date;
  /**
   * Last received LSN
   */
  lastReceivedLsn?: string;
  /**
   * Last received LSN time
   */
  lastReceivedTime?: Date;
  /**
   * Last sent LSN
   */
  lastSentLsn?: string;
  /**
   * Last sent LSN time
   */
  lastSentTime?: Date;
  /**
   * The most recent link connection error description
   */
  mostRecentLinkError?: string;
  /**
   * SQL server certificate validity
   */
  partnerAuthCertValidity?: CertificateInfo;
  /**
   * SQL server replica id
   */
  partnerReplicaId?: string;
  /**
   * Current link state
   */
  replicaState?: string;
  /**
   * Seeding progress
   */
  seedingProgress?: string;
  /**
   * Link health state
   */
  synchronizationHealth?: ReplicaSynchronizationHealth;
}

/**
 * Input type for Database specific information
 */
export interface DistributedAvailabilityGroupDatabaseInput extends InputOf<DistributedAvailabilityGroupDatabase> {
  /**
   * The name of the database in link
   */
  databaseName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Database specific information
 */
export interface DistributedAvailabilityGroupDatabaseView extends InputOf<DistributedAvailabilityGroupDatabase> {
  /**
   * Read-only output: Link connected state
   */
  readonly connectedState?: Expression<ReplicaConnectedState> | undefined;
  /**
   * The name of the database in link
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Redo lag when Managed Instance link side is primary
   */
  readonly instanceRedoReplicationLagSeconds?: Expression<number> | undefined;
  /**
   * Read-only output: Managed instance replica id
   */
  readonly instanceReplicaId?: Expression<string> | undefined;
  /**
   * Read-only output: Replication lag when Managed Instance link side is primary
   */
  readonly instanceSendReplicationLagSeconds?: Expression<number> | undefined;
  /**
   * Read-only output: Last backup LSN
   */
  readonly lastBackupLsn?: Expression<string> | undefined;
  /**
   * Read-only output: Last backup LSN time
   */
  readonly lastBackupTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Last commit LSN
   */
  readonly lastCommitLsn?: Expression<string> | undefined;
  /**
   * Read-only output: Last commit LSN time
   */
  readonly lastCommitTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Last hardened LSN
   */
  readonly lastHardenedLsn?: Expression<string> | undefined;
  /**
   * Read-only output: Last hardened LSN time
   */
  readonly lastHardenedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Last received LSN
   */
  readonly lastReceivedLsn?: Expression<string> | undefined;
  /**
   * Read-only output: Last received LSN time
   */
  readonly lastReceivedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Last sent LSN
   */
  readonly lastSentLsn?: Expression<string> | undefined;
  /**
   * Read-only output: Last sent LSN time
   */
  readonly lastSentTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The most recent link connection error description
   */
  readonly mostRecentLinkError?: Expression<string> | undefined;
  /**
   * Read-only output: SQL server certificate validity
   */
  readonly partnerAuthCertValidity?: Expression<CertificateInfo> | undefined;
  /**
   * Read-only output: SQL server replica id
   */
  readonly partnerReplicaId?: Expression<string> | undefined;
  /**
   * Read-only output: Current link state
   */
  readonly replicaState?: Expression<string> | undefined;
  /**
   * Read-only output: Seeding progress
   */
  readonly seedingProgress?: Expression<string> | undefined;
  /**
   * Read-only output: Link health state
   */
  readonly synchronizationHealth?: Expression<ReplicaSynchronizationHealth> | undefined;
}

export const distributedAvailabilityGroupDatabaseShape: FlatModelShape = createFlatModelShape({
  connectedState: { armPath: ["connectedState"], value: createUnionShape(), readOnly: true },
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  instanceRedoReplicationLagSeconds: {
    armPath: ["instanceRedoReplicationLagSeconds"],
    value: createNumberShape(),
    readOnly: true,
  },
  instanceReplicaId: { armPath: ["instanceReplicaId"], value: createStringShape(), readOnly: true },
  instanceSendReplicationLagSeconds: {
    armPath: ["instanceSendReplicationLagSeconds"],
    value: createNumberShape(),
    readOnly: true,
  },
  lastBackupLsn: { armPath: ["lastBackupLsn"], value: createStringShape(), readOnly: true },
  lastBackupTime: {
    armPath: ["lastBackupTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastCommitLsn: { armPath: ["lastCommitLsn"], value: createStringShape(), readOnly: true },
  lastCommitTime: {
    armPath: ["lastCommitTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastHardenedLsn: { armPath: ["lastHardenedLsn"], value: createStringShape(), readOnly: true },
  lastHardenedTime: {
    armPath: ["lastHardenedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastReceivedLsn: { armPath: ["lastReceivedLsn"], value: createStringShape(), readOnly: true },
  lastReceivedTime: {
    armPath: ["lastReceivedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastSentLsn: { armPath: ["lastSentLsn"], value: createStringShape(), readOnly: true },
  lastSentTime: {
    armPath: ["lastSentTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  mostRecentLinkError: {
    armPath: ["mostRecentLinkError"],
    value: createStringShape(),
    readOnly: true,
  },
  partnerAuthCertValidity: {
    armPath: ["partnerAuthCertValidity"],
    value: createDeferredShape(() => certificateInfoShape),
    readOnly: true,
  },
  partnerReplicaId: { armPath: ["partnerReplicaId"], value: createStringShape(), readOnly: true },
  replicaState: { armPath: ["replicaState"], value: createStringShape(), readOnly: true },
  seedingProgress: { armPath: ["seedingProgress"], value: createStringShape(), readOnly: true },
  synchronizationHealth: {
    armPath: ["synchronizationHealth"],
    value: createUnionShape(),
    readOnly: true,
  },
});

/**
 * The properties of a distributed availability group.
 */
export interface DistributedAvailabilityGroupProperties {
  /**
   * Databases in the distributed availability group
   */
  databases?: DistributedAvailabilityGroupDatabase[];
  /**
   * ID of the distributed availability group
   */
  distributedAvailabilityGroupId?: string;
  /**
   * Name of the distributed availability group
   */
  distributedAvailabilityGroupName?: string;
  /**
   * The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure.
   */
  failoverMode?: FailoverModeType;
  /**
   * Managed instance side availability group name
   */
  instanceAvailabilityGroupName?: string;
  /**
   * Managed instance side link role
   */
  instanceLinkRole?: LinkRole;
  /**
   * SQL server side availability group name
   */
  partnerAvailabilityGroupName?: string;
  /**
   * SQL server side endpoint - IP or DNS resolvable name
   */
  partnerEndpoint?: string;
  /**
   * SQL server side link role
   */
  partnerLinkRole?: LinkRole;
  /**
   * Replication mode of the link
   */
  replicationMode?: ReplicationModeType;
  /**
   * Database seeding mode – can be Automatic (default), or Manual for supported scenarios.
   */
  seedingMode?: SeedingModeType;
}

/**
 * Input type for The properties of a distributed availability group.
 */
export interface DistributedAvailabilityGroupPropertiesInput extends InputOf<DistributedAvailabilityGroupProperties> {
  /**
   * Databases in the distributed availability group
   */
  databases?:
    | InputArray<DistributedAvailabilityGroupDatabaseInput, DistributedAvailabilityGroupDatabase[]>
    | undefined;
  /**
   * The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure.
   */
  failoverMode?: ExpressionOrValue<FailoverModeType> | undefined;
  /**
   * Managed instance side availability group name
   */
  instanceAvailabilityGroupName?: ExpressionOrValue<string> | undefined;
  /**
   * Managed instance side link role
   */
  instanceLinkRole?: ExpressionOrValue<LinkRole> | undefined;
  /**
   * SQL server side availability group name
   */
  partnerAvailabilityGroupName?: ExpressionOrValue<string> | undefined;
  /**
   * SQL server side endpoint - IP or DNS resolvable name
   */
  partnerEndpoint?: ExpressionOrValue<string> | undefined;
  /**
   * Replication mode of the link
   */
  replicationMode?: ExpressionOrValue<ReplicationModeType> | undefined;
  /**
   * Database seeding mode – can be Automatic (default), or Manual for supported scenarios.
   */
  seedingMode?: ExpressionOrValue<SeedingModeType> | undefined;
}

/**
 * View type for The properties of a distributed availability group.
 */
export interface DistributedAvailabilityGroupPropertiesView extends InputOf<DistributedAvailabilityGroupProperties> {
  /**
   * Databases in the distributed availability group
   */
  databases?:
    | InputArray<DistributedAvailabilityGroupDatabaseView, DistributedAvailabilityGroupDatabase[]>
    | undefined;
  /**
   * Read-only output: ID of the distributed availability group
   */
  readonly distributedAvailabilityGroupId?: Expression<string> | undefined;
  /**
   * Read-only output: Name of the distributed availability group
   */
  readonly distributedAvailabilityGroupName?: Expression<string> | undefined;
  /**
   * The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure.
   */
  failoverMode?: ExpressionOrValue<FailoverModeType> | undefined;
  /**
   * Managed instance side availability group name
   */
  instanceAvailabilityGroupName?: ExpressionOrValue<string> | undefined;
  /**
   * Managed instance side link role
   */
  instanceLinkRole?: ExpressionOrValue<LinkRole> | undefined;
  /**
   * SQL server side availability group name
   */
  partnerAvailabilityGroupName?: ExpressionOrValue<string> | undefined;
  /**
   * SQL server side endpoint - IP or DNS resolvable name
   */
  partnerEndpoint?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: SQL server side link role
   */
  readonly partnerLinkRole?: Expression<LinkRole> | undefined;
  /**
   * Replication mode of the link
   */
  replicationMode?: ExpressionOrValue<ReplicationModeType> | undefined;
  /**
   * Database seeding mode – can be Automatic (default), or Manual for supported scenarios.
   */
  seedingMode?: ExpressionOrValue<SeedingModeType> | undefined;
}

export const distributedAvailabilityGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  databases: {
    armPath: ["databases"],
    value: createArrayShape(createDeferredShape(() => distributedAvailabilityGroupDatabaseShape)),
  },
  distributedAvailabilityGroupId: {
    armPath: ["distributedAvailabilityGroupId"],
    value: createStringShape(),
    readOnly: true,
  },
  distributedAvailabilityGroupName: {
    armPath: ["distributedAvailabilityGroupName"],
    value: createStringShape(),
    readOnly: true,
  },
  failoverMode: { armPath: ["failoverMode"], value: createUnionShape() },
  instanceAvailabilityGroupName: {
    armPath: ["instanceAvailabilityGroupName"],
    value: createStringShape(),
  },
  instanceLinkRole: { armPath: ["instanceLinkRole"], value: createUnionShape() },
  partnerAvailabilityGroupName: {
    armPath: ["partnerAvailabilityGroupName"],
    value: createStringShape(),
  },
  partnerEndpoint: { armPath: ["partnerEndpoint"], value: createStringShape() },
  partnerLinkRole: { armPath: ["partnerLinkRole"], value: createUnionShape(), readOnly: true },
  replicationMode: { armPath: ["replicationMode"], value: createUnionShape() },
  seedingMode: { armPath: ["seedingMode"], value: createUnionShape() },
});

/**
 * Per database settings of an elastic pool.
 */
export interface ElasticPoolPerDatabaseSettings {
  /**
   * Auto Pause Delay for per database within pool
   */
  autoPauseDelay?: number;
  /**
   * The maximum capacity any one database can consume.
   */
  maxCapacity?: number;
  /**
   * The minimum capacity all databases are guaranteed.
   */
  minCapacity?: number;
}

/**
 * Input type for Per database settings of an elastic pool.
 */
export interface ElasticPoolPerDatabaseSettingsInput extends InputOf<ElasticPoolPerDatabaseSettings> {
  /**
   * Auto Pause Delay for per database within pool
   */
  autoPauseDelay?: ExpressionOrValue<number> | undefined;
  /**
   * The maximum capacity any one database can consume.
   */
  maxCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * The minimum capacity all databases are guaranteed.
   */
  minCapacity?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Per database settings of an elastic pool.
 */
export type ElasticPoolPerDatabaseSettingsView = ElasticPoolPerDatabaseSettingsInput;

export const elasticPoolPerDatabaseSettingsShape: FlatModelShape = createFlatModelShape({
  autoPauseDelay: { armPath: ["autoPauseDelay"], value: createNumberShape() },
  maxCapacity: { armPath: ["maxCapacity"], value: createNumberShape() },
  minCapacity: { armPath: ["minCapacity"], value: createNumberShape() },
});

/**
 * Properties of an elastic pool
 */
export interface ElasticPoolProperties {
  /**
   * Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled
   */
  autoPauseDelay?: number;
  /**
   * Specifies the availability zone the pool's primary replica is pinned to.
   */
  availabilityZone?: AvailabilityZoneType;
  /**
   * The creation date of the elastic pool (ISO8601 format).
   */
  creationDate?: Date;
  /**
   * The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools.
   */
  highAvailabilityReplicaCount?: number;
  /**
   * The license type to apply for this elastic pool.
   */
  licenseType?: ElasticPoolLicenseType;
  /**
   * Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur.
   */
  maintenanceConfigurationId?: string;
  /**
   * The storage limit for the database elastic pool in bytes.
   */
  maxSizeBytes?: number;
  /**
   * Minimal capacity that serverless pool will not shrink below, if not paused
   */
  minCapacity?: number;
  /**
   * The per database settings for the elastic pool.
   */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettings;
  /**
   * Type of enclave requested on the elastic pool.
   */
  preferredEnclaveType?: AlwaysEncryptedEnclaveType;
  /**
   * The state of the elastic pool.
   */
  state?: ElasticPoolState;
  /**
   * Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones.
   */
  zoneRedundant?: boolean;
}

/**
 * Input type for Properties of an elastic pool
 */
export interface ElasticPoolPropertiesInput extends InputOf<ElasticPoolProperties> {
  /**
   * Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled
   */
  autoPauseDelay?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the availability zone the pool's primary replica is pinned to.
   */
  availabilityZone?: ExpressionOrValue<AvailabilityZoneType> | undefined;
  /**
   * The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools.
   */
  highAvailabilityReplicaCount?: ExpressionOrValue<number> | undefined;
  /**
   * The license type to apply for this elastic pool.
   */
  licenseType?: ExpressionOrValue<ElasticPoolLicenseType> | undefined;
  /**
   * Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * The storage limit for the database elastic pool in bytes.
   */
  maxSizeBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Minimal capacity that serverless pool will not shrink below, if not paused
   */
  minCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * The per database settings for the elastic pool.
   */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettingsInput | undefined;
  /**
   * Type of enclave requested on the elastic pool.
   */
  preferredEnclaveType?: ExpressionOrValue<AlwaysEncryptedEnclaveType> | undefined;
  /**
   * Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties of an elastic pool
 */
export interface ElasticPoolPropertiesView extends InputOf<ElasticPoolProperties> {
  /**
   * Time in minutes after which elastic pool is automatically paused. A value of -1 means that automatic pause is disabled
   */
  autoPauseDelay?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the availability zone the pool's primary replica is pinned to.
   */
  availabilityZone?: ExpressionOrValue<AvailabilityZoneType> | undefined;
  /**
   * Read-only output: The creation date of the elastic pool (ISO8601 format).
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The number of secondary replicas associated with the Business Critical, Premium, or Hyperscale edition elastic pool that are used to provide high availability. Applicable only to Hyperscale elastic pools.
   */
  highAvailabilityReplicaCount?: ExpressionOrValue<number> | undefined;
  /**
   * The license type to apply for this elastic pool.
   */
  licenseType?: ExpressionOrValue<ElasticPoolLicenseType> | undefined;
  /**
   * Maintenance configuration id assigned to the elastic pool. This configuration defines the period when the maintenance updates will will occur.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * The storage limit for the database elastic pool in bytes.
   */
  maxSizeBytes?: ExpressionOrValue<number> | undefined;
  /**
   * Minimal capacity that serverless pool will not shrink below, if not paused
   */
  minCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * The per database settings for the elastic pool.
   */
  perDatabaseSettings?: ElasticPoolPerDatabaseSettingsView | undefined;
  /**
   * Type of enclave requested on the elastic pool.
   */
  preferredEnclaveType?: ExpressionOrValue<AlwaysEncryptedEnclaveType> | undefined;
  /**
   * Read-only output: The state of the elastic pool.
   */
  readonly state?: Expression<ElasticPoolState> | undefined;
  /**
   * Whether or not this elastic pool is zone redundant, which means the replicas of this elastic pool will be spread across multiple availability zones.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

export const elasticPoolPropertiesShape: FlatModelShape = createFlatModelShape({
  autoPauseDelay: { armPath: ["autoPauseDelay"], value: createNumberShape() },
  availabilityZone: { armPath: ["availabilityZone"], value: createUnionShape() },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  highAvailabilityReplicaCount: {
    armPath: ["highAvailabilityReplicaCount"],
    value: createNumberShape(),
  },
  licenseType: { armPath: ["licenseType"], value: createUnionShape() },
  maintenanceConfigurationId: {
    armPath: ["maintenanceConfigurationId"],
    value: createStringShape(),
  },
  maxSizeBytes: { armPath: ["maxSizeBytes"], value: createNumberShape() },
  minCapacity: { armPath: ["minCapacity"], value: createNumberShape() },
  perDatabaseSettings: {
    armPath: ["perDatabaseSettings"],
    value: createDeferredShape(() => elasticPoolPerDatabaseSettingsShape),
  },
  preferredEnclaveType: { armPath: ["preferredEnclaveType"], value: createUnionShape() },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
  zoneRedundant: { armPath: ["zoneRedundant"], value: createBooleanShape() },
});

/**
 * Properties for an encryption protector execution.
 */
export interface EncryptionProtectorProperties {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: boolean;
  /**
   * The version of the server key being used as encryption protector
   */
  keyVersion?: string;
  /**
   * The name of the server key.
   */
  serverKeyName?: string;
  /**
   * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ServerKeyType;
  /**
   * Subregion of the encryption protector.
   */
  subregion?: string;
  /**
   * Thumbprint of the server key.
   */
  thumbprint?: string;
  /**
   * The URI of the server key.
   */
  uri?: string;
}

/**
 * Input type for Properties for an encryption protector execution.
 */
export interface EncryptionProtectorPropertiesInput extends InputOf<EncryptionProtectorProperties> {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The name of the server key.
   */
  serverKeyName?: ExpressionOrValue<string> | undefined;
  /**
   * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
}

/**
 * View type for Properties for an encryption protector execution.
 */
export interface EncryptionProtectorPropertiesView extends InputOf<EncryptionProtectorProperties> {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The version of the server key being used as encryption protector
   */
  readonly keyVersion?: Expression<string> | undefined;
  /**
   * The name of the server key.
   */
  serverKeyName?: ExpressionOrValue<string> | undefined;
  /**
   * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
  /**
   * Read-only output: Subregion of the encryption protector.
   */
  readonly subregion?: Expression<string> | undefined;
  /**
   * Read-only output: Thumbprint of the server key.
   */
  readonly thumbprint?: Expression<string> | undefined;
  /**
   * Read-only output: The URI of the server key.
   */
  readonly uri?: Expression<string> | undefined;
}

export const encryptionProtectorPropertiesShape: FlatModelShape = createFlatModelShape({
  autoRotationEnabled: { armPath: ["autoRotationEnabled"], value: createBooleanShape() },
  keyVersion: { armPath: ["keyVersion"], value: createStringShape(), readOnly: true },
  serverKeyName: { armPath: ["serverKeyName"], value: createStringShape() },
  serverKeyType: { armPath: ["serverKeyType"], value: createUnionShape() },
  subregion: { armPath: ["subregion"], value: createStringShape(), readOnly: true },
  thumbprint: { armPath: ["thumbprint"], value: createStringShape(), readOnly: true },
  uri: { armPath: ["uri"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of an endpoint certificate.
 */
export interface EndpointCertificateProperties {
  /**
   * The certificate public blob
   */
  publicBlob?: string;
}

/**
 * Input type for The properties of an endpoint certificate.
 */
export interface EndpointCertificatePropertiesInput extends InputOf<EndpointCertificateProperties> {}

/**
 * View type for The properties of an endpoint certificate.
 */
export interface EndpointCertificatePropertiesView extends InputOf<EndpointCertificateProperties> {
  /**
   * Read-only output: The certificate public blob
   */
  readonly publicBlob?: Expression<string> | undefined;
}

export const endpointCertificatePropertiesShape: FlatModelShape = createFlatModelShape({
  publicBlob: { armPath: ["publicBlob"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of an extended database blob auditing policy.
 */
export interface ExtendedDatabaseBlobAuditingPolicyProperties {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: boolean;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies condition of where clause when creating an audit.
   */
  predicateExpression?: string;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: number;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: BlobAuditingPolicyState;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of an extended database blob auditing policy.
 */
export interface ExtendedDatabaseBlobAuditingPolicyPropertiesInput extends InputOf<ExtendedDatabaseBlobAuditingPolicyProperties> {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies condition of where clause when creating an audit.
   */
  predicateExpression?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: ExpressionOrValue<BlobAuditingPolicyState>;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of an extended database blob auditing policy.
 */
export type ExtendedDatabaseBlobAuditingPolicyPropertiesView =
  ExtendedDatabaseBlobAuditingPolicyPropertiesInput;

export const extendedDatabaseBlobAuditingPolicyPropertiesShape: FlatModelShape =
  createFlatModelShape({
    auditActionsAndGroups: {
      armPath: ["auditActionsAndGroups"],
      value: createArrayShape(createStringShape()),
    },
    isAzureMonitorTargetEnabled: {
      armPath: ["isAzureMonitorTargetEnabled"],
      value: createBooleanShape(),
    },
    isManagedIdentityInUse: { armPath: ["isManagedIdentityInUse"], value: createBooleanShape() },
    isStorageSecondaryKeyInUse: {
      armPath: ["isStorageSecondaryKeyInUse"],
      value: createBooleanShape(),
    },
    predicateExpression: { armPath: ["predicateExpression"], value: createStringShape() },
    queueDelayMs: { armPath: ["queueDelayMs"], value: createNumberShape() },
    retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
    state: { armPath: ["state"], value: createEnumShape() },
    storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
    storageAccountSubscriptionId: {
      armPath: ["storageAccountSubscriptionId"],
      value: createStringShape(),
    },
    storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
  });

/**
 * Properties of an extended server blob auditing policy.
 */
export interface ExtendedServerBlobAuditingPolicyProperties {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * **Note:** This field will soon be deprecated. Going forward, use the dedicated Server DevOps Audit Settings APIs to configure DevOps audit. See:
   *
   * - [Server DevOps Audit Settings - Create Or Update](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/create-or-update)
   * - [Server DevOps Audit Settings - Get](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/get)
   *
   * ---
   *
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: boolean;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: boolean;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies condition of where clause when creating an audit.
   */
  predicateExpression?: string;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: number;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: BlobAuditingPolicyState;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of an extended server blob auditing policy.
 */
export interface ExtendedServerBlobAuditingPolicyPropertiesInput extends InputOf<ExtendedServerBlobAuditingPolicyProperties> {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * **Note:** This field will soon be deprecated. Going forward, use the dedicated Server DevOps Audit Settings APIs to configure DevOps audit. See:
   *
   * - [Server DevOps Audit Settings - Create Or Update](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/create-or-update)
   * - [Server DevOps Audit Settings - Get](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/get)
   *
   * ---
   *
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies condition of where clause when creating an audit.
   */
  predicateExpression?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: ExpressionOrValue<BlobAuditingPolicyState>;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of an extended server blob auditing policy.
 */
export type ExtendedServerBlobAuditingPolicyPropertiesView =
  ExtendedServerBlobAuditingPolicyPropertiesInput;

export const extendedServerBlobAuditingPolicyPropertiesShape: FlatModelShape = createFlatModelShape(
  {
    auditActionsAndGroups: {
      armPath: ["auditActionsAndGroups"],
      value: createArrayShape(createStringShape()),
    },
    isAzureMonitorTargetEnabled: {
      armPath: ["isAzureMonitorTargetEnabled"],
      value: createBooleanShape(),
    },
    isDevopsAuditEnabled: { armPath: ["isDevopsAuditEnabled"], value: createBooleanShape() },
    isManagedIdentityInUse: { armPath: ["isManagedIdentityInUse"], value: createBooleanShape() },
    isStorageSecondaryKeyInUse: {
      armPath: ["isStorageSecondaryKeyInUse"],
      value: createBooleanShape(),
    },
    predicateExpression: { armPath: ["predicateExpression"], value: createStringShape() },
    queueDelayMs: { armPath: ["queueDelayMs"], value: createNumberShape() },
    retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
    state: { armPath: ["state"], value: createEnumShape() },
    storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
    storageAccountSubscriptionId: {
      armPath: ["storageAccountSubscriptionId"],
      value: createStringShape(),
    },
    storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
  },
);

/**
 * Properties of a failover group.
 */
export interface FailoverGroupProperties {
  /**
   * List of databases in the failover group.
   */
  databases?: string[];
  /**
   * List of partner server information for the failover group.
   */
  partnerServers: PartnerInfo[];
  /**
   * Read-only endpoint of the failover group instance.
   */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpoint;
  /**
   * Read-write endpoint of the failover group instance.
   */
  readWriteEndpoint: FailoverGroupReadWriteEndpoint;
  /**
   * Local replication role of the failover group instance.
   */
  replicationRole?: FailoverGroupReplicationRole;
  /**
   * Replication state of the failover group instance.
   */
  replicationState?: string;
  /**
   * Databases secondary type on partner server.
   */
  secondaryType?: FailoverGroupDatabasesSecondaryType;
}

/**
 * Input type for Properties of a failover group.
 */
export interface FailoverGroupPropertiesInput extends InputOf<FailoverGroupProperties> {
  /**
   * List of databases in the failover group.
   */
  databases?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * List of partner server information for the failover group.
   */
  partnerServers: InputArray<PartnerInfoInput, PartnerInfo[]>;
  /**
   * Read-only endpoint of the failover group instance.
   */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpointInput | undefined;
  /**
   * Read-write endpoint of the failover group instance.
   */
  readWriteEndpoint: FailoverGroupReadWriteEndpointInput;
  /**
   * Databases secondary type on partner server.
   */
  secondaryType?: ExpressionOrValue<FailoverGroupDatabasesSecondaryType> | undefined;
}

/**
 * View type for Properties of a failover group.
 */
export interface FailoverGroupPropertiesView extends InputOf<FailoverGroupProperties> {
  /**
   * List of databases in the failover group.
   */
  databases?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * List of partner server information for the failover group.
   */
  partnerServers: InputArray<PartnerInfoView, PartnerInfo[]>;
  /**
   * Read-only endpoint of the failover group instance.
   */
  readOnlyEndpoint?: FailoverGroupReadOnlyEndpointView | undefined;
  /**
   * Read-write endpoint of the failover group instance.
   */
  readWriteEndpoint: FailoverGroupReadWriteEndpointView;
  /**
   * Read-only output: Local replication role of the failover group instance.
   */
  readonly replicationRole?: Expression<FailoverGroupReplicationRole> | undefined;
  /**
   * Read-only output: Replication state of the failover group instance.
   */
  readonly replicationState?: Expression<string> | undefined;
  /**
   * Databases secondary type on partner server.
   */
  secondaryType?: ExpressionOrValue<FailoverGroupDatabasesSecondaryType> | undefined;
}

export const failoverGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  databases: { armPath: ["databases"], value: createArrayShape(createStringShape()) },
  partnerServers: {
    armPath: ["partnerServers"],
    value: createArrayShape(createDeferredShape(() => partnerInfoShape)),
  },
  readOnlyEndpoint: {
    armPath: ["readOnlyEndpoint"],
    value: createDeferredShape(() => failoverGroupReadOnlyEndpointShape),
  },
  readWriteEndpoint: {
    armPath: ["readWriteEndpoint"],
    value: createDeferredShape(() => failoverGroupReadWriteEndpointShape),
  },
  replicationRole: { armPath: ["replicationRole"], value: createUnionShape(), readOnly: true },
  replicationState: { armPath: ["replicationState"], value: createStringShape(), readOnly: true },
  secondaryType: { armPath: ["secondaryType"], value: createUnionShape() },
});

/**
 * Read-only endpoint of the failover group instance.
 */
export interface FailoverGroupReadOnlyEndpoint {
  /**
   * Failover policy of the read-only endpoint for the failover group.
   */
  failoverPolicy?: ReadOnlyEndpointFailoverPolicy;
  /**
   * The target partner server where the read-only endpoint points to.
   */
  targetServer?: string;
}

/**
 * Input type for Read-only endpoint of the failover group instance.
 */
export interface FailoverGroupReadOnlyEndpointInput extends InputOf<FailoverGroupReadOnlyEndpoint> {
  /**
   * Failover policy of the read-only endpoint for the failover group.
   */
  failoverPolicy?: ExpressionOrValue<ReadOnlyEndpointFailoverPolicy> | undefined;
  /**
   * The target partner server where the read-only endpoint points to.
   */
  targetServer?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Read-only endpoint of the failover group instance.
 */
export type FailoverGroupReadOnlyEndpointView = FailoverGroupReadOnlyEndpointInput;

export const failoverGroupReadOnlyEndpointShape: FlatModelShape = createFlatModelShape({
  failoverPolicy: { armPath: ["failoverPolicy"], value: createUnionShape() },
  targetServer: { armPath: ["targetServer"], value: createStringShape() },
});

/**
 * Read-write endpoint of the failover group instance.
 */
export interface FailoverGroupReadWriteEndpoint {
  /**
   * Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverPolicy: ReadWriteEndpointFailoverPolicy;
  /**
   * Grace period before failover with data loss is attempted for the read-write endpoint. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverWithDataLossGracePeriodMinutes?: number;
}

/**
 * Input type for Read-write endpoint of the failover group instance.
 */
export interface FailoverGroupReadWriteEndpointInput extends InputOf<FailoverGroupReadWriteEndpoint> {
  /**
   * Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverPolicy: ExpressionOrValue<ReadWriteEndpointFailoverPolicy>;
  /**
   * Grace period before failover with data loss is attempted for the read-write endpoint. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverWithDataLossGracePeriodMinutes?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Read-write endpoint of the failover group instance.
 */
export type FailoverGroupReadWriteEndpointView = FailoverGroupReadWriteEndpointInput;

export const failoverGroupReadWriteEndpointShape: FlatModelShape = createFlatModelShape({
  failoverPolicy: { armPath: ["failoverPolicy"], value: createUnionShape() },
  failoverWithDataLossGracePeriodMinutes: {
    armPath: ["failoverWithDataLossGracePeriodMinutes"],
    value: createNumberShape(),
  },
});

/**
 * The properties of the geo backup policy.
 */
export interface GeoBackupPolicyProperties {
  /**
   * The state of the geo backup policy.
   */
  state: GeoBackupPolicyState;
  /**
   * The storage type of the geo backup policy.
   */
  storageType?: string;
}

/**
 * Input type for The properties of the geo backup policy.
 */
export interface GeoBackupPolicyPropertiesInput extends InputOf<GeoBackupPolicyProperties> {
  /**
   * The state of the geo backup policy.
   */
  state: ExpressionOrValue<GeoBackupPolicyState>;
}

/**
 * View type for The properties of the geo backup policy.
 */
export interface GeoBackupPolicyPropertiesView extends InputOf<GeoBackupPolicyProperties> {
  /**
   * The state of the geo backup policy.
   */
  state: ExpressionOrValue<GeoBackupPolicyState>;
  /**
   * Read-only output: The storage type of the geo backup policy.
   */
  readonly storageType?: Expression<string> | undefined;
}

export const geoBackupPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  state: { armPath: ["state"], value: createEnumShape() },
  storageType: { armPath: ["storageType"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a instance failover group.
 */
export interface InstanceFailoverGroupProperties {
  /**
   * List of managed instance pairs in the failover group.
   */
  managedInstancePairs: ManagedInstancePairInfo[];
  /**
   * Partner region information for the failover group.
   */
  partnerRegions: PartnerRegionInfo[];
  /**
   * Read-only endpoint of the failover group instance.
   */
  readOnlyEndpoint?: InstanceFailoverGroupReadOnlyEndpoint;
  /**
   * Read-write endpoint of the failover group instance.
   */
  readWriteEndpoint: InstanceFailoverGroupReadWriteEndpoint;
  /**
   * Local replication role of the failover group instance.
   */
  replicationRole?: InstanceFailoverGroupReplicationRole;
  /**
   * Replication state of the failover group instance.
   */
  replicationState?: string;
  /**
   * Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only.
   */
  secondaryType?: SecondaryInstanceType;
}

/**
 * Input type for Properties of a instance failover group.
 */
export interface InstanceFailoverGroupPropertiesInput extends InputOf<InstanceFailoverGroupProperties> {
  /**
   * List of managed instance pairs in the failover group.
   */
  managedInstancePairs: InputArray<ManagedInstancePairInfoInput, ManagedInstancePairInfo[]>;
  /**
   * Partner region information for the failover group.
   */
  partnerRegions: InputArray<PartnerRegionInfoInput, PartnerRegionInfo[]>;
  /**
   * Read-only endpoint of the failover group instance.
   */
  readOnlyEndpoint?: InstanceFailoverGroupReadOnlyEndpointInput | undefined;
  /**
   * Read-write endpoint of the failover group instance.
   */
  readWriteEndpoint: InstanceFailoverGroupReadWriteEndpointInput;
  /**
   * Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only.
   */
  secondaryType?: ExpressionOrValue<SecondaryInstanceType> | undefined;
}

/**
 * View type for Properties of a instance failover group.
 */
export interface InstanceFailoverGroupPropertiesView extends InputOf<InstanceFailoverGroupProperties> {
  /**
   * List of managed instance pairs in the failover group.
   */
  managedInstancePairs: InputArray<ManagedInstancePairInfoView, ManagedInstancePairInfo[]>;
  /**
   * Partner region information for the failover group.
   */
  partnerRegions: InputArray<PartnerRegionInfoView, PartnerRegionInfo[]>;
  /**
   * Read-only endpoint of the failover group instance.
   */
  readOnlyEndpoint?: InstanceFailoverGroupReadOnlyEndpointView | undefined;
  /**
   * Read-write endpoint of the failover group instance.
   */
  readWriteEndpoint: InstanceFailoverGroupReadWriteEndpointView;
  /**
   * Read-only output: Local replication role of the failover group instance.
   */
  readonly replicationRole?: Expression<InstanceFailoverGroupReplicationRole> | undefined;
  /**
   * Read-only output: Replication state of the failover group instance.
   */
  readonly replicationState?: Expression<string> | undefined;
  /**
   * Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only.
   */
  secondaryType?: ExpressionOrValue<SecondaryInstanceType> | undefined;
}

export const instanceFailoverGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  managedInstancePairs: {
    armPath: ["managedInstancePairs"],
    value: createArrayShape(createDeferredShape(() => managedInstancePairInfoShape)),
  },
  partnerRegions: {
    armPath: ["partnerRegions"],
    value: createArrayShape(createDeferredShape(() => partnerRegionInfoShape)),
  },
  readOnlyEndpoint: {
    armPath: ["readOnlyEndpoint"],
    value: createDeferredShape(() => instanceFailoverGroupReadOnlyEndpointShape),
  },
  readWriteEndpoint: {
    armPath: ["readWriteEndpoint"],
    value: createDeferredShape(() => instanceFailoverGroupReadWriteEndpointShape),
  },
  replicationRole: { armPath: ["replicationRole"], value: createUnionShape(), readOnly: true },
  replicationState: { armPath: ["replicationState"], value: createStringShape(), readOnly: true },
  secondaryType: { armPath: ["secondaryType"], value: createUnionShape() },
});

/**
 * Read-only endpoint of the failover group instance.
 */
export interface InstanceFailoverGroupReadOnlyEndpoint {
  /**
   * Failover policy of the read-only endpoint for the failover group.
   */
  failoverPolicy?: ReadOnlyEndpointFailoverPolicy;
}

/**
 * Input type for Read-only endpoint of the failover group instance.
 */
export interface InstanceFailoverGroupReadOnlyEndpointInput extends InputOf<InstanceFailoverGroupReadOnlyEndpoint> {
  /**
   * Failover policy of the read-only endpoint for the failover group.
   */
  failoverPolicy?: ExpressionOrValue<ReadOnlyEndpointFailoverPolicy> | undefined;
}

/**
 * View type for Read-only endpoint of the failover group instance.
 */
export type InstanceFailoverGroupReadOnlyEndpointView = InstanceFailoverGroupReadOnlyEndpointInput;

export const instanceFailoverGroupReadOnlyEndpointShape: FlatModelShape = createFlatModelShape({
  failoverPolicy: { armPath: ["failoverPolicy"], value: createUnionShape() },
});

/**
 * Read-write endpoint of the failover group instance.
 */
export interface InstanceFailoverGroupReadWriteEndpoint {
  /**
   * Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverPolicy: ReadWriteEndpointFailoverPolicy;
  /**
   * Grace period before failover with data loss is attempted for the read-write endpoint. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverWithDataLossGracePeriodMinutes?: number;
}

/**
 * Input type for Read-write endpoint of the failover group instance.
 */
export interface InstanceFailoverGroupReadWriteEndpointInput extends InputOf<InstanceFailoverGroupReadWriteEndpoint> {
  /**
   * Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverPolicy: ExpressionOrValue<ReadWriteEndpointFailoverPolicy>;
  /**
   * Grace period before failover with data loss is attempted for the read-write endpoint. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
   */
  failoverWithDataLossGracePeriodMinutes?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Read-write endpoint of the failover group instance.
 */
export type InstanceFailoverGroupReadWriteEndpointView =
  InstanceFailoverGroupReadWriteEndpointInput;

export const instanceFailoverGroupReadWriteEndpointShape: FlatModelShape = createFlatModelShape({
  failoverPolicy: { armPath: ["failoverPolicy"], value: createUnionShape() },
  failoverWithDataLossGracePeriodMinutes: {
    armPath: ["failoverWithDataLossGracePeriodMinutes"],
    value: createNumberShape(),
  },
});

/**
 * The properties of a instance pool operation.
 */
export interface InstancePoolOperationProperties {
  /**
   * The operation description.
   */
  description?: string;
  /**
   * The operation error code.
   */
  errorCode?: number;
  /**
   * The operation error description.
   */
  errorDescription?: string;
  /**
   * The operation error severity.
   */
  errorSeverity?: number;
  /**
   * Error type (e.g. None, User).
   */
  errorType?: ErrorType;
  /**
   * The estimated completion time of the operation.
   */
  estimatedCompletionTime?: Date;
  /**
   * The name of the instance pool the operation is being performed on.
   */
  instancePoolName?: string;
  /**
   * Whether the operation can be cancelled.
   */
  isCancellable?: boolean;
  /**
   * The name of operation.
   */
  operation?: string;
  /**
   * The friendly name of operation.
   */
  operationFriendlyName?: string;
  /**
   * The percentage of the operation completed.
   */
  percentComplete?: number;
  /**
   * The operation start time.
   */
  startTime?: Date;
  /**
   * The operation state.
   */
  state?: ManagementOperationState;
}

/**
 * Input type for The properties of a instance pool operation.
 */
export interface InstancePoolOperationPropertiesInput extends InputOf<InstancePoolOperationProperties> {}

/**
 * View type for The properties of a instance pool operation.
 */
export interface InstancePoolOperationPropertiesView extends InputOf<InstancePoolOperationProperties> {
  /**
   * Read-only output: The operation description.
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: The operation error code.
   */
  readonly errorCode?: Expression<number> | undefined;
  /**
   * Read-only output: The operation error description.
   */
  readonly errorDescription?: Expression<string> | undefined;
  /**
   * Read-only output: The operation error severity.
   */
  readonly errorSeverity?: Expression<number> | undefined;
  /**
   * Read-only output: Error type (e.g. None, User).
   */
  readonly errorType?: Expression<ErrorType> | undefined;
  /**
   * Read-only output: The estimated completion time of the operation.
   */
  readonly estimatedCompletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The name of the instance pool the operation is being performed on.
   */
  readonly instancePoolName?: Expression<string> | undefined;
  /**
   * Read-only output: Whether the operation can be cancelled.
   */
  readonly isCancellable?: Expression<boolean> | undefined;
  /**
   * Read-only output: The name of operation.
   */
  readonly operation?: Expression<string> | undefined;
  /**
   * Read-only output: The friendly name of operation.
   */
  readonly operationFriendlyName?: Expression<string> | undefined;
  /**
   * Read-only output: The percentage of the operation completed.
   */
  readonly percentComplete?: Expression<number> | undefined;
  /**
   * Read-only output: The operation start time.
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The operation state.
   */
  readonly state?: Expression<ManagementOperationState> | undefined;
}

export const instancePoolOperationPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  errorCode: { armPath: ["errorCode"], value: createNumberShape(), readOnly: true },
  errorDescription: { armPath: ["errorDescription"], value: createStringShape(), readOnly: true },
  errorSeverity: { armPath: ["errorSeverity"], value: createNumberShape(), readOnly: true },
  errorType: { armPath: ["errorType"], value: createUnionShape(), readOnly: true },
  estimatedCompletionTime: {
    armPath: ["estimatedCompletionTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  instancePoolName: { armPath: ["instancePoolName"], value: createStringShape(), readOnly: true },
  isCancellable: { armPath: ["isCancellable"], value: createBooleanShape(), readOnly: true },
  operation: { armPath: ["operation"], value: createStringShape(), readOnly: true },
  operationFriendlyName: {
    armPath: ["operationFriendlyName"],
    value: createStringShape(),
    readOnly: true,
  },
  percentComplete: { armPath: ["percentComplete"], value: createNumberShape(), readOnly: true },
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of an instance pool.
 */
export interface InstancePoolProperties {
  /**
   * The Dns Zone that the managed instance pool is in.
   */
  dnsZone?: string;
  /**
   * The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price).
   */
  licenseType: InstancePoolLicenseType;
  /**
   * Specifies maintenance configuration id to apply to this managed instance.
   */
  maintenanceConfigurationId?: string;
  /**
   * Resource ID of the subnet to place this instance pool in.
   */
  subnetId: string;
  /**
   * Count of vCores belonging to this instance pool.
   */
  vCores: number;
}

/**
 * Input type for Properties of an instance pool.
 */
export interface InstancePoolPropertiesInput extends InputOf<InstancePoolProperties> {
  /**
   * The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price).
   */
  licenseType: ExpressionOrValue<InstancePoolLicenseType>;
  /**
   * Specifies maintenance configuration id to apply to this managed instance.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * Resource ID of the subnet to place this instance pool in.
   */
  subnetId: ExpressionOrValue<string>;
  /**
   * Count of vCores belonging to this instance pool.
   */
  vCores: ExpressionOrValue<number>;
}

/**
 * View type for Properties of an instance pool.
 */
export interface InstancePoolPropertiesView extends InputOf<InstancePoolProperties> {
  /**
   * Read-only output: The Dns Zone that the managed instance pool is in.
   */
  readonly dnsZone?: Expression<string> | undefined;
  /**
   * The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price).
   */
  licenseType: ExpressionOrValue<InstancePoolLicenseType>;
  /**
   * Specifies maintenance configuration id to apply to this managed instance.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * Resource ID of the subnet to place this instance pool in.
   */
  subnetId: ExpressionOrValue<string>;
  /**
   * Count of vCores belonging to this instance pool.
   */
  vCores: ExpressionOrValue<number>;
}

export const instancePoolPropertiesShape: FlatModelShape = createFlatModelShape({
  dnsZone: { armPath: ["dnsZone"], value: createStringShape(), readOnly: true },
  licenseType: { armPath: ["licenseType"], value: createUnionShape() },
  maintenanceConfigurationId: {
    armPath: ["maintenanceConfigurationId"],
    value: createStringShape(),
  },
  subnetId: { armPath: ["subnetId"], value: createStringShape() },
  vCores: { armPath: ["vCores"], value: createNumberShape() },
});

/**
 * The properties of an IPv6 server firewall rule.
 */
export interface IPv6ServerFirewallRuleProperties {
  /**
   * The end IP address of the firewall rule. Must be IPv6 format. Must be greater than or equal to startIpv6Address.
   */
  endIPv6Address?: string;
  /**
   * The start IP address of the firewall rule. Must be IPv6 format.
   */
  startIPv6Address?: string;
}

/**
 * Input type for The properties of an IPv6 server firewall rule.
 */
export interface IPv6ServerFirewallRulePropertiesInput extends InputOf<IPv6ServerFirewallRuleProperties> {
  /**
   * The end IP address of the firewall rule. Must be IPv6 format. Must be greater than or equal to startIpv6Address.
   */
  endIPv6Address?: ExpressionOrValue<string> | undefined;
  /**
   * The start IP address of the firewall rule. Must be IPv6 format.
   */
  startIPv6Address?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of an IPv6 server firewall rule.
 */
export type IPv6ServerFirewallRulePropertiesView = IPv6ServerFirewallRulePropertiesInput;

export const iPv6ServerFirewallRulePropertiesShape: FlatModelShape = createFlatModelShape({
  endIPv6Address: { armPath: ["endIPv6Address"], value: createStringShape() },
  startIPv6Address: { armPath: ["startIPv6Address"], value: createStringShape() },
});

/**
 * Azure Active Directory identity configuration for a resource.
 */
export interface JobAgentIdentity {
  /**
   * The job agent identity tenant id
   */
  tenantId?: string;
  /**
   * The job agent identity type
   */
  type: JobAgentIdentityType;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?: Record<string, JobAgentUserAssignedIdentity>;
}

/**
 * Input type for Azure Active Directory identity configuration for a resource.
 */
export interface JobAgentIdentityInput extends InputOf<JobAgentIdentity> {
  /**
   * The job agent identity tenant id
   */
  tenantId?: ExpressionOrValue<string> | undefined;
  /**
   * The job agent identity type
   */
  type: ExpressionOrValue<JobAgentIdentityType>;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?:
    | InputRecord<JobAgentUserAssignedIdentityInput, Record<string, JobAgentUserAssignedIdentity>>
    | undefined;
}

/**
 * View type for Azure Active Directory identity configuration for a resource.
 */
export interface JobAgentIdentityView extends InputOf<JobAgentIdentity> {
  /**
   * The job agent identity tenant id
   */
  tenantId?: ExpressionOrValue<string> | undefined;
  /**
   * The job agent identity type
   */
  type: ExpressionOrValue<JobAgentIdentityType>;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?:
    | InputRecord<JobAgentUserAssignedIdentityView, Record<string, JobAgentUserAssignedIdentity>>
    | undefined;
}

export const jobAgentIdentityShape: FlatModelShape = createFlatModelShape({
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => jobAgentUserAssignedIdentityShape)),
  },
});

/**
 * Properties of a job agent.
 */
export interface JobAgentProperties {
  /**
   * Resource ID of the database to store job metadata in.
   */
  databaseId: string;
  /**
   * The state of the job agent.
   */
  state?: JobAgentState;
}

/**
 * Input type for Properties of a job agent.
 */
export interface JobAgentPropertiesInput extends InputOf<JobAgentProperties> {
  /**
   * Resource ID of the database to store job metadata in.
   */
  databaseId: ExpressionOrValue<string>;
}

/**
 * View type for Properties of a job agent.
 */
export interface JobAgentPropertiesView extends InputOf<JobAgentProperties> {
  /**
   * Resource ID of the database to store job metadata in.
   */
  databaseId: ExpressionOrValue<string>;
  /**
   * Read-only output: The state of the job agent.
   */
  readonly state?: Expression<JobAgentState> | undefined;
}

export const jobAgentPropertiesShape: FlatModelShape = createFlatModelShape({
  databaseId: { armPath: ["databaseId"], value: createStringShape() },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
});

/**
 * Azure Active Directory identity configuration for a resource.
 */
export interface JobAgentUserAssignedIdentity {
  /**
   * The Azure Active Directory client id.
   */
  clientId?: string;
  /**
   * The Azure Active Directory principal id.
   */
  principalId?: string;
}

/**
 * Input type for Azure Active Directory identity configuration for a resource.
 */
export interface JobAgentUserAssignedIdentityInput extends InputOf<JobAgentUserAssignedIdentity> {}

/**
 * View type for Azure Active Directory identity configuration for a resource.
 */
export interface JobAgentUserAssignedIdentityView extends InputOf<JobAgentUserAssignedIdentity> {
  /**
   * Read-only output: The Azure Active Directory client id.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The Azure Active Directory principal id.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const jobAgentUserAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a job credential.
 */
export interface JobCredentialProperties {
  /**
   * The credential password.
   */
  password: string;
  /**
   * The credential user name.
   */
  username: string;
}

/**
 * Input type for Properties of a job credential.
 */
export interface JobCredentialPropertiesInput extends InputOf<JobCredentialProperties> {
  /**
   * The credential password.
   */
  password: ExpressionOrValue<string>;
  /**
   * The credential user name.
   */
  username: ExpressionOrValue<string>;
}

/**
 * View type for Properties of a job credential.
 */
export type JobCredentialPropertiesView = JobCredentialPropertiesInput;

export const jobCredentialPropertiesShape: FlatModelShape = createFlatModelShape({
  password: { armPath: ["password"], value: createStringShape() },
  username: { armPath: ["username"], value: createStringShape() },
});

/**
 * Properties for an Azure SQL Database Elastic job execution.
 */
export interface JobExecutionProperties {
  /**
   * The time that the job execution was created.
   */
  createTime?: Date;
  /**
   * Number of times the job execution has been attempted.
   */
  currentAttempts?: number;
  /**
   * Start time of the current attempt.
   */
  currentAttemptStartTime?: Date;
  /**
   * The time that the job execution completed.
   */
  endTime?: Date;
  /**
   * The unique identifier of the job execution.
   */
  jobExecutionId?: string;
  /**
   * The job version number.
   */
  jobVersion?: number;
  /**
   * The last status or error message.
   */
  lastMessage?: string;
  /**
   * The detailed state of the job execution.
   */
  lifecycle?: JobExecutionLifecycle;
  /**
   * The ARM provisioning state of the job execution.
   */
  provisioningState?: ProvisioningState;
  /**
   * The time that the job execution started.
   */
  startTime?: Date;
  /**
   * The job step id.
   */
  stepId?: number;
  /**
   * The job step name.
   */
  stepName?: string;
  /**
   * The target that this execution is executed on.
   */
  target?: JobExecutionTarget;
}

/**
 * Input type for Properties for an Azure SQL Database Elastic job execution.
 */
export interface JobExecutionPropertiesInput extends InputOf<JobExecutionProperties> {}

/**
 * View type for Properties for an Azure SQL Database Elastic job execution.
 */
export interface JobExecutionPropertiesView extends InputOf<JobExecutionProperties> {
  /**
   * Read-only output: The time that the job execution was created.
   */
  readonly createTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Number of times the job execution has been attempted.
   */
  readonly currentAttempts?: Expression<number> | undefined;
  /**
   * Read-only output: Start time of the current attempt.
   */
  readonly currentAttemptStartTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The time that the job execution completed.
   */
  readonly endTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The unique identifier of the job execution.
   */
  readonly jobExecutionId?: Expression<string> | undefined;
  /**
   * Read-only output: The job version number.
   */
  readonly jobVersion?: Expression<number> | undefined;
  /**
   * Read-only output: The last status or error message.
   */
  readonly lastMessage?: Expression<string> | undefined;
  /**
   * Read-only output: The detailed state of the job execution.
   */
  readonly lifecycle?: Expression<JobExecutionLifecycle> | undefined;
  /**
   * Read-only output: The ARM provisioning state of the job execution.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Read-only output: The time that the job execution started.
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The job step id.
   */
  readonly stepId?: Expression<number> | undefined;
  /**
   * Read-only output: The job step name.
   */
  readonly stepName?: Expression<string> | undefined;
  /**
   * Read-only output: The target that this execution is executed on.
   */
  readonly target?: Expression<JobExecutionTarget> | undefined;
}

export const jobExecutionPropertiesShape: FlatModelShape = createFlatModelShape({
  createTime: {
    armPath: ["createTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  currentAttempts: { armPath: ["currentAttempts"], value: createNumberShape(), readOnly: true },
  currentAttemptStartTime: {
    armPath: ["currentAttemptStartTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  endTime: {
    armPath: ["endTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  jobExecutionId: { armPath: ["jobExecutionId"], value: createStringShape(), readOnly: true },
  jobVersion: { armPath: ["jobVersion"], value: createNumberShape(), readOnly: true },
  lastMessage: { armPath: ["lastMessage"], value: createStringShape(), readOnly: true },
  lifecycle: { armPath: ["lifecycle"], value: createUnionShape(), readOnly: true },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  stepId: { armPath: ["stepId"], value: createNumberShape(), readOnly: true },
  stepName: { armPath: ["stepName"], value: createStringShape(), readOnly: true },
  target: {
    armPath: ["target"],
    value: createDeferredShape(() => jobExecutionTargetShape),
    readOnly: true,
  },
});

/**
 * The target that a job execution is executed on.
 */
export interface JobExecutionTarget {
  /**
   * The database name.
   */
  databaseName?: string;
  /**
   * The server name.
   */
  serverName?: string;
  /**
   * The type of the target.
   */
  type?: JobTargetType;
}

/**
 * Input type for The target that a job execution is executed on.
 */
export interface JobExecutionTargetInput extends InputOf<JobExecutionTarget> {}

/**
 * View type for The target that a job execution is executed on.
 */
export interface JobExecutionTargetView extends InputOf<JobExecutionTarget> {
  /**
   * Read-only output: The database name.
   */
  readonly databaseName?: Expression<string> | undefined;
  /**
   * Read-only output: The server name.
   */
  readonly serverName?: Expression<string> | undefined;
  /**
   * Read-only output: The type of the target.
   */
  readonly type?: Expression<JobTargetType> | undefined;
}

export const jobExecutionTargetShape: FlatModelShape = createFlatModelShape({
  databaseName: { armPath: ["databaseName"], value: createStringShape(), readOnly: true },
  serverName: { armPath: ["serverName"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of job agent private endpoint.
 */
export interface JobPrivateEndpointProperties {
  /**
   * Private endpoint id of the private endpoint.
   */
  privateEndpointId?: string;
  /**
   * ARM resource id of the server the private endpoint will target.
   */
  targetServerAzureResourceId: string;
}

/**
 * Input type for Properties of job agent private endpoint.
 */
export interface JobPrivateEndpointPropertiesInput extends InputOf<JobPrivateEndpointProperties> {
  /**
   * ARM resource id of the server the private endpoint will target.
   */
  targetServerAzureResourceId: ExpressionOrValue<string>;
}

/**
 * View type for Properties of job agent private endpoint.
 */
export interface JobPrivateEndpointPropertiesView extends InputOf<JobPrivateEndpointProperties> {
  /**
   * Read-only output: Private endpoint id of the private endpoint.
   */
  readonly privateEndpointId?: Expression<string> | undefined;
  /**
   * ARM resource id of the server the private endpoint will target.
   */
  targetServerAzureResourceId: ExpressionOrValue<string>;
}

export const jobPrivateEndpointPropertiesShape: FlatModelShape = createFlatModelShape({
  privateEndpointId: { armPath: ["privateEndpointId"], value: createStringShape(), readOnly: true },
  targetServerAzureResourceId: {
    armPath: ["targetServerAzureResourceId"],
    value: createStringShape(),
  },
});

/**
 * Properties of a job.
 */
export interface JobProperties {
  /**
   * User-defined description of the job.
   */
  description?: string;
  /**
   * Schedule properties of the job.
   */
  schedule?: JobSchedule;
  /**
   * The job version number.
   */
  version?: number;
}

/**
 * Input type for Properties of a job.
 */
export interface JobPropertiesInput extends InputOf<JobProperties> {
  /**
   * User-defined description of the job.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Schedule properties of the job.
   */
  schedule?: JobScheduleInput | undefined;
}

/**
 * View type for Properties of a job.
 */
export interface JobPropertiesView extends InputOf<JobProperties> {
  /**
   * User-defined description of the job.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Schedule properties of the job.
   */
  schedule?: JobScheduleView | undefined;
  /**
   * Read-only output: The job version number.
   */
  readonly version?: Expression<number> | undefined;
}

export const jobPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
  schedule: { armPath: ["schedule"], value: createDeferredShape(() => jobScheduleShape) },
  version: { armPath: ["version"], value: createNumberShape(), readOnly: true },
});

/**
 * Scheduling properties of a job.
 */
export interface JobSchedule {
  /**
   * Whether or not the schedule is enabled.
   */
  enabled?: boolean;
  /**
   * Schedule end time.
   */
  endTime?: Date;
  /**
   * Value of the schedule's recurring interval, if the ScheduleType is recurring. ISO8601 duration format.
   */
  interval?: string;
  /**
   * Schedule start time.
   */
  startTime?: Date;
  /**
   * Schedule interval type
   */
  type?: JobScheduleType;
}

/**
 * Input type for Scheduling properties of a job.
 */
export interface JobScheduleInput extends InputOf<JobSchedule> {
  /**
   * Whether or not the schedule is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Schedule end time.
   */
  endTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Value of the schedule's recurring interval, if the ScheduleType is recurring. ISO8601 duration format.
   */
  interval?: ExpressionOrValue<string> | undefined;
  /**
   * Schedule start time.
   */
  startTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Schedule interval type
   */
  type?: ExpressionOrValue<JobScheduleType> | undefined;
}

/**
 * View type for Scheduling properties of a job.
 */
export type JobScheduleView = JobScheduleInput;

export const jobScheduleShape: FlatModelShape = createFlatModelShape({
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  endTime: {
    armPath: ["endTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  interval: { armPath: ["interval"], value: createStringShape() },
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
  type: { armPath: ["type"], value: createEnumShape() },
});

/**
 * The action to be executed by a job step.
 */
export interface JobStepAction {
  /**
   * The source of the action to execute.
   */
  source?: JobStepActionSource;
  /**
   * Type of action being executed by the job step.
   */
  type?: JobStepActionType;
  /**
   * The action value, for example the text of the T-SQL script to execute.
   */
  value: string;
}

/**
 * Input type for The action to be executed by a job step.
 */
export interface JobStepActionInput extends InputOf<JobStepAction> {
  /**
   * The source of the action to execute.
   */
  source?: ExpressionOrValue<JobStepActionSource> | undefined;
  /**
   * Type of action being executed by the job step.
   */
  type?: ExpressionOrValue<JobStepActionType> | undefined;
  /**
   * The action value, for example the text of the T-SQL script to execute.
   */
  value: ExpressionOrValue<string>;
}

/**
 * View type for The action to be executed by a job step.
 */
export type JobStepActionView = JobStepActionInput;

export const jobStepActionShape: FlatModelShape = createFlatModelShape({
  source: { armPath: ["source"], value: createUnionShape() },
  type: { armPath: ["type"], value: createUnionShape() },
  value: { armPath: ["value"], value: createStringShape() },
});

/**
 * The execution options of a job step.
 */
export interface JobStepExecutionOptions {
  /**
   * Initial delay between retries for job step execution.
   */
  initialRetryIntervalSeconds?: number;
  /**
   * The maximum amount of time to wait between retries for job step execution.
   */
  maximumRetryIntervalSeconds?: number;
  /**
   * Maximum number of times the job step will be reattempted if the first attempt fails.
   */
  retryAttempts?: number;
  /**
   * The backoff multiplier for the time between retries.
   */
  retryIntervalBackoffMultiplier?: number;
  /**
   * Execution timeout for the job step.
   */
  timeoutSeconds?: number;
}

/**
 * Input type for The execution options of a job step.
 */
export interface JobStepExecutionOptionsInput extends InputOf<JobStepExecutionOptions> {
  /**
   * Initial delay between retries for job step execution.
   */
  initialRetryIntervalSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * The maximum amount of time to wait between retries for job step execution.
   */
  maximumRetryIntervalSeconds?: ExpressionOrValue<number> | undefined;
  /**
   * Maximum number of times the job step will be reattempted if the first attempt fails.
   */
  retryAttempts?: ExpressionOrValue<number> | undefined;
  /**
   * The backoff multiplier for the time between retries.
   */
  retryIntervalBackoffMultiplier?: ExpressionOrValue<number> | undefined;
  /**
   * Execution timeout for the job step.
   */
  timeoutSeconds?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The execution options of a job step.
 */
export type JobStepExecutionOptionsView = JobStepExecutionOptionsInput;

export const jobStepExecutionOptionsShape: FlatModelShape = createFlatModelShape({
  initialRetryIntervalSeconds: {
    armPath: ["initialRetryIntervalSeconds"],
    value: createNumberShape(),
  },
  maximumRetryIntervalSeconds: {
    armPath: ["maximumRetryIntervalSeconds"],
    value: createNumberShape(),
  },
  retryAttempts: { armPath: ["retryAttempts"], value: createNumberShape() },
  retryIntervalBackoffMultiplier: {
    armPath: ["retryIntervalBackoffMultiplier"],
    value: createNumberShape(),
  },
  timeoutSeconds: { armPath: ["timeoutSeconds"], value: createNumberShape() },
});

/**
 * The output configuration of a job step.
 */
export interface JobStepOutput {
  /**
   * The resource ID of the credential to use to connect to the output destination.
   */
  credential?: string;
  /**
   * The output destination database.
   */
  databaseName: string;
  /**
   * The output destination resource group.
   */
  resourceGroupName?: string;
  /**
   * The output destination schema.
   */
  schemaName?: string;
  /**
   * The output destination server name.
   */
  serverName: string;
  /**
   * The output destination subscription id.
   */
  subscriptionId?: string;
  /**
   * The output destination table.
   */
  tableName: string;
  /**
   * The output destination type.
   */
  type?: JobStepOutputType;
}

/**
 * Input type for The output configuration of a job step.
 */
export interface JobStepOutputInput extends InputOf<JobStepOutput> {
  /**
   * The resource ID of the credential to use to connect to the output destination.
   */
  credential?: ExpressionOrValue<string> | undefined;
  /**
   * The output destination database.
   */
  databaseName: ExpressionOrValue<string>;
  /**
   * The output destination resource group.
   */
  resourceGroupName?: ExpressionOrValue<string> | undefined;
  /**
   * The output destination schema.
   */
  schemaName?: ExpressionOrValue<string> | undefined;
  /**
   * The output destination server name.
   */
  serverName: ExpressionOrValue<string>;
  /**
   * The output destination subscription id.
   */
  subscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * The output destination table.
   */
  tableName: ExpressionOrValue<string>;
  /**
   * The output destination type.
   */
  type?: ExpressionOrValue<JobStepOutputType> | undefined;
}

/**
 * View type for The output configuration of a job step.
 */
export type JobStepOutputView = JobStepOutputInput;

export const jobStepOutputShape: FlatModelShape = createFlatModelShape({
  credential: { armPath: ["credential"], value: createStringShape() },
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  resourceGroupName: { armPath: ["resourceGroupName"], value: createStringShape() },
  schemaName: { armPath: ["schemaName"], value: createStringShape() },
  serverName: { armPath: ["serverName"], value: createStringShape() },
  subscriptionId: { armPath: ["subscriptionId"], value: createStringShape() },
  tableName: { armPath: ["tableName"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * Properties of a job step.
 */
export interface JobStepProperties {
  /**
   * The action payload of the job step.
   */
  action: JobStepAction;
  /**
   * The resource ID of the job credential that will be used to connect to the targets.
   */
  credential?: string;
  /**
   * Execution options for the job step.
   */
  executionOptions?: JobStepExecutionOptions;
  /**
   * Output destination properties of the job step.
   */
  output?: JobStepOutput;
  /**
   * The job step's index within the job. If not specified when creating the job step, it will be created as the last step. If not specified when updating the job step, the step id is not modified.
   */
  stepId?: number;
  /**
   * The resource ID of the target group that the job step will be executed on.
   */
  targetGroup: string;
}

/**
 * Input type for Properties of a job step.
 */
export interface JobStepPropertiesInput extends InputOf<JobStepProperties> {
  /**
   * The action payload of the job step.
   */
  action: JobStepActionInput;
  /**
   * The resource ID of the job credential that will be used to connect to the targets.
   */
  credential?: ExpressionOrValue<string> | undefined;
  /**
   * Execution options for the job step.
   */
  executionOptions?: JobStepExecutionOptionsInput | undefined;
  /**
   * Output destination properties of the job step.
   */
  output?: JobStepOutputInput | undefined;
  /**
   * The job step's index within the job. If not specified when creating the job step, it will be created as the last step. If not specified when updating the job step, the step id is not modified.
   */
  stepId?: ExpressionOrValue<number> | undefined;
  /**
   * The resource ID of the target group that the job step will be executed on.
   */
  targetGroup: ExpressionOrValue<string>;
}

/**
 * View type for Properties of a job step.
 */
export type JobStepPropertiesView = JobStepPropertiesInput;

export const jobStepPropertiesShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createDeferredShape(() => jobStepActionShape) },
  credential: { armPath: ["credential"], value: createStringShape() },
  executionOptions: {
    armPath: ["executionOptions"],
    value: createDeferredShape(() => jobStepExecutionOptionsShape),
  },
  output: { armPath: ["output"], value: createDeferredShape(() => jobStepOutputShape) },
  stepId: { armPath: ["stepId"], value: createNumberShape() },
  targetGroup: { armPath: ["targetGroup"], value: createStringShape() },
});

/**
 * A job target, for example a specific database or a container of databases that is evaluated during job execution.
 */
export interface JobTarget {
  /**
   * The target database name.
   */
  databaseName?: string;
  /**
   * The target elastic pool name.
   */
  elasticPoolName?: string;
  /**
   * Whether the target is included or excluded from the group.
   */
  membershipType?: JobTargetGroupMembershipType;
  /**
   * The resource ID of the credential that is used during job execution to connect to the target and determine the list of databases inside the target.
   */
  refreshCredential?: string;
  /**
   * The target server name.
   */
  serverName?: string;
  /**
   * The target shard map.
   */
  shardMapName?: string;
  /**
   * The target type.
   */
  type: JobTargetType;
}

/**
 * Input type for A job target, for example a specific database or a container of databases that is evaluated during job execution.
 */
export interface JobTargetInput extends InputOf<JobTarget> {
  /**
   * The target database name.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * The target elastic pool name.
   */
  elasticPoolName?: ExpressionOrValue<string> | undefined;
  /**
   * Whether the target is included or excluded from the group.
   */
  membershipType?: ExpressionOrValue<JobTargetGroupMembershipType> | undefined;
  /**
   * The resource ID of the credential that is used during job execution to connect to the target and determine the list of databases inside the target.
   */
  refreshCredential?: ExpressionOrValue<string> | undefined;
  /**
   * The target server name.
   */
  serverName?: ExpressionOrValue<string> | undefined;
  /**
   * The target shard map.
   */
  shardMapName?: ExpressionOrValue<string> | undefined;
  /**
   * The target type.
   */
  type: ExpressionOrValue<JobTargetType>;
}

/**
 * View type for A job target, for example a specific database or a container of databases that is evaluated during job execution.
 */
export type JobTargetView = JobTargetInput;

export const jobTargetShape: FlatModelShape = createFlatModelShape({
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  elasticPoolName: { armPath: ["elasticPoolName"], value: createStringShape() },
  membershipType: { armPath: ["membershipType"], value: createEnumShape() },
  refreshCredential: { armPath: ["refreshCredential"], value: createStringShape() },
  serverName: { armPath: ["serverName"], value: createStringShape() },
  shardMapName: { armPath: ["shardMapName"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * Properties of job target group.
 */
export interface JobTargetGroupProperties {
  /**
   * Members of the target group.
   */
  members: JobTarget[];
}

/**
 * Input type for Properties of job target group.
 */
export interface JobTargetGroupPropertiesInput extends InputOf<JobTargetGroupProperties> {
  /**
   * Members of the target group.
   */
  members: InputArray<JobTargetInput, JobTarget[]>;
}

/**
 * View type for Properties of job target group.
 */
export type JobTargetGroupPropertiesView = JobTargetGroupPropertiesInput;

export const jobTargetGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  members: {
    armPath: ["members"],
    value: createArrayShape(createDeferredShape(() => jobTargetShape)),
  },
});

/**
 * The properties of a database ledger digest upload settings.
 */
export interface LedgerDigestUploadsProperties {
  /**
   * The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger.
   */
  digestStorageEndpoint?: string;
  /**
   * Specifies the state of ledger digest upload.
   */
  state?: LedgerDigestUploadsState;
}

/**
 * Input type for The properties of a database ledger digest upload settings.
 */
export interface LedgerDigestUploadsPropertiesInput extends InputOf<LedgerDigestUploadsProperties> {
  /**
   * The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger.
   */
  digestStorageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a database ledger digest upload settings.
 */
export interface LedgerDigestUploadsPropertiesView extends InputOf<LedgerDigestUploadsProperties> {
  /**
   * The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger.
   */
  digestStorageEndpoint?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Specifies the state of ledger digest upload.
   */
  readonly state?: Expression<LedgerDigestUploadsState> | undefined;
}

export const ledgerDigestUploadsPropertiesShape: FlatModelShape = createFlatModelShape({
  digestStorageEndpoint: { armPath: ["digestStorageEndpoint"], value: createStringShape() },
  state: { armPath: ["state"], value: createEnumShape(), readOnly: true },
});

/**
 * Properties of a long term retention backup
 */
export interface LongTermRetentionBackupProperties {
  /**
   * The time the long term retention backup will expire.
   */
  backupExpirationTime?: Date;
  /**
   * The BackupStorageAccessTier for the LTR backup
   */
  backupStorageAccessTier?: BackupStorageAccessTier;
  /**
   * The storage redundancy type of the backup
   */
  backupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * The time the backup was taken
   */
  backupTime?: Date;
  /**
   * The delete time of the database
   */
  databaseDeletionTime?: Date;
  /**
   * The name of the database the backup belong to
   */
  databaseName?: string;
  /**
   * The setting whether the LTR backup is immutable
   */
  isBackupImmutable?: boolean;
  /**
   * The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed.
   */
  legalHoldImmutability?: SetLegalHoldImmutability;
  /**
   * The storage redundancy type of the backup
   */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * The create time of the server.
   */
  serverCreateTime?: Date;
  /**
   * The server name that the backup database belong to.
   */
  serverName?: string;
  /**
   * The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime.
   */
  timeBasedImmutability?: TimeBasedImmutability;
  /**
   * The time-based immutability mode. Only applicable if time-based immutability is enabled.
   */
  timeBasedImmutabilityMode?: TimeBasedImmutabilityMode;
}

/**
 * Input type for Properties of a long term retention backup
 */
export interface LongTermRetentionBackupPropertiesInput extends InputOf<LongTermRetentionBackupProperties> {
  /**
   * The storage redundancy type of the backup
   */
  requestedBackupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
}

/**
 * View type for Properties of a long term retention backup
 */
export interface LongTermRetentionBackupPropertiesView extends InputOf<LongTermRetentionBackupProperties> {
  /**
   * Read-only output: The time the long term retention backup will expire.
   */
  readonly backupExpirationTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The BackupStorageAccessTier for the LTR backup
   */
  readonly backupStorageAccessTier?: Expression<BackupStorageAccessTier> | undefined;
  /**
   * Read-only output: The storage redundancy type of the backup
   */
  readonly backupStorageRedundancy?: Expression<BackupStorageRedundancy> | undefined;
  /**
   * Read-only output: The time the backup was taken
   */
  readonly backupTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The delete time of the database
   */
  readonly databaseDeletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The name of the database the backup belong to
   */
  readonly databaseName?: Expression<string> | undefined;
  /**
   * Read-only output: The setting whether the LTR backup is immutable
   */
  readonly isBackupImmutable?: Expression<boolean> | undefined;
  /**
   * Read-only output: The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed.
   */
  readonly legalHoldImmutability?: Expression<SetLegalHoldImmutability> | undefined;
  /**
   * The storage redundancy type of the backup
   */
  requestedBackupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
  /**
   * Read-only output: The create time of the server.
   */
  readonly serverCreateTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The server name that the backup database belong to.
   */
  readonly serverName?: Expression<string> | undefined;
  /**
   * Read-only output: The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime.
   */
  readonly timeBasedImmutability?: Expression<TimeBasedImmutability> | undefined;
  /**
   * Read-only output: The time-based immutability mode. Only applicable if time-based immutability is enabled.
   */
  readonly timeBasedImmutabilityMode?: Expression<TimeBasedImmutabilityMode> | undefined;
}

export const longTermRetentionBackupPropertiesShape: FlatModelShape = createFlatModelShape({
  backupExpirationTime: {
    armPath: ["backupExpirationTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  backupStorageAccessTier: {
    armPath: ["backupStorageAccessTier"],
    value: createUnionShape(),
    readOnly: true,
  },
  backupStorageRedundancy: {
    armPath: ["backupStorageRedundancy"],
    value: createUnionShape(),
    readOnly: true,
  },
  backupTime: {
    armPath: ["backupTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  databaseDeletionTime: {
    armPath: ["databaseDeletionTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  databaseName: { armPath: ["databaseName"], value: createStringShape(), readOnly: true },
  isBackupImmutable: {
    armPath: ["isBackupImmutable"],
    value: createBooleanShape(),
    readOnly: true,
  },
  legalHoldImmutability: {
    armPath: ["legalHoldImmutability"],
    value: createUnionShape(),
    readOnly: true,
  },
  requestedBackupStorageRedundancy: {
    armPath: ["requestedBackupStorageRedundancy"],
    value: createUnionShape(),
  },
  serverCreateTime: {
    armPath: ["serverCreateTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  serverName: { armPath: ["serverName"], value: createStringShape(), readOnly: true },
  timeBasedImmutability: {
    armPath: ["timeBasedImmutability"],
    value: createUnionShape(),
    readOnly: true,
  },
  timeBasedImmutabilityMode: {
    armPath: ["timeBasedImmutabilityMode"],
    value: createUnionShape(),
    readOnly: true,
  },
});

/**
 * Properties of a long term retention policy
 */
export interface LongTermRetentionPolicyProperties {
  /**
   * The monthly retention policy for an LTR backup in an ISO 8601 format.
   */
  monthlyRetention?: string;
  /**
   * The setting for whether to enable time-based immutability for future backups. When set, future backups will have TimeBasedImmutability enabled.
   */
  timeBasedImmutability?: TimeBasedImmutability;
  /**
   * The setting for time-based immutability mode for future backup (Value can be either Locked or UnLocked. Only effective if TimeBasedImmutability is enabled). Caution: Immutability of LTR backup cannot be removed if TimeBasedImmutabilityMode is Locked.
   */
  timeBasedImmutabilityMode?: TimeBasedImmutabilityMode;
  /**
   * The weekly retention policy for an LTR backup in an ISO 8601 format.
   */
  weeklyRetention?: string;
  /**
   * The week of year to take the yearly backup in an ISO 8601 format.
   */
  weekOfYear?: number;
  /**
   * The yearly retention policy for an LTR backup in an ISO 8601 format.
   */
  yearlyRetention?: string;
}

/**
 * Input type for Properties of a long term retention policy
 */
export interface LongTermRetentionPolicyPropertiesInput extends InputOf<LongTermRetentionPolicyProperties> {
  /**
   * The monthly retention policy for an LTR backup in an ISO 8601 format.
   */
  monthlyRetention?: ExpressionOrValue<string> | undefined;
  /**
   * The setting for whether to enable time-based immutability for future backups. When set, future backups will have TimeBasedImmutability enabled.
   */
  timeBasedImmutability?: ExpressionOrValue<TimeBasedImmutability> | undefined;
  /**
   * The setting for time-based immutability mode for future backup (Value can be either Locked or UnLocked. Only effective if TimeBasedImmutability is enabled). Caution: Immutability of LTR backup cannot be removed if TimeBasedImmutabilityMode is Locked.
   */
  timeBasedImmutabilityMode?: ExpressionOrValue<TimeBasedImmutabilityMode> | undefined;
  /**
   * The weekly retention policy for an LTR backup in an ISO 8601 format.
   */
  weeklyRetention?: ExpressionOrValue<string> | undefined;
  /**
   * The week of year to take the yearly backup in an ISO 8601 format.
   */
  weekOfYear?: ExpressionOrValue<number> | undefined;
  /**
   * The yearly retention policy for an LTR backup in an ISO 8601 format.
   */
  yearlyRetention?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a long term retention policy
 */
export type LongTermRetentionPolicyPropertiesView = LongTermRetentionPolicyPropertiesInput;

export const longTermRetentionPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  monthlyRetention: { armPath: ["monthlyRetention"], value: createStringShape() },
  timeBasedImmutability: { armPath: ["timeBasedImmutability"], value: createUnionShape() },
  timeBasedImmutabilityMode: { armPath: ["timeBasedImmutabilityMode"], value: createUnionShape() },
  weeklyRetention: { armPath: ["weeklyRetention"], value: createStringShape() },
  weekOfYear: { armPath: ["weekOfYear"], value: createNumberShape() },
  yearlyRetention: { armPath: ["yearlyRetention"], value: createStringShape() },
});

/**
 * Properties of a short term retention policy
 */
export interface ManagedBackupShortTermRetentionPolicyProperties {
  /**
   * The backup retention period in days. This is how many days Point-in-Time Restore will be supported.
   */
  retentionDays?: number;
}

/**
 * Input type for Properties of a short term retention policy
 */
export interface ManagedBackupShortTermRetentionPolicyPropertiesInput extends InputOf<ManagedBackupShortTermRetentionPolicyProperties> {
  /**
   * The backup retention period in days. This is how many days Point-in-Time Restore will be supported.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Properties of a short term retention policy
 */
export type ManagedBackupShortTermRetentionPolicyPropertiesView =
  ManagedBackupShortTermRetentionPolicyPropertiesInput;

export const managedBackupShortTermRetentionPolicyPropertiesShape: FlatModelShape =
  createFlatModelShape({
    retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
  });

/**
 * Managed Database Extended Accessibility Information
 */
export interface ManagedDatabaseExtendedAccessibilityInfo {
  /**
   * Root cause explanation and mitigation action.
   */
  inaccessibilityReasonDescription?: string;
  /**
   * SQL Server error code connected to the inaccessibility root cause.
   */
  inaccessibilityReasonErrorCode?: string;
  /**
   * Root cause kind. Allowed values are “TransparentDataEncryption”, “DatabaseReplication”, and “Unknown”.
   */
  inaccessibilityReasonKind?: InaccessibilityReason;
  /**
   * For the root cause kind “TransparentDataEncryption”, the CMK URI.
   */
  inaccessibilityReasonTdeKeyUri?: string;
}

/**
 * Input type for Managed Database Extended Accessibility Information
 */
export interface ManagedDatabaseExtendedAccessibilityInfoInput extends InputOf<ManagedDatabaseExtendedAccessibilityInfo> {}

/**
 * View type for Managed Database Extended Accessibility Information
 */
export interface ManagedDatabaseExtendedAccessibilityInfoView extends InputOf<ManagedDatabaseExtendedAccessibilityInfo> {
  /**
   * Read-only output: Root cause explanation and mitigation action.
   */
  readonly inaccessibilityReasonDescription?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Server error code connected to the inaccessibility root cause.
   */
  readonly inaccessibilityReasonErrorCode?: Expression<string> | undefined;
  /**
   * Read-only output: Root cause kind. Allowed values are “TransparentDataEncryption”, “DatabaseReplication”, and “Unknown”.
   */
  readonly inaccessibilityReasonKind?: Expression<InaccessibilityReason> | undefined;
  /**
   * Read-only output: For the root cause kind “TransparentDataEncryption”, the CMK URI.
   */
  readonly inaccessibilityReasonTdeKeyUri?: Expression<string> | undefined;
}

export const managedDatabaseExtendedAccessibilityInfoShape: FlatModelShape = createFlatModelShape({
  inaccessibilityReasonDescription: {
    armPath: ["inaccessibilityReasonDescription"],
    value: createStringShape(),
    readOnly: true,
  },
  inaccessibilityReasonErrorCode: {
    armPath: ["inaccessibilityReasonErrorCode"],
    value: createStringShape(),
    readOnly: true,
  },
  inaccessibilityReasonKind: {
    armPath: ["inaccessibilityReasonKind"],
    value: createUnionShape(),
    readOnly: true,
  },
  inaccessibilityReasonTdeKeyUri: {
    armPath: ["inaccessibilityReasonTdeKeyUri"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * Contains the operation result properties for managed database move operation.
 */
export interface ManagedDatabaseMoveOperationResultProperties {
  /**
   * The operation error code.
   */
  errorCode?: number;
  /**
   * The operation error description.
   */
  errorDescription?: string;
  /**
   * The operation error severity.
   */
  errorSeverity?: number;
  /**
   * Is move operation cancellable.
   */
  isCancellable?: boolean;
  /**
   * Whether or not the error is a user error.
   */
  isUserError?: boolean;
  /**
   * The name of operation.
   */
  operation?: string;
  /**
   * The friendly name of operation.
   */
  operationFriendlyName?: string;
  /**
   * Operation mode.
   */
  operationMode?: MoveOperationMode;
  /**
   * Source database name.
   */
  sourceDatabaseName?: string;
  /**
   * Source Managed Instance resource id.
   */
  sourceManagedInstanceId?: string;
  /**
   * Source Managed Instance name.
   */
  sourceManagedInstanceName?: string;
  /**
   * The operation start time.
   */
  startTime?: Date;
  /**
   * The operation state.
   */
  state?: ManagementOperationState;
  /**
   * Target database name.
   */
  targetDatabaseName?: string;
  /**
   * Target Managed instance resource id.
   */
  targetManagedInstanceId?: string;
  /**
   * Target Managed Instance name.
   */
  targetManagedInstanceName?: string;
}

/**
 * Input type for Contains the operation result properties for managed database move operation.
 */
export interface ManagedDatabaseMoveOperationResultPropertiesInput extends InputOf<ManagedDatabaseMoveOperationResultProperties> {}

/**
 * View type for Contains the operation result properties for managed database move operation.
 */
export interface ManagedDatabaseMoveOperationResultPropertiesView extends InputOf<ManagedDatabaseMoveOperationResultProperties> {
  /**
   * Read-only output: The operation error code.
   */
  readonly errorCode?: Expression<number> | undefined;
  /**
   * Read-only output: The operation error description.
   */
  readonly errorDescription?: Expression<string> | undefined;
  /**
   * Read-only output: The operation error severity.
   */
  readonly errorSeverity?: Expression<number> | undefined;
  /**
   * Read-only output: Is move operation cancellable.
   */
  readonly isCancellable?: Expression<boolean> | undefined;
  /**
   * Read-only output: Whether or not the error is a user error.
   */
  readonly isUserError?: Expression<boolean> | undefined;
  /**
   * Read-only output: The name of operation.
   */
  readonly operation?: Expression<string> | undefined;
  /**
   * Read-only output: The friendly name of operation.
   */
  readonly operationFriendlyName?: Expression<string> | undefined;
  /**
   * Read-only output: Operation mode.
   */
  readonly operationMode?: Expression<MoveOperationMode> | undefined;
  /**
   * Read-only output: Source database name.
   */
  readonly sourceDatabaseName?: Expression<string> | undefined;
  /**
   * Read-only output: Source Managed Instance resource id.
   */
  readonly sourceManagedInstanceId?: Expression<string> | undefined;
  /**
   * Read-only output: Source Managed Instance name.
   */
  readonly sourceManagedInstanceName?: Expression<string> | undefined;
  /**
   * Read-only output: The operation start time.
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The operation state.
   */
  readonly state?: Expression<ManagementOperationState> | undefined;
  /**
   * Read-only output: Target database name.
   */
  readonly targetDatabaseName?: Expression<string> | undefined;
  /**
   * Read-only output: Target Managed instance resource id.
   */
  readonly targetManagedInstanceId?: Expression<string> | undefined;
  /**
   * Read-only output: Target Managed Instance name.
   */
  readonly targetManagedInstanceName?: Expression<string> | undefined;
}

export const managedDatabaseMoveOperationResultPropertiesShape: FlatModelShape =
  createFlatModelShape({
    errorCode: { armPath: ["errorCode"], value: createNumberShape(), readOnly: true },
    errorDescription: { armPath: ["errorDescription"], value: createStringShape(), readOnly: true },
    errorSeverity: { armPath: ["errorSeverity"], value: createNumberShape(), readOnly: true },
    isCancellable: { armPath: ["isCancellable"], value: createBooleanShape(), readOnly: true },
    isUserError: { armPath: ["isUserError"], value: createBooleanShape(), readOnly: true },
    operation: { armPath: ["operation"], value: createStringShape(), readOnly: true },
    operationFriendlyName: {
      armPath: ["operationFriendlyName"],
      value: createStringShape(),
      readOnly: true,
    },
    operationMode: { armPath: ["operationMode"], value: createUnionShape(), readOnly: true },
    sourceDatabaseName: {
      armPath: ["sourceDatabaseName"],
      value: createStringShape(),
      readOnly: true,
    },
    sourceManagedInstanceId: {
      armPath: ["sourceManagedInstanceId"],
      value: createStringShape(),
      readOnly: true,
    },
    sourceManagedInstanceName: {
      armPath: ["sourceManagedInstanceName"],
      value: createStringShape(),
      readOnly: true,
    },
    startTime: {
      armPath: ["startTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
    targetDatabaseName: {
      armPath: ["targetDatabaseName"],
      value: createStringShape(),
      readOnly: true,
    },
    targetManagedInstanceId: {
      armPath: ["targetManagedInstanceId"],
      value: createStringShape(),
      readOnly: true,
    },
    targetManagedInstanceName: {
      armPath: ["targetManagedInstanceName"],
      value: createStringShape(),
      readOnly: true,
    },
  });

/**
 * The managed database's properties.
 */
export interface ManagedDatabaseProperties {
  /**
   * Whether to auto complete restore of this managed database.
   */
  autoCompleteRestore?: boolean;
  /**
   * Collation of the metadata catalog.
   */
  catalogCollation?: CatalogCollationType;
  /**
   * Collation of the managed database.
   */
  collation?: string;
  /**
   * Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required).
   */
  createMode?: ManagedDatabaseCreateMode;
  /**
   * Creation date of the database.
   */
  creationDate?: Date;
  /**
   * The restorable cross-subscription dropped database resource id to restore when creating this database.
   */
  crossSubscriptionRestorableDroppedDatabaseId?: string;
  /**
   * The resource identifier of the cross-subscription source database associated with create operation of this database.
   */
  crossSubscriptionSourceDatabaseId?: string;
  /**
   * Target managed instance id used in cross-subscription restore.
   */
  crossSubscriptionTargetManagedInstanceId?: string;
  /**
   * Geo paired region.
   */
  defaultSecondaryLocation?: string;
  /**
   * Earliest restore point in time for point in time restore.
   */
  earliestRestorePoint?: Date;
  /**
   * Additional observability and troubleshooting information for databases in ‘Inaccessible’ state.
   */
  extendedAccessibilityInfo?: ManagedDatabaseExtendedAccessibilityInfo;
  /**
   * Instance Failover Group resource identifier that this managed database belongs to.
   */
  failoverGroupId?: string;
  /**
   * Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created.
   */
  isLedgerOn?: boolean;
  /**
   * Last backup file name for restore of this managed database.
   */
  lastBackupName?: string;
  /**
   * The name of the Long Term Retention backup to be used for restore of this managed database.
   */
  longTermRetentionBackupResourceId?: string;
  /**
   * The resource identifier of the recoverable database associated with create operation of this database.
   */
  recoverableDatabaseId?: string;
  /**
   * The restorable dropped database resource id to restore when creating this database.
   */
  restorableDroppedDatabaseId?: string;
  /**
   * Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: Date;
  /**
   * The resource identifier of the source database associated with create operation of this database.
   */
  sourceDatabaseId?: string;
  /**
   * Status of the database.
   */
  status?: ManagedDatabaseStatus;
  /**
   * Conditional. If createMode is RestoreExternalBackup, this value is used. Specifies the identity used for storage container authentication. Can be 'SharedAccessSignature' or 'ManagedIdentity'; if not specified 'SharedAccessSignature' is assumed.
   */
  storageContainerIdentity?: string;
  /**
   * Conditional. If createMode is RestoreExternalBackup and storageContainerIdentity is not ManagedIdentity, this value is required. Specifies the storage container sas token.
   */
  storageContainerSasToken?: string;
  /**
   * Conditional. If createMode is RestoreExternalBackup, this value is required. Specifies the uri of the storage container where backups for this restore are stored.
   */
  storageContainerUri?: string;
}

/**
 * Input type for The managed database's properties.
 */
export interface ManagedDatabasePropertiesInput extends InputOf<ManagedDatabaseProperties> {
  /**
   * Whether to auto complete restore of this managed database.
   */
  autoCompleteRestore?: ExpressionOrValue<boolean> | undefined;
  /**
   * Collation of the metadata catalog.
   */
  catalogCollation?: ExpressionOrValue<CatalogCollationType> | undefined;
  /**
   * Collation of the managed database.
   */
  collation?: ExpressionOrValue<string> | undefined;
  /**
   * Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required).
   */
  createMode?: ExpressionOrValue<ManagedDatabaseCreateMode> | undefined;
  /**
   * The restorable cross-subscription dropped database resource id to restore when creating this database.
   */
  crossSubscriptionRestorableDroppedDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the cross-subscription source database associated with create operation of this database.
   */
  crossSubscriptionSourceDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Target managed instance id used in cross-subscription restore.
   */
  crossSubscriptionTargetManagedInstanceId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created.
   */
  isLedgerOn?: ExpressionOrValue<boolean> | undefined;
  /**
   * Last backup file name for restore of this managed database.
   */
  lastBackupName?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Long Term Retention backup to be used for restore of this managed database.
   */
  longTermRetentionBackupResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the recoverable database associated with create operation of this database.
   */
  recoverableDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The restorable dropped database resource id to restore when creating this database.
   */
  restorableDroppedDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The resource identifier of the source database associated with create operation of this database.
   */
  sourceDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is RestoreExternalBackup, this value is used. Specifies the identity used for storage container authentication. Can be 'SharedAccessSignature' or 'ManagedIdentity'; if not specified 'SharedAccessSignature' is assumed.
   */
  storageContainerIdentity?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is RestoreExternalBackup and storageContainerIdentity is not ManagedIdentity, this value is required. Specifies the storage container sas token.
   */
  storageContainerSasToken?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is RestoreExternalBackup, this value is required. Specifies the uri of the storage container where backups for this restore are stored.
   */
  storageContainerUri?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The managed database's properties.
 */
export interface ManagedDatabasePropertiesView extends InputOf<ManagedDatabaseProperties> {
  /**
   * Whether to auto complete restore of this managed database.
   */
  autoCompleteRestore?: ExpressionOrValue<boolean> | undefined;
  /**
   * Collation of the metadata catalog.
   */
  catalogCollation?: ExpressionOrValue<CatalogCollationType> | undefined;
  /**
   * Collation of the managed database.
   */
  collation?: ExpressionOrValue<string> | undefined;
  /**
   * Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required).
   */
  createMode?: ExpressionOrValue<ManagedDatabaseCreateMode> | undefined;
  /**
   * Read-only output: Creation date of the database.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The restorable cross-subscription dropped database resource id to restore when creating this database.
   */
  crossSubscriptionRestorableDroppedDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the cross-subscription source database associated with create operation of this database.
   */
  crossSubscriptionSourceDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Target managed instance id used in cross-subscription restore.
   */
  crossSubscriptionTargetManagedInstanceId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Geo paired region.
   */
  readonly defaultSecondaryLocation?: Expression<string> | undefined;
  /**
   * Read-only output: Earliest restore point in time for point in time restore.
   */
  readonly earliestRestorePoint?: Expression<Date> | undefined;
  /**
   * Read-only output: Additional observability and troubleshooting information for databases in ‘Inaccessible’ state.
   */
  readonly extendedAccessibilityInfo?:
    Expression<ManagedDatabaseExtendedAccessibilityInfo> | undefined;
  /**
   * Read-only output: Instance Failover Group resource identifier that this managed database belongs to.
   */
  readonly failoverGroupId?: Expression<string> | undefined;
  /**
   * Whether or not this database is a ledger database, which means all tables in the database are ledger tables. Note: the value of this property cannot be changed after the database has been created.
   */
  isLedgerOn?: ExpressionOrValue<boolean> | undefined;
  /**
   * Last backup file name for restore of this managed database.
   */
  lastBackupName?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the Long Term Retention backup to be used for restore of this managed database.
   */
  longTermRetentionBackupResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource identifier of the recoverable database associated with create operation of this database.
   */
  recoverableDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * The restorable dropped database resource id to restore when creating this database.
   */
  restorableDroppedDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is PointInTimeRestore, this value is required. Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The resource identifier of the source database associated with create operation of this database.
   */
  sourceDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Status of the database.
   */
  readonly status?: Expression<ManagedDatabaseStatus> | undefined;
  /**
   * Conditional. If createMode is RestoreExternalBackup, this value is used. Specifies the identity used for storage container authentication. Can be 'SharedAccessSignature' or 'ManagedIdentity'; if not specified 'SharedAccessSignature' is assumed.
   */
  storageContainerIdentity?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is RestoreExternalBackup and storageContainerIdentity is not ManagedIdentity, this value is required. Specifies the storage container sas token.
   */
  storageContainerSasToken?: ExpressionOrValue<string> | undefined;
  /**
   * Conditional. If createMode is RestoreExternalBackup, this value is required. Specifies the uri of the storage container where backups for this restore are stored.
   */
  storageContainerUri?: ExpressionOrValue<string> | undefined;
}

export const managedDatabasePropertiesShape: FlatModelShape = createFlatModelShape({
  autoCompleteRestore: { armPath: ["autoCompleteRestore"], value: createBooleanShape() },
  catalogCollation: { armPath: ["catalogCollation"], value: createUnionShape() },
  collation: { armPath: ["collation"], value: createStringShape() },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  crossSubscriptionRestorableDroppedDatabaseId: {
    armPath: ["crossSubscriptionRestorableDroppedDatabaseId"],
    value: createStringShape(),
  },
  crossSubscriptionSourceDatabaseId: {
    armPath: ["crossSubscriptionSourceDatabaseId"],
    value: createStringShape(),
  },
  crossSubscriptionTargetManagedInstanceId: {
    armPath: ["crossSubscriptionTargetManagedInstanceId"],
    value: createStringShape(),
  },
  defaultSecondaryLocation: {
    armPath: ["defaultSecondaryLocation"],
    value: createStringShape(),
    readOnly: true,
  },
  earliestRestorePoint: {
    armPath: ["earliestRestorePoint"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  extendedAccessibilityInfo: {
    armPath: ["extendedAccessibilityInfo"],
    value: createDeferredShape(() => managedDatabaseExtendedAccessibilityInfoShape),
    readOnly: true,
  },
  failoverGroupId: { armPath: ["failoverGroupId"], value: createStringShape(), readOnly: true },
  isLedgerOn: { armPath: ["isLedgerOn"], value: createBooleanShape() },
  lastBackupName: { armPath: ["lastBackupName"], value: createStringShape() },
  longTermRetentionBackupResourceId: {
    armPath: ["longTermRetentionBackupResourceId"],
    value: createStringShape(),
  },
  recoverableDatabaseId: { armPath: ["recoverableDatabaseId"], value: createStringShape() },
  restorableDroppedDatabaseId: {
    armPath: ["restorableDroppedDatabaseId"],
    value: createStringShape(),
  },
  restorePointInTime: {
    armPath: ["restorePointInTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  sourceDatabaseId: { armPath: ["sourceDatabaseId"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  storageContainerIdentity: { armPath: ["storageContainerIdentity"], value: createStringShape() },
  storageContainerSasToken: { armPath: ["storageContainerSasToken"], value: createStringShape() },
  storageContainerUri: { armPath: ["storageContainerUri"], value: createStringShape() },
});

/**
 * The managed database's restore details backup set properties.
 */
export interface ManagedDatabaseRestoreDetailsBackupSetProperties {
  /**
   * Backup size.
   */
  backupSizeMb?: number;
  /**
   * First stripe name.
   */
  firstStripeName?: string;
  /**
   * Number of stripes.
   */
  numberOfStripes?: number;
  /**
   * Last restored file time.
   */
  restoreFinishedTimestampUtc?: Date;
  /**
   * Last restored file time.
   */
  restoreStartedTimestampUtc?: Date;
  /**
   * Backup set status.
   */
  status?: string;
}

/**
 * Input type for The managed database's restore details backup set properties.
 */
export interface ManagedDatabaseRestoreDetailsBackupSetPropertiesInput extends InputOf<ManagedDatabaseRestoreDetailsBackupSetProperties> {}

/**
 * View type for The managed database's restore details backup set properties.
 */
export interface ManagedDatabaseRestoreDetailsBackupSetPropertiesView extends InputOf<ManagedDatabaseRestoreDetailsBackupSetProperties> {
  /**
   * Read-only output: Backup size.
   */
  readonly backupSizeMb?: Expression<number> | undefined;
  /**
   * Read-only output: First stripe name.
   */
  readonly firstStripeName?: Expression<string> | undefined;
  /**
   * Read-only output: Number of stripes.
   */
  readonly numberOfStripes?: Expression<number> | undefined;
  /**
   * Read-only output: Last restored file time.
   */
  readonly restoreFinishedTimestampUtc?: Expression<Date> | undefined;
  /**
   * Read-only output: Last restored file time.
   */
  readonly restoreStartedTimestampUtc?: Expression<Date> | undefined;
  /**
   * Read-only output: Backup set status.
   */
  readonly status?: Expression<string> | undefined;
}

export const managedDatabaseRestoreDetailsBackupSetPropertiesShape: FlatModelShape =
  createFlatModelShape({
    backupSizeMb: { armPath: ["backupSizeMB"], value: createNumberShape(), readOnly: true },
    firstStripeName: { armPath: ["firstStripeName"], value: createStringShape(), readOnly: true },
    numberOfStripes: { armPath: ["numberOfStripes"], value: createNumberShape(), readOnly: true },
    restoreFinishedTimestampUtc: {
      armPath: ["restoreFinishedTimestampUtc"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    restoreStartedTimestampUtc: {
      armPath: ["restoreStartedTimestampUtc"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    status: { armPath: ["status"], value: createStringShape(), readOnly: true },
  });

/**
 * The managed database's restore details properties.
 */
export interface ManagedDatabaseRestoreDetailsProperties {
  /**
   * The reason why restore is in Blocked state.
   */
  blockReason?: string;
  /**
   * Current backup type.
   */
  currentBackupType?: string;
  /**
   * Current restored size MB.
   */
  currentRestoredSizeMb?: number;
  /**
   * Current restore plan size MB.
   */
  currentRestorePlanSizeMb?: number;
  /**
   * Current restoring file name.
   */
  currentRestoringFileName?: string;
  /**
   * Diff backup sets.
   */
  diffBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /**
   * Full backup sets.
   */
  fullBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /**
   * Last restored file name.
   */
  lastRestoredFileName?: string;
  /**
   * Last restored file time.
   */
  lastRestoredFileTime?: Date;
  /**
   * Last uploaded file name.
   */
  lastUploadedFileName?: string;
  /**
   * Last uploaded file time.
   */
  lastUploadedFileTime?: Date;
  /**
   * Log backup sets.
   */
  logBackupSets?: ManagedDatabaseRestoreDetailsBackupSetProperties[];
  /**
   * Number of files detected.
   */
  numberOfFilesDetected?: number;
  /**
   * Number of files queued.
   */
  numberOfFilesQueued?: number;
  /**
   * Number of files restored.
   */
  numberOfFilesRestored?: number;
  /**
   * Number of files restoring.
   */
  numberOfFilesRestoring?: number;
  /**
   * Number of files skipped.
   */
  numberOfFilesSkipped?: number;
  /**
   * Number of files unrestorable.
   */
  numberOfFilesUnrestorable?: number;
  /**
   * Percent completed.
   */
  percentCompleted?: number;
  /**
   * Restore status.
   */
  status?: string;
  /**
   * Restore type.
   */
  type?: string;
  /**
   * Unrestorable files.
   */
  unrestorableFiles?: ManagedDatabaseRestoreDetailsUnrestorableFileProperties[];
}

/**
 * Input type for The managed database's restore details properties.
 */
export interface ManagedDatabaseRestoreDetailsPropertiesInput extends InputOf<ManagedDatabaseRestoreDetailsProperties> {}

/**
 * View type for The managed database's restore details properties.
 */
export interface ManagedDatabaseRestoreDetailsPropertiesView extends InputOf<ManagedDatabaseRestoreDetailsProperties> {
  /**
   * Read-only output: The reason why restore is in Blocked state.
   */
  readonly blockReason?: Expression<string> | undefined;
  /**
   * Read-only output: Current backup type.
   */
  readonly currentBackupType?: Expression<string> | undefined;
  /**
   * Read-only output: Current restored size MB.
   */
  readonly currentRestoredSizeMb?: Expression<number> | undefined;
  /**
   * Read-only output: Current restore plan size MB.
   */
  readonly currentRestorePlanSizeMb?: Expression<number> | undefined;
  /**
   * Read-only output: Current restoring file name.
   */
  readonly currentRestoringFileName?: Expression<string> | undefined;
  /**
   * Read-only output: Diff backup sets.
   */
  readonly diffBackupSets?:
    Expression<ManagedDatabaseRestoreDetailsBackupSetProperties[]> | undefined;
  /**
   * Read-only output: Full backup sets.
   */
  readonly fullBackupSets?:
    Expression<ManagedDatabaseRestoreDetailsBackupSetProperties[]> | undefined;
  /**
   * Read-only output: Last restored file name.
   */
  readonly lastRestoredFileName?: Expression<string> | undefined;
  /**
   * Read-only output: Last restored file time.
   */
  readonly lastRestoredFileTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Last uploaded file name.
   */
  readonly lastUploadedFileName?: Expression<string> | undefined;
  /**
   * Read-only output: Last uploaded file time.
   */
  readonly lastUploadedFileTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Log backup sets.
   */
  readonly logBackupSets?:
    Expression<ManagedDatabaseRestoreDetailsBackupSetProperties[]> | undefined;
  /**
   * Read-only output: Number of files detected.
   */
  readonly numberOfFilesDetected?: Expression<number> | undefined;
  /**
   * Read-only output: Number of files queued.
   */
  readonly numberOfFilesQueued?: Expression<number> | undefined;
  /**
   * Read-only output: Number of files restored.
   */
  readonly numberOfFilesRestored?: Expression<number> | undefined;
  /**
   * Read-only output: Number of files restoring.
   */
  readonly numberOfFilesRestoring?: Expression<number> | undefined;
  /**
   * Read-only output: Number of files skipped.
   */
  readonly numberOfFilesSkipped?: Expression<number> | undefined;
  /**
   * Read-only output: Number of files unrestorable.
   */
  readonly numberOfFilesUnrestorable?: Expression<number> | undefined;
  /**
   * Read-only output: Percent completed.
   */
  readonly percentCompleted?: Expression<number> | undefined;
  /**
   * Read-only output: Restore status.
   */
  readonly status?: Expression<string> | undefined;
  /**
   * Read-only output: Restore type.
   */
  readonly type?: Expression<string> | undefined;
  /**
   * Read-only output: Unrestorable files.
   */
  readonly unrestorableFiles?:
    Expression<ManagedDatabaseRestoreDetailsUnrestorableFileProperties[]> | undefined;
}

export const managedDatabaseRestoreDetailsPropertiesShape: FlatModelShape = createFlatModelShape({
  blockReason: { armPath: ["blockReason"], value: createStringShape(), readOnly: true },
  currentBackupType: { armPath: ["currentBackupType"], value: createStringShape(), readOnly: true },
  currentRestoredSizeMb: {
    armPath: ["currentRestoredSizeMB"],
    value: createNumberShape(),
    readOnly: true,
  },
  currentRestorePlanSizeMb: {
    armPath: ["currentRestorePlanSizeMB"],
    value: createNumberShape(),
    readOnly: true,
  },
  currentRestoringFileName: {
    armPath: ["currentRestoringFileName"],
    value: createStringShape(),
    readOnly: true,
  },
  diffBackupSets: {
    armPath: ["diffBackupSets"],
    value: createArrayShape(
      createDeferredShape(() => managedDatabaseRestoreDetailsBackupSetPropertiesShape),
    ),
    readOnly: true,
  },
  fullBackupSets: {
    armPath: ["fullBackupSets"],
    value: createArrayShape(
      createDeferredShape(() => managedDatabaseRestoreDetailsBackupSetPropertiesShape),
    ),
    readOnly: true,
  },
  lastRestoredFileName: {
    armPath: ["lastRestoredFileName"],
    value: createStringShape(),
    readOnly: true,
  },
  lastRestoredFileTime: {
    armPath: ["lastRestoredFileTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastUploadedFileName: {
    armPath: ["lastUploadedFileName"],
    value: createStringShape(),
    readOnly: true,
  },
  lastUploadedFileTime: {
    armPath: ["lastUploadedFileTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  logBackupSets: {
    armPath: ["logBackupSets"],
    value: createArrayShape(
      createDeferredShape(() => managedDatabaseRestoreDetailsBackupSetPropertiesShape),
    ),
    readOnly: true,
  },
  numberOfFilesDetected: {
    armPath: ["numberOfFilesDetected"],
    value: createNumberShape(),
    readOnly: true,
  },
  numberOfFilesQueued: {
    armPath: ["numberOfFilesQueued"],
    value: createNumberShape(),
    readOnly: true,
  },
  numberOfFilesRestored: {
    armPath: ["numberOfFilesRestored"],
    value: createNumberShape(),
    readOnly: true,
  },
  numberOfFilesRestoring: {
    armPath: ["numberOfFilesRestoring"],
    value: createNumberShape(),
    readOnly: true,
  },
  numberOfFilesSkipped: {
    armPath: ["numberOfFilesSkipped"],
    value: createNumberShape(),
    readOnly: true,
  },
  numberOfFilesUnrestorable: {
    armPath: ["numberOfFilesUnrestorable"],
    value: createNumberShape(),
    readOnly: true,
  },
  percentCompleted: { armPath: ["percentCompleted"], value: createNumberShape(), readOnly: true },
  status: { armPath: ["status"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
  unrestorableFiles: {
    armPath: ["unrestorableFiles"],
    value: createArrayShape(
      createDeferredShape(() => managedDatabaseRestoreDetailsUnrestorableFilePropertiesShape),
    ),
    readOnly: true,
  },
});

/**
 * The managed database's restore details unrestorable file properties.
 */
export interface ManagedDatabaseRestoreDetailsUnrestorableFileProperties {
  /**
   * File name.
   */
  name?: string;
}

/**
 * Input type for The managed database's restore details unrestorable file properties.
 */
export interface ManagedDatabaseRestoreDetailsUnrestorableFilePropertiesInput extends InputOf<ManagedDatabaseRestoreDetailsUnrestorableFileProperties> {}

/**
 * View type for The managed database's restore details unrestorable file properties.
 */
export interface ManagedDatabaseRestoreDetailsUnrestorableFilePropertiesView extends InputOf<ManagedDatabaseRestoreDetailsUnrestorableFileProperties> {
  /**
   * Read-only output: File name.
   */
  readonly name?: Expression<string> | undefined;
}

export const managedDatabaseRestoreDetailsUnrestorableFilePropertiesShape: FlatModelShape =
  createFlatModelShape({
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  });

/**
 * The properties of a managed instance administrator.
 */
export interface ManagedInstanceAdministratorProperties {
  /**
   * Type of the managed instance administrator.
   */
  administratorType: ManagedInstanceAdministratorType;
  /**
   * Login name of the managed instance administrator.
   */
  login: string;
  /**
   * SID (object ID) of the managed instance administrator.
   */
  sid: string;
  /**
   * Tenant ID of the managed instance administrator.
   */
  tenantId?: string;
}

/**
 * Input type for The properties of a managed instance administrator.
 */
export interface ManagedInstanceAdministratorPropertiesInput extends InputOf<ManagedInstanceAdministratorProperties> {
  /**
   * Type of the managed instance administrator.
   */
  administratorType: ExpressionOrValue<ManagedInstanceAdministratorType>;
  /**
   * Login name of the managed instance administrator.
   */
  login: ExpressionOrValue<string>;
  /**
   * SID (object ID) of the managed instance administrator.
   */
  sid: ExpressionOrValue<string>;
  /**
   * Tenant ID of the managed instance administrator.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a managed instance administrator.
 */
export type ManagedInstanceAdministratorPropertiesView =
  ManagedInstanceAdministratorPropertiesInput;

export const managedInstanceAdministratorPropertiesShape: FlatModelShape = createFlatModelShape({
  administratorType: { armPath: ["administratorType"], value: createUnionShape() },
  login: { armPath: ["login"], value: createStringShape() },
  sid: { armPath: ["sid"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

/**
 * Properties of a active directory only authentication for Managed Instance.
 */
export interface ManagedInstanceAzureAdOnlyAuthProperties {
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication: boolean;
}

/**
 * Input type for Properties of a active directory only authentication for Managed Instance.
 */
export interface ManagedInstanceAzureAdOnlyAuthPropertiesInput extends InputOf<ManagedInstanceAzureAdOnlyAuthProperties> {
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication: ExpressionOrValue<boolean>;
}

/**
 * View type for Properties of a active directory only authentication for Managed Instance.
 */
export type ManagedInstanceAzureAdOnlyAuthPropertiesView =
  ManagedInstanceAzureAdOnlyAuthPropertiesInput;

export const managedInstanceAzureAdOnlyAuthPropertiesShape: FlatModelShape = createFlatModelShape({
  azureAdOnlyAuthentication: {
    armPath: ["azureADOnlyAuthentication"],
    value: createBooleanShape(),
  },
});

/**
 * The properties of managed instance DTC.
 */
export interface ManagedInstanceDtcProperties {
  /**
   * Active status of managed instance DTC.
   */
  dtcEnabled?: boolean;
  /**
   * Host name dns suffix of managed instance DTC.
   */
  dtcHostNameDnsSuffix?: string;
  /**
   * External dns suffix search list of managed instance DTC.
   */
  externalDnsSuffixSearchList?: string[];
  /**
   * Provisioning state of managed instance DTC.
   */
  provisioningState?: ProvisioningState;
  /**
   * Security settings of managed instance DTC.
   */
  securitySettings?: ManagedInstanceDtcSecuritySettings;
}

/**
 * Input type for The properties of managed instance DTC.
 */
export interface ManagedInstanceDtcPropertiesInput extends InputOf<ManagedInstanceDtcProperties> {
  /**
   * Active status of managed instance DTC.
   */
  dtcEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * External dns suffix search list of managed instance DTC.
   */
  externalDnsSuffixSearchList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Security settings of managed instance DTC.
   */
  securitySettings?: ManagedInstanceDtcSecuritySettingsInput | undefined;
}

/**
 * View type for The properties of managed instance DTC.
 */
export interface ManagedInstanceDtcPropertiesView extends InputOf<ManagedInstanceDtcProperties> {
  /**
   * Active status of managed instance DTC.
   */
  dtcEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: Host name dns suffix of managed instance DTC.
   */
  readonly dtcHostNameDnsSuffix?: Expression<string> | undefined;
  /**
   * External dns suffix search list of managed instance DTC.
   */
  externalDnsSuffixSearchList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: Provisioning state of managed instance DTC.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Security settings of managed instance DTC.
   */
  securitySettings?: ManagedInstanceDtcSecuritySettingsView | undefined;
}

export const managedInstanceDtcPropertiesShape: FlatModelShape = createFlatModelShape({
  dtcEnabled: { armPath: ["dtcEnabled"], value: createBooleanShape() },
  dtcHostNameDnsSuffix: {
    armPath: ["dtcHostNameDnsSuffix"],
    value: createStringShape(),
    readOnly: true,
  },
  externalDnsSuffixSearchList: {
    armPath: ["externalDnsSuffixSearchList"],
    value: createArrayShape(createStringShape()),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  securitySettings: {
    armPath: ["securitySettings"],
    value: createDeferredShape(() => managedInstanceDtcSecuritySettingsShape),
  },
});

/**
 * The Security Settings of managed instance DTC.
 */
export interface ManagedInstanceDtcSecuritySettings {
  /**
   * Allow SNA LU 6.2 Transactions to managed instance DTC.
   */
  snaLu6point2TransactionsEnabled?: boolean;
  /**
   * Transaction Manager communication settings of managed instance DTC.
   */
  transactionManagerCommunicationSettings?: ManagedInstanceDtcTransactionManagerCommunicationSettings;
  /**
   * Default timeout for XA Transactions (in seconds).
   */
  xaTransactionsDefaultTimeout?: number;
  /**
   * Allow XA Transactions to managed instance DTC.
   */
  xaTransactionsEnabled?: boolean;
  /**
   * Maximum timeout for XA Transactions (in seconds).
   */
  xaTransactionsMaximumTimeout?: number;
}

/**
 * Input type for The Security Settings of managed instance DTC.
 */
export interface ManagedInstanceDtcSecuritySettingsInput extends InputOf<ManagedInstanceDtcSecuritySettings> {
  /**
   * Allow SNA LU 6.2 Transactions to managed instance DTC.
   */
  snaLu6point2TransactionsEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Transaction Manager communication settings of managed instance DTC.
   */
  transactionManagerCommunicationSettings?:
    ManagedInstanceDtcTransactionManagerCommunicationSettingsInput | undefined;
  /**
   * Default timeout for XA Transactions (in seconds).
   */
  xaTransactionsDefaultTimeout?: ExpressionOrValue<number> | undefined;
  /**
   * Allow XA Transactions to managed instance DTC.
   */
  xaTransactionsEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Maximum timeout for XA Transactions (in seconds).
   */
  xaTransactionsMaximumTimeout?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The Security Settings of managed instance DTC.
 */
export type ManagedInstanceDtcSecuritySettingsView = ManagedInstanceDtcSecuritySettingsInput;

export const managedInstanceDtcSecuritySettingsShape: FlatModelShape = createFlatModelShape({
  snaLu6point2TransactionsEnabled: {
    armPath: ["snaLu6point2TransactionsEnabled"],
    value: createBooleanShape(),
  },
  transactionManagerCommunicationSettings: {
    armPath: ["transactionManagerCommunicationSettings"],
    value: createDeferredShape(
      () => managedInstanceDtcTransactionManagerCommunicationSettingsShape,
    ),
  },
  xaTransactionsDefaultTimeout: {
    armPath: ["xaTransactionsDefaultTimeout"],
    value: createNumberShape(),
  },
  xaTransactionsEnabled: { armPath: ["xaTransactionsEnabled"], value: createBooleanShape() },
  xaTransactionsMaximumTimeout: {
    armPath: ["xaTransactionsMaximumTimeout"],
    value: createNumberShape(),
  },
});

/**
 * The Transaction Manager Communication Settings of managed instance DTC.
 */
export interface ManagedInstanceDtcTransactionManagerCommunicationSettings {
  /**
   * Allow Inbound traffic to managed instance DTC.
   */
  allowInboundEnabled?: boolean;
  /**
   * Allow Outbound traffic of managed instance DTC.
   */
  allowOutboundEnabled?: boolean;
  /**
   * Authentication type of managed instance DTC.
   */
  authentication?: string;
}

/**
 * Input type for The Transaction Manager Communication Settings of managed instance DTC.
 */
export interface ManagedInstanceDtcTransactionManagerCommunicationSettingsInput extends InputOf<ManagedInstanceDtcTransactionManagerCommunicationSettings> {
  /**
   * Allow Inbound traffic to managed instance DTC.
   */
  allowInboundEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Allow Outbound traffic of managed instance DTC.
   */
  allowOutboundEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Authentication type of managed instance DTC.
   */
  authentication?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The Transaction Manager Communication Settings of managed instance DTC.
 */
export type ManagedInstanceDtcTransactionManagerCommunicationSettingsView =
  ManagedInstanceDtcTransactionManagerCommunicationSettingsInput;

export const managedInstanceDtcTransactionManagerCommunicationSettingsShape: FlatModelShape =
  createFlatModelShape({
    allowInboundEnabled: { armPath: ["allowInboundEnabled"], value: createBooleanShape() },
    allowOutboundEnabled: { armPath: ["allowOutboundEnabled"], value: createBooleanShape() },
    authentication: { armPath: ["authentication"], value: createStringShape() },
  });

/**
 * Properties for an encryption protector execution.
 */
export interface ManagedInstanceEncryptionProtectorProperties {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: boolean;
  /**
   * The name of the managed instance key.
   */
  serverKeyName?: string;
  /**
   * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ServerKeyType;
  /**
   * Thumbprint of the server key.
   */
  thumbprint?: string;
  /**
   * The URI of the server key.
   */
  uri?: string;
}

/**
 * Input type for Properties for an encryption protector execution.
 */
export interface ManagedInstanceEncryptionProtectorPropertiesInput extends InputOf<ManagedInstanceEncryptionProtectorProperties> {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The name of the managed instance key.
   */
  serverKeyName?: ExpressionOrValue<string> | undefined;
  /**
   * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
}

/**
 * View type for Properties for an encryption protector execution.
 */
export interface ManagedInstanceEncryptionProtectorPropertiesView extends InputOf<ManagedInstanceEncryptionProtectorProperties> {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The name of the managed instance key.
   */
  serverKeyName?: ExpressionOrValue<string> | undefined;
  /**
   * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
  /**
   * Read-only output: Thumbprint of the server key.
   */
  readonly thumbprint?: Expression<string> | undefined;
  /**
   * Read-only output: The URI of the server key.
   */
  readonly uri?: Expression<string> | undefined;
}

export const managedInstanceEncryptionProtectorPropertiesShape: FlatModelShape =
  createFlatModelShape({
    autoRotationEnabled: { armPath: ["autoRotationEnabled"], value: createBooleanShape() },
    serverKeyName: { armPath: ["serverKeyName"], value: createStringShape() },
    serverKeyType: { armPath: ["serverKeyType"], value: createUnionShape() },
    thumbprint: { armPath: ["thumbprint"], value: createStringShape(), readOnly: true },
    uri: { armPath: ["uri"], value: createStringShape(), readOnly: true },
  });

/**
 * Properties of a active directory administrator.
 */
export interface ManagedInstanceExternalAdministrator {
  /**
   * Type of the sever administrator.
   */
  administratorType?: AdministratorType;
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication?: boolean;
  /**
   * Login name of the server administrator.
   */
  login?: string;
  /**
   * Principal Type of the sever administrator.
   */
  principalType?: PrincipalType;
  /**
   * SID (object ID) of the server administrator.
   */
  sid?: string;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: string;
}

/**
 * Input type for Properties of a active directory administrator.
 */
export interface ManagedInstanceExternalAdministratorInput extends InputOf<ManagedInstanceExternalAdministrator> {
  /**
   * Type of the sever administrator.
   */
  administratorType?: ExpressionOrValue<AdministratorType> | undefined;
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication?: ExpressionOrValue<boolean> | undefined;
  /**
   * Login name of the server administrator.
   */
  login?: ExpressionOrValue<string> | undefined;
  /**
   * Principal Type of the sever administrator.
   */
  principalType?: ExpressionOrValue<PrincipalType> | undefined;
  /**
   * SID (object ID) of the server administrator.
   */
  sid?: ExpressionOrValue<string> | undefined;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a active directory administrator.
 */
export type ManagedInstanceExternalAdministratorView = ManagedInstanceExternalAdministratorInput;

export const managedInstanceExternalAdministratorShape: FlatModelShape = createFlatModelShape({
  administratorType: { armPath: ["administratorType"], value: createUnionShape() },
  azureAdOnlyAuthentication: {
    armPath: ["azureADOnlyAuthentication"],
    value: createBooleanShape(),
  },
  login: { armPath: ["login"], value: createStringShape() },
  principalType: { armPath: ["principalType"], value: createUnionShape() },
  sid: { armPath: ["sid"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

/**
 * Properties for a key execution.
 */
export interface ManagedInstanceKeyProperties {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: boolean;
  /**
   * The key creation date.
   */
  creationDate?: Date;
  /**
   * The key type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ServerKeyType;
  /**
   * Thumbprint of the key.
   */
  thumbprint?: string;
  /**
   * The URI of the key. If the ServerKeyType is AzureKeyVault, then the URI is required.
   */
  uri?: string;
}

/**
 * Input type for Properties for a key execution.
 */
export interface ManagedInstanceKeyPropertiesInput extends InputOf<ManagedInstanceKeyProperties> {
  /**
   * The key type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
  /**
   * The URI of the key. If the ServerKeyType is AzureKeyVault, then the URI is required.
   */
  uri?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties for a key execution.
 */
export interface ManagedInstanceKeyPropertiesView extends InputOf<ManagedInstanceKeyProperties> {
  /**
   * Read-only output: Key auto rotation opt-in flag. Either true or false.
   */
  readonly autoRotationEnabled?: Expression<boolean> | undefined;
  /**
   * Read-only output: The key creation date.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * The key type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
  /**
   * Read-only output: Thumbprint of the key.
   */
  readonly thumbprint?: Expression<string> | undefined;
  /**
   * The URI of the key. If the ServerKeyType is AzureKeyVault, then the URI is required.
   */
  uri?: ExpressionOrValue<string> | undefined;
}

export const managedInstanceKeyPropertiesShape: FlatModelShape = createFlatModelShape({
  autoRotationEnabled: {
    armPath: ["autoRotationEnabled"],
    value: createBooleanShape(),
    readOnly: true,
  },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  serverKeyType: { armPath: ["serverKeyType"], value: createUnionShape() },
  thumbprint: { armPath: ["thumbprint"], value: createStringShape(), readOnly: true },
  uri: { armPath: ["uri"], value: createStringShape() },
});

/**
 * Properties of a long term retention backup
 */
export interface ManagedInstanceLongTermRetentionBackupProperties {
  /**
   * The time the long term retention backup will expire.
   */
  backupExpirationTime?: Date;
  /**
   * The BackupStorageAccessTier for the LTR backup
   */
  backupStorageAccessTier?: BackupStorageAccessTier;
  /**
   * The storage redundancy type of the backup
   */
  backupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * The time the backup was taken
   */
  backupTime?: Date;
  /**
   * The delete time of the database
   */
  databaseDeletionTime?: Date;
  /**
   * The name of the database the backup belong to
   */
  databaseName?: string;
  /**
   * The create time of the instance.
   */
  managedInstanceCreateTime?: Date;
  /**
   * The managed instance that the backup database belongs to.
   */
  managedInstanceName?: string;
}

/**
 * Input type for Properties of a long term retention backup
 */
export interface ManagedInstanceLongTermRetentionBackupPropertiesInput extends InputOf<ManagedInstanceLongTermRetentionBackupProperties> {}

/**
 * View type for Properties of a long term retention backup
 */
export interface ManagedInstanceLongTermRetentionBackupPropertiesView extends InputOf<ManagedInstanceLongTermRetentionBackupProperties> {
  /**
   * Read-only output: The time the long term retention backup will expire.
   */
  readonly backupExpirationTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The BackupStorageAccessTier for the LTR backup
   */
  readonly backupStorageAccessTier?: Expression<BackupStorageAccessTier> | undefined;
  /**
   * Read-only output: The storage redundancy type of the backup
   */
  readonly backupStorageRedundancy?: Expression<BackupStorageRedundancy> | undefined;
  /**
   * Read-only output: The time the backup was taken
   */
  readonly backupTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The delete time of the database
   */
  readonly databaseDeletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The name of the database the backup belong to
   */
  readonly databaseName?: Expression<string> | undefined;
  /**
   * Read-only output: The create time of the instance.
   */
  readonly managedInstanceCreateTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The managed instance that the backup database belongs to.
   */
  readonly managedInstanceName?: Expression<string> | undefined;
}

export const managedInstanceLongTermRetentionBackupPropertiesShape: FlatModelShape =
  createFlatModelShape({
    backupExpirationTime: {
      armPath: ["backupExpirationTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    backupStorageAccessTier: {
      armPath: ["backupStorageAccessTier"],
      value: createUnionShape(),
      readOnly: true,
    },
    backupStorageRedundancy: {
      armPath: ["backupStorageRedundancy"],
      value: createUnionShape(),
      readOnly: true,
    },
    backupTime: {
      armPath: ["backupTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    databaseDeletionTime: {
      armPath: ["databaseDeletionTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    databaseName: { armPath: ["databaseName"], value: createStringShape(), readOnly: true },
    managedInstanceCreateTime: {
      armPath: ["managedInstanceCreateTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    managedInstanceName: {
      armPath: ["managedInstanceName"],
      value: createStringShape(),
      readOnly: true,
    },
  });

/**
 * Properties of a long term retention policy
 */
export interface ManagedInstanceLongTermRetentionPolicyProperties {
  /**
   * The BackupStorageAccessTier for the LTR backups
   */
  backupStorageAccessTier?: BackupStorageAccessTier;
  /**
   * The monthly retention policy for an LTR backup in an ISO 8601 format.
   */
  monthlyRetention?: string;
  /**
   * The weekly retention policy for an LTR backup in an ISO 8601 format.
   */
  weeklyRetention?: string;
  /**
   * The week of year to take the yearly backup in an ISO 8601 format.
   */
  weekOfYear?: number;
  /**
   * The yearly retention policy for an LTR backup in an ISO 8601 format.
   */
  yearlyRetention?: string;
}

/**
 * Input type for Properties of a long term retention policy
 */
export interface ManagedInstanceLongTermRetentionPolicyPropertiesInput extends InputOf<ManagedInstanceLongTermRetentionPolicyProperties> {
  /**
   * The BackupStorageAccessTier for the LTR backups
   */
  backupStorageAccessTier?: ExpressionOrValue<BackupStorageAccessTier> | undefined;
  /**
   * The monthly retention policy for an LTR backup in an ISO 8601 format.
   */
  monthlyRetention?: ExpressionOrValue<string> | undefined;
  /**
   * The weekly retention policy for an LTR backup in an ISO 8601 format.
   */
  weeklyRetention?: ExpressionOrValue<string> | undefined;
  /**
   * The week of year to take the yearly backup in an ISO 8601 format.
   */
  weekOfYear?: ExpressionOrValue<number> | undefined;
  /**
   * The yearly retention policy for an LTR backup in an ISO 8601 format.
   */
  yearlyRetention?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a long term retention policy
 */
export type ManagedInstanceLongTermRetentionPolicyPropertiesView =
  ManagedInstanceLongTermRetentionPolicyPropertiesInput;

export const managedInstanceLongTermRetentionPolicyPropertiesShape: FlatModelShape =
  createFlatModelShape({
    backupStorageAccessTier: { armPath: ["backupStorageAccessTier"], value: createUnionShape() },
    monthlyRetention: { armPath: ["monthlyRetention"], value: createStringShape() },
    weeklyRetention: { armPath: ["weeklyRetention"], value: createStringShape() },
    weekOfYear: { armPath: ["weekOfYear"], value: createNumberShape() },
    yearlyRetention: { armPath: ["yearlyRetention"], value: createStringShape() },
  });

/**
 * The parameters of a managed instance operation.
 */
export interface ManagedInstanceOperationParametersPair {
  /**
   * The current parameters.
   */
  currentParameters?: UpsertManagedServerOperationParameters;
  /**
   * The requested parameters.
   */
  requestedParameters?: UpsertManagedServerOperationParameters;
}

/**
 * Input type for The parameters of a managed instance operation.
 */
export interface ManagedInstanceOperationParametersPairInput extends InputOf<ManagedInstanceOperationParametersPair> {}

/**
 * View type for The parameters of a managed instance operation.
 */
export interface ManagedInstanceOperationParametersPairView extends InputOf<ManagedInstanceOperationParametersPair> {
  /**
   * Read-only output: The current parameters.
   */
  readonly currentParameters?: Expression<UpsertManagedServerOperationParameters> | undefined;
  /**
   * Read-only output: The requested parameters.
   */
  readonly requestedParameters?: Expression<UpsertManagedServerOperationParameters> | undefined;
}

export const managedInstanceOperationParametersPairShape: FlatModelShape = createFlatModelShape({
  currentParameters: {
    armPath: ["currentParameters"],
    value: createDeferredShape(() => upsertManagedServerOperationParametersShape),
    readOnly: true,
  },
  requestedParameters: {
    armPath: ["requestedParameters"],
    value: createDeferredShape(() => upsertManagedServerOperationParametersShape),
    readOnly: true,
  },
});

/**
 * The properties of a managed instance operation.
 */
export interface ManagedInstanceOperationProperties {
  /**
   * The operation description.
   */
  description?: string;
  /**
   * The operation error code.
   */
  errorCode?: number;
  /**
   * The operation error description.
   */
  errorDescription?: string;
  /**
   * The operation error severity.
   */
  errorSeverity?: number;
  /**
   * The estimated completion time of the operation.
   */
  estimatedCompletionTime?: Date;
  /**
   * Whether the operation can be cancelled.
   */
  isCancellable?: boolean;
  /**
   * Whether or not the error is a user error.
   */
  isUserError?: boolean;
  /**
   * The name of the managed instance the operation is being performed on.
   */
  managedInstanceName?: string;
  /**
   * The name of operation.
   */
  operation?: string;
  /**
   * The friendly name of operation.
   */
  operationFriendlyName?: string;
  /**
   * The operation parameters.
   */
  operationParameters?: ManagedInstanceOperationParametersPair;
  /**
   * The operation steps.
   */
  operationSteps?: ManagedInstanceOperationSteps;
  /**
   * The percentage of the operation completed.
   */
  percentComplete?: number;
  /**
   * The operation start time.
   */
  startTime?: Date;
  /**
   * The operation state.
   */
  state?: ManagementOperationState;
}

/**
 * Input type for The properties of a managed instance operation.
 */
export interface ManagedInstanceOperationPropertiesInput extends InputOf<ManagedInstanceOperationProperties> {}

/**
 * View type for The properties of a managed instance operation.
 */
export interface ManagedInstanceOperationPropertiesView extends InputOf<ManagedInstanceOperationProperties> {
  /**
   * Read-only output: The operation description.
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: The operation error code.
   */
  readonly errorCode?: Expression<number> | undefined;
  /**
   * Read-only output: The operation error description.
   */
  readonly errorDescription?: Expression<string> | undefined;
  /**
   * Read-only output: The operation error severity.
   */
  readonly errorSeverity?: Expression<number> | undefined;
  /**
   * Read-only output: The estimated completion time of the operation.
   */
  readonly estimatedCompletionTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Whether the operation can be cancelled.
   */
  readonly isCancellable?: Expression<boolean> | undefined;
  /**
   * Read-only output: Whether or not the error is a user error.
   */
  readonly isUserError?: Expression<boolean> | undefined;
  /**
   * Read-only output: The name of the managed instance the operation is being performed on.
   */
  readonly managedInstanceName?: Expression<string> | undefined;
  /**
   * Read-only output: The name of operation.
   */
  readonly operation?: Expression<string> | undefined;
  /**
   * Read-only output: The friendly name of operation.
   */
  readonly operationFriendlyName?: Expression<string> | undefined;
  /**
   * Read-only output: The operation parameters.
   */
  readonly operationParameters?: Expression<ManagedInstanceOperationParametersPair> | undefined;
  /**
   * Read-only output: The operation steps.
   */
  readonly operationSteps?: Expression<ManagedInstanceOperationSteps> | undefined;
  /**
   * Read-only output: The percentage of the operation completed.
   */
  readonly percentComplete?: Expression<number> | undefined;
  /**
   * Read-only output: The operation start time.
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The operation state.
   */
  readonly state?: Expression<ManagementOperationState> | undefined;
}

export const managedInstanceOperationPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  errorCode: { armPath: ["errorCode"], value: createNumberShape(), readOnly: true },
  errorDescription: { armPath: ["errorDescription"], value: createStringShape(), readOnly: true },
  errorSeverity: { armPath: ["errorSeverity"], value: createNumberShape(), readOnly: true },
  estimatedCompletionTime: {
    armPath: ["estimatedCompletionTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  isCancellable: { armPath: ["isCancellable"], value: createBooleanShape(), readOnly: true },
  isUserError: { armPath: ["isUserError"], value: createBooleanShape(), readOnly: true },
  managedInstanceName: {
    armPath: ["managedInstanceName"],
    value: createStringShape(),
    readOnly: true,
  },
  operation: { armPath: ["operation"], value: createStringShape(), readOnly: true },
  operationFriendlyName: {
    armPath: ["operationFriendlyName"],
    value: createStringShape(),
    readOnly: true,
  },
  operationParameters: {
    armPath: ["operationParameters"],
    value: createDeferredShape(() => managedInstanceOperationParametersPairShape),
    readOnly: true,
  },
  operationSteps: {
    armPath: ["operationSteps"],
    value: createDeferredShape(() => managedInstanceOperationStepsShape),
    readOnly: true,
  },
  percentComplete: { armPath: ["percentComplete"], value: createNumberShape(), readOnly: true },
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
});

/**
 * The steps of a managed instance operation.
 */
export interface ManagedInstanceOperationSteps {
  /**
   * The number of current operation steps.
   */
  currentStep?: number;
  /**
   * The operation steps list.
   */
  stepsList?: UpsertManagedServerOperationStepWithEstimatesAndDuration[];
  /**
   * The total number of operation steps.
   */
  totalSteps?: string;
}

/**
 * Input type for The steps of a managed instance operation.
 */
export interface ManagedInstanceOperationStepsInput extends InputOf<ManagedInstanceOperationSteps> {}

/**
 * View type for The steps of a managed instance operation.
 */
export interface ManagedInstanceOperationStepsView extends InputOf<ManagedInstanceOperationSteps> {
  /**
   * Read-only output: The number of current operation steps.
   */
  readonly currentStep?: Expression<number> | undefined;
  /**
   * Read-only output: The operation steps list.
   */
  readonly stepsList?:
    Expression<UpsertManagedServerOperationStepWithEstimatesAndDuration[]> | undefined;
  /**
   * Read-only output: The total number of operation steps.
   */
  readonly totalSteps?: Expression<string> | undefined;
}

export const managedInstanceOperationStepsShape: FlatModelShape = createFlatModelShape({
  currentStep: { armPath: ["currentStep"], value: createNumberShape(), readOnly: true },
  stepsList: {
    armPath: ["stepsList"],
    value: createArrayShape(
      createDeferredShape(() => upsertManagedServerOperationStepWithEstimatesAndDurationShape),
    ),
    readOnly: true,
  },
  totalSteps: { armPath: ["totalSteps"], value: createStringShape(), readOnly: true },
});

/**
 * Pairs of Managed Instances in the failover group.
 */
export interface ManagedInstancePairInfo {
  /**
   * Id of Partner Managed Instance in pair.
   */
  partnerManagedInstanceId?: string;
  /**
   * Id of Primary Managed Instance in pair.
   */
  primaryManagedInstanceId?: string;
}

/**
 * Input type for Pairs of Managed Instances in the failover group.
 */
export interface ManagedInstancePairInfoInput extends InputOf<ManagedInstancePairInfo> {
  /**
   * Id of Partner Managed Instance in pair.
   */
  partnerManagedInstanceId?: ExpressionOrValue<string> | undefined;
  /**
   * Id of Primary Managed Instance in pair.
   */
  primaryManagedInstanceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Pairs of Managed Instances in the failover group.
 */
export type ManagedInstancePairInfoView = ManagedInstancePairInfoInput;

export const managedInstancePairInfoShape: FlatModelShape = createFlatModelShape({
  partnerManagedInstanceId: { armPath: ["partnerManagedInstanceId"], value: createStringShape() },
  primaryManagedInstanceId: { armPath: ["primaryManagedInstanceId"], value: createStringShape() },
});

/**
 * A private endpoint connection under a managed instance
 */
export interface ManagedInstancePecProperty {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Private endpoint connection properties
   */
  properties?: ManagedInstancePrivateEndpointConnectionProperties;
}

/**
 * Input type for A private endpoint connection under a managed instance
 */
export interface ManagedInstancePecPropertyInput extends InputOf<ManagedInstancePecProperty> {}

/**
 * View type for A private endpoint connection under a managed instance
 */
export interface ManagedInstancePecPropertyView extends InputOf<ManagedInstancePecProperty> {
  /**
   * Read-only output: Resource ID.
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Private endpoint connection properties
   */
  readonly properties?: Expression<ManagedInstancePrivateEndpointConnectionProperties> | undefined;
}

export const managedInstancePecPropertyShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => managedInstancePrivateEndpointConnectionPropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of a private endpoint connection.
 */
export interface ManagedInstancePrivateEndpointConnectionProperties {
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: ManagedInstancePrivateEndpointProperty;
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?: ManagedInstancePrivateLinkServiceConnectionStateProperty;
  /**
   * State of the Private Endpoint Connection.
   */
  provisioningState?: string;
}

/**
 * Input type for Properties of a private endpoint connection.
 */
export interface ManagedInstancePrivateEndpointConnectionPropertiesInput extends InputOf<ManagedInstancePrivateEndpointConnectionProperties> {
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: ManagedInstancePrivateEndpointPropertyInput | undefined;
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?:
    ManagedInstancePrivateLinkServiceConnectionStatePropertyInput | undefined;
}

/**
 * View type for Properties of a private endpoint connection.
 */
export interface ManagedInstancePrivateEndpointConnectionPropertiesView extends InputOf<ManagedInstancePrivateEndpointConnectionProperties> {
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: ManagedInstancePrivateEndpointPropertyView | undefined;
  /**
   * Connection State of the Private Endpoint Connection.
   */
  privateLinkServiceConnectionState?:
    ManagedInstancePrivateLinkServiceConnectionStatePropertyView | undefined;
  /**
   * Read-only output: State of the Private Endpoint Connection.
   */
  readonly provisioningState?: Expression<string> | undefined;
}

export const managedInstancePrivateEndpointConnectionPropertiesShape: FlatModelShape =
  createFlatModelShape({
    privateEndpoint: {
      armPath: ["privateEndpoint"],
      value: createDeferredShape(() => managedInstancePrivateEndpointPropertyShape),
    },
    privateLinkServiceConnectionState: {
      armPath: ["privateLinkServiceConnectionState"],
      value: createDeferredShape(
        () => managedInstancePrivateLinkServiceConnectionStatePropertyShape,
      ),
    },
    provisioningState: {
      armPath: ["provisioningState"],
      value: createStringShape(),
      readOnly: true,
    },
  });

export interface ManagedInstancePrivateEndpointProperty {
  /**
   * Resource id of the private endpoint.
   */
  id?: string;
}

export interface ManagedInstancePrivateEndpointPropertyInput extends InputOf<ManagedInstancePrivateEndpointProperty> {
  /**
   * Resource id of the private endpoint.
   */
  id?: ExpressionOrValue<string> | undefined;
}

export type ManagedInstancePrivateEndpointPropertyView =
  ManagedInstancePrivateEndpointPropertyInput;

export const managedInstancePrivateEndpointPropertyShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
});

/**
 * Properties of a private link resource.
 */
export interface ManagedInstancePrivateLinkProperties {
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
export interface ManagedInstancePrivateLinkPropertiesInput extends InputOf<ManagedInstancePrivateLinkProperties> {}

/**
 * View type for Properties of a private link resource.
 */
export interface ManagedInstancePrivateLinkPropertiesView extends InputOf<ManagedInstancePrivateLinkProperties> {
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

export const managedInstancePrivateLinkPropertiesShape: FlatModelShape = createFlatModelShape({
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

export interface ManagedInstancePrivateLinkServiceConnectionStateProperty {
  /**
   * The private link service connection description.
   */
  actionsRequired?: string;
  /**
   * The private link service connection description.
   */
  description: string;
  /**
   * The private link service connection status.
   */
  status: string;
}

export interface ManagedInstancePrivateLinkServiceConnectionStatePropertyInput extends InputOf<ManagedInstancePrivateLinkServiceConnectionStateProperty> {
  /**
   * The private link service connection description.
   */
  description: ExpressionOrValue<string>;
  /**
   * The private link service connection status.
   */
  status: ExpressionOrValue<string>;
}

export interface ManagedInstancePrivateLinkServiceConnectionStatePropertyView extends InputOf<ManagedInstancePrivateLinkServiceConnectionStateProperty> {
  /**
   * Read-only output: The private link service connection description.
   */
  readonly actionsRequired?: Expression<string> | undefined;
  /**
   * The private link service connection description.
   */
  description: ExpressionOrValue<string>;
  /**
   * The private link service connection status.
   */
  status: ExpressionOrValue<string>;
}

export const managedInstancePrivateLinkServiceConnectionStatePropertyShape: FlatModelShape =
  createFlatModelShape({
    actionsRequired: { armPath: ["actionsRequired"], value: createStringShape(), readOnly: true },
    description: { armPath: ["description"], value: createStringShape() },
    status: { armPath: ["status"], value: createStringShape() },
  });

/**
 * The properties of a managed instance.
 */
export interface ManagedInstanceProperties {
  /**
   * Administrator username for the managed instance. Can only be specified when the managed instance is being created (and is required for creation).
   */
  administratorLogin?: string;
  /**
   * The administrator login password (required for managed instance creation).
   */
  administratorLoginPassword?: string;
  /**
   * The Azure Active Directory administrator can be utilized during instance creation and for instance updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used.
   */
  administrators?: ManagedInstanceExternalAdministrator;
  /**
   * The managed instance's authentication metadata lookup mode.
   */
  authenticationMetadata?: AuthMetadataLookupModes;
  /**
   * Collation of the managed instance.
   */
  collation?: string;
  /**
   * Specifies the point in time (ISO8601 format) of the Managed Instance creation.
   */
  createTime?: Date;
  /**
   * The storage account type used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage)
   */
  currentBackupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * Specifies the internal format of instance databases specific to the SQL engine version.
   */
  databaseFormat?: ManagedInstanceDatabaseFormat;
  /**
   * The Dns Zone that the managed instance is in.
   */
  dnsZone?: string;
  /**
   * The resource id of another managed instance whose DNS zone this managed instance will share after creation.
   */
  dnsZonePartner?: string;
  /**
   * Status of external governance.
   */
  externalGovernanceStatus?: ExternalGovernanceStatus;
  /**
   * The fully qualified domain name of the managed instance.
   */
  fullyQualifiedDomainName?: string;
  /**
   * Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR).
   */
  hybridSecondaryUsage?: HybridSecondaryUsage;
  /**
   * Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR).
   */
  hybridSecondaryUsageDetected?: HybridSecondaryUsageDetected;
  /**
   * The Id of the instance pool this managed server belongs to.
   */
  instancePoolId?: string;
  /**
   * Whether or not this is a GPv2 variant of General Purpose edition.
   */
  isGeneralPurposeV2?: boolean;
  /**
   * A CMK URI of the key to use for encryption.
   */
  keyId?: string;
  /**
   * The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses).
   */
  licenseType?: ManagedInstanceLicenseType;
  /**
   * Specifies maintenance configuration id to apply to this managed instance.
   */
  maintenanceConfigurationId?: string;
  /**
   * Specifies the mode of database creation.
   *
   * Default: Regular instance creation.
   *
   * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
   */
  managedInstanceCreateMode?: ManagedServerCreateMode;
  /**
   * Memory size in GB. Minimum value: 28. Maximum value: 870. Minimum and maximum value depend on the number of vCores and service tier. Read more about resource limits: https://aka.ms/mi-resource-limits-api.
   */
  memorySizeInGb?: number;
  /**
   * Minimal TLS version. Allowed values: 'None', '1.0', '1.1', '1.2'
   */
  minimalTlsVersion?: string;
  /**
   * Pricing model of Managed Instance.
   */
  pricingModel?: PricingModel;
  /**
   * The resource id of a user assigned identity to be used by default.
   */
  primaryUserAssignedIdentityId?: string;
  /**
   * List of private endpoint connections on a managed instance.
   */
  privateEndpointConnections?: ManagedInstancePecProperty[];
  /**
   * Provisioning state of managed instance.
   */
  provisioningState?: ProvisioningState;
  /**
   * Connection type used for connecting to the instance.
   */
  proxyOverride?: ManagedInstanceProxyOverride;
  /**
   * Whether or not the public data endpoint is enabled.
   */
  publicDataEndpointEnabled?: boolean;
  /**
   * The storage account type to be used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage)
   */
  requestedBackupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * Specifies the logical availability zone Managed Instance is pinned to.
   */
  requestedLogicalAvailabilityZone?: AvailabilityZoneType;
  /**
   * Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: Date;
  /**
   * The managed instance's service principal.
   */
  servicePrincipal?: ServicePrincipal;
  /**
   * The resource identifier of the source managed instance associated with create operation of this instance.
   */
  sourceManagedInstanceId?: string;
  /**
   * The state of the managed instance.
   */
  state?: string;
  /**
   * Storage IOps. Minimum value: 300. Maximum value: 80000. Increments of 1 IOps allowed only. Maximum value depends on the selected hardware family and number of vCores.
   */
  storageIOps?: number;
  /**
   * Storage size in GB. Minimum value: 32. Maximum value: 32768. Increments of 32 GB allowed only. Maximum value depends on the selected hardware family and number of vCores.
   */
  storageSizeInGb?: number;
  /**
   * Storage throughput MBps parameter is not supported in the instance create/update operation.
   */
  storageThroughputMBps?: number;
  /**
   * Subnet resource ID for the managed instance.
   */
  subnetId?: string;
  /**
   * Id of the timezone. Allowed values are timezones supported by Windows.
   * Windows keeps details on supported timezones, including the id, in registry under
   * KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.
   * You can get those registry values via SQL Server by querying SELECT name AS timezone_id FROM sys.time_zone_info.
   * List of Ids can also be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell.
   * An example of valid timezone id is "Pacific Standard Time" or "W. Europe Standard Time".
   */
  timezoneId?: string;
  /**
   * The number of vCores. Allowed values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Supported vCores depends on the selected hardware family and service tier.
   */
  vCores?: number;
  /**
   * Virtual cluster resource id for the Managed Instance.
   */
  virtualClusterId?: string;
  /**
   * Whether or not the zone-redundancy is enabled.
   */
  zoneRedundant?: boolean;
}

/**
 * Input type for The properties of a managed instance.
 */
export interface ManagedInstancePropertiesInput extends InputOf<ManagedInstanceProperties> {
  /**
   * Administrator username for the managed instance. Can only be specified when the managed instance is being created (and is required for creation).
   */
  administratorLogin?: ExpressionOrValue<string> | undefined;
  /**
   * The administrator login password (required for managed instance creation).
   */
  administratorLoginPassword?: ExpressionOrValue<string> | undefined;
  /**
   * The Azure Active Directory administrator can be utilized during instance creation and for instance updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used.
   */
  administrators?: ManagedInstanceExternalAdministratorInput | undefined;
  /**
   * The managed instance's authentication metadata lookup mode.
   */
  authenticationMetadata?: ExpressionOrValue<AuthMetadataLookupModes> | undefined;
  /**
   * Collation of the managed instance.
   */
  collation?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the internal format of instance databases specific to the SQL engine version.
   */
  databaseFormat?: ExpressionOrValue<ManagedInstanceDatabaseFormat> | undefined;
  /**
   * The resource id of another managed instance whose DNS zone this managed instance will share after creation.
   */
  dnsZonePartner?: ExpressionOrValue<string> | undefined;
  /**
   * Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR).
   */
  hybridSecondaryUsage?: ExpressionOrValue<HybridSecondaryUsage> | undefined;
  /**
   * The Id of the instance pool this managed server belongs to.
   */
  instancePoolId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not this is a GPv2 variant of General Purpose edition.
   */
  isGeneralPurposeV2?: ExpressionOrValue<boolean> | undefined;
  /**
   * A CMK URI of the key to use for encryption.
   */
  keyId?: ExpressionOrValue<string> | undefined;
  /**
   * The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses).
   */
  licenseType?: ExpressionOrValue<ManagedInstanceLicenseType> | undefined;
  /**
   * Specifies maintenance configuration id to apply to this managed instance.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the mode of database creation.
   *
   * Default: Regular instance creation.
   *
   * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
   */
  managedInstanceCreateMode?: ExpressionOrValue<ManagedServerCreateMode> | undefined;
  /**
   * Memory size in GB. Minimum value: 28. Maximum value: 870. Minimum and maximum value depend on the number of vCores and service tier. Read more about resource limits: https://aka.ms/mi-resource-limits-api.
   */
  memorySizeInGb?: ExpressionOrValue<number> | undefined;
  /**
   * Minimal TLS version. Allowed values: 'None', '1.0', '1.1', '1.2'
   */
  minimalTlsVersion?: ExpressionOrValue<string> | undefined;
  /**
   * Pricing model of Managed Instance.
   */
  pricingModel?: ExpressionOrValue<PricingModel> | undefined;
  /**
   * The resource id of a user assigned identity to be used by default.
   */
  primaryUserAssignedIdentityId?: ExpressionOrValue<string> | undefined;
  /**
   * Connection type used for connecting to the instance.
   */
  proxyOverride?: ExpressionOrValue<ManagedInstanceProxyOverride> | undefined;
  /**
   * Whether or not the public data endpoint is enabled.
   */
  publicDataEndpointEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The storage account type to be used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage)
   */
  requestedBackupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
  /**
   * Specifies the logical availability zone Managed Instance is pinned to.
   */
  requestedLogicalAvailabilityZone?: ExpressionOrValue<AvailabilityZoneType> | undefined;
  /**
   * Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The managed instance's service principal.
   */
  servicePrincipal?: ServicePrincipalInput | undefined;
  /**
   * The resource identifier of the source managed instance associated with create operation of this instance.
   */
  sourceManagedInstanceId?: ExpressionOrValue<string> | undefined;
  /**
   * Storage IOps. Minimum value: 300. Maximum value: 80000. Increments of 1 IOps allowed only. Maximum value depends on the selected hardware family and number of vCores.
   */
  storageIOps?: ExpressionOrValue<number> | undefined;
  /**
   * Storage size in GB. Minimum value: 32. Maximum value: 32768. Increments of 32 GB allowed only. Maximum value depends on the selected hardware family and number of vCores.
   */
  storageSizeInGb?: ExpressionOrValue<number> | undefined;
  /**
   * Storage throughput MBps parameter is not supported in the instance create/update operation.
   */
  storageThroughputMBps?: ExpressionOrValue<number> | undefined;
  /**
   * Subnet resource ID for the managed instance.
   */
  subnetId?: ExpressionOrValue<string> | undefined;
  /**
   * Id of the timezone. Allowed values are timezones supported by Windows.
   * Windows keeps details on supported timezones, including the id, in registry under
   * KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.
   * You can get those registry values via SQL Server by querying SELECT name AS timezone_id FROM sys.time_zone_info.
   * List of Ids can also be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell.
   * An example of valid timezone id is "Pacific Standard Time" or "W. Europe Standard Time".
   */
  timezoneId?: ExpressionOrValue<string> | undefined;
  /**
   * The number of vCores. Allowed values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Supported vCores depends on the selected hardware family and service tier.
   */
  vCores?: ExpressionOrValue<number> | undefined;
  /**
   * Whether or not the zone-redundancy is enabled.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for The properties of a managed instance.
 */
export interface ManagedInstancePropertiesView extends InputOf<ManagedInstanceProperties> {
  /**
   * Administrator username for the managed instance. Can only be specified when the managed instance is being created (and is required for creation).
   */
  administratorLogin?: ExpressionOrValue<string> | undefined;
  /**
   * The administrator login password (required for managed instance creation).
   */
  administratorLoginPassword?: ExpressionOrValue<string> | undefined;
  /**
   * The Azure Active Directory administrator can be utilized during instance creation and for instance updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used.
   */
  administrators?: ManagedInstanceExternalAdministratorView | undefined;
  /**
   * The managed instance's authentication metadata lookup mode.
   */
  authenticationMetadata?: ExpressionOrValue<AuthMetadataLookupModes> | undefined;
  /**
   * Collation of the managed instance.
   */
  collation?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Specifies the point in time (ISO8601 format) of the Managed Instance creation.
   */
  readonly createTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The storage account type used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage)
   */
  readonly currentBackupStorageRedundancy?: Expression<BackupStorageRedundancy> | undefined;
  /**
   * Specifies the internal format of instance databases specific to the SQL engine version.
   */
  databaseFormat?: ExpressionOrValue<ManagedInstanceDatabaseFormat> | undefined;
  /**
   * Read-only output: The Dns Zone that the managed instance is in.
   */
  readonly dnsZone?: Expression<string> | undefined;
  /**
   * The resource id of another managed instance whose DNS zone this managed instance will share after creation.
   */
  dnsZonePartner?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Status of external governance.
   */
  readonly externalGovernanceStatus?: Expression<ExternalGovernanceStatus> | undefined;
  /**
   * Read-only output: The fully qualified domain name of the managed instance.
   */
  readonly fullyQualifiedDomainName?: Expression<string> | undefined;
  /**
   * Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR).
   */
  hybridSecondaryUsage?: ExpressionOrValue<HybridSecondaryUsage> | undefined;
  /**
   * Read-only output: Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR).
   */
  readonly hybridSecondaryUsageDetected?: Expression<HybridSecondaryUsageDetected> | undefined;
  /**
   * The Id of the instance pool this managed server belongs to.
   */
  instancePoolId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not this is a GPv2 variant of General Purpose edition.
   */
  isGeneralPurposeV2?: ExpressionOrValue<boolean> | undefined;
  /**
   * A CMK URI of the key to use for encryption.
   */
  keyId?: ExpressionOrValue<string> | undefined;
  /**
   * The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses).
   */
  licenseType?: ExpressionOrValue<ManagedInstanceLicenseType> | undefined;
  /**
   * Specifies maintenance configuration id to apply to this managed instance.
   */
  maintenanceConfigurationId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the mode of database creation.
   *
   * Default: Regular instance creation.
   *
   * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
   */
  managedInstanceCreateMode?: ExpressionOrValue<ManagedServerCreateMode> | undefined;
  /**
   * Memory size in GB. Minimum value: 28. Maximum value: 870. Minimum and maximum value depend on the number of vCores and service tier. Read more about resource limits: https://aka.ms/mi-resource-limits-api.
   */
  memorySizeInGb?: ExpressionOrValue<number> | undefined;
  /**
   * Minimal TLS version. Allowed values: 'None', '1.0', '1.1', '1.2'
   */
  minimalTlsVersion?: ExpressionOrValue<string> | undefined;
  /**
   * Pricing model of Managed Instance.
   */
  pricingModel?: ExpressionOrValue<PricingModel> | undefined;
  /**
   * The resource id of a user assigned identity to be used by default.
   */
  primaryUserAssignedIdentityId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: List of private endpoint connections on a managed instance.
   */
  readonly privateEndpointConnections?: Expression<ManagedInstancePecProperty[]> | undefined;
  /**
   * Read-only output: Provisioning state of managed instance.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Connection type used for connecting to the instance.
   */
  proxyOverride?: ExpressionOrValue<ManagedInstanceProxyOverride> | undefined;
  /**
   * Whether or not the public data endpoint is enabled.
   */
  publicDataEndpointEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The storage account type to be used to store backups for this instance. The options are Local (LocallyRedundantStorage), Zone (ZoneRedundantStorage), Geo (GeoRedundantStorage) and GeoZone(GeoZoneRedundantStorage)
   */
  requestedBackupStorageRedundancy?: ExpressionOrValue<BackupStorageRedundancy> | undefined;
  /**
   * Specifies the logical availability zone Managed Instance is pinned to.
   */
  requestedLogicalAvailabilityZone?: ExpressionOrValue<AvailabilityZoneType> | undefined;
  /**
   * Specifies the point in time (ISO8601 format) of the source database that will be restored to create the new database.
   */
  restorePointInTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The managed instance's service principal.
   */
  servicePrincipal?: ServicePrincipalView | undefined;
  /**
   * The resource identifier of the source managed instance associated with create operation of this instance.
   */
  sourceManagedInstanceId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The state of the managed instance.
   */
  readonly state?: Expression<string> | undefined;
  /**
   * Storage IOps. Minimum value: 300. Maximum value: 80000. Increments of 1 IOps allowed only. Maximum value depends on the selected hardware family and number of vCores.
   */
  storageIOps?: ExpressionOrValue<number> | undefined;
  /**
   * Storage size in GB. Minimum value: 32. Maximum value: 32768. Increments of 32 GB allowed only. Maximum value depends on the selected hardware family and number of vCores.
   */
  storageSizeInGb?: ExpressionOrValue<number> | undefined;
  /**
   * Storage throughput MBps parameter is not supported in the instance create/update operation.
   */
  storageThroughputMBps?: ExpressionOrValue<number> | undefined;
  /**
   * Subnet resource ID for the managed instance.
   */
  subnetId?: ExpressionOrValue<string> | undefined;
  /**
   * Id of the timezone. Allowed values are timezones supported by Windows.
   * Windows keeps details on supported timezones, including the id, in registry under
   * KEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones.
   * You can get those registry values via SQL Server by querying SELECT name AS timezone_id FROM sys.time_zone_info.
   * List of Ids can also be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell.
   * An example of valid timezone id is "Pacific Standard Time" or "W. Europe Standard Time".
   */
  timezoneId?: ExpressionOrValue<string> | undefined;
  /**
   * The number of vCores. Allowed values: 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128. Supported vCores depends on the selected hardware family and service tier.
   */
  vCores?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Virtual cluster resource id for the Managed Instance.
   */
  readonly virtualClusterId?: Expression<string> | undefined;
  /**
   * Whether or not the zone-redundancy is enabled.
   */
  zoneRedundant?: ExpressionOrValue<boolean> | undefined;
}

export const managedInstancePropertiesShape: FlatModelShape = createFlatModelShape({
  administratorLogin: { armPath: ["administratorLogin"], value: createStringShape() },
  administratorLoginPassword: {
    armPath: ["administratorLoginPassword"],
    value: createStringShape(),
  },
  administrators: {
    armPath: ["administrators"],
    value: createDeferredShape(() => managedInstanceExternalAdministratorShape),
  },
  authenticationMetadata: { armPath: ["authenticationMetadata"], value: createUnionShape() },
  collation: { armPath: ["collation"], value: createStringShape() },
  createTime: {
    armPath: ["createTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  currentBackupStorageRedundancy: {
    armPath: ["currentBackupStorageRedundancy"],
    value: createUnionShape(),
    readOnly: true,
  },
  databaseFormat: { armPath: ["databaseFormat"], value: createUnionShape() },
  dnsZone: { armPath: ["dnsZone"], value: createStringShape(), readOnly: true },
  dnsZonePartner: { armPath: ["dnsZonePartner"], value: createStringShape() },
  externalGovernanceStatus: {
    armPath: ["externalGovernanceStatus"],
    value: createUnionShape(),
    readOnly: true,
  },
  fullyQualifiedDomainName: {
    armPath: ["fullyQualifiedDomainName"],
    value: createStringShape(),
    readOnly: true,
  },
  hybridSecondaryUsage: { armPath: ["hybridSecondaryUsage"], value: createUnionShape() },
  hybridSecondaryUsageDetected: {
    armPath: ["hybridSecondaryUsageDetected"],
    value: createUnionShape(),
    readOnly: true,
  },
  instancePoolId: { armPath: ["instancePoolId"], value: createStringShape() },
  isGeneralPurposeV2: { armPath: ["isGeneralPurposeV2"], value: createBooleanShape() },
  keyId: { armPath: ["keyId"], value: createStringShape() },
  licenseType: { armPath: ["licenseType"], value: createUnionShape() },
  maintenanceConfigurationId: {
    armPath: ["maintenanceConfigurationId"],
    value: createStringShape(),
  },
  managedInstanceCreateMode: { armPath: ["managedInstanceCreateMode"], value: createUnionShape() },
  memorySizeInGb: { armPath: ["memorySizeInGB"], value: createNumberShape() },
  minimalTlsVersion: { armPath: ["minimalTlsVersion"], value: createStringShape() },
  pricingModel: { armPath: ["pricingModel"], value: createUnionShape() },
  primaryUserAssignedIdentityId: {
    armPath: ["primaryUserAssignedIdentityId"],
    value: createStringShape(),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => managedInstancePecPropertyShape)),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  proxyOverride: { armPath: ["proxyOverride"], value: createUnionShape() },
  publicDataEndpointEnabled: {
    armPath: ["publicDataEndpointEnabled"],
    value: createBooleanShape(),
  },
  requestedBackupStorageRedundancy: {
    armPath: ["requestedBackupStorageRedundancy"],
    value: createUnionShape(),
  },
  requestedLogicalAvailabilityZone: {
    armPath: ["requestedLogicalAvailabilityZone"],
    value: createUnionShape(),
  },
  restorePointInTime: {
    armPath: ["restorePointInTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  servicePrincipal: {
    armPath: ["servicePrincipal"],
    value: createDeferredShape(() => servicePrincipalShape),
  },
  sourceManagedInstanceId: { armPath: ["sourceManagedInstanceId"], value: createStringShape() },
  state: { armPath: ["state"], value: createStringShape(), readOnly: true },
  storageIOps: { armPath: ["storageIOps"], value: createNumberShape() },
  storageSizeInGb: { armPath: ["storageSizeInGB"], value: createNumberShape() },
  storageThroughputMBps: { armPath: ["storageThroughputMBps"], value: createNumberShape() },
  subnetId: { armPath: ["subnetId"], value: createStringShape() },
  timezoneId: { armPath: ["timezoneId"], value: createStringShape() },
  vCores: { armPath: ["vCores"], value: createNumberShape() },
  virtualClusterId: { armPath: ["virtualClusterId"], value: createStringShape(), readOnly: true },
  zoneRedundant: { armPath: ["zoneRedundant"], value: createBooleanShape() },
});

/**
 * Properties of a managed instance vulnerability assessment.
 */
export interface ManagedInstanceVulnerabilityAssessmentProperties {
  /**
   * The recurring scans settings
   */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
  /**
   * Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageAccountAccessKey?: string;
  /**
   * A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).
   */
  storageContainerPath: string;
  /**
   * A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageContainerSasKey?: string;
}

/**
 * Input type for Properties of a managed instance vulnerability assessment.
 */
export interface ManagedInstanceVulnerabilityAssessmentPropertiesInput extends InputOf<ManagedInstanceVulnerabilityAssessmentProperties> {
  /**
   * The recurring scans settings
   */
  recurringScans?: VulnerabilityAssessmentRecurringScansPropertiesInput | undefined;
  /**
   * Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).
   */
  storageContainerPath: ExpressionOrValue<string>;
  /**
   * A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageContainerSasKey?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a managed instance vulnerability assessment.
 */
export type ManagedInstanceVulnerabilityAssessmentPropertiesView =
  ManagedInstanceVulnerabilityAssessmentPropertiesInput;

export const managedInstanceVulnerabilityAssessmentPropertiesShape: FlatModelShape =
  createFlatModelShape({
    recurringScans: {
      armPath: ["recurringScans"],
      value: createDeferredShape(() => vulnerabilityAssessmentRecurringScansPropertiesShape),
    },
    storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
    storageContainerPath: { armPath: ["storageContainerPath"], value: createStringShape() },
    storageContainerSasKey: { armPath: ["storageContainerSasKey"], value: createStringShape() },
  });

/**
 * The properties of a database ledger digest upload settings.
 */
export interface ManagedLedgerDigestUploadsProperties {
  /**
   * The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger.
   */
  digestStorageEndpoint?: string;
  /**
   * Specifies the state of ledger digest upload.
   */
  state?: ManagedLedgerDigestUploadsState;
}

/**
 * Input type for The properties of a database ledger digest upload settings.
 */
export interface ManagedLedgerDigestUploadsPropertiesInput extends InputOf<ManagedLedgerDigestUploadsProperties> {
  /**
   * The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger.
   */
  digestStorageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a database ledger digest upload settings.
 */
export interface ManagedLedgerDigestUploadsPropertiesView extends InputOf<ManagedLedgerDigestUploadsProperties> {
  /**
   * The digest storage endpoint, which must be either an Azure blob storage endpoint or an URI for Azure Confidential Ledger.
   */
  digestStorageEndpoint?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Specifies the state of ledger digest upload.
   */
  readonly state?: Expression<ManagedLedgerDigestUploadsState> | undefined;
}

export const managedLedgerDigestUploadsPropertiesShape: FlatModelShape = createFlatModelShape({
  digestStorageEndpoint: { armPath: ["digestStorageEndpoint"], value: createStringShape() },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of a managed server DNS alias.
 */
export interface ManagedServerDnsAliasProperties {
  /**
   * The fully qualified DNS record for managed server alias
   */
  azureDnsRecord?: string;
  /**
   * The fully qualified public DNS record for managed server alias
   */
  publicAzureDnsRecord?: string;
}

/**
 * Input type for Properties of a managed server DNS alias.
 */
export interface ManagedServerDnsAliasPropertiesInput extends InputOf<ManagedServerDnsAliasProperties> {}

/**
 * View type for Properties of a managed server DNS alias.
 */
export interface ManagedServerDnsAliasPropertiesView extends InputOf<ManagedServerDnsAliasProperties> {
  /**
   * Read-only output: The fully qualified DNS record for managed server alias
   */
  readonly azureDnsRecord?: Expression<string> | undefined;
  /**
   * Read-only output: The fully qualified public DNS record for managed server alias
   */
  readonly publicAzureDnsRecord?: Expression<string> | undefined;
}

export const managedServerDnsAliasPropertiesShape: FlatModelShape = createFlatModelShape({
  azureDnsRecord: { armPath: ["azureDnsRecord"], value: createStringShape(), readOnly: true },
  publicAzureDnsRecord: {
    armPath: ["publicAzureDnsRecord"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * Properties of a transparent data encryption.
 */
export interface ManagedTransparentDataEncryptionProperties {
  /**
   * Specifies the state of the transparent data encryption.
   */
  state: TransparentDataEncryptionState;
}

/**
 * Input type for Properties of a transparent data encryption.
 */
export interface ManagedTransparentDataEncryptionPropertiesInput extends InputOf<ManagedTransparentDataEncryptionProperties> {
  /**
   * Specifies the state of the transparent data encryption.
   */
  state: ExpressionOrValue<TransparentDataEncryptionState>;
}

/**
 * View type for Properties of a transparent data encryption.
 */
export type ManagedTransparentDataEncryptionPropertiesView =
  ManagedTransparentDataEncryptionPropertiesInput;

export const managedTransparentDataEncryptionPropertiesShape: FlatModelShape = createFlatModelShape(
  {
    state: { armPath: ["state"], value: createEnumShape() },
  },
);

/**
 * Contains the ARM resources for which to create private endpoint connection.
 */
export interface NetworkIsolationSettings {
  /**
   * The resource id for the SQL server which is the target of this request. If set, private endpoint connection will be created for the SQL server. Must match server which is target of the operation.
   */
  sqlServerResourceId?: string;
  /**
   * The resource id for the storage account used to store BACPAC file. If set, private endpoint connection will be created for the storage account. Must match storage account used for StorageUri parameter.
   */
  storageAccountResourceId?: string;
}

/**
 * Input type for Contains the ARM resources for which to create private endpoint connection.
 */
export interface NetworkIsolationSettingsInput extends InputOf<NetworkIsolationSettings> {
  /**
   * The resource id for the SQL server which is the target of this request. If set, private endpoint connection will be created for the SQL server. Must match server which is target of the operation.
   */
  sqlServerResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource id for the storage account used to store BACPAC file. If set, private endpoint connection will be created for the storage account. Must match storage account used for StorageUri parameter.
   */
  storageAccountResourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Contains the ARM resources for which to create private endpoint connection.
 */
export type NetworkIsolationSettingsView = NetworkIsolationSettingsInput;

export const networkIsolationSettingsShape: FlatModelShape = createFlatModelShape({
  sqlServerResourceId: { armPath: ["sqlServerResourceId"], value: createStringShape() },
  storageAccountResourceId: { armPath: ["storageAccountResourceId"], value: createStringShape() },
});

/**
 * The properties of an NSP config.
 */
export interface NetworkSecurityPerimeterConfigurationProperties {
  networkSecurityPerimeter?: NspConfigPerimeter;
  profile?: NspConfigProfile;
  provisioningIssues?: NspProvisioningIssue[];
  provisioningState?: string;
  resourceAssociation?: NspConfigAssociation;
}

/**
 * Input type for The properties of an NSP config.
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesInput extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {}

/**
 * View type for The properties of an NSP config.
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesView extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {
  readonly networkSecurityPerimeter?: Expression<NspConfigPerimeter> | undefined;
  readonly profile?: Expression<NspConfigProfile> | undefined;
  readonly provisioningIssues?: Expression<NspProvisioningIssue[]> | undefined;
  readonly provisioningState?: Expression<string> | undefined;
  readonly resourceAssociation?: Expression<NspConfigAssociation> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesShape: FlatModelShape =
  createFlatModelShape({
    networkSecurityPerimeter: {
      armPath: ["networkSecurityPerimeter"],
      value: createDeferredShape(() => nspConfigPerimeterShape),
      readOnly: true,
    },
    profile: {
      armPath: ["profile"],
      value: createDeferredShape(() => nspConfigProfileShape),
      readOnly: true,
    },
    provisioningIssues: {
      armPath: ["provisioningIssues"],
      value: createArrayShape(createDeferredShape(() => nspProvisioningIssueShape)),
      readOnly: true,
    },
    provisioningState: {
      armPath: ["provisioningState"],
      value: createStringShape(),
      readOnly: true,
    },
    resourceAssociation: {
      armPath: ["resourceAssociation"],
      value: createDeferredShape(() => nspConfigAssociationShape),
      readOnly: true,
    },
  });

export interface NspConfigAccessRule {
  name?: string;
  properties?: NspConfigAccessRuleProperties;
}

export interface NspConfigAccessRuleInput extends InputOf<NspConfigAccessRule> {}

export interface NspConfigAccessRuleView extends InputOf<NspConfigAccessRule> {
  readonly name?: Expression<string> | undefined;
  readonly properties?: Expression<NspConfigAccessRuleProperties> | undefined;
}

export const nspConfigAccessRuleShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => nspConfigAccessRulePropertiesShape),
    readOnly: true,
  },
});

export interface NspConfigAccessRuleProperties {
  addressPrefixes?: string[];
  direction?: string;
  fullyQualifiedDomainNames?: string[];
  networkSecurityPerimeters?: NspConfigNetworkSecurityPerimeterRule[];
  serviceTags?: string[];
  subscriptions?: string[];
}

export interface NspConfigAccessRulePropertiesInput extends InputOf<NspConfigAccessRuleProperties> {}

export interface NspConfigAccessRulePropertiesView extends InputOf<NspConfigAccessRuleProperties> {
  readonly addressPrefixes?: Expression<string[]> | undefined;
  readonly direction?: Expression<string> | undefined;
  readonly fullyQualifiedDomainNames?: Expression<string[]> | undefined;
  readonly networkSecurityPerimeters?:
    Expression<NspConfigNetworkSecurityPerimeterRule[]> | undefined;
  readonly serviceTags?: Expression<string[]> | undefined;
  readonly subscriptions?: Expression<string[]> | undefined;
}

export const nspConfigAccessRulePropertiesShape: FlatModelShape = createFlatModelShape({
  addressPrefixes: {
    armPath: ["addressPrefixes"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  direction: { armPath: ["direction"], value: createStringShape(), readOnly: true },
  fullyQualifiedDomainNames: {
    armPath: ["fullyQualifiedDomainNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  networkSecurityPerimeters: {
    armPath: ["networkSecurityPerimeters"],
    value: createArrayShape(createDeferredShape(() => nspConfigNetworkSecurityPerimeterRuleShape)),
    readOnly: true,
  },
  serviceTags: {
    armPath: ["serviceTags"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  subscriptions: {
    armPath: ["subscriptions"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
});

export interface NspConfigAssociation {
  accessMode?: string;
  name?: string;
}

export interface NspConfigAssociationInput extends InputOf<NspConfigAssociation> {}

export interface NspConfigAssociationView extends InputOf<NspConfigAssociation> {
  readonly accessMode?: Expression<string> | undefined;
  readonly name?: Expression<string> | undefined;
}

export const nspConfigAssociationShape: FlatModelShape = createFlatModelShape({
  accessMode: { armPath: ["accessMode"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
});

export interface NspConfigNetworkSecurityPerimeterRule {
  id?: string;
  location?: string;
  perimeterGuid?: string;
}

export interface NspConfigNetworkSecurityPerimeterRuleInput extends InputOf<NspConfigNetworkSecurityPerimeterRule> {}

export interface NspConfigNetworkSecurityPerimeterRuleView extends InputOf<NspConfigNetworkSecurityPerimeterRule> {
  readonly id?: Expression<string> | undefined;
  readonly location?: Expression<string> | undefined;
  readonly perimeterGuid?: Expression<string> | undefined;
}

export const nspConfigNetworkSecurityPerimeterRuleShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  perimeterGuid: { armPath: ["perimeterGuid"], value: createStringShape(), readOnly: true },
});

export interface NspConfigPerimeter {
  id?: string;
  location?: string;
  perimeterGuid?: string;
}

export interface NspConfigPerimeterInput extends InputOf<NspConfigPerimeter> {}

export interface NspConfigPerimeterView extends InputOf<NspConfigPerimeter> {
  readonly id?: Expression<string> | undefined;
  readonly location?: Expression<string> | undefined;
  readonly perimeterGuid?: Expression<string> | undefined;
}

export const nspConfigPerimeterShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  perimeterGuid: { armPath: ["perimeterGuid"], value: createStringShape(), readOnly: true },
});

export interface NspConfigProfile {
  accessRules?: NspConfigAccessRule[];
  accessRulesVersion?: string;
  name?: string;
}

export interface NspConfigProfileInput extends InputOf<NspConfigProfile> {}

export interface NspConfigProfileView extends InputOf<NspConfigProfile> {
  readonly accessRules?: Expression<NspConfigAccessRule[]> | undefined;
  readonly accessRulesVersion?: Expression<string> | undefined;
  readonly name?: Expression<string> | undefined;
}

export const nspConfigProfileShape: FlatModelShape = createFlatModelShape({
  accessRules: {
    armPath: ["accessRules"],
    value: createArrayShape(createDeferredShape(() => nspConfigAccessRuleShape)),
    readOnly: true,
  },
  accessRulesVersion: {
    armPath: ["accessRulesVersion"],
    value: createStringShape(),
    readOnly: true,
  },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
});

export interface NspProvisioningIssue {
  name?: string;
  properties?: NspProvisioningIssueProperties;
}

export interface NspProvisioningIssueInput extends InputOf<NspProvisioningIssue> {}

export interface NspProvisioningIssueView extends InputOf<NspProvisioningIssue> {
  readonly name?: Expression<string> | undefined;
  readonly properties?: Expression<NspProvisioningIssueProperties> | undefined;
}

export const nspProvisioningIssueShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => nspProvisioningIssuePropertiesShape),
    readOnly: true,
  },
});

export interface NspProvisioningIssueProperties {
  description?: string;
  issueType?: string;
  severity?: string;
  suggestedAccessRules?: string[];
  suggestedResourceIds?: string[];
}

export interface NspProvisioningIssuePropertiesInput extends InputOf<NspProvisioningIssueProperties> {}

export interface NspProvisioningIssuePropertiesView extends InputOf<NspProvisioningIssueProperties> {
  readonly description?: Expression<string> | undefined;
  readonly issueType?: Expression<string> | undefined;
  readonly severity?: Expression<string> | undefined;
  readonly suggestedAccessRules?: Expression<string[]> | undefined;
  readonly suggestedResourceIds?: Expression<string[]> | undefined;
}

export const nspProvisioningIssuePropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  issueType: { armPath: ["issueType"], value: createStringShape(), readOnly: true },
  severity: { armPath: ["severity"], value: createStringShape(), readOnly: true },
  suggestedAccessRules: {
    armPath: ["suggestedAccessRules"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  suggestedResourceIds: {
    armPath: ["suggestedResourceIds"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
});

/**
 * The properties of an outbound firewall rule.
 */
export interface OutboundFirewallRuleProperties {
  /**
   * The state of the outbound rule.
   */
  provisioningState?: string;
}

/**
 * Input type for The properties of an outbound firewall rule.
 */
export interface OutboundFirewallRulePropertiesInput extends InputOf<OutboundFirewallRuleProperties> {}

/**
 * View type for The properties of an outbound firewall rule.
 */
export interface OutboundFirewallRulePropertiesView extends InputOf<OutboundFirewallRuleProperties> {
  /**
   * Read-only output: The state of the outbound rule.
   */
  readonly provisioningState?: Expression<string> | undefined;
}

export const outboundFirewallRulePropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
});

/**
 * Partner server information for the failover group.
 */
export interface PartnerInfo {
  /**
   * Resource identifier of the partner server.
   */
  id: string;
  /**
   * Geo location of the partner server.
   */
  location?: string;
  /**
   * Replication role of the partner server.
   */
  replicationRole?: FailoverGroupReplicationRole;
}

/**
 * Input type for Partner server information for the failover group.
 */
export interface PartnerInfoInput extends InputOf<PartnerInfo> {
  /**
   * Resource identifier of the partner server.
   */
  id: ExpressionOrValue<string>;
}

/**
 * View type for Partner server information for the failover group.
 */
export interface PartnerInfoView extends InputOf<PartnerInfo> {
  /**
   * Resource identifier of the partner server.
   */
  id: ExpressionOrValue<string>;
  /**
   * Read-only output: Geo location of the partner server.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Replication role of the partner server.
   */
  readonly replicationRole?: Expression<FailoverGroupReplicationRole> | undefined;
}

export const partnerInfoShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  replicationRole: { armPath: ["replicationRole"], value: createUnionShape(), readOnly: true },
});

/**
 * Partner region information for the failover group.
 */
export interface PartnerRegionInfo {
  /**
   * Geo location of the partner managed instances.
   */
  location?: string;
  /**
   * Replication role of the partner managed instances.
   */
  replicationRole?: InstanceFailoverGroupReplicationRole;
}

/**
 * Input type for Partner region information for the failover group.
 */
export interface PartnerRegionInfoInput extends InputOf<PartnerRegionInfo> {
  /**
   * Geo location of the partner managed instances.
   */
  location?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Partner region information for the failover group.
 */
export interface PartnerRegionInfoView extends InputOf<PartnerRegionInfo> {
  /**
   * Geo location of the partner managed instances.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Replication role of the partner managed instances.
   */
  readonly replicationRole?: Expression<InstanceFailoverGroupReplicationRole> | undefined;
}

export const partnerRegionInfoShape: FlatModelShape = createFlatModelShape({
  location: { armPath: ["location"], value: createStringShape() },
  replicationRole: { armPath: ["replicationRole"], value: createUnionShape(), readOnly: true },
});

/**
 * Properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * Group IDs.
   */
  groupIds?: string[];
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: PrivateEndpointProperty;
  /**
   * Connection state of the private endpoint connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /**
   * State of the private endpoint connection.
   */
  provisioningState?: PrivateEndpointProvisioningState;
}

/**
 * Input type for Properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: PrivateEndpointPropertyInput | undefined;
  /**
   * Connection state of the private endpoint connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStatePropertyInput | undefined;
}

/**
 * View type for Properties of a private endpoint connection.
 */
export interface PrivateEndpointConnectionPropertiesView extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * Read-only output: Group IDs.
   */
  readonly groupIds?: Expression<string[]> | undefined;
  /**
   * Private endpoint which the connection belongs to.
   */
  privateEndpoint?: PrivateEndpointPropertyView | undefined;
  /**
   * Connection state of the private endpoint connection.
   */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStatePropertyView | undefined;
  /**
   * Read-only output: State of the private endpoint connection.
   */
  readonly provisioningState?: Expression<PrivateEndpointProvisioningState> | undefined;
}

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  groupIds: { armPath: ["groupIds"], value: createArrayShape(createStringShape()), readOnly: true },
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointPropertyShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => privateLinkServiceConnectionStatePropertyShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

export interface PrivateEndpointProperty {
  /**
   * Resource id of the private endpoint.
   */
  id?: string;
}

export interface PrivateEndpointPropertyInput extends InputOf<PrivateEndpointProperty> {
  /**
   * Resource id of the private endpoint.
   */
  id?: ExpressionOrValue<string> | undefined;
}

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

export interface PrivateLinkServiceConnectionStateProperty {
  /**
   * The actions required for private link service connection.
   */
  actionsRequired?: PrivateLinkServiceConnectionStateActionsRequire;
  /**
   * The private link service connection description.
   */
  description: string;
  /**
   * The private link service connection status.
   */
  status: PrivateLinkServiceConnectionStateStatus;
}

export interface PrivateLinkServiceConnectionStatePropertyInput extends InputOf<PrivateLinkServiceConnectionStateProperty> {
  /**
   * The private link service connection description.
   */
  description: ExpressionOrValue<string>;
  /**
   * The private link service connection status.
   */
  status: ExpressionOrValue<PrivateLinkServiceConnectionStateStatus>;
}

export interface PrivateLinkServiceConnectionStatePropertyView extends InputOf<PrivateLinkServiceConnectionStateProperty> {
  /**
   * Read-only output: The actions required for private link service connection.
   */
  readonly actionsRequired?:
    Expression<PrivateLinkServiceConnectionStateActionsRequire> | undefined;
  /**
   * The private link service connection description.
   */
  description: ExpressionOrValue<string>;
  /**
   * The private link service connection status.
   */
  status: ExpressionOrValue<PrivateLinkServiceConnectionStateStatus>;
}

export const privateLinkServiceConnectionStatePropertyShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"], value: createUnionShape(), readOnly: true },
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * SQL Vulnerability Assessment query check object.
 */
export interface QueryCheck {
  /**
   * SQL Vulnerability Assessment column names of query expected result.
   */
  columnNames?: string[];
  /**
   * SQL Vulnerability Assessment query expected result.
   */
  expectedResult?: string[][];
  /**
   * SQL Vulnerability Assessment rule query.
   */
  query?: string;
}

/**
 * Input type for SQL Vulnerability Assessment query check object.
 */
export interface QueryCheckInput extends InputOf<QueryCheck> {}

/**
 * View type for SQL Vulnerability Assessment query check object.
 */
export interface QueryCheckView extends InputOf<QueryCheck> {
  /**
   * Read-only output: SQL Vulnerability Assessment column names of query expected result.
   */
  readonly columnNames?: Expression<string[]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment query expected result.
   */
  readonly expectedResult?: Expression<string[][]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule query.
   */
  readonly query?: Expression<string> | undefined;
}

export const queryCheckShape: FlatModelShape = createFlatModelShape({
  columnNames: {
    armPath: ["columnNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  expectedResult: {
    armPath: ["expectedResult"],
    value: createArrayShape(createArrayShape(createStringShape())),
    readOnly: true,
  },
  query: { armPath: ["query"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a database query.
 */
export interface QueryProperties {
  /**
   * Query text.
   */
  queryText?: string;
}

/**
 * Input type for Properties of a database query.
 */
export interface QueryPropertiesInput extends InputOf<QueryProperties> {}

/**
 * View type for Properties of a database query.
 */
export interface QueryPropertiesView extends InputOf<QueryProperties> {
  /**
   * Read-only output: Query text.
   */
  readonly queryText?: Expression<string> | undefined;
}

export const queryPropertiesShape: FlatModelShape = createFlatModelShape({
  queryText: { armPath: ["queryText"], value: createStringShape(), readOnly: true },
});

/**
 * Contains error information for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionErrorInfo {
  /**
   * Gets the reason why the recommended action was put to error state. e.g., DatabaseHasQdsOff, IndexAlreadyExists
   */
  errorCode?: string;
  /**
   * Gets whether the error could be ignored and recommended action could be retried. Possible values are: Yes/No
   */
  isRetryable?: IsRetryable;
}

/**
 * Input type for Contains error information for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionErrorInfoInput extends InputOf<RecommendedActionErrorInfo> {}

/**
 * View type for Contains error information for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionErrorInfoView extends InputOf<RecommendedActionErrorInfo> {
  /**
   * Read-only output: Gets the reason why the recommended action was put to error state. e.g., DatabaseHasQdsOff, IndexAlreadyExists
   */
  readonly errorCode?: Expression<string> | undefined;
  /**
   * Read-only output: Gets whether the error could be ignored and recommended action could be retried. Possible values are: Yes/No
   */
  readonly isRetryable?: Expression<IsRetryable> | undefined;
}

export const recommendedActionErrorInfoShape: FlatModelShape = createFlatModelShape({
  errorCode: { armPath: ["errorCode"], value: createStringShape(), readOnly: true },
  isRetryable: { armPath: ["isRetryable"], value: createEnumShape(), readOnly: true },
});

/**
 * Contains information of estimated or observed impact on various metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionImpactRecord {
  /**
   * Gets the absolute value of this dimension if applicable. e.g., Number of Queries affected
   */
  absoluteValue?: number;
  /**
   * Gets the absolute change in the value of this dimension. e.g., Absolute Disk space change in Megabytes
   */
  changeValueAbsolute?: number;
  /**
   * Gets the relative change in the value of this dimension. e.g., Relative Disk space change in Percentage
   */
  changeValueRelative?: number;
  /**
   * Gets the name of the impact dimension. e.g., CPUChange, DiskSpaceChange, NumberOfQueriesAffected.
   */
  dimensionName?: string;
  /**
   * Gets the name of the impact dimension. e.g., CPUChange, DiskSpaceChange, NumberOfQueriesAffected.
   */
  unit?: string;
}

/**
 * Input type for Contains information of estimated or observed impact on various metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionImpactRecordInput extends InputOf<RecommendedActionImpactRecord> {}

/**
 * View type for Contains information of estimated or observed impact on various metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionImpactRecordView extends InputOf<RecommendedActionImpactRecord> {
  /**
   * Read-only output: Gets the absolute value of this dimension if applicable. e.g., Number of Queries affected
   */
  readonly absoluteValue?: Expression<number> | undefined;
  /**
   * Read-only output: Gets the absolute change in the value of this dimension. e.g., Absolute Disk space change in Megabytes
   */
  readonly changeValueAbsolute?: Expression<number> | undefined;
  /**
   * Read-only output: Gets the relative change in the value of this dimension. e.g., Relative Disk space change in Percentage
   */
  readonly changeValueRelative?: Expression<number> | undefined;
  /**
   * Read-only output: Gets the name of the impact dimension. e.g., CPUChange, DiskSpaceChange, NumberOfQueriesAffected.
   */
  readonly dimensionName?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the name of the impact dimension. e.g., CPUChange, DiskSpaceChange, NumberOfQueriesAffected.
   */
  readonly unit?: Expression<string> | undefined;
}

export const recommendedActionImpactRecordShape: FlatModelShape = createFlatModelShape({
  absoluteValue: { armPath: ["absoluteValue"], value: createNumberShape(), readOnly: true },
  changeValueAbsolute: {
    armPath: ["changeValueAbsolute"],
    value: createNumberShape(),
    readOnly: true,
  },
  changeValueRelative: {
    armPath: ["changeValueRelative"],
    value: createNumberShape(),
    readOnly: true,
  },
  dimensionName: { armPath: ["dimensionName"], value: createStringShape(), readOnly: true },
  unit: { armPath: ["unit"], value: createStringShape(), readOnly: true },
});

/**
 * Contains information for manual implementation for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionImplementationInfo {
  /**
   * Gets the method in which this recommended action can be manually implemented. e.g., TSql, AzurePowerShell.
   */
  method?: ImplementationMethod;
  /**
   * Gets the manual implementation script. e.g., T-SQL script that could be executed on the database.
   */
  script?: string;
}

/**
 * Input type for Contains information for manual implementation for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionImplementationInfoInput extends InputOf<RecommendedActionImplementationInfo> {}

/**
 * View type for Contains information for manual implementation for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionImplementationInfoView extends InputOf<RecommendedActionImplementationInfo> {
  /**
   * Read-only output: Gets the method in which this recommended action can be manually implemented. e.g., TSql, AzurePowerShell.
   */
  readonly method?: Expression<ImplementationMethod> | undefined;
  /**
   * Read-only output: Gets the manual implementation script. e.g., T-SQL script that could be executed on the database.
   */
  readonly script?: Expression<string> | undefined;
}

export const recommendedActionImplementationInfoShape: FlatModelShape = createFlatModelShape({
  method: { armPath: ["method"], value: createEnumShape(), readOnly: true },
  script: { armPath: ["script"], value: createStringShape(), readOnly: true },
});

/**
 * Contains time series of various impacted metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionMetricInfo {
  /**
   * Gets the name of the metric. e.g., CPU, Number of Queries.
   */
  metricName?: string;
  /**
   * Gets the start time of time interval given by this MetricInfo.
   */
  startTime?: Date;
  /**
   * Gets the duration of time interval for the value given by this MetricInfo. e.g., PT1H (1 hour)
   */
  timeGrain?: string;
  /**
   * Gets the unit in which metric is measured. e.g., DTU, Frequency
   */
  unit?: string;
  /**
   * Gets the value of the metric in the time interval given by this MetricInfo.
   */
  value?: number;
}

/**
 * Input type for Contains time series of various impacted metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionMetricInfoInput extends InputOf<RecommendedActionMetricInfo> {}

/**
 * View type for Contains time series of various impacted metrics for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionMetricInfoView extends InputOf<RecommendedActionMetricInfo> {
  /**
   * Read-only output: Gets the name of the metric. e.g., CPU, Number of Queries.
   */
  readonly metricName?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the start time of time interval given by this MetricInfo.
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets the duration of time interval for the value given by this MetricInfo. e.g., PT1H (1 hour)
   */
  readonly timeGrain?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the unit in which metric is measured. e.g., DTU, Frequency
   */
  readonly unit?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the value of the metric in the time interval given by this MetricInfo.
   */
  readonly value?: Expression<number> | undefined;
}

export const recommendedActionMetricInfoShape: FlatModelShape = createFlatModelShape({
  metricName: { armPath: ["metricName"], value: createStringShape(), readOnly: true },
  startTime: {
    armPath: ["startTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  timeGrain: { armPath: ["timeGrain"], value: createStringShape(), readOnly: true },
  unit: { armPath: ["unit"], value: createStringShape(), readOnly: true },
  value: { armPath: ["value"], value: createNumberShape(), readOnly: true },
});

/**
 * Properties for a Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionProperties {
  /**
   * Gets additional details specific to this recommended action.
   */
  details?: Record<string, string>;
  /**
   * Gets the error details if and why this recommended action is put to error state.
   */
  errorDetails?: RecommendedActionErrorInfo;
  /**
   * Gets the estimated impact info for this recommended action e.g., Estimated CPU gain, Estimated Disk Space change
   */
  estimatedImpact?: RecommendedActionImpactRecord[];
  /**
   * Gets the time taken for applying this recommended action on user resource. e.g., time taken for index creation
   */
  executeActionDuration?: string;
  /**
   * Gets if approval for applying this recommended action was given by user/system.
   */
  executeActionInitiatedBy?: RecommendedActionInitiatedBy;
  /**
   * Gets the time when this recommended action was approved for execution.
   */
  executeActionInitiatedTime?: Date;
  /**
   * Gets the time when system started applying this recommended action on the user resource. e.g., index creation start time
   */
  executeActionStartTime?: Date;
  /**
   * Gets the implementation details of this recommended action for user to apply it manually.
   */
  implementationDetails?: RecommendedActionImplementationInfo;
  /**
   * Gets if this recommended action was suggested some time ago but user chose to ignore this and system added a new recommended action again.
   */
  isArchivedAction?: boolean;
  /**
   * Gets if this recommended action is actionable by user
   */
  isExecutableAction?: boolean;
  /**
   * Gets if changes applied by this recommended action can be reverted by user
   */
  isRevertableAction?: boolean;
  /**
   * Gets time when this recommended action was last refreshed.
   */
  lastRefresh?: Date;
  /**
   * Gets the linked objects, if any.
   */
  linkedObjects?: string[];
  /**
   * Gets the observed/actual impact info for this recommended action e.g., Actual CPU gain, Actual Disk Space change
   */
  observedImpact?: RecommendedActionImpactRecord[];
  /**
   * Gets the reason for recommending this action. e.g., DuplicateIndex
   */
  recommendationReason?: string;
  /**
   * Gets the time taken for reverting changes of this recommended action on user resource. e.g., time taken for dropping the created index.
   */
  revertActionDuration?: string;
  /**
   * Gets if approval for reverting this recommended action was given by user/system.
   */
  revertActionInitiatedBy?: RecommendedActionInitiatedBy;
  /**
   * Gets the time when this recommended action was approved for revert.
   */
  revertActionInitiatedTime?: Date;
  /**
   * Gets the time when system started reverting changes of this recommended action on user resource. e.g., time when index drop is executed.
   */
  revertActionStartTime?: Date;
  /**
   * Gets the impact of this recommended action. Possible values are 1 - Low impact, 2 - Medium Impact and 3 - High Impact
   */
  score?: number;
  /**
   * Gets the info of the current state the recommended action is in.
   */
  state: RecommendedActionStateInfo;
  /**
   * Gets the time series info of metrics for this recommended action e.g., CPU consumption time series
   */
  timeSeries?: RecommendedActionMetricInfo[];
  /**
   * Gets the time since when this recommended action is valid.
   */
  validSince?: Date;
}

/**
 * Input type for Properties for a Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionPropertiesInput extends InputOf<RecommendedActionProperties> {
  /**
   * Gets the info of the current state the recommended action is in.
   */
  state: RecommendedActionStateInfoInput;
}

/**
 * View type for Properties for a Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionPropertiesView extends InputOf<RecommendedActionProperties> {
  /**
   * Read-only output: Gets additional details specific to this recommended action.
   */
  readonly details?: Expression<Record<string, string>> | undefined;
  /**
   * Read-only output: Gets the error details if and why this recommended action is put to error state.
   */
  readonly errorDetails?: Expression<RecommendedActionErrorInfo> | undefined;
  /**
   * Read-only output: Gets the estimated impact info for this recommended action e.g., Estimated CPU gain, Estimated Disk Space change
   */
  readonly estimatedImpact?: Expression<RecommendedActionImpactRecord[]> | undefined;
  /**
   * Read-only output: Gets the time taken for applying this recommended action on user resource. e.g., time taken for index creation
   */
  readonly executeActionDuration?: Expression<string> | undefined;
  /**
   * Read-only output: Gets if approval for applying this recommended action was given by user/system.
   */
  readonly executeActionInitiatedBy?: Expression<RecommendedActionInitiatedBy> | undefined;
  /**
   * Read-only output: Gets the time when this recommended action was approved for execution.
   */
  readonly executeActionInitiatedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets the time when system started applying this recommended action on the user resource. e.g., index creation start time
   */
  readonly executeActionStartTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets the implementation details of this recommended action for user to apply it manually.
   */
  readonly implementationDetails?: Expression<RecommendedActionImplementationInfo> | undefined;
  /**
   * Read-only output: Gets if this recommended action was suggested some time ago but user chose to ignore this and system added a new recommended action again.
   */
  readonly isArchivedAction?: Expression<boolean> | undefined;
  /**
   * Read-only output: Gets if this recommended action is actionable by user
   */
  readonly isExecutableAction?: Expression<boolean> | undefined;
  /**
   * Read-only output: Gets if changes applied by this recommended action can be reverted by user
   */
  readonly isRevertableAction?: Expression<boolean> | undefined;
  /**
   * Read-only output: Gets time when this recommended action was last refreshed.
   */
  readonly lastRefresh?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets the linked objects, if any.
   */
  readonly linkedObjects?: Expression<string[]> | undefined;
  /**
   * Read-only output: Gets the observed/actual impact info for this recommended action e.g., Actual CPU gain, Actual Disk Space change
   */
  readonly observedImpact?: Expression<RecommendedActionImpactRecord[]> | undefined;
  /**
   * Read-only output: Gets the reason for recommending this action. e.g., DuplicateIndex
   */
  readonly recommendationReason?: Expression<string> | undefined;
  /**
   * Read-only output: Gets the time taken for reverting changes of this recommended action on user resource. e.g., time taken for dropping the created index.
   */
  readonly revertActionDuration?: Expression<string> | undefined;
  /**
   * Read-only output: Gets if approval for reverting this recommended action was given by user/system.
   */
  readonly revertActionInitiatedBy?: Expression<RecommendedActionInitiatedBy> | undefined;
  /**
   * Read-only output: Gets the time when this recommended action was approved for revert.
   */
  readonly revertActionInitiatedTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets the time when system started reverting changes of this recommended action on user resource. e.g., time when index drop is executed.
   */
  readonly revertActionStartTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Gets the impact of this recommended action. Possible values are 1 - Low impact, 2 - Medium Impact and 3 - High Impact
   */
  readonly score?: Expression<number> | undefined;
  /**
   * Gets the info of the current state the recommended action is in.
   */
  state: RecommendedActionStateInfoView;
  /**
   * Read-only output: Gets the time series info of metrics for this recommended action e.g., CPU consumption time series
   */
  readonly timeSeries?: Expression<RecommendedActionMetricInfo[]> | undefined;
  /**
   * Read-only output: Gets the time since when this recommended action is valid.
   */
  readonly validSince?: Expression<Date> | undefined;
}

export const recommendedActionPropertiesShape: FlatModelShape = createFlatModelShape({
  details: { armPath: ["details"], value: createRecordShape(createStringShape()), readOnly: true },
  errorDetails: {
    armPath: ["errorDetails"],
    value: createDeferredShape(() => recommendedActionErrorInfoShape),
    readOnly: true,
  },
  estimatedImpact: {
    armPath: ["estimatedImpact"],
    value: createArrayShape(createDeferredShape(() => recommendedActionImpactRecordShape)),
    readOnly: true,
  },
  executeActionDuration: {
    armPath: ["executeActionDuration"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  executeActionInitiatedBy: {
    armPath: ["executeActionInitiatedBy"],
    value: createEnumShape(),
    readOnly: true,
  },
  executeActionInitiatedTime: {
    armPath: ["executeActionInitiatedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  executeActionStartTime: {
    armPath: ["executeActionStartTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  implementationDetails: {
    armPath: ["implementationDetails"],
    value: createDeferredShape(() => recommendedActionImplementationInfoShape),
    readOnly: true,
  },
  isArchivedAction: { armPath: ["isArchivedAction"], value: createBooleanShape(), readOnly: true },
  isExecutableAction: {
    armPath: ["isExecutableAction"],
    value: createBooleanShape(),
    readOnly: true,
  },
  isRevertableAction: {
    armPath: ["isRevertableAction"],
    value: createBooleanShape(),
    readOnly: true,
  },
  lastRefresh: {
    armPath: ["lastRefresh"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  linkedObjects: {
    armPath: ["linkedObjects"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  observedImpact: {
    armPath: ["observedImpact"],
    value: createArrayShape(createDeferredShape(() => recommendedActionImpactRecordShape)),
    readOnly: true,
  },
  recommendationReason: {
    armPath: ["recommendationReason"],
    value: createStringShape(),
    readOnly: true,
  },
  revertActionDuration: {
    armPath: ["revertActionDuration"],
    value: createStringShape({
      kind: "duration-iso8601",
      source: "duration",
      clientMode: "wire",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  revertActionInitiatedBy: {
    armPath: ["revertActionInitiatedBy"],
    value: createEnumShape(),
    readOnly: true,
  },
  revertActionInitiatedTime: {
    armPath: ["revertActionInitiatedTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  revertActionStartTime: {
    armPath: ["revertActionStartTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  score: { armPath: ["score"], value: createNumberShape(), readOnly: true },
  state: { armPath: ["state"], value: createDeferredShape(() => recommendedActionStateInfoShape) },
  timeSeries: {
    armPath: ["timeSeries"],
    value: createArrayShape(createDeferredShape(() => recommendedActionMetricInfoShape)),
    readOnly: true,
  },
  validSince: {
    armPath: ["validSince"],
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
 * Contains information of current state for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionStateInfo {
  /**
   * Gets who initiated the execution of this recommended action. Possible Value are: User -> When user explicity notified system to apply the recommended action. System -> When auto-execute status of this advisor was set to 'Enabled', in which case the system applied it.
   */
  actionInitiatedBy?: RecommendedActionInitiatedBy;
  /**
   * Current state the recommended action is in. Some commonly used states are: Active -> recommended action is active and no action has been taken yet. Pending -> recommended action is approved for and is awaiting execution. Executing -> recommended action is being applied on the user database. Verifying -> recommended action was applied and is being verified of its usefulness by the system. Success -> recommended action was applied and improvement found during verification. Pending Revert -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting -> changes made while applying recommended action are being reverted on the user database. Reverted -> successfully reverted the changes made by recommended action on user database. Ignored -> user explicitly ignored/discarded the recommended action.
   */
  currentValue: RecommendedActionCurrentState;
  /**
   * Gets the time when the state was last modified
   */
  lastModified?: Date;
}

/**
 * Input type for Contains information of current state for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionStateInfoInput extends InputOf<RecommendedActionStateInfo> {
  /**
   * Current state the recommended action is in. Some commonly used states are: Active -> recommended action is active and no action has been taken yet. Pending -> recommended action is approved for and is awaiting execution. Executing -> recommended action is being applied on the user database. Verifying -> recommended action was applied and is being verified of its usefulness by the system. Success -> recommended action was applied and improvement found during verification. Pending Revert -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting -> changes made while applying recommended action are being reverted on the user database. Reverted -> successfully reverted the changes made by recommended action on user database. Ignored -> user explicitly ignored/discarded the recommended action.
   */
  currentValue: ExpressionOrValue<RecommendedActionCurrentState>;
}

/**
 * View type for Contains information of current state for an Azure SQL Database, Server or Elastic Pool Recommended Action.
 */
export interface RecommendedActionStateInfoView extends InputOf<RecommendedActionStateInfo> {
  /**
   * Read-only output: Gets who initiated the execution of this recommended action. Possible Value are: User -> When user explicity notified system to apply the recommended action. System -> When auto-execute status of this advisor was set to 'Enabled', in which case the system applied it.
   */
  readonly actionInitiatedBy?: Expression<RecommendedActionInitiatedBy> | undefined;
  /**
   * Current state the recommended action is in. Some commonly used states are: Active -> recommended action is active and no action has been taken yet. Pending -> recommended action is approved for and is awaiting execution. Executing -> recommended action is being applied on the user database. Verifying -> recommended action was applied and is being verified of its usefulness by the system. Success -> recommended action was applied and improvement found during verification. Pending Revert -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting -> changes made while applying recommended action are being reverted on the user database. Reverted -> successfully reverted the changes made by recommended action on user database. Ignored -> user explicitly ignored/discarded the recommended action.
   */
  currentValue: ExpressionOrValue<RecommendedActionCurrentState>;
  /**
   * Read-only output: Gets the time when the state was last modified
   */
  readonly lastModified?: Expression<Date> | undefined;
}

export const recommendedActionStateInfoShape: FlatModelShape = createFlatModelShape({
  actionInitiatedBy: { armPath: ["actionInitiatedBy"], value: createEnumShape(), readOnly: true },
  currentValue: { armPath: ["currentValue"], value: createUnionShape() },
  lastModified: {
    armPath: ["lastModified"],
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
 * The recoverable database's properties.
 */
export interface RecoverableDatabaseProperties {
  /**
   * The edition of the database.
   */
  edition?: string;
  /**
   * The elastic pool name of the database
   */
  elasticPoolName?: string;
  /**
   * The resource ids of the user assigned identities to use
   */
  keys?: Record<string, DatabaseKey>;
  /**
   * The last available backup date.
   */
  lastAvailableBackupDate?: Date;
  /**
   * The service level objective name of the database.
   */
  serviceLevelObjective?: string;
}

/**
 * Input type for The recoverable database's properties.
 */
export interface RecoverableDatabasePropertiesInput extends InputOf<RecoverableDatabaseProperties> {}

/**
 * View type for The recoverable database's properties.
 */
export interface RecoverableDatabasePropertiesView extends InputOf<RecoverableDatabaseProperties> {
  /**
   * Read-only output: The edition of the database.
   */
  readonly edition?: Expression<string> | undefined;
  /**
   * Read-only output: The elastic pool name of the database
   */
  readonly elasticPoolName?: Expression<string> | undefined;
  /**
   * Read-only output: The resource ids of the user assigned identities to use
   */
  readonly keys?: Expression<Record<string, DatabaseKey>> | undefined;
  /**
   * Read-only output: The last available backup date.
   */
  readonly lastAvailableBackupDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The service level objective name of the database.
   */
  readonly serviceLevelObjective?: Expression<string> | undefined;
}

export const recoverableDatabasePropertiesShape: FlatModelShape = createFlatModelShape({
  edition: { armPath: ["edition"], value: createStringShape(), readOnly: true },
  elasticPoolName: { armPath: ["elasticPoolName"], value: createStringShape(), readOnly: true },
  keys: {
    armPath: ["keys"],
    value: createRecordShape(createDeferredShape(() => databaseKeyShape)),
    readOnly: true,
  },
  lastAvailableBackupDate: {
    armPath: ["lastAvailableBackupDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  serviceLevelObjective: {
    armPath: ["serviceLevelObjective"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * The recoverable managed database's properties.
 */
export interface RecoverableManagedDatabaseProperties {
  /**
   * The last available backup date.
   */
  lastAvailableBackupDate?: string;
}

/**
 * Input type for The recoverable managed database's properties.
 */
export interface RecoverableManagedDatabasePropertiesInput extends InputOf<RecoverableManagedDatabaseProperties> {}

/**
 * View type for The recoverable managed database's properties.
 */
export interface RecoverableManagedDatabasePropertiesView extends InputOf<RecoverableManagedDatabaseProperties> {
  /**
   * Read-only output: The last available backup date.
   */
  readonly lastAvailableBackupDate?: Expression<string> | undefined;
}

export const recoverableManagedDatabasePropertiesShape: FlatModelShape = createFlatModelShape({
  lastAvailableBackupDate: {
    armPath: ["lastAvailableBackupDate"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * SQL Vulnerability Assessment remediation Details.
 */
export interface Remediation {
  /**
   * SQL Vulnerability Assessment is remediation automated.
   */
  automated?: boolean;
  /**
   * SQL Vulnerability Assessment remediation description.
   */
  description?: string;
  /**
   * SQL Vulnerability Assessment optional link to remediate in Azure Portal.
   */
  portalLink?: string;
  /**
   * SQL Vulnerability Assessment remediation script.
   */
  scripts?: string[];
}

/**
 * Input type for SQL Vulnerability Assessment remediation Details.
 */
export interface RemediationInput extends InputOf<Remediation> {}

/**
 * View type for SQL Vulnerability Assessment remediation Details.
 */
export interface RemediationView extends InputOf<Remediation> {
  /**
   * Read-only output: SQL Vulnerability Assessment is remediation automated.
   */
  readonly automated?: Expression<boolean> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment remediation description.
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment optional link to remediate in Azure Portal.
   */
  readonly portalLink?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment remediation script.
   */
  readonly scripts?: Expression<string[]> | undefined;
}

export const remediationShape: FlatModelShape = createFlatModelShape({
  automated: { armPath: ["automated"], value: createBooleanShape(), readOnly: true },
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  portalLink: { armPath: ["portalLink"], value: createStringShape(), readOnly: true },
  scripts: { armPath: ["scripts"], value: createArrayShape(createStringShape()), readOnly: true },
});

/**
 * Properties of a replication link.
 */
export interface ReplicationLinkProperties {
  /**
   * Whether the user is currently allowed to terminate the link.
   */
  isTerminationAllowed?: boolean;
  /**
   * Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED.
   */
  linkType?: ReplicationLinkType;
  /**
   * Resource partner database.
   */
  partnerDatabase?: string;
  /**
   * Resource partner database Id.
   */
  partnerDatabaseId?: string;
  /**
   * Resource partner location.
   */
  partnerLocation?: string;
  /**
   * Partner replication role.
   */
  partnerRole?: ReplicationRole;
  /**
   * Resource partner server.
   */
  partnerServer?: string;
  /**
   * Seeding completion percentage for the link.
   */
  percentComplete?: number;
  /**
   * Replication mode.
   */
  replicationMode?: string;
  /**
   * Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED).
   */
  replicationState?: ReplicationState;
  /**
   * Local replication role.
   */
  role?: ReplicationRole;
  /**
   * Time at which the link was created.
   */
  startTime?: Date;
}

/**
 * Input type for Properties of a replication link.
 */
export interface ReplicationLinkPropertiesInput extends InputOf<ReplicationLinkProperties> {
  /**
   * Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED.
   */
  linkType?: ExpressionOrValue<ReplicationLinkType> | undefined;
}

/**
 * View type for Properties of a replication link.
 */
export interface ReplicationLinkPropertiesView extends InputOf<ReplicationLinkProperties> {
  /**
   * Read-only output: Whether the user is currently allowed to terminate the link.
   */
  readonly isTerminationAllowed?: Expression<boolean> | undefined;
  /**
   * Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED.
   */
  linkType?: ExpressionOrValue<ReplicationLinkType> | undefined;
  /**
   * Read-only output: Resource partner database.
   */
  readonly partnerDatabase?: Expression<string> | undefined;
  /**
   * Read-only output: Resource partner database Id.
   */
  readonly partnerDatabaseId?: Expression<string> | undefined;
  /**
   * Read-only output: Resource partner location.
   */
  readonly partnerLocation?: Expression<string> | undefined;
  /**
   * Read-only output: Partner replication role.
   */
  readonly partnerRole?: Expression<ReplicationRole> | undefined;
  /**
   * Read-only output: Resource partner server.
   */
  readonly partnerServer?: Expression<string> | undefined;
  /**
   * Read-only output: Seeding completion percentage for the link.
   */
  readonly percentComplete?: Expression<number> | undefined;
  /**
   * Read-only output: Replication mode.
   */
  readonly replicationMode?: Expression<string> | undefined;
  /**
   * Read-only output: Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED).
   */
  readonly replicationState?: Expression<ReplicationState> | undefined;
  /**
   * Read-only output: Local replication role.
   */
  readonly role?: Expression<ReplicationRole> | undefined;
  /**
   * Read-only output: Time at which the link was created.
   */
  readonly startTime?: Expression<Date> | undefined;
}

export const replicationLinkPropertiesShape: FlatModelShape = createFlatModelShape({
  isTerminationAllowed: {
    armPath: ["isTerminationAllowed"],
    value: createBooleanShape(),
    readOnly: true,
  },
  linkType: { armPath: ["linkType"], value: createUnionShape() },
  partnerDatabase: { armPath: ["partnerDatabase"], value: createStringShape(), readOnly: true },
  partnerDatabaseId: { armPath: ["partnerDatabaseId"], value: createStringShape(), readOnly: true },
  partnerLocation: { armPath: ["partnerLocation"], value: createStringShape(), readOnly: true },
  partnerRole: { armPath: ["partnerRole"], value: createEnumShape(), readOnly: true },
  partnerServer: { armPath: ["partnerServer"], value: createStringShape(), readOnly: true },
  percentComplete: { armPath: ["percentComplete"], value: createNumberShape(), readOnly: true },
  replicationMode: { armPath: ["replicationMode"], value: createStringShape(), readOnly: true },
  replicationState: { armPath: ["replicationState"], value: createUnionShape(), readOnly: true },
  role: { armPath: ["role"], value: createEnumShape(), readOnly: true },
  startTime: {
    armPath: ["startTime"],
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
 * Azure Active Directory identity configuration for a resource.
 */
export interface ResourceIdentity {
  /**
   * The Azure Active Directory principal id.
   */
  principalId?: string;
  /**
   * The Azure Active Directory tenant id.
   */
  tenantId?: string;
  /**
   * The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource.
   */
  type?: IdentityType;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?: Record<string, UserIdentity>;
}

/**
 * Input type for Azure Active Directory identity configuration for a resource.
 */
export interface ResourceIdentityInput extends InputOf<ResourceIdentity> {
  /**
   * The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource.
   */
  type?: ExpressionOrValue<IdentityType> | undefined;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?: InputRecord<UserIdentityInput, Record<string, UserIdentity>> | undefined;
}

/**
 * View type for Azure Active Directory identity configuration for a resource.
 */
export interface ResourceIdentityView extends InputOf<ResourceIdentity> {
  /**
   * Read-only output: The Azure Active Directory principal id.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The Azure Active Directory tenant id.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource.
   */
  type?: ExpressionOrValue<IdentityType> | undefined;
  /**
   * The resource ids of the user assigned identities to use
   */
  userAssignedIdentities?: InputRecord<UserIdentityView, Record<string, UserIdentity>> | undefined;
}

export const resourceIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userIdentityShape)),
  },
});

/**
 * The restorable dropped database's properties.
 */
export interface RestorableDroppedDatabaseProperties {
  /**
   * The storage account type used to store backups for this database.
   */
  backupStorageRedundancy?: BackupStorageRedundancy;
  /**
   * The creation date of the database (ISO8601 format).
   */
  creationDate?: Date;
  /**
   * The name of the database.
   */
  databaseName?: string;
  /**
   * The deletion date of the database (ISO8601 format).
   */
  deletionDate?: Date;
  /**
   * The earliest restore date of the database (ISO8601 format).
   */
  earliestRestoreDate?: Date;
  /**
   * The resource ids of the user assigned identities to use
   */
  keys?: Record<string, DatabaseKey>;
  /**
   * The max size of the database expressed in bytes.
   */
  maxSizeBytes?: number;
}

/**
 * Input type for The restorable dropped database's properties.
 */
export interface RestorableDroppedDatabasePropertiesInput extends InputOf<RestorableDroppedDatabaseProperties> {}

/**
 * View type for The restorable dropped database's properties.
 */
export interface RestorableDroppedDatabasePropertiesView extends InputOf<RestorableDroppedDatabaseProperties> {
  /**
   * Read-only output: The storage account type used to store backups for this database.
   */
  readonly backupStorageRedundancy?: Expression<BackupStorageRedundancy> | undefined;
  /**
   * Read-only output: The creation date of the database (ISO8601 format).
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The name of the database.
   */
  readonly databaseName?: Expression<string> | undefined;
  /**
   * Read-only output: The deletion date of the database (ISO8601 format).
   */
  readonly deletionDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The earliest restore date of the database (ISO8601 format).
   */
  readonly earliestRestoreDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The resource ids of the user assigned identities to use
   */
  readonly keys?: Expression<Record<string, DatabaseKey>> | undefined;
  /**
   * Read-only output: The max size of the database expressed in bytes.
   */
  readonly maxSizeBytes?: Expression<number> | undefined;
}

export const restorableDroppedDatabasePropertiesShape: FlatModelShape = createFlatModelShape({
  backupStorageRedundancy: {
    armPath: ["backupStorageRedundancy"],
    value: createUnionShape(),
    readOnly: true,
  },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  databaseName: { armPath: ["databaseName"], value: createStringShape(), readOnly: true },
  deletionDate: {
    armPath: ["deletionDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  earliestRestoreDate: {
    armPath: ["earliestRestoreDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  keys: {
    armPath: ["keys"],
    value: createRecordShape(createDeferredShape(() => databaseKeyShape)),
    readOnly: true,
  },
  maxSizeBytes: { armPath: ["maxSizeBytes"], value: createNumberShape(), readOnly: true },
});

/**
 * The restorable dropped managed database's properties.
 */
export interface RestorableDroppedManagedDatabaseProperties {
  /**
   * The creation date of the database (ISO8601 format).
   */
  creationDate?: Date;
  /**
   * The name of the database.
   */
  databaseName?: string;
  /**
   * The deletion date of the database (ISO8601 format).
   */
  deletionDate?: Date;
  /**
   * The earliest restore date of the database (ISO8601 format).
   */
  earliestRestoreDate?: Date;
}

/**
 * Input type for The restorable dropped managed database's properties.
 */
export interface RestorableDroppedManagedDatabasePropertiesInput extends InputOf<RestorableDroppedManagedDatabaseProperties> {}

/**
 * View type for The restorable dropped managed database's properties.
 */
export interface RestorableDroppedManagedDatabasePropertiesView extends InputOf<RestorableDroppedManagedDatabaseProperties> {
  /**
   * Read-only output: The creation date of the database (ISO8601 format).
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The name of the database.
   */
  readonly databaseName?: Expression<string> | undefined;
  /**
   * Read-only output: The deletion date of the database (ISO8601 format).
   */
  readonly deletionDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The earliest restore date of the database (ISO8601 format).
   */
  readonly earliestRestoreDate?: Expression<Date> | undefined;
}

export const restorableDroppedManagedDatabasePropertiesShape: FlatModelShape = createFlatModelShape(
  {
    creationDate: {
      armPath: ["creationDate"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    databaseName: { armPath: ["databaseName"], value: createStringShape(), readOnly: true },
    deletionDate: {
      armPath: ["deletionDate"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    earliestRestoreDate: {
      armPath: ["earliestRestoreDate"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
  },
);

/**
 * Properties of a database restore point
 */
export interface RestorePointProperties {
  /**
   * The earliest time to which this database can be restored
   */
  earliestRestoreDate?: Date;
  /**
   * The time the backup was taken
   */
  restorePointCreationDate?: Date;
  /**
   * The label of restore point for backup request by user
   */
  restorePointLabel?: string;
  /**
   * The type of restore point
   */
  restorePointType?: RestorePointType;
}

/**
 * Input type for Properties of a database restore point
 */
export interface RestorePointPropertiesInput extends InputOf<RestorePointProperties> {}

/**
 * View type for Properties of a database restore point
 */
export interface RestorePointPropertiesView extends InputOf<RestorePointProperties> {
  /**
   * Read-only output: The earliest time to which this database can be restored
   */
  readonly earliestRestoreDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The time the backup was taken
   */
  readonly restorePointCreationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The label of restore point for backup request by user
   */
  readonly restorePointLabel?: Expression<string> | undefined;
  /**
   * Read-only output: The type of restore point
   */
  readonly restorePointType?: Expression<RestorePointType> | undefined;
}

export const restorePointPropertiesShape: FlatModelShape = createFlatModelShape({
  earliestRestoreDate: {
    armPath: ["earliestRestoreDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  restorePointCreationDate: {
    armPath: ["restorePointCreationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  restorePointLabel: { armPath: ["restorePointLabel"], value: createStringShape(), readOnly: true },
  restorePointType: { armPath: ["restorePointType"], value: createEnumShape(), readOnly: true },
});

/**
 * Schedule info describing when the server should be started or stopped.
 */
export interface ScheduleItem {
  /**
   * Start day.
   */
  startDay: DayOfWeek;
  /**
   * Start time.
   */
  startTime: string;
  /**
   * Stop day.
   */
  stopDay: DayOfWeek;
  /**
   * Stop time.
   */
  stopTime: string;
}

/**
 * Input type for Schedule info describing when the server should be started or stopped.
 */
export interface ScheduleItemInput extends InputOf<ScheduleItem> {
  /**
   * Start day.
   */
  startDay: ExpressionOrValue<DayOfWeek>;
  /**
   * Start time.
   */
  startTime: ExpressionOrValue<string>;
  /**
   * Stop day.
   */
  stopDay: ExpressionOrValue<DayOfWeek>;
  /**
   * Stop time.
   */
  stopTime: ExpressionOrValue<string>;
}

/**
 * View type for Schedule info describing when the server should be started or stopped.
 */
export type ScheduleItemView = ScheduleItemInput;

export const scheduleItemShape: FlatModelShape = createFlatModelShape({
  startDay: { armPath: ["startDay"], value: createUnionShape() },
  startTime: { armPath: ["startTime"], value: createStringShape() },
  stopDay: { armPath: ["stopDay"], value: createUnionShape() },
  stopTime: { armPath: ["stopTime"], value: createStringShape() },
});

/**
 * Properties of a security alert policy.
 */
export interface SecurityAlertPolicyProperties {
  /**
   * Specifies the UTC creation time of the policy.
   */
  creationTime?: Date;
  /**
   * Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force
   */
  disabledAlerts?: string[];
  /**
   * Specifies that the alert is sent to the account administrators.
   */
  emailAccountAdmins?: boolean;
  /**
   * Specifies an array of e-mail addresses to which the alert is sent.
   */
  emailAddresses?: string[];
  /**
   * Specifies the number of days to keep in the Threat Detection audit logs.
   */
  retentionDays?: number;
  /**
   * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
   */
  state: SecurityAlertPolicyState;
  /**
   * Specifies the identifier key of the Threat Detection audit storage account.
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of a security alert policy.
 */
export interface SecurityAlertPolicyPropertiesInput extends InputOf<SecurityAlertPolicyProperties> {
  /**
   * Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force
   */
  disabledAlerts?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies that the alert is sent to the account administrators.
   */
  emailAccountAdmins?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies an array of e-mail addresses to which the alert is sent.
   */
  emailAddresses?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies the number of days to keep in the Threat Detection audit logs.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
   */
  state: ExpressionOrValue<SecurityAlertPolicyState>;
  /**
   * Specifies the identifier key of the Threat Detection audit storage account.
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a security alert policy.
 */
export interface SecurityAlertPolicyPropertiesView extends InputOf<SecurityAlertPolicyProperties> {
  /**
   * Read-only output: Specifies the UTC creation time of the policy.
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force
   */
  disabledAlerts?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies that the alert is sent to the account administrators.
   */
  emailAccountAdmins?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies an array of e-mail addresses to which the alert is sent.
   */
  emailAddresses?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies the number of days to keep in the Threat Detection audit logs.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
   */
  state: ExpressionOrValue<SecurityAlertPolicyState>;
  /**
   * Specifies the identifier key of the Threat Detection audit storage account.
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

export const securityAlertPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
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
  disabledAlerts: { armPath: ["disabledAlerts"], value: createArrayShape(createStringShape()) },
  emailAccountAdmins: { armPath: ["emailAccountAdmins"], value: createBooleanShape() },
  emailAddresses: { armPath: ["emailAddresses"], value: createArrayShape(createStringShape()) },
  retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
  state: { armPath: ["state"], value: createEnumShape() },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
});

/**
 * Properties of a security alert policy.
 */
export interface SecurityAlertsPolicyProperties {
  /**
   * Specifies the UTC creation time of the policy.
   */
  creationTime?: Date;
  /**
   * Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force
   */
  disabledAlerts?: string[];
  /**
   * Specifies that the alert is sent to the account administrators.
   */
  emailAccountAdmins?: boolean;
  /**
   * Specifies an array of e-mail addresses to which the alert is sent.
   */
  emailAddresses?: string[];
  /**
   * Specifies the number of days to keep in the Threat Detection audit logs.
   */
  retentionDays?: number;
  /**
   * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
   */
  state: SecurityAlertsPolicyState;
  /**
   * Specifies the identifier key of the Threat Detection audit storage account.
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of a security alert policy.
 */
export interface SecurityAlertsPolicyPropertiesInput extends InputOf<SecurityAlertsPolicyProperties> {
  /**
   * Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force
   */
  disabledAlerts?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies that the alert is sent to the account administrators.
   */
  emailAccountAdmins?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies an array of e-mail addresses to which the alert is sent.
   */
  emailAddresses?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies the number of days to keep in the Threat Detection audit logs.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
   */
  state: ExpressionOrValue<SecurityAlertsPolicyState>;
  /**
   * Specifies the identifier key of the Threat Detection audit storage account.
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a security alert policy.
 */
export interface SecurityAlertsPolicyPropertiesView extends InputOf<SecurityAlertsPolicyProperties> {
  /**
   * Read-only output: Specifies the UTC creation time of the policy.
   */
  readonly creationTime?: Expression<Date> | undefined;
  /**
   * Specifies an array of alerts that are disabled. Allowed values are: Sql_Injection, Sql_Injection_Vulnerability, Access_Anomaly, Data_Exfiltration, Unsafe_Action, Brute_Force
   */
  disabledAlerts?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies that the alert is sent to the account administrators.
   */
  emailAccountAdmins?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies an array of e-mail addresses to which the alert is sent.
   */
  emailAddresses?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies the number of days to keep in the Threat Detection audit logs.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the policy, whether it is enabled or disabled or a policy has not been applied yet on the specific database.
   */
  state: ExpressionOrValue<SecurityAlertsPolicyState>;
  /**
   * Specifies the identifier key of the Threat Detection audit storage account.
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). This blob storage will hold all Threat Detection audit logs.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

export const securityAlertsPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
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
  disabledAlerts: { armPath: ["disabledAlerts"], value: createArrayShape(createStringShape()) },
  emailAccountAdmins: { armPath: ["emailAccountAdmins"], value: createBooleanShape() },
  emailAddresses: { armPath: ["emailAddresses"], value: createArrayShape(createStringShape()) },
  retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
  state: { armPath: ["state"], value: createEnumShape() },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
});

/**
 * Properties of a sensitivity label.
 */
export interface SensitivityLabelProperties {
  clientClassificationSource?: ClientClassificationSource;
  /**
   * The column name.
   */
  columnName?: string;
  /**
   * The information type.
   */
  informationType?: string;
  /**
   * The information type ID.
   */
  informationTypeId?: string;
  /**
   * Is sensitivity recommendation disabled. Applicable for recommended sensitivity label only. Specifies whether the sensitivity recommendation on this column is disabled (dismissed) or not.
   */
  isDisabled?: boolean;
  /**
   * The label ID.
   */
  labelId?: string;
  /**
   * The label name.
   */
  labelName?: string;
  rank?: SensitivityLabelRank;
  /**
   * The schema name.
   */
  schemaName?: string;
  /**
   * The table name.
   */
  tableName?: string;
}

/**
 * Input type for Properties of a sensitivity label.
 */
export interface SensitivityLabelPropertiesInput extends InputOf<SensitivityLabelProperties> {
  clientClassificationSource?: ExpressionOrValue<ClientClassificationSource> | undefined;
  /**
   * The information type.
   */
  informationType?: ExpressionOrValue<string> | undefined;
  /**
   * The information type ID.
   */
  informationTypeId?: ExpressionOrValue<string> | undefined;
  /**
   * The label ID.
   */
  labelId?: ExpressionOrValue<string> | undefined;
  /**
   * The label name.
   */
  labelName?: ExpressionOrValue<string> | undefined;
  rank?: ExpressionOrValue<SensitivityLabelRank> | undefined;
}

/**
 * View type for Properties of a sensitivity label.
 */
export interface SensitivityLabelPropertiesView extends InputOf<SensitivityLabelProperties> {
  clientClassificationSource?: ExpressionOrValue<ClientClassificationSource> | undefined;
  /**
   * Read-only output: The column name.
   */
  readonly columnName?: Expression<string> | undefined;
  /**
   * The information type.
   */
  informationType?: ExpressionOrValue<string> | undefined;
  /**
   * The information type ID.
   */
  informationTypeId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Is sensitivity recommendation disabled. Applicable for recommended sensitivity label only. Specifies whether the sensitivity recommendation on this column is disabled (dismissed) or not.
   */
  readonly isDisabled?: Expression<boolean> | undefined;
  /**
   * The label ID.
   */
  labelId?: ExpressionOrValue<string> | undefined;
  /**
   * The label name.
   */
  labelName?: ExpressionOrValue<string> | undefined;
  rank?: ExpressionOrValue<SensitivityLabelRank> | undefined;
  /**
   * Read-only output: The schema name.
   */
  readonly schemaName?: Expression<string> | undefined;
  /**
   * Read-only output: The table name.
   */
  readonly tableName?: Expression<string> | undefined;
}

export const sensitivityLabelPropertiesShape: FlatModelShape = createFlatModelShape({
  clientClassificationSource: {
    armPath: ["clientClassificationSource"],
    value: createUnionShape(),
  },
  columnName: { armPath: ["columnName"], value: createStringShape(), readOnly: true },
  informationType: { armPath: ["informationType"], value: createStringShape() },
  informationTypeId: { armPath: ["informationTypeId"], value: createStringShape() },
  isDisabled: { armPath: ["isDisabled"], value: createBooleanShape(), readOnly: true },
  labelId: { armPath: ["labelId"], value: createStringShape() },
  labelName: { armPath: ["labelName"], value: createStringShape() },
  rank: { armPath: ["rank"], value: createEnumShape() },
  schemaName: { armPath: ["schemaName"], value: createStringShape(), readOnly: true },
  tableName: { armPath: ["tableName"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a server blob auditing policy.
 */
export interface ServerBlobAuditingPolicyProperties {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: string[];
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * **Note:** This field will soon be deprecated. Going forward, use the dedicated Server DevOps Audit Settings APIs to configure DevOps audit. See:
   *
   * - [Server DevOps Audit Settings - Create Or Update](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/create-or-update)
   * - [Server DevOps Audit Settings - Get](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/get)
   *
   * ---
   *
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: boolean;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: boolean;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: boolean;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: number;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: number;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: BlobAuditingPolicyState;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of a server blob auditing policy.
 */
export interface ServerBlobAuditingPolicyPropertiesInput extends InputOf<ServerBlobAuditingPolicyProperties> {
  /**
   * Specifies the Actions-Groups and Actions to audit.
   *
   * The recommended set of action groups to use is the following combination - this will audit all the queries and stored procedures executed against the database, as well as successful and failed logins:
   *
   * BATCH_COMPLETED_GROUP,
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP,
   * FAILED_DATABASE_AUTHENTICATION_GROUP.
   *
   * This above combination is also the set that is configured by default when enabling auditing from the Azure portal.
   *
   * The supported action groups to audit are (note: choose only specific groups that cover your auditing needs. Using unnecessary groups could lead to very large quantities of audit records):
   *
   * APPLICATION_ROLE_CHANGE_PASSWORD_GROUP
   * BACKUP_RESTORE_GROUP
   * DATABASE_LOGOUT_GROUP
   * DATABASE_OBJECT_CHANGE_GROUP
   * DATABASE_OBJECT_OWNERSHIP_CHANGE_GROUP
   * DATABASE_OBJECT_PERMISSION_CHANGE_GROUP
   * DATABASE_OPERATION_GROUP
   * DATABASE_PERMISSION_CHANGE_GROUP
   * DATABASE_PRINCIPAL_CHANGE_GROUP
   * DATABASE_PRINCIPAL_IMPERSONATION_GROUP
   * DATABASE_ROLE_MEMBER_CHANGE_GROUP
   * FAILED_DATABASE_AUTHENTICATION_GROUP
   * SCHEMA_OBJECT_ACCESS_GROUP
   * SCHEMA_OBJECT_CHANGE_GROUP
   * SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP
   * SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP
   * SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP
   * USER_CHANGE_PASSWORD_GROUP
   * BATCH_STARTED_GROUP
   * BATCH_COMPLETED_GROUP
   * DBCC_GROUP
   * DATABASE_OWNERSHIP_CHANGE_GROUP
   * DATABASE_CHANGE_GROUP
   * LEDGER_OPERATION_GROUP
   *
   * These are groups that cover all sql statements and stored procedures executed against the database, and should not be used in combination with other groups as this will result in duplicate audit logs.
   *
   * For more information, see [Database-Level Audit Action Groups](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-action-groups).
   *
   * For Database auditing policy, specific Actions can also be specified (note that Actions cannot be specified for Server auditing policy). The supported actions to audit are:
   * SELECT
   * UPDATE
   * INSERT
   * DELETE
   * EXECUTE
   * RECEIVE
   * REFERENCES
   *
   * The general form for defining an action to be audited is:
   * {action} ON {object} BY {principal}
   *
   * Note that <object> in the above format can refer to an object like a table, view, or stored procedure, or an entire database or schema. For the latter cases, the forms DATABASE::{db_name} and SCHEMA::{schema_name} are used, respectively.
   *
   * For example:
   * SELECT on dbo.myTable by public
   * SELECT on DATABASE::myDatabase by public
   * SELECT on SCHEMA::mySchema by public
   *
   * For more information, see [Database-Level Audit Actions](https://docs.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions#database-level-audit-actions)
   */
  auditActionsAndGroups?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies whether audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'SQLSecurityAuditEvents' diagnostic logs category on the database should be also created.
   * Note that for server level audit you should use the 'master' database as {databaseName}.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * **Note:** This field will soon be deprecated. Going forward, use the dedicated Server DevOps Audit Settings APIs to configure DevOps audit. See:
   *
   * - [Server DevOps Audit Settings - Create Or Update](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/create-or-update)
   * - [Server DevOps Audit Settings - Get](https://learn.microsoft.com/en-us/rest/api/sql/server-devops-audit-settings/get)
   *
   * ---
   *
   * Specifies the state of devops audit. If state is Enabled, devops logs will be sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled', 'IsAzureMonitorTargetEnabled' as true and 'IsDevopsAuditEnabled' as true
   *
   * When using REST API to configure auditing, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should also be created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isDevopsAuditEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether storageAccountAccessKey value is the storage's secondary key.
   */
  isStorageSecondaryKeyInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies the amount of time in milliseconds that can elapse before audit actions are forced to be processed.
   * The default minimum value is 1000 (1 second). The maximum is 2,147,483,647.
   */
  queueDelayMs?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the number of days to keep in the audit logs in the storage account.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: ExpressionOrValue<BlobAuditingPolicyState>;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a server blob auditing policy.
 */
export type ServerBlobAuditingPolicyPropertiesView = ServerBlobAuditingPolicyPropertiesInput;

export const serverBlobAuditingPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  auditActionsAndGroups: {
    armPath: ["auditActionsAndGroups"],
    value: createArrayShape(createStringShape()),
  },
  isAzureMonitorTargetEnabled: {
    armPath: ["isAzureMonitorTargetEnabled"],
    value: createBooleanShape(),
  },
  isDevopsAuditEnabled: { armPath: ["isDevopsAuditEnabled"], value: createBooleanShape() },
  isManagedIdentityInUse: { armPath: ["isManagedIdentityInUse"], value: createBooleanShape() },
  isStorageSecondaryKeyInUse: {
    armPath: ["isStorageSecondaryKeyInUse"],
    value: createBooleanShape(),
  },
  queueDelayMs: { armPath: ["queueDelayMs"], value: createNumberShape() },
  retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
  state: { armPath: ["state"], value: createEnumShape() },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageAccountSubscriptionId: {
    armPath: ["storageAccountSubscriptionId"],
    value: createStringShape(),
  },
  storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
});

/**
 * The properties of server configuration option.
 */
export interface ServerConfigurationOptionProperties {
  /**
   * Provisioning state of server configuration option.
   */
  provisioningState?: ProvisioningState;
  /**
   * Value of the server configuration option.
   */
  serverConfigurationOptionValue: number;
}

/**
 * Input type for The properties of server configuration option.
 */
export interface ServerConfigurationOptionPropertiesInput extends InputOf<ServerConfigurationOptionProperties> {
  /**
   * Value of the server configuration option.
   */
  serverConfigurationOptionValue: ExpressionOrValue<number>;
}

/**
 * View type for The properties of server configuration option.
 */
export interface ServerConfigurationOptionPropertiesView extends InputOf<ServerConfigurationOptionProperties> {
  /**
   * Read-only output: Provisioning state of server configuration option.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Value of the server configuration option.
   */
  serverConfigurationOptionValue: ExpressionOrValue<number>;
}

export const serverConfigurationOptionPropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  serverConfigurationOptionValue: {
    armPath: ["serverConfigurationOptionValue"],
    value: createNumberShape(),
  },
});

/**
 * The properties of a server connection policy.
 */
export interface ServerConnectionPolicyProperties {
  /**
   * The server connection type.
   */
  connectionType: ServerConnectionType;
}

/**
 * Input type for The properties of a server connection policy.
 */
export interface ServerConnectionPolicyPropertiesInput extends InputOf<ServerConnectionPolicyProperties> {
  /**
   * The server connection type.
   */
  connectionType: ExpressionOrValue<ServerConnectionType>;
}

/**
 * View type for The properties of a server connection policy.
 */
export type ServerConnectionPolicyPropertiesView = ServerConnectionPolicyPropertiesInput;

export const serverConnectionPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  connectionType: { armPath: ["connectionType"], value: createUnionShape() },
});

/**
 * Properties of a server DevOps audit settings.
 */
export interface ServerDevOpsAuditSettingsProperties {
  /**
   * Specifies whether DevOps audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure DevOps audit, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should be also created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: boolean;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: boolean;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: BlobAuditingPolicyState;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: string;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: string;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: string;
}

/**
 * Input type for Properties of a server DevOps audit settings.
 */
export interface ServerDevOpsAuditSettingsPropertiesInput extends InputOf<ServerDevOpsAuditSettingsProperties> {
  /**
   * Specifies whether DevOps audit events are sent to Azure Monitor.
   * In order to send the events to Azure Monitor, specify 'State' as 'Enabled' and 'IsAzureMonitorTargetEnabled' as true.
   *
   * When using REST API to configure DevOps audit, Diagnostic Settings with 'DevOpsOperationsAudit' diagnostic logs category on the master database should be also created.
   *
   * Diagnostic Settings URI format:
   * PUT https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Sql/servers/{serverName}/databases/master/providers/microsoft.insights/diagnosticSettings/{settingsName}?api-version=2017-05-01-preview
   *
   * For more information, see [Diagnostic Settings REST API](https://go.microsoft.com/fwlink/?linkid=2033207)
   * or [Diagnostic Settings PowerShell](https://go.microsoft.com/fwlink/?linkid=2033043)
   */
  isAzureMonitorTargetEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies whether Managed Identity is used to access blob storage
   */
  isManagedIdentityInUse?: ExpressionOrValue<boolean> | undefined;
  /**
   * Specifies the state of the audit. If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled are required.
   */
  state: ExpressionOrValue<BlobAuditingPolicyState>;
  /**
   * Specifies the identifier key of the auditing storage account.
   * If state is Enabled and storageEndpoint is specified, not specifying the storageAccountAccessKey will use SQL server system-assigned managed identity to access the storage.
   * Prerequisites for using managed identity authentication:
   * 1. Assign SQL Server a system-assigned managed identity in Azure Active Directory (AAD).
   * 2. Grant SQL Server identity access to the storage account by adding 'Storage Blob Data Contributor' RBAC role to the server identity.
   * For more information, see [Auditing to storage using Managed Identity authentication](https://go.microsoft.com/fwlink/?linkid=2114355)
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage subscription Id.
   */
  storageAccountSubscriptionId?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the blob storage endpoint (e.g. https://MyAccount.blob.core.windows.net). If state is Enabled, storageEndpoint or isAzureMonitorTargetEnabled is required.
   */
  storageEndpoint?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a server DevOps audit settings.
 */
export type ServerDevOpsAuditSettingsPropertiesView = ServerDevOpsAuditSettingsPropertiesInput;

export const serverDevOpsAuditSettingsPropertiesShape: FlatModelShape = createFlatModelShape({
  isAzureMonitorTargetEnabled: {
    armPath: ["isAzureMonitorTargetEnabled"],
    value: createBooleanShape(),
  },
  isManagedIdentityInUse: { armPath: ["isManagedIdentityInUse"], value: createBooleanShape() },
  state: { armPath: ["state"], value: createEnumShape() },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageAccountSubscriptionId: {
    armPath: ["storageAccountSubscriptionId"],
    value: createStringShape(),
  },
  storageEndpoint: { armPath: ["storageEndpoint"], value: createStringShape() },
});

/**
 * Properties of a server DNS alias.
 */
export interface ServerDnsAliasProperties {
  /**
   * The fully qualified DNS record for alias
   */
  azureDnsRecord?: string;
}

/**
 * Input type for Properties of a server DNS alias.
 */
export interface ServerDnsAliasPropertiesInput extends InputOf<ServerDnsAliasProperties> {}

/**
 * View type for Properties of a server DNS alias.
 */
export interface ServerDnsAliasPropertiesView extends InputOf<ServerDnsAliasProperties> {
  /**
   * Read-only output: The fully qualified DNS record for alias
   */
  readonly azureDnsRecord?: Expression<string> | undefined;
}

export const serverDnsAliasPropertiesShape: FlatModelShape = createFlatModelShape({
  azureDnsRecord: { armPath: ["azureDnsRecord"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a active directory administrator.
 */
export interface ServerExternalAdministrator {
  /**
   * Type of the sever administrator.
   */
  administratorType?: AdministratorType;
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication?: boolean;
  /**
   * Login name of the server administrator.
   */
  login?: string;
  /**
   * Principal Type of the sever administrator.
   */
  principalType?: PrincipalType;
  /**
   * SID (object ID) of the server administrator.
   */
  sid?: string;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: string;
}

/**
 * Input type for Properties of a active directory administrator.
 */
export interface ServerExternalAdministratorInput extends InputOf<ServerExternalAdministrator> {
  /**
   * Type of the sever administrator.
   */
  administratorType?: ExpressionOrValue<AdministratorType> | undefined;
  /**
   * Azure Active Directory only Authentication enabled.
   */
  azureAdOnlyAuthentication?: ExpressionOrValue<boolean> | undefined;
  /**
   * Login name of the server administrator.
   */
  login?: ExpressionOrValue<string> | undefined;
  /**
   * Principal Type of the sever administrator.
   */
  principalType?: ExpressionOrValue<PrincipalType> | undefined;
  /**
   * SID (object ID) of the server administrator.
   */
  sid?: ExpressionOrValue<string> | undefined;
  /**
   * Tenant ID of the administrator.
   */
  tenantId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a active directory administrator.
 */
export type ServerExternalAdministratorView = ServerExternalAdministratorInput;

export const serverExternalAdministratorShape: FlatModelShape = createFlatModelShape({
  administratorType: { armPath: ["administratorType"], value: createUnionShape() },
  azureAdOnlyAuthentication: {
    armPath: ["azureADOnlyAuthentication"],
    value: createBooleanShape(),
  },
  login: { armPath: ["login"], value: createStringShape() },
  principalType: { armPath: ["principalType"], value: createUnionShape() },
  sid: { armPath: ["sid"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

/**
 * The properties of a server firewall rule.
 */
export interface ServerFirewallRuleProperties {
  /**
   * The end IP address of the firewall rule. Must be IPv4 format. Must be greater than or equal to startIpAddress. Use value '0.0.0.0' for all Azure-internal IP addresses.
   */
  endIpAddress?: string;
  /**
   * The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses.
   */
  startIpAddress?: string;
}

/**
 * Input type for The properties of a server firewall rule.
 */
export interface ServerFirewallRulePropertiesInput extends InputOf<ServerFirewallRuleProperties> {
  /**
   * The end IP address of the firewall rule. Must be IPv4 format. Must be greater than or equal to startIpAddress. Use value '0.0.0.0' for all Azure-internal IP addresses.
   */
  endIpAddress?: ExpressionOrValue<string> | undefined;
  /**
   * The start IP address of the firewall rule. Must be IPv4 format. Use value '0.0.0.0' for all Azure-internal IP addresses.
   */
  startIpAddress?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a server firewall rule.
 */
export type ServerFirewallRulePropertiesView = ServerFirewallRulePropertiesInput;

export const serverFirewallRulePropertiesShape: FlatModelShape = createFlatModelShape({
  endIpAddress: { armPath: ["endIpAddress"], value: createStringShape() },
  startIpAddress: { armPath: ["startIpAddress"], value: createStringShape() },
});

/**
 * Server info for the server trust group.
 */
export interface ServerInfo {
  /**
   * Server Id.
   */
  serverId: string;
}

/**
 * Input type for Server info for the server trust group.
 */
export interface ServerInfoInput extends InputOf<ServerInfo> {
  /**
   * Server Id.
   */
  serverId: ExpressionOrValue<string>;
}

/**
 * View type for Server info for the server trust group.
 */
export type ServerInfoView = ServerInfoInput;

export const serverInfoShape: FlatModelShape = createFlatModelShape({
  serverId: { armPath: ["serverId"], value: createStringShape() },
});

/**
 * Properties for a server key execution.
 */
export interface ServerKeyProperties {
  /**
   * Key auto rotation opt-in flag. Either true or false.
   */
  autoRotationEnabled?: boolean;
  /**
   * The server key creation date.
   */
  creationDate?: Date;
  /**
   * The version of the server key.
   */
  keyVersion?: string;
  /**
   * The server key type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ServerKeyType;
  /**
   * Subregion of the server key.
   */
  subregion?: string;
  /**
   * Thumbprint of the server key.
   */
  thumbprint?: string;
  /**
   * The URI of the server key. If the ServerKeyType is AzureKeyVault, then the URI is required. The AKV URI is required to be in this format: 'https://YourVaultName.vault.azure.net/keys/YourKeyName/YourKeyVersion' or can be 'https://YourVaultName.vault.azure.net/keys/YourKeyName'
   */
  uri?: string;
}

/**
 * Input type for Properties for a server key execution.
 */
export interface ServerKeyPropertiesInput extends InputOf<ServerKeyProperties> {
  /**
   * The server key type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
  /**
   * The URI of the server key. If the ServerKeyType is AzureKeyVault, then the URI is required. The AKV URI is required to be in this format: 'https://YourVaultName.vault.azure.net/keys/YourKeyName/YourKeyVersion' or can be 'https://YourVaultName.vault.azure.net/keys/YourKeyName'
   */
  uri?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties for a server key execution.
 */
export interface ServerKeyPropertiesView extends InputOf<ServerKeyProperties> {
  /**
   * Read-only output: Key auto rotation opt-in flag. Either true or false.
   */
  readonly autoRotationEnabled?: Expression<boolean> | undefined;
  /**
   * Read-only output: The server key creation date.
   */
  readonly creationDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The version of the server key.
   */
  readonly keyVersion?: Expression<string> | undefined;
  /**
   * The server key type like 'ServiceManaged', 'AzureKeyVault'.
   */
  serverKeyType: ExpressionOrValue<ServerKeyType>;
  /**
   * Read-only output: Subregion of the server key.
   */
  readonly subregion?: Expression<string> | undefined;
  /**
   * Read-only output: Thumbprint of the server key.
   */
  readonly thumbprint?: Expression<string> | undefined;
  /**
   * The URI of the server key. If the ServerKeyType is AzureKeyVault, then the URI is required. The AKV URI is required to be in this format: 'https://YourVaultName.vault.azure.net/keys/YourKeyName/YourKeyVersion' or can be 'https://YourVaultName.vault.azure.net/keys/YourKeyName'
   */
  uri?: ExpressionOrValue<string> | undefined;
}

export const serverKeyPropertiesShape: FlatModelShape = createFlatModelShape({
  autoRotationEnabled: {
    armPath: ["autoRotationEnabled"],
    value: createBooleanShape(),
    readOnly: true,
  },
  creationDate: {
    armPath: ["creationDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  keyVersion: { armPath: ["keyVersion"], value: createStringShape(), readOnly: true },
  serverKeyType: { armPath: ["serverKeyType"], value: createUnionShape() },
  subregion: { armPath: ["subregion"], value: createStringShape(), readOnly: true },
  thumbprint: { armPath: ["thumbprint"], value: createStringShape(), readOnly: true },
  uri: { armPath: ["uri"], value: createStringShape() },
});

/**
 * The properties of a server.
 */
export interface ServerProperties {
  /**
   * Administrator username for the server. Once created it cannot be changed.
   */
  administratorLogin?: string;
  /**
   * The administrator login password (required for server creation).
   */
  administratorLoginPassword?: string;
  /**
   * The Azure Active Directory administrator can be utilized during server creation and for server updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used.
   */
  administrators?: ServerExternalAdministrator;
  /**
   * Create mode for server, only valid values for this are Normal and Restore.
   */
  createMode?: ServerCreateMode;
  /**
   * Status of external governance.
   */
  externalGovernanceStatus?: ExternalGovernanceStatus;
  /**
   * The Client id used for cross tenant CMK scenario
   */
  federatedClientId?: string;
  /**
   * The fully qualified domain name of the server.
   */
  fullyQualifiedDomainName?: string;
  /**
   * Whether or not to enable IPv6 support for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  isIPv6Enabled?: ServerNetworkAccessFlag;
  /**
   * A CMK URI of the key to use for encryption.
   */
  keyId?: string;
  /**
   * Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3'
   */
  minimalTlsVersion?: MinimalTlsVersion;
  /**
   * The resource id of a user assigned identity to be used by default.
   */
  primaryUserAssignedIdentityId?: string;
  /**
   * List of private endpoint connections on a server
   */
  privateEndpointConnections?: SqlServerPrivateEndpointConnection[];
  /**
   * Whether or not public endpoint access is allowed for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter'
   */
  publicNetworkAccess?: ServerPublicNetworkAccessFlag;
  /**
   * Whether or not to restrict outbound network access for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  restrictOutboundNetworkAccess?: ServerNetworkAccessFlag;
  /**
   * Number of days this server will stay soft-deleted.
   */
  retentionDays?: number;
  /**
   * The state of the server.
   */
  state?: string;
  /**
   * The version of the server.
   */
  version?: string;
  /**
   * Whether or not existing server has a workspace created and if it allows connection from workspace
   */
  workspaceFeature?: ServerWorkspaceFeature;
}

/**
 * Input type for The properties of a server.
 */
export interface ServerPropertiesInput extends InputOf<ServerProperties> {
  /**
   * Administrator username for the server. Once created it cannot be changed.
   */
  administratorLogin?: ExpressionOrValue<string> | undefined;
  /**
   * The administrator login password (required for server creation).
   */
  administratorLoginPassword?: ExpressionOrValue<string> | undefined;
  /**
   * The Azure Active Directory administrator can be utilized during server creation and for server updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used.
   */
  administrators?: ServerExternalAdministratorInput | undefined;
  /**
   * Create mode for server, only valid values for this are Normal and Restore.
   */
  createMode?: ExpressionOrValue<ServerCreateMode> | undefined;
  /**
   * The Client id used for cross tenant CMK scenario
   */
  federatedClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not to enable IPv6 support for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  isIPv6Enabled?: ExpressionOrValue<ServerNetworkAccessFlag> | undefined;
  /**
   * A CMK URI of the key to use for encryption.
   */
  keyId?: ExpressionOrValue<string> | undefined;
  /**
   * Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3'
   */
  minimalTlsVersion?: ExpressionOrValue<MinimalTlsVersion> | undefined;
  /**
   * The resource id of a user assigned identity to be used by default.
   */
  primaryUserAssignedIdentityId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether or not public endpoint access is allowed for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter'
   */
  publicNetworkAccess?: ExpressionOrValue<ServerPublicNetworkAccessFlag> | undefined;
  /**
   * Whether or not to restrict outbound network access for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  restrictOutboundNetworkAccess?: ExpressionOrValue<ServerNetworkAccessFlag> | undefined;
  /**
   * Number of days this server will stay soft-deleted.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * The version of the server.
   */
  version?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a server.
 */
export interface ServerPropertiesView extends InputOf<ServerProperties> {
  /**
   * Administrator username for the server. Once created it cannot be changed.
   */
  administratorLogin?: ExpressionOrValue<string> | undefined;
  /**
   * The administrator login password (required for server creation).
   */
  administratorLoginPassword?: ExpressionOrValue<string> | undefined;
  /**
   * The Azure Active Directory administrator can be utilized during server creation and for server updates, except for the azureADOnlyAuthentication property. To update the azureADOnlyAuthentication property, individual API must be used.
   */
  administrators?: ServerExternalAdministratorView | undefined;
  /**
   * Create mode for server, only valid values for this are Normal and Restore.
   */
  createMode?: ExpressionOrValue<ServerCreateMode> | undefined;
  /**
   * Read-only output: Status of external governance.
   */
  readonly externalGovernanceStatus?: Expression<ExternalGovernanceStatus> | undefined;
  /**
   * The Client id used for cross tenant CMK scenario
   */
  federatedClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The fully qualified domain name of the server.
   */
  readonly fullyQualifiedDomainName?: Expression<string> | undefined;
  /**
   * Whether or not to enable IPv6 support for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  isIPv6Enabled?: ExpressionOrValue<ServerNetworkAccessFlag> | undefined;
  /**
   * A CMK URI of the key to use for encryption.
   */
  keyId?: ExpressionOrValue<string> | undefined;
  /**
   * Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3'
   */
  minimalTlsVersion?: ExpressionOrValue<MinimalTlsVersion> | undefined;
  /**
   * The resource id of a user assigned identity to be used by default.
   */
  primaryUserAssignedIdentityId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: List of private endpoint connections on a server
   */
  readonly privateEndpointConnections?:
    Expression<SqlServerPrivateEndpointConnection[]> | undefined;
  /**
   * Whether or not public endpoint access is allowed for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter'
   */
  publicNetworkAccess?: ExpressionOrValue<ServerPublicNetworkAccessFlag> | undefined;
  /**
   * Whether or not to restrict outbound network access for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
   */
  restrictOutboundNetworkAccess?: ExpressionOrValue<ServerNetworkAccessFlag> | undefined;
  /**
   * Number of days this server will stay soft-deleted.
   */
  retentionDays?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The state of the server.
   */
  readonly state?: Expression<string> | undefined;
  /**
   * The version of the server.
   */
  version?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Whether or not existing server has a workspace created and if it allows connection from workspace
   */
  readonly workspaceFeature?: Expression<ServerWorkspaceFeature> | undefined;
}

export const serverPropertiesShape: FlatModelShape = createFlatModelShape({
  administratorLogin: { armPath: ["administratorLogin"], value: createStringShape() },
  administratorLoginPassword: {
    armPath: ["administratorLoginPassword"],
    value: createStringShape(),
  },
  administrators: {
    armPath: ["administrators"],
    value: createDeferredShape(() => serverExternalAdministratorShape),
  },
  createMode: { armPath: ["createMode"], value: createUnionShape() },
  externalGovernanceStatus: {
    armPath: ["externalGovernanceStatus"],
    value: createUnionShape(),
    readOnly: true,
  },
  federatedClientId: { armPath: ["federatedClientId"], value: createStringShape() },
  fullyQualifiedDomainName: {
    armPath: ["fullyQualifiedDomainName"],
    value: createStringShape(),
    readOnly: true,
  },
  isIPv6Enabled: { armPath: ["isIPv6Enabled"], value: createUnionShape() },
  keyId: { armPath: ["keyId"], value: createStringShape() },
  minimalTlsVersion: { armPath: ["minimalTlsVersion"], value: createUnionShape() },
  primaryUserAssignedIdentityId: {
    armPath: ["primaryUserAssignedIdentityId"],
    value: createStringShape(),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => sqlServerPrivateEndpointConnectionShape)),
    readOnly: true,
  },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  restrictOutboundNetworkAccess: {
    armPath: ["restrictOutboundNetworkAccess"],
    value: createUnionShape(),
  },
  retentionDays: { armPath: ["retentionDays"], value: createNumberShape() },
  state: { armPath: ["state"], value: createStringShape(), readOnly: true },
  version: { armPath: ["version"], value: createStringShape() },
  workspaceFeature: { armPath: ["workspaceFeature"], value: createUnionShape(), readOnly: true },
});

/**
 * The properties of a server trust certificate.
 */
export interface ServerTrustCertificateProperties {
  /**
   * The certificate name
   */
  certificateName?: string;
  /**
   * The certificate public blob
   */
  publicBlob?: string;
  /**
   * The certificate thumbprint
   */
  thumbprint?: string;
}

/**
 * Input type for The properties of a server trust certificate.
 */
export interface ServerTrustCertificatePropertiesInput extends InputOf<ServerTrustCertificateProperties> {
  /**
   * The certificate public blob
   */
  publicBlob?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a server trust certificate.
 */
export interface ServerTrustCertificatePropertiesView extends InputOf<ServerTrustCertificateProperties> {
  /**
   * Read-only output: The certificate name
   */
  readonly certificateName?: Expression<string> | undefined;
  /**
   * The certificate public blob
   */
  publicBlob?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The certificate thumbprint
   */
  readonly thumbprint?: Expression<string> | undefined;
}

export const serverTrustCertificatePropertiesShape: FlatModelShape = createFlatModelShape({
  certificateName: { armPath: ["certificateName"], value: createStringShape(), readOnly: true },
  publicBlob: { armPath: ["publicBlob"], value: createStringShape() },
  thumbprint: { armPath: ["thumbprint"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a server trust group.
 */
export interface ServerTrustGroupProperties {
  /**
   * Group members information for the server trust group.
   */
  groupMembers: ServerInfo[];
  /**
   * Trust scope of the server trust group.
   */
  trustScopes: ServerTrustGroupPropertiesTrustScopesItem[];
}

/**
 * Input type for Properties of a server trust group.
 */
export interface ServerTrustGroupPropertiesInput extends InputOf<ServerTrustGroupProperties> {
  /**
   * Group members information for the server trust group.
   */
  groupMembers: InputArray<ServerInfoInput, ServerInfo[]>;
  /**
   * Trust scope of the server trust group.
   */
  trustScopes: InputArray<
    ExpressionOrValue<ServerTrustGroupPropertiesTrustScopesItem>,
    ServerTrustGroupPropertiesTrustScopesItem[]
  >;
}

/**
 * View type for Properties of a server trust group.
 */
export type ServerTrustGroupPropertiesView = ServerTrustGroupPropertiesInput;

export const serverTrustGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  groupMembers: {
    armPath: ["groupMembers"],
    value: createArrayShape(createDeferredShape(() => serverInfoShape)),
  },
  trustScopes: { armPath: ["trustScopes"], value: createArrayShape(createUnionShape()) },
});

/**
 * Properties of a server Vulnerability Assessment.
 */
export interface ServerVulnerabilityAssessmentProperties {
  /**
   * The recurring scans settings
   */
  recurringScans?: VulnerabilityAssessmentRecurringScansProperties;
  /**
   * Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageAccountAccessKey?: string;
  /**
   * A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).
   */
  storageContainerPath: string;
  /**
   * A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageContainerSasKey?: string;
}

/**
 * Input type for Properties of a server Vulnerability Assessment.
 */
export interface ServerVulnerabilityAssessmentPropertiesInput extends InputOf<ServerVulnerabilityAssessmentProperties> {
  /**
   * The recurring scans settings
   */
  recurringScans?: VulnerabilityAssessmentRecurringScansPropertiesInput | undefined;
  /**
   * Specifies the identifier key of the storage account for vulnerability assessment scan results. If 'StorageContainerSasKey' isn't specified, storageAccountAccessKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageAccountAccessKey?: ExpressionOrValue<string> | undefined;
  /**
   * A blob storage container path to hold the scan results (e.g. https://myStorage.blob.core.windows.net/VaScans/).
   */
  storageContainerPath: ExpressionOrValue<string>;
  /**
   * A shared access signature (SAS Key) that has write access to the blob container specified in 'storageContainerPath' parameter. If 'storageAccountAccessKey' isn't specified, StorageContainerSasKey is required. Applies only if the storage account is not behind a Vnet or a firewall
   */
  storageContainerSasKey?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a server Vulnerability Assessment.
 */
export type ServerVulnerabilityAssessmentPropertiesView =
  ServerVulnerabilityAssessmentPropertiesInput;

export const serverVulnerabilityAssessmentPropertiesShape: FlatModelShape = createFlatModelShape({
  recurringScans: {
    armPath: ["recurringScans"],
    value: createDeferredShape(() => vulnerabilityAssessmentRecurringScansPropertiesShape),
  },
  storageAccountAccessKey: { armPath: ["storageAccountAccessKey"], value: createStringShape() },
  storageContainerPath: { armPath: ["storageContainerPath"], value: createStringShape() },
  storageContainerSasKey: { armPath: ["storageContainerSasKey"], value: createStringShape() },
});

/**
 * The managed instance's service principal configuration for a resource.
 */
export interface ServicePrincipal {
  /**
   * The Azure Active Directory application client id.
   */
  clientId?: string;
  /**
   * The Azure Active Directory application object id.
   */
  principalId?: string;
  /**
   * The Azure Active Directory tenant id.
   */
  tenantId?: string;
  /**
   * Service principal type.
   */
  type?: ServicePrincipalType;
}

/**
 * Input type for The managed instance's service principal configuration for a resource.
 */
export interface ServicePrincipalInput extends InputOf<ServicePrincipal> {
  /**
   * Service principal type.
   */
  type?: ExpressionOrValue<ServicePrincipalType> | undefined;
}

/**
 * View type for The managed instance's service principal configuration for a resource.
 */
export interface ServicePrincipalView extends InputOf<ServicePrincipal> {
  /**
   * Read-only output: The Azure Active Directory application client id.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The Azure Active Directory application object id.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The Azure Active Directory tenant id.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Service principal type.
   */
  type?: ExpressionOrValue<ServicePrincipalType> | undefined;
}

export const servicePrincipalShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * An ARM Resource SKU.
 */
export interface Sku {
  /**
   * Capacity of the particular SKU.
   */
  capacity?: number;
  /**
   * If the service has different generations of hardware, for the same SKU, then that can be captured here.
   */
  family?: string;
  /**
   * The name of the SKU, typically, a letter + Number code, e.g. P3.
   */
  name: string;
  /**
   * Size of the particular SKU
   */
  size?: string;
  /**
   * The tier or edition of the particular SKU, e.g. Basic, Premium.
   */
  tier?: string;
}

/**
 * Input type for An ARM Resource SKU.
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * Capacity of the particular SKU.
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * If the service has different generations of hardware, for the same SKU, then that can be captured here.
   */
  family?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the SKU, typically, a letter + Number code, e.g. P3.
   */
  name: ExpressionOrValue<string>;
  /**
   * Size of the particular SKU
   */
  size?: ExpressionOrValue<string> | undefined;
  /**
   * The tier or edition of the particular SKU, e.g. Basic, Premium.
   */
  tier?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for An ARM Resource SKU.
 */
export type SkuView = SkuInput;

export const skuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  family: { armPath: ["family"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
  size: { armPath: ["size"], value: createStringShape() },
  tier: { armPath: ["tier"], value: createStringShape() },
});

/**
 * Sql agent configuration properties.
 */
export interface SqlAgentConfigurationProperties {
  /**
   * The state of Sql Agent.
   */
  state?: SqlAgentConfigurationPropertiesState;
}

/**
 * Input type for Sql agent configuration properties.
 */
export interface SqlAgentConfigurationPropertiesInput extends InputOf<SqlAgentConfigurationProperties> {
  /**
   * The state of Sql Agent.
   */
  state?: ExpressionOrValue<SqlAgentConfigurationPropertiesState> | undefined;
}

/**
 * View type for Sql agent configuration properties.
 */
export type SqlAgentConfigurationPropertiesView = SqlAgentConfigurationPropertiesInput;

export const sqlAgentConfigurationPropertiesShape: FlatModelShape = createFlatModelShape({
  state: { armPath: ["state"], value: createUnionShape() },
});

/**
 * Database, Server or Elastic Pool Recommended Action.
 */
export interface SqlRecommendedAction {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * Resource kind.
   */
  kind?: string;
  /**
   * Resource location.
   */
  location?: string;
  /**
   * The name of Database Recommended Action.
   */
  name?: string;
  /**
   * Resource properties.
   */
  properties?: RecommendedActionProperties;
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
 * Input type for Database, Server or Elastic Pool Recommended Action.
 */
export interface SqlRecommendedActionInput extends InputOf<SqlRecommendedAction> {
  /**
   * Resource properties.
   */
  properties?: RecommendedActionPropertiesInput | undefined;
}

/**
 * View type for Database, Server or Elastic Pool Recommended Action.
 */
export interface SqlRecommendedActionView extends InputOf<SqlRecommendedAction> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Resource kind.
   */
  readonly kind?: Expression<string> | undefined;
  /**
   * Read-only output: Resource location.
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: The name of Database Recommended Action.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: RecommendedActionPropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const sqlRecommendedActionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  kind: { armPath: ["kind"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => recommendedActionPropertiesShape),
  },
  systemData: {
    armPath: ["systemData"],
    value: createDeferredShape(() => systemDataShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * A private endpoint connection under a server
 */
export interface SqlServerPrivateEndpointConnection {
  /**
   * Resource ID.
   */
  id?: string;
  /**
   * Private endpoint connection properties
   */
  properties?: PrivateEndpointConnectionProperties;
}

/**
 * Input type for A private endpoint connection under a server
 */
export interface SqlServerPrivateEndpointConnectionInput extends InputOf<SqlServerPrivateEndpointConnection> {}

/**
 * View type for A private endpoint connection under a server
 */
export interface SqlServerPrivateEndpointConnectionView extends InputOf<SqlServerPrivateEndpointConnection> {
  /**
   * Read-only output: Resource ID.
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Private endpoint connection properties
   */
  readonly properties?: Expression<PrivateEndpointConnectionProperties> | undefined;
}

export const sqlServerPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
    readOnly: true,
  },
});

export interface SqlVulnerabilityAssessmentPolicyProperties {
  /**
   * Specifies the state of the SQL Vulnerability Assessment, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
   */
  state?: SqlVulnerabilityAssessmentState;
}

export interface SqlVulnerabilityAssessmentPolicyPropertiesInput extends InputOf<SqlVulnerabilityAssessmentPolicyProperties> {
  /**
   * Specifies the state of the SQL Vulnerability Assessment, whether it is enabled or disabled or a state has not been applied yet on the specific database or server.
   */
  state?: ExpressionOrValue<SqlVulnerabilityAssessmentState> | undefined;
}

export type SqlVulnerabilityAssessmentPolicyPropertiesView =
  SqlVulnerabilityAssessmentPolicyPropertiesInput;

export const sqlVulnerabilityAssessmentPolicyPropertiesShape: FlatModelShape = createFlatModelShape(
  {
    state: { armPath: ["state"], value: createEnumShape() },
  },
);

/**
 * Properties of a vulnerability assessment scan error.
 */
export interface SqlVulnerabilityAssessmentScanError {
  /**
   * The error code.
   */
  code?: string;
  /**
   * The error message.
   */
  message?: string;
}

/**
 * Input type for Properties of a vulnerability assessment scan error.
 */
export interface SqlVulnerabilityAssessmentScanErrorInput extends InputOf<SqlVulnerabilityAssessmentScanError> {}

/**
 * View type for Properties of a vulnerability assessment scan error.
 */
export interface SqlVulnerabilityAssessmentScanErrorView extends InputOf<SqlVulnerabilityAssessmentScanError> {
  /**
   * Read-only output: The error code.
   */
  readonly code?: Expression<string> | undefined;
  /**
   * Read-only output: The error message.
   */
  readonly message?: Expression<string> | undefined;
}

export const sqlVulnerabilityAssessmentScanErrorShape: FlatModelShape = createFlatModelShape({
  code: { armPath: ["code"], value: createStringShape(), readOnly: true },
  message: { armPath: ["message"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a vulnerability assessment scan record.
 */
export interface SqlVulnerabilityAssessmentScanRecordProperties {
  /**
   * The database name.
   */
  database?: string;
  /**
   * The scan end time (UTC).
   */
  endTime?: Date;
  /**
   * The scan errors.
   */
  errors?: SqlVulnerabilityAssessmentScanError[];
  /**
   * The number of failed rules with high severity.
   */
  highSeverityFailedRulesCount?: number;
  /**
   * Baseline created for this database, and has one or more rules.
   */
  isBaselineApplied?: boolean;
  /**
   * The last scan time.
   */
  lastScanTime?: Date;
  /**
   * The number of failed rules with low severity.
   */
  lowSeverityFailedRulesCount?: number;
  /**
   * The number of failed rules with medium severity.
   */
  mediumSeverityFailedRulesCount?: number;
  /**
   * The scan ID.
   */
  scanId?: string;
  /**
   * The server name.
   */
  server?: string;
  /**
   * The SQL version.
   */
  sqlVersion?: string;
  /**
   * The scan start time (UTC).
   */
  startTime?: Date;
  /**
   * The scan status.
   */
  state?: VulnerabilityAssessmentScanState;
  /**
   * The number of total failed rules.
   */
  totalFailedRulesCount?: number;
  /**
   * The number of total passed rules.
   */
  totalPassedRulesCount?: number;
  /**
   * The number of total rules assessed.
   */
  totalRulesCount?: number;
  /**
   * The scan trigger type.
   */
  triggerType?: VulnerabilityAssessmentScanTriggerType;
}

/**
 * Input type for Properties of a vulnerability assessment scan record.
 */
export interface SqlVulnerabilityAssessmentScanRecordPropertiesInput extends InputOf<SqlVulnerabilityAssessmentScanRecordProperties> {}

/**
 * View type for Properties of a vulnerability assessment scan record.
 */
export interface SqlVulnerabilityAssessmentScanRecordPropertiesView extends InputOf<SqlVulnerabilityAssessmentScanRecordProperties> {
  /**
   * Read-only output: The database name.
   */
  readonly database?: Expression<string> | undefined;
  /**
   * Read-only output: The scan end time (UTC).
   */
  readonly endTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The scan errors.
   */
  readonly errors?: Expression<SqlVulnerabilityAssessmentScanError[]> | undefined;
  /**
   * Read-only output: The number of failed rules with high severity.
   */
  readonly highSeverityFailedRulesCount?: Expression<number> | undefined;
  /**
   * Read-only output: Baseline created for this database, and has one or more rules.
   */
  readonly isBaselineApplied?: Expression<boolean> | undefined;
  /**
   * Read-only output: The last scan time.
   */
  readonly lastScanTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The number of failed rules with low severity.
   */
  readonly lowSeverityFailedRulesCount?: Expression<number> | undefined;
  /**
   * Read-only output: The number of failed rules with medium severity.
   */
  readonly mediumSeverityFailedRulesCount?: Expression<number> | undefined;
  /**
   * Read-only output: The scan ID.
   */
  readonly scanId?: Expression<string> | undefined;
  /**
   * Read-only output: The server name.
   */
  readonly server?: Expression<string> | undefined;
  /**
   * Read-only output: The SQL version.
   */
  readonly sqlVersion?: Expression<string> | undefined;
  /**
   * Read-only output: The scan start time (UTC).
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The scan status.
   */
  readonly state?: Expression<VulnerabilityAssessmentScanState> | undefined;
  /**
   * Read-only output: The number of total failed rules.
   */
  readonly totalFailedRulesCount?: Expression<number> | undefined;
  /**
   * Read-only output: The number of total passed rules.
   */
  readonly totalPassedRulesCount?: Expression<number> | undefined;
  /**
   * Read-only output: The number of total rules assessed.
   */
  readonly totalRulesCount?: Expression<number> | undefined;
  /**
   * Read-only output: The scan trigger type.
   */
  readonly triggerType?: Expression<VulnerabilityAssessmentScanTriggerType> | undefined;
}

export const sqlVulnerabilityAssessmentScanRecordPropertiesShape: FlatModelShape =
  createFlatModelShape({
    database: { armPath: ["database"], value: createStringShape(), readOnly: true },
    endTime: {
      armPath: ["endTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    errors: {
      armPath: ["errors"],
      value: createArrayShape(createDeferredShape(() => sqlVulnerabilityAssessmentScanErrorShape)),
      readOnly: true,
    },
    highSeverityFailedRulesCount: {
      armPath: ["highSeverityFailedRulesCount"],
      value: createNumberShape(),
      readOnly: true,
    },
    isBaselineApplied: {
      armPath: ["isBaselineApplied"],
      value: createBooleanShape(),
      readOnly: true,
    },
    lastScanTime: {
      armPath: ["lastScanTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    lowSeverityFailedRulesCount: {
      armPath: ["lowSeverityFailedRulesCount"],
      value: createNumberShape(),
      readOnly: true,
    },
    mediumSeverityFailedRulesCount: {
      armPath: ["mediumSeverityFailedRulesCount"],
      value: createNumberShape(),
      readOnly: true,
    },
    scanId: { armPath: ["scanId"], value: createStringShape(), readOnly: true },
    server: { armPath: ["server"], value: createStringShape(), readOnly: true },
    sqlVersion: { armPath: ["sqlVersion"], value: createStringShape(), readOnly: true },
    startTime: {
      armPath: ["startTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
    totalFailedRulesCount: {
      armPath: ["totalFailedRulesCount"],
      value: createNumberShape(),
      readOnly: true,
    },
    totalPassedRulesCount: {
      armPath: ["totalPassedRulesCount"],
      value: createNumberShape(),
      readOnly: true,
    },
    totalRulesCount: { armPath: ["totalRulesCount"], value: createNumberShape(), readOnly: true },
    triggerType: { armPath: ["triggerType"], value: createUnionShape(), readOnly: true },
  });

/**
 * SQL Vulnerability Assessment scan result properties for a single rule.
 */
export interface SqlVulnerabilityAssessmentScanResultProperties {
  /**
   * SQL Vulnerability Assessment rule result adjusted with baseline.
   */
  baselineAdjustedResult?: BaselineAdjustedResult;
  /**
   * SQL Vulnerability Assessment error message.
   */
  errorMessage?: string;
  /**
   * SQL Vulnerability Assessment is the query results trimmed.
   */
  isTrimmed?: boolean;
  /**
   * SQL Vulnerability Assessment query results that was run.
   */
  queryResults?: string[][];
  /**
   * SQL Vulnerability Assessment the remediation details.
   */
  remediation?: Remediation;
  /**
   * SQL Vulnerability Assessment rule Id.
   */
  ruleId?: string;
  /**
   * SQL Vulnerability Assessment rule metadata.
   */
  ruleMetadata?: VaRule;
  /**
   * SQL Vulnerability Assessment rule result status.
   */
  status?: RuleStatus;
}

/**
 * Input type for SQL Vulnerability Assessment scan result properties for a single rule.
 */
export interface SqlVulnerabilityAssessmentScanResultPropertiesInput extends InputOf<SqlVulnerabilityAssessmentScanResultProperties> {}

/**
 * View type for SQL Vulnerability Assessment scan result properties for a single rule.
 */
export interface SqlVulnerabilityAssessmentScanResultPropertiesView extends InputOf<SqlVulnerabilityAssessmentScanResultProperties> {
  /**
   * Read-only output: SQL Vulnerability Assessment rule result adjusted with baseline.
   */
  readonly baselineAdjustedResult?: Expression<BaselineAdjustedResult> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment error message.
   */
  readonly errorMessage?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment is the query results trimmed.
   */
  readonly isTrimmed?: Expression<boolean> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment query results that was run.
   */
  readonly queryResults?: Expression<string[][]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment the remediation details.
   */
  readonly remediation?: Expression<Remediation> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule Id.
   */
  readonly ruleId?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule metadata.
   */
  readonly ruleMetadata?: Expression<VaRule> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule result status.
   */
  readonly status?: Expression<RuleStatus> | undefined;
}

export const sqlVulnerabilityAssessmentScanResultPropertiesShape: FlatModelShape =
  createFlatModelShape({
    baselineAdjustedResult: {
      armPath: ["baselineAdjustedResult"],
      value: createDeferredShape(() => baselineAdjustedResultShape),
      readOnly: true,
    },
    errorMessage: { armPath: ["errorMessage"], value: createStringShape(), readOnly: true },
    isTrimmed: { armPath: ["isTrimmed"], value: createBooleanShape(), readOnly: true },
    queryResults: {
      armPath: ["queryResults"],
      value: createArrayShape(createArrayShape(createStringShape())),
      readOnly: true,
    },
    remediation: {
      armPath: ["remediation"],
      value: createDeferredShape(() => remediationShape),
      readOnly: true,
    },
    ruleId: { armPath: ["ruleId"], value: createStringShape(), readOnly: true },
    ruleMetadata: {
      armPath: ["ruleMetadata"],
      value: createDeferredShape(() => vaRuleShape),
      readOnly: true,
    },
    status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
  });

/**
 * Properties of managed instance's Start/Stop schedule.
 */
export interface StartStopManagedInstanceScheduleProperties {
  /**
   * The description of the schedule.
   */
  description?: string;
  /**
   * Timestamp when the next action will be executed in the corresponding schedule time zone.
   */
  nextExecutionTime?: string;
  /**
   * Next action to be executed (Start or Stop)
   */
  nextRunAction?: string;
  /**
   * Schedule list.
   */
  scheduleList: ScheduleItem[];
  /**
   * The time zone of the schedule.
   */
  timeZoneId?: string;
}

/**
 * Input type for Properties of managed instance's Start/Stop schedule.
 */
export interface StartStopManagedInstanceSchedulePropertiesInput extends InputOf<StartStopManagedInstanceScheduleProperties> {
  /**
   * The description of the schedule.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Schedule list.
   */
  scheduleList: InputArray<ScheduleItemInput, ScheduleItem[]>;
  /**
   * The time zone of the schedule.
   */
  timeZoneId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of managed instance's Start/Stop schedule.
 */
export interface StartStopManagedInstanceSchedulePropertiesView extends InputOf<StartStopManagedInstanceScheduleProperties> {
  /**
   * The description of the schedule.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Timestamp when the next action will be executed in the corresponding schedule time zone.
   */
  readonly nextExecutionTime?: Expression<string> | undefined;
  /**
   * Read-only output: Next action to be executed (Start or Stop)
   */
  readonly nextRunAction?: Expression<string> | undefined;
  /**
   * Schedule list.
   */
  scheduleList: InputArray<ScheduleItemView, ScheduleItem[]>;
  /**
   * The time zone of the schedule.
   */
  timeZoneId?: ExpressionOrValue<string> | undefined;
}

export const startStopManagedInstanceSchedulePropertiesShape: FlatModelShape = createFlatModelShape(
  {
    description: { armPath: ["description"], value: createStringShape() },
    nextExecutionTime: {
      armPath: ["nextExecutionTime"],
      value: createStringShape(),
      readOnly: true,
    },
    nextRunAction: { armPath: ["nextRunAction"], value: createStringShape(), readOnly: true },
    scheduleList: {
      armPath: ["scheduleList"],
      value: createArrayShape(createDeferredShape(() => scheduleItemShape)),
    },
    timeZoneId: { armPath: ["timeZoneId"], value: createStringShape() },
  },
);

/**
 * Properties of a subscription usage.
 */
export interface SubscriptionUsageProperties {
  /**
   * Current value of the metric.
   */
  currentValue?: number;
  /**
   * User-readable name of the metric.
   */
  displayName?: string;
  /**
   * Boundary value of the metric.
   */
  limit?: number;
  /**
   * Unit of the metric.
   */
  unit?: string;
}

/**
 * Input type for Properties of a subscription usage.
 */
export interface SubscriptionUsagePropertiesInput extends InputOf<SubscriptionUsageProperties> {}

/**
 * View type for Properties of a subscription usage.
 */
export interface SubscriptionUsagePropertiesView extends InputOf<SubscriptionUsageProperties> {
  /**
   * Read-only output: Current value of the metric.
   */
  readonly currentValue?: Expression<number> | undefined;
  /**
   * Read-only output: User-readable name of the metric.
   */
  readonly displayName?: Expression<string> | undefined;
  /**
   * Read-only output: Boundary value of the metric.
   */
  readonly limit?: Expression<number> | undefined;
  /**
   * Read-only output: Unit of the metric.
   */
  readonly unit?: Expression<string> | undefined;
}

export const subscriptionUsagePropertiesShape: FlatModelShape = createFlatModelShape({
  currentValue: { armPath: ["currentValue"], value: createNumberShape(), readOnly: true },
  displayName: { armPath: ["displayName"], value: createStringShape(), readOnly: true },
  limit: { armPath: ["limit"], value: createNumberShape(), readOnly: true },
  unit: { armPath: ["unit"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of an Azure SQL Database sync agent.
 */
export interface SyncAgentProperties {
  /**
   * Expiration time of the sync agent version.
   */
  expiryTime?: Date;
  /**
   * If the sync agent version is up to date.
   */
  isUpToDate?: boolean;
  /**
   * Last alive time of the sync agent.
   */
  lastAliveTime?: Date;
  /**
   * Name of the sync agent.
   */
  name?: string;
  /**
   * State of the sync agent.
   */
  state?: SyncAgentState;
  /**
   * ARM resource id of the sync database in the sync agent.
   */
  syncDatabaseId?: string;
  /**
   * Version of the sync agent.
   */
  version?: string;
}

/**
 * Input type for Properties of an Azure SQL Database sync agent.
 */
export interface SyncAgentPropertiesInput extends InputOf<SyncAgentProperties> {
  /**
   * ARM resource id of the sync database in the sync agent.
   */
  syncDatabaseId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of an Azure SQL Database sync agent.
 */
export interface SyncAgentPropertiesView extends InputOf<SyncAgentProperties> {
  /**
   * Read-only output: Expiration time of the sync agent version.
   */
  readonly expiryTime?: Expression<Date> | undefined;
  /**
   * Read-only output: If the sync agent version is up to date.
   */
  readonly isUpToDate?: Expression<boolean> | undefined;
  /**
   * Read-only output: Last alive time of the sync agent.
   */
  readonly lastAliveTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Name of the sync agent.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: State of the sync agent.
   */
  readonly state?: Expression<SyncAgentState> | undefined;
  /**
   * ARM resource id of the sync database in the sync agent.
   */
  syncDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Version of the sync agent.
   */
  readonly version?: Expression<string> | undefined;
}

export const syncAgentPropertiesShape: FlatModelShape = createFlatModelShape({
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  isUpToDate: { armPath: ["isUpToDate"], value: createBooleanShape(), readOnly: true },
  lastAliveTime: {
    armPath: ["lastAliveTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
  syncDatabaseId: { armPath: ["syncDatabaseId"], value: createStringShape() },
  version: { armPath: ["version"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a sync group with support to MI.
 */
export interface SyncGroupProperties {
  /**
   * Conflict logging retention period.
   */
  conflictLoggingRetentionInDays?: number;
  /**
   * Conflict resolution policy of the sync group.
   */
  conflictResolutionPolicy?: SyncConflictResolutionPolicy;
  /**
   * If conflict logging is enabled.
   */
  enableConflictLogging?: boolean;
  /**
   * Password for the sync group hub database credential.
   */
  hubDatabasePassword?: string;
  /**
   * User name for the sync group hub database credential.
   */
  hubDatabaseUserName?: string;
  /**
   * Sync interval of the sync group.
   */
  interval?: number;
  /**
   * Last sync time of the sync group.
   */
  lastSyncTime?: Date;
  /**
   * Private endpoint name of the sync group if use private link connection is enabled.
   */
  privateEndpointName?: string;
  /**
   * Sync schema of the sync group.
   */
  schema?: SyncGroupSchema;
  /**
   * ARM resource id of the sync database in the sync group.
   */
  syncDatabaseId?: string;
  /**
   * Sync state of the sync group.
   */
  syncState?: SyncGroupState;
  /**
   * If use private link connection is enabled.
   */
  usePrivateLinkConnection?: boolean;
}

/**
 * Input type for Properties of a sync group with support to MI.
 */
export interface SyncGroupPropertiesInput extends InputOf<SyncGroupProperties> {
  /**
   * Conflict logging retention period.
   */
  conflictLoggingRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Conflict resolution policy of the sync group.
   */
  conflictResolutionPolicy?: ExpressionOrValue<SyncConflictResolutionPolicy> | undefined;
  /**
   * If conflict logging is enabled.
   */
  enableConflictLogging?: ExpressionOrValue<boolean> | undefined;
  /**
   * Password for the sync group hub database credential.
   */
  hubDatabasePassword?: ExpressionOrValue<string> | undefined;
  /**
   * User name for the sync group hub database credential.
   */
  hubDatabaseUserName?: ExpressionOrValue<string> | undefined;
  /**
   * Sync interval of the sync group.
   */
  interval?: ExpressionOrValue<number> | undefined;
  /**
   * Sync schema of the sync group.
   */
  schema?: SyncGroupSchemaInput | undefined;
  /**
   * ARM resource id of the sync database in the sync group.
   */
  syncDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * If use private link connection is enabled.
   */
  usePrivateLinkConnection?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties of a sync group with support to MI.
 */
export interface SyncGroupPropertiesView extends InputOf<SyncGroupProperties> {
  /**
   * Conflict logging retention period.
   */
  conflictLoggingRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Conflict resolution policy of the sync group.
   */
  conflictResolutionPolicy?: ExpressionOrValue<SyncConflictResolutionPolicy> | undefined;
  /**
   * If conflict logging is enabled.
   */
  enableConflictLogging?: ExpressionOrValue<boolean> | undefined;
  /**
   * Password for the sync group hub database credential.
   */
  hubDatabasePassword?: ExpressionOrValue<string> | undefined;
  /**
   * User name for the sync group hub database credential.
   */
  hubDatabaseUserName?: ExpressionOrValue<string> | undefined;
  /**
   * Sync interval of the sync group.
   */
  interval?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Last sync time of the sync group.
   */
  readonly lastSyncTime?: Expression<Date> | undefined;
  /**
   * Read-only output: Private endpoint name of the sync group if use private link connection is enabled.
   */
  readonly privateEndpointName?: Expression<string> | undefined;
  /**
   * Sync schema of the sync group.
   */
  schema?: SyncGroupSchemaView | undefined;
  /**
   * ARM resource id of the sync database in the sync group.
   */
  syncDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Sync state of the sync group.
   */
  readonly syncState?: Expression<SyncGroupState> | undefined;
  /**
   * If use private link connection is enabled.
   */
  usePrivateLinkConnection?: ExpressionOrValue<boolean> | undefined;
}

export const syncGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  conflictLoggingRetentionInDays: {
    armPath: ["conflictLoggingRetentionInDays"],
    value: createNumberShape(),
  },
  conflictResolutionPolicy: { armPath: ["conflictResolutionPolicy"], value: createUnionShape() },
  enableConflictLogging: { armPath: ["enableConflictLogging"], value: createBooleanShape() },
  hubDatabasePassword: { armPath: ["hubDatabasePassword"], value: createStringShape() },
  hubDatabaseUserName: { armPath: ["hubDatabaseUserName"], value: createStringShape() },
  interval: { armPath: ["interval"], value: createNumberShape() },
  lastSyncTime: {
    armPath: ["lastSyncTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  privateEndpointName: {
    armPath: ["privateEndpointName"],
    value: createStringShape(),
    readOnly: true,
  },
  schema: { armPath: ["schema"], value: createDeferredShape(() => syncGroupSchemaShape) },
  syncDatabaseId: { armPath: ["syncDatabaseId"], value: createStringShape() },
  syncState: { armPath: ["syncState"], value: createUnionShape(), readOnly: true },
  usePrivateLinkConnection: { armPath: ["usePrivateLinkConnection"], value: createBooleanShape() },
});

/**
 * Properties of sync group schema.
 */
export interface SyncGroupSchema {
  /**
   * Name of master sync member where the schema is from.
   */
  masterSyncMemberName?: string;
  /**
   * List of tables in sync group schema.
   */
  tables?: SyncGroupSchemaTable[];
}

/**
 * Input type for Properties of sync group schema.
 */
export interface SyncGroupSchemaInput extends InputOf<SyncGroupSchema> {
  /**
   * Name of master sync member where the schema is from.
   */
  masterSyncMemberName?: ExpressionOrValue<string> | undefined;
  /**
   * List of tables in sync group schema.
   */
  tables?: InputArray<SyncGroupSchemaTableInput, SyncGroupSchemaTable[]> | undefined;
}

/**
 * View type for Properties of sync group schema.
 */
export type SyncGroupSchemaView = SyncGroupSchemaInput;

export const syncGroupSchemaShape: FlatModelShape = createFlatModelShape({
  masterSyncMemberName: { armPath: ["masterSyncMemberName"], value: createStringShape() },
  tables: {
    armPath: ["tables"],
    value: createArrayShape(createDeferredShape(() => syncGroupSchemaTableShape)),
  },
});

/**
 * Properties of table in sync group schema.
 */
export interface SyncGroupSchemaTable {
  /**
   * List of columns in sync group schema.
   */
  columns?: SyncGroupSchemaTableColumn[];
  /**
   * Quoted name of sync group schema table.
   */
  quotedName?: string;
}

/**
 * Input type for Properties of table in sync group schema.
 */
export interface SyncGroupSchemaTableInput extends InputOf<SyncGroupSchemaTable> {
  /**
   * List of columns in sync group schema.
   */
  columns?: InputArray<SyncGroupSchemaTableColumnInput, SyncGroupSchemaTableColumn[]> | undefined;
  /**
   * Quoted name of sync group schema table.
   */
  quotedName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of table in sync group schema.
 */
export type SyncGroupSchemaTableView = SyncGroupSchemaTableInput;

export const syncGroupSchemaTableShape: FlatModelShape = createFlatModelShape({
  columns: {
    armPath: ["columns"],
    value: createArrayShape(createDeferredShape(() => syncGroupSchemaTableColumnShape)),
  },
  quotedName: { armPath: ["quotedName"], value: createStringShape() },
});

/**
 * Properties of column in sync group table.
 */
export interface SyncGroupSchemaTableColumn {
  /**
   * Data size of the column.
   */
  dataSize?: string;
  /**
   * Data type of the column.
   */
  dataType?: string;
  /**
   * Quoted name of sync group table column.
   */
  quotedName?: string;
}

/**
 * Input type for Properties of column in sync group table.
 */
export interface SyncGroupSchemaTableColumnInput extends InputOf<SyncGroupSchemaTableColumn> {
  /**
   * Data size of the column.
   */
  dataSize?: ExpressionOrValue<string> | undefined;
  /**
   * Data type of the column.
   */
  dataType?: ExpressionOrValue<string> | undefined;
  /**
   * Quoted name of sync group table column.
   */
  quotedName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of column in sync group table.
 */
export type SyncGroupSchemaTableColumnView = SyncGroupSchemaTableColumnInput;

export const syncGroupSchemaTableColumnShape: FlatModelShape = createFlatModelShape({
  dataSize: { armPath: ["dataSize"], value: createStringShape() },
  dataType: { armPath: ["dataType"], value: createStringShape() },
  quotedName: { armPath: ["quotedName"], value: createStringShape() },
});

/**
 * Properties of a sync member with support to MI.
 */
export interface SyncMemberProperties {
  /**
   * Database name of the member database in the sync member.
   */
  databaseName?: string;
  /**
   * Database type of the sync member.
   */
  databaseType?: SyncMemberDbType;
  /**
   * Password of the member database in the sync member.
   */
  password?: string;
  /**
   * Private endpoint name of the sync member if use private link connection is enabled, for sync members in Azure.
   */
  privateEndpointName?: string;
  /**
   * Server name of the member database in the sync member
   */
  serverName?: string;
  /**
   * SQL Server database id of the sync member.
   */
  sqlServerDatabaseId?: string;
  /**
   * ARM resource id of the sync agent in the sync member.
   */
  syncAgentId?: string;
  /**
   * Sync direction of the sync member.
   */
  syncDirection?: SyncDirection;
  /**
   * ARM resource id of the sync member logical database, for sync members in Azure.
   */
  syncMemberAzureDatabaseResourceId?: string;
  /**
   * Sync state of the sync member.
   */
  syncState?: SyncMemberState;
  /**
   * Whether to use private link connection.
   */
  usePrivateLinkConnection?: boolean;
  /**
   * User name of the member database in the sync member.
   */
  userName?: string;
}

/**
 * Input type for Properties of a sync member with support to MI.
 */
export interface SyncMemberPropertiesInput extends InputOf<SyncMemberProperties> {
  /**
   * Database name of the member database in the sync member.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * Database type of the sync member.
   */
  databaseType?: ExpressionOrValue<SyncMemberDbType> | undefined;
  /**
   * Password of the member database in the sync member.
   */
  password?: ExpressionOrValue<string> | undefined;
  /**
   * Server name of the member database in the sync member
   */
  serverName?: ExpressionOrValue<string> | undefined;
  /**
   * SQL Server database id of the sync member.
   */
  sqlServerDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * ARM resource id of the sync agent in the sync member.
   */
  syncAgentId?: ExpressionOrValue<string> | undefined;
  /**
   * Sync direction of the sync member.
   */
  syncDirection?: ExpressionOrValue<SyncDirection> | undefined;
  /**
   * ARM resource id of the sync member logical database, for sync members in Azure.
   */
  syncMemberAzureDatabaseResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Whether to use private link connection.
   */
  usePrivateLinkConnection?: ExpressionOrValue<boolean> | undefined;
  /**
   * User name of the member database in the sync member.
   */
  userName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of a sync member with support to MI.
 */
export interface SyncMemberPropertiesView extends InputOf<SyncMemberProperties> {
  /**
   * Database name of the member database in the sync member.
   */
  databaseName?: ExpressionOrValue<string> | undefined;
  /**
   * Database type of the sync member.
   */
  databaseType?: ExpressionOrValue<SyncMemberDbType> | undefined;
  /**
   * Password of the member database in the sync member.
   */
  password?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Private endpoint name of the sync member if use private link connection is enabled, for sync members in Azure.
   */
  readonly privateEndpointName?: Expression<string> | undefined;
  /**
   * Server name of the member database in the sync member
   */
  serverName?: ExpressionOrValue<string> | undefined;
  /**
   * SQL Server database id of the sync member.
   */
  sqlServerDatabaseId?: ExpressionOrValue<string> | undefined;
  /**
   * ARM resource id of the sync agent in the sync member.
   */
  syncAgentId?: ExpressionOrValue<string> | undefined;
  /**
   * Sync direction of the sync member.
   */
  syncDirection?: ExpressionOrValue<SyncDirection> | undefined;
  /**
   * ARM resource id of the sync member logical database, for sync members in Azure.
   */
  syncMemberAzureDatabaseResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Sync state of the sync member.
   */
  readonly syncState?: Expression<SyncMemberState> | undefined;
  /**
   * Whether to use private link connection.
   */
  usePrivateLinkConnection?: ExpressionOrValue<boolean> | undefined;
  /**
   * User name of the member database in the sync member.
   */
  userName?: ExpressionOrValue<string> | undefined;
}

export const syncMemberPropertiesShape: FlatModelShape = createFlatModelShape({
  databaseName: { armPath: ["databaseName"], value: createStringShape() },
  databaseType: { armPath: ["databaseType"], value: createUnionShape() },
  password: { armPath: ["password"], value: createStringShape() },
  privateEndpointName: {
    armPath: ["privateEndpointName"],
    value: createStringShape(),
    readOnly: true,
  },
  serverName: { armPath: ["serverName"], value: createStringShape() },
  sqlServerDatabaseId: { armPath: ["sqlServerDatabaseId"], value: createStringShape() },
  syncAgentId: { armPath: ["syncAgentId"], value: createStringShape() },
  syncDirection: { armPath: ["syncDirection"], value: createUnionShape() },
  syncMemberAzureDatabaseResourceId: {
    armPath: ["syncMemberAzureDatabaseResourceId"],
    value: createStringShape(),
  },
  syncState: { armPath: ["syncState"], value: createUnionShape(), readOnly: true },
  usePrivateLinkConnection: { armPath: ["usePrivateLinkConnection"], value: createBooleanShape() },
  userName: { armPath: ["userName"], value: createStringShape() },
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
 * The properties of a time zone.
 */
export interface TimeZoneProperties {
  /**
   * The time zone display name
   */
  displayName?: string;
  /**
   * The time zone id
   */
  timeZoneId?: string;
}

/**
 * Input type for The properties of a time zone.
 */
export interface TimeZonePropertiesInput extends InputOf<TimeZoneProperties> {}

/**
 * View type for The properties of a time zone.
 */
export interface TimeZonePropertiesView extends InputOf<TimeZoneProperties> {
  /**
   * Read-only output: The time zone display name
   */
  readonly displayName?: Expression<string> | undefined;
  /**
   * Read-only output: The time zone id
   */
  readonly timeZoneId?: Expression<string> | undefined;
}

export const timeZonePropertiesShape: FlatModelShape = createFlatModelShape({
  displayName: { armPath: ["displayName"], value: createStringShape(), readOnly: true },
  timeZoneId: { armPath: ["timeZoneId"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a transparent data encryption scan.
 */
export interface TransparentDataEncryptionProperties {
  /**
   * Specifies the encryption scan state of the transparent data encryption.
   */
  scanState?: TransparentDataEncryptionScanState;
  /**
   * Specifies the state of the transparent data encryption.
   */
  state: TransparentDataEncryptionState;
}

/**
 * Input type for Properties of a transparent data encryption scan.
 */
export interface TransparentDataEncryptionPropertiesInput extends InputOf<TransparentDataEncryptionProperties> {
  /**
   * Specifies the encryption scan state of the transparent data encryption.
   */
  scanState?: ExpressionOrValue<TransparentDataEncryptionScanState> | undefined;
  /**
   * Specifies the state of the transparent data encryption.
   */
  state: ExpressionOrValue<TransparentDataEncryptionState>;
}

/**
 * View type for Properties of a transparent data encryption scan.
 */
export type TransparentDataEncryptionPropertiesView = TransparentDataEncryptionPropertiesInput;

export const transparentDataEncryptionPropertiesShape: FlatModelShape = createFlatModelShape({
  scanState: { armPath: ["scanState"], value: createUnionShape() },
  state: { armPath: ["state"], value: createEnumShape() },
});

export interface UpsertManagedServerOperationParameters {
  family?: string;
  storageSizeInGb?: number;
  tier?: string;
  vCores?: number;
}

export interface UpsertManagedServerOperationParametersInput extends InputOf<UpsertManagedServerOperationParameters> {}

export interface UpsertManagedServerOperationParametersView extends InputOf<UpsertManagedServerOperationParameters> {
  readonly family?: Expression<string> | undefined;
  readonly storageSizeInGb?: Expression<number> | undefined;
  readonly tier?: Expression<string> | undefined;
  readonly vCores?: Expression<number> | undefined;
}

export const upsertManagedServerOperationParametersShape: FlatModelShape = createFlatModelShape({
  family: { armPath: ["family"], value: createStringShape(), readOnly: true },
  storageSizeInGb: { armPath: ["storageSizeInGB"], value: createNumberShape(), readOnly: true },
  tier: { armPath: ["tier"], value: createStringShape(), readOnly: true },
  vCores: { armPath: ["vCores"], value: createNumberShape(), readOnly: true },
});

export interface UpsertManagedServerOperationStepWithEstimatesAndDuration {
  name?: string;
  order?: number;
  status?: UpsertManagedServerOperationStepWithEstimatesAndDurationStatus;
  stepEndTime?: Date;
  stepStartTime?: Date;
  timeElapsed?: string;
}

export interface UpsertManagedServerOperationStepWithEstimatesAndDurationInput extends InputOf<UpsertManagedServerOperationStepWithEstimatesAndDuration> {}

export interface UpsertManagedServerOperationStepWithEstimatesAndDurationView extends InputOf<UpsertManagedServerOperationStepWithEstimatesAndDuration> {
  readonly name?: Expression<string> | undefined;
  readonly order?: Expression<number> | undefined;
  readonly status?:
    Expression<UpsertManagedServerOperationStepWithEstimatesAndDurationStatus> | undefined;
  readonly stepEndTime?: Expression<Date> | undefined;
  readonly stepStartTime?: Expression<Date> | undefined;
  readonly timeElapsed?: Expression<string> | undefined;
}

export const upsertManagedServerOperationStepWithEstimatesAndDurationShape: FlatModelShape =
  createFlatModelShape({
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
    order: { armPath: ["order"], value: createNumberShape(), readOnly: true },
    status: { armPath: ["status"], value: createUnionShape(), readOnly: true },
    stepEndTime: {
      armPath: ["stepEndTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    stepStartTime: {
      armPath: ["stepStartTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    timeElapsed: { armPath: ["timeElapsed"], value: createStringShape(), readOnly: true },
  });

/**
 * Azure Active Directory identity configuration for a resource.
 */
export interface UserIdentity {
  /**
   * The Azure Active Directory client id.
   */
  clientId?: string;
  /**
   * The Azure Active Directory principal id.
   */
  principalId?: string;
}

/**
 * Input type for Azure Active Directory identity configuration for a resource.
 */
export interface UserIdentityInput extends InputOf<UserIdentity> {}

/**
 * View type for Azure Active Directory identity configuration for a resource.
 */
export interface UserIdentityView extends InputOf<UserIdentity> {
  /**
   * Read-only output: The Azure Active Directory client id.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The Azure Active Directory principal id.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * SQL Vulnerability Assessment rule metadata details.
 */
export interface VaRule {
  /**
   * SQL Vulnerability Assessment benchmark references.
   */
  benchmarkReferences?: BenchmarkReference[];
  /**
   * SQL Vulnerability Assessment rule category.
   */
  category?: string;
  /**
   * SQL Vulnerability Assessment rule description.
   */
  description?: string;
  /**
   * SQL Vulnerability Assessment rule query details.
   */
  queryCheck?: QueryCheck;
  /**
   * SQL Vulnerability Assessment rule rationale.
   */
  rationale?: string;
  /**
   * SQL Vulnerability Assessment rule Id.
   */
  ruleId?: string;
  /**
   * SQL Vulnerability Assessment rule type.
   */
  ruleType?: RuleType;
  /**
   * SQL Vulnerability Assessment rule severity.
   */
  severity?: RuleSeverity;
  /**
   * SQL Vulnerability Assessment rule title.
   */
  title?: string;
}

/**
 * Input type for SQL Vulnerability Assessment rule metadata details.
 */
export interface VaRuleInput extends InputOf<VaRule> {}

/**
 * View type for SQL Vulnerability Assessment rule metadata details.
 */
export interface VaRuleView extends InputOf<VaRule> {
  /**
   * Read-only output: SQL Vulnerability Assessment benchmark references.
   */
  readonly benchmarkReferences?: Expression<BenchmarkReference[]> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule category.
   */
  readonly category?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule description.
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule query details.
   */
  readonly queryCheck?: Expression<QueryCheck> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule rationale.
   */
  readonly rationale?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule Id.
   */
  readonly ruleId?: Expression<string> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule type.
   */
  readonly ruleType?: Expression<RuleType> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule severity.
   */
  readonly severity?: Expression<RuleSeverity> | undefined;
  /**
   * Read-only output: SQL Vulnerability Assessment rule title.
   */
  readonly title?: Expression<string> | undefined;
}

export const vaRuleShape: FlatModelShape = createFlatModelShape({
  benchmarkReferences: {
    armPath: ["benchmarkReferences"],
    value: createArrayShape(createDeferredShape(() => benchmarkReferenceShape)),
    readOnly: true,
  },
  category: { armPath: ["category"], value: createStringShape(), readOnly: true },
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  queryCheck: {
    armPath: ["queryCheck"],
    value: createDeferredShape(() => queryCheckShape),
    readOnly: true,
  },
  rationale: { armPath: ["rationale"], value: createStringShape(), readOnly: true },
  ruleId: { armPath: ["ruleId"], value: createStringShape(), readOnly: true },
  ruleType: { armPath: ["ruleType"], value: createUnionShape(), readOnly: true },
  severity: { armPath: ["severity"], value: createUnionShape(), readOnly: true },
  title: { armPath: ["title"], value: createStringShape(), readOnly: true },
});

/**
 * The properties of a virtual cluster.
 */
export interface VirtualClusterProperties {
  /**
   * List of resources in this virtual cluster.
   */
  childResources?: string[];
  /**
   * Subnet resource ID for the virtual cluster.
   */
  subnetId?: string;
  /**
   * Virtual cluster version.
   */
  version?: string;
}

/**
 * Input type for The properties of a virtual cluster.
 */
export interface VirtualClusterPropertiesInput extends InputOf<VirtualClusterProperties> {
  /**
   * Virtual cluster version.
   */
  version?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The properties of a virtual cluster.
 */
export interface VirtualClusterPropertiesView extends InputOf<VirtualClusterProperties> {
  /**
   * Read-only output: List of resources in this virtual cluster.
   */
  readonly childResources?: Expression<string[]> | undefined;
  /**
   * Read-only output: Subnet resource ID for the virtual cluster.
   */
  readonly subnetId?: Expression<string> | undefined;
  /**
   * Virtual cluster version.
   */
  version?: ExpressionOrValue<string> | undefined;
}

export const virtualClusterPropertiesShape: FlatModelShape = createFlatModelShape({
  childResources: {
    armPath: ["childResources"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  subnetId: { armPath: ["subnetId"], value: createStringShape(), readOnly: true },
  version: { armPath: ["version"], value: createStringShape() },
});

/**
 * Properties of a virtual network rule.
 */
export interface VirtualNetworkRuleProperties {
  /**
   * Create firewall rule before the virtual network has vnet service endpoint enabled.
   */
  ignoreMissingVnetServiceEndpoint?: boolean;
  /**
   * Virtual Network Rule State
   */
  state?: VirtualNetworkRuleState;
  /**
   * The ARM resource id of the virtual network subnet.
   */
  virtualNetworkSubnetId: string;
}

/**
 * Input type for Properties of a virtual network rule.
 */
export interface VirtualNetworkRulePropertiesInput extends InputOf<VirtualNetworkRuleProperties> {
  /**
   * Create firewall rule before the virtual network has vnet service endpoint enabled.
   */
  ignoreMissingVnetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
  /**
   * The ARM resource id of the virtual network subnet.
   */
  virtualNetworkSubnetId: ExpressionOrValue<string>;
}

/**
 * View type for Properties of a virtual network rule.
 */
export interface VirtualNetworkRulePropertiesView extends InputOf<VirtualNetworkRuleProperties> {
  /**
   * Create firewall rule before the virtual network has vnet service endpoint enabled.
   */
  ignoreMissingVnetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: Virtual Network Rule State
   */
  readonly state?: Expression<VirtualNetworkRuleState> | undefined;
  /**
   * The ARM resource id of the virtual network subnet.
   */
  virtualNetworkSubnetId: ExpressionOrValue<string>;
}

export const virtualNetworkRulePropertiesShape: FlatModelShape = createFlatModelShape({
  ignoreMissingVnetServiceEndpoint: {
    armPath: ["ignoreMissingVnetServiceEndpoint"],
    value: createBooleanShape(),
  },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
  virtualNetworkSubnetId: { armPath: ["virtualNetworkSubnetId"], value: createStringShape() },
});

/**
 * Properties of a Vulnerability Assessment recurring scans.
 */
export interface VulnerabilityAssessmentRecurringScansProperties {
  /**
   * Specifies an array of e-mail addresses to which the scan notification is sent.
   */
  emails?: string[];
  /**
   * Specifies that the schedule scan notification will be is sent to the subscription administrators.
   */
  emailSubscriptionAdmins?: boolean;
  /**
   * Recurring scans state.
   */
  isEnabled?: boolean;
}

/**
 * Input type for Properties of a Vulnerability Assessment recurring scans.
 */
export interface VulnerabilityAssessmentRecurringScansPropertiesInput extends InputOf<VulnerabilityAssessmentRecurringScansProperties> {
  /**
   * Specifies an array of e-mail addresses to which the scan notification is sent.
   */
  emails?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies that the schedule scan notification will be is sent to the subscription administrators.
   */
  emailSubscriptionAdmins?: ExpressionOrValue<boolean> | undefined;
  /**
   * Recurring scans state.
   */
  isEnabled?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Properties of a Vulnerability Assessment recurring scans.
 */
export type VulnerabilityAssessmentRecurringScansPropertiesView =
  VulnerabilityAssessmentRecurringScansPropertiesInput;

export const vulnerabilityAssessmentRecurringScansPropertiesShape: FlatModelShape =
  createFlatModelShape({
    emails: { armPath: ["emails"], value: createArrayShape(createStringShape()) },
    emailSubscriptionAdmins: { armPath: ["emailSubscriptionAdmins"], value: createBooleanShape() },
    isEnabled: { armPath: ["isEnabled"], value: createBooleanShape() },
  });

/**
 * Properties of a vulnerability assessment scan error.
 */
export interface VulnerabilityAssessmentScanError {
  /**
   * The error code.
   */
  code?: string;
  /**
   * The error message.
   */
  message?: string;
}

/**
 * Input type for Properties of a vulnerability assessment scan error.
 */
export interface VulnerabilityAssessmentScanErrorInput extends InputOf<VulnerabilityAssessmentScanError> {}

/**
 * View type for Properties of a vulnerability assessment scan error.
 */
export interface VulnerabilityAssessmentScanErrorView extends InputOf<VulnerabilityAssessmentScanError> {
  /**
   * Read-only output: The error code.
   */
  readonly code?: Expression<string> | undefined;
  /**
   * Read-only output: The error message.
   */
  readonly message?: Expression<string> | undefined;
}

export const vulnerabilityAssessmentScanErrorShape: FlatModelShape = createFlatModelShape({
  code: { armPath: ["code"], value: createStringShape(), readOnly: true },
  message: { armPath: ["message"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of a vulnerability assessment scan record.
 */
export interface VulnerabilityAssessmentScanRecordProperties {
  /**
   * The scan end time (UTC).
   */
  endTime?: Date;
  /**
   * The scan errors.
   */
  errors?: VulnerabilityAssessmentScanError[];
  /**
   * The number of failed security checks.
   */
  numberOfFailedSecurityChecks?: number;
  /**
   * The scan ID.
   */
  scanId?: string;
  /**
   * The scan start time (UTC).
   */
  startTime?: Date;
  /**
   * The scan status.
   */
  state?: VulnerabilityAssessmentScanState;
  /**
   * The scan results storage container path.
   */
  storageContainerPath?: string;
  /**
   * The scan trigger type.
   */
  triggerType?: VulnerabilityAssessmentScanTriggerType;
}

/**
 * Input type for Properties of a vulnerability assessment scan record.
 */
export interface VulnerabilityAssessmentScanRecordPropertiesInput extends InputOf<VulnerabilityAssessmentScanRecordProperties> {}

/**
 * View type for Properties of a vulnerability assessment scan record.
 */
export interface VulnerabilityAssessmentScanRecordPropertiesView extends InputOf<VulnerabilityAssessmentScanRecordProperties> {
  /**
   * Read-only output: The scan end time (UTC).
   */
  readonly endTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The scan errors.
   */
  readonly errors?: Expression<VulnerabilityAssessmentScanError[]> | undefined;
  /**
   * Read-only output: The number of failed security checks.
   */
  readonly numberOfFailedSecurityChecks?: Expression<number> | undefined;
  /**
   * Read-only output: The scan ID.
   */
  readonly scanId?: Expression<string> | undefined;
  /**
   * Read-only output: The scan start time (UTC).
   */
  readonly startTime?: Expression<Date> | undefined;
  /**
   * Read-only output: The scan status.
   */
  readonly state?: Expression<VulnerabilityAssessmentScanState> | undefined;
  /**
   * Read-only output: The scan results storage container path.
   */
  readonly storageContainerPath?: Expression<string> | undefined;
  /**
   * Read-only output: The scan trigger type.
   */
  readonly triggerType?: Expression<VulnerabilityAssessmentScanTriggerType> | undefined;
}

export const vulnerabilityAssessmentScanRecordPropertiesShape: FlatModelShape =
  createFlatModelShape({
    endTime: {
      armPath: ["endTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    errors: {
      armPath: ["errors"],
      value: createArrayShape(createDeferredShape(() => vulnerabilityAssessmentScanErrorShape)),
      readOnly: true,
    },
    numberOfFailedSecurityChecks: {
      armPath: ["numberOfFailedSecurityChecks"],
      value: createNumberShape(),
      readOnly: true,
    },
    scanId: { armPath: ["scanId"], value: createStringShape(), readOnly: true },
    startTime: {
      armPath: ["startTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
      readOnly: true,
    },
    state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
    storageContainerPath: {
      armPath: ["storageContainerPath"],
      value: createStringShape(),
      readOnly: true,
    },
    triggerType: { armPath: ["triggerType"], value: createUnionShape(), readOnly: true },
  });

/**
 * Workload classifier definition. For more information look at sys.workload_management_workload_classifiers (DMV).
 */
export interface WorkloadClassifierProperties {
  /**
   * The workload classifier context.
   */
  context?: string;
  /**
   * The workload classifier end time for classification.
   */
  endTime?: string;
  /**
   * The workload classifier importance.
   */
  importance?: string;
  /**
   * The workload classifier label.
   */
  label?: string;
  /**
   * The workload classifier member name.
   */
  memberName: string;
  /**
   * The workload classifier start time for classification.
   */
  startTime?: string;
}

/**
 * Input type for Workload classifier definition. For more information look at sys.workload_management_workload_classifiers (DMV).
 */
export interface WorkloadClassifierPropertiesInput extends InputOf<WorkloadClassifierProperties> {
  /**
   * The workload classifier context.
   */
  context?: ExpressionOrValue<string> | undefined;
  /**
   * The workload classifier end time for classification.
   */
  endTime?: ExpressionOrValue<string> | undefined;
  /**
   * The workload classifier importance.
   */
  importance?: ExpressionOrValue<string> | undefined;
  /**
   * The workload classifier label.
   */
  label?: ExpressionOrValue<string> | undefined;
  /**
   * The workload classifier member name.
   */
  memberName: ExpressionOrValue<string>;
  /**
   * The workload classifier start time for classification.
   */
  startTime?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Workload classifier definition. For more information look at sys.workload_management_workload_classifiers (DMV).
 */
export type WorkloadClassifierPropertiesView = WorkloadClassifierPropertiesInput;

export const workloadClassifierPropertiesShape: FlatModelShape = createFlatModelShape({
  context: { armPath: ["context"], value: createStringShape() },
  endTime: { armPath: ["endTime"], value: createStringShape() },
  importance: { armPath: ["importance"], value: createStringShape() },
  label: { armPath: ["label"], value: createStringShape() },
  memberName: { armPath: ["memberName"], value: createStringShape() },
  startTime: { armPath: ["startTime"], value: createStringShape() },
});

/**
 * Workload group definition. For more information look at sys.workload_management_workload_groups (DMV).
 */
export interface WorkloadGroupProperties {
  /**
   * The workload group importance level.
   */
  importance?: string;
  /**
   * The workload group cap percentage resource.
   */
  maxResourcePercent: number;
  /**
   * The workload group request maximum grant percentage.
   */
  maxResourcePercentPerRequest?: number;
  /**
   * The workload group minimum percentage resource.
   */
  minResourcePercent: number;
  /**
   * The workload group request minimum grant percentage.
   */
  minResourcePercentPerRequest: number;
  /**
   * The workload group query execution timeout.
   */
  queryExecutionTimeout?: number;
}

/**
 * Input type for Workload group definition. For more information look at sys.workload_management_workload_groups (DMV).
 */
export interface WorkloadGroupPropertiesInput extends InputOf<WorkloadGroupProperties> {
  /**
   * The workload group importance level.
   */
  importance?: ExpressionOrValue<string> | undefined;
  /**
   * The workload group cap percentage resource.
   */
  maxResourcePercent: ExpressionOrValue<number>;
  /**
   * The workload group request maximum grant percentage.
   */
  maxResourcePercentPerRequest?: ExpressionOrValue<number> | undefined;
  /**
   * The workload group minimum percentage resource.
   */
  minResourcePercent: ExpressionOrValue<number>;
  /**
   * The workload group request minimum grant percentage.
   */
  minResourcePercentPerRequest: ExpressionOrValue<number>;
  /**
   * The workload group query execution timeout.
   */
  queryExecutionTimeout?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Workload group definition. For more information look at sys.workload_management_workload_groups (DMV).
 */
export type WorkloadGroupPropertiesView = WorkloadGroupPropertiesInput;

export const workloadGroupPropertiesShape: FlatModelShape = createFlatModelShape({
  importance: { armPath: ["importance"], value: createStringShape() },
  maxResourcePercent: { armPath: ["maxResourcePercent"], value: createNumberShape() },
  maxResourcePercentPerRequest: {
    armPath: ["maxResourcePercentPerRequest"],
    value: createNumberShape(),
  },
  minResourcePercent: { armPath: ["minResourcePercent"], value: createNumberShape() },
  minResourcePercentPerRequest: {
    armPath: ["minResourcePercentPerRequest"],
    value: createNumberShape(),
  },
  queryExecutionTimeout: { armPath: ["queryExecutionTimeout"], value: createNumberShape() },
});

/**
 * Known values:
 *
 * - `"ActiveDirectory"`: ActiveDirectory
 */
export type AdministratorName = string;

/**
 * Type of the sever administrator.
 *
 * Known values:
 *
 * - `"ActiveDirectory"`: ActiveDirectory
 */
export type AdministratorType = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type AdvancedThreatProtectionName = string;

/**
 * Type of enclave requested on the database i.e. Default or VBS enclaves.
 *
 * Known values:
 *
 * - `"Default"`: Default
 *
 * - `"VBS"`: VBS
 */
export type AlwaysEncryptedEnclaveType = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type AuthenticationName = string;

/**
 * The managed instance's authentication metadata lookup mode.
 *
 * Known values:
 *
 * - `"AzureAD"`: AzureAD
 *
 * - `"Paired"`: Paired
 *
 * - `"Windows"`: Windows
 */
export type AuthMetadataLookupModes = string;

/**
 * Specifies the availability zone the database is pinned to.
 *
 * Known values:
 *
 * - `"NoPreference"`: NoPreference
 *
 * - `"1"`: 1
 *
 * - `"2"`: 2
 *
 * - `"3"`: 3
 */
export type AvailabilityZoneType = string;

/**
 * The BackupStorageAccessTier for the LTR backup
 *
 * Known values:
 *
 * - `"Hot"`: Hot
 *
 * - `"Archive"`: Archive
 */
export type BackupStorageAccessTier = string;

/**
 * The storage account type used to store backups for this database.
 *
 * Known values:
 *
 * - `"Geo"`: Geo
 *
 * - `"Local"`: Local
 *
 * - `"Zone"`: Zone
 *
 * - `"GeoZone"`: GeoZone
 */
export type BackupStorageRedundancy = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type BaselineName = string;

/**
 * Collation of the metadata catalog.
 *
 * Known values:
 *
 * - `"DATABASE_DEFAULT"`: DATABASE_DEFAULT
 *
 * - `"SQL_Latin1_General_CP1_CI_AS"`: SQL_Latin1_General_CP1_CI_AS
 */
export type CatalogCollationType = string;

/**
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"Native"`: Native
 *
 * - `"Recommended"`: Recommended
 *
 * - `"MIP"`: MIP
 */
export type ClientClassificationSource = string;

/**
 * The column data type.
 *
 * Known values:
 *
 * - `"image"`: image
 *
 * - `"text"`: text
 *
 * - `"uniqueidentifier"`: uniqueidentifier
 *
 * - `"date"`: date
 *
 * - `"time"`: time
 *
 * - `"datetime2"`: datetime2
 *
 * - `"datetimeoffset"`: datetimeoffset
 *
 * - `"tinyint"`: tinyint
 *
 * - `"smallint"`: smallint
 *
 * - `"int"`: int
 *
 * - `"smalldatetime"`: smalldatetime
 *
 * - `"real"`: real
 *
 * - `"money"`: money
 *
 * - `"datetime"`: datetime
 *
 * - `"float"`: float
 *
 * - `"sql_variant"`: sql_variant
 *
 * - `"ntext"`: ntext
 *
 * - `"bit"`: bit
 *
 * - `"decimal"`: decimal
 *
 * - `"numeric"`: numeric
 *
 * - `"smallmoney"`: smallmoney
 *
 * - `"bigint"`: bigint
 *
 * - `"hierarchyid"`: hierarchyid
 *
 * - `"geometry"`: geometry
 *
 * - `"geography"`: geography
 *
 * - `"varbinary"`: varbinary
 *
 * - `"varchar"`: varchar
 *
 * - `"binary"`: binary
 *
 * - `"char"`: char
 *
 * - `"timestamp"`: timestamp
 *
 * - `"nvarchar"`: nvarchar
 *
 * - `"nchar"`: nchar
 *
 * - `"xml"`: xml
 *
 * - `"sysname"`: sysname
 */
export type ColumnDataType = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type ConnectionPolicyName = string;

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
 * Specifies the mode of database creation.
 *
 * Default: regular database creation.
 *
 * Copy: creates a database as a copy of an existing database. sourceDatabaseId must be specified as the resource ID of the source database.
 *
 * Secondary: creates a database as a secondary replica of an existing database. sourceDatabaseId must be specified as the resource ID of the existing primary database.
 *
 * PointInTimeRestore: Creates a database by restoring a point in time backup of an existing database. sourceDatabaseId must be specified as the resource ID of the existing database, and restorePointInTime must be specified.
 *
 * Recovery: Creates a database by restoring a geo-replicated backup. sourceDatabaseId must be specified as the recoverable database resource ID to restore.
 *
 * Restore: Creates a database by restoring a backup of a deleted database. sourceDatabaseId must be specified. If sourceDatabaseId is the database's original resource ID, then sourceDatabaseDeletionDate must be specified. Otherwise sourceDatabaseId must be the restorable dropped database resource ID and sourceDatabaseDeletionDate is ignored. restorePointInTime may also be specified to restore from an earlier point in time.
 *
 * RestoreLongTermRetentionBackup: Creates a database by restoring from a long term retention vault. recoveryServicesRecoveryPointResourceId must be specified as the recovery point resource ID.
 *
 * Copy, Secondary, and RestoreLongTermRetentionBackup are not supported for DataWarehouse edition.
 *
 * Known values:
 *
 * - `"Default"`: Default
 *
 * - `"Copy"`: Copy
 *
 * - `"Secondary"`: Secondary
 *
 * - `"PointInTimeRestore"`: PointInTimeRestore
 *
 * - `"Restore"`: Restore
 *
 * - `"Recovery"`: Recovery
 *
 * - `"RestoreExternalBackup"`: RestoreExternalBackup
 *
 * - `"RestoreExternalBackupSecondary"`: RestoreExternalBackupSecondary
 *
 * - `"RestoreLongTermRetentionBackup"`: RestoreLongTermRetentionBackup
 *
 * - `"OnlineSecondary"`: OnlineSecondary
 */
export type CreateMode = string;

/**
 * The identity type
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"UserAssigned"`: UserAssigned
 */
export type DatabaseIdentityType = string;

/**
 * The database key type. Only supported value is 'AzureKeyVault'.
 *
 * Known values:
 *
 * - `"AzureKeyVault"`: AzureKeyVault
 */
export type DatabaseKeyType = string;

/**
 * The license type to apply for this database. `LicenseIncluded` if you need a license, or `BasePrice` if you have a license and are eligible for the Azure Hybrid Benefit.
 *
 * Known values:
 *
 * - `"LicenseIncluded"`: LicenseIncluded
 *
 * - `"BasePrice"`: BasePrice
 */
export type DatabaseLicenseType = string;

/**
 * The state of read-only routing. If enabled, connections that have application intent set to readonly in their connection string may be routed to a readonly secondary replica in the same region. Not applicable to a Hyperscale database within an elastic pool.
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 */
export type DatabaseReadScale = string;

/**
 * The status of the database.
 *
 * Known values:
 *
 * - `"Online"`: Online
 *
 * - `"Restoring"`: Restoring
 *
 * - `"RecoveryPending"`: RecoveryPending
 *
 * - `"Recovering"`: Recovering
 *
 * - `"Suspect"`: Suspect
 *
 * - `"Offline"`: Offline
 *
 * - `"Standby"`: Standby
 *
 * - `"Shutdown"`: Shutdown
 *
 * - `"EmergencyMode"`: EmergencyMode
 *
 * - `"AutoClosed"`: AutoClosed
 *
 * - `"Copying"`: Copying
 *
 * - `"Creating"`: Creating
 *
 * - `"Inaccessible"`: Inaccessible
 *
 * - `"OfflineSecondary"`: OfflineSecondary
 *
 * - `"Pausing"`: Pausing
 *
 * - `"Paused"`: Paused
 *
 * - `"Resuming"`: Resuming
 *
 * - `"Scaling"`: Scaling
 *
 * - `"OfflineChangingDwPerformanceTiers"`: OfflineChangingDwPerformanceTiers
 *
 * - `"OnlineChangingDwPerformanceTiers"`: OnlineChangingDwPerformanceTiers
 *
 * - `"Disabled"`: Disabled
 *
 * - `"Stopping"`: Stopping
 *
 * - `"Stopped"`: Stopped
 *
 * - `"Starting"`: Starting
 */
export type DatabaseStatus = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type DataMaskingPolicyName = string;

/**
 * Known values:
 *
 * - `"current"`: current
 */
export type DataWarehouseUserActivityName = string;

/**
 * Day of maintenance window.
 *
 * Known values:
 *
 * - `"Sunday"`: Sunday
 *
 * - `"Monday"`: Monday
 *
 * - `"Tuesday"`: Tuesday
 *
 * - `"Wednesday"`: Wednesday
 *
 * - `"Thursday"`: Thursday
 *
 * - `"Friday"`: Friday
 *
 * - `"Saturday"`: Saturday
 */
export type DayOfWeek = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type DevOpsAuditingSettingsName = string;

/**
 * Known values:
 *
 * - `"current"`: current
 */
export type DtcName = string;

/**
 * The license type to apply for this elastic pool.
 *
 * Known values:
 *
 * - `"LicenseIncluded"`: LicenseIncluded
 *
 * - `"BasePrice"`: BasePrice
 */
export type ElasticPoolLicenseType = string;

/**
 * The state of the elastic pool.
 *
 * Known values:
 *
 * - `"Creating"`: Creating
 *
 * - `"Ready"`: Ready
 *
 * - `"Disabled"`: Disabled
 */
export type ElasticPoolState = string;

/**
 * Known values:
 *
 * - `"current"`: current
 */
export type EncryptionProtectorName = string;

/**
 * Error type (e.g. None, User).
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"User"`: User
 */
export type ErrorType = string;

/**
 * Status of external governance.
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 */
export type ExternalGovernanceStatus = string;

/**
 * Databases secondary type on partner server.
 *
 * Known values:
 *
 * - `"Geo"`: Geo
 *
 * - `"Standby"`: Standby
 */
export type FailoverGroupDatabasesSecondaryType = string;

/**
 * Local replication role of the failover group instance.
 *
 * Known values:
 *
 * - `"Primary"`: Primary
 *
 * - `"Secondary"`: Secondary
 */
export type FailoverGroupReplicationRole = string;

/**
 * The link failover mode - can be Manual if intended to be used for two-way failover with a supported SQL Server, or None for one-way failover to Azure.
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"Manual"`: Manual
 */
export type FailoverModeType = string;

/**
 * Specifies the behavior when monthly free limits are exhausted for the free database.
 *
 * AutoPause: The database will be auto paused upon exhaustion of free limits for remainder of the month.
 *
 * BillForUsage: The database will continue to be online upon exhaustion of free limits and any overage will be billed.
 *
 * Known values:
 *
 * - `"AutoPause"`: AutoPause
 *
 * - `"BillOverUsage"`: BillOverUsage
 */
export type FreeLimitExhaustionBehavior = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type GeoBackupPolicyName = string;

/**
 * Hybrid secondary usage. Possible values are 'Active' (default value) and 'Passive' (customer uses the secondary as Passive DR).
 *
 * Known values:
 *
 * - `"Active"`: Active
 *
 * - `"Passive"`: Passive
 */
export type HybridSecondaryUsage = string;

/**
 * Hybrid secondary usage detected. Possible values are 'Active' (customer does not meet the requirements to use the secondary as Passive DR) and 'Passive' (customer meets the requirements to use the secondary as Passive DR).
 *
 * Known values:
 *
 * - `"Active"`: Active
 *
 * - `"Passive"`: Passive
 */
export type HybridSecondaryUsageDetected = string;

/**
 * The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource.
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"SystemAssigned"`: SystemAssigned
 *
 * - `"UserAssigned"`: UserAssigned
 *
 * - `"SystemAssigned,UserAssigned"`: SystemAssigned,UserAssigned
 */
export type IdentityType = string;

/**
 * Root cause kind. Allowed values are “TransparentDataEncryption”, “DatabaseReplication”, and “Unknown”.
 *
 * Known values:
 *
 * - `"Unknown"`: Unknown
 *
 * - `"TransparentDataEncryption"`: TransparentDataEncryption
 *
 * - `"DatabaseReplication"`: DatabaseReplication
 */
export type InaccessibilityReason = string;

/**
 * Local replication role of the failover group instance.
 *
 * Known values:
 *
 * - `"Primary"`: Primary
 *
 * - `"Secondary"`: Secondary
 */
export type InstanceFailoverGroupReplicationRole = string;

/**
 * The license type. Possible values are 'LicenseIncluded' (price for SQL license is included) and 'BasePrice' (without SQL license price).
 *
 * Known values:
 *
 * - `"LicenseIncluded"`: LicenseIncluded
 *
 * - `"BasePrice"`: BasePrice
 */
export type InstancePoolLicenseType = string;

/**
 * The job agent identity type
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"SystemAssigned"`: SystemAssigned
 *
 * - `"UserAssigned"`: UserAssigned
 *
 * - `"SystemAssignedUserAssigned"`: SystemAssignedUserAssigned
 */
export type JobAgentIdentityType = string;

/**
 * The state of the job agent.
 *
 * Known values:
 *
 * - `"Creating"`: Creating
 *
 * - `"Ready"`: Ready
 *
 * - `"Updating"`: Updating
 *
 * - `"Deleting"`: Deleting
 *
 * - `"Disabled"`: Disabled
 */
export type JobAgentState = string;

/**
 * The detailed state of the job execution.
 *
 * Known values:
 *
 * - `"Created"`: Created
 *
 * - `"InProgress"`: InProgress
 *
 * - `"WaitingForChildJobExecutions"`: WaitingForChildJobExecutions
 *
 * - `"WaitingForRetry"`: WaitingForRetry
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"SucceededWithSkipped"`: SucceededWithSkipped
 *
 * - `"Failed"`: Failed
 *
 * - `"TimedOut"`: TimedOut
 *
 * - `"Canceled"`: Canceled
 *
 * - `"Skipped"`: Skipped
 */
export type JobExecutionLifecycle = string;

/**
 * The source of the action to execute.
 *
 * Known values:
 *
 * - `"Inline"`: Inline
 */
export type JobStepActionSource = string;

/**
 * Type of action being executed by the job step.
 *
 * Known values:
 *
 * - `"TSql"`: TSql
 */
export type JobStepActionType = string;

/**
 * The output destination type.
 *
 * Known values:
 *
 * - `"SqlDatabase"`: SqlDatabase
 */
export type JobStepOutputType = string;

/**
 * The type of the target.
 *
 * Known values:
 *
 * - `"TargetGroup"`: TargetGroup
 *
 * - `"SqlDatabase"`: SqlDatabase
 *
 * - `"SqlElasticPool"`: SqlElasticPool
 *
 * - `"SqlShardMap"`: SqlShardMap
 *
 * - `"SqlServer"`: SqlServer
 */
export type JobTargetType = string;

/**
 * Known values:
 *
 * - `"current"`: current
 */
export type LedgerDigestUploadsName = string;

/**
 * SQL server side link role
 *
 * Known values:
 *
 * - `"Primary"`: Primary
 *
 * - `"Secondary"`: Secondary
 */
export type LinkRole = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type LongTermRetentionPolicyName = string;

/**
 * Managed database create mode. PointInTimeRestore: Create a database by restoring a point in time backup of an existing database. SourceDatabaseName, SourceManagedInstanceName and PointInTime must be specified. RestoreExternalBackup: Create a database by restoring from external backup files. Collation, StorageContainerUri and StorageContainerSasToken must be specified. Recovery: Creates a database by restoring a geo-replicated backup. RecoverableDatabaseId must be specified as the recoverable database resource ID to restore. RestoreLongTermRetentionBackup: Create a database by restoring from a long term retention backup (longTermRetentionBackupResourceId required).
 *
 * Known values:
 *
 * - `"Default"`: Default
 *
 * - `"RestoreExternalBackup"`: RestoreExternalBackup
 *
 * - `"PointInTimeRestore"`: PointInTimeRestore
 *
 * - `"Recovery"`: Recovery
 *
 * - `"RestoreLongTermRetentionBackup"`: RestoreLongTermRetentionBackup
 */
export type ManagedDatabaseCreateMode = string;

/**
 * Status of the database.
 *
 * Known values:
 *
 * - `"Online"`: Online
 *
 * - `"Offline"`: Offline
 *
 * - `"Shutdown"`: Shutdown
 *
 * - `"Creating"`: Creating
 *
 * - `"Inaccessible"`: Inaccessible
 *
 * - `"Restoring"`: Restoring
 *
 * - `"Updating"`: Updating
 *
 * - `"Stopping"`: Stopping
 *
 * - `"Stopped"`: Stopped
 *
 * - `"Starting"`: Starting
 *
 * - `"DbMoving"`: DbMoving
 *
 * - `"DbCopying"`: DbCopying
 */
export type ManagedDatabaseStatus = string;

/**
 * Type of the managed instance administrator.
 *
 * Known values:
 *
 * - `"ActiveDirectory"`: ActiveDirectory
 */
export type ManagedInstanceAdministratorType = string;

/**
 * Specifies the internal format of instance databases specific to the SQL engine version.
 *
 * Known values:
 *
 * - `"AlwaysUpToDate"`: AlwaysUpToDate
 *
 * - `"SQLServer2022"`: SQLServer2022
 *
 * - `"SQLServer2025"`: SQLServer2025
 */
export type ManagedInstanceDatabaseFormat = string;

/**
 * The license type. Possible values are 'LicenseIncluded' (regular price inclusive of a new SQL license) and 'BasePrice' (discounted AHB price for bringing your own SQL licenses).
 *
 * Known values:
 *
 * - `"LicenseIncluded"`: LicenseIncluded
 *
 * - `"BasePrice"`: BasePrice
 */
export type ManagedInstanceLicenseType = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type ManagedInstanceLongTermRetentionPolicyName = string;

/**
 * Connection type used for connecting to the instance.
 *
 * Known values:
 *
 * - `"Proxy"`: Proxy
 *
 * - `"Redirect"`: Redirect
 *
 * - `"Default"`: Default
 */
export type ManagedInstanceProxyOverride = string;

/**
 * Known values:
 *
 * - `"current"`: current
 */
export type ManagedLedgerDigestUploadsName = string;

/**
 * Specifies the state of ledger digest upload.
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 */
export type ManagedLedgerDigestUploadsState = string;

/**
 * Specifies the mode of database creation.
 *
 * Default: Regular instance creation.
 *
 * Restore: Creates an instance by restoring a set of backups to specific point in time. RestorePointInTime and SourceManagedInstanceId must be specified.
 *
 * Known values:
 *
 * - `"Default"`: Default
 *
 * - `"PointInTimeRestore"`: PointInTimeRestore
 */
export type ManagedServerCreateMode = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type ManagedShortTermRetentionPolicyName = string;

/**
 * The operation state.
 *
 * Known values:
 *
 * - `"Pending"`: Pending
 *
 * - `"InProgress"`: InProgress
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"Failed"`: Failed
 *
 * - `"CancelInProgress"`: CancelInProgress
 *
 * - `"Cancelled"`: Cancelled
 */
export type ManagementOperationState = string;

/**
 * Minimal TLS version. Allowed values: 'None', 1.0', '1.1', '1.2', '1.3'
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"1.0"`: 1.0
 *
 * - `"1.1"`: 1.1
 *
 * - `"1.2"`: 1.2
 *
 * - `"1.3"`: 1.3
 */
export type MinimalTlsVersion = string;

/**
 * Operation mode.
 *
 * Known values:
 *
 * - `"Move"`: Move
 *
 * - `"Copy"`: Copy
 */
export type MoveOperationMode = string;

/**
 * Operation mode of the operation: Import, Export, or PolybaseImport.
 *
 * Known values:
 *
 * - `"PolybaseImport"`: PolybaseImport
 *
 * - `"Import"`: Import
 *
 * - `"Export"`: Export
 */
export type OperationMode = string;

/**
 * Pricing model of Managed Instance.
 *
 * Known values:
 *
 * - `"Regular"`: Regular
 *
 * - `"Freemium"`: Freemium
 */
export type PricingModel = string;

/**
 * Principal Type of the sever administrator.
 *
 * Known values:
 *
 * - `"User"`: User
 *
 * - `"Group"`: Group
 *
 * - `"Application"`: Application
 */
export type PrincipalType = string;

/**
 * State of the private endpoint connection.
 *
 * Known values:
 *
 * - `"Approving"`: Approving
 *
 * - `"Ready"`: Ready
 *
 * - `"Dropping"`: Dropping
 *
 * - `"Failed"`: Failed
 *
 * - `"Rejecting"`: Rejecting
 */
export type PrivateEndpointProvisioningState = string;

/**
 * The actions required for private link service connection.
 *
 * Known values:
 *
 * - `"None"`: None
 */
export type PrivateLinkServiceConnectionStateActionsRequire = string;

/**
 * The private link service connection status.
 *
 * Known values:
 *
 * - `"Approved"`: Approved
 *
 * - `"Pending"`: Pending
 *
 * - `"Rejected"`: Rejected
 *
 * - `"Disconnected"`: Disconnected
 */
export type PrivateLinkServiceConnectionStateStatus = string;

/**
 * The ARM provisioning state of the job execution.
 *
 * Known values:
 *
 * - `"Created"`: Created
 *
 * - `"InProgress"`: InProgress
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"Failed"`: Failed
 *
 * - `"Canceled"`: Canceled
 */
export type ProvisioningState = string;

/**
 * Failover policy of the read-only endpoint for the failover group.
 *
 * Known values:
 *
 * - `"Disabled"`: Disabled
 *
 * - `"Enabled"`: Enabled
 */
export type ReadOnlyEndpointFailoverPolicy = string;

/**
 * Failover policy of the read-write endpoint for the failover group. If failoverPolicy is Automatic then failoverWithDataLossGracePeriodMinutes is required.
 *
 * Known values:
 *
 * - `"Manual"`: Manual
 *
 * - `"Automatic"`: Automatic
 */
export type ReadWriteEndpointFailoverPolicy = string;

/**
 * Current state the recommended action is in. Some commonly used states are: Active -> recommended action is active and no action has been taken yet. Pending -> recommended action is approved for and is awaiting execution. Executing -> recommended action is being applied on the user database. Verifying -> recommended action was applied and is being verified of its usefulness by the system. Success -> recommended action was applied and improvement found during verification. Pending Revert -> verification found little or no improvement so recommended action is queued for revert or user has manually reverted. Reverting -> changes made while applying recommended action are being reverted on the user database. Reverted -> successfully reverted the changes made by recommended action on user database. Ignored -> user explicitly ignored/discarded the recommended action.
 *
 * Known values:
 *
 * - `"Active"`: Active
 *
 * - `"Pending"`: Pending
 *
 * - `"Executing"`: Executing
 *
 * - `"Verifying"`: Verifying
 *
 * - `"PendingRevert"`: PendingRevert
 *
 * - `"RevertCancelled"`: RevertCancelled
 *
 * - `"Reverting"`: Reverting
 *
 * - `"Reverted"`: Reverted
 *
 * - `"Ignored"`: Ignored
 *
 * - `"Expired"`: Expired
 *
 * - `"Monitoring"`: Monitoring
 *
 * - `"Resolved"`: Resolved
 *
 * - `"Success"`: Success
 *
 * - `"Error"`: Error
 */
export type RecommendedActionCurrentState = string;

/**
 * Link connected state
 *
 * Known values:
 *
 * - `"DISCONNECTED"`: DISCONNECTED
 *
 * - `"CONNECTED"`: CONNECTED
 */
export type ReplicaConnectedState = string;

/**
 * Link health state
 *
 * Known values:
 *
 * - `"NOT_HEALTHY"`: NOT_HEALTHY
 *
 * - `"PARTIALLY_HEALTHY"`: PARTIALLY_HEALTHY
 *
 * - `"HEALTHY"`: HEALTHY
 */
export type ReplicaSynchronizationHealth = string;

/**
 * Link type (GEO, NAMED, STANDBY). Update operation does not support NAMED.
 *
 * Known values:
 *
 * - `"GEO"`: GEO
 *
 * - `"NAMED"`: NAMED
 *
 * - `"STANDBY"`: STANDBY
 */
export type ReplicationLinkType = string;

/**
 * Replication mode of the link
 *
 * Known values:
 *
 * - `"Async"`: Async
 *
 * - `"Sync"`: Sync
 */
export type ReplicationModeType = string;

/**
 * Replication state (PENDING, SEEDING, CATCHUP, SUSPENDED).
 *
 * Known values:
 *
 * - `"PENDING"`: PENDING
 *
 * - `"SEEDING"`: SEEDING
 *
 * - `"CATCH_UP"`: CATCH_UP
 *
 * - `"SUSPENDED"`: SUSPENDED
 */
export type ReplicationState = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type RestoreDetailsName = string;

/**
 * SQL Vulnerability Assessment rule severity.
 *
 * Known values:
 *
 * - `"High"`: High
 *
 * - `"Medium"`: Medium
 *
 * - `"Low"`: Low
 *
 * - `"Informational"`: Informational
 *
 * - `"Obsolete"`: Obsolete
 */
export type RuleSeverity = string;

/**
 * SQL Vulnerability Assessment baseline status
 *
 * Known values:
 *
 * - `"NonFinding"`: NonFinding
 *
 * - `"Finding"`: Finding
 *
 * - `"InternalError"`: InternalError
 */
export type RuleStatus = string;

/**
 * SQL Vulnerability Assessment rule type.
 *
 * Known values:
 *
 * - `"Binary"`: Binary
 *
 * - `"BaselineExpected"`: BaselineExpected
 *
 * - `"PositiveList"`: PositiveList
 *
 * - `"NegativeList"`: NegativeList
 */
export type RuleType = string;

/**
 * The name of the sample schema to apply when creating this database.
 *
 * Known values:
 *
 * - `"AdventureWorksLT"`: AdventureWorksLT
 *
 * - `"WideWorldImportersStd"`: WideWorldImportersStd
 *
 * - `"WideWorldImportersFull"`: WideWorldImportersFull
 */
export type SampleName = string;

/**
 * Type of the geo-secondary instance. Set 'Standby' if the instance is used as a DR option only.
 *
 * Known values:
 *
 * - `"Geo"`: Geo
 *
 * - `"Standby"`: Standby
 */
export type SecondaryInstanceType = string;

/**
 * The secondary type of the database if it is a secondary. Valid values are Geo, Named and Standby.
 *
 * Known values:
 *
 * - `"Geo"`: Geo
 *
 * - `"Named"`: Named
 *
 * - `"Standby"`: Standby
 */
export type SecondaryType = string;

/**
 * Known values:
 *
 * - `"Default"`: Default
 */
export type SecurityAlertPolicyName = string;

/**
 * Database seeding mode – can be Automatic (default), or Manual for supported scenarios.
 *
 * Known values:
 *
 * - `"Automatic"`: Automatic
 *
 * - `"Manual"`: Manual
 */
export type SeedingModeType = string;

/**
 * Known values:
 *
 * - `"allowPolybaseExport"`: allowPolybaseExport
 */
export type ServerConfigurationOptionName = string;

/**
 * The server connection type.
 *
 * Known values:
 *
 * - `"Default"`: Default
 *
 * - `"Redirect"`: Redirect
 *
 * - `"Proxy"`: Proxy
 */
export type ServerConnectionType = string;

/**
 * Create mode for server, only valid values for this are Normal and Restore.
 *
 * Known values:
 *
 * - `"Normal"`: Normal
 *
 * - `"Restore"`: Restore
 */
export type ServerCreateMode = string;

/**
 * The encryption protector type like 'ServiceManaged', 'AzureKeyVault'.
 *
 * Known values:
 *
 * - `"ServiceManaged"`: ServiceManaged
 *
 * - `"AzureKeyVault"`: AzureKeyVault
 */
export type ServerKeyType = string;

/**
 * Whether or not to restrict outbound network access for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled'
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 *
 * - `"SecuredByPerimeter"`: SecuredByPerimeter
 */
export type ServerNetworkAccessFlag = string;

/**
 * Whether or not public endpoint access is allowed for this server. Value is optional but if passed in, must be 'Enabled' or 'Disabled' or 'SecuredByPerimeter'
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 *
 * - `"SecuredByPerimeter"`: SecuredByPerimeter
 */
export type ServerPublicNetworkAccessFlag = string;

/**
 * Known values:
 *
 * - `"GlobalTransactions"`: GlobalTransactions
 *
 * - `"ServiceBroker"`: ServiceBroker
 */
export type ServerTrustGroupPropertiesTrustScopesItem = string;

/**
 * Whether or not existing server has a workspace created and if it allows connection from workspace
 *
 * Known values:
 *
 * - `"Connected"`: Connected
 *
 * - `"Disconnected"`: Disconnected
 */
export type ServerWorkspaceFeature = string;

/**
 * Service principal type.
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"SystemAssigned"`: SystemAssigned
 */
export type ServicePrincipalType = string;

/**
 * The setting for whether LegalHold is enabled or disabled on the LTR backup. When LegalHold is enabled, the backup cannot be deleted until the LegalHold is removed.
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 */
export type SetLegalHoldImmutability = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type ShortTermRetentionPolicyName = string;

/**
 * The state of Sql Agent.
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 */
export type SqlAgentConfigurationPropertiesState = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type SqlVulnerabilityAssessmentName = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type StartStopScheduleName = string;

/**
 * Storage key type: StorageAccessKey, SharedAccessKey or ManagedIdentity.
 *
 * Known values:
 *
 * - `"SharedAccessKey"`: SharedAccessKey
 *
 * - `"StorageAccessKey"`: StorageAccessKey
 *
 * - `"ManagedIdentity"`: ManagedIdentity
 */
export type StorageKeyType = string;

/**
 * State of the sync agent.
 *
 * Known values:
 *
 * - `"Online"`: Online
 *
 * - `"Offline"`: Offline
 *
 * - `"NeverConnected"`: NeverConnected
 */
export type SyncAgentState = string;

/**
 * Conflict resolution policy of the sync group.
 *
 * Known values:
 *
 * - `"HubWin"`: HubWin
 *
 * - `"MemberWin"`: MemberWin
 */
export type SyncConflictResolutionPolicy = string;

/**
 * Sync direction of the sync member.
 *
 * Known values:
 *
 * - `"Bidirectional"`: Bidirectional
 *
 * - `"OneWayMemberToHub"`: OneWayMemberToHub
 *
 * - `"OneWayHubToMember"`: OneWayHubToMember
 */
export type SyncDirection = string;

/**
 * Sync state of the sync group.
 *
 * Known values:
 *
 * - `"NotReady"`: NotReady
 *
 * - `"Error"`: Error
 *
 * - `"Warning"`: Warning
 *
 * - `"Progressing"`: Progressing
 *
 * - `"Good"`: Good
 */
export type SyncGroupState = string;

/**
 * Type of the sync agent linked database.
 *
 * Known values:
 *
 * - `"AzureSqlDatabase"`: AzureSqlDatabase
 *
 * - `"SqlServerDatabase"`: SqlServerDatabase
 */
export type SyncMemberDbType = string;

/**
 * Sync state of the sync member.
 *
 * Known values:
 *
 * - `"SyncInProgress"`: SyncInProgress
 *
 * - `"SyncSucceeded"`: SyncSucceeded
 *
 * - `"SyncFailed"`: SyncFailed
 *
 * - `"DisabledTombstoneCleanup"`: DisabledTombstoneCleanup
 *
 * - `"DisabledBackupRestore"`: DisabledBackupRestore
 *
 * - `"SyncSucceededWithWarnings"`: SyncSucceededWithWarnings
 *
 * - `"SyncCancelling"`: SyncCancelling
 *
 * - `"SyncCancelled"`: SyncCancelled
 *
 * - `"UnProvisioned"`: UnProvisioned
 *
 * - `"Provisioning"`: Provisioning
 *
 * - `"Provisioned"`: Provisioned
 *
 * - `"ProvisionFailed"`: ProvisionFailed
 *
 * - `"DeProvisioning"`: DeProvisioning
 *
 * - `"DeProvisioned"`: DeProvisioned
 *
 * - `"DeProvisionFailed"`: DeProvisionFailed
 *
 * - `"Reprovisioning"`: Reprovisioning
 *
 * - `"ReprovisionFailed"`: ReprovisionFailed
 *
 * - `"UnReprovisioned"`: UnReprovisioned
 */
export type SyncMemberState = string;

/**
 * The table temporal type.
 *
 * Known values:
 *
 * - `"NonTemporalTable"`: NonTemporalTable
 *
 * - `"HistoryTable"`: HistoryTable
 *
 * - `"SystemVersionedTemporalTable"`: SystemVersionedTemporalTable
 */
export type TableTemporalType = string;

/**
 * The setting for whether or not time-based immutability is enabled for the LTR backup. When time-based immutability is enabled and locked, the backup cannot be deleted until BackupExpirationTime.
 *
 * Known values:
 *
 * - `"Enabled"`: Enabled
 *
 * - `"Disabled"`: Disabled
 */
export type TimeBasedImmutability = string;

/**
 * The time-based immutability mode. Only applicable if time-based immutability is enabled.
 *
 * Known values:
 *
 * - `"Locked"`: Locked
 *
 * - `"Unlocked"`: Unlocked
 */
export type TimeBasedImmutabilityMode = string;

/**
 * Known values:
 *
 * - `"current"`: current
 */
export type TransparentDataEncryptionName = string;

/**
 * Specifies the encryption scan state of the transparent data encryption.
 *
 * Known values:
 *
 * - `"None"`: None
 *
 * - `"Resume"`: Resume
 *
 * - `"Running"`: Running
 *
 * - `"Suspend"`: Suspend
 *
 * - `"Aborted"`: Aborted
 *
 * - `"Completed"`: Completed
 */
export type TransparentDataEncryptionScanState = string;

/**
 * Known values:
 *
 * - `"NotStarted"`: NotStarted
 *
 * - `"InProgress"`: InProgress
 *
 * - `"SlowedDown"`: SlowedDown
 *
 * - `"Completed"`: Completed
 *
 * - `"Failed"`: Failed
 *
 * - `"Canceled"`: Canceled
 */
export type UpsertManagedServerOperationStepWithEstimatesAndDurationStatus = string;

/**
 * Virtual Network Rule State
 *
 * Known values:
 *
 * - `"Initializing"`: Initializing
 *
 * - `"InProgress"`: InProgress
 *
 * - `"Ready"`: Ready
 *
 * - `"Failed"`: Failed
 *
 * - `"Deleting"`: Deleting
 *
 * - `"Unknown"`: Unknown
 */
export type VirtualNetworkRuleState = string;

/**
 * Known values:
 *
 * - `"default"`: default
 */
export type VulnerabilityAssessmentName = string;

/**
 * The scan status.
 *
 * Known values:
 *
 * - `"Passed"`: Passed
 *
 * - `"Failed"`: Failed
 *
 * - `"FailedToRun"`: FailedToRun
 *
 * - `"InProgress"`: InProgress
 */
export type VulnerabilityAssessmentScanState = string;

/**
 * The scan trigger type.
 *
 * Known values:
 *
 * - `"OnDemand"`: OnDemand
 *
 * - `"Recurring"`: Recurring
 */
export type VulnerabilityAssessmentScanTriggerType = string;
