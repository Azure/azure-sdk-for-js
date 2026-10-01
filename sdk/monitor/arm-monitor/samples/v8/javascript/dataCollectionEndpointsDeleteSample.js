// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a data collection endpoint.
 *
 * @summary deletes a data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionEndpointsDelete.json
 */
async function deleteDataCollectionEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.dataCollectionEndpoints.delete("myResourceGroup", "myDataCollectionEndpoint");
}

async function main() {
  await deleteDataCollectionEndpoint();
}

main().catch(console.error);
