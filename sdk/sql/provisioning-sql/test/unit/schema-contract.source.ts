// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-sql.
 * provisioning API: @azure/provisioning-sql/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  AdministratorPropertiesInput,
  BackupShortTermRetentionPolicyPropertiesInput,
  DatabaseExtensionsPropertiesInput,
  DatabaseIdentityInput,
  DatabasePropertiesInput,
  DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput,
  DatabaseVulnerabilityAssessmentPropertiesInput,
  DatabaseVulnerabilityAssessmentRuleBaselineItemInput,
  DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput,
  DistributedAvailabilityGroupDatabaseInput,
  DistributedAvailabilityGroupPropertiesInput,
  ElasticPoolPerDatabaseSettingsInput,
  ElasticPoolPropertiesInput,
  EncryptionProtectorPropertiesInput,
  FailoverGroupReadOnlyEndpointInput,
  FailoverGroupReadWriteEndpointInput,
  IPv6ServerFirewallRulePropertiesInput,
  InstanceFailoverGroupReadOnlyEndpointInput,
  InstanceFailoverGroupReadWriteEndpointInput,
  InstancePoolPropertiesInput,
  JobAgentIdentityInput,
  JobAgentPropertiesInput,
  JobCredentialPropertiesInput,
  JobPrivateEndpointPropertiesInput,
  JobPropertiesInput,
  JobScheduleInput,
  JobStepActionInput,
  JobStepExecutionOptionsInput,
  JobStepOutputInput,
  JobTargetGroupPropertiesInput,
  JobTargetInput,
  LedgerDigestUploadsPropertiesInput,
  LongTermRetentionPolicyPropertiesInput,
  ManagedBackupShortTermRetentionPolicyPropertiesInput,
  ManagedDatabasePropertiesInput,
  ManagedInstanceAdministratorPropertiesInput,
  ManagedInstanceDtcPropertiesInput,
  ManagedInstanceDtcSecuritySettingsInput,
  ManagedInstanceDtcTransactionManagerCommunicationSettingsInput,
  ManagedInstanceEncryptionProtectorPropertiesInput,
  ManagedInstanceExternalAdministratorInput,
  ManagedInstanceKeyPropertiesInput,
  ManagedInstanceLongTermRetentionPolicyPropertiesInput,
  ManagedInstancePairInfoInput,
  ManagedInstancePrivateEndpointPropertyInput,
  ManagedInstancePrivateLinkServiceConnectionStatePropertyInput,
  ManagedInstancePropertiesInput,
  ManagedInstanceVulnerabilityAssessmentPropertiesInput,
  ManagedLedgerDigestUploadsPropertiesInput,
  NetworkIsolationSettingsInput,
  PartnerInfoInput,
  PartnerRegionInfoInput,
  PrivateEndpointPropertyInput,
  PrivateLinkServiceConnectionStatePropertyInput,
  ReplicationLinkPropertiesInput,
  ResourceIdentityInput,
  ScheduleItemInput,
  SensitivityLabelPropertiesInput,
  ServerConfigurationOptionPropertiesInput,
  ServerConnectionPolicyPropertiesInput,
  ServerExternalAdministratorInput,
  ServerFirewallRulePropertiesInput,
  ServerInfoInput,
  ServerKeyPropertiesInput,
  ServerPropertiesInput,
  ServerTrustCertificatePropertiesInput,
  ServerTrustGroupPropertiesInput,
  ServerVulnerabilityAssessmentPropertiesInput,
  ServicePrincipalInput,
  SkuInput,
  SqlAgentConfigurationPropertiesInput,
  StartStopManagedInstanceSchedulePropertiesInput,
  SyncAgentPropertiesInput,
  SyncGroupPropertiesInput,
  SyncGroupSchemaInput,
  SyncGroupSchemaTableColumnInput,
  SyncGroupSchemaTableInput,
  SyncMemberPropertiesInput,
  VirtualClusterPropertiesInput,
  VirtualNetworkRulePropertiesInput,
  VulnerabilityAssessmentRecurringScansPropertiesInput,
  WorkloadClassifierPropertiesInput,
  WorkloadGroupPropertiesInput,
} from "@azure/provisioning-sql/types";

// Accepted Bicep contract: Microsoft.Sql/servers/administrators -> AdministratorPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/administrators?pivots=deployment-language-bicep
export const administratorPropertiesServersAdministrators0fa48860a23771e5e8e7FromBicep: AdministratorPropertiesInput =
  {
    administratorType: "ActiveDirectory",
    login: "string",
    sid: "string",
    tenantId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies -> BackupShortTermRetentionPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/backupshorttermretentionpolicies?pivots=deployment-language-bicep
export const backupShortTermRetentionPolicyPropertiesServersDatabasesBackupshorttermretentionpolicies5482952c72db431ea6b8FromBicep: BackupShortTermRetentionPolicyPropertiesInput =
  {
    retentionDays: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/extensions -> DatabaseExtensionsPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/extensions?pivots=deployment-language-bicep
export const databaseExtensionsPropertiesServersDatabasesExtensionsb3f3af3f12ca5e240770FromBicep: DatabaseExtensionsPropertiesInput =
  {
    administratorLogin: "string",
    administratorLoginPassword: "string",
    authenticationType: "string",
    databaseEdition: "string",
    maxSizeBytes: "string",
    operationMode: "Export",
    serviceObjectiveName: "string",
    storageKey: "string",
    storageKeyType: "ManagedIdentity",
    storageUri: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases -> DatabaseIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases?pivots=deployment-language-bicep
export const databaseIdentityServersDatabases929a351854861e893f25FromBicep: DatabaseIdentityInput =
  {
    type: "None",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases -> DatabasePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases?pivots=deployment-language-bicep
export const databasePropertiesServersDatabases929a3518549cb8a28d59FromBicep: DatabasePropertiesInput =
  {
    autoPauseDelay: 0,
    availabilityZone: "1",
    catalogCollation: "DATABASE_DEFAULT",
    collation: "string",
    createMode: "Copy",
    elasticPoolId: "string",
    encryptionProtector: "string",
    encryptionProtectorAutoRotation: true,
    federatedClientId: "string",
    freeLimitExhaustionBehavior: "AutoPause",
    highAvailabilityReplicaCount: 0,
    isLedgerOn: true,
    licenseType: "BasePrice",
    longTermRetentionBackupResourceId: "string",
    maintenanceConfigurationId: "string",
    manualCutover: true,
    maxSizeBytes: 0,
    minCapacity: 0,
    performCutover: true,
    preferredEnclaveType: "Default",
    readScale: "Disabled",
    recoverableDatabaseId: "string",
    recoveryServicesRecoveryPointId: "string",
    requestedBackupStorageRedundancy: "Geo",
    restorableDroppedDatabaseId: "string",
    sampleName: "AdventureWorksLT",
    secondaryType: "Geo",
    sourceDatabaseId: "string",
    sourceResourceId: "string",
    useFreeLimit: true,
    zoneRedundant: true,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines/rules -> DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/sqlvulnerabilityassessments/baselines/rules?pivots=deployment-language-bicep
export const databaseSqlVulnerabilityAssessmentRuleBaselinePropertiesServersDatabasesSqlvulnerabilityassessmentsBaselinesRulesbc82740819dd1828d675FromBicep: DatabaseSqlVulnerabilityAssessmentRuleBaselinePropertiesInput =
  {
    latestScan: true,
    results: [],
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments -> DatabaseVulnerabilityAssessmentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/vulnerabilityassessments?pivots=deployment-language-bicep
export const databaseVulnerabilityAssessmentPropertiesManagedinstancesDatabasesVulnerabilityassessments0b23907291322ceadfb3FromBicep: DatabaseVulnerabilityAssessmentPropertiesInput =
  {
    storageAccountAccessKey: "string",
    storageContainerPath: "string",
    storageContainerSasKey: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/vulnerabilityAssessments -> DatabaseVulnerabilityAssessmentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/vulnerabilityassessments?pivots=deployment-language-bicep
export const databaseVulnerabilityAssessmentPropertiesServersDatabasesVulnerabilityassessmentsa8a11bfe0ef23c76e9fbFromBicep: DatabaseVulnerabilityAssessmentPropertiesInput =
  {
    storageAccountAccessKey: "string",
    storageContainerPath: "string",
    storageContainerSasKey: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines -> DatabaseVulnerabilityAssessmentRuleBaselineItemInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/vulnerabilityassessments/rules/baselines?pivots=deployment-language-bicep
export const databaseVulnerabilityAssessmentRuleBaselineItemManagedinstancesDatabasesVulnerabilityassessmentsRulesBaselines0ffcf24c074d53cb3494FromBicep: DatabaseVulnerabilityAssessmentRuleBaselineItemInput =
  {
    result: [],
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines -> DatabaseVulnerabilityAssessmentRuleBaselineItemInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/vulnerabilityassessments/rules/baselines?pivots=deployment-language-bicep
export const databaseVulnerabilityAssessmentRuleBaselineItemServersDatabasesVulnerabilityassessmentsRulesBaselines9d576c26169c81b1b6daFromBicep: DatabaseVulnerabilityAssessmentRuleBaselineItemInput =
  {
    result: [],
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines -> DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/vulnerabilityassessments/rules/baselines?pivots=deployment-language-bicep
export const databaseVulnerabilityAssessmentRuleBaselinePropertiesManagedinstancesDatabasesVulnerabilityassessmentsRulesBaselines0ffcf24c072110a84932FromBicep: DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput =
  {
    baselineResults: [],
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines -> DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/vulnerabilityassessments/rules/baselines?pivots=deployment-language-bicep
export const databaseVulnerabilityAssessmentRuleBaselinePropertiesServersDatabasesVulnerabilityassessmentsRulesBaselines9d576c261633a125a252FromBicep: DatabaseVulnerabilityAssessmentRuleBaselinePropertiesInput =
  {
    baselineResults: [],
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/distributedAvailabilityGroups -> DistributedAvailabilityGroupDatabaseInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/distributedavailabilitygroups?pivots=deployment-language-bicep
export const distributedAvailabilityGroupDatabaseManagedinstancesDistributedavailabilitygroups608bea6aec357fe47413FromBicep: DistributedAvailabilityGroupDatabaseInput =
  {
    databaseName: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/distributedAvailabilityGroups -> DistributedAvailabilityGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/distributedavailabilitygroups?pivots=deployment-language-bicep
export const distributedAvailabilityGroupPropertiesManagedinstancesDistributedavailabilitygroups608bea6aeccfd964d9f7FromBicep: DistributedAvailabilityGroupPropertiesInput =
  {
    databases: [],
    failoverMode: "Manual",
    instanceAvailabilityGroupName: "string",
    instanceLinkRole: "Primary",
    partnerAvailabilityGroupName: "string",
    partnerEndpoint: "string",
    replicationMode: "Async",
    seedingMode: "Automatic",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/elasticPools -> ElasticPoolPerDatabaseSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/elasticpools?pivots=deployment-language-bicep
export const elasticPoolPerDatabaseSettingsServersElasticpools79a9304424add01a80a8FromBicep: ElasticPoolPerDatabaseSettingsInput =
  {
    autoPauseDelay: 0,
    maxCapacity: 0,
    minCapacity: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/elasticPools -> ElasticPoolPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/elasticpools?pivots=deployment-language-bicep
export const elasticPoolPropertiesServersElasticpools79a9304424aeba9326efFromBicep: ElasticPoolPropertiesInput =
  {
    autoPauseDelay: 0,
    availabilityZone: "1",
    highAvailabilityReplicaCount: 0,
    licenseType: "BasePrice",
    maintenanceConfigurationId: "string",
    maxSizeBytes: 0,
    minCapacity: 0,
    preferredEnclaveType: "Default",
    zoneRedundant: true,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/encryptionProtector -> EncryptionProtectorPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/encryptionprotector?pivots=deployment-language-bicep
export const encryptionProtectorPropertiesServersEncryptionprotectore7ee8c7fd7281e935984FromBicep: EncryptionProtectorPropertiesInput =
  {
    autoRotationEnabled: true,
    serverKeyName: "string",
    serverKeyType: "AzureKeyVault",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/failoverGroups -> FailoverGroupReadOnlyEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/failovergroups?pivots=deployment-language-bicep
export const failoverGroupReadOnlyEndpointServersFailovergroups500aadbc2123c8574a7aFromBicep: FailoverGroupReadOnlyEndpointInput =
  {
    failoverPolicy: "Disabled",
    targetServer: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/failoverGroups -> FailoverGroupReadWriteEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/failovergroups?pivots=deployment-language-bicep
export const failoverGroupReadWriteEndpointServersFailovergroups500aadbc215e0e03aa92FromBicep: FailoverGroupReadWriteEndpointInput =
  {
    failoverPolicy: "Automatic",
    failoverWithDataLossGracePeriodMinutes: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/ipv6FirewallRules -> IPv6ServerFirewallRulePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/ipv6firewallrules?pivots=deployment-language-bicep
export const iPv6ServerFirewallRulePropertiesServersIpv6firewallrules8d80b9f777ce067cfdacFromBicep: IPv6ServerFirewallRulePropertiesInput =
  {
    endIPv6Address: "string",
    startIPv6Address: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/locations/instanceFailoverGroups -> InstanceFailoverGroupReadOnlyEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/locations/instancefailovergroups?pivots=deployment-language-bicep
export const instanceFailoverGroupReadOnlyEndpointLocationsInstancefailovergroups218e8f47060492fd2424FromBicep: InstanceFailoverGroupReadOnlyEndpointInput =
  {
    failoverPolicy: "Disabled",
  };

// Accepted Bicep contract: Microsoft.Sql/locations/instanceFailoverGroups -> InstanceFailoverGroupReadWriteEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/locations/instancefailovergroups?pivots=deployment-language-bicep
export const instanceFailoverGroupReadWriteEndpointLocationsInstancefailovergroups218e8f47068c2abd9d1bFromBicep: InstanceFailoverGroupReadWriteEndpointInput =
  {
    failoverPolicy: "Automatic",
    failoverWithDataLossGracePeriodMinutes: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/instancePools -> InstancePoolPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/instancepools?pivots=deployment-language-bicep
export const instancePoolPropertiesInstancepoolsed7684c75990a7be75b8FromBicep: InstancePoolPropertiesInput =
  {
    licenseType: "BasePrice",
    maintenanceConfigurationId: "string",
    subnetId: "string",
    vCores: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents -> JobAgentIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents?pivots=deployment-language-bicep
export const jobAgentIdentityServersJobagentsb05bfa4108d494445f02FromBicep: JobAgentIdentityInput =
  {
    tenantId: "string",
    type: "None",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents -> JobAgentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents?pivots=deployment-language-bicep
export const jobAgentPropertiesServersJobagentsb05bfa4108fd2a1d999aFromBicep: JobAgentPropertiesInput =
  {
    databaseId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/credentials -> JobCredentialPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/credentials?pivots=deployment-language-bicep
export const jobCredentialPropertiesServersJobagentsCredentials731137d43f56681e7f30FromBicep: JobCredentialPropertiesInput =
  {
    password: "string",
    username: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/privateEndpoints -> JobPrivateEndpointPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/privateendpoints?pivots=deployment-language-bicep
export const jobPrivateEndpointPropertiesServersJobagentsPrivateendpoints6fe97a43e3a067eb35b9FromBicep: JobPrivateEndpointPropertiesInput =
  {
    targetServerAzureResourceId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/jobs -> JobPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/jobs?pivots=deployment-language-bicep
export const jobPropertiesServersJobagentsJobse6092d35c63ef3dafd9dFromBicep: JobPropertiesInput = {
  description: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/jobs -> JobScheduleInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/jobs?pivots=deployment-language-bicep
export const jobScheduleServersJobagentsJobse6092d35c6a5b1ff24cdFromBicep: JobScheduleInput = {
  enabled: true,
  interval: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/jobs/steps -> JobStepActionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/jobs/steps?pivots=deployment-language-bicep
export const jobStepActionServersJobagentsJobsSteps5cee4352d1b18a4d0a38FromBicep: JobStepActionInput =
  {
    source: "Inline",
    type: "TSql",
    value: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/jobs/steps -> JobStepExecutionOptionsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/jobs/steps?pivots=deployment-language-bicep
export const jobStepExecutionOptionsServersJobagentsJobsSteps5cee4352d18c7a422392FromBicep: JobStepExecutionOptionsInput =
  {
    initialRetryIntervalSeconds: 0,
    maximumRetryIntervalSeconds: 0,
    retryAttempts: 0,
    retryIntervalBackoffMultiplier: 0,
    timeoutSeconds: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/jobs/steps -> JobStepOutputInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/jobs/steps?pivots=deployment-language-bicep
export const jobStepOutputServersJobagentsJobsSteps5cee4352d13b20d02fe6FromBicep: JobStepOutputInput =
  {
    credential: "string",
    databaseName: "string",
    resourceGroupName: "string",
    schemaName: "string",
    serverName: "string",
    subscriptionId: "string",
    tableName: "string",
    type: "SqlDatabase",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/targetGroups -> JobTargetGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/targetgroups?pivots=deployment-language-bicep
export const jobTargetGroupPropertiesServersJobagentsTargetgroups593f9204622f24cfcf91FromBicep: JobTargetGroupPropertiesInput =
  {
    members: [],
  };

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents/targetGroups -> JobTargetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents/targetgroups?pivots=deployment-language-bicep
export const jobTargetServersJobagentsTargetgroups593f92046283f34d96b0FromBicep: JobTargetInput = {
  databaseName: "string",
  elasticPoolName: "string",
  refreshCredential: "string",
  serverName: "string",
  shardMapName: "string",
  type: "SqlDatabase",
};

// Accepted Bicep contract: Microsoft.Sql/servers/databases/ledgerDigestUploads -> LedgerDigestUploadsPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/ledgerdigestuploads?pivots=deployment-language-bicep
export const ledgerDigestUploadsPropertiesServersDatabasesLedgerdigestuploads49a2bfbc466935b27da2FromBicep: LedgerDigestUploadsPropertiesInput =
  {
    digestStorageEndpoint: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies -> LongTermRetentionPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/backuplongtermretentionpolicies?pivots=deployment-language-bicep
export const longTermRetentionPolicyPropertiesServersDatabasesBackuplongtermretentionpoliciesb30374fae5b980cbd29eFromBicep: LongTermRetentionPolicyPropertiesInput =
  {
    monthlyRetention: "string",
    timeBasedImmutability: "Disabled",
    timeBasedImmutabilityMode: "Locked",
    weeklyRetention: "string",
    weekOfYear: 0,
    yearlyRetention: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/backupShortTermRetentionPolicies -> ManagedBackupShortTermRetentionPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/backupshorttermretentionpolicies?pivots=deployment-language-bicep
export const managedBackupShortTermRetentionPolicyPropertiesManagedinstancesDatabasesBackupshorttermretentionpoliciesecf83c46d4f80a1349bdFromBicep: ManagedBackupShortTermRetentionPolicyPropertiesInput =
  {
    retentionDays: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies -> ManagedBackupShortTermRetentionPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/restorabledroppeddatabases/backupshorttermretentionpolicies?pivots=deployment-language-bicep
export const managedBackupShortTermRetentionPolicyPropertiesManagedinstancesRestorabledroppeddatabasesBackupshorttermretentionpolicies5d564ed0f70bc7c5455bFromBicep: ManagedBackupShortTermRetentionPolicyPropertiesInput =
  {
    retentionDays: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases -> ManagedDatabasePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases?pivots=deployment-language-bicep
export const managedDatabasePropertiesManagedinstancesDatabasesfadee33d8693707e1d41FromBicep: ManagedDatabasePropertiesInput =
  {
    autoCompleteRestore: true,
    catalogCollation: "DATABASE_DEFAULT",
    collation: "string",
    createMode: "Default",
    crossSubscriptionRestorableDroppedDatabaseId: "string",
    crossSubscriptionSourceDatabaseId: "string",
    crossSubscriptionTargetManagedInstanceId: "string",
    isLedgerOn: true,
    lastBackupName: "string",
    longTermRetentionBackupResourceId: "string",
    recoverableDatabaseId: "string",
    restorableDroppedDatabaseId: "string",
    sourceDatabaseId: "string",
    storageContainerIdentity: "string",
    storageContainerSasToken: "string",
    storageContainerUri: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/administrators -> ManagedInstanceAdministratorPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/administrators?pivots=deployment-language-bicep
export const managedInstanceAdministratorPropertiesManagedinstancesAdministrators461ab4a5b9226715787fFromBicep: ManagedInstanceAdministratorPropertiesInput =
  {
    administratorType: "ActiveDirectory",
    login: "string",
    sid: "string",
    tenantId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/dtc -> ManagedInstanceDtcPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/dtc?pivots=deployment-language-bicep
export const managedInstanceDtcPropertiesManagedinstancesDtcf80e7866ecb450580b1cFromBicep: ManagedInstanceDtcPropertiesInput =
  {
    dtcEnabled: true,
    externalDnsSuffixSearchList: [],
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/dtc -> ManagedInstanceDtcSecuritySettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/dtc?pivots=deployment-language-bicep
export const managedInstanceDtcSecuritySettingsManagedinstancesDtcf80e7866ec075764929eFromBicep: ManagedInstanceDtcSecuritySettingsInput =
  {
    snaLu6point2TransactionsEnabled: true,
    xaTransactionsDefaultTimeout: 0,
    xaTransactionsEnabled: true,
    xaTransactionsMaximumTimeout: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/dtc -> ManagedInstanceDtcTransactionManagerCommunicationSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/dtc?pivots=deployment-language-bicep
export const managedInstanceDtcTransactionManagerCommunicationSettingsManagedinstancesDtcf80e7866ec9d494162bbFromBicep: ManagedInstanceDtcTransactionManagerCommunicationSettingsInput =
  {
    allowInboundEnabled: true,
    allowOutboundEnabled: true,
    authentication: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/encryptionProtector -> ManagedInstanceEncryptionProtectorPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/encryptionprotector?pivots=deployment-language-bicep
export const managedInstanceEncryptionProtectorPropertiesManagedinstancesEncryptionprotector60b1a502cd0a48b0ba9fFromBicep: ManagedInstanceEncryptionProtectorPropertiesInput =
  {
    autoRotationEnabled: true,
    serverKeyName: "string",
    serverKeyType: "AzureKeyVault",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances -> ManagedInstanceExternalAdministratorInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
export const managedInstanceExternalAdministratorManagedinstances6ae0c91c58b9e3227d5bFromBicep: ManagedInstanceExternalAdministratorInput =
  {
    administratorType: "ActiveDirectory",
    login: "string",
    principalType: "Application",
    sid: "string",
    tenantId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/keys -> ManagedInstanceKeyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/keys?pivots=deployment-language-bicep
export const managedInstanceKeyPropertiesManagedinstancesKeys30cfedb3e69b9ae9068bFromBicep: ManagedInstanceKeyPropertiesInput =
  {
    serverKeyType: "AzureKeyVault",
    uri: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/backupLongTermRetentionPolicies -> ManagedInstanceLongTermRetentionPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/backuplongtermretentionpolicies?pivots=deployment-language-bicep
export const managedInstanceLongTermRetentionPolicyPropertiesManagedinstancesDatabasesBackuplongtermretentionpolicies866abc30adc9af905610FromBicep: ManagedInstanceLongTermRetentionPolicyPropertiesInput =
  {
    backupStorageAccessTier: "Archive",
    monthlyRetention: "string",
    weeklyRetention: "string",
    weekOfYear: 0,
    yearlyRetention: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/locations/instanceFailoverGroups -> ManagedInstancePairInfoInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/locations/instancefailovergroups?pivots=deployment-language-bicep
export const managedInstancePairInfoLocationsInstancefailovergroups218e8f4706d8e430fc69FromBicep: ManagedInstancePairInfoInput =
  {
    partnerManagedInstanceId: "string",
    primaryManagedInstanceId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/privateEndpointConnections -> ManagedInstancePrivateEndpointPropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/privateendpointconnections?pivots=deployment-language-bicep
export const managedInstancePrivateEndpointPropertyManagedinstancesPrivateendpointconnectionsad43113b6554aad10ebdFromBicep: ManagedInstancePrivateEndpointPropertyInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/privateEndpointConnections -> ManagedInstancePrivateLinkServiceConnectionStatePropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/privateendpointconnections?pivots=deployment-language-bicep
export const managedInstancePrivateLinkServiceConnectionStatePropertyManagedinstancesPrivateendpointconnectionsad43113b65f5391ec800FromBicep: ManagedInstancePrivateLinkServiceConnectionStatePropertyInput =
  {
    description: "string",
    status: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances -> ManagedInstancePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
export const managedInstancePropertiesManagedinstances6ae0c91c58bd1a422ddeFromBicep: ManagedInstancePropertiesInput =
  {
    administratorLogin: "string",
    administratorLoginPassword: "string",
    authenticationMetadata: "AzureAD",
    collation: "string",
    databaseFormat: "AlwaysUpToDate",
    dnsZonePartner: "string",
    hybridSecondaryUsage: "Active",
    instancePoolId: "string",
    isGeneralPurposeV2: true,
    keyId: "string",
    licenseType: "BasePrice",
    maintenanceConfigurationId: "string",
    managedInstanceCreateMode: "Default",
    minimalTlsVersion: "string",
    pricingModel: "Freemium",
    primaryUserAssignedIdentityId: "string",
    proxyOverride: "Default",
    publicDataEndpointEnabled: true,
    requestedBackupStorageRedundancy: "Geo",
    requestedLogicalAvailabilityZone: "1",
    sourceManagedInstanceId: "string",
    storageIOps: 0,
    storageThroughputMBps: 0,
    subnetId: "string",
    timezoneId: "string",
    vCores: 0,
    zoneRedundant: true,
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/vulnerabilityAssessments -> ManagedInstanceVulnerabilityAssessmentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/vulnerabilityassessments?pivots=deployment-language-bicep
export const managedInstanceVulnerabilityAssessmentPropertiesManagedinstancesVulnerabilityassessments9125f314ddc442215f51FromBicep: ManagedInstanceVulnerabilityAssessmentPropertiesInput =
  {
    storageAccountAccessKey: "string",
    storageContainerPath: "string",
    storageContainerSasKey: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/ledgerDigestUploads -> ManagedLedgerDigestUploadsPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/ledgerdigestuploads?pivots=deployment-language-bicep
export const managedLedgerDigestUploadsPropertiesManagedinstancesDatabasesLedgerdigestuploads98de28d1fb151de08ac8FromBicep: ManagedLedgerDigestUploadsPropertiesInput =
  {
    digestStorageEndpoint: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/extensions -> NetworkIsolationSettingsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/extensions?pivots=deployment-language-bicep
export const networkIsolationSettingsServersDatabasesExtensionsb3f3af3f12d5aa93e879FromBicep: NetworkIsolationSettingsInput =
  {
    sqlServerResourceId: "string",
    storageAccountResourceId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/failoverGroups -> PartnerInfoInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/failovergroups?pivots=deployment-language-bicep
export const partnerInfoServersFailovergroups500aadbc21114e852b6bFromBicep: PartnerInfoInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.Sql/locations/instanceFailoverGroups -> PartnerRegionInfoInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/locations/instancefailovergroups?pivots=deployment-language-bicep
export const partnerRegionInfoLocationsInstancefailovergroups218e8f4706432b280155FromBicep: PartnerRegionInfoInput =
  {
    location: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/privateEndpointConnections -> PrivateEndpointPropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointPropertyServersPrivateendpointconnectionsdf8b8abf76391e5954a3FromBicep: PrivateEndpointPropertyInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/privateEndpointConnections -> PrivateLinkServiceConnectionStatePropertyInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/privateendpointconnections?pivots=deployment-language-bicep
export const privateLinkServiceConnectionStatePropertyServersPrivateendpointconnectionsdf8b8abf76af9d378150FromBicep: PrivateLinkServiceConnectionStatePropertyInput =
  {
    description: "string",
    status: "Approved",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/replicationLinks -> ReplicationLinkPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/replicationlinks?pivots=deployment-language-bicep
export const replicationLinkPropertiesServersDatabasesReplicationlinksa76bbe37e1097b5a7397FromBicep: ReplicationLinkPropertiesInput =
  {
    linkType: "GEO",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances -> ResourceIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
export const resourceIdentityManagedinstances6ae0c91c586fc29dff80FromBicep: ResourceIdentityInput =
  {
    type: "None",
  };

// Accepted Bicep contract: Microsoft.Sql/servers -> ResourceIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers?pivots=deployment-language-bicep
export const resourceIdentityServers31da4b74c2c7a13c3c0aFromBicep: ResourceIdentityInput = {
  type: "None",
};

// Accepted Bicep contract: Microsoft.Sql/managedInstances/startStopSchedules -> ScheduleItemInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/startstopschedules?pivots=deployment-language-bicep
export const scheduleItemManagedinstancesStartstopschedules607de88602a9b91bbee1FromBicep: ScheduleItemInput =
  {
    startDay: "Friday",
    startTime: "string",
    stopDay: "Friday",
    stopTime: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels -> SensitivityLabelPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/schemas/tables/columns/sensitivitylabels?pivots=deployment-language-bicep
export const sensitivityLabelPropertiesManagedinstancesDatabasesSchemasTablesColumnsSensitivitylabels9ddbba8053a2990d746aFromBicep: SensitivityLabelPropertiesInput =
  {
    clientClassificationSource: "MIP",
    informationType: "string",
    informationTypeId: "string",
    labelId: "string",
    labelName: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels -> SensitivityLabelPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/schemas/tables/columns/sensitivitylabels?pivots=deployment-language-bicep
export const sensitivityLabelPropertiesServersDatabasesSchemasTablesColumnsSensitivitylabels0bfd457204f00f751aa1FromBicep: SensitivityLabelPropertiesInput =
  {
    clientClassificationSource: "MIP",
    informationType: "string",
    informationTypeId: "string",
    labelId: "string",
    labelName: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/serverConfigurationOptions -> ServerConfigurationOptionPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/serverconfigurationoptions?pivots=deployment-language-bicep
export const serverConfigurationOptionPropertiesManagedinstancesServerconfigurationoptionsefa40dea83759e3d658fFromBicep: ServerConfigurationOptionPropertiesInput =
  {
    serverConfigurationOptionValue: 0,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/connectionPolicies -> ServerConnectionPolicyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/connectionpolicies?pivots=deployment-language-bicep
export const serverConnectionPolicyPropertiesServersConnectionpolicies714e9e445adf7266afb1FromBicep: ServerConnectionPolicyPropertiesInput =
  {
    connectionType: "Default",
  };

// Accepted Bicep contract: Microsoft.Sql/servers -> ServerExternalAdministratorInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers?pivots=deployment-language-bicep
export const serverExternalAdministratorServers31da4b74c22a95b78847FromBicep: ServerExternalAdministratorInput =
  {
    administratorType: "ActiveDirectory",
    login: "string",
    principalType: "Application",
    sid: "string",
    tenantId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/firewallRules -> ServerFirewallRulePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/firewallrules?pivots=deployment-language-bicep
export const serverFirewallRulePropertiesServersFirewallrules5ab43dc0eda8bba21097FromBicep: ServerFirewallRulePropertiesInput =
  {
    endIpAddress: "string",
    startIpAddress: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/locations/serverTrustGroups -> ServerInfoInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/locations/servertrustgroups?pivots=deployment-language-bicep
export const serverInfoLocationsServertrustgroups9ccb90575c921a1e4478FromBicep: ServerInfoInput = {
  serverId: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/keys -> ServerKeyPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/keys?pivots=deployment-language-bicep
export const serverKeyPropertiesServersKeys27a71c344dba88d5f761FromBicep: ServerKeyPropertiesInput =
  {
    serverKeyType: "AzureKeyVault",
    uri: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers -> ServerPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers?pivots=deployment-language-bicep
export const serverPropertiesServers31da4b74c2ebf60be59eFromBicep: ServerPropertiesInput = {
  administratorLogin: "string",
  administratorLoginPassword: "string",
  createMode: "Normal",
  federatedClientId: "string",
  isIPv6Enabled: "Disabled",
  keyId: "string",
  minimalTlsVersion: "1.0",
  primaryUserAssignedIdentityId: "string",
  publicNetworkAccess: "Disabled",
  restrictOutboundNetworkAccess: "Disabled",
  retentionDays: 0,
  version: "string",
};

// Accepted Bicep contract: Microsoft.Sql/managedInstances/serverTrustCertificates -> ServerTrustCertificatePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/servertrustcertificates?pivots=deployment-language-bicep
export const serverTrustCertificatePropertiesManagedinstancesServertrustcertificatese2a47def307b2ee2d7b9FromBicep: ServerTrustCertificatePropertiesInput =
  {
    publicBlob: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/locations/serverTrustGroups -> ServerTrustGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/locations/servertrustgroups?pivots=deployment-language-bicep
export const serverTrustGroupPropertiesLocationsServertrustgroups9ccb90575c86f6190530FromBicep: ServerTrustGroupPropertiesInput =
  {
    groupMembers: [],
    trustScopes: [],
  };

// Accepted Bicep contract: Microsoft.Sql/servers/vulnerabilityAssessments -> ServerVulnerabilityAssessmentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/vulnerabilityassessments?pivots=deployment-language-bicep
export const serverVulnerabilityAssessmentPropertiesServersVulnerabilityassessmentsa233088eaa02d9791ee5FromBicep: ServerVulnerabilityAssessmentPropertiesInput =
  {
    storageAccountAccessKey: "string",
    storageContainerPath: "string",
    storageContainerSasKey: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances -> ServicePrincipalInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
export const servicePrincipalManagedinstances6ae0c91c584b83429293FromBicep: ServicePrincipalInput =
  {
    type: "None",
  };

// Accepted Bicep contract: Microsoft.Sql/instancePools -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/instancepools?pivots=deployment-language-bicep
export const skuInstancepoolsed7684c759593111e0f7FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "string",
};

// Accepted Bicep contract: Microsoft.Sql/managedInstances -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
export const skuManagedinstances6ae0c91c58f535271721FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/databases -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases?pivots=deployment-language-bicep
export const skuServersDatabases929a351854b20c3d0d75FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/databases/syncGroups -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/syncgroups?pivots=deployment-language-bicep
export const skuServersDatabasesSyncgroupsb1291bd322398c15bf2aFromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/elasticPools -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/elasticpools?pivots=deployment-language-bicep
export const skuServersElasticpools79a93044244088cac906FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "string",
};

// Accepted Bicep contract: Microsoft.Sql/servers/jobAgents -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/jobagents?pivots=deployment-language-bicep
export const skuServersJobagentsb05bfa4108167424f7c6FromBicep: SkuInput = {
  capacity: 0,
  family: "string",
  name: "string",
  size: "string",
  tier: "string",
};

// Accepted Bicep contract: Microsoft.Sql/managedInstances/sqlAgent -> SqlAgentConfigurationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/sqlagent?pivots=deployment-language-bicep
export const sqlAgentConfigurationPropertiesManagedinstancesSqlagenta841b152d58afb56d5d5FromBicep: SqlAgentConfigurationPropertiesInput =
  {
    state: "Disabled",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/startStopSchedules -> StartStopManagedInstanceSchedulePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/startstopschedules?pivots=deployment-language-bicep
export const startStopManagedInstanceSchedulePropertiesManagedinstancesStartstopschedules607de88602aab9dec81bFromBicep: StartStopManagedInstanceSchedulePropertiesInput =
  {
    description: "string",
    scheduleList: [],
    timeZoneId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/syncAgents -> SyncAgentPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/syncagents?pivots=deployment-language-bicep
export const syncAgentPropertiesServersSyncagents90f5bf033e26adff10f4FromBicep: SyncAgentPropertiesInput =
  {
    syncDatabaseId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/syncGroups -> SyncGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/syncgroups?pivots=deployment-language-bicep
export const syncGroupPropertiesServersDatabasesSyncgroupsb1291bd3224b4b66006eFromBicep: SyncGroupPropertiesInput =
  {
    conflictLoggingRetentionInDays: 0,
    conflictResolutionPolicy: "HubWin",
    enableConflictLogging: true,
    hubDatabasePassword: "string",
    hubDatabaseUserName: "string",
    interval: 0,
    syncDatabaseId: "string",
    usePrivateLinkConnection: true,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/syncGroups -> SyncGroupSchemaInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/syncgroups?pivots=deployment-language-bicep
export const syncGroupSchemaServersDatabasesSyncgroupsb1291bd3223859848a84FromBicep: SyncGroupSchemaInput =
  {
    masterSyncMemberName: "string",
    tables: [],
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/syncGroups -> SyncGroupSchemaTableColumnInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/syncgroups?pivots=deployment-language-bicep
export const syncGroupSchemaTableColumnServersDatabasesSyncgroupsb1291bd322d397c51b8dFromBicep: SyncGroupSchemaTableColumnInput =
  {
    dataSize: "string",
    dataType: "string",
    quotedName: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/syncGroups -> SyncGroupSchemaTableInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/syncgroups?pivots=deployment-language-bicep
export const syncGroupSchemaTableServersDatabasesSyncgroupsb1291bd322b30523de2aFromBicep: SyncGroupSchemaTableInput =
  {
    columns: [],
    quotedName: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/syncGroups/syncMembers -> SyncMemberPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/syncgroups/syncmembers?pivots=deployment-language-bicep
export const syncMemberPropertiesServersDatabasesSyncgroupsSyncmembers5cf047ccd4cb2d467a67FromBicep: SyncMemberPropertiesInput =
  {
    databaseName: "string",
    databaseType: "AzureSqlDatabase",
    password: "string",
    serverName: "string",
    sqlServerDatabaseId: "string",
    syncAgentId: "string",
    syncDirection: "Bidirectional",
    syncMemberAzureDatabaseResourceId: "string",
    usePrivateLinkConnection: true,
    userName: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/virtualClusters -> VirtualClusterPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/virtualclusters?pivots=deployment-language-bicep
export const virtualClusterPropertiesVirtualclusters808070506ed4ae89c652FromBicep: VirtualClusterPropertiesInput =
  {
    version: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/virtualNetworkRules -> VirtualNetworkRulePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/virtualnetworkrules?pivots=deployment-language-bicep
export const virtualNetworkRulePropertiesServersVirtualnetworkrules91d40d8ca1e07b5363dcFromBicep: VirtualNetworkRulePropertiesInput =
  {
    ignoreMissingVnetServiceEndpoint: true,
    virtualNetworkSubnetId: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments -> VulnerabilityAssessmentRecurringScansPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/databases/vulnerabilityassessments?pivots=deployment-language-bicep
export const vulnerabilityAssessmentRecurringScansPropertiesManagedinstancesDatabasesVulnerabilityassessments0b239072912ffdf66026FromBicep: VulnerabilityAssessmentRecurringScansPropertiesInput =
  {
    emails: [],
    emailSubscriptionAdmins: true,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.Sql/managedInstances/vulnerabilityAssessments -> VulnerabilityAssessmentRecurringScansPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances/vulnerabilityassessments?pivots=deployment-language-bicep
export const vulnerabilityAssessmentRecurringScansPropertiesManagedinstancesVulnerabilityassessments9125f314dd32eda72146FromBicep: VulnerabilityAssessmentRecurringScansPropertiesInput =
  {
    emails: [],
    emailSubscriptionAdmins: true,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/vulnerabilityAssessments -> VulnerabilityAssessmentRecurringScansPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/vulnerabilityassessments?pivots=deployment-language-bicep
export const vulnerabilityAssessmentRecurringScansPropertiesServersDatabasesVulnerabilityassessmentsa8a11bfe0ec9b4e0d3c2FromBicep: VulnerabilityAssessmentRecurringScansPropertiesInput =
  {
    emails: [],
    emailSubscriptionAdmins: true,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/vulnerabilityAssessments -> VulnerabilityAssessmentRecurringScansPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/vulnerabilityassessments?pivots=deployment-language-bicep
export const vulnerabilityAssessmentRecurringScansPropertiesServersVulnerabilityassessmentsa233088eaaf2c5d2c7e2FromBicep: VulnerabilityAssessmentRecurringScansPropertiesInput =
  {
    emails: [],
    emailSubscriptionAdmins: true,
    isEnabled: true,
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/workloadGroups/workloadClassifiers -> WorkloadClassifierPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/workloadgroups/workloadclassifiers?pivots=deployment-language-bicep
export const workloadClassifierPropertiesServersDatabasesWorkloadgroupsWorkloadclassifiers07bd398ae2031e35b0b3FromBicep: WorkloadClassifierPropertiesInput =
  {
    context: "string",
    endTime: "string",
    importance: "string",
    label: "string",
    memberName: "string",
    startTime: "string",
  };

// Accepted Bicep contract: Microsoft.Sql/servers/databases/workloadGroups -> WorkloadGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/workloadgroups?pivots=deployment-language-bicep
export const workloadGroupPropertiesServersDatabasesWorkloadgroupsb8b87d6b806be0695bf0FromBicep: WorkloadGroupPropertiesInput =
  {
    importance: "string",
    maxResourcePercent: 0,
    maxResourcePercentPerRequest: 0,
    minResourcePercent: 0,
    minResourcePercentPerRequest: 0,
    queryExecutionTimeout: 0,
  };

// Bicep baseline: Microsoft.Sql/managedInstances.properties.administrators.azureADOnlyAuthentication (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
// provisioning input: ManagedInstanceExternalAdministratorInput.azureADOnlyAuthentication
export const managedInstanceExternalAdministratorWithAzureADOnlyAuthenticationManagedinstances6ae0c91c5855ed258be1FromBicep: ManagedInstanceExternalAdministratorInput =
  {
    azureAdOnlyAuthentication: true,
  };

// Bicep baseline: Microsoft.Sql/managedInstances.properties.memorySizeInGB (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
// provisioning input: ManagedInstancePropertiesInput.memorySizeInGB
export const managedInstancePropertiesWithMemorySizeInGBManagedinstances6ae0c91c584dd8e2b845FromBicep: ManagedInstancePropertiesInput =
  {
    memorySizeInGb: 0,
  };

// Bicep baseline: Microsoft.Sql/managedInstances.properties.storageSizeInGB (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/managedinstances?pivots=deployment-language-bicep
// provisioning input: ManagedInstancePropertiesInput.storageSizeInGB
export const managedInstancePropertiesWithStorageSizeInGBManagedinstances6ae0c91c58647a9557caFromBicep: ManagedInstancePropertiesInput =
  {
    storageSizeInGb: 0,
  };

// Bicep baseline: Microsoft.Sql/servers.properties.administrators.azureADOnlyAuthentication (bicep-writable-cdk-readonly-or-absent).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers?pivots=deployment-language-bicep
// provisioning input: ServerExternalAdministratorInput.azureADOnlyAuthentication
export const serverExternalAdministratorWithAzureADOnlyAuthenticationServers31da4b74c2f737b293c1FromBicep: ServerExternalAdministratorInput =
  {
    azureAdOnlyAuthentication: true,
  };

// Bicep baseline: Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies.properties.diffBackupIntervalInHours (cdk-enum-restricts-bicep-primitive).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/2025-01-01/servers/databases/backupshorttermretentionpolicies?pivots=deployment-language-bicep
// provisioning input: BackupShortTermRetentionPolicyPropertiesInput.diffBackupIntervalInHours
export const backupShortTermRetentionPolicyPropertiesWithDiffBackupIntervalInHours0ServersDatabasesBackupshorttermretentionpolicies5482952c726f95c4a93eFromBicep: BackupShortTermRetentionPolicyPropertiesInput =
  {
    diffBackupIntervalInHours: 12,
  };
