// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves server automatic tuning options.
 *
 * @summary retrieves server automatic tuning options.
 * x-ms-original-file: 2025-02-01-preview/ServerAutomaticTuningGet.json
 */
async function getAServerAutomaticTuningSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c3aa9078-0000-0000-0000-e36f151182d7";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverAutomaticTuning.get("default-sql-onebox", "testsvr11");
  console.log(result);
}

async function main() {
  await getAServerAutomaticTuningSettings();
}

main().catch(console.error);
