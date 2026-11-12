// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the log capture configurations for a HorizonDB cluster.
 *
 * @summary lists the log capture configurations for a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/LogCaptureConfigurations_List.json
 */
async function listLogCaptureConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logCaptureConfigurations.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listLogCaptureConfigurations();
}

main().catch(console.error);
