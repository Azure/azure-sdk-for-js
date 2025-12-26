// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get ArcSetting resource details of HCI Cluster.
 *
 * @summary get ArcSetting resource details of HCI Cluster.
 * x-ms-original-file: 2025-12-01-preview/GetArcSetting.json
 */
async function getArcSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.arcSettings.get("test-rg", "myCluster", "default");
  console.log(result);
}

async function main() {
  await getArcSetting();
}

main().catch(console.error);
