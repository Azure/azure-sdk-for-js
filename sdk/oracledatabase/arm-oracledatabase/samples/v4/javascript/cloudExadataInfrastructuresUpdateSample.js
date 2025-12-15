// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CloudExadataInfrastructure
 *
 * @summary update a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_Update_MaximumSet_Gen.json
 */
async function patchExadataInfrastructureGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.update("rgopenapi", "cloudexaInfra1", {
    zones: ["wl"],
    tags: { key831: "mymrssvjc" },
    properties: {
      computeCount: 9,
      storageCount: 4,
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
      customerContacts: [{ email: "dummyemail@microsoft.com" }],
      displayName: "displayName",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a CloudExadataInfrastructure
 *
 * @summary update a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/CloudExadataInfrastructures_Update_MinimumSet_Gen.json
 */
async function patchExadataInfrastructureGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.update("rgopenapi", "cloudexainfra1", {});
  console.log(result);
}

/**
 * This sample demonstrates how to update a CloudExadataInfrastructure
 *
 * @summary update a CloudExadataInfrastructure
 * x-ms-original-file: 2025-09-01/exaInfra_patch.json
 */
async function cloudExadataInfrastructuresUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudExadataInfrastructures.update("rg000", "infra1", {});
  console.log(result);
}

async function main() {
  await patchExadataInfrastructureGeneratedByMaximumSetRule();
  await patchExadataInfrastructureGeneratedByMinimumSetRule();
  await cloudExadataInfrastructuresUpdate();
}

main().catch(console.error);
