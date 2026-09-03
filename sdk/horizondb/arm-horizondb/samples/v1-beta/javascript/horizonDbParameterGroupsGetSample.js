// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a HorizonDB parameter group.
 *
 * @summary gets information about a HorizonDB parameter group.
 * x-ms-original-file: 2026-05-01-preview/ParameterGroups_Get.json
 */
async function getAHorizonDBParameterGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbParameterGroups.get(
    "exampleresourcegroup",
    "exampleparametergroup",
  );
  console.log(result);
}

async function main() {
  await getAHorizonDBParameterGroup();
}

main().catch(console.error);
