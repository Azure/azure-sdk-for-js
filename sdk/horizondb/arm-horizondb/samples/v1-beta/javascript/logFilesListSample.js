// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists captured log files for a HorizonDB cluster.
 *
 * @summary lists captured log files for a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/LogFiles_List.json
 */
async function listCapturedLogFiles() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logFiles.list("example-resource-group", "example-cluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCapturedLogFiles();
}

main().catch(console.error);
