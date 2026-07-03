// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a SQL Server Instance resource
 *
 * @summary creates or replaces a SQL Server Instance resource
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateSqlServerInstance.json
 */
async function updatesASQLServerInstanceTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.create("testrg", "testsqlServerInstance", {
    location: "northeurope",
    properties: {
      authentication: {
        mode: "Windows",
        sqlServerEntraIdentity: [
          {
            clientId: "00000000-1111-2222-3333-444444444444",
            identityType: "UserAssignedManagedIdentity",
          },
          { clientId: "", identityType: "SystemAssignedManagedIdentity" },
        ],
      },
      backupPolicy: {
        differentialBackupHours: 12,
        fullBackupDays: 1,
        retentionPeriodDays: 1,
        transactionLogBackupMinutes: 30,
      },
      bestPracticesAssessment: {
        enabled: true,
        schedule: { cronTrigger: { expression: "0 0 12 1 11" }, enabled: true },
      },
      clientConnection: { enabled: false },
      cores: "4",
      discoverySource: "SSMS",
      edition: "Developer",
      hostType: "Physical Server",
      instanceName: "name of instance",
      migration: { assessment: { enabled: false } },
      monitoring: { enabled: false },
      serviceType: "Engine",
      version: "SQL Server 2012",
    },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await updatesASQLServerInstanceTags();
}

main().catch(console.error);
