// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers
 * Primary schema key: Microsoft.Sql/servers
 * Also covers: Microsoft.Sql/servers/administrators, Microsoft.Sql/servers/advancedThreatProtectionSettings, Microsoft.Sql/servers/advisors, Microsoft.Sql/servers/auditingSettings, Microsoft.Sql/servers/automaticTuning, Microsoft.Sql/servers/azureADOnlyAuthentications, Microsoft.Sql/servers/connectionPolicies, Microsoft.Sql/servers/databases, Microsoft.Sql/servers/databases/advancedThreatProtectionSettings, Microsoft.Sql/servers/databases/advisors, Microsoft.Sql/servers/databases/advisors/recommendedActions, Microsoft.Sql/servers/databases/auditingSettings, Microsoft.Sql/servers/databases/automaticTuning, Microsoft.Sql/servers/databases/backupLongTermRetentionPolicies, Microsoft.Sql/servers/databases/backupShortTermRetentionPolicies, Microsoft.Sql/servers/databases/dataMaskingPolicies, Microsoft.Sql/servers/databases/dataMaskingPolicies/rules, Microsoft.Sql/servers/databases/dataWarehouseUserActivities, Microsoft.Sql/servers/databases/extendedAuditingSettings, Microsoft.Sql/servers/databases/extensions, Microsoft.Sql/servers/databases/geoBackupPolicies, Microsoft.Sql/servers/databases/ledgerDigestUploads, Microsoft.Sql/servers/databases/maintenanceWindowOptions, Microsoft.Sql/servers/databases/maintenanceWindows, Microsoft.Sql/servers/databases/replicationLinks, Microsoft.Sql/servers/databases/restorePoints, Microsoft.Sql/servers/databases/schemas, Microsoft.Sql/servers/databases/schemas/tables, Microsoft.Sql/servers/databases/schemas/tables/columns, Microsoft.Sql/servers/databases/schemas/tables/columns/sensitivityLabels, Microsoft.Sql/servers/databases/securityAlertPolicies, Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments, Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines, Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/baselines/rules, Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans, Microsoft.Sql/servers/databases/sqlVulnerabilityAssessments/scans/scanResults, Microsoft.Sql/servers/databases/syncGroups, Microsoft.Sql/servers/databases/syncGroups/syncMembers, Microsoft.Sql/servers/databases/transparentDataEncryption, Microsoft.Sql/servers/databases/vulnerabilityAssessments, Microsoft.Sql/servers/databases/vulnerabilityAssessments/rules/baselines, Microsoft.Sql/servers/databases/vulnerabilityAssessments/scans, Microsoft.Sql/servers/databases/workloadGroups, Microsoft.Sql/servers/databases/workloadGroups/workloadClassifiers, Microsoft.Sql/servers/devOpsAuditingSettings, Microsoft.Sql/servers/dnsAliases, Microsoft.Sql/servers/elasticPools, Microsoft.Sql/servers/encryptionProtector, Microsoft.Sql/servers/extendedAuditingSettings, Microsoft.Sql/servers/failoverGroups, Microsoft.Sql/servers/firewallRules, Microsoft.Sql/servers/ipv6FirewallRules, Microsoft.Sql/servers/jobAgents, Microsoft.Sql/servers/jobAgents/credentials, Microsoft.Sql/servers/jobAgents/jobs, Microsoft.Sql/servers/jobAgents/jobs/executions, Microsoft.Sql/servers/jobAgents/jobs/executions/steps, Microsoft.Sql/servers/jobAgents/jobs/executions/steps/targets, Microsoft.Sql/servers/jobAgents/jobs/steps, Microsoft.Sql/servers/jobAgents/jobs/versions, Microsoft.Sql/servers/jobAgents/jobs/versions/steps, Microsoft.Sql/servers/jobAgents/privateEndpoints, Microsoft.Sql/servers/jobAgents/targetGroups, Microsoft.Sql/servers/keys, Microsoft.Sql/servers/networkSecurityPerimeterConfigurations, Microsoft.Sql/servers/outboundFirewallRules, Microsoft.Sql/servers/privateEndpointConnections, Microsoft.Sql/servers/privateLinkResources, Microsoft.Sql/servers/recoverableDatabases, Microsoft.Sql/servers/restorableDroppedDatabases, Microsoft.Sql/servers/securityAlertPolicies, Microsoft.Sql/servers/sqlVulnerabilityAssessments, Microsoft.Sql/servers/sqlVulnerabilityAssessments/baselines, Microsoft.Sql/servers/sqlVulnerabilityAssessments/baselines/rules, Microsoft.Sql/servers/sqlVulnerabilityAssessments/scans, Microsoft.Sql/servers/sqlVulnerabilityAssessments/scans/scanResults, Microsoft.Sql/servers/syncAgents, Microsoft.Sql/servers/virtualNetworkRules, Microsoft.Sql/servers/vulnerabilityAssessments
 * Scenario: public-entrypoints/public-entrypoints-server
 * provisioning API: SqlDatabaseSqlVulnerabilityAssessmentBaselineRule, ConnectionPolicy, Credential, DataMaskingPolicy, Rule, DataWarehouseUserActivities, DatabaseAdvancedThreatProtection, SqlDatabaseAdvisor, DatabaseAutomaticTuning, DatabaseBlobAuditingPolicy, SqlDatabaseSqlVulnerabilityAssessment, DevOpsAuditingSetting, ElasticPool, SqlServerJobExecution, SqlServerJobExecutionStep, ExtendedDatabaseBlobAuditingPolicy, ExtendedServerBlobAuditingPolicy, Extension, FailoverGroup, FirewallRule, GeoBackupPolicy, IPv6FirewallRule, Job, JobAgent, SqlServerJobStep, LongTermRetentionPolicy, NetworkSecurityPerimeterConfiguration, OutboundFirewallRule, PrivateEndpoint, PrivateLinkResource, RecommendedAction, RecoverableDatabase, ReplicationLink, RestorableDroppedDatabase, RestorePoint, SqlDatabaseSqlVulnerabilityAssessmentScanResult, Server, ServerAdministrator, ServerAdvancedThreatProtection, SqlServerAdvisor, ServerAutomaticTuning, ServerAzureAdOnlyAuthentication, SqlServerBlobAuditingPolicy, ServerDatabase, BackupShortTermRetentionPolicy, ServerDatabaseLedgerDigestUpload, SqlDatabaseSchema, SqlDatabaseTable, SqlDatabaseColumn, SqlDatabaseSensitivityLabel, ServerDatabaseSecurityAlertPolicy, ServerDatabaseTransparentDataEncryption, SqlDatabaseVulnerabilityAssessment, SqlDatabaseVulnerabilityAssessmentRuleBaseline, SqlDatabaseVulnerabilityAssessmentScan, ServerDnsAlias, ServerEncryptionProtector, ServerKey, ServerPrivateEndpointConnection, ServerSecurityAlertPolicy, SqlServerSqlVulnerabilityAssessment, ServerVulnerabilityAssessment, SqlDatabaseSqlVulnerabilityAssessmentBaseline, SqlDatabaseSqlVulnerabilityAssessmentScan, SyncAgent, SyncGroup, SyncMember, SqlServerJobExecutionStepTarget, TargetGroup, Version, SqlServerJobVersionStep, VirtualNetworkRule, WorkloadClassifier, WorkloadGroup
 * Source: packages\services\sql\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-server.test.baseline.bicep and public-entrypoints-server.test.baseline.json
 * Gap/reduction: job version uses Bicep-required integer identity despite the generated public name type being string, public entrypoint graph reduced to deterministic resource identities, vulnerability-assessment rule baseline rendered as a full-name root resource because the public API omits the Bicep-required rules parent
 */

import {
  SqlDatabaseSqlVulnerabilityAssessmentBaselineRule,
  ConnectionPolicy,
  Credential,
  DataMaskingPolicy,
  Rule,
  DataWarehouseUserActivities,
  DatabaseAdvancedThreatProtection,
  SqlDatabaseAdvisor,
  DatabaseAutomaticTuning,
  DatabaseBlobAuditingPolicy,
  SqlDatabaseSqlVulnerabilityAssessment,
  DevOpsAuditingSetting,
  ElasticPool,
  SqlServerJobExecution,
  SqlServerJobExecutionStep,
  ExtendedDatabaseBlobAuditingPolicy,
  ExtendedServerBlobAuditingPolicy,
  Extension,
  FailoverGroup,
  FirewallRule,
  GeoBackupPolicy,
  IPv6FirewallRule,
  Job,
  JobAgent,
  SqlServerJobStep,
  LongTermRetentionPolicy,
  NetworkSecurityPerimeterConfiguration,
  OutboundFirewallRule,
  PrivateEndpoint,
  PrivateLinkResource,
  RecommendedAction,
  RecoverableDatabase,
  ReplicationLink,
  RestorableDroppedDatabase,
  RestorePoint,
  SqlDatabaseSqlVulnerabilityAssessmentScanResult,
  Server,
  ServerAdministrator,
  ServerAdvancedThreatProtection,
  SqlServerAdvisor,
  ServerAutomaticTuning,
  ServerAzureAdOnlyAuthentication,
  SqlServerBlobAuditingPolicy,
  ServerDatabase,
  BackupShortTermRetentionPolicy,
  ServerDatabaseLedgerDigestUpload,
  SqlDatabaseSchema,
  SqlDatabaseTable,
  SqlDatabaseColumn,
  SqlDatabaseSensitivityLabel,
  ServerDatabaseSecurityAlertPolicy,
  ServerDatabaseTransparentDataEncryption,
  SqlDatabaseVulnerabilityAssessment,
  SqlDatabaseVulnerabilityAssessmentRuleBaseline,
  SqlDatabaseVulnerabilityAssessmentScan,
  ServerDnsAlias,
  ServerEncryptionProtector,
  ServerKey,
  ServerPrivateEndpointConnection,
  ServerSecurityAlertPolicy,
  SqlServerSqlVulnerabilityAssessment,
  ServerVulnerabilityAssessment,
  SqlDatabaseSqlVulnerabilityAssessmentBaseline,
  SqlDatabaseSqlVulnerabilityAssessmentScan,
  SyncAgent,
  SyncGroup,
  SyncMember,
  SqlServerJobExecutionStepTarget,
  TargetGroup,
  Version,
  SqlServerJobVersionStep,
  VirtualNetworkRule,
  WorkloadClassifier,
  WorkloadGroup,
} from "@azure/provisioning-sql";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

type BuildScenarioHelpers = {
  createResourceGroupStack: (name?: string) => import("@azure/provisioning-core").Stack;
  createSubscriptionStack: (name?: string) => import("@azure/provisioning-core").Stack;
  values: {
    subscriptionId: string;
    tenantId: string;
    objectId: string;
    principalId: string;
    clientId: string;
    resourceGroupName: string;
    location: string;
    secondaryLocation: string;
  };
};

const values = {
  subscriptionId: "00000000-0000-0000-0000-000000000000",
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  principalId: "33333333-3333-3333-3333-333333333333",
  clientId: "44444444-4444-4444-4444-444444444444",
  resourceGroupName: "rg-cdk-package-test",
  location: "eastus",
  secondaryLocation: "westus",
};

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const server0 = new Server(stack, {
    name: "publicentrypointsser",
    location: "eastus",
  });
  new ConnectionPolicy(server0, { name: "default" });
  const jobAgent2 = new JobAgent(server0, {
    name: "publicentrypointsser",
    location: "eastus",
  });
  new Credential(jobAgent2, {
    name: "publicentrypointsser",
  });
  const serverDatabase4 = new ServerDatabase(server0, {
    name: "publicentrypointsser",
    location: "eastus",
  });
  const dataMaskingPolicy5 = new DataMaskingPolicy(serverDatabase4, {
    name: "Default",
  });
  new Rule(dataMaskingPolicy5, {
    name: "publicentrypointsser",
  });
  new DataWarehouseUserActivities(serverDatabase4, {
    name: "current",
    existing: true,
  });
  new DatabaseAdvancedThreatProtection(serverDatabase4, {
    name: "Default",
  });
  const databaseAdvisor9 = new SqlDatabaseAdvisor(serverDatabase4, {
    existing: true,
    name: "publicentrypointsser",
  });
  new DatabaseAutomaticTuning(serverDatabase4, {
    existing: true,
  });
  new DatabaseBlobAuditingPolicy(serverDatabase4, {
    name: "default",
  });
  const databaseSqlVulnerabilityAssessment12 = new SqlDatabaseSqlVulnerabilityAssessment(
    serverDatabase4,
    {
      name: "default",
      existing: true,
    },
  );
  const databaseSqlVulnerabilityAssessmentBaseline13 =
    new SqlDatabaseSqlVulnerabilityAssessmentBaseline(databaseSqlVulnerabilityAssessment12, {
      name: "default",
    });
  new SqlDatabaseSqlVulnerabilityAssessmentBaselineRule(
    databaseSqlVulnerabilityAssessmentBaseline13,
    {
      name: "publicentrypointsser",
    },
  );
  const databaseSqlVulnerabilityAssessmentScan15 = new SqlDatabaseSqlVulnerabilityAssessmentScan(
    databaseSqlVulnerabilityAssessment12,
    {
      existing: true,
      name: "publicentrypointsser",
    },
  );
  new SqlDatabaseSqlVulnerabilityAssessmentScanResult(databaseSqlVulnerabilityAssessmentScan15, {
    existing: true,
    name: "publicentrypointsser",
  });
  new DevOpsAuditingSetting(server0, {
    name: "Default",
  });
  new ElasticPool(server0, {
    name: "publicentrypointsser",
    location: "eastus",
  });
  const job19 = new Job(jobAgent2, {
    name: "publicentrypointsser",
  });
  const execution20 = new SqlServerJobExecution(job19, {
    name: "publicentrypointsser",
  });
  const executionStep21 = new SqlServerJobExecutionStep(execution20, {
    existing: true,
    name: "publicentrypointsser",
  });
  new ExtendedDatabaseBlobAuditingPolicy(serverDatabase4, {
    name: "default",
  });
  new ExtendedServerBlobAuditingPolicy(server0, {
    name: "default",
  });
  new Extension(serverDatabase4, {
    name: "publicentrypointsser",
  });
  new FailoverGroup(server0, {
    name: "publicentrypointsser",
  });
  new FirewallRule(server0, {
    name: "publicentrypointsser",
  });
  new GeoBackupPolicy(serverDatabase4, {
    name: "Default",
  });
  new IPv6FirewallRule(server0, {
    name: "publicentrypointsser",
  });
  new SqlServerJobStep(job19, {
    name: "publicentrypointsser",
  });
  new LongTermRetentionPolicy(serverDatabase4, {
    name: "default",
  });
  new NetworkSecurityPerimeterConfiguration(server0, {
    existing: true,
    name: "publicentrypointsser",
  });
  new OutboundFirewallRule(server0, {
    name: "publicentrypointsser",
  });
  new PrivateEndpoint(jobAgent2, {
    name: "publicentrypointsser",
  });
  new PrivateLinkResource(server0, {
    existing: true,
    name: "publicentrypointsser",
  });
  new RecommendedAction(databaseAdvisor9, {
    existing: true,
    name: "publicentrypointsser",
  });
  new RecoverableDatabase(server0, {
    existing: true,
    name: "publicentrypointsser",
  });
  new ReplicationLink(serverDatabase4, {
    name: "publicentrypointsser",
  });
  new RestorableDroppedDatabase(server0, {
    existing: true,
    name: "publicentrypointsser",
  });
  new RestorePoint(serverDatabase4, {
    existing: true,
    name: "publicentrypointsser",
  });
  new ServerAdministrator(server0, {
    name: "ActiveDirectory",
  });
  new ServerAdvancedThreatProtection(server0, {
    name: "Default",
  });
  new SqlServerAdvisor(server0, {
    existing: true,
    name: "publicentrypointsser",
  });
  new ServerAutomaticTuning(server0, {
    existing: true,
  });
  new ServerAzureAdOnlyAuthentication(server0, {
    name: "Default",
  });
  new SqlServerBlobAuditingPolicy(server0, {
    name: "default",
  });
  new BackupShortTermRetentionPolicy(serverDatabase4, { name: "default" });
  new ServerDatabaseLedgerDigestUpload(serverDatabase4, {
    name: "current",
  });
  const serverDatabaseSchema50 = new SqlDatabaseSchema(serverDatabase4, {
    existing: true,
    name: "publicentrypointsser",
  });
  const serverDatabaseSchemaTable51 = new SqlDatabaseTable(serverDatabaseSchema50, {
    existing: true,
    name: "publicentrypointsser",
  });
  const serverDatabaseSchemaTableColumn52 = new SqlDatabaseColumn(serverDatabaseSchemaTable51, {
    existing: true,
    name: "publicentrypointsser",
  });
  new SqlDatabaseSensitivityLabel(serverDatabaseSchemaTableColumn52, {
    name: "current",
  });
  new ServerDatabaseSecurityAlertPolicy(serverDatabase4, { name: "Default" });
  new ServerDatabaseTransparentDataEncryption(serverDatabase4, {
    name: "current",
  });
  const serverDatabaseVulnerabilityAssessment56 = new SqlDatabaseVulnerabilityAssessment(
    serverDatabase4,
    {
      name: "default",
    },
  );
  new SqlDatabaseVulnerabilityAssessmentRuleBaseline(
    // @ts-expect-error The public constructor omits the Bicep-required rules parent.
    stack,
    {
      name: "server/database/default/rule/default",
    },
  );
  new SqlDatabaseVulnerabilityAssessmentScan(serverDatabaseVulnerabilityAssessment56, {
    existing: true,
    name: "publicentrypointsser",
  });
  new ServerDnsAlias(server0, {
    name: "publicentrypointsser",
  });
  new ServerEncryptionProtector(server0, {
    name: "current",
  });
  new ServerKey(server0, {
    name: "publicentrypointsser",
  });
  new ServerPrivateEndpointConnection(server0, {
    name: "publicentrypointsser",
  });
  new ServerSecurityAlertPolicy(server0, {
    name: "Default",
  });
  new SqlServerSqlVulnerabilityAssessment(server0, {
    name: "default",
  });
  new ServerVulnerabilityAssessment(server0, {
    name: "default",
  });
  new SyncAgent(server0, {
    name: "publicentrypointsser",
  });
  const syncGroup71 = new SyncGroup(serverDatabase4, {
    name: "publicentrypointsser",
  });
  new SyncMember(syncGroup71, {
    name: "publicentrypointsser",
  });
  new SqlServerJobExecutionStepTarget(executionStep21, {
    existing: true,
    name: "publicentrypointsser",
  });
  new TargetGroup(jobAgent2, {
    name: "publicentrypointsser",
  });
  // @ts-expect-error The generated public type uses string although Bicep requires an integer version name.
  const version75 = new Version(job19, { existing: true, name: 1 });
  new SqlServerJobVersionStep(version75, {
    existing: true,
    name: "step1",
  });
  new VirtualNetworkRule(server0, {
    name: "publicentrypointsser",
  });
  const workloadGroup78 = new WorkloadGroup(serverDatabase4, {
    name: "publicentrypointsser",
  });
  new WorkloadClassifier(workloadGroup78, {
    name: "publicentrypointsser",
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-server", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
