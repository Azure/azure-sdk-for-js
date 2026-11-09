// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the specified data collection endpoint.
 *
 * @summary returns the specified data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionEndpointsGet.json
 */
async function getDataCollectionEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionEndpoints.get(
    "myResourceGroup",
    "myDataCollectionEndpoint",
  );
  console.log(result);
}

async function main() {
  await getDataCollectionEndpoint();
}

main().catch(console.error);
