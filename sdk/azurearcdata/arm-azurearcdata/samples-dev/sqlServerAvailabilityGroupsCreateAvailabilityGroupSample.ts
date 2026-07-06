// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SQL Server availability group
 *
 * @summary create a SQL Server availability group
 * x-ms-original-file: 2026-03-01-preview/CreateSqlServerAvailabilityGroup.json
 */
async function createAnAvailabilityGroupUsingThisServerForThePrimaryReplica(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.createAvailabilityGroup(
    "testrg",
    "testSqlServer_INST1",
    {
      automatedBackupPreference: "SECONDARY",
      availabilityGroupName: "myNewAg",
      clusterType: "WSFC",
      databases: ["database1", "database2"],
      dbFailover: "ON",
      dtcSupport: "NONE",
      failureConditionLevel: 3,
      healthCheckTimeout: 30000,
      listener: {
        dnsName: "myNewAgListener",
        ipV4AddressesAndMasks: [
          { ipAddress: "192.1.168.5", mask: "255.255.255.0" },
          { ipAddress: "10.1.168.5", mask: "255.255.255.0" },
        ],
        port: 1433,
      },
      replicas: [
        {
          availabilityMode: "SYNCHRONOUS_COMMIT",
          backupPriority: 50,
          endpointConnectLogin: "NT Server\\MSSSQLSERVER",
          endpointName: "inst1DBMEndpoint",
          endpointUrl: "TCP://testSqlServer_INST1.testSqlserverDomain:5022",
          failoverMode: "AUTOMATIC",
          primaryRoleAllowConnections: "ALL",
          secondaryRoleAllowConnections: "ALL",
          seedingMode: "AUTOMATIC",
          serverInstance:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/sqlServerInstances/testSqlServer_INST1/",
          sessionTimeout: 10,
        },
        {
          availabilityMode: "SYNCHRONOUS_COMMIT",
          backupPriority: 50,
          endpointConnectLogin: "NT Server\\MSSSQLSERVER",
          endpointName: "inst2DBMEndpoint",
          endpointUrl: "TCP://testSqlServer_INST2.testSqlserverDomain:5022",
          failoverMode: "AUTOMATIC",
          primaryRoleAllowConnections: "ALL",
          secondaryRoleAllowConnections: "ALL",
          seedingMode: "AUTOMATIC",
          serverInstance:
            "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/sqlServerInstances/testSqlServer_INST2/",
          sessionTimeout: 10,
        },
      ],
      requiredSynchronizedSecondariesToCommit: 0,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnAvailabilityGroupUsingThisServerForThePrimaryReplica();
}

main().catch(console.error);
