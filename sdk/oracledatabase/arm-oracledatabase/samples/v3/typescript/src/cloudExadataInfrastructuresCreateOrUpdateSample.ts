// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CloudExadataInfrastructure
 *
 * @summary create a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createExadataInfrastructureGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.createOrUpdate(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    {
      properties: {
        computeCount: 100,
        storageCount: 10,
        shape: "EXADATA.X9M",
        displayName: "infra 1",
        ocid: "ocid1..aaaaaa",
        maintenanceWindow: {
          preference: "NoPreference",
          months: [{ name: "January" }],
          weeksOfMonth: [0],
          daysOfWeek: [{ name: "Monday" }],
          hoursOfDay: [0],
          leadTimeInWeeks: 10,
          patchingMode: "Rolling",
          customActionTimeoutInMins: 120,
          isCustomActionTimeoutEnabled: true,
          isMonthlyPatchingEnabled: true,
        },
        estimatedPatchingTime: {},
        customerContacts: [{ email: "noreply@oracle.com" }],
        lifecycleState: "Provisioning",
        lastMaintenanceRunId: "ocid1..aaaaa",
        nextMaintenanceRunId: "ocid1..aaaaaa",
        databaseServerType:
          "ghnehafjgxkfpirwkmrgzphwhnftkktamoawnawztevnhbszjgkyvqvtxrnmbjqvfsthaptqbjtozuwdswkgrhmifljzjruvedeshwfdyrbzgapyyhkgxrulpttbarqsbgzoigggrsdjjlfmazpinyzmtcpugkgaiitvccklieodrscikvitdfdwczpko",
        storageServerType:
          "ikmrpsmpkbrnxpaaemmljvtvyxbtcjijsowrpislrwkgjhucszljohrnvfotgbiknehciipnkfcqkrqseqz",
        computeModel: "ECPU",
      },
      location: "eastus",
      tags: {},
      zones: ["1"],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a CloudExadataInfrastructure
 *
 * @summary create a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_CreateOrUpdate_MinimumSet_Gen.json
 */
async function createExadataInfrastructureGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.createOrUpdate(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    { location: "eastus", zones: ["1"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a CloudExadataInfrastructure
 *
 * @summary create a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/exaInfra_create.json
 */
async function cloudExadataInfrastructuresCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.createOrUpdate("rg000", "infra1", {
    properties: {
      computeCount: 100,
      storageCount: 10,
      shape: "EXADATA.X9M",
      displayName: "infra 1",
    },
    location: "eastus",
    tags: { tagK1: "tagV1" },
    zones: ["1"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createExadataInfrastructureGeneratedByMaximumSetRule();
  await createExadataInfrastructureGeneratedByMinimumSetRule();
  await cloudExadataInfrastructuresCreateOrUpdate();
}

main().catch(console.error);
