// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/managedInstances
 * Primary schema key: Microsoft.Sql/managedInstances
 * Also covers: Microsoft.Sql/managedInstances/administrators, Microsoft.Sql/managedInstances/advancedThreatProtectionSettings, Microsoft.Sql/managedInstances/azureADOnlyAuthentications, Microsoft.Sql/managedInstances/databases, Microsoft.Sql/managedInstances/databases/advancedThreatProtectionSettings, Microsoft.Sql/managedInstances/databases/backupLongTermRetentionPolicies, Microsoft.Sql/managedInstances/databases/backupShortTermRetentionPolicies, Microsoft.Sql/managedInstances/databases/ledgerDigestUploads, Microsoft.Sql/managedInstances/databases/queries, Microsoft.Sql/managedInstances/databases/restoreDetails, Microsoft.Sql/managedInstances/databases/schemas, Microsoft.Sql/managedInstances/databases/schemas/tables, Microsoft.Sql/managedInstances/databases/schemas/tables/columns, Microsoft.Sql/managedInstances/databases/schemas/tables/columns/sensitivityLabels, Microsoft.Sql/managedInstances/databases/securityAlertPolicies, Microsoft.Sql/managedInstances/databases/transparentDataEncryption, Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments, Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/rules/baselines, Microsoft.Sql/managedInstances/databases/vulnerabilityAssessments/scans, Microsoft.Sql/managedInstances/distributedAvailabilityGroups, Microsoft.Sql/managedInstances/dnsAliases, Microsoft.Sql/managedInstances/dtc, Microsoft.Sql/managedInstances/encryptionProtector, Microsoft.Sql/managedInstances/endpointCertificates, Microsoft.Sql/managedInstances/keys, Microsoft.Sql/managedInstances/operations, Microsoft.Sql/managedInstances/privateEndpointConnections, Microsoft.Sql/managedInstances/privateLinkResources, Microsoft.Sql/managedInstances/recoverableDatabases, Microsoft.Sql/managedInstances/restorableDroppedDatabases, Microsoft.Sql/managedInstances/restorableDroppedDatabases/backupShortTermRetentionPolicies, Microsoft.Sql/managedInstances/securityAlertPolicies, Microsoft.Sql/managedInstances/serverConfigurationOptions, Microsoft.Sql/managedInstances/serverTrustCertificates, Microsoft.Sql/managedInstances/sqlAgent, Microsoft.Sql/managedInstances/startStopSchedules, Microsoft.Sql/managedInstances/vulnerabilityAssessments
 * Scenario: public-entrypoints/public-entrypoints-managed-instance
 * provisioning API: DistributedAvailabilityGroup, Dtc, EndpointCertificate, ManagedDatabaseAdvancedThreatProtection, ManagedInstance, ManagedInstanceAdministrator, ManagedInstanceAdvancedThreatProtection, ManagedInstanceAzureAdOnlyAuthentication, ManagedInstanceDatabase, ManagedBackupShortTermRetentionPolicy, ManagedInstanceDatabaseLedgerDigestUpload, ManagedDatabaseSchema, ManagedDatabaseTable, ManagedDatabaseColumn, ManagedDatabaseSensitivityLabel, ManagedInstanceDatabaseSecurityAlertPolicy, ManagedInstanceDatabaseTransparentDataEncryption, ManagedDatabaseVulnerabilityAssessment, ManagedDatabaseVulnerabilityAssessmentRuleBaseline, ManagedDatabaseVulnerabilityAssessmentScan, ManagedInstanceDnsAlias, ManagedInstanceEncryptionProtector, ManagedInstanceKey, ManagedInstanceLongTermRetentionPolicy, ManagedInstanceOperation, ManagedInstancePrivateEndpointConnection, ManagedInstancePrivateLink, ManagedInstanceSecurityAlertPolicy, ManagedInstanceVulnerabilityAssessment, Query, RecoverableManagedDatabase, ManagedRestorableDroppedDbBackupShortTermRetentionPolicy, RestorableDroppedManagedDatabase, RestoreDetail, ServerConfigurationOption, ManagedInstanceServerTrustCertificate, SqlAgent, StartStopManagedInstanceSchedule
 * Source: packages\services\sql\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-managed-instance.test.baseline.bicep and public-entrypoints-managed-instance.test.baseline.json
 * Gap/reduction: public entrypoint graph reduced to deterministic resource identities, vulnerability-assessment rule baseline rendered as a full-name root resource because the public API omits the Bicep-required rules parent
 */

import {
  DistributedAvailabilityGroup,
  Dtc,
  EndpointCertificate,
  ManagedDatabaseAdvancedThreatProtection,
  ManagedInstance,
  ManagedInstanceAdministrator,
  ManagedInstanceAdvancedThreatProtection,
  ManagedInstanceAzureAdOnlyAuthentication,
  ManagedInstanceDatabase,
  ManagedBackupShortTermRetentionPolicy,
  ManagedInstanceDatabaseLedgerDigestUpload,
  ManagedDatabaseSchema,
  ManagedDatabaseTable,
  ManagedDatabaseColumn,
  ManagedDatabaseSensitivityLabel,
  ManagedInstanceDatabaseSecurityAlertPolicy,
  ManagedInstanceDatabaseTransparentDataEncryption,
  ManagedDatabaseVulnerabilityAssessment,
  ManagedDatabaseVulnerabilityAssessmentRuleBaseline,
  ManagedDatabaseVulnerabilityAssessmentScan,
  ManagedInstanceDnsAlias,
  ManagedInstanceEncryptionProtector,
  ManagedInstanceKey,
  ManagedInstanceLongTermRetentionPolicy,
  ManagedInstanceOperation,
  ManagedInstancePrivateEndpointConnection,
  ManagedInstancePrivateLink,
  ManagedInstanceSecurityAlertPolicy,
  ManagedInstanceVulnerabilityAssessment,
  Query,
  RecoverableManagedDatabase,
  ManagedRestorableDroppedDbBackupShortTermRetentionPolicy,
  RestorableDroppedManagedDatabase,
  RestoreDetail,
  ServerConfigurationOption,
  ManagedInstanceServerTrustCertificate,
  SqlAgent,
  StartStopManagedInstanceSchedule,
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
  const managedInstance0 = new ManagedInstance(stack, {
    name: "publicentrypointsman",
    location: "eastus",
  });
  const distributedAvailabilityGroup1 = new DistributedAvailabilityGroup(managedInstance0, {
    name: "publicentrypointsman",
  });
  const dtc2 = new Dtc(managedInstance0, { name: "current" });
  const endpointCertificate3 = new EndpointCertificate(managedInstance0, {
    existing: true,
    name: "publicentrypointsman",
  });
  const managedInstanceDatabase4 = new ManagedInstanceDatabase(managedInstance0, {
    name: "publicentrypointsman",
    location: "eastus",
  });
  const managedDatabaseAdvancedThreatProtection5 = new ManagedDatabaseAdvancedThreatProtection(
    managedInstanceDatabase4,
    {
      name: "Default",
    },
  );
  const managedInstanceAdministrator6 = new ManagedInstanceAdministrator(managedInstance0, {
    name: "ActiveDirectory",
  });
  const managedInstanceAdvancedThreatProtection7 = new ManagedInstanceAdvancedThreatProtection(
    managedInstance0,
    {
      name: "Default",
    },
  );
  const managedInstanceAzureAdOnlyAuthentication8 = new ManagedInstanceAzureAdOnlyAuthentication(
    managedInstance0,
    {
      name: "Default",
    },
  );
  const managedInstanceDatabaseBackupShortTermRetentionPolicy9 =
    new ManagedBackupShortTermRetentionPolicy(managedInstanceDatabase4, {
      name: "default",
    });
  const managedInstanceDatabaseLedgerDigestUpload10 = new ManagedInstanceDatabaseLedgerDigestUpload(
    managedInstanceDatabase4,
    {
      name: "current",
    },
  );
  const managedInstanceDatabaseSchema11 = new ManagedDatabaseSchema(managedInstanceDatabase4, {
    existing: true,
    name: "publicentrypointsman",
  });
  const managedInstanceDatabaseSchemaTable12 = new ManagedDatabaseTable(
    managedInstanceDatabaseSchema11,
    {
      existing: true,
      name: "publicentrypointsman",
    },
  );
  const managedInstanceDatabaseSchemaTableColumn13 = new ManagedDatabaseColumn(
    managedInstanceDatabaseSchemaTable12,
    { existing: true, name: "publicentrypointsman" },
  );
  const managedInstanceDatabaseSchemaTableColumnSensitivityLabel14 =
    new ManagedDatabaseSensitivityLabel(managedInstanceDatabaseSchemaTableColumn13, {
      name: "current",
    });
  const managedInstanceDatabaseSecurityAlertPolicy15 =
    new ManagedInstanceDatabaseSecurityAlertPolicy(managedInstanceDatabase4, {
      name: "Default",
    });
  const managedInstanceDatabaseTransparentDataEncryption16 =
    new ManagedInstanceDatabaseTransparentDataEncryption(managedInstanceDatabase4, {
      name: "current",
    });
  const managedInstanceDatabaseVulnerabilityAssessment17 =
    new ManagedDatabaseVulnerabilityAssessment(managedInstanceDatabase4, {
      name: "default",
    });
  const managedInstanceDatabaseVulnerabilityAssessmentRuleBaseline18 =
    new ManagedDatabaseVulnerabilityAssessmentRuleBaseline(
      // @ts-expect-error The public constructor omits the Bicep-required rules parent.
      stack,
      {
        name: "managedinstance/database/default/rule/default",
      },
    );
  const managedInstanceDatabaseVulnerabilityAssessmentScan19 =
    new ManagedDatabaseVulnerabilityAssessmentScan(
      managedInstanceDatabaseVulnerabilityAssessment17,
      { existing: true, name: "publicentrypointsman" },
    );
  const managedInstanceDnsAlias20 = new ManagedInstanceDnsAlias(managedInstance0, {
    name: "publicentrypointsman",
  });
  const managedInstanceEncryptionProtector21 = new ManagedInstanceEncryptionProtector(
    managedInstance0,
    {
      name: "current",
    },
  );
  const managedInstanceKey22 = new ManagedInstanceKey(managedInstance0, {
    name: "publicentrypointsman",
  });
  const managedInstanceLongTermRetentionPolicy23 = new ManagedInstanceLongTermRetentionPolicy(
    managedInstanceDatabase4,
    {
      name: "default",
    },
  );
  const managedInstanceOperation24 = new ManagedInstanceOperation(managedInstance0, {
    existing: true,
    name: "publicentrypointsman",
  });
  const managedInstancePrivateEndpointConnection25 = new ManagedInstancePrivateEndpointConnection(
    managedInstance0,
    {
      name: "publicentrypointsman",
    },
  );
  const managedInstancePrivateLink26 = new ManagedInstancePrivateLink(managedInstance0, {
    existing: true,
    name: "publicentrypointsman",
  });
  const managedInstanceSecurityAlertPolicy27 = new ManagedInstanceSecurityAlertPolicy(
    managedInstance0,
    {
      name: "Default",
    },
  );
  const managedInstanceVulnerabilityAssessment28 = new ManagedInstanceVulnerabilityAssessment(
    managedInstance0,
    {
      name: "default",
    },
  );
  const query29 = new Query(managedInstanceDatabase4, {
    existing: true,
    name: "publicentrypointsman",
  });
  const recoverableManagedDatabase30 = new RecoverableManagedDatabase(managedInstance0, {
    existing: true,
    name: "publicentrypointsman",
  });
  const restorableDroppedManagedDatabase31 = new RestorableDroppedManagedDatabase(
    managedInstance0,
    {
      existing: true,
      name: "publicentrypointsman",
    },
  );
  const restorableDroppedDatabaseBackupShortTermRetentionPolicy32 =
    new ManagedRestorableDroppedDbBackupShortTermRetentionPolicy(
      restorableDroppedManagedDatabase31,
      { name: "default" },
    );
  const restoreDetail33 = new RestoreDetail(managedInstanceDatabase4, {
    name: "Default",
    existing: true,
  });
  const serverConfigurationOption34 = new ServerConfigurationOption(managedInstance0, {
    name: "allowPolybaseExport",
  });
  const serverTrustCertificate35 = new ManagedInstanceServerTrustCertificate(managedInstance0, {
    name: "publicentrypointsman",
  });
  const sqlAgent36 = new SqlAgent(managedInstance0, {});
  const startStopManagedInstanceSchedule37 = new StartStopManagedInstanceSchedule(
    managedInstance0,
    { name: "default" },
  );
  return stack;
}

describe("public-entrypoints/public-entrypoints-managed-instance", () => {
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
