// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a HorizonDb parameter group.
 *
 * @summary gets information about a HorizonDb parameter group.
 * x-ms-original-file: 2026-01-20-preview/ParameterGroups_Get.json
 */
async function getAHorizonDbParameterGroup() {
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
  await getAHorizonDbParameterGroup();
}

main().catch(console.error);
