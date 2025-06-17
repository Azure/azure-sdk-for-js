// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Datastore
 *
 * @summary get a Datastore
 * x-ms-original-file: 2024-09-01/Datastores_Get.json
 */
async function datastoresGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.datastores.get("group1", "cloud1", "cluster1", "datastore1");
  console.log(result);
}

async function main() {
  await datastoresGet();
}

main().catch(console.error);
