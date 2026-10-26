// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets metadata for a captured HorizonDB log file.
 *
 * @summary gets metadata for a captured HorizonDB log file.
 * x-ms-original-file: 2026-10-01-preview/LogFiles_Get.json
 */
async function getCapturedLogFileMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.logFiles.get(
    "example-resource-group",
    "example-cluster",
    "11111111-1111-1111-1111-111111111111",
  );
  console.log(result);
}

async function main() {
  await getCapturedLogFileMetadata();
}

main().catch(console.error);
