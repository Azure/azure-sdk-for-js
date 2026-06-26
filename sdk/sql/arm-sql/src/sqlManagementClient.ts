// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SqlManagementContext,
  SqlManagementClientOptionalParams,
  createSqlManagement,
} from "./api/index.js";
import {
  BackupShortTermRetentionPoliciesOperations,
  _getBackupShortTermRetentionPoliciesOperations,
} from "./classic/backupShortTermRetentionPolicies/index.js";
import {
  CapabilitiesOperations,
  _getCapabilitiesOperations,
} from "./classic/capabilities/index.js";
import {
  DataMaskingPoliciesOperations,
  _getDataMaskingPoliciesOperations,
} from "./classic/dataMaskingPolicies/index.js";
import {
  DataMaskingRulesOperations,
  _getDataMaskingRulesOperations,
} from "./classic/dataMaskingRules/index.js";
import {
  DataWarehouseUserActivitiesOperationsOperations,
  _getDataWarehouseUserActivitiesOperationsOperations,
} from "./classic/dataWarehouseUserActivitiesOperations/index.js";
import {
  DatabaseAdvancedThreatProtectionSettingsOperations,
  _getDatabaseAdvancedThreatProtectionSettingsOperations,
} from "./classic/databaseAdvancedThreatProtectionSettings/index.js";
import {
  DatabaseAdvisorsOperations,
  _getDatabaseAdvisorsOperations,
} from "./classic/databaseAdvisors/index.js";
import {
  DatabaseAutomaticTuningOperationsOperations,
  _getDatabaseAutomaticTuningOperationsOperations,
} from "./classic/databaseAutomaticTuningOperations/index.js";
import {
  DatabaseBlobAuditingPoliciesOperations,
  _getDatabaseBlobAuditingPoliciesOperations,
} from "./classic/databaseBlobAuditingPolicies/index.js";
import {
  DatabaseColumnsOperations,
  _getDatabaseColumnsOperations,
} from "./classic/databaseColumns/index.js";
import {
  DatabaseEncryptionProtectorsOperations,
  _getDatabaseEncryptionProtectorsOperations,
} from "./classic/databaseEncryptionProtectors/index.js";
import {
  DatabaseExtensionsOperationsOperations,
  _getDatabaseExtensionsOperationsOperations,
} from "./classic/databaseExtensionsOperations/index.js";
import {
  DatabaseOperationsOperations,
  _getDatabaseOperationsOperations,
} from "./classic/databaseOperations/index.js";
import {
  DatabaseRecommendedActionsOperations,
  _getDatabaseRecommendedActionsOperations,
} from "./classic/databaseRecommendedActions/index.js";
import {
  DatabaseSchemasOperations,
  _getDatabaseSchemasOperations,
} from "./classic/databaseSchemas/index.js";
import {
  DatabaseSecurityAlertPoliciesOperations,
  _getDatabaseSecurityAlertPoliciesOperations,
} from "./classic/databaseSecurityAlertPolicies/index.js";
import {
  DatabaseSqlVulnerabilityAssessmentBaselinesOperations,
  _getDatabaseSqlVulnerabilityAssessmentBaselinesOperations,
} from "./classic/databaseSqlVulnerabilityAssessmentBaselines/index.js";
import {
  DatabaseSqlVulnerabilityAssessmentExecuteScanOperations,
  _getDatabaseSqlVulnerabilityAssessmentExecuteScanOperations,
} from "./classic/databaseSqlVulnerabilityAssessmentExecuteScan/index.js";
import {
  DatabaseSqlVulnerabilityAssessmentRuleBaselinesOperations,
  _getDatabaseSqlVulnerabilityAssessmentRuleBaselinesOperations,
} from "./classic/databaseSqlVulnerabilityAssessmentRuleBaselines/index.js";
import {
  DatabaseSqlVulnerabilityAssessmentScanResultOperations,
  _getDatabaseSqlVulnerabilityAssessmentScanResultOperations,
} from "./classic/databaseSqlVulnerabilityAssessmentScanResult/index.js";
import {
  DatabaseSqlVulnerabilityAssessmentScansOperations,
  _getDatabaseSqlVulnerabilityAssessmentScansOperations,
} from "./classic/databaseSqlVulnerabilityAssessmentScans/index.js";
import {
  DatabaseSqlVulnerabilityAssessmentsSettingsOperations,
  _getDatabaseSqlVulnerabilityAssessmentsSettingsOperations,
} from "./classic/databaseSqlVulnerabilityAssessmentsSettings/index.js";
import {
  DatabaseTablesOperations,
  _getDatabaseTablesOperations,
} from "./classic/databaseTables/index.js";
import {
  DatabaseUsagesOperations,
  _getDatabaseUsagesOperations,
} from "./classic/databaseUsages/index.js";
import {
  DatabaseVulnerabilityAssessmentRuleBaselinesOperations,
  _getDatabaseVulnerabilityAssessmentRuleBaselinesOperations,
} from "./classic/databaseVulnerabilityAssessmentRuleBaselines/index.js";
import {
  DatabaseVulnerabilityAssessmentScansOperations,
  _getDatabaseVulnerabilityAssessmentScansOperations,
} from "./classic/databaseVulnerabilityAssessmentScans/index.js";
import {
  DatabaseVulnerabilityAssessmentsOperations,
  _getDatabaseVulnerabilityAssessmentsOperations,
} from "./classic/databaseVulnerabilityAssessments/index.js";
import { DatabasesOperations, _getDatabasesOperations } from "./classic/databases/index.js";
import {
  DeletedServersOperations,
  _getDeletedServersOperations,
} from "./classic/deletedServers/index.js";
import {
  DistributedAvailabilityGroupsOperations,
  _getDistributedAvailabilityGroupsOperations,
} from "./classic/distributedAvailabilityGroups/index.js";
import {
  ElasticPoolOperationsOperations,
  _getElasticPoolOperationsOperations,
} from "./classic/elasticPoolOperations/index.js";
import {
  ElasticPoolsOperations,
  _getElasticPoolsOperations,
} from "./classic/elasticPools/index.js";
import {
  EncryptionProtectorsOperations,
  _getEncryptionProtectorsOperations,
} from "./classic/encryptionProtectors/index.js";
import {
  EndpointCertificatesOperations,
  _getEndpointCertificatesOperations,
} from "./classic/endpointCertificates/index.js";
import {
  ExtendedDatabaseBlobAuditingPoliciesOperations,
  _getExtendedDatabaseBlobAuditingPoliciesOperations,
} from "./classic/extendedDatabaseBlobAuditingPolicies/index.js";
import {
  ExtendedServerBlobAuditingPoliciesOperations,
  _getExtendedServerBlobAuditingPoliciesOperations,
} from "./classic/extendedServerBlobAuditingPolicies/index.js";
import {
  FailoverGroupsOperations,
  _getFailoverGroupsOperations,
} from "./classic/failoverGroups/index.js";
import {
  FirewallRulesOperations,
  _getFirewallRulesOperations,
} from "./classic/firewallRules/index.js";
import {
  GeoBackupPoliciesOperations,
  _getGeoBackupPoliciesOperations,
} from "./classic/geoBackupPolicies/index.js";
import {
  IPv6FirewallRulesOperations,
  _getIPv6FirewallRulesOperations,
} from "./classic/iPv6FirewallRules/index.js";
import {
  InstanceFailoverGroupsOperations,
  _getInstanceFailoverGroupsOperations,
} from "./classic/instanceFailoverGroups/index.js";
import {
  InstancePoolOperationsOperations,
  _getInstancePoolOperationsOperations,
} from "./classic/instancePoolOperations/index.js";
import {
  InstancePoolsOperations,
  _getInstancePoolsOperations,
} from "./classic/instancePools/index.js";
import { JobAgentsOperations, _getJobAgentsOperations } from "./classic/jobAgents/index.js";
import {
  JobCredentialsOperations,
  _getJobCredentialsOperations,
} from "./classic/jobCredentials/index.js";
import {
  JobExecutionsOperations,
  _getJobExecutionsOperations,
} from "./classic/jobExecutions/index.js";
import {
  JobPrivateEndpointsOperations,
  _getJobPrivateEndpointsOperations,
} from "./classic/jobPrivateEndpoints/index.js";
import {
  JobStepExecutionsOperations,
  _getJobStepExecutionsOperations,
} from "./classic/jobStepExecutions/index.js";
import { JobStepsOperations, _getJobStepsOperations } from "./classic/jobSteps/index.js";
import {
  JobTargetExecutionsOperations,
  _getJobTargetExecutionsOperations,
} from "./classic/jobTargetExecutions/index.js";
import {
  JobTargetGroupsOperations,
  _getJobTargetGroupsOperations,
} from "./classic/jobTargetGroups/index.js";
import { JobVersionsOperations, _getJobVersionsOperations } from "./classic/jobVersions/index.js";
import { JobsOperations, _getJobsOperations } from "./classic/jobs/index.js";
import {
  LedgerDigestUploadsOperationsOperations,
  _getLedgerDigestUploadsOperationsOperations,
} from "./classic/ledgerDigestUploadsOperations/index.js";
import {
  LongTermRetentionBackupsOperations,
  _getLongTermRetentionBackupsOperations,
} from "./classic/longTermRetentionBackups/index.js";
import {
  LongTermRetentionManagedInstanceBackupsOperations,
  _getLongTermRetentionManagedInstanceBackupsOperations,
} from "./classic/longTermRetentionManagedInstanceBackups/index.js";
import {
  LongTermRetentionPoliciesOperations,
  _getLongTermRetentionPoliciesOperations,
} from "./classic/longTermRetentionPolicies/index.js";
import {
  MaintenanceWindowOptionsOperationsOperations,
  _getMaintenanceWindowOptionsOperationsOperations,
} from "./classic/maintenanceWindowOptionsOperations/index.js";
import {
  MaintenanceWindowsOperationsOperations,
  _getMaintenanceWindowsOperationsOperations,
} from "./classic/maintenanceWindowsOperations/index.js";
import {
  ManagedBackupShortTermRetentionPoliciesOperations,
  _getManagedBackupShortTermRetentionPoliciesOperations,
} from "./classic/managedBackupShortTermRetentionPolicies/index.js";
import {
  ManagedDatabaseAdvancedThreatProtectionSettingsOperations,
  _getManagedDatabaseAdvancedThreatProtectionSettingsOperations,
} from "./classic/managedDatabaseAdvancedThreatProtectionSettings/index.js";
import {
  ManagedDatabaseColumnsOperations,
  _getManagedDatabaseColumnsOperations,
} from "./classic/managedDatabaseColumns/index.js";
import {
  ManagedDatabaseMoveOperationsOperations,
  _getManagedDatabaseMoveOperationsOperations,
} from "./classic/managedDatabaseMoveOperations/index.js";
import {
  ManagedDatabaseQueriesOperations,
  _getManagedDatabaseQueriesOperations,
} from "./classic/managedDatabaseQueries/index.js";
import {
  ManagedDatabaseRecommendedSensitivityLabelsOperations,
  _getManagedDatabaseRecommendedSensitivityLabelsOperations,
} from "./classic/managedDatabaseRecommendedSensitivityLabels/index.js";
import {
  ManagedDatabaseRestoreDetailsOperations,
  _getManagedDatabaseRestoreDetailsOperations,
} from "./classic/managedDatabaseRestoreDetails/index.js";
import {
  ManagedDatabaseSchemasOperations,
  _getManagedDatabaseSchemasOperations,
} from "./classic/managedDatabaseSchemas/index.js";
import {
  ManagedDatabaseSecurityAlertPoliciesOperations,
  _getManagedDatabaseSecurityAlertPoliciesOperations,
} from "./classic/managedDatabaseSecurityAlertPolicies/index.js";
import {
  ManagedDatabaseSecurityEventsOperations,
  _getManagedDatabaseSecurityEventsOperations,
} from "./classic/managedDatabaseSecurityEvents/index.js";
import {
  ManagedDatabaseSensitivityLabelsOperations,
  _getManagedDatabaseSensitivityLabelsOperations,
} from "./classic/managedDatabaseSensitivityLabels/index.js";
import {
  ManagedDatabaseTablesOperations,
  _getManagedDatabaseTablesOperations,
} from "./classic/managedDatabaseTables/index.js";
import {
  ManagedDatabaseTransparentDataEncryptionOperations,
  _getManagedDatabaseTransparentDataEncryptionOperations,
} from "./classic/managedDatabaseTransparentDataEncryption/index.js";
import {
  ManagedDatabaseVulnerabilityAssessmentRuleBaselinesOperations,
  _getManagedDatabaseVulnerabilityAssessmentRuleBaselinesOperations,
} from "./classic/managedDatabaseVulnerabilityAssessmentRuleBaselines/index.js";
import {
  ManagedDatabaseVulnerabilityAssessmentScansOperations,
  _getManagedDatabaseVulnerabilityAssessmentScansOperations,
} from "./classic/managedDatabaseVulnerabilityAssessmentScans/index.js";
import {
  ManagedDatabaseVulnerabilityAssessmentsOperations,
  _getManagedDatabaseVulnerabilityAssessmentsOperations,
} from "./classic/managedDatabaseVulnerabilityAssessments/index.js";
import {
  ManagedDatabasesOperations,
  _getManagedDatabasesOperations,
} from "./classic/managedDatabases/index.js";
import {
  ManagedInstanceAdministratorsOperations,
  _getManagedInstanceAdministratorsOperations,
} from "./classic/managedInstanceAdministrators/index.js";
import {
  ManagedInstanceAdvancedThreatProtectionSettingsOperations,
  _getManagedInstanceAdvancedThreatProtectionSettingsOperations,
} from "./classic/managedInstanceAdvancedThreatProtectionSettings/index.js";
import {
  ManagedInstanceAzureADOnlyAuthenticationsOperations,
  _getManagedInstanceAzureADOnlyAuthenticationsOperations,
} from "./classic/managedInstanceAzureADOnlyAuthentications/index.js";
import {
  ManagedInstanceDtcsOperations,
  _getManagedInstanceDtcsOperations,
} from "./classic/managedInstanceDtcs/index.js";
import {
  ManagedInstanceEncryptionProtectorsOperations,
  _getManagedInstanceEncryptionProtectorsOperations,
} from "./classic/managedInstanceEncryptionProtectors/index.js";
import {
  ManagedInstanceKeysOperations,
  _getManagedInstanceKeysOperations,
} from "./classic/managedInstanceKeys/index.js";
import {
  ManagedInstanceLongTermRetentionPoliciesOperations,
  _getManagedInstanceLongTermRetentionPoliciesOperations,
} from "./classic/managedInstanceLongTermRetentionPolicies/index.js";
import {
  ManagedInstanceOperationsOperations,
  _getManagedInstanceOperationsOperations,
} from "./classic/managedInstanceOperations/index.js";
import {
  ManagedInstancePrivateEndpointConnectionsOperations,
  _getManagedInstancePrivateEndpointConnectionsOperations,
} from "./classic/managedInstancePrivateEndpointConnections/index.js";
import {
  ManagedInstancePrivateLinkResourcesOperations,
  _getManagedInstancePrivateLinkResourcesOperations,
} from "./classic/managedInstancePrivateLinkResources/index.js";
import {
  ManagedInstanceTdeCertificatesOperations,
  _getManagedInstanceTdeCertificatesOperations,
} from "./classic/managedInstanceTdeCertificates/index.js";
import {
  ManagedInstanceVulnerabilityAssessmentsOperations,
  _getManagedInstanceVulnerabilityAssessmentsOperations,
} from "./classic/managedInstanceVulnerabilityAssessments/index.js";
import {
  ManagedInstancesOperations,
  _getManagedInstancesOperations,
} from "./classic/managedInstances/index.js";
import {
  ManagedLedgerDigestUploadsOperationsOperations,
  _getManagedLedgerDigestUploadsOperationsOperations,
} from "./classic/managedLedgerDigestUploadsOperations/index.js";
import {
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations,
  _getManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations,
} from "./classic/managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies/index.js";
import {
  ManagedServerDnsAliasesOperations,
  _getManagedServerDnsAliasesOperations,
} from "./classic/managedServerDnsAliases/index.js";
import {
  ManagedServerSecurityAlertPoliciesOperations,
  _getManagedServerSecurityAlertPoliciesOperations,
} from "./classic/managedServerSecurityAlertPolicies/index.js";
import {
  NetworkSecurityPerimeterConfigurationsOperations,
  _getNetworkSecurityPerimeterConfigurationsOperations,
} from "./classic/networkSecurityPerimeterConfigurations/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  OutboundFirewallRulesOperations,
  _getOutboundFirewallRulesOperations,
} from "./classic/outboundFirewallRules/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  RecommendedSensitivityLabelsOperations,
  _getRecommendedSensitivityLabelsOperations,
} from "./classic/recommendedSensitivityLabels/index.js";
import {
  RecoverableDatabasesOperations,
  _getRecoverableDatabasesOperations,
} from "./classic/recoverableDatabases/index.js";
import {
  RecoverableManagedDatabasesOperations,
  _getRecoverableManagedDatabasesOperations,
} from "./classic/recoverableManagedDatabases/index.js";
import {
  ReplicationLinksOperations,
  _getReplicationLinksOperations,
} from "./classic/replicationLinks/index.js";
import {
  RestorableDroppedDatabasesOperations,
  _getRestorableDroppedDatabasesOperations,
} from "./classic/restorableDroppedDatabases/index.js";
import {
  RestorableDroppedManagedDatabasesOperations,
  _getRestorableDroppedManagedDatabasesOperations,
} from "./classic/restorableDroppedManagedDatabases/index.js";
import {
  RestorePointsOperations,
  _getRestorePointsOperations,
} from "./classic/restorePoints/index.js";
import {
  SensitivityLabelsOperations,
  _getSensitivityLabelsOperations,
} from "./classic/sensitivityLabels/index.js";
import {
  ServerAdvancedThreatProtectionSettingsOperations,
  _getServerAdvancedThreatProtectionSettingsOperations,
} from "./classic/serverAdvancedThreatProtectionSettings/index.js";
import {
  ServerAdvisorsOperations,
  _getServerAdvisorsOperations,
} from "./classic/serverAdvisors/index.js";
import {
  ServerAutomaticTuningOperationsOperations,
  _getServerAutomaticTuningOperationsOperations,
} from "./classic/serverAutomaticTuningOperations/index.js";
import {
  ServerAzureADAdministratorsOperations,
  _getServerAzureADAdministratorsOperations,
} from "./classic/serverAzureADAdministrators/index.js";
import {
  ServerAzureADOnlyAuthenticationsOperations,
  _getServerAzureADOnlyAuthenticationsOperations,
} from "./classic/serverAzureADOnlyAuthentications/index.js";
import {
  ServerBlobAuditingPoliciesOperations,
  _getServerBlobAuditingPoliciesOperations,
} from "./classic/serverBlobAuditingPolicies/index.js";
import {
  ServerConfigurationOptionsOperations,
  _getServerConfigurationOptionsOperations,
} from "./classic/serverConfigurationOptions/index.js";
import {
  ServerConnectionPoliciesOperations,
  _getServerConnectionPoliciesOperations,
} from "./classic/serverConnectionPolicies/index.js";
import {
  ServerDevOpsAuditSettingsOperations,
  _getServerDevOpsAuditSettingsOperations,
} from "./classic/serverDevOpsAuditSettings/index.js";
import {
  ServerDnsAliasesOperations,
  _getServerDnsAliasesOperations,
} from "./classic/serverDnsAliases/index.js";
import { ServerKeysOperations, _getServerKeysOperations } from "./classic/serverKeys/index.js";
import {
  ServerOperationsOperations,
  _getServerOperationsOperations,
} from "./classic/serverOperations/index.js";
import {
  ServerSecurityAlertPoliciesOperations,
  _getServerSecurityAlertPoliciesOperations,
} from "./classic/serverSecurityAlertPolicies/index.js";
import {
  ServerTrustCertificatesOperations,
  _getServerTrustCertificatesOperations,
} from "./classic/serverTrustCertificates/index.js";
import {
  ServerTrustGroupsOperations,
  _getServerTrustGroupsOperations,
} from "./classic/serverTrustGroups/index.js";
import {
  ServerUsagesOperations,
  _getServerUsagesOperations,
} from "./classic/serverUsages/index.js";
import {
  ServerVulnerabilityAssessmentsOperations,
  _getServerVulnerabilityAssessmentsOperations,
} from "./classic/serverVulnerabilityAssessments/index.js";
import { ServersOperations, _getServersOperations } from "./classic/servers/index.js";
import { SqlAgentOperations, _getSqlAgentOperations } from "./classic/sqlAgent/index.js";
import {
  SqlVulnerabilityAssessmentBaselineOperations,
  _getSqlVulnerabilityAssessmentBaselineOperations,
} from "./classic/sqlVulnerabilityAssessmentBaseline/index.js";
import {
  SqlVulnerabilityAssessmentBaselinesOperations,
  _getSqlVulnerabilityAssessmentBaselinesOperations,
} from "./classic/sqlVulnerabilityAssessmentBaselines/index.js";
import {
  SqlVulnerabilityAssessmentExecuteScanOperations,
  _getSqlVulnerabilityAssessmentExecuteScanOperations,
} from "./classic/sqlVulnerabilityAssessmentExecuteScan/index.js";
import {
  SqlVulnerabilityAssessmentRuleBaselineOperations,
  _getSqlVulnerabilityAssessmentRuleBaselineOperations,
} from "./classic/sqlVulnerabilityAssessmentRuleBaseline/index.js";
import {
  SqlVulnerabilityAssessmentRuleBaselinesOperations,
  _getSqlVulnerabilityAssessmentRuleBaselinesOperations,
} from "./classic/sqlVulnerabilityAssessmentRuleBaselines/index.js";
import {
  SqlVulnerabilityAssessmentScanResultOperations,
  _getSqlVulnerabilityAssessmentScanResultOperations,
} from "./classic/sqlVulnerabilityAssessmentScanResult/index.js";
import {
  SqlVulnerabilityAssessmentScansOperations,
  _getSqlVulnerabilityAssessmentScansOperations,
} from "./classic/sqlVulnerabilityAssessmentScans/index.js";
import {
  SqlVulnerabilityAssessmentsOperations,
  _getSqlVulnerabilityAssessmentsOperations,
} from "./classic/sqlVulnerabilityAssessments/index.js";
import {
  SqlVulnerabilityAssessmentsSettingsOperations,
  _getSqlVulnerabilityAssessmentsSettingsOperations,
} from "./classic/sqlVulnerabilityAssessmentsSettings/index.js";
import {
  StartStopManagedInstanceSchedulesOperations,
  _getStartStopManagedInstanceSchedulesOperations,
} from "./classic/startStopManagedInstanceSchedules/index.js";
import {
  SubscriptionUsagesOperations,
  _getSubscriptionUsagesOperations,
} from "./classic/subscriptionUsages/index.js";
import {
  SynapseLinkWorkspacesOperations,
  _getSynapseLinkWorkspacesOperations,
} from "./classic/synapseLinkWorkspaces/index.js";
import { SyncAgentsOperations, _getSyncAgentsOperations } from "./classic/syncAgents/index.js";
import { SyncGroupsOperations, _getSyncGroupsOperations } from "./classic/syncGroups/index.js";
import { SyncMembersOperations, _getSyncMembersOperations } from "./classic/syncMembers/index.js";
import {
  TdeCertificatesOperations,
  _getTdeCertificatesOperations,
} from "./classic/tdeCertificates/index.js";
import { TimeZonesOperations, _getTimeZonesOperations } from "./classic/timeZones/index.js";
import {
  TransparentDataEncryptionsOperations,
  _getTransparentDataEncryptionsOperations,
} from "./classic/transparentDataEncryptions/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import {
  VirtualClustersOperations,
  _getVirtualClustersOperations,
} from "./classic/virtualClusters/index.js";
import {
  VirtualNetworkRulesOperations,
  _getVirtualNetworkRulesOperations,
} from "./classic/virtualNetworkRules/index.js";
import {
  WorkloadClassifiersOperations,
  _getWorkloadClassifiersOperations,
} from "./classic/workloadClassifiers/index.js";
import {
  WorkloadGroupsOperations,
  _getWorkloadGroupsOperations,
} from "./classic/workloadGroups/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { SqlManagementClientOptionalParams } from "./api/sqlManagementContext.js";

export class SqlManagementClient {
  private _client: SqlManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: SqlManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SqlManagementClientOptionalParams,
  );
  /** The Azure SQL Database management API provides a RESTful set of web APIs that interact with Azure SQL Database services to manage your databases. The API enables users to create, retrieve, update, and delete databases, servers, and other entities. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SqlManagementClientOptionalParams,
    options?: SqlManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSqlManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.capabilities = _getCapabilitiesOperations(this._client);
    this.transparentDataEncryptions = _getTransparentDataEncryptionsOperations(this._client);
    this.sqlAgent = _getSqlAgentOperations(this._client);
    this.serverAutomaticTuningOperations = _getServerAutomaticTuningOperationsOperations(
      this._client,
    );
    this.serverAdvancedThreatProtectionSettings =
      _getServerAdvancedThreatProtectionSettingsOperations(this._client);
    this.managedLedgerDigestUploadsOperations = _getManagedLedgerDigestUploadsOperationsOperations(
      this._client,
    );
    this.managedInstancePrivateLinkResources = _getManagedInstancePrivateLinkResourcesOperations(
      this._client,
    );
    this.managedInstanceAdvancedThreatProtectionSettings =
      _getManagedInstanceAdvancedThreatProtectionSettingsOperations(this._client);
    this.managedDatabaseTransparentDataEncryption =
      _getManagedDatabaseTransparentDataEncryptionOperations(this._client);
    this.managedDatabaseRestoreDetails = _getManagedDatabaseRestoreDetailsOperations(this._client);
    this.managedDatabaseQueries = _getManagedDatabaseQueriesOperations(this._client);
    this.managedDatabaseMoveOperations = _getManagedDatabaseMoveOperationsOperations(this._client);
    this.managedDatabaseAdvancedThreatProtectionSettings =
      _getManagedDatabaseAdvancedThreatProtectionSettingsOperations(this._client);
    this.maintenanceWindowsOperations = _getMaintenanceWindowsOperationsOperations(this._client);
    this.maintenanceWindowOptionsOperations = _getMaintenanceWindowOptionsOperationsOperations(
      this._client,
    );
    this.ledgerDigestUploadsOperations = _getLedgerDigestUploadsOperationsOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.elasticPoolOperations = _getElasticPoolOperationsOperations(this._client);
    this.managedInstanceTdeCertificates = _getManagedInstanceTdeCertificatesOperations(
      this._client,
    );
    this.managedDatabaseRecommendedSensitivityLabels =
      _getManagedDatabaseRecommendedSensitivityLabelsOperations(this._client);
    this.managedDatabaseSecurityEvents = _getManagedDatabaseSecurityEventsOperations(this._client);
    this.dataWarehouseUserActivitiesOperations =
      _getDataWarehouseUserActivitiesOperationsOperations(this._client);
    this.dataMaskingRules = _getDataMaskingRulesOperations(this._client);
    this.databaseVulnerabilityAssessmentScans = _getDatabaseVulnerabilityAssessmentScansOperations(
      this._client,
    );
    this.databaseSqlVulnerabilityAssessmentScans =
      _getDatabaseSqlVulnerabilityAssessmentScansOperations(this._client);
    this.sqlVulnerabilityAssessmentRuleBaselines =
      _getSqlVulnerabilityAssessmentRuleBaselinesOperations(this._client);
    this.sqlVulnerabilityAssessmentExecuteScan =
      _getSqlVulnerabilityAssessmentExecuteScanOperations(this._client);
    this.databaseSqlVulnerabilityAssessmentExecuteScan =
      _getDatabaseSqlVulnerabilityAssessmentExecuteScanOperations(this._client);
    this.databaseSqlVulnerabilityAssessmentsSettings =
      _getDatabaseSqlVulnerabilityAssessmentsSettingsOperations(this._client);
    this.sqlVulnerabilityAssessmentBaselines = _getSqlVulnerabilityAssessmentBaselinesOperations(
      this._client,
    );
    this.databaseSqlVulnerabilityAssessmentBaselines =
      _getDatabaseSqlVulnerabilityAssessmentBaselinesOperations(this._client);
    this.databaseRecommendedActions = _getDatabaseRecommendedActionsOperations(this._client);
    this.databaseExtensionsOperations = _getDatabaseExtensionsOperationsOperations(this._client);
    this.databaseAutomaticTuningOperations = _getDatabaseAutomaticTuningOperationsOperations(
      this._client,
    );
    this.databaseAdvisors = _getDatabaseAdvisorsOperations(this._client);
    this.databaseAdvancedThreatProtectionSettings =
      _getDatabaseAdvancedThreatProtectionSettingsOperations(this._client);
    this.tdeCertificates = _getTdeCertificatesOperations(this._client);
    this.serverUsages = _getServerUsagesOperations(this._client);
    this.serverOperations = _getServerOperationsOperations(this._client);
    this.synapseLinkWorkspaces = _getSynapseLinkWorkspacesOperations(this._client);
    this.recommendedSensitivityLabels = _getRecommendedSensitivityLabelsOperations(this._client);
    this.databaseUsages = _getDatabaseUsagesOperations(this._client);
    this.databaseOperations = _getDatabaseOperationsOperations(this._client);
    this.databaseEncryptionProtectors = _getDatabaseEncryptionProtectorsOperations(this._client);
    this.managedDatabaseSensitivityLabels = _getManagedDatabaseSensitivityLabelsOperations(
      this._client,
    );
    this.workloadGroups = _getWorkloadGroupsOperations(this._client);
    this.workloadClassifiers = _getWorkloadClassifiersOperations(this._client);
    this.virtualNetworkRules = _getVirtualNetworkRulesOperations(this._client);
    this.virtualClusters = _getVirtualClustersOperations(this._client);
    this.timeZones = _getTimeZonesOperations(this._client);
    this.syncMembers = _getSyncMembersOperations(this._client);
    this.syncGroups = _getSyncGroupsOperations(this._client);
    this.syncAgents = _getSyncAgentsOperations(this._client);
    this.subscriptionUsages = _getSubscriptionUsagesOperations(this._client);
    this.startStopManagedInstanceSchedules = _getStartStopManagedInstanceSchedulesOperations(
      this._client,
    );
    this.serverVulnerabilityAssessments = _getServerVulnerabilityAssessmentsOperations(
      this._client,
    );
    this.serverTrustCertificates = _getServerTrustCertificatesOperations(this._client);
    this.serverSecurityAlertPolicies = _getServerSecurityAlertPoliciesOperations(this._client);
    this.serverKeys = _getServerKeysOperations(this._client);
    this.serverDnsAliases = _getServerDnsAliasesOperations(this._client);
    this.serverDevOpsAuditSettings = _getServerDevOpsAuditSettingsOperations(this._client);
    this.serverConnectionPolicies = _getServerConnectionPoliciesOperations(this._client);
    this.serverConfigurationOptions = _getServerConfigurationOptionsOperations(this._client);
    this.serverAzureADOnlyAuthentications = _getServerAzureADOnlyAuthenticationsOperations(
      this._client,
    );
    this.serverAzureADAdministrators = _getServerAzureADAdministratorsOperations(this._client);
    this.restorableDroppedManagedDatabases = _getRestorableDroppedManagedDatabasesOperations(
      this._client,
    );
    this.restorableDroppedDatabases = _getRestorableDroppedDatabasesOperations(this._client);
    this.recoverableManagedDatabases = _getRecoverableManagedDatabasesOperations(this._client);
    this.recoverableDatabases = _getRecoverableDatabasesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.outboundFirewallRules = _getOutboundFirewallRulesOperations(this._client);
    this.networkSecurityPerimeterConfigurations =
      _getNetworkSecurityPerimeterConfigurationsOperations(this._client);
    this.managedServerSecurityAlertPolicies = _getManagedServerSecurityAlertPoliciesOperations(
      this._client,
    );
    this.managedServerDnsAliases = _getManagedServerDnsAliasesOperations(this._client);
    this.managedInstanceVulnerabilityAssessments =
      _getManagedInstanceVulnerabilityAssessmentsOperations(this._client);
    this.managedInstancePrivateEndpointConnections =
      _getManagedInstancePrivateEndpointConnectionsOperations(this._client);
    this.managedInstanceOperations = _getManagedInstanceOperationsOperations(this._client);
    this.managedInstanceLongTermRetentionPolicies =
      _getManagedInstanceLongTermRetentionPoliciesOperations(this._client);
    this.managedInstanceKeys = _getManagedInstanceKeysOperations(this._client);
    this.managedInstanceEncryptionProtectors = _getManagedInstanceEncryptionProtectorsOperations(
      this._client,
    );
    this.managedInstanceDtcs = _getManagedInstanceDtcsOperations(this._client);
    this.managedInstanceAzureADOnlyAuthentications =
      _getManagedInstanceAzureADOnlyAuthenticationsOperations(this._client);
    this.managedInstanceAdministrators = _getManagedInstanceAdministratorsOperations(this._client);
    this.managedDatabaseSecurityAlertPolicies = _getManagedDatabaseSecurityAlertPoliciesOperations(
      this._client,
    );
    this.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies =
      _getManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations(this._client);
    this.managedBackupShortTermRetentionPolicies =
      _getManagedBackupShortTermRetentionPoliciesOperations(this._client);
    this.longTermRetentionPolicies = _getLongTermRetentionPoliciesOperations(this._client);
    this.longTermRetentionManagedInstanceBackups =
      _getLongTermRetentionManagedInstanceBackupsOperations(this._client);
    this.longTermRetentionBackups = _getLongTermRetentionBackupsOperations(this._client);
    this.jobVersions = _getJobVersionsOperations(this._client);
    this.jobTargetGroups = _getJobTargetGroupsOperations(this._client);
    this.jobSteps = _getJobStepsOperations(this._client);
    this.jobPrivateEndpoints = _getJobPrivateEndpointsOperations(this._client);
    this.jobs = _getJobsOperations(this._client);
    this.jobTargetExecutions = _getJobTargetExecutionsOperations(this._client);
    this.jobStepExecutions = _getJobStepExecutionsOperations(this._client);
    this.jobCredentials = _getJobCredentialsOperations(this._client);
    this.jobAgents = _getJobAgentsOperations(this._client);
    this.jobExecutions = _getJobExecutionsOperations(this._client);
    this.iPv6FirewallRules = _getIPv6FirewallRulesOperations(this._client);
    this.instancePools = _getInstancePoolsOperations(this._client);
    this.instancePoolOperations = _getInstancePoolOperationsOperations(this._client);
    this.instanceFailoverGroups = _getInstanceFailoverGroupsOperations(this._client);
    this.geoBackupPolicies = _getGeoBackupPoliciesOperations(this._client);
    this.failoverGroups = _getFailoverGroupsOperations(this._client);
    this.endpointCertificates = _getEndpointCertificatesOperations(this._client);
    this.encryptionProtectors = _getEncryptionProtectorsOperations(this._client);
    this.elasticPools = _getElasticPoolsOperations(this._client);
    this.managedInstances = _getManagedInstancesOperations(this._client);
    this.serverTrustGroups = _getServerTrustGroupsOperations(this._client);
    this.managedDatabases = _getManagedDatabasesOperations(this._client);
    this.distributedAvailabilityGroups = _getDistributedAvailabilityGroupsOperations(this._client);
    this.deletedServers = _getDeletedServersOperations(this._client);
    this.dataMaskingPolicies = _getDataMaskingPoliciesOperations(this._client);
    this.managedDatabaseVulnerabilityAssessmentScans =
      _getManagedDatabaseVulnerabilityAssessmentScansOperations(this._client);
    this.managedDatabaseVulnerabilityAssessments =
      _getManagedDatabaseVulnerabilityAssessmentsOperations(this._client);
    this.databaseVulnerabilityAssessments = _getDatabaseVulnerabilityAssessmentsOperations(
      this._client,
    );
    this.managedDatabaseVulnerabilityAssessmentRuleBaselines =
      _getManagedDatabaseVulnerabilityAssessmentRuleBaselinesOperations(this._client);
    this.databaseVulnerabilityAssessmentRuleBaselines =
      _getDatabaseVulnerabilityAssessmentRuleBaselinesOperations(this._client);
    this.sqlVulnerabilityAssessmentScans = _getSqlVulnerabilityAssessmentScansOperations(
      this._client,
    );
    this.sqlVulnerabilityAssessmentScanResult = _getSqlVulnerabilityAssessmentScanResultOperations(
      this._client,
    );
    this.databaseSqlVulnerabilityAssessmentScanResult =
      _getDatabaseSqlVulnerabilityAssessmentScanResultOperations(this._client);
    this.sqlVulnerabilityAssessmentRuleBaseline =
      _getSqlVulnerabilityAssessmentRuleBaselineOperations(this._client);
    this.databaseSqlVulnerabilityAssessmentRuleBaselines =
      _getDatabaseSqlVulnerabilityAssessmentRuleBaselinesOperations(this._client);
    this.sqlVulnerabilityAssessmentsSettings = _getSqlVulnerabilityAssessmentsSettingsOperations(
      this._client,
    );
    this.sqlVulnerabilityAssessments = _getSqlVulnerabilityAssessmentsOperations(this._client);
    this.sqlVulnerabilityAssessmentBaseline = _getSqlVulnerabilityAssessmentBaselineOperations(
      this._client,
    );
    this.databaseSecurityAlertPolicies = _getDatabaseSecurityAlertPoliciesOperations(this._client);
    this.managedDatabaseSchemas = _getManagedDatabaseSchemasOperations(this._client);
    this.databaseSchemas = _getDatabaseSchemasOperations(this._client);
    this.managedDatabaseTables = _getManagedDatabaseTablesOperations(this._client);
    this.databaseTables = _getDatabaseTablesOperations(this._client);
    this.managedDatabaseColumns = _getManagedDatabaseColumnsOperations(this._client);
    this.serverAdvisors = _getServerAdvisorsOperations(this._client);
    this.extendedServerBlobAuditingPolicies = _getExtendedServerBlobAuditingPoliciesOperations(
      this._client,
    );
    this.extendedDatabaseBlobAuditingPolicies = _getExtendedDatabaseBlobAuditingPoliciesOperations(
      this._client,
    );
    this.databaseBlobAuditingPolicies = _getDatabaseBlobAuditingPoliciesOperations(this._client);
    this.serverBlobAuditingPolicies = _getServerBlobAuditingPoliciesOperations(this._client);
    this.servers = _getServersOperations(this._client);
    this.replicationLinks = _getReplicationLinksOperations(this._client);
    this.firewallRules = _getFirewallRulesOperations(this._client);
    this.databases = _getDatabasesOperations(this._client);
    this.sensitivityLabels = _getSensitivityLabelsOperations(this._client);
    this.restorePoints = _getRestorePointsOperations(this._client);
    this.databaseColumns = _getDatabaseColumnsOperations(this._client);
    this.backupShortTermRetentionPolicies = _getBackupShortTermRetentionPoliciesOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for capabilities */
  public readonly capabilities: CapabilitiesOperations;
  /** The operation groups for transparentDataEncryptions */
  public readonly transparentDataEncryptions: TransparentDataEncryptionsOperations;
  /** The operation groups for sqlAgent */
  public readonly sqlAgent: SqlAgentOperations;
  /** The operation groups for serverAutomaticTuningOperations */
  public readonly serverAutomaticTuningOperations: ServerAutomaticTuningOperationsOperations;
  /** The operation groups for serverAdvancedThreatProtectionSettings */
  public readonly serverAdvancedThreatProtectionSettings: ServerAdvancedThreatProtectionSettingsOperations;
  /** The operation groups for managedLedgerDigestUploadsOperations */
  public readonly managedLedgerDigestUploadsOperations: ManagedLedgerDigestUploadsOperationsOperations;
  /** The operation groups for managedInstancePrivateLinkResources */
  public readonly managedInstancePrivateLinkResources: ManagedInstancePrivateLinkResourcesOperations;
  /** The operation groups for managedInstanceAdvancedThreatProtectionSettings */
  public readonly managedInstanceAdvancedThreatProtectionSettings: ManagedInstanceAdvancedThreatProtectionSettingsOperations;
  /** The operation groups for managedDatabaseTransparentDataEncryption */
  public readonly managedDatabaseTransparentDataEncryption: ManagedDatabaseTransparentDataEncryptionOperations;
  /** The operation groups for managedDatabaseRestoreDetails */
  public readonly managedDatabaseRestoreDetails: ManagedDatabaseRestoreDetailsOperations;
  /** The operation groups for managedDatabaseQueries */
  public readonly managedDatabaseQueries: ManagedDatabaseQueriesOperations;
  /** The operation groups for managedDatabaseMoveOperations */
  public readonly managedDatabaseMoveOperations: ManagedDatabaseMoveOperationsOperations;
  /** The operation groups for managedDatabaseAdvancedThreatProtectionSettings */
  public readonly managedDatabaseAdvancedThreatProtectionSettings: ManagedDatabaseAdvancedThreatProtectionSettingsOperations;
  /** The operation groups for maintenanceWindowsOperations */
  public readonly maintenanceWindowsOperations: MaintenanceWindowsOperationsOperations;
  /** The operation groups for maintenanceWindowOptionsOperations */
  public readonly maintenanceWindowOptionsOperations: MaintenanceWindowOptionsOperationsOperations;
  /** The operation groups for ledgerDigestUploadsOperations */
  public readonly ledgerDigestUploadsOperations: LedgerDigestUploadsOperationsOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for elasticPoolOperations */
  public readonly elasticPoolOperations: ElasticPoolOperationsOperations;
  /** The operation groups for managedInstanceTdeCertificates */
  public readonly managedInstanceTdeCertificates: ManagedInstanceTdeCertificatesOperations;
  /** The operation groups for managedDatabaseRecommendedSensitivityLabels */
  public readonly managedDatabaseRecommendedSensitivityLabels: ManagedDatabaseRecommendedSensitivityLabelsOperations;
  /** The operation groups for managedDatabaseSecurityEvents */
  public readonly managedDatabaseSecurityEvents: ManagedDatabaseSecurityEventsOperations;
  /** The operation groups for dataWarehouseUserActivitiesOperations */
  public readonly dataWarehouseUserActivitiesOperations: DataWarehouseUserActivitiesOperationsOperations;
  /** The operation groups for dataMaskingRules */
  public readonly dataMaskingRules: DataMaskingRulesOperations;
  /** The operation groups for databaseVulnerabilityAssessmentScans */
  public readonly databaseVulnerabilityAssessmentScans: DatabaseVulnerabilityAssessmentScansOperations;
  /** The operation groups for databaseSqlVulnerabilityAssessmentScans */
  public readonly databaseSqlVulnerabilityAssessmentScans: DatabaseSqlVulnerabilityAssessmentScansOperations;
  /** The operation groups for sqlVulnerabilityAssessmentRuleBaselines */
  public readonly sqlVulnerabilityAssessmentRuleBaselines: SqlVulnerabilityAssessmentRuleBaselinesOperations;
  /** The operation groups for sqlVulnerabilityAssessmentExecuteScan */
  public readonly sqlVulnerabilityAssessmentExecuteScan: SqlVulnerabilityAssessmentExecuteScanOperations;
  /** The operation groups for databaseSqlVulnerabilityAssessmentExecuteScan */
  public readonly databaseSqlVulnerabilityAssessmentExecuteScan: DatabaseSqlVulnerabilityAssessmentExecuteScanOperations;
  /** The operation groups for databaseSqlVulnerabilityAssessmentsSettings */
  public readonly databaseSqlVulnerabilityAssessmentsSettings: DatabaseSqlVulnerabilityAssessmentsSettingsOperations;
  /** The operation groups for sqlVulnerabilityAssessmentBaselines */
  public readonly sqlVulnerabilityAssessmentBaselines: SqlVulnerabilityAssessmentBaselinesOperations;
  /** The operation groups for databaseSqlVulnerabilityAssessmentBaselines */
  public readonly databaseSqlVulnerabilityAssessmentBaselines: DatabaseSqlVulnerabilityAssessmentBaselinesOperations;
  /** The operation groups for databaseRecommendedActions */
  public readonly databaseRecommendedActions: DatabaseRecommendedActionsOperations;
  /** The operation groups for databaseExtensionsOperations */
  public readonly databaseExtensionsOperations: DatabaseExtensionsOperationsOperations;
  /** The operation groups for databaseAutomaticTuningOperations */
  public readonly databaseAutomaticTuningOperations: DatabaseAutomaticTuningOperationsOperations;
  /** The operation groups for databaseAdvisors */
  public readonly databaseAdvisors: DatabaseAdvisorsOperations;
  /** The operation groups for databaseAdvancedThreatProtectionSettings */
  public readonly databaseAdvancedThreatProtectionSettings: DatabaseAdvancedThreatProtectionSettingsOperations;
  /** The operation groups for tdeCertificates */
  public readonly tdeCertificates: TdeCertificatesOperations;
  /** The operation groups for serverUsages */
  public readonly serverUsages: ServerUsagesOperations;
  /** The operation groups for serverOperations */
  public readonly serverOperations: ServerOperationsOperations;
  /** The operation groups for synapseLinkWorkspaces */
  public readonly synapseLinkWorkspaces: SynapseLinkWorkspacesOperations;
  /** The operation groups for recommendedSensitivityLabels */
  public readonly recommendedSensitivityLabels: RecommendedSensitivityLabelsOperations;
  /** The operation groups for databaseUsages */
  public readonly databaseUsages: DatabaseUsagesOperations;
  /** The operation groups for databaseOperations */
  public readonly databaseOperations: DatabaseOperationsOperations;
  /** The operation groups for databaseEncryptionProtectors */
  public readonly databaseEncryptionProtectors: DatabaseEncryptionProtectorsOperations;
  /** The operation groups for managedDatabaseSensitivityLabels */
  public readonly managedDatabaseSensitivityLabels: ManagedDatabaseSensitivityLabelsOperations;
  /** The operation groups for workloadGroups */
  public readonly workloadGroups: WorkloadGroupsOperations;
  /** The operation groups for workloadClassifiers */
  public readonly workloadClassifiers: WorkloadClassifiersOperations;
  /** The operation groups for virtualNetworkRules */
  public readonly virtualNetworkRules: VirtualNetworkRulesOperations;
  /** The operation groups for virtualClusters */
  public readonly virtualClusters: VirtualClustersOperations;
  /** The operation groups for timeZones */
  public readonly timeZones: TimeZonesOperations;
  /** The operation groups for syncMembers */
  public readonly syncMembers: SyncMembersOperations;
  /** The operation groups for syncGroups */
  public readonly syncGroups: SyncGroupsOperations;
  /** The operation groups for syncAgents */
  public readonly syncAgents: SyncAgentsOperations;
  /** The operation groups for subscriptionUsages */
  public readonly subscriptionUsages: SubscriptionUsagesOperations;
  /** The operation groups for startStopManagedInstanceSchedules */
  public readonly startStopManagedInstanceSchedules: StartStopManagedInstanceSchedulesOperations;
  /** The operation groups for serverVulnerabilityAssessments */
  public readonly serverVulnerabilityAssessments: ServerVulnerabilityAssessmentsOperations;
  /** The operation groups for serverTrustCertificates */
  public readonly serverTrustCertificates: ServerTrustCertificatesOperations;
  /** The operation groups for serverSecurityAlertPolicies */
  public readonly serverSecurityAlertPolicies: ServerSecurityAlertPoliciesOperations;
  /** The operation groups for serverKeys */
  public readonly serverKeys: ServerKeysOperations;
  /** The operation groups for serverDnsAliases */
  public readonly serverDnsAliases: ServerDnsAliasesOperations;
  /** The operation groups for serverDevOpsAuditSettings */
  public readonly serverDevOpsAuditSettings: ServerDevOpsAuditSettingsOperations;
  /** The operation groups for serverConnectionPolicies */
  public readonly serverConnectionPolicies: ServerConnectionPoliciesOperations;
  /** The operation groups for serverConfigurationOptions */
  public readonly serverConfigurationOptions: ServerConfigurationOptionsOperations;
  /** The operation groups for serverAzureADOnlyAuthentications */
  public readonly serverAzureADOnlyAuthentications: ServerAzureADOnlyAuthenticationsOperations;
  /** The operation groups for serverAzureADAdministrators */
  public readonly serverAzureADAdministrators: ServerAzureADAdministratorsOperations;
  /** The operation groups for restorableDroppedManagedDatabases */
  public readonly restorableDroppedManagedDatabases: RestorableDroppedManagedDatabasesOperations;
  /** The operation groups for restorableDroppedDatabases */
  public readonly restorableDroppedDatabases: RestorableDroppedDatabasesOperations;
  /** The operation groups for recoverableManagedDatabases */
  public readonly recoverableManagedDatabases: RecoverableManagedDatabasesOperations;
  /** The operation groups for recoverableDatabases */
  public readonly recoverableDatabases: RecoverableDatabasesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for outboundFirewallRules */
  public readonly outboundFirewallRules: OutboundFirewallRulesOperations;
  /** The operation groups for networkSecurityPerimeterConfigurations */
  public readonly networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurationsOperations;
  /** The operation groups for managedServerSecurityAlertPolicies */
  public readonly managedServerSecurityAlertPolicies: ManagedServerSecurityAlertPoliciesOperations;
  /** The operation groups for managedServerDnsAliases */
  public readonly managedServerDnsAliases: ManagedServerDnsAliasesOperations;
  /** The operation groups for managedInstanceVulnerabilityAssessments */
  public readonly managedInstanceVulnerabilityAssessments: ManagedInstanceVulnerabilityAssessmentsOperations;
  /** The operation groups for managedInstancePrivateEndpointConnections */
  public readonly managedInstancePrivateEndpointConnections: ManagedInstancePrivateEndpointConnectionsOperations;
  /** The operation groups for managedInstanceOperations */
  public readonly managedInstanceOperations: ManagedInstanceOperationsOperations;
  /** The operation groups for managedInstanceLongTermRetentionPolicies */
  public readonly managedInstanceLongTermRetentionPolicies: ManagedInstanceLongTermRetentionPoliciesOperations;
  /** The operation groups for managedInstanceKeys */
  public readonly managedInstanceKeys: ManagedInstanceKeysOperations;
  /** The operation groups for managedInstanceEncryptionProtectors */
  public readonly managedInstanceEncryptionProtectors: ManagedInstanceEncryptionProtectorsOperations;
  /** The operation groups for managedInstanceDtcs */
  public readonly managedInstanceDtcs: ManagedInstanceDtcsOperations;
  /** The operation groups for managedInstanceAzureADOnlyAuthentications */
  public readonly managedInstanceAzureADOnlyAuthentications: ManagedInstanceAzureADOnlyAuthenticationsOperations;
  /** The operation groups for managedInstanceAdministrators */
  public readonly managedInstanceAdministrators: ManagedInstanceAdministratorsOperations;
  /** The operation groups for managedDatabaseSecurityAlertPolicies */
  public readonly managedDatabaseSecurityAlertPolicies: ManagedDatabaseSecurityAlertPoliciesOperations;
  /** The operation groups for managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies */
  public readonly managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies: ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesOperations;
  /** The operation groups for managedBackupShortTermRetentionPolicies */
  public readonly managedBackupShortTermRetentionPolicies: ManagedBackupShortTermRetentionPoliciesOperations;
  /** The operation groups for longTermRetentionPolicies */
  public readonly longTermRetentionPolicies: LongTermRetentionPoliciesOperations;
  /** The operation groups for longTermRetentionManagedInstanceBackups */
  public readonly longTermRetentionManagedInstanceBackups: LongTermRetentionManagedInstanceBackupsOperations;
  /** The operation groups for longTermRetentionBackups */
  public readonly longTermRetentionBackups: LongTermRetentionBackupsOperations;
  /** The operation groups for jobVersions */
  public readonly jobVersions: JobVersionsOperations;
  /** The operation groups for jobTargetGroups */
  public readonly jobTargetGroups: JobTargetGroupsOperations;
  /** The operation groups for jobSteps */
  public readonly jobSteps: JobStepsOperations;
  /** The operation groups for jobPrivateEndpoints */
  public readonly jobPrivateEndpoints: JobPrivateEndpointsOperations;
  /** The operation groups for jobs */
  public readonly jobs: JobsOperations;
  /** The operation groups for jobTargetExecutions */
  public readonly jobTargetExecutions: JobTargetExecutionsOperations;
  /** The operation groups for jobStepExecutions */
  public readonly jobStepExecutions: JobStepExecutionsOperations;
  /** The operation groups for jobCredentials */
  public readonly jobCredentials: JobCredentialsOperations;
  /** The operation groups for jobAgents */
  public readonly jobAgents: JobAgentsOperations;
  /** The operation groups for jobExecutions */
  public readonly jobExecutions: JobExecutionsOperations;
  /** The operation groups for iPv6FirewallRules */
  public readonly iPv6FirewallRules: IPv6FirewallRulesOperations;
  /** The operation groups for instancePools */
  public readonly instancePools: InstancePoolsOperations;
  /** The operation groups for instancePoolOperations */
  public readonly instancePoolOperations: InstancePoolOperationsOperations;
  /** The operation groups for instanceFailoverGroups */
  public readonly instanceFailoverGroups: InstanceFailoverGroupsOperations;
  /** The operation groups for geoBackupPolicies */
  public readonly geoBackupPolicies: GeoBackupPoliciesOperations;
  /** The operation groups for failoverGroups */
  public readonly failoverGroups: FailoverGroupsOperations;
  /** The operation groups for endpointCertificates */
  public readonly endpointCertificates: EndpointCertificatesOperations;
  /** The operation groups for encryptionProtectors */
  public readonly encryptionProtectors: EncryptionProtectorsOperations;
  /** The operation groups for elasticPools */
  public readonly elasticPools: ElasticPoolsOperations;
  /** The operation groups for managedInstances */
  public readonly managedInstances: ManagedInstancesOperations;
  /** The operation groups for serverTrustGroups */
  public readonly serverTrustGroups: ServerTrustGroupsOperations;
  /** The operation groups for managedDatabases */
  public readonly managedDatabases: ManagedDatabasesOperations;
  /** The operation groups for distributedAvailabilityGroups */
  public readonly distributedAvailabilityGroups: DistributedAvailabilityGroupsOperations;
  /** The operation groups for deletedServers */
  public readonly deletedServers: DeletedServersOperations;
  /** The operation groups for dataMaskingPolicies */
  public readonly dataMaskingPolicies: DataMaskingPoliciesOperations;
  /** The operation groups for managedDatabaseVulnerabilityAssessmentScans */
  public readonly managedDatabaseVulnerabilityAssessmentScans: ManagedDatabaseVulnerabilityAssessmentScansOperations;
  /** The operation groups for managedDatabaseVulnerabilityAssessments */
  public readonly managedDatabaseVulnerabilityAssessments: ManagedDatabaseVulnerabilityAssessmentsOperations;
  /** The operation groups for databaseVulnerabilityAssessments */
  public readonly databaseVulnerabilityAssessments: DatabaseVulnerabilityAssessmentsOperations;
  /** The operation groups for managedDatabaseVulnerabilityAssessmentRuleBaselines */
  public readonly managedDatabaseVulnerabilityAssessmentRuleBaselines: ManagedDatabaseVulnerabilityAssessmentRuleBaselinesOperations;
  /** The operation groups for databaseVulnerabilityAssessmentRuleBaselines */
  public readonly databaseVulnerabilityAssessmentRuleBaselines: DatabaseVulnerabilityAssessmentRuleBaselinesOperations;
  /** The operation groups for sqlVulnerabilityAssessmentScans */
  public readonly sqlVulnerabilityAssessmentScans: SqlVulnerabilityAssessmentScansOperations;
  /** The operation groups for sqlVulnerabilityAssessmentScanResult */
  public readonly sqlVulnerabilityAssessmentScanResult: SqlVulnerabilityAssessmentScanResultOperations;
  /** The operation groups for databaseSqlVulnerabilityAssessmentScanResult */
  public readonly databaseSqlVulnerabilityAssessmentScanResult: DatabaseSqlVulnerabilityAssessmentScanResultOperations;
  /** The operation groups for sqlVulnerabilityAssessmentRuleBaseline */
  public readonly sqlVulnerabilityAssessmentRuleBaseline: SqlVulnerabilityAssessmentRuleBaselineOperations;
  /** The operation groups for databaseSqlVulnerabilityAssessmentRuleBaselines */
  public readonly databaseSqlVulnerabilityAssessmentRuleBaselines: DatabaseSqlVulnerabilityAssessmentRuleBaselinesOperations;
  /** The operation groups for sqlVulnerabilityAssessmentsSettings */
  public readonly sqlVulnerabilityAssessmentsSettings: SqlVulnerabilityAssessmentsSettingsOperations;
  /** The operation groups for sqlVulnerabilityAssessments */
  public readonly sqlVulnerabilityAssessments: SqlVulnerabilityAssessmentsOperations;
  /** The operation groups for sqlVulnerabilityAssessmentBaseline */
  public readonly sqlVulnerabilityAssessmentBaseline: SqlVulnerabilityAssessmentBaselineOperations;
  /** The operation groups for databaseSecurityAlertPolicies */
  public readonly databaseSecurityAlertPolicies: DatabaseSecurityAlertPoliciesOperations;
  /** The operation groups for managedDatabaseSchemas */
  public readonly managedDatabaseSchemas: ManagedDatabaseSchemasOperations;
  /** The operation groups for databaseSchemas */
  public readonly databaseSchemas: DatabaseSchemasOperations;
  /** The operation groups for managedDatabaseTables */
  public readonly managedDatabaseTables: ManagedDatabaseTablesOperations;
  /** The operation groups for databaseTables */
  public readonly databaseTables: DatabaseTablesOperations;
  /** The operation groups for managedDatabaseColumns */
  public readonly managedDatabaseColumns: ManagedDatabaseColumnsOperations;
  /** The operation groups for serverAdvisors */
  public readonly serverAdvisors: ServerAdvisorsOperations;
  /** The operation groups for extendedServerBlobAuditingPolicies */
  public readonly extendedServerBlobAuditingPolicies: ExtendedServerBlobAuditingPoliciesOperations;
  /** The operation groups for extendedDatabaseBlobAuditingPolicies */
  public readonly extendedDatabaseBlobAuditingPolicies: ExtendedDatabaseBlobAuditingPoliciesOperations;
  /** The operation groups for databaseBlobAuditingPolicies */
  public readonly databaseBlobAuditingPolicies: DatabaseBlobAuditingPoliciesOperations;
  /** The operation groups for serverBlobAuditingPolicies */
  public readonly serverBlobAuditingPolicies: ServerBlobAuditingPoliciesOperations;
  /** The operation groups for servers */
  public readonly servers: ServersOperations;
  /** The operation groups for replicationLinks */
  public readonly replicationLinks: ReplicationLinksOperations;
  /** The operation groups for firewallRules */
  public readonly firewallRules: FirewallRulesOperations;
  /** The operation groups for databases */
  public readonly databases: DatabasesOperations;
  /** The operation groups for sensitivityLabels */
  public readonly sensitivityLabels: SensitivityLabelsOperations;
  /** The operation groups for restorePoints */
  public readonly restorePoints: RestorePointsOperations;
  /** The operation groups for databaseColumns */
  public readonly databaseColumns: DatabaseColumnsOperations;
  /** The operation groups for backupShortTermRetentionPolicies */
  public readonly backupShortTermRetentionPolicies: BackupShortTermRetentionPoliciesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
