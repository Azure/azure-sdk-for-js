// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ExascaleDbStorageVault
 *
 * @summary create a ExascaleDbStorageVault
 * x-ms-original-file: 2025-09-01/ExascaleDbStorageVaults_Create_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsCreateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbStorageVaults.create("rgopenapi", "storagevault1", {
    properties: {
      additionalFlashCacheInPercent: 0,
      description:
        "kgqvxvtegzwyppegpvqxnlslvetbjlgveofcpjddenhbpocyzwtswaeaetqkipcxyhedsymuljalirryldlbviuvidhssyiwodacajjnbpkbvbvzwzsjctsidchalyjkievnivikwnnypaojcvhmokddstxwiqxmbfmbvglfimseguwyvibwzllggjtwejdfgezoeuvjjbsyfozswihydzuscjrqnklewongumiljeordhqlsclwlmftzdoey",
      displayName: "storagevault1",
      highCapacityDatabaseStorageInput: { totalSizeInGbs: 1 },
      highCapacityDatabaseStorage: {
        availableSizeInGbs: 4,
        totalSizeInGbs: 12,
      },
      timeZone: "hyjcftlal",
      lifecycleState: "Provisioning",
      ocid: "ocid1.autonomousdatabase.oc1..aaaaa3klq",
    },
    zones: ["npqjhyekyumfybqas"],
    tags: { key4521: "rrgotvwzckepkhgkbz" },
    location: "zuoudqbvlxerpjtlfooyqlb",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a ExascaleDbStorageVault
 *
 * @summary create a ExascaleDbStorageVault
 * x-ms-original-file: 2025-09-01/ExascaleDbStorageVaults_Create_MinimumSet_Gen.json
 */
async function exascaleDbStorageVaultsCreateMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbStorageVaults.create("rgopenapi", "storagevault1", {
    location: "odxgtv",
  });
  console.log(result);
}

async function main() {
  await exascaleDbStorageVaultsCreateMaximumSet();
  await exascaleDbStorageVaultsCreateMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
