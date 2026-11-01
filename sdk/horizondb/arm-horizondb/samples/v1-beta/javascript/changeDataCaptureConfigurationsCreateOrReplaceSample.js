// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a change data capture configuration that enrolls a PostgreSQL database for Microsoft Fabric Mirroring.
 *
 * @summary creates or replaces a change data capture configuration that enrolls a PostgreSQL database for Microsoft Fabric Mirroring.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureConfigurations_CreateOrReplace.json
 */
async function enrollADatabaseForMicrosoftFabricMirroring() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureConfigurations.createOrReplace(
    "example-resource-group",
    "example-cluster",
    "sales-database",
    {
      properties: {
        databaseName: "sales",
        usageProfile: "Mirroring",
        destinationResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/example-resource-group/providers/Microsoft.HorizonDb/clusters/example-cluster/changeDataCaptureDestinations/fabric-mirroring",
        desiredState: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main() {
  await enrollADatabaseForMicrosoftFabricMirroring();
}

main().catch(console.error);
