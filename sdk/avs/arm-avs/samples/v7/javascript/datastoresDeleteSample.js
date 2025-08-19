// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Datastore
 *
 * @summary delete a Datastore
 * x-ms-original-file: 2024-09-01/Datastores_Delete.json
 */
async function datastoresDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.datastores.delete("group1", "cloud1", "cluster1", "datastore1");
}

async function main() {
  await datastoresDelete();
}

main().catch(console.error);
